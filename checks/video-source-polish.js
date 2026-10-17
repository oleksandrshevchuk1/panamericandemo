async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');
 await page.locator('#blog').scrollIntoViewIfNeeded();await page.waitForTimeout(800);
 if(await page.locator('.video-card>a').count())throw Error('Moving source link remains');
 if(await page.locator('.video-card video[controls]').count())throw Error('Idle control bars remain');
 const before=await page.locator('#video-source').evaluate(e=>({y:e.getBoundingClientRect().top+scrollY}));await page.locator('#video-next').click();await page.waitForTimeout(700);const after=await page.locator('#video-source').evaluate(e=>({y:e.getBoundingClientRect().top+scrollY}));
 if(Math.abs(before.y-after.y)>1)throw Error('Source moved '+JSON.stringify({before,after}));
 const frame=await page.locator('.video-card.catalog-active video').evaluate(video=>({actual:video.videoWidth/video.videoHeight,frame:video.getBoundingClientRect().width/video.getBoundingClientRect().height}));
 if(Math.abs(frame.actual-frame.frame)>.03)throw Error('Video letterboxing '+JSON.stringify(frame));
 await page.locator('#consultation').scrollIntoViewIfNeeded();await page.waitForTimeout(700);
 if(await page.locator('.consult-copy h2').evaluate(e=>getComputedStyle(e).color)!=='rgb(255, 255, 255)')throw Error('Heading is not white');
 if(errors.length)throw Error(errors.join('\n'));
 await page.screenshot({path:'checks/screenshots/consultation-white-copy.png'});
}
