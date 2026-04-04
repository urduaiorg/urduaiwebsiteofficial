#!/usr/bin/env python3
"""
recover_blog_images.py
Match blog posts missing image: frontmatter to their WordPress featured images.
Steps:
  1. Find all blog .md files with no image: field
  2. Look up their WordPress post ID in wp_posts_summary.json
  3. Parse SQL dump for _thumbnail_id -> _wp_attached_file
  4. Extract matching files from the 27GB tar
  5. Write to public/images/blog/[slug].jpg
  6. Update frontmatter image: field in the .md file
"""
from __future__ import annotations

import json
import os
import re
import sys
import tarfile
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parents[2]
REPO = Path(__file__).resolve().parents[1]
SQL = WORKSPACE / "u374839636_BmBry.sql"
TAR = WORKSPACE / "u374839636.urduai-org.20260403163113.tar"
POSTS_JSON = WORKSPACE / "wp_posts_summary.json"
BLOG_DIR = REPO / "src" / "content" / "blog"
IMG_OUT = REPO / "public" / "images" / "blog"


# ── SQL helpers (same pattern as existing scripts) ───────────────────────────

def decode_mysql_escape(ch: str) -> str:
    return {"0": "\0", "b": "\b", "n": "\n", "r": "\r", "t": "\t",
            "Z": "\x1a", "'": "'", '"': '"', "\\": "\\"}.get(ch, ch)


def parse_sql_rows(text: str) -> list[list]:
    rows, cur, tok, in_s, esc = [], None, [], False, False
    def flush():
        raw = "".join(tok).strip(); tok.clear()
        return None if raw == "NULL" else raw
    for c in text:
        if in_s:
            if esc: tok.append(decode_mysql_escape(c)); esc = False
            elif c == "\\": esc = True
            elif c == "'": in_s = False
            else: tok.append(c)
        elif c == "'": in_s = True
        elif c == "(": cur = []
        elif c == ",":
            if cur is not None: cur.append(flush())
        elif c == ")":
            if cur is not None:
                cur.append(flush()); rows.append(cur); cur = None
        elif cur is not None and c not in "\n\r":
            tok.append(c)
    return rows


def iter_insert_rows(table: str):
    prefix = f"INSERT INTO `{table}` VALUES"
    collecting, buf = False, []
    with SQL.open("r", encoding="utf-8", errors="replace") as fh:
        for line in fh:
            if not collecting and line.startswith(prefix):
                collecting = True
                buf = [line.split("VALUES", 1)[1]]
                if line.rstrip().endswith(";"):
                    yield from parse_sql_rows("".join(buf).rstrip(";\n"))
                    collecting = False
                continue
            if collecting:
                buf.append(line)
                if line.rstrip().endswith(";"):
                    yield from parse_sql_rows("".join(buf).rstrip(";\n"))
                    collecting = False


# ── Main logic ────────────────────────────────────────────────────────────────

def load_slug_to_post_id() -> dict[str, int]:
    data = json.loads(POSTS_JSON.read_text(encoding="utf-8"))
    return {p["slug"]: int(p["ID"]) for p in data["posts"]}


def find_no_image_slugs() -> list[str]:
    slugs = []
    for md in sorted(BLOG_DIR.glob("*.md")):
        text = md.read_text(encoding="utf-8")
        # Only consider posts without any image: line or with blank image:
        if not re.search(r'^image:\s*["\'][^"\']+["\']', text, re.MULTILINE):
            slugs.append(md.stem)
    return slugs


def build_attachment_map(target_post_ids: set[int]) -> dict[int, str]:
    """Returns {post_id: wp-content/uploads/... path}"""
    thumb_ids: dict[int, int] = {}     # post_id -> attachment_id
    attach_files: dict[int, str] = {}  # attachment_id -> file path

    print("Scanning SQL postmeta (this takes ~60s)…", flush=True)
    for row in iter_insert_rows("wp_postmeta"):
        if len(row) != 4:
            continue
        _, pid_raw, meta_key, meta_val = row
        try:
            pid = int(pid_raw)
        except (TypeError, ValueError):
            continue

        if meta_key == "_thumbnail_id" and pid in target_post_ids and meta_val:
            thumb_ids[pid] = int(meta_val)
        elif meta_key == "_wp_attached_file" and meta_val:
            attach_files[pid] = str(meta_val)

    # Resolve post_id -> file path
    result: dict[int, str] = {}
    for post_id, att_id in thumb_ids.items():
        if att_id in attach_files:
            result[post_id] = attach_files[att_id]
    return result


def extract_from_tar(tar_paths: list[str], slug_map: dict[str, str]) -> dict[str, Path]:
    """Extract needed files from tar. slug_map: {tar_member_path: dest_slug}"""
    needed = {f"./domains/urduai.org/public_html/wp-content/uploads/{p}": slug
              for p, slug in slug_map.items()}
    # Also try without leading ./
    needed_short = {f"domains/urduai.org/public_html/wp-content/uploads/{p}": slug
                    for p, slug in slug_map.items()}

    extracted: dict[str, Path] = {}
    print(f"Scanning tar for {len(needed)} images…", flush=True)
    IMG_OUT.mkdir(parents=True, exist_ok=True)

    with tarfile.open(TAR, "r") as tf:
        for member in tf:
            name = member.name.lstrip("./")
            target_slug = needed.get(name) or needed_short.get(name)
            if not target_slug:
                continue
            dest = IMG_OUT / f"{target_slug}.jpg"
            if dest.exists():
                extracted[target_slug] = dest
                continue
            fobj = tf.extractfile(member)
            if fobj:
                dest.write_bytes(fobj.read())
                extracted[target_slug] = dest
                print(f"  extracted → {dest.name}", flush=True)
            if len(extracted) >= len(slug_map):
                break

    return extracted


def update_frontmatter(slug: str) -> None:
    md_path = BLOG_DIR / f"{slug}.md"
    if not md_path.exists():
        return
    text = md_path.read_text(encoding="utf-8")
    # Insert image: after date: line if not present
    img_line = f'image: "/images/blog/{slug}.jpg"'
    if "image:" not in text[:500]:
        # Add after author: or date: line inside frontmatter
        text = re.sub(
            r'(^draft:\s*false)',
            f'{img_line}\n\\1',
            text,
            count=1,
            flags=re.MULTILINE,
        )
        md_path.write_text(text, encoding="utf-8")


def main():
    print("Step 1: Finding blog posts with no image…")
    no_img_slugs = find_no_image_slugs()
    print(f"  {len(no_img_slugs)} posts have no image: field")

    print("Step 2: Mapping slugs to WordPress post IDs…")
    slug_to_id = load_slug_to_post_id()
    matched: dict[int, str] = {}  # post_id -> slug
    for slug in no_img_slugs:
        pid = slug_to_id.get(slug)
        if pid:
            matched[pid] = slug
    print(f"  {len(matched)} slugs found in wp_posts_summary")

    if not matched:
        print("Nothing to do.")
        return

    print("Step 3: Finding featured image paths in SQL…")
    post_id_to_file = build_attachment_map(set(matched.keys()))
    print(f"  {len(post_id_to_file)} posts have a featured image in the backup")

    if not post_id_to_file:
        print("No featured images found.")
        return

    # Build tar_path -> slug map
    tar_to_slug: dict[str, str] = {}
    for pid, filepath in post_id_to_file.items():
        tar_to_slug[filepath] = matched[pid]

    print("Step 4: Extracting from tar archive…")
    extracted = extract_from_tar(list(tar_to_slug.keys()), tar_to_slug)
    print(f"  Extracted {len(extracted)} images")

    print("Step 5: Updating frontmatter…")
    for slug in extracted:
        update_frontmatter(slug)
        print(f"  updated frontmatter: {slug}")

    print(f"\nDone. {len(extracted)} blog covers recovered and frontmatter updated.")


if __name__ == "__main__":
    main()
