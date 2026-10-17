async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');
 for(const [selector,counter] of [['#car-track','#gallery-count'],['#video-track','#video-count']]){
  await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(800);
  const box=await page.locator(selector).boundingBox();const y=Math.min(550,Math.max(180,box.y+80));
  await page.mouse.move(260,y);await page.mouse.down();await page.mouse.move(140,y,{steps:5});await page.mouse.up();await page.waitForTimeout(650);
  if(!(await page.locator(counter).innerText()).startsWith('02'))throw Error('Kent swipe failed '+selector);
  const style=await page.locator(selector+' > .catalog-active').evaluate(e=>({duration:getComputedStyle(e).transitionDuration,position:getComputedStyle(e).position}));
  if(style.position!=='absolute'||!style.duration.includes('0.55s'))throw Error(JSON.stringify(style));
 }
 const number=await page.locator('.service-number').first().evaluate(e=>({color:getComputedStyle(e).color,bg:getComputedStyle(e).backgroundColor}));
 if(number.color!=='rgb(255, 255, 255)'||number.bg!=='rgb(231, 157, 47)')throw Error('Badge '+JSON.stringify(number));
 if(errors.length)throw Error(errors.join('\n'));
}
