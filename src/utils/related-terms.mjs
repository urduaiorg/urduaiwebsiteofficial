const groups = [
  ['artificial-intelligence', 'machine-learning', 'deep-learning', 'neural-networks', 'training-data', 'reinforcement-learning'],
  ['large-language-model', 'natural-language-processing', 'transformer', 'token', 'embedding', 'foundation-model'],
  ['generative-ai', 'diffusion-model', 'computer-vision', 'multimodal-ai'],
  ['prompt-engineering', 'hallucination', 'google-gemini', 'claude-ai', 'zero-shot-learning'],
  ['ai-agent', 'retrieval-augmented-generation', 'inference', 'fine-tuning', 'artificial-general-intelligence'],
];
const links = body => new Set([...String(body || '').matchAll(/\/learn\/([a-z0-9-]+)\//g)].map(match => match[1]));

export function relatedTermsFor(entry, terms, limit = 4) {
  const outgoing = links(entry.body);
  const peers = new Set(groups.filter(group => group.includes(entry.id)).flat());
  return terms.filter(term => term.id !== entry.id && !term.data.draft)
    .map(term => ({ term, score: (outgoing.has(term.id) ? 100 : 0) + (links(term.body).has(entry.id) ? 40 : 0) + (peers.has(term.id) ? 20 : 0) }))
    .sort((a, b) => b.score - a.score || (a.term.id < b.term.id ? -1 : a.term.id > b.term.id ? 1 : 0))
    .slice(0, limit).map(item => item.term);
}
