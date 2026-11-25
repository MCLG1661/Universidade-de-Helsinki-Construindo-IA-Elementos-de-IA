import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {normalizeText,tokenize,classifyText} from '../core/lexical-engine.mjs';
const data=JSON.parse(readFileSync(new URL('../data.json',import.meta.url),'utf8'));
const run=input=>{const n=normalizeText(input);return classifyText(n,tokenize(n),data);};
const has=(input,id,term)=>run(input).some(r=>r.category.id===id&&r.matchedKeywords.includes(term));
test('computer does not match dor',()=>assert.equal(has('O computador funciona.','general-discomfort','dor'),false));
test('exact dor matches',()=>assert.ok(has('dor','general-discomfort','dor')));
test('contiguous phrase matches',()=>assert.ok(has('falta de ar','respiratory','falta de ar')));
test('isolated phrase fragment does not match',()=>assert.equal(has('falta de tempo','respiratory','falta de ar'),false));
test('noncontiguous phrase does not match',()=>assert.equal(has('falta de tempo para o ar','respiratory','falta de ar'),false));
test('accent and case normalization preserved',()=>assert.ok(has('NÁUSEA!','digestive','náusea')));
test('empty input returns no results',()=>assert.deepEqual(run(''),[]));
test('respiratory example retains first category',()=>assert.equal(run(data.example_inputs[0].text)[0].category.id,'respiratory'));

test('accent aliases contribute only once',()=>{
 const r=run('náusea').find(r=>r.category.id==='digestive');
 assert.equal(r.score,data.engine.scoring.exact_match);
 assert.deepEqual(r.matchedKeywords,['náusea']);
 assert.equal(r.similarity,1/new Set(r.category.keywords.map(normalizeText).filter(Boolean)).size);
});
test('hyphen aliases contribute only once',()=>{
 const r=run('mal-estar').find(r=>r.category.id==='general-discomfort');
 assert.equal(r.score,data.engine.scoring.exact_match);
 assert.deepEqual(r.matchedKeywords,['mal-estar']);
});
test('repeated mentions do not inflate score',()=>assert.deepEqual(run('náusea náusea'),run('náusea')));
test('duplicate aliases do not change score or similarity',()=>{
 const copy=structuredClone(data);
 copy.categories.find(c=>c.id==='digestive').keywords.push('NÁUSEA','nausea','');
 const n=normalizeText('náusea');
 const r=classifyText(n,tokenize(n),copy).find(r=>r.category.id==='digestive');
 const base=run('náusea').find(r=>r.category.id==='digestive');
 assert.equal(r.score,base.score);
 assert.equal(r.similarity,base.similarity);
 assert.deepEqual(r.matchedKeywords,base.matchedKeywords);
});
test('shared terms remain eligible in distinct categories',()=>{
 assert.ok(has('pressão','headache','pressão'));
 assert.ok(has('pressão','stress','pressão'));
});
