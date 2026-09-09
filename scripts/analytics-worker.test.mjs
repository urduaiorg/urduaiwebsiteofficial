import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../src/scripts/privacy-consent.js', import.meta.url), 'utf8');
function app(usStatus = 1) {
  const appended = [], listeners = new Map(), button = { hidden: true }, reloads = [];
  const document = {
    addEventListener: (name, listener) => listeners.set(name, listener),
    querySelectorAll: () => [button], querySelector: () => null,
    createElement: () => ({}), head: { appendChild: script => appended.push(script) },
  };
  class Element { closest() { return this; } matches() { return false; } dataset = { analyticsEvent: 'test_click' }; }
  const context = vm.createContext({ document, console, Element, HTMLAnchorElement: class extends Element {}, location: { pathname: '/blog/example/', reload: () => reloads.push(true) } });
  context.window = context;
  vm.runInContext(source, context);
  const emit = (key, value) => {
    context.googlefc.getGoogleConsentModeValues = () => value;
    for (const entry of context.googlefc.callbackQueue) entry[key]?.();
  };
  const emitUS = status => {
    context.googlefc.usstatesoptout.getInitialUsStatesOptOutStatus = () => status;
    for (const entry of context.googlefc.callbackQueue) entry.INITIAL_US_STATES_OPT_OUT_DATA_READY?.();
  };
  if (usStatus !== null) emitUS(usStatus);
  return { context, appended, listeners, button, Element, emit, emitUS, reloads };
}
const state = n => ({ adStoragePurposeConsentStatus: n, adUserDataPurposeConsentStatus: n, adPersonalizationPurposeConsentStatus: n, analyticsStoragePurposeConsentStatus: n });
test('no CMP, unknown, denied or unconfigured choices do not start analytics', () => {
  for (const n of [undefined, 0, 2, 4]) {
    const a = app();
    assert.equal(a.appended.length, 0);
    a.emit('CONSENT_MODE_DATA_READY', state(n));
    assert.equal(a.appended.length, 0);
  }
});
test('granted or explicitly inapplicable consent starts one analytics tag with both destinations', () => {
  for (const n of [1, 3]) {
    const a = app();
    a.emit('CONSENT_MODE_DATA_READY', state(n)); a.emit('CONSENT_DATA_READY', state(n));
    assert.equal(a.appended.length, 1);
    assert.match(a.appended[0].src, /googletagmanager.com\/gtag\/js/);
    assert.equal(a.context.dataLayer.filter(args => args[0] === 'config').length, 2);
  }
});
test('partial consent stays blocked and earlier clicks are discarded', () => {
  const a = app();
  a.listeners.get('click')({ target: new a.Element() });
  a.emit('CONSENT_MODE_DATA_READY', { ...state(1), adPersonalizationPurposeConsentStatus: 2 });
  assert.equal(a.appended.length, 0);
  a.emit('CONSENT_MODE_DATA_READY', state(1));
  assert.equal(a.context.dataLayer.filter(args => args[0] === 'event').length, 0);
});
test('withdrawal disables analytics before opening the consent dialog', () => {
  const a = app();
  a.emit('CONSENT_API_READY'); a.emit('CONSENT_MODE_DATA_READY', state(1));
  assert.equal(a.button.hidden, false);
  let opened = false;
  a.context.googlefc.showRevocationMessage = () => {
    assert.equal(a.context['ga-disable-G-CW98PY3REY'], true);
    assert.equal(a.context.dataLayer.at(-1)[2].analytics_storage, 'denied');
    opened = true;
  };
  assert.equal(a.context.urduAiOpenPrivacyChoices(), true);
  assert.equal(opened, true);
  a.listeners.get('click')({ target: new a.Element() });
  assert.equal(a.context.dataLayer.filter(args => args[0] === 'event').length, 0);
});
test('CMP unavailability does not report a successful settings action', () => {
  assert.equal(app().context.urduAiOpenPrivacyChoices(), false);
});
test('a revised decision starts a fresh page after clearing the old record', () => {
  const a = app();
  a.emit('CONSENT_API_READY'); a.emit('CONSENT_MODE_DATA_READY', state(2));
  let cleared = false;
  a.context.googlefc.showRevocationMessage = () => { cleared = true; };
  a.context.location.reload = () => {
    assert.equal(cleared, true);
    assert.equal(a.context['ga-disable-G-CW98PY3REY'], true);
    a.reloads.push(true);
  };
  a.context.urduAiOpenPrivacyChoices();
  assert.equal(a.reloads.length, 1);
  assert.equal(a.appended.length, 0);
  // A new document receives new readiness callbacks; it does not depend on
  // Google replaying callbacks already consumed by the previous decision.
  const next = app();
  next.emit('CONSENT_MODE_DATA_READY', state(1));
  assert.equal(next.appended.length, 1);
  assert.equal(next.context['ga-disable-G-CW98PY3REY'], false);
});
test('direct ad-slot events are discarded before consent and after withdrawal', () => {
  const a = app();
  a.context.gtag('event', 'ad_slot_request', { ad_placement: 'top' });
  a.emit('CONSENT_API_READY');
  a.emit('CONSENT_MODE_DATA_READY', state(1));
  assert.equal(a.context.dataLayer.filter(args => args[0] === 'event').length, 0);
  a.context.gtag('event', 'ad_slot_result', { ad_status: 'filled' });
  assert.equal(a.context.dataLayer.filter(args => args[0] === 'event').length, 1);
  a.context.googlefc.showRevocationMessage = () => {};
  a.context.urduAiOpenPrivacyChoices();
  a.context.gtag('event', 'ad_slot_request');
  assert.equal(a.context.dataLayer.filter(args => args[0] === 'event').length, 1);
});
test('a consent API failure disables analytics after earlier consent', () => {
  const a = app();
  a.emit('CONSENT_MODE_DATA_READY', state(1));
  a.context.googlefc.getGoogleConsentModeValues = () => { throw new Error('CMP unavailable'); };
  a.context.googlefc.callbackQueue.find(entry => entry.CONSENT_MODE_DATA_READY).CONSENT_MODE_DATA_READY();
  assert.equal(a.context['ga-disable-G-CW98PY3REY'], true);
  a.context.gtag('event', 'ad_slot_request');
  assert.equal(a.context.dataLayer.filter(args => args[0] === 'event').length, 0);
});

test('EU inapplicable cannot enable analytics in a US or unknown region', () => {
  for (const usStatus of [null, 0, 2, 3, 99]) {
    const a = app(usStatus);
    a.emit('CONSENT_MODE_DATA_READY', state(3));
    assert.equal(a.appended.length, 0);
    assert.equal(a.context['ga-disable-G-CW98PY3REY'], true);
  }
});
test('analytics waits for both regional callbacks regardless of their order', () => {
  const a = app(null);
  a.emit('CONSENT_MODE_DATA_READY', state(1));
  assert.equal(a.appended.length, 0);
  a.emitUS(1);
  assert.equal(a.appended.length, 1);
  const b = app(2);
  assert.equal(b.appended.length, 0);
  b.emit('CONSENT_MODE_DATA_READY', state(3));
  assert.equal(b.appended.length, 0);
});
test('US privacy choices use Google default controls instead of the unreliable custom API', () => {
  for (const usStatus of [2, 3]) {
    const a = app(usStatus);
    a.emit('CONSENT_API_READY');
    a.context.googlefc.usstatesoptout.openConfirmationDialog = () => assert.fail('Custom US API must not be used');
    a.context.googlefc.showRevocationMessage = () => assert.fail('Wrong regional dialog');
    assert.equal(a.context.googlefc.usstatesoptout.overrideDnsLink, false);
    assert.equal(a.button.hidden, true);
    assert.equal(a.context.urduAiOpenPrivacyChoices(), false);
  }
});
test('missing US dialog fails closed without falling back to European consent', () => {
  const a = app(2);
  a.emit('CONSENT_API_READY');
  a.context.googlefc.showRevocationMessage = () => assert.fail('Wrong regional fallback');
  assert.equal(a.context.urduAiOpenPrivacyChoices(), false);
});

test('legacy and current Google runtimes retain their built-in US opt-out link', () => {
  const a = app();
  assert.equal(a.context.googlefc.ccpa.overrideDnsLink, false);
  assert.equal(a.context.googlefc.usstatesoptout.overrideDnsLink, false);
});

test('US analytics remains off across any consent changes without custom GPP reloads', () => {
  const a = app(2);
  a.context.__gpp = () => assert.fail('Site analytics must not interfere with Google GPP');
  a.emit('CONSENT_API_READY');
  for (const n of [1, 2, 3, 1]) {
    a.emit('CONSENT_MODE_DATA_READY', state(n));
    a.emit('CONSENT_DATA_READY', state(n));
    a.context.gtag('event', 'interaction');
    assert.equal(a.context['ga-disable-G-CW98PY3REY'], true);
    assert.equal(a.appended.length, 0);
    assert.equal(a.reloads.length, 0);
    assert.equal(a.context.dataLayer.filter(args => args[0] === 'event').length, 0);
  }
});
