"use client";

import React, { useState } from "react";
import { formatAud, formatKm } from "@/lib/utils";
import type { Vehicle } from "@/lib/types/inventory";
import { setVehiclePublicationStatusAction } from "@/lib/inventory/actions";
import { Eye, EyeOff, MoreVertical, Edit2, Trash2 } from "lucide-react";

interface InventoryTableProps {
  initialVehicles: Vehicle[];
  dealershipId: string;
}

export function InventoryTable({ initialVehicles, dealershipId }: InventoryTableProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);

  const togglePublication = async (vehicleId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "published" ? "draft" : "published";
    
    // Optimistic UI update
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, publication_status: nextStatus } : v))
    );

    const res = await setVehiclePublicationStatusAction({
      dealershipId,
      vehicleId,
      status: nextStatus,
    });

    if (!res.success) {
      // Revert if failed
      setVehicles(initialVehicles);
      alert("Failed to update status: " + res.error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3.5 px-4">Vehicle</th>
              <th className="py-3.5 px-4">Stock # / VIN</th>
              <th className="py-3.5 px-4">Odometer</th>
              <th className="py-3.5 px-4">Drive Away Price</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {vehicles.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                {/* Vehicle Title & Badge */}
                <td className="py-4 px-4">
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {v.year} {v.make} {v.model}
                  </div>
                  <div className="text-xs text-slate-500 capitalize">
                    {v.variant || ""} • {v.body_type} • {v.transmission}
                  </div>
                </td>

                {/* Stock Number & VIN */}
                <td className="py-4 px-4">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{v.stock_number}</div>
                  <div className="text-xs font-mono text-slate-400">{v.vin}</div>
                </td>

                {/* Odometer */}
                <td className="py-4 px-4 font-medium text-slate-700 dark:text-slate-300">
                  {formatKm(v.odometer_km)}
                </td>

                {/* Drive Away Price (ACL Hero Price) */}
                <td className="py-4 px-4">
                  <div className="font-extrabold text-blue-600 dark:text-blue-400">
                    {formatAud(v.total_price_cents)}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Drive Away</div>
                </td>

                {/* Publication Status Badge */}
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      v.publication_status === "published"
                        ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
                        : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${v.publication_status === "published" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    <span>{v.publication_status}</span>
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => togglePublication(v.id, v.publication_status)}
                      title={v.publication_status === "published" ? "Unpublish" : "Publish Online"}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      {v.publication_status === "published" ? (
                        <EyeOff className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-emerald-600" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
