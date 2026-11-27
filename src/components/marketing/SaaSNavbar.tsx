"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Car, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

interface SaaSNavbarProps {
  onOpenTrial: (planName?: string) => void;
}

export function SaaSNavbar({ onOpenTrial }: SaaSNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-8 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 font-black text-xl text-slate-900 dark:text-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Car className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight">YardFlow</span>
            <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Australia</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Features</a>
          <a href="#comparison" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Why Switch</a>
          <a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Pricing</a>
          <a href="#compliance" className="hover:text-blue-600 dark:hover:text-blue-400 transition">AU Compliance</a>
          <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition">FAQ</a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin/inventory"
            className="px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Dealer Login
          </Link>
          <button
            onClick={() => onOpenTrial("Growth Plan")}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition shadow-md shadow-blue-600/20 flex items-center gap-1.5"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Features
          </a>
          <a
            href="#comparison"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Why Switch
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Pricing
          </a>
          <a
            href="#compliance"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            AU Compliance
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            FAQ
          </a>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              href="/admin/inventory"
              className="w-full text-center py-2.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700"
            >
              Dealer Login
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial("Growth Plan");
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold text-center"
            >
              Start 14-Day Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
