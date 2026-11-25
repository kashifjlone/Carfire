import React from "react";
import { CsvUploadZone } from "@/components/admin/CsvUploadZone";
import { FileCheck, Shield, Zap } from "lucide-react";

export default function AdminImportPage() {
  const dealershipId = "11111111-1111-1111-1111-111111111111";
  const branchId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Import Stock from CSV</h1>
        <p className="text-sm text-slate-500 mt-1">
          Migrate your entire lot from EasyCars, Virtual Yard, Dealer Solutions, or Excel in seconds.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 shrink-0">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold">Auto-Column Mapping</div>
            <div className="text-[11px] text-slate-500">Detects VIN, Year, Make, Model, Odometer, and Price.</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold">Photo Re-Hosting</div>
            <div className="text-[11px] text-slate-500">Downloads photo URLs and optimizes to Cloudflare WebP.</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold">SSRF Safe Import</div>
            <div className="text-[11px] text-slate-500">Zero private network exposure with strict IP filters.</div>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <CsvUploadZone dealershipId={dealershipId} branchId={branchId} />
    </div>
  );
}
