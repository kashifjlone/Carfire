"use client";

import React, { useState } from "react";
import {
  Globe,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Trash2,
  Star,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Loader2,
  RefreshCw,
  X,
} from "lucide-react";
import type { DealershipDomain } from "@/lib/types/domain";
import {
  addCustomDomainAction,
  verifyDomainDnsAction,
  setPrimaryDomainAction,
  deleteCustomDomainAction,
} from "@/lib/domains/actions";

interface DomainManagerProps {
  initialDomains: DealershipDomain[];
  dealershipId: string;
}

export function DomainManager({ initialDomains, dealershipId }: DomainManagerProps) {
  const [domains, setDomains] = useState<DealershipDomain[]>(initialDomains);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newHostname, setNewHostname] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setAddError(null);

    const res = await addCustomDomainAction({
      dealershipId,
      hostname: newHostname,
    });

    setIsAdding(false);
    if (!res.success) {
      setAddError(res.error || "Failed to add domain");
      return;
    }

    if (res.domain) {
      setDomains((prev) => [...prev, res.domain!]);
      setNewHostname("");
      setIsAddModalOpen(false);
    }
  };

  const handleVerifyDns = async (domainId: string) => {
    setVerifyingId(domainId);
    const res = await verifyDomainDnsAction({ dealershipId, domainId });
    setVerifyingId(null);

    if (res.success) {
      setDomains((prev) =>
        prev.map((d) =>
          d.id === domainId
            ? { ...d, status: "active", ssl_status: "provisioned", verified_at: new Date().toISOString() }
            : d
        )
      );
    } else {
      alert("DNS verification failed: " + res.error);
    }
  };

  const handleSetPrimary = async (domainId: string) => {
    const res = await setPrimaryDomainAction({ dealershipId, domainId });
    if (res.success) {
      setDomains((prev) =>
        prev.map((d) => ({
          ...d,
          is_primary: d.id === domainId,
        }))
      );
    } else {
      alert("Failed to set primary: " + res.error);
    }
  };

  const handleDelete = async (domainId: string) => {
    if (!confirm("Are you sure you want to disconnect this domain?")) return;

    const res = await deleteCustomDomainAction({ dealershipId, domainId });
    if (res.success) {
      setDomains((prev) => prev.filter((d) => d.id !== domainId));
    } else {
      alert("Failed to delete domain: " + res.error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Dealership Domains</h2>
            <p className="text-xs text-slate-500">
              Connect your branded Australian `.com.au` domain with automated Cloudflare SSL and canonical 308 redirects.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setAddError(null);
            setIsAddModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Connect Custom Domain</span>
        </button>
      </div>

      {/* Domain Cards List */}
      <div className="space-y-4">
        {domains.map((dom) => (
          <div
            key={dom.id}
            className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-sm transition ${
              dom.is_primary
                ? "border-blue-600 ring-1 ring-blue-600/30"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start sm:items-center gap-3">
                <div className="mt-1 sm:mt-0 font-mono font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                  {dom.hostname}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {dom.is_primary && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      <Star className="w-3 h-3 fill-blue-600 text-blue-600" />
                      <span>Primary Storefront</span>
                    </span>
                  )}

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      dom.status === "active"
                        ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                        : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        dom.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                    <span className="capitalize">{dom.status.replace("_", " ")}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>SSL {dom.ssl_status}</span>
                  </span>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2">
                {dom.status !== "active" && (
                  <button
                    onClick={() => handleVerifyDns(dom.id)}
                    disabled={verifyingId === dom.id}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {verifyingId === dom.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying DNS...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Verify DNS Now</span>
                      </>
                    )}
                  </button>
                )}

                {dom.status === "active" && !dom.is_primary && (
                  <button
                    onClick={() => handleSetPrimary(dom.id)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition"
                  >
                    Make Primary
                  </button>
                )}

                {!dom.is_primary && (
                  <button
                    onClick={() => handleDelete(dom.id)}
                    title="Disconnect domain"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* DNS Configuration Instructions (shown if pending or for reference) */}
            <div className="pt-4">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Required DNS Records (Add in your Domain Registrar e.g. Crazy Domains, Melbourne IT, GoDaddy):
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* CNAME Record */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-blue-600 uppercase text-[10px]">CNAME Routing Record</span>
                      <span className="text-[10px] text-slate-400">Points traffic to edge</span>
                    </div>
                    <div className="font-mono text-slate-600 dark:text-slate-300">
                      Name: <strong>@</strong> or <strong>{dom.hostname}</strong>
                    </div>
                    <div className="font-mono text-slate-600 dark:text-slate-300">
                      Target: <strong>cname.yardflow.com.au</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard("cname.yardflow.com.au", `cname-${dom.id}`)}
                    className="mt-2.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 self-start"
                  >
                    {copiedToken === `cname-${dom.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied target!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy CNAME Target</span>
                      </>
                    )}
                  </button>
                </div>

                {/* TXT Verification Record */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-indigo-600 uppercase text-[10px]">TXT Ownership Challenge</span>
                      <span className="text-[10px] text-slate-400">Verifies lot ownership</span>
                    </div>
                    <div className="font-mono text-slate-600 dark:text-slate-300 truncate">
                      Name: <strong>_yardflow-challenge</strong>
                    </div>
                    <div className="font-mono text-slate-600 dark:text-slate-300 truncate">
                      Value: <strong>{dom.verification_token}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(dom.verification_token, `txt-${dom.id}`)}
                    className="mt-2.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 self-start"
                  >
                    {copiedToken === `txt-${dom.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied token!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy TXT Token</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connect Domain Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-2">Connect Your Dealership Domain</h3>
            <p className="text-xs text-slate-500 mb-6">
              Enter your registered `.com.au`, `.net.au` or `.com` domain name. Our system will generate CNAME and TXT verification records.
            </p>

            <form onSubmit={handleAddDomain} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Custom Domain Hostname *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. bayviewmotors.com.au"
                    value={newHostname}
                    onChange={(e) => setNewHostname(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5">
                  Do not include <code>https://</code> or trailing slashes.
                </div>
              </div>

              {addError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{addError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Adding Domain...</span>
                    </>
                  ) : (
                    <>
                      <span>Add Domain & Generate DNS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
