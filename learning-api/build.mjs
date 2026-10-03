import { readdir, readFile, writeFile } from 'node:fs/promises';
import { load } from 'js-yaml';
import { fileURLToPath } from 'node:url';
const root = new URL('../src/content/', import.meta.url);
export function resource(collection, slug, data, now = new Date()) {
  if (data.draft || !data.title || !data.description) return null;
  const published = new Date(data.published_at || data.date);
  if (Number.isNaN(+published) || published > now) return null;
  const type = collection === 'howto' ? 'how-to' : collection;
  return { id: `${type}/${slug}`, type, title: data.title, description: data.description,
    url: `https://urduai.org/${type}/${slug}/`, language: 'ur',
    published_at: published.toISOString(), updated_at: data.last_updated ? new Date(data.last_updated).toISOString() : null,
    last_verified: data.last_verified ? new Date(data.last_verified).toISOString() : null,
    level: data.level || data.difficulty || null,
    topics: [data.tool, data.term_english, data.profession, ...(data.tags || []), ...(data.tools || [])].filter(Boolean) };
}
export async function build() {
  const resources = [];
  for (const collection of ['guides','howto','prompts','learn']) {
    for (const file of (await readdir(new URL(`${collection}/`,root))).filter(f=>f.endsWith('.md')).sort()) {
      const text = await readFile(new URL(`${collection}/${file}`,root),'utf8');
      const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!frontmatter) throw new Error(`Missing frontmatter: ${file}`);
      const item = resource(collection,file.slice(0,-3),load(frontmatter[1]));
      if(item) resources.push(item);
    }
  }
  // Course status is editorially checked against the existing public course pages.
  resources.push({id:'courses/masterclass',type:'courses',title:'اے آئی ماسٹرکلاس',description:'مفت ابتدائی اے آئی کورس — ویڈیو اسباق، عملی مشقیں اور کوئزز۔',url:'https://urduai.org/courses/masterclass/',language:'ur',level:'ابتدائی',topics:['AI','beginner','free course','ChatGPT','Gemini','مصنوعی ذہانت'],availability:'available',price:0,price_currency:'PKR',published_at:null,updated_at:null,last_verified:'2026-09-19T00:00:00.000Z'});
  const catalogue = {generated_at:new Date().toISOString(),resources};
  await writeFile(new URL('catalogue.json',import.meta.url),JSON.stringify(catalogue,null,2)+'\n');
  console.log(`Built ${resources.length} public learning resources.`);
}
if(process.argv[1] === fileURLToPath(import.meta.url)) await build();
