async(page)=>{
 await page.setViewportSize({width:390,height:740});await page.goto('http://127.0.0.1:4173/');
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.locator('.menu-toggle').click();await page.locator('#navigation a[href="#contacts"]').click();await page.waitForTimeout(1000);
 if(await page.locator('#contacts').evaluate(el=>!!el.closest('#consultation')))throw Error('Contacts mixed with form');
 if(await page.locator('#inquiry-form input').count()<3)throw Error('Missing application form');
 await page.locator('#consultation').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 if(!await page.locator('#inquiry-form').isVisible())throw Error('Form invisible');
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);
 if(await page.locator('#route').evaluate(el=>el.classList.contains('route-mobile-scene')))throw Error('Reduced motion runway');
 await page.emulateMedia({reducedMotion:'no-preference'});
 if(errors.length)throw Error(errors.join('\n'));
}
