# Queensland (QLD) Independent Used-Car Dealer Website Audit

- **Date:** 24 November 2026
- **Method:** Public web search (`search_web`) to identify independent Queensland used-car dealers across metro Brisbane/Logan, Gold Coast, Sunshine Coast, and regional QLD (Toowoomba, Mackay, Bundaberg, Cairns), followed by non-authenticated public HTTP/HTML/API inspection of each dealer's homepage, inventory/search page, finance/warranty/sold pages, and one live Vehicle Detail Page (VDP). Corporate/ABN checks were used to exclude franchise-backed and major national dealer groups (e.g., Tony White Group). No forms were submitted, no accounts were created, and no anti-bot/CAPTCHA gates were bypassed. Mobile quality scores (1–5) are subjective assessments based on responsive viewport metadata, CSS/UI framework modernity (e.g., Next.js/Tailwind vs. legacy Bootstrap 3.3.6), and mobile navigation markup; page speed impressions reflect measured public HTML/API response times on 24 November 2026.
- **Note on Representativeness:** This sample of 17 dealers is purposive (designed to mix metro/regional, small/mid/large stock, and import specialists) and is **not statistically representative** of all QLD independent dealers.
- **Sources Accessed Count:** 24 primary URLs/domains (17 audited dealer sites, 3 blocked/unreachable candidates documented in Gaps, 2 excluded group-affiliated dealers checked for independence, plus ABN/business-registry verification sources).

---

## 1. Dealer Website Audit Matrix (N = 17)

| # | Business Name | URL | Suburb / Region | Approx. Stock | Platform / Vendor | Licence Shown | Search Filters | VDP Photos (approx.) | Video | Price Display | Finance Calc / Enquiry | Trade-In Form | Online Reserve / Deposit | Test-Drive Booking | Live Chat / WhatsApp | Reviews Widget | PPSR / History | Warranty Info | Sold Archive | Mobile Quality (1–5) | Speed Impression | Other Notable Features |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Brizzy Car Guys | https://www.brizzycarguys.com.au/ | Moorooka, Brisbane (Metro) | ~49 | Dealer Studio (Next.js / AutoGate) | Y (`DL: 4432961`) | Y | ~43 | N* | Drive-away | Y (Calc + Enq) | Y | N | Y | Y (WhatsApp) | Y (Google) | N | Y | N | 4 | Fast (~0.7–1.3s) | Service booking page (`/service`), Favourites/Saved list |
| 2 | Brisbane Wholesale Vehicles | https://www.brisbanewholesalevehicles.com.au/ | Moorooka & Springwood, Brisbane (Metro) | ~139 | Dealer Studio (Next.js / AutoGate) | Y (`4023763`) | Y | ~40 | N* | Drive-away | Y (Calc + Enq) | Y | Y (`Reserve Car Now`) | N | Y (Podium) | Y (Podium + Google) | N | Y | N | 4 | Fast (~0.4–1.2s) | Multi-yard location selector (2 branches), Saved Vehicles, 100% online deposit CTA |
| 3 | Gold Coast Car Warehouse | https://www.gccw.com.au/ | Ashmore, Gold Coast (Metro) | ~47 | Dealer Studio (Next.js / AutoGate) | N | Y | ~70 | N* | Excl. govt charges | Y (Enq only) | Y | Y (`Reserve Car Now`) | Y | Y (WhatsApp) | Y (Google) | N | Y | N | 4 | Fast (~0.1–0.3s) | Service page (`/service`), Team page |
| 4 | King of The Cheapies | https://www.kingofthecheapies.com.au/ | Slacks Creek, Logan (Metro) | ~121 | Dealer Studio (Next.js / AutoGate) | Y (`MD 115969146`) | Y | ~32 | N* | Drive-away | Y (Calc + Enq) | Y | N | Y | Y (WhatsApp) | Y (Google) | N | Y | N | 4 | Fast (~0.3–0.4s) | Low-doc / pensioner / self-employed finance messaging, Favourites |
| 5 | Cars Galore Toowoomba | https://www.carsgaloretoowoomba.com.au/ | Toowoomba City (Regional) | ~362 | Dealer Studio (Next.js / AutoGate) | Y (`3196950`) | Y | ~38 | N* | Drive-away | Y (Calc + Enq) | Y | N | Y | Y (Podium + WhatsApp) | Y (Podium) | N | Y | N | 4 | Fast (~0.5–1.1s) | High-volume regional independent (family trust, 25+ yrs) |
| 6 | Ross Newton Motors | https://www.rossnewtonmotors.com.au/ | Mackay (Regional) | ~11 | Dealer Studio (Next.js / AutoGate) | N | Y | ~32 | N* | Drive-away | Y (Enq only) | Y | N | Y | Y (WhatsApp) | Y (Google) | N | Y | N | 4 | Fast (~0.1–0.4s) | Dedicated Finance Pre-Approval nav CTA |
| 7 | G & T Auto Sales | https://www.gtautosale.com.au/ | Bundaberg Central (Regional) | ~28 | Dealer Studio (Next.js / AutoGate) | N | Y | ~22 | N* | Both | Y (Enq only) | Y | N | Y | Y (WhatsApp) | Y (Google) | N | Y | N | 4 | Fast (~0.1–0.4s) | Dedicated Finance Pre-Approval nav CTA |
| 8 | Coastal Cars Select | https://www.coastalcarsselect.com.au/ | Moffat Beach, Sunshine Coast (Metro/Coast) | ~48 | EasyCars (Jeal) | N | Y | ~21 | N | Both | Y (Calc + Enq) | Y | N | N | N | Y (Elfsight Google) | Y (Free report lead form) | Y | N | 3 | Moderate (~0.6–2.7s) | Interstate delivery & mechanical services pages; Print/Email brochure |
| 9 | JCS Import Hub | https://www.jcsimporthub.com.au/ | MacGregor, Brisbane (Metro - Import) | ~2 (+6 sold) | EasyCars (Jeal) | Y (`4818327`) | Y | ~25 | N | Drive-away | Y (Calc + Enq) | Y | N | N | Y (LiveChat) | N | Y (Free report lead form) | Y | Y (`/sold-cars/`) | 3 | Moderate (~0.2–3.5s) | JDM & European import specialist, appointment-only showroom, FAQ/import services |
| 10 | Coastline Car Yard | https://www.coastlinecaryard.com.au/ | Nambour, Sunshine Coast (Metro/Coast - Import) | ~16 | EasyCars (Jeal) | Y (`4884265`) | Y | ~34 | N | Drive-away | Y (Calc + Enq) | Y | N | N | N | N | Y (Free report lead form) | Y | N | 3 | Moderate (~0.3–3.9s) | Mix of JDM imports & local stock; also advertises `/rental-cars/` |
| 11 | Mulgrave Motors | https://www.mulgravemotors.com.au/ | Cairns (Regional) | ~61 | EasyCars (Jeal) | Y (`4655209`) | Y | ~3** | N | Drive-away | Y (Calc + Enq) | Y | N | N | N | N | Y (Free report lead form) | Y | N | 3 | Moderate (~0.3–5.6s) | "Just Arrived Awaiting Detail" stock badges; local SEO blog |
| 12 | Carselling | https://www.carselling.com.au/ | Ashmore, Gold Coast (Metro) | ~21 listed (claims 80+ in yard) | Indiqator / Dealer Solutions (WordPress) | Y (`3118452`) | Y | ~37 | N | Unspecified on sampled VDP (shows `$14,999` + `$75/wk`) | Y (Calc + Enq) | Y | Y (Refundable deposit flow) | Y | N | N | Y (`CLEAR PPSR`) | Y | N | 3 | Slow (~1.5–5.9s) | In-house service centre, "View My Garage" shortlist, Australia-wide freight |
| 13 | Cheap Cars Toowoomba | https://www.cheapcarstoowoomba.com.au/ | South Toowoomba (Regional) | ~41 | Indiqator / Dealer Solutions (WordPress) | Y (`4080920`) | Y | ~45 | N | Drive-away | Y (Calc + Enq) | Y | Y (Refundable deposit flow) | N | Y (Podium) | Y (Podium) | Y (`PPSR` mention) | N | N | 3 | Slow (~6.9–9.8s) | Budget focus, "View My Garage" shortlist |
| 14 | Preferred Autos | https://www.preferredautos.com.au/ | Arundel, Gold Coast (Metro - Import/Hybrid) | ~115 | Squarespace Commerce | N | Y | ~15 | N | Both / Unspecified on VDP (Drive-away on Hybrid landing page) | Y (Weekly/Enq) | Y | Y (`Add To Cart` checkout) | Y | Y (Podium) | Y (Podium + ProductReview) | N | Y | N | 4 | Moderate (~0.8–2.2s) | Non-auto e-commerce stack (Squarespace); JDM hybrids & Suzuki Jimny focus |
| 15 | AllFour Imports | https://www.allfourimports.com.au/ | Arundel, Gold Coast (Metro - Import) | ~8 (+12 sold) | WordPress (Winner Websites plugin) | Y (`MD4676868`) | N | ~16 | Y | Drive-away (`QLD drive away`) | Y (Enq only) | N | N | N | Y (WhatsApp + SMS) | N | Y (Auction grade `3.5C` + Japan inspection) | Y | Y (`/sold-vehicles/`) | 4 | Moderate–Slow (~0.8–6.1s) | Incoming Japan stock ETA ("Arriving December 2026"); 4WD workshop & suspension fitouts |
| 16 | CarStrike | https://carstrike.com.au/ | Coorparoo, Brisbane (Metro - Import) | ~326 network (incl. `STR-` own stock) | YardStrike (Custom React/Vite SPA) | N (ABN only) | Y (SPA) | ~38 | Y | Excl. govt charges | Y (Weekly/Enq) | Y | N (`Make an offer` only) | Y | Y (WhatsApp + `K.I.T.T. AI`) | N | Y (`Clear PPSR` + `Request auction sheet`) | Y | N | 4 | Moderate (~0.5–6.0s) | `K.I.T.T. AI` assistant, `Track my import`, "Car Check" deal score, multi-dealer network syndication, rentals |
| 17 | Henderson Cars | https://www.hendersoncars.com.au/ | Mooloolaba, Sunshine Coast (Metro/Coast) | ~24 | Revamp Studio / iLoans + UBS/MTAQ feed | N | Y | ~18 | N | Excl. govt charges | Y (Weekly/Enq) | Y | N | Y | N | Y (Homepage reviews) | Y (`Clear Title`) | Y | N | 4 | Fast shell (~0.2–0.3s; client API risk) | Client-side `/api/vehicles` fetch; UBS/MTAQ photo hosting over HTTP |

> \* **Dealer Studio video note:** The Dealer Studio Next.js payload includes `video_url`, `videos`, and `walkaround_videos` fields, but all 7 sampled Dealer Studio VDPs had `null` / empty video arrays.  
> \*\* **Mulgrave Motors photo note:** The sampled 2010 Nissan Micra listing was marked `"JUST ARRIVED AWAITING DETAIL"` with 3 photos; other EasyCars listings on the same site had 20–34 photos.

---

## 2. Aggregates & Platform Share (N = 17)

### Platform / Vendor Share
| Platform / Vendor | Count | Share (%) | Dealers in Sample |
|---|---:|---:|---|
| **Dealer Studio** (Next.js / AutoGate feed) | 7 | 41.2% | Brizzy Car Guys, Brisbane Wholesale Vehicles, Gold Coast Car Warehouse, King of The Cheapies, Cars Galore Toowoomba, Ross Newton Motors, G & T Auto Sales |
| **EasyCars** (Jeal DMS + Website) | 4 | 23.5% | Coastal Cars Select, JCS Import Hub, Coastline Car Yard, Mulgrave Motors |
| **Indiqator / Dealer Solutions** (Cox Automotive / WP) | 2 | 11.8% | Carselling, Cheap Cars Toowoomba |
| **Squarespace Commerce** | 1 | 5.9% | Preferred Autos |
| **WordPress (Winner Websites plugin)** | 1 | 5.9% | AllFour Imports |
| **YardStrike (Custom React/Vite SPA)** | 1 | 5.9% | CarStrike |
| **Revamp Studio / iLoans (+ UBS/MTAQ)** | 1 | 5.9% | Henderson Cars |

### Feature Adoption Across Sampled Sites (N = 17)
| Feature / Attribute | Count (Y) | % of Sample | Notes |
|---|---:|---:|---|
| **Finance CTA (Calc or Enquiry)** | 17 / 17 | 100.0% | **10 / 17 (58.8%)** have an interactive repayment calculator; another 3 display weekly payment estimates (`$xx/wk`); 4 are enquiry-only |
| **Inventory search filters** | 16 / 17 | 94.1% | Only AllFour Imports (8 vehicles) omits multi-facet filters |
| **Trade-in / sell-your-car form** | 16 / 17 | 94.1% | Dedicated `/sell-your-car` or `/trade-in` page, plus VDP modal/CTA |
| **Warranty info** | 16 / 17 | 94.1% | Statutory + 1–5 yr extended warranty upsells |
| **Live chat / WhatsApp** | 12 / 17 | 70.6% | WhatsApp (7), Podium (4), LiveChat (1), custom AI assistant `K.I.T.T. AI` (1) — some overlap |
| **Reviews widget / social proof** | 11 / 17 | 64.7% | Google Reviews / Podium / Elfsight / ProductReview |
| **QLD Dealer Licence shown** | 10 / 17 | 58.8% | 7 / 17 did not display a licence number on the homepage/footer HTML inspected |
| **Test-drive booking** | 10 / 17 | 58.8% | Standard on Dealer Studio, Indiqator (Carselling), Squarespace, YardStrike, Revamp Studio; **0 / 4 EasyCars** had a dedicated test-drive button on VDP |
| **PPSR / vehicle history mention** | 9 / 17 | 52.9% | 4 / 4 EasyCars use it as a lead-gen gate ("Free car history report"); **0 / 7 Dealer Studio** mentioned PPSR on sampled VDPs |
| **Online reservation / deposit** | 5 / 17 | 29.4% | BWV, GCCW, Carselling, Cheap Cars Toowoomba, Preferred Autos (`Add To Cart`) |
| **Video on sampled VDP** | 2 / 17 | 11.8% | AllFour Imports, CarStrike (though Dealer Studio schema supports it) |
| **Sold archive** | 2 / 17 | 11.8% | JCS Import Hub, AllFour Imports (both import specialists) |
| **Price display: Drive-away** | 10 / 17 | 58.8% | Most common default in QLD |
| **Price display: Excl. govt charges** | 3 / 17 | 17.6% | GCCW, CarStrike, Henderson Cars |
| **Price display: Both (mixed)** | 2 / 17 | 11.8% | G & T Auto Sales, Coastal Cars Select |
| **Price display: Unspecified on VDP** | 2 / 17 | 11.8% | Carselling VDP, Preferred Autos `/shop/p/...` VDP |
| **VDP Photo Count (approx.)** | — | — | Median: **32** photos; Mean: **33.0**; Typical range (excl. 1 "awaiting detail" car): **15–70** |
| **Mobile Quality (subjective 1–5)** | — | — | Mean: **3.65 / 5** (11 scored 4/5; 6 legacy EasyCars/Indiqator scored 3/5) |

---

## 3. Key Observations for an Independent-Dealer SaaS Platform

1. **Dealer Studio & EasyCars dominate QLD independents—and leave a clear modernisation gap:** Together, **Dealer Studio (41.2%)** and **EasyCars (23.5%)** power **64.7%** of the sampled QLD sites, with Indiqator/Dealer Solutions at **11.8%**. While Dealer Studio delivers fast Next.js storefronts (~0.3–1.1s), EasyCars and Indiqator sites still run on dated Bootstrap 3.3.6 / jQuery templates (3/5 mobile quality, Indiqator page loads up to 5.9–9.8s). A modern, fast-loading storefront with DMS-lite/inventory sync can immediately leapfrog EasyCars and Indiqator on UX and speed without requiring Cox/Carsales lock-in.
2. **Drive-away vs. Excl. Govt. Charges must be configurable per vehicle, not hardcoded site-wide:** **58.8%** show Drive-away, **17.6%** show Excl. Govt. Charges (common among import/unregistered stock like CarStrike and some coastal yards), and **11.8%** mix both on the same site (G & T Auto Sales, Coastal Cars Select). Under QLD Motor Dealers and Chattel Auctioneers Act / ACL single-pricing rules, dealers need a clean per-listing toggle (`Drive Away` vs. `Excl. Govt. Charges`) plus clear on-road breakdown fields.
3. **100% finance lead capture & 94.1% trade-in capture are non-negotiable table stakes:** Every audited site (17/17) pushes finance, and 16/17 push trade-in / sell-your-car forms. Over half (**58.8%**) embed an interactive weekly/monthly repayment calculator (Indiqator embeds it directly on VDP; EasyCars puts it on `/finance/`; Dealer Studio allows dealers to toggle it on VDP or `/finance`). For a B2B SaaS, built-in VDP finance calculators, pre-approval forms, and trade-in appraisal forms must ship out of the box.
4. **High photo counts (30–45+ photos) + "Awaiting Detail" placeholders reflect real yard workflows:** Median VDP photo count is **32** (up to 70 on GCCW), meaning the SaaS media uploader and image CDN must handle bulk 30–70 photo uploads, fast WebP compression/derivations, and drag-and-drop ordering. Mulgrave Motors' "Just Arrived Awaiting Detail" badge (3 photos) and AllFour Imports' "Arriving December 2026 | Coming From Japan" tag show dealers publish vehicles *before* full prep—supporting an `Incoming / Just Arrived` status boosts speed-to-market.
5. **PPSR / History reports are underutilised on Dealer Studio (0%) and weaponised as lead-gen on EasyCars (100%):** All 4 EasyCars dealers gate a "FREE Car History Report" behind a name/email/phone lead form on every VDP, whereas 0/7 Dealer Studio sites mentioned PPSR on sampled VDPs. Offering an integrated PPSR check (later phase) *plus* an optional "Request Free History Report" lead-capture widget gives independents a proven conversion hook even before automated PPSR API integration launches.
6. **WhatsApp and Podium are displacing legacy live chat:** **70.6%** of dealers use messaging/chat, led by **WhatsApp (7/17)** and **Podium (4/17)** rather than traditional web-only live chat. Supporting one-click WhatsApp/SMS deep-links with pre-filled vehicle context (Year/Make/Model/Stock#) and optional Podium/webhook script injection fits how 10–80-car QLD dealers actually work on the yard.
7. **Online reservation / refundable deposit is an emerging differentiator (~29.4%), not yet universal:** Brisbane Wholesale Vehicles, Gold Coast Car Warehouse, both Indiqator dealers, and Preferred Autos (literally using Squarespace `Add To Cart`) let buyers place deposits or hold cars online. Making an optional Stripe-powered "Reserve This Car ($X refundable hold)" toggle per dealer/vehicle gives ambitious independents parity with big groups without forcing it on appointment-only yards.
8. **Compliance & trust signals (Dealer Licence + Google Reviews) are inconsistent and easy to automate:** **41.2%** of audited sites failed to display a QLD Motor Dealer Licence number on the homepage/footer HTML inspected—even though QLD dealers must disclose licence details in regulated contexts—and **35.3%** lacked a reviews widget. Auto-rendering the tenant's QLD/NSW/VIC Dealer Licence & ABN from account settings into the site footer, alongside a native Google Reviews embed and an optional "Sold Archive" toggle (used by 100% of boutique import specialists like JCS and AllFour), solves compliance and social proof in one step.
9. **Multi-branch & niche-import attributes work best as optional tenant flags:** Multi-branch support (e.g., Brisbane Wholesale Vehicles' Moorooka + Springwood locations) and niche import fields (auction grade, compliance/ETA status, request auction sheet on AllFour Imports & CarStrike) appeared in ~12–29% of the sample. Keeping these as optional custom fields/flags preserves a clean default UX for standard domestic used-car yards while still serving multi-yard or JDM/import dealers.

---

## 4. Sources (Accessed 24 November 2026)

1. Brizzy Car Guys — https://www.brizzycarguys.com.au/ (and `/search/used-cars`, `/cars/used-white-2014-nissan-nv200-11257`, `/finance`) — Accessed 24 Nov 2026.
2. Brisbane Wholesale Vehicles — https://www.brisbanewholesalevehicles.com.au/ (and `/search/used-cars`, `/cars/used-white-2015-mitsubishi-triton-u230465`, `/pages/warranty`) — Accessed 24 Nov 2026.
3. Gold Coast Car Warehouse — https://www.gccw.com.au/ (and `/search/used-cars`, `/cars/used-black-2018-mazda-cx-5-004440`) — Accessed 24 Nov 2026.
4. King of The Cheapies — https://www.kingofthecheapies.com.au/ (and `/search/used-cars`, `/cars/used-black-2018-kia-sorento-11602`, `/finance`) — Accessed 24 Nov 2026.
5. Cars Galore Toowoomba — https://www.carsgaloretoowoomba.com.au/ (and `/search/used-cars`, `/cars/used-grey-2017-mitsubishi-outlander-00013707`) — Accessed 24 Nov 2026.
6. Ross Newton Motors — https://www.rossnewtonmotors.com.au/ (and `/search/used-cars`, `/cars/used-blue-2014-holden-calais-14416`) — Accessed 24 Nov 2026.
7. G & T Auto Sales — https://www.gtautosale.com.au/ (and `/search/used-cars`, `/cars/used-blue-2012-toyota-corolla-6093`) — Accessed 24 Nov 2026.
8. Coastal Cars Select — https://www.coastalcarsselect.com.au/ (and `/used-cars-sunshine-coast/`, `/details/2018-toyota-landcruiserprado-wagon-gxl-gdj150r-638484`, `/finance/`) — Accessed 24 Nov 2026.
9. JCS Import Hub — https://www.jcsimporthub.com.au/ (and `/used-cars-in-brisbane/`, `/sold-cars/`, `/our-stock/2020-mercedes_benz-cla_class-wagon-cla45amgs-c118800050my-585670`, `/finance/`) — Accessed 24 Nov 2026.
10. Coastline Car Yard — https://www.coastlinecaryard.com.au/ (and `/used-cars-in-nambour/`, `/stock/2010-hyundai-i30-hatchback-sx-fdmy11-633488`, `/finance/`) — Accessed 24 Nov 2026.
11. Mulgrave Motors — https://www.mulgravemotors.com.au/ (and `/used-cars-in-cairns/`, `/stock/2010-nissan-micra-5dhatchback--k12-635688`, `/finance/`) — Accessed 24 Nov 2026.
12. Carselling — https://www.carselling.com.au/ (and `/used-vehicles-ashmore/list/`, `/used-vehicles-ashmore/view/2016-Audi-A3/34904860`) — Accessed 24 Nov 2026.
13. Cheap Cars Toowoomba — https://www.cheapcarstoowoomba.com.au/ (and `/used-vehicles-south-toowoomba/list/`, `/used-vehicles-south-toowoomba/view/2017-Ford-Ranger-U16263-MPBUMFF50HX144786/34839136`, `/vehicle-finance-south-toowoomba/`) — Accessed 24 Nov 2026.
14. Preferred Autos — https://www.preferredautos.com.au/ (and `/shop`, `/shop?format=json`, `/shop/p/2018-nissan-pathfinder-st-7-seat-silver-335`, `/used-hybrid-cars-gold-coast`, `/finance`, `/about`, `/contact`) — Accessed 24 Nov 2026.
15. AllFour Imports — https://www.allfourimports.com.au/ (and `/vehicles/`, `/sold-vehicles/`, `/vehicles/1993-toyota-landcruiser-prado-sx-wide-kzj78-0005955/`, `/about/`) — Accessed 24 Nov 2026.
16. CarStrike — https://carstrike.com.au/ (and `/api/storefront/v1/vehicles`, `/car/2009-nissa-elgrand-e51/topcarrez~TOPC-0846`, `/about`, `/contact`) — Accessed 24 Nov 2026.
17. Henderson Cars — https://www.hendersoncars.com.au/ (and `/car-sales/`, `/api/vehicles`, `/vehicles/3198151`) — Accessed 24 Nov 2026.
18. ABN / Ownership & Group Screening (via Google Search / ABR `business.gov.au` / dealer disclosures):
    - Brizzy Car Guys Pty Ltd (ABN 15 643 686 248), The Broom Broom Group Pty Ltd t/a King of The Cheapies (ABN 83 638 597 761), G & T Auto Sales Pty Ltd (ABN 16 126 954 836), The Shane and Leanne Brown Business Trust t/a Cars Galore Toowoomba — Accessed 24 Nov 2026.
    - Tony White Group (`tonywhitegroup.au`) & Tropical Auto Group (`tropicalauto.com.au`) — used to verify exclusion of TWG Cars (`twgcars.com.au`) and Rockys Best Used Cars (`rockysbestusedcars.com.au`) — Accessed 24 Nov 2026.

---

## 5. Gaps / Not Accessible

- **Blocked / Unreachable Candidate Sites (Excluded from 17-Site Sample):**
  - `https://www.townsvilleautogroup.com.au/` (Townsville Auto Group) — returned **HTTP 403 Forbidden** (blocked/not accessible; skipped per research rules).
  - `https://www.northernvehicles.com.au/` (Northern Vehicle Placements, Townsville) — **fetch failed** (network/TLS unreachable on 24 Nov 2026).
  - `https://www.mvw.net.au/` (Motor Vehicle Warehouse, Brendale) — **request timed out / aborted** after 15s on 24 Nov 2026.
- **Excluded Group-Owned Yards (Screened Out):**
  - `https://www.twgcars.com.au/` (TWG Cars) and `https://www.rockysbestusedcars.com.au/` (Rockys Best Used Cars) were inspected during screening but **excluded** from the final 17 because corporate/group research showed both operate under the **Tony White Group** / **Tropical Auto Group** dealer network rather than independent single/small-branch ownership.
- **Single-VDP Sampling Limitation:**
  - Photo counts, video presence, and VDP CTA labels reflect **one live VDP inspected per dealer** on 24 November 2026 (plus homepage and inventory/finance/warranty/sold pages). Individual vehicles on the same site can vary (e.g., Mulgrave Motors' sampled listing had 3 photos due to `"Just Arrived Awaiting Detail"`, whereas other EasyCars listings had 20–34 photos; Dealer Studio's schema supports video URLs even though all 7 sampled VDPs were empty).
- **Client-Side Rendered / Form-Submission Limits:**
  - Full form-submission flows (finance pre-approval steps, Stripe deposit checkout amounts, Podium/LiveChat/K.I.T.T. AI interactive chat transcripts, and CarStrike client-routed `/cars` filters) were not submitted or executed interactively per mandatory research rules.
  - On `Henderson Cars`, the SSR HTML fallback showed `"Unable to connect to the inventory system"` when no client JS executed, though its public `/api/vehicles` JSON endpoint returned HTTP 200 with 24 vehicles.
  - Mobile quality (1–5) was inferred from responsive HTML/CSS/viewport markup rather than rendered mobile device screenshots.
