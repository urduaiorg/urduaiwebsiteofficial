import test from 'node:test';
import assert from 'node:assert/strict';
import { staticBidi } from './static-bidi.mjs';

test('isolates mixed text while preserving Urdu, links and anchors', () => {
  const result = staticBidi('<html lang="ur" dir="rtl"><body><h2 id="GPT-5">یہ GPT-5 ہے</h2><a href="/guide/#GPT-5">مزید ChatGPT سیکھیں</a></body></html>');
  assert.ok(result.includes('<h2 id="GPT-5">یہ <bdi dir="ltr" class="bidi-ltr">GPT-5</bdi> ہے</h2>'));
  assert.ok(result.includes('href="/guide/#GPT-5"'));
  assert.ok(result.includes('مزید <bdi dir="ltr" class="bidi-ltr">ChatGPT</bdi> سیکھیں'));
  assert.equal(staticBidi(result), result);
});
test('preserves scripts, metadata, code, forms, logos, ads and opt-outs byte for byte', () => {
  const snippets = ['<script>const a = "<AI>";</script>', '<style>.AI {color:red}</style>', '<pre>AI &amp; code</pre>', '<textarea>AI prompt</textarea>', '<svg><text>AI</text></svg>', '<div dir="ltr">AI</div>', '<div data-bidi-skip><p>AI</p></div>', '<ins class="adsbygoogle">AI</ins>', '<a class="site-logo">Urdu Ai</a>', '<div class="pagefind-ui">AI</div>', '<bdi>AI</bdi>', '<template><p>AI</p></template>'];
  const html = '<html><head><title>Urdu AI</title></head><body>' + snippets.join('') + '</body></html>';
  assert.equal(staticBidi(html), html);
});
test('decodes entities once and escapes text without creating active markup', () => {
  const result = staticBidi('<body><p>یہ AI &amp; ML &lt;img src=x onerror=alert(1)&gt; ہے</p></body>');
  assert.ok(!result.includes('<img'));
  assert.ok(!result.includes('&amp;amp;'));
  assert.ok(result.includes('AI &amp; ML'));
  assert.ok(result.includes('&lt;'));
  assert.equal(staticBidi(result), result);
});
test('handles adjacent text, punctuation and numbers without changing plain text', () => {
  const input = '<body><p>قیمت $20 ہے، GPT-5.2 <strong>اور API</strong> 50K+ لوگ۔</p><p>صرف اردو</p></body>';
  const output = staticBidi(input);
  assert.equal(output.replaceAll(/<bdi dir="ltr" class="bidi-ltr">(.*?)<\/bdi>/g, '$1'), input);
});
