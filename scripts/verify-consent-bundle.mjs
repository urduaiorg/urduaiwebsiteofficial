// Check the shipped HTML, not just the source module: worker integrations can
// replace globals after source-only tests pass. No browser or network is used.
import { readFileSync } from 'node:fs';
import { parse } from 'parse5';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const file = process.argv[2] || 'dist/blog/chatgpt-images-2-5-features-how-to-use-urdu/index.html';
const html = readFileSync(file, 'utf8');
const scripts = [];
function walk(node) {
  if (node.tagName === 'script') scripts.push({
    attrs: Object.fromEntries(node.attrs.map(({ name, value }) => [name, value])),
    text: (node.childNodes || []).map(child => child.value || '').join(''),
  });
  for (const child of node.childNodes || []) walk(child);
}
walk(parse(html));
const index = scripts.findIndex(script => script.text.includes('window.urduAiOpenPrivacyChoices ='));
assert.ok(index >= 0, 'The built page must contain the consent controller');
assert.ok(!scripts.some(script => /partytown/i.test(JSON.stringify(script))), 'Legacy worker forwarding must not replace the controller');
assert.ok(!scripts.slice(0, index).some(script => /adsbygoogle|googletagmanager/.test(JSON.stringify(script))), 'Consent defaults must precede Google tags');
assert.ok(!scripts[index].attrs.type || scripts[index].attrs.type === 'text/javascript', 'The controller must be executable JavaScript');

const loaded = [];
const context = vm.createContext({
  document: {
    addEventListener() {}, querySelectorAll: () => [],
    createElement: () => ({}), head: { appendChild: script => loaded.push(script) },
  },
});
context.window = context;
vm.runInContext(scripts[index].text, context);
assert.equal(loaded.length, 0, 'No analytics before a decision');
const emit = (key, status) => {
  context.googlefc.getGoogleConsentModeValues = () => ({
    adStoragePurposeConsentStatus: status, adUserDataPurposeConsentStatus: status,
    adPersonalizationPurposeConsentStatus: status, analyticsStoragePurposeConsentStatus: status,
  });
  for (const entry of context.googlefc.callbackQueue) entry[key]?.();
};
emit('CONSENT_API_READY', 2);
emit('CONSENT_MODE_DATA_READY', 2);
assert.equal(loaded.length, 0, 'Refusal must not load analytics');
assert.equal(context['ga-disable-G-CW98PY3REY'], true);
emit('CONSENT_MODE_DATA_READY', 1);
assert.equal(loaded.length, 1, 'Granted signals initialize analytics once');
assert.equal(context['ga-disable-G-CW98PY3REY'], false);
let reopened = false;
context.googlefc.showRevocationMessage = () => {
  assert.equal(context['ga-disable-G-CW98PY3REY'], true, 'Disable analytics before reopening');
  reopened = true;
};
assert.equal(context.urduAiOpenPrivacyChoices(), true);
assert.ok(reopened);
const eventsBefore = context.dataLayer.filter(args => args[0] === 'event').length;
context.gtag('event', 'ad_slot_request');
assert.equal(context.dataLayer.filter(args => args[0] === 'event').length, eventsBefore);
console.log(JSON.stringify({ file, result: 'passed', checks: ['controller embedded and executable', 'no worker forwarding', 'defaults before tags', 'unknown and refused blocked', 'granted initializes once', 'withdrawal blocks events'], limitation: 'Simulated consent callbacks; actual browser, CMP lifecycle and network verification remain required.' }, null, 2));
