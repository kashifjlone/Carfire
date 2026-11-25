"use client";

import React, { useState } from "react";
import { Phone, Mail, Car, Clock, MessageSquare, ChevronRight, CheckCircle2 } from "lucide-react";
import { updateLeadStageAction } from "@/lib/crm/actions";

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleTitle?: string;
  source: string;
  stage: "new" | "contacted" | "test_drive_booked" | "negotiating" | "won" | "lost";
  createdAt: string;
  message?: string;
}

const STAGES: Array<{ key: LeadItem["stage"]; label: string; color: string }> = [
  { key: "new", label: "New Enquiries", color: "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950/40" },
  { key: "contacted", label: "Contacted", color: "border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/40" },
  { key: "test_drive_booked", label: "Test Drive", color: "border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
  { key: "negotiating", label: "Negotiating", color: "border-purple-500 text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
  { key: "won", label: "Won / Sold", color: "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
];

export function LeadsKanban({ initialLeads, dealershipId }: { initialLeads: LeadItem[]; dealershipId: string }) {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);

  const handleStageChange = async (leadId: string, newStage: LeadItem["stage"]) => {
    // Optimistic UI update
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l)));

    const res = await updateLeadStageAction({
      dealershipId,
      leadId,
      stage: newStage,
    });

    if (!res.success) {
      alert("Failed to update lead stage");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
      {STAGES.map((col) => {
        const columnLeads = leads.filter((l) => l.stage === col.key);

        return (
          <div key={col.key} className="flex flex-col bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 min-w-[260px]">
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {col.label}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {columnLeads.length}
              </span>
            </div>

            {/* Cards List */}
            <div className="space-y-3 flex-1">
              {columnLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow transition"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{lead.name}</div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                      {lead.source}
                    </span>
                  </div>

                  {lead.vehicleTitle && (
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold mb-3">
                      <Car className="w-3.5 h-3.5" />
                      <span className="truncate">{lead.vehicleTitle}</span>
                    </div>
                  )}

                  <div className="space-y-1.5 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`tel:${lead.phone}`} className="hover:underline font-medium text-slate-700 dark:text-slate-300">
                        {lead.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{lead.email}</span>
                    </div>
                  </div>

                  {lead.message && (
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/40 text-[11px] text-slate-600 dark:text-slate-400 italic mb-3 line-clamp-2">
                      "{lead.message}"
                    </div>
                  )}

                  {/* Stage Advance Selector */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400">Move to:</span>
                    <select
                      value={lead.stage}
                      onChange={(e) => handleStageChange(lead.id, e.target.value as LeadItem["stage"])}
                      className="px-2 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                    >
                      {STAGES.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              {columnLeads.length === 0 && (
                <div className="h-24 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  No leads in this stage
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
