import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  // Google News: filter to اے آئی اپڈیٹ category (news posts)
  // Include last 30 days on launch to seed the feed; ongoing only last 48h qualify
  // for Google News freshness, but keeping 30 days ensures indexing on new submission
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const newsPosts = posts
    .filter(p => {
      const postDate = new Date(p.data.date);
      return postDate >= thirtyDaysAgo;
    })
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 1000);

  return rss({
    title: 'اردو اے آئی — اے آئی نیوز',
    description: 'پاکستانی نقطہ نظر سے اے آئی کی تازہ ترین خبریں — اردو میں',
    site: context.site,
    items: newsPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
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
