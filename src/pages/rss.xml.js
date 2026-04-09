import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const [blog, guides, howto, prompts, learn] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('howto', ({ data }) => !data.draft),
    getCollection('prompts', ({ data }) => !data.draft),
    getCollection('learn', ({ data }) => !data.draft),
  ]);

  const collectionMap = {
    blog: 'blog',
    guides: 'guides',
    howto: 'how-to',
    prompts: 'prompts',
    learn: 'learn',
  };

  const allItems = [
    ...blog.map(p => ({ ...p, _collection: 'blog' })),
    ...guides.map(p => ({ ...p, _collection: 'guides' })),
    ...howto.map(p => ({ ...p, _collection: 'howto' })),
    ...prompts.map(p => ({ ...p, _collection: 'prompts' })),
    ...learn.map(p => ({ ...p, _collection: 'learn' })),
  ];

  const sorted = allItems
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 50);

  return rss({
    title: 'اردو اے آئی',
    description: 'پاکستان کا سب سے بڑا اردو زبان میں اے آئی خواندگی پلیٹ فارم',
    site: context.site,
    items: sorted.map(item => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: new Date(item.data.date),
      link: `/${collectionMap[item._collection]}/${item.id}/`,
    })),
    customData: '<language>ur</language>',
  });
}
