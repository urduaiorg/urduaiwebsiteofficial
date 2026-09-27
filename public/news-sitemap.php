<?php
declare(strict_types=1);

// Pages remain static Astro output. Only this public sitemap is time-sensitive.
function urduai_news_sitemap(array $articles, int $now): string
{
    $escape = fn(string $value): string => htmlspecialchars($value, ENT_XML1 | ENT_QUOTES, 'UTF-8');
    $eligible = [];
    foreach ($articles as $article) {
        if (!is_array($article) || !is_string($article['url'] ?? null)
            || !preg_match('~^https://urduai\.org/blog/[a-z0-9-]+/$~D', $article['url'])
            || !is_string($article['title'] ?? null) || trim($article['title']) === ''
            || !is_string($article['published'] ?? null)) continue;
        $timestamp = strtotime($article['published']);
        if ($timestamp === false || $timestamp > $now || $timestamp <= $now - 172800) continue;
        $article['timestamp'] = $timestamp;
        $eligible[$article['url']] = $article;
    }
    usort($eligible, fn($a, $b) => $b['timestamp'] <=> $a['timestamp']);
    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n"
        . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">';
    foreach (array_slice($eligible, 0, 1000) as $article) {
        $xml .= '<url><loc>' . $escape($article['url']) . '</loc><news:news>'
            . '<news:publication><news:name>اردو اے آئی</news:name><news:language>ur</news:language></news:publication>'
            . '<news:publication_date>' . gmdate('Y-m-d\TH:i:s\Z', $article['timestamp']) . '</news:publication_date>'
            . '<news:title>' . $escape($article['title']) . '</news:title></news:news></url>';
    }
    return $xml . '</urlset>';
}

if (!defined('URDUAI_NEWS_TEST')) {
    header('Content-Type: application/xml; charset=utf-8');
    // No stale copies: the 48-hour eligibility window is evaluated per request.
    header('Cache-Control: no-store');
    $raw = @file_get_contents(__DIR__ . '/data/news-articles.json');
    $articles = $raw === false ? null : json_decode($raw, true);
    if (!is_array($articles)) {
        http_response_code(503);
        header('Retry-After: 300');
        echo '<?xml version="1.0" encoding="UTF-8"?><error>News sitemap temporarily unavailable</error>';
    } else {
        echo urduai_news_sitemap($articles, time());
    }
}
