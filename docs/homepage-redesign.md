# Homepage release

The approved blue/yellow homepage is implemented in Astro with real content collections, current app screenshots, Substack signup at https://www.urduaiupdates.com/subscribe, and the requested Impact link at https://impact.urduai.org/. The partner-logo strip is removed.

## Content and interactions

- Featured article and six recent stories follow exact `published_at`, with legacy `date` fallback. Draft and future entries are excluded; edits do not promote older articles.
- Guides, tutorials, prompt examples and the masterclass lesson count come from existing content.
- Search uses the existing Pagefind search page. Prompt buttons switch and copy real prompt text. App images open at their original size.
- Video cards open YouTube directly. The in-app test browser left privacy-enhanced embeds blank, while direct YouTube loaded its player. No third-party player is downloaded on the homepage.
- Exactly two existing ad slots remain. Shared consent controls, analytics gating, canonical metadata and structured data stay in Base.astro.

## Automatic YouTube updates

`scripts/sync-youtube.py` reads the verified public channel feed (including Shorts), checks channel identity, IDs and timestamps, and atomically writes `public/data/youtube-videos.json`. Invalid responses do not overwrite the previous feed.

The `sync-youtube.yml` workflow runs at minutes 17 and 47 each hour and publishes only this JSON using the existing Hostinger SSH secrets. GitHub may delay scheduled runs. The workflow becomes active after merging to the default branch; first deploy the full site so `/data/` exists. Full deployments refresh the feed too and retain the saved feed if YouTube is unavailable. Both workflows share deployment concurrency to avoid overlapping writes.

The GitHub schedule is a backup, not a guaranteed refresh deadline: on 23 September its scheduled runs were hours apart. The primary refresh now uses `/data/youtube-feed.php` on Hostinger. Static Astro pages still render saved cards immediately; near the video section the browser requests this same-origin endpoint. It fetches the fixed, verified YouTube channel when its cache is over five minutes old. YouTube may itself cache or delay its RSS feed, so publication is not instantaneous and no fixed upload-to-homepage deadline is promised.

The endpoint needs PHP with cURL and SimpleXML (tested in CI and on the live host). It stores an atomic cache outside `public_html`, in the domain's `.urduai-youtube-cache` directory. A lock prevents concurrent upstream requests; failed refreshes retain the last good feed and retry after a one-minute cooldown. No API keys, user-supplied upstream URLs, or new hosting service are used. Full-site deployments do not erase this private cache.

The browser rechecks every five minutes while the video section is nearby and the tab is visible, and on returning after that interval. Failed endpoint requests fall back to the scheduled JSON, then to the existing cards. Updates do not replace a keyboard-focused card. The refresh announcement is screen-reader-only; no operational notification appears under the videos.

Run `php -l public/data/youtube-feed.php && php scripts/youtube-feed.test.php` for parser, cache expiry, outage recovery, cooldown, concurrent-request and newer-static-feed checks. `npm test` covers browser endpoint preference and fallback. After deploying, verify the endpoint returns JSON with a new `checkedAt`, compare its first video with the channel feed, and confirm the live homepage card. A successful scheduled job alone is insufficient verification.

## Validation (21 September 2026)

- 41 Node tests and 2 Python tests passed, including publication ordering and rejection of malformed/wrong-channel feeds.
- Production build and consent bundle verification passed; Pagefind indexed 1,070 pages.
- Browser review at 1,440px and 375px: readable Urdu, no horizontal overflow, working menu, search, prompt switching/copying and screenshot dialog.
- All 41 homepage internal links resolve in the generated site; 10 local homepage images use Astro WebP output.
- Direct live feed refresh retrieved 12 uploads. Substack signup and Impact URLs verified.
- Real-device and throttled 3G performance have not been measured. Scheduled upload, production caching, ads and live assets must be checked after deployment; a local build does not prove deployment.

- Final pre-launch check fixed ad startup ordering: the homepage waits for shared deferred modules before registering slots. Regression tests cover early and late script execution.
