const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const refs=[...html.matchAll(/(?:src|href|poster)="(assets\/[^"#?]+)"/g)].map(m=>m[1]);
for(const ref of refs)assert.ok(fs.existsSync(ref),'Missing asset: '+ref);
for(const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new Function(match[1]);
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert.ok(!/Kent Cars|kent_cars|kent\.cars|olegkentcars|539.?92.?48/i.test(html),'Old brand in live page');
assert.equal(fs.readFileSync('assets/panamerican/calculator.cjs','utf8'),fs.readFileSync('assets/panamerican/calculator.js','utf8'),'Calculator browser copy is stale');
for(const script of refs.filter(ref=>ref.endsWith('.js')))new Function(fs.readFileSync(script,'utf8'));
for(const css of refs.filter(ref=>ref.endsWith('.css'))){
 const source=fs.readFileSync(css,'utf8');
 for(const m of source.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)){if(m[1].startsWith('data:'))continue;assert.ok(fs.existsSync(path.resolve(path.dirname(css),m[1])),'Missing CSS asset '+m[1]);}
}
assert.ok(!/https?:\/\/[^'"\s]+\.(?:js|css)/.test(html));
assert.ok(!/sessionStorage|fetch\(|XMLHttpRequest/.test(html));
const logic=fs.readFileSync('assets/panamerican/site.js','utf8');
assert.ok(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest/.test(logic),'Unexpected persistence/transmission');
for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(html.includes('id="'+match[1]+'"'),'Missing anchor '+match[1]);
console.log(`PASS: ${refs.length} local assets including video posters; CSS fonts; all script syntax; calculator parity; one H1; anchors; no old brand, persistence or hidden data transmission`);
