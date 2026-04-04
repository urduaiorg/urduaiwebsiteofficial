#!/usr/bin/env python3
from __future__ import annotations

import json
import tarfile
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
REPORT_PATH = REPO_ROOT / "src" / "data" / "featured-image-recovery.json"
GUIDES_CONTENT_DIR = REPO_ROOT / "src" / "content" / "guides"
GUIDES_IMAGE_DIR = REPO_ROOT / "public" / "images" / "guides"
WORKSPACE_ROOT = REPO_ROOT.parent
TAR_PATH = WORKSPACE_ROOT / "u374839636.urduai-org.20260403163113.tar"


def load_guide_targets() -> list[dict[str, object]]:
    report = json.loads(REPORT_PATH.read_text(encoding="utf-8"))
    return [
        item
        for item in report["targets"]
        if item["collection"] == "guides" and str(item.get("attachedFile", "")).lower().endswith(".jpg")
    ]


def extract_guide_images(targets: list[dict[str, object]]) -> list[str]:
    GUIDES_IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    pending = {
        f"wp-content/uploads/{item['attachedFile']}": GUIDES_IMAGE_DIR / f"{item['slug']}.jpg"
        for item in targets
    }
    extracted: list[str] = []

    with tarfile.open(TAR_PATH, "r") as archive:
        for member in archive:
            match = next((suffix for suffix in pending if member.name.endswith(suffix)), None)
            if not match:
                continue

            destination = pending.pop(match)
            source = archive.extractfile(member)
            if source is None:
                continue

            destination.write_bytes(source.read())
            extracted.append(destination.name)

            if not pending:
                break

    if pending:
        missing = ", ".join(sorted(path.name for path in pending.values()))
        raise RuntimeError(f"Failed to extract guide images: {missing}")

    return sorted(extracted)


def sync_frontmatter_image(slug: str):
    markdown_path = GUIDES_CONTENT_DIR / f"{slug}.md"
    content = markdown_path.read_text(encoding="utf-8")
    image_line = f'image: "/images/guides/{slug}.jpg"'

    if "\nimage:" in content:
        lines = []
        for line in content.splitlines():
            if line.startswith("image:"):
                lines.append(image_line)
            else:
                lines.append(line)
        markdown_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return

    lines = content.splitlines()
    updated: list[str] = []
    inserted = False
    for line in lines:
        updated.append(line)
        if line.startswith("level:"):
            updated.append(image_line)
            inserted = True

    if not inserted:
        raise RuntimeError(f"Could not insert image field into {markdown_path}")

    markdown_path.write_text("\n".join(updated) + "\n", encoding="utf-8")


def main():
    targets = load_guide_targets()
    extracted = extract_guide_images(targets)

    for item in targets:
        sync_frontmatter_image(str(item["slug"]))

    print(f"Extracted guide images: {len(extracted)}")
    for name in extracted:
        print(name)


if __name__ == "__main__":
    main()
