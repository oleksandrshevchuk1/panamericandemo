async(page)=>{
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');await page.locator('#blog').scrollIntoViewIfNeeded();await page.waitForTimeout(700);
 await page.locator('.catalog-active .video-cover').click();await page.waitForTimeout(200);
 const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:true});
 const box=await page.locator('.video-card.catalog-active').boundingBox(),y=Math.min(450,Math.max(150,box.y+120));
 for(const [start,end,expected] of [[290,100,'02'],[100,290,'01']]){
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:start,y}]});
  for(let i=1;i<=5;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start+(end-start)*i/5,y}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(550);
  if(!(await page.locator('#video-count').innerText()).startsWith(expected))throw Error('Player swallowed swipe');
 }
 const style=await page.locator('.service-number').first().evaluate(e=>({color:getComputedStyle(e).color,font:getComputedStyle(e).fontFamily,italic:getComputedStyle(e).fontStyle,bg:getComputedStyle(e).backgroundColor}));
 if(style.color!=='rgb(231, 157, 47)'||style.italic!=='italic'||!style.font.includes('Lora')||style.bg!=='rgba(0, 0, 0, 0)')throw Error(JSON.stringify(style));
 if(await page.locator('.benefit-inline b').first().evaluate(e=>getComputedStyle(e).color)!=='rgb(16, 61, 59)')throw Error('Low contrast title');
}
