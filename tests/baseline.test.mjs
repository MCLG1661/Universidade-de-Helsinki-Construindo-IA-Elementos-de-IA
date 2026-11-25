import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const data = JSON.parse(readFileSync(new URL('../data.json', import.meta.url), 'utf8'));
const source = readFileSync(new URL('./fixtures/legacy-script.js', import.meta.url), 'utf8');
const context = vm.createContext({ document: { addEventListener() {} }, dataset: data });
vm.runInContext(source + '\nappData = dataset;', context);
function classify(input) {
  context.input = input;
  return JSON.parse(JSON.stringify(vm.runInContext('classifyText(normalizeText(input), tokenize(normalizeText(input)))', context)));
}
function match(input, category, keyword) {
  return classify(input).some(r => r.category.id === category && r.matchedKeywords.includes(keyword));
}
test('normalization removes accents', () => {
  assert.equal(vm.runInContext('normalizeText("NÁUSEA!")', context), 'nausea');
});
test('empty input has no matches', () => assert.equal(classify('').length, 0));
test('respiratory example ranks respiratory first', () => {
  assert.equal(classify('Estou com tosse, coriza e nariz congestionado.')[0].category.id, 'respiratory');
});
test('baseline limitation: substring matches unrelated word', () => {
  assert.ok(match('A decoração ficou bonita.', 'general-discomfort', 'dor') || match('O computador funciona.', 'general-discomfort', 'dor'));
});
test('baseline limitation: negation does not suppress lexical match', () => {
  assert.ok(match('Não tenho tosse.', 'respiratory', 'tosse'));
});
test('baseline limitation: accent variants both contribute', () => {
  assert.ok(match('náusea', 'digestive', 'náusea'));
  assert.ok(match('náusea', 'digestive', 'nausea'));
});
test('baseline limitation: shared term matches two categories', () => {
  assert.ok(match('pressão', 'headache', 'pressão'));
  assert.ok(match('pressão', 'stress', 'pressão'));
});
test('results respect configured maximum', () => {
  assert.ok(classify('tosse náusea cabeça fadiga ansiedade febre').length <= data.engine.max_results);
});
