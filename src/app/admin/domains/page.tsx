import React from "react";
import { getDealershipDomainsAction } from "@/lib/domains/actions";
import { DomainManager } from "@/components/admin/DomainManager";

export default async function AdminDomainsPage() {
  const dealershipId = "00000000-0000-0000-0000-000000000001";
  const initialDomains = await getDealershipDomainsAction(dealershipId);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Custom Domains & Edge Routing</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your dealership's primary custom domain, DNS verification tokens, and automatic SSL certificates.
        </p>
      </div>

      <DomainManager
        initialDomains={initialDomains}
        dealershipId={dealershipId}
      />
    </div>
  );
}
