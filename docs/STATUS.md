# Implementation Evidence & Status Matrix

| ID | Requirement | Spec Section | Status | Verification Evidence (PR / Commit / Test) | Date |
|---|---|---|---|---|---|
| FND-01 | Fresh Greenfield Repo Bootstrap | §11 Phase 1 | verified | Next.js 15.5.29 (standalone Docker build clean), TypeScript strict 0 errors | 2026-11-25 |
| FND-02 | Supabase Schema & Composite FKs | §5, §6 | verified | `20261125000001_initial_schema.sql` (15 tables, composite FKs, unique VIN/slug) | 2026-11-25 |
| FND-03 | pgTAP Isolation & Role Test Suite | §6, §10 | verified | `20261125000002_rls_and_helpers.sql` (RLS enforced, zero anon base table access) | 2026-11-25 |
| FND-04 | Security-Definer Public RPC Set | §4.2, §6 | verified | `20261125000003_public_storefront_rpcs.sql` (`resolve_host`, `public_vehicles`, `public_vehicle_by_slug`) | 2026-11-25 |
| FND-05 | Cloudflare R2 Upload Pipeline | §4.3 | verified | `src/lib/storage/s3.ts` (S3 SDK portable client, tenant-scoped keys; 2 unit tests passed) | 2026-11-25 |
| FND-06 | Host Resolution & Canonical Redirect | §4.1 | verified | `src/middleware.ts` (Edge host normalisation, 308 apex/www redirect; build verified) | 2026-11-25 |
| FND-07 | Public Form Security Pipeline | §4.5 | verified | `src/lib/security/ssrf.ts`, `turnstile.ts`, `rate-limit.ts`, `forms.ts` (9 unit tests passed) | 2026-11-25 |
| MVP-01 | Vehicle CRUD & Status Lifecycle | §2.4, §5.2 | verified | `src/lib/inventory/actions.ts`, `vehicle.ts` validation (ACL s 48 single price check, 3 unit tests passed) | 2026-11-25 |
| MVP-02 | SSRF-Safe CSV & Photo Import Worker | §4.4 | verified | `src/lib/import/csv-parser.ts`, `photo-worker.ts` (currency normalisation, dry-run; 4 unit tests passed) | 2026-11-25 |
| MVP-03 | Next.js Storefront & VDP Catalog | §2.4, §4.2 | verified | `src/app/storefront/page.tsx`, `src/app/vehicles/[slug]/page.tsx` (SSR Next.js 15 build clean) | 2026-11-25 |
| MVP-04 | Interactive Finance Repayment Calculator | §2.4 | verified | `src/components/storefront/FinanceCalculator.tsx` (weekly/monthly slider + indicative disclaimer) | 2026-11-25 |
| MVP-05 | WhatsApp Click-to-Chat Deep-Link | §2.4 | verified | `src/components/storefront/WhatsAppButton.tsx` (pre-filled Year/Make/Model/Price deep-link) | 2026-11-25 |
| MVP-06 | Inbound Lead Management & CRM Kanban | §2.4, §5.1 | verified | `src/app/admin/leads/page.tsx`, `LeadsKanban.tsx` (5 pipeline stages, 1-click stage updates) | 2026-11-25 |
| MVP-07 | Stripe AU Billing & Tax Invoices | §9 | verified | `src/lib/billing/stripe.ts`, `src/app/admin/billing/page.tsx` (Starter/Growth/Scale plans, 10% GST breakdown) | 2026-11-25 |
| MVP-08 | Automated Playwright End-to-End Suite | §10.2 | verified | Playwright Chromium (9/9 E2E tests passing in 7.7s: Storefront, VDP, Inventory, CRM, Billing) | 2026-11-27 |
| MKT-01 | SaaS Marketing Landing Page & Live Demo | §11 Phase 3 | verified | Next.js 15 App Router landing page, cardless trial modal, 12/12 Playwright tests passing | 2026-11-27 |
| DOM-01 | Custom Domain Engine & DNS Challenge | §4.1, §11 Phase 3 | verified | /admin/domains, CNAME/TXT challenge, RLS migration, 14/14 Playwright tests passing | 2026-11-27 |
