"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function VehicleFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Search keyword */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search make, model..."
            defaultValue={searchParams.get("q") || ""}
            onChange={(e) => handleFilterChange("q", e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
        </div>

        {/* Body Type Filter */}
        <select
          value={searchParams.get("body") || ""}
          onChange={(e) => handleFilterChange("body", e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
        >
          <option value="">All Body Types</option>
          <option value="suv">SUV</option>
          <option value="sedan">Sedan</option>
          <option value="hatch">Hatchback</option>
          <option value="ute">Ute</option>
          <option value="wagon">Wagon</option>
          <option value="coupe">Coupe</option>
          <option value="van">Van</option>
        </select>

        {/* Transmission */}
        <select
          value={searchParams.get("transmission") || ""}
          onChange={(e) => handleFilterChange("transmission", e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
        >
          <option value="">All Transmissions</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>

        {/* Sort Order */}
        <select
          value={searchParams.get("sort") || "newest"}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="km_asc">Lowest Kilometers</option>
        </select>
      </div>
    </div>
  );
}
