---
title: "جیمینی روبوٹکس 2: روبوٹ اب پورے جسم سے کام سیکھیں گے"
description: "گوگل ڈیپ مائنڈ کا Gemini Robotics 2 روبوٹس کو چلنے، جھکنے، چیزیں پکڑنے اور مل کر کام کرنے کی نئی صلاحیت دیتا ہے۔ جانیں کیا بدلا ہے اور کس کے لیے دستیاب ہے۔"
date: 2026-07-30
published_at: "2026-07-30T18:00:00Z"
focus_keyphrase: "جیمینی روبوٹکس 2"
secondary_keyphrases:
  - "Gemini Robotics 2"
  - "روبوٹس میں اے آئی"
  - "Google DeepMind robotics"
category: "اے آئی اپڈیٹ"
tags:
  - جیمینی روبوٹکس 2
  - گوگل ڈیپ مائنڈ
  - روبوٹکس
  - ہیومنائیڈ روبوٹ
  - اے آئی اپڈیٹ
image: "/images/blog/gemini-robotics-2-whole-body-intelligence-urdu.png"
image_width: 1731
image_height: 909
author: "اردو اے آئی ٹیم"
adsense: true
draft: false
faq:
  - question: "جیمینی روبوٹکس 2 کیا ہے؟"
    answer: "یہ Google DeepMind کا روبوٹکس ماڈل ہے جو روبوٹ کو منظر اور ہدایت سمجھ کر پورے جسم کی حرکت، چیز پکڑنے اور کئی مرحلوں والے کام انجام دینے میں مدد دیتا ہے۔"
  - question: "کیا عام لوگ Gemini Robotics 2 استعمال کر سکتے ہیں؟"
    answer: "نہیں، مرکزی Gemini Robotics 2 اور On-Device 2 ماڈل اس وقت early-access partners کے لیے ہیں۔ Google کے مطابق Gemini Robotics ER 2، جو منصوبہ بندی اور reasoning والا ماڈل ہے، Google AI Studio میں دستیاب ہے۔"
  - question: "کیا اس کا مطلب ہے کہ گھروں میں عام humanoid robots آ گئے ہیں؟"
    answer: "نہیں۔ Google نے research اور early-access availability کا اعلان کیا ہے۔ قابلِ اعتماد، سستا اور وسیع پیمانے پر دستیاب گھریلو humanoid robot ابھی اس اعلان کا حصہ نہیں ہے۔"
---

**جیمینی روبوٹکس 2** گوگل ڈیپ مائنڈ کا نیا اے آئی نظام ہے جو روبوٹ کو صرف بازو ہلانے کے بجائے ماحول دیکھ کر چلنے، جھکنے، پہنچنے، چیز پکڑنے اور کئی قدموں والا کام مکمل کرنے میں مدد دینے کے لیے بنایا گیا ہے۔ [30 جولائی 2026 کے گوگل ڈیپ مائنڈ اعلان](https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/) کے مطابق اس خاندان میں تین ماڈل ہیں؛ ان میں سے reasoning model، Gemini Robotics ER 2، Google AI Studio میں دستیاب ہے، جبکہ باقی ماڈل ابھی early-access partners کے لیے ہیں۔

یہ فرق ضروری ہے: خبر کسی تیار گھریلو روبوٹ کے بازار میں آنے کی نہیں، بلکہ اس کے “دماغ” میں پیش رفت کی ہے۔ آج کے بہت سے روبوٹس ایک محدود، بار بار دہرائے جانے والے کام کے لیے پہلے سے پروگرام ہوتے ہیں۔ گوگل کا دعویٰ ہے کہ نیا ماڈل نئی جگہ، نئی چیز اور زبان میں دی گئی ہدایت کے ساتھ زیادہ لچک سے کام کر سکتا ہے۔

## ویڈیو میں کیا دکھایا گیا ہے؟

یہ گوگل ڈیپ مائنڈ کی آفیشل ویڈیو ہے، جس میں Apollo humanoid اور Duo robot arm کے ذریعے پورے جسم کی حرکت اور چیزوں کے ساتھ کام کی مثالیں دکھائی گئی ہیں:

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:1.5rem 0;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" src="https://www.youtube-nocookie.com/embed/4lSQnrMC6nY?rel=0" title="Gemini Robotics 2: whole-body intelligence for robots — Google DeepMind" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

ویڈیو کو demo سمجھیں، روزمرہ استعمال کی ضمانت نہیں۔ روبوٹکس میں ایک صاف lab demo اور کسی مصروف گھر، فیکٹری یا ہسپتال میں مستقل، محفوظ کارکردگی کے درمیان بڑا فرق ہوتا ہے۔

## “پورے جسم کی ذہانت” سے کیا مراد ہے؟

انسان کمرے میں چیز اٹھانے کے لیے بیک وقت فاصلے، توازن، ہاتھ کی گرفت اور جسم کی جگہ کا اندازہ لگاتا ہے۔ پہلے کے کئی humanoid systems زیادہ تر tabletop کاموں، یعنی میز کے اوپر موجود چیزوں، تک محدود تھے۔ گوگل کے مطابق Gemini Robotics 2 اب پورے humanoid کو کنٹرول کرنے کی سمت بڑھتا ہے: مثال کے طور پر بکھرے کمرے میں چل کر جانا، جھکنا، چیز تک پہنچنا اور اسے ہٹانا۔

اس کے ساتھ ہاتھوں اور grippers پر بھی کام ہے۔ کمپنی نے Apollo 2 پر پانچ انگلیوں والے 22 degree-of-freedom SharpaWave hand سے knot باندھنے اور ziplock bag بند کرنے جیسی مثالیں بتائی ہیں۔ یہ پیش رفت ہے، مگر خود گوگل کے چارٹ میں multi-finger کام ابھی بھی مشکل دکھائے گئے ہیں۔

> یاد رکھیں: Gemini Robotics 2 کا اصل قدم یہ ہے کہ روبوٹ کے “دیکھنے اور سمجھنے” کو اس کے پورے جسم کی حرکت سے جوڑا جا رہا ہے — نہ کہ یہ کہ عام گھروں کے لیے روبوٹ فوری طور پر تیار ہو گیا ہے۔

## تین نئے ماڈل، تین الگ کام

گوگل نے ایک ہی نام کے تحت تین حصے متعارف کرائے ہیں:

- **Gemini Robotics 2:** وہ ماڈل جو ہدایت اور منظر کو جسمانی حرکت اور manipulation میں بدلتا ہے۔
- **Gemini Robotics ER 2:** اوپر کی سطح کا reasoning model؛ یہ کمرہ دیکھ کر کام کے مرحلے سوچتا، progress دیکھتا اور غلطی ہونے پر اگلا قدم بدلنے میں مدد دیتا ہے۔ گوگل کے مطابق یہ Google AI Studio میں اور Gemini Enterprise Agent Platform میں private preview کے طور پر دستیاب ہے۔
- **Gemini Robotics On-Device 2:** ایسا ماڈل جو robot device پر locally چلنے کے لیے بنایا گیا ہے، تاکہ ہر فیصلے کے لیے internet latency پر انحصار نہ ہو۔

گوگل کا کہنا ہے کہ On-Device 2 کو نئے دو بازو والے robot bodies کے لیے چند گھنٹوں میں، عموماً 200 سے کم examples کے ساتھ ڈھالا جا سکتا ہے۔ یہ کمپنی کا اعلان ہے؛ مختلف hardware اور حقیقی ماحول میں اس کی کارکردگی کو الگ سے جانچا جائے گا۔

## ایک سے زیادہ روبوٹ بھی مل کر کام کر سکتے ہیں

بڑی تبدیلی صرف ایک humanoid کو ذہین بنانے کی نہیں۔ ER 2 کو اس طرح بنایا گیا ہے کہ وہ طویل کام کو چھوٹے مراحل میں بانٹے، ناکام مرحلے کو پہچانے اور مختلف قسم کے روبوٹس کے درمیان کام تقسیم کرے۔ اس کا عملی مطلب مستقبل میں ایسا workflow ہو سکتا ہے جس میں ایک robot arm چیزیں پکڑے اور humanoid انہیں دوسری جگہ لے جائے۔

## حفاظت کا سوال سب سے اہم ہے

جسمانی اے آئی میں غلط جواب صرف غلط متن نہیں ہوتا؛ غلط حرکت کسی انسان یا چیز کے لیے خطرہ بن سکتی ہے۔ Google DeepMind کا کہنا ہے کہ ER 2 انسان کے قریب ہونے کو بہتر طریقے سے پہچان کر safety tool call کر سکتا ہے اور ضرورت پر robot کو محفوظ حالت میں روک سکتا ہے۔ یہ اچھی سمت ہے، مگر safety کو marketing claim نہیں بلکہ مسلسل engineering، testing اور انسانی نگرانی کی ضرورت سمجھنا چاہیے۔

پاکستان میں طلبہ، makers اور developers کے لیے اس خبر کا فوری مطلب robot خریدنا نہیں، بلکہ یہ سمجھنا ہے کہ اگلا AI قدم صرف chat window نہیں ہو گا: models آہستہ آہستہ cameras، sensors اور machines کے ساتھ مل کر حقیقی دنیا میں عمل بھی کریں گے۔

## اب آگے کیا سیکھیں؟

اگر آپ سمجھنا چاہتے ہیں کہ اے آئی تصویر، آواز اور متن کو ایک ساتھ کیسے سمجھتا ہے، تو اگلا قدم: [ملٹی موڈل اے آئی کیا ہے؟](/learn/multimodal-ai/)

## ذرائع

- [Google DeepMind: Gemini Robotics 2 brings whole body intelligence to robots، 30 جولائی 2026](https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/)
- [Google DeepMind کی آفیشل Gemini Robotics 2 ویڈیو](https://www.youtube.com/watch?v=4lSQnrMC6nY)
