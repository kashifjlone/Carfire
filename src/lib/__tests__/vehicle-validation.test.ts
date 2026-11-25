import { describe, it, expect } from "vitest";
import { VehicleFormSchema, generateVehicleSlug } from "../validations/vehicle";

describe("Vehicle Validation & Slug Generation", () => {
  const validUuid = "123e4567-e89b-12d3-a456-426614174000";

  it("validates complete vehicle with private financials", () => {
    const validVehicle = {
      dealershipId: validUuid,
      branchId: validUuid,
      vin: "6T1AA11A11A111111",
      stockNumber: "S-1042",
      make: "Toyota",
      model: "RAV4",
      year: 2021,
      variant: "GXL AWD",
      bodyType: "suv",
      transmission: "automatic",
      fuelType: "hybrid",
      odometerKm: 48500,
      totalPriceCents: 3499000,
      egcPriceCents: 3250000,
      publicationStatus: "published",
      availability: "in_stock",
      publicDescription: "Great condition",
      features: ["CarPlay", "Lane Assist"],
      imperfections: [],
      statutoryWarrantyClass: "nsw_standard",
      purchasePriceCents: 2800000,
      reconditioningCostCents: 150000,
      targetMarginCents: 549000,
      internalNotes: "Purchased from fleet lease",
    };

    const parsed = VehicleFormSchema.safeParse(validVehicle);
    expect(parsed.success).toBe(true);
  });

  it("enforces ACL s 48 single pricing: rejects EGC > total headline price", () => {
    const invalidPricing = {
      dealershipId: validUuid,
      branchId: validUuid,
      vin: "6T1AA11A11A111111",
      stockNumber: "S-1042",
      make: "Toyota",
      model: "RAV4",
      year: 2021,
      bodyType: "suv",
      transmission: "automatic",
      fuelType: "hybrid",
      odometerKm: 50000,
      totalPriceCents: 3000000, // $30,000 total
      egcPriceCents: 3200000,   // $32,000 EGC (ILLEGAL)
    };

    const parsed = VehicleFormSchema.safeParse(invalidPricing);
    expect(parsed.success).toBe(false);
  });

  it("generates deterministic URL-safe vehicle slugs", () => {
    const slug = generateVehicleSlug({
      year: 2021,
      make: "Toyota",
      model: "RAV4",
      variant: "GXL AWD",
      stockNumber: "S-1042",
    });

    expect(slug).toBe("2021-toyota-rav4-gxl-awd-s-1042");
  });
});
