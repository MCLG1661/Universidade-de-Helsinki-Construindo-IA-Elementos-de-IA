import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL(p,import.meta.url),'utf8');
test('browser entry is an ES module',()=>assert.match(read('../index.html'),/<script type="module" src="script.js"/));
test('PWA cache includes browser module dependencies',()=>{
 const sw=read('../sw.js');
 for(const path of ['/script.js','/core/lexical-engine.mjs','/core/legacy-engine.mjs','/data.json'])assert.ok(sw.includes(JSON.stringify(path)),path);
});
test('browser uses precise engine',()=>assert.match(read('../script.js'),/from "\.\/core\/lexical-engine\.mjs"/));
