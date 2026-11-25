import React from "react";
import Link from "next/link";
import {
  Car,
  FileSpreadsheet,
  Users,
  CreditCard,
  Settings,
  ExternalLink,
  Shield,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col md:flex-row text-slate-900 dark:text-slate-100">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        {/* Dealership Brand Banner */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5 font-bold text-lg text-white">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Car className="w-5 h-5" />
            </div>
            <span>AutoSaaS DMS</span>
          </div>
          <div className="mt-3 bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/60 flex items-center justify-between">
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Peninsula Motor Group</div>
              <div className="text-[10px] text-slate-400">NSW MD #089123</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Subscription" />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 text-sm font-medium">
          <Link
            href="/admin/inventory"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition text-slate-300"
          >
            <Car className="w-4 h-4 text-blue-400" />
            <span>Inventory</span>
          </Link>

          <Link
            href="/admin/import"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition text-slate-300"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Import Stock (CSV)</span>
          </Link>

          <Link
            href="/admin/leads"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition text-slate-300"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Leads & CRM</span>
          </Link>

          <Link
            href="/admin/billing"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition text-slate-300"
          >
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>Billing & Tax Invoices</span>
          </Link>

          <div className="pt-4 pb-1">
            <div className="px-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Storefront</div>
          </div>

          <Link
            href="/storefront"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition text-slate-300 group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>Live Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition" />
          </Link>
        </nav>

        {/* Footer Account Status */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Role: Dealership Owner</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Australian B2B SaaS • v2.3
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Branch: <strong>Main Showroom (Granville, NSW)</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
              ACL s 48 Compliant
            </span>
          </div>
        </header>

        <main className="p-6 md:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
