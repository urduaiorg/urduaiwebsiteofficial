import test from 'node:test';
import assert from 'node:assert/strict';
import { preloadContentImage } from './preload-content-image.mjs';
test('preloads the exact responsive candidates before the body without duplicating hints', () => {
  const input = '<html><head><title>اردو</title></head><body><img src="/_astro/cover.webp" srcset="/_astro/small.webp 400w, /_astro/large.webp 800w" sizes="(max-width: 800px) 100vw, 800px" fetchpriority="high" loading="eager"></body></html>';
  const output = preloadContentImage(input);
  assert.ok(output.indexOf('imagesrcset="/_astro/small.webp 400w, /_astro/large.webp 800w"') < output.indexOf('</head>'));
  assert.ok(output.includes('imagesizes="(max-width: 800px) 100vw, 800px"'));
  assert.equal(preloadContentImage(output), output);
});
test('does not preload lazy, remote or ordinary below-fold images', () => {
  for (const image of ['<img src="/_astro/x.webp" loading="lazy" fetchpriority="high">', '<img src="https://example.org/x.webp" fetchpriority="high">', '<img src="/_astro/x.webp">']) {
    const input = `<html><head></head><body>${image}</body></html>`;
    assert.equal(preloadContentImage(input), input);
  }
});

test('starts responsive image discovery after viewport metadata and before styles', () => {
  const input = '<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>/* styles */</style></head><body><img src="/_astro/cover.webp" fetchpriority="high"></body></html>';
  const output = preloadContentImage(input);
  assert.ok(output.indexOf('rel="preload"') > output.indexOf('name="viewport"'));
  assert.ok(output.indexOf('rel="preload"') < output.indexOf('<style>'));
  assert.ok(output.indexOf('<meta charset=') < output.indexOf('rel="preload"'));
});
