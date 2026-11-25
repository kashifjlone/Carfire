# Master Specification v2.3: Australian Used-Car Dealership Multi-Tenant SaaS

> **Status:** Approved Working Build Spec. Date: 24 November 2026.  
> **What this is:** The definitive greenfield build specification for the Australian independent used-car dealership SaaS platform. Supersedes v2.2 by incorporating:
> 1. Complete **Greenfield Transition** (ADR-21): test project "Southern Auto" is dropped; no live-site hotfix track; no legacy database migration or backfill.
> 2. **Australian Domestic Entity Structure** (ADR-19, ADR-30): Platform operates through an Australian registered company (Pty Ltd, with Australian Citizen/Resident Director), enabling `.com.au` auDA domain eligibility, domestic Australian Stripe Billing (AUD + 10% GST tax invoices), local Australian bank settlement, and local dealer trust.
> 3. **Evidence-Based Scope Updates** from the 24 November 2026 desk research (51 audited NSW/VIC/QLD dealer sites, competitor teardowns, review mining, and state/national regulations):
>    - JDM import fields (`auction_grade`, `battery_soh_pct`, `freight_calculator`) removed from the core `vehicles` table and core public RPCs into an optional niche module.
>    - Complex automated stamp-duty calculator (`state_fee_rules`) replaced with **Finance Repayment Calculator** (`FIN-02`) with statutory indicative disclaimers.
>    - **WhatsApp click-to-chat** deep-link (`CRM-04`) added to VDP/header.
>    - **QLD two-tier statutory warranty** (Class A / Class B) and mandatory ad copy rules (*"No statutory warranty"* / *"No cooling-off period applies"*) codified.
>    - **Privacy Act APP 8 overseas disclosure** added for offshore infrastructure and Pakistan engineering support.
>
> **What this is not:** Formal legal, tax, accounting or financial advice. Company structure, motor-trade statutory forms, consumer law disclaimers, and tax settings should be reviewed by qualified Australian advisers prior to commercial rollout.
>
> **Legend:** ✅ decided | 🟡 proposed | ❓ open | ⚠️ verify (legal/provider/version fact) | 🔴 blocker / high risk

---

## 0. What Changed from V2.2

| Area | V2.2 Baseline | V2.3 Greenfield Specification | Rationale / Evidence |
|---|---|---|---|
| **Southern Auto & Track A** | Live-site hotfix track (Track A) + Southern Auto as Tenant #1 import | **Dropped completely.** No Track A. Southern Auto was an isolated test setup. Zero legacy code or data ported directly. | Simplifies delivery; eliminates legacy technical debt and live-site hotfix distraction. |
| **ADR-21 (Architecture Path)** | "New multi-tenant foundation, ported components, live site hotfix" | **Poora greenfield.** Clean repository, clean Supabase instance, clean R2 bucket, clean Stripe AU setup. Old repo is read-only reference only. | Clean multi-tenant architecture without retrofitting single-tenant test assumptions. |
| **Australian Entity & Director (ADR-19, ADR-30)** | 🟡 Proposed Pty Ltd; s 201A resident director eligibility open blocker (Risk #5) | ✅ **Resolved.** Platform operates under an Australian Pty Ltd with an Australian Citizen/Resident Director (Co-founder / Cousin). | Unlocks auDA `.com.au` domain, Australian Stripe Billing, domestic banking, and dealer trust. |
| **Core Inventory Schema (§5.3, §6)** | `auction_grade`, `import_source`, `battery_soh_pct` on base `vehicles` table | **Cleaned.** Core table stores universal vehicle attributes. Import/battery fields moved to optional `niche_attributes` JSONB / `tenant_modules`. | 51-dealer audit showed only 9/51 (17.6%) were importers; 82.4% of regular yards do not use JDM fields ([04a/b/c](file:///e:/Product%20Development/Autos/research/raw/04a_dealer_site_audit_nsw.md)). |
| **Finance Calculator (§1.9, §8.6)** | Automated stamp-duty calculator (`state_fee_rules`) | **Replaced.** Cut automated stamp-duty engine (misleading price risk); added **interactive finance repayment calculator** (`FIN-02`). | 56.9% of audited sites deploy finance repayment sliders; 0% required automated stamp-duty engines ([COMPETITOR_AND_REVIEW_RESEARCH.md](file:///e:/Product%20Development/Autos/research/COMPETITOR_AND_REVIEW_RESEARCH.md)). |
| **Lead / CRM Conversion (§2.6, §4.8)** | Inquiries → Customers → Leads with email alert | Added **WhatsApp click-to-chat** deep-link (`CRM-04`) on VDP + instant automated buyer auto-reply. | 47.1% of audited sites use live chat/WhatsApp; dealer reviews show 4–12hr response lag loses buyers. |
| **State Compliance (§8.2, §8.3)** | NSW forms general, QLD forms unverified | **Codified:** NSW 2025 Online Dealer rules (.au, 10% deposit, Form 5); VIC consignment ban (100 penalty units) & LMCT display; QLD Class A/B warranty & mandatory ad copy. | Researched against CAV, NSW Fair Trading, and QLD OFT ([05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md)). |
| **B2B Billing & GST (§9)** | Foreign supplier vs domestic ambiguity | Domestic Australian Pty Ltd issuing compliant **10% GST Tax Invoices** with ABN. | Standard Australian commercial expectation; dealers claim input tax credits via quarterly BAS. |
| **Multi-Org Switcher UX (§4.9)** | Prominent `/app/[dealershipSlug]` switcher in navigation | DAL & RLS remain tenant-scoped; **multi-org switcher UI hidden** if user belongs to only 1 dealership. | 10–80 car yards are single-entity businesses; removes unnecessary UI complexity. |

---

## 1. Delivery Tracks & Timeline

### 1.1 Parallel Delivery Tracks

```
TRACK B: Commercial, Legal & Discovery (Runs Now)
   ├── Cousin's AU Pty Ltd review / Trading Name registration / ABN confirmation
   ├── auDA .com.au domain registration (via AU entity)
   ├── Stripe Australia account setup (AUD payouts linked to AU bank)
   └── 3–5 Dealer Discovery Interviews (using DISCOVERY_KIT.md)
   
TRACK C: Platform Build (Greenfield)
   ├── Phase 1: Foundation (Tenancy, Auth, RLS, Domain routing, R2 Media, Form Pipeline)
   ├── Phase 2: Commercial MVP (Inventory, Storefront, Finance Calc, WhatsApp, CRM, Stripe)
   └── Phase 3: Pilot Onboarding (Assisted CSV/Photo Migration for 3–5 design partners)
```

### 1.2 Realistic Timeline

Assumes 1 full-time lead developer (Pakistan) + AI agentic toolchain, with Australian co-founder handling local entity, banking, and calling/discovery support:

| Stage | Duration | Core Milestone | Exit Gate |
|---|---|---|---|
| **Discovery & Setup** | Weeks 1–3 | AU entity / ABN confirmed, Stripe AU test mode, 3–5 dealer interviews completed | C-items validated; brand name chosen; `.com.au` registered |
| **Phase 1: Foundation** | Weeks 4–9 (6 wks) | Multi-tenant schema, RLS, DAL, host-resolved public RPCs, R2 storage, form security pipeline | pgTAP test suite passing; zero anon base-table access; clean fresh DB bootstrap |
| **Phase 2: Commercial MVP** | Weeks 10–19 (10 wks) | Inventory CRUD, CSV + photo re-hosting pipeline, Next.js storefront, finance calculator, WhatsApp CTA, CRM pipeline, Stripe Billing | End-to-end user flow verified on staging: signup → import → publish stock → buyer enquiry → lead |
| **Phase 3: Pilot Rollout** | Weeks 20–24 (5 wks) | Onboard first 3–5 independent Australian dealers as design partners | 3+ dealers live on their own custom domains, publishing stock daily |

*Total estimated time to pilot-ready commercial SaaS: **~5–6 months**.*

---

## 2. Product Scope & Requirements

### 2.1 Vision
A modern, fast, B2B multi-tenant SaaS engineered specifically for independent Australian used-car dealerships (~10–80 vehicles, 1–few branches). It replaces slow, dated Bootstrap 3 sites and clunky legacy software with a lightning-fast, SEO-optimised branded storefront, instant lead conversion (WhatsApp, finance calculator, email), lightweight stock management, and seamless CSV migration.

### 2.2 Target ICP (Ideal Customer Profile)
- **Business Type:** Independent licensed motor car trader (LMCT / Motor Dealer).
- **Stock Size:** 10 to 80 vehicles on lot.
- **Geography:** Initial launch in **NSW, VIC, and QLD**.
- **Pain Points:** 
  1. Excessive Carsales / Nexgate portal fees ($82/lead + $799–$1,299/mo).
  2. Slow, outdated dealer websites (EasyCars / Indiqator legacy templates loading in 4–9s).
  3. Complicated, expensive DMS systems with hidden pricing and per-user fees.
  4. Lead leakage due to slow response times (>4 hours).

### 2.3 Platform vs. Dealer Responsibility Boundary
- **Platform Supplies:** Cloud software, hosting infrastructure, database isolation, public storefront, CRM workflow tools, and calculation templates.
- **Dealer Supplies & Owns:** Motor dealer licence, vehicle ownership, pricing accuracy, vehicle condition/title representations, warranty fulfillment, customer contracts, and statutory compliance.
- **Platform UX Rules:** The platform never acts as dealer of record, never holds vehicle sale funds or trust deposits in MVP, never guarantees vehicle title or statutory compliance, and clearly attributes all vehicle data to the dealer.

---

### 2.4 MVP Feature Scope (MoSCoW Matrix)

#### P0: Core Commercial MVP (Must Have)
1. **Tenancy & Onboarding:**
   - Multi-tenant signup, Australian ABN validation, branch setup, staff invitations with RBAC (`owner`, `admin`, `manager`, `sales`, `viewer`).
   - Simplified single-dealership UX (multi-tenant switcher hidden unless user belongs to 2+ dealerships).
2. **Branded Dealer Storefront:**
   - Lightning-fast Next.js App Router public storefront hosted on platform subdomain (`dealer.platform.com.au`) or custom domain (`dealer.com.au` / `www.dealer.com.au`).
   - Clean, modern inventory catalog with instant search, price filters, body type, transmission, and branch selectors.
   - Vehicle Detail Page (VDP): High-res photo gallery, specs, key features, imperfections disclosure, and business hours.
   - Full SEO suite: Server-rendered OpenGraph metadata, canonical tags, dynamic XML sitemaps, and Google `Car` schema structured data.
3. **Conversion & Lead Tools:**
   - **Interactive Finance Repayment Calculator (`FIN-02`):** Weekly/fortnightly/monthly loan slider with interest rate, loan term, and deposit inputs; prominent statutory disclaimer (*"Indicative estimate only. Not an offer of finance"*).
   - **WhatsApp Click-to-Chat (`CRM-04`):** One-click button on VDP and site header opening WhatsApp Web/App with pre-filled vehicle details (*"Hi, I'm interested in the 2018 Toyota RAV4 (Stock #1042)..."*).
   - **Trade-In / Valuation Request Form (`TRD-01`):** Form capturing customer vehicle details (Rego, State, Make, Model, Year, KM, Condition) feeding the CRM.
   - **Test-Drive / Inspection Booking Form (`CRM-05`):** Simple date/time preference enquiry on VDP.
   - **Public Form Security Pipeline (`CRM-01`):** Server-side Zod validation, honeypot field, Cloudflare Turnstile verification, Upstash Redis rate-limiting (IP + email HMAC), and 10-minute duplicate suppression.
4. **CRM & Lead Pipeline:**
   - Inbound submissions recorded immutably as `inquiries`, deduping to `customers`, and creating actionable `leads`.
   - Kanban / list pipeline view: `New` → `Contacted` → `Test Drive Booked` → `Negotiating` → `Won / Lost`.
   - Lead activity timeline, staff notes, follow-up task scheduling with due dates, and unassigned lead queue.
   - Instant automated email notification to dealership staff on new lead + instant acknowledgement email to buyer.
5. **Inventory & Media Management:**
   - Vehicle CRUD: VIN, stock number, make, model, year, variant, transmission, body, fuel, odometer, color, rego, rego expiry.
   - **Pricing:** Single total headline drive-away price (`total_price_cents`) compliant with ACL s 48; optional component/EGC price (`egc_price_cents`) never more prominent.
   - Vehicle status lifecycle: `draft` → `published` → `under_offer` → `sold` → `archived`.
   - Cloudflare R2 media upload: Direct client-to-R2 presigned WebP uploads, server-side key generation, EXIF/GPS stripping, re-encoding, and atomic quota tracking.
6. **Assisted CSV & Photo Migration (`IMP-01`, `IMP-02`):**
   - Universal CSV import tool for migrating stock out of EasyCars, Virtual Yard, Dealer Solutions, or custom spreadsheets.
   - Column mapping UI, data normalisation, dry-run validation, and row-level error reporting.
   - **SSRF-Protected Photo Re-hosting (`IMP-02`):** Background worker downloading vehicle image URLs with strict IP blocklists (blocking private/loopback/metadata ranges), DNS re-check on redirect, WebP conversion, and ZIP upload fallback.
7. **Compliance & Statutory Disclosures:**
   - Mandatory dealer licence number displayed on storefront header, footer, and every vehicle listing (VIC `LMCT {no}`, NSW `MD {no}`, QLD licence).
   - **QLD Statutory Copy Injection (`CMP-02`, `CMP-03`):** Automatic display of *"No statutory warranty"* for vehicles >10 years old or >160,000 km (Class B / unwarranted) and *"No cooling-off period applies"* where applicable.
   - **PPSR Certificate Management (`CMP-04`):** Private storage of PPSR certificate PDFs; public storefront displays verified date badge only (*"PPSR search completed on {date}"*); no misleading *"Guaranteed Clear Title"* claims.
   - **Privacy Act APP 8 Notice (`CMP-05`):** Storefront Privacy Policy and form Collection Notices disclosing Australian hosting and overseas engineering/support (Pakistan).
8. **SaaS Subscriptions & Billing:**
   - Stripe Billing integration under the Australian entity.
   - Per-active-car pricing (e.g. A$8/car/mo + GST) or flat-band tiers (e.g. A$199/mo up to 30 cars, A$349/mo up to 70 cars), with **unlimited users**, **A$0 setup fee**, and **no lock-in contracts**.
   - Automated Australian Tax Invoices (10% GST, ABN, business address).
   - Self-serve Stripe Customer Portal for payment method updates and plan changes.
   - Full tenant export workflow: CSV export of inventory, leads, and customer contacts upon cancellation.

#### P1: Early Follow-ups (Should Have)
- **Facebook Automotive Inventory Ads (AIA) / Catalog Feed (`FED-01`):** Outbound standard catalog feed URL for automated Facebook Marketplace / Instagram vehicle ads.
- **Electronic Dealing Registers (`CMP-06`):** Structured register export supporting NSW Form 1, VIC Form 2 dealings book, and QLD 24h Transactions Register (odometer in words and figures).
- **Lawyer-Approved Disclosure PDFs (`CMP-07`):** Generating pre-filled NSW Form 5 / VIC Form 4 / QLD Form 12 vehicle notices for printing and windscreen display.
- **Stock Ageing Dashboard (`RPT-01`):** Visual alerts for vehicles listed >30, >45, and >60 days to assist stock turn velocity.
- **Customer Photo Upload for Trade-Ins (`TRD-02`):** Private presigned upload flow for customers submitting exterior/interior trade-in appraisal photos.

#### P2: Mature Integrations (Could Have)
- **Austroads Broker Integration (`INT-02`):** Direct API bridge (InfoAgent / MotorWeb / RedBook) for automated plate-to-VIN lookup, PPSR, and NEVDIS write-off checks.
- **Xero & MYOB Two-Way Accounting Sync (`INT-01`):** Automated vehicle purchase/sale sync with second-hand goods **GST Margin Scheme** accounting.
- **Bilateral Portal Feeds (`FED-02`):** Commercial feed partnerships with Carsales / Nexgate (TPLS), Gumtree / Autotrader (Dealer Central), and Drive.com.au once partner criteria are met.
- **Two-Way SMS & Conversational AI (`CRM-07`):** Automated sub-minute SMS replies with Spam Act STOP compliance.

#### Explicit MVP Non-Goals
- **Holding customer deposits or card checkouts online:** `ENABLE_HOLDING_DEPOSITS = false`. Online deposits introduce NSW 10% statutory caps, trust account handling, and cooling-off refund liabilities.
- **Platform acting as motor dealer, broker, or marketplace:** The platform never participates in vehicle contracts or buyer warranties.
- **Unverified automated legal or compliance guarantees:** No claims of "100% legal compliance" or "guaranteed clear title".
- **Direct NEVDIS / WOVR scraping:** No unapproved scraping of government vehicle registers.

---

## 3. Roles, Permissions & Field-Level Access

### 3.1 Role Hierarchy
- `owner`: Dealership principal/licensee. Full access to billing, domains, staff invitations, vehicle margins, customer data export, and settings.
- `admin`: General manager. Full access to inventory, CRM, staff management, and reports; cannot delete the dealership or demote the owner.
- `manager`: Sales manager. Can CRUD vehicles, assign leads, view all branch records, view vehicle costs; cannot export customer databases or manage billing.
- `sales`: Sales consultant. Can add/edit vehicles (draft/publish), manage assigned leads, record customer activities; **strictly forbidden from viewing vehicle purchase costs, margins, or private notes**.
- `viewer`: Read-only access to published inventory and general reports.

### 3.2 Permission Matrix

| Capability | Owner | Admin | Manager | Sales | Viewer |
|---|---|---|---|---|---|
| View Published Inventory | ✅ | ✅ | ✅ | ✅ | ✅ |
| Add / Edit Vehicle Details | ✅ | ✅ | ✅ | ✅ | ❌ |
| Publish / Unpublish Stock | ✅ | ✅ | ✅ | ✅ | ❌ |
| Delete / Archive Vehicles | ✅ | ✅ | Archive only | ❌ | ❌ |
| **View Purchase Cost / Margin** | ✅ | ✅ | ✅ | ❌ | ❌ |
| Manage Leads (Assigned Branch) | ✅ | ✅ | ✅ | Assigned | ❌ |
| Export Customer / Lead CSV | ✅ | ✅ | ❌ | ❌ | ❌ |
| Staff Management & Invites | ✅ | ✅ | ❌ | ❌ | ❌ |
| Billing & Subscription Settings | ✅ | ❌ | ❌ | ❌ | ❌ |
| Domain Management & SSL | ✅ | ✅ | ❌ | ❌ | ❌ |
| Security Audit Logs | ✅ | ✅ | ❌ | ❌ | ❌ |

### 3.3 Field-Level Isolation Rule
Postgres Row-Level Security (RLS) protects rows, not individual columns. To prevent sales staff or compromised client queries from ever accessing sensitive financial figures (purchase price, reconditioning spend, trade-in allowance, internal margin notes), sensitive data is stored in a separate table:
- Base table: `public.vehicles` (accessible to sales and public RPC projection).
- Private table: `public.vehicle_private` (stricter RLS policy granting access only to `owner`, `admin`, and `manager`).

---

## 4. System Architecture

```
                    VISITORS / BUYERS                              DEALERSHIP STAFF / ADMIN
                            │                                                 │
             Host: dealer.com.au / dealer.platform.com.au      Host: app.platform.com.au
                            │                                                 │
                            ▼                                                 ▼
             ┌──────────────────────────────────────────────────────────────────────────┐
             │                     Cloudflare Edge (DNS, SSL, WAF)                      │
             └──────────────────────────────────────────────────────────────────────────┘
                                                    │
                                                    ▼
             ┌──────────────────────────────────────────────────────────────────────────┐
             │                   Vercel (Next.js 15+ App Router)                        │
             │   - Edge Proxy/Middleware: Resolves Hostname → Tenant ID                │
             │   - Data Access Layer (DAL): Session Auth, Branch Scope, RBAC Enforcer   │
             │   - Server Actions & Route Handlers (Zero Direct Anon Database Writes)   │
             └──────────────────────────────────────────────────────────────────────────┘
                         │                                              │
                         ▼                                              ▼
    ┌─────────────────────────────────────────┐    ┌─────────────────────────────────────────┐
    │          Supabase PostgreSQL 16         │    │          External Cloud Services        │
    │  - Tenant RLS Enforcement               │    │  - Cloudflare R2: Vehicle & Doc Media   │
    │  - Security-Definer Allowlist RPCs      │    │  - Upstash Redis: Rate Limiting & Queue │
    │  - Private Schema Isolation Helpers     │    │  - Brevo: Transactional Email           │
    │  - Append-Only Audit Logging Triggers   │    │  - Stripe Australia: Billing & Invoicing│
    └─────────────────────────────────────────┘    └─────────────────────────────────────────┘
```

### 4.1 Host Routing & Custom Domains
1. **Resolution Pipeline:** Edge middleware extracts `request.headers.get("host")`, normalises it (lowercased, port stripped, trailing dots removed), and matches it against `dealership_domains`.
2. **Apex vs. www Canonical Redirects:**
   - Every dealership has exactly one primary domain.
   - If primary is `dealer.com.au`, requests to `www.dealer.com.au` receive an immediate permanent redirect (HTTP 308) to the apex, and vice versa.
   - Storefront HTML always includes a canonical `<link rel="canonical" href="https://dealer.com.au/..." />` to prevent SEO duplicate content penalties.
3. **Verification Lifecycle:** `pending_dns` → `txt_verified` → `ssl_provisioning` → `active` → `failed`. Domains are verified via unique TXT tokens and CNAME flattening before traffic routing is enabled.

### 4.2 Public Storefront Isolation (Security-Definer RPCs)
- **Complete Revocation of Base Table Access:**
  ```sql
  revoke all on public.vehicles from anon, public;
  revoke all on public.vehicle_private from anon, authenticated, public;
  revoke all on public.dealerships from anon, public;
  ```
- All public catalog browsing queries execute through strict **Postgres Security-Definer RPC functions** that:
  1. Resolve the requesting hostname internally to an active, subscribed dealership ID.
  2. Filter strictly for `publication_status = 'published'`.
  3. Return only explicit, allowlisted columns (specs, price, media, description).
  4. Never accept a tenant ID parameter from the client.

### 4.3 Cloudflare R2 Media Architecture
1. **Upload Authorisation:** Staff client requests an upload ticket via a Server Action (`/api/media/presign`).
2. **Key Generation:** Keys are strictly constructed server-side:
   `dealerships/{dealership_id}/vehicles/{vehicle_id}/{uuid}.webp`
3. **Verification Pipeline:** Uploads pass size constraints (max 15MB), format validation (`image/webp`, `image/jpeg`, `image/png`), EXIF/GPS coordinate stripping, and resizing before public CDN serving.
4. **Delivery:** Delivered through Cloudflare CDN on custom domain media routes; image requests never touch Vercel image optimisation compute, eliminating excess egress/compute costs.

### 4.4 SSRF-Safe CSV Photo Re-hosting Worker (`IMP-02`)
During dealer CSV stock migration, vehicle image URLs must be imported without exposing the infrastructure to Server-Side Request Forgery (SSRF):
1. **Protocol:** HTTPS only; HTTP rejected.
2. **DNS Resolution & IP Filtering:** Resolve destination IP before connecting; block RFC 1918 private subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), loopback (`127.0.0.0/8`), link-local (`169.254.0.0/16`), and cloud metadata IP (`169.254.169.254`).
3. **Redirect Protection:** Inspect each HTTP redirect destination through the same DNS and IP blocklist checks; cap redirects at 3.
4. **Limits & Fallback:** Enforce max 20MB per image, 30s timeout, and maximum 40 photos per vehicle. If external image URLs are blocked, provide a **ZIP Archive Upload** fallback where photo files named `{stock_number}_{order}.jpg` are mapped directly to rows.

### 4.5 Public Form Security Pipeline (`CRM-01`)
Every public buyer submission (General Enquiry, Finance Request, Trade-In, WhatsApp logging, Test Drive Booking) passes sequentially through:
1. **Client & Server Zod Validation:** Strict data typing and HTML sanitisation.
2. **Honeypot Field:** Hidden form input; if populated, silently drops submission with a simulated 200 OK.
3. **Cloudflare Turnstile Verification:** Cryptographic captcha token verified server-side.
4. **Upstash Redis Rate Limiting:** Keyed by `tenant_id:ip` (max 5 submissions / hour) and `tenant_id:email_hmac` (max 3 submissions / 10 minutes).
5. **Idempotent Ingestion:** Generates a deterministic hash of `(dealership_id, email, phone, vehicle_id, date_bucket)`. Repeated submissions within 10 minutes update the existing lead timeline rather than creating duplicate spam records.
6. **Zero Direct DB Anon Writes:** Form submissions invoke a trusted Server Action executing a restricted server-side transaction.

---

## 5. Domain Model & Database Schema

### 5.1 Day-One Core Tables

```
PLATFORM & TENANCY:
  ├── dealerships                  (Tenancy root, business details, ABN, settings)
  ├── branches                     (Locations, addresses, state jurisdictions)
  ├── dealer_licenses              (State motor dealer licences, LMCT numbers, expiry)
  ├── memberships                  (User-to-dealership mapping, role, status)
  ├── membership_branch_access     (Granular staff branch assignment)
  ├── invitations                  (Expiring, single-use email invites)
  ├── dealership_domains           (Custom domains, subdomains, SSL status)
  └── platform_admins              (Audited platform super-admins)

INVENTORY:
  ├── vehicles                     (Core vehicle specs, total drive-away price, status)
  ├── vehicle_private              (Internal vehicle financial data, cost, margin)
  └── vehicle_media                (R2 storage keys, sort order, alt text, public flag)

CRM & CONVERSION:
  ├── inquiries                    (Immutable raw inbound event payload)
  ├── customers                    (Normalised, deduped contact entity)
  ├── leads                        (Actionable sales record, pipeline stage, assigned staff)
  ├── lead_activities             (Notes, status changes, email logs, WhatsApp clicks)
  ├── lead_tasks                   (Follow-up reminders, due dates, assignees)
  └── trade_in_requests            (Appraisal data: rego, km, condition, vehicle of interest)

BILLING & COMPLIANCE:
  ├── subscriptions                (Stripe subscription status, plan tier, vehicle limits)
  ├── billing_webhook_events       (Idempotent Stripe webhook log)
  ├── compliance_rule_versions     (Effective-dated statutory rules, sources, verifications)
  └── audit_logs                   (Immutable system security & change ledger)
```

### 5.2 Key Column Definitions

#### `dealerships`
- `id`: `uuid primary key default gen_random_uuid()`
- `name`: `text not null` (e.g. "Peninsula Motor Group")
- `legal_entity_name`: `text not null` (e.g. "Peninsula Motors Pty Ltd")
- `abn`: `varchar(11) not null` (Validated Australian Business Number)
- `slug`: `varchar(63) not null unique` (Used for platform subdomains)
- `subscription_status`: `text not null default 'trialing'` (`trialing`, `active`, `past_due`, `canceled`)
- `primary_domain`: `text` (e.g. "peninsulamotors.com.au")
- `phone`: `text not null`
- `email`: `text not null`
- `whatsapp_number`: `text` (E.164 formatted Australian mobile, e.g. "+61412345678")
- `created_at`: `timestamptz not null default now()`

#### `vehicles`
- `id`: `uuid primary key default gen_random_uuid()`
- `dealership_id`: `uuid not null references dealerships(id) on delete cascade`
- `branch_id`: `uuid not null`
- `vin`: `varchar(17) not null`
- `stock_number`: `text not null`
- `make`: `text not null`
- `model`: `text not null`
- `year`: `smallint not null`
- `variant`: `text`
- `body_type`: `text not null` (`sedan`, `suv`, `hatch`, `ute`, `wagon`, `coupe`, `convertible`, `van`)
- `transmission`: `text not null` (`automatic`, `manual`)
- `fuel_type`: `text not null` (`petrol`, `diesel`, `hybrid`, `electric`)
- `odometer_km`: `integer not null check (odometer_km >= 0)`
- `total_price_cents`: `bigint not null check (total_price_cents >= 0)` (Single total drive-away price)
- `egc_price_cents`: `bigint check (egc_price_cents is null or egc_price_cents <= total_price_cents)`
- `publication_status`: `text not null default 'draft'` (`draft`, `published`, `archived`)
- `availability`: `text not null default 'in_stock'` (`in_stock`, `in_transit`, `under_offer`, `sold`)
- `slug`: `text not null` (e.g. "2019-toyota-rav4-gxl-awd-1042")
- `features`: `jsonb not null default '[]'::jsonb` (Categorised specs)
- `imperfections`: `jsonb not null default '[]'::jsonb` (Disclosed blemishes/scratches)
- `public_description`: `text`
- `ppsr_checked_at`: `date`
- `ppsr_status`: `text` (`clear`, `interest_registered`, `not_checked`)
- `statutory_warranty_class`: `text` (`nsw_standard`, `vic_standard`, `qld_class_a`, `qld_class_b`, `unwarranted`)
- `niche_attributes`: `jsonb not null default '{}'::jsonb` (Optional JDM/import data: auction grade, etc.)
- `published_at`: `timestamptz`

#### `vehicle_private` (Field-Level Protected Financials)
- `vehicle_id`: `uuid primary key references vehicles(id) on delete cascade`
- `dealership_id`: `uuid not null references dealerships(id) on delete cascade`
- `purchase_price_cents`: `bigint check (purchase_price_cents >= 0)`
- `reconditioning_cost_cents`: `bigint default 0 check (reconditioning_cost_cents >= 0)`
- `other_costs_cents`: `bigint default 0`
- `target_margin_cents`: `bigint`
- `internal_notes`: `text`
- `ppsr_certificate_storage_key`: `text` (Private R2 key)

---

## 6. SQL Foundation & Security Policies

```sql
-- 1. EXTENSIONS & SCHEMAS
create extension if not exists "pgcrypto";
create schema if not exists private;

-- 2. INTEGRITY & COMPOSITE CONSTRAINTS
alter table branches add constraint branches_tenant_uq unique (dealership_id, id);
alter table vehicles add constraint vehicles_tenant_uq unique (dealership_id, id);
alter table vehicles add constraint vehicles_branch_fk 
  foreign key (dealership_id, branch_id) references branches (dealership_id, id);
alter table vehicle_media add constraint media_vehicle_fk 
  foreign key (dealership_id, vehicle_id) references vehicles (dealership_id, id) on delete cascade;
alter table vehicle_private add constraint private_vehicle_fk 
  foreign key (dealership_id, vehicle_id) references vehicles (dealership_id, id) on delete cascade;

create unique index vehicles_dealership_vin_uq on vehicles (dealership_id, vin);
create unique index vehicles_dealership_stock_uq on vehicles (dealership_id, stock_number);
create unique index vehicles_dealership_slug_uq on vehicles (dealership_id, slug);

-- 3. ISOLATION HELPER FUNCTIONS (Private Schema, Fixed search_path)
create or replace function private.has_role(p_dealership uuid, p_roles text[])
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.memberships m
    where m.user_id = (select auth.uid()) 
      and m.dealership_id = p_dealership
      and m.status = 'active' 
      and m.role = any (p_roles)
  );
$$;

create or replace function private.can_access_branch(p_dealership uuid, p_branch uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.memberships m
    where m.user_id = (select auth.uid()) 
      and m.dealership_id = p_dealership
      and m.status = 'active'
      and (
        m.all_branches = true 
        or exists (
          select 1 from public.membership_branch_access b
          where b.user_id = m.user_id 
            and b.dealership_id = m.dealership_id
            and b.branch_id = p_branch
        )
      )
  );
$$;

revoke all on function private.has_role(uuid, text[]) from public;
revoke all on function private.can_access_branch(uuid, uuid) from public;
grant execute on function private.has_role(uuid, text[]) to authenticated;
grant execute on function private.can_access_branch(uuid, uuid) to authenticated;

-- 4. ROW LEVEL SECURITY (Base Tables)
alter table vehicles enable row level security;
alter table vehicles force row level security;
revoke all on vehicles from anon, public;

create policy vehicles_select_staff on vehicles for select to authenticated
  using (private.can_access_branch(dealership_id, branch_id));

create policy vehicles_insert_staff on vehicles for insert to authenticated
  with check (
    private.has_role(dealership_id, array['owner','admin','manager','sales'])
    and private.can_access_branch(dealership_id, branch_id)
  );

create policy vehicles_update_staff on vehicles for update to authenticated
  using (
    private.has_role(dealership_id, array['owner','admin','manager','sales'])
    and private.can_access_branch(dealership_id, branch_id)
  )
  with check (
    private.has_role(dealership_id, array['owner','admin','manager','sales'])
    and private.can_access_branch(dealership_id, branch_id)
  );

create policy vehicles_delete_staff on vehicles for delete to authenticated
  using (
    private.has_role(dealership_id, array['owner','admin'])
    and private.can_access_branch(dealership_id, branch_id)
  );

-- 5. FIELD-LEVEL SENSITIVE TABLE (vehicle_private)
alter table vehicle_private enable row level security;
alter table vehicle_private force row level security;
revoke all on vehicle_private from anon, public;

create policy vehicle_private_staff on vehicle_private for all to authenticated
  using (private.has_role(dealership_id, array['owner','admin','manager']))
  with check (private.has_role(dealership_id, array['owner','admin','manager']));

-- 6. PUBLIC STOREFRONT SECURITY-DEFINER PROJECTIONS
create or replace function private.resolve_host(p_host text) 
returns uuid language sql stable security definer set search_path = '' as $$
  select dm.dealership_id
  from public.dealership_domains dm
  join public.dealerships d on d.id = dm.dealership_id
  where dm.hostname = rtrim(regexp_replace(lower(btrim(p_host)), ':[0-9]+$', ''), '.')
    and dm.status = 'active'
    and d.subscription_status in ('trialing','active','past_due')
  limit 1;
$$;
revoke all on function private.resolve_host(text) from public;

-- Public Storefront Config
create or replace function public.public_storefront_config(p_host text) 
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'name', d.name,
    'legal_name', d.legal_entity_name,
    'abn', d.abn,
    'phone', d.phone,
    'email', d.email,
    'whatsapp_number', d.whatsapp_number,
    'branches', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'id', b.id, 'name', b.name, 'address', b.address, 'state', b.state, 'phone', b.phone
      )), '[]'::jsonb)
      from public.branches b where b.dealership_id = d.id
    ),
    'licences', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'type', l.licence_type, 'number', l.licence_number, 'jurisdiction', l.jurisdiction
      )), '[]'::jsonb)
      from public.dealer_licenses l where l.dealership_id = d.id and l.status = 'active'
    )
  )
  from public.dealerships d
  where d.id = private.resolve_host(p_host);
$$;

-- Public Filtered Vehicle Catalog Listing
create or replace function public.public_vehicles(
  p_host text,
  p_make text default null,
  p_model text default null,
  p_min_price bigint default null,
  p_max_price bigint default null,
  p_body text default null,
  p_transmission text default null,
  p_branch uuid default null,
  p_sort text default 'newest',
  p_limit int default 24,
  p_offset int default 0
)
returns table (
  id uuid, slug text, make text, model text, year smallint, variant text,
  total_price_cents bigint, egc_price_cents bigint, odometer_km integer,
  body_type text, transmission text, cover_image_key text, published_at timestamptz
) language sql stable security definer set search_path = '' as $$
  select 
    v.id, v.slug, v.make, v.model, v.year, v.variant,
    v.total_price_cents, v.egc_price_cents, v.odometer_km,
    v.body_type, v.transmission,
    (select m.storage_key from public.vehicle_media m 
     where m.vehicle_id = v.id and m.is_public = true order by m.sort_order limit 1) as cover_image_key,
    v.published_at
  from public.vehicles v
  where v.dealership_id = private.resolve_host(p_host)
    and v.publication_status = 'published'
    and (p_make is null or v.make = p_make)
    and (p_model is null or v.model = p_model)
    and (p_min_price is null or v.total_price_cents >= p_min_price)
    and (p_max_price is null or v.total_price_cents <= p_max_price)
    and (p_body is null or v.body_type = p_body)
    and (p_transmission is null or v.transmission = p_transmission)
    and (p_branch is null or v.branch_id = p_branch)
  order by
    case when p_sort = 'price_asc'  then v.total_price_cents end asc nulls last,
    case when p_sort = 'price_desc' then v.total_price_cents end desc nulls last,
    case when p_sort = 'km_asc'     then v.odometer_km end asc nulls last,
    v.published_at desc, v.id
  limit least(greatest(p_limit, 1), 50)
  offset least(greatest(p_offset, 0), 500);
$$;

-- Public Vehicle Detail Page (VDP) by Slug
create or replace function public.public_vehicle_by_slug(p_host text, p_slug text) 
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'id', v.id,
    'slug', v.slug,
    'stock_number', v.stock_number,
    'vin', v.vin,
    'make', v.make,
    'model', v.model,
    'year', v.year,
    'variant', v.variant,
    'body_type', v.body_type,
    'transmission', v.transmission,
    'fuel_type', v.fuel_type,
    'odometer_km', v.odometer_km,
    'price', jsonb_build_object(
      'total_drive_away_cents', v.total_price_cents,
      'egc_cents', v.egc_price_cents
    ),
    'description', v.public_description,
    'features', v.features,
    'imperfections', v.imperfections,
    'availability', v.availability,
    'ppsr_summary', jsonb_build_object(
      'status', v.ppsr_status,
      'checked_at', v.ppsr_checked_at
    ),
    'statutory_warranty_class', v.statutory_warranty_class,
    'branch', (
      select jsonb_build_object('name', b.name, 'address', b.address, 'state', b.state, 'phone', b.phone)
      from public.branches b where b.id = v.branch_id
    ),
    'media', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'storage_key', m.storage_key, 'alt_text', m.alt_text
      ) order by m.sort_order), '[]'::jsonb)
      from public.vehicle_media m 
      where m.vehicle_id = v.id and m.is_public = true
    )
  )
  from public.vehicles v
  where v.dealership_id = private.resolve_host(p_host)
    and v.slug = p_slug
    and v.publication_status = 'published';
$$;

revoke all on function public.public_storefront_config(text) from public;
revoke all on function public.public_vehicles(text,text,text,bigint,bigint,text,text,uuid,text,int,int) from public;
revoke all on function public.public_vehicle_by_slug(text,text) from public;

grant execute on function public.public_storefront_config(text) to anon, authenticated;
grant execute on function public.public_vehicles(text,text,text,bigint,bigint,text,text,uuid,text,int,int) to anon, authenticated;
grant execute on function public.public_vehicle_by_slug(text,text) to anon, authenticated;

-- 7. APPEND-ONLY AUDIT LOG TRIGGER
create or replace function private.audit_immutable_trigger() 
returns trigger language plpgsql as $$
begin
  raise exception 'audit_logs entries are immutable and cannot be updated or deleted';
end;
$$;

create trigger audit_immutable before update or delete on public.audit_logs
  for each row execute function private.audit_immutable_trigger();
```

---

## 7. Security Architecture & Threat Defences

| Threat Vector | Mitigation Strategy | Verification / Test |
|---|---|---|
| **Cross-Tenant IDOR / Data Bleed** | RLS enforced on all tables; composite primary/foreign keys (`dealership_id`, `id`); DAL session assertion; zero anon base-table access. | pgTAP automated suite verifying Tenant A token receives 0 rows when requesting Tenant B data. |
| **Sales Role Privilege Escalation** | Sensitive financial data stored in `vehicle_private`; policy permits only `owner`, `admin`, `manager`. | Automated API test verifying `sales` JWT returns 403 / empty row for purchase costs and margins. |
| **Public Storefront Data Scraping / Leak** | Reads execute through security-definer allowlist RPCs taking `host` header. Host is resolved inside database to active subscribed tenant. | Integration test ensuring unapproved columns (purchase price, notes, PII) are physically omitted from JSON. |
| **Host Header Tampering & Takeover** | Host string strictly sanitised (lowercased, port stripped); checked against verified `dealership_domains`. | Test verifying fake `X-Forwarded-Host` or spoofed domains return null config and 404. |
| **SSRF in CSV Image Import** | Outbound HTTP requests blocked from private IP ranges (RFC 1918), loopback, link-local, and cloud metadata (169.254.169.254). Cap redirects at 3. | Test passing `http://169.254.169.254/latest/meta-data/` is blocked before TCP connection is opened. |
| **Public Lead Form Abuse & Denial of Service** | Zod typing, hidden honeypot field, Cloudflare Turnstile token verification, Upstash Redis rate-limiting (IP + email HMAC). | Load test verifying >5 form submissions/hour triggers HTTP 429 without hitting database. |
| **R2 Storage Exhaustion / Bombs** | Server-signed presigned URLs strictly scoped to UUID keys with 120s TTL; enforce 15MB limit, valid WebP/JPEG magic bytes, and image dimension caps. | Test uploading 100MB payload or corrupted header fails with signature mismatch or processing error. |

---

## 8. Australian Compliance Baseline

### 8.1 ACL Single Price Rule (Competition and Consumer Act 2010, s 48)
- **Headline Price Rule:** When advertising a price to consumers, if component pricing is shown, the single total drive-away price must be displayed as a single figure and at least as prominently as any component price.
- **Platform Implementation:** The storefront hero price is strictly `total_price_cents`. If a dealer specifies an `egc_price_cents` (Excluding Government Charges), it is displayed in smaller, secondary font labelled: *"Excl. Govt. Charges (indicative only for commercial/interstate buyers)"*. Listings cannot be published without a valid total price.

### 8.2 State Motor Dealer Licensing & Display Rules
1. **New South Wales (NSW):**
   - Motor Dealers and Repairers Act 2013 / Regulation 2025.
   - Dealers selling online must operate under an Australian `.au` domain, display licence number (`MD {number}`) on all pages, provide 20 business days' advance notice to NSW Fair Trading, and make dealer notices (Form 5) accessible per vehicle.
   - Statutory Warranty: 3 months / 5,000 km for vehicles <10 years old and <160,000 km.
2. **Victoria (VIC):**
   - Motor Car Traders Act 1986.
   - **Consignment Sales are strictly illegal in Victoria** (100 penalty units). Platform blocks consignment flags for VIC branches.
   - Advertisements must prominently show `LMCT {number}` and registration number (or VIN if unregistered).
   - Statutory Warranty: 3 months / 5,000 km for vehicles <10 years old and <160,000 km. Cooling-off: 3 clear business days.
3. **Queensland (QLD):**
   - Motor Dealers and Chattel Auctioneers Act 2014.
   - **Two-Tier Statutory Warranty:**
     - **Class A:** Vehicles <= 10 years old and < 160,000 km → 3 months or 5,000 km.
     - **Class B:** Vehicles > 10 years old or >= 160,000 km → 1 month or 1,000 km.
     - Unwarranted vehicles (commercial, statutory write-offs, older vehicles) must display mandatory copy: *"No statutory warranty applies to this vehicle"*.
   - Consignment listings must explicitly state: *"No cooling-off period applies"*.
   - Transactions Register must record odometer readings in **both words and figures** within 24 hours of acquisition.

### 8.3 PPSR & History Statements
- Storefront displays summary badges: *"PPSR search completed on {date} - No written-off or security interests recorded"*.
- **Forbidden Copy:** Never output *"Guaranteed Clear Title"* or *"PPSR Certified"*. The platform stores third-party report dates; statutory title guarantees remain the dealer's responsibility.

### 8.4 Privacy Act 1988 (APPs) & Overseas Disclosure (APP 8)
- Even if a small dealership qualifies for the $3M turnover exemption, the platform implements Australian Privacy Principle (APP) compliance by design.
- **APP 8 Disclosure:** Storefront Privacy Policies and lead collection notices explicitly notify consumers that customer contact details and enquiry data may be processed on secure cloud infrastructure located in Australia (Sydney) and accessed for technical support and maintenance by authorised engineering teams in Pakistan.

---

## 9. Payments, Billing & Subscription Entitlements

### 9.1 Corporate Structure & GST Handling
- Platform operates commercially through an Australian Proprietary Limited company (`Pty Ltd`) with an Australian resident director and active ABN.
- All SaaS subscription fees are billed in Australian Dollars (AUD) via **Stripe Australia**.
- Invoices are compliant Australian **Tax Invoices** detailing the platform's ABN, 10% GST component, customer dealership details, and transaction dates. Dealers claim full GST input tax credits on quarterly BAS statements.

### 9.2 Subscription Pricing Model (Benchmark-Aligned)

```
PRICING TIERS (AUD / Month, excl. GST):
  ├── Starter Plan (YardStack / MotorDesk Benchmark)
  │     ├── A$199 / month (Up to 25 active vehicles)
  │     └── Unlimited users, custom domain, branded storefront, CRM, WhatsApp CTA
  ├── Growth Plan (Target ICP: 25–50 cars)
  │     ├── A$349 / month (Up to 50 active vehicles)
  │     └── Adds Facebook AIA feed, finance calculator, priority migration
  └── Scale Plan (50–100 cars)
        ├── A$549 / month (Up to 100 active vehicles)
        └── Multi-branch support, dedicated onboarding support
```
- **Fair Terms:** A$0 setup fee, 14-day cardless free trial, no lock-in contracts, cancel anytime with full CSV data export.

### 9.3 Entitlement Service
Centralised `EntitlementService` checks active limits before writes:
- `canPublishVehicle(dealershipId)`: Asserts current published vehicle count < plan limit.
- `canAddBranch(dealershipId)`: Enforces branch allocation per tier.
- If subscription lapses (`past_due` > 14 days or `canceled`), storefront listings are automatically unpublished, but staff retain read-only access to export data.

---

## 10. Operations, Quality Assurance & Definition of Done

### 10.1 Environments
- **Local:** Dockerised Postgres 16 (matching Supabase extensions), MinIO (S3 mock), local Stripe CLI.
- **Staging:** Isolated Supabase staging project, Cloudflare test zone, Stripe test mode with automated test clocks.
- **Production:** Supabase Pro with Point-In-Time-Recovery (PITR), production R2 bucket, Stripe live mode.

### 10.2 Automated Test Strategy
1. **pgTAP (Database & Isolation):**
   - Executes against fresh schema migrations.
   - Tests every table's RLS across all 5 roles (`owner` down to `sales`).
   - Verifies security-definer RPCs reject spoofed host headers and drop non-allowlisted columns.
2. **Vitest (Domain Logic & Security):**
   - Unit tests for Zod form validation, Turnstile verification, and Upstash rate-limit logic.
   - SSRF worker tests: Validates private/internal IP rejections and redirect loop termination.
   - CSV normalisation tests: Verifies vehicle data normalisation across diverse feed exports.
3. **Playwright (End-to-End Regression):**
   - Test Flow: Signup → Setup Dealership → CSV Import → Publish Vehicle → Visit Custom Domain → Submit Finance / WhatsApp Lead → Verify Lead in Admin CRM.

### 10.3 Definition of Done (DoD)
A feature branch may only merge to `main` when:
1. TypeScript strict type-check passes with zero errors (`tsc --noEmit`).
2. ESLint clean; zero linter warnings.
3. Automated test suite (pgTAP + Vitest) passes 100%.
4. Evidence logged in `docs/STATUS.md` referencing migration hash, test run date, and code commit.

---

## 11. Roadmap & Milestone Gates

```
PHASE 1: Foundation (Weeks 4–9)
  ├── Greenfield repo bootstrap (Next.js 15 App Router, TypeScript strict, Tailwind)
  ├── Supabase PostgreSQL 16 schema + pgTAP test suite
  ├── Cloudflare R2 media upload pipeline (presigned WebP + metadata stripping)
  ├── Edge host routing & domain lifecycle manager
  └── EXIT GATE: 2 simulated tenants pass cross-tenant data bleed and security tests.

PHASE 2: Commercial MVP (Weeks 10–19)
  ├── Inventory management CRUD & status lifecycle
  ├── SSRF-safe CSV stock & photo re-hosting worker
  ├── High-performance branded storefront (VDP, filters, SEO structured data)
  ├── Conversion tools: Finance Repayment Calculator + WhatsApp deep-link
  ├── CRM pipeline: Inquiries → Customers → Leads with activity logging
  ├── Stripe Australia subscription billing & GST tax invoicing
  └── EXIT GATE: End-to-end dry run: import 50 vehicles, publish, enquire, track lead.

PHASE 3: Pilot Onboarding (Weeks 20–24)
  ├── Onboard first 3–5 independent Australian dealers (recruited via DISCOVERY_KIT.md)
  ├── Assisted stock migration from EasyCars / Virtual Yard / spreadsheets
  ├── Custom domain DNS cutover (.com.au)
  └── EXIT GATE: 3+ independent dealers operating live and managing daily leads.

PHASE 4: Scale & Expansion (Post-Launch)
  ├── Facebook AIA catalog feed automation
  ├── State compliance forms & electronic dealings books (NSW Form 1, VIC Form 2)
  ├── Austroads / PPSR direct broker integration
  └── Xero / MYOB two-way accounting integration
```

---

## 12. Architecture Decision Records (ADRs)

| ADR ID | Decision Summary | Status | Rationale |
|---|---|---|---|
| **ADR-01** | Multi-tenant single database with `dealership_id` and RLS | ✅ Decided | High developer velocity, cost efficiency, and automated tenant isolation. |
| **ADR-02** | Branch & licence scoping model | ✅ Decided | Required for multi-location dealerships and state licence disclosures. |
| **ADR-03** | Per-operation RLS policies with private helper functions | ✅ Decided | Eliminates redundant RLS subqueries; clean role segregation. |
| **ADR-04** | PPSR manual summary in MVP; broker API in Phase 4 | ✅ Decided | Avoids prepaid wallet complexity; dealer attaches date of check. |
| **ADR-05** | Online customer deposits disabled in MVP (`ENABLE_HOLDING_DEPOSITS = false`) | ✅ Decided | Eliminates NSW 10% statutory deposit caps and trust account liability. |
| **ADR-06** | No "zero liability" or compliance guarantee marketing claims | ✅ Decided | Platform provides software tools; statutory dealer duties remain with dealer. |
| **ADR-07** | Stripe Billing on platform Australian entity | ✅ Decided | Clean domestic B2B SaaS billing with 10% GST tax invoices. |
| **ADR-09** | Next.js 15+ App Router under continuous security patch policy | ✅ Decided | Modern SSR performance, streaming, and edge middleware routing. |
| **ADR-10** | Middleware handles routing only; authz enforced in DAL & RLS | ✅ Decided | Edge middleware cannot be bypassed to access protected backend data. |
| **ADR-11** | Tenant-explicit caching with cache tag invalidation | ✅ Decided | Eliminates cross-tenant data caching risks. |
| **ADR-12** | Reserved subdomain validation via database trigger | ✅ Decided | Prevents tenant hijacking of `app`, `api`, `admin`, `www`. |
| **ADR-15** | Facebook AIA catalog feed prioritised over bilateral portal feeds | ✅ Decided | Facebook feed requires no bilateral commercial approval; high ROI for dealers. |
| **ADR-17** | Stack: Next.js + Supabase + Cloudflare R2 + Upstash + Stripe AU | ✅ Decided | Optimal cost-to-performance ratio for image-heavy automotive platforms. |
| **ADR-19** | Australian Pty Ltd operating entity with resident director | ✅ Decided | Unlocks auDA `.com.au`, Stripe AU, domestic banking, and dealer trust. |
| **ADR-21** | **100% Greenfield Build; Southern Auto test project dropped** | ✅ Decided | Eliminates legacy single-tenant test baggage; pristine greenfield repo. |
| **ADR-23** | Strict separation: `inquiry` (event) vs `customer` (PII) vs `lead` (sales) | ✅ Decided | Clean CRM data architecture; supports idempotent public form processing. |
| **ADR-25** | Public storefront reads exclusively via security-definer allowlist RPCs | ✅ Decided | Zero anon access to base tables; complete protection against column leaks. |
| **ADR-26** | Vehicle financials segregated in `vehicle_private` table | ✅ Decided | Field-level RLS isolation; sales staff cannot view vehicle costs/margins. |
| **ADR-30** | Corporate governance under Australian Corporations Act 2001 | ✅ Decided | Compliance with s 201A resident director rules via Australian co-founder. |
| **ADR-31** | Full public RPC set taking `host` string, never tenant ID | ✅ Decided | Host is resolved internally in Postgres; prevents client tenant ID spoofing. |
| **ADR-32** | Single total drive-away price headline; EGC price secondary | ✅ Decided | Mandatory compliance with ACL s 48 single pricing provisions. |
| **ADR-33** | SSRF-safe CSV photo re-hosting pipeline with ZIP fallback | ✅ Decided | Allows fast photo migration without exposing private infrastructure. |
| **ADR-34** | Public trade-in uploads restricted to private prefix & short presign | ✅ Decided | Protects customer number plates and vehicle appraisal photos from public CDN. |
| **ADR-36** | Explicit public form pipeline (Zod, honeypot, Turnstile, Upstash, dedupe) | ✅ Decided | Multi-layer defence against spam and bot submissions. |
| **ADR-37** | Apex / www canonical permanent redirect enforcement (308) | ✅ Decided | Prevents SEO duplication and ensures consistent SSL certificate binding. |
| **ADR-38** | Active dealership validated in DAL session; UI switcher hidden for single-org | ✅ Decided | High security isolation in backend; clean, distraction-free UX in frontend. |

---

## 13. Risk Management & Mitigations

| Risk | Severity | Mitigation Strategy |
|---|---|---|
| **Cross-Tenant Data Leak** | 🔴 Critical | Comprehensive RLS, composite foreign keys, security-definer allowlist RPCs, automated pgTAP regression tests in CI. |
| **Misleading Price Claims (ACL s 48)** | 🔴 Critical | Enforce `total_price_cents` as mandatory headline price; disclaim all calculator outputs as *"indicative only"*. |
| **Offline Dealer Outreach / Spam Penalties** | 🟠 High | Strict compliance with Australian Spam Act 2003 (accurate sender identity, opt-out link, research intent, no false headers). |
| **CSV Migration Failures / Image Timeouts** | 🟠 High | Dry-run validation with row-level error reporting; SSRF-protected background queue with ZIP upload fallback. |
| **Portal Integration Roadblocks** | 🟡 Medium | Avoid relying on Carsales/Nexgate APIs for MVP; lead with fast owned websites, CSV import, and Facebook Catalog feeds. |
| **Offshore Vendor Perception** | 🟡 Medium | Fronted by Australian Pty Ltd with Australian resident director, Australian ABN, Sydney hosting, and local Australian phone support. |

---

## 14. Open Decisions

1. **Brand Name & Domain Selection:** Finalise working commercial brand name (e.g. `ApexAutos.com.au`, `YardOS.com.au`, `DealerFlow.com.au`) and register `.com.au` via cousin's ABN.
2. **First 3–5 Pilot Dealer Recruitment:** Execute outreach using [DISCOVERY_KIT.md](file:///e:/Product%20Development/Autos/research/DISCOVERY_KIT.md) to secure design partners in NSW, VIC, or QLD.
3. **Exact Tier Thresholds:** Validate whether dealers prefer flat tiers (e.g. A$199 / A$349 / A$549) vs pure per-car billing (A$8/car/mo) during pilot interviews.

---

## 15. `docs/STATUS.md` Tracking Template

```markdown
# Implementation Evidence & Status Matrix

| ID | Requirement | Spec Section | Status | Verification Evidence (PR / Commit / Test) | Date |
|---|---|---|---|---|---|
| FND-01 | Fresh Greenfield Repo Bootstrap | §11 Phase 1 | planned | | |
| FND-02 | Supabase Schema & Composite FKs | §5, §6 | planned | | |
| FND-03 | pgTAP Isolation & Role Test Suite | §6, §10 | planned | | |
| FND-04 | Security-Definer Public RPC Set | §4.2, §6 | planned | | |
| FND-05 | Cloudflare R2 Upload Pipeline | §4.3 | planned | | |
| FND-06 | Host Resolution & Canonical Redirect | §4.1 | planned | | |
| FND-07 | Public Form Security Pipeline | §4.5 | planned | | |
| MVP-01 | Vehicle CRUD & Status Lifecycle | §2.4, §5.2 | planned | | |
| MVP-02 | SSRF-Safe CSV & Photo Import Worker | §4.4 | planned | | |
| MVP-03 | Next.js Storefront & VDP Catalog | §2.4, §4.2 | planned | | |
| MVP-04 | Interactive Finance Repayment Calculator | §2.4 | planned | | |
| MVP-05 | WhatsApp Click-to-Chat Deep-Link | §2.4 | planned | | |
| MVP-06 | Inbound Lead Management & CRM Kanban | §2.4, §5.1 | planned | | |
| MVP-07 | Stripe AU Billing & Tax Invoices | §9 | planned | | |
| MVP-08 | Automated Playwright End-to-End Suite | §10.2 | planned | | |
```

---

## 16. Instructions for AI Coding Agents (`AGENTS.md`)

```markdown
# Project: Australian Used-Car Dealership Multi-Tenant SaaS
Strictly adhere to MASTER_SPEC_V2_3.md. Never invent architectural patterns, change ADRs, or introduce bypasses.

1. GREENFIELD RULES:
   - This is a 100% greenfield build. Do NOT copy-paste code from legacy single-tenant test projects.
   - All migrations, schemas, server actions, and components must be written fresh for multi-tenancy.

2. TENANCY & ISOLATION INVARIANTS:
   - Every tenant table MUST have `dealership_id` and enforce RLS.
   - Tables with branch ownership MUST include `branch_id` and validate via `private.can_access_branch()`.
   - Never trust client-supplied tenant IDs or role claims. All tenancy context derives from verified auth sessions or database host resolution.
   - Base tables have ZERO anon permissions (`revoke all on {table} from anon, public`). Public storefront queries MUST use `public.public_*` security-definer RPCs.
   - Segregate vehicle cost and margin data into `vehicle_private`; never expose financial columns in general vehicle queries.

3. PRICING & COMPLIANCE:
   - Always treat `total_price_cents` as the primary headline price under ACL s 48. Never display an EGC price more prominently.
   - Calculator tools MUST include strict "indicative estimate only" disclaimers.

4. STORAGE & NETWORKING:
   - Server-construct R2 keys (`dealerships/{id}/vehicles/{id}/{uuid}.webp`).
   - Image re-hosting workers MUST apply strict SSRF IP filters before connecting to external URLs.
   - Public buyer form submissions must pass Zod validation, honeypot checks, Turnstile, and Upstash rate-limiting. Direct anon database writes are strictly prohibited.

5. VERIFICATION:
   - Every feature must be accompanied by appropriate automated tests (pgTAP for database logic/RLS, Vitest for server actions, Playwright for end-to-end flows).
   - Log completion evidence in docs/STATUS.md.
```

---

## 17. Immediate Action Checklist

### Week 1 (Immediate Next Steps)
- [ ] Confirm commercial brand name with Australian co-founder (e.g. `ApexAutos.com.au` or similar).
- [ ] Register primary `.com.au` domain using cousin's company ABN.
- [ ] Set up Stripe Australia account under cousin's Pty Ltd and generate test API keys.
- [ ] Initialize fresh Git repository (`main` branch) with `MASTER_SPEC_V2_3.md`, `AGENTS.md`, and `docs/STATUS.md`.
- [ ] Provision greenfield Supabase project (Sydney `ap-southeast-2` region) and Cloudflare R2 bucket.
- [ ] Begin dealer discovery outreach using templates in [DISCOVERY_KIT.md](file:///e:/Product%20Development/Autos/research/DISCOVERY_KIT.md).

---

## 18. Primary Legal & Regulatory Authorities

1. **Competition and Consumer Act 2010 (Cth) / Australian Consumer Law:**
   - Single Pricing provisions (s 48): [ACCC Pricing Guidance](https://www.accc.gov.au/by-industry/cars-and-vehicles)
2. **New South Wales Motor Dealing Laws:**
   - Motor Dealers and Repairers Act 2013 & Regulation 2025: [NSW Fair Trading Online Dealer Notice](https://www.nsw.gov.au/departments-and-agencies/fair-trading/news/changes-to-motor-dealer-and-repairers-laws)
3. **Victoria Motor Car Traders Laws:**
   - Motor Car Traders Act 1986: [Consumer Affairs Victoria Dealer Obligations](https://www.consumer.vic.gov.au/licensing-and-registration/motor-car-traders/running-your-business/obligations-used-car-sales)
   - Consignment Prohibition & Penalties: [CAV Penalties](https://www.consumer.vic.gov.au/licensing-and-registration/motor-car-traders/penalties)
4. **Queensland Motor Dealer Regulations:**
   - Motor Dealers and Chattel Auctioneers Act 2014 & Regulation 2014: [QLD Fair Trading Dealer Guarantees](https://www.qld.gov.au/community/fair-trading/regulated-industries-licensing-and-legislation/motor-industry-regulation/legal-requirements-motor-transaction/guarantees-and-warranties-for-second-hand-vehicles)
5. **Australian Privacy Principles (Privacy Act 1988):**
   - Cross-Border Disclosure of Personal Information (APP 8): [OAIC APP Guidelines](https://www.oaic.gov.au)
6. **Australian Spam Act 2003 (Cth):**
   - Commercial Electronic Messages: [ACMA Spam Rules](https://www.acma.gov.au/avoid-sending-spam)
