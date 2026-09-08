#!/usr/bin/env python3
"""Verify actual Urdu glyph IDs, positions and advances at every site weight.

Run build.py first. Requires HarfBuzz hb-shape on PATH. This checks shaping,
not rasterization; also inspect the release in the mobile browser.
"""
from pathlib import Path
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[2]
CACHE = ROOT / 'tmp/font-sources'
samples = set()
for path in sorted((ROOT / 'src').rglob('*')):
    if path.suffix not in {'.md', '.astro'}:
        continue
    runs = re.findall(r'[\u0600-\u06ff\u200c-\u200e\u00a0\u2010-\u2011\ufdfa ]{4,}', path.read_text())
    # Every content file contributes its opening and one longer prose run.
    samples.update(run.strip()[:240] for run in runs[:2] if run.strip())
    if runs:
        samples.add(max(runs, key=len).strip()[:240])
samples.update(['مصنوعی ذہانت اردو اے آئی', 'انگریزی بولنے کی مشق', 'پڑھائی، لکھائی اور روزمرہ کے کام', 'ﷺ', 'ٹ ڈ ڑ ں ھ ہ ۂ ے ی ک گ چ پ', '۱۲۳۴۵۶۷۸۹۰ ١٢٣٤٥٦٧٨٩٠'])
text = '\n'.join(sorted(samples))
text_file = CACHE / 'shaping-samples.txt'
text_file.write_text(text)
results = []
for weight in (400, 500, 600, 700):
    common = [f'--text-file={text_file}', '--no-glyph-names', '--output-format=json',
              '--direction=rtl', '--script=arab', '--language=ur', f'--variations=wght={weight}']
    original = subprocess.check_output(['hb-shape', str(CACHE / 'urdu-original.ttf'), *common])
    subset = subprocess.check_output(['hb-shape', str(CACHE / 'urdu-basic.ttf'), *common])
    if original != subset:
        for number, (left, right) in enumerate(zip(original.splitlines(), subset.splitlines())):
            if left != right:
                raise SystemExit(f'Shaping mismatch at weight {weight}, sample {number}: {sorted(samples)[number]}')
        raise SystemExit(f'Shaping output lengths differ at weight {weight}')
    results.append({'weight': weight, 'samples': len(samples), 'match': True,
                    'sha256': hashlib.sha256(original).hexdigest()})
print(json.dumps({'text_characters': len(text), 'results': results}, indent=2))
