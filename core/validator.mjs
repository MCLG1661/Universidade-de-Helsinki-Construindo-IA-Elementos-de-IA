import {analyzeEvidence} from './context.mjs';
export function validateClaims(text, claims) {
 if(typeof text!=='string'||!Array.isArray(claims)||claims.some(c=>typeof c!=='string'||!c.trim()))throw new TypeError('Expected text and nonempty string claims');
 return claims.map(claim=>{
 const evidence=analyzeEvidence(text,[claim]);
 const statuses=[...new Set(evidence.map(e=>e.status))];
 const status=!evidence.length?'not_found':statuses.length>1?'mixed':statuses[0]==='unmarked'?'lexical_match':statuses[0];
 return {claim,status,evidence,requiresHumanReview:true};
 });
}
export function buildReport(text,claims){
 return {schemaVersion:'0.1.0',engine:'deterministic-experimental',scope:'synthetic textual evidence only; not clinical or semantic verification',offsetUnit:'UTF-16 code units',claims:validateClaims(text,claims)};
}
