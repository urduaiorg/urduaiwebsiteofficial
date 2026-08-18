from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import quote


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

# Urdu AI Ustad subdomain -> permanent programme URL
RewriteCond %{HTTP_HOST} ^ustad\\.urduai\\.org$ [NC]
RewriteRule ^.*$ https://urduai.org/ustad [R=301,L]

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
RedirectMatch 301 ^/tag/google-gemini/?$ /learn/google-gemini/
RedirectMatch 301 ^/tag/(?!(google-ai-studio|gemini-ai)/?$).*$ /blog/
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
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.googletagservices.com https://www.googletagmanager.com https://www.google-analytics.com https://unpkg.com https://html2canvas.hertzen.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; frame-src 'self' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.youtube.com https://www.youtube-nocookie.com https://api.netlify.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://api.github.com https://api.netlify.com https://urai-cert.qaisar-roonjha.workers.dev https://urai-cert.urduai.workers.dev; font-src 'self' data: https:;"
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

MANUAL_LEGACY_REDIRECTS = [
    ("ریڈ-سی-وی-اور-پرپلکسٹی-ایک-نیا-ڈیجیٹل-آ", "/blog/red-cv-and-perplexity-a-new-digital-beginning/"),
    ("اے-آئی-اب-آپ-کی-زبان-بولے-گی", "/blog/does-omnilingual-asr-understand-your-language-too-over-1600-languages-now-in-one-system/"),
    ("اے-آئی-سے-بات-کرنے-کے-طریقے", "/blog/chatgpt-complete-urdu-guide/"),
    ("اے-آئی-سے-اعلی-معیار-کی-تصاویر-کیسے-بنوا", "/blog/best-ai-image-generators-urdu-guide/"),
    ("چیٹ-جی-پی-ٹی-کی-نئی-اپڈیٹس", "/blog/chatgpt-complete-urdu-guide/"),
    ("اے-آئی-کے-نئے-ٹولز", "/blog/12-best-ai-tools-that-make-work-faster-and-easier/"),
    ("اے-آئی-کے-دور-میں-بچوں-کی-تعلیم", "/blog/ai-and-children-education-training-and-a-bright-future/"),
    ("اے-آئی-ٹولز-اور-پروسیس", "/blog/12-best-ai-tools-that-make-work-faster-and-easier/"),
    ("اے-آئی-کے-ذریعے-کیسے-نوکریوں-کے-لئے-اپلا", "/how-to/how-to-write-cv-with-chatgpt/"),
    ("اے-آئی-کے-ذریعے-نوکری-کے-لئے-کیسے-اپلائی", "/how-to/how-to-write-cv-with-chatgpt/"),
    ("وٹزایپ-میں-میٹا-اے-آئی-کو-کیسے-استعمال-ک", "/blog/whatsapp-bringing-new-change-to-meta-ai-chatbot/"),
    ("اردو-اےآئی-سے-لکھ-اور-بول-کربات-کریں۔", "/blog/chatgpt-for-urdu-ai-writers/"),
    ("سورا-آگیا-ہے-کیا-آپ-تیار-ہیں؟", "/blog/sora-is-launched/"),
    ("class", "/courses/masterclass/"),
    ("gpt", "/chat/"),
    ("elementor-453", "/learn/artificial-intelligence/"),
    ("elementor-551", "/blog/chat-gpt-health-who-is-it-for-and-how-does-it-work/"),
    ("openais-new-model-gpt-4-1-when-writing-code-was-also-entrusted-to-ai", "/blog/the-arrival-of-gpt-4-1-a-new-era-of-programming/"),
    ("کو-پائلیٹ-کیسے-مدد-کریگا", "/blog/urdu-ai-interview-with-copilot/"),
    ("اے-آئی-کے-ذریعے-اپنے-پیسے-واپس-لئے", "/blog/will-the-subscription-service-for-the-meta-ai-chatbot-be-successful/"),
    ("میٹا-اے-آئی-کے-بنیادی-کورسزکی-تیسری-کلا", "/blog/meta-and-artificial-intelligence/"),
    ("میٹا-اے-آئی-کے-بنیادی-کورسزکی-دوسری-کلا", "/blog/meta-and-artificial-intelligence/"),
    ("ایلون-مسک-کی-انقلابی-ایجادات۔", "/blog/post-2594/"),
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
        "https://ustad.urduai.org/* https://urduai.org/ustad 301",
        "",
        "# Generic WordPress patterns",
        *GENERIC_RULES,
        "",
        "# WordPress tag archives — redirect to blog",
        "/tag/gemini-ai/ /tag/gemini-ai/ 200",
        "/tag/google-ai-studio/ /tag/google-ai-studio/ 200",
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
        "# Manual high-volume legacy redirects",
        *(format_rule(source, target) for source, target in MANUAL_LEGACY_REDIRECTS),
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
        "# Manual high-volume legacy redirects",
        *(format_the_request_rewrite(quote(source), target) for source, target in MANUAL_LEGACY_REDIRECTS),
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
