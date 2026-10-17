async(page)=>{
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');
 const result=await page.locator('.benefit-inline b').evaluateAll(els=>els.map(e=>getComputedStyle(e).color));if(result.some(c=>c!=='rgb(231, 157, 47)'))throw Error('Multiple oranges '+result);
 if(await page.locator('.ambient-art svg').first().getAttribute('preserveAspectRatio')!=='none')throw Error('Mobile background cropping');
 await page.locator('#blog').scrollIntoViewIfNeeded();await page.locator('#video-prev').click();await page.waitForTimeout(650);
 if(!(await page.locator('#video-count').innerText()).startsWith('05'))throw Error('No reverse wrap');
 const dim=await page.locator('.video-track .catalog-prev .video-shell').evaluate(e=>getComputedStyle(e,'::after').opacity);if(dim!=='1')throw Error('Neighbor not dimmed');
 await page.locator('#video-next').click();await page.waitForTimeout(650);if(!(await page.locator('#video-count').innerText()).startsWith('01'))throw Error('No forward wrap');
}
