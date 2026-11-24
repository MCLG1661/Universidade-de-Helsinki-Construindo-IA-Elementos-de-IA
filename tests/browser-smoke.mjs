import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=process.cwd();
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.css':'text/css'};
const server=createServer(async(req,res)=>{
 try{
 const p=resolve(root,'.'+(new URL(req.url,'http://localhost').pathname==='/'?'/index.html':new URL(req.url,'http://localhost').pathname));
 if(!p.startsWith(root+sep)){res.writeHead(403).end();return;}
 const b=await readFile(p);res.writeHead(200,{'Content-Type':types[extname(p)]||'application/octet-stream'}).end(b);
 }catch{res.writeHead(404).end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;
try{
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
 await page.goto('http://127.0.0.1:'+server.address().port);
 await page.locator('#exampleInputs button').first().waitFor();
 await page.locator('#textInput').fill('Tenho tosse. Sem febre.');
 await page.locator('#analyzeButton').click();
 const report=JSON.parse(await page.locator('#evidenceOutput').textContent());
 assert.equal(report.schemaVersion,'0.2.0');
 assert.equal(report.claims.find(c=>c.claim==='febre').status,'negated');
 await page.locator('#textInput').fill('O computador funciona.');
 await page.locator('#analyzeButton').click();
 assert.equal((await page.locator('#resultSummary').textContent()).trim(),'');
 await page.locator('#clearButton').click();
 assert.equal(await page.locator('#textInput').inputValue(),'');
 assert.equal(await page.locator('#evidenceOutput').textContent(),'');
 await page.locator('#textInput').fill('<img src=x onerror=alert(1)> tosse');
 await page.locator('#analyzeButton').click();
 assert.equal(await page.locator('#originalText img').count(),0);
 assert.ok((await page.locator('#originalText').textContent()).includes('<img'));
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
 await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
 await page.context().setOffline(true);
 await page.reload({waitUntil:'domcontentloaded'});
 await page.locator('#exampleInputs button').first().waitFor();
 await page.locator('#textInput').fill('Tenho tosse.');
 await page.locator('#analyzeButton').click();
 assert.ok(JSON.parse(await page.locator('#evidenceOutput').textContent()).claims.length>0);
 assert.deepEqual(errors,[]);
 console.log('Browser smoke passed');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
