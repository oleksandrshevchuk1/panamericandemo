# Pan American — поточна версія

Оновлено 17.10.2026. Готова сторінка — `index.html`. Відкрийте її подвійним кліком і залишайте папку `assets` поруч. Для локального HTTP-перегляду: `python -m http.server 4173 --bind 127.0.0.1`.

## Оформлення й взаємодії

- Новий перший екран із рекламною ШІ-візуалізацією; фото показується повністю. На телефоні кнопки розташовані перед фото.
- Фірмовий помаранчевий визначено безпосередньо з непрозорих пікселів оригінального логотипа: RGB 231,157,47, або `#e79d2f`. Зелені тони — з палітри компанії. Основні секції розділено помаранчевими смугами; блог і консультація мають великі фірмові кольорові поверхні.
- Локальні Manrope й Lora Italic з українськими літерами. Обидва шрифти вбудовано у `assets/panamerican/fonts.css`, щоб уникнути обмежень завантаження шрифтів через `file://`. Ліцензії — у `assets/fonts`.
- На ПК — повна навігація; на телефоні — компактне меню з анімованими лініями замість текстового хрестика. Додано пункт «Питання». Якірні переходи враховують висоту шапки й внутрішній відступ секції.
- «Контакти» ведуть до основного блоку з телефоном, поштою, адресами та формою, а не до футера.
- Автомобілі мають окремі поверхні й рамки. На телефоні авто та відео гортатимуться повними картками через native scroll snap, плавні стрілки та клавіатуру. На високих екранах ПК збережено галерею з прокручуванням і глибиною.
- Карта має нерухомий географічний кадр. США та Україна виділені обводкою. Транспорт відразу відповідає активному етапу; немає руху камери, відкладеного наздоганяння чи зміни висоти під час прокручування. На телефоні — кнопки восьми етапів, свайп і клавіатура; на ПК карта закріплюється поряд зі списком. Заголовок винесено над сценою.
- Появи контенту повторюються після повернення до секції. Меню, вікна, кнопки й галереї мають окремі ефекти. Налаштування reduced motion та перемикач руху збережено.
- Ліворуч — Instagram, Telegram-канал і TikTok. Праворуч — окреме вікно зв’язку. За прямою вказівкою користувача кнопка «Написати у Telegram» у цьому вікні веде в `https://t.me/CarLogist` — користувач зі скриншота. Це окрема ціль від каналу `panamericanua` у списку соцмереж.

## Калькулятор і форма

Калькулятор використовує модель публічного калькулятора Pan American, отриману 17.10.2026, та оновлюється при зміні полів. Загальна сума видима перед деталізацією і додатково під полями. Без ремонту, сертифікації й реєстрації. Особливості шкали зборів, вікових коефіцієнтів, електроавто та лотів до $2 000 описано в `docs/rebrand-guide.md`.

Результат і вибраний автомобіль передаються у звернення. Після зміни даних попереднє підготовлене звернення очищається. Форма готує поштовий текст або копіювання, а не автоматичне серверне надсилання. Немає збереження даних у localStorage/sessionStorage чи прихованих запитів.

## Матеріали та соцмережі

11 автомобілів, 5 відео та 4 клієнтські фото перенесено за вказівкою користувача. Фото оптимізовано у WebP. Відгуки мають аватарки з ініціалами; сторонні портрети під іменами клієнтів не підставлялися. Посилання на попередній сайт прибрано з готової сторінки; технічні знімки залишено в `docs/reference`.

Досліджено відкриті профілі Instagram, TikTok, YouTube, Telegram і офіційний Linktree:

- https://www.instagram.com/pan.a.merican/
- https://www.tiktok.com/@pan.a.merican
- https://www.youtube.com/@panamericanlviv
- https://t.me/s/panamericanua
- https://linktr.ee/pan.americanlviv

Viber підтверджено через Linktree; Threads — через Instagram. Контент за входом у профілі чи приватними групами не переглядався. У готовому інтерфейсі залишено лише три мережі за останньою вказівкою користувача.

## Головне зображення

Використано вбудований `image_gen`; файл у проєкті — `assets/panamerican/hero-campaign-v2.webp`, оригінал — `hero-campaign-v2.png`. Це рекламна ШІ-візуалізація, а не документальна видача автомобіля. Логотип надано як референс.

Промпт: “Create a photorealistic premium automotive campaign photograph for Ukrainian car import company Pan American. This is a NEW promotional illustration, not a documentary photo or real customer delivery. Use the attached original company logo only as brand identity reference: deep emerald green and warm amber orange, simple starred car emblem. Show a pristine graphite metallic Audi Q7 style luxury SUV, realistic four-ring grille design, front three-quarter angle, entire car visible including all wheels and clean bodywork, parked on a clean concrete forecourt beside tasteful deep emerald green shipping containers. A hint of distant shipping cranes and a subtle warm sunset, contemporary Ukrainian automotive importer mood. Refined natural editorial photography, real metal and glass reflections, believable tire geometry, tactile concrete, warm amber edge lighting balanced against deep green surroundings. Small tasteful PAN AMERICAN wordmark and original starred car logo on one green container in the background, accurate and legible if included, no other writing, no slogans, no watermarks, no license plate text, no people. Car is the dominant subject, centered slightly to the right, ample room around the vehicle, low camera at headlight height, lens 40mm, cinematic but realistic, no excessive fog or neon. Composition optimized for a website hero image occupying the right half of a desktop split layout and a broad centered crop on mobile: make a landscape 3:2 photograph, ensure the car fits completely in the center 80% horizontally and middle 70% vertically. High photographic quality. Brand reference input: attached logo, preserve its recognizable emblem and colors where appropriate.”

## Редагування й перевірки

- `docs/reference/page-template.html` — HTML-заготовка.
- `checks/build-rebrand.py` — регенерує готовий `index.html` і синхронізує браузерний калькулятор. Прямі зміни `index.html` потрібно переносити до шаблону, інакше наступна регенерація їх перезапише.
- `assets/panamerican/site.css` — основа; `redesign.css` — фінальні стилі за уточненнями; `site.js` — поведінка.
- `node checks/domain.test.cjs` та `node checks/static.cjs` — формули, ресурси, синтаксис, якірні цілі та відсутність старого бренду.
- `checks/browser-rebrand.js` — Playwright-сценарії ширин 360/390/768/1440, калькулятора, форми, карти й галерей.
- `checks/navigation-rebrand.js` — компактне меню, запитання, точний контактний якір, діалог, Telegram-ціль і повна навігація на ширинах 901/1024/1366/1900.
- Скриншоти — `checks/screenshots/panamerican-*.png`. Перевірка мобільної верстки виконувалася у браузерній емуляції.

Початковий сайт і README збережено в `backups`. Для публікації залишено `noindex,nofollow`; зніміть його після остаточного перегляду матеріалів та умов калькулятора. Зовнішнього розгортання в цій роботі не виконувалося.

Оновлення 17.10: контакти винесено до блоку офісів, консультація містить окрему форму заявки. Малі плаваючі кнопки постійно доступні; велика мобільна панель ховається біля видимого CTA, під час маршруту та введення. Мобільний маршрут має стабільну sticky-сцену та 8 етапів із запасом прокручування для фіналу; короткі екрани й reduced-motion використовують ручне перемикання. Контури обох країн повністю входять у фіксований viewBox. Прибрано міжсекційні помаранчеві смуги, додано фонові фактури, послідовну появу списків та версії CSS/JS для оновлення кешу. Перевірено latest-motion.js, latest-contacts.js, static.cjs, domain.test.cjs.

Галереї оновлено: автомобілі завжди у горизонтальній стрічці, без вертикального перехоплення скролу на ПК. Обидві стрічки підтримують свайп, горизонтальне колесо, перетягування мишею та кнопки. Для мобільної карти додано підказку гортання; перевірено закріплення, рух транспорту й етапи 1/5/8 на 360×640. Перевірка checks/horizontal-and-map.js пройдена на ПК та телефоні.

18.10.2026: виправлення Safari/iPhone — стабільно прозорий фоновий декор, SVG-стрілки замість емодзі, центрована ширша карта зі збереженням обох країн, синхронна лінія/транспорт/прогрес, прив’язане до кнопки меню соцмереж, анімації ввімкнені при завантаженні. Перевірки mobile-platform-fixes.js та route-sync.js пройдені у Chrome та WebKit; mobile-responsive-smoke.js — у WebKit. Справжній iPhone не підключений; висновки про iOS базуються на наданих скриншотах та WebKit.
