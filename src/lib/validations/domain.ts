import { z } from "zod";

const RESERVED_HOSTNAMES = new Set([
  "localhost",
  "platform.com.au",
  "yardflow.com.au",
  "app.platform.com.au",
  "api.platform.com.au",
  "admin.platform.com.au",
  "auth.platform.com.au",
  "staging.platform.com.au",
  "cdn.platform.com.au",
]);

const RESERVED_SUBDOMAINS = new Set([
  "app",
  "api",
  "admin",
  "auth",
  "root",
  "mail",
  "smtp",
  "ftp",
  "ns1",
  "ns2",
  "cname",
  "staging",
  "preview",
]);

export function normaliseHostname(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/:[0-9]+$/, "")
    .replace(/\.$/, "");
}

export const customDomainSchema = z.object({
  dealershipId: z.string().min(1, "Dealership ID is required"),
  hostname: z
    .string()
    .transform((val) => normaliseHostname(val))
    .pipe(
      z
        .string()
        .min(4, "Domain name is too short")
        .max(253, "Domain name exceeds maximum length")
        .regex(
          /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/,
          "Must be a valid domain format (e.g. bayviewmotors.com.au)"
        )
        .refine((val) => !RESERVED_HOSTNAMES.has(val), {
          message: "This domain is reserved by the platform infrastructure",
        })
        .refine(
          (val) => {
            const parts = val.split(".");
            if (parts.length > 2 && RESERVED_SUBDOMAINS.has(parts[0])) {
              return false;
            }
            return true;
          },
          { message: "The chosen subdomain prefix is reserved" }
        )
    ),
});

export type CustomDomainInput = z.infer<typeof customDomainSchema>;
