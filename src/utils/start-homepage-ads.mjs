export function startHomepageAdsAfterModules(page, target) {
  const start = () => target.urduAiPushAds?.();
  if (page.readyState === 'complete') start();
  else target.addEventListener('DOMContentLoaded', start, { once: true });
}
