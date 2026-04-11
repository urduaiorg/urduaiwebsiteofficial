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

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, message: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
      );
    }

    try {
      // Fail fast if API_KEY is not configured in Cloudflare environment
      if (!env.API_KEY) {
        return new Response(
          JSON.stringify({ success: false, message: 'Worker not configured' }),
          { status: 500, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
        );
      }

      const body = await request.json();

      // Validate required fields
      const required = ['certificateId', 'nameUr', 'nameEn', 'email', 'score', 'courseName', 'issuedAt'];
      for (const field of required) {
        if (!body[field] && body[field] !== 0) {
          return new Response(
            JSON.stringify({ success: false, message: `Missing field: ${field}` }),
            { status: 400, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
          );
        }
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
        return new Response(
          JSON.stringify({ success: false, message: `Upstream error: ${response.status}` }),
          { status: 502, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
        );
      }

      // Parse JSON response from Apps Script
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        // Apps Script returned non-JSON despite a 2xx — treat as failure, not success
        return new Response(
          JSON.stringify({ success: false, message: 'Upstream returned invalid response' }),
          { status: 502, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(data),
        {
          status: 200,
          headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
        }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, message: 'Server error: ' + err.message }),
        { status: 500, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
      );
    }
  },
};
