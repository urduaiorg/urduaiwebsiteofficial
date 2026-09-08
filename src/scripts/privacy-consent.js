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
  let loaded = false;
  let apiReady = false;
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
    if (!apiReady || typeof window.googlefc.showRevocationMessage !== 'function') return false;
    allowed = false;
    window['ga-disable-G-CW98PY3REY'] = true;
    window['ga-disable-GT-T945ZSRZ'] = true;
    window.gtag('consent', 'update', denied);
    window.googlefc.showRevocationMessage();
    return true;
  };
  window.googlefc.callbackQueue.push({ CONSENT_API_READY: () => { apiReady = true; showControls(); } });
  window.googlefc.callbackQueue.push({ CONSENT_MODE_DATA_READY: refresh });
  window.googlefc.callbackQueue.push({ CONSENT_DATA_READY: refresh });
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
