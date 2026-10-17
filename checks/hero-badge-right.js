async(page)=>{
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');await page.locator('.hero-art').scrollIntoViewIfNeeded();await page.waitForTimeout(600);
 const art=await page.locator('.hero-art').boundingBox(),badge=await page.locator('.hero-route-badge').boundingBox();if(Math.abs(art.x+art.width-badge.x-badge.width-12)>1)throw Error('Badge not on right');
 await page.screenshot({path:'checks/screenshots/hero-badge-right.png'});
}
