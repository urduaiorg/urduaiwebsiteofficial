---
title: "اے آئی ہفتہ وار: کرسر سے اوپن اے آئی الگ، ہگنگ فیس کی بڑی ڈیل؟"
description: "اس ہفتے Cursor سے OpenAI کی علیحدگی، Nvidia کی Hugging Face خریدنے کی رپورٹ، Google کی محفوظ AI جانچ اور Excel Copilot کی نئی صلاحیت سمجھیں۔"
date: 2026-08-29
published_at: "2026-08-29T15:58:13Z"
category: "اے آئی اپڈیٹ"
tags:
  - OpenAI
  - Cursor
  - Nvidia
  - Hugging Face
  - Google DeepMind
  - Microsoft Copilot
image: "/images/blog/weekly-ai-updates-cursor-openai-nvidia-hugging-face-urdu.png"
image_width: 1200
image_height: 630
author: "اردو اے آئی ٹیم"
adsense: true
draft: false
faq:
  - question: "کیا ChatGPT اب Cursor میں بالکل نہیں چلے گا؟"
    answer: "نہیں۔ OpenAI نے Cursor کے native model picker سے اپنے models ختم کرنے کا فیصلہ کیا ہے، مگر transition کے دوران موجودہ access جاری رہے گا۔ بعد میں developer اپنی OpenAI API key، Codex extension یا کسی supported gateway کے ذریعے OpenAI models استعمال کرسکتا ہے۔"
  - question: "کیا Nvidia نے Hugging Face خرید لیا ہے؟"
    answer: "29 اگست 2026 تک Nvidia یا Hugging Face نے مکمل acquisition کا آفیشل اعلان نہیں کیا۔ مختلف معتبر رپورٹس میں تقریباً 12.9 ارب ڈالر کی بات چیت یا ممکنہ معاہدے کا ذکر ہے، اس لیے اسے ابھی حتمی ڈیل نہیں کہنا چاہیے۔"
  - question: "Google کی double-blind AI evaluation عام صارف کے لیے کیوں اہم ہے؟"
    answer: "اس طریقے میں model بنانے والی کمپنی اصل test questions نہیں دیکھتی اور evaluator model کے خفیہ weights نہیں دیکھتا۔ اس سے benchmark یاد کرلینے یا test contamination کا امکان کم اور model scores پر اعتماد زیادہ ہوسکتا ہے۔"
  - question: "کیا Excel میں Copilot کے ساتھ Python سب کے لیے مفت ہے؟"
    answer: "نہیں۔ یہ Microsoft 365 Copilot کی بتدریج جاری ہونے والی سہولت ہے۔ دستیابی account، organization، platform اور subscription کے مطابق مختلف ہوسکتی ہے۔"
---

# اے آئی ہفتہ وار: کرسر سے اوپن اے آئی الگ، ہگنگ فیس کی بڑی ڈیل؟

**اس ہفتے اے آئی کی دنیا میں دو بڑی کاروباری تبدیلیاں اور دو اہم عملی اپڈیٹس سامنے آئیں: OpenAI نے SpaceX کی ملکیت بننے والے Cursor سے اپنے models ہٹانے کا فیصلہ کیا، Nvidia کے Hugging Face خریدنے کی رپورٹس گردش کررہی ہیں، Google DeepMind نے AI models کی زیادہ غیرجانب دار جانچ شروع کی، اور Microsoft نے Excel Copilot میں Python کے ذریعے advanced analysis آسان بنایا۔** ان خبروں کا مشترک پیغام یہ ہے کہ اچھا AI model اکیلا کافی نہیں؛ اسے کون چلاتا ہے، کہاں دستیاب کرتا ہے اور اس کی جانچ کیسے ہوتی ہے، اب اتنا ہی اہم ہے۔

یہ اردو اے آئی کی 22 سے 29 اگست 2026 کی ہفتہ وار اپڈیٹ ہے۔ جہاں کمپنی نے خود اعلان کیا ہے وہاں اسے تصدیق شدہ خبر لکھا گیا ہے، اور جہاں معاملہ ابھی رپورٹ شدہ مذاکرات تک محدود ہے وہاں دعوے اور حقیقت کو الگ رکھا گیا ہے۔

## 1۔ OpenAI کے models Cursor سے کیوں ہٹ رہے ہیں؟

**OpenAI نے 28 اگست کو کہا کہ وہ Cursor کو اپنے models فراہم کرنے والا معاہدہ ختم کرنا چاہتا ہے اور مجوزہ آخری تاریخ 12 نومبر 2026 ہے۔** یہ فیصلہ Cursor کے SpaceX کا حصہ بننے کے دو ہفتے بعد سامنے آیا۔

[Cursor نے 14 اگست کو اپنی acquisition کی تصدیق](https://cursor.com/blog/joining-spacex) کرتے ہوئے کہا تھا کہ اسے SpaceX کے وسیع computing resources اور Grok models تک رسائی ملے گی۔ اس کے بعد [OpenAI نے اپنی آفیشل پوسٹ](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/) میں کہا کہ اسے اعتماد نہیں کہ SpaceX اور Elon Musk سے وابستہ کمپنیاں اس کی شرائط کی پابندی کریں گی۔ کمپنی نے یہ بھی واضح کیا کہ وہ مستقبل کے OpenAI models کو Cursor کے native model picker میں فراہم نہیں کرے گی۔

یہاں ایک اہم فرق سمجھنا ضروری ہے: **ChatGPT بند نہیں ہورہا اور Cursor بھی ختم نہیں ہورہا۔** تبدیلی صرف یہ ہے کہ Cursor کے اندر built-in فہرست سے OpenAI models کا براہ راست تجارتی راستہ ختم ہورہا ہے۔

### Cursor استعمال کرنے والوں کے پاس کیا راستے رہیں گے؟

OpenAI کی help guidance کے مطابق transition کے بعد developer کے پاس یہ راستے ہوسکتے ہیں:

1. Cursor میں اپنی OpenAI API key شامل کرکے استعمال کے مطابق الگ ادائیگی کرنا۔
2. Cursor editor کے اندر Codex extension استعمال کرنا، جو Cursor کے native model picker سے الگ کام کرتی ہے۔
3. Azure یا Amazon Bedrock جیسے supported AI gateway کے ذریعے model access لینا۔
4. Cursor کے اپنے models، Grok، Claude یا Gemini جیسے دوسرے دستیاب options آزمانا۔

عام صارف کے لیے سبق سادہ ہے: کسی ایک AI app کو ہمیشہ ایک ہی model کے برابر نہ سمجھیں۔ app اور model الگ چیزیں ہیں، اور کاروباری معاہدہ بدلنے سے آپ کا پسندیدہ model کسی دوسرے راستے سے دستیاب رہ سکتا ہے۔

## 2۔ کیا Jensen Huang واقعی Hugging Face خرید رہے ہیں؟

**29 اگست تک Nvidia یا Hugging Face نے acquisition کا مکمل آفیشل اعلان نہیں کیا، اس لیے “Nvidia نے Hugging Face خرید لیا” کہنا قبل از وقت ہوگا۔** البتہ [TechCrunch کی رپورٹ](https://techcrunch.com/2026/08/26/nvidia-closes-in-on-hugging-face-acquisition/) سمیت مختلف کاروباری ذرائع نے تقریباً 12.9 ارب ڈالر کی ممکنہ ڈیل یا جاری مذاکرات کا ذکر کیا ہے۔ بعض رپورٹس کے مطابق شرائط پر بات آگے بڑھی ہے، جبکہ دوسری رپورٹنگ کہتی ہے کہ حتمی دستخط ابھی نہیں ہوئے اور معاملہ ختم بھی ہوسکتا ہے۔

Nvidia کے CEO کا درست نام **Jensen Huang، یعنی جنسن ہوانگ** ہے۔ مگر کسی کمپنی کا CEO خود ذاتی طور پر کمپنی نہیں خریدتا؛ اگر یہ ڈیل ہوتی ہے تو خریدار Nvidia ہوگی۔

### Hugging Face اتنا اہم کیوں ہے؟

Hugging Face کو آسان زبان میں AI models کی ایک بڑی لائبریری اور مشترکہ کام کی جگہ سمجھیں۔ developers یہاں models، datasets، demos اور training tools تلاش، آزمائش اور شیئر کرتے ہیں۔ کمپنی کی [Summer 2026 open-model report](https://huggingface.co/blog/state-of-open-models-summer-2026) کے مطابق Hub پر public model repositories کی تعداد سال کے پہلے سات ماہ میں تقریباً 24 لاکھ سے بڑھ کر 29 لاکھ سے زیادہ ہوگئی۔

Nvidia AI chips فروخت کرتی ہے، cloud computing دیتی ہے اور اپنے open-weight models بھی جاری کرتی ہے۔ Hugging Face کے ساتھ اس کی پہلے سے partnerships موجود ہیں۔ اگر acquisition واقعی ہوتی ہے تو Nvidia کو دنیا کی سب سے اہم open-model communities میں سے ایک کے infrastructure اور distribution تک گہری رسائی مل سکتی ہے۔

یہاں دو ممکنہ رخ ہیں—اور دونوں ابھی **تجزیہ** ہیں، حتمی نتیجہ نہیں:

- زیادہ سرمایہ اور Nvidia hardware integration سے open models کو train اور deploy کرنا آسان ہوسکتا ہے۔
- community یہ سوال اٹھا سکتی ہے کہ ایک chip maker کے زیرِ ملکیت Hub مختلف hardware اور model companies کے لیے کتنا غیرجانب دار رہے گا۔

عام صارف کے لیے فوری طور پر کچھ نہیں بدلا۔ Hugging Face website، models اور APIs اس وقت معمول کے مطابق دستیاب ہیں۔ اصل اثر تب سمجھ آئے گا جب دونوں کمپنیاں کوئی آفیشل اعلان، شرائط اور product roadmap جاری کریں گی۔

## 3۔ Google نے AI کا “پرچہ چھپا کر” امتحان کیوں لیا؟

**Google DeepMind نے 27 اگست کو proprietary frontier-class model کی پہلی double-blind evaluation آزمانے کا اعلان کیا۔** اسے اسکول کے امتحان کی مثال سے سمجھیں: اگر طالب علم نے سوالات پہلے دیکھ لیے ہوں تو اس کا اعلیٰ score حقیقی قابلیت ثابت نہیں کرتا۔ AI میں بھی model کبھی training کے دوران benchmark questions دیکھ سکتا ہے، جسے benchmark contamination کہا جاتا ہے۔

[Google DeepMind کے آفیشل اعلان](https://deepmind.google/blog/piloting-the-worlds-first-double-blind-ai-evaluations/) کے مطابق Gemini Flash Lite model کو Singapore AI Safety Institute، OpenMined، AVERI اور MLCommons کے ساتھ ایک محفوظ cryptographic environment میں جانچا جارہا ہے۔ evaluator Google کے model weights نہیں دیکھتا اور Google evaluator کے خفیہ test prompts نہیں دیکھتا۔

اس سے عام صارف کو آج کوئی نیا button نہیں ملے گا، مگر مستقبل میں “ہمارا model benchmark میں پہلے نمبر پر ہے” جیسے دعووں پر اعتماد بہتر ہوسکتا ہے۔ خاص طور پر cybersecurity، سرکاری استعمال اور حساس اداروں کے لیے model کی حقیقی صلاحیت اور safety ناپنا ضروری ہے۔

> یاد رکھیں: benchmark score مفید اشارہ ہے، مگر حقیقی زندگی میں زبان، رفتار، قیمت، غلطیوں اور آپ کے مخصوص کام کی آزمائش پھر بھی ضروری ہے۔

## 4۔ Excel Copilot اب Python سے کیا کرسکتا ہے؟

**Microsoft نے 25 اگست کی release notes میں بتایا کہ “Edit with Copilot” اب Excel کے اندر Python چلا کر advanced analysis، automation، data cleaning اور visualization میں مدد کرسکتا ہے۔** نتیجہ براہ راست workbook میں آتا ہے، اس لیے user کو ہر کام کے لیے الگ coding environment کھولنے کی ضرورت کم ہوسکتی ہے۔

[Microsoft 365 Copilot release notes](https://learn.microsoft.com/en-us/microsoft-365/copilot/release-notes) کے مطابق یہ Windows، Mac اور Web پر بتدریج جاری ہورہا ہے۔ یہ عام free Copilot کی ضمانت شدہ سہولت نہیں؛ account، organization اور Microsoft 365 Copilot subscription کے مطابق availability بدل سکتی ہے۔

اکاؤنٹنٹ، دکاندار، NGO team یا چھوٹا کاروبار اسے اس طرح استعمال کرسکتا ہے:

- ماہانہ فروخت کے trend اور غیرمعمولی کمی بیشی تلاش کرنا۔
- خراب یا نامکمل rows صاف کرنا۔
- districts، products یا teams کا تقابلی chart بنانا۔
- بار بار ہونے والی report کو Python سے automate کرنا۔

یہ پرامٹ آزمائیں:
─────────────────────────────
اس workbook کے sales data کا پہلے جائزہ لیں۔ missing values اور ممکنہ غلط entries الگ دکھائیں، پھر ماہانہ trend، پانچ بہترین products اور غیرمعمولی تبدیلیاں تلاش کریں۔ جہاں ضروری ہو Python استعمال کریں، مگر ہر step سادہ زبان میں سمجھائیں۔ آخر میں ایک واضح chart اور تین قابلِ عمل سفارشات workbook میں شامل کریں۔
─────────────────────────────
کہاں استعمال کریں: Microsoft Excel میں Edit with Copilot

اہم spreadsheet کا backup رکھیں، Copilot کا بنایا code اور numbers خود verify کریں، اور حساس customer data صرف اپنے ادارے کی منظور شدہ policy کے مطابق استعمال کریں۔

## اس ہفتے کی خبروں کو ایک نظر میں سمجھیں

| اپڈیٹ | ابھی کیا تصدیق شدہ ہے؟ | عام صارف کے لیے مطلب |
|---|---|---|
| OpenAI اور Cursor | contract ختم کرنے کا اعلان، مجوزہ تاریخ 12 نومبر | native picker بدلے گا؛ API اور Codex جیسے متبادل راستے موجود ہیں |
| Nvidia اور Hugging Face | acquisition کی رپورٹس، آفیشل حتمی اعلان نہیں | ابھی service میں فوری تبدیلی نہیں؛ خبر کو confirmation تک انتظار سے پڑھیں |
| Google double-blind eval | Gemini Flash Lite کے محفوظ external test کا pilot | مستقبل میں model scores زیادہ قابلِ اعتماد ہوسکتے ہیں |
| Excel Copilot + Python | Microsoft 365 Copilot میں gradual rollout | advanced data analysis آسان، مگر subscription اور verification ضروری |

## اس ہفتے کا بڑا سبق

**AI کی اگلی جنگ صرف “سب سے ذہین model” کی نہیں بلکہ distribution، ownership، computing power اور قابلِ اعتماد testing کی ہے۔** Cursor کی خبر دکھاتی ہے کہ tool کے اندر model کی دستیابی کاروباری تعلق سے بدل سکتی ہے۔ Hugging Face کی ممکنہ ڈیل بتاتی ہے کہ open-model ecosystem بھی بڑی infrastructure companies کے لیے strategic asset بن چکا ہے۔ Google کا pilot یاد دلاتا ہے کہ claims کی غیرجانب دار جانچ ضروری ہے، جبکہ Excel Copilot دکھاتا ہے کہ مشکل technical صلاحیتیں آہستہ آہستہ عام office tools کے اندر آرہی ہیں۔

عام صارف کے لیے بہترین حکمتِ عملی یہ ہے کہ کسی ایک brand پر مکمل انحصار نہ کرے، اپنا اصل data محفوظ رکھے، اہم output verify کرے اور ہر نئی headline میں “آفیشل اعلان” اور “رپورٹ شدہ امکان” کا فرق ضرور دیکھے۔

## عام سوالات

### کیا ChatGPT اب Cursor میں نہیں چلے گا؟

Cursor کے native model picker سے OpenAI models ہٹانے کا منصوبہ ہے، لیکن یہ ChatGPT کی بندش نہیں۔ transition کے بعد API key، Codex extension یا supported gateway متبادل راستے ہوسکتے ہیں۔

### کیا Nvidia نے Hugging Face خرید لیا؟

نہیں، 29 اگست تک دونوں کمپنیوں کا حتمی آفیشل اعلان موجود نہیں۔ تقریباً 12.9 ارب ڈالر کی ممکنہ acquisition رپورٹ ہوئی ہے، مگر اسے مکمل ڈیل کہنا درست نہیں۔

### double-blind AI test کیا ہوتا ہے؟

اس test میں model بنانے والی کمپنی اصل سوالات نہیں دیکھتی اور جانچنے والا ادارہ model کے خفیہ weights نہیں دیکھتا۔ مقصد cheating جیسے contamination اور تجارتی راز کے خطرے کو ایک ساتھ کم کرنا ہے۔

### Excel Copilot میں Python کیا beginners استعمال کرسکتے ہیں؟

Copilot قدرتی زبان کی ہدایت کو Python analysis میں بدلنے میں مدد کرسکتا ہے، اس لیے آغاز آسان ہوتا ہے۔ پھر بھی user کو result، formula، code اور source data کی جانچ کرنی چاہیے۔

## ذرائع

- [OpenAI: Cursor سے متعلق فیصلہ، 28 اگست 2026](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/)
- [Cursor: SpaceX acquisition کا آفیشل اعلان، 14 اگست 2026](https://cursor.com/blog/joining-spacex)
- [TechCrunch: Nvidia–Hugging Face acquisition report](https://techcrunch.com/2026/08/26/nvidia-closes-in-on-hugging-face-acquisition/)
- [Hugging Face: State of Open Models، Summer 2026](https://huggingface.co/blog/state-of-open-models-summer-2026)
- [Google DeepMind: Double-blind AI evaluations](https://deepmind.google/blog/piloting-the-worlds-first-double-blind-ai-evaluations/)
- [Microsoft: Microsoft 365 Copilot release notes، 25 اگست 2026](https://learn.microsoft.com/en-us/microsoft-365/copilot/release-notes)

## اب آگے کیا سیکھیں؟

[2026 کے 12 بہترین AI tools اور ان کا درست استعمال](/blog/12-best-ai-tools-that-make-work-faster-and-easier/) پڑھ کر اپنے کام کے لیے متبادل tools منتخب کریں۔ اگر آپ open models کا مطلب سمجھنا چاہتے ہیں تو [بغیر انٹرنیٹ کے چلنے والے Meta Muse Glimmer کی آسان وضاحت](/blog/meta-muse-glimmer-open-weights-local-ai-urdu/) بھی دیکھیں۔
