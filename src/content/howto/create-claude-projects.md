---
title: "کلاڈ پروجیکٹس کیسے بنائیں؟ فائلوں کے ساتھ اردو گائیڈ"
description: "کلاڈ پروجیکٹس بنانے، مستقل ہدایات شامل کرنے اور PDF یا دوسری فائلیں ایک بار دے کر ہر متعلقہ چیٹ میں استعمال کرنے کا آسان طریقہ۔"
date: 2026-08-20
last_verified: 2026-08-20
category: "ہاؤ ٹو"
tool: "Claude"
difficulty: "آسان"
time_required: "10 منٹ"
screenshots: true
image: "/images/how-to/create-claude-projects/cover.png"
adsense: true
draft: false
tools: ["Claude"]
faq:
  - question: "کلاڈ پروجیکٹس کیا ہیں؟"
    answer: "کلاڈ پروجیکٹس الگ کام کی جگہیں ہیں جہاں ایک موضوع سے متعلق چیٹس، مستقل ہدایات اور فائلیں اکٹھی رکھی جاتی ہیں، تاکہ ہر بار بنیادی معلومات دوبارہ نہ دینی پڑیں۔"
  - question: "کیا Claude Projects مفت اکاؤنٹ میں دستیاب ہیں؟"
    answer: "ہاں۔ Anthropic کے موجودہ ہیلپ سینٹر کے مطابق مفت صارف زیادہ سے زیادہ پانچ پروجیکٹس بنا سکتے ہیں۔ حدود وقت کے ساتھ بدل سکتی ہیں۔"
  - question: "پروجیکٹ میں کون سی فائلیں دی جاسکتی ہیں؟"
    answer: "Claude Academy کے مطابق PDF، DOCX، CSV، TXT، HTML اور دوسری متعلقہ دستاویزات شامل کی جاسکتی ہیں۔ Google Drive کی فائل بھی جوڑی جاسکتی ہے۔"
  - question: "کیا ایک پروجیکٹ کی تمام چیٹس ایک دوسرے کی باتیں جانتی ہیں؟"
    answer: "نہیں۔ Anthropic کے مطابق چیٹس کا پورا context خود بخود دوسری چیٹس میں منتقل نہیں ہوتا۔ جو معلومات ہر چیٹ میں چاہیے وہ project knowledge یا instructions میں شامل کریں۔"
  - question: "کیا حساس فائلیں Claude Project میں دینی چاہئیں؟"
    answer: "شناختی دستاویزات، طلبہ یا مریضوں کا نجی ریکارڈ، پاس ورڈ، مالی معلومات اور ادارے کی خفیہ فائلیں اجازت اور مناسب privacy review کے بغیر اپ لوڈ نہ کریں۔"
---
کلاڈ پروجیکٹس (Claude Projects) کلاڈ کے اندر الگ کام کی جگہیں ہیں جہاں آپ ایک موضوع کی فائلیں، مستقل ہدایات اور متعلقہ چیٹس اکٹھی رکھ سکتے ہیں۔ اس طرح ہر نئی چیٹ میں وہی پس منظر دوبارہ لکھنے یا ایک ہی PDF بار بار دینے کی ضرورت کم ہوجاتی ہے۔

یہ سہولت کسی جاری کام کے لیے زیادہ مفید ہے: مثلاً استاد کا ایک کورس، فری لانسر کا ایک کلائنٹ، چھوٹے کاروبار کی مارکیٹنگ، یا طالب علم کا تحقیقی منصوبہ۔ Anthropic کے [آفیشل ہیلپ سینٹر](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects) کے مطابق Projects مفت اکاؤنٹس سمیت تمام صارفین کے لیے دستیاب ہیں، البتہ مفت صارف زیادہ سے زیادہ پانچ پروجیکٹس بنا سکتے ہیں۔

## پہلے یہ مختصر ویڈیو دیکھ لیں

یہ Anthropic کی آفیشل ویڈیو ہے جو Claude Academy کے اسی سبق میں شامل ہے۔ اس گائیڈ کے مرکزی اسکرین شاٹس 20 اگست 2026 کو Claude کے موجودہ ویب انٹرفیس سے لیے گئے ہیں؛ Create Project کی مثال آفیشل Anthropic ویڈیو سے ہے۔

<div style="position:relative;padding-top:56.25%;margin-block:1.5rem;overflow:hidden;border-radius:12px;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" src="https://www.youtube-nocookie.com/embed/GJ5jTgcbRHA?rel=0" title="Getting started with projects in Claude.ai — Anthropic" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Claude Project عام چیٹ سے کیسے مختلف ہے؟

عام چیٹ ایک کام یا سوال کے لیے ٹھیک ہے۔ Project اس وقت بنائیں جب ایک ہی موضوع پر بار بار کام ہونا ہو۔

| عام چیٹ | Claude Project |
|---|---|
| ہدایات اسی چیٹ تک محدود رہتی ہیں | Project instructions ہر نئی project chat پر لاگو ہوتی ہیں |
| متعلقہ فائل دوبارہ دینی پڑسکتی ہے | Knowledge میں شامل فائلیں project chats کے لیے دستیاب رہتی ہیں |
| مختلف موضوعات مل سکتے ہیں | ایک مخصوص کام کی الگ جگہ بنتی ہے |
| ایک دفعہ کا سوال | مسلسل یا بار بار ہونے والا کام |

اہم فرق یہ ہے کہ Project کی ہر چیٹ دوسری چیٹ کی پوری گفتگو خود بخود نہیں جانتی۔ جو بات ہر چیٹ کو معلوم ہونی چاہیے، اسے **Project knowledge** یا **Project instructions** میں رکھیں۔

## قدم 1: Claude میں Projects کھولیں

[Claude](https://claude.ai/) میں سائن اِن کریں اور بائیں طرف **Projects** کھولیں۔ آپ سیدھا [claude.ai/cowork/projects](https://claude.ai/cowork/projects) بھی کھول سکتے ہیں۔ Projects صفحے کے اوپر **New project** کا بٹن نظر آتا ہے۔

![Claude Projects کا صفحہ اور New Project بٹن](/images/how-to/create-claude-projects/step-01-projects-page.jpg)

*تصویر: Safari میں Claude Projects کا موجودہ ویب انٹرفیس، 20 اگست 2026۔ نجی projects تصویر میں شامل نہیں کیے گئے۔*

اگر آپ پہلی بار Claude استعمال کررہے ہیں تو پہلے [Claude سے اردو writing کی مکمل گائیڈ](/how-to/how-to-use-claude-for-writing/) دیکھ سکتے ہیں۔

## قدم 2: نیا پروجیکٹ بنائیں

**+ New Project** دبائیں۔ پھر دو چیزیں لکھیں:

1. **نام:** ایسا نام جو کام فوراً سمجھا دے، مثلاً `اسکول داخلہ مہم 2026`۔
2. **تفصیل:** ایک مختصر جملہ کہ اس جگہ کیا کام ہوگا۔ یہ تفصیل آپ اور ٹیم کو پروجیکٹ پہچاننے میں مدد دیتی ہے؛ Claude اسے خود project context نہیں سمجھتا۔

Team یا Enterprise اکاؤنٹ میں visibility کا انتخاب بھی آسکتا ہے۔ ذاتی یا حساس کام کے لیے اسے private رکھیں۔

![Claude میں نیا project بنانے کی اسکرین](/images/how-to/create-claude-projects/step-02-create-project.jpg)

*تصویر: نام، تفصیل اور visibility کے ساتھ Create a project اسکرین۔ ماخذ: Anthropic کی آفیشل ویڈیو۔*

## قدم 3: Project instructions لکھیں

پروجیکٹ کھول کر **Instructions** یا **Set project instructions** پر جائیں۔ یہاں وہ اصول لکھیں جو ہر نئی چیٹ میں لاگو ہونے چاہئیں۔ اچھی instructions میں چار چیزیں ہوں:

- یہ پروجیکٹ کس کام کے لیے ہے
- جواب کس قاری کے لیے ہے
- زبان اور انداز کیسا ہو
- Claude کو کیا نہیں کرنا چاہیے

مثلاً کسی پاکستانی اسکول کے لیے یہ instructions استعمال کی جاسکتی ہیں:

```text
یہ پروجیکٹ ہمارے اسکول کی داخلہ مہم کے لیے ہے۔

ہر جواب سادہ پاکستانی اردو میں دیں۔
والدین کے لیے احترام بھرا اور واضح انداز رکھیں۔
فیس، تاریخ یا سہولت کے بارے میں صرف دی گئی فائلوں سے معلومات لیں۔
اگر کوئی بات فائلوں میں نہ ہو تو اندازہ نہ لگائیں؛ صاف بتائیں کہ معلومات موجود نہیں۔
ہر سوشل پوسٹ کے آخر میں ایک مختصر اگلا قدم شامل کریں۔
```

![Claude Project instructions لکھنے کا خانہ](/images/how-to/create-claude-projects/step-03-project-instructions.jpg)

*تصویر: Claude کے اپنے “How to use Claude” example project کی workspace۔ دائیں طرف project context اور درمیان میں project chat نظر آرہی ہے۔ اسکرین شاٹ: Safari، 20 اگست 2026۔*

Instructions محفوظ کرنے کے بعد ہر نئی project chat انہی اصولوں سے شروع ہوگی۔ اگر جواب بار بار غلط tone میں آئے تو ہر prompt میں سمجھانے کے بجائے instructions بہتر کریں۔

## قدم 4: ضروری فائلیں Project knowledge میں شامل کریں

Project کے دائیں حصے میں **Files** یا knowledge کا خانہ ہوتا ہے۔ **+** دبائیں اور صرف وہ دستاویزات شامل کریں جو اس کام میں بار بار درکار ہوں۔ Claude Academy کے مطابق PDF، DOCX، CSV، TXT اور HTML جیسی فائلیں شامل کی جاسکتی ہیں، اور Google Drive سے دستاویز بھی جوڑی جاسکتی ہے۔

![Claude Project میں files اور knowledge شامل کرنے کی جگہ](/images/how-to/create-claude-projects/step-04-knowledge-files.jpg)

*تصویر: Claude کے example project میں دائیں طرف “Add relevant context” اور Context کا حصہ۔ اسکرین شاٹ: Safari، 20 اگست 2026۔*

فائلوں کے نام واضح رکھیں۔ `document1.pdf` کے بجائے `School-Fee-Structure-2026.pdf` جیسا نام بہتر ہے۔ پرانی فائل ہٹا دیں یا نئی version شامل کریں، ورنہ Claude پرانی معلومات کی بنیاد پر جواب دے سکتا ہے۔

ادائیگی والے Claude plans میں knowledge بہت بڑا ہونے پر Claude متعلقہ حصے تلاش کرنے کے لیے Retrieval Augmented Generation یعنی **RAG** استعمال کرسکتا ہے۔ سادہ الفاظ میں: ہر فائل ایک ساتھ پڑھنے کے بجائے سوال سے متعلق حصہ ڈھونڈا جاتا ہے۔ Claude Academy کے مطابق اس سے project knowledge کی گنجائش نمایاں طور پر بڑھ سکتی ہے۔

## قدم 5: پہلی chat کو ایک واضح کام دیں

اب Project کے اندر نئی chat کھولیں۔ چونکہ instructions اور files پہلے سے موجود ہیں، prompt مختصر ہوسکتا ہے—لیکن مطلوبہ نتیجہ پھر بھی صاف بتائیں۔

### یہ تیار پرامپٹ کاپی کریں

```text
اس پروجیکٹ میں موجود School-Fee-Structure-2026.pdf اور Admissions-Calendar-2026.docx کی بنیاد پر والدین کے لیے داخلوں کا WhatsApp پیغام تیار کریں۔

شرائط:
- زیادہ سے زیادہ 120 الفاظ
- سادہ پاکستانی اردو
- تاریخ، فیس اور رابطے کی معلومات صرف فائلوں سے لیں
- پہلے ایک واضح headline دیں
- آخر میں داخلے کے لیے اگلا قدم لکھیں
- اگر ضروری معلومات کسی فائل میں موجود نہ ہو تو اندازہ نہ لگائیں
```

**کہاں استعمال کریں:** اپنے Claude Project کی نئی chat میں۔

**متوقع نتیجہ:** فائلوں سے جڑا ہوا، ایک ہی tone میں، والدین کے لیے تیار WhatsApp draft۔

اگر آپ مختلف پیشوں کے لیے مزید ready prompts چاہتے ہیں تو [اردو اے آئی پرامٹس لائبریری](/prompts/) بھی دیکھیں۔

## قدم 6: جواب چیک کریں اور Project کو تازہ رکھیں

Project بنانا آخری قدم نہیں۔ ہر اہم جواب پر یہ تین checks کریں:

1. کیا Claude نے مطلوبہ فائل استعمال کی؟
2. کیا تاریخ، قیمت، نام اور رابطہ اصل دستاویز سے ملتے ہیں؟
3. کیا Project instructions واقعی جواب میں نظر آرہی ہیں؟

اگر معلومات بدل جائیں تو knowledge میں نئی فائل دیں۔ اگر tone یا format بدلنا ہو تو instructions edit کریں۔ ایک Project کو ایک واضح کام تک محدود رکھیں؛ اسکول مارکیٹنگ، ذاتی CV اور کاروباری حساب ایک ہی Project میں جمع نہ کریں۔

## عام مسائل اور فوری حل

### Projects کا بٹن نظر نہیں آرہا

براہ راست [claude.ai/cowork/projects](https://claude.ai/cowork/projects) کھولیں اور یقینی بنائیں کہ آپ سائن اِن ہیں۔ موبائل یا app میں جگہ مختلف ہوسکتی ہے۔

### Claude فائل کی بات نہیں مان رہا

فائل کو صرف ایک chat میں attach کرنے کے بجائے Project knowledge میں شامل کریں، پھر prompt میں فائل کا درست نام لکھیں۔

### ہر نئی chat کا انداز بدل جاتا ہے

Project instructions میں audience، زبان، tone، format اور ممنوع باتیں واضح کریں۔ مبہم instructions کے نتیجے بھی مبہم ہوتے ہیں۔

### مفت اکاؤنٹ میں نیا Project نہیں بن رہا

Anthropic کے موجودہ ہیلپ سینٹر کے مطابق مفت اکاؤنٹ میں پانچ Projects کی حد ہے۔ غیر ضروری Project کو archive یا remove کرنے سے پہلے اس کی ضروری chat اور فائلیں محفوظ کرلیں۔

## Privacy: کون سی فائلیں نہ دیں؟

شناختی کارڈ، پاس ورڈ، بینک معلومات، طلبہ یا مریضوں کا نجی ریکارڈ، خفیہ معاہدے اور ادارے کی حساس معلومات اجازت اور مناسب privacy review کے بغیر اپ لوڈ نہ کریں۔ AI tool میں فائل دینا کسی تیسرے فریق کی خدمت کے ساتھ معلومات شیئر کرنا ہے۔

## ایک بات یاد رکھیں

**Claude Project کا اصل فائدہ لمبا prompt نہیں؛ صحیح فائل، واضح instructions اور ایک focused کام کو ایک جگہ رکھنا ہے۔**

## اکثر پوچھے جانے والے سوالات

### کیا Claude Projects مفت ہیں؟

ہاں۔ 20 اگست 2026 کو دوبارہ چیک کیے گئے Anthropic ہیلپ سینٹر کے مطابق مفت صارف زیادہ سے زیادہ پانچ Projects بنا سکتے ہیں۔

### کیا Project کی files ہر chat میں دستیاب رہتی ہیں؟

Project knowledge میں شامل فائلیں اسی Project کی chats میں context کے طور پر استعمال ہوسکتی ہیں۔ کسی ایک عام chat میں دی گئی فائل خود بخود دوسری chat میں منتقل نہیں ہوتی۔

### کیا Claude خود جانتا ہے کہ کون سی فائل استعمال کرنی ہے؟

وہ متعلقہ معلومات تلاش کرسکتا ہے، لیکن بہتر نتیجے کے لیے prompt میں مطلوبہ فائل کا نام لکھیں اور کہیں کہ جواب صرف دستیاب مواد سے بنایا جائے۔

### کیا Project ٹیم کے ساتھ share ہوسکتا ہے؟

Team اور Enterprise plans میں projects کو ادارے کے افراد کے ساتھ share کرنے اور view یا edit اجازت دینے کے options موجود ہیں۔

## اب آگے کیا سیکھیں؟

اگلا مفید سبق **Claude Artifacts** ہے، جس میں chat کے جواب کو قابلِ استعمال mini-app، document یا interactive output میں بدلا جاتا ہے۔ پہلے اس Project guide کو ایک حقیقی چھوٹے کام پر آزمائیں؛ پھر Artifacts کی گائیڈ اردو اے آئی پر شامل کی جائے گی۔

### آفیشل ذرائع

- [Claude Academy: Introduction to projects](https://academy.claude.com/courses/claude-101/introduction-to-projects)
- [Anthropic Help Center: How can I create and manage projects?](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)
- [Claude pricing and plan limits](https://claude.com/pricing)
