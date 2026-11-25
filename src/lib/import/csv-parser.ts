import { z } from "zod";
import type { BodyType, FuelType, Transmission } from "@/lib/types/inventory";

export interface ParsedCsvRow {
  rowNumber: number;
  vin: string;
  stockNumber: string;
  make: string;
  model: string;
  year: number;
  variant?: string;
  bodyType: BodyType;
  transmission: Transmission;
  fuelType: FuelType;
  odometerKm: number;
  totalPriceCents: number;
  egcPriceCents?: number;
  photoUrls: string[];
  publicDescription?: string;
}

export interface CsvImportDryRunResult {
  totalRows: number;
  validRows: ParsedCsvRow[];
  errors: Array<{
    rowNumber: number;
    vin?: string;
    stockNumber?: string;
    errors: string[];
  }>;
}

/**
 * Normalise currency text (e.g. "$29,990", "29990.00") into integer cents
 */
export function parsePriceToCents(raw: string | number | undefined | null): number | null {
  if (raw === undefined || raw === null || raw === "") return null;
  if (typeof raw === "number") return Math.round(raw * 100);
  const cleaned = String(raw).replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : Math.round(num * 100);
}

/**
 * Normalise body type string to supported enum
 */
export function normaliseBodyType(raw: string | undefined): BodyType {
  const str = (raw || "").toLowerCase().trim();
  if (str.includes("suv") || str.includes("wagon 4wd")) return "suv";
  if (str.includes("ute") || str.includes("cab") || str.includes("utility")) return "ute";
  if (str.includes("hatch")) return "hatch";
  if (str.includes("van") || str.includes("minivan")) return "van";
  if (str.includes("coupe")) return "coupe";
  if (str.includes("convertible") || str.includes("cabriolet")) return "convertible";
  if (str.includes("wagon")) return "wagon";
  return "sedan"; // Default fallback
}

/**
 * Normalise transmission
 */
export function normaliseTransmission(raw: string | undefined): Transmission {
  const str = (raw || "").toLowerCase().trim();
  if (str.includes("man")) return "manual";
  return "automatic";
}

/**
 * Normalise fuel type
 */
export function normaliseFuelType(raw: string | undefined): FuelType {
  const str = (raw || "").toLowerCase().trim();
  if (str.includes("diesel")) return "diesel";
  if (str.includes("hybrid")) return "hybrid";
  if (str.includes("electric") || str.includes("ev")) return "electric";
  return "petrol";
}

/**
 * Parse CSV text and perform dry-run validation
 */
export function parseAndValidateVehicleCsv(csvContent: string): CsvImportDryRunResult {
  const lines = csvContent
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) {
    return { totalRows: 0, validRows: [], errors: [{ rowNumber: 1, errors: ["CSV file is empty or missing data rows"] }] };
  }

  // Parse header
  const headerLine = lines[0];
  const headers = headerLine.split(",").map((h) => h.replace(/^["']|["']$/g, "").trim().toLowerCase());

  const getCol = (cols: string[], possibleNames: string[]): number => {
    return cols.findIndex((c) => possibleNames.includes(c));
  };

  const idxVin = getCol(headers, ["vin", "chassis", "vin number"]);
  const idxStock = getCol(headers, ["stock", "stock number", "stock #", "stock_number", "rego"]);
  const idxMake = getCol(headers, ["make", "manufacturer"]);
  const idxModel = getCol(headers, ["model"]);
  const idxYear = getCol(headers, ["year", "build year"]);
  const idxVariant = getCol(headers, ["variant", "badge", "series"]);
  const idxBody = getCol(headers, ["body", "body type", "body_type"]);
  const idxTrans = getCol(headers, ["transmission", "gearbox"]);
  const idxFuel = getCol(headers, ["fuel", "fuel type", "fuel_type"]);
  const idxOdometer = getCol(headers, ["odometer", "km", "kms", "mileage"]);
  const idxPrice = getCol(headers, ["price", "total price", "driveaway price", "drive away"]);
  const idxEgc = getCol(headers, ["egc", "egc price", "excl govt charges"]);
  const idxPhotos = getCol(headers, ["photos", "images", "photo urls", "image urls"]);
  const idxDesc = getCol(headers, ["description", "comments", "public description"]);

  const validRows: ParsedCsvRow[] = [];
  const errors: CsvImportDryRunResult["errors"] = [];

  for (let i = 1; i < lines.length; i++) {
    const rowNum = i + 1;
    // Simple CSV row parser handling quotes
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const matches: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(lines[i])) !== null) {
      if (match.index === regex.lastIndex) regex.lastIndex++;
      let val = match[1];
      if (val !== undefined) {
        val = val.replace(/^"|"$/g, "").replace(/""/g, '"').trim();
        matches.push(val);
      }
    }

    const rowErrors: string[] = [];

    const vin = (idxVin >= 0 ? matches[idxVin] : "")?.toUpperCase() || "";
    if (!vin || vin.length !== 17) {
      rowErrors.push("VIN must be exactly 17 alphanumeric characters");
    }

    const stockNumber = (idxStock >= 0 ? matches[idxStock] : "") || `STK-${i}`;
    const make = (idxMake >= 0 ? matches[idxMake] : "") || "";
    if (!make) rowErrors.push("Make is required");

    const model = (idxModel >= 0 ? matches[idxModel] : "") || "";
    if (!model) rowErrors.push("Model is required");

    const rawYear = idxYear >= 0 ? parseInt(matches[idxYear], 10) : NaN;
    if (isNaN(rawYear) || rawYear < 1900 || rawYear > 2100) {
      rowErrors.push("Year must be a valid 4-digit number (e.g. 2019)");
    }

    const rawOdo = idxOdometer >= 0 ? parseInt(matches[idxOdometer]?.replace(/[^0-9]/g, ""), 10) : NaN;
    if (isNaN(rawOdo) || rawOdo < 0) {
      rowErrors.push("Odometer must be a valid non-negative number");
    }

    const rawPrice = idxPrice >= 0 ? matches[idxPrice] : "";
    const totalPriceCents = parsePriceToCents(rawPrice);
    if (!totalPriceCents || totalPriceCents <= 0) {
      rowErrors.push("Total headline price is required and must be greater than 0");
    }

    const rawEgc = idxEgc >= 0 ? matches[idxEgc] : "";
    const egcPriceCents = parsePriceToCents(rawEgc) || undefined;
    if (egcPriceCents && totalPriceCents && egcPriceCents > totalPriceCents) {
      rowErrors.push("EGC price cannot be higher than total drive-away price");
    }

    const rawPhotos = idxPhotos >= 0 ? matches[idxPhotos] : "";
    const photoUrls = rawPhotos
      ? rawPhotos.split(/[;,|]/).map((u) => u.trim()).filter((u) => u.startsWith("http"))
      : [];

    if (rowErrors.length > 0) {
      errors.push({
        rowNumber: rowNum,
        vin,
        stockNumber,
        errors: rowErrors,
      });
    } else {
      validRows.push({
        rowNumber: rowNum,
        vin,
        stockNumber,
        make,
        model,
        year: rawYear,
        variant: idxVariant >= 0 ? matches[idxVariant] : undefined,
        bodyType: normaliseBodyType(idxBody >= 0 ? matches[idxBody] : undefined),
        transmission: normaliseTransmission(idxTrans >= 0 ? matches[idxTrans] : undefined),
        fuelType: normaliseFuelType(idxFuel >= 0 ? matches[idxFuel] : undefined),
        odometerKm: rawOdo,
        totalPriceCents: totalPriceCents!,
        egcPriceCents,
        photoUrls,
        publicDescription: idxDesc >= 0 ? matches[idxDesc] : undefined,
      });
    }
  }

  return {
    totalRows: lines.length - 1,
    validRows,
    errors,
  };
}
