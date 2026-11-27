"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Car,
  FileCheck,
} from "lucide-react";
import type { DealingsRegisterEntry } from "@/lib/types/compliance";
import { formatAud, formatKm } from "@/lib/utils";
import { StatutoryFormModal } from "@/components/admin/StatutoryFormModal";

interface DealingsRegisterTableProps {
  entries: DealingsRegisterEntry[];
}

export function DealingsRegisterTable({ entries }: DealingsRegisterTableProps) {
  const [selectedStatus, setSelectedStatus] = useState<"all" | "in_stock" | "recon" | "sold">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalEntry, setActiveModalEntry] = useState<DealingsRegisterEntry | null>(null);

  const filteredEntries = entries.filter((entry) => {
    if (selectedStatus !== "all" && entry.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchVin = entry.vehicle.vin.toLowerCase().includes(q);
      const matchStock = entry.stockNumber.toLowerCase().includes(q);
      const matchRego = entry.vehicle.rego.toLowerCase().includes(q);
      const matchMake = entry.vehicle.make.toLowerCase().includes(q);
      const matchModel = entry.vehicle.model.toLowerCase().includes(q);
      return matchVin || matchStock || matchRego || matchMake || matchModel;
    }
    return true;
  });

  const handleExportCsv = () => {
    const headers = [
      "Stock #",
      "Date Acquired",
      "Acquired From",
      "VIN",
      "Engine #",
      "Rego",
      "Year",
      "Make",
      "Model",
      "Body",
      "Odometer In",
      "Cost Price ($)",
      "Recon Cost ($)",
      "Drive Away Price ($)",
      "Status",
      "Date Sold",
      "Purchaser",
      "Sold Price ($)",
    ];

    const rows = entries.map((e) => [
      e.stockNumber,
      e.dateAcquired,
      `"${e.acquiredFrom.name}"`,
      e.vehicle.vin,
      e.vehicle.engineNumber,
      e.vehicle.rego,
      e.vehicle.year,
      e.vehicle.make,
      e.vehicle.model,
      e.vehicle.bodyType,
      e.vehicle.odometerKm,
      (e.financials.costPriceCents / 100).toFixed(2),
      (e.financials.reconditioningCostCents / 100).toFixed(2),
      (e.financials.driveAwayPriceCents / 100).toFixed(2),
      e.status,
      e.disposal?.dateSold || "",
      e.disposal ? `"${e.disposal.purchaserName}"` : "",
      e.disposal ? (e.disposal.soldPriceCents / 100).toFixed(2) : "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Dealings_Book_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedStatus === "all"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            All Lots ({entries.length})
          </button>
          <button
            onClick={() => setSelectedStatus("in_stock")}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedStatus === "in_stock"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            In Stock ({entries.filter((e) => e.status === "in_stock").length})
          </button>
          <button
            onClick={() => setSelectedStatus("recon")}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedStatus === "recon"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            In Recon ({entries.filter((e) => e.status === "recon").length})
          </button>
          <button
            onClick={() => setSelectedStatus("sold")}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedStatus === "sold"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Sold ({entries.filter((e) => e.status === "sold").length})
          </button>
        </div>

        {/* Search & Export Actions */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search VIN, Stock #, Rego..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-52 sm:w-64"
            />
          </div>

          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-blue-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Register</span>
          </button>
        </div>
      </div>

      {/* Dealings Register Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Stock #</th>
                <th className="py-3 px-4">Vehicle Particulars</th>
                <th className="py-3 px-4">Acquisition Details</th>
                <th className="py-3 px-4">Drive Away Price</th>
                <th className="py-3 px-4">Disposal Status</th>
                <th className="py-3 px-4 text-right">Statutory Forms</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredEntries.map((e) => (
                <tr key={e.stockNumber} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                  {/* Stock # & Badge */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{e.stockNumber}</div>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        e.status === "in_stock"
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          : e.status === "sold"
                          ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                          : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {e.status.replace("_", " ")}
                    </span>
                  </td>

                  {/* Vehicle Particulars */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      {e.vehicle.year} {e.vehicle.make} {e.vehicle.model}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      VIN: {e.vehicle.vin}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Rego: <strong>{e.vehicle.rego}</strong> • {formatKm(e.vehicle.odometerKm)}
                    </div>
                  </td>

                  {/* Acquisition Details */}
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{e.acquiredFrom.name}</div>
                    <div className="text-[10px] text-slate-500">Acquired: {e.dateAcquired}</div>
                    <div className="text-[10px] font-mono text-slate-400">{e.acquiredFrom.licenceOrDl}</div>
                  </td>

                  {/* Single Drive Away Price */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                      {formatAud(e.financials.driveAwayPriceCents)}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase">ACL Single Price</div>
                  </td>

                  {/* Disposal / Sold Particulars */}
                  <td className="py-3.5 px-4">
                    {e.disposal ? (
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {e.disposal.purchaserName}
                        </div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                          Sold {e.disposal.dateSold} for {formatAud(e.disposal.soldPriceCents)}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">Inv: {e.disposal.invoiceNumber}</div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Held in yard stock</span>
                    )}
                  </td>

                  {/* Action Button: Generate Form */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveModalEntry(e)}
                      className="px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition"
                    >
                      Generate Form
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statutory Form Modal */}
      <StatutoryFormModal
        entry={activeModalEntry}
        isOpen={!!activeModalEntry}
        onClose={() => setActiveModalEntry(null)}
      />
    </div>
  );
}
