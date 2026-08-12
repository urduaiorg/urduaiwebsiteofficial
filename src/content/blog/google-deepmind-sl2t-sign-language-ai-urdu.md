---
title: "اب اشاروں سے ٹائپ کریں: گوگل کا Sign Language AI کیسے کام کرتا ہے؟"
description: "گوگل DeepMind کا SL2T ماڈل ASL کو انگریزی متن میں بدلتا ہے۔ Pixel 11، Gboard اور Live Transcribe میں دستیابی، نمونے اور اہم حدود جانیں۔"
date: 2026-08-12
published_at: "2026-08-12T16:45:36Z"
focus_keyphrase: "Google Sign Language AI"
secondary_keyphrases:
  - "SL2T کیا ہے"
  - "اشاروں کی زبان سے ٹائپ"
  - "ASL to text Google"
  - "Pixel 11 sign language"
category: "اے آئی اپڈیٹ"
tags:
  - Google DeepMind
  - SL2T
  - Sign Language AI
  - accessibility
  - Pixel 11
image: "/images/blog/google-deepmind-sl2t-sign-language-ai-urdu.png"
image_width: 1200
image_height: 630
author: "اردو اے آئی ٹیم"
adsense: true
draft: false
faq:
  - question: "گوگل کا SL2T ماڈل کیا ہے؟"
    answer: "SL2T ایک sign-language-to-text ماڈل ہے جو اشاروں کی زبان میں جسم، چہرے اور ہاتھوں کی حرکت کو سمجھ کر متن بناتا ہے۔ پہلی consumer release امریکی اشاروں کی زبان سے انگریزی کے لیے ہے۔"
  - question: "کیا گوگل کا Sign Language AI پاکستانی اشاروں کی زبان سمجھتا ہے؟"
    answer: "نہیں۔ 12 اگست 2026 کی پہلی release صرف American Sign Language سے English translation کے لیے ہے۔ Google نے مزید sign languages کا وعدہ کیا ہے، لیکن Pakistan Sign Language یا Urdu کے لیے کوئی تاریخ نہیں دی۔"
  - question: "SL2T کن فونز پر دستیاب ہے؟"
    answer: "ابتدائی طور پر sign-to-text feature Pixel 11 میں Gboard اور Live Transcribe کے اندر دستیاب ہے۔ Google کے مطابق مزید devices بعد میں شامل ہوں گے۔"
  - question: "کیا SL2T انسانی sign-language interpreter کی جگہ لے سکتا ہے؟"
    answer: "نہیں۔ Google DeepMind اور اس کی advisory committee نے medical، legal، education، employment اور دوسرے high-stakes حالات میں اس کے استعمال کو واضح طور پر نامناسب قرار دیا ہے۔"
  - question: "کیا sign-language video Google کے server کو بھیجی جاتی ہے؟"
    answer: "Google کے مطابق raw camera video فون پر MediaPipe Holistic سے pose landmarks میں بدل کر فوراً discard ہوتی ہے۔ صرف geometric coordinates server کو translation کے لیے بھیجے جاتے ہیں، اس لیے processing مکمل طور پر on-device نہیں۔"
---

**گوگل ڈیپ مائنڈ (Google DeepMind) نے 12 اگست 2026 کو SL2T نامی sign-language-to-text ماڈل متعارف کرایا، جو اشاروں کی زبان کو براہِ راست متن میں بدلتا ہے۔** پہلی consumer release امریکی اشاروں کی زبان (ASL) سے انگریزی کے لیے Pixel 11 کے Gboard اور Live Transcribe میں آئی ہے؛ صارف فون کے سامنے sign کرکے search، message، document یا Gemini کا سوال لکھ سکتا ہے، لیکن پاکستانی اشاروں کی زبان ابھی شامل نہیں۔

یہ accessibility کی اہم پیش رفت ہے کیونکہ عام voice dictation سننے والے صارف کو بول کر لکھنے دیتی ہے، جبکہ Deaf صارف کو عموماً دوسری زبان میں keyboard سے ٹائپ کرنا پڑتا ہے۔ SL2T اسی جگہ sign کو input بناتا ہے۔ مگر اسے “ہر اشاروں کی زبان کا translator” کہنا درست نہیں ہوگا۔ موجودہ feature صرف ASL سے English کے لیے ہے اور Google نے دوسری زبانوں کی کوئی مقررہ تاریخ نہیں دی۔

## اشاروں سے فون میں کیا لکھا جاسکتا ہے؟

Gboard میں صارف وہ جگہ sign کرسکتا ہے جہاں عام طور پر keyboard سے text لکھتا ہے۔ مثال کے طور پر ویب پر سوال تلاش کرنا، WhatsApp message کا draft بنانا، Google Docs میں note لکھنا یا جیمینائی (Gemini) کو کوئی کام دینا۔ Live Transcribe میں سامنے والے شخص کی آواز captions میں دکھائی جاسکتی ہے، پھر Deaf صارف اپنا جواب sign کرکے English text کی صورت میں دکھا سکتا ہے۔

Google کے مطابق یہ سہولت Pixel 11 پر Gboard اور Live Transcribe میں پہلے دستیاب ہے اور بعد میں مزید devices آئیں گے۔ feature کے لیے الگ فیس نہیں، لیکن یہ کوئی آزاد مفت app بھی نہیں؛ آغاز میں Pixel 11 ہونا ضروری ہے۔

<figure class="article-video">
  <video controls playsinline preload="metadata" poster="/images/blog/google-deepmind-sl2t-sign-language-ai-video-1.jpg" style="width:100%;height:auto;border-radius:14px;background:#08111f;" aria-label="Google DeepMind SL2T سے اشاروں کی زبان کے ذریعے فون میں متن لکھنے کا نمونہ">
    <source src="https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/u17eOqQkpBDEsvsN/GDM-Sign-To-Text-Gemini-18_v3_Light.webm#t=0.1" type="video/webm" />
    آپ کا browser یہ ویڈیو نہیں چلا سکا۔ <a href="https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/u17eOqQkpBDEsvsN/GDM-Sign-To-Text-Gemini-18_v3_Light.webm">آفیشل نمونہ یہاں دیکھیں</a>۔
  </video>
  <figcaption>آفیشل نمونہ: ASL میں sign کرکے فون میں text لکھنا۔ ویڈیو: Google DeepMind۔</figcaption>
</figure>

## یہ صرف ہاتھ نہیں، پوری زبان کیسے سمجھتا ہے؟

اشاروں کی زبان بولی جانے والی زبان کے الفاظ کی ہاتھوں سے نقل نہیں۔ اس کی اپنی grammar اور vocabulary ہوتی ہے، جبکہ مطلب ہاتھوں کے ساتھ بازو، جسم، سر، چہرے کے تاثرات اور جگہ کے استعمال سے بنتا ہے۔ اسی لیے صرف انگلیاں پہچاننے والا system مکمل جملہ نہیں سمجھ سکتا۔

SL2T میں فون پر چلنے والا MediaPipe Holistic کیمرے کی تصویر سے چہرے، جسم اور ہاتھوں کے 130 اہم points یا **pose landmarks** نکالتا ہے۔ raw video Google کے مطابق فوراً discard ہوجاتی ہے اور server کو صرف ان points کے geometric coordinates translation کے لیے ملتے ہیں۔ اس سے اصل چہرہ، کپڑے اور کمرے کی تصویر server تک نہیں جاتی، لیکن اہم وضاحت یہ ہے کہ translation پھر بھی Google server پر ہوتی ہے؛ پوری سہولت offline یا مکمل on-device نہیں۔

<figure class="article-video">
  <video controls playsinline preload="metadata" poster="/images/blog/google-deepmind-sl2t-sign-language-ai-video-2.jpg" style="width:100%;height:auto;border-radius:14px;background:#08111f;" aria-label="SL2T میں pose landmarks سے sign language کو متن میں بدلنے کا نمونہ">
    <source src="https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/u17eOqQkpBDEsvsN/GDM_Text-To-Sign.webm#t=0.1" type="video/webm" />
    آپ کا browser یہ ویڈیو نہیں چلا سکا۔ <a href="https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/u17eOqQkpBDEsvsN/GDM_Text-To-Sign.webm">آفیشل technical نمونہ یہاں دیکھیں</a>۔
  </video>
  <figcaption>ماڈل raw تصویر کے بجائے signer کے جسم پر pose landmarks دیکھ کر streaming text بناتا ہے۔ ویڈیو: Google DeepMind۔</figcaption>
</figure>

Google نے ماڈل کو 50 سے زیادہ sign languages کے ایک لاکھ گھنٹے سے زیادہ data پر train کیا، جس میں تقریباً ایک چوتھائی ASL تھا۔ مختلف زبانوں اور signing styles کو ایک ساتھ سیکھنے سے model نے company experiments میں single-language models سے بہتر نتیجہ دیا۔ لیکن consumer feature میں ابھی اسی وسیع training کے باوجود صرف ASL-to-English support کھولی گئی ہے۔

## نتیجہ غلط ہو تو کیا ہوگا؟

SL2T autonomous interpreter نہیں بلکہ assistive drafting tool ہے۔ Gboard اور Live Transcribe پہلے translated text صارف کو دکھاتے ہیں تاکہ وہ اسے پڑھ، درست اور پھر send یا display کرے۔ یہ حفاظت اسی وقت کام کرتی ہے جب صارف English پڑھ سکتا ہو اور غلطی پہچان سکے۔

Google DeepMind اور Deaf community کے نمائندوں کی مشترکہ impact report کئی حقیقی حدود درج کرتی ہے۔ ماڈل بعض facial expressions، head movement اور دوسرے **non-manual markers** کھو سکتا ہے؛ regional signs یا ایک جیسے نظر آنے والے مختلف معنی غلط سمجھ سکتا ہے؛ اور pause یا دوسرے شخص کے frame میں آنے پر کبھی ایسی عبارت بنا سکتا ہے جو sign ہی نہیں کی گئی۔ کم روشنی، ہاتھ یا چہرہ frame سے باہر ہونا اور غیرمعمولی camera angle بھی accuracy کم کرتے ہیں۔

Report میں multi-digit numbers بگڑنے کی مثال بھی موجود ہے، جبکہ ہر clip کی حد 60 seconds ہے اور system پچھلی گفتگو کا مکمل context محفوظ نہیں رکھتا۔ بچوں کے signing data پر اسے train یا باقاعدہ evaluate نہیں کیا گیا۔ اس لیے generated English بھیجنے سے پہلے دیکھنا ضروری ہے، خاص طور پر نام، نمبر، جگہ اور وقت۔

## کہاں اس کا استعمال نہیں ہونا چاہیے؟

Google DeepMind اور AI Sign Language Advisory Committee نے medical consultation، emergency، عدالت یا پولیس، formal education assessment، job interview، HR dispute اور benefits جیسے high-stakes حالات کو اس release کے دائرے سے باہر رکھا ہے۔ SL2T spoken English کو واپس sign language میں نہیں بدلتا، clarification نہیں مانگ سکتا اور certified interpreter کی cultural understanding، judgment یا ذمہ داری نہیں رکھتا۔

اداروں کو صرف خرچ بچانے کے لیے انسانی interpreter کی جگہ یہ software نہیں دینا چاہیے۔ روزمرہ search، casual message یا coffee shop میں مختصر گفتگو اور کسی کے علاج، قانونی حق یا ملازمت کا فیصلہ ایک جیسے حالات نہیں۔ پہلے میں AI draft مدد دے سکتا ہے؛ دوسرے میں اہل انسانی interpreter ضروری ہے۔

## پاکستان کے لیے اصل خلا کیا ہے؟

پاکستانی Deaf community کی اپنی پاکستان سائن لینگویج (Pakistan Sign Language یا PSL) ہے، جس میں علاقائی dialects بھی موجود ہیں۔ Deaf Reach اور Family Educational Services Foundation کا [PSL platform](https://psl.org.pk/) ساڑھے سات ہزار سے زیادہ signs اور families، teachers اور students کے لیے learning resources فراہم کرتا ہے۔

SL2T کی موجودہ release PSL یا Urdu text کو support نہیں کرتی، اس لیے پاکستان میں اسے مقامی accessibility solution سمجھنا قبل از وقت ہوگا۔ البتہ Google نے model کو 50 سے زیادہ sign languages کے data پر train کیا ہے اور مزید زبانیں شامل کرنے کا ارادہ بتایا ہے۔ اصل امتحان یہ ہوگا کہ آئندہ expansion میں مقامی Deaf communities کو data، evaluation اور فیصلوں میں شریک کیا جاتا ہے یا نہیں۔ PSL کے لیے صرف ترجمہ کافی نہیں؛ regional signs، facial grammar، مختلف signing styles اور Urdu literacy کی ضرورت بھی سمجھنی ہوگی۔

یہ launch ایک مفید سمت دکھاتا ہے: AI میں accessibility کو اضافی feature کے بجائے بنیادی input method بنایا جاسکتا ہے۔ ابھی فائدہ محدود ہے—ASL، English اور Pixel 11 تک۔ لیکن اگر یہی طریقہ مقامی communities کے ساتھ ذمہ داری سے دوسری sign languages تک پہنچا تو فون پہلی بار بہت سے لوگوں کے لیے ان کی اپنی زبان سننے والا آلہ بن سکتا ہے۔

## ذرائع اور مزید مطالعہ

- [Google DeepMind: Putting sign language AI into users’ hands](https://deepmind.google/blog/putting-sign-language-ai-into-users-hands/) — launch، training data، Pixel 11 integration، privacy design، benchmark اور roadmap۔
- [Google DeepMind اور AISLAC: SL2T 1.0 Joint Impact Report](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/putting-sign-language-ai-into-users-hands/aislac-joint-impact-report-for-sl2t-1-0.pdf) — supported use cases، limitations، privacy، high-risk exclusions اور Deaf community evaluation۔
- [Google Research: MediaPipe Holistic](https://research.google/blog/mediapipe-holistic-simultaneous-face-hand-and-pose-prediction-on-device/) — face، hands اور body pose tracking کی technical بنیاد۔
- [Pakistan Sign Language](https://psl.org.pk/about) — PSL، علاقائی dialects اور مقامی learning resources۔

*ویڈیوز: Google DeepMind۔ Cover artwork: Urdu AI۔*
