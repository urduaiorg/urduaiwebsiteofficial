# Urdu AI consent rollout — live validation in progress

8 September 2026. The user approved staged live validation after the limits below were disclosed. Website commit fee8679 deployed successfully and the Urdu AI European Privacy Message is Published for urduai.org. This is not a completed iOS release or a complete compliance result.

## Published first live step

Deploy this scoped website change and publish the saved **Urdu AI European Privacy Message** for **urduai.org only**. This makes the consent dialog visible to applicable website visitors. Its first screen offers Consent, Do not consent, and Manage options; optimization is off. The approved Urdu AI logo and https://urduai.org/privacy/ are assigned. English is the available default; the editor does not offer Urdu.

The code adds a privacy choices button outside the footer, gates analytics on Google consent signals, discards pre-consent analytics events, and expands the existing CSP only for Google's consent-message domain. The notice describes WALI ownership, Impact Glocal's iOS publishing role, local records, ATT and separate website choices.

Publishing this website dialog is separate from an iOS App Store release. The staged iOS implementation keeps its production ad gate off until live validation is complete. Do not upload or submit the existing build 6 as though it contains these fixes.

## Verified locally

- 30 website tests pass, including direct ad-slot events, refusal, partial consent, withdrawal and CMP failure.
- Production Astro build passes; Pagefind indexes 1,051 pages.
- Safari renders the updated privacy page at desktop and 375px width without clipped new headings.
- Scoped git diff and whitespace checks pass; no new article or artwork is included.

## Known limits to resolve in live validation

- The account and vendor selector both show **198 selected partners**. The editor preview says **210 partners**. The cause is unresolved; do not invent an explanation or alter the account-wide partner list to make the counts match.
- Google's supported live preview requires a published message. Use `?fc=alwaysshow&fctype=gdpr` after publication, then verify the actual consent/vendor pages, acceptance, refusal and withdrawal in a fresh browser session and the app WebView.
- Non-ad pages have no CMP bootstrap, so analytics remains disabled on them. This is a measurement reduction rather than permission being assumed.
- The existing server uses a domain-allowlist CSP; Google documents support for strict nonce CSP. The scoped domain addition is not a complete CSP migration. Inspect live CSP errors and do not enable app ads while consent resources are blocked. Do not remove security headers to get ads working.
- The European dialog does not establish US or worldwide coverage. Inspect/configure applicable US handling and test it before final app release.
- UI checks are not a network/storage audit. Verify actual requests before permission and after refusal/withdrawal before asserting nontracking behavior.

## Live validation status

The earlier automatic approval rejection was followed by explicit user approval of the concrete staged rollout. Publication succeeded; it is no longer blocked on that approval. No App Store submission or public release has occurred.

Safari Private live GDPR preview displays Consent, Do not consent and Manage options. After refusal, all four Google consent-mode values were 2 (denied), both Analytics destinations were disabled, and no Analytics script or resource request appeared in the page's resource entries. The privacy button reopened the message. This is limited page-level evidence, not an exhaustive network audit.

The live vendor dialog has 210 entries, matching the message and still differing from the account selector's 198. Cause remains unresolved. Acceptance after reopening returned granted Google signals but Analytics remained disabled; the legacy Partytown worker was still forwarding gtag/dataLayer and logging worker errors. Follow-up ea164b7 removes that unused integration; all 30 tests and the complete build pass. Deployment of ea164b7 completed successfully (GitHub run 34279581133); a live HTTP check confirms the worker is absent and consent guard present. Acceptance/withdrawal retesting remains incomplete. Safari Private diagnostics showed inline scripts present but page globals and external scripts missing; the cause is unverified. Computer Use then reported the Mac locked and could not unlock it, preventing further UI checks.

An existing CSP script-src block for ep2.adtrafficquality.google/sodar/sodar2.js remains to assess. Security headers have not been removed.

If live checks fail, keep iOS advertising disabled and fix the website integration. Any rollback must be scoped to this rollout's commit and this Urdu AI message, preserving unrelated site content and other sites' messages.

Sources: https://developers.google.com/funding-choices/fc-api-docs ; https://support.google.com/adsense/answer/10960670?hl=en ; https://support.google.com/adsense/answer/16283098?hl=en

## Background verification after lock-screen authorization

A separate regular Safari window displayed the published message and allowed refusal while retaining article access. The locked private tabs were not opened. Automatic review blocked the acceptance click; specific user approval for that session's processing and subsequent withdrawal is pending. No new browser-console/network result was obtained.

Added scripts/verify-consent-bundle.mjs to postbuild. It parses the generated HTML, checks controller placement/executability and absence of worker forwarding, then executes the embedded controller with simulated consent callbacks. The generated page and downloaded live ea164b7 article both pass. This supplements source tests; it cannot replace live CMP lifecycle, CSP or network checks. The verification changes are committed locally for the next deployment and do not change live site behavior.

## Approved acceptance test and prepared lifecycle fix

The user approved the specific consent test. Acceptance succeeded: Google reported all four purposes granted, but Analytics remained disabled after the prior refusal, with no worker present. The session was returned to Do not consent; all four values were verified denied and Analytics disabled. The acceptance-test approval block is resolved.

The prepared controller change clears the saved Google consent record through showRevocationMessage and reloads the page, giving the next choice fresh readiness callbacks and discarding tags from the prior decision. Source tests (31 total), generated-HTML smoke check, Astro build and Pagefind passed. Actual deployed new-choice retesting remains required.

Automatic approval review rejected the combined commit/deployment command for this follow-up as lacking specific live-site deployment authorization. That command did not execute. The tested patch is being saved locally, and a specific deployment decision is required; no alternate deployment route will be used. The existing live ea164b7 site remains unchanged.

## Deployment completed

The user explicitly approved deployment of 1c40814. GitHub run 34283229318 attempt 1 timed out opening the Hostinger SSH connection before transfer. The same approved deployment was retried; attempt 2 succeeded. A fresh live HTTP download contains the lifecycle fix and passes scripts/verify-consent-bundle.mjs.

The final interactive post-deployment acceptance/withdrawal retest remains incomplete because Safari window/display control and console focus became unreliable. Do not describe the lifecycle issue as fully verified from the simulated check alone. Before deployment, the approved temporary consent test was restored to refusal and all four denied values were observed. The separate simulator tracking enable test awaits its specific approval. No App Store upload/submission was performed.


## Regional follow-up — 8 September, evening

Measured live WKWebView verification of 1c40814 now passed: acceptance [1,1,1,1], Analytics enabled, 1 script/2 resource entries; withdrawal [2,2,2,2], disabled, 0/0; replacement acceptance correctly restored 1/2. Final refusal and simulator ATT OFF verified. Native repository commit fd3a284 contains evidence.

A further local change handles the US privacy API independently from European consent-mode values. Analytics waits for known regional status, remains disabled for US opt-out/unknown status, and the privacy button opens the US confirmation dialog for applicable visitors. It reloads only after that dialog's callback. European replacement-choice behavior is preserved. All 35 tests, Astro build, generated HTML verification and Pagefind (1051 pages) pass. This regional change is NOT deployed yet.

AdSense read-only check confirmed no existing US message. The create-message editor was opened, but Safari stopped providing its window content or screenshots; refresh and a fresh window did not recover usable control. No completed draft or publication is verified. Finish a message named Urdu AI US Privacy Message, select only urduai.org, English, all current/future supported US states, inspect the preview and publish within the user's authorized privacy-release work. Leave PakSpeed and account-wide ad settings unchanged. Then deploy this scoped code and verify actual US opt-out plus European regression in the app WebView. The account's default US link is only overridden once this new controller is deployed.

Google references checked:
- https://developers.google.com/funding-choices/fc-api-docs — INITIAL_US_STATES_OPT_OUT_DATA_READY and US confirmation dialog are separate from European consent APIs.
- https://support.google.com/adsense/answer/10960771?hl=en — site-specific message creation and all supported US state targeting.
- https://support.google.com/adsense/answer/16283098?hl=en — AdSense supports strict nonce CSP; the current domain-list policy is not a complete supported integration. No security headers were removed or relaxed by this change.


## Regional deployment completed — 8 September, 21:30 Winnipeg

User completed US-message publication. Safari message list verified English (en-US), urduai.org, Published, with internal name “Untitled US states message”. Targeting is user-reported as completed, not independently exposed in the message list. Screenshot stored in the native repository's release/ios/ads-qa/us-message-published.png.

Pushed tested 5634925 after checking origin/main for intervening work. GitHub run 34303200872 succeeded including tests, build and rsync. Public article HTML downloaded to /tmp/urduai-live-regional-5634925.html contains the US callbacks, opt-out guard and regional dialog routing; generated-HTML verification passed. This is source/runtime simulation evidence, not an actual US browser opt-out test.

Safari private-window testing prompted LocalAuthenticationRemoteService. Computer control cannot operate this authentication service; user was asked to unlock the private window. No protected-window access or authentication bypass attempted. Live US click-through/European regression and remaining native release checks are pending. App Store app remains unsubmitted.
