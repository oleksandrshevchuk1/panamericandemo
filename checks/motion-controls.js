async(page)=>{
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 if((await page.locator('#motion-mini').boundingBox()).width>28)throw Error('Motion control too large');
 await page.locator('#motion-mini').click();if(await page.locator('html').getAttribute('data-motion')!=='off')throw Error('Pause failed');
 await page.locator('#motion-mini').click();if(await page.locator('html').getAttribute('data-motion')!=='on')throw Error('Play failed');
 await page.locator('#faq').scrollIntoViewIfNeeded();await page.waitForTimeout(650);
 const result=await page.evaluate(()=>({duration:getComputedStyle(document.querySelector('.mobile-actions')).transitionDuration,words:document.querySelectorAll('.motion-word').length,background:getComputedStyle(document.querySelector('#faq'),'::before').animationName,ring:getComputedStyle(document.querySelector('.floating-chat'),'::before').animationName}));
 if(!result.duration.includes('0.5s')||result.words<40||result.background!=='ambient-breathe'||result.ring!=='utility-ripple')throw Error(JSON.stringify(result));
 if(errors.length)throw Error(errors.join('\n'));
 await page.screenshot({path:'checks/screenshots/motion-controls-latest.png'});
}
