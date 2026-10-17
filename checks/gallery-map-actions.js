async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{if(window.__galleryAnimationWrapped)return;window.__galleryAnimationWrapped=true;window.galleryAnimations={images:0,heading:0};const original=Element.prototype.animate;Element.prototype.animate=function(...args){if(this.matches('#car-track img'))window.galleryAnimations.images++;if(this.matches('#cars h2'))window.galleryAnimations.heading++;return original.apply(this,args);};});
 await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:4173/');
 await page.evaluate(async()=>{
  const image=document.querySelector('#car-track .catalog-active img'),edge=image.getBoundingClientRect().top+scrollY-innerHeight+12;
  for(let i=0;i<16;i++){scrollTo({top:edge+(i%2?8:-8),behavior:'instant'});await new Promise(r=>setTimeout(r,70));}
 });
 const counts=await page.evaluate(()=>window.galleryAnimations);if(counts.images||counts.heading>1)throw Error('Gallery restarts animations '+JSON.stringify(counts));
 await page.locator('#cars-next').click();await page.waitForTimeout(500);if(!(await page.locator('#gallery-count').innerText()).startsWith('02'))throw Error('Carousel broken');
 await page.setViewportSize({width:390,height:744});await page.goto('http://127.0.0.1:4173/');
 const geometry=await page.locator('.route-layout').evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,pin:parseFloat(getComputedStyle(e.querySelector('.route-left')).top)}));
 let initialZoom=0;
 for(const stage of [0,3,7]){
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),geometry.top-geometry.pin+stage*230+1);await page.waitForTimeout(500);
  const scene=await page.evaluate(()=>({panel:document.querySelector('.route-left').getBoundingClientRect().toJSON(),story:document.querySelector('#route-story').getBoundingClientRect().toJSON(),camera:document.querySelector('.route-camera').getAttribute('transform'),marker:document.querySelector('#route-traveler').getBoundingClientRect().toJSON(),map:document.querySelector('.route-map').getBoundingClientRect().toJSON(),label:document.querySelector('.country-label-ukraine').getBoundingClientRect().toJSON(),stage:document.querySelector('#route-current').textContent}));
  const zoom=Number(scene.camera.match(/scale\(([^)]+)/)[1]);if(stage===0)initialZoom=zoom;
  if(scene.story.bottom>660||scene.map.top<80)throw Error('Scene clipped '+JSON.stringify(scene));
  if(!(scene.stage.startsWith(String(stage+1).padStart(2,'0'))))throw Error('Wrong stage '+scene.stage);
  if(stage===7){if(zoom<2||zoom<=initialZoom||Math.abs(scene.marker.x+scene.marker.width/2-(scene.map.x+scene.map.width/2))>45)throw Error('Not focused on Ukraine');if(scene.label.left<scene.map.left||scene.label.right>scene.map.right)throw Error('Ukraine label clipped');}
 }
 await page.screenshot({path:'checks/screenshots/map-centered-ukraine.png'});
 const input=page.locator('#price');await input.scrollIntoViewIfNeeded();await input.focus();await page.waitForTimeout(600);
 if(await page.locator('.mobile-actions').getAttribute('aria-hidden')!=='false')throw Error('Actions disappear on auction input');
 const submit=page.locator('#inquiry-form button[type=submit]');await submit.scrollIntoViewIfNeeded();await page.waitForTimeout(600);
 if(await page.locator('.mobile-actions').getAttribute('aria-hidden')!=='true')throw Error('Actions duplicate form CTA');
 await page.evaluate(()=>{const button=document.querySelector('#inquiry-form button[type=submit]');scrollTo({top:button.getBoundingClientRect().bottom+scrollY-document.querySelector('.header').getBoundingClientRect().bottom+8,behavior:'instant'});});await page.waitForTimeout(600);
 if(await page.locator('.mobile-actions').getAttribute('aria-hidden')!=='false')throw Error('Actions do not return when CTA exits');
 if(errors.length)throw Error(errors.join('\n'));
}
