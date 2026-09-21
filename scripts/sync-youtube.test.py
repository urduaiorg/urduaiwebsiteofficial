import importlib.util
from datetime import datetime, timezone
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('sync_youtube', Path(__file__).with_name('sync-youtube.py'))
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)

def feed(entries, channel=sync.CHANNEL):
    return f'<feed xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://www.youtube.com/xml/schemas/2015"><author><uri>https://www.youtube.com/channel/{channel}</uri></author>{entries}</feed>'

def entry(video_id, published, title='A real upload'):
    return f'<entry><yt:videoId>{video_id}</yt:videoId><yt:channelId>{sync.CHANNEL}</yt:channelId><title>{title}</title><published>{published}</published><updated>2099-01-01T00:00:00Z</updated></entry>'

class FeedTest(unittest.TestCase):
    def test_orders_by_publication_and_skips_future(self):
        xml = feed(entry('aaaaaaaaaaa', '2026-09-18T12:00:00Z') + entry('bbbbbbbbbbb', '2026-09-20T12:00:00Z') + entry('ccccccccccc', '2027-01-01T00:00:00Z'))
        result = sync.parse_feed(xml, datetime(2026, 9, 21, tzinfo=timezone.utc))
        self.assertEqual([v['id'] for v in result['videos']], ['bbbbbbbbbbb', 'aaaaaaaaaaa'])

    def test_rejects_empty_wrong_channel_and_malformed_entries(self):
        for xml in [feed(''), feed('', 'wrong-channel'), feed(entry('../../bad', '2026-09-20T12:00:00Z')), feed(entry('aaaaaaaaaaa', 'not-a-date'))]:
            with self.subTest(xml=xml), self.assertRaises(ValueError):
                sync.parse_feed(xml)

if __name__ == '__main__':
    unittest.main()
