async(page)=>{
 for(const size of [{width:360,height:640},{width:430,height:932}]){
  await page.setViewportSize(size);await page.goto('http://127.0.0.1:4173/');
  const g=await page.locator('.route-layout').evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,pin:parseFloat(getComputedStyle(e.querySelector('.route-left')).top)}));
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),g.top-g.pin+7*230+1);await page.waitForTimeout(550);
  const box=await page.locator('.route-left').boundingBox(),button=await page.locator('.floating-contact').boundingBox();
  if(box.y<80||box.y+box.height>button.y)throw Error('Scene overlaps buttons '+JSON.stringify({size,box,button}));
  if(!(await page.locator('#route-current').innerText()).startsWith('08'))throw Error('Last stage not reached');
 }
}
