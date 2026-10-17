async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');
 await page.locator('#cars').scrollIntoViewIfNeeded();await page.locator('#cars-next').click();await page.waitForTimeout(650);
 if(!(await page.locator('#gallery-count').innerText()).startsWith('02'))throw Error('Wrong car index');
 await page.locator('#blog').scrollIntoViewIfNeeded();await page.locator('#video-next').click();await page.waitForTimeout(650);
 if(!(await page.locator('#video-count').innerText()).startsWith('02'))throw Error('Wrong video index');
 const cards=await page.locator('.video-card').evaluateAll(els=>els.slice(0,3).map(e=>e.getBoundingClientRect().toJSON()));
 if(cards[0].right<=0||cards[2].left>=390)throw Error('No side previews '+JSON.stringify(cards));
 await page.locator('#motion-mini').click();
 const top=await page.locator('.route-layout').evaluate(e=>e.getBoundingClientRect().top+scrollY);
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top-82+1615);await page.waitForTimeout(150);
 if(!(await page.locator('#route-current').innerText()).startsWith('08'))throw Error('Route stops with effects disabled');
 await page.locator('#site-footer').scrollIntoViewIfNeeded();
 const columns=await page.locator('.footer-top>div').evaluateAll(els=>els.slice(1).map(e=>e.getBoundingClientRect().toJSON()));
 if(Math.abs(columns[0].top-columns[1].top)>1||columns[1].left<=columns[0].left)throw Error('Footer not columns');
 await page.screenshot({path:'checks/screenshots/footer-columns-final.png'});
 if(errors.length)throw Error(errors.join('\n'));
}
