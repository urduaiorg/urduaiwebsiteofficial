import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'اردو اے آئی',
    description: 'پاکستان کا سب سے بڑا اردو زبان میں اے آئی خواندگی پلیٹ فارم',
    site: context.site,
    items: sorted.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>ur</language>',
  });
}
