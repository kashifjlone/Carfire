"use client";

import React, { useState } from "react";
import {
  Car,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Phone,
  Sparkles,
} from "lucide-react";
import { formatAud } from "@/lib/utils";
import { submitTradeInAction } from "@/lib/trade-in/actions";
import { estimateTradeInValuation } from "@/lib/trade-in/valuation";

interface TradeInAppraisalWidgetProps {
  vehicleTitle: string;
  vehicleStockNumber?: string;
  vehiclePriceCents: number;
}

export function TradeInAppraisalWidget({
  vehicleTitle,
  vehicleStockNumber,
  vehiclePriceCents,
}: TradeInAppraisalWidgetProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [rego, setRego] = useState("");
  const [regoState, setRegoState] = useState<"NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "ACT" | "NT">("NSW");
  const [year, setYear] = useState<number>(2018);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [odometerKm, setOdometerKm] = useState<number>(65000);
  const [condition, setCondition] = useState<"excellent" | "good" | "fair" | "poor">("good");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [valuationResult, setValuationResult] = useState<{
    minAud: number;
    maxAud: number;
    indicativeTradeAud: number;
  } | null>(null);

  // Calculate live preview
  const liveEstimate = estimateTradeInValuation({
    year,
    odometerKm,
    condition,
  });

  const estimatedChangeoverCents = Math.max(
    0,
    vehiclePriceCents - liveEstimate.indicativeTradeAud * 100
  );

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !rego) {
      setErrorMessage("Please complete vehicle registration, make, and model.");
      return;
    }
    setErrorMessage(null);
    setValuationResult(liveEstimate);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitTradeInAction({
      dealershipId: "00000000-0000-0000-0000-000000000001",
      vehicleTitle,
      stockNumber: vehicleStockNumber,
      name,
      email,
      phone,
      rego,
      regoState,
      make,
      model,
      year: Number(year),
      odometerKm: Number(odometerKm),
      condition,
      comments,
      honeypot,
    });

    setIsSubmitting(false);

    if (!res.success) {
      setErrorMessage(res.error || "Failed to submit trade-in appraisal");
      return;
    }

    if (res.valuation) {
      setValuationResult(res.valuation);
    }
    setStep(3);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Instant Trade-In Valuation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Value Your Current Car & Lower Your Price
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Get an instant indicative trade-in valuation against this <strong>{vehicleTitle}</strong>. 
            All makes and models accepted.
          </p>
        </div>

        {step < 3 && (
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <span>Step {step} of 2</span>
          </div>
        )}
      </div>

      {/* STEP 1: Vehicle Details Form */}
      {step === 1 && (
        <form onSubmit={handleNextToStep2} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Rego & State */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Vehicle Registration # *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ABC12D"
                value={rego}
                onChange={(e) => setRego(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 text-sm uppercase font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                State of Registration *
              </label>
              <select
                value={regoState}
                onChange={(e) => setRegoState(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="NSW">NSW (New South Wales)</option>
                <option value="VIC">VIC (Victoria)</option>
                <option value="QLD">QLD (Queensland)</option>
                <option value="SA">SA (South Australia)</option>
                <option value="WA">WA (Western Australia)</option>
                <option value="TAS">TAS (Tasmania)</option>
                <option value="ACT">ACT (Australian Capital Territory)</option>
                <option value="NT">NT (Northern Territory)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Year of Manufacture *
              </label>
              <input
                type="number"
                required
                min={1990}
                max={new Date().getFullYear() + 1}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Make */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Make *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mazda, Toyota, Hyundai"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Model *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 3, Corolla, i30"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Odometer */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Odometer (KM) *
              </label>
              <input
                type="number"
                required
                min={100}
                max={1000000}
                value={odometerKm}
                onChange={(e) => setOdometerKm(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Condition Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Overall Vehicle Condition *
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(["excellent", "good", "fair", "poor"] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCondition(c)}
                    className={`py-2 text-xs font-bold rounded-xl capitalize transition border ${
                      condition === c
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-md flex items-center gap-2"
            >
              <span>Calculate Indicative Valuation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Indicative Estimate & Contact Submission */}
      {step === 2 && valuationResult && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Indicative Calculation Display Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 dark:from-slate-800 dark:via-blue-950/30 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100 dark:border-blue-900/40">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
                  Your Indicative Trade-In Estimate:
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
                  ${valuationResult.minAud.toLocaleString()} – ${valuationResult.maxAud.toLocaleString()} AUD
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  For your {year} {make} {model} ({odometerKm.toLocaleString()} km, {condition} condition)
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-[11px] text-slate-500 uppercase font-bold">Estimated Changeover:</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  Approx {formatAud(estimatedChangeoverCents)}
                </div>
                <div className="text-[10px] text-slate-400">
                  {formatAud(vehiclePriceCents)} minus trade-in
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 italic">
              * Indicative appraisal estimate only under ACL guidelines. Final trade-in price confirmed upon physical lot inspection and clear PPSR title.
            </p>
          </div>

          {/* Contact Details Form */}
          <div className="space-y-4">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Where should we send your official appraisal offer?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam O'Connor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Australian Phone Number *
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="liam@example.com.au"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Anti-spam honeypot */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            >
              Back to Vehicle Specs
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Appraisal...</span>
                </>
              ) : (
                <>
                  <span>Submit for Guaranteed Valuation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Success Confirmation */}
      {step === 3 && valuationResult && (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 mx-auto mb-2">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-black">Trade-In Appraisal Received!</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Thank you, <strong>{name}</strong>! Your trade-in valuation enquiry for your{" "}
            <strong>{year} {make} {model}</strong> has been forwarded to our dealership appraisal team.
          </p>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-md mx-auto text-xs text-left space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-slate-100">Appraisal Summary:</div>
            <div>Vehicle of Interest: <strong>{vehicleTitle}</strong></div>
            <div>Your Trade-In: <strong>{year} {make} {model} (Rego: {rego} {regoState})</strong></div>
            <div>Indicative Valuation Range: <strong>${valuationResult.minAud.toLocaleString()} – ${valuationResult.maxAud.toLocaleString()} AUD</strong></div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`https://wa.me/61412345678?text=${encodeURIComponent(
                `Hi, I just submitted an online trade-in appraisal for my ${year} ${make} ${model} (Rego: ${rego}) against the ${vehicleTitle}. My name is ${name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm inline-flex items-center justify-center gap-2"
            >
              <span>Fast-Track via WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setStep(1);
                setRego("");
                setMake("");
                setModel("");
              }}
              className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold"
            >
              Value Another Vehicle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
