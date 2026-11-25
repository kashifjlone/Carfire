export type PublicationStatus = "draft" | "published" | "archived";
export type Availability = "in_stock" | "in_transit" | "under_offer" | "sold";
export type BodyType = "sedan" | "suv" | "hatch" | "ute" | "wagon" | "coupe" | "convertible" | "van";
export type Transmission = "automatic" | "manual";
export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";
export type StatutoryWarrantyClass = "nsw_standard" | "vic_standard" | "qld_class_a" | "qld_class_b" | "unwarranted";

export interface Vehicle {
  id: string;
  dealership_id: string;
  branch_id: string;
  vin: string;
  stock_number: string;
  make: string;
  model: string;
  year: number;
  variant?: string | null;
  body_type: BodyType;
  transmission: Transmission;
  fuel_type: FuelType;
  odometer_km: number;
  total_price_cents: number;
  egc_price_cents?: number | null;
  publication_status: PublicationStatus;
  availability: Availability;
  slug: string;
  features: string[];
  imperfections: string[];
  public_description?: string | null;
  ppsr_checked_at?: string | null;
  ppsr_status: "clear" | "interest_registered" | "not_checked";
  statutory_warranty_class: StatutoryWarrantyClass;
  niche_attributes: Record<string, unknown>;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface VehiclePrivateFinancials {
  vehicle_id: string;
  dealership_id: string;
  purchase_price_cents?: number | null;
  reconditioning_cost_cents?: number | null;
  other_costs_cents?: number | null;
  target_margin_cents?: number | null;
  internal_notes?: string | null;
  ppsr_certificate_storage_key?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PublicVehicleSummary {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  variant?: string | null;
  total_price_cents: number;
  egc_price_cents?: number | null;
  odometer_km: number;
  body_type: BodyType;
  transmission: Transmission;
  cover_image_key?: string | null;
  published_at?: string | null;
}

export interface PublicVehicleDetail {
  id: string;
  slug: string;
  stock_number: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  variant?: string | null;
  body_type: BodyType;
  transmission: Transmission;
  fuel_type: FuelType;
  odometer_km: number;
  price: {
    total_drive_away_cents: number;
    egc_cents?: number | null;
  };
  description?: string | null;
  features: string[];
  imperfections: string[];
  availability: Availability;
  ppsr_summary: {
    status: string;
    checked_at?: string | null;
  };
  statutory_warranty_class: StatutoryWarrantyClass;
  branch: {
    name: string;
    address: string;
    state: string;
    phone?: string | null;
  };
  media: Array<{
    storage_key: string;
    alt_text?: string | null;
  }>;
}
