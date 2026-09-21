"""Refresh the public, same-origin YouTube feed without API keys or a backend.

Run before builds with --allow-stale, or strictly from the scheduled workflow.
Never replace the last usable feed when YouTube is unavailable or malformed.
"""
from datetime import datetime, timezone
from pathlib import Path
import argparse
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET

CHANNEL = 'UCMwBJ2TN4FM7ut6Jd5gz-UQ'
FEED_URL = f'https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL}'
OUTPUT = Path(__file__).resolve().parents[1] / 'public/data/youtube-videos.json'
NS = {'a': 'http://www.w3.org/2005/Atom', 'yt': 'http://www.youtube.com/xml/schemas/2015'}


def parse_feed(xml, now=None):
    now = now or datetime.now(timezone.utc)
    root = ET.fromstring(xml)
    # Verify the channel identity from its canonical author URI, not a title.
    if root.findtext('a:author/a:uri', namespaces=NS) != f'https://www.youtube.com/channel/{CHANNEL}':
        raise ValueError('Unexpected YouTube channel')
    items = {}
    for entry in root.findall('a:entry', NS):
        video_id = entry.findtext('yt:videoId', '', NS)
        channel = entry.findtext('yt:channelId', '', NS)
        published = entry.findtext('a:published', '', NS)
        title = entry.findtext('a:title', '', NS).strip()
        if channel != CHANNEL or not re.fullmatch(r'[A-Za-z0-9_-]{11}', video_id):
            raise ValueError('Unexpected video identity')
        date = datetime.fromisoformat(published.replace('Z', '+00:00'))
        if date.tzinfo is None:
            raise ValueError('Video timestamp must include timezone')
        if date > now:
            continue
        if not title or len(title) > 500:
            raise ValueError('Missing or invalid video title')
        items[video_id] = {
            'id': video_id,
            'title': title,
            'publishedAt': date.astimezone(timezone.utc).isoformat().replace('+00:00', 'Z'),
        }
    if not items:
        raise ValueError('Empty YouTube feed; retaining previous feed')
    return {'channelId': CHANNEL, 'videos': sorted(items.values(), key=lambda v: (v['publishedAt'], v['id']), reverse=True)[:12]}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--allow-stale', action='store_true')
    args = parser.parse_args()
    try:
        request = urllib.request.Request(FEED_URL, headers={'User-Agent': 'UrduAi-HomepageFeed/1.0'})
        with urllib.request.urlopen(request, timeout=20) as response:
            xml = response.read(1_000_001)
        if len(xml) > 1_000_000:
            raise ValueError('Feed exceeds expected size')
        data = parse_feed(xml)
        data['checkedAt'] = datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        temporary = OUTPUT.with_suffix('.tmp')
        temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
        temporary.replace(OUTPUT)
        print(f'Refreshed {len(data["videos"])} public YouTube uploads')
    except Exception as error:
        if args.allow_stale and OUTPUT.exists():
            cached = json.loads(OUTPUT.read_text())
            if cached.get('channelId') == CHANNEL and cached.get('videos'):
                print(f'YouTube unavailable; keeping the saved feed: {error}', file=sys.stderr)
                return
        raise


if __name__ == '__main__':
    main()
