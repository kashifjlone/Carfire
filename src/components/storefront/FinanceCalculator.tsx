"use client";

import React, { useState, useMemo } from "react";
import { calculateRepayment, formatAud } from "@/lib/utils";
import { Calculator, ArrowRight, Info } from "lucide-react";

interface FinanceCalculatorProps {
  totalPriceCents: number;
  onEnquireClick?: () => void;
}

export function FinanceCalculator({ totalPriceCents, onEnquireClick }: FinanceCalculatorProps) {
  const [depositCents, setDepositCents] = useState<number>(Math.round(totalPriceCents * 0.1)); // 10% default deposit
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% p.a. default
  const [termYears, setTermYears] = useState<number>(5); // 5 years default
  const [frequency, setFrequency] = useState<"weekly" | "fortnightly" | "monthly">("weekly");

  const principalCents = Math.max(0, totalPriceCents - depositCents);

  const { repaymentCents, disclaimer } = useMemo(() => {
    return calculateRepayment({
      principalCents,
      annualInterestRatePct: interestRate,
      termYears,
      frequency,
    });
  }, [principalCents, interestRate, termYears, frequency]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400 font-bold">
        <Calculator className="w-5 h-5" />
        <h3 className="text-lg">Estimate Finance Repayments</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Deposit Slider */}
        <div>
          <div className="flex justify-between text-sm mb-1 font-medium">
            <span>Cash Deposit / Trade-in:</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{formatAud(depositCents)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={totalPriceCents}
            step={50000}
            value={depositCents}
            onChange={(e) => setDepositCents(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Loan Term */}
        <div>
          <div className="flex justify-between text-sm mb-1 font-medium">
            <span>Loan Term:</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{termYears} Years</span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setTermYears(yr)}
                className={`py-1 text-xs font-semibold rounded-lg border transition ${
                  termYears === yr
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
              >
                {yr}y
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Repayment Frequency Toggle & Result Card */}
      <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-xl p-5 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
              Estimated Repayment
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-blue-700 dark:text-blue-300">
                {formatAud(repaymentCents)}
              </span>
              <span className="text-sm font-medium text-slate-500">/{frequency}</span>
            </div>
          </div>

          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            {(["weekly", "fortnightly", "monthly"] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setFrequency(freq)}
                className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition ${
                  frequency === freq
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer under Consumer Credit Regulations */}
      <div className="flex items-start gap-2 text-xs text-slate-500 mb-6">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
        <p>{disclaimer}</p>
      </div>

      {onEnquireClick && (
        <button
          type="button"
          onClick={onEnquireClick}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow-sm"
        >
          <span>Apply for Finance on this Vehicle</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
