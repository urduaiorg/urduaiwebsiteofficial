import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// YAML auto-parses YYYY-MM-DD as Date objects.
// This coerces both strings and Date objects to 'YYYY-MM-DD' string.
const dateString = z.union([
  z.string(),
  z.date().transform(d => d.toISOString().slice(0, 10)),
]);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: dateString,
    category: z.string().default('اے آئی اپڈیٹ'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    author: z.string().default('قیصر رونجھا'),
    adsense: z.boolean().default(true),
    draft: z.boolean().default(false),
    // Optional tool names — auto-renders RelatedTools component + schema.org mentions
    tools: z.array(z.string()).optional(),
    // Optional FAQ pairs — used to generate FAQPage schema for featured snippets
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: dateString,
    category: z.string().default('گائیڈ'),
    tool: z.string().optional(),
    level: z.enum(['ابتدائی', 'درمیانہ', 'ماہر']).default('ابتدائی'),
    image: z.string().optional(),
    adsense: z.boolean().default(true),
    draft: z.boolean().default(false),
    tools: z.array(z.string()).optional(),
  }),
});

const howto = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/howto' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: dateString,
    last_verified: dateString,
    category: z.string().default('ہاؤ ٹو'),
    tool: z.string().optional(),
    difficulty: z.enum(['آسان', 'درمیانہ', 'مشکل']).default('آسان'),
    time_required: z.string().optional(),
    screenshots: z.boolean().default(false),
    adsense: z.boolean().default(true),
    draft: z.boolean().default(false),
    tools: z.array(z.string()).optional(),
  }),
});

const prompts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prompts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: dateString,
    category: z.string().default('پرامٹس'),
    profession: z.string().optional(),
    prompt_count: z.number().default(0),
    adsense: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: dateString,
    category: z.string().default('اردو اے آئی لغت'),
    term_english: z.string(),
    adsense: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.string().default('مفت'),
    modules: z.number().default(0),
    duration: z.string().optional(),
    level: z.enum(['ابتدائی', 'درمیانہ', 'ماہر']).default('ابتدائی'),
    adsense: z.boolean().default(false), // NEVER true on courses
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, guides, howto, prompts, learn, courses };
