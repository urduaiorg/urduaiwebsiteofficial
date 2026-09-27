<?php
declare(strict_types=1);
define('URDUAI_NEWS_TEST', true);
require __DIR__ . '/../public/news-sitemap.php';

function check(bool $condition, string $message): void {
    if (!$condition) throw new RuntimeException($message);
}
$now = strtotime('2026-09-27T04:00:00Z');
$entry = fn(string $slug, int $time, string $title = 'اردو خبر') => [
    'url' => 'https://urduai.org/blog/' . $slug . '/',
    'title' => $title, 'published' => gmdate('c', $time),
];
$xml = urduai_news_sitemap([
    $entry('fresh', $now - 1, 'خبر & <جانچ>'),
    $entry('fresh', $now - 1, 'خبر & <جانچ>'),
    $entry('boundary', $now - 172800),
    $entry('old', $now - 172801),
    $entry('future', $now + 1),
    ['url' => 'https://example.com/blog/no/', 'title' => 'bad', 'published' => gmdate('c', $now)],
], $now);
$doc = simplexml_load_string($xml);
check($doc !== false, 'XML must parse');
$doc->registerXPathNamespace('s', 'http://www.sitemaps.org/schemas/sitemap/0.9');
$doc->registerXPathNamespace('n', 'http://www.google.com/schemas/sitemap-news/0.9');
check(count($doc->xpath('//s:url')) === 1, 'Only one fresh, unique, canonical article');
check((string)$doc->xpath('//n:title')[0] === 'خبر & <جانچ>', 'XML text must round-trip');
check((string)$doc->xpath('//n:language')[0] === 'ur', 'Urdu language');
check((string)$doc->xpath('//n:publication_date')[0] === '2026-09-27T03:59:59Z', 'Original publication time');
check(substr_count(urduai_news_sitemap([$entry('fresh', $now)], $now + 172800), '<url>') === 0, 'Expires without rebuild');
check(simplexml_load_string(urduai_news_sitemap([], $now)) !== false, 'Valid empty sitemap');
$many = [];
for ($i = 0; $i < 1001; $i++) $many[] = $entry('story-' . $i, $now - $i);
check(substr_count(urduai_news_sitemap($many, $now), '<url>') === 1000, '1000-news limit');
echo "News sitemap checks passed\n";
