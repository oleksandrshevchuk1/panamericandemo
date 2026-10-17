async(page)=>{
 for(const width of [360,768,1440]){
  await page.setViewportSize({width,height:width===1440?900:780});await page.goto('http://127.0.0.1:4173/');await page.locator('#services').scrollIntoViewIfNeeded();await page.waitForTimeout(700);
  const cards=await page.locator('.service').evaluateAll(els=>els.map(e=>({overflow:e.scrollWidth>e.clientWidth+1,icon:getComputedStyle(e.querySelector('.service-icon')).display,number:getComputedStyle(e.querySelector('.service-number')).color})));
  if(cards.some(card=>card.overflow||card.icon==='none'||card.number!=='rgb(255, 255, 255)'))throw Error('Services layout '+JSON.stringify(cards));
  if(await page.locator('.service p strong').count()!==6)throw Error('Service emphasis missing');
  if(width===360)await page.screenshot({path:'checks/screenshots/services-new-mobile.png'});
 }
 await page.setViewportSize({width:390,height:744});await page.goto('http://127.0.0.1:4173/');await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await page.waitForTimeout(800);
 const footer=await page.locator('.footer').evaluate(e=>({padding:parseFloat(getComputedStyle(e).paddingBottom),hidden:document.body.classList.contains('actions-hidden')}));if(footer.padding>100||!footer.hidden)throw Error('Footer has excess space '+JSON.stringify(footer));
 const last=await page.locator('.footer-bottom>a').boundingBox(),utility=await page.locator('.floating-contact').boundingBox();if(last.y+last.height>utility.y)throw Error('Footer text overlaps controls');
 await page.screenshot({path:'checks/screenshots/footer-compact-final.png'});
}
