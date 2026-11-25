import React from "react";
import Link from "next/link";
import { Phone, MapPin, Car } from "lucide-react";

interface StorefrontHeaderProps {
  dealershipName: string;
  phone: string;
  licenceNumber?: string;
  state?: string;
}

export function StorefrontHeader({
  dealershipName,
  phone,
  licenceNumber,
  state = "NSW",
}: StorefrontHeaderProps) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
      {/* Statutory Dealer Licence Banner (Mandatory under State Motor Car Traders Laws) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 text-center border-b border-slate-800">
        <span>Licensed Motor Dealer: </span>
        <strong className="text-white">
          {state === "VIC" ? `LMCT ${licenceNumber || "TBD"}` : `${state} MD ${licenceNumber || "TBD"}`}
        </strong>
        <span className="mx-2">•</span>
        <span>ACL Single Drive-Away Price Guaranteed</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
          <Car className="w-6 h-6" />
          <span>{dealershipName}</span>
        </Link>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition"
          >
            <Phone className="w-4 h-4 text-blue-600" />
            <span>{phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
