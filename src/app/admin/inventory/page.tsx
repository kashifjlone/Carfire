"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, FileSpreadsheet, Search, Filter } from "lucide-react";
import { InventoryTable } from "@/components/admin/InventoryTable";
import { AddVehicleModal } from "@/components/admin/AddVehicleModal";
import { FacebookFeedCard } from "@/components/admin/FacebookFeedCard";
import { SAMPLE_VEHICLES } from "@/lib/inventory/mock-data";
import type { Vehicle } from "@/lib/types/inventory";

export default function AdminInventoryPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const dealershipId = "11111111-1111-1111-1111-111111111111";
  const branchId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
  const sampleVehicles: Vehicle[] = SAMPLE_VEHICLES;

  return (
    <div className="space-y-6">
      {/* Top Header with Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Stock Inventory</h1>
          <p className="text-sm text-slate-500">
            Manage your vehicles, pricing, and live website publications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/import"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-sm font-semibold transition shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span>Import CSV</span>
          </Link>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Vehicles</div>
          <div className="text-2xl font-black mt-1">24</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Live on Storefront</div>
          <div className="text-2xl font-black mt-1 text-emerald-600">21</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Drafts / In Recon</div>
          <div className="text-2xl font-black mt-1 text-amber-600">3</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Under Offer / Sold</div>
          <div className="text-2xl font-black mt-1 text-blue-600">2</div>
        </div>
      </div>

      {/* Facebook AIA Catalog Sync Card */}
      <FacebookFeedCard />

      {/* Inventory Table */}
      <InventoryTable initialVehicles={sampleVehicles} dealershipId={dealershipId} />

      {/* Add Vehicle Modal */}
      <AddVehicleModal
        dealershipId={dealershipId}
        branchId={branchId}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
