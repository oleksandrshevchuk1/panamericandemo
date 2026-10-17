async(page)=>{
 await page.setViewportSize({width:390,height:744});await page.goto('http://127.0.0.1:4173/');await page.locator('#site-footer').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 const button=await page.locator('.floating-contact').boundingBox();if(button.width!==54||button.height!==54)throw Error('Button size wrong');
 await page.evaluate(()=>{
  window.menuFrames=[];document.querySelector('#social-popover').addEventListener('beforetoggle',event=>{
   if(event.newState!=='open')return;let frame=0;const sample=()=>{
    const rect=document.querySelector('#social-popover').getBoundingClientRect();window.menuFrames.push({x:rect.x,y:rect.y,w:rect.width});if(++frame<22)requestAnimationFrame(sample);
   };requestAnimationFrame(sample);
  });
 });
 await page.locator('.floating-contact').click();await page.waitForTimeout(550);
 const frames=await page.evaluate(()=>window.menuFrames);
 if(frames.some(frame=>Math.abs(frame.x-frames[0].x)>.2||Math.abs(frame.y-frames[0].y)>.2||Math.abs(frame.w-frames[0].w)>.2))throw Error('Panel moves '+JSON.stringify(frames));
 if(frames[0].x<15||frames[0].x+frames[0].w>375)throw Error('Menu clipped');
 const bg=await page.locator('.footer .ambient-art').evaluate(e=>({opacity:Number(getComputedStyle(e).opacity),fill:getComputedStyle(e.querySelector('.ambient-orb')).fill}));
 if(bg.opacity<.15||bg.opacity>.23||bg.fill!=='none')throw Error('Bad mobile effects '+JSON.stringify(bg));
 await page.screenshot({path:'checks/screenshots/social-open-fixed.png'});
 await page.locator('.floating-contact').click();await page.waitForTimeout(100);
 if(await page.locator('#social-popover').isVisible())throw Error('Second tap does not close');
 await page.locator('.floating-contact').click();await page.waitForTimeout(300);await page.keyboard.press('Escape');await page.waitForTimeout(100);
 if(await page.locator('#social-popover').isVisible())throw Error('Escape broken');
}
