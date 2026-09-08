# Urdu AI consent rollout — prepared for live validation

8 September 2026. Local implementation only; not deployed or approved as a complete compliance result.

## Proposed first live step

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

## Approval boundary

Automatic approval review previously rejected publishing the message because integration checks and the partner-count discrepancy were unresolved. No alternate publication route has been attempted. A concrete user decision is required for this staged live validation with the limits above disclosed; public app submission remains a later step.

If live checks fail, keep iOS advertising disabled and fix the website integration. Any rollback must be scoped to this rollout's commit and this Urdu AI message, preserving unrelated site content and other sites' messages.

Sources: https://developers.google.com/funding-choices/fc-api-docs ; https://support.google.com/adsense/answer/10960670?hl=en ; https://support.google.com/adsense/answer/16283098?hl=en
