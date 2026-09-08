#!/usr/bin/env python3
"""Build the downloadable workbook from the published English guide.

Requires Python 3, WeasyPrint 69, markdown-it-py and fonttools[woff].
On Homebrew macOS set DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib.
Pass --font (Noto Nastaliq Urdu WOFF2/TTF) and --brand-font (Montserrat
SemiBold TTF). Fonts are embedded; the PDF needs no network to read.
"""
import argparse
import base64
from pathlib import Path
import re
import tempfile

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from markdown_it import MarkdownIt
from weasyprint import HTML

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src/content/guides/english-with-ai-urdu.md'


def build(font, brand_font, output, preview):
    raw = SOURCE.read_text()
    content = raw.split('---', 2)[2].strip()
    # Web-only download controls and navigation do not belong in their own PDF.
    content = re.sub(r'<a href="/guides/english-with-ai-urdu.pdf".*?</a>', '', content, flags=re.S)
    content = re.sub(r'^پی ڈی ایف .*$', '', content, flags=re.M)
    content = content.split('## اب آگے کیا سیکھیں؟')[0]
    content = re.sub(r'^# .*\n', '', content, count=1)
    content = content.replace('## پہلے دن: استاد کو تیار کرنے والا ماسٹر پرامپٹ',
                              '## کارڈ ۱: پہلے دن کا ماسٹر پرامپٹ')
    rendered = MarkdownIt('commonmark', {'html': True}).enable('table').render(content)
    # Keep each card label attached to its prompt; allow the prompt itself to
    # break only if ever longer than a page in a future edition.
    rendered = re.sub(r'<p><strong>(کارڈ .*?)</strong></p>\s*(<div class="prompt-box">.*?</div>)',
                      r'<section class="card"><h3>\1</h3>\2</section>', rendered, flags=re.S)
    # Explicit LTR direction for English table cells avoids reversed punctuation.
    rendered = re.sub(r'<(td|th)>([^<]*[A-Za-z][^<]*)</\1>',
                      lambda m: f'<{m[1]} dir="ltr">{m[2]}</{m[1]}>'
                      if not re.search('[\u0600-\u06ff]', m[2]) else m[0], rendered)
    digits = str.maketrans('0123456789', '۰۱۲۳۴۵۶۷۸۹')
    trackers = ''
    for start in (1, 21, 41):
        rows = ''.join(f'<tr><td>{str(n).translate(digits)}</td><td></td><td></td><td></td></tr>'
                       for n in range(start, start + 20))
        trackers += f'''<section class="tracker"><h2>مشق کا ریکارڈ: دن {str(start).translate(digits)} تا {str(start+19).translate(digits)}</h2>
        <p>تاریخ خود لکھیں۔ ناغہ ہو تو اگلے دن واپس آئیں؛ ضروری نہیں کہ یہ ساٹھ مسلسل دن ہوں۔</p>
        <table><thead><tr><th>دن</th><th>تاریخ / وقت</th><th>آج کا موضوع یا کارڈ</th><th>ایک درست کیا ہوا جملہ</th></tr></thead><tbody>{rows}</tbody></table></section>'''
    with tempfile.TemporaryDirectory(prefix='urduai-workbook-') as tmp:
        font_path = Path(tmp) / 'nastaliq.ttf'
        family = TTFont(font)
        if 'fvar' in family:
            family = instantiateVariableFont(family, {'wght': 400}, inplace=True)
        family.flavor = None
        family.save(font_path)
        css = f'''
        @font-face {{font-family: Nastaliq; src:url("{font_path.as_uri()}");}}
        @font-face {{font-family: Brand; src:url("{brand_font.resolve().as_uri()}");font-weight:600;}}
        @page {{size:A4; margin:19mm 17mm 19mm;
          @bottom-right {{content:"urduai.org";font:10pt Brand;color:#1d559f;}}
          @bottom-left {{content:counter(page);font:10pt sans-serif;color:#637080;}}
        }}
        @page:first {{margin:0;@bottom-right{{content:none}}@bottom-left{{content:none}}}}
        html {{direction:rtl;font-family:Nastaliq,serif;font-size:17px;line-height:2.4;color:#182b40;}}
        body {{margin:0;}} p {{margin:8px 0 13px;orphans:3;widows:3;}}
        h1,h2,h3 {{font-weight:400;line-height:2.2;break-after:avoid;}}
        h2 {{font-size:24px;color:#1d559f;border-bottom:2px solid #f1cc11;padding-bottom:8px;margin:25px 0 14px;}}
        h3 {{font-size:19px;color:#1d559f;margin:14px 0 7px;}}
        strong {{font-weight:400;color:#124a78;}}
        a {{color:#1459a0;overflow-wrap:anywhere;}}
        li {{margin-bottom:10px;}} ul,ol {{padding-right:23px;}}
        table {{width:100%;border-collapse:collapse;font-size:17px;margin:15px 0;table-layout:fixed;}}
        th,td {{border:1px solid #d6dfe8;padding:7px 9px;vertical-align:top;overflow-wrap:anywhere;}}
        th {{background:#edf3fa;color:#174d86;font-weight:400;}} tr {{break-inside:avoid;}}
        [dir=ltr] {{direction:ltr;text-align:left;font-family:Arial,sans-serif;line-height:1.65;}}
        blockquote,.prompt-box {{margin:12px 0;padding:12px 17px;background:#f0f5fb;border-right:3px solid #1d559f;}}
        .prompt-box {{white-space:pre-line;break-inside:avoid;}} .card {{break-inside:avoid;}}
        .cover {{box-sizing:border-box;height:297mm;background:#102745;color:white;padding:23mm 19mm;page-break-after:always;border-top:5mm solid #f1cc11;border-bottom:5mm solid #f1cc11;}}
        .brand {{font:600 34px Brand;direction:ltr;text-align:right;color:white;}}
        .brand span {{color:#f1cc11;}} .cover h1 {{font-size:37px;color:white;margin:31mm 0 14mm;line-height:2;}}
        .cover .subtitle {{font-size:22px;color:#f1cc11;}}
        .cover p {{font-size:18px;color:#e8eff8;}} .cover .edition {{margin-top:24mm;}}
        .start {{background:#1b385c;padding:9mm;margin-top:15mm;border-right:3px solid #f1cc11;}}
        .start p {{margin:0;}} .tracker,.assessment {{page-break-before:always;}}
        .tracker h2 {{margin-top:0;}} .tracker td {{height:28px;padding:2px 7px;line-height:1.6;}}
        .tracker th:first-child,.tracker td:first-child {{width:25px;}}
        .tracker th:nth-child(2) {{width:77px;}} .tracker th:nth-child(3) {{width:130px;}}
        .writing-line {{border-bottom:1px solid #b7c6d4;height:42px;}}
        .source-note {{font-size:17px;background:#edf3fa;padding:15px;}}
        '''
        document = f'''<!doctype html><html lang="ur" dir="rtl"><head><meta charset="utf-8">
        <title>اے آئی سے انگریزی بولنے کی مشق — اردو اے آئی</title><meta name="author" content="اردو اے آئی ٹیم">
        <meta name="description" content="۲۳ پرامپٹ کارڈ، روزانہ مشق، ساٹھ دن کا ریکارڈ اور ذاتی پیش رفت کا جائزہ۔ ستمبر ۲۰۲۶ کا نسخہ۔">
        <style>{css}</style></head><body>
        <section class="cover"><div class="brand">Urdu <span>Ai</span></div>
        <h1>اے آئی سے انگریزی<br>بولنے کی مشق</h1>
        <p class="subtitle">۲۳ پرامپٹ کارڈ · روزانہ منصوبہ · مشق کا ریکارڈ</p>
        <p>ایک آسان سوال، اپنا جواب، پھر ایک اصلاح۔<br>اسمارٹ فون کے ساتھ اردو میں قدم بہ قدم مشق۔</p>
        <div class="start"><p>آج کا آغاز: اپنا تعارف ایک جملے میں دیں۔<br>اصلاح کے بعد درست جملہ دوبارہ بولیں۔</p></div>
        <p class="edition">اردو اے آئی ٹیم · تازہ نسخہ: ۸ ستمبر ۲۰۲۶<br>یہ گائیڈ مفت ہے۔ ٹولز کی سہولتیں اور حدود بدل سکتی ہیں۔</p>
        </section><main>{rendered}{trackers}
        <section class="assessment"><h2>اپنی پیش رفت کا جائزہ</h2>
        <p>نام: ____________________ &nbsp; آغاز کی تاریخ: ____________________</p>
        <p>پہلے دن اور تازہ ریکارڈنگ سنیں۔ اپنی مشق کی بنیاد پر جواب لکھیں۔</p>
        <h3>اب میں بغیر دیکھے کون سے تین جملے بول سکتا ہوں؟</h3>
        <div class="writing-line"></div><div class="writing-line"></div><div class="writing-line"></div>
        <h3>میری بار بار ہونے والی ایک غلطی اور اس کی اصلاح</h3>
        <div class="writing-line"></div><div class="writing-line"></div>
        <h3>اگلے ہفتے میں کس گفتگو کی مشق کروں گا؟</h3>
        <div class="writing-line"></div><div class="writing-line"></div>
        <p class="source-note">یہ ذاتی مشق کا ریکارڈ ہے۔ یہ کسی ادارے کی سند، زبان کی مہارت کا تصدیق شدہ امتحان یا روانی کی ضمانت نہیں۔</p>
        </section><section class="assessment"><h2>اس گائیڈ کو تازہ کیسے رکھیں؟</h2>
        <p>اشاعت: ۱۱ جون ۲۰۲۶ · یہ نظرثانی: ۸ ستمبر ۲۰۲۶۔ نئی وضاحتوں اور اگلی مشقوں کے لیے اصل ویب گائیڈ دیکھیں:</p>
        <p dir="ltr"><a href="https://urduai.org/guides/english-with-ai-urdu/">urduai.org/guides/english-with-ai-urdu/</a></p>
        <p>مزید آسان مشقیں:</p><p dir="ltr"><a href="https://urduai.org/practice/">urduai.org/practice/</a></p>
        <h3>ٹولز کی تازہ سرکاری معلومات</h3>
        <p><a href="https://support.google.com/gemini/answer/16275805?hl=en">جیمینائی: استعمال کی حدود</a></p>
        <p><a href="https://help.openai.com/en/articles/20001274/">چیٹ جی پی ٹی: آواز والی گفتگو</a></p>
        <p>اس کتاب میں اے آئی سے غلطیوں کی اصلاح لینے کے لیے کہا گیا ہے۔ اگر جواب مشکوک ہو تو معتبر لغت یا استاد سے جانچیں۔ ذاتی معلومات کے بجائے فرضی مثالیں لکھیں۔</p>
        </section></main></body></html>'''
        if preview:
            # Keep the review HTML self-contained after temporary fonts disappear.
            preview_html = document.replace(font_path.as_uri(), 'data:font/ttf;base64,' + base64.b64encode(font_path.read_bytes()).decode())
            preview_html = preview_html.replace(brand_font.resolve().as_uri(), 'data:font/ttf;base64,' + base64.b64encode(brand_font.read_bytes()).decode())
            preview.write_text(preview_html)
        output.parent.mkdir(parents=True, exist_ok=True)
        pdf = HTML(string=document, base_url=str(ROOT)).render()
        pdf.write_pdf(output)
        print(f'{output}: {len(pdf.pages)} pages; {output.stat().st_size:,} bytes')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--font', required=True, type=Path)
    parser.add_argument('--brand-font', required=True, type=Path)
    parser.add_argument('--output', type=Path, default=ROOT / 'public/guides/english-with-ai-urdu.pdf')
    parser.add_argument('--preview', type=Path)
    args = parser.parse_args()
    build(args.font, args.brand_font, args.output, args.preview)
