import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildReport} from '../core/validator.mjs';
const schema=JSON.parse(readFileSync(new URL('../schemas/evidence-report-v0.2.0.json',import.meta.url),'utf8'));
// Checks the subset of schema keywords used by this contract, not a general JSON Schema implementation.
function check(s,v){
 if('const' in s)assert.deepEqual(v,s.const);
 if(s.enum)assert.ok(s.enum.includes(v));
 if(s.type==='object'){assert.ok(v&&typeof v==='object'&&!Array.isArray(v));for(const k of s.required)assert.ok(Object.hasOwn(v,k),k);for(const k of Object.keys(v)){assert.ok(Object.hasOwn(s.properties,k),k);check(s.properties[k],v[k]);}}
 if(s.type==='array'){assert.ok(Array.isArray(v));if(s.uniqueItems)assert.equal(new Set(v).size,v.length);for(const x of v)check(s.items,x);}
 if(s.type==='string'){assert.equal(typeof v,'string');assert.ok(v.length>=s.minLength);}
 if(s.type==='integer'){assert.ok(Number.isInteger(v));assert.ok(v>=s.minimum);}
 if(s.type==='boolean')assert.equal(typeof v,'boolean');
}
test('report conforms to declared schema subset',()=>check(schema,buildReport('Sem tosse. Tenho tosse. Talvez tenha náusea.',['tosse','náusea','febre'])));
test('empty claim list conforms',()=>check(schema,buildReport('',[])));
test('contract rejects missing required field',()=>{const r=buildReport('tosse',['tosse']);delete r.claims[0].quality;assert.throws(()=>check(schema,r));});
test('contract rejects unsupported status',()=>{const r=buildReport('tosse',['tosse']);r.claims[0].status='confirmed';assert.throws(()=>check(schema,r));});
