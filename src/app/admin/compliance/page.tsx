import React from "react";
import { ShieldCheck, FileCheck, BookOpen, AlertCircle } from "lucide-react";
import { SAMPLE_DEALINGS_REGISTER } from "@/lib/compliance/dealings-data";
import { DealingsRegisterTable } from "@/components/admin/DealingsRegisterTable";

export default function AdminCompliancePage() {
  const entries = SAMPLE_DEALINGS_REGISTER;

  const inStockCount = entries.filter((e) => e.status === "in_stock").length;
  const reconCount = entries.filter((e) => e.status === "recon").length;
  const soldCount = entries.filter((e) => e.status === "sold").length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black tracking-tight">Statutory Compliance & Dealings Book</h1>
        <p className="text-sm text-slate-500 mt-1">
          Contemporaneous electronic motor car trader register complying with NSW Fair Trading, VIC LMCT, and QLD OFT regulations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Registered Lots</div>
          <div className="text-2xl font-black mt-1">{entries.length}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">In Yard Stock</div>
          <div className="text-2xl font-black mt-1 text-emerald-600">{inStockCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">In Reconditioning</div>
          <div className="text-2xl font-black mt-1 text-amber-600">{reconCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Sold & Handed Over</div>
          <div className="text-2xl font-black mt-1 text-blue-600">{soldCount}</div>
        </div>
      </div>

      {/* State Legislation Compliance Banner */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <div className="font-bold text-slate-900 dark:text-slate-100">
              Contemporaneous Register Active • Audit Ready
            </div>
            <div className="text-slate-500">
              Automatic statutory warranty calculation & 1-click buyer handover notice generation for NSW, VIC, and QLD.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
          <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            NSW Form 1
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            VIC Form 2
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            QLD Form 5
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            ACL s 48 Single Price
          </span>
        </div>
      </div>

      {/* Electronic Dealings Register Table */}
      <DealingsRegisterTable entries={entries} />
    </div>
  );
}
