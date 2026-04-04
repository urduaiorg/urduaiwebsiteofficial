#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path


WORKSPACE_ROOT = Path(__file__).resolve().parents[2]
REPO_ROOT = Path(__file__).resolve().parents[1]
SQL_DUMP_PATH = WORKSPACE_ROOT / "u374839636_BmBry.sql"
POSTS_SUMMARY_PATH = WORKSPACE_ROOT / "wp_posts_summary.json"
HOWTO_DIR = REPO_ROOT / "src" / "content" / "howto"
REPORT_PATH = REPO_ROOT / "src" / "data" / "howto-inline-assets.json"

UPLOAD_PATTERN = re.compile(
    r"https?://urduai\.org/wp-content/uploads/([^\"' )>]+)",
    re.IGNORECASE,
)


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


def load_howto_targets() -> dict[int, dict[str, str]]:
    howto_slugs = {path.stem for path in HOWTO_DIR.glob("*.md")}
    posts = json.loads(POSTS_SUMMARY_PATH.read_text(encoding="utf-8"))["posts"]
    targets: dict[int, dict[str, str]] = {}
    for post in posts:
        if post["slug"] in howto_slugs:
            targets[int(post["ID"])] = {
                "slug": post["slug"],
                "title": post["title"],
            }
    return targets


def build_report() -> dict[str, object]:
    targets = load_howto_targets()
    matched = []

    for row in iter_insert_rows(SQL_DUMP_PATH, "wp_posts"):
        if len(row) < 6:
            continue
        try:
            post_id = int(row[0])
        except (TypeError, ValueError):
            continue

        if post_id not in targets:
            continue

        post_content = str(row[4] or "")
        asset_paths = sorted(set(UPLOAD_PATTERN.findall(post_content)))
        matched.append(
            {
                "postId": post_id,
                "slug": targets[post_id]["slug"],
                "title": targets[post_id]["title"],
                "inlineUploads": asset_paths,
                "inlineUploadCount": len(asset_paths),
            }
        )

    matched.sort(key=lambda item: item["slug"])
    posts_with_inline = sum(1 for item in matched if item["inlineUploadCount"] > 0)
    inline_upload_total = sum(item["inlineUploadCount"] for item in matched)

    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "summary": {
            "totalHowtoPosts": len(matched),
            "postsWithInlineUploads": posts_with_inline,
            "inlineUploadTotal": inline_upload_total,
        },
        "targets": matched,
    }


def main():
    report = build_report()
    REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {REPORT_PATH}")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
