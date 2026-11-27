export interface DealershipDomain {
  id: string;
  dealership_id: string;
  hostname: string;
  status: "pending_dns" | "verified" | "active" | "failed";
  is_primary: boolean;
  verification_token: string;
  ssl_status: "pending" | "provisioned" | "failed";
  apex_redirect: "none" | "to_apex" | "to_www";
  verified_at: string | null;
  created_at: string;
}

export interface DnsRecordInstruction {
  type: "CNAME" | "TXT" | "A";
  name: string;
  target: string;
  ttl: string;
  description: string;
}
