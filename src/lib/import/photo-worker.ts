import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET_NAME, buildVehicleMediaKey } from "@/lib/storage/s3";
import { validateSafeExternalUrl } from "@/lib/security/ssrf";
import crypto from "node:crypto";

export interface PhotoImportResult {
  sourceUrl: string;
  storageKey?: string;
  success: boolean;
  error?: string;
}

/**
 * Download external vehicle photo safely (with SSRF protection) and re-host to Cloudflare R2 / S3
 */
export async function rehostExternalPhoto({
  dealershipId,
  vehicleId,
  sourceUrl,
}: {
  dealershipId: string;
  vehicleId: string;
  sourceUrl: string;
}): Promise<PhotoImportResult> {
  // 1. SSRF Validation
  const ssrfCheck = await validateSafeExternalUrl(sourceUrl);
  if (!ssrfCheck.isSafe) {
    return {
      sourceUrl,
      success: false,
      error: `Blocked by SSRF filter: ${ssrfCheck.reason}`,
    };
  }

  try {
    // 2. Fetch with size & timeout limits (AbortController)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000); // 25s timeout

    const response = await fetch(sourceUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "AutoSaaS-PhotoImportBot/1.0",
        Accept: "image/*",
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return {
        sourceUrl,
        success: false,
        error: `HTTP ${response.status} ${response.statusText}`,
      };
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return {
        sourceUrl,
        success: false,
        error: `Invalid content-type: ${contentType}`,
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Enforce 15MB limit
    if (buffer.length > 15 * 1024 * 1024) {
      return {
        sourceUrl,
        success: false,
        error: "Image size exceeds 15MB limit",
      };
    }

    // 3. Generate storage key
    const fileUuid = crypto.randomUUID();
    const ext = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
    const storageKey = buildVehicleMediaKey({
      dealershipId,
      vehicleId,
      fileUuid,
      extension: ext,
    });

    // 4. Upload to R2 / S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: storageKey,
        Body: buffer,
        ContentType: contentType,
      })
    );

    return {
      sourceUrl,
      storageKey,
      success: true,
    };
  } catch (err) {
    return {
      sourceUrl,
      success: false,
      error: (err as Error).message,
    };
  }
}
