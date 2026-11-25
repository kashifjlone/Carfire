-- Migration: 20261125000003_public_storefront_rpcs.sql
-- Description: Security-definer RPCs for public storefront catalog projection (taking host, never tenant ID)

-- 1. HOST RESOLUTION (Database-internal resolution against active domains)
create or replace function private.resolve_host(p_host text) 
returns uuid language sql stable security definer set search_path = '' as $$
  select dm.dealership_id
  from public.dealership_domains dm
  join public.dealerships d on d.id = dm.dealership_id
  where dm.hostname = rtrim(regexp_replace(lower(btrim(p_host)), ':[0-9]+$', ''), '.')
    and dm.status = 'active'
    and d.subscription_status in ('trialing', 'active', 'past_due')
  limit 1;
$$;

revoke all on function private.resolve_host(text) from public;

-- 2. PUBLIC STOREFRONT CONFIGURATION
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

-- 3. PUBLIC FILTERED VEHICLE LISTING (Paginated, Whitelisted Sort)
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

-- 4. PUBLIC VEHICLE DETAIL PAGE (VDP) BY SLUG
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
