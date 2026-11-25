# Competitor Teardown: Australian Used-Car Dealer DMS, Inventory & CRM Software

- **Research Date / Access Date:** 24 November 2026
- **Target ICP Context:** Independent Australian used-car dealerships (~10–80 vehicles, 1–few branches; focus states NSW, VIC, QLD). JDM-import tooling is excluded as a universal requirement (treated as optional niche only).
- **Method:** Public web search (`search_web`) and HTTP inspection of public vendor product, pricing, integration, marketplace (Xero/MYOB/Apple App Store), review (Capterra/G2), and industry news (GoAuto, Vela APX, AutoTalk) pages. No accounts created, no forms submitted, no login/paywall/anti-bot bypasses performed.
- **Unique Public Sources Accessed / Verified:** 46 canonical URLs across 42 indexed source entries (see Section 6: Sources).

---

## Executive Snapshot of the 2026 Australian Landscape

1. **Major Corporate Consolidation (2025–2026):**
   - **Cox Automotive Australia Retail & Data Solutions (RDS)** (historically including Dealer Solutions) was acquired in July 2025 by **Vela APX** (Constellation Software Inc.) and rebranded as **Indiqator Solutions Pty Ltd** (`indiqator.com.au`) [S16, S17, S18].
   - **Auto-IT** is also backed by Constellation Software (Perseus operating group) [S32].
   - **carsales** officially replaced **AutoGate** with **Nexgate** (`nexgate.ai`), bundling AI call transcription (Google Gemini), market insights, and lead/inventory billing into tiered plans from A$99 to A$1,299/mo excl. GST plus per-listing and per-enquiry fees [S19, S20, S21, S22].
2. **Pricing Split:** Legacy incumbents (**EasyCars**, **Indiqator/CloudLogic**, **Eclipse DMS**, **Titan DMS**, **Auto-IT**, **Pentana**, **Dealer Studio**, **AutoPlay**, **Dealerloop**) use **quote-only** pricing. Newer challengers (**YardStack** at A$8/car/mo + GST; **Modern DMS** from A$59/module/mo + GST) and **Virtual Yard** (A$0–A$2,940/mo incl. GST) publish transparent SaaS pricing [S5, S6, S9, S25].
3. **Unbundled Reality for Independents:** Many 10–80 car independent dealers end up paying for **two or three separate tools**: (a) **Nexgate** for carsales stock & leads, (b) a back-office **DMS** (**EasyCars**, **Virtual Yard**, **CloudLogic**) for state statutory forms/police books + Xero/MYOB sync, and increasingly (c) a **modern website or AI CRM layer** (**Dealer Studio**, **Dealerloop**, **AutoPlay**) because legacy DMS CRMs and dealer websites lag on conversion and instant lead response.

---

## 1. Product-by-Product Profiles

### Group A: Core Independent-ICP DMS & All-in-One Platforms

---

#### 1. EasyCars (by Jeal Computer Services)
- **URL:** `https://www.easycars.com.au/` [S1]
- **Target Segment:** Small-to-large independent and franchise motor dealers across Australia (cars, trucks, motorcycles, caravans, boats), strong fit for 10–80 car used yards [S1].
- **Modules:**
  - **Inventory & Photos:** Stock control, purchase/costing, floor planning, Rego/VIN lookup (`Rego2Stock`), RedBook & Glass's Guide spec population [S1, S11, S12]. Companion **EasyPhoto** smartphone app syncs photos straight to inventory [S11].
  - **Portal / Feed Syndication:** Syndicates to 28+ Australian classifieds (including carsales, Gumtree, and others) and supports Facebook Automotive Inventory Ads with per-portal listing customisation [S1, S11, S12].
  - **CRM / Leads:** Basic lead management and automated Google/Facebook review request module [S1, S11]; deep AI lead nurturing is not a primary focus (often supplemented by third-party CRMs like AutoPlay or Dealerloop) [S27].
  - **Website Builder:** Custom responsive dealer website packages synced with live stock [S1, S11].
  - **Finance & Insurance (F&I):** Integrated dealer finance workflows (e.g., Drive On Finance partnership for multi-lender applications and tracking) [S1, S3].
  - **Accounting (Xero / MYOB):** Native Xero and MYOB integrations [S1, S11].
  - **PPSR / NEVDIS:** Integrated PPSR and CarHistory checks saved to vehicle records [S11, S12]; recall/status tracking [S12]. Direct standalone NEVDIS API access outside PPSR/CarHistory is `UNVERIFIED`.
  - **Compliance Docs / Forms:** Automated state-specific statutory forms, transfers, disposals, and electronic police/dealings books across all Australian states and territories (NSW, VIC, QLD, WA, SA, TAS, NT) [S1, S11, S12].
  - **Reporting:** Built-in sales, inventory, and profitability reports [S1].
  - **Mobile App:** Web-based across mobile/tablet browsers plus companion **EasyPhoto** mobile app [S1, S11].
  - **Multi-Branch:** Supports multiple yards/locations (yard selection per vehicle) [S4].
- **Public Pricing (GST note):** **Quote only** (customised by dealership size/vehicle category; not published publicly) [S2, S10, S12].
- **Contract Terms / Lock-in:** Advertises **"no lock-in contracts and no hidden fees"** and **unlimited users** on packages [S1, S11].
- **Onboarding / Migration Offer:** Assists with historical stock/data migration from previous DMS platforms [S11]; 24/7 Australian phone support included, with optional paid 1-on-1 hourly training [S1].
- **Integrations:** Xero, MYOB, RedBook, Glass's Guide, PPSR / CarHistory, 28+ ad portals (carsales, Facebook AIA), Drive On Finance, Workshop Mate [S1, S3, S11, S12].
- **Notable Positioning Claims `[Vendor claim]`:** *"Over 40 years' worth of experience"*, *"5-star customer service rating and offer 24/7 phone support"*, *"only having to enter the details once to produce invoices, transfers, disposals"* [S1].
- **Verified User Feedback:**
  - Positive on mobile usability and support (G2): *"it has a very good application for mobile devices, and best of all an excellent technical support team"* [S10].
  - Positive on MYOB/PDF/mobile workflow (EasyCars testimonial): *"From being able to use it on a mobile, sync with MYOB, easily print to PDF"* [S1].
  - Critical feedback on Xero App Store notes partial manual syncing for purchase orders/expenses, contact-merge sync sensitivity, and reliance on manual journals (requiring bookkeeping knowledge for items like stamp duty) [S14].

---

#### 2. Virtual Yard (by CFS Group Pty Ltd)
- **URL:** `https://www.virtualyard.com/` [S9]
- **Target Segment:** Small independent dealers/wholesalers up to established multi-million-dollar yards and franchises (cars, RVs, trucks, bikes, marine) across Australia (headquartered in Norwest, NSW) [S9].
- **Modules:**
  - **Inventory & Photos:** Cloud inventory tracking, AI analytics, contactless invoice/website payments, digital e-signing [S9].
  - **Portal / Feed Syndication:** Free advertising feed distribution ("Enter your stock once and we'll send it anywhere") to Australian portals including carsales, Drive, Autotrader, and Carsforsale.com.au; Basic tier restricts advertising feeds [S9, S12].
  - **CRM / Leads:** Centralised lead & customer management with website live chat and automated SMS/email notifications [S8, S9].
  - **Website Builder:** High-converting dealer websites (sell, subscribe, rent), online trade-in valuations, finance applications, deposits, customer portal; included from Small plan upward (extra on Free/Basic) [S9].
  - **Finance & Insurance (F&I):** Customer online finance/lease application capture and contactless deposit/invoice payment flows [S9].
  - **Accounting (Xero / MYOB):** Built-in accounting dashboards plus native Xero integration (QuickBooks also noted on directories) [S9, S12]. MYOB integration is `UNVERIFIED` / not highlighted on main Xero/product pages.
  - **PPSR / NEVDIS:** Integrated PPSR / vehicle history certificate lookup saved against vehicle profiles [S9]; standalone NEVDIS beyond PPSR is `UNVERIFIED`.
  - **Compliance Docs / Forms:** Generates and prints state-required government compliance forms and stock registers [S9, S12].
  - **Reporting:** Built-in operational & financial dashboards [S9].
  - **Mobile App:** Native iOS/Android apps (3.8/5 on Apple App Store) for lot photography, stock edits, and live chat [S8, S9].
  - **Multi-Branch:** Supports multi-site / franchise deployments (700+ dealership locations claimed) [S9]; specific branch-level RBAC details `UNVERIFIED`.
- **Public Pricing (GST note):** Published publicly on `virtualyard.com` (AUD, **incl. GST** — verified against Xero App Store excl. GST figures, which are exact ÷ 1.1) [S9, S12]:
  - **Free** (wholesalers, unlimited stock, lightweight DMS, no site): **A$0/mo** [S9]
  - **Basic** (starting out, full DMS, limited feeds, site extra): **A$120/mo incl. GST** (A$109.09 excl. GST on Xero App Store) [S9, S12]
  - **Small** (<A$500k retail stock value, feeds + website included): **A$360/mo incl. GST** (A$327.27 excl. GST) [S9, S12]
  - **Medium** (<A$1M stock): **A$670/mo incl. GST** (A$609.09 excl. GST) [S9, S12]
  - **Large** (<A$2M stock): **A$980/mo incl. GST** [S9]
  - **X Large** (<A$4M stock): **A$1,790/mo incl. GST** [S9]
  - **Franchise** (unlimited stock): **A$2,940/mo incl. GST** [S9]
  - *Add-ons:* AutoGrab market overlay is a paid add-on; website is extra on Free/Basic [S9].
- **Contract Terms / Lock-in:** **"Unlimited Users, No Setup Fees, No Contract, Cancel Anytime"** [S9].
- **Onboarding / Migration Offer:** Free trial / free starter tier; self-serve or live-chat onboarding; formal CSV migration service terms `UNVERIFIED` [S9].
- **Integrations:** Xero, AutoGrab, carsales, Drive, Autotrader, Carsforsale.com.au, Google Cloud hosting, payment/e-sign [S8, S9, S12].
- **Notable Positioning Claims `[Vendor claim]`:** *"Australia's most advanced all-in-one dealership system"*, *"backbone to over 700 dealerships across Australia"*, *"$5.3b Vehicle transactions"* [S9].
- **Verified User Feedback:** Xero App Store reviewer criticises Xero sync stability and second-hand tax handling: *"The connection between Xero & Virtual Yard has to be renewed every time you want to send data."* (paraphrase: reviewer also reports sync failures and having to manually amend every invoice for second-hand car margin scheme VAT/GST) [S13].

---

#### 3. YardStack
- **URL:** `https://yardstack.com.au/` | Pricing: `https://yardstack.com.au/pricing` | Integrations: `https://yardstack.com.au/integrations` [S5, S6, S7]
- **Target Segment:** Independent Australian used-car dealers (1–10+ rooftops), new dealers starting out, and **consignment dealers** (built inside a working QLD consignment yard, TradeBeat) [S5, S6, S7]. Direct ICP overlap.
- **Modules:**
  - **Inventory & Photos:** VIN-to-stock card, owned + consignment stock, reconditioning job sheets (quote vs actual, supplier turnaround), holding cost/day, floor plan tracking, ageing alerts, optional AI studio photo enhancement [S5, S6, S7].
  - **Portal / Feed Syndication:** Syndicates directly from stock cards to **carsales, Facebook Marketplace, Gumtree, Autotrader, Drive**, plus pulls enquiries from all portals + Meta Lead Ads into one inbox [S6].
  - **CRM / Leads:** Unified lead inbox with **AI first reply**, automated follow-ups, pipeline, Gmail & Outlook two-way threaded email sync, post-sale Google Business Profile review requests [S5, S6].
  - **Website Builder:** Custom mobile-first dealer website **included** on all plans (live stock sync) [S5].
  - **Finance & Insurance (F&I):** Captures buyer finance applications at deal desk and tracks referral progress in customer portal (no in-house broking) [S5, S7].
  - **Accounting (Xero / MYOB):** Native two-way **Xero** and **MYOB** sync with per-car tracking categories, separating margin scheme vs full GST [S6].
  - **PPSR / NEVDIS:** Integrated PPSR, written-off, and stolen checks (NEVDIS data via PPSR/inspection workflow), saving certificates and gating consignor payouts behind a fresh PPSR check [S5, S6].
  - **Compliance Docs / Forms:** **QLD** (digital Form 9 with built-in e-sign, Form 12, trust ledger, dealer register) and **NSW** (Form 5 dealer notice, dealer guarantee, NSW dealer's register, consignment agreement) are live [S5]. **VIC statutory paperwork is NOT yet live** (roadmap/upcoming) [S7]. Passwordless buyer/consignor portal + built-in e-sign ("no DocuSign needed") [S5].
  - **Reporting:** Real-time **true net profit per car** (purchase/buy fees + recon + holding cost/day + floorplan interest + ad cost + commissions) and daily summaries [S5, S6].
  - **Mobile App:** Responsive web app working across phone, tablet, and desktop (11-section inspection & appraisal workflow on mobile); native iOS/Android App Store app status `UNVERIFIED` [S5, S7].
  - **Multi-Branch:** Supports multi-site dealer groups (stock across all sites billed on average cars in stock; roles/permissions per user) [S5].
- **Public Pricing (GST note):** Transparent published pricing on `yardstack.com.au/pricing` (updated 2026 from earlier tiered pricing to flat per-unit pricing) [S5]:
  - **A$8 per car in stock, per month + GST** (billed on monthly average owned + consigned stock until settlement; no minimum, no car cap, unlimited users, custom website included; e.g., 20 cars = A$160/mo + GST) [S5].
  - **Usage add-ons (+ GST):** PPSR check **A$5 each**, AI valuation **A$2 each**, Studio photos **A$0.50/photo up to A$4/car** [S5].
  - **Desk (optional managed VA add-on):** From **A$1,500/mo + GST** (shared) or **A$3,000/mo + GST** (dedicated seat, Mon–Sat 8am–6pm Brisbane time) [S5].
- **Contract Terms / Lock-in:** **Month-to-month, cancel anytime, no setup fee, 14-day free trial (no card required), full data export anytime** [S5].
- **Onboarding / Migration Offer:** **Free data migration** of stock, customers, and deals from **EasyCars, Virtual Yard, CloudLogic, or spreadsheets** [S5].
- **Integrations:** Xero, MYOB, carsales, Facebook Marketplace & Meta Lead Ads, Gumtree, Autotrader, Drive, PPSR, Manheim, Pickles, Gmail, Outlook/Microsoft 365, Google Business Profile [S6].
- **Notable Positioning Claims `[Vendor claim]`:** *"Built by a working QLD consignment dealer. Talk to a dealer, not a salesperson"*; *"Replaces your CRM, DocuSign, PPSR portal, form builder and recon spreadsheet"* [S5].
- **Verified User Feedback:** `Not found` on Capterra, G2, or Xero App Store as of 24 Nov 2026 (new entrant).

---

#### 4. Indiqator Solutions — CloudLogic / SmartPublisher / LeadDriver / Radius
*(Formerly Cox Automotive Australia Retail & Data Solutions / Dealer Solutions; also noting legacy **DEALERLogic**)*
- **URL:** `https://indiqator.com.au/` | DMS page: `https://indiqator.com.au/dms` [S15, S16]
- **Corporate History (Verified):** Cox Automotive Australia acquired Dealer Solutions in 2016; in **July 2025**, **Vela APX** (Constellation Software Inc.) acquired Cox Automotive Australia's Retail & Data Solutions (RDS) business and launched it as **Indiqator Solutions Pty Ltd** [S16, S17, S18].
  - *Note on **DEALERLogic**:* `DEALERLogic` appears on Xero App Store (`apps.xero.com/au/app/dealerlogic`) listed under Dealer Solutions / Cox Automotive for independent dealers (cars, bikes, campers, trucks) with Xero two-way sync and Glass's NVIC [S35]. On `indiqator.com.au`, the flagship independent DMS is now branded **CloudLogic** [S15].
- **Target Segment:** Full spectrum across Australia — dedicated **"Independent"** stack (**CloudLogic DMS**, self-managed Website, Advertise my Stock, simple Lead Management) up to **Franchise** and **OEM / National Groups** (**Radius**, **SmartPublisher**, **LeadDriver**, **FinanceConnect**, **ServiceIQ** [formerly Xtime]) [S15, S16, S18].
- **Modules (Independent Stack + Connected Indiqator Suite):**
  - **Inventory & Photos:** **CloudLogic** manages purchases, trade-ins, payouts, stock cards, notional GST/cost estimates [S15]. **SmartPublisher** aggregates/validates stock and distributes it (replacing legacy Dealer Solutions SmartPublisher) [S15, S18].
  - **Portal / Feed Syndication:** Syndicates to **carsales, Autotrader, Gumtree** and OEM/dealer sites via SmartPublisher [S15, S18]. Facebook AIA via SmartPublisher/Zapier [S15].
  - **CRM / Leads:** Basic follow-up reminders + SMS/email templates in independent tier; **LeadDriver** adds unified pipeline (carsales, CRM, DMS, Meta/Google via Zapier) with **24/7 AI conversations and 51-day automated follow-up** [S15].
  - **Website Builder:** **Radius** (conversion-optimised websites with DMS stock feeds, enquiry/test-drive/trade-in CTAs) [S15].
  - **Finance & Insurance (F&I):** **FinanceConnect** wires DMS directly to Australian F&I/warranty/aftermarket providers [S15, S16].
  - **Accounting (Xero / MYOB):** **Xero** integration confirmed for CloudLogic (and legacy DEALERLogic) [S15, S35]; MYOB support `UNVERIFIED`.
  - **PPSR / NEVDIS:** Optional integrated PPSR and vehicle history checks stored against stock records [S15].
  - **Compliance Docs / Forms:** State-specific statutory compliance paperwork, contracts, transfers, and registration forms [S15].
  - **Reporting:** Profit, cost estimate, reconciliation, and Nurture Insights benchmark reporting [S15].
  - **Mobile App:** Browser-based cloud access across Mac/PC and mobile devices [S15]; dedicated native mobile app for CloudLogic `UNVERIFIED`.
  - **Multi-Branch:** Supported across dealer groups and multi-site franchises [S15].
- **Public Pricing (GST note):** **Quote only** (modular pricing depending on CloudLogic vs Radius/LeadDriver/SmartPublisher bundle) [S15, S16].
- **Contract Terms / Lock-in:** Not publicly published (`UNVERIFIED`).
- **Onboarding / Migration Offer:** Not publicly detailed beyond sales-assisted onboarding (`Talk to our team`) [S15].
- **Integrations:** Xero, carsales, Autotrader, Gumtree, Zapier (Facebook Lead Ads, Google Ads), PPSR, Australian F&I lenders (FinanceConnect), ServiceIQ/Xtime [S15, S16].
- **Notable Positioning Claims `[Vendor claim]`:** *"Every lead, every deal, every return visit all connected"*; *"Attract a buyer on Radius, convert them in LeadDriver, finance the deal through FinanceConnect, then keep them with ServiceIQ"* [S15].
- **Verified User Feedback:** Public independent dealer reviews specifically under the post-July 2025 **Indiqator / CloudLogic** brand were `not found` on Capterra/G2/Xero App Store; GoAuto reports Indiqator is gearing up for 2026 growth post-spinout [S18].

---

#### 5. Modern DMS (MDMS)
- **URL:** `https://moderndms.com.au/` | Pricing: `https://moderndms.com.au/pricing/` [S25]
- **Target Segment:** **Australian equipment, agricultural, construction, truck/trailer, marine, powersports, caravan & RV, and hire/rental dealers** [S25] — **NOT purpose-built for passenger used-car yards**, included here because it is one of the very few AU-native DMS vendors with transparent modular AUD pricing and strong Xero/MYOB sync.
- **Modules:**
  - **Inventory & Photos:** Serialised unit tracking, consignment ("Units held, not owned"), stocktake, parts/warehouse, rental/hire fleet [S25].
  - **Portal / Feed Syndication:** No carsales / Gumtree / Facebook passenger-car syndication found (`N` / not targeted) [S25].
  - **CRM / Leads:** Dedicated Sales & CRM module (pipeline KPIs, CPQ quoting, trade-ins) [S25].
  - **Website Builder:** Customer self-serve portal (not a consumer used-car storefront) [S25].
  - **Finance & Insurance (F&I):** Floorplan in Equipment Dealer Suite [S25]; consumer car F&I `N`.
  - **Accounting (Xero / MYOB):** Live two-way **Xero** and **MYOB** sync + optional built-in General Ledger & BAS module [S25].
  - **PPSR / NEVDIS:** Not documented for passenger cars (`N` / `UNVERIFIED`).
  - **Compliance Docs / Forms:** Australian GST/BAS tax compliance; **no state motor-dealer used-car statutory forms / police books** found (`N`) [S25].
  - **Reporting:** Role-aware KPIs and dashboards [S25].
  - **Mobile App:** Mobile field service & offline capability [S25].
  - **Multi-Branch:** Multi-location support (base includes 1 location; multi-branch supported) [S25].
- **Public Pricing (GST note):** Transparent AUD pricing on `moderndms.com.au/pricing/` (**excl. GST**) [S25]:
  - **Core modules:** **A$59/month excl. GST** per module (General Ledger & Operations module **A$259/mo excl. GST**; extra users ~A$9/mo) [S25].
  - **Preset bundles (billed annually, 15% discount, excl. GST):** Equipment Sales (6 modules) **A$301/mo**, Rental Only (5 modules) **A$251/mo**, Sales & Rental (7 modules) **A$351/mo**, Full Dealership (9 modules) **A$451/mo** [S25].
- **Contract Terms / Lock-in:** Monthly or annual (15% off annual); **14-day free trial, no credit card required** [S25].
- **Onboarding / Migration Offer:** Dedicated "Migration" workflow promoted (`Moving from another system`) [S25].
- **Integrations:** Xero, MYOB, integrated card payments, MDMS AI [S25].
- **Notable Positioning Claims `[Vendor claim]`:** *"Modular pricing — pay for what you use"*; *"MDMS AI Built into the ERP, not bolted on"* [S25].

---

### Group B: Marketplace, Website & CRM Ecosystem Layers

---

#### 6. Nexgate + Dealer Drive (by carsales — replaced AutoGate)
- **URL:** `https://www.nexgate.ai/` | Pricing: `https://www.nexgate.ai/pricing` | Business Portal: `https://business.carsales.com.au/` [S19, S20, S21]
- **Target Segment:** Virtually all Australian franchise and independent used-car dealers advertising on **carsales.com.au** [S20, S22]. **Not a full back-office DMS/accounting/statutory system** — functions as the marketplace distribution, pricing intelligence, and lead-engagement hub [S20].
- **Modules:**
  - **Inventory & Photos:** Centralised listing distribution with automated publishing rules (min photo/video thresholds, margin rules) and RedBook Inspect pre-purchase inspections [S20].
  - **Portal / Feed Syndication:** Primary pipeline to carsales network and connected third-party destinations [S20].
  - **CRM / Leads:** Unified enquiry inbox, **Google Gemini AI call transcription and timestamped summaries**, AI smart replies, auto-responses, buyer journey enrichment, **"Contact Watchers"** offers [S20, S21]. **Dealer Drive** add-on (provided by i-Motor Pty Ltd) handles test drives, loan cars, driver's licence/OCR capture, waivers, and traffic fine tracking [S20, S24].
  - **Website Builder:** Offered via Marketing suite / partner integrations (e.g., i-Motor) under separate rate cards [S20].
  - **Finance & Insurance (F&I):** `N` (marketplace finance badges/leads exist on carsales consumer site, not dealer F&I back-office).
  - **Accounting (Xero / MYOB):** `N` (not an accounting/DMS ledger; syncs with external DMSs) [S20, S22].
  - **PPSR / NEVDIS:** Used in appraisals / Dealer Drive (LiveMarket, RedBook, PPSR lookups; search fees apply) [S20, S24].
  - **Compliance Docs / Forms:** `N` (does **not** replace state statutory Form 5 / Form 9 / CAV forms or dealer police books).
  - **Reporting:** Competitive set market insights (3 data points on Access/Access+, 5 on Pro incl. estimated time to sell, full market reports + 5,000 AI Assistant queries/mo on Signature) [S20].
  - **Mobile App:** Web + iOS/Android mobile app (inherited/upgraded from AutoGate) [S19, S20].
  - **Multi-Branch:** Supports dealer groups and multi-account visibility [S20].
- **Public Pricing (GST note):** Transparent published pricing on `nexgate.ai/pricing` (**AUD, excl. GST**) [S20]:
  - **One-off establishment fee:** **A$515 excl. GST** [S20]
  - **Access** (used cars only, **<10 cars listed**, listing-fee billing): **A$99/mo excl. GST** + listing fees (rolling 28 days or up to 5 leads: A$75–A$250/listing excl. GST by car price) + enquiry fees [S20]
  - **Access+** (unlimited used inventory, pay-per-enquiry): **A$799/mo excl. GST** (Dealer Drive add-on **A$399/mo excl. GST**; note earlier small-account add-on rate of A$99/mo referenced in sub-clauses) [S20]
  - **Pro** (unlimited used, 5 insight data points, Dealer Drive included): **A$1,099/mo excl. GST** [S20]
  - **Signature** (full insights, carsales + Facebook Marketplace sourcing, AI Assistant, 20% off vehicle searches): **A$1,299/mo excl. GST** [S20]
  - **Per-enquiry fees (ALL used-car plans, excl. GST):** A$19 (car A$0–$2,999), A$50 (A$3,000–$8,499), **A$82 (A$8,500–$69,999)**, A$85 (A$70,000+) [S20].
- **Contract Terms / Lock-in:** Governed by carsales PSS / subscriber terms (establishment fee + monthly subscription + per-enquiry/28-day listing billing; specific lock-in period `UNVERIFIED`) [S20].
- **Onboarding / Migration Offer:** Account management included; AutoGate dealers migrated to Nexgate [S20, S22].
- **Integrations:** Connects with major AU DMSs and CRMs (e.g., EasyCars, Virtual Yard, YardStack, Dealerloop, AutoPlay, Titan, Pentana) [S6, S20, S27, S28].
- **Notable Positioning Claims `[Vendor claim]`:** *"One connected platform"* for sourcing, inventory, customers and insights; *"Access carsales enquiry and conversation context directly from the source"* [S19, S20].

---

#### 7. Dealer Studio (by Total Dealer Pty Ltd)
- **URL:** `https://www.dealerstudio.com.au/` | OEM/Features: `https://www.dealerstudio.com.au/oem` [S23]
- **Target Segment:** Primarily franchised dealerships, multi-franchise dealer groups, and OEMs across Australia (claims **300+ dealerships across 2,000+ websites**, founded 2018, ISO 27001:2022 certified, #40 AFR Fast 100 in 2026), with some single-rooftop/independent availability [S23]. Sits as the **digital storefront + LMS/CRM + digital contracts layer** over a back-end DMS [S23].
- **Modules:**
  - **Inventory & Photos:** Stock aggregation from DMS, automated price drops, AI-generated vehicle descriptions (OpenAI + Redbook), **automatic number plate blurring** add-on [S23].
  - **Portal / Feed Syndication:** Syncs to carsales (auto-withdraws sold stock), Facebook Automotive Inventory Ads (AIA), Google Vehicle Listing Ads (VLA) [S23].
  - **CRM / Leads:** Lead Management System (LMS) capturing website/OEM/campaign leads, two-way SMS & email automation, conversion analytics [S23].
  - **Website Builder:** Core strength — custom, SEO-optimised, mobile-first dealer websites with build-and-price configurators, self-service CMS, online deposits [S23].
  - **Finance & Insurance (F&I):** Open payload integration to third-party financiers [S23].
  - **Accounting (Xero / MYOB):** Direct **Xero** invoicing/account-code mapping for dealer billing/PDFs [S23]; not a full general ledger DMS; MYOB `N` / `UNVERIFIED`.
  - **PPSR / NEVDIS:** Built-in PPSR checks inside vehicle appraisals and lead workflows [S23].
  - **Compliance Docs / Forms:** Digital sales contract builder with **e-signing**, encrypted driver's licence storage, OEM brand-locked templates; full state statutory **police book / dealer register** replacement is `UNVERIFIED` / typically handled by paired DMS [S23].
  - **Reporting:** Marketing, lead-source attribution, and contract exception dashboards [S23].
  - **Mobile App:** Mobile app / mobile list views and restricted SMS inbox for sales staff [S23].
  - **Multi-Branch:** Built explicitly for multi-franchise dealer groups and OEM networks [S23].
- **Public Pricing (GST note):** **Quote only** (modular pricing by websites, LMS seats, and add-ons such as number-plate blurring) [S23].
- **Contract Terms / Lock-in:** Not publicly published (`UNVERIFIED`).
- **Onboarding / Migration Offer:** Structured onboarding and dealership setup trackers [S23].
- **Integrations:** Auto-IT, Tune/Revolution, Titan DMS, carsales/Nexgate, Xero, AutoGrab (Appraisals), RedBook, OpenAI, Facebook AIA, Google VLA, Stellantis/OEM feeds [S23, S31].
- **Notable Positioning Claims `[Vendor claim]`:** *"Trusted by 300+ dealerships across 2000+ websites, with ISO 27001:2022 certified security"*; *"#40 AFR Fast 100 · 2026"* [S23].

---

#### 8. AutoPlay
- **URL:** `https://autoplay.com.au/` | Pricing: `https://autoplay.com.au/pricing` | Integrations: `https://autoplay.com.au/integrations` [S26, S27]
- **Target Segment:** Franchised dealers, multi-site dealer groups, OEMs, and **used & independent dealers** across Australia and New Zealand [S26]. Functions as a **CRM, sales pipeline, and appraisal layer** rather than a full accounting/compliance DMS [S26, S27].
- **Modules:**
  - **Inventory & Photos:** Multi-channel stock distribution and live inventory sync (Trade Me, Driven, Autotrader NZ, dealer website Vehicle Display Pages); AU portal feed focus is primarily lead capture from carsales/AutoGate [S26, S27].
  - **CRM / Leads:** Kanban sales pipeline, unified lead inbox, customer CRM (purchases + leads + history), automated SMS/email follow-up, test-drive & loan-car ("On the Floor") management, salesperson Points & Recognition rewards [S26].
  - **Website Builder:** Branded Vehicle Display Pages on dealer's own domain integrated with pipeline [S26] (not a full general CMS DMS).
  - **Finance & Insurance (F&I):** `N` / handoff to DMS.
  - **Accounting (Xero / MYOB):** `N` (relies on paired DMS).
  - **PPSR / NEVDIS:** History/VIN checks via **Motorweb** (NZ/AU) and valuations via **AutoGrab** and **Redbook / Glass's** [S26, S27]; direct AU PPSR certificate workflow `UNVERIFIED`.
  - **Compliance Docs / Forms:** OEM lead compliance and audit-ready handover; **not** a state statutory police-book/Form 5/Form 9 generator (`N`) [S26].
  - **Reporting:** Attribution, conversion, consultant activity, and multi-site group roll-up [S26].
  - **Mobile App:** Native **Autoplay Mobile** for iOS and Android (driver's licence scanning, test drives, appraisals) [S26].
  - **Multi-Branch:** Explicit group roll-up and site-by-site visibility [S26].
- **Public Pricing (GST note):** **Quote only** (no public `$` figures) [S26]. Tiered by **brands per location** rather than feature gating: **Basic** (1 brand / independent used dealer), **Starter** (up to 3 brands), **Professional** (4–9 brands), **Platinum** (10+ brands), **OEM** (POA) [S26].
- **Contract Terms / Lock-in:** Advertises **no lock-in contracts** [S26].
- **Onboarding / Migration Offer:** Onboarding and onshore AU/NZ support included in subscription [S26].
- **Integrations:** Carsales/AutoGate, EasyCars, Titan DMS, CDK, DealerPRO, Toyota iLot, Glass's Vehicle Lookup, RedBook, AutoGrab, Motorweb, iAppraise, Revolution [S27].
- **Notable Positioning Claims `[Vendor claim]`:** *"Every Autoplay plan includes the entire platform — no features locked behind higher tiers"* [S26].

---

#### 9. Dealerloop
- **URL:** `https://dealerloop.com.au/` | Capterra: `https://www.capterra.com/p/10049052/Dealerloop/` [S28, S29]
- **Target Segment:** Australian used and franchised car dealerships seeking **agentic AI lead conversion, acquisition, and retention** sitting on top of existing websites, Nexgate, and DMS [S28, S29].
- **Modules:**
  - **Inventory & Photos:** Syncs live stock from dealer website / DMS / Nexgate daily (grounds AI so it never quotes unavailable stock or prices); tracks days listed, enquiries/week, stale stock, and lost-lead revival [S28].
  - **Portal / Feed Syndication:** Ingests leads from carsales/Nexgate, Gumtree, Facebook, and website (not primarily an outbound classifieds syndicator) [S28, S29].
  - **CRM / Leads:** Core strength — sub-minute 24/7 AI SMS responses in **English, Mandarin, Arabic, and Vietnamese**, test-drive booking calendar with SMS reminders, lead scoring, price-drop alerts to past enquirers, database reactivation (finance maturity, warranty expiry, 3-year triggers), Acquisition Engine (private-seller photo appraisals in minutes), Service Engine (Beta) [S28, S29].
  - **Website Builder:** `N` (integrates with dealer's existing website/stock feed; also white-labels the workspace) [S28].
  - **Finance & Insurance (F&I):** Illustrative payment calculator & external finance checklist tracking [S28].
  - **Accounting (Xero / MYOB):** `N` [S28].
  - **PPSR / NEVDIS:** Shows PPSR certificate check, rego lookup, and licence/bank checks inside its **Acquisition Engine** deal pack [S28].
  - **Compliance Docs / Forms:** Delivery checklist & e-sign pre-fill shown for WA licensing forms (`MR9B`, `Form 7`) in product showcase [S28]; NSW/VIC/QLD statutory register coverage `UNVERIFIED`.
  - **Reporting:** Speed-to-lead, appointment show rate, won-back revenue attribution, "Dealer Pulse" sentiment [S28].
  - **Mobile App:** Built on React / Expo stack (mobile support claimed on Capterra; store listing `UNVERIFIED`) [S28, S29].
  - **Multi-Branch:** Supports multiple consultants and white-label dealer groups [S28].
- **Public Pricing (GST note):** **Quote only** ("Book a demo"; Capterra notes quote-based) [S28, S29].
- **Contract Terms / Lock-in:** Advertises **"month to month, and your leads and conversations are yours to export at any time"** and **"no-shows are never billed"** [S28].
- **Onboarding / Migration Offer:** Claims go-live in **"Days, not months"** [S28].
- **Integrations:** carsales / Nexgate, AutoGate, Gumtree, Facebook, eraPower, EasyCars, Spotlot, Twilio, Anthropic/AI stack [S28, S29].
- **Notable Positioning Claims `[Vendor claim]`:** *"The agentic sales engine for Australian car dealerships"*; *"It only quotes cars you have, at the prices you set, from your live stock"* [S28].

---

### Group C: Mid-Market to Enterprise / Franchise DMS (Upper Bound & Out-of-ICP)

---

#### 10. Eclipse DMS (by Ultimate Business Systems)
- **URL:** `https://www.ultimate.net.au/used-car-dealerships` [S30]
- **Target Segment:** Medium-to-large independent used-car yards, commercial, caravan, marine, and machinery dealerships across Australia & NZ (typically heavier/larger than a 10–25 car independent yard) [S30].
- **Modules:**
  - **Inventory & Photos:** Stock valuation, reconditioning costing, gross profit per unit, multi-platform inventory sync [S30].
  - **Portal / Feed Syndication:** Syncs used stock to online advertising marketplaces and dealer websites [S30].
  - **CRM / Leads:** Integrated dealership CRM for prospect tracking and targeted marketing [S30].
  - **Website Builder:** Ultimate provides website/digital solutions synced in real time with Eclipse DMS [S30].
  - **Finance & Insurance (F&I):** Quotes, trade-ins, deposits, and sales orders integrated into accounting [S30].
  - **Accounting (Xero / MYOB):** Native **Eclipse Accounting** general ledger (GST, payables/receivables); **Xero** and MYOB Exo available via third-party integration specialists (e.g., Element7 Digital) [S30, S36].
  - **PPSR / NEVDIS:** PPSR Enquiry Manager integration (`vcheck.net.au`) for security interest checks [S37].
  - **Compliance Docs / Forms:** Australian state compliance paperwork and sales documentation [S30].
  - **Reporting:** Real-time unit profit margin and operational reporting [S30].
  - **Mobile App:** **EclipseOnline** mobile/on-the-go application [S30].
  - **Multi-Branch:** Multi-site capabilities built in [S30].
- **Public Pricing (GST note):** **Quote only** [S30].
- **Contract Terms / Lock-in:** Not publicly published (`UNVERIFIED`).
- **Onboarding / Migration Offer:** Custom implementation and support (`UNVERIFIED` free migration).
- **Integrations:** Eclipse Accounting, Xero (via third-party bridge e.g. Element7 Digital), PPSR Enquiry Manager / vcheck, online marketplaces, EclipseOnline [S30, S36, S37].
- **Notable Positioning Claims `[Vendor claim]`:** Complete dealership control across whole-goods, parts, workshop, and real-time profit margins [S30].

---

#### 11. Titan DMS
- **URL:** `https://www.titandms.com/` | Solutions: `https://www.titandms.com/solutions` | Integrations: `https://www.titandms.com/integrations` [S31]
- **Target Segment:** Medium-to-large franchise dealerships, OEMs, and high-volume multi-site dealer groups (generally over-engineered and cost-prohibitive for 10–30 car independent lots) [S31].
- **Modules:**
  - **Inventory & Photos:** `Titan Showroom` stock control, barcoding, reconditioning, lot aging; mobile `Dealer Appraisal App` with camera & market price research [S31].
  - **Portal / Feed Syndication:** Via `Titan Connections` open API ecosystem to Australian marketplaces and Dealer Studio/AutoPlay [S23, S27, S31].
  - **CRM / Leads:** Built-in prospects/CRM and retention reminders [S31].
  - **Website Builder:** Via partner integrations (e.g., Dealer Studio) rather than core bundled storefront (`N` / partner).
  - **Finance & Insurance (F&I):** Full Showroom F&I module [S31].
  - **Accounting (Xero / MYOB):** Built-in enterprise DMS accounting; Xero/MYOB native support for small yards `UNVERIFIED` / non-primary.
  - **PPSR / NEVDIS:** Supported via AU compliance/integration workflows (`Titan Connections`) [S31].
  - **Compliance Docs / Forms:** Australian consumer-law compliant contracts and documentation [S31].
  - **Reporting:** 150+ standard and custom reports [S31].
  - **Mobile App:** `Dealer Appraisal App` and mobile showroom tools [S31].
  - **Multi-Branch:** Built for multi-rooftop enterprise groups [S31].
- **Public Pricing (GST note):** **Quote only** [S31].
- **Contract Terms / Lock-in:** Enterprise multi-year/tiered contracts (not published; Titan notably litigated against Pentana in the Federal Court over contract renewal/switching lock-in practices) [S34].
- **Onboarding / Migration Offer:** Custom enterprise implementation & data migration [S31].
- **Integrations:** `Titan Connections` API connecting Dealer Studio, AutoPlay, carsales, OEMs, valuation tools [S23, S27, S31].
- **Notable Positioning Claims `[Vendor claim]`:** Agile cloud Microsoft-based enterprise DMS with open API (`Titan Connections`) [S31].

---

#### 12. Auto-IT (UNITS / PMDS / EQUIP)
- **URL:** `https://auto-it.com/automotive/` [S32]
- **Target Segment:** Medium-to-very-large multi-franchise, multi-branch automotive, truck, agricultural, and construction dealer groups (backed by Constellation Software / Perseus) [S32]. **Upper-bound / largely out of ICP** for 10–80 car independents.
- **Modules:**
  - **Inventory & Photos:** `UNITS®` and `PMDS®` ERP inventory, used-car acquisition, reconditioning, lot aging, parts, and workshop service lanes [S32].
  - **Portal / Feed Syndication:** Via third-party website/distribution partners (e.g., Dealer Studio, SmartPublisher) [S23, S32].
  - **CRM / Leads:** Integrated departmental CRM + F&I [S32].
  - **Website Builder:** Via partners (e.g., Dealer Studio) rather than standalone bundled independent website [S23].
  - **Finance & Insurance (F&I):** Full enterprise F&I [S32].
  - **Accounting (Xero / MYOB):** Full built-in multi-company ERP accounting (replaces Xero/MYOB) [S32].
  - **PPSR / NEVDIS:** Enterprise compliance workflows (`UNVERIFIED` specific PPSR UI).
  - **Compliance Docs / Forms:** Australian corporate, tax, and dealer regulatory compliance [S32].
  - **Reporting:** `Dealer Spectrum®` BI powered by Yellowfin [S32].
  - **Mobile App:** `UNVERIFIED` / partner-reliant.
  - **Multi-Branch:** Core strength — multi-company, multi-branch, multi-franchise [S32].
- **Public Pricing (GST note):** **Quote only** (custom enterprise contracts with migration and per-user/module fees) [S32].
- **Contract Terms / Lock-in:** Custom enterprise contracts (not publicly listed) [S32].
- **Onboarding / Migration Offer:** Dedicated Melbourne/Sydney implementation & migration teams [S32].
- **Integrations:** Major OEM/factory feeds, Yellowfin BI, Dealer Studio, AutoPlay [S23, S27, S32].
- **Notable Positioning Claims `[Vendor claim]`:** *"Over 40 years"* serving Australasian retail automotive, agriculture, and heavy equipment groups [S32].

---

### Out-of-ICP & Brand Verification Notes (Brief)

- **Pentana Solutions (`eraPower`) & Revolution DMS — OUT OF ICP (Franchise / Enterprise):** Dominant enterprise/franchise DMS in Australia (used by groups such as Eagers Automotive, Peter Warren, Autosports Group) [S33]. `eraPower` includes Showroom Deal Calculator, `DealerSocket` CRM / Impel AI, Test Drive App, and `eraPower 5` banking/payments [S33]. **Revolution® DMS** is a separate competing platform used heavily by Toyota (TMCA) franchise networks [S33]. Quote-only enterprise contracts; Pentana's contract renewal/lock-in practices were the subject of Federal Court litigation with Titan DMS [S33, S34].
- **DealerSocket (by Solera):** US-headquartered (CRM, Inventory+, iDMS, Solera DealerOS). Does **not** operate as a mainstream standalone independent used-car DMS in Australia; appears locally mainly via legacy/partner CRM integrations (such as Pentana Solutions) [S33].
- **MotorOne Group (`motoronegroup.com`):** Verified as an **aftermarket car-care & protection supplier** (paint protection, window tint, electronics, scratch-and-repair) sold through dealerships — **NOT a DMS** [S38].
- **Autosoft Australia (`autosoft.com.au`):** Legacy AU vendor transitioned into **Workshop Software** (service/repair workshop management, not a vehicle-sales DMS) [S39].
- **Motorcentral / MotorPlatform (`motorcentral.co.nz` / `motorplatform.com.au`):** Dominant NZ independent DMS (`Standard 35`: ~NZ$100/mo + NZ$995 setup; `Standard 100`: ~NZ$180/mo; `Standard Max`: ~NZ$240/mo; Xero extra) [S40]; expanding into **Australia primarily via MotorPlatform** for trade-in appraisals, B2B wholesale (`MotorMarket`), and pricing intelligence (`MotorIntel`), quote-only [S41].
- **DealerConnect (`dealerconnect.com.au`):** Associated with Virtual Yard's Australian website/DMS ecosystem for independent & used dealers [S42].

---

## 2. Feature Matrix Table

**Legend:** `Y` = Verified supported | `N` = Not supported / out of product scope | `P` = Partial / via paid add-on or partner bridge | `?` = `UNVERIFIED` / not found on public pages.

**Column Key:** `EC` = EasyCars | `VY` = Virtual Yard | `YS` = YardStack | `IND` = Indiqator (CloudLogic stack) | `MDMS` = Modern DMS | `NX` = Nexgate + Dealer Drive | `DS` = Dealer Studio | `AP` = AutoPlay | `DL` = Dealerloop | `ECL` = Eclipse DMS | `TIT` = Titan DMS | `AIT` = Auto-IT

| Feature / Module | EC | VY | YS | IND | MDMS | NX | DS | AP | DL | ECL | TIT | AIT |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Target: 10–80 Car AU Independent** | **Y** [S1] | **Y** [S9] | **Y** [S5] | **Y** [S15] | **N** (equip) [S25] | **Y** (portal) [S20] | **P** (group-leaning) [S23] | **P** (CRM-only) [S26] | **P** (AI CRM) [S28] | **P** (mid-mkt) [S30] | **N** (franchise) [S31] | **N** (enterprise) [S32] |
| **Core Inventory & Stock Costing** | **Y** [S11] | **Y** [S9] | **Y** [S5] | **Y** [S15] | **Y** [S25] | **P** (listings) [S20] | **P** (DMS sync) [S23] | **P** (sync) [S26] | **P** (sync) [S28] | **Y** [S30] | **Y** [S31] | **Y** [S32] |
| **Photo Capture / Management** | **Y** (EasyPhoto) [S11] | **Y** (app) [S8] | **Y** (+AI studio) [S5] | **Y** [S15] | **?** | **Y** [S20] | **Y** (+plate blur) [S23] | **Y** [S26] | **P** (acq. app) [S28] | **Y** [S30] | **Y** [S31] | **?** |
| **Feed: carsales** | **Y** [S11] | **Y** [S9] | **Y** [S6] | **Y** [S15] | **N** [S25] | **Y** (native) [S20] | **Y** [S23] | **P** (leads) [S27] | **P** (leads) [S28] | **Y** [S30] | **Y** [S31] | **P** (partner) [S23] |
| **Feed: Gumtree / Autotrader / Drive** | **Y** [S11] | **Y** [S9] | **Y** [S6] | **Y** [S15] | **N** [S25] | **Y** (dests) [S20] | **?** | **N** (NZ portals) [S26] | **P** (leads) [S29] | **Y** [S30] | **P** [S31] | **?** |
| **Feed: Facebook Marketplace / AIA** | **Y** [S1] | **?** | **Y** [S6] | **P** (LeadDriver/Zapier) [S15] | **N** [S25] | **P** (sourcing on Sig) [S20] | **Y** (AIA) [S23] | **?** | **P** (leads) [S29] | **?** | **?** | **?** |
| **CRM / Lead Management** | **P** (basic) [S11] | **Y** [S9] | **Y** (+AI reply) [S5] | **Y** (LeadDriver AI) [S15] | **Y** [S25] | **Y** (+Gemini) [S21] | **Y** (LMS) [S23] | **Y** (core) [S26] | **Y** (agentic AI) [S28] | **Y** [S30] | **Y** [S31] | **Y** [S32] |
| **Dealer Website Builder** | **Y** [S1] | **Y** (Small+) [S9] | **Y** (incl.) [S5] | **Y** (Radius) [S15] | **N** [S25] | **P** (partner) [S20] | **Y** (core) [S23] | **P** (VDP pages) [S26] | **N** [S28] | **Y** [S30] | **N** (partner) [S23] | **N** (partner) [S23] |
| **Finance & Insurance (F&I)** | **Y** [S3] | **P** (web leads) [S9] | **P** (app/portal) [S5] | **Y** (FinanceConnect) [S15] | **N** (floorplan) [S25] | **N** [S20] | **P** (payloads) [S23] | **N** [S26] | **P** (calc) [S28] | **Y** [S30] | **Y** [S31] | **Y** [S32] |
| **Accounting: Xero** | **Y** [S1] | **Y** [S12] | **Y** [S6] | **Y** [S15] | **Y** [S25] | **N** [S20] | **P** (billing) [S23] | **N** [S26] | **N** [S28] | **P** (3rd party) [S36] | **?** | **N** (own GL) [S32] |
| **Accounting: MYOB** | **Y** [S1] | **?** | **Y** [S6] | **?** | **Y** [S25] | **N** [S20] | **?** | **N** [S26] | **N** [S28] | **P** (Exo bridge) [S36] | **?** | **N** (own GL) [S32] |
| **PPSR / NEVDIS Checks** | **Y** [S11] | **Y** [S9] | **Y** ($5/check) [S5] | **Y** [S15] | **?** | **P** (add-on/DD) [S24] | **Y** [S23] | **P** (Motorweb) [S27] | **Y** (Acq.) [S28] | **Y** (vcheck) [S37] | **Y** [S31] | **?** |
| **State Compliance / Police Book** | **Y** (all AU) [S11] | **Y** [S9] | **P** (QLD+NSW; no VIC) [S5] | **Y** [S15] | **N** [S25] | **N** [S20] | **P** (contracts/e-sign) [S23] | **N** [S26] | **P** (WA MR9B) [S28] | **Y** [S30] | **Y** [S31] | **Y** [S32] |
| **Reporting / Profit Per Car** | **Y** [S1] | **Y** [S9] | **Y** (true net) [S5] | **Y** [S15] | **Y** [S25] | **Y** (mkt insights) [S20] | **Y** (mktg) [S23] | **Y** (leads) [S26] | **Y** (funnel) [S28] | **Y** [S30] | **Y** (150+) [S31] | **Y** (Spectrum BI) [S32] |
| **Mobile App (Native or Web)** | **Y** (EasyPhoto + web) [S11] | **Y** (iOS/And) [S8] | **Y** (web app) [S5] | **Y** (web) [S15] | **Y** (field) [S25] | **Y** (iOS/And) [S20] | **Y** (mobile app) [S23] | **Y** (iOS/And) [S26] | **P** (Expo) [S28] | **Y** (EclipseOnline) [S30] | **Y** (Appraisal) [S31] | **?** |
| **Multi-Branch / Multi-Yard** | **Y** [S4] | **Y** [S9] | **Y** [S5] | **Y** [S15] | **Y** [S25] | **Y** [S20] | **Y** [S23] | **Y** [S26] | **Y** [S28] | **Y** [S30] | **Y** [S31] | **Y** [S32] |
| **Published Public Pricing** | **N** [S2] | **Y** [S9] | **Y** [S5] | **N** [S15] | **Y** [S25] | **Y** [S20] | **N** [S23] | **N** [S26] | **N** [S28] | **N** [S30] | **N** [S31] | **N** [S32] |

---

## 3. Pricing Table

| Product | Target Segment | Public Pricing (AUD, GST Note) | Setup / Migration Offer | Contract / Lock-In | Sources |
|---|---|---|---|---|---|
| **YardStack** | Independent & consignment used-car dealers (1–10+ sites) | **A$8 / car in stock / mo + GST** (no min, unlimited users, website incl.); PPSR **A$5**, AI val **A$2**, studio photos **A$0.50–A$4/car**; optional Desk VA **A$1,500–A$3,000/mo + GST** | **A$0 setup**; **free migration** (EasyCars, Virtual Yard, CloudLogic, spreadsheets); 14-day free trial | **Month-to-month, cancel anytime** | [S5] |
| **Virtual Yard** | Wholesalers to franchise yards | **Incl. GST:** Free **A$0**; Basic **A$120/mo** (A$109.09 ex GST); Small (<A$500k stock, site incl.) **A$360/mo** (A$327.27 ex GST); Medium (<A$1M) **A$670/mo** (A$609.09 ex GST); Large **A$980/mo**; XL **A$1,790/mo**; Franchise **A$2,940/mo** | **A$0 setup fees**; free tier / free trial | **No contract, cancel anytime**; unlimited users | [S9, S12] |
| **Modern DMS (MDMS)** | Equipment, commercial, truck, RV, hire (non-car ICP) | **Excl. GST:** **A$59/mo** per core module (GL & Ops **A$259/mo**; extra user ~A$9/mo); annual bundles **A$251–A$451/mo** (15% off) | Dedicated migration workflow; 14-day free trial (no card) | Monthly or annual (15% off) | [S25] |
| **Nexgate (carsales)** | All dealers listing on carsales (portal + lead hub, not full DMS) | **Excl. GST:** Access (<10 cars) **A$99/mo** (+ A$75–$250/listing); Access+ **A$799/mo**; Pro **A$1,099/mo**; Signature **A$1,299/mo**; Dealer Drive add-on **A$399/mo** (incl. on Pro/Sig); **+ A$19–A$85 per enquiry** (A$82 for A$8.5k–$70k cars) | **A$515 excl. GST** one-off establishment fee | Carsales PSS / subscriber terms (specific term `UNVERIFIED`) | [S20] |
| **EasyCars** | Independent & franchise AU motor dealers | **Quote only** (tailored by yard size & vehicle type) | Data migration from legacy DMS supported; optional paid hourly 1-on-1 training | **"No lock-in contracts, no hidden fees"**; unlimited users | [S1, S2, S11] |
| **Indiqator (CloudLogic suite)** | Independent, franchise & OEM groups | **Quote only** (modular across CloudLogic, Radius, LeadDriver, SmartPublisher) | Sales-assisted onboarding (`UNVERIFIED` free migration) | Not published (`UNVERIFIED`) | [S15] |
| **Dealer Studio** | Franchise, dealer groups, OEMs (some single-site) | **Quote only** (websites, LMS, add-ons like plate blur) | Structured onboarding setup trackers | Not published (`UNVERIFIED`) | [S23] |
| **AutoPlay** | Franchised, groups & independent used (AU/NZ) | **Quote only** (all features included; scaled by brands/location: Basic, Starter, Pro, Platinum, OEM) | Onboarding & onshore support included | **No lock-in contracts** | [S26] |
| **Dealerloop** | Used & franchised AI sales/acquisition layer | **Quote only** | Go-live in **"Days, not months"** | **Month-to-month**; full export anytime; no-shows unbilled | [S28, S29] |
| **Eclipse DMS** | Mid-market AU/NZ auto, commercial, RV, machinery | **Quote only** | Custom implementation | Not published (`UNVERIFIED`) | [S30] |
| **Titan DMS** | Mid-to-large franchise & volume groups | **Quote only** | Enterprise implementation | Enterprise contracts (not published) | [S31, S34] |
| **Auto-IT (UNITS/PMDS)** | Large multi-franchise / equipment groups | **Quote only** | Custom migration & local team setup | Custom enterprise contracts | [S32] |
| **Pentana (eraPower) / Revolution** | Franchise / enterprise groups (**Out of ICP**) | **Quote only** | Enterprise rollout | Multi-year enterprise agreements (litigated over auto-renewals) | [S33, S34] |

---

## 4. Table Stakes vs. Differentiators

### Table Stakes (Nearly All Independent AU DMS Platforms Have)
1. **Rego / VIN Lookup & Valuation Data Population:** Auto-filling vehicle specs via Rego2Stock, RedBook, or Glass's Guide (`EasyCars`, `CloudLogic/DEALERLogic`, `Virtual Yard`, `YardStack`, `AutoPlay`).
2. **State-Specific Compliance Docs & Police/Dealings Books:** Generating statutory transfer/disposal forms and electronic registers (`EasyCars`, `Virtual Yard`, `CloudLogic`, `Eclipse`, `YardStack` in QLD/NSW) — though **non-DMS layers** (`Nexgate`, `Dealerloop`, `AutoPlay`, `Dealer Studio`) deliberately omit statutory registers.
3. **Multi-Portal Syndication (Especially carsales):** "Enter once, publish everywhere" feeds to carsales, Gumtree, Drive, Autotrader, and Facebook (`EasyCars`, `Virtual Yard`, `YardStack`, `SmartPublisher`, `Nexgate`).
4. **Xero (and often MYOB) Integration:** Expected by every independent AU dealer (`EasyCars`, `Virtual Yard`, `YardStack`, `CloudLogic`, `Modern DMS`, `Eclipse` via bridge).
5. **PPSR / Encumbrance Certificate Lookup:** Integrated directly into appraisal or stock cards (`EasyCars`, `Virtual Yard`, `YardStack`, `CloudLogic`, `Dealer Studio`, `Eclipse`).
6. **Unlimited Users & No Lock-In Contracts (Independent Segment):** Both `EasyCars`, `Virtual Yard`, `YardStack`, `AutoPlay`, and `Dealerloop` explicitly market **no lock-in contracts** and/or **unlimited users** to distance themselves from franchise DMS lock-ins.
7. **Mobile Photo Capture & Yard Access:** Either native apps (`Virtual Yard`, `Nexgate`, `AutoPlay`) or companion/web apps (`EasyCars EasyPhoto`, `YardStack`, `EclipseOnline`).

### Differentiators (What Separates Leading Challengers & Modern Layers)
1. **Sub-Minute 24/7 AI Lead Response & Voice/Multilingual Engagement:** `Dealerloop` (SMS AI grounded in live stock + Mandarin/Arabic/Vietnamese + test-drive booking), `Nexgate` (Gemini phone call transcription/summaries), `Indiqator LeadDriver` (24/7 AI + 51-day follow-up), and `YardStack` (AI first reply). Legacy DMSs (`EasyCars`, `Virtual Yard`, `Eclipse`) mostly offer static inbox/template CRM.
2. **True Net Profit Per Vehicle (vs. Gross Margin Estimates):** `YardStack` tracks holding cost/day, floorplan interest, quote-vs-actual recon job sheets, ad spend, and auction buy fees (Manheim/Pickles) per stock unit; most legacy DMSs leave true net profit to spreadsheets or month-end Xero reconciliation.
3. **Margin Scheme vs. Full GST Accuracy in Xero/MYOB:** Public Xero App Store reviews show real pain with second-hand margin scheme GST and manual journals in `EasyCars` and `Virtual Yard` [S13, S14]; `YardStack` explicitly positions per-car tracking categories + margin-scheme vs full GST handling as a wedge [S6].
4. **Consignment & Trust Accounting Workflows:** `YardStack` differentiates deeply with digital consignment agreements, consignor portals (live stats + SMS price-drop approval), trust ledgers, and payout-gating behind PPSR [S5, S6].
5. **High-Converting Storefront + Digital Deal Features:** Automated number-plate blurring (`Dealer Studio`), AI descriptions (`Dealer Studio`, `Virtual Yard`, `YardStack`), passwordless buyer/consignor portals (`YardStack`), contactless deposits (`Virtual Yard`), and self-serve trade-in photo appraisals (`Dealerloop`).
6. **Transparent Usage/Unit Pricing & Free Switching Migration:** `YardStack` (`A$8/car/mo + GST`, free migration from EasyCars/Virtual Yard/CloudLogic) and `Virtual Yard` (`A$0–$360/mo incl. GST`) vs opaque quote-only incumbents.

---

## 5. Apparent Gaps / Whitespace for a New Entrant (ICP: 10–80 Vehicles, NSW/VIC/QLD)

| # | Whitespace / Gap | Evidence from Teardown | Confidence | What Dealer Interviews Must Confirm |
|---|---|---|---|---|
| 1 | **Clean, Zero-Friction Xero/MYOB Sync for Second-Hand Margin Scheme GST** | Both `EasyCars` and `Virtual Yard` carry explicit Xero App Store complaints around manual journals, contact-merge breakages, token drops, and manual invoice edits for second-hand car margin scheme VAT/GST [S13, S14]. | **High** | How do 10–80 car dealers and their bookkeepers reconcile margin-scheme sales, stamp duty, and recon bills today? |
| 2 | **All-in-One Modern Storefront + Fast AI CRM + Lightweight Back-Office at <A$250–$400/mo** | Dealers currently stitch together `Nexgate` (A$799+/mo + A$82/lead) + `EasyCars`/`CloudLogic` (quote-only legacy UI) + optionally `Dealer Studio` or `Dealerloop` (extra quote-only fee) because legacy DMS websites/CRMs feel dated and slow. Only `YardStack` bridges all three at low cost, and its VIC compliance is still missing. | **High** | Do dealers actually want a single vendor for storefront + CRM + DMS-lite, or are they reluctant to replace EasyCars/CloudLogic if compliance works? |
| 3 | **VIC (and Multi-State NSW/VIC/QLD) Parity for Modern Challengers** | `YardStack` only has QLD and NSW compliance live (no VIC yet) [S5, S7]; `Dealerloop` showcases WA `MR9B`/`Form 7` [S28]. Meanwhile `EasyCars` covers all states but has a dated UI/CRM experience. | **High** | Which exact VIC LMCT / NSW Form 5 / QLD Form 9 & 12 forms and police-book exports are non-negotiable day-one blockers vs acceptable CSV/PDF workarounds? |
| 4 | **Self-Serve CSV + Photo Re-Hosting Migration Without Sales Calls** | Legacy DMSs gate exports behind support tickets (`CSV`/`XLSX`) and require booking demos for onboarding. `YardStack` offers human-assisted free migration [S5], while self-serve CSV + photo import dry-runs are absent across incumbents. | **Medium–High** | What exact export format (CSV columns, image URLs vs ZIP) can dealers pull from EasyCars, AutoGate/Nexgate, or Virtual Yard without vendor friction? |
| 5 | **Affordable Transparent Pricing Below `Nexgate Access+` & `Virtual Yard Small/Medium`** | `Nexgate Access+` jumps from A$99 (<10 cars) to **A$799/mo + A$82/enquiry** [S20]; `Virtual Yard` jumps from A$120 (no site, capped feeds) to **A$360/mo (<A$500k stock — ~15–25 average used cars!)** and **A$670/mo (<A$1M stock — ~30–45 cars!)** [S9]. A 35-car dealer on Virtual Yard pays A$670/mo incl. GST. | **High** | What total monthly software budget (excluding carsales ad spend) does a 20–60 car yard currently pay across DMS + website + CRM? |
| 6 | **True Per-Vehicle Costing & Recon Visibility Without Heavy ERP Overhead** | `Titan`, `Auto-IT`, and `Eclipse` handle recon/costing at enterprise cost; `YardStack` proves strong appetite among independents for recon job sheets + daily holding cost + net profit per unit [S5]. | **Medium** | Do 10–40 car owners track recon and net profit per car in Excel today, and would they maintain it inside a SaaS tool? |
| 7 | **Owned-Stock Storefront SEO + Direct Lead Capture to Reduce carsales Dependency** | With carsales charging **A$82 excl. GST per enquiry** on A$8.5k–$70k cars [S20], dealers have strong financial incentive to convert Google/Facebook/organic traffic on their **own custom domain** instead of paying per-enquiry fees on repeat shoppers. | **Medium–High** | What % of leads come from carsales vs Google/website/Facebook Marketplace, and how much does a dealer spend monthly on carsales? |

---

## 6. Sources (All Accessed 24 November 2026)

- **[S1]** EasyCars Homepage — `https://www.easycars.com.au/` (Accessed 24 Nov 2026)
- **[S2]** EasyCars Get a Quote — `https://www.easycars.com.au/get-a-quote` (Accessed 24 Nov 2026)
- **[S3]** AutoTalk: EasyCars & Drive On Finance — `https://autotalk.com.au/industry-news/easycars-drive-finance-offer-dealer-finance-solution` (Accessed 24 Nov 2026)
- **[S4]** EasyCars Docs: Multi-Yard Vehicle Entry — `https://doc.easycars.net.au/docblog/adding-vehicles/` (Accessed 24 Nov 2026)
- **[S5]** YardStack Pricing — `https://yardstack.com.au/pricing` (Accessed 24 Nov 2026)
- **[S6]** YardStack Integrations — `https://yardstack.com.au/integrations` (Accessed 24 Nov 2026)
- **[S7]** YardStack Consignment & New Dealers Solutions — `https://www.yardstack.com.au/solutions/consignment-dealers` & `https://www.yardstack.com.au/solutions/new-dealers` (Accessed 24 Nov 2026)
- **[S8]** Apple App Store: Virtual Yard — `https://apps.apple.com/au/app/virtual-yard/id371967558` (Accessed 24 Nov 2026)
- **[S9]** Virtual Yard Homepage & Pricing — `https://www.virtualyard.com/` (Accessed 24 Nov 2026)
- **[S10]** G2 Reviews: EasyCars — `https://www.g2.com/products/easycars/reviews` (Accessed 24 Nov 2026)
- **[S11]** MYOB App Marketplace: EasyCars — `https://www.myob.com/au/apps/easycars` (Accessed 24 Nov 2026)
- **[S12]** Xero App Store: Virtual Yard — `https://apps.xero.com/au/app/virtual-yard` (Accessed 24 Nov 2026)
- **[S13]** Xero App Store Reviews: Virtual Yard — `https://apps.xero.com/au/app/virtual-yard/reviews` (Accessed 24 Nov 2026)
- **[S14]** Xero App Store Reviews: EasyCars — `https://apps.xero.com/au/app/easycars/reviews` (Accessed 24 Nov 2026)
- **[S15]** Indiqator Solutions Homepage & DMS — `https://indiqator.com.au/` & `https://indiqator.com.au/dms` (Accessed 24 Nov 2026)
- **[S16]** Vela APX Announcement: Launch of Indiqator Solutions (Cox RDS acquisition) — `https://velaapx.com/vela-software-group-announces-the-launch-of-indiqator-solutions/` (Accessed 24 Nov 2026)
- **[S17]** GoAutoNews: Cox Automotive Australia RDS / Dealer Solutions history (via search_web citation) — `https://www.goauto.com.au/` (Accessed 24 Nov 2026)
- **[S18]** GoAutoNews Premium: Indiqator gears up for 2026 growth — `https://premium.goauto.com.au/indiqator-gears-up-for-2026-growth/` (Accessed 24 Nov 2026)
- **[S19]** Nexgate Homepage (carsales) — `https://www.nexgate.ai/` (Accessed 24 Nov 2026)
- **[S20]** Nexgate Plans & Pricing — `https://www.nexgate.ai/pricing` (Accessed 24 Nov 2026)
- **[S21]** carsales Business: AI Tools & Gemini Call Summaries — `https://business.carsales.com.au/news-room/tips-insights/seller-experience-ai-tools/` (Accessed 24 Nov 2026)
- **[S22]** GoAutoNews Premium: carsales Nexgate investment — `https://premium.goauto.com.au/carsales-makes-biggest-investment-in-dealer-it/` (Accessed 24 Nov 2026)
- **[S23]** Dealer Studio Homepage & OEM/Platform — `https://www.dealerstudio.com.au/` & `https://www.dealerstudio.com.au/oem` (Accessed 24 Nov 2026)
- **[S24]** Dealer Drive Login / Product Reference — `https://login.dealerdrive.com.au/` (Accessed 24 Nov 2026)
- **[S25]** Modern DMS Pricing — `https://moderndms.com.au/pricing/` (Accessed 24 Nov 2026)
- **[S26]** AutoPlay Pricing — `https://autoplay.com.au/pricing` (Accessed 24 Nov 2026)
- **[S27]** AutoPlay Integrations — `https://autoplay.com.au/integrations` (Accessed 24 Nov 2026)
- **[S28]** Dealerloop Homepage — `https://dealerloop.com.au/` (Accessed 24 Nov 2026)
- **[S29]** Capterra: Dealerloop — `https://www.capterra.com/p/10049052/Dealerloop/` (Accessed 24 Nov 2026)
- **[S30]** Ultimate Business Systems: Eclipse DMS Used Car Dealerships — `https://www.ultimate.net.au/used-car-dealerships` (Accessed 24 Nov 2026)
- **[S31]** Titan DMS Solutions & Integrations — `https://www.titandms.com/solutions` & `https://www.titandms.com/integrations` (Accessed 24 Nov 2026)
- **[S32]** Auto-IT Automotive DMS — `https://auto-it.com/automotive/` (Accessed 24 Nov 2026)
- **[S33]** Pentana Solutions: eraPower — `https://www.pentanasolutions.com/product/erapower` (Accessed 24 Nov 2026)
- **[S34]** GoAutoNews Premium: Titan vs Pentana Federal Court DMS Dispute — `https://premium.goauto.com.au/titan-vs-pentana-dms-war-goes-to-court/` (Accessed 24 Nov 2026)
- **[S35]** Xero App Store: DEALERLogic — `https://apps.xero.com/au/app/dealerlogic` (Accessed 24 Nov 2026)
- **[S36]** Element7 Digital: Eclipse DMS Xero Integration — `https://element7digital.com.au/system-integrations/eclipse-dms` (Accessed 24 Nov 2026)
- **[S37]** vcheck / Ultimate PPSR Enquiry Manager — `https://vcheck.net.au/` (Accessed 24 Nov 2026)
- **[S38]** MotorOne Group — `https://motoronegroup.com/` (Accessed 24 Nov 2026)
- **[S39]** Autosoft Australia (transitioned to Workshop Software) — `https://autosoft.com.au/` (Accessed 24 Nov 2026)
- **[S40]** Motorcentral Pricing (NZ) — `https://www.motorcentral.co.nz/pricing` (Accessed 24 Nov 2026)
- **[S41]** MotorPlatform Australia — `https://motorplatform.com.au/` (Accessed 24 Nov 2026)
- **[S42]** DealerConnect Australia — `https://dealerconnect.com.au/` (Accessed 24 Nov 2026)

*(Note: 42 indexed source entries covering 46 distinct canonical URLs; paired subpages on YardStack, Indiqator, Dealer Studio, and Titan DMS are grouped by vendor entry above.)*

---

## 7. Gaps / Not Accessible

1. **Quote-Only Pricing (Unverified Exact AUD Figures):**
   - Exact monthly AUD pricing, per-rooftop fees, and setup fees for **EasyCars**, **Indiqator (CloudLogic / LeadDriver / Radius / SmartPublisher)**, **Dealer Studio**, **AutoPlay** (AUD tier amounts), **Dealerloop**, **Eclipse DMS**, **Titan DMS**, **Auto-IT**, and **Pentana eraPower** are behind sales demo/quote forms and were not verified (per research rules, no forms were submitted).
2. **Paywalled / Login-Gated / Timed-Out Pages:**
   - `https://www.easycars.com.au/features/` timed out on direct HTTP fetch (features verified via `easycars.com.au/`, `apps.xero.com`, `myob.com`, and `capterra.com.au` instead).
   - `https://www.virtualyard.com/pricing` and `https://indiqator.com.au/cloudlogic/` returned HTTP 404 (pricing/product details verified on `virtualyard.com/` and `indiqator.com.au/dms` instead).
   - `https://www.ultimate.net.au/eclipse-dms/` timed out / returned HTTP 000 on direct curl (`ultimate.net.au/used-car-dealerships` was used via search index).
   - `https://premium.goauto.com.au/...` full articles are behind subscriber paywall; only public search summaries/headlines were used.
   - `https://www.dealer.solera.com/login/` and `https://login.dealerdrive.com.au/` are login-gated (`blocked/not accessible`).
   - `https://apps.xero.com/au/app/easycars` and `dealerlogic` returned HTTP 000/redirect challenges to direct curl (content verified via `search_web` index).
3. **Unverified Specific Module Details (Marked `?` in Matrix):**
   - Whether **Virtual Yard** natively supports **MYOB** or **Facebook Marketplace** directly without third-party connectors.
   - Whether **Indiqator CloudLogic** has a dedicated native iOS/Android app (vs browser-only) and native **MYOB** sync.
   - Exact **Xero/MYOB** integration scope for **Titan DMS** at the independent level.
   - Exact **carsales** syndication contract/feed certification requirements for a brand-new SaaS entrant (e.g., API partner onboarding fee/approval timeline — must be checked before promising carsales feed in P0/P1).
4. **Recommended Dealer Interview Questions to Close Remaining Unknowns:**
   - What exact DMS, website, CRM, and carsales package are you paying for right now (exact monthly AUD)?
   - How painful is your Xero/MYOB reconciliation (especially margin scheme GST, stamp duty, and recon bills)?
   - Which state statutory forms (`NSW Form 5` / register, `VIC LMCT` forms / police book, `QLD Form 9/12` / register) do you actually generate inside your DMS vs manually?
   - How often do you export CSVs, and what breaks when moving stock/photos between tools?
