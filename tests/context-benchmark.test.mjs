import test from 'node:test';
import assert from 'node:assert/strict';
import {buildReport} from '../core/validator.mjs';
const cases=[
 ['Tenho tosse.','tosse','lexical_match'],
 ['Não tenho tosse.','tosse','negated'],
 ['Sem febre; tenho tosse.','tosse','lexical_match'],
 ['Talvez tenha náusea.','náusea','uncertain'],
 ['Tive tosse.','tosse','historical'],
 ['Minha mãe tem tosse.','tosse','third_party'],
 ['Não nega tosse.','tosse','ambiguous'],
 ['Sem tosse. Tenho tosse.','tosse','mixed'],
 ['O computador funciona.','dor','not_found'],
 ['Não só tosse, mas também febre.','tosse','lexical_match'],
 ['Tenho tosse, não febre.','febre','negated'],
 ['Tosse anteriormente.','tosse','historical'],
 ['Meu colega tem tosse.','tosse','third_party'],
 ['Tosse não confirmada.','tosse','uncertain'],
 ['Falta. De ar.','falta de ar','not_found']
];
test('context challenge set reports errors without hiding them',()=>{
 const results=cases.map(([source,claim,expected])=>({source,claim,expected,actual:buildReport(source,[claim]).claims[0].status}));
 const correct=results.filter(r=>r.expected===r.actual).length;
 console.log('CONTEXT_BENCHMARK '+JSON.stringify({total:results.length,correct,errors:results.filter(r=>r.expected!==r.actual)}));
 assert.equal(results.length,15);
});
test('all challenge evidence preserves source offsets',()=>{
 for(const [source,claim] of cases)for(const e of buildReport(source,[claim]).claims[0].evidence){
 assert.ok(e.start>=0&&e.end>e.start&&e.end<=source.length);
 assert.equal(source.slice(e.start,e.end),e.quote);
 }
});
