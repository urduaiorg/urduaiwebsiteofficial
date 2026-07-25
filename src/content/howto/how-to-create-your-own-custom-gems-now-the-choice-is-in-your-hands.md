---
title: "Google Gemini Gems کیسے بنائیں؟ فائلوں، demos اور کام کی عملی اردو گائیڈ"
description: "Google Gemini Gems سے اپنا مستقل AI assistant بنائیں: instructions، Knowledge files، practical demos، testing، sharing اور ضروری احتیاطیں آسان اردو میں۔"
date: 2025-04-07
last_verified: 2026-07-25
category: "ہاؤ ٹو"
tool: "Google Gemini"
difficulty: "آسان"
time_required: "15 منٹ"
screenshots: false
adsense: true
draft: false
tools:
  - Gemini
  - NotebookLM
faq:
  - question: "Google Gemini Gem کیا ہوتا ہے؟"
    answer: "Gem، Gemini کا آپ کی ضرورت کے مطابق بنایا ہوا version ہے۔ آپ اس کے لیے مستقل instructions، جواب کا انداز اور ضرورت ہو تو Knowledge files مقرر کرتے ہیں، اس لیے ہر نئی chat میں ایک ہی بات دوبارہ نہیں لکھنی پڑتی۔"
  - question: "کیا Gem میں اپنی فائلیں شامل کی جا سکتی ہیں؟"
    answer: "جی۔ Gem کے Knowledge حصے میں device سے file، Google Drive کی file، یا NotebookLM notebook شامل کی جا سکتی ہے۔ Drive file کی نئی version Gem میں reflect ہو سکتی ہے، اس لیے صرف وہی file دیں جس تک مناسب لوگوں کی رسائی ہو۔"
  - question: "Gem اور عام Gemini chat میں کیا فرق ہے؟"
    answer: "عام chat عارضی ہدایات سے شروع ہوتی ہے۔ Gem میں آپ کا مقصد، لہجہ، output format اور Knowledge مستقل رہتے ہیں، اس لیے بار بار ہونے والے کام زیادہ یکساں انداز میں کیے جا سکتے ہیں۔"
  - question: "کیا Gem موبائل پر بھی چلتا ہے؟"
    answer: "Custom Gem کو Gemini web app میں بنانا اور edit کرنا ہوتا ہے، لیکن save ہونے کے بعد اسے Gemini mobile app اور Google Workspace side panel میں استعمال کیا جا سکتا ہے۔ Gemini Live میں Gems فی الحال استعمال نہیں ہوتے۔"
  - question: "کیا Gem کو دوسروں کے ساتھ share کیا جا سکتا ہے؟"
    answer: "جی، Gem share کیا جا سکتا ہے، لیکن viewer آپ کی instructions اور شامل files دیکھ سکتا ہے۔ editor انہیں بدل یا delete بھی کر سکتا ہے، اس لیے confidential material شامل نہ کریں اور access level سوچ کر منتخب کریں۔"
---

Google Gemini Gems آپ کو ایک مخصوص کام کے لیے اپنا مستقل AI assistant بنانے دیتے ہیں۔ آپ اسے بتاتے ہیں کہ کس کے لیے کام کرنا ہے، کس لہجے میں جواب دینا ہے، نتیجہ کس format میں دینا ہے، اور پھر چاہیں تو اپنی documents یا Google Drive files اس کے Knowledge میں دے دیتے ہیں۔ یہ feature بار بار ہونے والے کام—جیسے lesson planning، CV feedback، product FAQs یا content editing—میں خاص طور پر مفید ہے، لیکن اس کا جواب پھر بھی check کرنا ضروری ہے۔

یہ گائیڈ اردو اے آئی کے [Gemini Gems tutorial](https://youtu.be/Acvldl139Y4?si=gwozB01SczZ492Un) کے ساتھ پڑھیں۔ ویڈیو میں بنیادی workflow دیکھیں؛ نیچے ہم اسے practical demos، Knowledge files، testing اور sharing تک لے جاتے ہیں۔

## Gem کس کام کے لیے بنانا چاہیے؟

Gem عام chatbot کا نیا نام نہیں ہے۔ اس کی اصل طاقت تب سامنے آتی ہے جب آپ کو ایک ہی قسم کا کام بار بار کرنا پڑتا ہو اور آپ چاہتے ہوں کہ Gemini ہر بار ایک جیسے اصول مانے۔ مثال کے طور پر ایک teacher ایسا Gem بنا سکتا ہے جو نویں جماعت کے لیے science کے سوالات آسان اردو میں سمجھائے، آخر میں دو practice questions دے، اور جواب دینے سے پہلے student سے اس کی کوشش پوچھے۔

Google کے اپنے examples میں idea brainstormer، coding partner اور writing editor شامل ہیں۔ تعلیم میں teachers نے course readings اور assignments کی بنیاد پر interactive-simulations یا quiz-style Gems بنائے ہیں۔ اس سے ایک اچھی عملی بات سامنے آتی ہے: Gem کو بہت وسیع "ہر کام کا expert" نہ بنائیں؛ ایک واضح مسئلہ دیں۔

### چند قابلِ عمل ideas

- **Study coach:** اپنے notes سے quiz، revision plan اور آسان explanation بنوائے۔
- **Urdu/English writing editor:** خط، CV یا article کو صرف grammar، clarity اور tone کے لحاظ سے بہتر کرے۔
- **Small-business reply helper:** approved price list اور FAQs کے مطابق customer replies draft کرے۔
- **Content planner:** brand voice اور پچھلی posts کی مثالوں سے ہفتہ وار content ideas تیار کرے۔
- **Policy یا handbook helper:** کسی NGO، school یا office کے approved documents کے اندر رہ کر سوالوں کا جواب دے۔

## شروع کرنے سے پہلے کیا تیار رکھیں؟

سب سے پہلے اپنا کام ایک جملے میں لکھیں: "یہ Gem کس شخص کے لیے، کون سا کام، کس معیار کے ساتھ کرے گا؟" پھر ایک یا دو اصل documents منتخب کریں۔ شروع میں پوری Drive یا بہت سی پرانی files نہ ڈالیں۔ کم مگر صاف material بہتر نتائج دیتا ہے۔

Google کی موجودہ ہدایات کے مطابق Gem بنانے کے لیے Gemini میں sign in ہونا ضروری ہے اور personal account کے لیے عمر کم از کم 13 سال، یا آپ کے ملک میں قابلِ اطلاق عمر، ہونی چاہیے۔ Account، ملک اور plan کے حساب سے limits بدل سکتی ہیں؛ نئے Gem کو save کرنے سے پہلے اپنے Gemini interface میں نظر آنے والی limits ضرور دیکھیں۔

## مرحلہ 1: مسئلہ، مخاطب اور نتیجہ طے کریں

پہلے یہ تین چیزیں لکھیں:

1. **مقصد:** Gem کیا کرے گا؟
2. **مخاطب:** جواب کس کے لیے ہے؟
3. **نتیجہ:** جواب کس شکل میں چاہیے؟

مثال کے طور پر "میرے لیے social media posts لکھو" مبہم ہے۔ اس سے بہتر ہے: "پاکستان کے home-based bakery کے لیے 3 Instagram post ideas دو؛ زبان سادہ اردو ہو، ہر idea میں hook، caption اور CTA ہو؛ health یا delivery کے غیر ثابت دعوے نہ کرو۔"

یہی فرق عام prompt اور قابلِ اعتماد Gem میں ہے۔ Gemini کی آفیشل advice بھی instructions کو persona، task، context اور format میں سوچنے کی تجویز دیتی ہے۔

## مرحلہ 2: Gemini میں نیا Gem بنائیں

[gemini.google.com](https://gemini.google.com/) کھولیں، sidebar میں **Gems** یا **Explore Gems** پر جائیں اور **New Gem** منتخب کریں۔ اپنے Gem کا مختصر، پہچانے جانے والا نام رکھیں، مثلاً "FSc Biology Study Coach" یا "Bakery Reply Helper"۔

Instructions کے box میں پہلے اپنا سادہ مقصد لکھیں۔ Gemini آپ کو **Use Gemini to rewrite instructions** کا option بھی دے سکتا ہے، لیکن اس کا rewritten متن بغیر پڑھے save نہ کریں۔ اسے اپنے کام، زبان اور حدود کے مطابق edit کریں۔ دائیں طرف preview area میں دو تین حقیقی سوال آزما لیں؛ preview چلانا Gem کو خود save نہیں کرتا، آخر میں **Save** ضرور کریں۔

## مرحلہ 3: instructions کو چار حصوں میں لکھیں

یہ copy-and-edit template استعمال کریں۔ square brackets والی جگہ اپنی ضرورت کے مطابق بدلیں:

```text
آپ [Gem کا کردار] ہیں۔ آپ [کس شخص/گروپ] کی [واضح کام] میں مدد کرتے ہیں۔

آپ کا کام:
- [کام 1]
- [کام 2]
- [کام 3]

جواب دینے کے اصول:
- زبان: [سادہ اردو / English / دونوں]
- لہجہ: [دوستانہ، professional، مختصر]
- اگر ضروری معلومات نہ ہوں تو پہلے [1 سے 3] مختصر سوال پوچھیں۔
- غیر یقینی بات کو حقیقت کے طور پر پیش نہ کریں۔
- جہاں Knowledge files سے بات لی ہو، file کا نام بتائیں۔

ہر جواب کا format:
1. مختصر جواب
2. قابلِ عمل اگلا قدم
3. ضرورت ہو تو checklist یا table
```

"ہر سوال کا جواب دو" یا "best جواب دو" جیسی ہدایات کمزور ہوتی ہیں۔ اس کے برعکس، audience، حدود، examples اور output format لکھنا Gem کو زیادہ قابلِ استعمال بناتا ہے۔

## مرحلہ 4: Knowledge میں صحیح files دیں

Gem editor میں **Knowledge** کے نیچے **Add files** منتخب کریں۔ آپ device سے file upload، Google Drive سے file شامل، یا NotebookLM notebook منتخب کر سکتے ہیں۔ Drive file شامل کرنے کے لیے Gemini Apps activity اور Workspace connection کی ضرورت پڑ سکتی ہے؛ interface اگر connection مانگے تو پہلے اس کی data settings سمجھ لیں۔

فائلیں Gem کو موضوع کا context دیتی ہیں، مگر وہ جواب کی ضمانت نہیں۔ اس لیے files کو پہلے صاف کریں: ایک current price list، ایک approved FAQ، ایک style guide، یا ایک semester کے درست notes۔ scans، duplicate versions، غیر متعلق WhatsApp exports اور confidential customer data نہ دیں۔

Google کی file-upload help کے مطابق ایک prompt میں زیادہ سے زیادہ 10 supported files شامل کی جا سکتی ہیں، عموماً غیر-video files کے لیے 100 MB تک اور video کے لیے 2 GB تک حد ہے؛ audio/video duration اور usage limits plan کے مطابق بدلتی ہیں۔ بڑی files میں Gemini اہم detail miss کر سکتا ہے، اس لیے چھوٹی، صاف اور تازہ files زیادہ بہتر رہتی ہیں۔

ایک اہم فرق یاد رکھیں: Drive سے شامل file کا تازہ version Gem میں reflect ہو سکتا ہے۔ یہ handbook یا price list کو current رکھنے میں مفید ہے، لیکن اس کا مطلب ہے کہ file access اور version control آپ کی ذمہ داری ہے۔ اگر response میں citations نہیں چاہییں تو Knowledge citations بند کرنے کا option موجود ہے؛ learning، policy یا research Gem میں citations چلنے دینا زیادہ شفاف رہتا ہے۔

## مرحلہ 5: دو sample Gems سے اپنا پہلا demo چلائیں

### Demo 1: notes سے Study Coach

**Knowledge میں دیں:** ایک chapter کے صاف PDF یا Google Doc notes۔

**Instructions میں شامل کریں:**

```text
آپ FSc کے طالب علم کے لیے Biology Study Coach ہیں۔
صرف دیے گئے notes کی بنیاد پر سمجھائیں۔
پہلے طالب علم سے پوچھیں کہ وہ کون سا topic پڑھ رہا ہے۔
جواب سادہ اردو میں دیں، English scientific terms ساتھ رکھیں۔
آخر میں 3 مختصر self-test سوالات بنائیں؛ جب تک طالب علم نہ کہے، جواب نہ بتائیں۔
اگر notes میں جواب موجود نہ ہو تو صاف کہیں کہ یہ material میں نہیں ملا۔
```

**آزمائیں:** "Cell membrane کے تین کام سمجھاؤ، پھر مجھ سے تین سوال پوچھو۔" پھر notes کھول کر دیکھیں: کیا تعریفیں درست ہیں؟ کیا اس نے ایسا نکتہ شامل تو نہیں کیا جو file میں موجود نہیں؟

### Demo 2: files کے ساتھ Small Business Reply Helper

**Knowledge میں دیں:** اپنی approved product list، prices، delivery policy اور FAQs۔

**Instructions میں شامل کریں:**

```text
آپ ایک چھوٹے online business کے customer-reply assistant ہیں۔
صرف Knowledge files میں موجود product، price اور policy استعمال کریں۔
اگر مطلوبہ price یا stock موجود نہ ہو تو جواب گھڑنے کے بجائے کہیں کہ team سے confirm کیا جائے گا۔
جواب مختصر، نرم اور سادہ اردو میں دیں۔
ہر draft کے آخر میں لکھیں: "بھیجنے سے پہلے price اور availability check کر لیں۔"
```

**آزمائیں:** "کراچی کے لیے 2 kg cake کی delivery اور price بتائیں۔" اس demo میں جان بوجھ کر ایسا سوال بھی پوچھیں جس کا جواب file میں موجود نہ ہو۔ اچھا Gem confidence سے غلط جواب دینے کے بجائے gap بتائے گا۔

## مرحلہ 6: save کرنے سے پہلے Gem کو test کریں

Gem کا پہلا جواب اس کی کامیابی کا ثبوت نہیں۔ اسے کم از کم پانچ سوال دیں: ایک عام سوال، ایک مبہم سوال، ایک ایسا سوال جس کا جواب file میں ہو، ایک ایسا جو file میں نہ ہو، اور ایک ایسا سوال جو اس کی حد سے باہر ہو۔

اگر جواب لمبا ہے تو format سخت کریں: "پہلے 4 bullets، پھر ایک next step"۔ اگر وہ facts گھڑتا ہے تو لکھیں: "Knowledge میں موجود نہ ہو تو guess نہ کریں"۔ اگر وہ غلط audience کے لیے لکھتا ہے تو عمر، class، profession یا language واضح کریں۔ ایک ہی وقت میں دس تبدیلیاں نہ کریں؛ ایک مسئلہ دیکھیں، instruction بدلیں، پھر وہی test دوبارہ کریں۔

## Gem share کرنے سے پہلے کیا سمجھیں؟

Gem دوسرے لوگوں کو دیا جا سکتا ہے، مگر sharing صرف link بھیجنے جتنی سادہ بات نہیں۔ Google کے مطابق جس شخص کو access ملے، وہ Gem کی instructions اور اس میں شامل uploaded files دیکھ سکتا ہے۔ **Viewer** اسے استعمال اور material دیکھ سکتا ہے، جبکہ **Editor** instructions/files بدل، share یا delete بھی کر سکتا ہے۔

اس لیے student records، CNIC، passwords، private client lists، health information، contracts یا غیر منظور شدہ internal documents Knowledge میں نہ رکھیں۔ اگر آپ Gem share کرنا چاہتے ہیں تو پہلے ایک صاف "shareable" version بنائیں جس میں صرف وہ material ہو جو دوسرے دیکھ سکتے ہیں۔ NotebookLM notebooks shared Gems میں source کے طور پر استعمال نہیں ہو سکتے، اور بعض Knowledge file types کے ساتھ sharing محدود ہو سکتی ہے۔

## یہ کہاں نہیں چلتا؟

Gems، Gemini Live میں فی الحال کام نہیں کرتے۔ Custom Gem web app میں create/edit ہوتا ہے، پھر use کے لیے mobile app اور Workspace side panel میں دکھائی دے سکتا ہے۔ Work یا school account میں organization کی Gemini settings مختلف ہو سکتی ہیں، اس لیے option نظر نہ آئے تو administrator کی policy بھی وجہ ہو سکتی ہے۔

سب سے ضروری حد یہ ہے کہ Gem نے instructions اور files تو دیکھی ہیں، مگر وہ انسانی judgment کا بدل نہیں ہے۔ legal، medical، financial یا admission/employment decisions میں اسے draft یا starting point کے طور پر رکھیں؛ حتمی فیصلہ متعلقہ expert اور اصل source سے verify کریں۔

## آج کا چھوٹا تجربہ

ایک ایسا کام چنیں جو آپ ہر ہفتے کم از کم دو بار کرتے ہیں۔ اس کے لیے صرف ایک مقصد، ایک clean document اور اوپر والا template لے کر Gem بنائیں۔ پانچ tests کریں، ایک غلطی دیکھیں، instruction بہتر کریں، اور پھر اسے اپنے اصل کام میں استعمال کریں۔ یہی طریقہ Gems کو محض دلچسپ feature کے بجائے حقیقی مددگار بناتا ہے۔

## مزید آفیشل معلومات

- [Google: Gems create کرنے اور instructions لکھنے کی تجاویز](https://support.google.com/gemini/answer/15235603?hl=en)
- [Google: Gems use، Knowledge اور device/mobile availability](https://support.google.com/gemini/answer/15146780?hl=en)
- [Google: files upload کرنے کے supported limits](https://support.google.com/gemini/answer/14903178?hl=en)
- [Google: Gem sharing اور access levels](https://support.google.com/gemini/answer/16504957?hl=en)
- [Google for Education: teachers کے Gems استعمال کرنے کی مثالیں](https://blog.google/products-and-platforms/products/education/gemini-iste-2025/)

## عام سوالات

### Google Gemini Gem کیا ہوتا ہے؟

Gem، Gemini کا آپ کی ضرورت کے مطابق بنایا ہوا version ہے۔ آپ اس کے لیے مستقل instructions، جواب کا انداز اور ضرورت ہو تو Knowledge files مقرر کرتے ہیں، اس لیے ہر نئی chat میں ایک ہی بات دوبارہ نہیں لکھنی پڑتی۔

### کیا Gem میں اپنی فائلیں شامل کی جا سکتی ہیں؟

جی۔ Gem کے Knowledge حصے میں device سے file، Google Drive کی file، یا NotebookLM notebook شامل کی جا سکتی ہے۔ Drive file کی نئی version Gem میں reflect ہو سکتی ہے، اس لیے صرف وہی file دیں جس تک مناسب لوگوں کی رسائی ہو۔

### Gem اور عام Gemini chat میں کیا فرق ہے؟

عام chat عارضی ہدایات سے شروع ہوتی ہے۔ Gem میں آپ کا مقصد، لہجہ، output format اور Knowledge مستقل رہتے ہیں، اس لیے بار بار ہونے والے کام زیادہ یکساں انداز میں کیے جا سکتے ہیں۔

### کیا Gem موبائل پر بھی چلتا ہے؟

Custom Gem کو Gemini web app میں بنانا اور edit کرنا ہوتا ہے، لیکن save ہونے کے بعد اسے Gemini mobile app اور Google Workspace side panel میں استعمال کیا جا سکتا ہے۔ Gemini Live میں Gems فی الحال استعمال نہیں ہوتے۔

### کیا Gem کو دوسروں کے ساتھ share کیا جا سکتا ہے؟

جی، Gem share کیا جا سکتا ہے، لیکن viewer آپ کی instructions اور شامل files دیکھ سکتا ہے۔ editor انہیں بدل یا delete بھی کر سکتا ہے، اس لیے confidential material شامل نہ کریں اور access level سوچ کر منتخب کریں۔
