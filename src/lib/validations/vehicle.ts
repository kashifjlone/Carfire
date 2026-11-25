import { z } from "zod";

export const VehicleFormSchema = z.object({
  dealershipId: z.string().uuid(),
  branchId: z.string().uuid(),
  vin: z.string().length(17, "VIN must be exactly 17 characters").toUpperCase(),
  stockNumber: z.string().min(1, "Stock number is required").max(50),
  make: z.string().min(1, "Make is required").max(100),
  model: z.string().min(1, "Model is required").max(100),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 2),
  variant: z.string().max(100).optional().nullable(),
  bodyType: z.enum(["sedan", "suv", "hatch", "ute", "wagon", "coupe", "convertible", "van"]),
  transmission: z.enum(["automatic", "manual"]),
  fuelType: z.enum(["petrol", "diesel", "hybrid", "electric"]),
  odometerKm: z.number().int().nonnegative("Odometer must be zero or positive"),
  totalPriceCents: z.number().int().positive("Headline total drive-away price must be positive"),
  egcPriceCents: z.number().int().positive().optional().nullable(),
  publicationStatus: z.enum(["draft", "published", "archived"]).default("draft"),
  availability: z.enum(["in_stock", "in_transit", "under_offer", "sold"]).default("in_stock"),
  publicDescription: z.string().max(5000).optional().nullable(),
  features: z.array(z.string()).default([]),
  imperfections: z.array(z.string()).default([]),
  statutoryWarrantyClass: z.enum(["nsw_standard", "vic_standard", "qld_class_a", "qld_class_b", "unwarranted"]).default("unwarranted"),
  
  // Private Financials (Field-Level Protected)
  purchasePriceCents: z.number().int().nonnegative().optional().nullable(),
  reconditioningCostCents: z.number().int().nonnegative().optional().nullable(),
  otherCostsCents: z.number().int().nonnegative().optional().nullable(),
  targetMarginCents: z.number().int().optional().nullable(),
  internalNotes: z.string().max(2000).optional().nullable(),
}).refine(
  (data) => !data.egcPriceCents || data.egcPriceCents <= data.totalPriceCents,
  {
    message: "Excluding Government Charges price cannot be higher than the total headline drive-away price",
    path: ["egcPriceCents"],
  }
);

export type VehicleFormData = z.infer<typeof VehicleFormSchema>;

/**
 * Generate SEO and URL-safe vehicle slug
 * e.g., "2020-toyota-rav4-gxl-s1042"
 */
export function generateVehicleSlug({
  year,
  make,
  model,
  variant,
  stockNumber,
}: {
  year: number;
  make: string;
  model: string;
  variant?: string | null;
  stockNumber: string;
}): string {
  const parts = [year, make, model, variant, stockNumber]
    .filter(Boolean)
    .map((str) =>
      String(str)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter((s) => s.length > 0);

  return parts.join("-");
}
