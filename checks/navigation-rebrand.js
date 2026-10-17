async(page)=>{
 const assert=(v,m)=>{if(!v)throw new Error(m)};
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');
 await page.locator('.menu-toggle').click();
 const menu=await page.locator('#navigation').boundingBox();assert(menu.width<=280&&menu.height<340,'Menu is not compact');
 assert(await page.locator('#navigation a').filter({hasText:'Питання'}).isVisible(),'FAQ missing');
 await page.screenshot({path:'checks/screenshots/panamerican-final-menu.png'});
 await page.locator('#navigation a').filter({hasText:'Контакти'}).click();
 await page.waitForFunction(()=>Math.abs(document.querySelector('#contacts').getBoundingClientRect().top-document.querySelector('.header').getBoundingClientRect().height-18)<3);
 assert(await page.locator('#contacts').evaluate(el=>el.closest('section')?.id==='consultation'),'Contacts target footer');
 await page.screenshot({path:'checks/screenshots/panamerican-final-contacts.png'});
 await page.locator('#contact-open').click();
 assert(await page.locator('#contact-dialog').isVisible(),'Dialog missing');
 assert((await page.locator('#contact-dialog a').getAttribute('href'))==='https://t.me/CarLogist','Telegram target incorrect');
 await page.locator('#contact-dialog').evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished.catch(()=>{}))));
 await page.screenshot({path:'checks/screenshots/panamerican-final-contact-dialog.png'});
 await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#contact-dialog').open);
 await page.locator('.floating-contact').click();assert(await page.locator('#social-popover a').count()===3,'Social count incorrect');
 const left=await page.locator('.floating-contact').boundingBox(),right=await page.locator('.floating-chat').boundingBox();assert(left.x<30&&right.x>300,'Floating sides incorrect');
 await page.keyboard.press('Escape');
 for(const width of [901,1024,1366,1900]){
  await page.setViewportSize({width,height:768});
  assert(await page.locator('.menu-toggle').isHidden(),'Desktop hamburger at '+width);
  assert(await page.locator('#navigation').isVisible(),'Desktop nav hidden at '+width);
  assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),'Overflow at '+width);
 }
 await page.setViewportSize({width:1366,height:650});
 await page.locator('#route').evaluate(el=>scrollTo({top:el.offsetTop+300,behavior:'instant'}));
 const routePanel=await page.locator('.route-left').boundingBox(),map=await page.locator('.route-map').boundingBox();
 assert(map.y>=70&&map.y+map.height<610,'Map clipped in short desktop');
 const fill=await page.locator('.country-ukraine').evaluate(el=>getComputedStyle(el).fill);assert(fill==='none','Ukraine still filled');
 await page.screenshot({path:'checks/screenshots/panamerican-final-route-desktop.png'});
 return {status:'PASS',compactMenu:true,FAQ:true,contactAnchor:true,Telegram:'CarLogist',desktopNavWidths:4,fullMap:true};
}
