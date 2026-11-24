import {normalizeText,tokenize,classifyText as legacy} from './legacy-engine.mjs';
import {classifyText as precise} from './lexical-engine.mjs';
export function evaluate(cases,data,engine){
 let tp=0,fp=0,fn=0;
 for(const item of cases){
 const n=normalizeText(item.text), actual=new Set(engine(n,tokenize(n),data).map(r=>r.category.id)), expected=new Set(item.expected);
 for(const x of actual) expected.has(x)?tp++:fp++;
 for(const x of expected) if(!actual.has(x))fn++;
 }
 const precision=tp+fp?tp/(tp+fp):0,recall=tp+fn?tp/(tp+fn):0;
 return {cases:cases.length,tp,fp,fn,precision,recall,f1:precision+recall?2*precision*recall/(precision+recall):0};
}
export function compare(cases,data){return {legacy:evaluate(cases,data,legacy),precise:evaluate(cases,data,precise)};}
