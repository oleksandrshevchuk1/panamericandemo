async(page)=>{
 await page.setViewportSize({width:1366,height:900});await page.goto('http://127.0.0.1:4173/');await page.locator('#blog').scrollIntoViewIfNeeded();await page.waitForTimeout(650);await page.locator('#video-next').click();await page.waitForTimeout(700);
 const frames=await page.locator('.video-card.catalog-active .video-shell,.video-card.catalog-next .video-shell,.video-card.catalog-prev .video-shell').evaluateAll(els=>els.map(e=>({fit:getComputedStyle(e.querySelector('video')).objectFit,clip:getComputedStyle(e).clipPath,overlay:getComputedStyle(e,'::after').borderRadius})));
 if(frames.some(f=>f.fit!=='cover'||f.clip==='none'||f.overlay==='0px'))throw Error(JSON.stringify(frames));
 await page.screenshot({path:'checks/screenshots/video-frames-fixed-desktop.png'});
}
