"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface TrialSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export function TrialSignupModal({ isOpen, onClose, defaultPlan = "Growth Plan" }: TrialSignupModalProps) {
  const [dealershipName, setDealershipName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("NSW");
  const [inventorySize, setInventorySize] = useState("20-50");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant onboarding provision
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-2">Welcome Aboard, {dealershipName || "Partner"}!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              Your 14-day cardless trial of the <strong>{defaultPlan}</strong> is active. We have pre-configured a sample dealership lot with realistic Australian used-car inventory.
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl text-left text-xs text-blue-900 dark:text-blue-200 mb-6 space-y-1.5">
              <div className="font-bold">Next Steps for Your Yard:</div>
              <div>1. Open the Admin Portal to upload your current stock spreadsheet.</div>
              <div>2. Preview your instant, mobile-optimised public storefront.</div>
              <div>3. Connect your WhatsApp business number for direct buyer leads.</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/admin/inventory"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>Launch Dealership Admin</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/storefront"
                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-sm font-semibold transition inline-flex items-center justify-center"
              >
                Preview Public Storefront
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>14-Day Free Trial • No Credit Card Required</span>
            </div>
            <h2 className="text-2xl font-black mb-2">Start Your Dealership Free Trial</h2>
            <p className="text-xs text-slate-500 mb-6">
              Selected: <strong className="text-blue-600 dark:text-blue-400">{defaultPlan}</strong>. Try full inventory management, WhatsApp lead conversion, and ACL-compliant storefronts free for 14 days.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Dealership Trading Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Parramatta Motor Group"
                    value={dealershipName}
                    onChange={(e) => setDealershipName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Craig Evans"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="craig@dealership.com.au"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Australian Mobile / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0412 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    State / Jurisdiction
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="NSW">NSW (Fair Trading / Motor Dealers Act)</option>
                    <option value="VIC">VIC (Vicroads / LMCT Consumer Affairs)</option>
                    <option value="QLD">QLD (OFT / Motor Dealers Act)</option>
                    <option value="WA">WA (Consumer Protection)</option>
                    <option value="SA">SA (CBS Consumer & Business Services)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Approx. Inventory on Lot
                  </label>
                  <select
                    value={inventorySize}
                    onChange={(e) => setInventorySize(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="10-25">10–25 Vehicles (Starter)</option>
                    <option value="20-50">25–50 Vehicles (Growth)</option>
                    <option value="50-100">50–100 Vehicles (Scale)</option>
                    <option value="100+">100+ Vehicles (Multi-branch)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Cardless trial • Cancel anytime</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Provisioning Trial...</span>
                    </>
                  ) : (
                    <>
                      <span>Start 14-Day Free Trial</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
