# Ресурси та права

Обкладинка `assets/images/hero.webp` створена вбудованим ImageGen. Оригінал — `hero.png`. Використано для оформлення, не як доказ виконаного замовлення. Промпт: premium photorealistic graphite SUV in front of contemporary black steel and glass showroom, subtle acid lime light strip, overcast evening, damp asphalt, wide composition, no people, no writing or logos. Референс обличчя не передавався.

Автомобільні фото Unsplash, використані як редакційні ілюстрації напрямків підбору:

- `sport.jpg`: https://images.unsplash.com/photo-1503376780353-7e6692767b70 — Porsche на дорозі.
- `sedan.jpg`: https://images.unsplash.com/photo-1555215695-3004980ad54e — BMW.
- `detail.jpg`: https://images.unsplash.com/photo-1492144534655-ae79c964c9d7 — автомобіль, крупний план.
- Умови використання: https://unsplash.com/license. Перед публікацією бажано замінити власними матеріалами; імена авторів не встановлені.

`automotive.webm` створено локально з трьох наведених фото як шестисекундний монтаж із повільним наближенням. Це не відгук і не відеозйомка видачі авто.

Oswald і Manrope завантажені з офіційного google/fonts, ліцензії SIL Open Font License у папці fonts. WOFF2 отримані локальним перетворенням оригінальних variable TTF. Перевірено наявність І, Ї, Є, Ґ та малих літер.

SVG-маршрут — схематична авторська графіка. Геометрія не відображає точні порти, транзит чи місцезнаходження авто. Favicon та K у шапці — тимчасова типографіка до отримання оригінального логотипа.

## Оновлення з отриманими референсами

- `owner-hero.webp` / `owner-hero.png`: ImageGen, вбудований інструмент, референси Олега з `owner-original.jpg` та `owner-portrait.png`, офіс із `office-original.jpg`. Нова сцена: Олег біля графітового SUV перед офісом, природне похмуре світло, без інших людей. Згенерований результат використано для оформлення.
- `deliveries.webp` / `deliveries.png`: ImageGen, вбудований інструмент. Триптих постановочних ілюстрацій вигаданих клієнтів біля Jetta / X3 / Q7 перед офісом Kent Cars; офіс та логотип надані як референси. Три панелі кадруються CSS, оригінал не порізаний. Не є реальними відгуками; примітка біля галереї, бюджети умовні.
- `assets/brand/logo-original.png`: оригінал, наданий замовником, використано у шапці замість тимчасової K.
- `assets/images/references/office-original.jpg`: надане фото відвідувачів біля офісу, використано в четвертій картці.
- `world-land.geojson`: Natural Earth 110m land, public domain. Джерело: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson. Координати перетворено в SVG у HTML; зовнішній запит для карти маршруту не потрібен.
- Google Maps iframe використовує пошук за наданою адресою, не вигадані координати. У браузері карта завантажилась та знайшла Kent Cars у Струмівці.

Останнє уточнення: `office-original.jpg` більше не використовується на сторінці, збережене тільки як референс локації. У блоці знайомства встановлено `owner-keys.webp` (оригінал `owner-keys.png`): вбудований ImageGen, референси оригінальних портретів Олега та попередньої обкладинки. Промпт: та сама впізнавана людина, інша поза біля відкритих дверей graphite BMW, права рука з ключем простягнута до камери, природне похмуре світло, офіс Kent Cars позаду, без інших людей і рекламних написів. Фото створене для оформлення блоку, не як реальна видача клієнту.

## Різні ракурси та фото етапів

- `sport-yard.webp` / PNG: вбудований ImageGen, референс оточення з office-original.jpg. Промпт: graphite Porsche 911, low rear-left three-quarter view, real-location gravel forecourt, dark slatted fence, cloudy Ukrainian afternoon, no people or signage. Використано в «Більше відчуттів», попереднє стокове фото з цього блоку прибрано.
- `sedan-yard.webp` / PNG: вбудований ImageGen, той самий референс оточення. Промпт: pearl white BMW sedan, elevated front-right three-quarter view, open gravel foreground, fence and trees, mild afternoon sunshine, no people or readable signage. Використано в «На кожен день».
- `route-stages.webp` / PNG: вбудований ImageGen. Шість квадратних ілюстрацій у сітці 3×2: аукціон, автовоз, судно, розвантаження, ремонт, ключі біля готового авто. Промпт: consistent realistic commercial documentary imagery, graphite vehicles and daylight, no faces, no logos or testimonial claims. CSS вибирає поточний квадрат. Зображення пояснюють процес і не є доказами конкретних замовлень.
- Насиченість owner-keys.webp не змінювалась у файлі: прибрано CSS-фільтр і кадрування, використано природні пропорції. Джерело збережено.
