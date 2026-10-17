async(page)=>{
 await page.setViewportSize({width:390,height:744});
 await page.goto('http://127.0.0.1:4173/?check=transport61');
 await page.waitForFunction(()=>document.querySelector('#route').classList.contains('route-mobile-scene'));
 await page.waitForTimeout(500);
 const g=await page.locator('.route-layout').evaluate(e=>({y:e.getBoundingClientRect().top+scrollY,p:parseFloat(getComputedStyle(e.querySelector('.route-left')).top)}));
 let initialSize;
 for(const stage of [0,3,3.1,4,5,7]){
  await page.evaluate(({g,stage})=>scrollTo(0,g.y-g.p+stage*230+1),{g,stage});
  await page.waitForTimeout(450);
  const state=await page.evaluate(()=>{
   const marker=document.querySelector('#route-traveler'),circle=marker.querySelector('circle').getBoundingClientRect();
   return {size:circle.width,ship:!document.querySelector('#transport-ship').hasAttribute('hidden'),zoom:Number(document.querySelector('.route-camera').getAttribute('transform').match(/scale\(([^)]+)/)[1]),label:document.querySelector('.country-label-ukraine').getAttribute('y')};
  });
  if(stage===0)initialSize=state.size;
  if(Math.abs(state.size-initialSize)>.1)throw Error('Marker changes size '+JSON.stringify(state));
  if(state.ship!==(stage===3.1||stage===4))throw Error('Wrong sea handoff '+JSON.stringify({stage,state}));
  if(stage===7&&(state.zoom<5.1||state.label!=='103'))throw Error('Final framing incorrect '+JSON.stringify(state));
 }
 const boxes=await page.evaluate(()=>{
  const rect=selector=>document.querySelector(selector).getBoundingClientRect().toJSON();
  return {map:rect('.route-map'),story:rect('#route-story'),marker:rect('#route-traveler'),country:rect('.country-ukraine')};
 });
 if(boxes.story.top<boxes.map.top||boxes.story.width>176||boxes.story.height>100||boxes.marker.top<boxes.story.bottom||boxes.country.width<140)throw Error('Map composition incorrect '+JSON.stringify(boxes));
 await page.screenshot({path:'checks/screenshots/route62-ukraine.png'});
}
