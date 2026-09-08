// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import contentHeadings from './scripts/rehype-content-headings.mjs';

export default defineConfig({
  site: 'https://urduai.org',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  markdown: { rehypePlugins: [contentHeadings] },
  integrations: [sitemap({ filter: page => new URL(page).pathname !== '/covers/' })],
});
