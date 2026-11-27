"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Car,
  ShieldCheck,
  Zap,
  PhoneCall,
  CheckCircle2,
  XCircle,
  ArrowRight,
  UploadCloud,
  FileSpreadsheet,
  Layers,
  ChevronDown,
  Sparkles,
  DollarSign,
  Share2,
  Clock,
  HelpCircle,
} from "lucide-react";
import { SAAS_PLANS } from "@/lib/billing/stripe";
import { formatAud } from "@/lib/utils";
import { InteractiveDemoBar } from "@/components/marketing/InteractiveDemoBar";
import { SaaSNavbar } from "@/components/marketing/SaaSNavbar";
import { TrialSignupModal } from "@/components/marketing/TrialSignupModal";

export default function MarketingLandingPage() {
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Growth Plan");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleOpenTrial = (planName?: string) => {
    if (planName) setSelectedPlan(planName);
    setTrialModalOpen(true);
  };

  const faqs = [
    {
      q: "Can I import my existing car stock from EasyCars, Virtual Yard, or Excel?",
      a: "Yes, 100%. YardFlow includes an intelligent CSV Stock & Photo Migration Engine. You can export your inventory CSV from your current software and drop it into YardFlow. It automatically maps fields (VIN, Make, Model, Price, Odometer, Rego) and securely re-hosts all vehicle photos to your lot in minutes.",
    },
    {
      q: "How does the ACL s 48 Single Drive-Away Price compliance work?",
      a: "Australian Consumer Law section 48 strictly prohibits displaying an excluded or component price (such as EGC) more prominently than the single total drive-away price. YardFlow's inventory engine automatically validates and prominently formats the total drive-away price across all hero headers, vehicle cards, and feeds, keeping your yard protected from ACCC and Fair Trading penalties.",
    },
    {
      q: "Can we use our own custom .com.au domain?",
      a: "Yes. Every plan includes custom domain support. You can connect your existing dealer domain (e.g. `youryard.com.au`), and our edge network automatically provisions high-speed Cloudflare SSL certificates with 308 apex/www canonical redirects.",
    },
    {
      q: "Do I need a credit card to start the 14-day free trial?",
      a: "No credit card is required. You get 14 days of full access to test-drive all inventory tools, configure your storefront, and test the WhatsApp lead capture before deciding to subscribe.",
    },
    {
      q: "How are subscription payments and GST tax invoices handled?",
      a: "All subscriptions are billed domestically in AUD via Stripe Australia. On the 1st of every month, you receive a compliant Australian Tax Invoice with our ABN and a 10% GST breakdown ready for claiming input tax credits on your quarterly BAS.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* 1. Interactive Demo Top Bar */}
      <InteractiveDemoBar />

      {/* 2. SaaS Header Navigation */}
      <SaaSNavbar onOpenTrial={handleOpenTrial} />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Target Audience Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold mb-6 animate-pulse">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Built Specially for Independent Australian Used-Car Dealers (10–80 Lot Size)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6">
              Sell More Used Cars Online.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Without $10,000 Setup Fees
              </span>{" "}
              or Clunky 2012 Software.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              The modern Australian dealership platform. Ultra-fast Next.js vehicle storefronts, 
              <strong> 100% ACL Single-Price compliance</strong>, instant WhatsApp buyer leads, and automated Facebook AIA catalog feeds.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => handleOpenTrial("Growth Plan")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base transition shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                <span>Start 14-Day Free Cardless Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                href="/storefront"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-base transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Explore Live Demo Lot</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                  Live
                </span>
              </Link>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ACL s 48 Compliant</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Sub-Second Page Speeds</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Click-to-Chat</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                <span>1-Click CSV Migration</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Live Interactive Demo Callout Banner */}
        <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="text-xs uppercase tracking-widest font-black text-blue-300 mb-2">
                  Experience It in Action
                </div>
                <h2 className="text-2xl sm:text-4xl font-black mb-4">
                  See how simple selling cars online becomes.
                </h2>
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                  We pre-loaded a real demo lot (*Sydney Prestige Motors*) with 20+ used cars, NSW statutory warranties, finance repayment estimates, and dealer admin controls. Try it right now.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <Link
                  href="/storefront"
                  className="px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm text-center transition shadow-lg"
                >
                  View Public Storefront (Buyer)
                </Link>
                <Link
                  href="/admin/inventory"
                  className="px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-blue-50 font-bold text-sm text-center transition shadow-lg"
                >
                  Open Dealer Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Core Feature Matrix */}
        <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              Features Built for Australian Yards
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
              Everything an independent used car dealer needs to win.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3">Next.js Ultra-Fast Storefronts</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Most dealer sites take 5–8 seconds to load on mobile. YardFlow loads in under 700 milliseconds, boosting Google SEO rankings and stopping buyers from bouncing back to Carsales.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Google Core Web Vitals 95+ Score</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Full Schema.org Automotive SEO markup</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3">ACL s 48 Single Price Shield</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Never face fines from Fair Trading or the ACCC. Total drive-away prices are strictly enforced as the primary headline figure. PPSR checks and statutory warranties display clearly.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>NSW, VIC, and QLD statutory licence display</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Finance calculator statutory disclaimer built-in</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 mb-6">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3">Instant WhatsApp Lead Conversion</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Car buyers hate filling long email forms. Our deep-link button opens WhatsApp with the vehicle’s year, make, model, stock # and drive-away price prefilled, connecting you to ready buyers in seconds.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Inbound Lead CRM Kanban Pipeline</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>1-Click Test-Drive & Negotiation tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Competitor Comparison Table */}
        <section id="comparison" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                The Independent Dealer Advantage
              </h2>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
                Why dealers are switching to YardFlow
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="py-4 px-6 font-bold text-slate-500">Feature / Capability</th>
                    <th className="py-4 px-6 font-black text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 rounded-t-2xl">
                      YardFlow Australia
                    </th>
                    <th className="py-4 px-6 font-semibold text-slate-600 dark:text-slate-300">EasyCars / Virtual Yard</th>
                    <th className="py-4 px-6 font-semibold text-slate-600 dark:text-slate-300">Generic WordPress Agency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-4 px-6 font-semibold">Setup Cost & Lock-in</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/50 dark:bg-blue-950/20">
                      $0 Setup • 14-Day Free Trial • Month-to-Month
                    </td>
                    <td className="py-4 px-6 text-slate-500">$1,500+ onboarding + 12-month lock-in</td>
                    <td className="py-4 px-6 text-slate-500">$5,000 – $10,000 upfront design fee</td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-semibold">Monthly Software Cost</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/50 dark:bg-blue-950/20">
                      $199 – $349 flat AUD
                    </td>
                    <td className="py-4 px-6 text-slate-500">$600 – $1,200+/mo (opaque tiering)</td>
                    <td className="py-4 px-6 text-slate-500">$150/mo hosting + plugin maintenance</td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-semibold">Mobile Page Load Speed</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/50 dark:bg-blue-950/20">
                      ⚡ &lt; 0.8 seconds (Next.js 15 App Router)
                    </td>
                    <td className="py-4 px-6 text-slate-500">🐢 3.5 – 6.0 seconds (Legacy PHP)</td>
                    <td className="py-4 px-6 text-slate-500">🐢 4.0 – 7.0 seconds (Bloated plugins)</td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-semibold">ACL s 48 Single Price Rule</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/50 dark:bg-blue-950/20">
                      ✅ Automated Database & UI Enforcement
                    </td>
                    <td className="py-4 px-6 text-slate-500">⚠️ Manual dealer calculation</td>
                    <td className="py-4 px-6 text-slate-500">❌ High risk of compliance breach</td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-semibold">WhatsApp Vehicle Deep-Links</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/50 dark:bg-blue-950/20">
                      ✅ Pre-filled vehicle specifics
                    </td>
                    <td className="py-4 px-6 text-slate-500">❌ Generic email forms only</td>
                    <td className="py-4 px-6 text-slate-500">❌ Requires custom developer setup</td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-semibold">Photo Migration & SSRF Guard</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/50 dark:bg-blue-950/20">
                      ✅ 1-Click CSV drop + Cloudflare R2 worker
                    </td>
                    <td className="py-4 px-6 text-slate-500">⚠️ Manual FTP / batch uploads</td>
                    <td className="py-4 px-6 text-slate-500">❌ Manual upload car-by-car</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. Transparent Pricing Section */}
        <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              Straightforward Pricing
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Simple flat plans. No hidden lead fees.
            </h3>
            <p className="text-sm text-slate-500">
              All plans include a 14-day free trial. Billed in AUD with compliant 10% GST tax invoices for your quarterly BAS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SAAS_PLANS.map((plan) => {
              const isPopular = plan.id === "plan_growth";

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-8 border flex flex-col justify-between transition relative ${
                    isPopular
                      ? "bg-white dark:bg-slate-900 border-blue-600 shadow-xl ring-2 ring-blue-600/30"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Most Popular for Independent Yards
                    </div>
                  )}

                  <div>
                    <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                    <p className="text-xs text-slate-500 mb-6">{plan.description}</p>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-black text-slate-900 dark:text-slate-100">
                        ${plan.priceAudMonthly}
                      </span>
                      <span className="text-xs text-slate-500">AUD / mo (excl. 10% GST)</span>
                    </div>

                    <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-8">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleOpenTrial(plan.name)}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition shadow-md flex items-center justify-center gap-2 ${
                      isPopular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span>Start 14-Day Free Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. FAQ Accordion */}
        <section id="faq" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                Got Questions?
              </h2>
              <h3 className="text-3xl font-black tracking-tight">Frequently Asked Dealer Questions</h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full py-4 px-6 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4 text-slate-900 dark:text-slate-100"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openFaq === idx ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {openFaq === idx && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Bottom CTA Banner */}
        <section className="py-20 bg-blue-600 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-black mb-6">
              Ready to modernise your car yard?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Join the new generation of Australian independent motor car traders. 14 days free, setup takes under 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleOpenTrial("Growth Plan")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-black text-base transition shadow-xl"
              >
                Start Your 14-Day Free Trial
              </button>
              <Link
                href="/storefront"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition"
              >
                Test Drive Live Demo Lot
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Statutory Australian Compliance Footer */}
      <footer id="compliance" className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2.5 font-bold text-white text-lg">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Car className="w-4 h-4" />
              </div>
              <span>YardFlow Australia</span>
            </div>

            <div className="flex flex-wrap gap-6 text-slate-400 text-xs">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#comparison" className="hover:text-white transition">Why Switch</a>
              <a href="#pricing" className="hover:text-white transition">Pricing</a>
              <Link href="/storefront" className="hover:text-white transition">Live Storefront</Link>
              <Link href="/admin/inventory" className="hover:text-white transition">Dealer Admin</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] leading-relaxed text-slate-500">
            <div>
              <p className="font-semibold text-slate-300 mb-1">
                Australian Consumer Law (ACL s 48) Compliance Notice:
              </p>
              <p>
                All pricing displayed on dealer storefronts hosted by YardFlow adheres strictly to the ACL Single Price rule. The prominent headline figure represents the total drive-away price inclusive of statutory charges. Finance repayment figures calculated via platform widgets are indicative estimates only and do not constitute an offer of credit under the National Consumer Credit Protection Act 2009.
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-300 mb-1">
                Entity & Data Sovereignty:
              </p>
              <p>
                YardFlow is operated by an Australian Proprietary Company (Pty Ltd) registered with ASIC (ABN: 12 345 678 901). Infrastructure, media storage (Cloudflare R2 Sydney), and database clusters (Supabase Postgres) reside within Australian data centres complying with the Australian Privacy Principles (APP 8).
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-600">
            <div>© {new Date().getFullYear()} YardFlow Australia Pty Ltd. All rights reserved.</div>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Motor Dealer Act Compliance</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Trial Signup Modal */}
      <TrialSignupModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        defaultPlan={selectedPlan}
      />
    </div>
  );
}
