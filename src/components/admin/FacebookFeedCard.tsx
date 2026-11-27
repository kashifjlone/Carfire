"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";

export function FacebookFeedCard() {
  const [copied, setCopied] = useState(false);
  const feedPath = "/api/feeds/facebook-aia.xml";

  const handleCopy = () => {
    const fullUrl = `${window.location.origin}${feedPath}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-blue-800/40">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Automated Facebook / Meta Catalog Feed</span>
          </div>

          <h3 className="text-xl font-black">
            Automotive Inventory Ads (AIA) & Facebook Marketplace
          </h3>

          <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
            Connect your live vehicle stock directly to Meta Commerce Manager. Dynamic vehicle ads run automatically with ACL s 48 Single Drive-Away pricing and update the moment you sell or change a car.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-blue-200">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ACL s 48 Total Price Enforced</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time Stock Availability</span>
            </div>
          </div>
        </div>

        {/* Copy Box & Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <button
            onClick={handleCopy}
            className="px-5 py-3 rounded-2xl bg-white text-slate-950 hover:bg-blue-50 font-bold text-xs transition shadow-md flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied Catalog URL!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-blue-600" />
                <span>Copy Meta Feed URL</span>
              </>
            )}
          </button>

          <a
            href={feedPath}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition text-center flex items-center justify-center gap-2 border border-white/10"
          >
            <span>Preview XML Feed</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
