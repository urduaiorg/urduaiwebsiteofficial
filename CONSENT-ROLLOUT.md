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
