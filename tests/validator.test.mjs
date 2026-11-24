import test from 'node:test';
import assert from 'node:assert/strict';
import {validateClaims,buildReport} from '../core/validator.mjs';
test('reports found, negated and missing claims',()=>assert.deepEqual(validateClaims('Tenho tosse. Sem febre.',['tosse','febre','náusea']).map(x=>x.status),['lexical_match','negated','not_found']));
test('conflicting mentions remain mixed',()=>assert.equal(validateClaims('Sem tosse. Tenho tosse.',['tosse'])[0].status,'mixed'));
test('all claims require human review',()=>assert.ok(validateClaims('tosse',['tosse','febre']).every(x=>x.requiresHumanReview)));
test('report is versioned and serializable',()=>{const r=buildReport('tosse',['tosse']);assert.equal(r.schemaVersion,'0.2.0');assert.deepEqual(JSON.parse(JSON.stringify(r)),r);});
test('invalid claims rejected',()=>assert.throws(()=>validateClaims('tosse',['']),TypeError));

test('quality distinguishes conflicting contexts and exact offsets',()=>{
 const q=validateClaims('Sem tosse. Tenho tosse.',['tosse'])[0].quality;
 assert.deepEqual(q,{occurrenceCount:2,exactSourceOffsets:true,distinctContexts:2,conflictingContexts:true,contextualMarkers:true});
});
test('missing evidence does not imply verified offsets',()=>{
 const q=validateClaims('tosse',['febre'])[0].quality;
 assert.deepEqual(q,{occurrenceCount:0,exactSourceOffsets:false,distinctContexts:0,conflictingContexts:false,contextualMarkers:false});
});
test('unmarked evidence is not contextual confirmation',()=>{
 const q=validateClaims('tosse',['tosse'])[0].quality;
 assert.equal(q.contextualMarkers,false);
 assert.equal(q.exactSourceOffsets,true);
});
