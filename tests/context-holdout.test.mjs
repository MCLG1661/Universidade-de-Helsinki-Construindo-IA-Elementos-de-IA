import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildReport} from '../core/validator.mjs';
const cases=JSON.parse(readFileSync(new URL('./fixtures/context-holdout-v1.json',import.meta.url),'utf8'));
test('separate contextual evaluation reports all mismatches',()=>{
 const results=cases.map(c=>({...c,actual:buildReport(c.source,[c.claim]).claims[0].status}));
 const errors=results.filter(c=>c.actual!==c.expected);
 console.log('CONTEXT_HOLDOUT_V1 '+JSON.stringify({total:results.length,correct:results.length-errors.length,errors}));
 assert.equal(results.length,16);
});
test('holdout evidence preserves source integrity',()=>{
 for(const c of cases)for(const e of buildReport(c.source,[c.claim]).claims[0].evidence){
 assert.ok(e.start>=0&&e.end>e.start&&e.end<=c.source.length);
 assert.equal(c.source.slice(e.start,e.end),e.quote);
 }
});
