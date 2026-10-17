"""Regenerate the buildless page from the captured source content and template."""
import pathlib, re, json, html, shutil
root = pathlib.Path(__file__).resolve().parents[1]
ref = root/'docs/reference'
source = (ref/'panamerican.js').read_text(encoding='utf-8')
page = (ref/'page-template.html').read_text(encoding='utf-8')
esc = html.escape
cars = json.loads((ref/'cars.json').read_text(encoding='utf-8'))['cars']
blog = json.loads((ref/'blog.json').read_text(encoding='utf-8'))
cards = []
for i,c in enumerate(cars):
    photo = pathlib.Path(c['image']).with_suffix('.webp').name
    details = ' · '.join(str(c.get(k) or '') for k in ['transmission','drive','condition'] if c.get(k))
    cards.append(f'''<article class="car" data-car="{i}"><div class="car-image"><img src="assets/panamerican/{photo}" alt="{esc(c['carName'])} — автомобіль із галереї Pan American" width="1280" height="960" loading="lazy"><span class="car-year">{c['year']}</span></div><div class="car-bottom"><h3>{esc(c['carName'].title().replace('Audi','Audi').replace('Bmw','BMW').replace('Kia','Kia').replace('Rr','RR').replace('Sulev','SULEV').replace('F150','F-150'))}</h3><p class="car-specs">{c['year']} · {esc(' · '.join(dict.fromkeys(v for v in [c['engine'],c['fuel']] if v)))} · {c['mileage']:,} миль</p><div class="car-price"><span>Ціна під ключ</span><b>{c['price']:,} $</b></div><details><summary>Деталі автомобіля</summary><p>{esc(details)}<br>Пошкодження за даними галереї: {esc(c['damage'])}.</p></details><div class="car-actions"><button type="button" class="car-details-button">Деталі авто</button><a class="car-inquiry text-link" href="#consultation" data-model="{esc(c['carName'])}">Обговорити авто ↗</a></div></div></article>'''.replace(',',' '))
page = page.replace('@@CARS@@','\n'.join(cards))
videos=[]
for i,v in enumerate(blog):
    filename=pathlib.Path(v['video']).name
    videos.append(f'''<article class="video-card" data-source="{esc(v['url'])}"><div class="video-shell"><video preload="metadata" playsinline poster="assets/panamerican/blog-{i+1}.jpg" aria-label="Відео Pan American {i+1}"><source src="assets/panamerican/{filename}" type="video/mp4"></video><button class="video-cover" type="button" aria-label="Відтворити відео Pan American {i+1}"><span class="play-icon" aria-hidden="true">▶</span></button></div></article>''')
page=page.replace('@@BLOG@@','\n'.join(videos))
services=[
('Підбір авто','Підберемо автомобіль за бюджетом, комплектацією та станом. Погодимо варіанти до торгів.','M4 7h16M7 3v8m10 3v7M4 17h16M7 13v8m10-18v7'),
('Перевірка історії','Перевіримо ДТП, власників, сервісну історію та пробіг через платні бази.','M21 21l-5-5M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M7 9l2 2 4-4'),
('Доставка й митниця','Організуємо страхування, перевезення через океан та митне оформлення в Україні.','M2 5h12v12H2zM14 10h4l4 5v2h-8M5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4'),
('Авто під ключ','Допоможемо з ремонтом, запчастинами, детейлінгом і доставкою підготовленого авто.','M14 3a7 7 0 1 1-5 12L3 21l-2-2 6-6A7 7 0 0 1 14 3ZM15 7h.01'),
('Сертифікація','Супроводимо сертифікацію та підготовку документів для постановки авто на облік.','M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6ZM8 12l3 3 5-6'),
('Фінансування','Фінансовий менеджер розповість про можливості розтермінування й індивідуальні умови.','M3 5h18v14H3zM3 10h18M7 15h4')]
def service_description(text):
    result=esc(text)
    for phrase in ['бюджетом','сервісну історію','митне оформлення','підготовленого авто','підготовку документів','розтермінування']:
        result=result.replace(phrase,f'<strong>{phrase}</strong>')
    return result
page=page.replace('@@SERVICES@@','\n'.join(f'''<article class="service reveal"><div class="service-top"><span class="service-number">0{i+1}</span><svg class="service-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="{icon}"/></svg></div><h3>{" ".join(title.split()[:-1])} <em class="accent-font">{title.split()[-1]}</em></h3><p>{service_description(desc)}</p><a class="text-link service-inquiry" href="#consultation" data-service="{title}">Обговорити з менеджером ↗</a></article>''' for i,(title,desc,icon) in enumerate(services)))
steps=[('Підбір','Менеджер допомагає визначити, яке авто можна придбати за вашим бюджетом. Погоджуємо критерії та варіанти.'),('Офіційна співпраця','Підписуємо договір до торгів. Гарантійний платіж 500 $ входить у кінцеву вартість авто.'),('Торги','Перевіряємо історію підібраних лотів через Carfax та беремо участь у торгах разом із вами.'),('Доставка до порту','Після виграшу організовуємо перевезення автомобіля з аукціонного майданчика до порту відправлення.'),('Через океан','Морська доставка до Клайпеди або іншого порту Європи. Надсилаємо фотозвіти та повідомляємо про етапи.'),('Розвантаження','Після прибуття в порт автомобіль розвантажують і готують до подальшого перевезення в Україну.'),('Розмитнення','Брокер готує документи та квитанції для оплати митних платежів. Автомобіль проходить митне оформлення.'),('У ваше місто','Погоджуємо ремонт і підготовку за потреби та доставляємо автомобіль до вашого міста.')]
page=page.replace('@@ROUTE_DOTS@@',''.join(f'<button type="button" data-route-step="{i}" aria-label="Етап {i+1}: {t}" aria-pressed="{str(i==0).lower()}">{i+1}</button>' for i,(t,d) in enumerate(steps)))
page=page.replace('@@STEPS@@','\n'.join(f'<li class="route-step{ " active" if i==0 else ""}" data-step="{i}"><span class="route-num">0{i+1}</span><h3>{t}</h3><p>{d}</p></li>' for i,(t,d) in enumerate(steps)))
old=(root/'backups/kent-cars-before-rebrand.html').read_text(encoding='utf-8')
p=old.index('<svg class="map"');q=old.index('</svg>',p)+6
svg=old[p:q].replace('#c4f000','#e79d2f').replace('#0c0e0c','#103d3b')
page=page.replace('@@ROUTE_MAP@@',svg)
maps=re.findall(r'"mapUrl":"([^"]+)"',source)
page=page.replace('@@LVIV_MAP@@',esc(maps[0])).replace('@@DNIPRO_MAP@@',esc(maps[1]))
page=page.replace('@@YEARS@@',''.join(f'<option{ " selected" if y==2020 else ""}>{y}</option>' for y in range(2026,1999,-1)))
reviews=[('Вася Калініченко','Замовляв BMW F36, менеджери просто топ, дуже швидко підібрали мені машинку, виграли за дуже класну ціну, прорахунок вартості повністю зійшовся.'),('Володимир Куліш','Вже рік користуюся автомобілем який замовляв в фірмі «PanAmerican». Роботою хлопців дуже задоволений. Підійшли професійно до підбору, доставки і ремонту авто.'),('Андрій Гордуз','Менеджер Максим проконсультував на вищому рівні, завжди був на звʼязку, навіть вночі. Дуже вдячний за авто і за вчасні терміни доставки.')]
page=page.replace('@@REVIEWS@@','\n'.join(f'<article class="review reveal"><div class="review-top"><div class="stars" aria-label="5 із 5 зірок">★★★★★</div><span class="review-quote-mark" aria-hidden="true">“</span></div><blockquote>«{quote}»</blockquote><div class="review-person-row"><span class="review-avatar avatar-{i}" aria-hidden="true">{"".join(part[0] for part in name.split())}</span><div><p class="review-person">{name}</p><p class="review-source">Клієнт Pan American</p></div></div></article>' for i,(name,quote) in enumerate(reviews)))
page=page.replace('@@CUSTOMERS@@',''.join(f'<img src="assets/panamerican/image{i}.webp" alt="Фото з клієнтської галереї Pan American — {i}" loading="lazy" width="600" height="700">' for i in range(1,5)))
socials=[('Instagram','https://www.instagram.com/pan.a.merican/'),('Telegram','https://t.me/panamericanua'),('TikTok','https://www.tiktok.com/@pan.a.merican')]
page=page.replace('@@SOCIALS@@',''.join(f'<a href="{esc(url)}" target="_blank" rel="noopener noreferrer">{name} <span aria-hidden="true">↗</span></a>' for name,url in socials))
# New composition, distinct from the reference site's sequence.
main_start=page.index('<main id="main">')+len('<main id="main">')
main_end=page.index('</main>',main_start)
sections=re.findall(r'<section\b[\s\S]*?</section>',page[main_start:main_end])
by_id={re.search(r' id="([^"]+)"',section.split('>')[0]).group(1):section for section in sections}
order=['home','about','services','cars','route','calculator','reviews','blog','offices','faq','consultation']
assert set(by_id)==set(order)
page=page[:main_start]+'\n'+'\n'.join(by_id[key] for key in order)+'\n'+page[main_end:]
assert '@@' not in page
icons={
 '↗':'M6 18 18 6M6 6h12v12', '←':'M20 12H4m6-6-6 6 6 6',
 '→':'M4 12h16m-6-6 6 6-6 6','↓':'M12 4v16m-6-6 6 6 6-6',
 '↑':'M12 20V4m-6 6 6-6 6 6','▶':'m8 5 11 7-11 7Z'
}
def vector_icons(match):
 text=match.group(1)
 for symbol,path in icons.items():
  text=text.replace(symbol,f'<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="{path}"/></svg>')
 return '>'+text+'<'
page=re.sub(r'>([^<>]*)<',vector_icons,page)
(root/'index.html').write_text(page,encoding='utf-8',newline='\n')
shutil.copyfile(root/'assets/panamerican/calculator.cjs',root/'assets/panamerican/calculator.js')
print('Generated index.html:',len(cars),'cars,',len(blog),'videos, 6 services, 8 delivery stages, original route SVG')
