async(page)=>{
 await page.setViewportSize({width:390,height:744});await page.goto('http://127.0.0.1:4173/');await page.waitForTimeout(400);
 const buttons=await page.locator('.floating-contact,.floating-chat').evaluateAll(els=>els.map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect(),icon=e.querySelector('svg').getBoundingClientRect();return {width:r.width,height:r.height,bg:s.backgroundColor,border:s.border,shadow:s.boxShadow,iconX:icon.x+icon.width/2-r.x-r.width/2,iconY:icon.y+icon.height/2-r.y-r.height/2};}));
 if(JSON.stringify(buttons[0])!==JSON.stringify(buttons[1]))throw Error('Buttons differ '+JSON.stringify(buttons));
 if(Math.abs(buttons[0].iconX)>.1||Math.abs(buttons[0].iconY)>.1)throw Error('Icons off center');
 await page.locator('.menu-toggle').click();
 const borders=await page.locator('#navigation a').evaluateAll(links=>links.slice(1).map(e=>getComputedStyle(e).borderTopWidth));if(borders.length!==6||borders.some(border=>border!=='1px'))throw Error('Menu separators missing');
 await page.locator('.menu-toggle').click();await page.locator('#contact-open').click();await page.waitForTimeout(400);
 if(await page.locator('.chat-close-icon').evaluate(e=>getComputedStyle(e).opacity)!=='1')throw Error('Chat close icon missing');
 await page.locator('#contact-close').click();await page.waitForTimeout(500);
}
