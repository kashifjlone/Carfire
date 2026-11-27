-- ==============================================================================
-- MASTER PRODUCTION SCHEMA & SECURITY DEFINER RPCs (v2.3)
-- Australian Used-Car Dealership Multi-Tenant SaaS
-- Target: PostgreSQL 15+ / Supabase (Sydney ap-southeast-2)
-- ==============================================================================

create extension if not exists "pgcrypto";

-- ==============================================================================
-- 1. BASE TABLES & COMPOSITE INTEGRITY CONSTRAINTS
-- ==============================================================================

-- Dealerships (Tenants)
create table if not exists public.dealerships (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_entity_name text not null,
  abn varchar(11) not null,
  slug varchar(63) not null unique,
  subscription_status text not null default 'trialing' check (subscription_status in ('trialing', 'active', 'past_due', 'canceled')),
  primary_domain text,
  phone text not null,
  email text not null,
  whatsapp_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Branches
create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  name text not null,
  address text not null,
  state varchar(3) not null check (state in ('NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT')),
  phone text,
  created_at timestamptz not null default now(),
  constraint branches_tenant_uq unique (dealership_id, id)
);

-- Motor Dealer Licences
create table if not exists public.dealer_licenses (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  licence_type text not null,
  licence_number text not null,
  jurisdiction varchar(3) not null check (jurisdiction in ('NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT')),
  valid_from date,
  valid_to date,
  status text not null default 'active' check (status in ('active', 'expired', 'suspended')),
  created_at timestamptz not null default now()
);

-- Staff Memberships
create table if not exists public.memberships (
  user_id uuid not null,
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'manager', 'sales', 'viewer')),
  status text not null default 'active' check (status in ('active', 'invited', 'suspended')),
  all_branches boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (user_id, dealership_id)
);

-- Branch Level Access
create table if not exists public.membership_branch_access (
  user_id uuid not null,
  dealership_id uuid not null,
  branch_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (user_id, dealership_id, branch_id),
  foreign key (user_id, dealership_id) references public.memberships(user_id, dealership_id) on delete cascade,
  foreign key (dealership_id, branch_id) references public.branches(dealership_id, id) on delete cascade
);

-- Domains & DNS Engine
create table if not exists public.dealership_domains (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  hostname text not null unique,
  status text not null default 'pending_dns' check (status in ('pending_dns', 'verified', 'active', 'failed')),
  is_primary boolean not null default false,
  verification_token text not null default ('yf_verify_' || replace(gen_random_uuid()::text, '-', '')),
  ssl_status text not null default 'pending' check (ssl_status in ('pending', 'provisioned', 'failed')),
  apex_redirect text not null default 'none' check (apex_redirect in ('none', 'to_apex', 'to_www')),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

-- Vehicles (ACL s 48 Single Price Primary)
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  branch_id uuid not null,
  vin varchar(17) not null,
  stock_number text not null,
  make text not null,
  model text not null,
  year smallint not null check (year >= 1900 and year <= 2100),
  variant text,
  body_type text not null check (body_type in ('sedan', 'suv', 'hatch', 'ute', 'wagon', 'coupe', 'convertible', 'van')),
  transmission text not null check (transmission in ('automatic', 'manual')),
  fuel_type text not null check (fuel_type in ('petrol', 'diesel', 'hybrid', 'electric')),
  odometer_km integer not null check (odometer_km >= 0),
  total_price_cents bigint not null check (total_price_cents >= 0),
  egc_price_cents bigint check (egc_price_cents is null or egc_price_cents <= total_price_cents),
  publication_status text not null default 'draft' check (publication_status in ('draft', 'published', 'archived')),
  availability text not null default 'in_stock' check (availability in ('in_stock', 'in_transit', 'under_offer', 'sold')),
  slug text not null,
  features jsonb not null default '[]'::jsonb,
  imperfections jsonb not null default '[]'::jsonb,
  public_description text,
  ppsr_checked_at date,
  ppsr_status text not null default 'not_checked' check (ppsr_status in ('clear', 'interest_registered', 'not_checked')),
  statutory_warranty_class text not null default 'unwarranted' check (statutory_warranty_class in ('nsw_standard', 'vic_standard', 'qld_class_a', 'qld_class_b', 'unwarranted')),
  niche_attributes jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint vehicles_tenant_uq unique (dealership_id, id),
  constraint vehicles_branch_fk foreign key (dealership_id, branch_id) references public.branches (dealership_id, id)
);

create unique index if not exists vehicles_dealership_vin_uq on public.vehicles (dealership_id, vin);
create unique index if not exists vehicles_dealership_stock_uq on public.vehicles (dealership_id, stock_number);
create unique index if not exists vehicles_dealership_slug_uq on public.vehicles (dealership_id, slug);

-- Private Financials (Field-Level Protected: Margins, Costs)
create table if not exists public.vehicle_private (
  vehicle_id uuid primary key,
  dealership_id uuid not null,
  purchase_price_cents bigint check (purchase_price_cents >= 0),
  reconditioning_cost_cents bigint default 0 check (reconditioning_cost_cents >= 0),
  other_costs_cents bigint default 0,
  target_margin_cents bigint,
  internal_notes text,
  ppsr_certificate_storage_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (dealership_id, vehicle_id) references public.vehicles(dealership_id, id) on delete cascade
);

-- Vehicle Media
create table if not exists public.vehicle_media (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null,
  vehicle_id uuid not null,
  storage_key text not null,
  alt_text text,
  sort_order smallint not null default 0,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  foreign key (dealership_id, vehicle_id) references public.vehicles(dealership_id, id) on delete cascade
);

-- Customers & Leads
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  source text not null default 'website_form',
  payload jsonb not null,
  ip_address text,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  stage text not null default 'new' check (stage in ('new', 'contacted', 'test_drive_booked', 'negotiating', 'won', 'lost')),
  assigned_user_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  user_id uuid,
  activity_type text not null check (activity_type in ('note', 'status_change', 'email_sent', 'whatsapp_click', 'call_logged')),
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_tasks (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  assigned_user_id uuid,
  title text not null,
  due_date timestamptz not null,
  is_completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.trade_in_requests (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  vehicle_of_interest_id uuid references public.vehicles(id) on delete set null,
  rego text not null,
  rego_state varchar(3) not null check (rego_state in ('NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT')),
  make text not null,
  model text not null,
  year smallint not null,
  odometer_km integer not null,
  condition text not null check (condition in ('excellent', 'good', 'fair', 'poor')),
  status text not null default 'pending' check (status in ('pending', 'appraised', 'declined')),
  created_at timestamptz not null default now()
);

-- Append-Only Audit Logs
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid references public.dealerships(id) on delete set null,
  actor_id uuid,
  action text not null,
  resource_type text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ==============================================================================
-- 2. PRIVATE SCHEMA & ISOLATION HELPERS
-- ==============================================================================

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

-- ==============================================================================
-- 3. ENABLE RLS & ZERO ANON PERMISSIONS
-- ==============================================================================

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

-- Revoke all anon permissions from base tables
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

-- Staff RLS Policies
create policy dealerships_select on public.dealerships for select to authenticated
  using (exists (select 1 from public.memberships m where m.dealership_id = id and m.user_id = (select auth.uid()) and m.status = 'active'));

create policy dealerships_update on public.dealerships for update to authenticated
  using (private.has_role(id, array['owner']))
  with check (private.has_role(id, array['owner']));

create policy dealership_domains_select on public.dealership_domains for select to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales', 'viewer']));

create policy dealership_domains_insert on public.dealership_domains for insert to authenticated
  with check (private.has_role(dealership_id, array['owner', 'admin']));

create policy dealership_domains_update on public.dealership_domains for update to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin']))
  with check (private.has_role(dealership_id, array['owner', 'admin']));

create policy dealership_domains_delete on public.dealership_domains for delete to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin']));

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

create policy vehicle_private_access on public.vehicle_private for all to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin', 'manager']))
  with check (private.has_role(dealership_id, array['owner', 'admin', 'manager']));

create policy vehicle_media_select on public.vehicle_media for select to authenticated
  using (exists (select 1 from public.vehicles v where v.id = vehicle_id and private.can_access_branch(v.dealership_id, v.branch_id)));

create policy vehicle_media_manage on public.vehicle_media for all to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales']))
  with check (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales']));

create policy leads_select on public.leads for select to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales']));

create policy leads_manage on public.leads for all to authenticated
  using (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales']))
  with check (private.has_role(dealership_id, array['owner', 'admin', 'manager', 'sales']));

-- ==============================================================================
-- 4. SECURITY DEFINER RPCs FOR PUBLIC STOREFRONT
-- ==============================================================================

create or replace function private.resolve_host(p_host text) 
returns uuid language sql stable security definer set search_path = '' as $$
  select dm.dealership_id
  from public.dealership_domains dm
  join public.dealerships d on d.id = dm.dealership_id
  where dm.hostname = rtrim(regexp_replace(lower(btrim(p_host)), ':[0-9]+$', ''), '.')
    and dm.status in ('verified', 'active')
    and d.subscription_status in ('trialing', 'active', 'past_due')
  limit 1;
$$;

revoke all on function private.resolve_host(text) from public;

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
