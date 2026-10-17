async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:360,height:640});await page.goto('http://127.0.0.1:4173/');
 const top=await page.locator('.route-layout').evaluate(e=>e.getBoundingClientRect().top+scrollY);
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top-82+1615);await page.waitForTimeout(450);
 const panel=await page.locator('.route-left').boundingBox();if(panel.y<70||panel.y+panel.height>620)throw Error('Mobile map does not fit '+JSON.stringify(panel));
 if(!(await page.locator('#route-current').innerText()).startsWith('08'))throw Error('Final step missing');
 await page.locator('#cars').scrollIntoViewIfNeeded();await page.waitForTimeout(350);
 const track=page.locator('#car-track');const box=await track.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+100);await page.mouse.wheel(0,250);await page.waitForTimeout(300);
 if(await track.evaluate(e=>e.scrollLeft)<=0)throw Error('Cars do not scroll');
 await page.locator('.floating-contact').click();await page.waitForTimeout(120);
 if(!await page.locator('#social-popover').isVisible())throw Error('Social menu absent');
 if(await page.locator('.ambient-art').count()<10)throw Error('Backgrounds absent');
 if(await page.locator('.header-phone').evaluate(e=>getComputedStyle(e).color)!=='rgb(255, 255, 255)')throw Error('Phone not white');
 await page.screenshot({path:'checks/screenshots/social-background-latest.png'});
 if(errors.length)throw Error(errors.join('\n'));
}
