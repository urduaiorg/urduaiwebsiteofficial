<?php
declare(strict_types=1);

// Astro still serves static pages. This small Hostinger endpoint refreshes only
// the public video feed, independently of GitHub's best-effort schedule.
const URDUAI_CHANNEL = 'UCMwBJ2TN4FM7ut6Jd5gz-UQ';
const URDUAI_FEED_TTL = 300;

function urduai_parse_feed(string $xml, int $now): array
{
    if (strlen($xml) > 1000000 || stripos($xml, '<!DOCTYPE') !== false) {
        throw new RuntimeException('Invalid feed size or document type');
    }
    $previous = libxml_use_internal_errors(true);
    try {
        $root = simplexml_load_string($xml, SimpleXMLElement::class, LIBXML_NONET);
    } finally {
        libxml_clear_errors();
        libxml_use_internal_errors($previous);
    }
    if ($root === false) throw new RuntimeException('Invalid XML');
    $atom = $root->children('http://www.w3.org/2005/Atom');
    if ((string) $atom->author->uri !== 'https://www.youtube.com/channel/' . URDUAI_CHANNEL) {
        throw new RuntimeException('Unexpected channel');
    }
    $videos = [];
    foreach ($atom->entry as $entry) {
        $yt = $entry->children('http://www.youtube.com/xml/schemas/2015');
        $id = (string) $yt->videoId;
        $title = trim((string) $entry->title);
        $published = (string) $entry->published;
        if ((string) $yt->channelId !== URDUAI_CHANNEL || !preg_match('/^[A-Za-z0-9_-]{11}$/D', $id)
            || $title === '' || preg_match_all('/./us', $title) > 500
            || !preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/D', $published)) {
            throw new RuntimeException('Invalid video');
        }
        $date = strtotime($published);
        if ($date === false) throw new RuntimeException('Invalid publication time');
        if ($date > $now) continue;
        $videos[$id] = ['id' => $id, 'title' => $title, 'publishedAt' => gmdate('Y-m-d\TH:i:s\Z', $date)];
    }
    if (!$videos) throw new RuntimeException('Empty feed');
    $videos = array_values($videos);
    usort($videos, fn($a, $b) => strcmp($b['publishedAt'], $a['publishedAt']) ?: strcmp($b['id'], $a['id']));
    return ['channelId' => URDUAI_CHANNEL, 'checkedAt' => gmdate('Y-m-d\TH:i:s\Z', $now), 'videos' => array_slice($videos, 0, 12)];
}

function urduai_read_json(string $path): array
{
    $raw = @file_get_contents($path, false, null, 0, 1000001);
    $value = $raw !== false && strlen($raw) <= 1000000 ? json_decode($raw, true) : null;
    return is_array($value) ? $value : [];
}

function urduai_saved_feed(array $feed): bool
{
    return ($feed['channelId'] ?? '') === URDUAI_CHANNEL && !empty($feed['videos'])
        && is_array($feed['videos']) && strtotime($feed['checkedAt'] ?? '') !== false;
}

function urduai_fetch_xml(): string
{
    $handle = curl_init('https://www.youtube.com/feeds/videos.xml?channel_id=' . URDUAI_CHANNEL);
    $xml = '';
    curl_setopt_array($handle, [
        CURLOPT_CONNECTTIMEOUT => 2, CURLOPT_TIMEOUT => 4,
        CURLOPT_USERAGENT => 'UrduAi-HomepageFeed/2.0',
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_WRITEFUNCTION => static function ($handle, string $chunk) use (&$xml): int {
            if (strlen($xml) + strlen($chunk) > 1000000) return 0;
            $xml .= $chunk;
            return strlen($chunk);
        },
    ]);
    $ok = curl_exec($handle);
    $status = curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
    curl_close($handle);
    if ($ok === false || $status !== 200) throw new RuntimeException('YouTube unavailable');
    return $xml;
}

function urduai_video_feed(string $cacheDir, array $fallback, callable $fetch, int $now): array
{
    $cachePath = $cacheDir . '/feed.json';
    $state = urduai_read_json($cachePath);
    $feed = urduai_saved_feed($state['feed'] ?? []) ? $state['feed'] : $fallback;
    if (urduai_saved_feed($fallback) && strtotime($fallback['checkedAt']) > strtotime($feed['checkedAt'] ?? '1970-01-01')) $feed = $fallback;
    if (urduai_saved_feed($feed) && strtotime($feed['checkedAt']) + URDUAI_FEED_TTL > $now) return $feed;
    if (($state['retryAfter'] ?? 0) > $now) return $feed;

    // The private cache is outside public_html, so site deployments cannot erase it.
    if (!is_dir($cacheDir) && !@mkdir($cacheDir, 0700, true) && !is_dir($cacheDir)) return $feed;
    $lock = @fopen($cacheDir . '/refresh.lock', 'c');
    if (!$lock) return $feed;
    if (!flock($lock, LOCK_EX | LOCK_NB)) { fclose($lock); return $feed; }
    try {
        // Another request may have refreshed between our initial read and lock.
        $state = urduai_read_json($cachePath);
        if (urduai_saved_feed($state['feed'] ?? []) && strtotime($state['feed']['checkedAt']) > strtotime($feed['checkedAt'] ?? '1970-01-01')) $feed = $state['feed'];
        if ((urduai_saved_feed($feed) && strtotime($feed['checkedAt']) + URDUAI_FEED_TTL > $now) || ($state['retryAfter'] ?? 0) > $now) return $feed;
        try {
            $feed = urduai_parse_feed($fetch(), $now);
            $state = ['feed' => $feed, 'retryAfter' => 0];
        } catch (Throwable $error) {
            // Brief retry cooldown; never replace good cards with an error or empty list.
            $state = ['feed' => $feed, 'retryAfter' => $now + 60];
            error_log('UrduAI YouTube feed refresh failed: ' . $error->getMessage());
        }
        $temporary = @tempnam($cacheDir, 'feed-');
        if ($temporary !== false) {
            if (@file_put_contents($temporary, json_encode($state, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)) !== false) @rename($temporary, $cachePath);
            if (is_file($temporary)) @unlink($temporary);
        }
        return $feed;
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

if (!defined('URDUAI_FEED_TEST')) {
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    $fallback = urduai_read_json(__DIR__ . '/youtube-videos.json');
    try {
        $feed = urduai_video_feed(dirname(__DIR__, 2) . '/.urduai-youtube-cache', $fallback, 'urduai_fetch_xml', time());
    } catch (Throwable $error) {
        error_log('UrduAI YouTube endpoint failed: ' . $error->getMessage());
        $feed = $fallback;
    }
    if (!urduai_saved_feed($feed)) http_response_code(503);
    echo json_encode($feed, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
}
