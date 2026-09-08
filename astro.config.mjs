// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import contentHeadings from './scripts/rehype-content-headings.mjs';
import staticBidi from './scripts/static-bidi.mjs';

export default defineConfig({
  site: 'https://urduai.org',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  // Remove the measured CSS request chain for first-time mobile readers.
  // Reassess HTML transfer size and repeat-navigation caching with each release.
  build: { inlineStylesheets: 'always' },
  markdown: { rehypePlugins: [contentHeadings] },
  integrations: [partytown({ config: { debug: false, forward: ['gtag', 'dataLayer.push'] } }), sitemap({ filter: page => new URL(page).pathname !== '/covers/' }), staticBidi()],
});
