"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, FileSpreadsheet, Search, Filter } from "lucide-react";
import { InventoryTable } from "@/components/admin/InventoryTable";
import { AddVehicleModal } from "@/components/admin/AddVehicleModal";
import type { Vehicle } from "@/lib/types/inventory";

export default function AdminInventoryPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const dealershipId = "11111111-1111-1111-1111-111111111111";
  const branchId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

  // Mock initial vehicle dataset
  const sampleVehicles: Vehicle[] = [
    {
      id: "v-1",
      dealership_id: dealershipId,
      branch_id: branchId,
      vin: "6T1AA11A11A111111",
      stock_number: "S-1042",
      make: "Toyota",
      model: "RAV4",
      year: 2021,
      variant: "GXL AWD Hybrid",
      body_type: "suv",
      transmission: "automatic",
      fuel_type: "hybrid",
      odometer_km: 48500,
      total_price_cents: 3499000,
      egc_price_cents: 3250000,
      publication_status: "published",
      availability: "in_stock",
      slug: "2021-toyota-rav4-gxl-s1042",
      features: ["CarPlay", "Adaptive Cruise"],
      imperfections: [],
      ppsr_status: "clear",
      statutory_warranty_class: "nsw_standard",
      niche_attributes: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "v-2",
      dealership_id: dealershipId,
      branch_id: branchId,
      vin: "KMHD1234567890123",
      stock_number: "S-1043",
      make: "Hyundai",
      model: "i30",
      year: 2020,
      variant: "Active",
      body_type: "hatch",
      transmission: "automatic",
      fuel_type: "petrol",
      odometer_km: 62000,
      total_price_cents: 2199000,
      publication_status: "published",
      availability: "in_stock",
      slug: "2020-hyundai-i30-s1043",
      features: ["Apple CarPlay"],
      imperfections: [],
      ppsr_status: "clear",
      statutory_warranty_class: "nsw_standard",
      niche_attributes: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "v-3",
      dealership_id: dealershipId,
      branch_id: branchId,
      vin: "1FTFW1E84KFA12345",
      stock_number: "S-1044",
      make: "Ford",
      model: "Ranger",
      year: 2019,
      variant: "Wildtrak 4x4",
      body_type: "ute",
      transmission: "automatic",
      fuel_type: "diesel",
      odometer_km: 89000,
      total_price_cents: 4299000,
      publication_status: "draft",
      availability: "in_stock",
      slug: "2019-ford-ranger-s1044",
      features: ["Tow Bar", "Roller Shutter"],
      imperfections: [],
      ppsr_status: "clear",
      statutory_warranty_class: "nsw_standard",
      niche_attributes: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

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
