import React from "react";
import { SAAS_PLANS } from "@/lib/billing/stripe";
import { formatAud } from "@/lib/utils";
import { Check, CreditCard, Download, ShieldCheck, Zap, FileText } from "lucide-react";

export default function AdminBillingPage() {
  const currentPlan = SAAS_PLANS[0]; // Starter Plan
  const currentVehicleCount = 21;
  const maxVehicles = currentPlan.maxVehicles;
  const capacityPct = Math.round((currentVehicleCount / maxVehicles) * 100);

  // Sample Australian Tax Invoices
  const sampleInvoices = [
    {
      id: "INV-2026-003",
      date: "1 Nov 2026",
      amountAudExGst: 199.00,
      gstAud: 19.90,
      totalAud: 218.90,
      status: "Paid",
    },
    {
      id: "INV-2026-002",
      date: "1 Oct 2026",
      amountAudExGst: 199.00,
      gstAud: 19.90,
      totalAud: 218.90,
      status: "Paid",
    },
    {
      id: "INV-2026-001",
      date: "1 Sep 2026",
      amountAudExGst: 199.00,
      gstAud: 19.90,
      totalAud: 218.90,
      status: "Paid",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Subscription & Australian Tax Invoices</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your dealership SaaS subscription, card details, and download compliant 10% GST Tax Invoices.
        </p>
      </div>

      {/* Current Subscription Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-blue-600 mb-1">Current Active Plan</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">{currentPlan.name}</span>
              <span className="text-sm font-semibold text-slate-500">
                ${currentPlan.priceAudMonthly}/mo <span className="text-xs text-slate-400">(excl. 10% GST)</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-sm font-semibold transition">
              Change Plan
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition shadow-sm">
              Manage on Stripe Portal
            </button>
          </div>
        </div>

        {/* Capacity Usage Meter */}
        <div className="py-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>Lot Stock Capacity:</span>
            <span>
              <strong>{currentVehicleCount}</strong> of <strong>{maxVehicles}</strong> vehicles published ({capacityPct}%)
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                capacityPct > 85 ? "bg-amber-500" : "bg-blue-600"
              }`}
              style={{ width: `${capacityPct}%` }}
            />
          </div>
        </div>

        {/* Payment Method & Tax Invoicing Info */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-start gap-3">
            <CreditCard className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">Visa ending in 4242</div>
              <div>Renews on 1 December 2026 for $218.90 AUD (incl. GST)</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">Compliant Australian Tax Invoice</div>
              <div>ABN 12 345 678 901 • Claim 10% input tax credit on your quarterly BAS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans Comparison */}
      <div>
        <h2 className="text-lg font-bold mb-4">Available Dealership Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAAS_PLANS.map((plan) => {
            const isCurrent = plan.id === currentPlan.id;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 border flex flex-col justify-between transition ${
                  isCurrent
                    ? "bg-white dark:bg-slate-900 border-blue-600 shadow-md ring-2 ring-blue-600/20"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-base">{plan.name}</h3>
                    {isCurrent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                      ${plan.priceAudMonthly}
                    </span>
                    <span className="text-xs text-slate-500">AUD / mo (excl. GST)</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  disabled={isCurrent}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                    isCurrent
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  }`}
                >
                  {isCurrent ? "Current Plan" : "Switch to " + plan.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tax Invoices History Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold">Tax Invoices (BAS Documentation)</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount (excl. GST)</th>
                <th className="py-3 px-4">10% GST</th>
                <th className="py-3 px-4">Total AUD</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sampleInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">{inv.id}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{inv.date}</td>
                  <td className="py-3.5 px-4 font-medium">${inv.amountAudExGst.toFixed(2)}</td>
                  <td className="py-3.5 px-4 text-slate-500">${inv.gstAud.toFixed(2)}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">${inv.totalAud.toFixed(2)}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 transition" title="Download Tax Invoice PDF">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
