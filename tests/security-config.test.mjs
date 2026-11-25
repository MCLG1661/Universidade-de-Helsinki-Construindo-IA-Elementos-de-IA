import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const config=JSON.parse(readFileSync(new URL('../vercel.json',import.meta.url),'utf8'));
test('configured security headers cover all paths',()=>{
 const rule=config.headers.find(r=>r.source==='/(.*)');assert.ok(rule);
 const h=Object.fromEntries(rule.headers.map(x=>[x.key.toLowerCase(),x.value]));
 assert.equal(h['x-frame-options'],'DENY');assert.equal(h['x-content-type-options'],'nosniff');
 assert.equal(h['referrer-policy'],'strict-origin-when-cross-origin');
 const directives=h['content-security-policy'].split(';').map(x=>x.trim());
 for(const d of ["default-src 'self'","script-src 'self'","connect-src 'self'","object-src 'none'","frame-ancestors 'none'","base-uri 'self'","form-action 'self'"])assert.ok(directives.includes(d),d);
 for(const d of ['camera=()','microphone=()','geolocation=()'])assert.ok(h['permissions-policy'].includes(d),d);
});
