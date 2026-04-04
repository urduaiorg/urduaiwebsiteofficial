#!/usr/bin/env python3
from __future__ import annotations

import json
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


WORKSPACE_ROOT = Path(__file__).resolve().parents[2]
REPO_ROOT = Path(__file__).resolve().parents[1]
SQL_DUMP_PATH = WORKSPACE_ROOT / "u374839636_BmBry.sql"
POSTS_SUMMARY_PATH = WORKSPACE_ROOT / "wp_posts_summary.json"
TAR_PATH = WORKSPACE_ROOT / "u374839636.urduai-org.20260403163113.tar"
GUIDES_DIR = REPO_ROOT / "src" / "content" / "guides"
HOWTO_DIR = REPO_ROOT / "src" / "content" / "howto"
REPORT_PATH = REPO_ROOT / "src" / "data" / "featured-image-recovery.json"


@dataclass
class TargetPost:
    collection: str
    slug: str
    post_id: int
    title: str


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


def iter_insert_rows(sql_path: Path, table_name: str):
    prefix = f"INSERT INTO `{table_name}` VALUES"
    collecting = False
    buffer: list[str] = []

    with sql_path.open("r", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            if not collecting and line.startswith(prefix):
                collecting = True
                buffer = [line.split("VALUES", 1)[1]]
                if line.rstrip().endswith(";"):
                    yield from parse_sql_rows("".join(buffer).rstrip(";\n"))
                    collecting = False
                continue

            if collecting:
                buffer.append(line)
                if line.rstrip().endswith(";"):
                    yield from parse_sql_rows("".join(buffer).rstrip(";\n"))
                    collecting = False


def load_targets() -> dict[int, TargetPost]:
    posts_summary = json.loads(POSTS_SUMMARY_PATH.read_text(encoding="utf-8"))["posts"]
    guides = {path.stem for path in GUIDES_DIR.glob("*.md")}
    howto = {path.stem for path in HOWTO_DIR.glob("*.md")}
    targets: dict[int, TargetPost] = {}

    for post in posts_summary:
        slug = post["slug"]
        if slug in guides:
            targets[int(post["ID"])] = TargetPost("guides", slug, int(post["ID"]), post["title"])
        elif slug in howto:
            targets[int(post["ID"])] = TargetPost("howto", slug, int(post["ID"]), post["title"])

    return targets


def build_featured_image_report() -> dict[str, object]:
    targets = load_targets()
    thumbnail_ids: dict[int, int] = {}
    attachment_files: dict[int, str] = {}

    for row in iter_insert_rows(SQL_DUMP_PATH, "wp_postmeta"):
        if len(row) != 4:
            continue
        _, post_id_raw, meta_key, meta_value = row
        try:
            post_id = int(post_id_raw)
        except (TypeError, ValueError):
            continue

        if meta_key == "_thumbnail_id" and post_id in targets and meta_value:
            thumbnail_ids[post_id] = int(meta_value)
        elif meta_key == "_wp_attached_file" and meta_value:
            attachment_files[post_id] = str(meta_value)

    report: dict[str, object] = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "tarPath": str(TAR_PATH),
        "targets": [],
        "summary": {
            "guides": {"total": 0, "withFeaturedImage": 0},
            "howto": {"total": 0, "withFeaturedImage": 0},
        },
    }

    for target in sorted(targets.values(), key=lambda item: (item.collection, item.slug)):
        report["summary"][target.collection]["total"] += 1
        attachment_id = thumbnail_ids.get(target.post_id)
        attached_file = attachment_files.get(attachment_id) if attachment_id else None
        if attached_file:
            report["summary"][target.collection]["withFeaturedImage"] += 1

        report["targets"].append(
            {
                "collection": target.collection,
                "slug": target.slug,
                "postId": target.post_id,
                "title": target.title,
                "thumbnailId": attachment_id,
                "attachedFile": attached_file,
            }
        )

    return report


def main():
    report = build_featured_image_report()
    REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {REPORT_PATH}")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
