async(page)=>{
 for(const size of [{width:360,height:780},{width:768,height:1024},{width:1440,height:900}]){
  await page.setViewportSize(size);await page.goto('http://127.0.0.1:4173/');await page.locator('.benefit-inline').scrollIntoViewIfNeeded();await page.waitForTimeout(800);
  if(await page.locator('.benefit-icon svg').count()!==3||await page.locator('.benefit-inline p strong').count()!==3)throw Error('Missing icons or accents');
  const overflow=await page.locator('.benefit-inline>div').evaluateAll(els=>els.some(e=>e.scrollWidth>e.clientWidth+1));if(overflow)throw Error('Card overflow '+size.width);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Page overflow');
  if(size.width===360)await page.screenshot({path:'checks/screenshots/benefit-cards-mobile.png'});
  if(size.width===1440)await page.screenshot({path:'checks/screenshots/benefit-cards-desktop.png'});
 }
}
