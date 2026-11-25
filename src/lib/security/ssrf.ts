import dns from "node:dns/promises";
import net from "node:net";

// Blocked IP ranges per OWASP SSRF prevention cheat sheet
const BLOCKED_IPV4_RANGES = [
  /^127\./,                         // Loopback (127.0.0.0/8)
  /^10\./,                          // RFC 1918 Private (10.0.0.0/8)
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // RFC 1918 Private (172.16.0.0/12)
  /^192\.168\./,                    // RFC 1918 Private (192.168.0.0/16)
  /^169\.254\./,                    // Link-Local / Cloud Metadata (169.254.0.0/16)
  /^0\./,                           // Current network
  /^100\.(6[4-9]|[7-9][0-9]|1[0-1][0-9]|12[0-7])\./, // Carrier-grade NAT
];

/**
 * Validates a target URL against SSRF vulnerabilities before fetching
 */
export async function validateSafeExternalUrl(rawUrl: string): Promise<{ isSafe: boolean; reason?: string }> {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { isSafe: false, reason: "Malformed URL" };
  }

  // 1. Only allow HTTPS
  if (parsed.protocol !== "https:") {
    return { isSafe: false, reason: "Insecure protocol: only HTTPS is permitted" };
  }

  const hostname = parsed.hostname;

  // 2. Reject explicit localhost or cloud metadata aliases
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "metadata.google.internal" ||
    hostname === "instance-data"
  ) {
    return { isSafe: false, reason: "Restricted hostname" };
  }

  // 3. Resolve DNS to verify destination IP addresses
  try {
    const addresses = await dns.lookup(hostname, { all: true });
    if (!addresses || addresses.length === 0) {
      return { isSafe: false, reason: "DNS resolution failed" };
    }

    for (const record of addresses) {
      const ip = record.address;

      if (net.isIPv4(ip)) {
        for (const range of BLOCKED_IPV4_RANGES) {
          if (range.test(ip)) {
            return { isSafe: false, reason: `Destination IP ${ip} is in a restricted private/cloud range` };
          }
        }
      } else if (net.isIPv6(ip)) {
        // Block IPv6 loopback (::1) and unique local (fc00::/7)
        if (ip === "::1" || ip.toLowerCase().startsWith("fc") || ip.toLowerCase().startsWith("fd") || ip.toLowerCase().startsWith("fe80")) {
          return { isSafe: false, reason: "Destination IPv6 is in a restricted range" };
        }
      }
    }
  } catch (err) {
    return { isSafe: false, reason: `DNS resolution error: ${(err as Error).message}` };
  }

  return { isSafe: true };
}
