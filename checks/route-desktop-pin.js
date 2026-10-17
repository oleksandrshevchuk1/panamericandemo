async(page)=>{
 for(const size of [{width:1440,height:760},{width:1900,height:900},{width:1024,height:650}]){
  await page.setViewportSize(size);await page.goto('http://127.0.0.1:4173/');
  for(const step of [6,7]){
   await page.evaluate(index=>{const el=document.querySelectorAll('.route-step')[index];scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight*.43-20,behavior:'instant'});},step);
   await page.waitForTimeout(150);
   const before=await page.locator('.route-left').boundingBox();
   await page.evaluate(()=>scrollBy({top:60,behavior:'instant'}));await page.waitForTimeout(350);
   const after=await page.locator('.route-left').boundingBox();
   if(Math.abs(before.y-after.y)>1||Math.abs(after.y-108)>1)throw Error('Map unpinned at step '+(step+1)+' '+JSON.stringify({size,before,after}));
   if(step===7&&!((await page.locator('#route-current').innerText()).startsWith('08')))throw Error('Stage eight not activated');
   const last=await page.locator('.route-step').nth(step).boundingBox();
   if(last.y<80||last.y+last.height>size.height)throw Error('Step clipped');
  }
 }
}
