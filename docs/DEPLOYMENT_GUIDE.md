# Production Deployment & Infrastructure Guide
**Australian Used-Car Dealership Multi-Tenant B2B SaaS (v2.3)**

---

## 1. Production Architecture Overview

The platform is engineered as a zero-trust multi-tenant SaaS built with **Next.js 15 (Standalone mode)**, **Supabase PostgreSQL (Sydney Region `ap-southeast-2`)**, **Cloudflare R2**, **Stripe Australia**, and **Cloudflare for SaaS (Custom Hostnames)**.

```
                              [ Australian Public Buyers & Dealers ]
                                                 │
                                                 ▼
                                     [ Cloudflare Edge CDN ]
                     ┌───────────────────────────┴───────────────────────────┐
                     ▼                                                       ▼
        *.apexautos.com.au (SaaS & Subdomains)             Custom Domains (e.g. sydneycars.com.au)
                     │                                                       │
                     └───────────────────────────┬───────────────────────────┘
                                                 │  (SSL Termination & CNAME Routing)
                                                 ▼
                                   [ Next.js 15 Standalone Docker ]
                                   (AWS ECS / App Runner / Fly.io / Coolify)
                                                 │
                   ┌─────────────────────────────┼─────────────────────────────┐
                   ▼                             ▼                             ▼
       [ Supabase PostgreSQL ]          [ Cloudflare R2 ]             [ Stripe Australia ]
        • ap-southeast-2 (Sydney)        • Sydney edge bucket          • Domestic Pty Ltd
        • Row-Level Security (RLS)       • WebP image CDN              • AUD + 10% GST
        • Security-Definer RPCs          • SSRF egress filter          • Tax Invoices
```

---

## 2. Docker Containerization & Build Verification

The application features a production-hardened multi-stage `Dockerfile` creating a non-root lightweight Alpine image using Next.js 15 standalone output tracing.

### 2.1 Build the Production Image
```bash
# Build standalone Docker container
docker build -t autos-saas:latest .
```

### 2.2 Run with Docker Compose
A production `docker-compose.yml` is provided at the repository root:
```bash
# Start container in detached mode
docker-compose up -d

# Verify container healthcheck status
docker-compose ps
```

Healthcheck endpoint: `GET /` verifies HTTP 200 response on `http://127.0.0.1:3000/`.

---

## 3. Database Deployment & Migrations (Supabase)

### 3.1 Region Invariant
- **Target Region:** Sydney (`ap-southeast-2`).
- **Rationale:** Minimises round-trip latency to Australian dealerships (<15ms across NSW, VIC, QLD) and satisfies Australian Privacy Act expectations.

### 3.2 Executing Migrations in Order
Run all migrations sequentially via Supabase CLI or SQL Editor:
1. `supabase/migrations/20261125000001_initial_schema.sql` (15 base tables, composite FKs, deal books)
2. `supabase/migrations/20261125000002_rls_and_helpers.sql` (Tenant RLS policies, zero anon permissions)
3. `supabase/migrations/20261125000003_public_storefront_rpcs.sql` (Security-definer RPCs: `resolve_host`, `public_vehicles`, `public_vehicle_by_slug`)
4. `supabase/migrations/20261125000004_fix_public_vehicles_rpc.sql` (RPC return types & pagination)
5. `supabase/migrations/20261127000001_custom_domains_and_rls.sql` (Custom domain DNS verification engine & RLS)

### 3.3 Verifying Isolation
Run the pgTAP test suite to confirm zero data leakage across tenant boundaries:
```bash
supabase test db
```

---

## 4. Custom Domains & DNS Routing (Cloudflare for SaaS)

Each dealership can connect their own branded domain (e.g. `sydneycars.com.au` or `peninsulamotors.com.au`).

### 4.1 DNS Verification Challenge Flow
When an administrator enters their domain in `/admin/domains`:
1. The platform generates a unique verification challenge:
   - **Type:** `TXT`
   - **Host:** `_autos-verify.<dealership-domain>`
   - **Value:** `autos-verify=<uuid>`
2. The dealer creates the TXT record in their domain registrar (e.g. Crazy Domains, Melbourne IT, GoDaddy).
3. The platform validates DNS propagation and issues Cloudflare SSL certificates.
4. The dealer creates a CNAME pointing their domain or `www` subdomain to `cname.apexautos.com.au`.

### 4.2 Middleware Edge Host Normalization
The Edge Middleware (`src/middleware.ts`):
- Strips port numbers.
- Handles apex to `www` 308 canonical redirects.
- Injects `x-tenant-host` for database resolution.
- Resolves tenant settings via `public.resolve_host(host)`.

---

## 5. Security & Australian Statutory Compliance Checklist

Before switching DNS to live traffic, verify each compliance control:

- [x] **Zero Base Table Anon Permissions:** `revoke all on {table} from anon, public` strictly enforced; only security-definer RPCs (`public.public_*`) accessible without JWT.
- [x] **ACL s 48 Single Price Rule:** Headline prices everywhere reflect `total_price_cents` (all unavoidable taxes/duties included). EGC prices never displayed alone or more prominently.
- [x] **Indicative Financial Disclaimers:** All finance and trade-in calculators feature clear "indicative estimate only" disclaimers under ACL guidelines.
- [x] **State Statutory Warranties:** NSW Form 1, VIC Form 2, and QLD Form 5 generated accurately according to statutory age and odometer rules.
- [x] **SSRF Protection:** Image re-hosting workers resolve external IPs against private CIDR blocks (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8`, `169.254.0.0/16`) before connecting.
- [x] **Public Buyer Forms:** Enforce Zod validation, honeypot field, Cloudflare Turnstile token verification, and Upstash Redis rate limiting.
- [x] **10% GST Tax Invoices:** Stripe Billing configured under Australian Pty Ltd issuing compliant tax invoices with ABN.

---

## 6. Automated Testing & Verification Commands

Run full platform verification at any time:

```bash
# 1. TypeScript Strict Type-Check (0 errors)
npm run type-check

# 2. Vitest Unit Test Suite (10 test suites, 40 tests)
npm test

# 3. Playwright End-to-End Suite (20 E2E tests)
npm run test:e2e

# 4. Next.js Standalone Production Build
npm run build
```

---

## 7. Go-Live Pilot Dealer Onboarding Sequence

1. **Step 1:** Confirm dealer company name, NSW/VIC/QLD Motor Dealer Licence Number, and ABN.
2. **Step 2:** Assist dealer with CSV stock export from EasyCars / AutoGate / Indiqator.
3. **Step 3:** Perform dry-run import in `/admin/import` and verify vehicle count.
4. **Step 4:** Configure custom domain in `/admin/domains` and configure registrar CNAME/TXT.
5. **Step 5:** Copy Facebook AIA Catalog Feed URL (`/api/feeds/facebook-aia.xml`) and paste into Meta Commerce Manager.
6. **Step 6:** Conduct live test enquiry via VDP trade-in widget and verify SMS / WhatsApp / CRM notification.
