import test from 'node:test';
import assert from 'node:assert/strict';
import { newestPublished, validVideos, YOUTUBE_CHANNEL } from '../src/utils/homepage-content.mjs';
import { startHomepageAdsAfterModules } from '../src/utils/start-homepage-ads.mjs';
import { fetchHomepageVideos } from '../src/utils/fetch-homepage-videos.mjs';

test('video refresh prefers the live endpoint and falls back on errors or invalid data', async () => {
  const good = { channelId: YOUTUBE_CHANNEL, videos: [{ id: 'aaaaaaaaaaa', title: 'Test video', publishedAt: '2020-01-01T00:00:00Z' }] };
  const calls = [];
  const success = { ok: true, json: async () => good };
  assert.equal((await fetchHomepageVideos(async (url, options) => {
    calls.push(url); assert.equal(options.cache, 'no-store'); return success;
  }))[0].id, 'aaaaaaaaaaa');
  assert.deepEqual(calls, ['/data/youtube-feed.php']);
  for (const failure of [new Error('Offline'), { ok: false }, { ok: true, json: async () => ({ channelId: 'wrong', videos: good.videos }) }, { ok: true, json: async () => { throw new Error('Not JSON'); } }]) {
    const urls = [];
    const videos = await fetchHomepageVideos(async url => {
      urls.push(url);
      if (urls.length === 2) return success;
      if (failure instanceof Error) throw failure;
      return failure;
    });
    assert.deepEqual(urls, ['/data/youtube-feed.php', '/data/youtube-videos.json']);
    assert.equal(videos[0].id, 'aaaaaaaaaaa');
  }
  assert.deepEqual(await fetchHomepageVideos(async () => { throw new Error('Offline'); }), []);
});

test('homepage initializes ads even when its module executes before the shared ad loader', () => {
  for (const readyState of ['loading', 'interactive']) {
    const target = new EventTarget();
    let requests = 0;
    startHomepageAdsAfterModules({ readyState }, target);
    target.urduAiPushAds = () => requests++;
    assert.equal(requests, 0);
    target.dispatchEvent(new Event('DOMContentLoaded'));
    target.dispatchEvent(new Event('DOMContentLoaded'));
    assert.equal(requests, 1);
  }
});

test('a homepage script loaded after DOMContentLoaded starts the ad loader immediately', () => {
  let requests = 0;
  startHomepageAdsAfterModules({ readyState: 'complete' }, { urduAiPushAds: () => requests++ });
  assert.equal(requests, 1);
});

test('homepage uses exact publication time, excludes drafts and future posts, and ignores updates', () => {
  const entries = [
    { id: 'legacy', data: { date: '2026-09-20', last_updated: '2026-09-25' } },
    { id: 'morning', data: { date: '2026-09-20', published_at: '2026-09-20T08:00:00Z' } },
    { id: 'evening', data: { date: '2026-09-20', published_at: '2026-09-20T18:00:00Z' } },
    { id: 'draft', data: { date: '2026-09-21', draft: true } },
    { id: 'scheduled', data: { date: '2026-09-22' } },
  ];
  assert.deepEqual(newestPublished(entries, Date.parse('2026-09-21T12:00:00Z')).map(x => x.id), ['evening', 'morning', 'legacy']);
  assert.equal(entries[0].id, 'legacy');
});

test('video feed rejects another channel and unsafe identities, and sorts valid uploads', () => {
  const videos = [
    { id: 'aaaaaaaaaaa', title: 'Older video', publishedAt: '2026-09-18T00:00:00Z' },
    { id: '../../evil', title: 'Invalid', publishedAt: '2026-09-20T00:00:00Z' },
    { id: 'bbbbbbbbbbb', title: 'Recent video', publishedAt: '2026-09-20T00:00:00Z' },
    { id: 'ccccccccccc', title: 'Future', publishedAt: '2027-01-01T00:00:00Z' },
    { id: 'ddddddddddd', title: '', publishedAt: '2026-09-20T00:00:00Z' },
    { id: 'eeeeeeeeeee', title: 'Bad date', publishedAt: 'invalid' },
  ];
  const now = Date.parse('2026-09-21T12:00:00Z');
  assert.deepEqual(validVideos({ channelId: 'another-channel', videos }, now), []);
  assert.deepEqual(validVideos({ channelId: YOUTUBE_CHANNEL, videos }, now).map(x => x.id), ['bbbbbbbbbbb', 'aaaaaaaaaaa']);
  assert.deepEqual(validVideos(null, now), []);
});
