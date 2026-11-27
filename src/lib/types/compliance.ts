export type AustralianState = "NSW" | "VIC" | "QLD" | "WA" | "SA" | "ACT" | "NT" | "TAS";

export interface StatutoryWarrantyResult {
  state: AustralianState;
  isEligible: boolean;
  warrantyClass: string;
  durationMonths: number;
  maxKm: number;
  summaryText: string;
  coolingOffPeriod: string;
  statutoryAct: string;
}

export interface DealingsRegisterEntry {
  stockNumber: string;
  dateAcquired: string;
  acquiredFrom: {
    name: string;
    licenceOrDl: string;
    address: string;
  };
  vehicle: {
    vin: string;
    engineNumber: string;
    rego: string;
    year: number;
    make: string;
    model: string;
    bodyType: string;
    odometerKm: number;
  };
  financials: {
    costPriceCents: number;
    reconditioningCostCents: number;
    totalCostCents: number;
    driveAwayPriceCents: number;
  };
  disposal?: {
    dateSold: string;
    purchaserName: string;
    purchaserAddress: string;
    soldPriceCents: number;
    invoiceNumber: string;
  };
  status: "in_stock" | "sold" | "recon";
}
