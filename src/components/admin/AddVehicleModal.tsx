"use client";

import React, { useState } from "react";
import { X, Plus, DollarSign, ShieldAlert, Sparkles } from "lucide-react";
import { createVehicleAction } from "@/lib/inventory/actions";
import type { BodyType, Transmission, FuelType, PublicationStatus } from "@/lib/types/inventory";

interface AddVehicleModalProps {
  dealershipId: string;
  branchId: string;
  isOpen: boolean;
  onClose: () => void;
  onVehicleAdded?: () => void;
}

export function AddVehicleModal({
  dealershipId,
  branchId,
  isOpen,
  onClose,
  onVehicleAdded,
}: AddVehicleModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [vin, setVin] = useState("");
  const [stockNumber, setStockNumber] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [variant, setVariant] = useState("");
  const [bodyType, setBodyType] = useState<BodyType>("suv");
  const [transmission, setTransmission] = useState<Transmission>("automatic");
  const [fuelType, setFuelType] = useState<FuelType>("petrol");
  const [odometerKm, setOdometerKm] = useState<number>(50000);
  const [totalPriceDollars, setTotalPriceDollars] = useState<number>(29990);
  const [egcPriceDollars, setEgcPriceDollars] = useState<number | "">("");
  const [publicationStatus, setPublicationStatus] = useState<PublicationStatus>("published");
  
  // Private Financials (Field-level isolated)
  const [purchasePriceDollars, setPurchasePriceDollars] = useState<number | "">("");
  const [reconditioningCostDollars, setReconditioningCostDollars] = useState<number | "">("");
  const [internalNotes, setInternalNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      dealershipId,
      branchId,
      vin: vin.trim().toUpperCase(),
      stockNumber: stockNumber.trim(),
      make: make.trim(),
      model: model.trim(),
      year: Number(year),
      variant: variant.trim() || undefined,
      bodyType,
      transmission,
      fuelType,
      odometerKm: Number(odometerKm),
      totalPriceCents: Math.round(Number(totalPriceDollars) * 100),
      egcPriceCents: egcPriceDollars ? Math.round(Number(egcPriceDollars) * 100) : undefined,
      publicationStatus,
      availability: "in_stock" as const,
      features: [],
      imperfections: [],
      statutoryWarrantyClass: "nsw_standard" as const,
      purchasePriceCents: purchasePriceDollars ? Math.round(Number(purchasePriceDollars) * 100) : undefined,
      reconditioningCostCents: reconditioningCostDollars ? Math.round(Number(reconditioningCostDollars) * 100) : undefined,
      internalNotes: internalNotes.trim() || undefined,
    };

    const res = await createVehicleAction(payload);
    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || "Failed to create vehicle");
    } else {
      if (onVehicleAdded) onVehicleAdded();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600">
              <Plus className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold">Add Vehicle to Inventory</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Section: Core Identification */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">Vehicle Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">VIN (17 chars) *</label>
                <input
                  type="text"
                  required
                  maxLength={17}
                  placeholder="e.g. 6T1AA..."
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Stock Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S-1045"
                  value={stockNumber}
                  onChange={(e) => setStockNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Year *</label>
                <input
                  type="number"
                  required
                  min={1980}
                  max={2030}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Make *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Toyota"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Model *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RAV4"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Variant / Badge</label>
                <input
                  type="text"
                  placeholder="e.g. GXL AWD"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Section: Specs */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Body Type</label>
                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value as BodyType)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="hatch">Hatch</option>
                  <option value="ute">Ute</option>
                  <option value="wagon">Wagon</option>
                  <option value="van">Van</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Transmission</label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value as Transmission)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Fuel Type</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as FuelType)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Odometer (km) *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={odometerKm}
                  onChange={(e) => setOdometerKm(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Section: Pricing (ACL s 48 Compliant) */}
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/60">
            <h3 className="text-xs uppercase tracking-wider font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Advertised Pricing (ACL s 48 Single Price Rule)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-900 dark:text-slate-100">
                  Total Drive-Away Price ($ AUD) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  placeholder="e.g. 29990"
                  value={totalPriceDollars}
                  onChange={(e) => setTotalPriceDollars(Number(e.target.value))}
                  className="w-full px-3 py-2 text-base font-bold rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300"
                />
                <p className="text-[10px] text-slate-500 mt-1">Must be the hero headline price under Australian Consumer Law.</p>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Excl. Govt Charges Price ($ AUD optional)
                </label>
                <input
                  type="number"
                  min={1}
                  placeholder="e.g. 27500"
                  value={egcPriceDollars}
                  onChange={(e) => setEgcPriceDollars(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
                <p className="text-[10px] text-slate-400 mt-1">Cannot be higher than total drive-away price.</p>
              </div>
            </div>
          </div>

          {/* Section: Private Financials (Field-Level Protected) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1 flex items-center gap-1.5">
              <span>Internal Financials (Private — Owner/Manager Only)</span>
            </h3>
            <p className="text-[10px] text-slate-400 mb-3">Sales staff cannot view these columns.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1 text-slate-600 dark:text-slate-400">Purchase Cost ($ AUD)</label>
                <input
                  type="number"
                  placeholder="e.g. 24000"
                  value={purchasePriceDollars}
                  onChange={(e) => setPurchasePriceDollars(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-slate-600 dark:text-slate-400">Recon Spend ($ AUD)</label>
                <input
                  type="number"
                  placeholder="e.g. 1200"
                  value={reconditioningCostDollars}
                  onChange={(e) => setReconditioningCostDollars(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Publication Status Toggle */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-sm font-bold">Publish to Website Immediately?</div>
              <div className="text-xs text-slate-500">You can also save as draft to upload photos first.</div>
            </div>
            <select
              value={publicationStatus}
              onChange={(e) => setPublicationStatus(e.target.value as PublicationStatus)}
              className="px-3 py-1.5 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="published">Publish Online</option>
              <option value="draft">Save as Draft</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 dark:hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
