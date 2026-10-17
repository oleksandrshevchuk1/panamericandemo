async(page)=>{
 await page.reload();await page.waitForTimeout(200);
 const state=await page.locator('#route-line').evaluate(line=>({dash:parseFloat(getComputedStyle(line).strokeDasharray),length:line.getTotalLength()}));
 if(Math.abs(state.dash-state.length)>.02)throw Error('Wrong route dash '+JSON.stringify(state));
}
