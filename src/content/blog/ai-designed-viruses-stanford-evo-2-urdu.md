---
title: "اے آئی سے پہلی بار نئے وائرس ڈیزائن—علاج کی امید یا نیا خطرہ؟"
description: "Stanford اور Arc Institute کے AI ماڈلز سے بنائے گئے 16 bacteriophages نے E. coli کو نشانہ بنایا، مگر تحقیق biosecurity کے اہم سوالات بھی اٹھاتی ہے۔"
date: 2026-08-08
published_at: "2026-08-09T04:13:44Z"
category: "اے آئی اپڈیٹ"
tags: ["Evo 2", "Stanford University", "Arc Institute", "bacteriophage", "biosecurity", "AI biology"]
image: "/images/blog/ai-designed-viruses-stanford-evo-2-urdu.png"
image_width: 1200
image_height: 630
author: "اردو اے آئی ٹیم"
adsense: true
draft: false
faq:
  - question: "کیا اے آئی نے انسانوں کو متاثر کرنے والا وائرس بنایا ہے؟"
    answer: "نہیں۔ تحقیق میں بنائے گئے bacteriophages صرف E. coli جیسے bacteria کو متاثر کرتے ہیں۔ محققین نے انسانی، حیوانی اور نباتاتی خلیات کو متاثر کرنے والے وائرس اس تجربے میں استعمال نہیں کیے۔"
  - question: "Bacteriophage کیا ہوتا ہے؟"
    answer: "Bacteriophage ایک ایسا وائرس ہے جو انسانوں کے بجائے bacteria کو متاثر کرتا ہے۔ سائنس دان phage therapy میں انہیں نقصان دہ یا antibiotic-resistant bacteria کے خلاف استعمال کرنے کی تحقیق کر رہے ہیں۔"
  - question: "کیا Evo 2 نے خود laboratory میں وائرس بنا دیا؟"
    answer: "نہیں۔ Evo 1 اور Evo 2 نے ممکنہ genetic sequences تجویز کیں۔ انسانی محققین نے candidates منتخب کیے، DNA تیار کیا، وائرس assemble کیے اور محفوظ laboratory میں ان کی جانچ کی۔"
  - question: "کتنے AI-designed وائرس کامیاب ہوئے؟"
    answer: "محققین نے 302 منتخب designs میں سے 285 کو مکمل طور پر تیار اور آزمایا۔ ان میں 16 bacteriophages فعال نکلے اور متعلقہ E. coli strains کی افزائش روک سکے۔"
  - question: "کیا یہ تحقیق فوری طور پر نئی دوا بن جائے گی؟"
    answer: "نہیں۔ یہ ابتدائی proof of concept ہے، منظور شدہ علاج نہیں۔ محفوظ phage therapy بنانے کے لیے مزید تحقیق، clinical testing، manufacturing standards اور نگرانی درکار ہوگی۔"
---

Stanford University اور Arc Institute کے محققین نے 6 اگست 2026 کو *Science* میں ایسی peer-reviewed تحقیق شائع کی جس میں اے آئی (AI) سے ڈیزائن کیے گئے 16 نئے bacteriophages laboratory میں فعال ثابت ہوئے۔ یہ انسانی وائرس نہیں تھے؛ انہوں نے E. coli bacteria کو نشانہ بنایا۔ کامیابی antibiotic-resistant infections کے خلاف نئے علاج کی امید دکھاتی ہے، لیکن ساتھ ہی یہ سوال بھی سامنے لاتی ہے کہ جینیاتی code لکھنے والے AI ماڈلز کو محفوظ حدود میں کیسے رکھا جائے۔

## محققین نے اصل میں کیا بنایا؟

Bacteriophage، جسے مختصر طور پر phage کہتے ہیں، ایک ایسا وائرس ہے جو انسان، جانور یا پودے کے بجائے bacteria کو متاثر کرتا ہے۔ وہ bacterial cell میں داخل ہو کر اس کے اندر اپنی copies بناتا ہے اور آخرکار اسے تباہ کر سکتا ہے۔ اسی وجہ سے سائنس دان طویل عرصے سے phage therapy کو ایسے infections کے ممکنہ علاج کے طور پر دیکھ رہے ہیں جن پر عام antibiotics کم اثر کرتی ہیں۔

نئی تحقیق میں محققین نے ΦX174 نامی ایک چھوٹے اور اچھی طرح سمجھے گئے phage کو بنیاد بنایا، جو E. coli کو متاثر کرتا ہے۔ انہوں نے جینوم لینگویج ماڈلز (genome language models) Evo 1 اور Evo 2 کو ہزاروں ملتے جلتے bacteriophage genomes پر مزید تربیت دی، پھر ان سے مکمل genetic designs تیار کروائے۔

یہاں لفظ “وائرس” سن کر انسانی بیماری یا نئی وبا کا تصور درست نہیں۔ [Arc Institute کی آفیشل وضاحت](https://arcinstitute.org/news/evo-2-one-year-later) کے مطابق تجربے کے phages صرف bacteria کو متاثر کرتے تھے، جبکہ انسانوں، جانوروں اور پودوں کے خلیات کو متاثر کرنے والے eukaryotic viruses کو Evo 2 کی training سے حفاظتی وجہ سے خارج رکھا گیا۔

## زبان لکھنے والا ماڈل DNA کیسے لکھ سکتا ہے؟

چیٹ جی پی ٹی جیسے language models جملے کے پچھلے الفاظ دیکھ کر اگلا موزوں لفظ پیش کرتے ہیں۔ Evo 2 اسی بنیادی خیال کو DNA پر استعمال کرتا ہے۔ DNA صرف چار حروف—A، C، G اور T—کی لمبی ترتیب سے بنتا ہے۔ ماڈل بے شمار genomes میں موجود patterns سیکھ کر اندازہ لگاتا ہے کہ کسی genetic sequence کا اگلا حصہ کیا ہونا چاہیے۔

اسے یوں سمجھیں: عام AI model کتابوں کی زبان پڑھ کر نیا پیراگراف تجویز کرتا ہے، جبکہ genome model جانداروں کے genetic code میں موجود ترتیب پڑھ کر نیا DNA design تجویز کرتا ہے۔ لیکن تجویز اور زندہ biological object میں بڑا فرق ہے۔ کمپیوٹر صرف sequence لکھتا ہے؛ اسے حقیقت میں بنانے، assemble کرنے اور آزمانے کا کام تربیت یافتہ سائنس دان محفوظ laboratory میں کرتے ہیں۔

[Nature میں شائع Evo 2 کی بنیادی تحقیق](https://doi.org/10.1038/s41586-026-10176-5) کے مطابق اس ماڈل کے بڑے ورژن نے تقریباً 9.3 ٹریلین DNA base pairs سے سیکھا اور بہت طویل genetic sequences کو ایک ساتھ دیکھنے کی صلاحیت حاصل کی۔ یہی پیمانہ اسے صرف ایک protein کے بجائے پورے چھوٹے genome کی ترتیب سمجھنے میں مدد دیتا ہے۔

## 302 designs میں سے صرف 16 کیوں چلے؟

محققین نے model outputs کو فلٹر کر کے 302 candidate genomes منتخب کیے۔ ان میں سے 285 کو مکمل طور پر synthesize اور assemble کیا جا سکا۔ جب انہیں E. coli پر آزمایا گیا تو 16 designs فعال phages بنے: انہوں نے bacterial cells میں اپنی copies بنائیں اور متعلقہ bacteria کی افزائش روکی۔ [Science میں شائع اصل paper](https://doi.org/10.1126/science.aec2657) اس کام کو پورے genome کی سطح پر AI-guided biological design کی ابتدائی بنیاد قرار دیتا ہے۔

ناکام designs بھی اہم ہیں۔ 285 میں سے صرف 16 کا فعال ہونا دکھاتا ہے کہ AI ابھی biological rules مکمل طور پر نہیں سمجھتا۔ ماڈل مفید candidates جلد پیدا کر سکتا ہے، لیکن laboratory validation کے بغیر اس کا output محض ایک امکان ہے۔ اسے تیار علاج یا یقینی کامیابی سمجھنا غلط ہوگا۔

محققین نے یہ بھی دیکھا کہ کامیاب phages مخصوص bacterial strains کو نشانہ بنا سکتے تھے اور غیر متعلق strains پر اثر نہیں ڈالتے تھے۔ علاج کے لیے یہ specificity ضروری ہے، کیونکہ مقصد ہر bacterium کو ختم کرنا نہیں بلکہ بیماری پیدا کرنے والے مخصوص bacterium کو نشانہ بنانا ہے۔

## یہ antibiotic-resistant infections میں کیسے مدد دے سکتا ہے؟

Bacteria وقت کے ساتھ antibiotics کے خلاف مزاحمت پیدا کر سکتے ہیں۔ ایسے infections میں ڈاکٹر کے پاس مؤثر ادویات کے انتخاب کم ہو جاتے ہیں۔ Phage therapy کا تصور یہ ہے کہ بیماری پیدا کرنے والے bacterium کے لیے موزوں وائرس تلاش یا تیار کیا جائے، جو اسی bacterium کو متاثر کرے۔

AI اس تلاش کو تیز کر سکتا ہے۔ مستقبل میں کسی مریض کے infection سے bacterium کی شناخت کے بعد model کئی ممکنہ phage designs تجویز کر سکتا ہے، اور سائنس دان ان میں سے محفوظ اور مؤثر candidates آزما سکتے ہیں۔ لیکن موجودہ Stanford تحقیق ابھی proof of concept ہے۔ اس سے کوئی نئی منظور شدہ دوا یا فوری patient treatment دستیاب نہیں ہوا۔ Clinical trials، manufacturing standards اور انسانی جسم میں safety کی الگ جانچ ضروری ہوگی۔

یہ پیش رفت اس بڑی تبدیلی کا حصہ ہے جس میں اے آئی صرف research papers پڑھنے یا مفروضے بنانے تک محدود نہیں رہا، بلکہ biological designs بھی تجویز کر رہا ہے۔ اس سے پہلے [گوگل کے AI co-scientist اور superbug تحقیق](/blog/googles-artificial-intelligence-co-scientist-solved-a-10-year-old-superbug-problem-in-just-2-days/) میں AI نے سائنس دانوں کو ممکنہ جواب تلاش کرنے میں مدد دی تھی۔ یہاں model نے ایک قدم آگے بڑھ کر genetic code کے candidates لکھے، جنہیں انسانوں نے laboratory میں آزمایا۔

## پھر biosecurity کا خطرہ کہاں ہے؟

جو ٹیکنالوجی مفید biological systems بنا سکتی ہے، اسے غلط مقصد کے لیے استعمال کرنے کی کوشش بھی ہو سکتی ہے۔ موجودہ تجربہ محدود، چھوٹے bacteriophages اور محفوظ E. coli system پر کیا گیا۔ اس سے یہ نتیجہ نکالنا درست نہیں کہ کوئی عام شخص اب AI سے انسانی وبا بنا سکتا ہے۔ بڑے اور انسانی viruses کہیں زیادہ پیچیدہ ہیں، جبکہ laboratory synthesis، biological expertise اور testing کی عملی رکاوٹیں بھی موجود ہیں۔

لیکن capability کی سمت اہم ہے۔ ماڈلز بہتر، سستے اور زیادہ قابلِ رسائی ہوئے تو harmful genetic designs کی screening، model access controls، DNA synthesis providers کی جانچ اور عالمی نگرانی زیادہ ضروری ہوگی۔ [*Science* میں تحقیق کے ساتھ شائع ہونے والی safety discussion](https://doi.org/10.1126/science.aej8512) نے بھی یہی نکتہ اٹھایا کہ generative AI سے viral genomes ترتیب دینے کی صلاحیت سامنے آ چکی ہے، مگر اسے محفوظ انداز میں steer کرنے والی governance ابھی پیچھے ہے۔

یہ وہی دوہرا استعمال ہے جسے dual-use technology کہا جاتا ہے: ایک ہی صلاحیت علاج اور دفاع میں مدد دے سکتی ہے، اور غلط ہاتھوں میں نقصان کا خطرہ بھی بڑھا سکتی ہے۔ [اے آئی سیفٹی رپورٹ 2026](/blog/ai-safety-report-2026/) بھی biological اور chemical research میں اسی توازن پر زور دیتی ہے—فائدہ روکنا نہیں، بلکہ طاقت کے مطابق حفاظتی تہیں مضبوط کرنا۔

## اس خبر کو کس طرح سمجھنا چاہیے؟

یہ نہ تو “AI نے انسانوں کے لیے خطرناک وائرس بنا دیا” والی خبر ہے، نہ ہی antibiotic resistance کا تیار حل۔ درست بات یہ ہے کہ محققین نے AI سے پورے چھوٹے bacterial-virus genomes ڈیزائن کروائے، پھر ان میں سے 16 کو laboratory میں فعال ثابت کیا۔

سائنس کے لیے یہ اہم قدم ہے کیونکہ AI اب biological information پڑھنے کے ساتھ اسے لکھنے میں بھی مدد دے رہا ہے۔ عوام کے لیے اصل سوال اس سے بھی بڑا ہے: کیا safety rules، independent testing اور عالمی نگرانی اس رفتار کے ساتھ آگے بڑھ سکیں گے؟ علاج کی امید حقیقی ہے۔ احتیاط کی ضرورت بھی۔

## مزید پڑھنے کے لیے اصل ذرائع

- [Science: Generative design of bacteriophages with genome language models](https://doi.org/10.1126/science.aec2657)
- [Science: AI-designed viral genomes — biosafety commentary](https://doi.org/10.1126/science.aej8512)
- [Arc Institute: Evo 2 — One Year Later](https://arcinstitute.org/news/evo-2-one-year-later)
- [Nature: Genome modelling and design across all domains of life with Evo 2](https://doi.org/10.1038/s41586-026-10176-5)
- [Stanford Report: Evo 2 کیسے genetic code سمجھتا اور لکھتا ہے](https://news.stanford.edu/stories/2025/02/generative-ai-tool-marks-a-milestone-in-biology-and-accelerates-the-future-of-life-sciences)
- [Global News: Stanford scientists used AI to build a virus targeting E. coli](https://globalnews.ca/news/12013346/stanford-ai-virus/)
