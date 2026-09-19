# Urdu AI Learning API

Read-only Cloudflare Worker for Muse and other clients. Independent of the website deployment; no database, credentials, or account access. Serves public catalogue metadata and canonical links, not full articles.

## Maintain and deploy

From this directory:

```
npm ci
npm run build
npm test
npx wrangler deploy --dry-run
npx wrangler deploy
```

The generator reads the sibling website's published guides, how-to tutorials, prompt collections and glossary entries. It excludes drafts and future-dated resources and allowlists metadata fields. The available masterclass record is maintained in build.mjs; verify its source page before changing availability. Rebuild and redeploy after content changes. Responses expose the snapshot generation timestamp; updates are not automatic.

Production account: Urduaiweb@gmail.com's Cloudflare account (explicit account_id in wrangler.toml). No website DNS or existing Worker routes are changed. Worker observability is disabled and application code does not log queries. Cloudflare infrastructure may process request metadata.

## Operations

- `/v1/resources?q=ChatGPT&type=guides&limit=10&offset=0`
- `/v1/resource?id=courses/masterclass`
- `/v1/courses`
- `/health`
- `/docs`
- `/openapi.json`

No authentication or payment required. Maximum 50 results and 200 query characters. GET/HEAD/OPTIONS only. No application-level per-user rate limiting; Cloudflare account limits and abuse controls apply. Metadata attribution and canonical links should be preserved. No uptime SLA.

Rollback by deploying the previous verified Git revision with its matching catalogue.json. Do not change the main website deployment or certificate Worker to deploy this service.
