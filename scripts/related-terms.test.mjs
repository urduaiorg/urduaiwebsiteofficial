import test from 'node:test';
import assert from 'node:assert/strict';
import { relatedTermsFor } from '../src/utils/related-terms.mjs';
const term = (id, body = '', draft = false) => ({ id, body, data: { draft } });
test('prefers concepts actually linked by the lesson and excludes self and drafts', () => {
  const current = term('artificial-intelligence', '[Prompt](/learn/prompt-engineering/) [Hidden](/learn/draft/)');
  const terms = [current, term('machine-learning'), term('prompt-engineering'), term('draft', '', true), term('other', '[AI](/learn/artificial-intelligence/)')];
  assert.deepEqual(relatedTermsFor(current, terms).map(t => t.id), ['prompt-engineering', 'other', 'machine-learning']);
});
test('output is stable regardless of collection order and does not mutate input', () => {
  const current = term('large-language-model');
  const terms = [term('token'), term('embedding'), term('transformer'), term('diffusion-model')];
  const ids = terms.map(t => t.id);
  assert.deepEqual(relatedTermsFor(current, terms), relatedTermsFor(current, [...terms].reverse()));
  assert.deepEqual(terms.map(t => t.id), ids);
  assert.equal(relatedTermsFor(current, terms)[3].id, 'diffusion-model');
});
