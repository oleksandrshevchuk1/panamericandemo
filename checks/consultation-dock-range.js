async(page)=>{
 await page.setViewportSize({width:390,height:744});await page.goto('http://127.0.0.1:4173/');
 async function setView(selector,edge,target,hidden){
  await page.evaluate(({selector,edge,target})=>{const rect=document.querySelector(selector).getBoundingClientRect();scrollTo({top:scrollY+rect[edge]-target,behavior:'instant'});},{selector,edge,target});
  await page.waitForTimeout(650);
  const value=await page.locator('.mobile-actions').getAttribute('aria-hidden');if(value!==String(hidden))throw Error('Wrong visibility '+JSON.stringify({selector,edge,target,hidden,value}));
  if(!await page.locator('.floating-contact').isVisible()||!await page.locator('.floating-chat').isVisible())throw Error('Utility buttons hidden');
 }
 const header=await page.locator('.header').evaluate(e=>e.getBoundingClientRect().bottom);
 await setView('.consult-copy h2','top',754,false);
 await setView('.consult-copy h2','top',700,false);
 await setView('.consult-copy h2','bottom',752,false);
 await setView('.consult-copy h2','bottom',736,true);
 await setView('#inquiry-form button[type=submit]','bottom',header+8,true);
 await setView('#inquiry-form button[type=submit]','bottom',header-8,false);
 await setView('#inquiry-form button[type=submit]','bottom',header+8,true);
 await setView('.consult-copy h2','top',754,false);
 await page.locator('#price').scrollIntoViewIfNeeded();await page.locator('#price').focus();await page.waitForTimeout(500);
 if(await page.locator('.mobile-actions').getAttribute('aria-hidden')!=='false')throw Error('Auction input hides dock');
}
