-- Migration: 20261125000002_rls_and_helpers.sql
-- Description: Private schema helpers, RLS policies, and immutable audit triggers

-- 1. PRIVATE SCHEMA & ISOLATION HELPERS
create schema if not exists private;

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

-- 2. ENABLE & FORCE RLS ON ALL TABLES
alter table public.dealerships enable row level security;
alter table public.dealerships force row level security;

alter table public.branches enable row level security;
alter table public.branches force row level security;

alter table public.dealer_licenses enable row level security;
alter table public.dealer_licenses force row level security;

alter table public.memberships enable row level security;
alter table public.memberships force row level security;

alter table public.membership_branch_access enable row level security;
alter table public.membership_branch_access force row level security;

alter table public.dealership_domains enable row level security;
alter table public.dealership_domains force row level security;

alter table public.vehicles enable row level security;
alter table public.vehicles force row level security;

alter table public.vehicle_private enable row level security;
alter table public.vehicle_private force row level security;

alter table public.vehicle_media enable row level security;
alter table public.vehicle_media force row level security;

alter table public.customers enable row level security;
alter table public.customers force row level security;

alter table public.inquiries enable row level security;
alter table public.inquiries force row level security;

alter table public.leads enable row level security;
alter table public.leads force row level security;

alter table public.lead_activities enable row level security;
alter table public.lead_activities force row level security;

alter table public.lead_tasks enable row level security;
alter table public.lead_tasks force row level security;

alter table public.trade_in_requests enable row level security;
alter table public.trade_in_requests force row level security;

alter table public.audit_logs enable row level security;
alter table public.audit_logs force row level security;

-- 3. REVOKE BROAD ANON PERMISSIONS (Zero anon base table access)
revoke all on public.dealerships from anon, public;
revoke all on public.branches from anon, public;
revoke all on public.dealer_licenses from anon, public;
revoke all on public.memberships from anon, public;
revoke all on public.membership_branch_access from anon, public;
revoke all on public.dealership_domains from anon, public;
revoke all on public.vehicles from anon, public;
revoke all on public.vehicle_private from anon, public;
revoke all on public.vehicle_media from anon, public;
revoke all on public.customers from anon, public;
revoke all on public.inquiries from anon, public;
revoke all on public.leads from anon, public;
revoke all on public.lead_activities from anon, public;
revoke all on public.lead_tasks from anon, public;
revoke all on public.trade_in_requests from anon, public;
revoke all on public.audit_logs from anon, public;

-- 4. RLS POLICIES FOR AUTHENTICATED STAFF

-- Dealerships
create policy dealerships_select on public.dealerships for select to authenticated
  using (exists (select 1 from public.memberships m where m.dealership_id = id and m.user_id = (select auth.uid()) and m.status = 'active'));

create policy dealerships_update on public.dealerships for update to authenticated
  using (private.has_role(id, array['owner']))
  with check (private.has_role(id, array['owner']));

-- Vehicles
create policy vehicles_select on public.vehicles for select to authenticated
  using (private.can_access_branch(dealership_id, branch_id));

create policy vehicles_insert on public.vehicles for insert to authenticated
  with check (
    private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales'])
    and private.can_access_branch(dealership_id, branch_id)
  );

create policy vehicles_update on public.vehicles for update to authenticated
  using (
    private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales'])
    and private.can_access_branch(dealership_id, branch_id)
  )
  with check (
    private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales'])
    and private.can_access_branch(dealership_id, branch_id)
  );

create policy vehicles_delete on public.vehicles for delete to authenticated
  using (
    private.has_role(dealership_id, array['owner', 'admin'])
    and private.can_access_branch(dealership_id, branch_id)
  );

-- Vehicle Private Financials (Field-Level Protected)
create policy vehicle_private_access on public.vehicle_private for all to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin', 'manager']))
  with check (private.has_role(dealership_id, array['owner', 'admin', 'manager']));

-- Vehicle Media
create policy vehicle_media_select on public.vehicle_media for select to authenticated
  using (exists (select 1 from public.vehicles v where v.id = vehicle_id and private.can_access_branch(v.dealership_id, v.branch_id)));

create policy vehicle_media_manage on public.vehicle_media for all to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales']))
  with check (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales']));

-- Leads & CRM
create policy leads_select on public.leads for select to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales']));

create policy leads_manage on public.leads for all to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales']))
  with check (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales']));

-- 5. IMMUTABLE AUDIT TRIGGER
create or replace function private.audit_immutable_trigger() 
returns trigger language plpgsql as $$
begin
  raise exception 'audit_logs entries are immutable and cannot be updated or deleted';
end;
$$;

drop trigger if exists audit_immutable on public.audit_logs;
create trigger audit_immutable before update or delete on public.audit_logs
  for each row execute function private.audit_immutable_trigger();
