// Never manufacture freshness or allow a modification to precede publication.
export function articleDates(date, publishedAt, lastUpdated) {
  const published = publishedAt ?? date;
  const validUpdate = lastUpdated && Number.isFinite(Date.parse(lastUpdated))
    && Date.parse(lastUpdated) >= Date.parse(published);
  return { published, modified: validUpdate ? lastUpdated : published, updated: validUpdate ? lastUpdated : undefined };
}
