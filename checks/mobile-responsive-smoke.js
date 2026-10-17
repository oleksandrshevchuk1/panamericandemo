async(page)=>{
 for(const size of [{width:360,height:640},{width:430,height:932},{width:768,height:1024},{width:1440,height:900}]){
  await page.setViewportSize(size);await page.goto('http://127.0.0.1:4173/');
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow at '+size.width);
  await page.locator('#blog').scrollIntoViewIfNeeded();await page.locator('#video-next').click();await page.waitForTimeout(550);
  if(!(await page.locator('#video-count').innerText()).startsWith('02'))throw Error('Carousel failed at '+size.width);
  if(size.width<=900){
   const top=await page.locator('.route-layout').evaluate(e=>e.getBoundingClientRect().top+scrollY);
   await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top-82+3.5*230);await page.waitForTimeout(450);
   const map=await page.locator('.route-map').boundingBox(),story=await page.locator('#route-story').boundingBox();
   if(Math.abs(map.x+map.width/2-size.width/2)>1||story.y+story.height>size.height-45)throw Error('Scene does not fit at '+size.width);
  }
 }
}
