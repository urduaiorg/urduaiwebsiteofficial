import { validVideos } from './homepage-content.mjs';

export const VIDEO_REFRESH_INTERVAL = 5 * 60 * 1000;

export async function fetchHomepageVideos(fetcher = fetch) {
  // The live endpoint refreshes on Hostinger; the scheduled JSON remains a fallback.
  for (const [url, timeoutMs] of [['/data/youtube-feed.php', 7000], ['/data/youtube-videos.json', 3000]]) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetcher(url, { signal: controller.signal, cache: 'no-store' });
      if (!response.ok) continue;
      const videos = validVideos(await response.json()).slice(0, 3);
      if (videos.length) return videos;
    } catch {
      // Offline, unavailable PHP, or malformed feed: try the saved JSON.
    } finally { clearTimeout(timeout); }
  }
  return [];
}
