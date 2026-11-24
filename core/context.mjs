// Experimental bounded context heuristics; not clinical interpretation.
export function analyzeEvidence(text, keywords) {
 const tokens=[...String(text).matchAll(/[\p{L}\p{N}]+/gu)].map(m=>({raw:m[0],value:m[0].normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),start:m.index,end:m.index+m[0].length}));
 const out=[];
 const unique=new Map();
 for(const k of keywords){const n=String(k).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().match(/[\p{L}\p{N}]+/gu)?.join(' ');if(n&&!unique.has(n))unique.set(n,k);}
 for(const [n,k] of unique){const p=n.split(' ');for(let i=0;i<tokens.length;i++){
 if(!p.every((w,j)=>tokens[i+j]?.value===w))continue;
 const start=tokens[i].start,end=tokens[i+p.length-1].end;
 if(/[.!?;\n]/.test(text.slice(start,end)))continue;
 const prefix=text.slice(0,start).split(/[.!?;\n,]/).pop().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().split(/\b(?:mas|porem|contudo)\b/).pop();
 const window=prefix.trim().split(/\s+/).slice(-6).join(' ');
 const flags=[];
 if(/\b(?:nao|sem|nega|negou|ausencia de)\b/.test(window))flags.push('negated');
 if(/\b(?:talvez|possivel|suspeita|pode|possivelmente)\b/.test(window))flags.push('uncertain');
 if(/\b(?:tive|teve|anteriormente|historico de|passado)\b/.test(window))flags.push('historical');
 if(/\b(?:meu irmao|minha irma|minha mae|meu pai|terceiro)\b/.test(window))flags.push('third_party');
 out.push({keyword:k,normalized:n,start,end,quote:text.slice(start,end),status:flags.length>1?'ambiguous':flags[0]||'unmarked',flags});
 }}
 return out.sort((a,b)=>a.start-b.start||b.end-a.end);
}
