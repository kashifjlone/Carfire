-- Migration: 20261127000001_domain_policies_and_verification.sql
-- Description: Add RLS policies for dealership_domains, verification token, and SSL lifecycle tracking

-- 1. ADD COLUMNS FOR DNS CHALLENGE & SSL STATUS
alter table public.dealership_domains
  add column if not exists verification_token text not null default ('yf_verify_' || replace(gen_random_uuid()::text, '-', '')),
  add column if not exists ssl_status text not null default 'pending' check (ssl_status in ('pending', 'provisioned', 'failed')),
  add column if not exists apex_redirect text not null default 'none' check (apex_redirect in ('none', 'to_apex', 'to_www'));

-- 2. RLS POLICIES FOR AUTHENTICATED STAFF
create policy dealership_domains_select on public.dealership_domains for select to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales', 'viewer']));

create policy dealership_domains_insert on public.dealership_domains for insert to authenticated
  with check (private.has_role(dealership_id, array['owner', 'admin']));

create policy dealership_domains_update on public.dealership_domains for update to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin']))
  with check (private.has_role(dealership_id, array['owner', 'admin']));

create policy dealership_domains_delete on public.dealership_domains for delete to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin']));
