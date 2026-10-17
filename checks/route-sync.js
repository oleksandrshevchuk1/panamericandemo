async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:390,height:744});await page.goto('http://127.0.0.1:4173/');
 const result=await page.evaluate(async()=>{
  const layout=document.querySelector('.route-layout'),line=document.querySelector('#route-line'),traveler=document.querySelector('#route-traveler'),progress=document.querySelector('#route-progress');
  const top=layout.getBoundingClientRect().top+scrollY, length=line.getTotalLength();let maxError=0,maxProgressError=0;
  for(let step=0;step<=28;step++){
   scrollTo({top:top-82+step*57.5,behavior:'instant'});
   await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);
   const offset=parseFloat(getComputedStyle(line).strokeDashoffset),pathPoint=line.getPointAtLength(length-offset),svgPoint=document.querySelector('.route-map .map').createSVGPoint();svgPoint.x=pathPoint.x;svgPoint.y=pathPoint.y;
   const end=svgPoint.matrixTransform(line.getScreenCTM()),matrix=traveler.getScreenCTM();maxError=Math.max(maxError,Math.hypot(end.x-matrix.e,end.y-matrix.f));
   const scale=getComputedStyle(progress).transform,amount=scale==='none'?1:Number(scale.match(/matrix\(([^,]+)/)?.[1]);maxProgressError=Math.max(maxProgressError,Math.abs(amount-(1-offset/length)));
  }
  return {maxError,maxProgressError,lineTransition:getComputedStyle(line).transitionDuration,progressTransition:getComputedStyle(progress).transitionDuration};
 });
 if(result.maxError>.1||result.maxProgressError>.001||result.lineTransition!=='0s'||result.progressTransition!=='0s')throw Error('Route desynchronizes '+JSON.stringify(result));
 if(errors.length)throw Error(errors.join('\n'));
}
