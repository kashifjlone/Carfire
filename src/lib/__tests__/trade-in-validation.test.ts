import { describe, it, expect } from "vitest";
import { submitTradeInAction } from "@/lib/trade-in/actions";
import { estimateTradeInValuation } from "@/lib/trade-in/valuation";
import { getGlobalLeads } from "@/lib/crm/leads-store";

describe("Trade-In Appraisal & Valuation Engine", () => {
  it("calculates indicative trade-in valuation range based on age, km, and condition", () => {
    // 2018 car, 65,000 km, good condition
    const valuation = estimateTradeInValuation({
      year: 2018,
      odometerKm: 65000,
      condition: "good",
    });

    expect(valuation.minAud).toBeGreaterThan(5000);
    expect(valuation.maxAud).toBeGreaterThan(valuation.minAud);
    expect(valuation.indicativeTradeAud).toBeGreaterThanOrEqual(valuation.minAud);
    expect(valuation.indicativeTradeAud).toBeLessThanOrEqual(valuation.maxAud);
  });

  it("adjusts valuation upwards for low km / excellent condition vs poor condition", () => {
    const excellent = estimateTradeInValuation({
      year: 2021,
      odometerKm: 30000,
      condition: "excellent",
    });

    const poor = estimateTradeInValuation({
      year: 2021,
      odometerKm: 150000,
      condition: "poor",
    });

    expect(excellent.indicativeTradeAud).toBeGreaterThan(poor.indicativeTradeAud * 1.3);
  });

  it("submits valid trade-in and ingests lead into CRM pipeline", async () => {
    const initialCount = getGlobalLeads().length;

    const result = await submitTradeInAction({
      dealershipId: "00000000-0000-0000-0000-000000000001",
      vehicleTitle: "2021 Toyota RAV4 GXL AWD",
      name: "Liam O'Connor",
      email: "liam@example.com.au",
      phone: "0412 345 678",
      rego: "ABC12D",
      regoState: "NSW",
      make: "Mazda",
      model: "3",
      year: 2018,
      odometerKm: 65000,
      condition: "good",
      honeypot: "", // Empty honeypot
    });

    expect(result.success).toBe(true);
    expect(result.valuation).toBeDefined();
    expect(result.valuation!.indicativeTradeAud).toBeGreaterThan(5000);

    // Verify lead was ingested
    const updatedLeads = getGlobalLeads();
    expect(updatedLeads.length).toBe(initialCount + 1);
    expect(updatedLeads[0].name).toBe("Liam O'Connor");
    expect(updatedLeads[0].source).toBe("Trade-In Request");
    expect(updatedLeads[0].vehicleTitle).toContain("Mazda 3");
  });

  it("rejects honeypot spam bot submissions", async () => {
    const result = await submitTradeInAction({
      dealershipId: "00000000-0000-0000-0000-000000000001",
      vehicleTitle: "2021 Toyota RAV4",
      name: "Spam Bot",
      email: "bot@spam.com",
      phone: "0412 345 678",
      rego: "SPAM12",
      regoState: "NSW",
      make: "Ford",
      model: "Falcon",
      year: 2010,
      odometerKm: 180000,
      condition: "fair",
      honeypot: "http://malicious-spam-link.com", // Filled honeypot
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Spam detected");
  });

  it("rejects invalid Australian phone numbers", async () => {
    const result = await submitTradeInAction({
      dealershipId: "00000000-0000-0000-0000-000000000001",
      vehicleTitle: "2021 Toyota RAV4",
      name: "John Doe",
      email: "john@example.com",
      phone: "12345", // Invalid phone
      rego: "REG123",
      regoState: "NSW",
      make: "Toyota",
      model: "Yaris",
      year: 2015,
      odometerKm: 90000,
      condition: "good",
      honeypot: "",
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Australian phone number");
  });
});
