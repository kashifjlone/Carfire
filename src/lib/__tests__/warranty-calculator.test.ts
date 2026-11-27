import { describe, it, expect } from "vitest";
import { calculateStatutoryWarranty } from "@/lib/compliance/warranty-calculator";

describe("Australian Statutory Dealer Warranty Calculator", () => {
  const currentYear = 2026;

  describe("NSW (Motor Dealers and Repairers Act 2013)", () => {
    it("qualifies a late-model low-km vehicle for 3 months / 5,000 km statutory warranty", () => {
      const result = calculateStatutoryWarranty({
        state: "NSW",
        year: 2021, // Age: 5 years
        odometerKm: 48500,
        currentYear,
      });

      expect(result.isEligible).toBe(true);
      expect(result.durationMonths).toBe(3);
      expect(result.maxKm).toBe(5000);
      expect(result.warrantyClass).toBe("NSW Standard Statutory Warranty");
      expect(result.coolingOffPeriod).toContain("1 business day");
    });

    it("excludes vehicles older than 10 years or exceeding 160,000 km", () => {
      const result = calculateStatutoryWarranty({
        state: "NSW",
        year: 2012, // Age: 14 years
        odometerKm: 185000,
        currentYear,
      });

      expect(result.isEligible).toBe(false);
      expect(result.durationMonths).toBe(0);
      expect(result.maxKm).toBe(0);
      expect(result.warrantyClass).toBe("Excluded from Statutory Warranty");
      expect(result.summaryText).toContain("Over 10 years");
    });
  });

  describe("VIC (Motor Car Traders Act 1986)", () => {
    it("qualifies vehicle and specifies 3 clear business days cooling-off period", () => {
      const result = calculateStatutoryWarranty({
        state: "VIC",
        year: 2020,
        odometerKm: 62000,
        currentYear,
      });

      expect(result.isEligible).toBe(true);
      expect(result.durationMonths).toBe(3);
      expect(result.maxKm).toBe(5000);
      expect(result.coolingOffPeriod).toContain("3 clear business days");
    });
  });

  describe("QLD (Motor Dealers and Chattel Auctioneers Act 2014)", () => {
    it("assigns Class A warranty (3 mo / 5,000 km) for under 10 years and under 160,000 km", () => {
      const result = calculateStatutoryWarranty({
        state: "QLD",
        year: 2022,
        odometerKm: 35000,
        currentYear,
      });

      expect(result.isEligible).toBe(true);
      expect(result.warrantyClass).toBe("Class A Statutory Warranty");
      expect(result.durationMonths).toBe(3);
      expect(result.maxKm).toBe(5000);
    });

    it("assigns Class B warranty (1 mo / 1,000 km) for vehicles 10+ years or 160,000+ km", () => {
      const result = calculateStatutoryWarranty({
        state: "QLD",
        year: 2014, // Age: 12 years
        odometerKm: 175000,
        currentYear,
      });

      expect(result.isEligible).toBe(true);
      expect(result.warrantyClass).toBe("Class B Statutory Warranty");
      expect(result.durationMonths).toBe(1);
      expect(result.maxKm).toBe(1000);
    });
  });
});
