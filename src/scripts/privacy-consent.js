// Google CMP is delivered by the existing AdSense tag on ad-enabled pages.
// Do not load analytics on a page where the CMP has not supplied a decision.
(() => {
  window.dataLayer = window.dataLayer || [];
  let allowed = false;
  // Ad slots and other page components also call gtag directly. Discard their
  // events before consent, rather than queueing them for a later tag load.
  window.gtag = function () {
    if (arguments[0] === 'event' && !allowed) return;
    window.dataLayer.push(arguments);
  };
  const denied = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' };
  window.gtag('consent', 'default', denied);
  window.googlefc = window.googlefc || {};
  window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
  window.googlefc.usstatesoptout = window.googlefc.usstatesoptout || {};
  window.googlefc.usstatesoptout.overrideDnsLink = true;
  // Older Funding Choices runtimes still read the legacy namespace.
  window.googlefc.ccpa = window.googlefc.ccpa || {};
  window.googlefc.ccpa.overrideDnsLink = true;
  // US status is independent of European consent-mode values. Never interpret
  // EU "not applicable" as permission to ignore a US sale/sharing opt-out.
  let usStatus = 0; // unknown=0, does not apply=1, not opted out=2, opted out=3
  let loaded = false;
  let apiReady = false;
  let gppListening = false;
  let usChoiceChanging = false;
  let usSectionChanged = false;
  let reloadPending = false;
  const pauseAnalytics = () => {
    allowed = false;
    window['ga-disable-G-CW98PY3REY'] = true;
    window['ga-disable-GT-T945ZSRZ'] = true;
    window.gtag('consent', 'update', denied);
  };
  const reloadChoices = () => {
    if (reloadPending) return;
    reloadPending = true;
    pauseAnalytics();
    window.location.reload();
  };
  const listenForUSChanges = () => {
    if (gppListening || typeof window.__gpp !== 'function') return;
    gppListening = true;
    // Google's initial US status is a one-shot value. Observe subsequent
    // choices through IAB GPP, including Google's own privacy link.
    window.__gpp('addEventListener', (event, success) => {
      if (!success || (usStatus !== 2 && usStatus !== 3)) return;
      if (event.eventName === 'cmpDisplayStatus' && event.data === 'visible') {
        usChoiceChanging = true;
        pauseAnalytics();
      }
      if (usChoiceChanging && event.eventName === 'sectionChange' && /^us/.test(event.data || '')) {
        usSectionChanged = true;
        pauseAnalytics();
      }
      if (usSectionChanged && event.eventName === 'signalStatus' && event.data === 'ready') reloadChoices();
    });
  };
  // Values documented by Google's Privacy & Messaging API: granted=1,
  // denied=2, not applicable=3. Unknown and not configured stay blocked.
  const permitted = value => value === 1 || value === 3;
  const refresh = () => {
    let values;
    try { values = window.googlefc.getGoogleConsentModeValues?.(); } catch { values = undefined; }
    const names = {
      ad_storage: 'adStoragePurposeConsentStatus',
      ad_user_data: 'adUserDataPurposeConsentStatus',
      ad_personalization: 'adPersonalizationPurposeConsentStatus',
      analytics_storage: 'analyticsStoragePurposeConsentStatus',
    };
    const next = Object.fromEntries(Object.entries(names).map(([key, field]) => [key, permitted(values?.[field]) ? 'granted' : 'denied']));
    if (usChoiceChanging || (usStatus !== 1 && usStatus !== 2)) Object.assign(next, denied);
    allowed = Object.values(next).every(value => value === 'granted');
    window['ga-disable-G-CW98PY3REY'] = !allowed;
    window['ga-disable-GT-T945ZSRZ'] = !allowed;
    window.gtag('consent', 'update', next);
    if (!allowed || loaded) return;
    loaded = true;
    window.gtag('js', new Date());
    window.gtag('config', 'GT-T945ZSRZ');
    window.gtag('config', 'G-CW98PY3REY');
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GT-T945ZSRZ';
    document.head.appendChild(script);
  };
  const showControls = () => document.querySelectorAll('[data-privacy-choices]').forEach(button => { button.hidden = !apiReady; });
  window.urduAiOpenPrivacyChoices = () => {
    const usApplies = usStatus === 2 || usStatus === 3;
    const open = usApplies ? window.googlefc.usstatesoptout.openConfirmationDialog : window.googlefc.showRevocationMessage;
    if (!apiReady || typeof open !== 'function') return false;
    pauseAnalytics();
    if (usApplies) {
      usChoiceChanging = true;
      window.googlefc.usstatesoptout.openConfirmationDialog(reloadChoices);
      return true;
    }
    window.googlefc.showRevocationMessage();
    // Google clears the saved decision above. Its readiness callbacks are
    // one-shot, so start a fresh page/CMP lifecycle for the replacement choice.
    // This also discards tags initialized under the previous decision.
    window.location.reload();
    return true;
  };
  window.googlefc.callbackQueue.push({ CONSENT_API_READY: () => { apiReady = true; showControls(); listenForUSChanges(); } });
  window.googlefc.callbackQueue.push({ INITIAL_US_STATES_OPT_OUT_DATA_READY: () => {
    try { usStatus = window.googlefc.usstatesoptout.getInitialUsStatesOptOutStatus?.() ?? 0; }
    catch { usStatus = 0; }
    refresh();
  } });
  window.googlefc.callbackQueue.push({ CONSENT_MODE_DATA_READY: refresh });
  window.googlefc.callbackQueue.push({ CONSENT_DATA_READY: () => { listenForUSChanges(); refresh(); } });
  document.addEventListener('DOMContentLoaded', showControls);
  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest('[data-privacy-choices], [data-analytics-event], a[href^="https://play.google.com/store/apps/details"]') : null;
    if (!target) return;
    if (target.matches('[data-privacy-choices]')) {
      if (!window.urduAiOpenPrivacyChoices()) {
        const status = document.querySelector('[data-privacy-status]');
        if (status) status.textContent = 'ترتیبات ابھی دستیاب نہیں۔ صفحہ دوبارہ کھولیں۔';
      }
      return;
    }
    // Discard pre-consent interaction events instead of replaying them later.
    if (!allowed) return;
    const playStore = target instanceof HTMLAnchorElement && target.href.startsWith('https://play.google.com/store/apps/details');
    window.gtag('event', playStore ? 'app_store_outbound' : target.dataset.analyticsEvent, {
      link_url: target instanceof HTMLAnchorElement ? target.href : undefined,
      page_path: window.location.pathname,
      event_category: 'content_engagement',
      event_label: target.dataset.analyticsLocation || 'unknown',
    });
  });
})();
