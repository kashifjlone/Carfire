import { describe, it, expect } from "vitest";
import { formatAud, formatKm, calculateRepayment } from "../utils";

describe("Utility Formatting Functions", () => {
  it("formats cents to AUD correctly", () => {
    expect(formatAud(2999000)).toBe("$29,990");
    expect(formatAud(450000)).toBe("$4,500");
    expect(formatAud(0)).toBe("$0");
    expect(formatAud(null)).toBe("POA");
    expect(formatAud(undefined)).toBe("POA");
  });

  it("formats odometer kilometers with comma separators", () => {
    expect(formatKm(84210)).toBe("84,210 km");
    expect(formatKm(500)).toBe("500 km");
    expect(formatKm(0)).toBe("0 km");
    expect(formatKm(null)).toBe("N/A");
  });

  it("calculates indicative weekly finance repayments with mandatory disclaimer", () => {
    // $30,000 car, 8.5% interest, 5 years, weekly
    const result = calculateRepayment({
      principalCents: 3000000,
      annualInterestRatePct: 8.5,
      termYears: 5,
      frequency: "weekly",
    });

    expect(result.frequency).toBe("weekly");
    expect(result.repaymentCents).toBeGreaterThan(13000); // ~$142/week
    expect(result.repaymentCents).toBeLessThan(16000);
    expect(result.disclaimer).toContain("Indicative estimate only");
    expect(result.disclaimer).toContain("Not an offer of credit");
  });

  it("handles zero interest rate cleanly", () => {
    const result = calculateRepayment({
      principalCents: 1000000, // $10,000
      annualInterestRatePct: 0,
      termYears: 1,
      frequency: "monthly",
    });

    expect(result.repaymentCents).toBe(83333); // $833.33/mo
  });
});
