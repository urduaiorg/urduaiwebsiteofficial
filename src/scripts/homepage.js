import { validVideos, formatUrduDate } from '../utils/homepage-content.mjs';

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  menu.setAttribute('aria-label', expanded ? 'مینو بند کریں' : 'مینو کھولیں');
  navigation.classList.toggle('open', expanded);
});
const search = document.querySelector('#search-dialog');
document.querySelector('#search-open').addEventListener('click', () => {
  search.showModal();
  document.querySelector('#search-input').focus();
});
document.querySelector('.close-search').addEventListener('click', () => search.close());
search.addEventListener('click', event => {
  if (event.target === search) {
    const rect = search.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) search.close();
  }
});

const promptText = document.querySelector('#prompt-copy');
const prompts = JSON.parse(document.querySelector('#homepage-prompts').textContent);
document.querySelectorAll('[data-prompt]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-prompt]').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  promptText.textContent = prompts[button.dataset.prompt].text;
  document.querySelector('#prompt-more').href = prompts[button.dataset.prompt].href;
  document.querySelector('#copy-status').textContent = '';
}));
document.querySelector('#copy-prompt').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(promptText.textContent);
    status.textContent = 'پرامٹ کاپی ہو گیا۔ اپنے اے آئی ٹول میں پیسٹ کریں۔';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(promptText);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'متن منتخب ہے۔ اپنے فون یا براؤزر سے کاپی کریں۔';
  }
});
const screenDialog = document.querySelector('#screen-dialog');
document.querySelectorAll('[data-screen]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#screen-title').textContent = button.dataset.label;
  const screen = document.querySelector('#screen-full');
  screen.src = button.dataset.screen;
  screen.alt = button.dataset.label;
  screenDialog.showModal();
}));
[screenDialog].forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

// The same-origin JSON is refreshed independently of full-site builds.
const videoList = document.querySelector('#homepage-videos');
function videoCard(video) {
  const article = document.createElement('article');
  article.className = 'video-card';
  const link = document.createElement('a');
  link.className = 'video-open';
  link.href = `https://www.youtube.com/watch?v=${video.id}`;
  link.target = '_blank'; link.rel = 'noopener';
  link.dataset.video = video.id; link.dataset.title = video.title;
  const imageArea = document.createElement('span'); imageArea.className = 'video-image';
  const img = document.createElement('img');
  img.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  img.alt = ''; img.width = 480; img.height = 360; img.loading = 'lazy'; img.referrerPolicy = 'no-referrer';
  const play = document.createElement('span'); play.className = 'play-icon'; play.setAttribute('aria-hidden', 'true');
  // Fixed markup only. Feed-supplied strings are always assigned as text.
  play.innerHTML = '<svg viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z"/></svg>';
  imageArea.append(img, play);
  const title = document.createElement('h3'); title.dir = 'auto'; title.textContent = video.title;
  link.append(imageArea, title);
  const date = document.createElement('p'); date.className = 'date';
  const time = document.createElement('time'); time.dateTime = video.publishedAt; time.textContent = formatUrduDate(video.publishedAt); date.append(time);
  const external = document.createElement('a'); external.className = 'video-external'; external.href = link.href;
  external.target = '_blank'; external.rel = 'noopener'; external.textContent = 'یوٹیوب پر دیکھیں ↗';
  article.append(link, date, external);
  return article;
}
async function refreshVideos() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`/data/youtube-videos.json?v=${Math.floor(Date.now() / 1800000)}`, { signal: controller.signal, cache: 'no-cache' });
    if (!response.ok) return;
    const videos = validVideos(await response.json()).slice(0, 3);
    if (!videos.length || videoList.contains(document.activeElement)) return;
    const current = [...videoList.querySelectorAll('[data-video]')];
    if (videos.every((video, i) => current[i]?.dataset.video === video.id && current[i]?.dataset.title === video.title) && current.length === videos.length) return;
    videoList.replaceChildren(...videos.map(videoCard));
    document.querySelector('#video-status').textContent = 'تازہ ویڈیوز شامل کر دی گئی ہیں۔';
  } catch {
    // Retain the statically rendered feed when offline or temporarily unavailable.
  } finally { clearTimeout(timeout); }
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); refreshVideos(); }
  }, { rootMargin: '600px' });
  observer.observe(videoList);
} else { refreshVideos(); }
// Update an already-open page when the reader returns after a feed cycle.
let lastVisit = Date.now();
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && Date.now() - lastVisit > 1800000) { lastVisit = Date.now(); refreshVideos(); }
});
menu.addEventListener('keydown', event => {
  if (event.key === 'Escape') { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); menu.focus(); }
});
