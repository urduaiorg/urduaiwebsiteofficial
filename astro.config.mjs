// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isPagesPreview = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: isPagesPreview
    ? 'https://urduaiorg.github.io'
    : 'https://urduai.org',
  base: isPagesPreview ? '/urduaiwebsiteofficial/' : '/',
  output: 'static',
  integrations: [sitemap()],
});
