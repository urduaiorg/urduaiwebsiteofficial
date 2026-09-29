# Muse prompt library — 29 September 2026

Status: expanded to 19 prompts; publication authorized by Qaisar on 29 September 2026. Deployment verification pending.

Preview: http://127.0.0.1:4331/muse/prompts/
Intended canonical: https://urduai.org/muse/prompts/

## Scope

19 original Urdu prompts, including Qaisar's four workflows, organized for school administrators, small businesses, freelancers, government offices, students and homemakers. New Markdown collection; searchable, filterable index; copy controls; individual anchor links; entry points from Muse hub and general prompt index. No social publishing performed.

## Research

Primary sources checked on 29 September 2026:

- https://www.meta.com/help/artificial-intelligence/1484325780075655/ — recurring schedules, confirmation, time zones, cancel/update. Does not establish instant Gmail-trigger support.
- https://www.meta.com/help/artificial-intelligence/1687253048996149/ — connector authorization, permissions, approval controls.
- https://www.meta.com/help/subscriptions/1021145227643680/ — free usage limits and subscriptions.
- https://about.fb.com/news/2026/09/introducing-muse-small-business/ — Canva and business connectors; US/Canada availability. Available via web search when direct opening returned error.
- https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/ — GitHub connector announcement.
- https://docs.github.com/en/pull-requests/reference/pull-requests — review changes through pull requests; no evidence that every Muse connector has write permission.
- https://www.njp.gov.pk/index.php/jobs — national government jobs portal. Search indexing verified; bare domain direct open failed. Not presented as an exhaustive jobs source.
- https://www.hec.gov.pk/site/scholarships — scholarship directory; existence of a page does not establish a currently open call.
- https://epms.ppra.gov.pk/public/tenders/active-tenders — federal tender search; submission/opening dates and amendments must be checked separately.

## Editorial review

Prompts are original suggested workflows, not quoted templates. All 19 have explicit suggested status, requirements, expected outputs and checks. No live Muse execution claimed. Exact app access, connector permissions and account availability are conditional. Pakistani rupees, city/domicile inputs and Asia/Karachi are used where relevant. Sensitive institution data requires authorization. No unsolicited application, spending, invitation or website deployment is authorized by default. Urdu spelling and meaning reviewed, including بجٹ; deterministic site font renders text rather than image generation.

## Technical checks completed

- Production build passed (including consent verification and Pagefind).
- Existing tests passed: 42 Node tests and 2 Python tests.
- git diff --check passed.
- Generated HTML has 19 prompt bodies, Urdu locale/RTL, canonical URL and CollectionPage/ItemList/Breadcrumb data.
- Route is present in generated sitemap; both discovery links are in built pages.
- Student filter produced the three intended prompts.
- English GitHub search returned one relevant result.
- No-result search displayed the empty state and zero count.
- Direct prompt link opened the correct details and reset search/filter state.
- Quiz copy button reported successful Clipboard API completion. Clipboard content was not independently read.
- Source HTML retains prompts in native details and selectable text for no-JavaScript use; filtering and copy controls are progressively revealed.
- Browser reviewed at 375x812 and 1280x900. No horizontal overflow at either size. Correct Nastaliq font confirmed. Fixed an inherited global hero-style conflict and rebuilt.
- Screenshots: mobile-375.png, mobile-prompt.png, desktop-1280.png.
- No new cover asset used; existing site default OG image remains.

## Publication authorization

EDITORIAL-CLAUDE.md, Type 4 Prompt Collection, says: "All tested. All free tier compatible unless marked."
Qaisar approved the proposed clearly labelled suggested-prompt approach and instructed: “Sounds good … have a look there … find what is relavant than make our page public.” This authorizes publication of this library with suggested labels despite the normal all-tested rule. No broad change to editorial policy is made. End-to-end Muse workflow testing remains unperformed; website testing is not described as Muse testing.


## Muse at Work follow-up

Reviewed https://museatwork.app/ through its rendered public directory on 29 September 2026. Read five workflows within its five-free-open allowance: Call notes to follow-up email; Subscriber feedback synthesis; Content repurposing queue; Vendor quotes comparison; Loom transcript to SOP. Did not bypass login, create an account or inspect private data. Used high-level task ideas to author fresh Pakistani Urdu prompts; no copied prompt text. Each new entry credits the inspiration source, and the page distinguishes inspiration from evidence of Muse capabilities.

Local adaptations include parent/staff meeting decisions, anonymized customer/parent feedback, PKR quotes with delivery/tax/quality comparisons, routine school/shop work instructions, and educational content reuse. Public-sector procurement remains an information comparison rather than automated award or legal advice.
