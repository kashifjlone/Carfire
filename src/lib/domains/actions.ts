"use server";

import { customDomainSchema } from "@/lib/validations/domain";
import type { DealershipDomain } from "@/lib/types/domain";

// In a full Supabase environment, this queries the database via supabaseServerClient.
// For initial demo/test resilience, we maintain an in-memory/fallback registry seeded with realistic domains.
let DEMO_DOMAINS: DealershipDomain[] = [
  {
    id: "dom-sydney-01",
    dealership_id: "00000000-0000-0000-0000-000000000001",
    hostname: "sydney-prestige.platform.com.au",
    status: "active",
    is_primary: true,
    verification_token: "yf_verify_sys_default_primary",
    ssl_status: "provisioned",
    apex_redirect: "none",
    verified_at: "2026-11-20T00:00:00Z",
    created_at: "2026-11-20T00:00:00Z",
  },
  {
    id: "dom-sydney-02",
    dealership_id: "00000000-0000-0000-0000-000000000001",
    hostname: "sydneyprestigemotors.com.au",
    status: "active",
    is_primary: false,
    verification_token: "yf_verify_3b8a1c90df4a22b7",
    ssl_status: "provisioned",
    apex_redirect: "to_apex",
    verified_at: "2026-11-21T10:15:00Z",
    created_at: "2026-11-21T09:00:00Z",
  },
];

export async function getDealershipDomainsAction(dealershipId: string): Promise<DealershipDomain[]> {
  return DEMO_DOMAINS.filter((d) => d.dealership_id === dealershipId);
}

export async function addCustomDomainAction(params: {
  dealershipId: string;
  hostname: string;
}): Promise<{ success: boolean; domain?: DealershipDomain; error?: string }> {
  const parsed = customDomainSchema.safeParse(params);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid domain name" };
  }

  const { dealershipId, hostname } = parsed.data;

  // Check collision
  const existing = DEMO_DOMAINS.find((d) => d.hostname === hostname);
  if (existing) {
    return { success: false, error: "This domain is already registered to a dealership lot" };
  }

  const newDomain: DealershipDomain = {
    id: `dom-${Date.now()}`,
    dealership_id: dealershipId,
    hostname,
    status: "pending_dns",
    is_primary: false,
    verification_token: `yf_verify_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
    ssl_status: "pending",
    apex_redirect: hostname.startsWith("www.") ? "to_apex" : "none",
    verified_at: null,
    created_at: new Date().toISOString(),
  };

  DEMO_DOMAINS.push(newDomain);
  return { success: true, domain: newDomain };
}

export async function verifyDomainDnsAction(params: {
  dealershipId: string;
  domainId: string;
}): Promise<{ success: boolean; status?: DealershipDomain["status"]; error?: string }> {
  const domain = DEMO_DOMAINS.find((d) => d.id === params.domainId && d.dealership_id === params.dealershipId);
  if (!domain) {
    return { success: false, error: "Domain not found" };
  }

  // Simulate automated DNS challenge & SSL provisioning
  domain.status = "active";
  domain.ssl_status = "provisioned";
  domain.verified_at = new Date().toISOString();

  return { success: true, status: "active" };
}

export async function setPrimaryDomainAction(params: {
  dealershipId: string;
  domainId: string;
}): Promise<{ success: boolean; error?: string }> {
  const target = DEMO_DOMAINS.find((d) => d.id === params.domainId && d.dealership_id === params.dealershipId);
  if (!target) {
    return { success: false, error: "Target domain not found" };
  }

  if (target.status !== "active") {
    return { success: false, error: "Domain must be active and verified before setting as primary" };
  }

  // Set target primary, clear others
  DEMO_DOMAINS = DEMO_DOMAINS.map((d) => {
    if (d.dealership_id === params.dealershipId) {
      return { ...d, is_primary: d.id === params.domainId };
    }
    return d;
  });

  return { success: true };
}

export async function deleteCustomDomainAction(params: {
  dealershipId: string;
  domainId: string;
}): Promise<{ success: boolean; error?: string }> {
  const target = DEMO_DOMAINS.find((d) => d.id === params.domainId && d.dealership_id === params.dealershipId);
  if (!target) {
    return { success: false, error: "Domain not found" };
  }

  if (target.is_primary) {
    return { success: false, error: "Cannot delete the primary storefront domain. Please set another primary domain first." };
  }

  DEMO_DOMAINS = DEMO_DOMAINS.filter((d) => d.id !== params.domainId);
  return { success: true };
}
