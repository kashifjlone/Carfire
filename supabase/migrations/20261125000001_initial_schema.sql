-- Migration: 20261125000001_initial_schema.sql
-- Description: Core multi-tenant database tables and composite integrity constraints

create extension if not exists "pgcrypto";

-- 1. PLATFORM & TENANCY TABLES
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

create table if not exists public.memberships (
  user_id uuid not null,
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'manager', 'sales', 'viewer')),
  status text not null default 'active' check (status in ('active', 'invited', 'suspended')),
  all_branches boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (user_id, dealership_id)
);

create table if not exists public.membership_branch_access (
  user_id uuid not null,
  dealership_id uuid not null,
  branch_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (user_id, dealership_id, branch_id),
  foreign key (user_id, dealership_id) references public.memberships(user_id, dealership_id) on delete cascade,
  foreign key (dealership_id, branch_id) references public.branches(dealership_id, id) on delete cascade
);

create table if not exists public.dealership_domains (
  id uuid primary key default gen_random_uuid(),
  dealership_id uuid not null references public.dealerships(id) on delete cascade,
  hostname text not null unique,
  status text not null default 'pending_dns' check (status in ('pending_dns', 'verified', 'active', 'failed')),
  is_primary boolean not null default false,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

-- 2. INVENTORY TABLES
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

-- 3. CRM & LEAD TABLES
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

-- 4. TRADE-IN APPRAISALS
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

-- 5. AUDIT LOGS (Append-Only)
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
