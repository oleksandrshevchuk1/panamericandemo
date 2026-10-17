async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:1366,height:900});await page.goto('http://127.0.0.1:4173/');await page.locator('#consultation').scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
 const colors=await page.evaluate(()=>({copy:getComputedStyle(document.querySelector('.consult-copy>p:not(.eyebrow)')).color,form:getComputedStyle(document.querySelector('#inquiry-form')).backgroundColor,placeholder:getComputedStyle(document.querySelector('#inquiry-name'),'::placeholder').color}));
 if(colors.copy!=='rgb(16, 61, 59)'||colors.form!=='rgb(244, 246, 241)'||colors.placeholder==='rgb(231, 157, 47)')throw Error(JSON.stringify(colors));
 await page.screenshot({path:'checks/screenshots/consultation-readable-desktop.png'});
 await page.setViewportSize({width:390,height:844});await page.locator('#consultation').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');
 await page.locator('#blog').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 for(let i=0;i<3;i++){await page.locator('#video-next').click();await page.waitForTimeout(600);}
 if(await page.locator('#video-track .video-shell.reveal').count())throw Error('Duplicate video entrance');
 if(errors.length)throw Error(errors.join('\n'));
}
