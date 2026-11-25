"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { VehicleFormSchema, type VehicleFormData, generateVehicleSlug } from "@/lib/validations/vehicle";
import type { PublicationStatus, Availability } from "@/lib/types/inventory";

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Server Action: Create a new vehicle with segregated private financials
 */
export async function createVehicleAction(rawInput: unknown): Promise<ActionResult<{ id: string; slug: string }>> {
  const parseResult = VehicleFormSchema.safeParse(rawInput);
  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
    };
  }

  const data = parseResult.data;
  const slug = generateVehicleSlug({
    year: data.year,
    make: data.make,
    model: data.model,
    variant: data.variant,
    stockNumber: data.stockNumber,
  });

  const supabase = await createClient();

  // 1. Insert vehicle into public.vehicles
  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .insert({
      dealership_id: data.dealershipId,
      branch_id: data.branchId,
      vin: data.vin,
      stock_number: data.stockNumber,
      make: data.make,
      model: data.model,
      year: data.year,
      variant: data.variant,
      body_type: data.bodyType,
      transmission: data.transmission,
      fuel_type: data.fuelType,
      odometer_km: data.odometerKm,
      total_price_cents: data.totalPriceCents,
      egc_price_cents: data.egcPriceCents,
      publication_status: data.publicationStatus,
      availability: data.availability,
      slug,
      features: data.features,
      imperfections: data.imperfections,
      public_description: data.publicDescription,
      statutory_warranty_class: data.statutoryWarrantyClass,
      published_at: data.publicationStatus === "published" ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (vehicleError || !vehicle) {
    return {
      success: false,
      error: vehicleError?.message || "Failed to create vehicle",
    };
  }

  // 2. Insert financial figures into public.vehicle_private (if provided)
  if (
    data.purchasePriceCents !== undefined ||
    data.reconditioningCostCents !== undefined ||
    data.otherCostsCents !== undefined ||
    data.targetMarginCents !== undefined ||
    data.internalNotes
  ) {
    const { error: privateError } = await supabase
      .from("vehicle_private")
      .insert({
        vehicle_id: vehicle.id,
        dealership_id: data.dealershipId,
        purchase_price_cents: data.purchasePriceCents,
        reconditioning_cost_cents: data.reconditioningCostCents,
        other_costs_cents: data.otherCostsCents,
        target_margin_cents: data.targetMarginCents,
        internal_notes: data.internalNotes,
      });

    if (privateError) {
      console.error("Failed to insert vehicle_private financials:", privateError);
    }
  }

  revalidatePath("/inventory");
  revalidatePath(`/vehicles/${slug}`);

  return {
    success: true,
    data: { id: vehicle.id, slug },
  };
}

/**
 * Server Action: Update vehicle details and private financials
 */
export async function updateVehicleAction(
  vehicleId: string,
  rawInput: unknown
): Promise<ActionResult<{ id: string }>> {
  const parseResult = VehicleFormSchema.safeParse(rawInput);
  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
    };
  }

  const data = parseResult.data;
  const supabase = await createClient();

  const { error: vehicleError } = await supabase
    .from("vehicles")
    .update({
      branch_id: data.branchId,
      vin: data.vin,
      stock_number: data.stockNumber,
      make: data.make,
      model: data.model,
      year: data.year,
      variant: data.variant,
      body_type: data.bodyType,
      transmission: data.transmission,
      fuel_type: data.fuelType,
      odometer_km: data.odometerKm,
      total_price_cents: data.totalPriceCents,
      egc_price_cents: data.egcPriceCents,
      publication_status: data.publicationStatus,
      availability: data.availability,
      features: data.features,
      imperfections: data.imperfections,
      public_description: data.publicDescription,
      statutory_warranty_class: data.statutoryWarrantyClass,
      updated_at: new Date().toISOString(),
    })
    .eq("id", vehicleId)
    .eq("dealership_id", data.dealershipId);

  if (vehicleError) {
    return { success: false, error: vehicleError.message };
  }

  // Update private financials
  const { error: privateError } = await supabase
    .from("vehicle_private")
    .upsert({
      vehicle_id: vehicleId,
      dealership_id: data.dealershipId,
      purchase_price_cents: data.purchasePriceCents,
      reconditioning_cost_cents: data.reconditioningCostCents,
      other_costs_cents: data.otherCostsCents,
      target_margin_cents: data.targetMarginCents,
      internal_notes: data.internalNotes,
      updated_at: new Date().toISOString(),
    });

  if (privateError) {
    console.error("Failed to update vehicle_private financials:", privateError);
  }

  revalidatePath("/inventory");
  return { success: true, data: { id: vehicleId } };
}

/**
 * Server Action: Change publication status (draft/published/archived)
 */
export async function setVehiclePublicationStatusAction({
  dealershipId,
  vehicleId,
  status,
}: {
  dealershipId: string;
  vehicleId: string;
  status: PublicationStatus;
}): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("vehicles")
    .update({
      publication_status: status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", vehicleId)
    .eq("dealership_id", dealershipId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/inventory");
  return { success: true };
}

/**
 * Server Action: Change vehicle availability (in_stock/under_offer/sold/in_transit)
 */
export async function setVehicleAvailabilityAction({
  dealershipId,
  vehicleId,
  availability,
}: {
  dealershipId: string;
  vehicleId: string;
  availability: Availability;
}): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("vehicles")
    .update({
      availability,
      updated_at: new Date().toISOString(),
    })
    .eq("id", vehicleId)
    .eq("dealership_id", dealershipId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/inventory");
  return { success: true };
}
