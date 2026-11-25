"use client";

import React, { useState } from "react";
import { UploadCloud, CheckCircle2, AlertTriangle, FileText, ArrowRight, Loader2 } from "lucide-react";
import { parseAndValidateVehicleCsv, type CsvImportDryRunResult } from "@/lib/import/csv-parser";

interface CsvUploadZoneProps {
  dealershipId: string;
  branchId: string;
}

export function CsvUploadZone({ dealershipId, branchId }: CsvUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dryRunResult, setDryRunResult] = useState<CsvImportDryRunResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccessMessage, setImportSuccessMessage] = useState<string | null>(null);

  const processFile = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      alert("Please upload a .csv spreadsheet file");
      return;
    }

    setFileName(file.name);
    setImportSuccessMessage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        const result = parseAndValidateVehicleCsv(text);
        setDryRunResult(result);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleConfirmImport = async () => {
    if (!dryRunResult || dryRunResult.validRows.length === 0) return;
    setIsImporting(true);

    // Simulated batch import process
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccessMessage(
        `Successfully imported ${dryRunResult.validRows.length} vehicles into inventory! Photo re-hosting worker has been queued.`
      );
      setDryRunResult(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Card */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition ${
          isDragging
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
            : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 mx-auto mb-4">
          <UploadCloud className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold mb-1">Upload Your Dealership CSV</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
          Supports direct stock exports from EasyCars, Virtual Yard, Dealer Solutions, and custom spreadsheets.
        </p>

        <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm cursor-pointer transition shadow-sm">
          <span>Choose CSV File</span>
          <input type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />
        </label>

        {fileName && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Loaded: <strong>{fileName}</strong></span>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {importSuccessMessage && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-2xl flex items-start gap-3 text-emerald-800 dark:text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
          <div>
            <div className="font-bold">Import Completed!</div>
            <div className="text-xs mt-0.5">{importSuccessMessage}</div>
          </div>
        </div>
      )}

      {/* Dry Run Validation Results Card */}
      {dryRunResult && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h4 className="text-base font-bold mb-4">Dry-Run Import Analysis</h4>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500">Total Rows Found</div>
              <div className="text-2xl font-black mt-1">{dryRunResult.totalRows}</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300">
              <div className="text-xs">Ready to Import</div>
              <div className="text-2xl font-black mt-1">{dryRunResult.validRows.length}</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300">
              <div className="text-xs">Rows with Issues</div>
              <div className="text-2xl font-black mt-1">{dryRunResult.errors.length}</div>
            </div>
          </div>

          {/* Error Details (if any) */}
          {dryRunResult.errors.length > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Rows requiring correction (will be skipped during import):</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200">
                {dryRunResult.errors.slice(0, 5).map((err, idx) => (
                  <li key={idx}>
                    Row {err.rowNumber} ({err.stockNumber || err.vin || "No ID"}): {err.errors.join(", ")}
                  </li>
                ))}
                {dryRunResult.errors.length > 5 && (
                  <li className="font-semibold text-amber-700">
                    ...and {dryRunResult.errors.length - 5} more rows with validation issues.
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Action to confirm */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs text-slate-500">
              Clicking import will insert {dryRunResult.validRows.length} vehicles and trigger photo re-hosting.
            </div>

            <button
              onClick={handleConfirmImport}
              disabled={isImporting || dryRunResult.validRows.length === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-sm disabled:opacity-50"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Importing...</span>
                </>
              ) : (
                <>
                  <span>Confirm & Import {dryRunResult.validRows.length} Vehicles</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
