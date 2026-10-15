# Urdu Ai editorial preference

Use English digits (`0–9`) whenever numerals appear in Urdu Ai content, including article copy, titles, FAQs, dates, captions, covers, carousels and previews. Do not use Urdu/Persian (`۰–۹`) or Arabic-Indic (`٠–٩`) digit glyphs. This is the user's explicit preference and takes precedence over a skill's numeral-style guidance. Ordinary number words may remain natural Urdu prose.

# Urdu Ai news headlines

For news articles and covers, make the headline state the concrete announcement or change and identify the product or company. The reader should understand what the news is about from the headline itself. Lead with the news, then explain its practical benefit.

Keep news easy to read and useful to learn from. Do not interrupt the lead or main explanation with long image, production, or methodology notes. Put a brief disclosure at the end only when needed to prevent a conceptual visual from being mistaken for a real screenshot or photograph. Keep detailed provenance in production records; cite factual claims naturally in the body.

Follow `EDITORIAL-CLAUDE.md` for writing. Use natural Urdu sentences, give Urdu product names with English in parentheses on first mention, and preserve exact English interface labels where needed. Give each article one clear promise. In guides, show an early action, expected result and way to check it. Remove keyword-stuffed prose, duplicate FAQs and repeated caveats; keep a material limitation beside the claim it qualifies. The research and examples behind this standard are in `docs/editorial/urdu-writing-review-2026-10-15.md`.

# Urdu Ai visual branding

Every blog cover and every carousel slide must carry the exact `Urdu Ai` wordmark at the top-right: Montserrat SemiBold, white `Urdu`, gold `Ai` (`#FFBE0B`), and lowercase `i`. The logo has a transparent background and sits directly on the artwork: no coloured backing, rectangle, tile, badge, border, or frame around the wordmark. Verify the final exported pixels at native and phone sizes before showing them to the user; generated approximations or an Urdu-script replacement do not pass. Use the controlled wordmark when generation changes the lettering. HTML review previews must use the same brand wordmark.

# Official mobile links in the tools directory

When adding or updating a tool in `src/data/tools.ts`, check its official iOS and Android apps as well as its website. Populate `downloadLinks` with verified App Store and Google Play listings, matching the product and publisher, and record `mobileLinksVerifiedAt`. Add only platforms that were verified; never substitute an unrelated app with a similar name. Label companion apps explicitly and use `mobileNote` for confirmed regional restrictions or product differences. A working store listing does not by itself prove that every feature is available in Pakistan.
