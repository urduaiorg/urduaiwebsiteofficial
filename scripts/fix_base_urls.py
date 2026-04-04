#!/usr/bin/env python3
"""
fix_base_urls.py — fix GitHub Pages base URL for all .astro internal links.
Replaces href="/<path>" → href={`${base}/<path>`}
Adds `const base = import.meta.env.BASE_URL.replace(/\/$/, '');` to frontmatter.
"""
import re
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
ASTRO_DIRS = [
    REPO / "src" / "layouts",
    REPO / "src" / "pages",
    REPO / "src" / "components",
]
BASE_VAR = "const base = import.meta.env.BASE_URL.replace(/\\/$/, '');"


def add_base_to_frontmatter(content: str) -> str:
    if "const base" in content:
        return content  # already has const base, nothing to add
    # Split on first two --- markers
    idx1 = content.index("---")
    idx2 = content.index("---", idx1 + 3)
    fm = content[idx1:idx2]
    return content[:idx2] + BASE_VAR + "\n" + content[idx2:]


def fix_hrefs(content: str) -> str:
    """Replace href="/<path>" → href={`${base}/<path>`} skipping external/hash."""
    def replacer(m):
        path = m.group(1)
        if path.startswith(("http://", "https://", "#", "mailto:", "tel:")):
            return m.group(0)
        return f'href={{`${{base}}{path}`}}'
    return re.sub(r'href="(\/[^"]*)"', replacer, content)


def process_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")

    # Only process files with a frontmatter block
    if not original.startswith("---"):
        return False

    content = original
    content = add_base_to_frontmatter(content)
    content = fix_hrefs(content)

    if content != original:
        path.write_text(content, encoding="utf-8")
        return True
    return False


def main():
    changed, skipped = [], []
    for d in ASTRO_DIRS:
        for f in sorted(d.rglob("*.astro")):
            (changed if process_file(f) else skipped).append(f.relative_to(REPO))

    print(f"Fixed {len(changed)} files:")
    for p in changed:
        print(f"  {p}")
    print(f"\nSkipped {len(skipped)} (no frontmatter or no changes needed):")
    for p in skipped:
        print(f"  {p}")


if __name__ == "__main__":
    main()
