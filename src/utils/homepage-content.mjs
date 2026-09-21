export const YOUTUBE_CHANNEL = 'UCMwBJ2TN4FM7ut6Jd5gz-UQ';

export function publicationTime(entry) {
  return Date.parse(entry.data.published_at ?? `${entry.data.date}T00:00:00Z`);
}

export function newestPublished(entries, now = Date.now()) {
  return entries.filter(entry => !entry.data.draft && publicationTime(entry) <= now)
    .sort((a, b) => publicationTime(b) - publicationTime(a) || b.id.localeCompare(a.id));
}

const urduTitles = {
  vTUjyEmhC88: 'آکسفورڈ اور یونیسکو کا مفت اے آئی اور قانون کورس',
  jvsSbIffVMI: 'اے آئی خطرناک کیوں ہو سکتی ہے؟ آسان اردو میں سمجھیں۔',
  'RaXs-hufILs': 'واٹس ایپ پر آپ کا اے آئی اسسٹنٹ: میٹا میوز کی مکمل گائیڈ',
};

export function displayVideoTitle(video) {
  return urduTitles[video.id] ?? video.title.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').trim();
}

export function validVideos(feed, now = Date.now()) {
  if (feed?.channelId !== YOUTUBE_CHANNEL || !Array.isArray(feed.videos)) return [];
  const unique = new Map();
  for (const video of feed.videos) {
    if (!video || !/^[A-Za-z0-9_-]{11}$/.test(video.id) || typeof video.title !== 'string' || !video.title.trim() || video.title.length > 500) continue;
    const published = Date.parse(video.publishedAt);
    if (!Number.isFinite(published) || published > now) continue;
    unique.set(video.id, { id: video.id, title: displayVideoTitle(video), publishedAt: video.publishedAt });
  }
  return [...unique.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || b.id.localeCompare(a.id)).slice(0, 6);
}

export function formatUrduDate(date) {
  return new Date(date.length === 10 ? `${date}T00:00:00Z` : date).toLocaleDateString('ur-PK', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}
