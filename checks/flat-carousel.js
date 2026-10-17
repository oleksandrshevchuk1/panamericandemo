async(page)=>{
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');
 for(const selector of ['#car-track','#video-track']){
  await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(700);
  const state=await page.locator(selector).evaluate(e=>{const active=e.querySelector('.catalog-active').getBoundingClientRect(),next=e.querySelector('.catalog-next').getBoundingClientRect();return {width:active.width,neighbor:next.width,gap:next.left-active.right};});
  if(Math.abs(state.width-state.neighbor)>1||Math.abs(state.gap-12)>1)throw Error('Incorrect spacing '+selector+JSON.stringify(state));
  const box=await page.locator(selector).boundingBox(),y=Math.min(550,Math.max(160,box.y+70));
  await page.mouse.move(260,y);await page.mouse.down();await page.mouse.move(170,y,{steps:4});
  const mid=await page.locator(selector+' .catalog-active').boundingBox();if(Math.abs(mid.width-state.width)>1)throw Error('Slide resized during swipe');
  await page.mouse.up();await page.waitForTimeout(550);
 }
}
