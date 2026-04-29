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
  integrations: [
    sitemap({
      // Embargo: exclude the S&P StepForward press release from sitemap
      // until 8 a.m. EST / 5 p.m. PKT, April 30, 2026.
      // Remove this filter via a follow-up commit at embargo lift.
      filter: (page) => !page.includes('/press/sp-stepforward-2026'),
    }),
  ],
});
