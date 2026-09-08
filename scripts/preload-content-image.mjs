import { parse } from 'parse5';

const attr = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

// Use the rendered responsive candidates, so preload and img choose the same file.
export function preloadContentImage(html) {
  let image;
  let insertionPoint;
  let existing = false;
  const walk = node => {
    const attrs = Object.fromEntries((node.attrs || []).map(({ name, value }) => [name, value]));
    if (node.tagName === 'head') {
      insertionPoint = node.sourceCodeLocation?.startTag?.endOffset;
      // Respect encoding and responsive viewport metadata, then start the image
      // before the inline styles and remaining head bytes arrive.
      for (const child of node.childNodes || []) {
        const meta = Object.fromEntries((child.attrs || []).map(({ name, value }) => [name, value]));
        if (child.tagName === 'meta' && (meta.charset || meta.name === 'viewport')) {
          insertionPoint = child.sourceCodeLocation?.endOffset ?? insertionPoint;
        }
      }
    }
    if (node.tagName === 'link' && attrs.rel === 'preload' && attrs.as === 'image') existing = true;
    if (!image && node.tagName === 'img' && attrs.fetchpriority === 'high' && attrs.loading !== 'lazy' && attrs.src?.startsWith('/_astro/')) image = attrs;
    for (const child of node.childNodes || []) walk(child);
  };
  walk(parse(html, { sourceCodeLocationInfo: true }));
  if (!image || existing || insertionPoint === undefined) return html;
  const responsive = image.srcset ? ` imagesrcset="${attr(image.srcset)}"${image.sizes ? ` imagesizes="${attr(image.sizes)}"` : ''}` : '';
  const preload = `<link rel="preload" as="image" href="${attr(image.src)}"${responsive} fetchpriority="high">`;
  return html.slice(0, insertionPoint) + preload + html.slice(insertionPoint);
}
