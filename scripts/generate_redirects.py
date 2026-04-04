from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
WORKSPACE_ROOT = REPO_ROOT.parent

SLUG_MAP_PATH = WORKSPACE_ROOT / "slug_map.json"
POSTS_SUMMARY_PATH = WORKSPACE_ROOT / "wp_posts_summary.json"
OUTPUT_PATH = REPO_ROOT / "public" / "_redirects"

GENERIC_RULES = [
    "/category/blog/*         /blog/                 301",
    "/category/videos/*       /blog/                 301",
    "/category/guides/*       /guides/               301",
    "/category/how-to/*       /how-to/               301",
    "/category/prompts/*      /prompts/              301",
    "/category/learn/*        /learn/                301",
    "/?p=*                    /                      301",
    "/wp-content/uploads/*    /images/*              301",
    "/wp-admin                /                      301",
    "/wp-login.php            /                      301",
    "/feed                    /rss.xml               301",
    "/feed/                   /rss.xml               301",
]

RENAMED_PAGE_RULES = {
    "blogs": "/blog/",
    "about-us": "/about/",
    "contact-us": "/contact/",
    "our-partners": "/partners/",
    "our-team": "/team/",
    "privacy-policy": "/privacy/",
    "masterclass": "/courses/masterclass/",
    "automation": "/courses/automation/",
    "champs": "/courses/champs/",
    "apps": "/tools/",
    "urduai-master-class-guides": "/guides/",
}


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def discover_collection_slug_sets() -> dict[str, set[str]]:
    return {
        "blog": {path.stem for path in (REPO_ROOT / "src/content/blog").glob("*.md")},
        "guides": {path.stem for path in (REPO_ROOT / "src/content/guides").glob("*.md")},
        "how-to": {path.stem for path in (REPO_ROOT / "src/content/howto").glob("*.md")},
    }


def build_content_redirects() -> list[tuple[str, str]]:
    slug_map = load_json(SLUG_MAP_PATH)
    collection_slugs = discover_collection_slug_sets()
    redirects: list[tuple[str, str]] = []

    for old_slug, new_slug in slug_map.items():
        for collection, slugs in collection_slugs.items():
            if new_slug in slugs:
                redirects.append((old_slug, f"/{collection}/{new_slug}/"))
                break

    redirects.sort(key=lambda item: item[0])
    return redirects


def build_page_redirects() -> list[tuple[str, str]]:
    pages = load_json(POSTS_SUMMARY_PATH)["pages"]
    available_page_slugs = {page["slug"] for page in pages}
    redirects = [
        (old_slug, target)
        for old_slug, target in RENAMED_PAGE_RULES.items()
        if old_slug in available_page_slugs
    ]
    redirects.sort(key=lambda item: item[0])
    return redirects


def format_rule(source: str, target: str) -> str:
    return f"/{source}/ {target} 301"


def write_redirects() -> tuple[int, int]:
    content_redirects = build_content_redirects()
    page_redirects = build_page_redirects()

    lines = [
        "# urduai.org — generated WordPress to Astro redirects",
        "# Regenerate with: python3 repo/scripts/generate_redirects.py",
        "",
        "# Generic WordPress patterns",
        *GENERIC_RULES,
        "",
        "# Renamed static pages",
        *(format_rule(source, target) for source, target in page_redirects),
        "",
        "# Mapped content slugs",
        *(format_rule(source, target) for source, target in content_redirects),
        "",
    ]

    OUTPUT_PATH.write_text("\n".join(lines), encoding="utf-8")
    return len(page_redirects), len(content_redirects)


if __name__ == "__main__":
    page_count, content_count = write_redirects()
    print(f"Wrote {OUTPUT_PATH}")
    print(f"Static page redirects: {page_count}")
    print(f"Content redirects: {content_count}")
