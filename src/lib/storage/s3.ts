import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const useAwsS3 = process.env.USE_AWS_S3 === "true";
const region = process.env.AWS_REGION || "ap-southeast-2";

// Configure S3Client: natively portable between Cloudflare R2 and Amazon S3
export const s3Client = new S3Client({
  region: useAwsS3 ? region : "auto",
  endpoint: useAwsS3
    ? undefined
    : `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: (useAwsS3 ? process.env.AWS_ACCESS_KEY_ID : process.env.R2_ACCESS_KEY_ID) || "mock-access-key",
    secretAccessKey: (useAwsS3 ? process.env.AWS_SECRET_ACCESS_KEY : process.env.R2_SECRET_ACCESS_KEY) || "mock-secret-key",
  },
});

export const BUCKET_NAME = process.env.R2_BUCKET_NAME || "australian-dealer-saas-media";

/**
 * Server-construct storage keys enforcing tenant isolation
 * Pattern: dealerships/{dealership_id}/vehicles/{vehicle_id}/{uuid}.webp
 */
export function buildVehicleMediaKey({
  dealershipId,
  vehicleId,
  fileUuid,
  extension = "webp",
}: {
  dealershipId: string;
  vehicleId: string;
  fileUuid: string;
  extension?: string;
}): string {
  return `dealerships/${dealershipId}/vehicles/${vehicleId}/${fileUuid}.${extension}`;
}

/**
 * Generate a short-lived presigned upload URL for direct client-to-R2/S3 upload
 */
export async function createPresignedUploadUrl({
  key,
  contentType,
  maxSizeBytes = 15 * 1024 * 1024, // 15MB max
  expiresInSeconds = 120, // 2 minutes TTL
}: {
  key: string;
  contentType: string;
  maxSizeBytes?: number;
  expiresInSeconds?: number;
}): Promise<{ uploadUrl: string; key: string }> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: expiresInSeconds,
  });

  return { uploadUrl, key };
}
