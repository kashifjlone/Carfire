import { Car, ShieldCheck, Zap, Globe, FileCheck, PhoneCall } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 max-w-7xl mx-auto">
      <div className="z-10 w-full items-center justify-between font-mono text-sm flex border-b border-slate-200 dark:border-slate-800 pb-6 mb-12">
        <div className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
          <Car className="w-6 h-6" />
          <span>AutoSaaS Australia</span>
        </div>
        <div className="text-xs bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Greenfield Architecture (v2.3)
        </div>
      </div>

      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 dark:from-white dark:via-blue-200 dark:to-blue-400 bg-clip-text text-transparent">
          Modern Multi-Tenant SaaS for Australian Used-Car Dealers
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8">
          Replacing dated dealer websites with ultra-fast Next.js storefronts, automated ACL single-price compliance, instant WhatsApp lead conversion, and seamless inventory management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold mb-2">Lightning Fast Storefronts</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Next.js App Router powered public vehicle catalogs with sub-second page loads and complete SEO structured data.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold mb-2">Australian Compliance</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            ACL s 48 single drive-away pricing, NSW 2025 online dealer notices, VIC LMCT display, and QLD Class A/B warranty rules.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 mb-4">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold mb-2">Instant Lead Conversion</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            One-click WhatsApp chat deep-links, interactive finance repayment sliders, and spam-protected trade-in forms.
          </p>
        </div>
      </div>

      <footer className="w-full border-t border-slate-200 dark:border-slate-800 pt-6 text-center text-xs text-slate-500">
        <p>Built for independent Australian motor car traders. Compliant with Australian Consumer Law and Australian Privacy Principles (APP 8).</p>
      </footer>
    </main>
  );
}
