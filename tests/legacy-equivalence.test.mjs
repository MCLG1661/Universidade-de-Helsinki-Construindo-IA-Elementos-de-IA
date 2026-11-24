import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {normalizeText, tokenize, classifyText} from '../core/legacy-engine.mjs';
const data=JSON.parse(readFileSync(new URL('../data.json',import.meta.url),'utf8'));
const source=readFileSync(new URL('../script.js',import.meta.url),'utf8');
const context=vm.createContext({document:{addEventListener(){}},dataset:data});
vm.runInContext(source+'\nappData = dataset;',context);
const cases=[...data.example_inputs.map(x=>x.text),...data.categories.flatMap(x=>x.examples), '', 'Não tenho tosse.', 'O computador funciona.', 'náusea', 'pressão', '123 !', 'tosse náusea cabeça fadiga ansiedade febre'];
for(const [i,input] of cases.entries()){
 test('legacy equivalence '+(i+1)+': '+JSON.stringify(input),()=>{
  context.input=input;
  const expected=JSON.parse(JSON.stringify(vm.runInContext('({normalized:normalizeText(input),tokens:tokenize(normalizeText(input)),matches:classifyText(normalizeText(input),tokenize(normalizeText(input)))})',context)));
  const normalized=normalizeText(input),tokens=tokenize(normalized);
  assert.deepEqual({normalized,tokens,matches:classifyText(normalized,tokens,data)},expected);
 });
}
