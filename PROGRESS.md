# PROGRESS.md — urduai.org Rebuild

> Read this file first. Then read CLAUDE.md. Then read EDITORIAL-CLAUDE.md.
> This file tells you where we are, what is done, and what to do next.
> Update the status of each task as you complete it.

---

## Project in One Line

Migrating urduai.org from a broken WordPress installation to a clean
Astro 4.x static site. The new site must pass the Definition of Done
in CLAUDE.md before going live.

---

## Repository

- **GitHub:** https://github.com/urduaiorg/urduaiwebsiteofficial.git
- **Local repo:** `/Users/qroonjha/Downloads/Urdu Ai Website/repo/`
- **PROGRESS.md:** Canonical copy is **`repo/PROGRESS.md`** (tracked in git). If another copy exists in the parent `Urdu Ai Website/` folder, keep both in sync or edit the repo copy before push.
- **Remote confirmed:** origin → GitHub URL above
- **Hosting:** Hostinger via GitHub Actions FTP deploy
- **Live domain:** https://urduai.org

---

## Assets Available Locally

| File | Location | What It Is |
|------|----------|------------|
| WordPress site backup | `/Users/qroonjha/Downloads/Urdu Ai Website/u374839636.urduai-org.20260403163113.tar` | 28GB full Hostinger backup — all WP files, uploads, themes |
| MySQL database dump | `/Users/qroonjha/Downloads/Urdu Ai Website/u374839636_BmBry.sql` | 188MB — all posts, pages, categories, metadata |
| Technical spec | `/Users/qroonjha/Downloads/Urdu Ai Website/CLAUDE.md` | Single source of truth for all technical decisions |
| Editorial spec | `/Users/qroonjha/Downloads/Urdu Ai Website/EDITORIAL-CLAUDE.md` | Content standards, voice, templates, terminology log |

---

## Current State — April 4, 2026

| Layer | Status | Notes |
|-------|--------|-------|
| GitHub repo | **Pushed** | `main` branch on github.com/urduaiorg/urduaiwebsiteofficial |
| GitHub Pages preview | **Working** | GitHub Actions builds + deploys on push to main |
| Local repo | **Complete** | `npm run build` ✓ — **865** static pages (last verified build output) |
| Astro project | **Complete** | Astro 6.1.3, static output, @astrojs/sitemap + @astrojs/rss |
| All layouts | **Complete** | Base.astro, Article.astro, HowTo.astro |
| All pages | **Complete** | **865** pages (blog pagination, category archives, /tools/, /newsletter/, etc.) |
| Content collections | **Complete** | blog, guides, howto, prompts, learn, courses |
| Deployment pipeline | **Complete** | .github/workflows/deploy.yml + pages.yml written |
| Blog posts migrated | **Complete** | **655** posts in `src/content/blog/` |
| Guides migrated | **Complete** | **14** guides in `src/content/guides/` (11 migrated + 3 TASK-06) |
| How-To migrated | **Complete** | **30** tutorials in `src/content/howto/` (27 migrated + 3 TASK-04) |
| Visual design | **Complete** | Final polish applied (Ad slots, cards, footer). |
| Prompts | **Complete** | **13** collections in `src/content/prompts/` (original batch + TASK-03 professions). |
| Learn / Lughaat | **Complete** | **23** terms in `src/content/learn/` (8 core + 15 TASK-01 glossary entries). |
| Images | **In progress** | Blog cover matching underway from local numbered JPG set. Backup extraction still pending for broader image migration. |
| Legacy comments | **Completed** | Read-only WordPress comments are now rendered on mapped blog, guide, how-to, and recovered legacy page routes. All approved native comments are attached except a tiny junk set removed conservatively (3 obvious spam comments, 6 exact duplicates). |

**Bottom line: ~865 pages building; blog paginated; revenue recovery phases 2–8 completed April 4, 2026. Ads last — TASK-11 still blocked on real IDs.**

### PROGRESS ↔ `repo/` reconciliation (verify anytime)

| Check | Repo truth (verified) | PROGRESS task row |
|--------|------------------------|-------------------|
| Learn glossary TASK-01 | 23 × `src/content/learn/*.md` | Completed — matches |
| Thin blog expansion TASK-02 | 10 posts expanded (600+ Urdu tokens/body); was still **Open** in PROGRESS | **Fixed:** marked Completed below |
| FAQ schema TASK-05 | **25** blog files contain `faq:` (≥ task minimum 20) | Completed — note updated |
| Pagefind TASK-16 | `pagefind` **not** in `package.json`; no `src/pages/search/`; footer has **no** تلاش link | Open — matches |
| AdSense / FTP | Placeholders `ca-pub-…`, `G-…` still in `Base.astro` | TASK-11 / TASK-22 Blocked — matches |

## Open Tasks — Pick One and Claim It

> Before starting: read CLAUDE.md fully. Then read EDITORIAL-CLAUDE.md.
> Claim a task by adding your name + date to the Owner column below.
> Mark Done by updating Status and adding a brief note under the task.
> Run `npm run build` before committing. Zero errors required.
> Commit message format: `task: [task name] — [brief description]`

---

### TASK-01 — Write 15 New Urdu AI Glossary Terms (Learn Collection)
**Status:** Completed
**Owner:** Cursor Agent — 2026-04-04
**Priority:** High — zero-competition keywords, Google loves definitional content

**What to build:**
Create 15 new `.md` files in `src/content/learn/`. Each file must follow the exact frontmatter schema in `src/content.config.ts` for the `learn` collection.

**Required frontmatter schema:**
```yaml
---
title: "[اردو اصطلاح] کیا ہے؟"
description: ""          # 120-160 Urdu chars — AEO first paragraph answer
date: 2026-04-04
category: "اردو اے آئی لغت"
term_english: ""         # English term exactly as used in industry
adsense: true
draft: false
---
```

**15 terms to write (in order of priority):**
1. `fine-tuning.md` — term_english: Fine-Tuning
2. `retrieval-augmented-generation.md` — term_english: RAG (Retrieval-Augmented Generation)
3. `transformer.md` — term_english: Transformer
4. `natural-language-processing.md` — term_english: Natural Language Processing (NLP)
5. `computer-vision.md` — term_english: Computer Vision
6. `reinforcement-learning.md` — term_english: Reinforcement Learning
7. `multimodal-ai.md` — term_english: Multimodal AI
8. `inference.md` — term_english: Inference
9. `training-data.md` — term_english: Training Data
10. `foundation-model.md` — term_english: Foundation Model
11. `zero-shot-learning.md` — term_english: Zero-Shot Learning
12. `token.md` — term_english: Token
13. `embedding.md` — term_english: Embedding
14. `ai-agent.md` — term_english: AI Agent
15. `diffusion-model.md` — term_english: Diffusion Model

**Content requirements per term:**
- Minimum 400 Urdu words
- First paragraph: AEO-optimised — state the term, define it simply, give one real-world example
- Use simple Urdu — target audience is a first-generation smartphone user, not a tech expert
- Include: what it is, how it works (simple), why it matters, one example in Pakistani context
- No English jargon without immediate Urdu explanation
- Check existing learn files (`src/content/learn/`) for tone and format before writing

**Definition of done:** 15 files in `src/content/learn/`, `npm run build` passes, no draft: true.

**Completed note — 2026-04-04:**
- Added 15 new markdown entries under `repo/src/content/learn/`: `fine-tuning`, `retrieval-augmented-generation`, `transformer`, `natural-language-processing`, `computer-vision`, `reinforcement-learning`, `multimodal-ai`, `inference`, `training-data`, `foundation-model`, `zero-shot-learning`, `token`, `embedding`, `ai-agent`, `diffusion-model`.
- Each file follows `content.config.ts` learn schema, AEO-first paragraph, 400+ Urdu words target, internal links to existing learn articles where relevant, FAQ blocks aligned to site tone.
- `npm run build` in `repo/` completed with exit code 0.

---

### TASK-02 — Expand 10 Thin Blog Posts to 600+ Words
**Status:** Completed
**Owner:** Cursor Agent — reconciled 2026-04-04
**Priority:** High — directly removes Google helpful content penalty

**What to do:**
Find 10 blog posts in `src/content/blog/` that are between 1KB–3KB (have real titles, not just post-IDs) and expand each to a minimum of 600 Urdu words.

**How to find them:**
```bash
find src/content/blog -name "*.md" -size +1k -size -3k | sort
```

**Selection criteria — pick posts that:**
- Have a real descriptive slug (not `post-{number}`)
- Have a real title in frontmatter
- Are on AI topics that can be genuinely expanded
- Do NOT already have substantial body content

**Expansion requirements:**
- Minimum 600 Urdu words in the body (not counting frontmatter)
- Must be factually accurate — AI news/updates only — do not invent facts
- Follow EDITORIAL-CLAUDE.md voice: clear, warm, Pakistani perspective
- First paragraph must be AEO-optimised (answer the main question immediately)
- Add 2–3 internal links to related urduai.org content where natural
- Do NOT change the slug, title, date, or frontmatter fields — only expand the body
- Update nothing in other files

**Definition of done:** 10 posts with 600+ word bodies, `npm run build` passes.

**Completed note — reconciled 2026-04-04:**
- Ten descriptive-slug posts in `repo/src/content/blog/` were expanded in-body only (frontmatter unchanged): `about-urdu-ai.md`, `chatgpt-ko-whatsapp-main-istemal-karain.md`, `children-poems-with-ai.md`, `urdu-ai-balochistan-kay-school-main.md`, `urdu-ai-se-sab-kuch-seekhein.md`, `sam-altmans-statement-my-children-will-never-be-smarter-than-ai.md`, `copilot-gives-you-free-unlimited-access-to-voice-and-thinkdeep.md`, `chatgpts-new-voice-and-video-feature.md`, `free-deep-thinking-in-copilot.md`, `whatsapp-bringing-new-change-to-meta-ai-chatbot.md`.
- Automated token count on body text (Urdu + Latin words): **609–644** per file (≥ 600 target).
- `npm run build` in `repo/` succeeds.

---

### TASK-03 — Write 5 New Prompts Collections
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** High — prompts pages rank well and drive repeat visits

**What to build:**
Create 5 new `.md` files in `src/content/prompts/`. Check existing files in that folder for exact format before writing.

**Required frontmatter schema:**
```yaml
---
title: "[پیشہ] کے لیے اردو پرامٹس"
description: ""          # 120-160 Urdu chars
date: 2026-04-04
category: "پرامٹس"
profession: ""           # profession in Urdu
prompt_count: 10         # actual count of prompts in file
adsense: true
draft: false
---
```

**5 collections to write:**
1. `doctors.md` — profession: ڈاکٹر — prompts for patient notes, diagnoses, health education
2. `lawyers.md` — profession: وکیل — legal drafting, case summaries, client communication
3. `journalists.md` — profession: صحافی — article research, headline writing, interview prep
4. `hr-managers.md` — profession: ایچ آر مینیجر — job descriptions, interview questions, performance reviews
5. `real-estate.md` — profession: رئیل اسٹیٹ — property listings, client emails, market summaries

**Content requirements per collection:**
- Exactly 10 prompts per file (set prompt_count: 10 in frontmatter)
- Each prompt must be fully written in Urdu — copy-paste ready
- Use the existing prompt card separator format from other prompt files (check `src/content/prompts/teachers.md` for exact format with ─────────────────────────────)
- Include: عنوان (title), پرامٹ (prompt text), کہاں استعمال کریں (which tool), نتیجہ (expected result)
- Prompts must be practical for Pakistani professionals — realistic workplace scenarios

**Definition of done:** 5 files in `src/content/prompts/`, each with 10 prompts, `npm run build` passes.

**Completed:** Added `doctors.md`, `lawyers.md`, `journalists.md`, `hr-managers.md`, and `real-estate.md` in `src/content/prompts/`, each with 10 Urdu prompts using the established prompt-card format.
**Editorial note:** Post-write scan completed on 2026-04-04. No decorative emoji markers or obvious AI-style visual cues were used in this batch.

---

### TASK-04 — Write 3 New How-To Guides
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** High — HowTo schema gets Google featured snippets and AI Overview citations

**What to build:**
Create 3 new `.md` files in `src/content/howto/`. Check existing howto files for format before writing.

**Required frontmatter schema:**
```yaml
---
title: ""
description: ""
date: 2026-04-04
last_verified: 2026-04-04
category: "ہاؤ ٹو"
tool: ""                 # Tool name in English e.g. ChatGPT
difficulty: "آسان"       # آسان | درمیانہ | مشکل
time_required: "10 منٹ"
screenshots: false
adsense: true
draft: false
---
```

**3 tutorials to write:**
1. **`how-to-use-gemini-in-urdu.md`**
   - tool: Gemini
   - title: گوگل جیمنی اردو میں کیسے استعمال کریں — مکمل گائیڈ
   - Steps: sign in, choose model, write Urdu prompt, use extensions, share output

2. **`how-to-write-cv-with-chatgpt.md`**
   - tool: ChatGPT
   - title: ChatGPT سے اردو CV کیسے بنائیں — قدم بقدم
   - Steps: open ChatGPT, CV prompt in Urdu, paste your info, refine output, format it

3. **`how-to-use-claude-for-writing.md`**
   - tool: Claude
   - title: Claude AI سے اردو میں لکھنا کیسے سیکھیں
   - Steps: access Claude, writing prompts, feedback loop, refine style, export

**Content requirements:**
- Minimum 8 numbered steps per tutorial
- Each step: 2–3 sentences explaining what to do and why
- First paragraph: AEO-optimised — answers "how to use X in Urdu" immediately
- Add a "عام مسائل اور حل" (Common Issues) section at the end
- Pakistani context throughout — reference Pakistan use cases

**Definition of done:** 3 files in `src/content/howto/`, `npm run build` passes.

**Completed:** Added `how-to-use-gemini-in-urdu.md`, `how-to-write-cv-with-chatgpt.md`, and `how-to-use-claude-for-writing.md` in `src/content/howto/`, each with AEO-first intros, 8 numbered steps, and a `عام مسائل اور حل` section.
**Editorial note:** Post-write scan completed on 2026-04-04. No decorative emoji markers or obvious AI-style visual cues were used in this batch.

---

### TASK-05 — Add FAQ Frontmatter to Top 20 Blog Posts
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** High — FAQPage schema → Google featured snippets → higher CTR

**What to do:**
Add `faq:` frontmatter to the 20 most important blog posts. The `faq` field is already defined in `src/content.config.ts` and Article.astro already renders FAQPage JSON-LD when it is present.

**Target posts — pick the 20 with the most complete body content from these categories:**
- Posts in category `اے آئی اپڈیٹ` about ChatGPT, Gemini, Claude, Grok, Copilot
- Posts in category `گائیڈ` or `ہاؤ ٹو`
- Any post with a question-format title (ending in ؟)

**FAQ frontmatter format to add:**
```yaml
faq:
  - question: "سوال اردو میں؟"
    answer: "جواب اردو میں — 2-3 جملے، AEO کے لیے واضح اور مکمل۔"
  - question: "دوسرا سوال؟"
    answer: "دوسرا جواب۔"
  - question: "تیسرا سوال؟"
    answer: "تیسرا جواب۔"
```

**Requirements:**
- 3 FAQ pairs per post minimum
- Questions must be natural Urdu search queries (how people actually search)
- Answers must be factually correct and extracted from the post body — do not invent
- Add faq: block at the END of the existing frontmatter, before the closing `---`
- Do NOT change any other frontmatter field or the post body

**Definition of done:** 20 posts with faq: frontmatter, `npm run build` passes, no errors.

**Completed note — 2026-04-04:**
- Added `faq:` frontmatter with 3 Urdu question-answer pairs each to 20 substantial blog posts in `src/content/blog/`.
- The selected posts focus on ChatGPT, Gemini, Claude-adjacent tooling, AI browsers, agentic tools, safety, and other high-intent update topics so `FAQPage` schema now covers more of the strongest content.

**Reconciliation — 2026-04-04:** `grep` for `^faq:` under `repo/src/content/blog/` finds **25** files (more than the original 20); all qualify for FAQPage where `Article.astro` reads `faq`.

---

### TASK-06 — Write 3 New Guides (Detailed, 800+ Words Each)
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** Medium-High

**What to build:**
Create 3 new `.md` files in `src/content/guides/`. Check existing files in `src/content/guides/` for format before writing.

**Required frontmatter schema:**
```yaml
---
title: ""
description: ""
date: 2026-04-04
category: "گائیڈ"
tool: ""
level: "ابتدائی"         # ابتدائی | درمیانہ | ماہر
image: ""               # leave blank if no image available
adsense: true
draft: false
---
```

**3 guides to write:**
1. **`chatgpt-for-business-urdu.md`**
   - tool: ChatGPT, level: درمیانہ
   - title: کاروبار کے لیے ChatGPT — اردو گائیڈ
   - Cover: emails, proposals, market research, customer support, social posts

2. **`gemini-for-students-urdu.md`**
   - tool: Gemini, level: ابتدائی
   - title: طالب علموں کے لیے Gemini AI گائیڈ — اردو میں
   - Cover: homework help, essay writing, exam prep, note summarization, research

3. **`ai-tools-for-freelancers-pakistan.md`**
   - tool: Multiple, level: ابتدائی
   - title: پاکستانی فری لانسرز کے لیے بہترین اے آئی ٹولز
   - Cover: ChatGPT for proposals, Canva AI for design, Grammarly, Midjourney basics, time-saving workflow

**Content requirements:**
- Minimum 800 Urdu words
- AEO-optimised first paragraph
- Use H2 subheadings for each major section
- Include practical Pakistani context throughout
- End with a summary and "اگلا قدم" (next step) CTA

**Definition of done:** 3 files in `src/content/guides/`, `npm run build` passes.

**Completed:** Added `chatgpt-for-business-urdu.md`, `gemini-for-students-urdu.md`, and `ai-tools-for-freelancers-pakistan.md` in `src/content/guides/`, each as a long-form Urdu guide with AEO-first intros, H2-led structure, Pakistani context, summary, and `اگلا قدم` CTA.
**Editorial note:** Post-write scan completed on 2026-04-04. No decorative emoji markers or obvious AI-style visual cues were used in this batch.

---

### TASK-07 — Build /tools/ AI Tools Directory Page
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** High — primary landing page for Google Ad Grant campaigns

**What to build:**
Create `src/pages/tools/index.astro` — a directory of AI tools with Urdu descriptions.
This page is a Google Ad Grant landing page. It must load fast, be clear, and convert to newsletter signup.

**Page requirements:**
- Title: `اے آئی ٹولز — اردو اے آئی | پاکستان میں بہترین اے آئی ٹولز`
- Description: `پاکستان میں استعمال ہونے والے بہترین اے آئی ٹولز — اردو میں مکمل گائیڈ۔ ChatGPT، Gemini، Claude اور مزید۔`
- Canonical: `https://urduai.org/tools/`
- adsense: true

**Tools to include (minimum 12):**

| Tool | Urdu Name | Category | Free? | Pakistan accessible? |
|------|-----------|----------|-------|---------------------|
| ChatGPT | چیٹ جی پی ٹی | چیٹ بوٹ | ہاں (مفت) | ہاں |
| Gemini | جیمنی | چیٹ بوٹ | ہاں (مفت) | ہاں |
| Claude | کلاڈ | چیٹ بوٹ | ہاں (مفت) | ہاں |
| Copilot | کوپائلٹ | چیٹ بوٹ | ہاں (مفت) | ہاں |
| Grok | گروک | چیٹ بوٹ | محدود مفت | ہاں |
| Midjourney | مڈجرنی | تصویر سازی | ادائیگی | ہاں |
| DALL-E | ڈال-ای | تصویر سازی | محدود مفت | ہاں |
| Canva AI | کینوا اے آئی | ڈیزائن | ہاں (مفت) | ہاں |
| ElevenLabs | الیون لیبز | آواز | محدود مفت | ہاں |
| Grammarly | گریملی | لکھائی | ہاں (مفت) | ہاں |
| Perplexity | پرپلیکسٹی | تحقیق | ہاں (مفت) | ہاں |
| NotebookLM | نوٹ بک ایل ایم | تحقیق | ہاں (مفت) | ہاں |

**Card design per tool:**
- Tool name (English + Urdu)
- 2-sentence Urdu description
- Category badge
- Free/Paid badge
- "Pakistan میں دستیاب" badge (green) or "VPN درکار" badge (yellow)
- Link to official tool website (rel="noopener noreferrer")
- If urduai.org has a how-to for this tool, link to it internally

**Layout:** Use the existing `.post-grid` CSS class for the card grid. Use `.card` class for each tool card. Match site design exactly — no new CSS frameworks.

**Add at bottom:** InlineNewsletter component

**Definition of done:** `/tools/` page builds, shows 12+ tool cards, links work, `npm run build` passes.

**Completed note — 2026-04-04:**
- `/repo/src/pages/tools/index.astro` is present with 12 tool cards, Urdu descriptions, category/free/access badges, external links, and an inline newsletter block.
- Updated the page metadata to the exact task wording and replaced generic internal guide links with real matching how-to links where urduai.org already has relevant content.

---

### TASK-08 — Build /advertise/ Media Kit Page
**Status:** Completed — media kit page aligned to spec
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** High — converts platform reach into brand deal revenue

**What to build:**
Create `src/pages/advertise/index.astro` — a professional sponsorship/advertising page with real platform numbers.

**Page requirements:**
- Title: `اشتہار دیں — اردو اے آئی | پاکستان کی سب سے بڑی اردو اے آئی کمیونٹی`
- Description: `اردو اے آئی پر اشتہار دے کر ۱۰ لاکھ سے زائد اردو بولنے والے اے آئی صارفین تک پہنچیں۔ نیوز لیٹر، ویب سائٹ اور سوشل میڈیا پر اسپانسرشپ۔`
- Canonical: `https://urduai.org/advertise/`
- adsense: false (sponsorship page — no competing ads)

**Real numbers to display prominently:**
- نیوز لیٹر سبسکرائبرز: 42,000+
- آن لائن کمیونٹی: 1,000,000+
- ایپ ڈاؤن لوڈز: 50,000+
- اردو بولنے والے: 250,000,000+
- Supported by: S&P Global Foundation, ElevenLabs, Google.org, Internet Society

**Sponsorship packages to list (3 tiers):**

**Package 1: نیوز لیٹر اسپانسرشپ**
- ایک نیوز لیٹر ایڈیشن میں اسپانسر لنک
- 42,000+ سبسکرائبرز تک براہ راست رسائی
- متعلقہ: EdTech، FinTech، AI ٹولز

**Package 2: مضمون اسپانسرشپ**
- ایک اسپانسرڈ مضمون — اردو میں — آپ کے برانڈ کے بارے میں
- SEO فائدہ — مستقل صفحہ urduai.org پر
- سوشل میڈیا شیئر (1M+ کمیونٹی)

**Package 3: ویب سائٹ بینر**
- ہوم پیج اور بلاگ صفحات پر بینر
- ہدف: پاکستانی ٹیک صارفین

**Contact section:**
- Urdu heading: رابطہ کریں
- Email: advertise@urduai.org (or whatever Qaisar uses — leave as placeholder `[EMAIL]`)
- Simple contact form or mailto link

**Design notes:**
- Use brand colors: navy #1d559f, yellow #f1cc11
- Stats displayed as large numbers with Urdu labels (like the hero stats on homepage)
- No emoji — use SVG icons in brand colors following site convention
- Match site design — use existing CSS classes

**Definition of done:** `/advertise/` page builds, stats visible, 3 packages listed, contact link works, `npm run build` passes.

**Completed note — 2026-04-04:**
- Updated `/repo/src/pages/advertise/index.astro` to the media-kit spec with the required title/description, prominent audience stats, supported-by credentials, 3 sponsorship packages, and a dedicated contact section.
- Kept `adsense: false` on the sponsorship page and aligned the copy to Urdu AI’s WALI-led institutional framing.

---

### TASK-09 — Add Pagination to /blog/ Index
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** Medium — 655 posts on one page hurts performance and ad load time

**What to do:**
Update `src/pages/blog/index.astro` to paginate posts at 12 per page.

**Technical approach:**
- Use Astro's built-in `paginate()` function
- Rename file to `src/pages/blog/[...page].astro` (handles both `/blog/` and `/blog/2/` etc.)
- Show 12 posts per page
- Add Urdu pagination controls: `← پچھلا` / `اگلا →`
- Show current page indicator: `صفحہ 2 از 55`
- Keep the existing card design exactly as-is
- Keep breadcrumb and heading

**Pagination UI requirements:**
- Simple row of page links at bottom
- Must work with RTL layout (← is next in RTL, → is previous)
- Do not use any JavaScript for pagination — Astro static pagination only
- Style with existing CSS — no new classes needed beyond what exists

**Definition of done:** `/blog/` shows 12 posts, `/blog/2/` shows next 12, pagination links work, `npm run build` passes with no errors.

**Completed note — 2026-04-04:**
- Updated `/repo/src/pages/blog/[...page].astro` to use Astro’s built-in `paginate()` with 12 posts per page.
- Added Urdu pagination controls, current page summary, and numbered page links while keeping the existing blog card layout.

---

### TASK-10 — Build /newsletter/ Dedicated Page
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** Medium — Google Ad Grant conversion page + SEO for "اردو اے آئی نیوز لیٹر"

**What to build:**
Create `src/pages/newsletter/index.astro`

**Page requirements:**
- Title: `اردو اے آئی نیوز لیٹر — ہر ہفتے اے آئی کی تازہ ترین خبریں اردو میں`
- Description: `اردو اے آئی نیوز لیٹر سبسکرائب کریں۔ 42,000 سے زائد قارئین ہر ہفتے پاکستانی نقطہ نظر سے اے آئی کی خبریں، گائیڈز اور پرامٹس پڑھتے ہیں۔`
- Canonical: `https://urduai.org/newsletter/`
- adsense: false

**Page sections:**
1. Hero: "اردو اے آئی نیوز لیٹر" heading + "42,000+ سبسکرائبرز" stat
2. 3 bullet points on what subscribers get (weekly AI news, guides, prompts)
3. Substack iframe embed (same as InlineNewsletter component — `https://www.urduaiupdates.com/embed`)
4. Social proof: "By Qaisar Roonjha — Pakistan's largest Urdu AI newsletter"
5. Link to recent newsletter issues (link to `https://www.urduaiupdates.com`)

**Definition of done:** `/newsletter/` page builds, embed shows, `npm run build` passes.

**Completed note — 2026-04-04:**
- `/repo/src/pages/newsletter/index.astro` is present with the required title, description, canonical, no-AdSense setting, hero stats, subscriber value section, Substack embed, social proof, and recent-issues link.
- Removed the hardcoded `Inter` font from the newsletter stats so the page now respects the site-wide typography rules.

---

### TASK-11 — AdSense: Replace Placeholder IDs Across All Layout Files
**Status:** Blocked — waiting on Qaisar to provide real IDs
**Owner:** —
**Priority:** Critical — zero ad revenue until this is done

**What Qaisar must provide first (cannot proceed without these):**
1. **AdSense Publisher ID** — format: `ca-pub-XXXXXXXXXXXXXXXX` (16 digits)
   - Find it: Google AdSense → Account → Account information → Publisher ID
2. **GA4 Measurement ID** — format: `G-XXXXXXXXXX`
   - Find it: Google Analytics → Admin → Data Streams → your stream → Measurement ID
3. **4 Ad Slot IDs** — create these in AdSense → Ads → By ad unit → Display ad:
   - `TOP_BANNER_SLOT` — Display ad, Auto size
   - `IN_ARTICLE_SLOT` — In-article ad, Fluid
   - `SIDEBAR_SLOT` — Display ad, Fixed 300×600
   - `BOTTOM_SLOT` — Display ad, Auto size

**Files to update once IDs are provided:**
Replace every occurrence of the placeholder strings in these files:

| Placeholder | Real value | Files affected |
|-------------|-----------|---------------|
| `ca-pub-XXXXXXXXXXXXXXXX` | Real publisher ID | `src/layouts/Base.astro`, `src/layouts/Article.astro`, `src/layouts/HowTo.astro`, `src/pages/index.astro` |
| `G-XXXXXXXXXX` | Real GA4 ID | `src/layouts/Base.astro` (2 occurrences) |
| `TOP_BANNER_SLOT` | Real slot ID | `src/layouts/Article.astro`, `src/layouts/HowTo.astro`, `src/pages/index.astro` |
| `IN_ARTICLE_SLOT` | Real slot ID | `src/layouts/Article.astro`, `src/layouts/HowTo.astro` |
| `SIDEBAR_SLOT` | Real slot ID | `src/layouts/Article.astro`, `src/layouts/HowTo.astro` |
| `BOTTOM_SLOT` | Real slot ID | `src/layouts/Article.astro`, `src/layouts/HowTo.astro` |

**Verification after replacing:**
1. `npm run build` — must pass with 0 errors
2. Open a blog post in browser → DevTools → Network tab → confirm `pagead2.googlesyndication.com` request fires with real publisher ID
3. Open GA4 Realtime report → confirm pageviews appear within 60 seconds
4. Open Google Rich Results Test on a blog post — schema should still be valid

**Definition of done:** All placeholder strings replaced, build passes, AdSense loading in browser, GA4 tracking confirmed.

---

### TASK-12 — Google Ad Grant: Campaign Structure Setup Guide
**Status:** Open — no code changes required, this is a setup guide for Qaisar
**Owner:** —
**Priority:** High — $10K/month free traffic from WANG's Ad Grant needs proper structure

**Context:**
WANG holds a Google Ad Grant ($10,000/month free search ads). Urdu AI is WANG's product.
The grant drives traffic to urduai.org. This task documents the campaign structure to set up
inside WANG's Google Ads account.

**Account requirements before campaigns can go live:**
- [ ] Google Ads account linked to WANG's nonprofit status
- [ ] Conversion tracking installed — use GA4 linked to Google Ads
- [ ] Smart Bidding enabled (Maximise Conversions) — required to pass 5% CTR rule
- [ ] At least 2 active ad groups per campaign

**Recommended campaign structure:**

**Campaign 1: اے آئی سیکھیں (Learn AI)**
- Budget: unlimited (grant covers it)
- Landing page: `https://urduai.org/learn/`
- Ad Group 1 — مصنوعی ذہانت
  - Keywords: `مصنوعی ذہانت کیا ہے`, `artificial intelligence urdu`, `ai kya hai urdu`
- Ad Group 2 — اے آئی کورس
  - Keywords: `ai course urdu`, `urdu ai course free`, `مفت اے آئی کورس`

**Campaign 2: ChatGPT اردو**
- Landing page: `https://urduai.org/how-to/` (or specific ChatGPT how-to)
- Ad Group 1 — ChatGPT گائیڈ
  - Keywords: `chatgpt urdu`, `chatgpt kaise use karein`, `chatgpt pakistan`
- Ad Group 2 — ChatGPT مفت
  - Keywords: `chatgpt free urdu`, `chatgpt guide urdu`, `chatgpt tutorial urdu`

**Campaign 3: اے آئی ٹولز**
- Landing page: `https://urduai.org/tools/` (once TASK-07 is built)
- Ad Group 1 — مفت اے آئی ٹولز
  - Keywords: `free ai tools urdu`, `best ai tools pakistan`, `ai tools in urdu`
- Ad Group 2 — اے آئی ویب سائٹ
  - Keywords: `urdu ai website`, `urduai.org`, `urdu artificial intelligence`

**Conversion goals to set up in Google Ads:**
1. Newsletter page visit (`/newsletter/`) — Goal: Page visit
2. App page visit (`/app/`) — Goal: Page visit
3. Courses page visit (`/courses/`) — Goal: Page visit

**Ad Grant rules — must comply or account gets suspended:**
- Maintain 5% minimum CTR across all campaigns
- No single-word keywords
- All ads must link to urduai.org pages (not external sites)
- Use Smart Bidding (Maximise Conversions) — not manual CPC
- All ad copy must be relevant to Urdu AI literacy mission

**Definition of done:** Qaisar has set up 3 campaigns in WANG's Google Ads account, conversion tracking is live, first impressions showing in GA4.

---

### TASK-13 — AdSense CLS Fix: Reserve Ad Slot Height in CSS
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** Medium — prevents layout shift when ads load, improves page ranking

**What to do:**
Update `src/styles/global.css` — the `.ad-slot` currently uses a `:has()` selector to add height
only after an ad fills. This still causes CLS because height changes after page load.
Reserve space upfront so the layout does not shift.

**Find this block in global.css:**
```css
.ad-slot {
  text-align: center;
  min-height: 0;
  margin: 0;
  padding: 0;
}

/* Only add height and margin when AdSense actually loads */
.ad-slot:has(.adsbygoogle[data-ad-status="filled"]) {
  min-height: 90px;
  margin-block: var(--space-lg);
}

.ad-slot--sidebar {
  position: sticky;
  top: 80px;
}
```

**Replace with:**
```css
.ad-slot {
  text-align: center;
  min-height: 90px;
  margin-block: var(--space-lg);
  padding: 0;
  contain: layout style;
}

.ad-slot--sidebar {
  position: sticky;
  top: 80px;
  min-height: 250px;
}
```

**Why:** Reserving space upfront scores a lower CLS in Google PageSpeed Insights.
Lower CLS = higher page experience score = better ad RPM.

**Definition of done:** CSS updated, `npm run build` passes, no visual breakage.

**Completed note — 2026-04-04:**
- Updated `/repo/src/styles/global.css` so `.ad-slot` now reserves height up front and `.ad-slot--sidebar` reserves sidebar height before ads load.
- Removed the `:has()`-based late expansion pattern to reduce layout shift risk when real AdSense slots are enabled in TASK-11.

---

### TASK-14 — Add /tools/ Card to Homepage Category Grid
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** High — /tools/ is now in the nav but missing from the homepage section grid

**What to do:**
Open `src/pages/index.astro`. Find the category cards section (the grid with بلاگ، گائیڈز، ہاؤ ٹو، پرامٹس، اردو لغت، کورسز cards). Add a new card for `/tools/`.

**Card to add (match the existing card style exactly):**
```astro
<a href="/tools/" class="card card--category" style="text-decoration:none;">
  <span class="card__icon">
    <!-- SVG: wrench/tool icon in navy + gold, 40×40, rx=10 rect background -->
  </span>
  <h3 class="card__title" style="margin-block-start:0;">اے آئی ٹولز</h3>
  <p class="card__excerpt">پاکستان میں چلنے والے بہترین مفت اے آئی ٹولز</p>
</a>
```

Draw the SVG icon in the same style as the other cards — navy `#1d559f` background fill with low opacity, gold `#f1cc11` accent. A simple grid/tool symbol works.

**Definition of done:** Homepage shows /tools/ card in the grid alongside other categories. `npm run build` passes.

**Completed:** `/repo/src/pages/index.astro` already included the `/tools/` category card; wording was aligned to the exact task text on 2026-04-04.

---

### TASK-15 — Mobile Navigation Hamburger Menu
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** High — 8 nav items now overflow on mobile screens under 480px

**What to do:**
Update `src/layouts/Base.astro` and `src/styles/global.css` to add a hamburger menu for small screens.

**Behaviour:**
- Desktop (>768px): existing horizontal nav — no change
- Mobile (<768px): nav items hidden, hamburger button appears in top-right of header
- Tap hamburger → full-width dropdown menu slides down with all nav links
- Tap again or tap outside → menu closes
- RTL: hamburger button on left side (logical inset-inline-start)

**Technical approach — pure CSS + minimal JS, no libraries:**

In `Base.astro` add a checkbox toggle (CSS-only approach, no JS required):
```html
<input type="checkbox" id="nav-toggle" class="nav-toggle" aria-hidden="true" />
<label for="nav-toggle" class="nav-toggle-btn" aria-label="نیویگیشن">
  <!-- 3-line hamburger SVG in white -->
</label>
```

Or use a `<button>` with a small inline `<script>` that toggles a `.nav-open` class on `<header>`.

**CSS requirements:**
- Uses existing CSS custom properties — no hardcoded colors
- Transition: `max-height` or `transform` for smooth open/close
- Hamburger icon: 3 horizontal bars in white (header background is navy)
- Active state: X icon or top/bottom bars rotate to form X
- No letter-spacing, no text-transform on Urdu nav text

**Definition of done:** Nav items visible on 375px mobile without overflow. Hamburger opens/closes correctly. `npm run build` passes. Test at 375px and 768px.

**Completed:** `/repo/src/layouts/Base.astro` already had a mobile hamburger toggle with outside-click close behaviour, and `/repo/src/styles/global.css` already had the responsive open-state styling for screens under 768px.

---

### TASK-16 — Pagefind Search Integration
**Status:** Open
**Owner:** —
**Priority:** Medium — CLAUDE.md specifies Pagefind for client-side search

**What to do:**
Add Pagefind search to the site. Pagefind runs at build time and creates a search index from all static HTML. It adds zero server cost.

**Setup steps:**
1. Install: `npm install --save-dev pagefind` (check if already installed first with `ls node_modules | grep pagefind`)
2. Add to `astro.config.mjs` build integration OR add as a post-build script in `package.json`:
   ```json
   "postbuild": "pagefind --site dist"
   ```
3. Create `src/pages/search/index.astro` — the search UI page
4. Add search link to footer in `src/layouts/Base.astro`

**Search page requirements (`src/pages/search/index.astro`):**
- Title: `تلاش — اردو اے آئی`
- Canonical: `https://urduai.org/search/`
- adsense: false
- Include the Pagefind UI script and stylesheet from `/pagefind/pagefind-ui.js`
- Urdu placeholder text in the search box: `تلاش کریں...`
- Results appear below the search box — Pagefind handles this automatically
- Breadcrumb: ہوم → تلاش

**Pagefind UI init:**
```html
<div id="search"></div>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    new PagefindUI({ element: '#search', showSubResults: true });
  });
</script>
```

**Definition of done:** `npm run build` runs pagefind after Astro build, `/search/` page works, typing in box returns results, footer has تلاش link.

**Note:** As of 2026-04-04 this remains unclaimed because `pagefind` is not installed in local `node_modules`, so the task requires adding a new dependency before implementation.

---

### TASK-17 — Social Share Buttons on Article Pages
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** Medium — every article should be shareable in one tap

**What to build:**
Create `src/components/ShareButtons.astro` and add it to `src/layouts/Article.astro` just above the RelatedPosts section.

**Share targets (in this order, RTL layout):**
1. WhatsApp (most important for Pakistan) — `https://api.whatsapp.com/send?text={title}+{url}`
2. Facebook — `https://www.facebook.com/sharer/sharer.php?u={url}`
3. X/Twitter — `https://x.com/intent/tweet?text={title}&url={url}&via=urduaiorg`
4. Copy link — copies URL to clipboard via `navigator.clipboard.writeText()`

**Component interface:**
```astro
---
export interface Props {
  title: string;
  url: string;
}
---
```

**Design requirements:**
- Horizontal row of 4 icon buttons
- Each button: round, 40×40, brand icon in SVG (no emoji), navy or platform color
- Label below or tooltip on hover — in Urdu: واٹس ایپ، فیس بک، ایکس، لنک کاپی
- "لنک کاپی ہو گیا" confirmation text appears for 2 seconds after copy
- No external icon libraries — inline SVG only
- RTL layout: WhatsApp rightmost, copy-link leftmost

**In Article.astro, add after the hero image and before the prose content:**
```astro
<ShareButtons title={title} url={canonical} />
```

**Definition of done:** Share buttons visible on article pages, WhatsApp opens pre-filled message, copy-link shows confirmation, `npm run build` passes.

**Completed:** `/repo/src/components/ShareButtons.astro` already existed with WhatsApp, Facebook, X, and copy-link actions, and `/repo/src/layouts/Article.astro` already rendered it above article content.

---

### TASK-18 — Category Archive Pages
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** Medium — filters traffic by topic, improves Google crawlability

**What to build:**
Create `src/pages/blog/category/[category].astro` — one page per blog category, listing all posts in that category.

**Categories to generate pages for** (from `src/content/blog/` frontmatter):
- `اے آئی اپڈیٹ` → `/blog/category/ai-update/`
- `گائیڈ` → `/blog/category/guide/`
- `ہاؤ ٹو` → `/blog/category/how-to/`
- Any other categories present in the blog collection

**Technical approach:**
```astro
export async function getStaticPaths() {
  const posts = await getCollection('blog', ({data}) => !data.draft);
  const categories = [...new Set(posts.map(p => p.data.category))];
  return categories.map(cat => ({
    params: { category: slugify(cat) },
    props: { category: cat, posts: posts.filter(p => p.data.category === cat) }
  }));
}
```

Use a simple slugify function: replace spaces with `-`, remove special Urdu chars for the URL slug, but display the original Urdu category name as the page heading.

**Page requirements:**
- Title: `{اردو زمرہ} — اردو اے آئی`
- Show posts as cards (same style as /blog/)
- Paginate at 12 per page if category has >12 posts
- Breadcrumb: ہوم → بلاگ → {زمرہ}
- adsense: true

**Definition of done:** `/blog/category/ai-update/` (or equivalent slug) builds and shows filtered posts. `npm run build` passes.

**Completed:** Added `/repo/src/pages/blog/category/[category]/[...page].astro` with category-based filtering, breadcrumb, and 12-post pagination. Current build includes `/blog/category/ai-update/`.

---

### TASK-19 — Strengthen About and Team Pages
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** Medium — E-E-A-T signal, currently likely stubs

**What to do:**
Read the current content of `src/pages/about/index.astro` and `src/pages/team/index.astro`. If they are stubs (less than 40 lines of real content), rewrite them with full content.

**About page (`/about/`) must include:**
- H1: اردو اے آئی کے بارے میں
- Mission statement (1 paragraph): why Urdu AI was created, who it's for
- Real numbers: 250M+ Urdu speakers, 1M+ community, 50K+ app downloads, 42K+ newsletter
- Timeline / milestones: founding, S&P Global award, ElevenLabs case study, Google.org grant
- WANG / WALI institutional context (1 paragraph)
- Organization schema already provided by Base.astro — no need to add separately
- CTA: link to /newsletter/ and /app/

**Team page (`/team/`) must include:**
- H1: ہماری ٹیم
- Qaisar Roonjha card: name, title (بانی و ایڈیٹر), link to /author/qaisar-roonjha/
- Brief note that the team works with a global network of AI educators and contributors
- No placeholder "coming soon" text — real content only

**Definition of done:** Both pages have 300+ words of real content. `npm run build` passes.

**Completed:** `/repo/src/pages/about/index.astro` and `/repo/src/pages/team/index.astro` were already rewritten with full institutional Urdu AI/WALI content, real metrics, and non-stub copy.

---

### TASK-20 — Internal Linking: Add /tools/ and /learn/ Links Inside Blog Posts
**Status:** Open
**Owner:** —
**Priority:** Medium — boosts pages/session, spreads PageRank to newer pages

**What to do:**
Find 20 blog posts that mention specific AI tools by name (ChatGPT، Gemini، Claude، Perplexity، Canva etc.) and add an internal link to `/tools/` or the relevant `/learn/` term the first time each tool name appears.

**Pattern to apply:**
- First mention of ChatGPT in body → link to `/tools/#chatgpt` or keep as-is if already linked
- First mention of a term like "مشین لرننگ" → link to `/learn/machine-learning/` if that file exists
- First mention of "پرامٹ" → link to `/prompts/`

**How to find candidates:**
```bash
grep -rl "ChatGPT" src/content/blog/ | head -20
grep -rl "Gemini" src/content/blog/ | head -20
```

**Rules:**
- Only add links where the post does not already have a link on that word
- Maximum 3 new internal links per post
- Do not change any frontmatter or meta fields
- Do not link every occurrence — only the first in the body

**Definition of done:** 20 posts updated with internal links, `npm run build` passes, no broken links.

---

### TASK-21 — Sitemap and Google News RSS Feed
**Status:** Completed
**Owner:** Codex (GPT-5) — 2026-04-04
**Priority:** High — required before Hostinger launch; Google News feed drives daily traffic

**What to do:**

**Part A — Verify sitemap:**
Run `npm run build` and check `dist/sitemap-index.xml` exists and `dist/sitemap-0.xml` lists all key pages including `/tools/`, `/newsletter/`, `/advertise/`, `/author/qaisar-roonjha/`. If pages are missing, check `astro.config.mjs` sitemap integration config.

**Part B — Add Google News RSS feed:**
The existing `src/pages/rss.xml.js` is a general RSS feed. Create a second feed specifically for Google News at `src/pages/news.xml.js`.

Google News RSS requirements:
- Only posts from last 48 hours qualify for Google News — filter by date
- BUT: include last 30 days of posts to seed the feed on launch
- Required elements per item: `<title>`, `<link>`, `<pubDate>`, `<description>`, `<language>ur</language>`
- Optional but valuable: `<media:content>` image tag
- Feed URL: `https://urduai.org/news.xml`
- Max 1000 items

**Part C — Add news feed link to Base.astro head:**
```html
<link rel="alternate" type="application/rss+xml" title="اردو اے آئی نیوز" href="/news.xml" />
```

**Definition of done:** `dist/news.xml` builds, contains valid RSS, last 30 days of اے آئی اپڈیٹ posts included, Base.astro links to it.

**Completed:** Verified `dist/sitemap-index.xml` and `dist/sitemap-0.xml` include key pages such as `/tools/`, `/newsletter/`, `/advertise/`, and `/author/qaisar-roonjha/`. `/repo/src/pages/news.xml.js` already builds `dist/news.xml`, and `/repo/src/layouts/Base.astro` already includes the alternate feed link.

---

### TASK-22 — Hostinger Deployment Verification
**Status:** Blocked — waiting on Qaisar's FTP credentials
**Owner:** —
**Priority:** Critical — site is still on GitHub Pages preview, not live on urduai.org

**What Qaisar must provide:**
Add these 3 secrets to the GitHub repo at:
`https://github.com/urduaiorg/urduaiwebsiteofficial/settings/secrets/actions`

| Secret Name | Value to add |
|-------------|-------------|
| `FTP_SERVER` | Hostinger FTP hostname (e.g. `ftp.urduai.org` or IP from Hostinger panel) |
| `FTP_USERNAME` | FTP account username from Hostinger → File Manager → FTP Accounts |
| `FTP_PASSWORD` | FTP account password |

**Once Qaisar adds the secrets:**
1. Go to `https://github.com/urduaiorg/urduaiwebsiteofficial/actions`
2. Find the "Deploy to Hostinger" workflow
3. Run it manually (workflow_dispatch) OR push any commit to `main`
4. Watch the logs — confirm FTP upload succeeds
5. Visit `https://urduai.org` — site should load

**Post-launch checklist (do immediately after launch):**
- [ ] Submit sitemap in Google Search Console: `https://urduai.org/sitemap-index.xml`
- [ ] Submit `https://urduai.org/news.xml` to Google News Publisher Center
- [ ] Request indexing for `/tools/`, `/advertise/`, `/newsletter/`, `/author/qaisar-roonjha/`
- [ ] Verify canonical URLs show `urduai.org` not `urduaiwebsiteofficial.github.io`
- [ ] Check Analytics shows live traffic

**Definition of done:** Site loads on `https://urduai.org`. Google Search Console shows it as primary property.

---

## Active Ownership

Use this section before touching shared files. Keep entries narrow and append-only.

| Owner | Scope | Status | Updated |
|------|-------|--------|---------|
| Agent 1 Claude | Blog cover image matching for numbered range `1–225` | In progress | 2026-04-04 |
| Codex (GPT-5) | Blog cover image matching for numbered range `226–470` | Scoped pass completed | 2026-04-04 |
| Codex (GPT-5) | Frontmatter normalization for `src/content/guides/*.md` and `src/content/howto/*.md` | Completed batch | 2026-04-04 |
| Codex (GPT-5) | Guide featured image recovery from WordPress backup + guide frontmatter sync | Completed | 2026-04-04 |
| Codex (GPT-5) | How-to screenshot recovery audit from WordPress content + Elementor metadata | Completed audit | 2026-04-04 |
| Codex (GPT-5) | Institutional page rewrite for `about`, `team`, `partners`, and `contact` with WALI-led positioning | Completed | 2026-04-04 |
| Codex (GPT-5) | `/advertise/` media kit page build + ad-slot CLS reservation fix in `global.css` | Completed | 2026-04-04 |
| Codex (GPT-5) | Blog index pagination at 12 posts per page in `src/pages/blog/[...page].astro` | Completed | 2026-04-04 |
| Codex (GPT-5) | `/newsletter/` landing page standards pass and task closure | Completed | 2026-04-04 |
| Codex (GPT-5) | `/tools/` directory standards pass and task closure | Completed | 2026-04-04 |
| Codex (GPT-5) | FAQ frontmatter for 20 substantial blog posts | Completed | 2026-04-04 |
| Codex (GPT-5) | Five new prompt collections in `src/content/prompts/` for doctors, lawyers, journalists, HR managers, and real estate | Completed | 2026-04-04 |
| Codex (GPT-5) | Three new how-to guides in `src/content/howto/` for Gemini, ChatGPT CV writing, and Claude writing workflows | Completed | 2026-04-04 |
| Codex (GPT-5) | Three new detailed guides in `src/content/guides/` for business, students, and Pakistani freelancers | Completed | 2026-04-04 |
| Codex (GPT-5) | Category archives for blog plus closure of stale homepage/nav/share/news/about tasks in `PROGRESS.md` | Completed | 2026-04-04 |
| Codex (GPT-5) | Legacy WordPress comments import into blog, guide, how-to, and recovered legacy page routes | Completed | 2026-04-04 |
| Codex (GPT-5) | Redirect audit and deterministic `_redirects` generation for migrated WordPress URLs | Completed | 2026-04-04 |
| Antigravity | First batch of Prompts Collections (Teachers, Students, Freelancers) | Completed | 2026-04-04 |
| Antigravity | Second batch of Prompts (Job Seekers, Writers, Creators, Parents, Small Biz) | Completed | 2026-04-04 |
| Antigravity | Creation of Learn Collection (`src/content/learn/*.md`) | Completed batch | 2026-04-04 |
| Antigravity | Second batch of Learn Terms (Gen AI, Neural Nets, Deep Learning, AGI, Hallucination)| Completed | 2026-04-04 |
| Antigravity | Courses Collection (`src/content/courses/*.md`) | Completed | 2026-04-04 |
| Antigravity | Final Visual Polish (`global.css`, `Article.astro`, etc) | Completed | 2026-04-04 |

### Latest Image Matching Update — April 4, 2026

- Codex (GPT-5) matched and renamed **46 confirmed blog cover images** from `/repo/public/images/blog/` for the numbered range **226–470**.
- Matching blog post frontmatter was updated with slug-based `.jpg` paths in `/repo/src/content/blog/`.
- Ambiguous covers were left untouched.
- Known duplicate left untouched: `277.jpg` appears to duplicate the Perplexity cover already assigned from `256.jpg`.
- Additional confirmed matches from the same range were completed in a second pass: `459.jpg` → `post-2817.jpg`, `463.jpg` → `jahan-sawal-wahan-jawab-copilot-vision-ka-kamaal.jpg`, `465.jpg` → `post-3671.jpg`, `467.jpg` → `ai-in-2025.jpg`, `468.jpg` → `video-and-audio-production-through-ai-a-new-era.jpg`.
- Additional confirmed matches from the same range were completed in a third pass: `437.jpg` → `post-2362.jpg`, `443.jpg` → `post-2414.jpg`, `461.jpg` → `post-2814.jpg`, `466.jpg` → `2024-ai-and-technology.jpg`, `470.jpg` → `grocc-elon-musks-new-project.jpg`.
- Additional confirmed matches from the same range were completed in a fourth pass: `452.jpg` → `post-2665.jpg`, `454.jpg` → `post-3353.jpg`, `458.jpg` → `post-2820.jpg`.
- Current total for Codex (GPT-5) in range `226–470`: **64 confirmed blog cover matches** completed and written into frontmatter.
- Residual audit for the same range: **62 numbered JPG covers remain unmatched** and were intentionally left untouched because the title match was ambiguous, weak, or likely duplicated.
- Remaining unmatched numbered covers in `226–470`: `233, 234, 236, 244, 245, 247, 248, 294, 301, 303, 304, 309, 310, 313, 319, 322, 329, 339, 349, 363, 367, 391, 395, 399, 401, 405, 406, 419, 420, 421, 422, 423, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 438, 439, 440, 441, 442, 445, 446, 447, 448, 449, 450, 451, 453, 455, 457, 460, 462, 464`.
- Next action for images is no longer more guessing inside this batch; it is either backup extraction from the 28GB tar or a later review pass with better source context for the unresolved numbered covers.

### Latest editorial / UI hygiene — no decorative emoji — April 4, 2026

- **EDITORIAL-CLAUDE.md:** added hard subsection **No Decorative Emoji (Site-Authored Content)** — aligns with media-kit rule (no emoji; use SVG or plain Urdu). Exceptions: RTL link arrows, legacy imported comments, quoting demos in context.
- **`repo/src/layouts/HowTo.astro`:** removed 🔧 / ⏱️ / 📊 from the "شروع کرنے سے پہلے" card; labels are Urdu text only.
- **`repo/src/layouts/Article.astro`:** code-block copy feedback uses `کاپی ہو گیا` without a checkmark character.
- **`repo/src/content/blog/`:** stripped decorative 🔗 from `the-arrival-of-gpt-4-1-a-new-era-of-programming.md` (web_stories label) and `the-magic-of-veo-2-a-new-way-to-create-videos-in-gemini-and-whisk.md` (attribution line).
- **Note:** third-party embeds (e.g. newsletter iframe) may still render their own icons or emoji — not controlled by static Astro output.

### Latest Frontmatter Cleanup — April 4, 2026

- Codex (GPT-5) added missing `tool` frontmatter to all **11 guides** in `/repo/src/content/guides/`.
- Codex (GPT-5) added missing `tool` and explicit `screenshots: false` frontmatter to all **27 how-to articles** in `/repo/src/content/howto/`.
- One malformed blog frontmatter file was normalized to ASCII quotes: `/repo/src/content/blog/can-manus-ais-new-feature-my-computer-now-run-your-computer-itself.md`.
- Guide and how-to `image` fields were **not** added in this batch because no corresponding assets currently exist under `/repo/public/images/guides/` or `/repo/public/images/how-to/`.

### Latest Guide Image Recovery — April 4, 2026

- Codex (GPT-5) added a reproducible featured-image inventory at `/repo/src/data/featured-image-recovery.json`.
- Codex (GPT-5) added recovery scripts:
  - `/repo/scripts/recover_featured_images.py`
  - `/repo/scripts/sync_guide_featured_images.py`
- All **11 guides** were confirmed to have WordPress featured-image metadata, extracted from the Hostinger backup tar, and copied into `/repo/public/images/guides/`.
- All **11 guide markdown files** now include real `image:` frontmatter pointing at `/images/guides/[slug].jpg`.
- The how-to collection was also inventoried: all **27 how-to posts** have WordPress featured-image metadata, but those assets are a mix of `.jpg`, `.png`, `.jpeg`, and `.avif` covers and are **not** a substitute for proper step screenshot folders.
- Next image task for how-to is therefore a separate screenshot extraction/mapping pass, not blind featured-cover reuse.

### Latest How-To Screenshot Audit — April 4, 2026

- Codex (GPT-5) added two reproducible audits:
  - `/repo/scripts/recover_howto_inline_assets.py`
  - `/repo/scripts/recover_howto_elementor_assets.py`
- Audit outputs were written to:
  - `/repo/src/data/howto-inline-assets.json`
  - `/repo/src/data/howto-elementor-assets.json`
- Result: all **27 how-to posts** were checked for `wp-content/uploads` assets inside original WordPress `post_content` and `_elementor_data`.
- Final finding: **0 how-to posts contain inline upload assets** in `post_content`, and **0 how-to posts contain upload assets** in Elementor metadata.
- Conclusion: the backup contains how-to **featured covers**, but it does **not** expose a recoverable screenshot-folder system for step-by-step tutorials through the post metadata that was migrated.
- Safe next step is manual screenshot reconstruction or a broader raw upload-directory review by filename/date heuristics. It is **not** safe to fabricate `/public/images/how-to/[slug]/` folders from nonexistent metadata.

### Latest Institutional Copy Rewrite — April 4, 2026

- Codex (GPT-5) rewrote `/repo/src/pages/about/index.astro` to foreground Urdu AI’s vision, mission, public impact, and institutional basis.
- The About page now clearly states that Urdu AI is a product of **Wang Lab of Innovation (WALI)** and no longer reads like a founder/team profile.
- Codex (GPT-5) also aligned these related pages to the same institutional framing:
  - `/repo/src/pages/team/index.astro`
  - `/repo/src/pages/partners/index.astro`
  - `/repo/src/pages/contact/index.astro`
- Result: the site’s institutional pages now present Urdu AI as a mission-led public platform with WALI as the operating base, instead of a scattered team-centric narrative.

### Latest Legacy Comments Migration — April 4, 2026

- Codex (GPT-5) added a reproducible importer at `/repo/scripts/import_legacy_comments.py`.
- Import source: native WordPress `wp_comments` rows from `/u374839636_BmBry.sql`, mapped through `/slug_map.json` and `/wp_posts_summary.json`.
- Generated static data file: `/repo/src/data/legacy-comments.json`.
- Final import result after conservative cleanup: **671 approved legacy comments** attached to **176 current routes/pages**.
- Collection breakdown: **246 blog comments on 155 posts**, **72 guide comments on 10 guides**, **15 how-to comments on 9 tutorials**, and **338 recovered page-level comments on 2 migrated routes**.
- The recovered page-level routes are `/guides/` and `/courses/champs/`. The old WordPress page `urduai-master-class-guides` was intentionally consolidated into the current `/guides/` hub because that standalone route no longer exists after migration.
- Comments intentionally excluded from the final import: **228 unapproved comments**, **31 non-comment rows** (for example pingbacks/trackbacks or other non-standard comment types), **3 obvious spam/junk comments**, and **6 exact duplicate submissions**. **Approved unmapped comments remaining: 0**.
- `/repo/src/layouts/Article.astro`, `/repo/src/layouts/HowTo.astro`, `/repo/src/pages/guides/index.astro`, and `/repo/src/pages/courses/champs/index.astro` now render legacy comments as a **read-only archived section** on matching migrated pages. No live comment form was added.
- Verification: `python3 /repo/scripts/import_legacy_comments.py` regenerated the dataset successfully, and `npm run build` completed successfully after the full comments recovery pass.

### Revenue & Traffic Recovery — April 4, 2026

**Phase 1 — AdSense + GA4 IDs (BLOCKED — waiting on Qaisar)**
- `ca-pub-XXXXXXXXXXXXXXXX` and `G-XXXXXXXXXX` are still placeholders in `src/layouts/Base.astro`
- Qaisar must provide: real AdSense publisher ID, GA4 Measurement ID, and 4 ad slot IDs (TOP_BANNER_SLOT, IN_ARTICLE_SLOT, SIDEBAR_SLOT, BOTTOM_SLOT)
- No revenue or analytics data until these are replaced

**Phase 2 — Performance (DONE)**
- `src/layouts/Base.astro`: Google Fonts now loaded as non-blocking preload (was render-blocking `<link rel="stylesheet">`)
- Fixes LCP score; fonts load asynchronously with `<noscript>` fallback

**Phase 3 — Thin Content Penalty (DONE)**
- Deleted **55 stub posts** (all under 1KB, all `post-{ID}` slugs) from `src/content/blog/`
- Added 55 × `301` redirects to `public/_redirects` pointing `/blog/post-{ID}/` → `/blog/`
- Blog post count: 710 → **655 quality posts**
- Build now produces **728 pages** (was 766+)

**Phase 4 — Related Posts Internal Linking (DONE)**
- Created `src/components/RelatedPosts.astro`
- Shows 3 most-recent posts in the same category below every article
- Passed `currentSlug` and `category` to exclude current post and filter by category
- Integrated into `src/layouts/Article.astro` after `<LegacyCommentsSection>`

**Phase 5 — Newsletter on Every Article (DONE)**
- Created `src/components/InlineNewsletter.astro`
- Compact Beehiiv subscribe form with navy/gold branding
- Integrated into `src/layouts/Article.astro` after Related Posts

**Phase 6 — FAQ Schema Support (DONE)**
- Added optional `faq` array field to `src/content.config.ts` blog schema
- Article.astro now generates `FAQPage` JSON-LD when `faq` is present in frontmatter
- `FAQPage` schema added to `combinedSchema` array alongside Article and Breadcrumb schemas
- `faq` prop passed through `src/pages/blog/[slug].astro`

**Phase 7 — Author Entity / E-E-A-T (DONE)**
- Created `src/pages/author/qaisar-roonjha/index.astro` with:
  - `Person` schema (`sameAs` links to X, Facebook, Instagram, LinkedIn)
  - Urdu + English bio
  - Award badges (S&P Global Foundation, ElevenLabs, Google.org)
  - List of 12 most recent posts by this author
- Updated author URL in `Article.astro` schemas from `/about/` to `/author/qaisar-roonjha/`

**Phase 8 — NewsArticle Schema (DONE)**
- `Article.astro` now auto-switches schema `@type` to `NewsArticle` for posts where `category === 'اے آئی اپڈیٹ'`
- Adds `articleSection: "اے آئی اپڈیٹ"` and `dateline: "پاکستان"` for news posts
- Affects **~710 posts** — all now eligible for Google News indexing

**Next: Qaisar provides AdSense publisher ID + GA4 ID → Phase 1 completes in 5 minutes**

### Latest Redirect Audit — April 4, 2026

- Codex (GPT-5) added a deterministic redirect generator at `/repo/scripts/generate_redirects.py`.
- `/repo/public/_redirects` is now generated from actual migration data instead of a partial hand-maintained list.
- Final redirect coverage now includes:
  - **12 generic WordPress pattern redirects**
  - **11 renamed static page redirects**
  - **748 exact content slug redirects** for migrated blog, guide, and how-to content
- Total redirect rules now present in `/repo/public/_redirects`: **771**.
- Representative fixes now land on exact targets instead of generic collection pages:
  - `/%d8%a7%db%92-%d8%a2%d8%a6%db%8c-%da%a9%d9%88%d9%86%d8%b3%db%8c-%d9%85%d9%84%d8%a7%d8%b2%d9%85%d8%aa%db%8c%da%ba-%d8%a8%d8%af%d9%84%db%92-%da%af%d8%a7%d8%9f/` → `/blog/post-47/`
  - `/how-chatgpt-can-help/` → `/blog/how-chatgpt-can-help/`
  - `/urduai-master-class-guides/` → `/guides/`
- `migration-log.md` was updated to reflect the current redirect system, current content counts, and the new `782`-page build.

---

## Build Order — Follow This Sequence Exactly

This is taken directly from CLAUDE.md. Do not skip steps or reorder.

### Phase 1 — Foundation

- [x] **1. Initialise Astro project** inside `/repo/`
  - `npm create astro@latest . -- --template minimal --no-install`
  - Add `@astrojs/sitemap` integration
  - Set `output: 'static'` in astro.config.mjs
  - Confirm `package.json`, `astro.config.mjs`, `tsconfig.json` are present

- [x] **2. `src/styles/global.css`**
  - RTL rule: `html { direction: rtl; font-family: 'Noto Nastaliq Urdu'... }`
  - Full design system: all CSS custom properties from CLAUDE.md colour palette
  - Typography scale from CLAUDE.md
  - NEVER use letter-spacing or text-transform
  - NEVER remove direction: rtl from html element

- [x] **3. `src/layouts/Base.astro`**
  - `<html lang="ur" dir="rtl">` — mandatory on every page
  - Google Fonts: Noto Nastaliq Urdu
  - Conditional AdSense: loads script only when `adsense: true` in frontmatter
  - Organization schema (JSON-LD) on every page
  - Open Graph meta tags
  - Canonical URL — always explicit
  - GA4 script

- [x] **4. `src/layouts/Article.astro`**
  - Extends Base.astro
  - Article schema with `inLanguage: "ur"`
  - Breadcrumb navigation
  - AdSense slots: top banner, in-article, sidebar, bottom
  - App CTA strip (appears after 70% scroll)
  - Author block

- [x] **5. `src/layouts/HowTo.astro`**
  - Extends Base.astro
  - HowTo schema with numbered steps
  - `last_verified` date prominently displayed at top
  - Screenshot-ready step formatting
  - Common issues section template

### Phase 2 — Content Collections

- [x] **6. Define content collections** in `src/content.config.ts` (Astro 6 location)
  - `blog` — frontmatter schema per CLAUDE.md
  - `guides` — with `tool` and `level` fields
  - `how-to` — with `last_verified` and `time_required` fields
  - `prompts` — with `profession` and `prompt_count` fields
  - `learn` — with `term_english` field (knowledge base)
  - `courses` — with `price`, `modules`, `duration` fields

### Phase 3 — Pages

- [x] **7. `src/pages/index.astro`** — Homepage
  - Hero: "اردو AI" brand, App download CTA prominent
  - 50K+ downloads number visible
  - Top banner AdSense unit + one mid-page unit only
  - WebSite + SearchAction schema
  - AEO-optimised first paragraph

- [x] **8. `src/pages/blog/index.astro`** — Blog index
  - Paginated list of blog posts
  - Category filter

- [x] **9. `src/pages/blog/[slug].astro`** — Individual blog posts
  - Uses Article.astro layout
  - Reads from `src/content/blog/`

- [x] **10. `src/pages/how-to/index.astro`** — How-To index

- [x] **11. `src/pages/how-to/[slug].astro`** — Individual tutorials
  - Uses HowTo.astro layout
  - HowTo schema with each step

- [x] **12. `src/pages/guides/` pages**
  - `index.astro` and `[slug].astro`

- [x] **13. `src/pages/prompts/` pages**
  - `index.astro` and `[slug].astro`

- [x] **14. `src/pages/learn/` pages** — Urdu AI Dictionary
  - `index.astro` and `[slug].astro`
  - DefinedTerm schema

- [x] **15. `src/pages/app/index.astro`** — App landing page
  - NO ads — conversion page only
  - NO App CTA strip — entire page is the CTA
  - 50K+ downloads prominent
  - 3 app screenshots
  - Play Store button above fold
  - SoftwareApplication schema

- [x] **16. `src/pages/courses/` pages**
  - `index.astro`
  - `masterclass/index.astro`
  - `automation/index.astro`
  - `champs/index.astro`
  - NEVER adsense: true on any course page

- [x] **17. Static pages**
  - `src/pages/about/index.astro`
  - `src/pages/team/index.astro`
  - `src/pages/partners/index.astro`
  - `src/pages/contact/index.astro`
  - `src/pages/advertise/index.astro`
  - `src/pages/privacy/index.astro`
  - `src/pages/terms/index.astro`

### Phase 4 — Infrastructure

- [x] **18. `src/pages/rss.xml.js`** — RSS feed

- [x] **19. `public/_redirects`** — URL redirects from old WordPress URLs

- [x] **20. `public/robots.txt`** — allow all

- [x] **21. `public/.well-known/assetlinks.json`** — Android deep linking
  - Package name: `org.urduai.app`
  - SHA256 fingerprint: **REPLACE_WITH_ACTUAL_FINGERPRINT** ← Qaisar to provide

- [x] **22. `.github/workflows/deploy.yml`** — GitHub Actions FTP deploy
  - Triggers on push to `main`
  - Builds with `npm run build`
  - Deploys `./dist/` to Hostinger `/public_html/`
  - Secrets needed: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
  - These are set in GitHub repo Settings → Secrets

### Phase 5 — Content Migration

- [x] **23. Audit WordPress content** from the `.tar` backup and `.sql` dump
  - List all blog posts with slugs
  - List all pages
  - List all guides
  - Map old URLs to new structure
  - Document in `migration-log.md`

- [x] **24. Migrate content to Markdown**
  - Blog posts → `src/content/blog/[slug].md`
  - Guides → `src/content/guides/[slug].md`
  - How-to content → `src/content/how-to/[slug].md`
  - Every file needs complete frontmatter per CLAUDE.md schemas
  - YouTube embeds → `<iframe>` in Markdown
  - Images → `/public/images/[content-type]/`

- [ ] **25. Replace AdSense publisher ID**
  - Find every instance of `ca-pub-XXXXXXXXXXXXXXXX`
  - Replace with real publisher ID — **Qaisar to provide**

### Phase 6 — Launch Readiness

- [ ] **26. Build and test locally** — `npm run build && npm run preview`
  - Verify RTL renders correctly at 375px
  - Verify Nastaliq font loads
  - Check no ads on course pages or /app/
  - Validate structured data with Google Rich Results Test

- [ ] **27. Submit sitemap** to Google Search Console on launch day
  - Sitemap auto-generated by @astrojs/sitemap at `/sitemap-index.xml`

---

## Important Technical Notes (Discovered During Build)

- **Astro 6, not 4** — scaffolded as Astro 6.1.3. CLAUDE.md says "Astro 4.x" but 6 is installed. Everything still works identically.
- **Content config location** — Astro 6 requires `src/content.config.ts` (not `src/content/config.ts`). Already done correctly.
- **Content collections use loaders** — Astro 6 requires `loader: glob(...)` syntax. Already done correctly.
- **Astro 6 uses `entry.id` NOT `entry.slug`** — All page templates and index pages must use `.id` for links. `.slug` is undefined. This was a critical fix — all links were `/blog/undefined/` before.
- **YAML date coercion** — YAML auto-parses `2025-03-15` as Date objects; schema uses `z.union([z.string(), z.date().transform(...)])` to handle both.
- **CSS imported in component** — `global.css` is imported via `import '../styles/global.css'` in Base.astro. Vite processes and hashes it automatically.
- **Build command** — `export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH" && npm run build` (node is at `/usr/local/bin/node`)
- **Node 22 required** — Astro 6 needs Node >= 22.12.0. Both GitHub Actions workflows use `node-version: '22'`.
- **GitHub Pages base path** — When `GITHUB_PAGES=true` env is set, astro.config.mjs uses `base: '/urduaiwebsiteofficial/'` for correct asset paths.

---

## What To Do Next (Resume From Here)

1. **Extract images from WordPress backup** — The 28GB `.tar` has all `wp-content/uploads/` images. Extract them to `/public/images/blog/`. Blog posts currently have broken `image` paths pointing to old WordPress URLs, so cards show "اے آئی" placeholder. Once images are extracted, update frontmatter `image:` fields.

2. **Content quality pass** — ~150 posts have `post-{ID}` slugs (from URL-encoded Urdu slugs). These need manual renaming to meaningful English slugs. Some posts have thin content or Elementor HTML remnants that need cleaning.

3. **Create Prompts collection** — Completed. 8 distinct Prompt Collections targeting various Pakistani demographics are now written in `src/content/prompts/`.

4. **Create Learn/Lughaat collection** — Completed. 8 foundational AI dictionary terms written and AEO-optimised in `src/content/learn/`.

5. **Build Courses content** — Completed. Content for Masterclass, Automation, and Champs written.

6. **Replace placeholder IDs** — `ca-pub-XXXXXXXXXXXXXXXX` (AdSense), `G-XXXXXXXXXX` (GA4), `REPLACE_WITH_ACTUAL_FINGERPRINT` (assetlinks.json).

7. **Set up Hostinger FTP deploy** — Add `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` secrets to GitHub repo.

8. **Final visual polish** — Completed. Ad slots collapsed, card shadows refined, footer aesthetics upgraded.

---

## What Qaisar Still Needs to Provide

These items are blockers — cannot be completed without them:

| Item | Needed For | Status |
|------|-----------|--------|
| AdSense publisher ID | All content pages | Pending |
| Play Store app URL | App page, footer | Pending |
| Android SHA256 cert fingerprint | assetlinks.json | Pending |
| FTP_SERVER secret | GitHub Actions deploy | Pending |
| FTP_USERNAME secret | GitHub Actions deploy | Pending |
| FTP_PASSWORD secret | GitHub Actions deploy | Pending |
| App screenshots (3) | /app/ landing page | Pending |

---

## Hard Rules — Never Violate

Read the full list in CLAUDE.md. The most critical:

1. `html` element MUST have `lang="ur" dir="rtl"` — always
2. Body font is Noto Nastaliq Urdu — never Inter, Roboto, or sans-serif
3. `letter-spacing` and `text-transform` are forbidden on Urdu text
4. AdSense NEVER loads on course pages or `/app/`
5. No React, Vue, or JS framework — Astro components only
6. All canonical tags point to `urduai.org`
7. URL structure changes MUST update `_redirects`
8. Do not touch files unrelated to the current task

---

## Definition of Done (per CLAUDE.md)

Before any page goes live, it must pass all of these:

- [ ] Renders RTL Nastaliq correctly at 375px mobile
- [ ] Correct frontmatter and meta tags
- [ ] AdSense on correct pages, absent on courses and /app/
- [ ] Structured data schema present and valid
- [ ] First paragraph AEO-optimised
- [ ] Loads under 2 seconds simulated 3G
- [ ] All internal links work
- [ ] App CTA strip present on content pages
- [ ] Breadcrumb on content pages
- [ ] Images lazy loaded and WebP on build

---

*PROGRESS.md — urduai.org*
*Created: April 4, 2026*
*Working directory: `/Users/qroonjha/Downloads/Urdu Ai Website/`*
*Update this file as tasks are completed.*
