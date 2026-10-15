import catalogue from './catalogue.json' with { type: 'json' };
import { spec } from './openapi.mjs';
import { docs } from './docs.mjs';
const types = ['guides','how-to','prompts','learn','courses'];
export const normalize = s => s.normalize('NFKC').toLowerCase().replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/ي/g,'ی').replace(/ك/g,'ک').trim();
const indexed = catalogue.resources.map(r=>({r,text:normalize([r.id,r.title,r.description,...r.topics].join(' '))}));
const headers = {'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, HEAD, OPTIONS','X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=300'};
function json(value,status=200,extra={}) {return new Response(JSON.stringify(value),{status,headers:{...headers,...(status>=400?{'Cache-Control':'no-store'}:{}),...extra}});}
function bad(message){return json({error:{code:'invalid_request',message}},400);}
function handle(request) {
  const u=new URL(request.url), p=u.pathname.replace(/\/$/,'') || '/';
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
  if(!['GET','HEAD'].includes(request.method))return json({error:{code:'method_not_allowed',message:'Read-only API. Use GET.'}},405,{'Allow':'GET, HEAD, OPTIONS'});
  if(p==='/' || p==='/docs')return new Response(docs,{headers:{...headers,'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'"}});
  if(p==='/openapi.json')return json(spec(u.origin));
  if(p==='/health')return json({status:'ok',version:'1.0.0',resource_count:catalogue.resources.length,catalogue_generated_at:catalogue.generated_at});
  if(p==='/v1/resource'){
    if([...u.searchParams.keys()].some(k=>k!=='id') || u.searchParams.getAll('id').length!==1)return bad('Provide exactly one id parameter.');
    const r=catalogue.resources.find(r=>r.id===u.searchParams.get('id'));
    return r?json({resource:r,catalogue_generated_at:catalogue.generated_at}):json({error:{code:'not_found',message:'Resource not found.'}},404);
  }
  if(p!=='/v1/resources' && p!=='/v1/courses')return json({error:{code:'not_found',message:'Route not found. See /docs.'}},404);
  const allowed=['q','type','limit','offset'];
  for(const key of u.searchParams.keys())if(!allowed.includes(key)||u.searchParams.getAll(key).length!==1)return bad('Unknown or duplicate parameter.');
  const q=normalize(u.searchParams.get('q')||'');
  if(q.length>200)return bad('q must be at most 200 characters.');
  const type=p==='/v1/courses'?'courses':u.searchParams.get('type');
  if(type && !types.includes(type))return bad(`type must be one of: ${types.join(', ')}`);
  if(p==='/v1/courses' && u.searchParams.has('type'))return bad('Use /v1/resources for type filtering.');
  const parse=(key,fallback,max)=>{const raw=u.searchParams.get(key);if(raw===null)return fallback;if(!/^\d+$/.test(raw))return NaN;const n=Number(raw);return Number.isSafeInteger(n)&&n<=max?n:NaN;};
  const limit=parse('limit',10,50),offset=parse('offset',0,100000);
  if(!Number.isFinite(limit)||limit<1||!Number.isFinite(offset))return bad('limit must be 1–50; offset must be 0–100000. Integers only.');
  const terms=q.split(/\s+/).filter(Boolean);
  const matches=indexed.filter(({r,text})=>(!type||r.type===type)&&terms.every(t=>text.includes(t)))
    .sort((a,b)=>(b.r.published_at||'').localeCompare(a.r.published_at||'')||a.r.id.localeCompare(b.r.id));
  return json({resources:matches.slice(offset,offset+limit).map(x=>x.r),total:matches.length,limit,offset,next_offset:offset+limit<matches.length?offset+limit:null,catalogue_generated_at:catalogue.generated_at});
}
export default {async fetch(request){const response=handle(request);return request.method==='HEAD'?new Response(null,{status:response.status,headers:response.headers}):response;}};
