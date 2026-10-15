# Urdu Ai: writing research and improvement plan

Prepared 15 October 2026. This is an internal editorial review.

## The editorial direction

Urdu Ai's strongest opportunity is practical teaching in natural Urdu: help a reader understand a change, try one useful task, and judge the result. Our strongest sampled articles already have original screenshots, prompts and concrete tests. Editing should make those assets easier to reach and understand.

The largest weaknesses in this sample are unnecessary English inside ordinary Urdu sentences, competing article promises, delayed beginner instructions, and repeated caveats. More elegant vocabulary alone will not fix these problems. We need clearer selection and ordering of information.

Suggested house principle:

> قاری کو بات سمجھ آئے، پہلا قدم واضح ہو، اور وہ نتیجہ خود جانچ سکے۔

## What was examined

The local source inventory contained 792 blog, 68 guide, 31 how-to and 26 glossary Markdown files: 917 files across those four collections. These are source-file counts, not verified counts of live or unique articles.

I selected 12 articles covering recent news, practical guides and introductory lessons. I reviewed their titles, openings, heading sequences, endings and representative instructional passages; I read the Google Play article and substantial portions of the scholarship, NotebookLM and SynthID articles in more detail. This is a purposive sample, not a full archive audit or a statistical estimate of site quality. The public prompt-engineering page also confirmed that its mixed-language opening is reader-facing.

For comparison, I examined six directly accessible Urdu pieces from four publishers: Dawn, DW, Independent Urdu and Urdu News. They are examples of particular writing techniques, not a defensible ranking of the world's best Urdu publishers. The requested BBC Urdu article was blocked to the research tool, so I did not use a mirror or claim a full BBC comparison. DW Akademie's larger Urdu PDF was not available to the tool and was excluded from the close comparison.

This review evaluates writing and teaching structure. It does not independently revalidate every product claim in our archive, measure learning outcomes, or infer traffic from prose quality. Rewrites below demonstrate editing; product instructions require their normal source verification before publication.

## What we can learn from the external examples

| Example examined | Useful writing technique | How Urdu Ai should apply it |
|---|---|---|
| [Dawn: ChatGPT browsing update, 29 September 2023](https://www.dawnnews.tv/news/1212703/) | Moves from the announced change to what a user can ask, then places the access condition nearby. | Explain the new action in the opening; put eligibility beside it. Treat the old article as a writing example, not current product guidance. |
| [Dawn: model launch report, 15 May 2024](https://www.dawnnews.tv/news/1233284) | Describes demonstrations using concrete tasks, including mathematics and translation. | Replace a list of impressive feature names with one thing a reader could do. Its visible typo and imprecise wording also show why publisher reputation does not replace proofreading. |
| [DW Urdu: Pakistan's AI policy, 10 August 2025](https://amp.dw.com/ur/پاکستان-کا-مصنوعی-ذہانت-میں-ترقی-کا-عزم-چیلنجز-کیا-ہیں/a-73558481) | Organizes implementation questions around named experts and specific constraints such as training and data. | Attribute judgments to accountable people or evidence. A useful local angle comes from a real difference in conditions. Avoid copying every sentence structure or accepting every quoted claim as established fact. |
| [Independent Urdu: reflection on AI and learning, 14 July 2026](https://www.independenturdu.com/node/186750) | Connects an idea to familiar phone behaviour and a writer's stated learning experience. The opinion note appears at the end. | Use familiar behaviour to introduce an unfamiliar idea. Personal reflection fits an essay; straight news should still lead with the announcement. Never invent a first-person experience. |
| [Independent Urdu: students discuss AI, 2 January 2025](https://www.independenturdu.com/node/177709) | Brings learners into the story through a reported student discussion. | Build future explainers around actual learner questions and mistakes. The article's broad benefit statements are a weaker model for instructions: our guide should show an action and result. |
| [Urdu News: irrigation reporting, 19 January 2026](https://www.urdunews.com/node/899639) | Connects a farmer's problem to an observable device signal, explains the signal's meaning, and reports users' experiences. | Use the sequence **problem → what you see → what it means → what you do**. This was the strongest process-explanation example in this comparison. Borrow that sequence, not the dramatic headline or unverified outcome claims. |

The lesson is selective: copy useful editorial techniques, not another publication's voice, claims or habits wholesale.

## What our sample shows

| Urdu Ai article | Strength worth keeping | Specific editorial change |
|---|---|---|
| [WhatsApp guest calling](https://urduai.org/blog/whatsapp-guest-calling-without-account-pakistan-urdu/) | Clear account, device and host-approval requirements. | Turn the host and guest journeys into short steps. Consolidate repeated device and regional qualifications. The long middle image note has already been removed. |
| [Google Play personal apps](https://urduai.org/blog/google-play-personal-apps-without-developer-account-urdu/) | Protects the important distinction between a private app and public store publication; includes a usable idea prompt. | Keep that distinction once near the lead and once in the relevant answer. Replace sentences explaining our verification process with concise statements of what is available and what remains unknown. |
| [NotebookLM update guide](https://urduai.org/blog/notebooklm-gemini-notebook-new-features-october-2026-guide/) | Features have practical examples and linked sources. | Move the beginner quick start higher. The dedicated first-notebook section currently follows seven other main sections, although some feature sections already contain instructions. Let readers choose a basic task before exploring every update. |
| [Scholarship assistant](https://urduai.org/blog/ai-scholarship-assistant-degree/) | Original video, application prompts and a practical timeline. | Give the headline one main promise. The degree debate and scholarship workflow compete. Make the student workflow primary; use the education argument as short context. Offer the English prompt version optionally, rather than duplicating every long prompt in the main reading path. |
| [SynthID practical test](https://urduai.org/blog/google-synthid-detector-ai-media-test-urdu/) | Five reported test results, screenshots and a comparison table are distinctive original material. | Bring the results table earlier. Keep the meaning of a negative result beside it; consolidate repeated provenance and test-scope remarks in one methods note. Do not remove the distinction between watermark detection and authenticity. |
| [Five uses for teachers](https://urduai.org/blog/teachers-ai-five-practical-ways-urdu/) | Specific classroom tasks and copyable Urdu instructions. | Start with a teacher's task. The opening declaration that these are untested suggested examples can be a short label at the examples. Normalize digit style; the source still uses Urdu digits despite the current house rule. |
| [Urdu Ai app guide](https://urduai.org/guides/urdu-ai-app-android-iphone-guide/) | Direct download paths, a first-use sequence and clear platform differences. | Keep the platform/version condition short near the start; move publisher identity and reference detail later. Avoid repeating the same one-lesson/one-task ending. Retain required licensing attribution. |
| [Learning a language with AI](https://urduai.org/guides/learn-any-language-with-ai-urdu/) | A clear practice routine, role-play and follow-up prompts. | Offer one recommended first session, then optional exercises. Show a sample correction so learners know what useful feedback looks like. Standardize پرامپٹ, which appears as پرامٹ in this source. |
| [Claude Projects](https://urduai.org/how-to/create-claude-projects/) | Task sequence, screenshots and troubleshooting. | Keep exact UI labels, but rewrite ordinary prose such as “غلط tone” and “ہر prompt” in natural Urdu. Separate source provenance from the first-use explanation. |
| [CV with ChatGPT](https://urduai.org/how-to/how-to-write-cv-with-chatgpt/) | Collects information before generation and warns against invented experience. | High-priority language edit: the opening and instructions repeatedly switch scripts for ordinary words. Remove or substantiate the 10-minute promise; add a completed sample section. |
| [Artificial intelligence definition](https://urduai.org/learn/artificial-intelligence/) | Familiar everyday examples and a student scenario. | Remove repeated keyword variants in the FAQ. Explain the concept accurately in plain Urdu without returning to “computer-made intelligence.” Distinguish examples from a universal description of all AI. |
| [Prompt engineering](https://urduai.org/learn/prompt-engineering/) | Useful tailoring analogy and a weak-to-specific prompt progression. | High-priority language edit: explain مقصد، قاری، انداز، جواب کی شکل in Urdu. The analogy itself is interrupted by English clothing and instruction vocabulary. Add a sample result and a concrete follow-up. |

These are findings about this sample. The recent news generally uses more natural Urdu than the older CV and glossary pages; that is an observed contrast, not a measured archive-wide trend.

## Before and after: the writing standard in practice

### Ordinary Urdu should carry the sentence

From the current CV opening:

> ChatGPT CV maker کا بہتر استعمال یہ ہے کہ آپ اپنی اصل معلومات دیں، ChatGPT سے سادہ Urdu یا English CV draft بنوائیں، پھر نام، dates، degree، skills اور experience خود verify کریں۔

Proposed:

> چیٹ جی پی ٹی (ChatGPT) سے سی وی بنانے کے لیے اپنی تعلیم، تجربے اور مہارتوں کی اصل معلومات دیں۔ ان کی مدد سے مسودہ تیار کروائیں، پھر درخواست بھیجنے سے پہلے نام، تاریخیں اور تجربے کی تفصیل خود جانچیں۔

The same instruction becomes easier to follow. The product stays recognizable, and the verbs tell the reader what to do. A tested completion time could be added separately; a universal speed promise should not be assumed.

### Define a concept, then let the reader try it

From the prompt-engineering opening:

> Prompt engineering کا مطلب AI کو واضح ہدایات دینا ہے تاکہ جواب آپ کے مقصد، audience، tone اور format کے مطابق آئے۔

Proposed:

> اے آئی کو دی گئی ہدایت پرامپٹ کہلاتی ہے۔ اسے اس طرح لکھنا اور بہتر کرنا کہ مطلوبہ جواب مل سکے، پرامپٹ انجینیئرنگ (prompt engineering) ہے۔ آغاز میں تین باتیں بتائیں: کیا کام چاہیے، کس کے لیے چاہیے اور جواب کس شکل میں چاہیے۔

Follow immediately with an illustrative practice:

> صرف «سبق تیار کریں» لکھنے کے بجائے کہیں: «جماعت 5 کے لیے پانی کے چکر پر 20 منٹ کا سبق بنائیں۔ ایک روزمرہ مثال، ایک مختصر سرگرمی اور آخر میں 3 سوال شامل کریں۔»

Then show how to judge the result:

> جواب میں دیکھیں کہ سرگرمی کے لیے سامان آپ کی جماعت میں موجود ہے یا نہیں۔ اگر زیادہ وقت یا خاص سامان درکار ہو تو کہیں: «سرگرمی 5 منٹ میں مکمل ہو اور صرف کاغذ اور پنسل استعمال ہوں۔»

This teaches a repeatable skill: give context, inspect the answer, improve the instruction. It is a proposed example, not a report of a classroom test.

### A headline should make one promise

Current scholarship headline:

> کیا اب ڈگری کی ضرورت نہیں؟ اے آئی کو اپنا اسکالرشپ اسسٹنٹ بنائیں

Proposed headline for the existing practical material:

> اے آئی سے اسکالرشپ کی تیاری: تلاش سے درخواست تک 5 پرامپٹس

Proposed opening:

> اسکالرشپ کی تیاری میں پہلے اپنی اہلیت، پھر ضروری کاغذات اور آخری تاریخیں سمجھنی ہوتی ہیں۔ اے آئی ان معلومات کو ترتیب دینے اور درخواست کا منصوبہ بنانے میں مدد دے سکتی ہے۔ یہاں 5 پرامپٹس ہیں؛ ہر پروگرام کی شرط اور تاریخ متعلقہ یونیورسٹی یا ادارے کی ویب سائٹ سے ضرور ملائیں۔

The degree question can stay in the video discussion or a separate essay. This headline matches the main task the article actually teaches.

### Keep uncertainty useful and short

Current Google Play wording:

> گوگل نے ابھی اس نئے مرحلے کے بٹنوں کی مکمل عوامی ہدایت جاری نہیں کی؛ اس لیے ہم کوئی غیر مصدقہ کلک بہ کلک طریقہ نہیں دے رہے۔

Proposed wording, preserving the article's stated evidence boundary:

> گوگل نے اس نئے مرحلے کی مکمل ہدایات ابھی جاری نہیں کیں۔ فی الحال اے آئی اسٹوڈیو میں ایپ بنانے اور براؤزر میں آزمانے سے آغاز کریں۔

Keep the article's availability and private/public distinctions in their relevant places. The reader needs the available next action, not a description of the editorial team's restraint.

### Explain what a test result means at the result

Proposed compact SynthID result wording, based on the article's existing table:

> ہماری آزمائی گئی 3 اے آئی سے بنی یا بدلی ہوئی فائلوں میں نشان ملا۔ فراہم کنندہ کے مطابق اصل کیمرہ تصویر اور انسانی آواز میں نشان نہیں ملا۔ نشان نہ ملنے سے کسی فائل کا اصلی ہونا ثابت نہیں ہوتا۔

The full table should follow. A single short methods note can explain the sample size and how file origins were known. Keep those distinctions accurate without repeating the same note under each screenshot.

### Teach with verbs and observable results

For the WhatsApp host instructions, a clearer presentation would be:

> اگر آپ کے اکاؤنٹ میں یہ سہولت موجود ہے تو:
>
> - **کال لنک بنائیں:** واٹس ایپ کے Calls ٹیب میں + دبائیں، پھر Create call link منتخب کریں۔
> - **دعوت بھیجیں:** لنک اس شخص کو بھیجیں جسے کال میں شامل کرنا ہے۔
> - **مہمان کو اجازت دیں:** وہ کمپیوٹر کے براؤزر میں لنک کھول کر اپنا نام لکھے گا۔ آپ کی منظوری کے بعد کال میں شامل ہوگا۔

Exact interface labels remain in English so readers can find them. The surrounding sentence stays in Urdu. This is a structural rewrite of the current article's instructions, not a newly verified device walkthrough.

## Guideline changes made from this review

The main editorial guide and AGENTS.md now establish these practices:

- Open with the reader's answer and practical consequence. The old instruction to write the opening primarily for AI extraction was replaced.
- Use Urdu names first, English once for recognition, and exact English labels where users need to find them. The conflicting English-first rule was replaced.
- Give one article one main promise. Introduce a beginner action before a long feature catalogue.
- Teach through task, action, expected result and a check. Prefer one continuing example to a list of professions.
- Keep important limitations near the relevant claim. Combine repeated caveats; move optional production notes to the end or internal records.
- Make FAQs answer new questions. Word-count ranges are planning aids, not padding targets.
- Replace the unsupported “AI detection test” with an actual read-aloud and learning check.

The changes are editorial instructions. The sample articles and their publication dates have not been changed by this research exercise.

## What to improve first

This priority is based on the observed writing problems and foundational role of the pages. Traffic and conversion data were not available for this review.

| Order | Revision | Done when |
|---|---|---|
| 1 | Prompt-engineering lesson and CV guide | Ordinary prose reads naturally in Urdu; one worked example and a result check are present; unsupported time promises are removed or supported. |
| 2 | Scholarship guide | One headline promise; practical profile prompt appears early; repeated English versions no longer dominate the reading path. |
| 3 | NotebookLM guide | A beginner can reach a first task before navigating all feature updates; advanced sections remain available. |
| 4 | SynthID article | Results are easy to find; interpretation stays beside the results; methods detail is concise and consolidated. |
| 5 | Teacher and app guides | Digits and terminology follow the house style; repeated endings and introductory notes are trimmed. |

For the next three new pieces, use a short editor pass: underline the promise, mark the first useful action, circle unexplained terms, and delete repeated claims. Then proofread the Urdu aloud and check the rendered mobile page.

A small reader pilot would test whether the edits work: invite a beginner, a student and a teacher to read a revised sample, explain its central idea, and try the first task without coaching. Record the exact point of confusion and whether they can recognize a usable result. This is a proposed study; no readers were contacted or tested in this review. Page engagement can supplement that evidence, but cannot establish learning on its own.

The aim is a recognizable Urdu Ai voice: clear enough to start, specific enough to trust, and practical enough to use.
