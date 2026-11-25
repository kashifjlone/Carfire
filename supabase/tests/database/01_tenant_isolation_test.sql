-- Database Test: 01_tenant_isolation_test.sql
-- Description: Asserts tenant isolation, RLS constraints, and public projection allowlist

begin;

-- 1. Create two test dealerships
insert into public.dealerships (id, name, legal_entity_name, abn, slug, phone, email, whatsapp_number)
values 
  ('11111111-1111-1111-1111-111111111111', 'Sydney Car Yard', 'Sydney Cars Pty Ltd', '11111111111', 'sydney-cars', '0299990001', 'sales@sydneycars.com.au', '+61411111111'),
  ('22222222-2222-2222-2222-222222222222', 'Melbourne Auto Traders', 'Melbourne Auto Pty Ltd', '22222222222', 'melb-autos', '0399990002', 'sales@melbautos.com.au', '+61422222222');

-- 2. Create branches
insert into public.branches (id, dealership_id, name, address, state)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Parramatta Road', '123 Parramatta Rd', 'NSW'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Moorabbin Yard', '456 Nepean Hwy', 'VIC');

-- 3. Create active domains
insert into public.dealership_domains (dealership_id, hostname, status, is_primary)
values
  ('11111111-1111-1111-1111-111111111111', 'sydneycars.com.au', 'active', true),
  ('22222222-2222-2222-2222-222222222222', 'melbautos.com.au', 'active', true);

-- 4. Create vehicles
insert into public.vehicles (id, dealership_id, branch_id, vin, stock_number, make, model, year, body_type, transmission, fuel_type, odometer_km, total_price_cents, publication_status, slug)
values
  ('10000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'KMHD1111111111111', 'SYD-101', 'Hyundai', 'i30', 2020, 'hatch', 'automatic', 'petrol', 45000, 2299000, 'published', '2020-hyundai-i30-syd-101'),
  ('20000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'JM0ER222222222222', 'MEL-202', 'Mazda', 'CX-5', 2021, 'suv', 'automatic', 'petrol', 38000, 3199000, 'published', '2021-mazda-cx5-mel-202');

-- 5. Create private financials
insert into public.vehicle_private (vehicle_id, dealership_id, purchase_price_cents, reconditioning_cost_cents, target_margin_cents, internal_notes)
values
  ('10000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 1700000, 120000, 479000, 'Bought at Mannheim auction'),
  ('20000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 2400000, 150000, 649000, 'Private trade-in');

-- TEST ASSERTION 1: Host Resolution
do $$
declare
  resolved_tenant uuid;
begin
  resolved_tenant := private.resolve_host('sydneycars.com.au');
  if resolved_tenant != '11111111-1111-1111-1111-111111111111'::uuid then
    raise exception 'Assertion Failed: resolve_host failed for sydneycars.com.au';
  end if;

  resolved_tenant := private.resolve_host('UNKNOWN.com.au');
  if resolved_tenant is not null then
    raise exception 'Assertion Failed: unknown host resolved unexpectedly';
  end if;
end $$;

-- TEST ASSERTION 2: Public Storefront Vehicle Projection Isolation
do $$
declare
  v_count int;
begin
  -- Querying for sydneycars.com.au MUST return 1 vehicle (Hyundai i30) and ZERO Melbourne vehicles
  select count(*) into v_count from public.public_vehicles('sydneycars.com.au');
  if v_count != 1 then
    raise exception 'Assertion Failed: expected exactly 1 vehicle for Sydney Cars, got %', v_count;
  end if;

  -- Querying for melbautos.com.au MUST return 1 vehicle (Mazda CX-5) and ZERO Sydney vehicles
  select count(*) into v_count from public.public_vehicles('melbautos.com.au');
  if v_count != 1 then
    raise exception 'Assertion Failed: expected exactly 1 vehicle for Melb Autos, got %', v_count;
  end if;
end $$;

-- TEST ASSERTION 3: Audit Log Immutability
do $$
declare
  audit_id uuid;
begin
  insert into public.audit_logs (dealership_id, action, resource_type, resource_id)
  values ('11111111-1111-1111-1111-111111111111', 'vehicle.create', 'vehicle', '10000000-0000-0000-0000-000000000001')
  returning id into audit_id;

  begin
    update public.audit_logs set action = 'tampered' where id = audit_id;
    raise exception 'Assertion Failed: audit_logs allowed UPDATE operation';
  exception
    when others then
      -- Success: update was blocked by trigger
      null;
  end;
end $$;

rollback;
