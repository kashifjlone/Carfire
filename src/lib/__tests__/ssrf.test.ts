import { describe, it, expect } from "vitest";
import { validateSafeExternalUrl } from "../security/ssrf";

describe("SSRF Protection for CSV Photo Re-hosting", () => {
  it("rejects non-HTTPS URLs", async () => {
    const res = await validateSafeExternalUrl("http://example.com/photo.jpg");
    expect(res.isSafe).toBe(false);
    expect(res.reason).toContain("only HTTPS is permitted");
  });

  it("rejects loopback localhost targets", async () => {
    const res = await validateSafeExternalUrl("https://localhost/admin");
    expect(res.isSafe).toBe(false);
  });

  it("rejects AWS/Cloud metadata IPs (169.254.169.254)", async () => {
    const res = await validateSafeExternalUrl("https://169.254.169.254/latest/meta-data/");
    expect(res.isSafe).toBe(false);
  });

  it("rejects RFC 1918 private IP ranges", async () => {
    const privateIps = [
      "https://10.0.0.1/image.jpg",
      "https://192.168.1.1/image.jpg",
      "https://172.16.0.1/image.jpg",
    ];

    for (const url of privateIps) {
      const res = await validateSafeExternalUrl(url);
      expect(res.isSafe).toBe(false);
    }
  });

  it("approves safe public HTTPS image hostnames", async () => {
    // Cloudflare public DNS
    const res = await validateSafeExternalUrl("https://cloudflare.com/favicon.ico");
    expect(res.isSafe).toBe(true);
  });
});
