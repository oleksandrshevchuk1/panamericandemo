async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const size of [{width:390,height:844},{width:360,height:640}]){
  await page.setViewportSize(size);await page.goto('http://127.0.0.1:4173/');
  const top=await page.locator('.route-layout').evaluate(e=>e.getBoundingClientRect().top+scrollY);
  for(const stage of [0,4,7]){
   await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top-82+stage*230+5);await page.waitForTimeout(500);
   const story=await page.locator('#route-story').boundingBox(),map=await page.locator('.route-map').boundingBox();
   if(story.y<80||story.y+story.height>map.y||map.y+map.height>size.height-55)throw Error('Scene clipped '+JSON.stringify({size,story,map}));
   if(!(await page.locator('#route-current').innerText()).startsWith(String(stage+1).padStart(2,'0')))throw Error('Stage wrong');
  }
 }
 await page.locator('#blog').scrollIntoViewIfNeeded();await page.waitForTimeout(800);
 const boxes=await page.locator('#video-track').evaluate(e=>Object.fromEntries(['catalog-prev','catalog-active','catalog-next'].map(name=>[name,e.querySelector('.'+name).getBoundingClientRect().toJSON()])));
 if(boxes['catalog-prev'].right<boxes['catalog-active'].left||boxes['catalog-next'].left>boxes['catalog-active'].right)throw Error('Gap between videos');
 const box=await page.locator('#video-track').boundingBox(),y=Math.min(500,Math.max(160,box.y+70));
 await page.mouse.move(260,y);await page.mouse.down();await page.mouse.move(170,y,{steps:4});
 if(!await page.locator('#video-track').evaluate(e=>e.classList.contains('catalog-dragging')))throw Error('No physical drag');
 const during=await page.locator('#video-track .catalog-active').getAttribute('style');if(!during.includes('translateZ'))throw Error('No depth');
 await page.mouse.up();await page.waitForTimeout(700);
 if(!(await page.locator('#video-count').innerText()).startsWith('02'))throw Error('No completed slide');
 if(errors.length)throw Error(errors.join('\n'));
 await page.screenshot({path:'checks/screenshots/mobile-video-depth-final.png'});
}
