import React from "react";
import { LeadsKanban, type LeadItem } from "@/components/admin/LeadsKanban";
import { Users, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { getGlobalLeads } from "@/lib/crm/leads-store";

export const dynamic = "force-dynamic";

export default function AdminLeadsPage() {
  const dealershipId = "11111111-1111-1111-1111-111111111111";
  const sampleLeads: LeadItem[] = getGlobalLeads();

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
