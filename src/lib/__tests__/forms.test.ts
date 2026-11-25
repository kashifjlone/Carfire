import { describe, it, expect } from "vitest";
import { GeneralEnquirySchema, FinanceEnquirySchema, TradeInRequestSchema } from "../validations/forms";

describe("Public Lead Forms Validation", () => {
  const validUuid = "123e4567-e89b-12d3-a456-426614174000";

  it("accepts valid Australian buyer enquiry", () => {
    const valid = {
      dealershipId: validUuid,
      vehicleId: validUuid,
      name: "Michael Henderson",
      email: "m.henderson@example.com.au",
      phone: "0412 345 678",
      message: "Is this vehicle still available for inspection?",
      honeypot: "",
      turnstileToken: "valid-turnstile-token",
    };

    const parsed = GeneralEnquirySchema.safeParse(valid);
    expect(parsed.success).toBe(true);
  });

  it("rejects enquiry if honeypot is filled (bot detection)", () => {
    const spam = {
      dealershipId: validUuid,
      name: "Bot Spammer",
      email: "spam@example.com",
      phone: "0412345678",
      honeypot: "I am a spam bot",
      turnstileToken: "token",
    };

    const parsed = GeneralEnquirySchema.safeParse(spam);
    expect(parsed.success).toBe(false);
  });

  it("rejects invalid Australian phone numbers", () => {
    const invalidPhone = {
      dealershipId: validUuid,
      name: "John Smith",
      email: "john@example.com",
      phone: "12345", // Invalid
      honeypot: "",
      turnstileToken: "token",
    };

    const parsed = GeneralEnquirySchema.safeParse(invalidPhone);
    expect(parsed.success).toBe(false);
  });

  it("validates trade-in vehicle appraisal submission", () => {
    const tradeIn = {
      dealershipId: validUuid,
      name: "Sarah Jenkins",
      email: "sarah.j@example.com.au",
      phone: "+61498765432",
      tradeInVehicle: {
        rego: "ABC12D",
        regoState: "NSW",
        make: "Mazda",
        model: "CX-5",
        year: 2018,
        odometerKm: 92000,
        condition: "good",
      },
      honeypot: "",
      turnstileToken: "token",
    };

    const parsed = TradeInRequestSchema.safeParse(tradeIn);
    expect(parsed.success).toBe(true);
  });
});
