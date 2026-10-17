async(page)=>{
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const top=await page.locator('.route-layout').evaluate(el=>el.getBoundingClientRect().top+scrollY);
 for(const i of [0,3,7]){
  await page.evaluate(y=>scrollTo(0,y),top-82+i*230+5);await page.waitForTimeout(400);
  const state=await page.evaluate(()=>({stage:document.querySelector('#route-current').textContent,map:document.querySelector('.route-map').getBoundingClientRect().toJSON(),story:document.querySelector('#route-story').getBoundingClientRect().toJSON(),small:getComputedStyle(document.querySelector('.floating-contact')).opacity,hidden:document.body.classList.contains('actions-hidden')}));
  if(!state.stage.startsWith(String(i+1).padStart(2,'0')))throw Error('Wrong stage '+JSON.stringify(state));
  if(state.story.bottom>844-70||state.map.top<70||state.small!=='1'||!state.hidden)throw Error('Scene visibility '+JSON.stringify(state));
 }
 if(errors.length)throw Error(errors.join('\n'));
 await page.screenshot({path:'checks/screenshots/route-mobile-latest.png'});
}
