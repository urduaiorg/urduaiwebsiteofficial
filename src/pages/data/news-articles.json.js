import { getCollection } from 'astro:content';
import { newestPublished, publicationTime } from '../../utils/homepage-content.mjs';

// Public, already-published metadata only. Hostinger filters the rolling window
// at request time, so news expires even when the static site is not rebuilt.
export async function GET() {
  const now = Date.now();
  const posts = newestPublished(await getCollection('blog'), now)
    .filter(post => post.data.category === 'اے آئی اپڈیٹ' && publicationTime(post) > now - 48 * 60 * 60 * 1000);
  return new Response(JSON.stringify(posts.map(post => ({
    url: `https://urduai.org/blog/${post.id}/`,
    title: post.data.title,
    published: new Date(publicationTime(post)).toISOString(),
  }))), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
