async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const size of [{width:1440,height:900},{width:390,height:844}]){
  await page.setViewportSize(size);await page.goto('http://127.0.0.1:4173/');
  for(const selector of ['#car-track','#video-track']){
   const el=page.locator(selector);await el.scrollIntoViewIfNeeded();await page.waitForTimeout(700);
   const box=await el.boundingBox();await page.mouse.move(box.x+box.width/2,Math.min(size.height-100,Math.max(150,box.y+80)));
   await page.mouse.wheel(0,180);await page.waitForTimeout(400);
   const right=await el.evaluate(e=>e.scrollLeft);if(right<1)throw Error('No horizontal scroll '+selector+' '+size.width);
   await page.mouse.wheel(0,-180);await page.waitForTimeout(400);
   if(await el.evaluate(e=>e.scrollLeft)>=right)throw Error('Cannot scroll left '+selector);
  }
 }
 await page.setViewportSize({width:360,height:640});await page.goto('http://127.0.0.1:4173/');
 const top=await page.locator('.route-layout').evaluate(e=>e.getBoundingClientRect().top+scrollY);
 let prior=null;
 for(const i of [0,4,7]){
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top-82+i*230+5);await page.waitForTimeout(350);
  const box=await page.locator('.route-left').boundingBox();if(box.y<70||box.y+box.height>625)throw Error('Map clipped '+JSON.stringify(box));
  const state=await page.locator('#route-traveler').getAttribute('transform');if(state===prior)throw Error('Route did not animate');prior=state;
  if(!(await page.locator('#route-current').innerText()).startsWith(String(i+1).padStart(2,'0')))throw Error('Wrong map stage');
 }
 await page.screenshot({path:'checks/screenshots/mobile-route-scroll-final.png'});
 if(errors.length)throw Error(errors.join('\n'));
}
