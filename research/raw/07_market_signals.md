# Market Signals Research: Australian Independent Used-Car Dealers & Software Ecosystem

- **Date:** 24 November 2026
- **Focus Geographies:** NSW, VIC, QLD (with brief national/other-state context)
- **Target ICP Context:** Independent Australian used-car dealers (~10–80 vehicles, 1–few branches); excludes JDM-import niche workflows as universal requirements.
- **Method:** Public-web secondary research conducted on 24 November 2026 using `search_web` across state regulator annual reports/open data, industry associations (AADA, VACC), ASX/investor filings (CAR Group), M&A press (GoAuto, Vela APX, AutoGrab, Jeal), technology fingerprinting (BuiltWith Trends), job aggregators, and vendor pricing/integration pages. Redirect URLs were resolved to final destinations via `curl.exe`; `nexgate.ai/pricing`, `nexgate.ai/product/integrations`, `kecg.co`, `jeal.com.au`, and `apps.xero.com` were directly inspected via public HTTP GET. No accounts, forms, logins, private groups, or anti-bot bypasses were used.
- **Sources-accessed count:** 44 unique public URLs (verified and listed in the Sources section below)

---

## Executive Summary of Signals

1. **Addressable Market (Estimate):** Australia has **4,930** motor vehicle retailing businesses (IBISWorld ANZSIC G3911, \$108.0B revenue) and **~8,843** commercial-directory dealer locations, of which **~2,438–3,943** are franchised new-car/truck dealerships—leaving an estimated **~4,900–6,400 independent/used dealer locations** nationally. Regulator registers in the three focus states show **>2,800** licensed dealer/recycler organisations in NSW (Feb 2025), **2,326** active Licensed Motor Car Traders (LMCTs) in VIC (2024–25), and **8,693** active Motor Dealer licences in QLD (Oct 2025, which includes both corporations and individual directors/managers-in-charge).
2. **Market Consolidation Wave (2025–2026):** Major independent-dealer tech vendors underwent ownership and platform upheaval: **Pickles Auctions** acquired **Jeal** (EasyCars / Workshop Mate); **Vela APX (Constellation Software)** acquired **Cox Automotive Australia RDS** (Dealer Solutions, CloudLogic, SmartPublisher) on **9 July 2025**, rebranding it **Indiqator Solutions**; **AutoGrab** acquired **AdTorque Edge's** Australian auto websites division on **10 June 2026**; and **carsales** retired 30-year-old **AutoGate** in **September 2026**, migrating **80%** of its active dealer base onto **Nexgate**.
3. **Acute Portal Cost Pain:** As of **23 November 2026**, official **Nexgate** used-car plans charge **\$99/mo** (Access, <10 cars, plus \$75–\$250/listing + per-enquiry fees) or **\$799/mo** (Access+, unlimited stock), **\$1,099/mo** (Pro), and **\$1,299/mo** (Signature) excl. GST—plus a **\$515** establishment fee and **\$82 per enquiry** for \$8,500–\$69,999 used cars (**+26.2%** vs. \$65 in Oct 2022). A 30-car dealer receiving 40 leads/month pays ~**\$4,079/mo excl. GST** on carsales alone.
4. **Used-Car Demand Shifting Back to Dealers, Margin Compression Returning:** National used-car volume sits at **~2.32M–2.33M units/year** (AADA/AutoGrab AIR), with dealer share climbing from **39.1% to 48.6%**. In H1 2026, volume cooled **-6.6%** (1,300,018 units) with >50% of 1–5-year-old cars discounted before sale, and Sept 2026 average days-to-sell lengthened to **51.5–52.8 days** (258,127 units sold in Sept 2026).

---

## 1. Market Size: Licensed Motor Dealers by State & Independent Share

Regulator licensing definitions differ across Australian states (some count distinct corporate entities/sites, others count every natural person in charge alongside corporations), so direct cross-state addition overcounts rooftops unless adjusted.

### 1.1 National Macro Benchmarks

| Source / Scope | Metric | Count / Value | Independent / Used Share & Notes | Source |
|---|---|---|---|---|
| **IBISWorld** (ANZSIC G3911: Motor Vehicle Retailing) | Total businesses / revenue | **4,930 businesses**; **\$108.0B** revenue (0.7% 5-yr business CAGR) | Combines new + used dealers; standalone AU "Used Car Dealers" split is paywalled (**UNVERIFIED**) | [IBISWorld](https://www.ibisworld.com/australia/industry/motor-vehicle-retailing/434/) |
| **ABS Cat. 8165.0** (ANZSIC 3911 Car Retailing) | Businesses by state & headcount | **UNVERIFIED** (in downloadable data cubes) | Official structural benchmark for non-employing vs. 1–19 employee yards | [ABS](https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release) |
| **AADA** (*Dealernomics*) | Franchised new-car & truck dealerships | **~3,900–3,943** dealerships | Represents franchised OEM rooftops/businesses nationally | [AADA](https://www.aada.asn.au/organisation/) |
| **Corelist** (commercial directory) | Total car dealer locations vs. new-car sites | **8,843** total locations; **2,438** new-car sites | Implies **~6,405** (~72.4%) non-franchised / used-car locations (**estimate**, commercial database) | [Corelist](https://corelist.com.au/car-dealers-in-australia/) |

### 1.2 Focus States (NSW, VIC, QLD) & Other Jurisdictions

| Jurisdiction & Regulator | Official Count & Period | Licence Scope / Definition | Franchised New-Car Sites (Corelist) | Estimated Independent / Used Businesses |
|---|---|---|---|---|
| **NSW** — NSW Fair Trading / Dept. of Customer Service | **>2,800 organisations** licensed as motor dealers & motor vehicle recyclers; **>5,500 individuals** (Feb 2025 RIS) | Under *Motor Dealers & Repairers Act 2013*; RIS groups dealers + recyclers together. Standalone MD-only org count **UNVERIFIED** without live Verify NSW bulk extract | ~626 | **~2,000–2,175+ orgs** *(estimate: >2,800 minus ~626 new-car sites and recyclers)* |
| **VIC** — Consumer Affairs Victoria (CAV) / BLA | **2,326** active LMCTs (2024–25); **2,280** (2023–24); **2,198** (2022–23) | Single *Licensed Motor Car Trader* register covering new & used traders (Guarantee Fund renewals/penalties: ~\$4.98M in 2024–25) | ~756 | **~1,570–1,700+ LMCTs** *(estimate: 2,326 minus franchised operators, noting multi-site groups hold fewer LMCTs than rooftops)* |
| **QLD** — Office of Fair Trading (MACS Open Data) | **8,693** Motor Dealer licences (1 Oct 2025); **8,452** (Apr 2024); **8,312** (Oct 2023) | Under *Motor Dealers & Chattel Auctioneers Act 2014*, **both** corporations and natural persons (sole traders, working directors, officers-in-charge per site) hold Motor Dealer licences; salespeople are separate. Corp vs. individual split **UNVERIFIED** | ~458 | **~2,000–2,500 businesses** *(estimate: applying SA's ~29.8% corporate share to 8,693 yields ~2,590 corporate entities, minus ~458 new-car sites)* |
| **SA** — Consumer & Business Services (CBS) | **1,659** total second-hand licences (2024–25 vs. 1,740 in 2023–24) | Explicitly split: **474** corporate motor vehicle + **33** corporate motorcycle; **1,116** natural-person motor vehicle + **36** natural-person motorcycle | ~239 | **~474 corporate + ~1,116 sole-trader/individual** second-hand vehicle licences (29.8% corporate) |
| **WA** — DEMIRS / LGIRS | Aggregate licence count **not found** in 2024–25 Annual Report | *Motor Vehicle Dealers Act 1973*; reported **\$2.692M** in dealer/repairer fees & charges (2024–25, up from \$2.459M) | ~225 | **UNVERIFIED** |
| **TAS / ACT / NT** | Regulator totals **not found** in public summaries | State/territory registers searchable individually only | TAS ~72, ACT ~37, NT ~25 | **UNVERIFIED** |

- **QLD Regional Concentration (Oct 2023 – Oct 2025 MACS ranges):** Brisbane (~4,100–4,400 licences), Southport/Gold Coast (~1,500), Sunshine Coast (~700–760), Townsville (~460–470), Cairns (~300–330), Toowoomba (~330), Wide Bay (~260–330), Rockhampton (~200–270), Mackay (~200–210), Other/Interstate (~140–260).
- **Compliance Signal Relevant to Storefronts:** NSW Fair Trading explicitly requires licensed motor dealers to display their **MD licence number** on all business websites and `.au` domain advertising.

---

## 2. Job Ad Signals (Seek, Indeed & Aggregators)

### Access Constraint
Direct automated querying and total job-count scraping on `https://www.seek.com.au/jobs?keywords=EasyCars` and `https://au.indeed.com/jobs?q=EasyCars` returned **`HTTP 403 Forbidden`** (`Server: cloudflare`, `Cf-Mitigated: challenge` on Seek). Therefore, **live platform-wide job counts are blocked/not accessible**.

### Publicly Indexed Examples Retrieved via `search_web`
Twelve concrete dealer/vendor listings were surfaced across indexed snippets and job aggregators:

| Software Mentioned | Employer / Dealership | Role Title | Location | Software Requirement / Context | Source |
|---|---|---|---|---|---|
| **EasyCars** | **Pickles Auctions P/L** | Customer Support Representative | Sydney, NSW (Hybrid) | Supports **EasyCars** & WorkshopMate software (following Pickles' acquisition of Jeal) | [SEEK snippet](https://au.seek.com/work-from-home-admin-jobs/in-Campbelltown-NSW-2560) |
| **EasyCars** | **Auto Waves Pty Ltd** | Automotive Operations Virtual Assistant (Long-Term) | Remote / AU dealership ops | Requires managing vehicle inventory using **EasyCars** DMS | [OnlineJobs.ph](https://www.onlinejobs.ph/jobseekers/job/automotive-operations-virtual-assistant-long-term-australian-dealership-1704544) |
| **EasyCars** | **MAJA Partners / Zambala Autos** | Auto Yard Sales Manager / Operations Officer | Perth / Victoria Park, WA | Requires hands-on proficiency with dealership software like **EasyCars** | [MAJA Partners](https://majap.com.au/vacancy-for-auto-yard-sales-manager/) |
| **AutoGate** | **Centenary Motors** | Sales Manager | Sumner, QLD | Requires experience with *"Autogate or similar dealership software"* in used-car operations | [Indeed (indexed)](#sources) (**UNVERIFIED** direct link) |
| **AutoGate** | **Booran Motor Group** | Automotive Sales Consultant | Melbourne, VIC | *"Era power Dealer Socket and Autogate experience will be highly regarded"* | [JobLeads](https://www.jobleads.com/au/job/automotive-sales-consultant-booran-motors--melbourne--e96fba84933b79d336fbba6f24320fb2e) |
| **AutoGate** | **Trade Cars Direct** | Used Car Sales Manager / Sales Rep | Moorabbin, VIC | Maintaining & publishing stock using *"Autogate & Carsales Portals"* | [WorkInMining mirror](https://workinmining.com.au/ag/workinmining/job/4229763) |
| **Pentana (eraPower)** | **Penfold Motor Group (Audi)** | Parts Interpreter | Mount Waverley, VIC | *"Pentana experience highly desirable"* | [SEEK snippet](https://au.seek.com/Australian-Motors-Group-jobs/in-South-Morang-VIC-3752) |
| **Pentana** | **Cricks Auto Group** | Accounts Payable Specialist | Brisbane, QLD | *"Pentana software familiarity highly regarded"* | [CollegeRecruiter](https://collegerecruiter.com/job/3061392929-accounts-payable-specialist--auto-dealership-team) |
| **Pentana (ERA Power)** | **Pacific Group (GWM/Renault)** | Warranty Clerk | Maroochydore / Gympie, QLD | Requires *"Experience using Pentana ERA Power or similar DMS"* | [Employment Hero](https://employmenthero.com/jobs/position/pacific-gympie-warranty-clerk-maroochydore-gwm-and-renault-8bvxd/) |
| **Titan DMS** | **Multi-franchise Dealership** | Dealership Accountant | Tamworth, NSW | *"knowledge of the Titan DMS"* required for month-end reporting | [Jora](https://au.jora.com/Titan-Dms-jobs) |
| **Titan DMS** | **Hervey Bay Motor Group** | Service Advisor | Maryborough / Hervey Bay, QLD | Requires specific *"Titan DMS knowledge"* | [SEEK snippet](https://au.seek.com/motor-staff-jobs/in-Maryborough-QLD-4650) |
| **Titan DMS** | **Westside Auto Wholesale** | Purchasing Assistant / Stock Controller | Perth, WA (via Satellite Office) | *"stocking vehicles purchased in the dealer management system (Titan DMS)"* | [Teamtailor](https://satelliteoffice-1742766257.teamtailor.com/jobs/8661331-purchasing-assistant) |
| **Virtual Yard / CloudLogic** | *None surfaced* | — | — | **0** dealership job-ad mentions retrieved (`not found` in public search snippets) | — |

**Job-Market Signal:**
1. **Pentana & Titan DMS** appear in franchised groups and mega-used operations (e.g., Westside Auto Wholesale).
2. **AutoGate** (now transitioning to Nexgate) is treated as a core used-car sales/stock-publishing skill across both independent yards (Trade Cars Direct, Centenary Motors) and multi-brand groups (Booran).
3. **EasyCars** shows up in small independent yards AND outsourced VA/admin roles (Auto Waves hiring remote Filipino VAs to key inventory into EasyCars—confirming manual data-entry overhead and comfort with remote/offshore operational tooling).

---

## 3. Portal Approved Data / Feed Providers & Integration Landscape

None of the three major Australian portal ecosystems publish an open, static HTML directory of "approved feed providers" on unauthenticated pages; integration onboarding is commercially gated.

| Portal / Group | Portal Hub & Public Docs | Feed Mechanism & Onboarding Gate | Verified Compatible DMS / CRM Partners (from vendor & portal docs) |
|---|---|---|---|
| **carsales** (**Nexgate**, formerly AutoGate) | [nexgate.ai/product/integrations](https://www.nexgate.ai/product/integrations) (public), [lead-api.carsalesnetwork.com.au](https://lead-api.carsalesnetwork.com.au/) (public), `help.nexgate.ai/hc/en-gb` (**HTTP 403 blocked/not accessible**) | Inventory feeds (XML/API) + **Third Party Lead Service (TPLS)** REST API. Requires explicit **dealer-signed rooftop authorisation**, commercial partner/referral terms, GUID idempotency, strict standardised lead statuses (*New*, etc.), and image/spec compliance. | **Titan DMS** (150+ API endpoints via Titan Connections), **Pentana Solutions**, **Auto-IT**, **DealerSocket**, **EasyCars (Jeal)**, **Virtual Yard**, **Indiqator (SmartPublisher / CloudLogic)**, **Revolution DMS**, **AutoPlay** (CRM) |
| **Gumtree Cars / Autotrader.com.au / CarsGuide** (**Autotrader Group**) | **Dealer Central** (`dealercentral.autotrader.com.au`), [Gumtree Dealer Central Terms](https://help.gumtree.com.au/AU/articles/en_US/KB_Article/Dealer-Central-Licence-Terms-AU/?l=en_US&fs=RelatedArticle) | XML/FTP/API stock feeds mapped to a dealer's active insertion order & Dealer ID; support via `support@autotradergroup.com.au`. No public provider list found. | **EasyCars**, **Virtual Yard**, **Titan DMS**, **Pentana**, **Auto-IT**, **Indiqator (SmartPublisher)**, **Keyloop/CDK** |
| **Drive.com.au** (Nine) | Commercial onboarding via `advertising@drive.com.au` | Scheduled stock feeds (SFTP/API) + outbound enquiry routing into dealer CRMs. No public approved-partner list found. | **Virtual Yard**, **EasyCars**, **Titan DMS**, **Pentana**, **Revolution DMS**; leads route to **AutoPlay**, **AdTorque Edge**, etc. |

**Key Implication:** A new entrant cannot simply "push an XML file" to carsales, Autotrader/Gumtree, or Drive without commercial partner approval and per-dealer authorisation. This validates keeping portal feeds out of MVP P0 and shipping **assisted CSV import + Facebook Automotive Inventory feed** first while pursuing portal accreditation during pilot.

---

## 4. Technology Fingerprinting (BuiltWith Trends Public Data)

BuiltWith's detailed per-domain CSV lists and country-filtered query tools require a paid subscription (**blocked/not accessible** beyond public summary counts). Public BuiltWith Trends pages retrieved via `search_web` show:

| Platform / Provider | Live Websites Tracked (BuiltWith Trends) | Segment / Notes | Source |
|---|---|---|---|
| **AdTorque Edge** | **~1,051–1,079** live websites (~723 AU automotive + ~127 NZ in segment breakdown) | Heavily franchise/OEM & large groups; AU auto website business acquired by **AutoGrab** on **10 June 2026** | [BuiltWith](https://trends.builtwith.com/zh/websitelist/AdTorque-Edge), [AutoGrab](https://autograb.com.au/autograb-group-acquires-adtorque-edges-australian-auto-websites-business/) |
| **Dealer Solutions** (now **Indiqator**) | **~385–411** live websites | AU independent & franchise dealer websites + inventory feeds | [BuiltWith](https://trends.builtwith.com/websitelist/Dealer-Solutions) |
| **Virtual Yard** | **~325–349** live websites | Independent car/RV/truck/marine dealers; strong concentration in VIC & broader AU | [BuiltWith](https://trends.builtwith.com/websitelist/Virtual-Yard) *(search-indexed count)* |
| **EasyCars** (Jeal / Pickles) | **~211–222** live websites (~178–211 Automotive, ~7 Caravans/RVs, ~3 Parts) | Small-to-medium independent used-car dealers across AU | [BuiltWith](https://trends.builtwith.com/websitelist/EasyCars/Added-Recently) |
| **Auto-IT / Pentana / Titan DMS / CloudLogic / Motorcentral** | **UNVERIFIED** (back-office DMS or paywalled BuiltWith lookup) | Enterprise DMS platforms often sit behind separate website vendors | — |

**Footprint Signal:** Together, these four automotive-specific web/DMS vendors power **~1,970–2,060 live websites** (~40% of IBISWorld's 4,930 businesses, or ~23% of Corelist's 8,843 locations). A large long-tail of independent yards either run generic WordPress/Wix/agency sites without integrated DMS/CRM, or rely solely on portal storefronts (carsales/Gumtree/Facebook).

---

## 5. Competitor Ads & Positioning (Meta Ad Library, Google Ads & Public Pages)

### Ad Library Access Status
- **Meta Ad Library** (`https://www.facebook.com/ads/library/`): Returned **`HTTP 403 Client challenge`** -> **blocked/not accessible**.
- **Google Ads Transparency Center** (`https://adstransparency.google.com/`): Returned `HTTP 200` JS SPA shell; creative-level search requires interactive browser execution -> **blocked/not accessible** via static inspection (**UNVERIFIED** for live paid ad copy).

### Public Landing-Page, App-Store & Channel Positioning

| Competitor | Ownership / Status (Nov 2026) | Headline / Core Positioning | Primary Selling Hooks | Public Pricing Transparency |
|---|---|---|---|---|
| **EasyCars** ([easycars.com.au](https://www.easycars.com.au/)) | **Pickles Auctions** (acquired Jeal Computer Services) | *"Simplify the way you manage your motor dealership from anywhere, at any time"* / *"Your Dealership in a Box!"* | Enter vehicle once (**Rego2Stock** via Redbook/Glass's); *"save thousands on advertising"* (28+ portals, FB AIAs, Google Ads); **Xero & MYOB** sync; state police/dealings books; **unlimited users**; **no lock-in contracts / no hidden fees**; 24/7 local phone support | **Hidden** (quote-gated; no public rate card) |
| **Virtual Yard** ([virtualyard.com](https://virtualyard.com/), [Xero App Store](https://apps.xero.com/au/app/virtual-yard)) | Independent | *"Australia's most advanced all-in-one dealership system"* / *"All-in-One Dealership System"* | Mobile-first cloud DMS (GCP); integrated high-converting websites (online deposits, trade-ins, finance apps); free syndication to carsales/Drive/Gumtree; **Xero** two-way sync; state compliance forms; **unlimited users**; **AutoGrab Market Overlay** add-on | **Partially visible in third-party listings** (~AUD \$55–\$109/mo entry up to ~\$609/mo reported; exact current AU tier quote-gated on site) |
| **Indiqator** ([indiqator.com.au](https://indiqator.com.au/about), [Vela APX](https://velaapx.com/vela-software-group-announces-the-launch-of-indiqator-solutions/)) | **Vela APX / Constellation Software** (acquired Cox Auto AU RDS on **9 July 2025**) | Connected retail & DMS ecosystem (**Dealer Solutions**, **CloudLogic**, **Radius**, **LeadDriver**, **SmartPublisher**, **FinanceConnect**) | Website conversion + lead management + DMS (incl. notional GST & Xero) + finance integration | **Hidden** (enterprise/quote-gated) |
| **carsales Nexgate** ([nexgate.ai](https://www.nexgate.ai/pricing)) | **CAR Group / carsales** (replaced AutoGate in **Sept 2026**) | *"Plans built around how your dealership works"* | Unified sourcing, inventory, AI call transcription/smart replies, buyer watcher outreach, **Instant Offer**, and **Nexgate Marketing** dealer websites | **Public & transparent** (AUD \$99–\$1,299/mo + enquiry/listing fees) |
| **AdTorque Edge** ([adtorqueedge.com](https://www.adtorqueedge.com/edm-campaign-for-adtorque-edge/)) | Independent agency (sold AU auto websites unit to **AutoGrab**, June 2026) | *"Drive More Leads with a High-Performing Website + SEO Strategy"* | Specialist auto agency, SEO, Google/Meta campaigns, **ALICE** lead attribution | **Hidden** (agency retainer) |
| **Motorcentral / MotorPlatform** ([motorplatform.com.au](https://www.motorplatform.com.au/platform/motor-central), [motorcentral.co.nz](https://www.motorcentral.co.nz/pricing)) | NZ-headquartered, active in AU | *"No more scattered spreadsheets and time-consuming appraisals"* | Trade-in & wholesale workflow control, DMS, websites, AMPD CRM | **NZD tiers public** (stock-capped e.g., Standard 35/100/Max); AU pricing quote-gated |
| **AutoPlay** ([autoplay.com.au](https://autoplay.com.au/)) | Independent (ANZ) | *"One record per customer, every enquiry worked from first contact to handover"* | CRM & OEM/dealer lead accountability | **Hidden** (quote-gated) |

**Messaging Signal:** Every independent-focused vendor sells on **four universal pillars**: (1) **single-entry rego/stock capture**, (2) **Xero/MYOB accounting sync**, (3) **state-specific statutory compliance forms**, and (4) **unlimited users with no lock-in**. None of the AU independent DMS vendors (except Nexgate) publish transparent AUD pricing upfront.

---

## 6. carsales Dealer Pricing Changes & Industry Reaction

### Timeline of Escalating Costs
1. **October 2022 Fee Hike & VACC Pushback:** Carsales pulled forward 2023 price rises to **1 October 2022** (following an earlier Jan 2022 rise): used-car leads rose **\$60 → \$65**, new-car leads **\$54 → \$59**, >\$70k leads **\$65 → \$68**, and AutoGate monthly fees rose **+\$80/month**. The **VACC Dealer Advisory Board** publicly called the increases **"disappointing"** amid stock shortages and rising operating costs, warning dealers to audit CPL closely even though carsales bundled SMS notifications/auto-responses ([GoAuto](https://premium.goauto.com.au/carsales-price-rises-disappointing/)).
2. **CAR Group FY25 Financial Results:** Australian segment revenue reached **\$485M (+8% YoY)** with Adjusted EBITDA of **\$320M (+9% YoY)**; Australian Dealer revenue grew **+10% YoY to ~\$249M**, explicitly driven by lead growth, **yield increases**, and depth-product penetration ([CAR Group FY25](https://www.listcorp.com/asx/car/car-group-limited/news/fy25-results-presentation-3224759.html)).
3. **September 2026 AutoGate Retirement → Nexgate:** Carsales retired 30-year-old AutoGate in **September 2026**, migrating **80%** of its active dealer base (who used AutoGate >20 days/month) to **Nexgate** ([GoAuto](https://premium.goauto.com.au/carsales-makes-biggest-investment-in-dealer-it/)).

### Verified Official Nexgate Used-Car Rate Card (Accessed 24 Nov 2026; Page Published 23 Nov 2026)
All prices in AUD, **excluding GST**, plus a **\$515 one-off establishment fee** ([nexgate.ai/pricing](https://www.nexgate.ai/pricing)):

| Plan | Target / Inventory Limit | Monthly Fee (excl. GST) | Variable Billing | Key Capabilities Added |
|---|---|---|---|---|
| **Access** | Small dealers (<10 cars listed) | **\$99 / mo** | **Listing fee + Enquiry fee** *(28 days or up to 5 leads per listing)* | Carsales distribution, AI call transcription/smart replies, 3-point insights, Contact Watchers (+ \$99/mo Dealer drive add-on) |
| **Access+** | Base plan (Unlimited inventory) | **\$799 / mo** | **Pay per enquiry** | Same essentials + unlimited stock + higher-touch account management (+ \$399/mo Dealer drive add-on) |
| **Pro** | Step up (Unlimited inventory) | **\$1,099 / mo** | **Pay per enquiry** | Adds lead enrichment/intent classification, 5-point insights (incl. time to sell), sourcing analytics, Dealer drive included |
| **Signature** | Complete platform (Unlimited) | **\$1,299 / mo** | **Pay per enquiry** | Adds FB Marketplace + carsales sourcing, AI Assistant (5,000 queries/mo), Sourcing Integration, 20% off eligible searches |

- **Used-Car Enquiry Fees (All Plans):** \$0–\$2,999: **\$19** | \$3,000–\$8,499: **\$50** | \$8,500–\$69,999: **\$82** | \$70,000+: **\$85**.
- **Used-Car Listing Fees (Access Plan Only):** \$0–\$2,999: **\$75** | \$3,000–\$7,499: **\$120** | \$7,500–\$19,999: **\$195** | \$20,000–\$74,999: **\$205** | \$75,000+: **\$250**.
- **4-Year Inflation Signal:** Standard used-car enquiry fees jumped **+26.2%** from **\$65** (Oct 2022) to **\$82** (Nov 2026). For an independent dealer on Access+ receiving 40 leads/month on \$15k–\$45k cars, carsales alone costs **\$799 + (40 × \$82) = \$4,079/month excl. GST** (before any Promote boosts).

---

## 7. Used-Car Volumes, Velocity & Lead Source Benchmarks

### 7.1 Used-Car Market Volumes & Velocity (AADA / AutoGrab / Pickles / Datium)
- **Annual Volume & Dealer Share:** National used-car sales run at **~2.32M–2.33M vehicles/year** (AADA + AutoGrab *Automotive Insights Report*). Dealers grew market share from **39.1% to 48.6%** of all used-car transactions (vs. 51.4% private) ([AutoTalk](https://autotalk.com.au/news/used-car-market-stabilises-as-dealers-gain-ground)).
- **2026 Market Cooling & Longer Holding Times:**
  - **H1 2026:** **1,300,018** used-car sales (**-6.6% YoY**); **>50%** of 1-to-5-year-old used vehicles saw price cuts before selling ([GoAuto](https://premium.goauto.com.au/used-market-decelerates/)).
  - **Q3 / September 2026:** Rebounded to **258,127** monthly sales in Sept 2026 (+6.0% MoM). Average dealer **days-to-sell lengthened to 51.5–52.8 days** across Aug–Sept 2026 (compared to 43.9–51.3 days in 2025) ([AADA](https://www.aada.asn.au/what-australians-want-in-the-used-vehicle-market/)).
  - **Datium Insights Used Car Index (Pickles Q3 2026):** Sat at **113%** in Aug 2026 and **114%** in Sept 2026 ([Pickles](https://www.pickles.com.au/qar/q3-2026-report)).

### 7.2 Lead Sources, Conversion & Speed-to-Lead
*Note: Exact dealership-level channel splits are proprietary; figures below combine CAR Group disclosures with digital-agency benchmarks.*
- **carsales Dominance:** CAR Group generated **22M dealer leads globally** in FY25 across ~49,000 dealers ([CAR Group 2025 AGM](https://cargroup.com/wp-content/uploads/2025/10/2025-AGM-presentation.pdf)), and industry estimates cite ~7.5M monthly unique visitors on carsales in AU.
- **Owned Website & Paid Digital (Agency Benchmarks — treat as indicative):**
  - Google Ads + Local SEO account for **60%–70%** of qualified inbound *website* leads ([KECG, Oct 2026](https://kecg.co/blog/car-dealership-marketing-costs/)).
  - Blended digital automotive CPL across AU channels spans **A\$42–A\$283**, with marketplace leads typically \$20–\$80+ (matching Nexgate's \$50–\$85 table) ([KECG](https://kecg.co/blog/car-dealership-marketing-costs/)).
  - Close rates (global/agency benchmarks): Google Ads **8%–12%** vs. Meta/Facebook lead ads **5%–10%** ([LandingGarage](https://www.landinggarage.com/blog/car-dealership-lead-generation-statistics-benchmarks-2026)).
  - Dealership websites convert **1.5%–3.0%** of visitors on average (5%–10% top quartile); web form leads close at **2%–5%** vs. **15%–25%** for phone/live-chat leads ([LandingGarage](https://www.landinggarage.com/blog/car-dealership-lead-generation-statistics-benchmarks-2026)).
- **Speed-to-Lead Gap:** Australian dealer audits reported in trade press show manual enquiry responses routinely take **4 to 12+ hours** (or days) ([GoAuto](https://premium.goauto.com.au/leads-responses-days-late/)), whereas responding within **5 minutes** yields dramatically higher qualification and conversion ([LandingGarage](https://www.landinggarage.com/blog/car-dealership-lead-generation-statistics-benchmarks-2026)).

---

## 8. Strategic Implications for ICP, Pricing & Go-to-Market

### 8.1 ICP Refinement
- **Lock focus on 15–60 car independent used-car dealers in NSW, VIC, QLD:**
  - **Under 10 cars** sit on Nexgate Access (\$99/mo + per-listing) or Gumtree/Facebook + spreadsheets and have low software willingness-to-pay.
  - **15–60 cars** hit the Nexgate **\$799/mo** Access+ cliff + **\$82/enquiry** pain, face **~52-day holding times**, often rely on lean admin or remote VAs to copy-paste stock, and are underserved by enterprise DMS vendors (Pentana/Titan/Auto-IT target 80+ / franchised groups).
  - **Target list building:** Combine public state registers (Verify NSW, CAV LMCT, QLD OFT) with website tech checks to isolate independent yards running generic WordPress/Wix/no-inventory websites—or legacy EasyCars/Dealer Solutions users unsettled by recent M&A transitions.

### 8.2 Pricing & Packaging Implications
- **Publish transparent AUD pricing (rare competitive edge):** EasyCars, Virtual Yard, Indiqator, and Titan all hide pricing behind demo forms; only Nexgate (\$99/\$799/\$1,099/\$1,299) publishes rates.
- **Anchor against Nexgate & Virtual Yard:** Test **AUD \$149–\$299/month (excl. GST)** with **unlimited users** and **no lock-in contracts** (both are table-stakes claims across EasyCars and Virtual Yard). At \$199–\$249/mo, the entire platform costs less than **3 carsales enquiries/month** (\$246) and ~70% less than Nexgate Access+ (\$799/mo).
- **Avoid per-seat pricing:** EasyCars and Virtual Yard heavily market unlimited users; charging per staff member creates immediate friction for small multi-role yards and admin/VA workflows.

### 8.3 Go-to-Market & Product Sequencing
- **Positioning:** Do **not** pitch "replace carsales" (impossible against its buyer traffic). Pitch **"Own your storefront, turn Google/Facebook traffic into \$0-per-enquiry leads, and reply in <5 minutes instead of 4–12 hours."**
- **Validate P0 vs. P1/P2 against market signals:**
  - **P0 CSV migration + photo re-hosting** is validated as the wedge: yards already keep stock in AutoGate/Nexgate, EasyCars, or spreadsheets and cannot wait months for portal API accreditation.
  - **P1 Facebook Inventory feed** is high-leverage because Meta AIAs work via standard catalog feeds without bilateral portal contracts.
  - **P2 (Xero sync + Rego/PPSR lookup)** is strongly validated by competitor positioning: EasyCars and Virtual Yard both treat Rego-to-stock lookup and Xero sync as core everyday hooks, so interviews should test whether dealers will switch *before* Xero/Rego lookup ships.
  - **Early accreditation outreach:** Initiate partner enquiries with carsales/Nexgate (TPLS), Autotrader Group (Dealer Central), and Drive during the 5–10 dealer pilot rather than treating portal integration as a quick technical sprint.

---

## Sources (Accessed 24 November 2026)

1. NSW Dept. of Customer Service, *Motor Dealers and Repairers Regulation 2025 Regulatory Impact Statement* (Feb 2025) — https://hdp-au-prod-app-nsw-haveyoursay-files.s3.ap-southeast-2.amazonaws.com/3517/4547/1592/Regulation_Impact_Statement-_MDR.pdf (accessed 2026-11-24)
2. Service NSW, *Verify NSW Public Register / Check a motor dealer licence* — https://www.service.nsw.gov.au (accessed 2026-11-24)
3. Parliament of Victoria / Consumer Affairs Victoria, *Annual Report 2024–25* — https://www.parliament.vic.gov.au/4ab11c/globalassets/tabled-paper-documents/tabled-paper-9550/consumer-affairs-victoria-annual-report-2024_25.pdf (accessed 2026-11-24)
4. VACC, *Submission on Second-Hand Vehicle Market (2024)* — https://vacc.com.au/Common/Uploaded%20files/_VACC/Submissions/2024/NWG%20second%20hand%20vehicle.pdf (accessed 2026-11-24)
5. Queensland Government Open Data, *Office of Fair Trading Occupational and Industry Licensing Statistics (Oct 2025)* — https://www.data.qld.gov.au/dataset/occupational-and-industry-licensing-statistics-office-of-fair-trading/resource/5fc21941-115b-48c8-93e2-090860e4b666/view/8b49200e-b058-4d5c-8704-9170681e411f (accessed 2026-11-24)
6. Queensland Government Open Data, *OFT Licensing Statistics (Apr 2024)* — https://www.data.qld.gov.au/dataset/occupational-and-industry-licensing-statistics-office-of-fair-trading/resource/96618e6b-a792-4436-9666-4e6cfacb9c77/view/b795d644-0996-4c41-a6c1-ece42bdc6ee4 (accessed 2026-11-24)
7. Queensland Government Open Data, *OFT Licensing Statistics Resource Index* — https://www.data.qld.gov.au/dataset/occupational-and-industry-licensing-statistics-office-of-fair-trading/resource/9c47a51d-6a3a-46e2-97eb-865eeaeb75d2 (accessed 2026-11-24)
8. Attorney-General's Dept. SA / CBS, *Annual Report 2024–25* — https://www.agd.sa.gov.au/__data/assets/pdf_file/0005/1200686/Final-Annual-Report-2024-25.pdf (accessed 2026-11-24)
9. WA DEMIRS, *Annual Report 2024–25* — https://www.wa.gov.au/system/files/2025-09/demirs-annual-report-2024-25.pdf (accessed 2026-11-24)
10. Australian Automotive Dealer Association (AADA), *Organisation / Dealernomics* — https://www.aada.asn.au/organisation/ (accessed 2026-11-24)
11. IBISWorld, *Motor Vehicle Retailing in Australia (G3911)* — https://www.ibisworld.com/australia/industry/motor-vehicle-retailing/434/ (accessed 2026-11-24)
12. ABS, *Counts of Australian Businesses, including Entries and Exits (Cat. 8165.0)* — https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release (accessed 2026-11-24)
13. Corelist, *Car Dealers in Australia* — https://corelist.com.au/car-dealers-in-australia/ (accessed 2026-11-24)
14. SEEK (indexed), *Customer Support Representative — Pickles / EasyCars* — https://au.seek.com/work-from-home-admin-jobs/in-Campbelltown-NSW-2560 (accessed 2026-11-24)
15. OnlineJobs.ph, *Automotive Operations Virtual Assistant (Auto Waves / EasyCars)* — https://www.onlinejobs.ph/jobseekers/job/automotive-operations-virtual-assistant-long-term-australian-dealership-1704544 (accessed 2026-11-24)
16. MAJA Partners, *Vacancy for Auto Yard Sales Manager (Zambala Autos / EasyCars)* — https://majap.com.au/vacancy-for-auto-yard-sales-manager/ (accessed 2026-11-24)
17. JobLeads, *Automotive Sales Consultant — Booran Motors (AutoGate / EraPower)* — https://www.jobleads.com/au/job/automotive-sales-consultant-booran-motors--melbourne--e96fba84933b79d336fbba6f24320fb2e (accessed 2026-11-24)
18. WorkInMining mirror, *Used Car Sales Manager — Trade Cars Direct (AutoGate)* — https://workinmining.com.au/ag/workinmining/job/4229763 (accessed 2026-11-24)
19. SEEK (indexed), *Parts Interpreter — Penfold Motor Group (Pentana)* — https://au.seek.com/Australian-Motors-Group-jobs/in-South-Morang-VIC-3752 (accessed 2026-11-24)
20. CollegeRecruiter, *Accounts Payable Specialist — Cricks Auto Group (Pentana)* — https://collegerecruiter.com/job/3061392929-accounts-payable-specialist--auto-dealership-team (accessed 2026-11-24)
21. Employment Hero, *Warranty Clerk — Pacific Group (Pentana ERA Power)* — https://employmenthero.com/jobs/position/pacific-gympie-warranty-clerk-maroochydore-gwm-and-renault-8bvxd/ (accessed 2026-11-24)
22. Jora AU, *Titan DMS Jobs (Tamworth Dealership Accountant)* — https://au.jora.com/Titan-Dms-jobs (accessed 2026-11-24)
23. SEEK (indexed), *Service Advisor — Hervey Bay Motor Group (Titan DMS)* — https://au.seek.com/motor-staff-jobs/in-Maryborough-QLD-4650 (accessed 2026-11-24)
24. Teamtailor / Satellite Office, *Purchasing Assistant — Westside Auto Wholesale (Titan DMS)* — https://satelliteoffice-1742766257.teamtailor.com/jobs/8661331-purchasing-assistant (accessed 2026-11-24)
25. Nexgate (carsales), *Plans and Pricing* (Last Published 23 Nov 2026) — https://www.nexgate.ai/pricing (accessed 2026-11-24)
26. Nexgate (carsales), *Product Integrations* — https://www.nexgate.ai/product/integrations (accessed 2026-11-24)
27. carsales Network, *Third Party Lead Service (TPLS) API* — https://lead-api.carsalesnetwork.com.au/ (accessed 2026-11-24)
28. carsales for Business, *Dealer Resources* — https://business.carsales.com.au/dealer-resources/ (accessed 2026-11-24)
29. Gumtree Australia, *Dealer Central Licence Terms* — https://help.gumtree.com.au/AU/articles/en_US/KB_Article/Dealer-Central-Licence-Terms-AU/?l=en_US&fs=RelatedArticle (accessed 2026-11-24)
30. Titan DMS, *Australia Integrations* — https://www.titandms.com/au/integrations (accessed 2026-11-24)
31. BuiltWith Trends, *AdTorque Edge Websites* — https://trends.builtwith.com/zh/websitelist/AdTorque-Edge (accessed 2026-11-24)
32. BuiltWith Trends, *Dealer Solutions Websites* — https://trends.builtwith.com/websitelist/Dealer-Solutions (accessed 2026-11-24)
33. BuiltWith Trends, *EasyCars Websites* — https://trends.builtwith.com/websitelist/EasyCars/Added-Recently (accessed 2026-11-24)
34. Jeal / EasyCars, *Jeal Acquired by Pickles* & *Homepage* — https://www.jeal.com.au/blog/jeal-acquired-by-pickles/ and https://www.easycars.com.au/ (accessed 2026-11-24)
35. Virtual Yard, *Homepage & Xero App Store Listing* — https://virtualyard.com/ and https://apps.xero.com/au/app/virtual-yard (accessed 2026-11-24)
36. Vela APX / Indiqator, *Launch of Indiqator Solutions (July 2025)* & *About* — https://velaapx.com/vela-software-group-announces-the-launch-of-indiqator-solutions/ and https://indiqator.com.au/about (accessed 2026-11-24)
37. AutoGrab, *AutoGrab Group Acquires AdTorque Edge's Australian Auto Websites Business (10 June 2026)* — https://autograb.com.au/autograb-group-acquires-adtorque-edges-australian-auto-websites-business/ (accessed 2026-11-24)
38. GoAutoNews Premium, *Carsales price rises 'disappointing'* — https://premium.goauto.com.au/carsales-price-rises-disappointing/ (accessed 2026-11-24)
39. GoAutoNews Premium, *Carsales makes biggest investment in dealer IT (AutoGate → Nexgate, Sept 2026)* — https://premium.goauto.com.au/carsales-makes-biggest-investment-in-dealer-it/ (accessed 2026-11-24)
40. CAR Group Limited, *FY25 Results Presentation* & *2025 AGM Presentation* — https://www.listcorp.com/asx/car/car-group-limited/news/fy25-results-presentation-3224759.html and https://cargroup.com/wp-content/uploads/2025/10/2025-AGM-presentation.pdf (accessed 2026-11-24)
41. AADA & AutoGrab, *What Australians Want in the Used Vehicle Market* & *Used Car Market Stabilises* — https://www.aada.asn.au/what-australians-want-in-the-used-vehicle-market/ and https://autotalk.com.au/news/used-car-market-stabilises-as-dealers-gain-ground (accessed 2026-11-24)
42. GoAutoNews Premium & Pickles, *Used Market Decelerates (H1 2026)* & *Q3 2026 Report (Datium Insights)* — https://premium.goauto.com.au/used-market-decelerates/ and https://www.pickles.com.au/qar/q3-2026-report (accessed 2026-11-24)
43. KECG, *Car Dealership Marketing Costs in Australia (June/Oct 2026)* — https://kecg.co/blog/car-dealership-marketing-costs/ (accessed 2026-11-24)
44. LandingGarage & GoAutoNews Premium, *Dealership Lead Benchmarks* & *Leads Responses Days Late* — https://www.landinggarage.com/blog/car-dealership-lead-generation-statistics-benchmarks-2026 and https://premium.goauto.com.au/leads-responses-days-late/ (accessed 2026-11-24)

---

## Gaps / Not Accessible

1. **Seek (`seek.com.au`) & Indeed (`au.indeed.com`) Live Job Counts:** Both domains returned `HTTP 403 Forbidden` with Cloudflare anti-bot protection (`Cf-Mitigated: challenge` on Seek). Automated counting of total active ads mentioning each DMS was skipped; only publicly indexed examples could be cited.
2. **Meta Ad Library (`facebook.com/ads/library/`) & Google Ads Transparency Center (`adstransparency.google.com`):** Meta Ad Library returned `HTTP 403 Client challenge` (blocked/not accessible). Google Ads Transparency Center loads as a client-side JS SPA requiring interactive queries, so live ad creative copy for EasyCars, Virtual Yard, Indiqator, and AdTorque Edge remains **UNVERIFIED**.
3. **Nexgate Help Hub (`help.nexgate.ai/hc/en-gb`):** Returned `HTTP 403 Forbidden`; therefore carsales' private list of certified DMS/CRM integration partners and full technical schema docs could not be inspected.
4. **BuiltWith Paid Lists & Non-Web DMS Counts:** BuiltWith full domain export lists and country-filtered query totals for back-office DMS platforms (Pentana, Titan DMS, Auto-IT, CloudLogic, Motorcentral) are paywalled (**blocked/not accessible**).
5. **IBISWorld Paywalled Report & ABS 8165.0 Data Cubes:** Standalone Australian "Used Car Dealers" revenue/business count inside IBISWorld G3911 is paywalled (**UNVERIFIED**), and ABS Cat. 8165.0 ANZSIC 3911 state-by-employment-size breakdowns require downloading and parsing Excel/CSV data cubes (**UNVERIFIED** here).
6. **Exact Regulator Sub-Splits:**
   - **NSW:** DCS RIS (Feb 2025) combines motor dealers and motor vehicle recyclers (`>2,800` organisations); exact MD-only count requires querying the live Verify NSW portal.
   - **QLD:** OFT MACS dataset (`8,693` Motor Dealer licences, Oct 2025) combines corporate and natural-person licences; exact corporate-only rooftop count is **UNVERIFIED**.
   - **WA / TAS / ACT / NT:** Active motor vehicle dealer licence counts were **not found** in the 2024–25 DEMIRS Annual Report or public state summaries searched.
7. **Australian Dealer Lead-Source Split:** Verified, audited Australian percentage breakdown across carsales vs. Google vs. Facebook vs. Gumtree/Drive vs. walk-in is proprietary and **not found** in public disclosures (agency benchmarks from KECG and LandingGarage were used as directional proxies only).
