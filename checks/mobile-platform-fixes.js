async(page)=>{
 const assert=(value,message)=>{if(!value)throw Error(message)};const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:390,height:744});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:4173/');await page.waitForTimeout(500);
 assert(await page.locator('html').getAttribute('data-motion')==='on','Motion not on by default');
 assert(await page.locator('#motion-mini').getAttribute('aria-pressed')==='true','Pause button wrong on load');
 const glyphs=await page.evaluate(()=>{const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),found=[];while(walker.nextNode())if(/[↗←→↓↑▶]/.test(walker.currentNode.textContent))found.push(walker.currentNode.textContent);return found;});
 assert(!glyphs.length,'Emoji-prone symbols remain '+glyphs.join(','));
 assert(await page.locator('.ui-icon').count()>30,'SVG icons missing');
 for(const selector of ['#about','#reviews','#site-footer']){
  await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(300);
  const state=await page.locator(selector+' .ambient-art').evaluate(el=>({opacity:Number(getComputedStyle(el).opacity),fill:getComputedStyle(el.querySelector('.ambient-orb')).fill}));
  assert(state.opacity<=.075&&state.fill==='none','Strong background at '+selector+' '+JSON.stringify(state));
 }
 await page.locator('.floating-contact').click();await page.waitForTimeout(400);
 let button=await page.locator('.floating-contact').boundingBox(),menu=await page.locator('#social-popover').boundingBox();
 assert(menu.x>=15&&menu.x+menu.width<=375&&menu.y>=80&&menu.y+menu.height<=button.y-4,'Menu does not anchor above button '+JSON.stringify({button,menu}));
 await page.evaluate(()=>scrollBy({top:-200,behavior:'instant'}));await page.waitForTimeout(400);
 menu=await page.locator('#social-popover').boundingBox();assert(menu.x>=15&&menu.x+menu.width<=375,'Menu moves sideways');
 await page.keyboard.press('Escape');assert(!await page.locator('#social-popover').isVisible(),'Popover not closed by Escape');
 await page.locator('#contact-open').click();await page.waitForTimeout(350);assert(await page.locator('#contact-dialog').isVisible(),'Contact button missing dialog');
 await page.locator('#contact-close').click();await page.waitForTimeout(250);
 await page.emulateMedia({reducedMotion:'no-preference'});
 const top=await page.locator('.route-layout').evaluate(e=>e.getBoundingClientRect().top+scrollY);
 for(const phase of [0,1.5,3.6,5,7]){
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top-82+phase*230+1);await page.waitForTimeout(450);
  const box=await page.locator('.route-map').boundingBox(),story=await page.locator('#route-story').boundingBox();
  assert(Math.abs(box.x+box.width/2-195)<1,'Map off center');
  assert(box.width>=365&&box.y>=80&&story.y>=box.y+box.height&&story.y+story.height<=690,'Map story does not fit '+JSON.stringify({box,story}));
  const labels=await page.locator('.country-label-usa,.country-label-ukraine').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().toJSON()));
  assert(labels.every(label=>label.left>=box.x&&label.right<=box.x+box.width&&label.top>=box.y&&label.bottom<=box.y+box.height),'Country labels clipped '+JSON.stringify(labels));
 }
 assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),'Horizontal page overflow');
 await page.screenshot({path:'checks/screenshots/mobile-platform-map.png'});
 await page.locator('#site-footer').scrollIntoViewIfNeeded();await page.waitForTimeout(500);await page.screenshot({path:'checks/screenshots/mobile-platform-footer.png'});
 assert(!errors.length,errors.join('\n'));
}
