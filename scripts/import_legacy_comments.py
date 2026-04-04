#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


WORKSPACE_ROOT = Path(__file__).resolve().parents[2]
REPO_ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = REPO_ROOT / "src" / "content" / "blog"
GUIDES_DIR = REPO_ROOT / "src" / "content" / "guides"
HOWTO_DIR = REPO_ROOT / "src" / "content" / "howto"
OUTPUT_PATH = REPO_ROOT / "src" / "data" / "legacy-comments.json"
SQL_DUMP_PATH = WORKSPACE_ROOT / "u374839636_BmBry.sql"
SLUG_MAP_PATH = WORKSPACE_ROOT / "slug_map.json"
POSTS_SUMMARY_PATH = WORKSPACE_ROOT / "wp_posts_summary.json"

# Some WordPress pages were consolidated into section hubs during migration.
# These overrides preserve their legacy comments on the closest current route.
LEGACY_PAGE_OVERRIDES: dict[int, tuple[str, str]] = {
    779: ("pages", "guides-index"),
    4890: ("pages", "guides-index"),
    7242: ("pages", "courses-champs"),
}


@dataclass
class ParsedComment:
    comment_id: int
    post_id: int
    author: str
    date: str
    content: str
    approved: str
    comment_type: str
    parent_id: int


SPAM_AUTHORS = {
    "zoritoler imol",
    "a wordpress commenter",
}


def decode_mysql_escape(char: str) -> str:
    mapping = {
        "0": "\0",
        "b": "\b",
        "n": "\n",
        "r": "\r",
        "t": "\t",
        "Z": "\x1a",
        "'": "'",
        '"': '"',
        "\\": "\\",
    }
    return mapping.get(char, char)


def parse_sql_rows(values_text: str) -> list[list[object]]:
    rows: list[list[object]] = []
    current_row: list[object] | None = None
    token: list[str] = []
    in_string = False
    escape = False

    def flush_token() -> object:
        raw = "".join(token).strip()
        token.clear()
        if raw == "NULL":
            return None
        return raw

    for char in values_text:
        if in_string:
            if escape:
                token.append(decode_mysql_escape(char))
                escape = False
            elif char == "\\":
                escape = True
            elif char == "'":
                in_string = False
            else:
                token.append(char)
            continue

        if char == "'":
            in_string = True
        elif char == "(":
            current_row = []
        elif char == ",":
            if current_row is not None:
                current_row.append(flush_token())
        elif char == ")":
            if current_row is not None:
                current_row.append(flush_token())
                rows.append(current_row)
                current_row = None
        elif current_row is not None and char not in {"\n", "\r"}:
            token.append(char)

    return rows


def extract_comments_rows(sql_dump_path: Path) -> list[list[object]]:
    collecting = False
    buffer: list[str] = []

    with sql_dump_path.open("r", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            if not collecting and line.startswith("INSERT INTO `wp_comments` VALUES"):
                collecting = True
                buffer.append(line.split("VALUES", 1)[1])
                continue

            if collecting:
                buffer.append(line)
                if line.rstrip().endswith(";"):
                    break

    if not buffer:
        raise RuntimeError("Could not find wp_comments INSERT block in SQL dump.")

    values_text = "".join(buffer).strip()
    if values_text.endswith(";"):
        values_text = values_text[:-1]

    return parse_sql_rows(values_text)


def build_post_id_to_target() -> dict[int, tuple[str, str]]:
    slug_map = json.loads(SLUG_MAP_PATH.read_text(encoding="utf-8"))
    posts_summary = json.loads(POSTS_SUMMARY_PATH.read_text(encoding="utf-8"))["posts"]
    collection_slugs = {
        "blog": {path.stem for path in BLOG_DIR.glob("*.md")},
        "guides": {path.stem for path in GUIDES_DIR.glob("*.md")},
        "howto": {path.stem for path in HOWTO_DIR.glob("*.md")},
    }
    post_id_to_target: dict[int, tuple[str, str]] = dict(LEGACY_PAGE_OVERRIDES)

    for post in posts_summary:
        mapped_slug = slug_map.get(post["slug"])
        if not mapped_slug:
            continue

        for collection, slugs in collection_slugs.items():
            if mapped_slug in slugs:
                post_id_to_target[int(post["ID"])] = (collection, mapped_slug)
                break

    return post_id_to_target


def normalize_comment(row: list[object]) -> ParsedComment:
    if len(row) != 15:
        raise RuntimeError(f"Unexpected wp_comments row length: {len(row)}")

    return ParsedComment(
        comment_id=int(row[0]),
        post_id=int(row[1]),
        author=str(row[2] or "").strip() or "نام ظاہر نہیں کیا گیا",
        date=str(row[6] or ""),
        content=str(row[8] or "").strip(),
        approved=str(row[10] or ""),
        comment_type=str(row[12] or ""),
        parent_id=int(row[13] or 0),
    )


def is_obvious_spam(comment: ParsedComment) -> bool:
    author = comment.author.strip().lower()
    content = comment.content.strip().lower()

    if author in SPAM_AUTHORS:
        return True

    if "telegra.ph" in content or "personalized contact data extraction" in content:
        return True

    return False


def build_comment_index(
    parsed_comments: list[ParsedComment],
    post_id_to_target: dict[int, tuple[str, str]],
) -> tuple[dict[str, dict[str, list[dict[str, object]]]], dict[str, object]]:
    comments_by_collection: dict[str, dict[str, list[dict[str, object]]]] = {
        "blog": {},
        "guides": {},
        "howto": {},
        "pages": {},
    }
    per_target_nodes: dict[str, dict[str, dict[int, dict[str, object]]]] = {
        "blog": defaultdict(dict),
        "guides": defaultdict(dict),
        "howto": defaultdict(dict),
        "pages": defaultdict(dict),
    }
    mapped_counts_by_collection = {"blog": 0, "guides": 0, "howto": 0, "pages": 0}
    mapped_count = 0
    skipped_unmapped = 0
    skipped_unapproved = 0
    skipped_empty = 0
    skipped_non_comment = 0
    skipped_spam = 0
    skipped_exact_duplicates = 0
    seen_exact_comments: set[tuple[str, str, str, str]] = set()

    for parsed in parsed_comments:
        if parsed.approved != "1":
            skipped_unapproved += 1
            continue

        if parsed.comment_type not in {"", "comment"}:
            skipped_non_comment += 1
            continue

        if not parsed.content:
            skipped_empty += 1
            continue

        if is_obvious_spam(parsed):
            skipped_spam += 1
            continue

        target = post_id_to_target.get(parsed.post_id)
        if not target:
            skipped_unmapped += 1
            continue
        collection, slug = target

        dedupe_key = (
            collection,
            slug,
            parsed.author.strip().lower(),
            re.sub(r"\s+", " ", parsed.content.strip()),
        )
        if dedupe_key in seen_exact_comments:
            skipped_exact_duplicates += 1
            continue
        seen_exact_comments.add(dedupe_key)

        node = {
            "id": parsed.comment_id,
            "parentId": parsed.parent_id,
            "author": parsed.author,
            "date": parsed.date,
            "content": parsed.content,
            "children": [],
        }
        per_target_nodes[collection][slug][parsed.comment_id] = node
        mapped_count += 1
        mapped_counts_by_collection[collection] += 1

    for collection, slugs in per_target_nodes.items():
        for slug, nodes in slugs.items():
            roots: list[dict[str, object]] = []

            for node in nodes.values():
                parent_id = int(node["parentId"])
                parent = nodes.get(parent_id)
                if parent:
                    parent["children"].append(node)
                else:
                    roots.append(node)

            def sort_key(item: dict[str, object]) -> tuple[str, int]:
                return (str(item["date"]), int(item["id"]))

            flattened: list[dict[str, object]] = []

            def flatten(node: dict[str, object], depth: int) -> None:
                flattened.append(
                    {
                        "id": node["id"],
                        "parentId": node["parentId"],
                        "depth": depth,
                        "author": node["author"],
                        "date": node["date"],
                        "content": node["content"],
                    }
                )
                children = sorted(node["children"], key=sort_key)
                for child in children:
                    flatten(child, depth + 1)

            for root in sorted(roots, key=sort_key):
                flatten(root, 0)

            comments_by_collection[collection][slug] = flattened

    meta = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "mappedPostsByCollection": {
            collection: len(slugs) for collection, slugs in comments_by_collection.items()
        },
        "mappedComments": mapped_count,
        "mappedCommentsByCollection": mapped_counts_by_collection,
        "skippedUnmappedComments": skipped_unmapped,
        "skippedUnapprovedComments": skipped_unapproved,
        "skippedEmptyComments": skipped_empty,
        "skippedNonCommentRows": skipped_non_comment,
        "skippedSpamComments": skipped_spam,
        "skippedExactDuplicateComments": skipped_exact_duplicates,
    }

    sorted_comments_by_collection = {
        collection: dict(sorted(slugs.items()))
        for collection, slugs in comments_by_collection.items()
    }

    return sorted_comments_by_collection, meta


def main() -> None:
    post_id_to_target = build_post_id_to_target()
    rows = extract_comments_rows(SQL_DUMP_PATH)
    parsed_comments = [normalize_comment(row) for row in rows]
    comments_by_collection, meta = build_comment_index(parsed_comments, post_id_to_target)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = {"meta": meta, "commentsByCollection": comments_by_collection}
    OUTPUT_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Legacy comments written to {OUTPUT_PATH}")
    print(json.dumps(meta, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
