import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL(p,import.meta.url),'utf8');
test('browser entry is an ES module',()=>assert.match(read('../index.html'),/<script type="module" src="script\.js(?:\?v=\d+)?"/));
test('PWA cache includes browser module dependencies',()=>{
 const sw=read('../sw.js');
 for(const path of ['/script.js','/core/lexical-engine.mjs','/core/legacy-engine.mjs','/data.json'])assert.ok(sw.includes(JSON.stringify(path)),path);
});
test('browser uses precise engine',()=>assert.match(read('../script.js'),/from "\.\/core\/lexical-engine\.mjs"/));

test('evidence report uses textContent and is cleared',()=>{
 const js=read('../script.js');
 assert.match(js,/output\.textContent = JSON\.stringify/);
 assert.match(js,/evidence\.textContent = ""/);
 assert.match(js,/renderEvidence\(text\);/);
 assert.match(read('../index.html'),/id="evidenceOutput"/);
});
test('offline cache includes evidence dependencies',()=>{
 const sw=read('../sw.js');
 for(const path of ['/core/context.mjs','/core/validator.mjs'])assert.ok(sw.includes(JSON.stringify(path)),path);
});

test('versioned assets and language module are precached',()=>{const html=read('../index.html'),sw=read('../sw.js');for(const m of html.matchAll(/(?:href|src)="((?:style\.css|script\.js)\?v=\d+)"/g))assert.ok(sw.includes(JSON.stringify('/'+m[1])));assert.ok(sw.includes('"/core/i18n.mjs"'));});
