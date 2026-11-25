import React, { Suspense } from "react";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { StorefrontHeader } from "@/components/storefront/StorefrontHeader";
import { VehicleCard } from "@/components/storefront/VehicleCard";
import { VehicleFilterBar } from "@/components/storefront/VehicleFilterBar";
import type { PublicVehicleSummary } from "@/lib/types/inventory";

interface StorefrontPageProps {
  searchParams: Promise<{
    body?: string;
    transmission?: string;
    sort?: string;
    q?: string;
  }>;
}

export default async function StorefrontCatalogPage({ searchParams }: StorefrontPageProps) {
  const query = await searchParams;
  const headerStore = await headers();
  const host = headerStore.get("x-tenant-host") || headerStore.get("host") || "localhost";
  const supabase = await createClient();

  // 1. Fetch storefront config
  const { data: configData } = await supabase.rpc("public_storefront_config", { p_host: host });
  const config = configData || {
    name: "Peninsula Motor Group",
    phone: "02 9999 8888",
    licences: [{ type: "Motor Dealer", number: "MD089123", jurisdiction: "NSW" }],
  };

  // 2. Query published vehicles via allowlisted security-definer RPC
  const { data: vehiclesData } = await supabase.rpc("public_vehicles", {
    p_host: host,
    p_body: query.body || null,
    p_transmission: query.transmission || null,
    p_sort: query.sort || "newest",
    p_limit: 24,
    p_offset: 0,
  });

  // Mock sample catalog for local preview if DB is fresh
  const vehicles: PublicVehicleSummary[] = (vehiclesData as PublicVehicleSummary[]) || [
    {
      id: "mock-1",
      slug: "2021-toyota-rav4-gxl-s1042",
      make: "Toyota",
      model: "RAV4",
      year: 2021,
      variant: "GXL AWD Hybrid",
      body_type: "suv",
      transmission: "automatic",
      odometer_km: 48500,
      total_price_cents: 3499000,
      egc_price_cents: 3250000,
      cover_image_key: null,
      published_at: new Date().toISOString(),
    },
    {
      id: "mock-2",
      slug: "2020-hyundai-i30-active-s1043",
      make: "Hyundai",
      model: "i30",
      year: 2020,
      variant: "Active",
      body_type: "hatch",
      transmission: "automatic",
      odometer_km: 62000,
      total_price_cents: 2199000,
      egc_price_cents: 2020000,
      cover_image_key: null,
      published_at: new Date().toISOString(),
    },
    {
      id: "mock-3",
      slug: "2019-ford-ranger-wildtrak-s1044",
      make: "Ford",
      model: "Ranger",
      year: 2019,
      variant: "Wildtrak 4x4",
      body_type: "ute",
      transmission: "automatic",
      odometer_km: 89000,
      total_price_cents: 4299000,
      egc_price_cents: 3999000,
      cover_image_key: null,
      published_at: new Date().toISOString(),
    },
  ];

  const licence = config.licences?.[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <StorefrontHeader
        dealershipName={config.name}
        phone={config.phone}
        licenceNumber={licence?.number}
        state={licence?.jurisdiction}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Our Quality Used Vehicles</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse our wide selection of certified used cars with clear titles and statutory guarantees.
          </p>
        </div>

        {/* Filter Bar */}
        <Suspense fallback={<div className="h-16 bg-white rounded-2xl animate-pulse mb-8" />}>
          <VehicleFilterBar />
        </Suspense>

        {/* Vehicle Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </main>
    </div>
  );
}
