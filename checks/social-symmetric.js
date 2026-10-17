async(page)=>{
 await page.setViewportSize({width:390,height:744});await page.goto('http://127.0.0.1:4173/');await page.locator('#about').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 await page.locator('.floating-contact').click();await page.waitForTimeout(350);
 const state=await page.locator('.floating-contact').evaluate(button=>{
  const b=button.getBoundingClientRect(),icon=button.querySelector('.social-close-icon'),r=icon.getBoundingClientRect(),ring=getComputedStyle(button,'::after');
  return {centerX:r.x+r.width/2-b.x-b.width/2,centerY:r.y+r.height/2-b.y-b.height/2,transform:getComputedStyle(icon).transform,opacity:getComputedStyle(icon).opacity,borders:[ring.borderTopColor,ring.borderRightColor,ring.borderBottomColor,ring.borderLeftColor],animation:ring.animationName};
 });
 if(Math.abs(state.centerX)>.1||Math.abs(state.centerY)>.1||state.transform!=='none'||state.opacity!=='1'||new Set(state.borders).size!==1||state.animation!=='none')throw Error(JSON.stringify(state));
 await page.screenshot({path:'checks/screenshots/social-symmetric-open.png'});
 await page.locator('.floating-contact').click();await page.waitForTimeout(650);
 if(await page.locator('.social-share-icon').evaluate(e=>getComputedStyle(e).opacity)!=='1')throw Error('Share icon not restored');
}
