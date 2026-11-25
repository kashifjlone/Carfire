# NSW Independent Used-Car Dealer Website Audit

- **Date:** 24 November 2026
- **Method:** Public web discovery (`search_web`) across metro Sydney, regional NSW, and JDM/import-specialist dealers (excluding franchise new-car groups and national chains like OzCar, easyauto123, and Cars4Us), followed by direct HTTP inspection of public homepages, XML sitemaps, inventory listing pages, `/sold` endpoints, and at least one live Vehicle Detail Page (VDP) per site. No forms were submitted, no logins or accounts were created, and no anti-bot/CAPTCHA gates were bypassed.
- **Sources Accessed Count:** 17 independent NSW dealer websites audited in full (51+ public pages/VDPs/sitemaps inspected out of 30 initial NSW candidates discovered; 2 failed HTTP fetch, 1 lacked live online stock, and 10 remaining backup candidates were not needed once 17 diverse dealers were verified).

> **Sampling Caveat:** This sample ($n = 17$) is purposive and **not statistically representative** of all independent used-car dealers in NSW. Search-engine visibility skews toward dealers with active SEO/vendor-hosted sites and sitemaps.

---

## 1. Dealer Website Audit Table ($n = 17$)

**Legend / Notes:**
- **Region / Type:** `Metro` = Greater Sydney, `Regional` = Regional NSW, `Import` = Import specialist (Metro Sydney).
- **Price Format:** `EGC` = Excl. Govt. Charges (`Excl. Govt. Charges` / `Exc. Gov. Charges`), `DA` = Drive Away, `Not spec.` = bare price on inspected VDP/listing without statutory label.
- **Finance:** `Calc + Enq` = interactive repayment calculator + enquiry/application; `Enq only` = finance enquiry/application without calculator widget (VirtualYard sites display a static `OR $XX per week*` figure + `Apply For Finance`).
- **Mobile Quality (1–5):** *Inferred* from responsive HTML/CSS markup (`<meta name="viewport">`, Bootstrap/responsive CSS grid, sticky CTA structure, HTML weight); live rendered Chrome mobile screenshots could not be captured (see *Gaps*).
- **Speed:** Subjective impression from measured uncached HTML TTFB/download times across Home / Inventory / VDP (`Very Fast` <0.5s, `Fast` 0.5–1.3s, `Moderate` 1.3–2.5s, `Slow` >2.5s).

| # | Business Name | URL | Suburb (Segment) | Approx Stock | Platform / Vendor | Licence Shown | Search Filters | VDP Photos (approx) | Video | Price Format | Finance | Trade-in Form | Online Reserve / Deposit | Test-Drive Booking | Live Chat / WA | Reviews Widget | PPSR / History | Warranty Info | 'Sold' Archive | Mobile (1–5, inferred) | Page Speed Impression | Other Notable Features |
|---:|---|---|---|---:|---|---|---|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Tony Lahood Motors** | https://www.tonylahoodmotors.com.au/ | Lidcombe / Croydon (Metro) | ~152 | EasyCars (Jeal) | Y (`MD19022`) | Y | ~24 | N | Not spec. | Calc + Enq | Y | N | N | N | Y (Testimonials) | Y | Y | N (404-like) | 3/5 | Moderate (2.1–3.2s) | Multi-branch; budget pages (`Under $5k/$10k`); ClickCease; service centre |
| 2 | **Orion Autos** | https://orionautos.com.au/ | Penrith (Metro) | ~75 | VirtualYard | Y (`MD046714`) | Y | ~19 | N | EGC | Enq only | Y | Y (`Reserve Now`) | Y | Y (LiveChat) | N | Y (`AUTOVOIS+` / PPSR) | Y | N | 4/5 | Moderate (1.7–3.9s) | SecurePay deposit checkout; weekly estimate (`$XX/wk`); Find Me A Vehicle |
| 3 | **Country Wholesale Group** | https://www.cwg.net.au/ | Port Macquarie (Regional) | ~48 | EasyCars (Jeal) | Y (`MD103342`) | Y | ~34 | Y (YouTube) | EGC | Calc + Enq | Y | N | N | N | Y (Testimonials) | Y | Y | N | 3/5 | Moderate (1.6–2.5s) | Watchlist; Find Me A Car; detailing service page |
| 4 | **JustJap Vehicles** | https://www.justjapvehicles.com.au/ | Kirrawee (Import) | ~38 | EasyCars (Jeal) | Y (`MD16394`) | Y | ~23 | N | EGC | Calc + Enq | N | N | N | N | N | N | Y | N | 3/5 | Slow–Mod (2.0–4.5s) | Watchlist; niche categories (Kei Trucks, R35 GTR, JDM, Euro, Motorcycles) |
| 5 | **Newcastle RAW** | https://newcastleraw.com/ | Lambton / Newcastle (Regional) | ~37 | VirtualYard | Y (`MD 086732`) | Y | ~19 | Y (`<video>`) | EGC | Enq only | Y | N | Y | Y (LiveChat) | N | Y (`AUTOVOIS+`) | Y | N | 4/5 | Moderate (1.7–2.1s) | Vehicle compare tool; interstate delivery; Find Me A Vehicle |
| 6 | **Top Garage** | https://www.topgaragesyd.com.au/ | Alexandria (Metro) | ~34 | EasyCars (Jeal) | Y (`MD086292`) | Y | ~21 | N | EGC | Calc + Enq | Y | N | N | N | N | Y | Y | Y (3+ pgs) | 3/5 | Fast–Mod (1.6–1.7s) | Watchlist; prestige & JDM Alphard/hybrid stock |
| 7 | **Urban Auto Co** | https://urbanautoco.com.au/ | Brookvale (Metro) | ~33 | VirtualYard | Y (`MD096786`) | Y | ~19 | Y (YouTube) | EGC | Enq only | Y | N | Y | Y (LiveChat) | N | Y (`AUTOVOIS+`) | Y | Y (`/sold`) | 4/5 | Fast–Mod (1.2–2.0s) | Weekly repayment estimates; Find Car sourcing |
| 8 | **Wholesale Used Cars** | https://www.wholesaleusedcars.com.au/ | Granville (Metro) | ~33 | EasyCars (Jeal) | Y (`MD044943`) | Y | ~16 | N | Not spec. | Enq only | Y | N | N | N | N | Y (PPSR) | N | N | 3/5 | Fast–Mod (1.0–2.1s) | Watchlist; interstate delivery mention |
| 9 | **Japanese Auto Imports** | https://japaneseauto.com.au/ | Kogarah (Import) | ~26 (38 w/ incoming) | VirtualYard | Y (`MD071299`) | Y | ~22 | N | EGC | Enq only | Y | N (text mention only) | Y | N | Y (Testimonials) | N | Y | N | 4/5 | Fast (1.0–1.1s) | Wheelchair/Welcab & camper conversion niches; incoming stock ETA tags |
| 10 | **Wholesale 911** | https://www.wholesale911.com.au/ | Dubbo (Regional) | ~22 | EasyCars (Jeal) | Y (`MD17391`) | Y | ~4 | N | EGC | Calc + Enq | N | N | N | N | Y (Google) | Y | Y | N | 3/5 | Fast (0.9–1.0s) | Watchlist; heavy focus on regional 4x4/utes |
| 11 | **Coffs Harbour Motorworld** | https://www.coffsharbourmotorworld.com.au/ | Coffs Harbour (Regional) | ~20 | Dealer Studio (Adtorque) | Y (`MD20607`) | Y | ~8 | N | EGC | Enq only | Y | N | Y | Y (Podium + WA) | N | N | N | N | 4/5 | Very Fast (0.3–0.4s) | View counter (`0 views`); print spec sheet; Cloudinary/edge images |
| 12 | **Corban Automotive** | https://www.corbanauto.com.au/ | Wollongong (Regional) | ~19 | EasyCars (Jeal) | Y (`MD18475`) | Y | ~17 | N | EGC | Calc + Enq | Y | N | N | N | N | Y | Y | N | 3/5 | Fast (0.9–1.2s) | Watchlist; single-page anchor jump links |
| 13 | **Pride & Joy Motors** | https://www.prideandjoymotors.com.au/ | Lansvale (Metro) | ~16 | EasyCars (Jeal) | Y (`MD050564`) | Y | ~29 | N | EGC | Calc + Enq | Y | N | N | N | N | Y | Y | N | 3/5 | Fast (0.9–1.0s) | Watchlist |
| 14 | **Best JDM Import Cars** | https://www.bestjdm.com.au/ | Smithfield (Import) | ~11 | Custom Next.js | Y (`MD094355`) | Y | ~26 | Y (`<video>` walkaround) | EGC | Calc + Enq | N | N | Y (`Cal.com`) | Y (WA + Messenger) | Y (Google) | N | Y (`$0` claim fee) | N | 5/5 | Mod–Slow (1.6–3.8s) | "Order from Japan" import guide/sourcing; `Cal.com` scheduling; delivery info |
| 15 | **Auto Speed Ryde** | https://auto-speed.com.au/ | Ryde (Metro) | ~9 | WordPress (Directorist / custom `ss26`) | Y (`MD 095730`) | Y | ~23 | N | Not spec. | Enq only | Y | N | Y | Y (WhatsApp) | Y (Trustindex Google) | Y (PPSR) | Y (7-day guarantee) | N | 4/5 | Fast–Mod (1.4–1.6s) | Custom 7-day mechanical money-back bar; SEO blog for sellers |
| 16 | **Murrumbidgee Car Sales** | https://www.murrumbidgeecarsales.com.au/ | Wagga Wagga (Regional) | ~8 (16 in sitemap) | EasyCars (Jeal) | Y (`MD20832`) | Y | ~3–4 | N | EGC | Calc + Enq | Y | N | N | N | Y (Google) | Y | Y | N | 3/5 | Slow (2.4–4.2s) | Watchlist; commercial buses alongside SUVs/utes |
| 17 | **5th Street Automotive** | https://www.5thst.com.au/ | Moorebank (Metro) | ~2 (+ sold) | EasyCars (Jeal) | Y (`MD087590`) | Y | ~22 | N | EGC | Calc + Enq | Y | N | N | Y (Podium) | Y (Google) | Y | Y | Y (3 pgs) | 3/5 | Moderate (2.1–2.6s) | Watchlist; strike-through markdown pricing (`$27,990` -> `$25,990`) |

---

## 2. Aggregate Metrics ($n = 17$)

### Platform / Vendor Share
| Platform / Vendor | Count | Share | Notes |
|---|---:|---:|---|
| **EasyCars (Jeal)** | 10 | **58.8%** | Dominates independent NSW yards via bundled DMS + Umbraco/Bootstrap site (`jealstorage.blob.core.windows.net`). |
| **VirtualYard** | 4 | **23.5%** | Second major DMS/web bundle (`dealers.virtualyard.com.au`, `securepay.virtualyard.com.au`, `carsforsale.com.au`). |
| **Dealer Studio (Adtorque)** | 1 | **5.9%** | Next.js + Cloudinary stack; fastest TTFB in sample (`0.3–0.4s`), more commonly seen on larger/franchise groups. |
| **WordPress (custom/plugin)** | 1 | **5.9%** | `ss26` custom theme + directory listing post type (`ad-listing`) + Trustindex. |
| **Custom Next.js** | 1 | **5.9%** | Bespoke build by/for an import specialist with `Cal.com` and WhatsApp. |

### Feature Adoption Rates
| Feature / Attribute | Count ($/17$) | Percentage |
|---|---:|---:|
| **NSW MD Licence Number Shown** | 17 / 17 | **100.0%** |
| **Inventory Search Filters** | 17 / 17 | **100.0%** |
| **Finance Enquiry / Application (Any)** | 17 / 17 | **100.0%** |
| **Warranty Info** | 15 / 17 | **88.2%** |
| **Price Shown as Excl. Govt. Charges (`EGC`)** | 14 / 17 | **82.4%** |
| **Price Shown as Drive-Away (`DA`) or Both** | 0 / 17 | **0.0%** |
| **Price Label Not Specified on VDP** | 3 / 17 | **17.6%** |
| **Trade-in / Sell-Your-Car Form** | 14 / 17 | **82.4%** |
| **PPSR / Vehicle History Mention** | 13 / 17 | **76.5%** |
| **Interactive Finance Calculator** | 10 / 17 | **58.8%** |
| **Reviews / Testimonials Widget** | 8 / 17 | **47.1%** |
| **Dedicated Test-Drive / Inspection Booking CTA** | 7 / 17 | **41.2%** |
| **Live Chat / WhatsApp / Podium** | 7 / 17 | **41.2%** |
| **Video (Walkaround or Embed)** | 4 / 17 | **23.5%** |
| **Populated 'Sold' Archive** | 3 / 17 | **17.6%** |
| **Active Online Reservation / Holding Deposit** | 1 / 17 | **5.9%** |
| **VDP Photo Count** | — | **Median: 21** (Range: 3–34; Mean: ~19.1) |

---

## 3. Observations for an Independent-Dealer SaaS Platform

1. **EasyCars + VirtualYard own ~82% of this NSW independent sample—your website cannot be decoupled from DMS/inventory sync.**
   Independent NSW dealers rarely buy a standalone CMS; 14 of 17 sites run on EasyCars (`58.8%`) or VirtualYard (`23.5%`) because stock, photos, pricing, and portal exports sit in one back-office database. Even a much prettier storefront will fail unless CSV import, stock management, and automated VDP publishing are effortless.
2. **Every audited dealer displays an `MD` licence number (`100%`) and almost all quote `Excl. Govt. Charges` (`82.4%`)—NSW compliance primitives must be first-class.**
   `Dealer Licence MD...` sits prominently in headers/footers across all 17 sites. Meanwhile, zero sites quoted Drive-Away-only pricing (`14` used `Excl. Govt. Charges`; `3` omitted the label on VDPs). The platform must support a mandatory Licence Number field per tenant/branch and explicit per-vehicle price qualifiers (`Excl. Govt. Charges`, `Drive Away`, `POA`, plus optional strike-through markdown pricing like 5th Street Automotive).
3. **Trust signals (PPSR/history + warranty + Google reviews) are table stakes, yet vendor templates execute them inconsistently.**
   `88.2%` highlight warranty info and `76.5%` mention PPSR/CarHistory (EasyCars uses a generic *"FREE Car history report"* lead-capture gate; VirtualYard embeds `AUTOVOIS+` blocks), while `47.1%` surface reviews/testimonials. Giving dealers a native Google Reviews widget and an optional PPSR/clear-title trust badge (even manual/verified before full PPSR API integration) removes third-party widget clutter and boosts conversion.
4. **Online reservation/deposits (`5.9%`) and video (`23.5%`) are rare today—high differentiation if kept optional and zero-friction.**
   Only Orion Autos had a live `Reserve Now` deposit checkout (`securepay.virtualyard.com.au/deposit/...`), though Japanese Auto Imports mentioned holding deposits in plain text for incoming stock. Most independents still prefer phone/enquiry negotiation before taking money; make Stripe/holding-deposit toggles opt-in per dealer rather than forced.
5. **Lead capture is multi-channel and heavily mobile/messaging-driven (`41.2%` chat/WhatsApp, `41.2%` test-drive booking, `82.4%` trade-in).**
   Legacy EasyCars templates rely on clunky email forms (`mailto:` links even appear in footers!) and lack WhatsApp/SMS/webchat unless dealers pay extra for Podium (`5th Street`, `Coffs Harbour`). Modern independents (`Best JDM`, `Auto Speed Ryde`, `VirtualYard` dealers) use WhatsApp (`wa.me`), LiveChat, or `Cal.com` inspection booking. Built-in WhatsApp click-to-chat, test-drive/inspection scheduling, finance enquiry + simple repayment slider, and trade-in lead capture should be core CRM-fed modules.
6. **Legacy EasyCars templates look dated (`3/5` inferred mobile UX) and frequently ship broken `/sold-cars/` routes.**
   Multiple EasyCars sites returned HTTP 200 *"Page Not Found"* on `/sold-cars/`, relied on decade-old Bootstrap 3 templates (`oss.maxcdn.com` shims), and loaded VDPs in 2–4+ seconds. A fast, mobile-first Next.js/modern storefront (matching Dealer Studio's ~0.3–0.4s edge speed and Best JDM's mobile UX) with a clean opt-in `Sold` archive will visibly outclass incumbent independent dealer sites.
7. **Regional yards suffer most from thin media (`3–8` photos) and slow sites, while import specialists need optional niche fields.**
   Two regional dealers (`Murrumbidgee` 3–4 photos, `Wholesale 911` 4 photos, `Coffs Harbour` 8 photos) had sparse galleries vs metro yards (`19–34` photos). Fast mobile bulk photo upload/reordering from a phone matters more to a 10–25 car yard than complex CMS features. Meanwhile, the 3 import specialists needed niche extensions—incoming/in-transit ETA tags (`Japanese Auto Imports`), custom-order sourcing guides (`Best JDM`), and Kei/JDM/Welcab category tags (`JustJap`, `Japanese Auto Imports`)—confirming that import-specific tooling should be modular add-ons, not core clutter.

---

## 4. Sources (All Accessed 2026-11-24)

1. Tony Lahood Motors — https://www.tonylahoodmotors.com.au/ (VDP: https://www.tonylahoodmotors.com.au/used-car-lidcombe/2017-mazda-2-hatchback-gt-dj2haa-639518) — accessed 2026-11-24
2. Orion Autos — https://orionautos.com.au/ (VDP: https://orionautos.com.au/buy/2017-nissan-qashqai-st-j11/UaMhMWMwlHfn5wqXvAFmbA) — accessed 2026-11-24
3. Country Wholesale Group — https://www.cwg.net.au/ (VDP: https://www.cwg.net.au/our-vehicle/2023-toyota-rav4-5dwagon-cruiser(awd)hybrid-axah54r-638747) — accessed 2026-11-24
4. JustJap Vehicles — https://www.justjapvehicles.com.au/ (VDP: https://www.justjapvehicles.com.au/stock/2023-nissan-skyline-sedan-skyline400r-rv37-639761) — accessed 2026-11-24
5. Newcastle RAW — https://newcastleraw.com/ (VDP: https://newcastleraw.com/buy/2009-holden-barina-tk-my09/tJXJ64jffRFn4Exs6FbBPg) — accessed 2026-11-24
6. Top Garage — https://www.topgaragesyd.com.au/ (VDP: https://www.topgaragesyd.com.au/stock/2023-toyota-alphard-wag-zhybrid--551899) — accessed 2026-11-24
7. Urban Auto Co — https://urbanautoco.com.au/ (VDP: https://urbanautoco.com.au/buy/2018-audi-a4-2-0-tfsi-s-tronic-s-line-f4-my18-b9/Q7T4WcMrqw3ggxOJxZNJlQ) — accessed 2026-11-24
8. Wholesale Used Cars — https://www.wholesaleusedcars.com.au/ (VDP: https://www.wholesaleusedcars.com.au/our-vehicles/2015-nissan-x_trail-wagon-st-t32-638353) — accessed 2026-11-24
9. Japanese Auto Imports — https://japaneseauto.com.au/ (VDP: https://japaneseauto.com.au/buy/2020-toyota-hiace-welcab-rear-arm-lift-wheelchair-6-seats-auto-2-0i/5xRhBfDRvIxgihbmuKIUGw) — accessed 2026-11-24
10. Wholesale 911 — https://www.wholesale911.com.au/ (VDP: https://www.wholesale911.com.au/stock/2018-ford-ranger-crewcchas-xl3,2(4x4)(5yr)-pxmkiimy18-637779) — accessed 2026-11-24
11. Coffs Harbour Motorworld — https://www.coffsharbourmotorworld.com.au/ (VDP: https://www.coffsharbourmotorworld.com.au/cars/used-blue-2014-holden-colorado-8158) — accessed 2026-11-24
12. Corban Automotive — https://www.corbanauto.com.au/ (VDP: https://www.corbanauto.com.au/stock/2020-holden-astra-5dhatchback-r-bkmy20-638433) — accessed 2026-11-24
13. Pride & Joy Motors — https://www.prideandjoymotors.com.au/ (VDP: https://www.prideandjoymotors.com.au/stock/2024-kia-cerato-5dhatchback-s-bdmy24-634473) — accessed 2026-11-24
14. Best JDM Import Cars — https://www.bestjdm.com.au/ (VDP: https://www.bestjdm.com.au/cars/110-2019-mercedes-benz-s450) — accessed 2026-11-24
15. Auto Speed Ryde — https://auto-speed.com.au/ (VDP: https://auto-speed.com.au/ad-listing/2014-subaru-forester/) — accessed 2026-11-24
16. Murrumbidgee Car Sales — https://www.murrumbidgeecarsales.com.au/ (VDP: https://www.murrumbidgeecarsales.com.au/vehicle/2018-mazda-cx_9-4dwagon-azami(awd)-my18-617793) — accessed 2026-11-24
17. 5th Street Automotive — https://www.5thst.com.au/ (VDP: https://www.5thst.com.au/stock/2017-mercedes_benz-glc-4dwagon-250-253my17-583151) — accessed 2026-11-24

---

## 5. Gaps / Not Accessible

- **Visual Mobile Viewport Rendering & Core Web Vitals:** Browser automation could not connect to Chrome (`DevToolsActivePort` not active on local environment), so **Mobile Quality (1–5)** scores are *inferred* from HTML viewport meta tags, CSS frameworks (Bootstrap/responsive classes), and page structure rather than live 390×844 mobile viewport screenshots, and **Page Speed** reflects uncached HTML TTFB/download times from outside Australia rather than full browser LCP/CLS/INP measurements.
- **Form Submissions & Post-Click Modals:** Per research rules, no enquiry, finance, trade-in, test-drive, or Stripe/SecurePay deposit forms were submitted, so downstream lead-routing behaviour (e.g., whether forms push into DMS/CRM vs email) was not tested.
- **Unreachable / Excluded Candidates During Screening:**
  - `https://www.srautotraders.com.au` (SR Auto Traders, Artarmon) — failed HTTP fetch (`fetch failed`).
  - `https://www.theoneautosydney.com.au` (The One Auto Sydney, Alexandria) — failed HTTP fetch (`fetch failed`).
  - `https://carss.com.au/` (Carss Australia, Mascot) — accessible WordPress landing/sell-my-car site with no live online vehicle inventory pages; excluded from the 17-dealer storefront audit.
  - `https://www.jdmautoimports.com.au/` (JDM Auto Import, Wetherill Park) — returned only a 3 KB shell on initial scan; replaced by 3 fuller-featured JDM/import specialists (`JustJap`, `Japanese Auto Imports`, `Best JDM Import Cars`).
