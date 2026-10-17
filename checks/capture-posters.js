async (page) => {
  const videos=page.locator('video');
  for(let i=0;i<await videos.count();i++){
    const video=videos.nth(i);
    await video.evaluate(async el=>{
      el.controls=false;el.removeAttribute('poster');el.preload='auto';el.load();
      await new Promise((resolve,reject)=>{el.addEventListener('loadeddata',resolve,{once:true});el.addEventListener('error',reject,{once:true});});
      el.currentTime=Math.min(1,el.duration/2);
      await new Promise(resolve=>el.addEventListener('seeked',resolve,{once:true}));
      el.parentElement.querySelector('button').hidden=true;
    });
    await video.screenshot({path:`assets/panamerican/blog-${i+1}.jpg`,type:'jpeg',quality:85});
  }
  await page.reload();
  console.log('Captured five original video posters.');
}
