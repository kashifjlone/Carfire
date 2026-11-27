import { describe, it, expect } from "vitest";
import { normaliseHostname, customDomainSchema } from "@/lib/validations/domain";

describe("Custom Domain Validation & Normalisation", () => {
  const validDealershipId = "00000000-0000-0000-0000-000000000001";

  it("normalises hostnames by stripping protocols, ports, and trailing slashes", () => {
    expect(normaliseHostname("https://BayviewMotors.com.au/")).toBe("bayviewmotors.com.au");
    expect(normaliseHostname("http://cars.sydney.com.au:3000")).toBe("cars.sydney.com.au");
    expect(normaliseHostname("  prestige.com.au.  ")).toBe("prestige.com.au");
  });

  it("validates valid Australian and international dealer domains", () => {
    const validInputs = [
      "bayviewmotors.com.au",
      "sydneyprestige.com.au",
      "melbourne-autos.com.au",
      "brisbanecars.net.au",
      "goldcoastdealers.com",
    ];

    for (const host of validInputs) {
      const result = customDomainSchema.safeParse({
        dealershipId: validDealershipId,
        hostname: host,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.hostname).toBe(host);
      }
    }
  });

  it("rejects reserved platform hostnames and subdomains", () => {
    const reservedInputs = [
      "localhost",
      "platform.com.au",
      "app.platform.com.au",
      "api.platform.com.au",
      "admin.platform.com.au",
      "app.dealers.com.au",
      "api.myyard.com.au",
    ];

    for (const host of reservedInputs) {
      const result = customDomainSchema.safeParse({
        dealershipId: validDealershipId,
        hostname: host,
      });
      expect(result.success).toBe(false);
    }
  });

  it("rejects malformed domains and invalid characters", () => {
    const invalidInputs = [
      "not-a-domain",
      "invalid..com",
      "-starts-with-dash.com.au",
      "has_underscore.com",
      "a.b",
    ];

    for (const host of invalidInputs) {
      const result = customDomainSchema.safeParse({
        dealershipId: validDealershipId,
        hostname: host,
      });
      expect(result.success).toBe(false);
    }
  });
});
