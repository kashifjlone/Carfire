# Requirements v0 & Evidence Map (Provisional)

- **Date:** 24 November 2026
- **Target ICP:** Independent Australian used-car dealers (~10–80 vehicles, 1–few branches; focus states: **NSW, VIC, QLD**).
- **Spec Compared Against:** [MASTER_SPEC_V2_2 (3).md](file:///e:/Product%20Development/Autos/MASTER_SPEC_V2_2%20(3).md) (Sections 2.6, 5, 8, 14).
- **Provisionality Notice:** All MoSCoW priorities below are **provisional until validated by 3–5+ dealer interviews**. Any feature tagged **Confidence `C`** is an unvalidated hypothesis queued as an interview question in Section 4.

### Legend
- **MoSCoW (Provisional):** `Must` (MVP P0) | `Should` (P1 — retention/conversion shortly post-MVP) | `Could` (P2 — later integrations/scale) | `Won't-for-MVP` (explicitly excluded or niche-only).
- **Confidence:**
  - **A** = Verified from public sources (statutory/regulatory rule, near-universal competitor table-stake, or >80% multi-state audit adoption).
  - **B** = Inferred from patterns (cross-state audit gaps, app-store/Xero reviews, international SaaS benchmarks).
  - **C** = Hypothesis requiring dealer confirmation in interviews.
- **Spec V2.2 Status:** `In spec` | `Missing` | `Conflicts` (with `MASTER_SPEC_V2_2 (3).md`).

---

## 1. Module-by-Module Requirements & Evidence Map

### 1.1 Tenancy & Onboarding
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| TEN-01 | Multi-tenant isolation (`dealership_id` RLS, host-resolved public RPCs, no anon table access) | Must | A | [MASTER_SPEC_V2_2](file:///e:/Product%20Development/Autos/MASTER_SPEC_V2_2%20(3).md) §4.2, §6; [06_regulatory_national.md](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §2.2 (NDB penalties) | **In spec** (§4.2, §6) |
| TEN-02 | Branch entity with per-branch `state` (`NSW\|VIC\|QLD`), timezone, opening hours, address, yard manager (QLD) | Must | A | [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §§2.1–2.3 (branch registers, QLD opening days for cooling-off) | **In spec** (partial: `branches` has state/tz in §5.3; missing QLD `yard_manager` & opening days) |
| TEN-03 | Mandatory per-branch `dealer_licenses` (`licence_number`, `licensed_entity_name`, `jurisdiction`) validated before NSW/VIC publishing | Must | A | `100%` NSW & `88.2%` VIC audit display ([04a](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md), [04b](file:///e:/Product%20Development/Autos/research/raw/04b_dealer_site_audit_vic.md)); [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §§2.1–2.2 | **In spec** (§5.3 `dealer_licenses`; publish gate rule needs explicit enforcement) |
| TEN-04 | Unlimited staff users with RBAC (`owner\|admin\|manager\|sales\|viewer`) & branch scoping | Must | A | Unlimited users marketed by EasyCars, Virtual Yard, YardStack, DealerCenter ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) §4, [02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md) Part E) | **In spec** (§3, §5.3 `memberships`) |
| TEN-05 | Onboarding collects ABN + GST-registration status + NSW `online_sales_model` (`enquiry_only` default) | Must | A | [06_regulatory_national.md](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §5 (B2B GST rule); [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §2.1 #7 | **Conflicts / Partial** (NSW model in §8.3; spec §9 assumes Pty Ltd charging GST, omits foreign non-resident ABN/GST check) |
| TEN-06 | Cardless 14–30 day free trial + self-serve "preview your live inventory" onboarding option | Should | B | MotorDesk 30d & YardStack 14d cardless trials; DealerAssist live preview ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md) Part E) | **Missing** (spec assumes assisted onboarding only, §2.2/2.6) |
| TEN-07 | Simplified single-dealership default UX (hide multi-dealership URL switcher unless user belongs to 2+ orgs) | Should | C | Hypothesis: most 10–80 car independents run 1 org; multi-org switcher adds nav friction | **Conflicts** (spec §4.9 makes `/app/[dealershipSlug]` switcher mandatory UI) |

### 1.2 Inventory
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| INV-01 | Vehicle CRUD with core AU fields (`vin`, `rego_number`, `registration_status`, `engine_number`, `chassis_number`, `build_date`, `compliance_date`, `odometer_km`, `gvm_kg`, `vehicle_category`) + VIN dedupe | Must | A | [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §4.1 #4 (VIC rego/VIN ad rule; QLD Form/Register fields) | **In spec** (partial: §5.3 has VIN/specs/odometer; missing `engine_number`, `chassis_number`, `gvm_kg`, `registration_status`, `rego_number` explicitly) |
| INV-02 | Separate `publication_status` (`draft\|published\|unpublished`) and `availability` (`in_transit\|in_stock\|awaiting_detail\|deposit_taken\|sold\|archived`) | Must | A | ACL bait-advertising rules ([06](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §1.2); "Awaiting Detail" / "In Transit" observed on yard sites ([04a](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md), [04c](file:///e:/Product%20Development/Autos/research/raw/04c_dealer_site_audit_qld.md)) | **In spec** (partial: §5.3 has `in_transit\|in_stock\|sold\|archived`; add `awaiting_detail` & `deposit_taken`) |
| INV-03 | Acquisition type (`owned\|trade_in\|consignment`) with hard block on `consignment` for VIC branches | Must | A | Consignment is illegal in VIC ([05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §2.2 #6); legal in NSW/QLD | **Missing** (no `acquisition_type` or VIC consignment block in spec §5.3/§8) |
| INV-04 | Configurable price model (`total_price_cents` Drive-Away, `egc_price_cents`, `price_display_mode`, optional strike-through markdown) | Must | B | NSW audit `82.4%` EGC vs VIC `64.7%` DA & QLD `58.8%` DA + `11.8%` mixed ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)); ACL s 48 single price ([06](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §1.1) | **Conflicts** (spec §8.6 forces `total_price_cents` headline only; NSW yards almost universally show EGC—needs lawyer + dealer validation) |
| INV-05 | Field-level private tables (`vehicle_private`: acquisition cost, recon notes, floorplan) hidden from `sales` role & public RPCs | Must | A | [MASTER_SPEC_V2_2](file:///e:/Product%20Development/Autos/MASTER_SPEC_V2_2%20(3).md) §3, §5.1, §6; [01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) §4 (Titan/YardStack role privacy) | **In spec** (§5.1 `vehicle_private`, §6 RLS) |
| INV-06 | Immutable soft-delete & audit log for price, odometer, status, and stockbook changes (6-year retention) | Must | A | NSW Form 1 electronic audit trail + 6-yr retention; VIC Form 2 6-yr; QLD 5-yr ([05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md)) | **In spec** (§5.4, §6 `audit_logs`) |
| INV-07 | Rego / VIN auto-population via RedBook / Glass's / NEVDIS broker (`Rego2Stock` pattern) | Should | A | Praised in EasyCars/Virtual Yard/YardStack/DealerX ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) §4, [03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md) §4); requires paid Austroads broker ([06](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §4.2) | **Missing** (not in MVP P0/P1; implicitly P2 under PPSR/NEVDIS) |
| INV-08 | Per-vehicle recon costing, daily holding cost, floorplan interest & ageing alerts (>30/45/60 days) | Should | B | Avg 51.5–52.8 days to sell in Q3 2026 ([07](file:///e:/Product%20Development/Autos/research/raw/07_market_signals.md) §7.1); YardStack net-profit wedge ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) §4) | **In spec** (P1 §2.6, §5.1 `vehicle_costs`, ageing dashboard) |
| INV-09 | "Filter vehicles with zero photos" & bulk quick-edit grid in admin | Must | B | Explicit 5★ Nexgate review request ([03_reviews_forums.md](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md) #15); regional yards had 3–4 photo gaps ([04a](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **Missing** |

### 1.3 Media
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| MED-01 | Bulk multi-photo upload (30–70 photos/car), drag-and-drop reorder, WebP conversion, EXIF/GPS strip, CDN delivery | Must | A | Median VDP photos: NSW `21`, VIC `~35`, QLD `32` (max 70) ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)); EasyCars/VY photo praise ([03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md) §4) | **In spec** (§4.5 R2 WebP pipeline; specify 50–70 image limit/car) |
| MED-02 | Mobile-browser-first camera/gallery upload directly onto a stock card (no desktop transfer) | Must | A | Praised in EasyPhoto, Virtual Yard app, Frazer Sidekick; Nexgate/Motorcentral mobile apps fail on crashes ([03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md) §3–4) | **Missing** (spec §4.5 describes API signing, not mobile-first lot capture UX) |
| MED-03 | Optional YouTube / walkaround video URL embed per vehicle | Should | B | `20.0%` (`10/50`) of audited sites show VDP video ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **In spec** (§5.3 `video_url`) |
| MED-04 | AI background studio enhancement & automatic number-plate blurring | Could | B | Differentiator on YardStack (A$0.50–A$4/car) & Dealer Studio ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) §1, [02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md) Part A) | **Missing** |

### 1.4 Import / Migration
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| IMP-01 | Self-serve + assisted CSV/XLSX importer with column mapping presets (EasyCars, Virtual Yard, Nexgate, generic), dry-run & error report | Must | A | YardStack offers free migration from EasyCars/VY/CloudLogic ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) [S5]); switching friction ([03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md), [07](file:///e:/Product%20Development/Autos/research/raw/07_market_signals.md) §8.3) | **In spec** (§2.6 P0 assisted CSV migration) |
| IMP-02 | SSRF-hardened CSV photo URL re-hosting + ZIP image upload fallback matched by VIN/stock# | Must | B | Needed to avoid re-uploading 500–2,500 photos per 20–50 car yard; spec SSRF controls ([MASTER_SPEC_V2_2](file:///e:/Product%20Development/Autos/MASTER_SPEC_V2_2%20(3).md) §4.5.1) | **In spec** (§4.5.1; verify in interviews whether dealers get URLs vs ZIPs) |
| IMP-03 | Import validation flags for ACL/state gaps (missing licence, EGC mislabelled as DA, prohibited VIC consignment, "+ on-roads" copy) | Must | A | [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §2.2 #6; [06_regulatory_national.md](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §1.1 | **Missing** (spec §4.5.1 checks media only, not regulatory flags on CSV rows) |

### 1.5 Storefront / Website
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| WEB-01 | Fast SSR/ISR mobile-first storefront (<0.5–1.0s TTFB) with live DB sync (zero feed lag, instant Sold removal) | Must | A | Dealer Studio 0.1–0.4s benchmark vs EasyCars/Indiqator 2–9.8s & broken custom PHP/JS sites ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **In spec** (§4.2–4.3 Next.js + public RPCs) |
| WEB-02 | Multi-facet inventory search filters (make, model, price, body, trans, fuel, branch, availability, sort) | Must | A | **`98.0%` (`50/51`)** of audited dealer sites ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **In spec** (§6 `public_vehicles`; add `fuel_type` & `year` range filters) |
| WEB-03 | Auto-hide unused nav items (e.g., hide "New/Demo" or "Multi-branch" when count = 0) | Must | B | Dealer Studio VIC sites showed dead `0 New / Demo` nav links ([04b](file:///e:/Product%20Development/Autos/research/raw/04b_dealer_site_audit_vic.md) §3 #3) | **Missing** |
| WEB-04 | Embedded Google Reviews / testimonials widget + dealership About/Trust page | Must | B | **`51.0%` (`26/51`)** of audited sites; BuyerScore trust benchmark ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md), [04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **Missing** |
| WEB-05 | Opt-in `/sold` archive route (cleanly hidden if disabled; never 404/broken like legacy EasyCars) | Should | B | `15.7%` (`8/51`) live; multiple EasyCars sites had broken `/sold-cars/` routes ([04a](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md) §3 #6) | **Missing** |
| WEB-06 | "Find Me A Car" / sourcing enquiry form + VDP Watchlist / Saved/Compare shortlist | Should | B | Observed across EasyCars, Virtual Yard, Indiqator, DealerCenter (`vehicles not in inventory`) ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md), [04a/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **Missing** |
| WEB-07 | Embeddable JS stock widget / WordPress snippet for dealers refusing to replace an existing WP/Webflow site | Could | C | YardStack & MotorDesk offer embeddable widgets ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md) Part E) | **Missing** |

### 1.6 Domains & SEO
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| DOM-01 | Platform subdomain (`{slug}.{platform}`) out-of-the-box + custom domain (`apex`/`www`) with DNS check, SSL, and 308/301 primary host redirect | Must | A | Table-stakes across all website providers ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md) Part C); [MASTER_SPEC_V2_2](file:///e:/Product%20Development/Autos/MASTER_SPEC_V2_2%20(3).md) §4.1 | **In spec** (§4.1) |
| DOM-02 | SEO metadata, canonical tags, dynamic XML sitemap, Vehicle JSON-LD structured data, and `llms.txt` | Must | B | EasyCars suburb-slug SEO; MotorDesk `Vehicle` schema + `llms.txt` ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md), [04b](file:///e:/Product%20Development/Autos/research/raw/04b_dealer_site_audit_vic.md)) | **In spec** (partial: §2.6 has metadata/canonical/sitemap/structured data; `llms.txt` missing) |
| DOM-03 | `.au` domain check / warning when NSW dealer toggles online-sales features | Must | A | NSW online motor dealers must use a `.au` domain ([05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §2.1 #7) | **In spec** (§8.3) |

### 1.7 CRM & Leads
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| CRM-01 | Public form security pipeline (Zod, honeypot, Turnstile, Upstash rate limit, 10-min dedupe, no anon writes) | Must | A | [MASTER_SPEC_V2_2](file:///e:/Product%20Development/Autos/MASTER_SPEC_V2_2%20(3).md) §4.8 | **In spec** (§4.8) |
| CRM-02 | Separate `inquiries` (immutable) → `customers` (deduped) → `leads` (pipeline status, owner, activity timeline, follow-up tasks) | Must | A | Dealers lose leads after initial reply ([03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md) #18, #36) | **In spec** (§5.2) |
| CRM-03 | Instant (<1 min) automated email acknowledgement to buyer with vehicle context + immediate staff alert | Must | B | Dealer audits show 4–12+ hr response lag vs <5 min conversion benchmark ([07](file:///e:/Product%20Development/Autos/research/raw/07_market_signals.md) §7.2) | **In spec** (partial: §2.6 has email notifications to staff; instant *buyer* auto-reply missing) |
| CRM-04 | Built-in **WhatsApp click-to-chat** deep-link on VDP/header with pre-filled Year/Make/Model/Stock# + optional Podium script slot | Must | B | **`47.1%` (`24/51`)** use live chat/WA; **7/17 QLD** use WhatsApp vs legacy `mailto:` forms ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **Missing** (spec puts SMS/WhatsApp entirely in P2 §2.6) |
| CRM-05 | Test-drive / inspection booking request CTA on VDP (simple preferred date/time enquiry in MVP; calendar/licence OCR later) | Must | B | **`44.0%` (`22/50`)** of audited sites offer test-drive booking CTA ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **Conflicts** (spec puts test drives in P1 §2.6; VDP CTA/enquiry form should be P0) |
| CRM-06 | Overdue-lead reminders, round-robin assignment, and multi-day follow-up sequences | Should | B | Dealer Studio release logs & Indiqator 51-day cadence ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md), [03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md) #36) | **In spec** (P1 §2.6) |
| CRM-07 | Two-way SMS / email / AI conversational reply & multilingual support (EN/ZH/AR/VI) + Spam Act 5-day STOP suppression | Could | B | Dealerloop & YardStack differentiators ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) §4); Spam Act rules ([06](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §3.1) | **In spec** (P2 §2.6; add Spam Act STOP/consent rules) |

### 1.8 Trade-In
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| TRD-01 | Branded `/trade-in` / `/sell-your-car` page + VDP trade-in modal feeding CRM lead pipeline | Must | A | **`90.0%` (`45/50`)** of audited dealer sites have trade-in forms ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **In spec** (§2.6 P0) |
| TRD-02 | Private customer photo upload (scoped presign, Turnstile, private R2 prefix, retention purge) | Should | C | YardStack/Dealerloop highlight photo appraisals; unsure if 10–80 car buyers upload photos in MVP vs rego+km form | **In spec** (§2.6 P0, §4.5.2 — validate if MVP needs photo upload or just rego/VIN/km fields first) |

### 1.9 Finance Enquiry
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| FIN-01 | Finance enquiry / pre-approval form (VDP + dedicated `/finance` page) routed into CRM | Must | A | **`98.0%` (`50/51`)** of audited dealer sites have finance CTAs ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **Missing** (spec §2.6 lists enquiry & trade-in, omits explicit finance enquiry/pre-approval template) |
| FIN-02 | Interactive **finance repayment calculator** (weekly/fortnightly/monthly, rate/term/deposit sliders, strict "indicative estimate only" & credit-disclaimer copy) | Must | A | **`56.9%` (`29/51`)** of audited sites + EasyCars/DealerStudio standard ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md), [04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **Missing** (spec §8.6 only covers *drive-away* on-road calculator, not finance repayment calculator) |
| FIN-03 | Third-party broker / lender payload webhooks (e.g. Drive On Finance, FinanceConnect) | Could | C | EasyCars & Indiqator offer F&I partner bridges ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) §1) | **In spec** (explicitly non-goal for in-house broking §2.6) |

### 1.10 Portal Feeds
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| FED-01 | Outbound **Facebook Automotive Inventory Ads (AIA) / Catalog feed** (standard feed URL, no bilateral portal contract) | Should | A | Meta AIAs work via standard catalog feeds without bilateral gate ([07](file:///e:/Product%20Development/Autos/research/raw/07_market_signals.md) §8.3); EasyCars/YardStack/Dealer Studio support | **In spec** (P1 §2.6, ADR-15) |
| FED-02 | **carsales (Nexgate)**, **Autotrader / Gumtree (Dealer Central)**, **Drive.com.au** stock feeds & TPLS lead ingest | Could | A | All 3 require commercial partner approval + per-dealer authorisation ([07_market_signals.md](file:///e:/Product%20Development/Autos/research/raw/07_market_signals.md) §3) | **In spec** (P2 §2.6) |
| FED-03 | Automatic QLD statutory copy injection (*"No statutory warranty"* / *"No cooling-off period applies"*) in outbound CSV/XML feeds | Must (when feeds ship) | A | QLD *MDCA Reg 2014* ss 9, 11, 11A, 11B apply to *every advertisement* ([05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §2.3 #9) | **Missing** |

### 1.11 Compliance & Disclosures
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| CMP-01 | Storefront ACL & state warranty page separating non-excludable ACL Consumer Guarantees from state statutory warranties + ban *"Sold as is"* / *"+ on-roads"* | Must | A | [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §3.1; [06_regulatory_national.md](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §§1.1–1.2 | **In spec** (§8.4, §8.6) |
| CMP-02 | Deterministic **State Statutory Warranty Indicator** (NSW/VIC `<10y & <160k km` = 3m/5k; **QLD Class A + Class B**; WOVR/consignment/commercial flags + lawyer sign-off) | Must | A | [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §§2.1–2.3 #3 | **Conflicts / Incomplete** (spec §8.2 lacked QLD exact tiers & VIC commercial exclusion) |
| CMP-03 | QLD mandatory VDP/card disclosures (*"No statutory warranty"*, *"No cooling-off period applies"* for consignment) + VIC `LMCT {no}` & Rego/VIN display | Must | A | [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §§2.2 #1, 2.3 #9 | **Missing** |
| CMP-04 | Private-by-default **PPSR / RWC / Safety Cert / Form 4/5/6/9/12 document upload** & summary badge (`PPSR checked on {date}`, no "Guaranteed Clear Title") | Must | A | **`56.0%`** audited PPSR mentions; privacy/PII risk on raw certificates ([05](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md), [04a/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **In spec** (§4.2, §8.5, ADR-13, ADR-39) |
| CMP-05 | Privacy Act APP-compliant storefront **Collection Notice** (APP 5), Privacy Policy link, marketing opt-in checkbox, & **APP 8 overseas (Pakistan) disclosure** | Must | A | Most 10–80 car yards exceed A$3M revenue; statutory tort applies to all sizes ([06_regulatory_national.md](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §2) | **In spec** (§8.7; add explicit APP 8 template support) |
| CMP-06 | Electronic Stock / Dealings Register export (NSW Form 1, VIC Form 2 per-branch, QLD 24h Transactions Register w/ odometer in **words & figures**) | Should | A | [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §§2.1–2.3 #5 | **In spec** (P1 compliance recordbook §2.6; QLD words+figures missing) |
| CMP-07 | Lawyer-approved pre-filled PDF generation (NSW Form 5/6/12, VIC Form 4/5, QLD Form 9/12 + >=5cm windscreen cards) | Should | B | Praised in EasyCars/DealerX/YardStack ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md), [03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md)); lawyer gate needed | **In spec** (P1 §2.6 lawyer-approved disclosure PDFs) |
| CMP-08 | Online holding deposits / checkout (`ENABLE_HOLDING_DEPOSITS = false` in MVP; gated later by NSW 10% cap, VIC/QLD cooling-off, trust rules) | Won't-for-MVP | A | NSW online-dealer regime & trust-account risks ([05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §§2.1 #6–7) | **In spec** (ADR-05, §2.6 non-goal) |

### 1.12 Reporting
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| RPT-01 | Basic operational dashboard (published stock count, days listed, leads by status/source, overdue follow-ups) | Must | B | Core expectation in CRM/DMS ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) §2); 52-day turn pressure ([07](file:///e:/Product%20Development/Autos/research/raw/07_market_signals.md)) | **In spec** (partial: §2.6 puts ageing in P1; basic stock/lead counts needed in P0) |
| RPT-02 | Unit gross/net profit, recon variance & enquiry-to-sale attribution reports | Should | B | YardStack & Eclipse positioning ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) §4) | **In spec** (P1 §2.6) |

### 1.13 Billing (SaaS)
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| BIL-01 | Transparent **per-active-car or flat-band AUD pricing** (e.g., A$149–A$299/mo ex GST), unlimited users, no lock-in | Must | B | YardStack A$8/car & MotorDesk active-car model vs Virtual Yard stock-value penalty ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md) Part E, [07](file:///e:/Product%20Development/Autos/research/raw/07_market_signals.md) §8.2) | **In spec** (open decision §14 #7; pricing model TBD) |
| BIL-02 | Stripe Billing + plan entitlements + idempotent webhooks + customer portal + full tenant export/cancellation workflow | Must | A | [MASTER_SPEC_V2_2](file:///e:/Product%20Development/Autos/MASTER_SPEC_V2_2%20(3).md) §2.6, §9; AADA anti-lock-in Framework ([03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md) #32) | **In spec** (§2.6, §9) |
| BIL-03 | Foreign-supplier B2B GST handling (if billing pre-Pty-Ltd: capture ABN + GST reg confirmation, issue **0% GST** B2B invoice; if AU Pty Ltd: 10% GST tax invoice) | Must | A | [06_regulatory_national.md](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §5 (ATO non-resident B2B rules) | **Conflicts** (spec §9 assumes Pty Ltd charging 10% GST; verify Stripe Tax/MoR B2B rules) |

### 1.14 Admin & Support
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| ADM-01 | Super-admin console with reasoned, time-limited, read-only-by-default **impersonation** + audit log | Must | A | [MASTER_SPEC_V2_2](file:///e:/Product%20Development/Autos/MASTER_SPEC_V2_2%20(3).md) §2.6, §7 | **In spec** (§2.6, §7) |
| ADM-02 | Australian-timezone support SLA (AEST/AEDT 9am–5pm = 4am–12pm PKT overlap), public searchable help docs, & optional paid onboarding SKU | Must | B | EasyCars/MotorDesk praised for support; Nexgate/VY slammed for poor support ([03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md)); Frazer public docs ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md)) | **Missing** (open decision §14 #9; no public docs/PKT overlap plan in spec) |

### 1.15 Integrations
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| INT-01 | Two-way **Xero** (and **MYOB**) sync with **Second-Hand Margin Scheme GST vs Full GST**, stamp-duty handling, & resilient OAuth/contact mapping | Could (P1/P2) | A | Top review pain on EasyCars & Virtual Yard ([03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md) #1–2, #25–26); table stake for full DMS switch ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md) §4) | **In spec** (P2 §2.6; missing Margin Scheme GST nuance) |
| INT-02 | Austroads-authorised broker API (InfoAgent / MotorWeb / RedBook / Blue Flag) for **PPSR + NEVDIS + WOVR + plate-to-VIN** | Could (P2) | A | NEVDIS/WOVR inaccessible directly; requires authorised broker ([06](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §4.2) | **In spec** (P2 §2.6, ADR-04) |

### 1.16 Niche Modules (Optional Flags — Not Core MVP)
| ID | Feature / Requirement | MoSCoW | Conf. | Evidence Links | Spec V2.2 Status |
|---|---|---|---|---|---|
| NIC-01 | **Import Specialist Module** (optional flag): Auction grade, incoming ship ETA, compliance/ADR page, Welcab/Kei tags, optional hybrid battery SOH, freight calc | Won't-for-MVP (Could) | A | Observed on 3/17 NSW, 3/17 VIC, 3/17 QLD purposively sampled importers; irrelevant to mainstream yards ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)) | **Conflicts** (spec §5.3 & §6 put `auction_grade` & `battery_soh` directly on `vehicles` & core RPC) |
| NIC-02 | **Consignment Module** (NSW & QLD only; **blocked in VIC**): Form 9 tracking, consignor portal, trust-ledger export (no SaaS payment routing) | Won't-for-MVP (Could) | A | YardStack core niche ([01](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md)); illegal in VIC ([05](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md) §2.2 #6) | **Missing** |

---

## 2. Features in Spec V2.2 That Evidence Does NOT Support (Cut / Defer Candidates)

| Spec V2.2 Item | Spec Location | Why Evidence Does Not Support It | Recommendation |
|---|---|---|---|
| **Southern Auto live-site Track A & Tenant #1 migration** | §0, §1.1, §11, §14 #1–2, #11 | Project context confirms Southern Auto is **DROPPED**. | **Cut completely** from build plan & ADRs. |
| **JDM/Hybrid Battery fields on core `vehicles` table & `public_vehicle_by_slug`** (`import_source`, `auction_grade`, `battery_soh_pct`, `freight_calculator`, `custom_orders`) | §5.3, §6 (`tenant_modules`, RPCs) | JDM/import features serve a small niche; domestic 10–80 car used yards do not use auction grades or hybrid SOH tests ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)). | **Move out of core schema/RPC** into an optional `niche_attributes` JSONB + `import_specialist` module flag later. |
| **Automated State Stamp-Duty / Drive-Away Fee Calculator (`state_fee_rules`)** | §5.1, §5.3, §8.6 | Requires lawyer-verified, constantly updated state duty/CTP bands and creates misleading-price liability ([06](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §1.1); 0% of audited sites required an automated stamp-duty calculator vs simple **finance repayment calculator** (`56.9%`). | **Defer / Cut** `state_fee_rules`; replace with manual Drive-Away / EGC fields + **finance repayment calculator**. |
| **Mandatory URL-scoped Multi-Tenant Switcher UX (`/app/[dealershipSlug]`)** | §4.9, ADR-38 | ICP is 10–80 car independents with 1–few branches (usually 1 legal entity/dealership). Multi-org switching adds UX clutter for 95% of users. | Keep tenant isolation in backend/session, **defer multi-org switcher UI** unless user has >1 membership. |
| **Heavy Public Trade-in Customer Photo Presign Pipeline in P0** | §2.6, §4.5.2 | `90%` of audited sites have trade-in forms, but most independents capture text/rego/km + phone call rather than requiring customer uploads in v1 (except YardStack/Dealerloop). | **Defer photo upload on trade-in to P1** unless dealer interviews show strong demand; ship fast text+rego trade-in form in P0. |
| **Custom `compliance_rule_versions` engine in P0** | §5.1, §8.1 | Over-engineered for launch when 3 states have clean deterministic rules + lawyer-reviewed static disclosure blocks & PDF upload slots. | Simplify to branch `state` rules + lawyer-reviewed templates in P0. |

---

## 3. Features Missing From Spec V2.2 (Evidence-Supported Additions)

1. **Interactive Finance Repayment Calculator + Finance Enquiry Page (`98%` / `56.9%` audit adoption):** Weekly/fortnightly/monthly slider with "indicative estimate only" disclaimer ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)).
2. **WhatsApp Click-to-Chat Deep-Links + Instant Buyer Auto-Reply (`47.1%` chat/WA; 4–12 hr industry lag):** Zero-cost speed-to-lead win on VDP & mobile ([04c](file:///e:/Product%20Development/Autos/research/raw/04c_dealer_site_audit_qld.md), [07](file:///e:/Product%20Development/Autos/research/raw/07_market_signals.md)).
3. **QLD Two-Tier Warranty (Class A & Class B) + Mandatory Ad Copy Injection + VIC Consignment Hard-Block + VIC `LMCT`/Rego Rules:** Critical state divergences uncovered in [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md).
4. **Storefront Conversion Primitives:** Built-in **Google Reviews widget** (`51%` adoption), opt-in **`/sold` archive** (`15.7%`, fixes EasyCars broken routes), **"Find Me A Car"** sourcing form, **auto-hide empty nav tabs**, and **`awaiting_detail`** stock status ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)).
5. **Mobile-First Lot Photo Capture + "Missing Photos" Filter:** Solves regional sparse-photo pain and desktop transfer friction ([03](file:///e:/Product%20Development/Autos/research/raw/03_reviews_forums.md), [04a](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)).
6. **Non-Resident B2B GST / ABN Billing Logic + APP 8 Cross-Border Support Notice + Spam Act Unsubscribe:** Mandatory legal/tax adjustments for a Pakistan-based founder selling to AU dealers ([06_regulatory_national.md](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md)).
7. **Live Inventory Preview / Cardless Trial & Public Docs:** Proven GTM levers from MotorDesk, YardStack, DealerAssist, and Frazer ([02](file:///e:/Product%20Development/Autos/research/raw/02_competitors_websites_benchmarks.md)).
8. **EGC vs Drive-Away Flexibility (Resolve Conflict):** Spec mandates `total_price_cents` Drive-Away headline only (§8.6), yet **82.4%** of audited NSW dealers display EGC! Must confirm with counsel and NSW dealers whether EGC-primary (with statutory NSW wording) is permitted or if Drive-Away must be enforced.

---

## 4. Consolidated C-Items: Dealer Interview Questions

Use these 14 focused questions in the 5–10 dealer interviews (NSW, VIC, QLD) to convert every `C` hypothesis and open conflict into confirmed `A`/`B` decisions:

1. **Current Stack & Total Spend:** What exact tools do you pay for each month today (DMS, website, CRM, carsales/Nexgate, Podium/chat), and what is your exact monthly bill for software (excluding portal ad spend)?
2. **Willingness to Pay & Pricing Metric:** Would you prefer **per-active-car** pricing (e.g., A$8/car/mo like YardStack) or a **flat tier** (e.g., A$199/mo up to 40 cars, unlimited users), and what would make switching a no-brainer?
3. **Standalone vs Full DMS Replacement:** If a new platform gives you a modern website + fast CRM/WhatsApp + CSV import at A$199/mo, would you replace EasyCars/Virtual Yard completely, or refuse to switch until **Xero/MYOB + state police books** are built in?
4. **Xero / MYOB & Margin Scheme Pain:** How do you and your bookkeeper handle second-hand GST margin scheme, stamp duty, and recon expenses in Xero/MYOB today—and what breaks?
5. **State Compliance & Police Books:** Which exact forms/registers (`NSW Form 1/5`, `VIC Form 2/4/5`, `QLD Form 9/12` + transactions register) do you generate inside your DMS vs fill out manually/via VACC/MTA PDFs?
6. **NSW EGC vs Drive-Away Conflict:** *(NSW dealers)* Why do most NSW yards show Excl. Govt. Charges instead of Drive-Away, and would you accept a system that forces Drive-Away headline pricing?
7. **CSV & Photo Export Reality:** Can you export your current inventory + photo URLs as a CSV/ZIP from EasyCars, Nexgate, or Virtual Yard without calling support—or is it locked down?
8. **Lot Photo Workflow:** Who takes the 20–40 photos per car (owner, yard hand, VA, photographer), and how do photos get onto your website today?
9. **Lead Sources & Speed:** Roughly what % of your sales/leads come from **carsales vs Facebook Marketplace vs Google/your own website vs walk-ins**, and how fast do you typically reply?
10. **Trade-In Photo Upload:** On your website's trade-in form, do buyers actually upload vehicle photos, or do you just want rego/VIN/km + phone number?
11. **Online Holding Deposits:** Do buyers ever ask to place a A$500–A$1,000 holding deposit online, or do you prefer speaking to them first (especially given NSW/VIC/QLD cooling-off rules)?
12. **PPSR Workflow:** Do you run A$2.00 PPSR checks manually on `ppsr.gov.au`, use a broker (MotorWeb/InfoAgent/RedBook), or rely on EasyCars/CarHistory—and do you want PPSR badges on your website?
13. **Consignment & Niche Stock:** Do you sell cars on consignment (NSW/QLD) or import/commercial vehicles, or 100% standard owned passenger/4x4 retail stock?
14. **Offshore Vendor & Support Trust:** If your data is hosted in Sydney (AWS/Supabase), you get reliable AEST business-hours support + WhatsApp/ticket help, and transparent month-to-month export, would an overseas engineering/founder team (Pakistan) stop you from buying?
