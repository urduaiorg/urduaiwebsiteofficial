import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/layouts/Base.astro', import.meta.url), 'utf8');
const scripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
function setup({ idle = true, readyState = 'loading' } = {}) {
  const appended = [];
  const events = new Map();
  const timers = new Map();
  let nextTimer = 0;
  const window = {
    addEventListener: (name, fn) => events.set(name, fn),
    removeEventListener: name => events.delete(name),
    setTimeout: (fn, delay) => { timers.set(++nextTimer, { fn, delay }); return nextTimer; },
    clearTimeout: id => timers.delete(id),
  };
  if (idle) window.requestIdleCallback = fn => events.set('idle', fn);
  const document = {
    readyState,
    getElementById: id => appended.find(script => script.id === id),
    createElement: () => ({}),
    head: { appendChild: script => appended.push(script) },
  };
  const context = vm.createContext({ window, document, navigator: { userAgent: 'Android' }, console, MutationObserver: class { observe() {} } });
  vm.runInContext(scripts.find(s => s.includes('window.urduAiAdsInAppBrowser =')), context);
  vm.runInContext(scripts.find(s => s.includes('window.urduAiRetryAdSlot =')), context);
  return { window, appended, events, timers };
}
function slot() {
  const container = { dataset: { adPlacement: 'after-intro' }, getBoundingClientRect: () => ({ width: 343 }), classList: { toggle() {} } };
  return { dataset: {}, closest: () => container, getBoundingClientRect: () => ({ width: 343 }) };
}
test('waits for content load and idle, deduplicates concurrent slot requests', async () => {
  const app = setup();
  const target = slot();
  const pending = app.window.urduAiPushSingleAd(target);
  await app.window.urduAiPushSingleAd(target);
  assert.equal(app.appended.length, 0);
  assert.equal(target.dataset.urduAiAdState, 'scheduled');
  app.events.get('load')();
  assert.equal(app.appended.length, 0);
  app.events.get('idle')();
  await pending;
  assert.equal(app.appended.length, 1);
  assert.equal(app.window.adsbygoogle.length, 1);
  await app.window.urduAiPushSingleAd(slot());
  assert.equal(app.appended.length, 1);
  assert.equal(app.window.adsbygoogle.length, 2);
  assert.equal(app.timers.size, 0);
});
test('eventually loads when a resource hangs and requestIdleCallback is unavailable', async () => {
  const app = setup({ idle: false });
  const pending = app.window.urduAiPushSingleAd(slot());
  [...app.timers.values()].find(t => t.delay === 5000).fn();
  [...app.timers.values()].find(t => t.delay === 0).fn();
  await pending;
  assert.equal(app.appended.length, 1);
});
test('does not request a slot excluded while waiting for content', async () => {
  const app = setup({ readyState: 'complete' });
  const target = slot();
  const pending = app.window.urduAiPushSingleAd(target);
  target.dataset.urduAiAdState = 'skipped-responsive';
  app.events.get('idle')();
  await pending;
  assert.equal(app.appended.length, 0);
});
