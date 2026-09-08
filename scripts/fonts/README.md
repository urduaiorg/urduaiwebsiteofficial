# Shared site fonts

The site keeps Noto Nastaliq Urdu for Urdu and Inter for the existing Latin
brand elements. Font files for ordinary Urdu pages are served locally with
content hashes and a one-year immutable cache. No font family, Urdu line
height, RTL direction or font weight is changed.

`google-fonts-source.css` pins the original Google Fonts CSS2 snapshot.
`build.py` retains all shaping features and variable weights 400–700 in the
basic Arabic/Urdu font, including the full U+0600–06FF block, join controls,
spaces, punctuation and the salutation used in legacy content. The original
Google-hosted face remains available for rarer characters outside that range.
Inter's Latin variable font is limited to the existing 700–800 weight range.
The original Noto Latin face is served locally without a character reduction.
Other script faces retain their original sources and Unicode ranges.

Run with Python 3 and `fonttools[woff]` installed:

```sh
python3 scripts/fonts/build.py
python3 scripts/fonts/verify.py
```

The verification requires `hb-shape` (HarfBuzz). It compares the original and
reduced Urdu font's glyph IDs, positioning and advances for samples from every
content file, at weights 400, 500, 600 and 700. Follow with a production build,
mobile visual checks, live font/cache checks and repeated PageSpeed reports.
Shaping equality does not establish a speed or ranking gain.

Build output includes the generated CSS, the matching Base.astro preload,
hashed WOFF2 files, license copies and `manifest.json`. Source downloads and
TTF inputs for shaping checks stay in ignored `tmp/font-sources/`. Keep prior
hashed files available across a release when older cached pages may use them.
The normal Astro build deploys the checked font files; Python is not a new CI
dependency. The font licenses are the SIL Open Font License 1.1, retained in
this directory and alongside the public fonts.
