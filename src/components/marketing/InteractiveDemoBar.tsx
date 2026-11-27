"use client";

import React from "react";
import Link from "next/link";
import { Eye, LayoutDashboard, Sparkles, ExternalLink } from "lucide-react";

export function InteractiveDemoBar() {
  return (
    <aside aria-label="Demo Bar" className="sticky top-0 z-40 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white text-xs py-2 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold">
            Live Interactive Demo Available:
          </span>
          <span className="text-blue-200 hidden md:inline">
            Test drive the full Australian dealer suite with realistic seeded lot data.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/storefront"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium text-white text-[11px]"
          >
            <Eye className="w-3.5 h-3.5 text-blue-300" />
            <span>Storefront (Buyer View)</span>
          </Link>

          <Link
            href="/admin/inventory"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-slate-950 hover:bg-blue-50 transition font-bold text-[11px] shadow-sm"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
            <span>Dealer Admin Portal</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
