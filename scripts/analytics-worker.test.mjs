import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { partytownSnippet } from '@qwik.dev/partytown/integration';
const source = readFileSync(new URL('../src/layouts/Base.astro', import.meta.url), 'utf8');
const loader = source.match(/<script type="text\/partytown">([\s\S]*?)<\/script>/)[1];
const bridge = source.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
function app() {
  const appended = [];
  const listeners = new Map();
  let context;
  const document = {
    readyState: 'complete',
    addEventListener: (name, listener) => listeners.set(name, listener),
    removeEventListener() {},
    querySelectorAll: () => [{ innerHTML: loader }],
    createElement: () => ({}),
    head: { appendChild(script) { appended.push(script); if (script.innerHTML) vm.runInContext(script.innerHTML, context); } },
  };
  context = vm.createContext({ document, navigator: {}, console, setTimeout: () => 1, clearTimeout() {}, addEventListener() {}, location: { pathname: '/guides/example/' } });
  context.window = context; context.top = context;
  vm.runInContext(bridge, context);
  return { context, appended, listeners };
}
test('queues an event before worker initialization', () => {
  const { context } = app();
  context.gtag('event', 'newsletter_click', { event_category: 'content_engagement' });
  assert.equal(context.dataLayer.length, 1);
  assert.equal(context.dataLayer[0][1], 'newsletter_click');
});
test('unsupported worker falls back to native analytics with both destinations', () => {
  const { context, appended } = app();
  vm.runInContext(partytownSnippet({ forward: ['gtag', 'dataLayer.push'] }), context);
  assert.equal(appended.filter(s => s.src?.includes('googletagmanager.com/gtag/js')).length, 1);
  assert.deepEqual(Array.from(context.dataLayer, args => Array.from(args).slice(0,2)).filter(a => a[0] === 'config'), [['config','GT-T945ZSRZ'],['config','G-CW98PY3REY']]);
  context.gtag('event', 'newsletter_click');
  assert.equal(context.dataLayer.at(-1)[1], 'newsletter_click');
});
