from __future__ import annotations

import json
import re
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
WORKSPACE_ROOT = REPO_ROOT.parent

SLUG_MAP_PATH = WORKSPACE_ROOT / "slug_map.json"
POSTS_SUMMARY_PATH = WORKSPACE_ROOT / "wp_posts_summary.json"
OUTPUT_PATH = REPO_ROOT / "public" / "_redirects"
HTACCESS_PATH = REPO_ROOT / "public" / ".htaccess"

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

HTACCESS_HEADER = """# urduai.org — generated WordPress to Astro redirects for Hostinger/LiteSpeed
# Regenerate with: python3 scripts/generate_redirects.py

RewriteEngine On

# Canonical host: www -> non-www
RewriteCond %{HTTP_HOST} ^www\\.urduai\\.org$ [NC]
RewriteRule ^(.*)$ https://urduai.org/$1 [R=301,L]

# WordPress numeric post URLs and common legacy query variants
RewriteCond %{QUERY_STRING} (^|&)p= [NC,OR]
RewriteCond %{QUERY_STRING} (^|&)page_id= [NC,OR]
RewriteCond %{QUERY_STRING} (^|&)attachment_id= [NC]
RewriteRule ^.*$ /? [R=301,L]

# Generic WordPress patterns
RedirectMatch 301 ^/category/blog/.*$ /blog/
RedirectMatch 301 ^/category/videos/.*$ /blog/
RedirectMatch 301 ^/category/guides/.*$ /guides/
RedirectMatch 301 ^/category/how-to/.*$ /how-to/
RedirectMatch 301 ^/category/prompts/.*$ /prompts/
RedirectMatch 301 ^/category/learn/.*$ /learn/
RedirectMatch 301 ^/tag/google-ai-studio/?$ /blog/google-ai-studio-kia-hai/
RedirectMatch 301 ^/tag/gemini-ai/?$ /learn/google-gemini/
RedirectMatch 301 ^/tag/google-gemini/?$ /learn/google-gemini/
RedirectMatch 301 ^/tag/.*$ /blog/
RedirectMatch 301 ^/wp-content/uploads/(.*)$ /images/$1
RedirectMatch 301 ^/wp-admin/?$ /
RedirectMatch 301 ^/wp-login\\.php$ /
RedirectMatch 301 ^/feed/?$ /rss.xml

# Legacy tool pages
RedirectMatch 301 ^/urduai-chatgpt/?$ /chat/
RedirectMatch 301 ^/urduai-chat/?$ /chat/
RedirectMatch 301 ^/urduai-code/?$ /code/
"""

HTACCESS_FOOTER = """
<IfModule mod_headers.c>
  Header always unset Content-Security-Policy
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.googletagservices.com https://www.google-analytics.com https://unpkg.com https://html2canvas.hertzen.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src 'self' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.youtube.com https://www.youtube-nocookie.com https://api.netlify.com; connect-src 'self' https://www.google-analytics.com https://pagead2.googlesyndication.com https://region1.google-analytics.com https://api.github.com https://api.netlify.com https://urai-cert.qaisar-roonjha.workers.dev https://urai-cert.urduai.workers.dev; font-src 'self' data: https:;"
</IfModule>
"""

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

SPECIAL_REDIRECTS = [
    ("blog/ai-image-expression-prompts-urdu-guide", "/guides/ai-image-expression-prompts-urdu-guide/"),
]


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


def format_redirect_match(source: str, target: str) -> str:
    escaped_source = re.escape(source)
    return f"RedirectMatch 301 ^/{escaped_source}/?$ {target}"


def format_request_uri_rewrite(source: str, target: str) -> str:
    escaped_source = re.escape(source)
    return "\n".join([
        f"RewriteCond %{{REQUEST_URI}} ^/{escaped_source}/?(?:\\?.*)?$ [NC]",
        f"RewriteRule ^ {target} [R=301,L]",
    ])


def format_the_request_rewrite(source: str, target: str) -> str:
    escaped_source = re.escape(source)
    return "\n".join([
        f"RewriteCond %{{THE_REQUEST}} \\s/+{escaped_source}/?(?:\\?|\\s) [NC]",
        f"RewriteRule ^ {target} [R=301,L]",
    ])


def write_redirects() -> tuple[int, int]:
    content_redirects = build_content_redirects()
    page_redirects = build_page_redirects()

    lines = [
        "# urduai.org — generated WordPress to Astro redirects",
        "# Regenerate with: python3 scripts/generate_redirects.py",
        "",
        "# www → non-www canonical redirect",
        "https://www.urduai.org/* https://urduai.org/:splat 301",
        "",
        "# Generic WordPress patterns",
        *GENERIC_RULES,
        "",
        "# WordPress tag archives — redirect to blog",
        "/tag/google-ai-studio/ /blog/google-ai-studio-kia-hai/ 301",
        "/tag/gemini-ai/ /learn/google-gemini/ 301",
        "/tag/google-gemini/ /learn/google-gemini/ 301",
        "/tag/* /blog/ 301",
        "",
        "# Legacy tool pages",
        "/urduai-chatgpt/ /chat/ 301",
        "/urduai-chat/ /chat/ 301",
        "/urduai-code/ /code/ 301",
        "",
        "# Special canonical moves",
        *(format_rule(source, target) for source, target in SPECIAL_REDIRECTS),
        "",
        "# Renamed static pages",
        *(format_rule(source, target) for source, target in page_redirects),
        "",
        "# Mapped content slugs",
        *(format_rule(source, target) for source, target in content_redirects),
        "",
    ]

    OUTPUT_PATH.write_text("\n".join(lines), encoding="utf-8")

    htaccess_lines = [
        HTACCESS_HEADER.rstrip(),
        "",
        "# Renamed static pages",
        *(format_redirect_match(source, target) for source, target in page_redirects),
        "",
        "# Special canonical moves",
        *(format_redirect_match(source, target) for source, target in SPECIAL_REDIRECTS),
        "",
        "# Mapped content slugs",
        *(format_the_request_rewrite(source, target) for source, target in content_redirects),
        "",
        HTACCESS_FOOTER.strip(),
        "",
    ]
    HTACCESS_PATH.write_text("\n".join(htaccess_lines), encoding="utf-8")
    return len(page_redirects), len(content_redirects)


if __name__ == "__main__":
    page_count, content_count = write_redirects()
    print(f"Wrote {OUTPUT_PATH}")
    print(f"Wrote {HTACCESS_PATH}")
    print(f"Static page redirects: {page_count}")
    print(f"Content redirects: {content_count}")
