import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { newestPublished, publicationTime } from '../utils/homepage-content.mjs';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  // Preserve the existing RSS URL for subscribers. Google News uses the
  // separate rolling-window /news-sitemap.php endpoint.
  const now = Date.now();
  const newsPosts = newestPublished(posts, now)
    .filter(post => post.data.category === 'اے آئی اپڈیٹ' && publicationTime(post) >= now - 30 * 86400000)
    .slice(0, 1000);

  return rss({
    title: 'اردو اے آئی — اے آئی نیوز',
    description: 'پاکستانی نقطہ نظر سے اے آئی کی تازہ ترین خبریں — اردو میں',
    site: context.site,
    items: newsPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(publicationTime(post)),
      link: `/blog/${post.id}/`,
      categories: [post.data.category],
      ...(post.data.image ? {
        customData: `<media:content url="https://urduai.org${post.data.image}" medium="image" />`
      } : {}),
    })),
    customData: `
      <language>ur</language>
      <managingEditor>contact@urduai.org (قیصر رونجھا)</managingEditor>
      <webMaster>contact@urduai.org</webMaster>
      <copyright>Copyright ${new Date().getFullYear()} Urdu AI — WALI</copyright>
    `.trim(),
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
    },
  });
}
