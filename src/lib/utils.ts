import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format cents to AUD currency string
 * e.g., 2999000 -> "$29,990"
 */
export function formatAud(cents: number | null | undefined): string {
  if (cents === null || cents === undefined || isNaN(cents)) {
    return "POA";
  }
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(dollars);
}

/**
 * Format odometer kilometers
 * e.g., 84210 -> "84,210 km"
 */
export function formatKm(km: number | null | undefined): string {
  if (km === null || km === undefined || isNaN(km)) {
    return "N/A";
  }
  return `${new Intl.NumberFormat("en-AU").format(km)} km`;
}

/**
 * Calculate indicative weekly or monthly finance repayment
 * (Strictly for indicative buyer estimates under consumer credit guidelines)
 */
export function calculateRepayment({
  principalCents,
  annualInterestRatePct,
  termYears,
  frequency = "weekly",
}: {
  principalCents: number;
  annualInterestRatePct: number;
  termYears: number;
  frequency?: "weekly" | "fortnightly" | "monthly";
}): { repaymentCents: number; frequency: string; disclaimer: string } {
  const principal = principalCents / 100;
  const periodsPerYear = frequency === "weekly" ? 52 : frequency === "fortnightly" ? 26 : 12;
  const totalPeriods = termYears * periodsPerYear;
  const periodicRate = annualInterestRatePct / 100 / periodsPerYear;

  let payment = 0;
  if (periodicRate === 0) {
    payment = principal / totalPeriods;
  } else {
    payment = (principal * (periodicRate * Math.pow(1 + periodicRate, totalPeriods))) /
      (Math.pow(1 + periodicRate, totalPeriods) - 1);
  }

  return {
    repaymentCents: Math.round(payment * 100),
    frequency,
    disclaimer: "Indicative estimate only. Excludes dealer fees and credit assessment criteria. Not an offer of credit.",
  };
}
