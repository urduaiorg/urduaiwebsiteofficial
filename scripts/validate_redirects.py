from __future__ import annotations

import argparse
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin
from urllib.request import HTTPRedirectHandler, Request, build_opener


REPO_ROOT = Path(__file__).resolve().parents[1]
HTACCESS_PATH = REPO_ROOT / "public" / ".htaccess"
REDIRECTS_PATH = REPO_ROOT / "public" / "_redirects"

EXPECTED_STATIC_SNIPPETS = [
    "RewriteCond %{HTTP_HOST} ^www\\.urduai\\.org$ [NC]",
    "RewriteCond %{HTTP_HOST} ^ustad\\.urduai\\.org$ [NC]",
    "RewriteCond %{QUERY_STRING} (^|&)p= [NC,OR]",
    "RedirectMatch 301 ^/category/blog/.*$ /blog/",
    "RedirectMatch 301 ^/tag/google-gemini/?$ /learn/google-gemini/",
    "RedirectMatch 301 ^/tag/(?!(google-ai-studio|gemini-ai)/?$).*$ /blog/",
    "RedirectMatch 301 ^/wp-content/uploads/(.*)$ /images/$1",
    "RedirectMatch 301 ^/urduai-chatgpt/?$ /chat/",
    "RedirectMatch 301 ^/blog/ai\\-image\\-expression\\-prompts\\-urdu\\-guide/?$ /guides/ai-image-expression-prompts-urdu-guide/",
    "RedirectMatch 301 ^/blogs/?$ /blog/",
    "RedirectMatch 301 ^/about\\-us/?$ /about/",
    "RewriteCond %{THE_REQUEST} \\s/+12\\-best\\-ai\\-tools\\-that\\-make\\-work\\-faster\\-and\\-easier/?(?:\\?|\\s) [NC]",
    "RewriteRule ^ /blog/12-best-ai-tools-that-make-work-faster-and-easier/ [R=301,L]",
    "RewriteCond %{THE_REQUEST} \\s/+ai\\-kya\\-hai\\-urdu\\-ai\\-master\\-class\\-1/?(?:\\?|\\s) [NC]",
    "RewriteRule ^ /guides/ai-kya-hai-urdu-ai-master-class-1/ [R=301,L]",
    "RewriteRule ^ /blog/red-cv-and-perplexity-a-new-digital-beginning/ [R=301,L]",
    "RewriteRule ^ /courses/masterclass/ [R=301,L]",
    "RewriteRule ^ /chat/ [R=301,L]",
]

EXPECTED_LIVE_REDIRECTS = [
    ("https://www.urduai.org/", "https://urduai.org/"),
    ("/tag/google-gemini/", "/learn/google-gemini/"),
    ("/category/blog/openai/", "/blog/"),
    ("/wp-content/uploads/2025/01/example.jpg", "/images/2025/01/example.jpg"),
    ("/wp-admin", "/"),
    ("/wp-login.php", "/"),
    ("/feed/", "/rss.xml"),
    ("/urduai-chatgpt/", "/chat/"),
    ("/blog/ai-image-expression-prompts-urdu-guide/", "/guides/ai-image-expression-prompts-urdu-guide/"),
    ("/blogs/", "/blog/"),
    ("/about-us/", "/about/"),
    ("/12-best-ai-tools-that-make-work-faster-and-easier/", "/blog/12-best-ai-tools-that-make-work-faster-and-easier/"),
    ("/ai-kya-hai-urdu-ai-master-class-1/", "/guides/ai-kya-hai-urdu-ai-master-class-1/"),
    ("/%D8%B1%DB%8C%DA%88-%D8%B3%DB%8C-%D9%88%DB%8C-%D8%A7%D9%88%D8%B1-%D9%BE%D8%B1%D9%BE%D9%84%DA%A9%D8%B3%D9%B9%DB%8C-%D8%A7%DB%8C%DA%A9-%D9%86%DB%8C%D8%A7-%DA%88%DB%8C%D8%AC%DB%8C%D9%B9%D9%84-%D8%A2/", "/blog/red-cv-and-perplexity-a-new-digital-beginning/"),
    ("/class/", "/courses/masterclass/"),
    ("/gpt", "/chat/"),
    ("/?p=123", "/"),
]


class NoRedirectHandler(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

    def http_error_301(self, req, fp, code, msg, headers):
        return fp

    http_error_302 = http_error_301
    http_error_303 = http_error_301
    http_error_307 = http_error_301
    http_error_308 = http_error_301


def assert_static_files() -> list[str]:
    failures: list[str] = []
    htaccess = HTACCESS_PATH.read_text(encoding="utf-8")
    redirects = REDIRECTS_PATH.read_text(encoding="utf-8")

    for snippet in EXPECTED_STATIC_SNIPPETS:
        if snippet not in htaccess:
            failures.append(f"Missing .htaccess rule: {snippet}")

    if "https://www.urduai.org/* https://urduai.org/:splat 301" not in redirects:
        failures.append("Missing _redirects www canonical rule")
    if "https://ustad.urduai.org/* https://urduai.org/ustad 301" not in redirects:
        failures.append("Missing _redirects Ustad subdomain rule")
    if "/tag/* /blog/ 301" not in redirects:
        failures.append("Missing _redirects tag archive rule")
    if "/tag/google-ai-studio/ /tag/google-ai-studio/ 200" not in redirects:
        failures.append("Missing _redirects Google AI Studio tag preservation rule")
    if "/tag/gemini-ai/ /tag/gemini-ai/ 200" not in redirects:
        failures.append("Missing _redirects Gemini AI tag rule")
    if "/?p=*                    /                      301" not in redirects:
        failures.append("Missing _redirects WordPress ?p rule")

    return failures


def request_once(url: str):
    request = Request(url, method="HEAD", headers={"User-Agent": "UrduAI-Redirect-Validator/1.0"})
    opener = build_opener(NoRedirectHandler)
    try:
        return opener.open(request, timeout=15)
    except HTTPError as error:
        return error
    except URLError:
        request = Request(url, method="GET", headers={"User-Agent": "UrduAI-Redirect-Validator/1.0"})
        return opener.open(request, timeout=15)


def assert_live_redirects(base_url: str) -> list[str]:
    failures: list[str] = []
    base_url = base_url.rstrip("/") + "/"

    for source, expected_target in EXPECTED_LIVE_REDIRECTS:
        url = source if source.startswith("https://") else urljoin(base_url, source.lstrip("/"))
        expected = expected_target if expected_target.startswith("https://") else urljoin(base_url, expected_target.lstrip("/"))

        try:
            response = request_once(url)
        except Exception as exc:
            failures.append(f"{url} request failed: {exc}")
            continue

        status = getattr(response, "status", response.getcode())
        location = response.headers.get("Location", "")
        if status == 404:
            failures.append(f"{url} returned 404; expected 301 to {expected}")
            continue
        if status not in {301, 308}:
            failures.append(f"{url} returned {status}; expected 301 to {expected}")
            continue
        if not location.startswith(expected):
            failures.append(f"{url} redirected to {location}; expected {expected}")

    return failures


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate UrduAI legacy redirect coverage.")
    parser.add_argument("--base-url", help="Optional deployed site URL for live HTTP redirect checks.")
    args = parser.parse_args()

    failures = assert_static_files()
    if args.base_url:
        failures.extend(assert_live_redirects(args.base_url))

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1

    print("Redirect validation passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
