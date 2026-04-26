/**
 * Cloudflare Worker — Urdu AI Certificate Proxy
 *
 * This worker sits between the website and the Google Apps Script endpoint.
 * It holds the API key server-side so it never reaches the client browser.
 *
 * DEPLOYMENT:
 * 1. Go to https://dash.cloudflare.com → Workers & Pages → Create
 * 2. Name: urai-cert
 * 3. Paste this code in the Quick Edit editor
 * 4. Add environment variable: API_KEY = URAI-WANG-2026-SECRET
 * 5. Deploy
 * 6. Custom domain: urai-cert.urduai.workers.dev (or bind to urduai.org/api/cert)
 *
 * The website POSTs to this worker. The worker adds the API key and forwards
 * to Apps Script. The API key never touches the browser.
 */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqwBWe1poJYRaMoWq5H5wj_FmNgl21uxE3wq1MmLELqtdAEinUXAl440UBN0nlUZgCAw/exec';

// Allowed origins — add your domains here
const ALLOWED_ORIGINS = [
  'https://urduai.org',
  'https://www.urduai.org',
  'http://localhost:4321',  // Astro dev server
  'http://localhost:3000',
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(origin, payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

function htmlResponse(origin, payload) {
  const siteOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  const redirectURL = new URL('/courses/masterclass/certificate/', siteOrigin);
  redirectURL.searchParams.set('status', payload.success ? 'success' : 'error');
  if (payload.certificateId) redirectURL.searchParams.set('certId', payload.certificateId);
  if (payload.message) redirectURL.searchParams.set('message', payload.message);

  const html = `<!doctype html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>سرٹیفکیٹ جاری ہو رہا ہے</title>
</head>
<body>
  <p>سرٹیفکیٹ جاری ہو رہا ہے...</p>
  <script>
    (function () {
      var redirectURL = ${JSON.stringify(redirectURL.toString())};
      window.location.replace(redirectURL);
    })();
  </script>
  <noscript>
    <p>براہ کرم واپس آ کر دوبارہ کوشش کریں: <a href="${redirectURL.toString()}">${redirectURL.toString()}</a></p>
  </noscript>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      ...corsHeaders(origin),
    },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const contentType = request.headers.get('Content-Type') || '';
    const expectsJson = contentType.includes('application/json');
    const respond = (payload, status = 200) =>
      expectsJson ? jsonResponse(origin, payload, status) : htmlResponse(origin, payload);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return respond({ success: false, message: 'Method not allowed' }, 405);
    }

    try {
      // Fail fast if API_KEY is not configured in Cloudflare environment
      if (!env.API_KEY) {
        return respond({ success: false, message: 'Worker not configured' }, 500);
      }

      const body = expectsJson
        ? await request.json()
        : Object.fromEntries(new URLSearchParams(await request.text()).entries());

      // Validate required fields
      const required = ['certificateId', 'nameUr', 'nameEn', 'email', 'whatsapp', 'city', 'score', 'courseName', 'issuedAt'];
      for (const field of required) {
        if (!body[field] && body[field] !== 0) {
          return respond({ success: false, message: `Missing field: ${field}` }, 400);
        }
      }

      // Validate WhatsApp format — must be E.164 with country code (+ followed by 10-15 digits)
      if (!/^\+[0-9]{10,15}$/.test(String(body.whatsapp).trim())) {
        return respond({ success: false, message: 'Invalid WhatsApp number — must include country code (e.g. +923001234567)' }, 400);
      }

      // Add the API key (stored as environment variable in Cloudflare)
      const payload = {
        apiKey: env.API_KEY,
        ...body,
      };

      // Forward to Apps Script
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Check HTTP status before reading body — a non-OK response is always a failure
      if (!response.ok) {
        return respond({ success: false, message: `Upstream error: ${response.status}` }, 502);
      }

      // Parse JSON response from Apps Script
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        // Apps Script returned non-JSON despite a 2xx — treat as failure, not success
        return respond({ success: false, message: 'Upstream returned invalid response' }, 502);
      }

      return respond(data, 200);
    } catch (err) {
      return respond({ success: false, message: 'Server error: ' + err.message }, 500);
    }
  },
};
