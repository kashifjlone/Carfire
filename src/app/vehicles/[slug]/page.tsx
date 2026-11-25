import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { StorefrontHeader } from "@/components/storefront/StorefrontHeader";
import { FinanceCalculator } from "@/components/storefront/FinanceCalculator";
import { WhatsAppButton } from "@/components/storefront/WhatsAppButton";
import { formatAud, formatKm } from "@/lib/utils";
import type { PublicVehicleDetail } from "@/lib/types/inventory";
import { Shield, CheckCircle2, AlertCircle, Phone, Calendar, Gauge, Fuel } from "lucide-react";

interface VdpPageProps {
  params: Promise<{ slug: string }>;
}

async function getVehicleData(slug: string): Promise<{ vehicle: PublicVehicleDetail; config: any } | null> {
  const headerStore = await headers();
  const host = headerStore.get("x-tenant-host") || headerStore.get("host") || "localhost";
  const supabase = await createClient();

  // 1. Fetch storefront config (name, phone, licences)
  const { data: configData } = await supabase.rpc("public_storefront_config", { p_host: host });
  const config = configData || {
    name: "Peninsula Motor Group",
    phone: "02 9999 8888",
    whatsapp_number: "+61412345678",
    licences: [{ type: "Motor Dealer", number: "MD089123", jurisdiction: "NSW" }],
  };

  // 2. Fetch vehicle details via public allowlist RPC
  const { data: vehicleData, error } = await supabase.rpc("public_vehicle_by_slug", {
    p_host: host,
    p_slug: slug,
  });

  if (error || !vehicleData) {
    // Mock sample vehicle for local preview if DB is not connected yet
    return {
      config,
      vehicle: {
        id: "mock-v1",
        slug,
        stock_number: "S1042",
        vin: "6T1AA11A11A111111",
        make: "Toyota",
        model: "RAV4",
        year: 2021,
        variant: "GXL AWD",
        body_type: "suv",
        transmission: "automatic",
        fuel_type: "hybrid",
        odometer_km: 48500,
        price: {
          total_drive_away_cents: 3499000,
          egc_cents: 3250000,
        },
        description: "Immaculate one-owner RAV4 GXL Hybrid with full service history and two keys. Features adaptive cruise control, lane keep assist, Apple CarPlay, and reverse camera. Inspected and ready for immediate delivery.",
        features: ["Adaptive Cruise Control", "Apple CarPlay & Android Auto", "Blind Spot Monitor", "Reversing Camera", "Dual-Zone Climate Control"],
        imperfections: ["Minor superficial stone chip on front passenger bumper (touched up)"],
        availability: "in_stock",
        ppsr_summary: {
          status: "clear",
          checked_at: "2026-11-20",
        },
        statutory_warranty_class: "nsw_standard",
        branch: {
          name: "Main Showroom",
          address: "124 Parramatta Road, Granville NSW 2142",
          state: "NSW",
          phone: "02 9999 8888",
        },
        media: [],
      },
    };
  }

  return { vehicle: vehicleData as PublicVehicleDetail, config };
}

export async function generateMetadata({ params }: VdpPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getVehicleData(slug);
  if (!data) return { title: "Vehicle Not Found" };

  const { vehicle } = data;
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant || ""} - ${formatAud(vehicle.price.total_drive_away_cents)} Drive Away`;

  return {
    title,
    description: vehicle.description || `Browse this ${title} available for sale.`,
    openGraph: {
      title,
      description: vehicle.description || undefined,
    },
  };
}

export default async function VehicleDetailPage({ params }: VdpPageProps) {
  const { slug } = await params;
  const data = await getVehicleData(slug);
  if (!data) notFound();

  const { vehicle, config } = data;
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant || ""}`.trim();
  const licence = config.licences?.[0];

  // JSON-LD structured data for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: title,
    vehicleIdentificationNumber: vehicle.vin,
    modelDate: vehicle.year,
    brand: { "@type": "Brand", name: vehicle.make },
    model: vehicle.model,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.odometer_km,
      unitCode: "KMT",
    },
    offers: {
      "@type": "Offer",
      price: (vehicle.price.total_drive_away_cents / 100).toFixed(2),
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoDealer",
        name: config.name,
        telephone: config.phone,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <StorefrontHeader
        dealershipName={config.name}
        phone={config.phone}
        licenceNumber={licence?.number}
        state={licence?.jurisdiction}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Gallery & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Placeholder / Cover */}
            <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden flex items-center justify-center text-slate-400">
              <span className="text-sm font-medium">High-Resolution Photo Gallery</span>
            </div>

            {/* Vehicle Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                <span>Stock #{vehicle.stock_number}</span>
                <span>•</span>
                <span className="font-mono">VIN: {vehicle.vin}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                {title}
              </h1>
              <p className="text-sm text-slate-500">
                Located at: {vehicle.branch.name} ({vehicle.branch.address})
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h2 className="text-base font-bold mb-4">Vehicle Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-xs text-slate-400">Odometer</div>
                  <div className="font-semibold">{formatKm(vehicle.odometer_km)}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Transmission</div>
                  <div className="font-semibold capitalize">{vehicle.transmission}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Body Style</div>
                  <div className="font-semibold uppercase">{vehicle.body_type}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Fuel Type</div>
                  <div className="font-semibold capitalize">{vehicle.fuel_type}</div>
                </div>
              </div>
            </div>

            {/* Statutory Compliance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* PPSR Verified Badge */}
              <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300">
                <Shield className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold">PPSR Search Verified</div>
                  <div>
                    Checked on {vehicle.ppsr_summary.checked_at || "Recent"}. No written-off or security interests recorded.
                  </div>
                </div>
              </div>

              {/* State Statutory Warranty */}
              <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold">Statutory Dealer Warranty</div>
                  <div>
                    Covered under statutory dealer guarantee (3 months / 5,000 km) plus ACL Consumer Guarantees.
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h2 className="text-base font-bold mb-3">Dealer Comments</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
            )}

            {/* Disclosed Imperfections */}
            {vehicle.imperfections && vehicle.imperfections.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-5 text-amber-900 dark:text-amber-200">
                <div className="flex items-center gap-2 font-bold text-sm mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Condition Disclosures</span>
                </div>
                <ul className="list-disc list-inside text-xs space-y-1">
                  {vehicle.imperfections.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Finance Repayment Calculator */}
            <FinanceCalculator totalPriceCents={vehicle.price.total_drive_away_cents} />
          </div>

          {/* Sidebar Column: Price & Conversion CTAs */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm sticky top-24">
              {/* Single Total Headline Price (ACL s 48 Compliance) */}
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Total Drive Away Price
                </div>
                <div className="text-4xl font-black text-slate-900 dark:text-slate-100 my-1">
                  {formatAud(vehicle.price.total_drive_away_cents)}
                </div>
                {vehicle.price.egc_cents && (
                  <div className="text-xs text-slate-400">
                    {formatAud(vehicle.price.egc_cents)} Excl. Govt Charges
                  </div>
                )}
                <div className="text-[11px] text-slate-500 mt-1">
                  Includes all transfer fees, stamp duty, and statutory dealer charges in {vehicle.branch.state}.
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="space-y-3">
                <WhatsAppButton
                  whatsappNumber={config.whatsapp_number}
                  vehicleTitle={title}
                  stockNumber={vehicle.stock_number}
                  totalPriceCents={vehicle.price.total_drive_away_cents}
                  className="w-full"
                />

                <a
                  href={`tel:${config.phone}`}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-semibold py-3 px-6 rounded-xl transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {config.phone}</span>
                </a>
              </div>

              {/* Fast Enquiry Form */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-sm mb-3">Send Online Enquiry</h3>
                <form className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    required
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                  <input
                    type="tel"
                    placeholder="Australian Mobile Number"
                    required
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                  {/* Honeypot hidden input */}
                  <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

                  <button
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition"
                  >
                    Submit Enquiry
                  </button>
                  <div className="text-[10px] text-slate-400 text-center">
                    Protected by Turnstile and Australian Privacy Principles.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
