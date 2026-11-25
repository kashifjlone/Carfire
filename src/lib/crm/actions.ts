"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { GeneralEnquirySchema, FinanceEnquirySchema, TradeInRequestSchema } from "@/lib/validations/forms";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { checkFormRateLimit } from "@/lib/security/rate-limit";

export interface FormSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server Action: Submit public buyer vehicle enquiry
 * Enforces the complete 6-stage security pipeline (Zod, honeypot, Turnstile, rate limit, CRM ingestion)
 */
export async function submitGeneralEnquiryAction(rawInput: unknown): Promise<FormSubmissionResult> {
  // 1. Zod validation & sanitisation (honeypot check included)
  const parseResult = GeneralEnquirySchema.safeParse(rawInput);
  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.errors.map((e) => e.message).join(", "),
    };
  }

  const data = parseResult.data;
  const headerStore = await headers();
  const clientIp = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

  // 2. Cloudflare Turnstile Verification
  const turnstileResult = await verifyTurnstileToken({
    token: data.turnstileToken,
    remoteIp: clientIp,
  });

  if (!turnstileResult.success) {
    return {
      success: false,
      error: "Security verification failed. Please refresh and try again.",
    };
  }

  // 3. Upstash Redis Rate Limiting (IP + email HMAC)
  const rateLimitResult = await checkFormRateLimit({
    dealershipId: data.dealershipId,
    clientIp,
    email: data.email,
  });

  if (!rateLimitResult.allowed) {
    return {
      success: false,
      error: "Too many submissions. Please wait before submitting another enquiry.",
    };
  }

  // 4. Ingest into CRM (Inquiries -> Customers -> Leads)
  const supabase = await createClient();

  // (a) Record raw immutable enquiry
  const { data: inq, error: inqError } = await supabase
    .from("inquiries")
    .insert({
      dealership_id: data.dealershipId,
      vehicle_id: data.vehicleId || null,
      source: "website_enquiry_form",
      payload: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
      ip_address: clientIp,
    })
    .select("id")
    .single();

  if (inqError) {
    console.error("Enquiry insertion error:", inqError);
  }

  // (b) Find or create customer (scoped to dealership)
  let customerId: string | null = null;
  const { data: existingCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("dealership_id", data.dealershipId)
    .eq("email", data.email.toLowerCase().trim())
    .maybeSingle();

  if (existingCustomer) {
    customerId = existingCustomer.id;
  } else {
    const { data: newCustomer } = await supabase
      .from("customers")
      .insert({
        dealership_id: data.dealershipId,
        name: data.name,
        email: data.email.toLowerCase().trim(),
        phone: data.phone,
      })
      .select("id")
      .single();

    customerId = newCustomer?.id || null;
  }

  // (c) Create actionable lead
  if (customerId) {
    const { data: lead } = await supabase
      .from("leads")
      .insert({
        dealership_id: data.dealershipId,
        customer_id: customerId,
        vehicle_id: data.vehicleId || null,
        stage: "new",
      })
      .select("id")
      .single();

    if (lead) {
      // Record initial activity
      await supabase.from("lead_activities").insert({
        dealership_id: data.dealershipId,
        lead_id: lead.id,
        activity_type: "note",
        details: {
          note: `New enquiry received via website: "${data.message || "General enquiry"}"`,
        },
      });
    }
  }

  return {
    success: true,
    message: "Thank you! Your enquiry has been received. Our team will contact you shortly.",
  };
}

/**
 * Server Action: Update lead sales pipeline stage (Staff CRM)
 */
export async function updateLeadStageAction({
  dealershipId,
  leadId,
  stage,
}: {
  dealershipId: string;
  leadId: string;
  stage: "new" | "contacted" | "test_drive_booked" | "negotiating" | "won" | "lost";
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("leads")
    .update({ stage, updated_at: new Date().toISOString() })
    .eq("id", leadId)
    .eq("dealership_id", dealershipId);

  if (error) {
    return { success: false, error: error.message };
  }

  // Log activity
  await supabase.from("lead_activities").insert({
    dealership_id: dealershipId,
    lead_id: leadId,
    activity_type: "status_change",
    details: { stage },
  });

  return { success: true };
}
