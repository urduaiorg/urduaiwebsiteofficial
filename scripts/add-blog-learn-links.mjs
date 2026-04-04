#!/usr/bin/env node
/**
 * Append a short "## لغت میں اور پڑھیں" block to blog posts that have no /learn/ link yet.
 * Scores learn terms from body text (after frontmatter); ties broken by beginner-friendly order.
 *
 * Usage:
 *   node scripts/add-blog-learn-links.mjs --dry-run
 *   node scripts/add-blog-learn-links.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(REPO_ROOT, 'src/content/blog');
const LEARN_DIR = path.join(REPO_ROOT, 'src/content/learn');

const dryRun = process.argv.includes('--dry-run');

/** Prefer these when scores tie (matches learn/index.astro spirit) */
const PRIORITY = [
  'generative-ai',
  'machine-learning',
  'large-language-model',
  'prompt-engineering',
  'ai-agent',
  'hallucination',
  'deep-learning',
  'neural-networks',
  'artificial-general-intelligence',
  'multimodal-ai',
  'natural-language-processing',
  'computer-vision',
  'transformer',
  'retrieval-augmented-generation',
  'fine-tuning',
  'foundation-model',
  'reinforcement-learning',
  'training-data',
  'diffusion-model',
  'inference',
  'embedding',
  'token',
  'zero-shot-learning',
];

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return { body: raw, fm: '' };
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { body: raw, fm: '' };
  return {
    fm: raw.slice(4, end),
    body: raw.slice(end + 5),
  };
}

function cleanLinkTitle(title) {
  return title
    .replace(/\s*—\s*آسان اردو میں\s*$/u, '')
    // Titles use Arabic question mark ؟ (U+061F), not ASCII ?
    .replace(/\s*کیا ہے[؟?]\s*$/u, '')
    .trim();
}

function loadLearnEntries() {
  const files = fs.readdirSync(LEARN_DIR).filter((f) => f.endsWith('.md'));
  const entries = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(LEARN_DIR, file), 'utf8');
    const titleMatch = raw.match(/^title:\s*"(.*)"\s*$/m);
    const title = titleMatch ? titleMatch[1] : slug;
    entries.push({ slug, title: cleanLinkTitle(title) || title });
  }
  return entries;
}

/**
 * Each slug: list of regexes; each regex counts at most once toward score (max 3 per slug).
 */
const PATTERNS_BY_SLUG = {
  'large-language-model': [
    /\blarge language model\b/i,
    /\bllms?\b/i,
    /\bChatGPT\b/i,
    /\bGPT[- ]?[0-9]/i,
    /چیٹ\s*جی\s*پی\s*ٹی/i,
    /\bClaude\b/i,
    /کلاڈ/i,
    /\bGemini\b/i,
    /جیمنی/i,
    /\bCopilot\b/i,
    /کوپائلٹ/i,
    /\bLLM\b/,
  ],
  'generative-ai': [
    /\bgenerative ai\b/i,
    /\bgenerative artificial intelligence\b/i,
    /\bDALL[- ]?E\b/i,
    /\bMidjourney\b/i,
    /\bStable Diffusion\b/i,
    /text-to-image/i,
    /image generation/i,
    /\bSora\b/i,
    /\bVeo\b/i,
    /جینریٹو/i,
    /تصویر.*اے\s*آئی|اے\s*آئی.*تصویر/i,
  ],
  'machine-learning': [/\bmachine learning\b/i, /مشین\s*لرن/i, /\bML\b(?![A-Za-z])/],
  'prompt-engineering': [
    /\bprompt engineering\b/i,
    /پرامٹ\s*انجینئر/i,
    /پرامپٹ\s*انجینئر/i,
    /engineering playbook/i,
    /گولڈن rules/i,
  ],
  'neural-networks': [/\bneural networks?\b/i, /نیورل\s*نیٹ/i],
  'deep-learning': [/\bdeep learning\b/i, /ڈیپ\s*لرن/i],
  hallucination: [/\bhallucination\b/i, /ہیلوسین/i, /غلط بیانی/i],
  'artificial-general-intelligence': [/\bAGI\b/, /artificial general intelligence/i, /اے\s*جی\s*آئی/i],
  'ai-agent': [
    /\bai agents?\b/i,
    /اے\s*آئی\s*ایجنٹ/i,
    /autonomous agent/i,
    /خودکار.*ایجنٹ/i,
    /\bManus\b/i,
    /مینس/i,
  ],
  transformer: [/\btransformers?\b/i, /ٹرانسفارمر/i],
  'natural-language-processing': [/\bNLP\b/, /\bnatural language processing\b/i, /قدرتی زبان/i],
  'computer-vision': [/\bcomputer vision\b/i, /کمپیوٹر\s*ویژن/i],
  'reinforcement-learning': [/\breinforcement learning\b/i, /رینفورسمنٹ/i],
  'multimodal-ai': [/\bmultimodal\b/i, /ملٹی\s*موڈل/i],
  'retrieval-augmented-generation': [/\bRAG\b/, /retrieval[- ]augmented/i, /رٹریول آگمنٹڈ/i],
  'fine-tuning': [/\bfine[- ]tuning\b/i, /فائن\s*ٹیون/i],
  'foundation-model': [/\bfoundation models?\b/i, /فاؤنڈیشن ماڈل/i],
  'training-data': [/\btraining data\b/i, /ٹریننگ ڈیٹا/i],
  'diffusion-model': [/\bdiffusion models?\b/i, /ڈفیوژن/i, /\bImagen\b/i],
  inference: [/\binference\b/i, /انفرنس/i],
  embedding: [/\bembeddings?\b/i, /امبیڈنگ/i],
  token: [/\btoken limit\b/i, /context window/i, /ٹوکن/i],
  'zero-shot-learning': [/zero[- ]shot/i, /زیرو\s*شاٹ/i],
};

function scoreBody(body) {
  const text = body;
  const scores = new Map();
  for (const [slug, patterns] of Object.entries(PATTERNS_BY_SLUG)) {
    let s = 0;
    for (const re of patterns) {
      if (re.test(text)) s += 1;
      if (s >= 3) break;
    }
    if (s > 0) scores.set(slug, s);
  }
  return scores;
}

function pickTopSlugs(scores, limit = 3) {
  const pri = (slug) => {
    const i = PRIORITY.indexOf(slug);
    return i === -1 ? 999 : i;
  };
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1] || pri(a[0]) - pri(b[0]))
    .slice(0, limit)
    .map(([slug]) => slug);
}

function sectionBlock(slugs, titleBySlug) {
  if (slugs.length === 0) {
    return (
      '\n\n## لغت میں اور پڑھیں\n\n' +
      '[اردو اے آئی لغت](/learn/) میں مصنوعی ذہانت کی اصطلاحات آسان اردو میں پڑھیں۔\n'
    );
  }
  const lines = slugs.map((s) => `- [${titleBySlug.get(s)}](/learn/${s}/)`);
  return '\n\n## لغت میں اور پڑھیں\n\n' + lines.join('\n') + '\n';
}

function main() {
  const learnList = loadLearnEntries();
  const titleBySlug = new Map(learnList.map((e) => [e.slug, e.title]));

  const blogFiles = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  let skippedHasLearn = 0;
  let skippedHasSection = 0;
  let updated = 0;
  let fallbackOnly = 0;
  const dryRunSamples = [];

  for (const file of blogFiles) {
    const fp = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fp, 'utf8');
    if (raw.includes('/learn/')) {
      skippedHasLearn++;
      continue;
    }
    if (raw.includes('## لغت میں اور پڑھیں')) {
      skippedHasSection++;
      continue;
    }

    const { body } = parseFrontmatter(raw);
    const scores = scoreBody(body);
    const top = pickTopSlugs(scores, 3);
    if (top.length === 0) fallbackOnly++;

    const block = sectionBlock(top, titleBySlug);
    if (dryRun) {
      if (dryRunSamples.length < 12) {
        dryRunSamples.push({ file, top: top.join(',') || '(index only)' });
      }
      updated++;
      continue;
    }

    const trimmed = raw.replace(/\s+$/, '');
    fs.writeFileSync(fp, trimmed + block, 'utf8');
    updated++;
  }

  console.log(
    JSON.stringify(
      {
        dryRun,
        blogTotal: blogFiles.length,
        updated,
        skippedHasLearn,
        skippedHasSection,
        fallbackOnly,
        samples: dryRun ? dryRunSamples : undefined,
      },
      null,
      2,
    ),
  );
}

main();
