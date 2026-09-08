import { parse } from 'parse5';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preloadContentImage } from './preload-content-image.mjs';

// Match the former browser formatter, without making every reader rewrite the DOM.
const latinRun = /[A-Za-z0-9][A-Za-z0-9+.#:/@&%$€£₹₨₽₺¥,.'’()_-]*(?:\s+[A-Za-z0-9+.#:/@&%$€£₹₨₽₺¥,.'’()_-]+)*/g;
const skipTags = new Set(['head', 'script', 'style', 'noscript', 'template', 'code', 'pre', 'kbd', 'samp', 'textarea', 'input', 'select', 'option', 'svg', 'math', 'iframe', 'bdi']);
const skipClasses = new Set(['ltr', 'bidi-ltr', 'site-logo', 'adsbygoogle', 'pagefind-ui']);
const escapeText = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function staticBidi(html) {
  const edits = [];
  const walk = (node, inBody = false) => {
    if (skipTags.has(node.tagName)) return;
    const attrs = Object.fromEntries((node.attrs || []).map(({ name, value }) => [name, value]));
    if (attrs.dir?.toLowerCase() === 'ltr' || 'data-bidi-skip' in attrs || (attrs.class || '').split(/\s+/).some(name => skipClasses.has(name))) return;
    inBody ||= node.tagName === 'body';
    if (inBody && node.nodeName === '#text' && node.sourceCodeLocation) {
      const matches = [...node.value.matchAll(latinRun)];
      if (matches.length) {
        let end = 0;
        let replacement = '';
        for (const match of matches) {
          replacement += escapeText(node.value.slice(end, match.index));
          replacement += `<bdi dir="ltr" class="bidi-ltr">${escapeText(match[0])}</bdi>`;
          end = match.index + match[0].length;
        }
        replacement += escapeText(node.value.slice(end));
        edits.push({ ...node.sourceCodeLocation, replacement });
      }
    }
    for (const child of node.childNodes || []) walk(child, inBody);
  };
  walk(parse(html, { sourceCodeLocationInfo: true }));
  // Source offsets preserve every untouched byte, including scripts and attributes.
  for (const edit of edits.sort((a, b) => b.startOffset - a.startOffset)) {
    html = html.slice(0, edit.startOffset) + edit.replacement + html.slice(edit.endOffset);
  }
  return html;
}

export default function staticBidiIntegration() {
  return {
    name: 'urduai-static-bidi',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        let count = 0;
        const visit = async directory => {
          for (const entry of await readdir(directory, { withFileTypes: true })) {
            const path = join(directory, entry.name);
            if (entry.isDirectory()) await visit(path);
            else if (entry.name.endsWith('.html')) {
              const html = await readFile(path, 'utf8');
              const formatted = preloadContentImage(staticBidi(html));
              if (formatted !== html) {
                await writeFile(path, formatted);
                count++;
              }
            }
          }
        };
        await visit(fileURLToPath(dir));
        logger.info(`Prepared mixed Urdu/English text in ${count} HTML files.`);
      },
    },
  };
}
