# Independent Used-Car Dealer Website Audit — Victoria (VIC)

- **Date:** 24 November 2026
- **Scope:** Public websites of 17 independent (non-franchise, non-national-chain) Licensed Motor Car Traders (LMCTs) across metropolitan Melbourne (12, including 3 JDM import specialists) and regional Victoria (5: Geelong ×3, Shepparton ×1, Traralgon ×1).
- **Method:** Web discovery via Google search (`search_web`) followed by automated HTTP/HTML/CSS/JSON/sitemap inspection of homepages, stock/inventory pages, and Vehicle Detail Pages (VDPs) across all 17 sites (plus public JSON APIs where exposed by client-side SPAs). No forms were submitted, no accounts created, and no CAPTCHA/anti-bot gates bypassed.
  - *Methodological caveat:* Chrome DevTools MCP remote debugging was inactive on the audit host (`DevToolsActivePort` missing), so **Mobile Quality (1–5)** scores are inferred from HTML viewport metadata, CSS frameworks (Next.js/Tailwind vs. legacy Bootstrap 3), script counts, and payload weights rather than live visual viewport rendering. **Sample is purposive and not statistically representative of all VIC independent dealers.**
- **Sources Accessed:** 17 primary dealer domains audited in full (50+ public endpoints/pages/sitemaps/APIs inspected), plus 3 initial JDM candidate domains that errored/timed out during discovery.

---

## 1. Dealer-by-Dealer Audit Table

> **Legend:** `Y` = Yes (observed on public page/VDP/JS bundle) · `N` = No (not observed) · `UNV` = Unverified (timeout or client-side AngularJS/hidden endpoint) · `DA` = Drive Away · `EGC` = Excl. Govt. Charges · `Both` = Calculator + Enquiry (for Finance) or DA + EGC (for Price) · `Enq` = Enquiry only · `Calc` = Calculator only · `DS` = DealerStudio / AutoGate (Carsales) · `EC` = EasyCars (JEAL) · `VY` = VirtualYard / CarsForSale.com.au.

| # | Business Name | Suburb (VIC) | Region / Niche | Approx Stock | Platform / Vendor | LMCT Shown | Filters | VDP Photos | Video | Price Type | Finance | Trade-In | Online Deposit | Test Drive | Chat / WA | Reviews Widget | PPSR / History | Warranty Info | Sold Archive | Mobile (1–5)* | Speed Impression | Other Notable Features |
|---:|---|---|---|---:|---|---|---|---|---:|---|---|---|---|---|---|---|---|---|---|---:|---|---|
| 1 | **Direct Vehicle Warehouse** | Dandenong | Metro SE | 12 | DealerStudio / AutoGate (Next.js) | Y (`4647`) | Y | ~41 | N | DA | Both | Y | N† | Y | N | N | N‡ | Y | N | 4 | Fast (0.18–0.41s) | Algolia faceted search; RedBook specs in payload; unused New/Demo nav links |
| 2 | **Ultimate Motors** | Dandenong | Metro SE | 46 | Custom SPA (`Cuff Digital Labs`) | Y (`12057`) | Y (Make) | ~16 | N | DA | Enq | N | N | N | N | Y | N | Y | N | 3 | Moderate (1.07s + 194KB JSON) | Static HTML says `24` before JS loads `46` from `/api/cars`; Rego+RWC in title |
| 3 | **Melbourne Car Center** | Hoppers Crossing | Metro W | 40 | WordPress (`CarDealer` + Elementor) | Y (`12227`) | Y | ~16 | N | Unmarked | Calc | Y | N | N | Y (WA) | N | Y (`PPSR`) | Y | N | 3 | Slow (2.10s, 74 scripts) | Dedicated `/calculator/`, Make An Offer modal, WooCommerce loaded |
| 4 | **Melbourne City Cars & Commercials** | Thomastown | Metro N (Comm/Used) | 27 | DealerStudio / AutoGate (Next.js) | N | Y | ~35 | N | EGC | Both | Y | N† | N | N | Y (Google) | N‡ | Y | N | 4 | Fast (0.12–0.40s) | Commercial category routes (`/truck`, `/van`, `/ute`, `/bus`); `/finance-pre-approval` |
| 5 | **Elite Automotive Group** | Thomastown | Metro N | 40 | EasyCars (JEAL) | Y (`11842`) | Y | ~42 | N | DA | Enq | Y | N | N | N | N | Y (`CarHistory`) | Y | N | 3 | Moderate (0.27–1.03s) | Watchlist feature; "clear title" + CarHistory; custom JS overlay |
| 6 | **Michael and Sons Quality Used Cars** | Coburg | Metro N | 41 | iMotor (Gatsby + Algolia) | N | Y | ~35 | N | DA | Both | Y | N | N | Y (Podium) | N | N‡ | Y | N | 4 | Fast–Mod (0.32–1.76s) | Weekly/Fortnightly/Monthly repayment calc; `?special=true` filter |
| 7 | **P & S Automart** | Fawkner | Metro N | ~62 | Indiqator / Dealer Solutions (Cox) | Y (`8205`) | Y | UNV | UNV | DA | Enq | UNV | UNV | UNV | N | N | UNV | UNV | N | 2 | Slow (4.0–8.6s; VDP timeout) | WP wrapper around legacy Bootstrap 3.3 `cloud.inventorysearch.com.au` |
| 8 | **MM Carz** | Nunawading | Metro E | 44 | WordPress (`Sozou` + AutoGate/JEAL) | Y (`12890`) | Y | ~50 | Y | Both | Both | Y | Y (`$1,000`) | Y | Y (Drift) | Y (Elfsight/PR) | N | Y | Y | 4 | Slow–Mod (0.29–3.1s, 1.1MB) | 20+ languages, `/compare/`, itemized on-roads, `$1k` card deposit, 3D viewer, Turnstile |
| 9 | **Motorbiz** | Moorabbin | Metro SE (Prestige) | 60 | EasyCars (JEAL) | Y (`10615`) | Y | ~31 | N | DA | Enq | Y | N | Y | N | Y (Google) | Y (`CarHistory`) | N | N | 3 | Fast–Mod (0.24–1.33s) | Prestige/European specialist; verified service history + clear title callout |
| 10 | **AutoProject** | Clayton | Metro SE (JDM Import) | ~173 active (69 sold) | Custom React (`Base44`) + EasyCars sync | Y (`11285`) | Y | ~19 | Y | Both | Both | Y | Y | N | Y (WA) | Y | N | Y | Y | 4 | Moderate (1.67s + 978KB API) | JDM: `/in-transit`, `/welcab-accessible`, `/import-request`, `/spare-parts`, auction grade |
| 11 | **Oyama Car Sales** | Clayton Sth / Mordialloc | Metro SE (JDM Import) | 93 active (114 tot) | VirtualYard / CarsForSale.com.au | Y (`12384`) | Y | ~49 | Y | EGC | Both | Y | N | Y | Y (VY Chat) | N | N | Y | Y | 3 | Slow (3.19–8.49s) | Embedded YouTube walkaround on VDP; `/my-account/` buyer portal; Kei/vans |
| 12 | **Bromotive Motors** | Werribee | Metro W (JDM Import) | 42 | EasyCars (JEAL) + CarDealerz | Y (`0013253`) | Y | ~20 | N | EGC | Enq | Y | N | N | N | Y (Google) | Y (`CarHistory`) | Y | N | 3 | Fast–Mod (0.25–0.91s) | JDM ADR `/compliance/` page + mechanical workshop; 3-mo rego/RWC/warranty note |
| 13 | **Kardinia Park Car Sales** | Newtown (Geelong) | Regional | 45 | DealerStudio / AutoGate (Next.js) | Y (`11014`) | Y | ~59 | N | DA | Both | Y | N† | Y | N | N | N‡ | Y | N | 4 | Fast (0.16–0.45s) | 59-photo gallery on VDP; RedBook specs in payload; clean regional UI |
| 14 | **Major Car Sales** | Grovedale (Geelong) | Regional | 14 | Custom (Tailwind + PHP/static JS) | Y (`11358`) | Y | ~9 | N | DA | N | Y | N | N | N | N | N | Y | N | 3 | Moderate (1.81s; 404 API) | `vehicles.php` returned 404, falling back to `vehicles_data.js` (`2025-09-24`); VDP is modal |
| 15 | **The Car Ranch** | North Geelong | Regional | 92 | EasyCars (JEAL) | Y (`8987`) | Y | ~19 | N | DA | Enq | Y | N | N | N | N | Y (`CarHistory`) | Y | N | 3 | Fast–Mod (0.24–0.97s) | Budget stock focus; RedBook vehicle specs + CarHistory badge |
| 16 | **Mathieson Motors** | Shepparton | Regional | UNV (≥12–36) | Ultimate (`ultimate.net.au`, AngularJS) | Y (`1176`) | Y | UNV | Y | DA | Both | Y | Y (`$1,000`) | N | N | Y (Google) | N | Y | N§ | 3 | Moderate (0.42–2.85s) | True `/shopping-basket/checkout` `$1,000` deposit; `9.5%` / 7-yr repayment estimator |
| 17 | **Traralgon Car City** | Traralgon | Regional | 49 | EasyCars (JEAL) | Y (`7360`) | Y | ~16 | N | DA | Enq | Y | N | N | N | N | Y (`PPSR`) | Y | N | 3 | Slow–Mod (0.54–5.51s) | Regional Gippsland yard; standard EasyCars Bootstrap 3 template |

**Table Notes:**
- `*` Mobile quality (1–5) is HTML/CSS-inferred (see Method caveat).
- `†` DealerStudio templates display a `"Reserve"` CTA/label in VDP markup that routes to a lead/enquiry flow rather than an online card checkout; counted as `N` for true online deposit/checkout.
- `‡` DealerStudio and iMotor integrate RedBook vehicle specifications/valuations in JSON/template code, but did not display a consumer-facing PPSR or CarHistory clear-title badge on the inspected VDP's visible text.
- `§` Mathieson Motors displays `SOLD` ribbons on selected featured cards on the homepage rather than a separate `/sold` archive route.

---

## 2. Aggregates & Platform Share ($N = 17$ unless noted)

### 2.1 Platform / Vendor Share
| Platform / Vendor | Count | Share (%) | Dealers in Sample |
|---|---:|---:|---|
| **EasyCars (JEAL)** *(direct managed site)* | 5 | **29.4%** | Elite Automotive Group, Motorbiz, Bromotive Motors, The Car Ranch, Traralgon Car City *(+ AutoProject uses EasyCars sync)* |
| **DealerStudio / AutoGate (Carsales)** | 3 | **17.6%** | Direct Vehicle Warehouse, Melbourne City Cars & Commercials, Kardinia Park Car Sales *(+ MM Carz uses AutoGate/JEAL feed)* |
| **Custom / Bespoke (Node/React/Tailwind)** | 3 | **17.6%** | Ultimate Motors (Cuff Digital Labs), AutoProject (Base44 + EasyCars), Major Car Sales (Tailwind + PHP/JS) |
| **WordPress (Theme / Agency Build)** | 2 | **11.8%** | Melbourne Car Center (CarDealer + Elementor), MM Carz (Sozou custom WP) |
| **iMotor** | 1 | **5.9%** | Michael and Sons Quality Used Cars |
| **Indiqator / Dealer Solutions (Cox Auto)** | 1 | **5.9%** | P & S Automart |
| **VirtualYard / CarsForSale.com.au** | 1 | **5.9%** | Oyama Car Sales |
| **Ultimate (`ultimate.net.au`)** | 1 | **5.9%** | Mathieson Motors |

> **Key takeaway:** EasyCars (29.4% direct, 35.3% incl. sync) and DealerStudio/AutoGate (17.6% direct, 23.5% incl. feed) together power roughly **half** of the sampled independent VIC yards.

### 2.2 Feature Adoption Rates
| Feature / Attribute | Yes / Count | Denominator (Verified) | % of Verified | Breakdown / Notes |
|---|---:|---:|---:|---|
| **Inventory search filters** | 17 | 17 | **100.0%** | Universal; ranges from 1 dropdown (Make) to 10+ facets |
| **Any finance feature (calc or enquiry)** | 16 | 17 | **94.1%** | Both Calc+Enq: 8 (47.1%); Enq only: 7 (41.2%); Calc only: 1 (5.9%); Neither: 1 |
| **Trade-in / Sell-your-car form** | 15 | 16 | **93.8%** | `P & S Automart` unverified (`Ultimate Motors` = N) |
| **Warranty info shown** | 15 | 16 | **93.8%** | Only `Motorbiz` omitted warranty on inspected VDP (`P & S` unverified) |
| **LMCT licence number displayed** | 15 | 17 | **88.2%** | Missing on `MelCCC` and `Michael & Sons`; `Oyama` VDP-only; `AutoProject` JS footer |
| **Price shown as Drive-Away (DA)** | 11 | 17 | **64.7%** | Pure DA: 11 (64.7%); EGC only: 3 (17.6%); Both/Mixed: 2 (11.8%); Unmarked: 1 (5.9%) |
| **Reviews widget (Google / ProductReview / etc.)** | 7 | 17 | **41.2%** | Google Reviews / Elfsight / ProductReview / on-site testimonials |
| **PPSR / CarHistory clear-title mention** | 6 | 16 | **37.5%** | Mostly EasyCars `CarHistory` badges (`4/5` EC sites) + `Melbourne Car Center` (`PPSR`) |
| **Test-drive booking CTA/form** | 5 | 16 | **31.3%** | `DVW`, `MM Carz`, `Motorbiz`, `Oyama`, `Kardinia Park` |
| **Live chat / WhatsApp** | 5 | 17 | **29.4%** | WhatsApp (`MCC`, `AutoProject`), Podium (`Michael & Sons`), Drift (`MM Carz`), VY Chat (`Oyama`) |
| **Video / walkaround on VDP** | 4 | 16 | **25.0%** | `MM Carz`, `AutoProject` (UI modal), `Oyama` (YouTube), `Mathieson` |
| **Online reservation / holding deposit** | 3 | 16 | **18.8%** | Real card checkout: `MM Carz` (`$1k`), `Mathieson` (`$1k`); reservation flow: `AutoProject` |
| **'Sold' archive page** | 3 | 17 | **17.6%** | `MM Carz`, `AutoProject`, `Oyama` (`Mathieson` shows `SOLD` badges on featured grid) |
| **VDP photo count** | Median ~35 | 15 | — | Min 9 (`Major`), Max 59 (`Kardinia Park`), Mean **~33.1 photos/VDP** |
| **Stock count** | Median 44 | 16 | — | Range 12–173 active; 11 of 16 verified sit in the **27–62** vehicle sweet spot |
| **Mobile quality (1–5 inferred)** | Mean 3.29 | 17 | — | Score 4: 6 sites (35.3%); Score 3: 10 sites (58.8%); Score 2: 1 site (5.9%) |

---

## 3. Product & Engineering Observations for an Independent-Dealer SaaS

1. **Dual-pricing (`Drive-Away` vs. `Excl. Govt. Charges`) is mandatory in VIC — and itemized on-roads wins.**
   While 64.7% of dealers advertise Drive-Away prices (consistent with Australian Consumer Law component-pricing expectations for retail passenger stock), commercial dealers (`MelCCC`) and JDM importers (`Oyama`, `Bromotive`) still price **Excl. Govt. Charges**. Standout UX like `MM Carz` shows *both* (`$84,800 Excl. Govt` + `$4,457.10 Est. on-road costs`). A multi-tenant SaaS must support per-vehicle pricing mode (`Drive Away`, `EGC + est. stamp duty/transfer`, or `Call for Price` fallback) rather than hardcoding one label.
2. **EasyCars dominates budget/mid-tier VIC yards despite dated Bootstrap 3 templates.**
   29.4% of audited sites run EasyCars' cookie-cutter Bootstrap 3 storefront (`0.24–0.97s` fast SSR, built-in CarHistory badge, Drive Away/EGC toggle, SEO suburb-slug pages like `/used-cars-in-geelong/`), while `AutoProject` went so far as to build a custom React/Base44 frontend just to escape EasyCars' dated UI while still syncing inventory from EasyCars. This validates a clear wedge: **keep DMS/portal-sync simplicity, leapfrog EasyCars on modern mobile storefront UX.**
3. **DealerStudio sets the modern visual & media benchmark (Next.js + Algolia + 35–59 photos).**
   All three DealerStudio sites (`DVW`, `MelCCC`, `Kardinia Park`) delivered sub-0.45s TTFB, 35–59 high-res images per VDP, inline weekly repayment figures, RedBook spec tabs, and clean faceted search. However, they lacked active review widgets, sold archives, and true online card deposits — and two had unused template clutter (e.g., `0 New Cars` / `Demo Cars` tabs on a pure used-car yard). Our platform should hide New/Demo nav items automatically when stock count = 0.
4. **30–50 photos per VDP is the de facto VIC expectation.**
   Outside bespoke DIY sites (`Major Car Sales`: 9, `Ultimate Motors`: 16), established independent dealers consistently upload **20–59 photos** (median ~35). Image storage, fast WebP/auto-resize CDN delivery, bulk drag-and-drop/mobile-app upload, and lazy-loaded carousels are core table stakes.
5. **LMCT compliance cannot be left to manual footer editing.**
   Two of 17 licensed traders (`MelCCC`, `Michael & Sons`) failed to display an LMCT number anywhere on their homepage/stock/about pages, and `Oyama` omitted it from the homepage. Under Victorian Consumer Affairs rules, LMCT display is mandatory. Make `LMCT / Dealer Licence #` a required onboarding field that auto-renders in every storefront footer and VDP schema.
6. **DIY / bespoke agency sites break silently and leak stale inventory.**
   `Ultimate Motors` displayed `"24 vehicles"` in static HTML while `/api/cars` returned 46; `Major Car Sales`'s `vehicles.php` returned HTTP 404, silently falling back to a year-old `vehicles_data.js` snapshot (`2025-09-24`) with 14 cars vs. `"20 Vehicles"` in HTML. Managed SaaS hosting with live DB-backed SSR/ISR prevents broken PHP/Node glue and stale stock counts.
7. **Online `$1,000` refundable holding deposits & weekly repayment calculators are high-value differentiators.**
   Only 18.8% (`MM Carz`, `Mathieson Motors`, `AutoProject`) offer online deposits/reservations, and 47.1% combine a repayment calculator with finance enquiry. Offering an optional Stripe/PayID `$500–$1,000` refundable holding deposit + configurable weekly finance estimator (with VIC statutory disclaimer) moves independent dealers from passive lead forms toward modern e-commerce.
8. **PPSR / CarHistory trust badges are underutilized outside EasyCars.**
   Only 37.5% visibly display PPSR/CarHistory clear-title assurance on VDPs (mostly EasyCars' built-in CarHistory badge). Even before live PPSR API integration, allowing dealers to tick `"PPSR Clear Title Verified"` or upload a PDF certificate directly addresses buyer anxiety.
9. **JDM / Import specialists have distinct optional workflow needs (keep as niche toggle).**
   The 3 JDM specialists (`AutoProject`, `Oyama`, `Bromotive`) rely on features irrelevant to domestic yards: `In-Transit` pre-arrival listings, `Auction Grade`, `ADR Compliance` pages, `Walk-Around` YouTube videos, and niche categories (`Welcab` wheelchair-accessible, `Kei` trucks). Keeping these behind an optional `"Import Specialist Mode"` toggle avoids cluttering mainstream yards while cleanly serving importers.
10. **Small UX wins matter: WhatsApp/Chat, Google Reviews, and Sold Archives.**
    Only 29.4% had live chat/WhatsApp and 17.6% had a `/sold` archive (great for social proof & SEO), while 41.2% embedded Google/ProductReview widgets. Shipping built-in WhatsApp click-to-chat, auto-imported Google review widgets, and a toggleable `"Recently Sold"` archive out-of-the-box gives small yards immediate conversion parity with top performers like `MM Carz`.

---

## 4. Sources (All Accessed 24 November 2026)

1. Direct Vehicle Warehouse — https://www.directvehiclewarehouse.com.au/ (also `/search/used-cars`, `/cars/used-rhodium-white-2025-mazda-cx-5-2ca5ds`, `/about-us`) — accessed 24 Nov 2026
2. Ultimate Motors — https://www.ultimatemotors.com.au/ (also `/inventory`, `/api/cars`, `/car/6aa20b4f63ea89c5548f1b6b`, `/js/inventory-script.js`, `/js/car.js`) — accessed 24 Nov 2026
3. Melbourne Car Center — https://melbournecar.com.au/ (also `/listing/`, `/listing/kia-sportage-2020/`, `/listing/ldv-t60-2021/`, `/calculator/`) — accessed 24 Nov 2026
4. Melbourne City Cars & Commercials — https://www.melccc.com.au/ (also `/search/used-cars`, `/cars/used-white-2020-mercedes-benz-sprinter-00002438`, `/about-us`) — accessed 24 Nov 2026
5. Elite Automotive Group — https://www.eliteautomotivegroup.com.au/ (also `/car-sales-in-melbourne/`, `/stock/2022-ford-ranger-cabchassis-xl-pxmkiii2021,75my-636712`, `/finance/`) — accessed 24 Nov 2026
6. Michael and Sons Quality Used Cars — https://michaelandsonsqualitycars.com.au/ (also `/stock/`, `/page-data/stock/page-data.json`, `/about-us/`, `/contact-us/`, `/website-terms-of-use/`) — accessed 24 Nov 2026
7. P & S Automart — https://www.psautomart.com.au/ (also `/used_car_sales_fawkner_victoria/`, `/used_car_sales_fawkner_victoria/sitemap`, `/contact-us/`) — accessed 24 Nov 2026
8. MM Carz — https://mmcarz.com.au/ (also `/explore/`, `/sold/`, `/listings/2023-bmw-x5-g05-lci-xdrive30d-m-sport-wagon-5dr-steptronic-8sp-4x4-3-0dt-1066/`) — accessed 24 Nov 2026
9. Motorbiz — https://www.motorbiz.com.au/ (also `/search-cars/`, `/stock/2015-bmw-1series-hatchback-118isportline-f20lci-639340`, `/finance-insurance/`) — accessed 24 Nov 2026
10. AutoProject — https://autoproject.com.au/ (also `/stock`, `/warranty`, bundle `/assets/index-DkUQ6QnL.js`, and public Vehicle entity API `https://autoprojectapp.base44.app/api/apps/69dabbcd275c2e134c1fb57c/entities/Vehicle`) — accessed 24 Nov 2026
11. Oyama Car Sales — https://oyamacarsales.com.au/ (also `/stock`, `/sold`, `/buy/2021-honda-n-box-custom-l-turbo-jf3/ncyTXB7Bd8tbAD3vZSqC5g`) — accessed 24 Nov 2026
12. Bromotive Motors — https://www.bromotive.com.au/ (also `/all-cars/`, `/our-stock/2019-honda-vezel---hybrid-639672`, `/warranty/`) — accessed 24 Nov 2026
13. Kardinia Park Car Sales — https://www.kardiniaparkcarsales.com.au/ (also `/search/used-cars`, `/cars/used-yellow-2016-hyundai-veloster-00003562`, `/finance`) — accessed 24 Nov 2026
14. Major Car Sales — https://www.majorcarsales.com.au/ (also `/inventory.html`, `/vehicles_data.js`, `/vehicles.php` [404]) — accessed 24 Nov 2026
15. The Car Ranch — https://www.thecarranch.com.au/ (also `/used-cars-in-geelong/`, `/our-stock/2006-ford-escape-wagon-xltsport-zc-636929`, `/warranty/`) — accessed 24 Nov 2026
16. Mathieson Motors — https://www.mathiesonmotors.com/ (also `/our-stock`, `/our-stock/detail/3326931/2022-ford-ranger`, `/finance`) — accessed 24 Nov 2026
17. Traralgon Car City — https://www.tcc.net.au/ (also `/used-cars-in-traralgon/`, `/stock/2024-ford-f_150-utility-lightningpro-standardrangeutilitymy24-638623`, `/contact-us/`) — accessed 24 Nov 2026

---

## 5. Gaps / Not Accessible

- **Live Chrome DevTools visual & mobile viewport rendering:** Chrome remote debugging (`DevToolsActivePort`) was unavailable during this session, so interactive visual layout checks at 390px mobile width, image rendering verification, and Core Web Vitals/LCP timings could not be captured; mobile quality scores (1–5) are HTML/CSS-inferred.
- **P & S Automart VDP (`/used_car_sales_fawkner_victoria/view/...`):** Individual VDP pages on both `www.psautomart.com.au` and `modular.multisite.dealer.solutions` timed out (>15s) or returned 79 bytes; VDP-level attributes (photo count, video, trade-in, online deposit, test-drive, PPSR, warranty) remain `UNVERIFIED` (Drive-Away pricing was verified via search index).
- **Mathieson Motors dynamic AngularJS data:** `/our-stock` and `/our-stock/detail/...` populate vehicle lists and secondary gallery photos asynchronously via `WSStockServices` (`service.ultimate.net.au`), so exact total stock count and full VDP photo count could not be read from static HTML (`UNVERIFIED`, ≥12–36 vehicles linked on homepage).
- **Michael and Sons Quality Used Cars VDP route:** Direct VDP HTML routes were not exposed in `sitemap.xml`, though full vehicle records (including 35-photo array and `"Drive Away"` price qualifier) and VDP template features (`stock-v-5-details` JS chunk + `page-data/stock/page-data.json`) were verified.
- **Excluded / unreachable discovery candidates:** Three initial JDM import candidates failed connection/timed out during initial HTTP discovery on 24 Nov 2026 (`www.melbourneautomobiles.com.au` connection error; `www.jace.com.au` and `www.japimp.com.au` 12s timeouts) and were replaced by accessible JDM specialists (`AutoProject`, `Oyama Car Sales`, `Bromotive Motors`).
