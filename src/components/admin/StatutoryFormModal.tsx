"use client";

import React, { useState } from "react";
import { X, Printer, ShieldCheck, FileCheck, AlertTriangle } from "lucide-react";
import type { DealingsRegisterEntry, AustralianState } from "@/lib/types/compliance";
import { calculateStatutoryWarranty } from "@/lib/compliance/warranty-calculator";
import { formatAud, formatKm } from "@/lib/utils";

interface StatutoryFormModalProps {
  entry: DealingsRegisterEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StatutoryFormModal({ entry, isOpen, onClose }: StatutoryFormModalProps) {
  const [selectedState, setSelectedState] = useState<AustralianState>("NSW");

  if (!isOpen || !entry) return null;

  const warranty = calculateStatutoryWarranty({
    state: selectedState,
    year: entry.vehicle.year,
    odometerKm: entry.vehicle.odometerKm,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg">Statutory Motor Dealer Buyer Notice</h3>
          </div>

          <div className="flex items-center gap-3">
            {/* State Switcher */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value as AustralianState)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
            >
              <option value="NSW">NSW (Form 1 - Motor Dealers Act 2013)</option>
              <option value="VIC">VIC (Form 2 - Motor Car Traders Act 1986)</option>
              <option value="QLD">QLD (Form 5 - Chattel Auctioneers Act 2014)</option>
            </select>

            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Handover Notice</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Notice Document */}
        <div className="border border-slate-300 dark:border-slate-700 rounded-2xl p-6 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 space-y-6 text-xs">
          {/* Header */}
          <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="font-black text-base uppercase tracking-wider">
              {selectedState === "NSW" && "NSW Fair Trading • Form 1 Notice to Buyer"}
              {selectedState === "VIC" && "Consumer Affairs Victoria • Form 2 Notice of Required Particulars"}
              {selectedState === "QLD" && "QLD Office of Fair Trading • Form 5 Statutory Warranty"}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Statutory Motor Vehicle Sale Particulars & Consumer Guarantees Notice
            </div>
          </div>

          {/* Licensed Dealer Information */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Licensed Dealer</div>
              <div className="font-bold">Peninsula Motor Group Pty Ltd</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Motor Dealer Licence #</div>
              <div className="font-bold font-mono">NSW MD #089123</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Stock Number</div>
              <div className="font-bold font-mono">{entry.stockNumber}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Date of Handover</div>
              <div className="font-bold">{new Date().toLocaleDateString("en-AU")}</div>
            </div>
          </div>

          {/* Vehicle Particulars Table */}
          <div>
            <div className="font-bold uppercase tracking-wider text-[11px] mb-2 text-slate-700 dark:text-slate-300">
              1. Vehicle Identification Particulars
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
              <div>
                <span className="text-slate-500">Make & Model:</span>{" "}
                <strong>{entry.vehicle.year} {entry.vehicle.make} {entry.vehicle.model}</strong>
              </div>
              <div>
                <span className="text-slate-500">VIN:</span>{" "}
                <strong className="font-mono">{entry.vehicle.vin}</strong>
              </div>
              <div>
                <span className="text-slate-500">Engine #:</span>{" "}
                <strong className="font-mono">{entry.vehicle.engineNumber}</strong>
              </div>
              <div>
                <span className="text-slate-500">Registration:</span>{" "}
                <strong>{entry.vehicle.rego}</strong>
              </div>
              <div>
                <span className="text-slate-500">Body Type:</span>{" "}
                <strong>{entry.vehicle.bodyType}</strong>
              </div>
              <div>
                <span className="text-slate-500">Odometer at Delivery:</span>{" "}
                <strong>{formatKm(entry.vehicle.odometerKm)}</strong>
              </div>
            </div>
          </div>

          {/* Agreed Total Drive-Away Price (ACL s 48 Compliant) */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-bold text-blue-950 dark:text-blue-100">
                Single Total Drive-Away Price (ACL s 48 Single Price Rule)
              </div>
              <div className="text-[10px] text-blue-800 dark:text-blue-300">
                Includes statutory stamp duty, dealer delivery, transfer fees, and GST.
              </div>
            </div>
            <div className="text-xl font-black text-blue-700 dark:text-blue-300">
              {formatAud(entry.financials.driveAwayPriceCents)}
            </div>
          </div>

          {/* Statutory Warranty Status */}
          <div className={`p-4 rounded-xl border ${
            warranty.isEligible
              ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900"
              : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900"
          }`}>
            <div className="flex items-center gap-2 font-bold mb-1">
              {warranty.isEligible ? (
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              )}
              <span>2. Statutory Warranty Category: {warranty.warrantyClass}</span>
            </div>
            <p className="text-[11px] leading-relaxed mb-2">{warranty.summaryText}</p>
            <div className="text-[10px] text-slate-500">
              Act Reference: <em>{warranty.statutoryAct}</em>
            </div>
          </div>

          {/* Cooling-Off Period Notice */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="font-bold uppercase text-[10px] text-slate-500 mb-1">
              3. Statutory Cooling-Off Period Notice
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
              {warranty.coolingOffPeriod} You are entitled to cancel this contract in writing within the cooling-off period. If cancelled, the dealer may retain a statutory deduction as permitted by state law.
            </p>
          </div>

          {/* Signatures & Execution Section */}
          <div className="pt-6 border-t border-slate-300 dark:border-slate-700 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-b border-slate-400 dark:border-slate-600 h-10"></div>
              <div className="text-[10px] text-slate-500">
                <strong>Signed on behalf of Dealer / Licensee:</strong>
                <br />Authorized Signature & Date
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-slate-400 dark:border-slate-600 h-10"></div>
              <div className="text-[10px] text-slate-500">
                <strong>Purchaser Acknowledgement:</strong>
                <br />I acknowledge receipt of this statutory notice prior to delivery.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
