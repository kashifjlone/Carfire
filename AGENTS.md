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
