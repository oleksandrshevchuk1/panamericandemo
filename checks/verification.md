# Verification · 15 October 2026

- `node checks/domain.test.cjs`: passed; normalization of three Ukrainian phone formats; invalid input; exact cost sum and all 11 components; URL/VIN validation.
- `node checks/static.cjs`: local asset references, inline JavaScript syntax, anchor destinations, one H1, no storage or request APIs.
- Design lint: zero failures; one warning about punctuation in Ukrainian prose. Em dashes retained where grammatically appropriate.
- In-app Chromium browser: page loaded over local HTTP, no error/warning logs observed during tested scenarios.
- DOM measurements at 360, 390, 768, 1280, 1440: no horizontal overflow; headings fit one or two lines after adjustments. Three mobile/tablet screenshots inspected.
- Calculator: $5,000 standard scenario produces $12,700–$16,050. Lot/VIN mode gives the same result. Negative price displays an error. Upper bound transfers to an empty inquiry budget; existing $21,000 survives a repeated transfer.
- Inquiry: switching to inspection disables hidden budget fields and enables city. Valid contact details produce the explicit unsent-form message. Form values remain on the page; no server endpoint exists.
- Video: local six-second WebM decoded and played in the dialog, readyState=4, duration=6. No autoplay audio.
- Reduced-motion route observed as static (position: relative, all stages available). Browser environment reports reduced motion, so ordinary scroll animation and reverse animation remain to be visually checked with reduced motion switched off on a real device.
- `file://` navigation was rejected by the browser tool's URL policy. No workaround was attempted after rejection. Browser verification used local HTTP instead. File-mode portability was checked statically: relative assets, inline code, no imports, no fetch, no server-dependent behavior.
- The skill's headless inspector could not finish because its browser/CDP calls timed out. No inspector pass is claimed. Responsive checks were performed using the connected browser.

Visual critique: coherent black/lime motorsport-poster direction, strong automotive focal image and local typography. Fixed oversized hero wrapping, stretched FAQ heading and mobile closing heading. Subjective scores: design 7.5, usability 8, creativity 7, content 6.5 (weighted 7.5/10). Remaining limits: missing original logo/owner photo, no verified customer-case assets or quotes; introductory scene repeats in the about section. These require source materials rather than fabricated evidence.

## V2 verification

- Owner and office reference attachments received, copied locally; original logo installed. Two new generated images inspected and converted to WebP.
- Domain tests expanded for reversible route progress, reduced-motion fallback, oversized/undersized scroll ranges, SUV logistics adjustment and invalid vehicle year. Passed.
- Browser route opt-in overrides reduced motion only for the route. PageDown changed dash offset from 395.787 to 164.004; PageUp restored 395.787. Car/ship and stage labels update with scroll. Map clipping fixed so land cannot overlap steps.
- Native carousel buttons moved scrollLeft from 0 to 287.785 and back to 0 at desktop width. Native horizontal overflow remains inside the track, not the page.
- Vehicle calculator: BMW X3 2021, SUV, $5,000, standard repair => $12,950–$16,300. Budget 16300 and model BMW X3 2021 transferred to inquiry. Electric disables engine displacement. Year 1800 displays a field error.
- Google Maps iframe loaded Kent Cars in Strumivka; embedded map screenshot inspected. An online connection is required.
- Widths 360, 390, 768, 1280, 1440: no page horizontal overflow after atmospheric layer was clipped. Gallery heading was then widened on mobile to remove excess wrapping.
- No JavaScript error logs observed during the above browser scenarios. Existing file:// tool policy limitation remains; not retried.

## V3 focus carousel and separate portrait

- Three cards remain. The reference-only office visitor photo is absent from the page. Active card is centered at scale 1; its two neighbours are smaller at .76 (.78 on phone). Reduced motion skips the transition but retains the state changes.
- Browser arrows advanced BMW → Audi → Volkswagen and wrap correctly. At 390px a real mouse drag across the photo advanced Audi → Volkswagen; ArrowLeft returned to Audi. No page overflow: scrollWidth=375 at innerWidth=390.
- New owner-with-key portrait inspected and copied to assets; the about image uses owner-keys.webp, while hero retains owner-hero.webp.
- Mobile and desktop carousel screenshots inspected; adjusted image positioning to keep faces in the crop. No JavaScript errors observed. Domain and static checks pass.

## V4 scroll stories and varied photo angles

- Added generated sports-car rear-left and sedan front-right yard photographs. Both original outputs visually inspected before conversion. Removed CSS desaturation from these cards and from owner's photograph; owner's image now uses its natural 3:2 ratio with auto height.
- Mobile bar has two links. Owner role reads «Власник Kent Cars»; personal-call CTA replaced with team consultation.
- Route activates without a button, including in the reduced-motion environment per explicit user instruction. Six scenes above the map have equal scroll intervals; path speed is remapped to keep shipping in the Atlantic and preparation near Ukraine. Pure stage boundary and monotonic path-progress tests pass.
- Browser: route scene «Тепер — через океан» displayed ship photo above map; later final-handover scene also observed. Sticky position confirmed. At 390×740, story remains visible near y203–328 and horizontal overflow absent (375px document width, 390px viewport).
- Browser desktop review scroll changed active card to BMW with pinTop=0; foreground card and recessed neighbour screenshot inspected. Carousel controls now synchronize vertical position to prevent immediate index reset.
- JavaScript error logs empty during checked route/carousel scenarios. Static resource/script checks and domain tests pass.

## V5 calculator language, entrances and social popover

- Removed damage-area input and every runtime dependency on it; severity now comes from the existing scenario selector with plain Ukrainian labels. Heading changed to «Скільки коштує авто?».
- Browser: $5,000 sedan with light damage => $11,700–$14,150; significant damage => $14,400–$19,050. No JavaScript errors.
- Floating native popover contains the four existing social URLs. Opened and inspected at desktop and 390×844; Escape closes it. Mobile menu rect x57–357, y317–686, within viewport; page scrollWidth=375 at innerWidth=390.
- Added one-shot entrances for headings, descriptive copy, benefits, services, photo cards, about content, FAQ, forms, contact content and map. Web Animations API uses transform/opacity in standard mode and opacity-only fades in reduced motion. Popover entries stagger on open. Existing carousel transforms remain independent.
- Static and domain checks pass. Local buildless delivery preserved.

## V6 mobile bounds, compact contacts and readable accents

- Reproduced the mobile action bar's abrupt appearance: computed transitionDuration was 0s in the reduced-motion environment. Explicit transform/opacity transitions now remain active at 0.45s/0.35s; separate show/hide thresholds prevent threshold jitter.
- Removed the gallery's introductory placeholder paragraph at user request. Existing per-card example-price labels remain. Excluded pinned-scene children from generic entrance effects, contained each scene's paint and assigned an opaque gallery background.
- At 360×640, route heading now spans 305px instead of 178px; its top is y14 and bottom y76, so both lines fit. Delivery time is a separate row. Mobile sticky scenes use dynamic viewport height with reserved bottom-control space.
- Scene clientHeight/scrollHeight equal at 360×640, 390×844, 768×740, 1280×740 and 1440×900 after a tablet-specific header-row correction. No page horizontal overflow. Route/gallery boundary rects meet without crossing.
- Social menu measured approximately 208×230px at 360×640. Four links, no subtitles or full-page panel. A soft lime glow surrounds the trigger. Review footer reserves room for that trigger.
- Secondary text on dark surfaces is white; selected headline words are lime. Light calculator and lime service surfaces preserve dark text for contrast.
- Static/domain checks pass; no JavaScript error logs during browser checks.

## V7 rounded surfaces and selective heading contrast

- Unified radii: 14px controls, 22px surfaces, 24px media; smaller surface/media radii on phones. Carousel image corners and native menu/dialog corners follow the same system. Circular social trigger retained.
- Lime section now combines black headings and selected white words on compact dark rounded highlights. Photo-card headings use lime on «відчуттів» and «день».
- Browser computed radii confirmed: button/input=14px, delivery card=22px, hero photo=24px. At 390px no horizontal overflow; service title remains two lines. Desktop screenshot checked after making highlights inline-block to avoid background overlap between lines.

## V8 compact header, map order and lime emphasis

- Mobile header is sticky and 60px tall, with a 32px logo. Tablet review scene fits: clientHeight=scrollHeight=680 at 768x740.
- Office map precedes address, route and social contacts in DOM order.
- FAQ word and selected gallery captions/models use lime accents; buttons and accent text have soft lime glow. Browser screenshot inspected; error log empty.


## V9 icon glow, text accents and mobile footer
- Lime accents added to benefit headings, car categories/descriptions, calculator empty heading and gallery introduction/savings. Review caption accents computed rgb(196,240,0).
- Floating SVG keys and benefit symbols use soft glow. Social trigger keeps a dark icon for contrast against lime.
- Footer centered below 800px with grouped social buttons, centered address, route and back-to-top control. Browser screenshot checked at 390x844: no horizontal overflow; error log empty.
- Static and domain checks passed.


## V10 wrapping and owner photo contrast
- Removed cloned lime backgrounds in calculator result heading; plain lime text and 1.2 line-height prevent overlap. Screenshot at 390px checked, no horizontal overflow.
- Owner introduction, signature and photo caption now have selective lime accents.
- Strengthened bottom photo gradient; KC monogram sits inside a rounded dark 48px mobile badge. Mobile screenshot inspected; no console errors. Static/domain checks pass.


## V11 ambient backgrounds, crisp buttons
- Removed shadows/glow from buttons and social trigger, including pseudo-element glow. Browser computed all button shadows none and FAB glow display none.
- All main sections now share soft ambient radial fields and a fine grid, with dark low-contrast treatment on lime/light sections. Desktop screenshot inspected; static/domain checks pass.


## V12 navigation, review label and contact hierarchy
- Header order: services, process, reviews, team, contacts. Existing photo carousel labeled reviews; three existing illustrative photos retained.
- Contact section now leads with explicit heading, large tel link, click-to-call label, social buttons and separate address/directions card before map.
- Browser at 390x844: no horizontal overflow, call href verified, navigation order verified, screenshot inspected. Static/domain checks pass.


## V13 tracking camera and quieter atmosphere
- Map uses a scroll-driven SVG viewBox centered on vehicle/ship; continuous zoom and pan follow route progress. Large desktop map with stage photo/copy alongside; stacked phone scene.
- Browser: desktop map approximately 835x423, sticky client/scroll heights 720/720. Camera width changed 610 to 530 while scrolling; stage advanced. Phone checks: 390x844 no horizontal overflow, scene 784/784; 360x640 scene 580/580 with map about 162px tall. Screenshots inspected.
- Shared section background alpha reduced; hero atmosphere left intact. Static/domain checks pass.


## V14 route clipping, review copy and two purchase paths
- Moving SVG contained in map viewport; stage photo in independent stacking layer. Mobile screenshot shows route entirely above stage photo.
- Added three clearly labeled sample review texts as photo overlays; 390x844 gallery fits scene (784/784), no horizontal overflow.
- Hero, services, inquiry labels, FAQ and metadata describe both US orders and ready US imports in Ukraine. Hero offers both service-prefilling paths. No availability invented for illustrative cars.
- Social trigger has dark border and thin grey outline without glow. Static/domain checks pass.


## V15 mobile reading and unobstructed route
- Mobile reviews use manual arrows/swipe and normal page flow; vertical scrolling preserves the selected review and reveals full pricing/copy. Browser 360x640: next arrow selected 2/3, card height 525px, no horizontal overflow, review pin relative.
- Bottom action bar hides during route/review reading. Mobile route timeline removed; opaque stage card stays below the clipped map. Browser 360x640 screenshot: stage 2/6 text and photo fully visible, actions hidden, no horizontal overflow.
- Static and domain checks pass.
