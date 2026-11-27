"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { addGlobalLead } from "@/lib/crm/leads-store";
import { estimateTradeInValuation } from "./valuation";

const TradeInInputSchema = z.object({
  dealershipId: z.string().default("00000000-0000-0000-0000-000000000001"),
  vehicleTitle: z.string().min(1),
  stockNumber: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/, "Please enter a valid Australian phone number"),
  rego: z.string().min(1, "Registration number is required").max(10),
  regoState: z.enum(["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"]),
  make: z.string().min(1, "Vehicle make is required"),
  model: z.string().min(1, "Vehicle model is required"),
  year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
  odometerKm: z.number().int().positive("Odometer reading must be greater than 0"),
  condition: z.enum(["excellent", "good", "fair", "poor"]),
  comments: z.string().max(500).optional(),
  honeypot: z.string().max(0, "Spam detected"), // Anti-spam honeypot
});

export type TradeInInput = z.infer<typeof TradeInInputSchema>;

export interface TradeInValuationResult {
  success: boolean;
  message?: string;
  error?: string;
  valuation?: {
    minAud: number;
    maxAud: number;
    indicativeTradeAud: number;
  };
}

export async function submitTradeInAction(rawInput: unknown): Promise<TradeInValuationResult> {
  const parsed = TradeInInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid trade-in submission",
    };
  }

  const data = parsed.data;

  // Calculate valuation
  const valuation = estimateTradeInValuation({
    year: data.year,
    odometerKm: data.odometerKm,
    condition: data.condition,
  });

  // Ingest into CRM lead stream
  addGlobalLead({
    id: `lead-trd-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    vehicleTitle: `Trade-In: ${data.year} ${data.make} ${data.model} (Rego: ${data.rego} ${data.regoState})`,
    source: "Trade-In Request",
    stage: "new",
    createdAt: "Just now",
    message: `Trade-in enquiry for ${data.vehicleTitle}. Odometer: ${data.odometerKm.toLocaleString()} km, Condition: ${data.condition.toUpperCase()}. Estimated range: $${valuation.minAud.toLocaleString()} - $${valuation.maxAud.toLocaleString()} AUD.`,
  });

  try {
    revalidatePath("/admin/leads");
  } catch {
    // In unit test environments, static generation store may not be present
  }

  return {
    success: true,
    valuation,
    message: "Trade-in appraisal submitted successfully! A dealership consultant will confirm the valuation.",
  };
}
