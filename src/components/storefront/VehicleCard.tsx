import React from "react";
import Link from "next/link";
import { formatAud, formatKm } from "@/lib/utils";
import type { PublicVehicleSummary } from "@/lib/types/inventory";
import { Shield, Gauge, Fuel } from "lucide-react";

export function VehicleCard({ vehicle }: { vehicle: PublicVehicleSummary }) {
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant || ""}`.trim();
  const coverUrl = vehicle.cover_image_key
    ? `${process.env.R2_PUBLIC_DOMAIN || "https://media.platform.com.au"}/${vehicle.cover_image_key}`
    : "/images/placeholder-car.webp";

  return (
    <Link
      href={`/vehicles/${vehicle.slug}`}
      className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition duration-200"
    >
      {/* Cover Photo */}
      <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-md">
          {vehicle.body_type.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 transition">
          {title}
        </h3>

        {/* Specs badges */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2 mb-4">
          <div className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" />
            <span>{formatKm(vehicle.odometer_km)}</span>
          </div>
          <span className="capitalize">{vehicle.transmission}</span>
        </div>

        {/* Price (ACL s 48 Single Total Price Compliance) */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {formatAud(vehicle.total_price_cents)}
            </div>
            <div className="text-[10px] font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Drive Away
            </div>
          </div>

          {vehicle.egc_price_cents && (
            <div className="text-right text-xs text-slate-400">
              <div>{formatAud(vehicle.egc_price_cents)}</div>
              <div className="text-[9px]">Excl. Govt Charges</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
