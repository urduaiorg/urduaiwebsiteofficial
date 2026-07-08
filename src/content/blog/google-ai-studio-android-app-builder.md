---
title: گوگل اے آئی اسٹوڈیو سے پہلی اینڈرائیڈ ایپ کیسے بنائیں؟ مکمل گائیڈ
description: گوگل اے آئی اسٹوڈیو سے بغیر کوڈنگ اپنی پہلی اینڈرائیڈ ایپ بنائیں، پرامپٹ لکھیں، ایمولیٹر میں ٹیسٹ کریں اور فون پر انسٹال کریں۔
date: 2026-07-07
category: اے آئی اپڈیٹ
tags:
  - گوگل اے آئی اسٹوڈیو
  - اینڈرائیڈ ایپ
  - اے آئی کوڈنگ
  - پرامپٹ انجینیئرنگ
image: /images/blog/google-ai-studio-android-app-builder.png
author: قیصر رونجھا
adsense: true
draft: false
tools:
  - Google AI Studio
  - Gemini
last_updated: 2026-07-07
faq:
  - question: کیا گوگل اے آئی اسٹوڈیو سے واقعی اینڈرائیڈ ایپ بن سکتی ہے؟
    answer: جی ہاں۔ گوگل کی سرکاری دستاویزات کے مطابق گوگل اے آئی اسٹوڈیو میں قدرتی زبان کے پرامپٹ سے Kotlin اور Jetpack Compose پر مبنی نیٹو اینڈرائیڈ پروجیکٹ بن سکتا ہے۔
  - question: کیا اس کے لیے اینڈرائیڈ اسٹوڈیو انسٹال کرنا ضروری ہے؟
    answer: ابتدائی پروٹو ٹائپ کے لیے نہیں۔ گوگل اے آئی اسٹوڈیو براؤزر میں ایمولیٹر چلاتا ہے، اس لیے آپ بغیر Android Studio یا SDK انسٹال کیے ایپ دیکھ سکتے ہیں۔
  - question: کیا بنائی ہوئی ایپ فون پر انسٹال ہو سکتی ہے؟
    answer: جی ہاں۔ Chrome یا Edge، USB کیبل، Developer Options اور USB debugging کے ذریعے AI Studio سے APK فون پر انسٹال کیا جا سکتا ہے۔
  - question: کیا یہ طریقہ Play Store پر ایپ شائع کرنے کے لیے کافی ہے؟
    answer: ٹیسٹنگ کے لیے اچھا ہے، مگر عوامی لانچ سے پہلے ایپ کی پالیسی، پرائیویسی، ڈیزائن، سیکیورٹی اور اصل ڈیوائس ٹیسٹنگ لازمی کریں۔
---

گوگل اے آئی اسٹوڈیو (Google AI Studio) سے اینڈرائیڈ ایپ بنانا اب ابتدائی صارف کے لیے بھی ممکن ہے: آپ اپنا آئیڈیا عام زبان میں لکھتے ہیں، اے آئی Kotlin اور Jetpack Compose کا پروجیکٹ بناتا ہے، براؤزر میں ایپ دکھاتا ہے، اور پھر آپ اسے اپنے اینڈرائیڈ فون پر ٹیسٹ کر سکتے ہیں۔

یہ گائیڈ اسی ویڈیو کی عملی شکل ہے:

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:1.5rem 0;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" src="https://www.youtube-nocookie.com/embed/qyWinL6_TbI" title="اے آئی کی مدد سے اپنی پہلی Android App بنانا اب بہت آسان ہے" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

اس مضمون میں ہم تین چیزیں کریں گے: پہلے ایپ کا صاف آئیڈیا بنائیں گے، پھر گوگل اے آئی اسٹوڈیو کے لیے مضبوط پرامپٹ لکھیں گے، اور آخر میں ایپ کو براؤزر ایمولیٹر اور اپنے فون پر ٹیسٹ کرنے کا طریقہ سمجھیں گے۔

## شروع کرنے سے پہلے کیا چاہیے؟

اس گائیڈ کے لیے آپ کو بہت زیادہ تکنیکی چیزوں کی ضرورت نہیں۔ بنیادی چیزیں یہ ہیں:

- گوگل اکاؤنٹ
- Chrome یا Edge براؤزر
- انٹرنیٹ کنکشن
- اینڈرائیڈ فون
- USB کیبل
- گوگل اے آئی اسٹوڈیو کی ویب سائٹ: [aistudio.google.com](https://aistudio.google.com/)
- اینڈرائیڈ ایپ بنانے والا سرکاری صفحہ: [Google AI Studio Android guide](https://ai.google.dev/gemini-api/docs/aistudio-android)

رسائی چیک لسٹ:

| سوال | جواب |
| --- | --- |
| قیمت | بنیادی استعمال مفت شروع کیا جا سکتا ہے، مگر استعمال کی حدیں اور گوگل اکاؤنٹ پالیسی لاگو ہو سکتی ہیں |
| VPN | پاکستان میں عموماً بغیر VPN کے چلنا چاہیے؛ اگر آپ کے نیٹ ورک پر مسئلہ ہو تو دوسرا نیٹ ورک آزما لیں |
| موبائل | ایپ کا خیال موبائل سے لکھ سکتے ہیں، مگر فون پر APK انسٹال کرنے کے لیے کمپیوٹر، Chrome یا Edge، اور USB زیادہ آسان ہیں |
| کوڈنگ | شروع کرنے کے لیے کوڈنگ ضروری نہیں، مگر سنجیدہ ایپ لانچ کرنے سے پہلے تکنیکی چیک ضروری ہے |

## گوگل اے آئی اسٹوڈیو اصل میں کیا بناتا ہے؟

گوگل کی سرکاری دستاویز کے مطابق گوگل اے آئی اسٹوڈیو میں Build mode کے اندر Android منتخب کر کے آپ قدرتی زبان میں ایپ بیان کر سکتے ہیں۔ پھر Antigravity Agent مکمل Kotlin اور Jetpack Compose پروجیکٹ بناتا ہے۔ یہ وہی جدید اینڈرائیڈ ٹیکنالوجی ہے جس سے نیٹو اینڈرائیڈ ایپس بنائی جاتی ہیں۔

گوگل کے مطابق آپ براؤزر کے اندر:

- ایپ کا کوڈ بنوا سکتے ہیں
- ایمولیٹر میں ایپ چلا سکتے ہیں
- chat panel سے تبدیلیاں کروا سکتے ہیں
- Code tab میں کوڈ دیکھ سکتے ہیں
- USB کے ذریعے اپنے فون پر ایپ انسٹال کر سکتے ہیں
- Google Play Console کے internal testing track پر ٹیسٹ ورژن شائع کر سکتے ہیں

سرکاری حوالہ: [Build Android Apps in Google AI Studio](https://ai.google.dev/gemini-api/docs/aistudio-android)

## پہلا مرحلہ: ایپ کا آئیڈیا صاف کریں

زیادہ تر لوگ پہلی غلطی یہ کرتے ہیں کہ وہ صرف لکھتے ہیں:

> میرے لیے ایک ایپ بنا دو

یہ پرامپٹ بہت کمزور ہے کیونکہ اے آئی کو معلوم نہیں کہ ایپ کس کے لیے ہے، کیا مسئلہ حل کرے گی، کون سی زبان ہوگی، اور کون سے بٹن یا اسکرینیں چاہئیں۔

بہتر طریقہ یہ ہے کہ پہلے اپنا خیال پانچ سوالات میں صاف کریں:

- ایپ کس شخص کے لیے ہے؟
- وہ شخص کون سا مسئلہ حل کرنا چاہتا ہے؟
- ایپ کا سب سے اہم کام کیا ہوگا؟
- ایپ میں کون سی معلومات محفوظ یا دکھائی جائیں گی؟
- ایپ اردو، انگریزی، یا دونوں زبانوں میں ہوگی؟

مثال کے طور پر:

> یہ ایپ ایک چھوٹے دکاندار کے لیے ہے۔ وہ روزانہ آمدنی اور خرچ لکھنا چاہتا ہے۔ ایپ کا مقصد دن کے آخر میں نفع یا نقصان دکھانا ہے۔ زبان آسان اردو ہوگی۔

یہ ایک اچھا آغاز ہے کیونکہ اب اے آئی کو صارف، مسئلہ، فائدہ اور زبان سب معلوم ہیں۔

## دوسرا مرحلہ: گوگل اے آئی اسٹوڈیو کھولیں

گوگل اے آئی اسٹوڈیو میں ایپ بنانے کے لیے یہ راستہ استعمال کریں:

- [aistudio.google.com](https://aistudio.google.com/) کھولیں
- بائیں طرف سے Build mode میں جائیں
- platform picker میں Android منتخب کریں
- پرامپٹ باکس میں اپنی ایپ کا خیال لکھیں
- Generate یا Run کے ذریعے پروجیکٹ بننے دیں

گوگل کے Build mode کی تفصیل یہاں ہے: [Build apps in Google AI Studio](https://ai.google.dev/gemini-api/docs/aistudio-build-mode)

اگر آپ پہلی بار استعمال کر رہے ہیں تو بہت بڑی ایپ نہ بنائیں۔ پہلے ایک چھوٹی ایپ بنائیں جس میں دو یا تین اسکرینیں ہوں۔ جب وہ ٹھیک چل جائے تو پھر نئی خصوصیات شامل کریں۔

## تیسرا مرحلہ: پہلا مضبوط پرامپٹ استعمال کریں

یہ پرامپٹ کاپی کر کے اپنی ضرورت کے مطابق بدل سکتے ہیں:

```plain
ایک سادہ نیٹو اینڈرائیڈ ایپ بنائیں جس کا نام "روزانہ حساب" ہو۔

ایپ ایک چھوٹے پاکستانی دکاندار کے لیے ہے جو روزانہ آمدنی اور خرچ نوٹ کرنا چاہتا ہے۔

ایپ میں یہ اسکرینیں ہوں:

پہلی اسکرین: آج کا خلاصہ، کل آمدنی، کل خرچ، اور آج کا بقایا۔

دوسری اسکرین: نئی رقم شامل کرنے کا فارم، جس میں رقم، قسم، مختصر نوٹ، اور تاریخ ہو۔

تیسری اسکرین: پچھلی entries کی فہرست، جہاں آمدنی سبز اور خرچ سرخ رنگ میں نظر آئے۔

زبان آسان اردو رکھیں۔ UI صاف، موبائل فرینڈلی، اور بڑے بٹنوں والی ہو۔

ڈیٹا فی الحال فون کے اندر local storage میں محفوظ کریں۔ ابھی login، internet، payment، یا server شامل نہ کریں۔
```

یہ پرامپٹ اچھا کیوں ہے؟

- صارف واضح ہے: پاکستانی دکاندار
- مسئلہ واضح ہے: روزانہ حساب
- اسکرینیں واضح ہیں
- زبان واضح ہے
- غیر ضروری مشکل چیزیں روک دی گئی ہیں

## چوتھا مرحلہ: ایمولیٹر میں ایپ چیک کریں

جب گوگل اے آئی اسٹوڈیو پروجیکٹ بنائے گا تو دائیں طرف براؤزر میں اینڈرائیڈ ایمولیٹر کھل سکتا ہے۔ ایمولیٹر کا مطلب ہے: آپ کے براؤزر کے اندر ایک مجازی فون، جہاں آپ ایپ کو ہاتھ سے استعمال کر کے دیکھ سکتے ہیں۔

گوگل کے مطابق یہ ایمولیٹر cloud میں چلتا ہے، اس لیے آپ کو Android SDK، Android Studio، یا local emulator انسٹال کرنے کی ضرورت نہیں۔ آپ بٹن دبا سکتے ہیں، اسکرول کر سکتے ہیں، portrait اور landscape دیکھ سکتے ہیں، اور تبدیلی کے بعد ایپ دوبارہ refresh ہوتی ہے۔

چیک کرنے کے لیے یہ کام کریں:

- ہر بٹن دبائیں
- غلط input دے کر دیکھیں
- خالی فارم submit کر کے دیکھیں
- اردو متن پڑھ کر دیکھیں
- فون کی چھوٹی screen کے حساب سے spacing دیکھیں
- app بند کر کے دوبارہ کھولنے پر data برقرار رہتا ہے یا نہیں

اگر کچھ غلط ہو تو نیا پرامپٹ دیں:

```plain
ایپ میں فارم submit کرنے پر اگر رقم خالی ہو تو اردو میں error message دکھائیں۔ error message مختصر ہو: "براہ کرم رقم لکھیں"۔ بٹن اور layout باقی ویسے ہی رکھیں۔
```

## پانچواں مرحلہ: فون پر انسٹال کرنے کی تیاری کریں

گوگل اے آئی اسٹوڈیو APK کو آپ کے فون پر USB کے ذریعے انسٹال کر سکتا ہے۔ سرکاری docs کے مطابق اس کے لیے WebUSB استعمال ہوتا ہے، اس لیے local ADB انسٹال کرنا ضروری نہیں۔

یہ چیزیں تیار رکھیں:

- Chrome یا Edge براؤزر
- USB کیبل
- اینڈرائیڈ فون
- فون میں Developer Options فعال
- فون میں USB debugging فعال

اینڈرائیڈ کی سرکاری ہدایت کے مطابق Developer Options فعال کرنے کے لیے عام طور پر Settings میں About phone کے اندر Build number پر سات بار tap کیا جاتا ہے۔ کچھ فونز میں یہ جگہ بدل سکتی ہے۔ تفصیل یہاں ہے: [Android Developer Options](https://developer.android.com/studio/debug/dev-options)

USB debugging فعال کرنے کے بعد فون کو کمپیوٹر سے جوڑیں۔ پہلی بار فون پر Allow USB debugging کا پیغام آئے تو اجازت دیں۔

## چھٹا مرحلہ: ایپ فون پر انسٹال کریں

گوگل اے آئی اسٹوڈیو میں preview panel کے اندر Install on Device کا option آتا ہے۔ عمومی طریقہ یہ ہے:

- Install on Device پر کلک کریں
- براؤزر کے USB device picker میں اپنا فون منتخب کریں
- فون پر اجازت کا پیغام آئے تو قبول کریں
- APK transfer ہو کر install ہو جائے گی
- ایپ خود launch ہو سکتی ہے

اگر فون نظر نہ آئے تو یہ چیزیں چیک کریں:

- USB cable صرف charging cable تو نہیں؟
- فون unlock ہے؟
- USB debugging on ہے؟
- Chrome یا Edge استعمال ہو رہا ہے؟
- فون پر Allow USB debugging قبول کیا گیا ہے؟
- Windows پر بعض اوقات device driver کا مسئلہ ہو سکتا ہے

Chrome WebUSB کے بارے میں سرکاری تفصیل یہاں ہے: [Access USB Devices on the Web](https://developer.chrome.com/docs/capabilities/usb)

## ساتواں مرحلہ: ایپ بہتر بنانے کے لیے follow-up prompts دیں

پہلا نتیجہ اکثر مکمل نہیں ہوتا۔ اچھا طریقہ یہ ہے کہ آپ ایک ہی وقت میں دس تبدیلیاں نہ کہیں۔ ایک وقت میں ایک واضح تبدیلی کروائیں۔

ڈیزائن بہتر کرنے کا پرامپٹ:

```plain
ایپ کا design زیادہ صاف اور readable بنائیں۔ اردو Nastaliq کے بجائے Android system font استعمال کریں، مگر text size بڑا رکھیں۔ primary color سبز رکھیں، cards کم استعمال کریں، اور buttons واضح رکھیں۔
```

اردو بہتر کرنے کا پرامپٹ:

```plain
ایپ کے تمام labels آسان اردو میں کر دیں۔ مشکل technical الفاظ نہ لکھیں۔ "Submit" کی جگہ "محفوظ کریں"، "History" کی جگہ "پچھلا حساب"، اور "Balance" کی جگہ "بقایا" لکھیں۔
```

غلطیوں سے بچانے کا پرامپٹ:

```plain
اگر user منفی رقم لکھے، خالی note چھوڑے، یا category منتخب نہ کرے تو ایپ اردو میں واضح warning دکھائے۔ ایپ crash نہیں ہونی چاہیے۔
```

ڈیٹا محفوظ کرنے کا پرامپٹ:

```plain
ایپ میں entries فون پر local storage میں محفوظ رہنی چاہئیں تاکہ app بند کرنے کے بعد بھی پچھلا حساب موجود رہے۔ اگر ابھی data save نہیں ہو رہا تو اسے درست کریں۔
```

## تین مزید ایپ آئیڈیاز اور تیار پرامپٹس

یہ مثالیں beginners کے لیے اچھی ہیں کیونکہ ان میں server، payment، login یا complex backend کی ضرورت نہیں۔

### طلبہ کے لیے study planner

```plain
ایک سادہ اینڈرائیڈ ایپ بنائیں جس کا نام "میرا Study Plan" ہو۔

ایپ میٹرک یا انٹر کے طالب علم کے لیے ہے۔

features:

روزانہ subjects کی فہرست
ہر subject کے سامنے پڑھائی کا وقت
آج مکمل کیے گئے tasks پر check mark
ہفتہ وار progress summary

زبان آسان اردو رکھیں۔ design صاف، ہلکا، اور mobile friendly ہو۔ data local storage میں محفوظ ہو۔
```

### گھر کے خرچ کا planner

```plain
ایک اینڈرائیڈ ایپ بنائیں جس سے گھر کا ماہانہ بجٹ manage ہو سکے۔

ایپ میں income، rent، groceries، bills، transport، اور other expenses کی categories ہوں۔

home screen پر total income، total expense، اور remaining budget دکھائیں۔

ہر نئی entry کے لیے amount، category، date، اور note کا form ہو۔

زبان اردو ہو، interface بہت آسان ہو، اور data phone کے اندر محفوظ ہو۔
```

### بچوں کے لیے اردو quiz app

```plain
ایک بچوں کے لیے اردو quiz app بنائیں۔

quiz میں پاکستان، سائنس، اردو الفاظ، اور general knowledge کے آسان سوالات ہوں۔

ہر سوال کے چار options ہوں۔ درست جواب پر green feedback آئے، غلط جواب پر correct answer دکھایا جائے۔

آخر میں score screen دکھائیں۔

زبان آسان اردو، colors خوشگوار، buttons بڑے، اور navigation سادہ ہو۔
```

## کن ایپس سے شروعات نہ کریں؟

ابتدا میں ایسی ایپ نہ بنائیں جس میں بہت زیادہ حساس یا پیچیدہ چیزیں ہوں:

- payment app
- banking app
- medical diagnosis app
- dating app
- live multiplayer game
- user login کے ساتھ private data app
- camera، GPS، Bluetooth یا Google Maps پر heavily dependent app

گوگل کی docs کے مطابق براؤزر ایمولیٹر میں camera، NFC، Bluetooth، real GPS، اور Google Play services جیسی چیزیں مکمل طور پر دستیاب نہیں ہوتیں۔ کچھ features real device پر چل سکتے ہیں، مگر emulator میں نہیں۔

اسی لیے beginner کے لیے بہترین ایپس یہ ہیں:

- calculator
- quiz
- habit tracker
- expense tracker
- notes app
- study planner
- simple inventory app

## Play Store پر ڈالنے سے پہلے کیا جاننا ضروری ہے؟

گوگل اے آئی اسٹوڈیو سے Play Console کے internal testing track پر test version شائع کیا جا سکتا ہے۔ گوگل کی docs کے مطابق اس کے لیے Google Play Developer account چاہیے، جس کی one-time registration fee ہوتی ہے۔ AI Studio signing اور test track publishing میں مدد دے سکتا ہے۔

لیکن ایک بات واضح رکھیں: internal testing کا مطلب public launch نہیں۔ عام users کے لیے Play Store پر ایپ ڈالنے سے پہلے آپ کو:

- app icon
- screenshots
- privacy policy
- store description
- content rating
- permissions کی وضاحت
- policy compliance
- crash testing
- real users سے feedback

یہ سب چیک کرنا ہوگا۔

سرکاری حوالہ: [Google Play Console release guide](https://play.google.com/console/about/guides/releasewithconfidence/)

## beginner کے لیے بہترین workflow

اگر آپ پہلی بار ایپ بنا رہے ہیں تو یہ sequence استعمال کریں:

پہلا قدم: صرف idea لکھیں۔

دوسرا قدم: AI سے پوچھیں کہ اس idea کو سادہ app plan میں بدل دے۔

تیسرا قدم: plan سے Google AI Studio کے لیے پرامپٹ بنوائیں۔

چوتھا قدم: Android platform منتخب کر کے پرامپٹ چلائیں۔

پانچواں قدم: emulator میں app چیک کریں۔

چھٹا قدم: ایک ایک کر کے issues fix کروائیں۔

ساتواں قدم: USB کے ذریعے اپنے فون پر install کریں۔

آٹھواں قدم: دوست یا گھر کے کسی فرد سے app استعمال کروائیں اور feedback لیں۔

## ایک مکمل master prompt

اگر آپ پورا عمل ایک مضبوط پرامپٹ سے شروع کرنا چاہتے ہیں تو یہ استعمال کریں:

```plain
آپ ایک سینئر Android product designer اور Kotlin developer ہیں۔

مجھے Google AI Studio میں اپنی پہلی beginner friendly Android app بنانی ہے۔

میرا app idea یہ ہے:
[یہاں اپنا idea لکھیں]

براہ کرم پہلے مجھ سے پانچ سوال پوچھیں تاکہ app کا مقصد، user، features، language، اور data storage واضح ہو جائے۔

جب میں جواب دے دوں تو Google AI Studio کے لیے ایک بہترین Android app prompt بنائیں۔

prompt میں یہ چیزیں شامل ہوں:
app name
target user
main problem
screens
features
Urdu labels
local storage
simple mobile UI
error handling
testing checklist

app کو beginner level رکھیں۔ login، payment، server، اور complex backend شامل نہ کریں جب تک میں خاص طور پر نہ کہوں۔
```

یہ master prompt پہلے آپ کا idea صاف کرواتا ہے، پھر اسے Google AI Studio کے لیے بہتر prompt میں بدلتا ہے۔

## عام غلطیاں

### بہت بڑا idea پہلے دن بنانا

پہلی app چھوٹی رکھیں۔ ایک مسئلہ، دو یا تین screens، اور واضح result۔

### login اور payment فوراً شامل کرنا

Login، payment، cloud database اور admin panel beginner کے لیے جلدی پیچیدہ ہو جاتے ہیں۔ پہلے offline prototype بنائیں۔

### صرف اردو میں vague پرامپٹ لکھنا

اردو پرامپٹ بالکل ٹھیک ہے، مگر اسے واضح بنائیں۔ "اچھی app" نہ لکھیں؛ یہ لکھیں کہ app میں کیا screen، کون سا button، کون سا result چاہیے۔

### فون پر test نہ کرنا

ایمولیٹر اچھا ہے، مگر اصل فون پر spacing، typing، scrolling، اور speed الگ محسوس ہو سکتی ہے۔ کم از کم ایک real Android phone پر ضرور چیک کریں۔

### policy اور privacy کو ignore کرنا

اگر ایپ user data لیتی ہے تو privacy policy اور permissions کی وضاحت ضروری ہے۔ خاص طور پر contacts، location، camera، files، یا health data کے ساتھ احتیاط کریں۔

## سرکاری resources

- [Google AI Studio](https://aistudio.google.com/)
- [Build Android Apps in Google AI Studio](https://ai.google.dev/gemini-api/docs/aistudio-android)
- [Build apps in Google AI Studio](https://ai.google.dev/gemini-api/docs/aistudio-build-mode)
- [Google I/O 2026 AI Studio announcement](https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-studio-io-2026/)
- [Android Developer Options and USB debugging](https://developer.android.com/studio/debug/dev-options)
- [Chrome WebUSB guide](https://developer.chrome.com/docs/capabilities/usb)
- [Google Play Console release guide](https://play.google.com/console/about/guides/releasewithconfidence/)

## آخری بات

گوگل اے آئی اسٹوڈیو beginner کے لیے بہت بڑا موقع ہے، مگر اسے جادو نہ سمجھیں۔ یہ آپ کو idea سے working prototype تک تیزی سے لے جاتا ہے۔ اصل کام پھر بھی آپ کا ہے: مسئلہ صحیح سمجھنا، app کو آسان رکھنا، phone پر test کرنا، privacy کا خیال رکھنا، اور user feedback سے بہتر بنانا۔

اگر آپ نے ابھی تک کوئی app نہیں بنائی تو آج ایک چھوٹی app سے شروع کریں: quiz، حساب کتاب، notes، یا study planner۔ پہلی app perfect نہ بھی ہو، مگر آپ کو یہ سمجھ آ جائے گی کہ اب idea سے Android app تک کا سفر کتنا آسان ہو چکا ہے۔
