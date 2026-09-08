import { parse } from 'parse5';

const attr = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

// Use the rendered responsive candidates, so preload and img choose the same file.
export function preloadContentImage(html) {
  let image;
  let headEnd;
  let existing = false;
  const walk = node => {
    const attrs = Object.fromEntries((node.attrs || []).map(({ name, value }) => [name, value]));
    if (node.tagName === 'head') headEnd = node.sourceCodeLocation?.endTag?.startOffset;
    if (node.tagName === 'link' && attrs.rel === 'preload' && attrs.as === 'image') existing = true;
    if (!image && node.tagName === 'img' && attrs.fetchpriority === 'high' && attrs.loading !== 'lazy' && attrs.src?.startsWith('/_astro/')) image = attrs;
    for (const child of node.childNodes || []) walk(child);
  };
  walk(parse(html, { sourceCodeLocationInfo: true }));
  if (!image || existing || headEnd === undefined) return html;
  const responsive = image.srcset ? ` imagesrcset="${attr(image.srcset)}"${image.sizes ? ` imagesizes="${attr(image.sizes)}"` : ''}` : '';
  const preload = `<link rel="preload" as="image" href="${attr(image.src)}"${responsive} fetchpriority="high">`;
  return html.slice(0, headEnd) + preload + html.slice(headEnd);
}
