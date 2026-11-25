import { z } from "zod";

/**
 * General buyer vehicle enquiry schema
 */
export const GeneralEnquirySchema = z.object({
  dealershipId: z.string().uuid("Invalid dealership identifier"),
  vehicleId: z.string().uuid("Invalid vehicle identifier").optional(),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/, "Please enter a valid Australian phone number"),
  message: z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
  honeypot: z.string().max(0, "Spam detected"), // Must be empty
  turnstileToken: z.string().min(1, "Turnstile verification required"),
});

/**
 * Finance pre-approval / enquiry schema
 */
export const FinanceEnquirySchema = z.object({
  dealershipId: z.string().uuid("Invalid dealership identifier"),
  vehicleId: z.string().uuid("Invalid vehicle identifier"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/, "Please enter a valid Australian phone number"),
  employmentStatus: z.enum(["full_time", "part_time", "self_employed", "casual", "pensioner"]),
  estimatedDepositCents: z.number().int().nonnegative().optional(),
  preferredTermYears: z.number().int().min(1).max(7).default(5),
  honeypot: z.string().max(0, "Spam detected"),
  turnstileToken: z.string().min(1, "Turnstile verification required"),
});

/**
 * Trade-in valuation request schema
 */
export const TradeInRequestSchema = z.object({
  dealershipId: z.string().uuid("Invalid dealership identifier"),
  vehicleOfInterestId: z.string().uuid().optional(),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/, "Please enter a valid Australian phone number"),
  tradeInVehicle: z.object({
    rego: z.string().min(1).max(10),
    regoState: z.enum(["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"]),
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().int().min(1980).max(new Date().getFullYear() + 1),
    odometerKm: z.number().int().positive(),
    condition: z.enum(["excellent", "good", "fair", "poor"]),
  }),
  honeypot: z.string().max(0, "Spam detected"),
  turnstileToken: z.string().min(1, "Turnstile verification required"),
});
