async(page)=>{
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');
 const result=await page.evaluate(async()=>{
  const bar=document.querySelector('.mobile-actions');const faq=document.querySelector('#faq');scrollTo({top:faq.getBoundingClientRect().top+scrollY,behavior:'instant'});
  await new Promise(r=>setTimeout(r,800));
  const el=document.querySelector('#inquiry-form button[type=submit]');scrollTo({top:el.getBoundingClientRect().top+scrollY-300,behavior:'instant'});
  await new Promise(r=>setTimeout(r,90));
  return {hidden:bar.dataset.hidden,opacity:getComputedStyle(bar).opacity,animations:bar.getAnimations().map(a=>({time:a.currentTime,duration:a.effect.getTiming().duration})),color:getComputedStyle(document.querySelector('.service h3')).color};
 });
 if(result.color!=='rgb(231, 157, 47)')throw Error('Service color '+JSON.stringify(result));
 if(!result.animations.length)throw Error('No exit animation '+JSON.stringify(result));
}
