import test from 'node:test';
import assert from 'node:assert/strict';
import {analyzeEvidence} from '../core/context.mjs';
for(const [input,status] of [['Tenho tosse','unmarked'],['Não tenho tosse','negated'],['Sem tosse','negated'],['Talvez tenha tosse','uncertain'],['Tive tosse','historical'],['Meu irmão tem tosse','third_party'],['Não tive tosse','ambiguous'],['Sem febre, mas tenho tosse','unmarked']]){
 test(input,()=>assert.equal(analyzeEvidence(input,['tosse'])[0].status,status));
}
test('source offsets preserve original text',()=>{const s='Tenho NÁUSEA.';const e=analyzeEvidence(s,['náusea','nausea']);assert.equal(e.length,1);assert.equal(s.slice(e[0].start,e[0].end),'NÁUSEA');});
test('phrase does not cross sentence',()=>assert.deepEqual(analyzeEvidence('falta. de ar',['falta de ar']),[]));

test('double negation is ambiguous',()=>assert.equal(analyzeEvidence('Não nega tosse',['tosse'])[0].status,'ambiguous'));
test('phrase cannot cross comma',()=>assert.deepEqual(analyzeEvidence('falta, de ar',['falta de ar']),[]));
test('contrast resets negation',()=>assert.equal(analyzeEvidence('Sem febre porém tenho tosse',['tosse'])[0].status,'unmarked'));

for(const [input,status] of [['Não só tosse, mas também febre.','unmarked'],['Tosse anteriormente.','historical'],['Meu colega tem tosse.','third_party'],['Tosse não confirmada.','uncertain'],['Não tenho tosse.','negated']])test('regression '+input,()=>assert.equal(analyzeEvidence(input,['tosse'])[0].status,status));
