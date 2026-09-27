import test from 'node:test';
import assert from 'node:assert/strict';
import { articleDates } from '../src/utils/article-dates.mjs';

test('precise publication timestamp is the default modification date', () => {
  assert.deepEqual(articleDates('2026-09-24', '2026-09-25T00:52:05Z'), {
    published: '2026-09-25T00:52:05Z', modified: '2026-09-25T00:52:05Z', updated: undefined,
  });
});
test('older, same-day midnight and invalid updates cannot invent earlier modification dates', () => {
  for (const update of ['2026-09-24', '2026-09-25', 'invalid']) {
    assert.equal(articleDates('2026-09-24', '2026-09-25T00:52:05Z', update).updated, undefined);
  }
});
test('real subsequent updates and legacy date-only publications are preserved', () => {
  assert.equal(articleDates('2026-09-24', undefined).modified, '2026-09-24');
  assert.equal(articleDates('2026-09-24', '2026-09-25T00:52:05Z', '2026-09-26').modified, '2026-09-26');
});
