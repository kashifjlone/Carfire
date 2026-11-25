# Competitor Teardown: Australian Dealer Websites & International DMS/Website Benchmarks

- **Date:** 24 November 2026
- **Prepared for:** Multi-tenant B2B SaaS for independent Australian used-car dealers (~10–80 vehicles, 1–few branches; focus states: NSW, VIC, QLD)
- **Method:** Public-web desk research combining Google-grounded `search_web` queries and direct HTTP retrieval (`Invoke-WebRequest` / `curl.exe`) of public vendor pricing, product, onboarding, customer-testimonial, and API/help pages. No forms were submitted, no trials/accounts created, no logins accessed, and no private forums or Facebook groups used. Paywalled, anti-bot-challenged, or non-resolving pages were skipped and logged under **Gaps / not accessible**.
- **Sources accessed:** 42 distinct public URLs (34 directly fetched HTTP 200 pages + 8 `search_web`-indexed public domains/pages; access date `2026-11-24`)

---

## Executive Summary & Market Structure (AU vs. Benchmarks)

1. **AU website supply is bifurcated between opaque enterprise/DMS bundles and emerging transparent challengers:** Legacy Australian incumbents—**Nexgate / iMotor** (carsales), **Indiqator Solutions** (formerly Cox Automotive RDS / Dealer Solutions), **EasyCars** (Jeal), **Dealer Studio**, **AdTorque Edge**, and **Prodealer**—do not publish website pricing online and require sales calls/quotes. Newer AU entrants (**Virtual Yard**, **YardStack**, **DealerX**) publish transparent AUD pricing, spanning **A$0–A$360/mo** (Virtual Yard up to $500k stock), **A$8/car/mo + GST** (YardStack, custom website included, A$160/mo for 20 cars), and **A$99/mo + A$3,490 setup** (DealerX) ([yardstack.com.au/pricing](https://www.yardstack.com.au/pricing), [virtualyard.com](https://www.virtualyard.com/), [dealerx.au/pricing.html](https://dealerx.au/pricing.html)).
2. **UK/US/NZ benchmarks prove transparent, self-serve pricing and website-included bundling drive adoption for 10–80 vehicle dealers:** **MotorDesk (UK)** bundles an SEO-optimised website, omnichannel inbox, live chat, domain/email/SSL, and DMS in every tier from **£79–£269/mo** (~A$155–A$529/mo for 5–50 cars) with a 30-day cardless trial ([motordesk.com/pricing-compare/](https://motordesk.com/pricing-compare/)). **DealerCenter (US)** uses modular US$99/mo blocks (DMS $99, CRM Plus $99, Website $99–$125; ~A$149–A$189/mo per module) ([dealercenter.com/pricing/](https://www.dealercenter.com/pricing/)). **AutoManager (US)** bundles DMS + Website from **US$144/mo** (~A$217/mo) ([automanager.com/pricing/](https://www.automanager.com/pricing/)).
3. **Key AU workflow gaps to exploit (verified from competitor positioning):**
   - Yards complain of websites lagging behind DMS stock ("sold on Saturday, still on site Wednesday") and of rigid agency retainers ([yardstack.com.au/features/dealer-websites](https://www.yardstack.com.au/features/dealer-websites)).
   - WordPress DIY plugins are fragmented or risky: **WP Car Manager** was permanently closed in Dec 2019 for a security issue ([wordpress.org/plugins/wp-car-manager/](https://wordpress.org/plugins/wp-car-manager/)), while **Motors** and **Inventory Presser** lack native Australian compliance (NSW/VIC/QLD forms), PPSR, RedBook/Glass's decoding, or carsales feeds out of the box ([inventorypresser.com/products/plugins/](https://inventorypresser.com/products/plugins/), [wordpress.org/plugins/motors-car-dealership-classified-listings/](https://wordpress.org/plugins/motors-car-dealership-classified-listings/)).
   - Pure-play website benchmark **DealerAssist (US)** lets dealers preview their *own live inventory* on a new site before paying a cent, with zero setup fee ([dealerassist.com](https://www.dealerassist.com/)).

---

## Currency Conversion Basis

All AUD conversions in this report use Reserve Bank of Australia (RBA) representative 4:00 PM Sydney mid-rates for **24 November 2026** (retrieved via `search_web` from RBA statistical tables; direct scripted fetch of `rba.gov.au` returned HTTP 403):

| Currency | Units per 1 AUD (24 Nov 2026) | 1 Foreign Unit in AUD | Source |
|---|---:|---:|---|
| **USD** (US Dollar) | 0.6627 USD | ~**A$1.5090** | [rba.gov.au](https://www.rba.gov.au/statistics/tables/) (via `search_web`, 2026-11-24) |
| **GBP** (UK Pound) | 0.5082 GBP | ~**A$1.9677** | [rba.gov.au](https://www.rba.gov.au/statistics/tables/) (via `search_web`, 2026-11-24) |
| **NZD** (NZ Dollar) | 1.2162 NZD | ~**A$0.8222** | [rba.gov.au](https://www.rba.gov.au/statistics/tables/) (via `search_web`, 2026-11-24) |

---

## Part A: Australian Dealer Website & Lead-Gen Platforms

### 1. carsales Network — Nexgate (formerly AutoGate) & iMotor Websites
- **URLs:** [nexgate.ai](https://www.nexgate.ai/), [nexgate.ai/pricing](https://www.nexgate.ai/pricing), [nexgate.ai/product/marketing](https://www.nexgate.ai/product/marketing), [imotor.com.au](https://www.imotor.com.au/)
- **Positioning:** `autogate.co` now redirects to `app.nexgate.ai` ("Nexgate - Automotive retail software from © carsales.com.au Pty Ltd 1999-2026"). Nexgate unifies sourcing, inventory distribution (80+ destinations), lead management, and market insights; **iMotor** is carsales' website and digital retail product ([nexgate.ai/product/marketing](https://www.nexgate.ai/product/marketing), [imotor.com.au](https://www.imotor.com.au/)).
- **Features:**
  - *Nexgate:* Rule-based inventory publishing, carsales enquiry context + watcher offers, in-app voice calls with AI call transcription/summaries, AI smart replies, rego-based appraisal/valuation against carsales market data, Dealer Drive test-drive/loan car management, and competitive-set pricing insights (3 to 5+ data points depending on tier) ([nexgate.ai/pricing](https://www.nexgate.ai/pricing)).
  - *iMotor Websites:* Customisable dealer websites, native AI chat, review aggregator, "Build & Buy" digital retailing, trade-in valuation, EV calculator, advanced service booking, and Dealer Drive integration ([imotor.com.au](https://www.imotor.com.au/)).
- **Public Pricing (AUD, excl. GST):**
  - *Nexgate Used Car Plans* ([nexgate.ai/pricing](https://www.nexgate.ai/pricing)):
    - **Access** (<10 cars listed, listing billing only — rolling 28 days or up to 5 leads, whichever comes first): **A$99/mo** + listing fees (listing fee table behind interactive modal/not printed in static HTML).
    - **Access+** (unlimited inventory, pay per enquiry): **A$799/mo** + per-enquiry fees.
    - **Pro** (adds lead enrichment, 5 insights data points, Dealer Drive included): **A$1,099/mo**.
    - **Signature** (full insights, FB Marketplace/carsales sourcing, AI assistant 5,000 queries/mo): **A$1,299/mo**.
    - **Establishment fee:** **A$515** one-off across all used-car plans.
  - *iMotor Websites pricing:* Not publicly published (quote-based; [imotor.com.au](https://www.imotor.com.au/)).
- **Onboarding:** Account-manager led setup; Nexgate Access includes setup support, higher tiers add dedicated account management ([nexgate.ai/pricing](https://www.nexgate.ai/pricing)).
- **Marketing / Praise:** iMotor cites internal data of `4.8` rating across `20` reviews and markets "flexible, personalised and simple to operate" destinations ([imotor.com.au](https://www.imotor.com.au/), [nexgate.ai/product/marketing](https://www.nexgate.ai/product/marketing)). Independent dealers frequently note carsales listing/rollover costs on aged stock as a margin pressure (via `search_web` on industry discussions; exact per-lead rates not found publicly).
- **What to copy:** Watcher-like price-drop alerts, 28-day aging visibility, enquiry-with-vehicle-context cards, and rule-based portal publishing controls.

### 2. Indiqator Solutions (formerly Dealer Solutions / Cox Automotive RDS)
- **URLs:** [indiqator.com.au](https://indiqator.com.au/) (`dealersolutions.com.au` redirects here)
- **Positioning:** Former Dealer Solutions / Cox Automotive Australia Retail & Data Solutions business, acquired by Constellation Software (Vela) in mid-2025 and rebranded **Indiqator Solutions Pty Ltd** (via `search_web` on GoAuto / Vela APX; confirmed by `dealersolutions.com.au` redirect to `indiqator.com.au`). Targets OEMs, franchise groups, and independent dealers ([indiqator.com.au](https://indiqator.com.au/)).
- **Features:** Modular stack: **Radius** (mobile-first dealer websites with automatic stock feeds from any DMS, trade-in/finance/test-drive CTAs, multi-site control), **CloudLogic** (independent dealer DMS with deal/contract management and auto website stock updates), **SmartPublisher** (inventory syndication to Carsales, Autotrader, Gumtree), **LeadDriver** (unified pipeline, 24/7 AI responses, 51-day automated follow-up, Zapier integration), **FinanceConnect**, and **ServiceIQ** (Xtime) ([indiqator.com.au](https://indiqator.com.au/)).
- **Public Pricing:** Not found publicly (quote/consultation via `1300 66 11 33` or sales form; [indiqator.com.au](https://indiqator.com.au/)).
- **Onboarding:** Consultation and guided onboarding; markets "easy onboarding" for independent dealers ([indiqator.com.au](https://indiqator.com.au/)).
- **Marketing / Praise:** Markets benchmark research ("750k+ leads analysed across 350+ dealers") and closed-loop attract-convert-finance-retain workflows ([indiqator.com.au](https://indiqator.com.au/)). Public SaaS review quotes sparse/not found on Capterra/G2.
- **What to copy:** Decoupled "accept stock feeds from any DMS" website capability + automated multi-week lead follow-up sequences (51-day cadence concept).

### 3. EasyCars (Jeal Computer Services Pty Ltd)
- **URLs:** [easycars.com.au](https://www.easycars.com.au/), [easycars.com.au/products/dealer-management-system/](https://www.easycars.com.au/products/dealer-management-system/), [easycars.com.au/products/car-dealer-website](https://www.easycars.com.au/products/car-dealer-website), [easycars.com.au/our-customers](https://www.easycars.com.au/our-customers)
- **Positioning:** 40+ year Australian-owned cloud DMS and dealer website provider (Microsoft Azure hosted) for independent car, caravan, truck, motorcycle, and boat dealers ([easycars.com.au](https://www.easycars.com.au/)).
- **Features:**
  - *Website:* Tailor-made responsive SEO websites auto-synced with EasyCars DMS (added/removed as bought/sold), SSL included, instant finance repayment calculator (weekly/fortnightly/monthly), instant car valuation, online directory listings (True Local, Yelp, etc.), monthly reporting, and optional free Car History Report badge ("worth $36.95") to build buyer trust ([easycars.com.au/products/car-dealer-website](https://www.easycars.com.au/products/car-dealer-website)).
  - *DMS & Add-ons:* RedBook/Glass's vehicle decoding, PPSR/CarHistory integration, state-wide Australian government compliance forms + police/dealings books, Xero & MYOB sync, mobile Photo App, EasyAd syndication + Facebook Automotive Inventory Ads, Review Management module (Google/Facebook), unlimited users, 24/7 after-hours emergency Australian support ([easycars.com.au/products/dealer-management-system/](https://www.easycars.com.au/products/dealer-management-system/)).
- **Public Pricing:** Not published (custom quote; explicitly advertises "no lock-in contracts and no hidden fees"; optional 1-on-1 training billed hourly; [easycars.com.au](https://www.easycars.com.au/)).
- **Onboarding:** Assisted migration and Australian support; optional paid 1-on-1 training ([easycars.com.au/products/dealer-management-system/](https://www.easycars.com.au/products/dealer-management-system/)).
- **What dealers praise:**
  - *"It’s very good and is making life a lot easier around the place!!"* — Richard Simons, Oldtimer Centre ([easycars.com.au/our-customers](https://www.easycars.com.au/our-customers))
  - *"The system is so fast and easy; we even taught ourselves to use it."* — Anthony Duck, South East Auto Sales (switched from a Windows-only QLD provider to run on Mac; [easycars.com.au/our-customers](https://www.easycars.com.au/our-customers))
  - Note: Xero App Store reviews (via `search_web`) praise stock/sales but note bookkeepers sometimes need manual journal steps for certain expenses/contacts.
- **What to copy:** Unlimited users at zero extra seat cost, browser/Mac compatibility, free buyer-trust report badge on VDPs, and weekly/fortnightly repayment calculators (Australians shop repayments weekly/fortnightly).

### 4. Virtual Yard
- **URLs:** [virtualyard.com](https://www.virtualyard.com/)
- **Positioning:** Cloud-based all-in-one AU dealership system (Google Cloud hosted; claims 700+ dealership locations and $5.3B transactions) covering cars, RVs, trucks, bikes, marine ([virtualyard.com](https://www.virtualyard.com/)).
- **Features:** Inventory + CRM + Xero sync + state compliance forms + digital e-signing + contactless payments on tax invoices/websites + mobile app photo sync + AutoGrab Market Overlay add-on + classifieds syndication + dealer website supporting buy, subscribe, or rent workflows, trade-ins, finance applications, and customer account portal ([virtualyard.com](https://www.virtualyard.com/)).
- **Public Pricing (AUD, excl. GST — verified on [virtualyard.com](https://www.virtualyard.com/)):**
  - **Free** (wholesalers, lightweight DMS, website `carsforsale.com.au` / feeds): **A$0/mo**
  - **Basic** (unlimited stock value, full DMS, limited feeds, website extra): **A$120/mo**
  - **Small** (under A$500k retail stock value, full DMS, feeds + **Dealership Website included**): **A$360/mo**
  - **Medium** (<A$1M stock): **A$670/mo**
  - **Large** (<A$2M stock): **A$980/mo**
  - **X Large** (<A$4M stock): **A$1,790/mo**
  - **Franchise** (unlimited stock): **A$2,940/mo**
  - *(Note: On Small–Large tiers, "retail stock value" caps mean a 30-car yard averaging A$25k/car = A$750k stock already exceeds Small and jumps to Medium at A$670/mo).*
- **Onboarding:** Free trial available ("Start Your Free Trial"); live chat support during business hours + emergency support ([virtualyard.com](https://www.virtualyard.com/)).
- **What dealers praise:**
  - *"Just use the app and photos go straight on the cars!"* — Sam, Wholesale Commercials (Apple App Store via `search_web`).
  - Mixed third-party sentiment on Trustpilot/Xero (~2.8–3.2/5 via `search_web` snippets, citing integration/support friction).
- **What to copy:** Mobile-first photo upload straight to stock card, contactless deposit/invoice payment links, and "sell / rent / subscribe" optional storefront modes. Avoid pricing by *total retail stock value* (punishes dealers with higher-ticket SUVs/4WDs).

### 5. YardStack (AU Challenger — QLD-built)
- **URLs:** [yardstack.com.au](https://www.yardstack.com.au/), [yardstack.com.au/pricing](https://www.yardstack.com.au/pricing), [yardstack.com.au/features/dealer-websites](https://www.yardstack.com.au/features/dealer-websites)
- **Positioning:** Modern AU DMS + custom website built by a working QLD consignment/used-car dealer specifically targeting small/mid independent & consignment yards; explicitly positions against Virtual Yard, EasyCars, and Nexgate ([yardstack.com.au](https://www.yardstack.com.au/)).
- **Features:**
  - *Website:* Custom site on dealer's own domain included at no build fee (or embeddable stock widget for existing Webflow/WordPress sites), live stock sync (hide cars in recon, auto-remove sold), finance calculator, enquiry/test-drive/finance/trade-in forms, plus "sell or consign your car" guided photo capture with AI damage flagging ([yardstack.com.au/features/dealer-websites](https://www.yardstack.com.au/features/dealer-websites)).
  - *DMS/CRM/AI:* AI first reply <1 min across carsales, Facebook, website, email, SMS; built-in AI Studio Photos (background replacement keeping real dents/chips); bank feed auto-matching to specific cars + 2-way Xero/MYOB sync; true net profit per car (holding cost/day, floor plan interest, recon actuals); QLD (Form 9, Form 12, trust ledger) & NSW (Form 5, dealer guarantee, dealer's register, consignment agreement) digital paperwork + e-signing ([yardstack.com.au/pricing](https://www.yardstack.com.au/pricing)).
- **Public Pricing (AUD, excl. GST — verified on [yardstack.com.au/pricing](https://www.yardstack.com.au/pricing)):**
  - **A$8 per car in stock / month + GST** (billed on average cars in stock/month; no setup fee, no minimum, month-to-month, unlimited users; 2 months free on annual billing). Example: 20-car yard = **A$160/mo + GST**; 50-car yard = **A$400/mo + GST**.
  - *Usage add-ons:* PPSR check **A$5 ea**, AI valuation **A$2 ea**, Studio photos **A$0.50/photo** (capped at A$4/car).
  - *Optional managed VA ("Desk"):* **A$1,500/mo** shared or **A$3,000/mo** dedicated (Brisbane hours).
- **Onboarding:** **14-day cardless free trial**; **free migration** of stock, customers, and deals from EasyCars, Virtual Yard, CloudLogic, or spreadsheets; 20-minute live demo with a dealer ([yardstack.com.au/pricing](https://www.yardstack.com.au/pricing)).
- **Marketing / Praise:** No third-party reviews found (newer challenger); marketing highlights "One app replaces CRM, DocuSign, PPSR portal, Form builder, CarCutter, Bank statement ticking, Spreadsheets" ([yardstack.com.au](https://www.yardstack.com.au/)).
- **What to copy:** Transparent per-active-car pricing (zero penalty for high-value stock), free migration from named AU competitors + CSV, embeddable stock widget fallback for dealers keeping existing WP/Webflow sites, and guided seller photo upload for trade-in/sell-my-car forms.

### 6. DealerX (AU Challenger — VIC-focused)
- **URLs:** [dealerx.au](https://dealerx.au/), [dealerx.au/pricing.html](https://dealerx.au/pricing.html)
- **Positioning:** Australian CRM, VicRoads paperwork, and custom website platform targeting VIC independent dealers ([dealerx.au/pricing.html](https://dealerx.au/pricing.html)).
- **Features:** VIN-supported stock entry (<3 min), VicRoads forms & print-ready handover paperwork, one-time SMS/email digital customer onboarding & e-signature links, SMS passwordless login (Burst NET LoginX), AI-assisted vehicle SEO descriptions, custom dealership website with trade-in/finance/enquiry forms. Notably **excludes** carsales integration and mobile app on current tiers ([dealerx.au/pricing.html](https://dealerx.au/pricing.html)).
- **Public Pricing (AUD — verified on [dealerx.au/pricing.html](https://dealerx.au/pricing.html)):**
  - **CRM Only:** **A$89/mo + A$1,790 one-time installation**
  - **CRM + Website:** **A$99/mo + A$3,490 one-time installation** (includes 1 year cPanel hosting & daily backups)
  - **CRM + Website + App (Coming soon):** **A$109/mo**
- **Onboarding:** Consultation-led setup, team training, and 1-year cPanel hosting included in installation fee ([dealerx.au/pricing.html](https://dealerx.au/pricing.html)).
- **Marketing / Praise:** Focuses on eliminating retyping on VicRoads paperwork ("ready in under a minute"); public independent reviews not found ([dealerx.au](https://dealerx.au/)).
- **What to copy (and avoid):** Copy passwordless magic/OTP links for external buyer/trade-in forms and fast state-specific PDF generation; **avoid** A$3,490 upfront setup fees and cPanel-style single-tenant hosting, which create massive adoption friction compared to SaaS multi-tenancy.

### 7. Dealer Studio & AdTorque Edge (AutoGrab Group) + Specialist Agencies (Prodealer, Digital Dealer)
- **Dealer Studio ([dealerstudio.com.au](https://www.dealerstudio.com.au/)):** Founded 2018, Australian-owned (ISO 27001:2022 certified, claims 300+ dealerships across 2,000+ websites, #40 AFR Fast 100 2026, 81% support tickets <2 hrs). Offers ultra-fast eCommerce websites, LMS, test drives, digital contracts, Autobot, reputation management, and trade-in offers. Pricing not published (targets franchise/groups heavily, though serves independents). Customer quote: *"Our website load time is insanely quick every time."* — Jordan Higgins ([dealerstudio.com.au](https://www.dealerstudio.com.au/)).
- **AdTorque Edge ([adtorqueedge.com](https://www.adtorqueedge.com/)):** Automotive marketing agency & website builder; Australian website division acquired by AutoGrab alongside Dealer Studio (via `search_web`). Bundles proprietary **ALICE** call/lead attribution platform and pre-owned trade-in/finance web tools. Pricing custom/not public.
- **Prodealer ([prodealer.com.au](https://www.prodealer.com.au/)) & Digital Dealer ([digitaldealer.com.au](https://www.digitaldealer.com.au/)):** NSW-based Prodealer (since 2009) positions as an affordable boutique agency bundling dealer websites, SEO, social media, and PPC under one retainer; Digital Dealer focuses on bespoke UI/UX, GA4 dashboards, and SEO against classifieds (pricing not published; `digitaldealer.com.au` blocked direct fetch HTTP 418).

### 8. WordPress Dealer Themes & Plugins
| Product | URL | Pricing (USD / AUD) | Reality Check for AU 10–80 Car Dealers |
|---|---|---|--- |
| **Motors** (StylemixThemes) | [wordpress.org/plugins/motors-car-dealership-classified-listings/](https://wordpress.org/plugins/motors-car-dealership-classified-listings/) | Core plugin free; ThemeForest theme ~**US$89** (~**A$134**), Extended **US$2,000** (via `search_web`) | Feature-rich (grid/list, compare, loan calc, XML/CSV import in Pro), but requires WordPress hosting, security patching, and custom work for AU rego/PPSR/state disclosures/carsales feeds. |
| **Inventory Presser** | [inventorypresser.com/products/plugins/](https://inventorypresser.com/products/plugins/) | Core free; Pro add-ons **US$100/yr** (~**A$151/yr**); Everything incl. VIN Decoder **US$155/yr** (~**A$234/yr**) | Cleanest WP option: multi-lot taxonomy, WPForms/CF7 + ADF-XML leads, free km-instead-of-miles add-on; US-centric VIN decoder & Carfax/AutoCheck badges (no AU PPSR/RedBook). |
| **WP Car Manager** | [wordpress.org/plugins/wp-car-manager/](https://wordpress.org/plugins/wp-car-manager/) | Free core (historically paid extensions) | **Closed since 17 Dec 2019 due to a security issue** — unavailable for download. Highlights maintenance/security risk of abandoned WP dealer plugins. |

### 9. Note on "MotorWeb" & "Duoplus"
- **MotorWeb** ([motorweb.com.au](https://www.motorweb.com.au), [motorweb.co.nz](https://www.motorweb.co.nz), owned by Trade Me) is **not** a dealer website builder; it is a vehicle data/compliance API provider (NEVDIS, PPSR, VIRs, NZTA transfers; via `search_web`).
- **Duoplus** ([duoplus.nz](https://duoplus.nz) via `search_web`) is a general NZ/AU digital/SEO agency, not an automotive dealer website SaaS. No dedicated AU car-dealer website SaaS under the name Duoplus was found.

---

## Part B: International & New Zealand Benchmarks

### 1. MotorDesk (United Kingdom — Best-in-Class Independent SaaS Benchmark)
- **URLs:** [motordesk.com/pricing/](https://motordesk.com/pricing/), [motordesk.com/pricing-compare/](https://motordesk.com/pricing-compare/), [motordesk.com/dealership-management/car-dealer-website/](https://motordesk.com/dealership-management/car-dealer-website/), [motordesk.com/api-docs/v2/](https://motordesk.com/api-docs/v2/)
- **Target & Positioning:** Chief Mechanic Limited (UK). Built specifically as a "connected dealership ecosystem" replacing fragmented DMS + website + inbox + spreadsheet setups; targets 5–350+ car dealers ([motordesk.com/dealership-management/](https://motordesk.com/dealership-management/)).
- **Features:**
  - *Websites (included on all plans):* 15 self-serve templates (or 5 managed templates, or bespoke, or WordPress plugin, or REST API v2), 95+ drag-in modules, domain/email/SSL/hosting included, live sync in seconds (no separate feed), built-in live chat, enquiry/part-ex/test-drive booking, finance calculators, online reservations & checkout, compare & favourites, structured data SEO + `llms.txt` for AI search ([motordesk.com/dealership-management/car-dealer-website/](https://motordesk.com/dealership-management/car-dealer-website/)).
  - *DMS & CRM:* Unified inbox (email, SMS, WhatsApp, FB Messenger, Instagram, AutoTrader, website chat), AI enquiry summaries/draft replies/ad writing/invoice OCR, prep/workshop costing, HMRC VAT Margin Scheme automation, certified Xero/QuickBooks/Sage sync, 50+ marketplace feeds, REST API v2 + webhooks ([motordesk.com/pricing/](https://motordesk.com/pricing/), [motordesk.com/api-docs/v2/](https://motordesk.com/api-docs/v2/)).
- **Public Pricing (GBP excl. 20% UK VAT — verified on [motordesk.com/pricing-compare/](https://motordesk.com/pricing-compare/)):**
  - **Starter** (5 vehicles, 1 staff): **£79/mo** (~**A$155/mo**) — omits Deals/Buy Online, premium templates, customer/courtesy vehicles, stock reports.
  - **Growth** (25 vehicles, 3 staff): **£149/mo** (~**A$293/mo**) — unlocks Deals, premium templates, API v2, stock/buying reports.
  - **Scale** (50 vehicles, 5 staff): **£269/mo** (~**A$529/mo**).
  - **Conquer** (100 vehicles, 10 staff): **£499/mo** (~**A$982/mo**) — unlocks white label & stock groups.
  - **Command** (200 vehicles, 20 staff): **£849/mo** (~**A$1,671/mo**).
  - *Annual:* 1 month free. *Granular add-ons:* +5 cars £39/mo, +10 cars £59/mo, +25 cars £129/mo, +1 staff £19/mo, +1 branch £69/mo, +1 website £69/mo. *Usage:* Vehicle data £0.15, valuations £0.50, AI background removal £0.15/img.
- **Onboarding & Docs:** **30-day free trial, no card required**. Optional paid services: **Onboarding £199** (~A$392), **Onboarding+ (4h website customisation) £399** (~A$785), **Managed Website £399 setup + £99/mo** (~A$785 + A$195/mo). Public API v2 docs at [motordesk.com/api-docs/v2/](https://motordesk.com/api-docs/v2/); Knowledge Hub behind Cloudflare challenge (`help.motordesk.com`).
- **Reviews / Marketing:** Markets 5.0/5 on Google, Capterra, App Store, Google Play ([motordesk.com/pricing/](https://motordesk.com/pricing/)). Capterra review quotes (via `search_web`): *"MotorDesk also designs [a] free website within their package that gives a professional look on the company."* and *"The customer support is incredible as the team is very quick and responsive."*
- **What to copy:** Pricing by **concurrent active vehicles for sale** (rotate unlimited sold stock) + small bolt-on packs (+5/+10 cars) so dealers don't hit steep tier cliffs; 30-day cardless trial + optional productised onboarding SKUs; single-record live website with `llms.txt` and 95 modular blocks; unified omnichannel inbox.

### 2. DealerCenter (United States — Modular À-la-Carte Benchmark)
- **URLs:** [dealercenter.com/pricing/](https://www.dealercenter.com/pricing/), [dealercenter.com/dealer-websites/](https://www.dealercenter.com/dealer-websites/)
- **Target & Positioning:** Cloud DMS/CRM/Website platform for US independent & Buy-Here-Pay-Here (BHPH) dealers; owned by Westlake ecosystem (Westlake promotions sometimes subsidise DMS fee per `search_web`).
- **Features:**
  - *Websites:* Responsive, **Premium Website** (customisable designs, video/animated banners, advanced filters, add-on pages, Yoast/SEO Pro, AudioEye accessibility), **Premium Pro** (stock photo library, sticky filters, multi-step credit apps, "vehicles not in inventory" lead capture, DealDriver payment pre-qual, similar vehicles), optional **Website AI Agent** ([dealercenter.com/dealer-websites/](https://www.dealercenter.com/dealer-websites/), [dealercenter.com/pricing/](https://www.dealercenter.com/pricing/)).
  - *DMS/CRM/AI:* VIN & driver's license mobile scanning, RouteOne/Dealertrack/CUDL lender portals, forms library, CRM Plus/Pro (click-to-call, call recording, Road to the Sale), AI Sales Agent, AI Vehicle Video Agent (walkaround -> narrated video), Recon & Service Bay tracking, Integrated Accounting/QuickBooks ([dealercenter.com/pricing/](https://www.dealercenter.com/pricing/)).
- **Public Pricing (USD — verified on [dealercenter.com/pricing/](https://www.dealercenter.com/pricing/)):**
  - **DMS Core:** **US$99/mo** (~**A$149/mo**) | **BHPH:** **US$50/mo** (~**A$75/mo**)
  - **CRM Plus** (2,000 SMS): **US$99/mo** (~**A$149/mo**) | **CRM Pro** (4,000 SMS, call recording): **US$199/mo** (~**A$300/mo**)
  - **AI Sales Agent / Recon / Service Bay / Accounting / Vehicle Video Agent:** **US$99/mo each** (~**A$149/mo**)
  - **Premium Website:** **US$99/mo** (~**A$149/mo**) | **Premium Pro Website:** **US$125/mo** (~**A$189/mo**) | **Online Ad Post / Deal Driver:** **US$50/mo each** (~**A$75/mo**)
  - Includes **unlimited users, free training, and support**; transparent shopping-cart pricing builder ([dealercenter.com/pricing/](https://www.dealercenter.com/pricing/)).
- **Onboarding:** Free training + dedicated onboarding reps (1–2 weeks for multi-module/lender setup via `search_web`).
- **Reviews:** ~4.9/5 on Capterra (via `search_web`): *"My overall experience was hassle-free. And very convenient for all my needs."* Cons noted: à-la-carte modules add up quickly if stacked.
- **What to copy:** Unlimited users included, interactive cart-style pricing transparency, "capture leads for vehicles *not* in inventory" (vehicle finder/sourcing request form), and AI walkaround video / VDP similar-vehicles carousel.

### 3. Frazer (United States — Low-Cost Operational Backbone Benchmark)
- **URLs:** [frazer.com](https://frazer.com) (via `search_web`; DNS non-resolving in shell), [frazerhelp.com](https://www.frazerhelp.com/)
- **Target & Positioning:** High-volume US independent & BHPH DMS known for flat, no-nonsense pricing and Windows desktop reliability.
- **Features:** VIN decoding, photo storage + *Frazer Sidekick* mobile app, sales desking, thousands of state/federal compliance forms, full built-in general ledger accounting + QuickBooks export, BHPH payment tracking (*FrazerPay*), and **200+ partner integrations** (website providers like Dealer Car Search, credit bureaus, history reports) — **no native website builder** ([frazerhelp.com](https://www.frazerhelp.com/), `search_web` on `frazer.com`).
- **Public Pricing (USD — via `search_web` on `frazer.com`):**
  - **Desktop (Windows 10/11 only):** **US$129/mo** (~**A$195/mo**), **US$387/quarter**, or **US$1,299/yr** (~**A$1,960/yr**, saves $249/yr). No setup fees.
  - **Hosted Cloud:** From **US$199/mo** (~**A$300/mo**). Unlimited free phone/chat/email support.
- **Onboarding & Docs:** Public indexed online manual + video library at [frazerhelp.com](https://www.frazerhelp.com/); Hosted server migration appointment takes ~45 minutes ([frazerhelp.com](https://www.frazerhelp.com/) via `search_web`).
- **Reviews:** Capterra quote (via `search_web`): *"Frazer is very easy to use and navigate. Easy to train new employees in."* Weakness: Windows-only desktop UI feels dated vs. browser-native tools.
- **What to copy:** Zero-setup-fee flat transparency, public searchable help manual (`frazerhelp.com`) before a user even signs up, and deep role-based permissions for small teams.

### 4. AutoManager — DeskManager Online & WebManager (United States)
- **URLs:** [automanager.com/pricing/](https://www.automanager.com/pricing/)
- **Target & Positioning:** US independent car, truck, RV, and powersports dealers; modular suite of **DeskManager Online** (DMS), **WebManager** (Website + 250+ marketplace syndicator), and **CRM** ([automanager.com/pricing/](https://www.automanager.com/pricing/)).
- **Features:**
  - *WebManager:* Dealership websites, WordPress integration option, export to 250+ marketplaces, Facebook Marketplace auto-posting, Google listings, automated YouTube video generation, photo watermarks/overlays (up to 100 photos/car via `search_web`) ([automanager.com/pricing/](https://www.automanager.com/pricing/)).
  - *DeskManager Online & CRM:* Inventory, F&I calculations, forms, QuickBooks Online/Desktop, SMART auto-responder, unlimited texting/voice add-on, phone routing, lead ROI calculator ([automanager.com/pricing/](https://www.automanager.com/pricing/)).
- **Public Pricing (USD — verified on [automanager.com/pricing/](https://www.automanager.com/pricing/)):**
  - **DMS (DeskManager Online):** Starting **US$88/mo** (~**A$133/mo**)
  - **Website & Marketing (WebManager):** Starting **US$70/mo** (~**A$106/mo**)
  - **DMS + Website Bundle:** Starting **US$144/mo** (~**A$217/mo**)
  - **CRM & Text Marketing:** Starting **US$140/mo** (~**A$211/mo**)
- **Onboarding & Docs:** Cloud migration/initial setup takes ~3–4 days (scheduled after-hours for photos/data; via `search_web`). Support portal (`support.automanager.com`) returned HTTP 403 to direct fetch.
- **Reviews:** Capterra quote (via `search_web`): *"Automanager has a great customer service and great software such as Deskmanager and Web manager and great CRM system."*
- **What to copy:** Bundle discount (DMS + Website), photo watermark/overlay automation, and WordPress embed option for dealers unwilling to abandon an existing site.

### 5. DealerAssist (United States — Pure-Play Website Onboarding Benchmark)
- **URLs:** [dealerassist.com](https://www.dealerassist.com/), [dealerassist.com/pricing](https://www.dealerassist.com/pricing)
- **Note:** Included as an additional pure-play website benchmark discovered during research (US-focused: Carfax, Arizona/Montana/California templates, US customer testimonials).
- **Public Pricing (USD — verified on [dealerassist.com/pricing](https://www.dealerassist.com/pricing)):** **Website** **US$199/mo** (~**A$300/mo**); **Website + DealerChat** **US$299/mo** (~**A$451/mo**); Enterprise custom. No setup fee, month-to-month, free logo refresh.
- **Standout Onboarding / Praise:** 4-step switch: (1) enter current URL → instant preview generated with dealer's real inventory, (2) pick template, (3) DealerAssist migrates everything & sorts out domain logins, (4) **billing starts only when new site goes live**. Quote: *"We had quotes from two agencies at $18k and four months. We launched with DealerAssist in a weekend."* — Alex Oramas, Pro Cars USA ([dealerassist.com](https://www.dealerassist.com/)).
- **What to copy:** **"Preview your live inventory on our storefront before you pay" + "we sort out your domain/DNS switch with zero downtime"**.

### 6. Motorcentral (New Zealand — Trade Me Integration Benchmark #1)
- **URLs:** [motorcentral.co.nz/pricing](https://www.motorcentral.co.nz/pricing), [motorcentral.co.nz/websites](https://www.motorcentral.co.nz/websites)
- **Positioning:** Limelight Software / Motorcentral Technologies Ltd, owned by Trade Me (acquired 2017 via `search_web`). Dominant NZ independent-dealer DMS.
- **Features & Trade Me Integration:** Direct Trade Me Motors API (**Dealerbase API**) replacing legacy FTP for real-time price/status/sold sync; **BuyerScore** automated post-sale/test-drive review collection displayed directly on dealer websites and Trade Me Motors listings; **Car Check** (NZTA/PPSR/odometer/stolen + free Consumer Information Notice window card); **AdConnect** (Google/FB ads); **AMPD CRM**; **Auto Attendant**; Xero export ([motorcentral.co.nz/pricing](https://www.motorcentral.co.nz/pricing), `search_web`).
- **Public Pricing (NZD — verified on [motorcentral.co.nz/pricing](https://www.motorcentral.co.nz/pricing)):**
  - **DMS:** **Standard 35** (max 35 cars): **NZ$995 setup + NZ$100/mo** (~A$818 + A$82/mo); **Standard 100** (max 100 cars): **NZ$1,695 setup + NZ$180/mo** (~A$1,394 + A$148/mo); **Standard Max** (unlimited): **NZ$1,695 setup + NZ$240/mo** (~A$1,394 + A$197/mo).
  - **Listing Agent Export (Trade Me, etc.):** **NZ$95 setup + NZ$5/agent/mo** per 5,000 exports.
  - **Dealer Websites:** **Express** **NZ$1,590 setup + NZ$60/mo** (~A$1,307 + A$49/mo); **Premium** **NZ$3,990 + NZ$60/mo**; **Premium Plus** **NZ$5,990 + NZ$60/mo** (hosting caps: 100MB storage, 20GB traffic, SSL; domain from NZ$50/yr, IMAP email NZ$5/mo).
  - **Add-ons:** Xero export **NZ$150 + NZ$20/mo**; BuyerScore Ultimate 35/100 **NZ$195 + NZ$60/NZ$120/mo**; AMPD CRM **NZ$295 + NZ$0.50/SMS or email**; Car Check **NZ$2.95–NZ$9.95 ea**.
- **Onboarding & Praise:** Tokenised Trade Me OAuth/verifier connection flow inside Extensions (`search_web` on `motorcentral.co.nz`); support portal blocked by Cloudflare (`403`). Stakeholder quote on BuyerScore + Trade Me: *“...trust in the seller is a critical factor when buying a car...”* — Alan Clark, Head of Trade Me Motors (via `search_web` on Autofile).
- **What to copy:** Built-in post-sale/test-drive review engine (**BuyerScore** model) feeding trust badges onto the dealer website + printable compliant window cards (`CIN`-equivalent) generated free from vehicle records. (Avoid Motorcentral's heavy NZ$995–NZ$5,990 setup fees and 100MB hosting caps).

### 7. Autoplay (New Zealand & Australia — Trade Me + Carsales CRM Benchmark #2)
- **URLs:** [autoplay.co.nz](https://autoplay.co.nz/)
- **Positioning:** NZ-headquartered automotive CRM, appraisal, and multi-channel publishing platform operating across NZ and Australia (claims ~80% of NZ franchised dealers via `search_web`, plus used/independent & dealer-group solutions) ([autoplay.co.nz](https://autoplay.co.nz/)).
- **Features:** Unified Lead Inbox with auto-assignment, Pipeline Dashboard, automated SMS/email/task follow-ups, **two-way Trade Me sync** (Autobase gateway: stock out, enquiries straight back into Lead Inbox, auto-close on sold), **Carsales / Autogate** lead capture in AU, **AutoGrab**, **RedBook & Glass's**, **MotorWeb**, 13+ DMS integrations (Titan, Auto-IT, Motorcentral, Pentana, AutoLine, etc.), Branded Dealer Pages on dealer domain, and Smart Loyalty gamified salesperson rewards ([autoplay.co.nz](https://autoplay.co.nz/)).
- **Public Pricing:** Not published publicly (quote-based; `autoplay.co.nz/plans` aborted connection during fetch, `search_web` confirms custom quote model with Starter and group tiers).
- **What to copy:** Two-way portal loop closure (listing out + enquiries back into unified inbox with vehicle context + auto-unpublish on sold) and portal-ROI attribution ("which portals drive enquiries on your stock").

---

## Part C: Feature Comparison Matrix

*Legend: `Included` = built into base/applicable tier | `Add-on` = paid module/usage extra | `Partner` = via 3rd-party integration | `No` = absent/explicitly excluded | `Not found` = not publicly stated.*

| Platform (Region) | Dealer Website | Custom Domain & SSL | Live Stock Sync | CRM / Lead Inbox | CSV / Legacy Import | Portal Feeds (carsales / Trade Me / FB) | Accounting Sync | State / Local Forms | Mobile App |
|---|---|---|---|---|---|---|---|---|---|
| **Nexgate / iMotor** (AU) | Add-on (iMotor) | Included (iMotor) | Included | Included | Partner / Assisted | Included (carsales, FB, 80+ dest.) | Not found | Not found | Yes (Dealer Drive) |
| **Indiqator** (AU) | Add-on (Radius) | Included (Radius) | Included | Add-on (LeadDriver) | Partner / Assisted | Included (SmartPublisher) | Partner | CloudLogic | Yes |
| **EasyCars** (AU) | Add-on | Included | Included | Basic / Add-on | Assisted migration | Included (carsales, Gumtree, FB) | Xero, MYOB | AU all-states | Yes (EasyPhoto) |
| **Virtual Yard** (AU) | Tiered (Small+) | Included | Included | Included | Assisted / CSV | Included (carsales, Gumtree, Drive) | Xero | AU all-states | Yes (iOS/Android) |
| **YardStack** (AU) | **Included** (all) | Included | Included | Included (+AI <1m) | **Free migration** | Included (carsales, FB, Gumtree, Drive) | Xero, MYOB | QLD & NSW | Web/Mobile responsive |
| **DealerX** (AU) | Tiered (CRM+Web) | 1 yr cPanel incl. | Included | Included | SMS/VIN migration | **No** (excluded) | Not found | VIC (VicRoads) | Coming soon |
| **Dealer Studio** (AU) | Core product | Included | Included | Included (LMS) | DMS feeds | Aggregation feeds | Partner | Digital contracts | Yes |
| **WP Motors / Inv. Presser** | DIY (WordPress) | Self-managed | Manual / Feed add-on | Form plugins only | XML/CSV add-on | Add-on / custom | No | No | WP Admin |
| **MotorDesk** (UK) | **Included** (all) | Included (+email) | Live (<1 min) | **Included** (8 channels) | Assisted / API v2 | 50+ channels (AutoTrader, FB) | Xero, QBO, Sage | UK VAT Margin | Yes (iOS/Android/Desktop) |
| **DealerCenter** (US) | Add-on ($99–$125) | Included | Included | Add-on ($99–$199) | Assisted | FB, Craigslist, OfferUp | QBO / Integrated | US state forms | Yes (VIN/DL scan) |
| **Frazer** (US) | Partner (200+) | No (via partner) | Partner sync | Basic / Partner | Assisted | Partner export | Built-in GL + QBO | US state forms | Sidekick (photos/VIN) |
| **AutoManager** (US) | Add-on ($70+) | Included | Live (Desk->Web) | Add-on ($140+) | Data migration | 250+ (FB, Google, eBay) | QBO / Desktop | US state forms | Yes |
| **DealerAssist** (US) | Core ($199–$299) | Included (managed) | Included (DMS feed) | Included (6-stage) | Auto-scrape from old site | No (website focus) | No | No | Yes (DealerChat app) |
| **Motorcentral** (NZ) | Add-on (Express+) | Extra (NZ$50+/yr) | Included | Add-on (AMPD) | POA migration | Trade Me (Dealerbase API) | Xero add-on | NZTA MR13C / CIN | Portal / Desktop |
| **Autoplay** (NZ/AU) | Branded pages | Included | DMS sync | **Core product** | DMS sync | Trade Me 2-way, carsales | No | Appraisal/handover | Yes (iOS/Android) |

---

## Part D: Public Pricing Comparison (Native Currency & Approximate AUD)

*Rates converted using RBA 24 Nov 2026 mid-rates (`1 USD = A$1.5090`, `1 GBP = A$1.9677`, `1 NZD = A$0.8222`). Excludes GST/VAT unless noted.*

| Platform | Pricing Model | Representative Tiers for a 10–80 Car Dealer (Native) | Approx. Monthly in AUD (24 Nov 2026) | Setup / Onboarding Fee | Source |
|---|---|---|---|---|---|
| **YardStack** (AU) | Per active car/mo | A$8/car/mo (e.g., 20 cars = A$160; 50 cars = A$400) | **A$160 – A$400** (20–50 cars) | A$0 (free migration) | [yardstack.com.au/pricing](https://www.yardstack.com.au/pricing) |
| **Virtual Yard** (AU) | By stock value | Free A$0; Basic A$120 (web extra); Small (<$500k) A$360; Med (<$1M) A$670 | **A$120 – A$670** | A$0 stated | [virtualyard.com](https://www.virtualyard.com/) |
| **DealerX** (AU) | Flat + setup | CRM Only A$89/mo; CRM + Website A$99/mo | **A$89 – A$99** | **A$1,790 – A$3,490** | [dealerx.au/pricing.html](https://dealerx.au/pricing.html) |
| **Nexgate** (AU) | Platform + usage | Access (<10 cars) A$99/mo + listing fees; Access+ A$799/mo + lead fees | **A$99 – A$1,299** (+ usage) | **A$515** | [nexgate.ai/pricing](https://www.nexgate.ai/pricing) |
| **EasyCars / Indiqator / Dealer Studio** (AU) | Custom quote | Not publicly published | **Not found** (custom) | Custom | [easycars.com.au](https://www.easycars.com.au/), [indiqator.com.au](https://indiqator.com.au/) |
| **WP Inv. Presser / Motors** | Plugin/theme license | Free core; US$100–$155/yr add-ons or US$89 theme + hosting | **~A$13 – A$20/mo** (+ WP hosting) | DIY / Agency fee | [inventorypresser.com/products/plugins/](https://inventorypresser.com/products/plugins/) |
| **MotorDesk** (UK) | By concurrent cars | Starter (5) £79; Growth (25) £149; Scale (50) £269; Conquer (100) £499 | **A$155 – A$982** (5–100 cars) | £0 self-serve; £199–£399 opt. | [motordesk.com/pricing-compare/](https://motordesk.com/pricing-compare/) |
| **DealerCenter** (US) | Modular à la carte | DMS $99 + CRM Plus $99 + Prem. Web $99 (or Pro $125) = US$297–$323 | **A$448 – A$487** (bundle) | US$0 stated | [dealercenter.com/pricing/](https://www.dealercenter.com/pricing/) |
| **Frazer** (US) | Flat desktop/cloud | Desktop US$129/mo (US$1,299/yr); Hosted from US$199/mo | **A$195 – A$300** (excl. web) | US$0 | `frazer.com` (via `search_web`) |
| **AutoManager** (US) | Modular + bundle | DMS $88; Web $70; DMS+Web $144; CRM $140 | **A$217** (DMS+Web) – **A$429** (+CRM) | Not found | [automanager.com/pricing/](https://www.automanager.com/pricing/) |
| **DealerAssist** (US) | Website-only SaaS | Website US$199/mo; Website + DealerChat US$299/mo | **A$300 – A$451** | US$0 (pay when live) | [dealerassist.com/pricing](https://www.dealerassist.com/pricing) |
| **Motorcentral** (NZ) | Tiered + setups | Std 35 NZ$100/mo; Std 100 NZ$180/mo + Website NZ$60/mo + Export NZ$5+ | **A$136 – A$201+** (excl. setup) | **NZ$2,585 – NZ$7,685** (DMS+Web) | [motorcentral.co.nz/pricing](https://www.motorcentral.co.nz/pricing) |

---

## Part E: Best-Practice Features Worth Copying (Actionable for AU MVP → P2)

### 1. Pricing, Packaging & Onboarding (Immediate MVP Decisions)
- **Price by active vehicles for sale (or per active car) with unlimited users, NOT per-seat or by total stock dollar value:**
  - *Evidence:* MotorDesk (£79–£499/mo by active vehicles, unlimited sold rotation + small +5/+10 car bolt-ons; [motordesk.com/pricing-compare/](https://motordesk.com/pricing-compare/)), YardStack (A$8/car/mo, unlimited users; [yardstack.com.au/pricing](https://www.yardstack.com.au/pricing)), EasyCars & DealerCenter (unlimited users; [easycars.com.au/products/dealer-management-system/](https://www.easycars.com.au/products/dealer-management-system/), [dealercenter.com/pricing/](https://www.dealercenter.com/pricing/)). Contrast Virtual Yard's stock-value cap, which penalises dealers stocking A$30k–A$60k utes/SUVs.
- **Offer a 14–30 day cardless trial + "Preview your live inventory before you pay" + zero/low setup fee:**
  - *Evidence:* MotorDesk 30-day cardless trial ([motordesk.com/pricing/](https://motordesk.com/pricing/)), YardStack 14-day cardless trial + free migration ([yardstack.com.au/pricing](https://www.yardstack.com.au/pricing)), DealerAssist instant preview from existing site + billing starts only at DNS cutover ([dealerassist.com](https://www.dealerassist.com/)).
- **Productise optional white-glove onboarding instead of mandatory A$1,500–A$5,990 setup barriers:**
  - *Evidence:* MotorDesk offers optional **Onboarding (£199)**, **Onboarding+ (£399)**, and **Managed Website (£399 + £99/mo)** alongside free self-serve ([motordesk.com/pricing/](https://motordesk.com/pricing/)). Contrast DealerX (A$3,490 setup) and Motorcentral (NZ$995–NZ$5,990 setup).

### 2. Storefront & Lead-Conversion UX (MVP & P1)
- **Single-record live storefront (no batch feed lag):**
  - *Evidence:* MotorDesk ("updated in seconds—no feed, no lag"; [motordesk.com/dealership-management/car-dealer-website/](https://motordesk.com/dealership-management/car-dealer-website/)) and YardStack ("hide while in recon, auto-remove when sold"; [yardstack.com.au/features/dealer-websites](https://www.yardstack.com.au/features/dealer-websites)).
- **AU-tuned repayment calculator (weekly / fortnightly / monthly) + "indicative only" compliance:**
  - *Evidence:* EasyCars highlights weekly/fortnightly/monthly repayment calculators directly on listings to pre-qualify buyers ([easycars.com.au/products/car-dealer-website](https://www.easycars.com.au/products/car-dealer-website)).
- **Guided "Sell / Trade-In / Consign Your Car" photo capture + "Can't find it?" sourcing form:**
  - *Evidence:* YardStack's guided 12-photo seller intake ([yardstack.com.au](https://www.yardstack.com.au/)) and DealerCenter Premium Pro's lead capture for vehicles not currently in stock ([dealercenter.com/dealer-websites/](https://www.dealercenter.com/dealer-websites/)).
- **Structured SEO + `llms.txt` + embeddable stock widget fallback:**
  - *Evidence:* MotorDesk publishes Vehicle schema + `llms.txt` for AI search and a WordPress plugin ([motordesk.com/dealership-management/car-dealer-website/](https://motordesk.com/dealership-management/car-dealer-website/)); YardStack offers an embeddable stock widget for dealers locked into existing Webflow/WordPress sites ([yardstack.com.au/features/dealer-websites](https://www.yardstack.com.au/features/dealer-websites)).
- **Post-sale verified review widget (BuyerScore pattern):**
  - *Evidence:* Motorcentral's BuyerScore auto-surveys buyers post-sale/test-drive and renders verified reviews on the dealer's site ([motorcentral.co.nz/pricing](https://www.motorcentral.co.nz/pricing)); EasyCars bundles a Google/Facebook Review Management module ([easycars.com.au](https://www.easycars.com.au/)).

### 3. CRM, Operations & AU State Compliance (MVP → P2)
- **Vehicle-attached unified enquiry inbox + fast auto-acknowledgement:**
  - *Evidence:* MotorDesk (8 channels in one inbox), Autoplay (two-way portal enquiries with vehicle context), YardStack (<1 min auto-reply), Indiqator LeadDriver (51-day follow-up). Even simple idempotent email/SMS auto-acknowledgement with vehicle context in MVP/P1 delivers huge perceived speed.
- **Mobile photo capture straight to stock card (no desktop cable/upload):**
  - *Evidence:* Praised in EasyCars (EasyPhoto), Virtual Yard ("photos go straight on the cars"), Frazer Sidekick, and YardStack (offline-tolerant shot list).
- **NSW / VIC / QLD statutory form generation & PPSR/history trust badge (P1/P2):**
  - *Evidence:* EasyCars, Virtual Yard, YardStack (QLD Form 9/12, NSW Form 5/register), and DealerX (VicRoads forms) show state-specific statutory paperwork is a primary switching driver for AU dealers. Note: keep optional niche add-ons (e.g., consignment trust ledgers or JDM import/auction fields) modular rather than mandatory for general used-car yards.
- **Public searchable documentation before signup:**
  - *Evidence:* Frazer ([frazerhelp.com](https://www.frazerhelp.com/)) and Inventory Presser ([inventorypresser.com/docs/](https://inventorypresser.com/docs/)) build buyer confidence by exposing real setup guides and feature docs publicly without gating behind a sales demo.

---

## Sources (All accessed `2026-11-24`)

### Directly Inspected Public Pages (HTTP 200)
1. `https://motordesk.com/pricing/` — MotorDesk Pricing (2026-11-24)
2. `https://motordesk.com/pricing-compare/` — MotorDesk Plan Comparison & Add-Ons (2026-11-24)
3. `https://motordesk.com/dealership-management/` — MotorDesk Platform Overview (2026-11-24)
4. `https://motordesk.com/dealership-management/car-dealer-website/` — MotorDesk Dealer Websites (2026-11-24)
5. `https://motordesk.com/api-docs/v2/` — MotorDesk REST API v2 Docs (2026-11-24)
6. `https://www.dealercenter.com/pricing/` — DealerCenter Pricing (2026-11-24)
7. `https://www.dealercenter.com/dealer-websites/` — DealerCenter Websites & Digital Marketing (2026-11-24)
8. `https://www.automanager.com/pricing/` — AutoManager Pricing (2026-11-24)
9. `https://www.frazerhelp.com/` — Frazer Help Manual Portal (2026-11-24)
10. `https://www.dealerassist.com/` — DealerAssist Homepage & Testimonials (2026-11-24)
11. `https://www.dealerassist.com/pricing` — DealerAssist Pricing & Plans (2026-11-24)
12. `https://www.motorcentral.co.nz/pricing` — Motorcentral NZ Pricing (2026-11-24)
13. `https://www.motorcentral.co.nz/websites` — Motorcentral Websites (2026-11-24)
14. `https://autoplay.co.nz/` — Autoplay Platform & Integrations (2026-11-24)
15. `https://www.easycars.com.au/` — EasyCars Homepage (2026-11-24)
16. `https://www.easycars.com.au/products/dealer-management-system/` — EasyCars DMS Features (2026-11-24)
17. `https://www.easycars.com.au/products/car-dealer-website` — EasyCars Dealer Websites (2026-11-24)
18. `https://www.easycars.com.au/our-customers` — EasyCars Customer Testimonials (2026-11-24)
19. `https://indiqator.com.au/` — Indiqator Solutions (redirect target of `dealersolutions.com.au`) (2026-11-24)
20. `https://www.nexgate.ai/` — Nexgate Overview (`autogate.co` -> `app.nexgate.ai`) (2026-11-24)
21. `https://www.nexgate.ai/pricing` — Nexgate Used Car Pricing (2026-11-24)
22. `https://www.nexgate.ai/product/marketing` — Nexgate Marketing & iMotor Link (2026-11-24)
23. `https://www.imotor.com.au/` — iMotor Website Solutions (2026-11-24)
24. `https://www.dealerstudio.com.au/` — Dealer Studio Platform & Testimonials (2026-11-24)
25. `https://www.adtorqueedge.com/` — AdTorque Edge Overview (2026-11-24)
26. `https://www.virtualyard.com/` — Virtual Yard Features & Pricing (2026-11-24)
27. `https://www.yardstack.com.au/` — YardStack Overview (2026-11-24)
28. `https://www.yardstack.com.au/pricing` — YardStack Pricing (2026-11-24)
29. `https://www.yardstack.com.au/features/dealer-websites` — YardStack Dealer Websites (2026-11-24)
30. `https://dealerx.au/pricing.html` — DealerX Pricing (2026-11-24)
31. `https://www.prodealer.com.au/` — Prodealer Agency (2026-11-24)
32. `https://inventorypresser.com/products/plugins/` — Inventory Presser Plugins & Pricing (2026-11-24)
33. `https://wordpress.org/plugins/motors-car-dealership-classified-listings/` — Motors WP Plugin (2026-11-24)
34. `https://wordpress.org/plugins/wp-car-manager/` — WP Car Manager Closure Notice (2026-11-24)

### Additional Sources Indexed via `search_web` (2026-11-24)
35. `https://www.rba.gov.au/statistics/tables/` — RBA Daily Exchange Rates (20/23/24 Nov 2026; direct scripted fetch HTTP 403)
36. `https://frazer.com/` — Frazer DMS Pricing & Features (DNS failed in shell; indexed via `search_web`)
37. `https://www.capterra.com` — User review ratings/snippets for MotorDesk, DealerCenter, Frazer, AutoManager (direct fetch HTTP 403)
38. `https://www.xero.com` — Xero App Store listings/feedback for EasyCars and Virtual Yard (via `search_web`)
39. `https://www.apple.com` — Apple App Store review snippets for Virtual Yard & Dealer Studio (via `search_web`)
40. `https://www.motorweb.com.au` & `https://www.motorweb.co.nz` — MotorWeb PPSR/NEVDIS/VIR positioning (via `search_web`)
41. `https://duoplus.nz` — Duoplus general digital/SEO agency positioning (via `search_web`)

---

## Gaps / Not Accessible

1. **Opaque AU Pricing (Quote-Gated):** EasyCars, iMotor, Indiqator Solutions (Radius / CloudLogic / LeadDriver), Dealer Studio, AdTorque Edge, Prodealer, Digital Dealer, and Autoplay (NZ/AU) do not publish website or DMS pricing publicly. Confirm real street prices during dealer interviews.
2. **Nexgate Per-Listing & Per-Enquiry Variable Fees:** [nexgate.ai/pricing](https://www.nexgate.ai/pricing) states "See table below for listing fees" and "Pay per enquiry", which appear inside interactive client-side modals/tables not exposed in static HTML; exact dollar rates per car/lead remain **UNVERIFIED** publicly.
3. **Anti-Bot / HTTP 403 / DNS Blocks (Skipped per Rules):**
   - `rba.gov.au/statistics/frequency/exchange-rates.html` (HTTP 403 on scripted fetch; figures taken from `search_web` RBA summary).
   - `help.motordesk.com/docs/` (HTTP 202 challenge), `support.motorcentral.co.nz` (Cloudflare JS challenge / HTTP 403), `support.automanager.com` (HTTP 403), `digitaldealer.com.au` (HTTP 418), `capterra.com` (HTTP 403 on direct fetch; quotes taken from `search_web` Capterra results).
   - `frazer.com` DNS resolution failed from this environment (pricing/features taken from `search_web` summaries of `frazer.com`, cross-checked against accessible `frazerhelp.com`).
   - `autoplay.co.nz/plans` aborted connection during fetch (`search_web` confirmed custom quote model with Starter/advanced tiers).
4. **Australian Independent Dealer Churn & WordPress Maintenance Costs:** Actual percentage of 10–80 vehicle NSW/VIC/QLD independents currently using WordPress vs. EasyCars/Virtual Yard/Indiqator/Nexgate is **not found** in public sources and should be validated in the planned 5–10 dealer interviews.
