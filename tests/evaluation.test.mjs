import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {compare,evaluate} from '../core/evaluation.mjs';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const data=read('../data.json'),cases=read('./fixtures/lexical-evaluation.json');
test('benchmark reports both engines',()=>{const r=compare(cases,data);console.log('LEXICAL_BENCHMARK '+JSON.stringify(r));assert.equal(r.precise.cases,cases.length);assert.ok(r.precise.fp<=r.legacy.fp);});
test('metric arithmetic on controlled predictions',()=>{const r=evaluate([{text:'x',expected:['a','b']}],{},()=>[{category:{id:'a'}},{category:{id:'c'}}]);assert.deepEqual(r,{cases:1,tp:1,fp:1,fn:1,precision:.5,recall:.5,f1:.5});});
