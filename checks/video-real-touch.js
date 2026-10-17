async(page)=>{
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');await page.locator('#blog').scrollIntoViewIfNeeded();await page.waitForTimeout(800);
 const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:true});
 const box=await page.locator('#video-track').boundingBox();const y=Math.min(480,Math.max(180,box.y+100));
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:290,y}]});
 for(const x of [270,240,200,160,100])await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y+2}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(600);
 if(!(await page.locator('#video-count').innerText()).startsWith('02'))throw Error('Touch swipe did not advance '+await page.locator('#video-count').innerText());
}
