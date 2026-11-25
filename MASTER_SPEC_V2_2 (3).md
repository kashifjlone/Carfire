# Master Specification v2.2: Australian Used-Car Dealership Multi-Tenant SaaS

> **Status:** Draft for owner approval. Date: 9 November 2026.
> **What this is:** V2.1 (V2 + accepted ChatGPT V3 improvements) plus the accepted/modified gaps from Gemini's audit of V2.1 (see Sections 0 and 0.1). V3 remains a longer reference/"constitution"; this file is the **working build spec**.
> **What this is not:** legal, tax, accounting or financial advice. Australian company, motor-trade, privacy, tax, payments and domain-eligibility questions need qualified Australian advisers before launch.
>
> **Legend:** ✅ decided | 🟡 proposed | ❓ open | ⚠️ verify (legal/provider/version fact) | 🔴 blocker / high risk

---

## 0. What changed from V2 (and what was rejected from V3)

**Accepted from V3 and merged here:**
1. Public storefront reads go through a **host-resolved, allowlisted projection** (no broad anon policy on base tables). Fixes a real flaw in V2.
2. **Field-level permission** model (cost, private notes, customer exports) via separate tables + server rules, because RLS is row-level only.
3. **Enquiry vs customer vs lead** data model, with tasks and activity timeline (MVP CRM).
4. **NSW onboarding question split into 4 operating models**; no hard-coded legal rule until a lawyer confirms.
5. **Platform vs dealer responsibility boundary** and pilot agreement checklist.
6. **Tenant export / cancellation / retention** as P0 lifecycle workflows.
7. **Entity target:** Australian Pty Ltd planned (not yet incorporated); director eligibility reviewed by an adviser; payment activation gated on it.
8. **Versioned compliance rules** (effective dates, source, reviewer, status), launch-scope only.
9. **`docs/STATUS.md`** (planned / implemented / verified) so AI agents cannot claim "done" without evidence.
10. **Customer discovery** (5-10 dealer interviews) and **modular monolith** decision.

**Rejected / modified from V3:**
| V3 item | Decision here |
|---|---|
| "Greenfield, no live-site migration" (ADR-21) | Modified: **new multi-tenant foundation; proven components ported; the live Southern Auto site keeps running on a separate Hotfix track; it joins as Tenant #1 later by import, not by in-place migration** |
| No live-site hardening track | Restored (Track A) |
| ~35 day-one tables | Lean list (Section 5.1) |
| Heavy blueprint phase before any code | Compressed; foundation build runs parallel to interviews/company setup |
| 8-table compliance engine | `compliance_profiles` + `compliance_rule_versions` only until needed |
| ~2,000-line document | This file is deliberately shorter |

## 0.1 Changes in v2.2 (from Gemini's audit of v2.1)

| # | Gap | Resolution in this file |
|---|---|---|
| 1 | Public storefront RPC set incomplete | Full RPC set: config, listing with filters, VDP by slug (Sections 4.2, 6) |
| 2 | CSV photos not migrated | Photo re-hosting pipeline with **SSRF controls** + ZIP fallback (4.5.1) |
| 3 | Price type drive-away vs EGC | **Modified:** single total headline price; EGC only as a less-prominent component; lawyer to confirm (5.3, 6, 8.6) |
| 4 | Public trade-in photo upload | Separate private, Turnstile + rate-limited, scoped presign flow (4.5.2) |
| 5 | Southern Auto modules missing from schema | Fields added; **modules live in `tenant_modules`, not `theme_config`**; import/odometer data stored as evidence (5.3) |
| 6 | Lead security pipeline not explicit | Public form pipeline (4.8) |
| 7 | Apex vs www and redirects | Apex A/ALIAS rules and primary-host redirect (4.1) |
| 8 | Active tenant switcher | URL-scoped, membership-validated active dealership (4.9) |
| 9 | PPSR certificate public or not (new) | Not public by default; dealer-approved redacted copy or on request (4.2, 8.5) |
| 10 | GST / tax invoices for platform billing | Added to Section 9 |

---

## 1. Delivery Tracks (run in parallel)

| Track | Purpose | Timing |
|---|---|---|
| **A: Live-site hotfix** (Southern Auto as it runs today) | Remove legal/security risk on the existing site | This week; 1-3 days of work |
| **B: Business, legal, validation** | Company, adviser/lawyer, dealer interviews, pilot agreement | Starts now; runs through MVP |
| **C: Platform build** | New multi-tenant foundation → MVP | Starts now |

### 1.1 Track A: Hotfix checklist (existing site) ✅
1. Next.js on a **patched** release (floor currently 15.5.29 on the 15.x line; 16.4.5 on 16.x). Run `npm audit`. Govern by patch policy, not a fixed number.
2. PPSR badge data-driven (Section 8.5); remove "Guaranteed Clear Title".
3. Deposit feature OFF, **enforced server-side** (`ENABLE_HOLDING_DEPOSITS` server-only; public flag only hides UI). First list in-flight deposits and decide completion/refund.
4. `/warranty`: ACL consumer guarantees separated from state dealer warranties; official links; **human-entered** last-checked date.
5. Drive-away calculator: "indicative estimate only" disclaimer; fees from a sourced table.
6. `/api/r2-sign`: server-built keys, auth + role check, `image/webp`, signed `ContentLength`, expiry ≤ 120 s, `storage_key` stored.
7. If the NSW site takes online deposits/sales: check NSW online-dealer obligations (Section 8.3) with Fair Trading/lawyer.
8. **Price display:** the headline price must be the single total price; EGC/component prices never more prominent (Section 8.6). Check the live drive-away/EGC toggle default.
9. **Trade-in photo upload:** confirm private storage, Turnstile + rate limits, no public CDN exposure, retention (Section 4.5.2).

### 1.2 Realistic timeline (estimate, not commitment) 🟡
Assumes 1 experienced developer + AI coding agents, **full-time**:
- Foundation (tenancy, auth, RLS, domains, media): ~6-8 weeks
- MVP (inventory, CSV import, storefront, CRM basics, billing, super-admin): ~10-14 weeks
- **Pilot-ready: roughly 5-6 months.** Part-time: about double. Track B runs alongside.
Replace with real numbers after the first sprint's velocity.

---

## 2. Product

### 2.1 Vision ✅
B2B multi-tenant SaaS for independent Australian used-car dealers. Long-term: DMS + CRM + branded website + BI. Southern Auto Group is the pilot/design-partner candidate and eventual Tenant #1.

### 2.2 ICP (hypothesis, validate) ❓
Independent dealer, ~10-80 vehicles, 1-few branches, owner/manager available for assisted onboarding. Market claims (competitor pricing, per-lead costs, "outdated" systems) stay **unverified** and out of marketing until evidenced.

### 2.3 Customer discovery 🟡
Interview 5-10 dealers: current tools/costs, stock size, update frequency and formats, lead sources/volume, follow-up process, website/domain needs, feed needs, staff/branch rules, reporting, compliance workflow, willingness to pay, switching barriers. Keep a research log (date, role, consent, anonymised findings). PMF signals: time to first published vehicle, % imported rows needing manual fixes, weekly active dealers/staff, enquiries acted on, time to first response, retention, support hours per dealer, willingness to pay at renewal price.

### 2.4 Platform vs dealer responsibility ✅
The platform supplies software. The **dealer** is the seller, holds licences, makes vehicle claims and owns customer transactions. The product must: name the dealership as seller, show licence disclosures, distinguish dealer-entered vs provider-returned vs platform-estimated data, require dealer approval for regulated disclosures and material claims, and never imply it is the seller, financier, inspector or PPSR authority. Contract/UX wording must not claim to remove statutory duties.

### 2.5 Pilot agreement checklist
Onboarding/migration scope, data ownership and permitted processing, support channels, pricing/trial, feedback participation, references only with written permission, exit/export/deletion.

### 2.6 MVP scope
**P0 (first 5-10 dealers):**
- Tenant signup/onboarding, branches, licences, memberships, invitations, role + branch access
- Inventory CRUD, photos, VIN duplicate detection, publish/unpublish; **assisted CSV migration** (mapping, normalisation, dry-run, error report, import history, reconciliation) including **photo re-hosting** (URL fetch with SSRF controls, ZIP fallback)
- Branded storefront on platform subdomain with the full public RPC set (config, filtered listing, vehicle page); custom domains (apex/www, verification, SSL, primary redirects); SEO (metadata, canonical, sitemap, structured data); licence disclosures; single total price display; per-tenant modules
- CRM basics: enquiry capture → customer/lead (idempotent), statuses, notes/activity timeline, assignment/unassigned queue, follow-up tasks, email notifications, basic duplicate detection
- Trade-in request with private customer photo upload; explicit public form pipeline (Turnstile, honeypot, rate limits, dedupe)
- Admin portal with validated active-dealership switcher
- SaaS subscriptions (Stripe Billing, after entity/eligibility), GST tax invoices, plans/entitlements, webhooks, billing portal
- Super-admin console with audited impersonation
- **Tenant export, cancellation, retention workflows**
- Monitoring, PITR backups, restore drill, audit log
- Launch-scope compliance checks reviewed by a lawyer (incl. NSW online-dealer checks where applicable)

**P1:** assignment rules/round-robin, saved filters, acquisition + vehicle costs/gross profit (with completeness caveats), price/status history, ageing dashboard, test drives, notification centre, attribution, compliance recordbook, lawyer-approved disclosure PDFs, first validated feed (likely Facebook).

**P2:** PPSR/NEVDIS (provider/AFSA access verified), Xero/MYOB, SMS/WhatsApp (consent), AI listing text (human review), advanced portals (partner approval), deposits/payments, e-sign/contracts (legal sign-off), wholesale network.

**MVP non-goals:** holding customer deposits or sale proceeds; platform as dealer of record or marketplace; automated legal advice or compliance guarantees; unreviewed contracts/e-sign; unapproved PPSR/NEVDIS claims; accounting replacement; finance broking; unreviewed AI claims.

---

## 3. Roles, Permissions and Field-Level Access

Roles: `owner | admin | manager | sales | viewer`. Platform admins are separate (`platform_admins`). Users can be limited to branches.

| Operation | Owner | Admin | Manager | Sales | Viewer |
|---|---|---|---|---|---|
| View inventory (permitted branches) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Add/edit vehicles | ✅ | ✅ | ✅ | Limited | ❌ |
| Delete/archive vehicles | ✅ | ✅ | Archive | ❌ | ❌ |
| View leads | ✅ | ✅ | ✅ | Assigned/branch | ❌ |
| View costs/margins | ✅ | ✅ | ✅ | ❌ | ❌ |
| Export customer data | ✅ | ✅ | ❌ | ❌ | ❌ |
| Staff/invitations | ✅ | ✅ | ❌ | ❌ | ❌ |
| Billing, domains, settings | ✅ | Limited | ❌ | ❌ | ❌ |
| Audit log | ✅ | ✅ | ❌ | ❌ | ❌ |

**Field-level rule:** sensitive data lives in **separate tables** with their own stricter RLS (e.g., `vehicle_private` for private notes/internal cost, `vehicle_costs` later). Do not rely on hiding columns in the UI or on a single wide `vehicles` row.

**Membership invariants:** no self role change; no self-adding to another dealership; invitations expiring, single-use, issued by owner/admin only; last owner cannot be removed/demoted; revocation immediate; membership changes only through audited server functions (no direct client writes).

---

## 4. Architecture ✅

```
Visitors / Dealers / Platform admin
   │ Host: dealer.com.au | dealer.platform.com.au | app.platform.com.au
   ▼
Cloudflare (DNS/WAF) → Vercel (Next.js App Router)
   proxy/middleware: host → tenant (ROUTING ONLY)
   ▼
Tenant DAL (authn, role, branch, field rules, entitlements)
   ▼
Supabase Postgres (RLS + public projection RPC)   R2   Upstash   Brevo   Stripe
Jobs: imports, emails, webhooks, domain checks, media cleanup, exports, reconciliation
```
Modular monolith (no microservices without evidence). Next.js + Supabase + R2 + Upstash + Vercel.

### 4.1 Routing and domains
Host normalised (lowercase, IDN-safe, strip trailing dot), matched only against active mappings in `dealership_domains`; never trust `X-Forwarded-Host` blindly; exactly one tenant per host. Lifecycle: `pending_dns → verified → certificate_pending → active → disabled | failed`. TXT token + CNAME/ALIAS checks, periodic re-verification, cert health monitoring, removal on cancellation, re-verify before reassigning an old domain.

**Apex vs www and redirects:** most DNS setups cannot put a CNAME on the apex (root) domain. For `dealer.com.au` use the provider-documented apex method (A record(s) or ALIAS/ANAME, or move DNS to a provider that supports CNAME flattening, e.g. Cloudflare) and a CNAME for `www`. Verify the hosting provider's current apex targets at build time. Choose one **primary** hostname per tenant; every other verified hostname (apex vs www, platform subdomain) issues a permanent redirect (308, or 301 if preferred) to the primary, ideally at the edge, with matching `canonical` tags so search engines do not see duplicate content. HTTPS-only with HSTS. Test redirect loops and prefetch/`.rsc` behaviour. Vercel Domains API vs Cloudflare for SaaS: decide by cost, limits, failure modes, ops burden (❓).

### 4.2 Public storefront isolation ✅ (replaces V2's anon policy)
- `revoke all` on tenant base tables from `anon`.
- Public reads use a **security-definer RPC** that takes the host, resolves it to one active tenant **inside the database**, and returns an **allowlist** of columns for published vehicles only.
- Public fields: make, model, year, variant, advertised price, odometer, public description, approved images, public availability text, slug, approved disclosures. Never costs, staff notes, private docs, customer data, PPSR report contents or internal metadata.
- **Required public RPC set (all take the host, never a tenant ID):**
  - `public_storefront_config(host)`: name, logo, allowlisted theme keys, enabled modules, branches, active licence disclosures. Returns nothing for unknown hosts or non-active tenants.
  - `public_vehicles(host, filters, sort, limit, offset)`: make, model, price range, body type, transmission, branch, availability (in stock / in transit); typed parameters and whitelisted sort only (no dynamic SQL); maximum page size enforced.
  - `public_vehicle_by_slug(host, slug)`: published vehicle detail: approved media, features, video URL, imperfections, price display data, PPSR **summary** (outcome and checked date only).
  - Public writes are **server-side only** (Section 4.8); no anon table writes.
- **PPSR certificate rule:** the certificate PDF/report may contain personal or security-interest details, so it is **not public by default**. Per-tenant options (lawyer/pilot to decide): dealer-approved redacted public copy, or a "request certificate" flow that sends a short-lived signed link. Public pages show only the summary badge.
- Tests: host tampering, unknown domain, suspended tenant, cross-tenant slug collisions, cached responses.

### 4.3 Caching
Public key: `tenant_id + canonical_host + resource + content/theme version`; tags `tenant:{id}:vehicles|site|domain|theme`. Invalidate on publish/unpublish, edits, domain/theme/disclosure change, suspension. Private data: per-user or uncached; never PII/leads/costs in public cache. Tenant ID is an explicit argument of cached functions; do not mix `unstable_cache` and `"use cache"` for one function; test concurrent cold-cache fills across tenants.

### 4.4 Next.js versions ✅
Use a currently **patched stable** release (floor today: 15.5.29 / 16.4.5; verify at build). Proxy/middleware is routing only; authz in DAL, Server Actions, route handlers, RLS. Test prefetch/`.rsc` variants for auth bypass.

### 4.5 Media (R2)
Server-built keys: `dealerships/{dealership_id}/vehicles/{vehicle_id}/{uuid}.webp`; store `storage_key`. Validate auth/role/branch, vehicle in tenant, `image/webp`, signed `ContentLength`, short expiry. After upload: verify object, magic bytes, size/dimension limits, image-bomb protection, re-encode, strip EXIF/GPS, orphan cleanup, overwrite prevention. Atomic quota reservation + reconciliation. Video: separate pipeline. Serve via R2/Cloudflare loader (avoid Vercel image-optimisation cost).

#### 4.5.1 CSV photo re-hosting (import job)
Needed so dealers do not re-upload hundreds of photos. The worker fetches URLs taken from an uploaded file, so treat it as **SSRF-prone**:
- https only; resolve DNS and block private, loopback, link-local and cloud-metadata ranges; re-check after redirects (limit redirects) and guard against DNS rebinding.
- Hard limits: bytes, time, concurrency, images per vehicle, total per job; the tenant storage quota applies.
- Validate content (magic bytes, dimensions), re-encode to WebP, strip EXIF/GPS, store under `dealerships/{dealership_id}/vehicles/{vehicle_id}/{uuid}.webp`; record source URL and result per row in `import_rows`.
- Dealer attests the photos are theirs; no bulk scraping of portals (terms, hotlink protection, licensing). Expired/blocked URLs appear in the error report.
- **Fallback:** ZIP upload with files named by stock number/VIN mapped to rows.

#### 4.5.2 Trade-in photo uploads (public customers)
- Separate from the staff `/api/r2-sign` flow: Turnstile-verified and rate-limited (tenant + IP + email HMAC); presign issued only against a server-created trade-in draft (`trade_in_requests`), scoped to that draft, short TTL, max count and size; client WebP compression plus server verification and re-encode.
- Private prefix `dealerships/{dealership_id}/trade-ins/{trade_in_id}/{uuid}.webp`; **never** on the public CDN. Staff view photos through short-lived signed URLs.
- Photos can show number plates and personal details: retention schedule, deletion on request, tenant storage quota, caps on open drafts per IP.

### 4.6 Jobs
Imports, image processing, email retries, subscription reconciliation, domain checks, feeds, orphan cleanup, expiries, tenant exports. Each job: status, attempts, backoff, error, idempotency key.

### 4.7 Email
Per-tenant sending domain/verified sender (SPF/DKIM/DMARC); tenant in rate-limit keys; bounce/complaint handling; transactional vs marketing separated.

### 4.8 Public form pipeline (enquiries, trade-in, custom order)
Every public form passes, in order: (1) Zod validation and sanitisation (client and server); (2) honeypot field; (3) Cloudflare Turnstile verification (server-side); (4) Upstash rate limit keyed by `tenant_id + IP` and `tenant_id + email HMAC` (HMAC with a server secret, not a plain hash); (5) duplicate suppression (e.g., 10 minutes per tenant + contact + vehicle) using an idempotency key; (6) **no direct anon DB writes**: a Server Action calls a restricted server-side function that creates the inquiry/customer/lead. Failures are logged without PII; thresholds are configurable per plan.

### 4.9 Admin portal: active tenant switcher
Users can belong to several dealerships and branches. The **active dealership** is part of the URL (`/app/[dealershipSlug]/...`) and is validated against `memberships` on every request; a cookie may remember the last choice for UX but is never trusted. The DAL always filters by the validated active dealership (RLS alone would return rows from all of the user's tenants), and branch scope comes from `membership_branch_access`. Switching tenant clears tenant-scoped client caches. Platform admins use impersonation (read-only by default), not the switcher.

---

## 5. Domain Model

### 5.1 Lean day-one tables 🟡
**Platform/tenancy:** `dealerships`, `branches`, `dealer_licenses`, `memberships`, `membership_branch_access`, `invitations`, `platform_admins`, `impersonation_sessions`, `dealership_domains`, `reserved_subdomains`
**Billing:** `plans`, `plan_entitlements`, `subscriptions`, `billing_webhook_events`
**Inventory:** `vehicles`, `vehicle_private`, `vehicle_media`
**CRM (minimal):** `customers`, `inquiries`, `leads`, `lead_activities` (notes are an activity type), `lead_tasks`
**Trade-in:** `trade_in_requests`, `trade_in_photos`
**Settings:** `tenant_modules`
**Operations:** `audit_logs`, `import_jobs`, `import_rows`, `compliance_profiles`, `compliance_rule_versions` (launch scope), `state_fee_rules` (only if the calculator ships)

**Later (only when the workflow, retention, permissions and write path exist):** `vehicle_status_history`, `vehicle_price_history`, `vehicle_acquisitions`, `vehicle_costs`, `vehicle_inspections`, `vehicle_documents`, `vehicle_reservations` + `reservation_events`, `vehicle_ppsr_checks`, `test_drives`, `sales_records`, `notifications`, `integrations`, `usage_ledger`, `storage_usage_ledger`, `saved_reports`, remaining compliance tables.

### 5.2 CRM semantics ✅
- **Inquiry** = inbound event (form submission), kept immutable.
- **Customer** = dealership-scoped contact record (dedupe on normalised email/phone within tenant).
- **Lead** = actionable CRM record linked to customer (+ optional vehicle), with owner, status, source.
- Ingestion is idempotent (idempotency key per submission). Merge is audited and reversible where possible.

### 5.3 Key columns
- `dealerships`: id, name, slug, abn, subscription_status, `deposits_enabled` (default false), `online_sales_model` (Section 8.3), `trust_attestation_at`, stripe ids, storage_used_bytes, theme_config.
- `branches`: id, dealership_id, name, address, state, timezone; `unique (dealership_id, id)`.
- `dealer_licenses`: dealership_id, branch_id (nullable), jurisdiction, licence_type, licence_number, valid_from/to, status.
- `memberships`: (user_id, dealership_id) PK, role, status, `all_branches`.
- `vehicles`: dealership_id, branch_id, vin, slug, `publication_status` (draft/published/unpublished), `availability` (in_transit/in_stock/sold/archived), **`total_price_cents` (single headline price)**, `egc_price_cents` (optional component price), `price_note`, public specs, `public_description`, `features` (structured jsonb by category: safety, infotainment, comfort), `imperfections` (jsonb), `video_url`, import/odometer **evidence** fields (`import_source`, `auction_grade`, `verified_at` are public-allowlisted; `auction_sheet_ref`, `odometer_evidence_ref` stay private; never a "guarantee" flag), hybrid battery test fields (`battery_soh_pct`, `battery_tested_at`, `battery_test_method`, `battery_tester`; report reference private), PPSR fields (8.5: `ppsr_outcome`, `ppsr_checked_at`; certificate reference kept private).
- `tenant_modules`: (dealership_id, module, enabled) for `freight_calculator`, `custom_orders`, `trade_in_wizard`, `holding_deposits`; plan entitlements gate which modules a tenant may enable. Not stored in `theme_config`.
- `trade_in_requests` / `trade_in_photos`: customer vehicle details, contact (via customer), status (draft/submitted), retention date; photos private (4.5.2).
- `state_fee_rules`: state, rule_type, vehicle_class, params, effective_from/to, `source_url` NOT NULL, `last_verified_at` NOT NULL, approved_by.

### 5.4 Retention
Never cascade-delete inquiries, sales, statutory or audit records when a vehicle is removed: soft delete + retention schedule. Anonymisation vs append-only logs: define an erasure approach. Define export and deletion for cancelled tenants (export window, read-only period, domain cleanup).

---

## 6. SQL Foundation (illustrative; finalise with real schema and `EXPLAIN ANALYZE`)

```sql
-- Integrity
alter table branches  add constraint branches_tenant_uq unique (dealership_id, id);
alter table vehicles  add constraint vehicles_tenant_uq unique (dealership_id, id);
alter table vehicles  add constraint vehicles_branch_fk
  foreign key (dealership_id, branch_id) references branches (dealership_id, id);
alter table vehicle_media add constraint media_vehicle_fk
  foreign key (dealership_id, vehicle_id) references vehicles (dealership_id, id) on delete cascade;
alter table inquiries add constraint inq_vehicle_fk                 -- vehicle_id nullable
  foreign key (dealership_id, vehicle_id) references vehicles (dealership_id, id)
  on delete set null (vehicle_id);                                  -- PostgreSQL 15+
create unique index vehicles_dealership_vin_uq on vehicles (dealership_id, vin);
create index on memberships (user_id, dealership_id);

-- Role/branch helpers (private schema, fixed search_path, restricted execute)
create schema if not exists private;

create function private.has_role(p_dealership uuid, p_roles text[])
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.memberships m
    where m.user_id = (select auth.uid()) and m.dealership_id = p_dealership
      and m.status = 'active' and m.role = any (p_roles));
$$;

create function private.can_access_branch(p_dealership uuid, p_branch uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.memberships m
    where m.user_id = (select auth.uid()) and m.dealership_id = p_dealership
      and m.status = 'active'
      and (m.all_branches or exists (select 1 from public.membership_branch_access b
            where b.user_id = m.user_id and b.dealership_id = m.dealership_id
              and b.branch_id = p_branch)));
$$;
revoke all on function private.has_role(uuid,text[]), private.can_access_branch(uuid,uuid) from public;
grant execute on function private.has_role(uuid,text[]), private.can_access_branch(uuid,uuid) to authenticated;

-- Per-operation RLS (vehicles); repeat the pattern for every tenant table
alter table vehicles enable row level security;  alter table vehicles force row level security;
revoke all on vehicles from anon;
create policy vehicles_sel on vehicles for select to authenticated
  using (private.can_access_branch(dealership_id, branch_id));
create policy vehicles_ins on vehicles for insert to authenticated
  with check (private.has_role(dealership_id, array['owner','admin','manager','sales'])
              and private.can_access_branch(dealership_id, branch_id));
create policy vehicles_upd on vehicles for update to authenticated
  using (private.has_role(dealership_id, array['owner','admin','manager','sales'])
         and private.can_access_branch(dealership_id, branch_id))
  with check (private.has_role(dealership_id, array['owner','admin','manager','sales'])
              and private.can_access_branch(dealership_id, branch_id));
create policy vehicles_del on vehicles for delete to authenticated
  using (private.has_role(dealership_id, array['owner','admin'])
         and private.can_access_branch(dealership_id, branch_id));

-- Sensitive fields: separate table, stricter policy
alter table vehicle_private enable row level security;  alter table vehicle_private force row level security;
create policy vp_all on vehicle_private for all to authenticated
  using (private.has_role(dealership_id, array['owner','admin','manager']))
  with check (private.has_role(dealership_id, array['owner','admin','manager']));

-- Pricing and modules
alter table vehicles
  add column total_price_cents bigint check (total_price_cents >= 0),   -- single headline price
  add column egc_price_cents   bigint check (egc_price_cents >= 0),     -- optional component price
  add column price_note text,
  add constraint egc_not_above_total
    check (egc_price_cents is null or total_price_cents is null or egc_price_cents <= total_price_cents);

create table tenant_modules (
  dealership_id uuid not null references dealerships on delete cascade,
  module text not null check (module in ('freight_calculator','custom_orders','trade_in_wizard','holding_deposits')),
  enabled boolean not null default false,
  primary key (dealership_id, module)
);

-- PUBLIC storefront reads: host-resolved allowlist RPCs (no anon access to base tables)
-- Host -> tenant is resolved inside the database; only active tenants resolve.
-- Normalisation: trim, lowercase, strip :port and trailing dot (matches Section 4.1).
create function private.resolve_host(p_host text) returns uuid
language sql stable security definer set search_path = '' as $$
  select dm.dealership_id
  from public.dealership_domains dm
  join public.dealerships d on d.id = dm.dealership_id
  where dm.hostname = rtrim(regexp_replace(lower(btrim(p_host)), ':[0-9]+$', ''), '.')
    and dm.status = 'active'
    and d.subscription_status in ('trialing','active','past_due')
  limit 1;
$$;
revoke all on function private.resolve_host(text) from public;

create function public.public_storefront_config(p_host text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'name', t.name,
    -- allowlisted theme keys only; never return theme_config raw
    'theme', jsonb_strip_nulls(jsonb_build_object(
        'logo_key', t.theme_config->'logo_key',
        'primary_color', t.theme_config->'primary_color',
        'accent_color', t.theme_config->'accent_color',
        'font', t.theme_config->'font')),
    'modules', (select coalesce(jsonb_object_agg(m.module, m.enabled), '{}'::jsonb)
                from public.tenant_modules m where m.dealership_id = t.id),
    'branches', (select coalesce(jsonb_agg(jsonb_build_object('id', b.id, 'name', b.name, 'address', b.address, 'state', b.state)), '[]'::jsonb)
                 from public.branches b where b.dealership_id = t.id),
    'licences', (select coalesce(jsonb_agg(jsonb_build_object('type', l.licence_type, 'number', l.licence_number, 'jurisdiction', l.jurisdiction)), '[]'::jsonb)
                 from public.dealer_licenses l where l.dealership_id = t.id and l.status = 'active'))
  from public.dealerships t
  where t.id = private.resolve_host(p_host);
$$;

-- Pagination: bounded offset (dealers hold ~10-80 vehicles). Stable order with an id tie-breaker.
-- If inventories grow large, switch to a composite keyset cursor (sort_value, id) per sort mode.
create function public.public_vehicles(
  p_host text, p_make text default null, p_model text default null,
  p_min_price bigint default null, p_max_price bigint default null,
  p_body text default null, p_transmission text default null,
  p_branch uuid default null, p_availability text default null,
  p_sort text default 'newest', p_limit int default 24, p_offset int default 0)
returns table (id uuid, slug text, make text, model text, year int, variant text,
               total_price_cents bigint, egc_price_cents bigint, odometer_km int,
               availability text, cover_image_key text, published_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select v.id, v.slug, v.make, v.model, v.year, v.variant,
         v.total_price_cents, v.egc_price_cents, v.odometer_km,
         v.availability, v.cover_image_key, v.published_at
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
    and (p_availability is null or v.availability = p_availability)
  order by
    case when p_sort = 'price_asc'  then v.total_price_cents end asc  nulls last,
    case when p_sort = 'price_desc' then v.total_price_cents end desc nulls last,
    v.published_at desc, v.id
  limit least(greatest(p_limit, 1), 50)
  offset least(greatest(p_offset, 0), 500);
$$;

-- Vehicle detail: returns only allowlisted public fields (evidence/report references stay private)
create function public.public_vehicle_by_slug(p_host text, p_slug text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'id', v.id, 'slug', v.slug, 'make', v.make, 'model', v.model, 'year', v.year, 'variant', v.variant,
    'availability', v.availability,
    'price', jsonb_build_object('total_cents', v.total_price_cents, 'egc_cents', v.egc_price_cents, 'note', v.price_note),
    'odometer_km', v.odometer_km, 'description', v.public_description,
    'features', v.features, 'imperfections', v.imperfections, 'video_url', v.video_url,
    'branch', (select jsonb_build_object('name', b.name, 'address', b.address, 'state', b.state)
               from public.branches b where b.dealership_id = v.dealership_id and b.id = v.branch_id),
    'import_info', jsonb_strip_nulls(jsonb_build_object(
        'source', v.import_source, 'auction_grade', v.auction_grade, 'verified_at', v.verified_at)),
    'hybrid_battery', jsonb_strip_nulls(jsonb_build_object(
        'soh_pct', v.battery_soh_pct, 'tested_at', v.battery_tested_at,
        'method', v.battery_test_method, 'tester', v.battery_tester)),
    'ppsr', jsonb_build_object('outcome', v.ppsr_outcome, 'checked_at', v.ppsr_checked_at),  -- summary only
    'media', (select coalesce(jsonb_agg(jsonb_build_object('key', m.storage_key, 'alt', m.alt_text) order by m.sort_order), '[]'::jsonb)
              from public.vehicle_media m
              where m.dealership_id = v.dealership_id and m.vehicle_id = v.id and m.is_public))
  from public.vehicles v
  where v.dealership_id = private.resolve_host(p_host)
    and v.slug = p_slug and v.publication_status = 'published';
$$;

revoke all on function public.public_storefront_config(text),
  public.public_vehicles(text,text,text,bigint,bigint,text,text,uuid,text,text,int,int),
  public.public_vehicle_by_slug(text,text) from public;
grant execute on function public.public_storefront_config(text),
  public.public_vehicles(text,text,text,bigint,bigint,text,text,uuid,text,text,int,int),
  public.public_vehicle_by_slug(text,text) to anon, authenticated;

-- memberships: no INSERT/UPDATE/DELETE policies for authenticated; change only via audited RPC

-- Reserved subdomains: trigger, not CHECK
create function private.check_hostname() returns trigger language plpgsql as $$
begin
  if new.kind = 'subdomain' then
    if split_part(new.hostname,'.',1) !~ '^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$' then
      raise exception 'invalid subdomain label'; end if;
    if exists (select 1 from public.reserved_subdomains r
               where r.label = split_part(new.hostname,'.',1)) then
      raise exception 'reserved subdomain'; end if;
  end if;
  return new;
end $$;
create trigger dealership_domains_check before insert or update on dealership_domains
  for each row execute function private.check_hostname();

-- Append-only audit
revoke update, delete, truncate on audit_logs from authenticated, anon, service_role;
-- plus BEFORE UPDATE/DELETE trigger raising an exception
```
Notes: review helper functions for recursion, null branches, privilege and performance before deployment. The public-RPC block (resolve_host, storefront config, listing, vehicle detail) was executed on PostgreSQL 16 against stub tables and passed isolation, host-normalisation, suspended/pending-domain, slug-collision, price-sort pagination and no-leak checks; the role/branch RLS policies compiled but still need pgTAP tests on the real schema (and a Supabase run, where default grants differ). Append-only controls do not stop a superuser/owner: ship high-value audit events to external log storage. Test RLS with the same roles and JWT claims used in production.

---

## 7. Security ✅

**Layers:** (1) identity/access (MFA, sessions, invitations, branch scope), (2) tenant isolation (RLS, composite FKs, DAL, cache, storage, public projection), (3) app/API (CSRF, CSP, XSS, IDOR/BOLA, SSRF, uploads, webhooks, throttling), (4) operations (scanning, secrets rotation, backups + restore drills, incident response, pen test). Baseline: OWASP ASVS + API Security.

**Rules:** no `service_role` in tenant-facing paths; `security definer` functions fixed `search_path`, minimal grants; impersonation read-only by default, short-lived, reasoned, visible banner, fully audited, approval for sensitive actions; provider credentials encrypted or referenced via secrets manager; logs carry tenant/request/actor IDs, no PII or secrets.

**Attack tests (CI + pre-launch):** tenant A reads/updates B (IDOR); role escalation; branch bypass; sales reading cost/private fields; unauthorised customer export; fake Host / `X-Forwarded-Host`; unknown-domain access; slug collision across tenants; domain takeover/stale mapping; prefetch/`.rsc` auth bypass; upload abuse; webhook replay/out-of-order; concurrent cross-tenant cache fill; suspended tenant publishing via API; membership self-grant; last-owner removal; public RPC leaking non-allowlisted fields; public RPCs with suspended/unknown hosts; SSRF through CSV image URLs (internal IPs, metadata endpoints, redirects, DNS rebinding); trade-in presign abuse (scope, size, count, storage exhaustion); redirect loops/duplicate-host content; active-tenant URL tampering and cross-tenant list mixing.

---

## 8. Australian Compliance

### 8.1 Principles
Rules are jurisdiction-specific, effective-dated and sourced; legal facts are never scattered as UI booleans; changes need human review and tests; UI states: `required | warning | not applicable | unknown | manual review required`; never say the platform guarantees compliance. Every `compliance_rule_versions` row: jurisdiction/activity scope, effective dates, structured params, official source URL(s), last verified date, reviewer/approver, status (`draft | reviewed | active | retired`), test cases.

### 8.2 Research baseline (re-verify with a lawyer before hard-coding)
| Topic | Baseline | Status |
|---|---|---|
| VIC Form 4 = used car price & data sheet; Form 5 = defect notice | Per Consumer Affairs Victoria | ✅ researched, ⚠️ re-verify |
| NSW Forms 5-8 = dealer notices (not contracts); pink slip for plated vehicles | Per NSW Government | ✅ researched, ⚠️ re-verify |
| VIC statutory warranty: <10 years and <160,000 km | Per CAV | ✅ researched, ⚠️ re-verify |
| QLD cooling-off (s99), written contract (s118), warranty classes (s115) | Concepts verified | ⚠️ copy exact periods only from official pages |
| QLD form numbers | Unverified | ⚠️ do not use |
| Trust-account duties (VIC/NSW/QLD) | Unverified/secondary | 🔴 state legal matrix needed before any deposit feature |
| Privacy Act small-business exemption | Unverified | ⚠️ design to APPs regardless |

### 8.3 NSW online motor dealers ✅ researched, ⚠️ lawyer to confirm scope
Researched requirements: advance notice to NSW Fair Trading (at least 20 business days), `.au` domain, licence number displayed, deposit cap of 10% of price, online-sale cooling-off (to 5pm next day), required notices (e.g., Form 5) available on the listing, records/register and retention (6 years).
**Onboarding must distinguish four models (not assumed to have the same treatment):**
1. Website generates enquiries for a later showroom sale.
2. Customer completes some or all of the sale online.
3. Customer pays a reservation/deposit online.
4. Dealer accepts binding orders/contracts online.
Store as `online_sales_model`; it drives compliance checks and the `.au` domain rule only once a lawyer confirms applicability.

### 8.4 Warranty and claims
ACL consumer guarantees (cannot be excluded) are separate from state dealer statutory warranties. Show per-state rules with official links and a **human-entered** `last_checked_at`. Review "100% refundable", odometer and inspection claims with counsel and evidence.

### 8.5 PPSR / WOVR / battery
Store: search completed, outcome (interest found/none), WOVR source and result, VIN match, report reference/URL, `ppsr_checked_at`, freshness/re-verify state. Badge copy: "PPSR search completed on {date}." plus "View certificate" only if the dealer approved a public redacted copy, otherwise "Request certificate" (see 4.2). Show a "clear" statement only if the stored outcome supports it. Never "guaranteed". No fabricated historical dates. Hybrid battery: "Measured Hybrid Battery Health" with date, method/device, tester and report reference; "certified" only with a genuine process.

### 8.6 Price display and drive-away calculator
**Price display (researched; ⚠️ lawyer to confirm for each state and for used vs new vehicles):** the ACL single-price rule requires the headline price to include all charges, and if a component price is shown, the single total price must be at least as prominent. ACCC guidance supports advertising a single drive-away price rather than "plus on-roads". Some states have used-car price-sheet rules that differ (e.g., the VIC used car price and data sheet). Therefore: the storefront headline is `total_price_cents`; an EGC price may appear only as a secondary component, never more prominent; the drive-away amount depends on state and purchaser circumstances, so any calculator output is labelled indicative. Publishing rules (e.g., "cannot publish without a total price") are driven by `compliance_rule_versions`.

**Calculator:**
Ship only with effective-dated, reviewed `state_fee_rules` (vehicle class, value bands, source, verification date, approver). Always "indicative estimate only"; never an official quote.

### 8.7 Privacy and messaging
APP-aligned design regardless of exemption: collection notices, purpose limitation, minimisation, consent records, access/correction process, retention schedule, trade-in photo rules, breach plan, subprocessor and data-location register, cross-border review, secure exports, transactional vs marketing separation, Spam Act. A Sydney region alone is not full data residency.

---

## 9. Payments and Billing

| Flow | Design |
|---|---|
| SaaS subscription | Stripe Billing on the platform account; start only after entity/eligibility checks; idempotent webhooks; entitlements derived centrally |
| Customer deposits | **Not in MVP.** Off by default per tenant. Any future mode needs a per-state legal matrix (deposit caps, cooling-off, trust handling) |
| PPSR | MVP: dealer BYO credentials if feasible; later post-paid append-only `usage_ledger` (unique idempotency key). **No prepaid wallet** |

Rules: no "zero liability" claims (financial-exposure reduction is not legal immunity). Evaluate Stripe Connect via Accounts v2/controller properties, not a hard-coded "Standard" label (dealer full dashboard, Stripe collects requirements/losses, dealer merchant of record); connected-account country can't be changed later. `reservation_expires_at` ≠ `capture_before`. Webhooks: raw-body signature, unique event ID, out-of-order tolerance, retries/dead-letter, reconciliation, alerts.

**GST and invoicing:** SaaS subscriptions to Australian businesses are generally subject to 10% GST once the platform entity is registered; issue compliant tax invoices (ABN, GST amount, date, description). Registration threshold, invoice format, foreign-supplier rules and Stripe tax settings must be confirmed with an Australian tax adviser (⚠️). Show plan prices consistently as GST-inclusive or exclusive.

**Entitlements:** `plans → plan_entitlements → subscriptions → billing_webhook_events`; central `EntitlementService` checks status, trial, vehicle/staff/branch/storage/domain limits, past-due and suspension. Cancelled tenants: export window, read-only state, retention, domain cleanup.

**Cost model (fill before final pricing) ❓:**
| Item | Monthly fixed | Per-tenant variable | Notes |
|---|---|---|---|
| Supabase (Pro, compute, PITR) | TBD | TBD | |
| Vercel Pro | TBD | bandwidth/functions TBD | |
| R2 storage/ops/egress | TBD | per GB | image-heavy |
| Upstash, Brevo, Sentry | TBD | TBD | |
| Stripe fees | n/a | % of MRR | |
| Support + assisted onboarding | n/a | hours × rate | usually the largest |
Gross margin = (MRR − direct costs) / MRR. Free tiers are not acceptable for production.

---

## 10. Operations and Testing

Environments: local, staging (separate Supabase), production; CI applies migrations; test a **fresh-database bootstrap**; no production data in staging without anonymisation. Monitoring: Sentry, uptime, alerts on webhook/domain/RLS failures; measured SLO before any SLA. Backups: PITR + restore drill; runbooks for tenant-isolation breach, data breach, outage.

Tests: **pgTAP** (every tenant table, role × branch matrix, composite FKs, field-level tables, public RPC allowlist, audit immutability, impersonation expiry), **Vitest** (DAL, entitlements, import normalisation, badge logic, webhooks), **Playwright** (signup → import → publish → host → enquire → lead → task; domain flow mocked), plus Section 7 attack tests. Definition of done: lint, type-check, tests, build, `docs/STATUS.md` updated with evidence.

---

## 11. Roadmap and Exit Criteria

| Phase | Scope | Exit |
|---|---|---|
| **Track A** | Hotfix (Section 1.1) | Live site safe |
| **Phase 1: Foundation** (parallel with Track B) | Fresh repo, patched stack, environments, tenancy/branches/RBAC, per-operation RLS, public projection RPC, host routing, tenant-safe caching/storage, audit, rate limiting, monitoring, restore drill | Two test tenants with separate users/branches pass isolation + permission + public-RPC tests |
| **Phase 2: Commercial MVP** | Inventory, CSV migration, storefront, domains, CRM basics, email, billing/entitlements, super-admin, export/cancellation, launch-scope compliance | First 5 dealers onboard, publish stock and manage enquiries without developer help for routine tasks |
| **Phase 3: Retention** | Costing, history, ageing, test drives, assignment rules, analytics, recordbook, approved PDFs | Dealers use it daily; support and usage metrics justify more investment |
| **Phase 4: Integrations** | PPSR/NEVDIS, Xero/MYOB, first feed, SMS/WhatsApp, AI text | Each has verified access, demand, support plan and positive unit economics |
| **Phase 5** | Deposits (after legal), wholesale, other states, advanced DMS | Driven by traction |

Southern Auto joins as **Tenant #1 by assisted import** (vehicles via CSV; historical inquiries/deposits archived or imported per pilot agreement), not by in-place migration.

---

## 12. Decision Log (ADRs)

| ID | Decision | Status |
|---|---|---|
| ADR-01 | Shared DB/schema, `dealership_id` on tenant tables, RLS + composite FKs + tenant-keyed cache/storage/rate limits | ✅ |
| ADR-02 | Branches, licences, membership branch access | ✅ |
| ADR-03 | Per-operation RLS with role/branch helpers | ✅ |
| ADR-04 | PPSR: BYO first; later post-paid `usage_ledger`; no prepaid wallet | ✅ |
| ADR-05 | Deposits OFF by default; not in MVP | ✅ |
| ADR-06 | No "zero liability" claims | ✅ |
| ADR-07 | Stripe Connect via Accounts v2/controller properties (later phase) | 🟡 |
| ADR-08 | `reservation_expires_at` ≠ `capture_before` | ✅ |
| ADR-09 | Patched stable Next.js under a patch policy (no fixed stale number) | ✅ |
| ADR-10 | Proxy/middleware routing only; authz in DAL/server/DB | ✅ |
| ADR-11 | Tenant ID explicit in cached functions; tenant tags; no private data in public cache | ✅ |
| ADR-12 | Reserved subdomains via trigger, not cross-table CHECK | ✅ |
| ADR-13 | Disclosure PDFs/document upload first; no contract/e-sign without legal sign-off | ✅ |
| ADR-14 | Publication and availability separate; reservations in own table | ✅ |
| ADR-15 | Facebook feed P1 after demand validation | ✅ |
| ADR-16 | Costing and SMS/WhatsApp phased after validation | ✅ |
| ADR-17 | Stack: Next.js + Supabase + R2 + Upstash + Vercel | ✅ |
| ADR-18 | No unsupported competitor claims | ✅ |
| ADR-19 | Platform entity: Australian Pty Ltd planned; eligibility/director review pending | 🟡 |
| ADR-20 | "Measured Hybrid Battery Health" labelling | ✅ |
| ADR-21 | **Modified:** new multi-tenant foundation, ported components, Hotfix Track A for the live site, Southern Auto joins by import | 🟡 awaiting your confirmation |
| ADR-22 | Platform vs dealer responsibilities defined and reviewed by counsel | 🟡 |
| ADR-23 | Inquiry ≠ customer ≠ lead | ✅ |
| ADR-24 | Compliance rules versioned, effective-dated, human-approved (launch scope) | ✅ |
| ADR-25 | Public storefront via host-resolved allowlist RPC; no anon base-table access | ✅ |
| ADR-26 | Sensitive fields in separate tables with stricter RLS + server rules | ✅ |
| ADR-27 | Tenant export, cancellation, retention, anonymisation are P0 workflows | ✅ |
| ADR-28 | Dealer and platform analytics separated, tenant-scoped, metric definitions documented | 🟡 |
| ADR-29 | Modular monolith | ✅ |
| ADR-30 | Incorporation and payment activation gated by professional eligibility review | 🟡 |
| ADR-31 | Full public RPC set (config, filtered listing, vehicle by slug), host-resolved, allowlisted | ✅ |
| ADR-32 | Single total headline price; EGC only as a less prominent component; counsel to confirm | 🟡 |
| ADR-33 | CSV photo re-hosting with SSRF controls; ZIP fallback | ✅ |
| ADR-34 | Public trade-in uploads: private prefix, scoped presign, Turnstile + rate limits | ✅ |
| ADR-35 | Module flags in `tenant_modules`/entitlements, not `theme_config` | ✅ |
| ADR-36 | Explicit public form pipeline (Turnstile, honeypot, HMAC rate limits, dedupe, no anon writes) | ✅ |
| ADR-37 | Apex via A/ALIAS, www via CNAME, one primary host with permanent redirects | ✅ |
| ADR-38 | Active dealership in URL, validated against memberships on every request | ✅ |
| ADR-39 | PPSR certificate not public by default | 🟡 |

A proposed ADR becomes approved only when you record approval, date and rationale.

---

## 13. Risks

| Risk | Sev | Mitigation |
|---|---|---|
| Cross-tenant data/cache leak | 🔴 | RLS, composite FKs, public RPC allowlist, tenant cache/storage, attack tests, patch policy |
| Misleading claims on the live site | 🔴 | Track A now |
| Deposit/trust/cooling-off/NSW online non-compliance | 🔴 | Deposits OFF, per-state matrix, lawyer |
| Field-level privilege escalation | 🔴 | Separate tables, server rules, tests |
| Company/director eligibility unresolved | 🔴 | Adviser first; gate incorporation/payment activation |
| Platform vs dealer responsibility blurred | 🔴 | Contracts, UX wording, lawyer |
| Incorrect compliance rules | 🔴 | Official sources, versioning, approvals |
| Customer data breach/privacy failure | 🔴 | Minimisation, access control, retention, breach plan, subprocessor register |
| Failed CSV migration/data loss | 🟠 | Dry-run, backups, idempotency, reconciliation |
| Domain takeover / wrong tenant mapping | 🟠 | Verification, re-verification, trusted lookup |
| Spec paralysis / scope creep | 🟠 | Parallel tracks, phase gates tied to dealer evidence |
| Cost growth (images, support) | 🟠 | Quotas, cost-per-tenant tracking |
| Low adoption/churn | 🟠 | Assisted onboarding, discovery, usage metrics |
| Provider/partner access unavailable | 🟡 | Validate terms before committing roadmap |

---

## 14. Open Decisions (need your answers)

1. ❓ **ADR-21:** confirm "new foundation + ported components + Hotfix Track A + Southern Auto by import" (or choose full rewrite / in-place evolution).
2. ❓ Is Track A already done in the repo? Any live deposits on the current site?
3. ❓ Company structure, shareholders, genuinely involved eligible director, name/office, ABN/GST.
4. ❓ Pilot partner confirmed? Launch states?
5. ❓ Platform domain and subdomain pattern; domain provisioning provider.
6. ❓ Team size and hours/week (to replace Section 1.2 estimate).
7. ❓ Pricing tiers and limits (after cost model).
8. ❓ PPSR access route/BYO feasibility; first feed after interviews.
9. ❓ Support hours and assisted-onboarding package.
10. ❓ Which NSW workflows count as "selling online" for the pilot.
11. ❓ Southern Auto's live calculator/listing: is EGC or drive-away the default and most prominent price?
12. ❓ PPSR certificate: dealer-approved redacted public copy, or request-only?
13. ❓ Do target dealers need photo URL fetching, or is ZIP upload acceptable? (validate in interviews)

---

## 15. `docs/STATUS.md` template

```markdown
| Requirement | Section | State (planned/implemented/verified) | Evidence (PR, test, date) | Notes |
|---|---|---|---|---|
| Track A-1 Next.js patched | 1.1 | planned | | |
| Public RPC allowlist | 4.2 | planned | | |
```
A feature is `verified` only when required tests and evidence pass; an agent's "done" report is not evidence.

---

## 16. AGENTS.md (for Antigravity / coding agents)

```markdown
# Project: Australian Used-Car Dealership Multi-Tenant SaaS
Follow MASTER_SPEC_V2_2.md. Do not change an ADR without owner approval. Do not invent requirements.

Stack/quality
- Next.js App Router (TypeScript strict), Supabase Postgres + RLS, R2, Upstash, Stripe. Modular monolith.
- Use a currently patched stable Next.js; never mix unstable_cache and "use cache" for one function.

Tenancy/authz
- Every tenant table: dealership_id, per-operation RLS, composite FKs. Branch-owned rows also check branch.
- Role/branch checks via private.has_role / private.can_access_branch. Never trust client-sent role or tenant.
- Tenant comes from session membership or host resolved against active dealership_domains.
- Proxy/middleware = routing only. Authz in DAL, Server Actions, route handlers and RLS.
- No anon access to tenant base tables. Public reads only through allowlisted RPC/projection.
- Sensitive fields live in separate tables with stricter RLS; never expose cost/private notes publicly.
- Tenant ID is an explicit argument of every cached function; tenant-scoped tags and rate-limit keys.
- No service_role in tenant-facing code. security definer: fixed search_path, schema-qualified, minimal EXECUTE.

Data/privacy
- Separate inquiries, customers and leads. Minimise PII; never log PII or secrets.
- Export, retention, cancellation and deletion are documented workflows.
- Legal/fee/date facts require official source + verification date + human approval. Use clearly marked placeholders; never invent.

Storage/integrations
- Server-built keys with dealership_id; validate magic bytes, size, dimensions; re-encode; strip EXIF/GPS.
- Webhooks: raw-body signature, unique event ID, idempotent, out-of-order tolerant. Jobs idempotent and observable.
- Public storefront: only allowlisted public_* RPCs, host-based; no anon access to tenant base tables.
- Any server-side fetch of a user-supplied URL (imports, webhooks) needs SSRF protection: https, IP blocklist, redirect/DNS checks, size/time limits.
- Public customer uploads: private prefix, scoped short-lived presign, Turnstile + rate limits; never the public CDN.
- Headline vehicle price is the single total price; EGC/component prices are never more prominent (confirm with counsel).
- Active dealership comes from the validated URL scope, never from a client cookie alone.
- Module flags live in tenant_modules/entitlements, not theme_config.

Migrations/delivery
- Local/staging/production separated; migrations applied by CI; test fresh bootstrap. Staged constraints (NOT VALID then VALIDATE).
- Every feature ships pgTAP/Vitest/Playwright tests as appropriate; lint, type-check, build must pass.
- Update docs/STATUS.md with evidence. Report assumptions, unresolved decisions and unverified facts.
```

---

## 17. Immediate Checklist

**This week**
- [ ] Track A hotfix items 1-9 (Section 1.1); list in-flight deposits
- [ ] Decide ADR-21 (Section 14 #1)
- [ ] Book an Australian corporate/tax adviser and a motor-trade/privacy lawyer
- [ ] Schedule 5-10 dealer interviews

**Next 2-4 weeks**
- [ ] Fresh repo + `AGENTS.md` + `docs/STATUS.md`; local/staging/prod Supabase; Supabase Pro + PITR
- [ ] Foundation migrations (Section 5-6) + pgTAP suite
- [ ] Tenant onboarding, memberships/branches, host routing, public RPC
- [ ] Draft pilot agreement; confirm Southern Auto
- [ ] Per-tenant cost model

---

## 18. Sources (verify before relying)

- NSW online motor dealer changes: https://www.nsw.gov.au/departments-and-agencies/fair-trading/news/changes-to-motor-dealer-and-repairers-laws
- NSW working as a motor dealer: https://www.nsw.gov.au/business-and-economy/running-a-business/industry-specific-business-requirements/working-as-a-motor-dealer
- NSW statement of regulatory intent (online dealing): https://www.nsw.gov.au/departments-and-agencies/fair-trading/who-we-are/statement-of-regulatory-intent-changes-to-online-motor-dealing
- NSW dealer guarantees and forms: https://www.nsw.gov.au/driving-boating-and-transport/buying-and-selling-vehicles/dealer-guarantees-and-warranties
- VIC used car obligations: https://www.consumer.vic.gov.au/licensing-and-registration/motor-car-traders/running-your-business/obligations-used-car-sales
- VIC warranties: https://www.consumer.vic.gov.au/consumers-and-businesses/cars/buying-a-used-car/warranties
- QLD guarantees and warranties: https://www.qld.gov.au/law/laws-regulated-industries-and-accountability/queensland-laws-and-regulations/regulated-industries-and-licensing/regulated-industries-licensing-and-legislation/motor-industry-regulation/legal-requirements-motor-transaction/guarantees-and-warranties-for-second-hand-vehicles
- QLD law handbook: https://queenslandlawhandbook.org.au/the-queensland-law-handbook/contracts-money-and-property/consumers-and-contracts/buying-a-used-car-from-a-dealer
- Next.js November 2026 security release: https://www.netlify.com/changelog/2026-11-03-nextjs-security-vulnerabilities/
- Stripe Connect accounts: https://docs.stripe.com/connect/accounts-v2
- ASIC company registration: https://asic.gov.au/for-business-and-companies/companies/register-a-company/
- auDA (domain eligibility): https://www.auda.org.au/
- OAIC: https://www.oaic.gov.au/
- PPSR: https://www.ppsr.gov.au/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- OWASP SSRF prevention: https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html
- Pricing: VIC cash vs drive-away price: https://www.consumer.vic.gov.au/consumers-and-businesses/cars/buying-a-new-car/cash-price-and-drive-away-price
- Pricing: single price requirements (WA Small Business): https://www.smallbusiness.wa.gov.au/blog/new-laws-around-single-pricing
- Pricing: ACL single price and component pricing (Law handbook): https://fls.org.au/law-handbook/consumers-contracts-the-internet-and-copyright/consumer-protection-laws/pricing/
- ATO GST for businesses: https://www.ato.gov.au/
