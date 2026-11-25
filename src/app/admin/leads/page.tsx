import React from "react";
import { LeadsKanban, type LeadItem } from "@/components/admin/LeadsKanban";
import { Users, Clock, CheckCircle2, TrendingUp } from "lucide-react";

export default function AdminLeadsPage() {
  const dealershipId = "11111111-1111-1111-1111-111111111111";

  // Mock initial leads dataset
  const sampleLeads: LeadItem[] = [
    {
      id: "lead-1",
      name: "Daniel Morrison",
      email: "daniel.m@gmail.com",
      phone: "0412 888 999",
      vehicleTitle: "2021 Toyota RAV4 GXL AWD",
      source: "WhatsApp Click",
      stage: "new",
      createdAt: "10 mins ago",
      message: "Is this vehicle still available for inspection this Saturday?",
    },
    {
      id: "lead-2",
      name: "Amanda Watson",
      email: "a.watson@outlook.com.au",
      phone: "0423 456 789",
      vehicleTitle: "2020 Hyundai i30 Active",
      source: "Finance Enquiry",
      stage: "contacted",
      createdAt: "1 hour ago",
      message: "Seeking weekly finance quote with $3,000 cash deposit.",
    },
    {
      id: "lead-3",
      name: "Marcus Vance",
      email: "m.vance@yahoo.com.au",
      phone: "0434 111 222",
      vehicleTitle: "2019 Ford Ranger Wildtrak 4x4",
      source: "Trade-In Request",
      stage: "test_drive_booked",
      createdAt: "Yesterday",
      message: "Trading in 2016 Mazda 3 SP25 (approx 110,000 km).",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Leads & CRM Pipeline</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track buyer enquiries from your storefront website, WhatsApp clicks, and finance requests.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">New Enquiries</div>
          <div className="text-2xl font-black mt-1 text-blue-600">8</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Test Drives Booked</div>
          <div className="text-2xl font-black mt-1 text-indigo-600">4</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Avg. Response Time</div>
          <div className="text-2xl font-black mt-1 text-emerald-600">&lt; 3 mins</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Conversion Rate</div>
          <div className="text-2xl font-black mt-1 text-purple-600">18.4%</div>
        </div>
      </div>

      {/* Kanban Board */}
      <LeadsKanban initialLeads={sampleLeads} dealershipId={dealershipId} />
    </div>
  );
}
