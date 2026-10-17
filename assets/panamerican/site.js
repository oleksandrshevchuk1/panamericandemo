'use strict';
document.documentElement.classList.add('js');
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let animationsEnabled = true; // Start animated; the visible pause control is the user override.
const money = value => new Intl.NumberFormat('uk-UA',{maximumFractionDigits:0}).format(value)+' $';
const clamp = (value,min=0,max=1) => Math.max(min,Math.min(max,value));
function invalidateInquiry(){
 $('#form-message').hidden=true;$('#prepared-inquiry').value='';$('#email-inquiry').href='mailto:pan.americanlviv@gmail.com';
}
const nav=$('#navigation'),menu=$('.menu-toggle');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Відкрити меню');}
menu.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрити меню':'Відкрити меню');if(open&&animationsEnabled){nav.getAnimations().forEach(a=>a.cancel());nav.animate([{opacity:0,transform:'translateY(-10px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'cubic-bezier(.22,1,.36,1)'});[...nav.querySelectorAll('a')].forEach((link,i)=>{link.getAnimations().forEach(a=>a.cancel());link.animate([{opacity:0,transform:'translateY(-6px)'},{opacity:1,transform:'translateY(0)'}],{duration:230,delay:25+i*30,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});});}});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
let navArrival=null;
$$('.nav a,.footer-links a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{
 const target=document.querySelector(link.getAttribute('href')),heading=target?.querySelector('h1,h2');
 nav.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===link.getAttribute('href'))a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
 if(!heading||!animationsEnabled||!('IntersectionObserver'in window))return;
 if(navArrival)navArrival.disconnect();
 navArrival=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;navArrival.disconnect();heading.getAnimations().forEach(a=>a.cancel());heading.animate([{opacity:.3,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.22,1,.36,1)'});},{threshold:.6});navArrival.observe(heading);
}));
$('#current-year').textContent=String(new Date().getFullYear());
const currentYear=new Date().getFullYear();
if(![...$('#year').options].some(o=>Number(o.value)===currentYear)){
 const option=new Option(String(currentYear),String(currentYear));$('#year').prepend(option);
}

// Preserve semantic emphasis and natural wrapping while revealing headline words.
$$('main h1,main h2').forEach(heading=>{
 const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);const nodes=[];
 while(walker.nextNode())nodes.push(walker.currentNode);
 let index=0;
 nodes.forEach(node=>{const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(part=>{
  if(!part)return;if(/^\s+$/.test(part)){fragment.append(document.createTextNode(part));return;}
  const word=document.createElement('span');word.className='motion-word';word.textContent=part;word.style.setProperty('--word-index',index++);fragment.append(word);
 });node.replaceWith(fragment);});
});
// The original page's IntersectionObserver / Web Animations entrance system,
// restyled with quieter movement and no rotation or split-word effects.
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  const el=entry.target;
  if(!entry.isIntersecting){el.dataset.inView='false';return;}
  if(el.dataset.inView==='true')return;el.dataset.inView='true';el.classList.remove('pending');
  if(animationsEnabled)el.querySelectorAll('.motion-word').forEach((word,i)=>{word.getAnimations().forEach(a=>a.cancel());word.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:Math.min(i*60,480),easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});});
  if(animationsEnabled){
   const siblings=[...el.parentElement.children].filter(child=>child.classList.contains('reveal')),index=Math.max(0,siblings.indexOf(el));
   const media=el.matches('img,.hero-art,.video-shell,.office-map'),card=el.matches('.service,.review,.office,.benefit-inline>div'),heading=el.matches('h1,h2');
   const frames=media?[{opacity:0,clipPath:'inset(12% 7% 12% 7% round 18px)',transform:'scale(.96)'},{opacity:1,clipPath:'inset(0% 0% 0% 0% round 0px)',transform:'scale(1)'}]:card?[{opacity:0,transform:`translateX(${index%2?22:-22}px) rotate(${index%2?.6:-.6}deg)`},{opacity:1,transform:'translateX(0) rotate(0deg)'}]:heading?[{opacity:0},{opacity:1}]:[{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}];
   el.getAnimations().forEach(a=>a.cancel());el.animate(frames,{duration:media?900:card?650:500,delay:Math.min(index*85,255),easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
  }
 }),{threshold:.05,rootMargin:'0px 0px -8px 0px'});
 $$('.reveal,.footer-top>div,.footer-socials,.footer-wordmark,.hero-proof,.route-heading h2,.service,.benefit-inline>div,.faq details,.office,.review,.customer-strip img,.calc-group,.about-copy>p,main h1,main h2,.section-head>p,.consult-copy>p,.car-image img,.office-map,.hero-copy>p,.hero-actions').forEach(el=>{el.classList.add('reveal');if(animationsEnabled)el.classList.add('pending');observer.observe(el);});
}

// Scroll-synchronised gallery, retaining arrows, swipes and keyboard controls.
const gallery=$('.gallery-shell'),track=$('#car-track'),cards=$$('.car');
let galleryIndex=0;
function renderGallery(index){
 galleryIndex=clamp(index,0,cards.length-1);
 $('#gallery-count').textContent=String(galleryIndex+1).padStart(2,'0')+' / '+String(cards.length);
 cards.forEach((card,i)=>card.classList.toggle('native-active',i===galleryIndex));
 if(gallery.classList.contains('scroll-gallery')){
  cards.forEach((card,i)=>{
   const offset=i-galleryIndex;
   card.style.setProperty('--offset',String(offset));
   card.classList.toggle('is-active',offset===0);
   card.inert=offset!==0;
   card.setAttribute('aria-hidden',String(offset!==0));
  });
 }
 $('#cars-prev').disabled=track.classList.contains('kent-catalog')?false:galleryIndex===0;$('#cars-next').disabled=track.classList.contains('kent-catalog')?false:galleryIndex===cards.length-1;
 if(track.classList.contains('kent-catalog'))paintKentCatalog(track,cards,galleryIndex);
}
function galleryStep(index){
 const next=track.classList.contains('kent-catalog')?((index%cards.length)+cards.length)%cards.length:clamp(index,0,cards.length-1);
 if(gallery.classList.contains('scroll-gallery')){
  const top=gallery.getBoundingClientRect().top+scrollY;
  const span=gallery.offsetHeight-$('.gallery-pin').offsetHeight;
  window.scrollTo({top:top+span*((next+.1)/cards.length),behavior:animationsEnabled?'smooth':'instant'});
 }else if(!track.classList.contains('kent-catalog'))track.scrollTo({left:cards[next].offsetLeft-track.offsetLeft-parseFloat(getComputedStyle(track).paddingLeft),behavior:animationsEnabled?'smooth':'instant'});
 renderGallery(next);
}
function syncGalleryMode(){
 const supported=false; // Horizontal browsing on desktop and touch screens alike.
 gallery.classList.toggle('scroll-gallery',supported);
 if(!supported)cards.forEach(card=>{card.inert=false;card.removeAttribute('aria-hidden');card.classList.remove('is-active');});
 renderGallery(galleryIndex);
}
$('#cars-prev').addEventListener('click',()=>galleryStep(galleryIndex-1));
$('#cars-next').addEventListener('click',()=>galleryStep(galleryIndex+1));
track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();galleryStep(galleryIndex+(e.key==='ArrowRight'?1:-1));}});
let swipeX=0,swipeY=0;
track.addEventListener('touchstart',e=>{swipeX=e.touches[0].clientX;swipeY=e.touches[0].clientY;},{passive:true});
track.addEventListener('touchend',e=>{if(!gallery.classList.contains('scroll-gallery'))return;const dx=e.changedTouches[0].clientX-swipeX,dy=e.changedTouches[0].clientY-swipeY;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))galleryStep(galleryIndex+(dx<0?1:-1));},{passive:true});
track.addEventListener('scroll',()=>{if(track.classList.contains('kent-catalog')||gallery.classList.contains('scroll-gallery'))return;let best=0,distance=Infinity;cards.forEach((card,i)=>{const d=Math.abs(card.offsetLeft-track.offsetLeft-track.scrollLeft-parseFloat(getComputedStyle(track).paddingLeft));if(d<distance){distance=d;best=i;}});if(track.scrollLeft+track.clientWidth>=track.scrollWidth-2)best=cards.length-1;renderGallery(best);},{passive:true});
syncGalleryMode();

// Original geographic SVG, camera-follow and car/ship handoff; eight PA stages.
const route=$('#route'),routeSteps=$$('.route-step'),line=$('#route-line'),traveler=$('#route-traveler'),map=$('.route-map .map');
const length=line.getTotalLength();line.setAttribute('stroke-dasharray',String(length));
const routePoints=Array.from({length:257},(_,index)=>{const point=line.getPointAtLength(length*index/256);return {x:point.x,y:point.y};});
const scenes=[
 ['США · аукціон','Знайдемо ваше авто','Узгоджуємо побажання й бюджет, перевіряємо історію та обираємо лоти.','audi_q7.webp'],
 ['Україна · договір','Усе починається з довіри','Підписуємо договір. Гарантійний платіж 500 $ враховується у вартості автомобіля.','image1.webp'],
 ['США · торги','Ваш лот. Наша робота.','Перевіряємо Carfax і торгуємося за погоджений автомобіль у межах вашого бюджету.','bmw_540.webp'],
 ['США · порт відправлення','Куплено. Рушаємо до порту.','Організовуємо перевезення з майданчика та готуємо авто до морської доставки.','company-cloud.82f68fcf0442fac041d1.webp'],
 ['Атлантика · у дорозі','Через океан, ближче до вас','Автомобіль прямує до Європи. Ви отримуєте інформацію про доставку та фотозвіти.','company-cloud.82f68fcf0442fac041d1.webp'],
 ['Європа · порт прибуття','Знову на суші','Розвантажуємо автомобіль і готуємо його до відправлення в Україну.','ford_f150_raptor.webp'],
 ['Україна · митне оформлення','Документи під контролем','Брокер готує документи й квитанції. Автомобіль проходить митне оформлення.','image2.webp'],
 ['Ваше місто · передача','Тепер — ваш маршрут','Погоджена підготовка завершена. Автомобіль їде у ваше місто.','image4.webp']
];
const scenePositions=[0,.015,.06,.16,.60,.88,.95,1];
let lastStage=-1,routeMobile=false,routeFrame=0,routePosition=0,routeTarget=0,routeCameraPhase=0;
const routeCamera=document.createElementNS('http://www.w3.org/2000/svg','g');routeCamera.classList.add('route-camera');
[...map.children].filter(node=>!['defs','title','desc'].includes(node.tagName.toLowerCase())).forEach(node=>routeCamera.append(node));map.append(routeCamera);
let cameraTransform='';
function setRouteStage(index){
 if(index===lastStage)return;
 lastStage=index;
 routeSteps.forEach((step,i)=>{step.classList.toggle('active',i===index);if(i===index)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current');});
 $$('#route-dots button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
 $('#route-prev').disabled=index===0;$('#route-next').disabled=index===7;
 const scene=scenes[index];$('#route-current').textContent=String(index+1).padStart(2,'0')+' / 08 · '+routeSteps[index].querySelector('h3').textContent;
 // Progress is painted with the route and traveler from the same scroll position.
 $('#route-place').textContent=scene[0];$('#route-title').textContent=scene[1];$('#route-description').textContent=scene[2];
 $('#route-photo').src='assets/panamerican/'+scene[3];$('#route-photo').alt=scene[1];
 $('#transport-car').toggleAttribute('hidden',index===4);$('#transport-ship').toggleAttribute('hidden',index!==4);
 if(animationsEnabled){$('#route-story').getAnimations().forEach(a=>a.cancel());$('#route-story').animate([{opacity:0,transform:routeMobile?'translateY(18px) scale(.98)':'translateY(8px)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});}
}
function paintRoute(position){
 const sample=clamp(position)*256,index=Math.min(255,Math.floor(sample)),fraction=sample-index;
 const point={x:routePoints[index].x+(routePoints[index+1].x-routePoints[index].x)*fraction,y:routePoints[index].y+(routePoints[index+1].y-routePoints[index].y)*fraction};
 line.setAttribute('stroke-dashoffset',String(length*(1-position)));
 $('#route-progress').style.transform=`scaleX(${position})`;
 // Transport follows the path; a transform-only mobile camera follows scroll progress.
 traveler.setAttribute('transform',`translate(${point.x} ${point.y}) scale(.85)`);
 if(routeMobile&&animationsEnabled){
  const zooms=[1,1.025,1.04,1.045,1.02,1.035,1.045,1],stage=Math.min(6,Math.floor(routeCameraPhase)),t=clamp(routeCameraPhase-stage),ease=t*t*(3-2*t);
  const zoom=zooms[stage]+(zooms[stage+1]-zooms[stage])*ease;
  const halfWidth=375/zoom,halfHeight=140/zoom;
  // Keep both countries and their labels in the frame while the camera moves.
  const centerX=clamp(point.x,750-halfWidth,34+halfWidth),centerY=clamp(point.y-12,-20+halfHeight,260-halfHeight);
  const transform=`translate(${(390-centerX*zoom).toFixed(2)} ${(120-centerY*zoom).toFixed(2)}) scale(${zoom.toFixed(4)})`;
  if(transform!==cameraTransform){routeCamera.setAttribute('transform',transform);cameraTransform=transform;}
 }else if(cameraTransform){routeCamera.removeAttribute('transform');cameraTransform='';}

}
function moveRoute(target){
 routeTarget=clamp(target);routePosition=routeTarget;
 if(routeFrame){cancelAnimationFrame(routeFrame);routeFrame=0;}
 paintRoute(routePosition);
}
function syncRouteMode(){
 routeMobile=matchMedia('(max-width: 900px)').matches;
 route.classList.toggle('route-mobile',routeMobile);
 route.classList.toggle('route-mobile-scene',routeMobile&&innerHeight>=480);
 map.setAttribute('viewBox','15 -20 750 280');
 const usa=map.querySelector('.country-label-usa'),ukraine=map.querySelector('.country-label-ukraine');
 usa.setAttribute('x','310');usa.setAttribute('y','157');ukraine.setAttribute('x','698');ukraine.setAttribute('y','135');ukraine.setAttribute('text-anchor','middle');
 map.querySelectorAll('.map-label').forEach(el=>el.style.fontSize='18px');
 map.querySelector('.ocean-label').style.opacity='.7';
 const firstScene=lastStage<0;setRouteStage(firstScene?0:lastStage);moveRoute(firstScene?0:routePosition);
}
function selectRouteStage(index){
 const next=clamp(index,0,7);routeCameraPhase=next;setRouteStage(next);moveRoute(scenePositions[next]);
 if(route.classList.contains('route-mobile-scene')){const layout=$('.route-layout');window.scrollTo({top:layout.getBoundingClientRect().top+scrollY-82+next*230,behavior:animationsEnabled?'smooth':'instant'});}
 else if(!routeMobile){const step=routeSteps[next];window.scrollTo({top:step.getBoundingClientRect().top+scrollY-innerHeight*.36,behavior:animationsEnabled?'smooth':'instant'});}
}
$('#route-prev').addEventListener('click',()=>selectRouteStage(lastStage-1));
$('#route-next').addEventListener('click',()=>selectRouteStage(lastStage+1));
$$('#route-dots button').forEach(button=>button.addEventListener('click',()=>selectRouteStage(Number(button.dataset.routeStep))));
let routeSwipeX=0,routeSwipeY=0;
$('.route-map').addEventListener('touchstart',e=>{routeSwipeX=e.touches[0].clientX;routeSwipeY=e.touches[0].clientY;},{passive:true});
$('.route-map').addEventListener('touchend',e=>{if(!routeMobile)return;const dx=e.changedTouches[0].clientX-routeSwipeX,dy=e.changedTouches[0].clientY-routeSwipeY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))selectRouteStage(lastStage+(dx<0?1:-1));},{passive:true});
$('.route-map').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();selectRouteStage(lastStage+(e.key==='ArrowRight'?1:-1));}});
function updateRoute(){
 if(routeMobile){
  if(route.classList.contains('route-mobile-scene')){
   const rect=$('.route-layout').getBoundingClientRect();
   if(rect.top>innerHeight||rect.bottom<0)return;
   const progress=clamp((82-rect.top)/230,0,7);routeCameraPhase=progress;
   const index=Math.min(7,Math.floor(progress+.001));
   setRouteStage(index);
   const fraction=progress-index;
   moveRoute(animationsEnabled?scenePositions[index]+((scenePositions[Math.min(7,index+1)]-scenePositions[index])*fraction):scenePositions[index]);
  }
  return;
 }
 const rect=route.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight){if(routeFrame){cancelAnimationFrame(routeFrame);routeFrame=0;}return;}
 const readingLine=innerHeight*.43;
 let index=0;routeSteps.forEach((step,i)=>{if(step.getBoundingClientRect().top<=readingLine)index=i;});
 setRouteStage(index);moveRoute(scenePositions[index]);
}
let scrollQueued=false;
function onScroll(){if(scrollQueued)return;scrollQueued=true;requestAnimationFrame(()=>{
 if(gallery.classList.contains('scroll-gallery')){
  const rect=gallery.getBoundingClientRect(),span=gallery.offsetHeight-$('.gallery-pin').offsetHeight;
  if(rect.bottom>0&&rect.top<innerHeight)renderGallery(Math.min(cards.length-1,Math.floor(clamp(-rect.top/span)*cards.length)));
 }
 updateActionVisibility();updateRoute();scrollQueued=false;
});}
window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',()=>{syncGalleryMode();syncRouteMode();onScroll();});
const motionButton=$('#motion-toggle');
function syncMotion(){const mini=$('#motion-mini');mini.setAttribute('aria-pressed',String(animationsEnabled));mini.title=animationsEnabled?'Вимкнути анімації':'Увімкнути анімації';mini.setAttribute('aria-label',animationsEnabled?'Вимкнути анімації':'Увімкнути анімації');$('#motion-mini-label').textContent=animationsEnabled?'Рух увімкнено':'Увімкнути рух';motionButton.setAttribute('aria-pressed',String(animationsEnabled));motionButton.textContent=animationsEnabled?'Призупинити анімації':'Увімкнути анімації';document.documentElement.dataset.motion=animationsEnabled?'on':'off';syncGalleryMode();syncRouteMode();updateRoute();}
function toggleMotion(){animationsEnabled=!animationsEnabled;if(!animationsEnabled){document.getAnimations().forEach(a=>a.cancel());$$('.pending').forEach(el=>el.classList.remove('pending'));}syncMotion();}
motionButton.addEventListener('click',toggleMotion);$('#motion-mini').addEventListener('click',toggleMotion);
reduced.addEventListener('change',()=>{document.documentElement.dataset.reducedMotion=String(reduced.matches);});
syncMotion();onScroll();

// Native local video playback; only one reel plays at a time.
$$('.video-cover').forEach(button=>button.addEventListener('click',async()=>{
 const video=button.parentElement.querySelector('video');video.controls=true;
 $$('video').forEach(other=>{if(other!==video)other.pause();});
 try{await video.play();button.hidden=true;}catch{button.hidden=true;video.controls=true;}
}));
$$('video').forEach(video=>video.addEventListener('play',()=>{$$('video').forEach(other=>{if(other!==video)other.pause();});video.parentElement.querySelector('.video-cover').hidden=true;}));

// A second native snap carousel: full cards on phones, smooth buttons and keyboard.
const videoTrack=$('#video-track'),videoCards=$$('.video-card');let videoIndex=0;
function renderVideoIndex(index){
 videoIndex=clamp(index,0,videoCards.length-1);
 $('#video-source').href=videoCards[videoIndex].dataset.source;
 $('#video-count').textContent=String(videoIndex+1).padStart(2,'0')+' / '+String(videoCards.length).padStart(2,'0');
 $('#video-prev').disabled=videoTrack.classList.contains('kent-catalog')?false:videoIndex===0;$('#video-next').disabled=videoTrack.classList.contains('kent-catalog')?false:videoIndex===videoCards.length-1;
 if(videoTrack.classList.contains('kent-catalog'))paintKentCatalog(videoTrack,videoCards,videoIndex);
 videoCards.forEach((card,i)=>{card.classList.toggle('video-active',i===videoIndex);const video=card.querySelector('video');if(i!==videoIndex&&!video.paused)video.pause();});
}
function scrollVideo(index){
 const next=videoTrack.classList.contains('kent-catalog')?((index%videoCards.length)+videoCards.length)%videoCards.length:clamp(index,0,videoCards.length-1);
 if(videoTrack.classList.contains('kent-catalog')){renderVideoIndex(next);return;}
 videoTrack.scrollTo({left:videoCards[next].offsetLeft-videoTrack.offsetLeft-parseFloat(getComputedStyle(videoTrack).paddingLeft),behavior:animationsEnabled?'smooth':'instant'});
 renderVideoIndex(next);
}
$('#video-prev').addEventListener('click',()=>scrollVideo(videoIndex-1));$('#video-next').addEventListener('click',()=>scrollVideo(videoIndex+1));
videoTrack.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();scrollVideo(videoIndex+(event.key==='ArrowRight'?1:-1));}});
videoTrack.addEventListener('scroll',()=>{
 if(videoTrack.classList.contains('kent-catalog'))return;
 let index=0,distance=Infinity;
 videoCards.forEach((card,i)=>{const d=Math.abs(card.offsetLeft-videoTrack.offsetLeft-videoTrack.scrollLeft-parseFloat(getComputedStyle(videoTrack).paddingLeft));if(d<distance){index=i;distance=d;}});
 if(videoTrack.scrollLeft+videoTrack.clientWidth>=videoTrack.scrollWidth-2)index=videoCards.length-1;
 renderVideoIndex(index);
},{passive:true});
renderVideoIndex(0);

// Calculator model, source line items and transfer into the inquiry.
let estimate=null,estimateData=null;
const calcForm=$('#calculator-form');
function renderEstimate(reveal=false){
 $('#calc-error').hidden=true;
 const electric=$('#fuel').value==='elec';$('#engine').disabled=electric;$('#engine').required=!electric;
 if(!calcForm.checkValidity()){estimate=null;estimateData=null;$('#calc-empty').hidden=false;$('#calc-output').hidden=true;$('#calc-inline-total').textContent='—';return;}
 try{
  const data=Object.fromEntries(new FormData(calcForm));estimate=calculatePanAmerican(data);estimateData=data;
  const root=$('#calc-breakdown');root.replaceChildren();
  estimate.groups.forEach((group,i)=>{
   const section=document.createElement('section');section.className='calc-group';const heading=document.createElement('h3');heading.textContent=String(i+1).padStart(2,'0')+' / '+group.title;section.append(heading);
   const dl=document.createElement('dl');group.items.forEach(([label,value])=>{const row=document.createElement('div');row.className='calc-row';const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=money(value);row.append(dt,dd);dl.append(row);});section.append(dl);
   const subtotal=document.createElement('div');subtotal.className='calc-subtotal';const label=document.createElement('span'),value=document.createElement('span');label.textContent='Разом';value.textContent=money(group.total);subtotal.append(label,value);section.append(subtotal);root.append(section);
  });
  $('#calc-total').textContent=money(estimate.total);$('#calc-inline-total').textContent=money(estimate.total);$('#calc-warning').hidden=!estimate.feeUnspecified;$('#calc-empty').hidden=true;$('#calc-output').hidden=false;
  if(reveal&&innerWidth<=900)$('#calc-result').scrollIntoView({behavior:animationsEnabled?'smooth':'instant',block:'start'});
 }catch(error){estimate=null;estimateData=null;$('#calc-empty').hidden=false;$('#calc-output').hidden=true;$('#calc-inline-total').textContent='—';$('#calc-error').textContent=error.message;$('#calc-error').hidden=false;}

}
function editEstimate(){
 invalidateInquiry();
 if($('#form-context').dataset.source==='calculator'){$('#form-context').hidden=true;$('#form-context').textContent='';delete $('#form-context').dataset.source;}
 renderEstimate(false);
}
calcForm.addEventListener('input',editEstimate);
calcForm.addEventListener('submit',e=>{e.preventDefault();renderEstimate(true);});
renderEstimate(false);
$('#calc-consult').addEventListener('click',()=>{
 if(!estimate)return;
 invalidateInquiry();
 const car=[estimateData.make,estimateData.model,estimateData.year].filter(Boolean).join(' ');
 if(car)$('#inquiry-car').value=car;
 $('#form-context').textContent=`Орієнтовний бюджет: ${money(estimate.total)} без ремонту. Лот ${money(Number(estimateData.price))} · ${estimateData.auction} · ${$('#fuel').selectedOptions[0].textContent} · ${$('#car-type').selectedOptions[0].textContent}.`;
 $('#form-context').dataset.source='calculator';$('#form-context').hidden=false;
});
$$('.car-inquiry').forEach(link=>link.addEventListener('click',()=>{invalidateInquiry();$('#inquiry-car').value=link.dataset.model;$('#form-context').hidden=true;delete $('#form-context').dataset.source;}));
$$('.service-inquiry').forEach(link=>link.addEventListener('click',()=>{invalidateInquiry();$('#form-context').textContent='Цікавить послуга: '+link.dataset.service;$('#form-context').dataset.source='service';$('#form-context').hidden=false;}));

const inquiry=$('#inquiry-form');
inquiry.addEventListener('input',invalidateInquiry);
inquiry.addEventListener('submit',e=>{
 e.preventDefault();const data=Object.fromEntries(new FormData(inquiry)),digits=data.phone.replace(/\D/g,'');
 $('#inquiry-phone').setCustomValidity(digits.length<10||digits.length>15||!/^\+?[\d()\s-]+$/.test(data.phone.trim())?'Вкажіть коректний номер телефону.':'');
 $('#inquiry-name').setCustomValidity(data.name.trim()?'':'Вкажіть ваше ім’я.');$('#inquiry-car').setCustomValidity(data.car.trim()?'':'Вкажіть бажане авто.');
 if(!inquiry.reportValidity())return;
 const context=$('#form-context').hidden?'':$('#form-context').textContent;
 const text=`Вітаю, Pan American!\nІм’я: ${data.name.trim()}\nТелефон: ${data.phone.trim()}\nБажане авто: ${data.car.trim()}\n${data.comment.trim()?'Побажання: '+data.comment.trim()+'\n':''}${context}`;
 $('#prepared-inquiry').value=text;$('#email-inquiry').href='mailto:pan.americanlviv@gmail.com?subject='+encodeURIComponent('Підбір авто · Pan American')+'&body='+encodeURIComponent(text);$('#form-message').hidden=false;$('#copy-inquiry').textContent='Скопіювати текст';
});
$$('#inquiry-phone,#inquiry-name,#inquiry-car').forEach(input=>input.addEventListener('input',()=>input.setCustomValidity('')));
$('#copy-inquiry').addEventListener('click',async()=>{
 const area=$('#prepared-inquiry');
 try{await navigator.clipboard.writeText(area.value);$('#copy-inquiry').textContent='Скопійовано ✓';}
 catch{area.focus();area.select();$('#copy-inquiry').textContent='Текст виділено — скопіюйте';}
});
$$('.faq details').forEach(details=>details.addEventListener('toggle',()=>{if(details.open&&animationsEnabled)details.querySelector('p').animate([{opacity:0,transform:'translateY(-5px)'},{opacity:1,transform:'translateY(0)'}],{duration:250,easing:'ease-out'});}));

// Keep vehicle condition details available without expanding the pinned scene.
const carDialog=$('#car-dialog');
$$('.car-details-button').forEach(button=>button.addEventListener('click',()=>{
 const card=button.closest('.car');
 $('#car-dialog-title').textContent=card.querySelector('h3').textContent;
 $('#car-dialog-specs').textContent=card.querySelector('.car-specs').textContent;
 $('#car-dialog-condition').textContent=card.querySelector('details p').textContent;
 carDialog.showModal();
}));
$('#car-dialog-close').addEventListener('click',()=>carDialog.close());
carDialog.addEventListener('click',event=>{const rect=carDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)carDialog.close();});

// Anchor destinations align actual section content below the current header.
document.addEventListener('click',event=>{
 const link=event.target.closest('a[href^="#"]');if(!link)return;
 const href=link.getAttribute('href');if(!href||href==='#')return;
 const target=document.getElementById(href.slice(1));if(!target)return;
 event.preventDefault();
 const headerHeight=$('.header').getBoundingClientRect().height;
 const contentPadding=parseFloat(getComputedStyle(target).paddingTop)||0;
 const top=href==='#home'?0:target.getBoundingClientRect().top+scrollY+contentPadding-headerHeight-18;
 if(location.hash!==href)history.pushState(null,'',href);
 window.scrollTo({top:Math.max(0,top),behavior:animationsEnabled?'smooth':'instant'});
});

const contactDialog=$('#contact-dialog'),contactOpen=$('#contact-open');
contactOpen.addEventListener('click',()=>{
 if($('#social-popover').matches(':popover-open'))$('#social-popover').hidePopover();
 contactDialog.showModal();contactOpen.setAttribute('aria-expanded','true');
 if(animationsEnabled){contactDialog.animate([{opacity:0,transform:'translateY(14px) scale(.96)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:260,easing:'cubic-bezier(.22,1,.36,1)'});contactDialog.querySelector('.contact-dialog-body').animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,delay:60,easing:'ease-out',fill:'backwards'});}
});
function closeContact(){
 if(!contactDialog.open)return;
 if(animationsEnabled){contactDialog.getAnimations().forEach(a=>a.cancel());const animation=contactDialog.animate([{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(8px) scale(.98)'}],{duration:150,easing:'ease-out'});animation.finished.then(()=>contactDialog.close()).catch(()=>{});}else contactDialog.close();
}
$('#contact-close').addEventListener('click',closeContact);
contactDialog.addEventListener('cancel',event=>{event.preventDefault();closeContact();});
contactDialog.addEventListener('close',()=>contactOpen.setAttribute('aria-expanded','false'));
contactDialog.addEventListener('click',event=>{const rect=contactDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeContact();});


// Keep utility controls available; hide only the duplicate mobile CTA bar.
function updateActionVisibility(){
 const bar=$('.mobile-actions');if(!bar)return;
 const headerBottom=$('.header').getBoundingClientRect().bottom;
 const scene=$('.route-left').getBoundingClientRect();
 const routeVisible=scene.top<innerHeight-60&&scene.bottom>headerBottom+50;
 const inlineCTA=!routeVisible&&$$('main .btn').some(button=>{
  const rect=button.getBoundingClientRect();
  return rect.width>0&&rect.top>=headerBottom&&rect.bottom<=innerHeight-18;
 });
 const editing=!!document.activeElement?.matches('input,textarea,select');
 const hidden=innerWidth<=600&&(routeVisible||inlineCTA||editing);
 if(bar.dataset.hidden!==String(hidden)){
  const from=getComputedStyle(bar),start={opacity:from.opacity,transform:from.transform};
  bar.getAnimations().forEach(animation=>animation.cancel());
  document.body.classList.toggle('actions-hidden',hidden);
  bar.dataset.hidden=String(hidden);
  if(animationsEnabled&&innerWidth<=600){
   bar.animate([start,{opacity:hidden?0:1,transform:hidden?'translate3d(0,110%,0)':'translate3d(0,0,0)'}],{duration:hidden?420:550,easing:'cubic-bezier(.22,1,.36,1)'});
   if(!hidden)bar.querySelectorAll('.btn').forEach((button,index)=>button.animate([{opacity:.3,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,delay:70+index*60,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
  }
 }
 bar.inert=hidden;bar.setAttribute('aria-hidden',String(hidden));
}
document.addEventListener('focusin',onScroll);document.addEventListener('focusout',onScroll);

// Visible route-inspired background artwork, independent of the sticky map.
$$('main>section,.footer').forEach((section,index)=>{
 const layer=document.createElement('div');layer.className='ambient-art';layer.setAttribute('aria-hidden','true');
 layer.innerHTML=`<svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice"><circle class="ambient-orb" cx="${index%2?850:110}" cy="180" r="190"/><circle class="ambient-halo" cx="${index%2?100:900}" cy="510" r="230"/><path class="ambient-road" d="M-120 520 C170 130 310 720 610 360 S940 80 1130 260"/><path class="ambient-dash" d="M-120 520 C170 130 310 720 610 360 S940 80 1130 260"/><circle class="ambient-node" cx="610" cy="360" r="6"/></svg>`;
 const adaptArtwork=()=>{
  const svg=layer.querySelector('svg');svg.setAttribute('preserveAspectRatio','xMidYMid slice');
  svg.setAttribute('viewBox',innerWidth<=600?'0 0 420 700':'0 0 1000 700');
  const mobile=innerWidth<=600;
  svg.querySelector('.ambient-orb').setAttribute('cx',mobile?(index%2?380:35):(index%2?850:110));
  svg.querySelector('.ambient-orb').setAttribute('r',mobile?'125':'190');
  svg.querySelector('.ambient-halo').setAttribute('cx',mobile?(index%2?30:410):(index%2?100:900));
  svg.querySelector('.ambient-halo').setAttribute('r',mobile?'150':'230');
  const path=mobile?'M-50 460 C65 220 165 620 280 355 S390 150 470 230':'M-120 520 C170 130 310 720 610 360 S940 80 1130 260';
  svg.querySelectorAll('.ambient-road,.ambient-dash').forEach(line=>line.setAttribute('d',path));
  svg.querySelector('.ambient-node').setAttribute('cx',mobile?'280':'610');
  svg.querySelector('.ambient-node').setAttribute('cy',mobile?'355':'360');
 };
 adaptArtwork();window.addEventListener('resize',adaptArtwork,{passive:true});
 section.prepend(layer);
});
const socialMenu=$('#social-popover'),socialButton=$('.floating-contact');
function positionSocialMenu(){
 const anchor=socialButton.getBoundingClientRect(),viewport=window.visualViewport;
 const topEdge=viewport?.offsetTop||0,bottomEdge=topEdge+(viewport?.height||innerHeight);
 const width=Math.min(230,innerWidth-32);socialMenu.style.width=width+'px';const height=socialMenu.offsetHeight;
 const left=clamp(anchor.left,16,Math.max(16,innerWidth-width-16));
 const top=clamp(anchor.top-height-12,topEdge+82,Math.max(topEdge+82,bottomEdge-height-16));
 socialMenu.style.left=left+'px';socialMenu.style.top=top+'px';socialMenu.style.width=width+'px';
}
socialButton.addEventListener('click',()=>requestAnimationFrame(()=>{if(socialMenu.matches(':popover-open'))positionSocialMenu();}));
window.addEventListener('resize',()=>{if(socialMenu.matches(':popover-open'))positionSocialMenu();});
window.addEventListener('scroll',()=>{if(socialMenu.matches(':popover-open'))positionSocialMenu();},{passive:true});
socialButton.addEventListener('transitionend',()=>{if(socialMenu.matches(':popover-open'))positionSocialMenu();});
window.visualViewport?.addEventListener('resize',()=>{if(socialMenu.matches(':popover-open'))positionSocialMenu();});
window.visualViewport?.addEventListener('scroll',()=>{if(socialMenu.matches(':popover-open'))positionSocialMenu();});
socialMenu.addEventListener('toggle',event=>{
 const open=event.newState==='open';socialButton.classList.toggle('social-open',open);socialButton.setAttribute('aria-expanded',String(open));
 if(open){positionSocialMenu();if(animationsEnabled){socialMenu.getAnimations().forEach(a=>a.cancel());socialMenu.animate([{opacity:0,transform:'translateY(8px) scale(.97)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:260,easing:'cubic-bezier(.22,1,.36,1)'});}}
 if(!open||!animationsEnabled)return;
 socialMenu.querySelectorAll('p,a').forEach((item,index)=>{
  item.getAnimations().forEach(animation=>animation.cancel());
  item.animate([{opacity:0,transform:'translateX(-14px)'},{opacity:1,transform:'translateX(0)'}],{duration:350,delay:index*65,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
 });
});

// Both galleries support native swipe, a horizontal wheel and mouse dragging.
function enableHorizontalBrowsing(scroller,useWheel=true){
 const items=[...scroller.querySelectorAll('.car,.video-card')];
 const targetLeft=item=>item.offsetLeft-scroller.offsetLeft-parseFloat(getComputedStyle(scroller).paddingLeft);
 let touch=null;
 scroller.addEventListener('touchstart',event=>{
  if(event.touches.length!==1)return;
  let index=0,distance=Infinity;items.forEach((item,i)=>{const d=Math.abs(targetLeft(item)-scroller.scrollLeft);if(d<distance){distance=d;index=i;}});
  touch={x:event.touches[0].clientX,y:event.touches[0].clientY,left:scroller.scrollLeft,index,horizontal:false};
 },{passive:true});
 scroller.addEventListener('touchmove',event=>{
  if(!touch||event.touches.length!==1)return;
  const dx=event.touches[0].clientX-touch.x,dy=event.touches[0].clientY-touch.y;
  if(!touch.horizontal&&Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)*1.15){touch.horizontal=true;scroller.classList.add('is-dragging');}
  if(touch.horizontal){event.preventDefault();scroller.scrollLeft=touch.left-dx;}
 },{passive:false});
 function finishSwipe(event){
  if(!touch)return;
  const gesture=touch;touch=null;scroller.classList.remove('is-dragging');
  if(!gesture.horizontal)return;
  const dx=(event.changedTouches?.[0]?.clientX??gesture.x)-gesture.x;
  const next=clamp(gesture.index+(Math.abs(dx)>24?(dx<0?1:-1):0),0,items.length-1);
  scroller.scrollTo({left:targetLeft(items[next]),behavior:animationsEnabled?'smooth':'instant'});
 }
 scroller.addEventListener('touchend',finishSwipe,{passive:true});
 scroller.addEventListener('touchcancel',finishSwipe,{passive:true});
 let drag=null,moved=false;
 scroller.addEventListener('pointerdown',event=>{
  if(event.pointerType!=='mouse'||event.button!==0||event.target.closest('a,summary,input'))return;
  let index=0,distance=Infinity;items.forEach((item,i)=>{const d=Math.abs(targetLeft(item)-scroller.scrollLeft);if(d<distance){distance=d;index=i;}});
  drag={x:event.clientX,left:scroller.scrollLeft,index};moved=false;
 });
 window.addEventListener('pointermove',event=>{
  if(!drag)return;const distance=event.clientX-drag.x;
  if(Math.abs(distance)>7){moved=true;scroller.classList.add('is-dragging');}
  if(moved)scroller.scrollLeft=drag.left-distance;
 });
 window.addEventListener('pointerup',event=>{
  if(!drag)return;const gesture=drag;drag=null;scroller.classList.remove('is-dragging');
  if(!moved)return;const dx=event.clientX-gesture.x;
  const next=clamp(gesture.index+(Math.abs(dx)>24?(dx<0?1:-1):0),0,items.length-1);
  scroller.scrollTo({left:targetLeft(items[next]),behavior:animationsEnabled?'smooth':'instant'});
 });
 window.addEventListener('pointercancel',()=>{drag=null;scroller.classList.remove('is-dragging');});
 scroller.addEventListener('dragstart',event=>event.preventDefault());
 scroller.addEventListener('click',event=>{if(moved){event.preventDefault();event.stopImmediatePropagation();moved=false;}},true);
 if(!useWheel)return;
 scroller.addEventListener('wheel',event=>{
  if(Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
  const direction=Math.sign(event.deltaY),end=scroller.scrollLeft>=scroller.scrollWidth-scroller.clientWidth-2,start=scroller.scrollLeft<=1;
  if((direction>0&&end)||(direction<0&&start))return;
  event.preventDefault();scroller.scrollBy({left:direction*Math.min(180,Math.abs(event.deltaY)),behavior:'instant'});
 },{passive:false});
}
function paintKentCatalog(scroller,items,index){
 const count=items.length;
 items.forEach((item,i)=>{
  let offset=i-index;if(offset>count/2)offset-=count;if(offset< -count/2)offset+=count;
  item.style.setProperty('--slide-position',String(offset));
  item.classList.toggle('catalog-active',i===index);
  item.classList.toggle('catalog-prev',i===(index-1+count)%count);
  item.classList.toggle('catalog-next',i===(index+1)%count);
  item.setAttribute('aria-hidden',String(i!==index));item.inert=i!==index;
 });
}
function initKentCatalog(scroller,items,getIndex,go){
 scroller.classList.add('kent-catalog');scroller.scrollLeft=0;
 let gesture=null,suppressUntil=0;
 function clearDrag(){
  scroller.classList.remove('catalog-dragging');
  items.forEach(item=>{item.style.removeProperty('transform');item.style.removeProperty('opacity');item.style.removeProperty('transition');});
 }
 function dragScene(dx){
  const width=items[getIndex()].offsetWidth,gap=innerWidth<=900?12:24;
  const shift=clamp(dx,-width-gap,width+gap);
  scroller.classList.add('catalog-dragging');
  items.forEach(item=>{
   item.style.transition='none';
   const offset=Number(item.style.getPropertyValue('--slide-position'));
   item.style.transform=`translateX(calc(-50% + ${offset*100}% + ${offset*gap+shift}px))`;
  });
 }
 scroller.addEventListener('touchstart',event=>{
  if(event.touches.length!==1||event.target.closest('a,summary,input'))return;
  const point=event.touches[0],video=event.target.closest('video');
  if(video?.controls&&point.clientY>video.getBoundingClientRect().bottom-55)return;
  gesture={touch:true,x:point.clientX,y:point.clientY,horizontal:false};
 },{passive:true,capture:true});
 scroller.addEventListener('touchmove',event=>{
  if(!gesture?.touch||event.touches.length!==1)return;
  const dx=event.touches[0].clientX-gesture.x,dy=event.touches[0].clientY-gesture.y;
  if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.1)gesture.horizontal=true;
  if(gesture.horizontal){event.preventDefault();dragScene(dx);}
 },{passive:false,capture:true});
 scroller.addEventListener('touchend',event=>{
  if(!gesture?.touch)return;
  const previous=gesture;gesture=null;
  const point=event.changedTouches[0],dx=point.clientX-previous.x;
  if(previous.horizontal){event.preventDefault();if(Math.abs(dx)>35)go(getIndex()+(dx<0?1:-1));suppressUntil=performance.now()+350;}
  clearDrag();
 },{passive:false,capture:true});
 scroller.addEventListener('touchcancel',()=>{gesture=null;clearDrag();},{passive:true});
 scroller.addEventListener('pointerdown',event=>{
  if(event.pointerType==='touch'||!event.isPrimary||event.button!==0||event.target.closest('a,summary,input'))return;
  gesture={id:event.pointerId,x:event.clientX,y:event.clientY};
 });
 scroller.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch'||!gesture||event.pointerId!==gesture.id)return;
  const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
  if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)){if(!scroller.hasPointerCapture(event.pointerId))scroller.setPointerCapture(event.pointerId);dragScene(dx);}
 });
 scroller.addEventListener('pointerup',event=>{
  if(event.pointerType==='touch'||!gesture||event.pointerId!==gesture.id)return;
  const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;gesture=null;
  if(scroller.hasPointerCapture(event.pointerId))scroller.releasePointerCapture(event.pointerId);
  if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){go(getIndex()+(dx<0?1:-1));suppressUntil=performance.now()+300;}
  clearDrag();
 });
 scroller.addEventListener('pointercancel',event=>{if(event.pointerType!=='touch'){gesture=null;clearDrag();}});
 scroller.addEventListener('dragstart',event=>event.preventDefault());
 scroller.addEventListener('click',event=>{if(performance.now()<suppressUntil){event.preventDefault();event.stopImmediatePropagation();}},true);
 const fit=()=>{scroller.style.height=Math.ceil(Math.max(...items.map(item=>item.offsetHeight))+24)+'px';};
 const observer=new ResizeObserver(fit);items.forEach(item=>observer.observe(item));window.addEventListener('resize',fit);
 paintKentCatalog(scroller,items,getIndex());fit();
}
initKentCatalog(track,cards,()=>galleryIndex,galleryStep);
initKentCatalog(videoTrack,videoCards,()=>videoIndex,scrollVideo);
renderGallery(galleryIndex);renderVideoIndex(videoIndex);

$$('video').forEach(video=>{const sizeFrame=()=>{if(video.videoWidth&&video.videoHeight){video.parentElement.style.aspectRatio=video.videoWidth+'/'+video.videoHeight;video.parentElement.style.height='auto';}};video.addEventListener('loadedmetadata',sizeFrame);if(video.readyState>=1)sizeFrame();});
