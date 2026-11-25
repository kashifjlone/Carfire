import crypto from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Mock memory store fallback if Upstash credentials are not set in local dev
let ratelimitInstance: Ratelimit | null = null;

function getRateLimiter() {
  if (ratelimitInstance) return ratelimitInstance;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token && url !== "https://your-upstash.upstash.io") {
    const redis = new Redis({ url, token });
    ratelimitInstance = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 submissions per hour per tenant:ip
      analytics: false,
    });
  }
  return ratelimitInstance;
}

/**
 * Generate HMAC of email for privacy-safe rate-limit keys
 */
export function hashEmail(email: string): string {
  const secret = process.env.RATE_LIMIT_HMAC_SECRET || "dev-fallback-hmac-secret-min-32-chars-long";
  return crypto.createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex");
}

/**
 * Check rate limit for form submission
 */
export async function checkFormRateLimit({
  dealershipId,
  clientIp,
  email,
}: {
  dealershipId: string;
  clientIp: string;
  email: string;
}): Promise<{ allowed: boolean; remaining?: number }> {
  const limiter = getRateLimiter();

  // If Upstash is not configured in local development, allow requests
  if (!limiter) {
    return { allowed: true, remaining: 5 };
  }

  const emailHmac = hashEmail(email);
  const identifier = `${dealershipId}:${clientIp}:${emailHmac.slice(0, 16)}`;

  const { success, remaining } = await limiter.limit(identifier);
  return { allowed: success, remaining };
}
