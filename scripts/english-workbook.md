# English practice workbook

The published Markdown is the content source for the PDF. Edit
`src/content/guides/english-with-ai-urdu.md`, then rebuild the PDF using
`build-english-workbook.py`. The builder adds the cover, 60 practice rows,
self-assessment and source page. It retains all 23 prompt boxes and removes
web download buttons. Review the edition dates in the builder when issuing
another edition; do not change the original June 2026 publication date.

Dependencies: Python 3, WeasyPrint 69 (with Pango), markdown-it-py and
fonttools with WOFF2 support. The normal website build does not require these;
it deploys the reviewed PDF committed in `public/guides/`.

Use the full Noto Nastaliq Urdu Arabic font, not a headline-only subset:
https://fonts.gstatic.com/s/notonastaliqurdu/v23/LhW4MUPbN-oZdNFcBy1-DJYsEoTq5pu3SvoMGdX1OW12.woff2

Provide the approved Montserrat SemiBold font for the controlled white/gold
`Urdu Ai` wordmark. Both fonts are embedded and subset by the PDF renderer.

```sh
DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib python3 scripts/build-english-workbook.py \
  --font /absolute/path/to/noto-nastaliq-urdu-arabic.woff2 \
  --brand-font /absolute/path/to/montserrat-600.ttf \
  --preview /absolute/path/to/workbook-review.html
```

The DYLD setting is only needed for Homebrew macOS. The output defaults to
`public/guides/english-with-ai-urdu.pdf`. Open the final PDF and render every
page before release. Check Urdu shaping, English punctuation, all 23 cards,
60 tracker rows (20 per page), source links and no clipped text. Update the
web edition notice and download copy together. Verify the deployed PDF bytes
and its web page before reporting the new edition live.

This workbook is a personal practice record, not an accredited certificate.
AI tool limits can change; retain the official source links and avoid fluency
guarantees or claims that a second AI's agreement proves correctness.
