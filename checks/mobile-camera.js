async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const size of [{width:390,height:844},{width:360,height:640}]){
  await page.setViewportSize(size);await page.goto('http://127.0.0.1:4173/');
  const top=await page.locator('.route-layout').evaluate(e=>e.getBoundingClientRect().top+scrollY);
  let prev=null;
  for(const phase of [0,1.4,4.5,7]){
   await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top-82+phase*230+1);await page.waitForTimeout(500);
   const state=await page.evaluate(()=>({camera:document.querySelector('.route-camera').getAttribute('transform'),map:document.querySelector('.route-map').getBoundingClientRect().toJSON(),story:document.querySelector('#route-story').getBoundingClientRect().toJSON(),marker:document.querySelector('#route-traveler').getBoundingClientRect().toJSON(),stage:document.querySelector('#route-current').textContent}));
   if(!state.camera||state.camera===prev)throw Error('Camera static '+JSON.stringify(state));prev=state.camera;
   if(state.map.top<80||state.story.top<state.map.bottom||state.story.bottom>size.height-55)throw Error('Scene clipped '+JSON.stringify({size,state}));
   if(state.marker.left<state.map.left||state.marker.right>state.map.right||state.marker.top<state.map.top||state.marker.bottom>state.map.bottom)throw Error('Transport clipped');
  }
 }
 await page.screenshot({path:'checks/screenshots/mobile-animated-camera-final.png'});
 if(errors.length)throw Error(errors.join('\n'));
}
