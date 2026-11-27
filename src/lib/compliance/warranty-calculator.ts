import type { AustralianState, StatutoryWarrantyResult } from "@/lib/types/compliance";

/**
 * Calculates statutory dealer warranty under relevant Australian State legislation:
 * - NSW: Motor Dealers and Repairers Act 2013 (Schedule 1)
 *   Eligible if age < 10 years AND odometer < 160,000 km => 3 months or 5,000 km
 * - VIC: Motor Car Traders Act 1986 (s 54)
 *   Eligible if age < 10 years AND odometer < 160,000 km => 3 months or 5,000 km
 * - QLD: Motor Dealers and Chattel Auctioneers Act 2014 (s 114)
 *   Class A: age < 10 years AND odometer < 160,000 km => 3 months or 5,000 km
 *   Class B: age >= 10 years OR odometer >= 160,000 km => 1 month or 1,000 km
 */
export function calculateStatutoryWarranty(params: {
  state: AustralianState;
  year: number;
  odometerKm: number;
  currentYear?: number;
  bodyType?: string;
}): StatutoryWarrantyResult {
  const currentYear = params.currentYear || new Date().getFullYear();
  const age = currentYear - params.year;
  const odometer = params.odometerKm;
  const state = params.state;

  if (state === "NSW") {
    const isEligible = age < 10 && odometer < 160000;
    return {
      state: "NSW",
      isEligible,
      warrantyClass: isEligible ? "NSW Standard Statutory Warranty" : "Excluded from Statutory Warranty",
      durationMonths: isEligible ? 3 : 0,
      maxKm: isEligible ? 5000 : 0,
      summaryText: isEligible
        ? "3 months or 5,000 km (whichever occurs first) under NSW Motor Dealers and Repairers Act 2013."
        : "Over 10 years of age or 160,000 km. Excluded from statutory dealer warranty (Australian Consumer Law consumer guarantees still apply).",
      coolingOffPeriod: "1 business day cooling-off period applies if dealer arranged finance.",
      statutoryAct: "NSW Motor Dealers and Repairers Act 2013 (Form 1)",
    };
  }

  if (state === "VIC") {
    const isEligible = age < 10 && odometer < 160000;
    return {
      state: "VIC",
      isEligible,
      warrantyClass: isEligible ? "VIC LMCT Statutory Warranty" : "Excluded (Over Age/KM Limit)",
      durationMonths: isEligible ? 3 : 0,
      maxKm: isEligible ? 5000 : 0,
      summaryText: isEligible
        ? "3 months or 5,000 km (whichever occurs first) under VIC Motor Car Traders Act 1986."
        : "Vehicle exceeds 10 years or 160,000 km limit. Statutory warranty does not apply.",
      coolingOffPeriod: "3 clear business days cooling-off period under s 43 Motor Car Traders Act 1986.",
      statutoryAct: "VIC Motor Car Traders Act 1986 (Form 2)",
    };
  }

  if (state === "QLD") {
    if (age < 10 && odometer < 160000) {
      return {
        state: "QLD",
        isEligible: true,
        warrantyClass: "Class A Statutory Warranty",
        durationMonths: 3,
        maxKm: 5000,
        summaryText: "Class A Warranty: 3 months or 5,000 km under QLD Motor Dealers Act.",
        coolingOffPeriod: "1 business day cooling-off period applies.",
        statutoryAct: "QLD Motor Dealers and Chattel Auctioneers Act 2014 (Form 5 Class A)",
      };
    } else {
      return {
        state: "QLD",
        isEligible: true,
        warrantyClass: "Class B Statutory Warranty",
        durationMonths: 1,
        maxKm: 1000,
        summaryText: "Class B Warranty: 1 month or 1,000 km (vehicle 10+ years or 160,000+ km).",
        coolingOffPeriod: "1 business day cooling-off period applies.",
        statutoryAct: "QLD Motor Dealers and Chattel Auctioneers Act 2014 (Form 5 Class B)",
      };
    }
  }

  // Generic Australian Fallback (WA/SA/ACT/TAS)
  const isEligible = age < 10 && odometer < 160000;
  return {
    state,
    isEligible,
    warrantyClass: isEligible ? `${state} Statutory Dealer Warranty` : "Excluded from Statutory Warranty",
    durationMonths: isEligible ? 3 : 0,
    maxKm: isEligible ? 5000 : 0,
    summaryText: isEligible
      ? `3 months or 5,000 km statutory warranty under ${state} motor trader regulations.`
      : "Excluded from statutory warranty due to vehicle age or odometer threshold.",
    coolingOffPeriod: "Standard statutory cooling-off conditions apply.",
    statutoryAct: `${state} Motor Vehicle Dealers Act`,
  };
}
