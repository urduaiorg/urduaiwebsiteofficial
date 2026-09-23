<?php
declare(strict_types=1);
define('URDUAI_FEED_TEST', true);
require __DIR__ . '/../public/data/youtube-feed.php';

function check(bool $condition, string $message): void {
    if (!$condition) throw new RuntimeException($message);
}
function fixture(string $channel = URDUAI_CHANNEL): string {
    return '<feed xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://www.youtube.com/xml/schemas/2015">'
        . '<author><uri>https://www.youtube.com/channel/' . $channel . '</uri></author>'
        . '<entry><yt:videoId>aaaaaaaaaaa</yt:videoId><yt:channelId>' . $channel . '</yt:channelId><title>پہلی ویڈیو</title><published>2026-09-22T12:00:00Z</published></entry>'
        . '<entry><yt:videoId>bbbbbbbbbbb</yt:videoId><yt:channelId>' . $channel . '</yt:channelId><title>نئی ویڈیو</title><published>2026-09-23T14:00:00+00:00</published></entry>'
        . '<entry><yt:videoId>ccccccccccc</yt:videoId><yt:channelId>' . $channel . '</yt:channelId><title>Future</title><published>2030-09-23T14:00:00Z</published></entry></feed>';
}
$now = strtotime('2026-09-23T16:00:00Z');
$feed = urduai_parse_feed(fixture(), $now);
check(array_column($feed['videos'], 'id') === ['bbbbbbbbbbb', 'aaaaaaaaaaa'], 'Sort newest first and exclude future videos');
foreach ([fixture('wrong'), '<feed/>', '<!DOCTYPE feed><feed/>', str_replace('bbbbbbbbbbb', '../bad-id', fixture()), str_replace('2026-09-23T14:00:00+00:00', 'invalid', fixture())] as $xml) {
    $rejected = false;
    try { urduai_parse_feed($xml, $now); } catch (Throwable $error) { $rejected = true; }
    check($rejected, 'Reject invalid feeds');
}

$dir = sys_get_temp_dir() . '/urduai-feed-test-' . bin2hex(random_bytes(6));
$calls = 0;
$fetch = function () use (&$calls) { $calls++; return fixture(); };
$fallback = $feed;
$fallback['checkedAt'] = gmdate('Y-m-d\TH:i:s\Z', $now - 3600);
try {
    $fresh = urduai_video_feed($dir, $fallback, $fetch, $now);
    check($calls === 1 && $fresh['checkedAt'] === $feed['checkedAt'], 'Stale feed refreshes immediately');
    urduai_video_feed($dir, $fallback, $fetch, $now + 299);
    check($calls === 1, 'Cache avoids repeat YouTube calls for five minutes');
    $failedCalls = 0;
    $fail = function () use (&$failedCalls) { $failedCalls++; throw new RuntimeException('Simulated outage'); };
    $stale = urduai_video_feed($dir, $fallback, $fail, $now + 301);
    check($stale === $fresh && $failedCalls === 1, 'Outage retains the last successful feed');
    urduai_video_feed($dir, $fallback, $fail, $now + 320);
    check($failedCalls === 1, 'Failed requests have a retry cooldown');
    urduai_video_feed($dir, $fallback, $fetch, $now + 362);
    check($calls === 2, 'Feed recovers after cooldown');
    $lock = fopen($dir . '/refresh.lock', 'c');
    flock($lock, LOCK_EX);
    urduai_video_feed($dir, $fallback, $fetch, $now + 700);
    check($calls === 2, 'Concurrent visitors use cache instead of duplicate refresh');
    flock($lock, LOCK_UN); fclose($lock);
    $fallback['checkedAt'] = gmdate('Y-m-d\TH:i:s\Z', $now + 701);
    check(urduai_video_feed($dir, $fallback, $fetch, $now + 702) === $fallback, 'Newer scheduled feed takes precedence over old endpoint cache');
    echo "YouTube PHP parser/cache checks passed\n";
} finally {
    foreach (glob($dir . '/*') ?: [] as $file) unlink($file);
    if (is_dir($dir)) rmdir($dir);
}
