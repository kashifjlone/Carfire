import type { Vehicle } from "@/lib/types/inventory";

function escapeXml(unsafe: string | null | undefined): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generates compliant Facebook Automotive Inventory Ads (AIA) XML Feed
 * Follows Meta Commerce Manager Automotive Catalog specification.
 * Pricing complies strictly with Australian Consumer Law (ACL s 48) Single Price.
 */
export function generateFacebookAiaXml(params: {
  vehicles: Vehicle[];
  siteUrl: string;
  dealershipName: string;
}): string {
  const { vehicles, siteUrl, dealershipName } = params;
  const baseUrl = siteUrl.replace(/\/$/, "");

  // Filter only published and available vehicles
  const feedVehicles = vehicles.filter(
    (v) => v.publication_status === "published" && (v.availability === "in_stock" || v.availability === "under_offer")
  );

  const listingsXml = feedVehicles
    .map((v) => {
      const priceAud = (v.total_price_cents / 100).toFixed(2);
      const vehicleUrl = `${baseUrl}/vehicles/${v.slug}`;
      const title = `${v.year} ${v.make} ${v.model} ${v.variant || ""}`.trim();
      const coverImage = v.cover_image_key
        ? `${process.env.R2_PUBLIC_DOMAIN || "https://media.platform.com.au"}/${v.cover_image_key}`
        : `${baseUrl}/images/placeholder-car.webp`;

      return `    <listing>
      <vehicle_id>${escapeXml(v.stock_number || v.vin)}</vehicle_id>
      <vin>${escapeXml(v.vin)}</vin>
      <title>${escapeXml(title)}</title>
      <description>${escapeXml(v.public_description || `${title} available for immediate delivery at ${dealershipName}. Fully inspected with statutory warranty.`)}</description>
      <url>${escapeXml(vehicleUrl)}</url>
      <make>${escapeXml(v.make)}</make>
      <model>${escapeXml(v.model)}</model>
      <year>${v.year}</year>
      <body_style>${escapeXml(v.body_type.toUpperCase())}</body_style>
      <mileage>
        <value>${v.odometer_km}</value>
        <unit>KM</unit>
      </mileage>
      <price>${priceAud} AUD</price>
      <transmission>${escapeXml(v.transmission.toUpperCase())}</transmission>
      <image>
        <url>${escapeXml(coverImage)}</url>
      </image>
      <state_of_vehicle>USED</state_of_vehicle>
      <availability>${v.availability === "in_stock" ? "IN_STOCK" : "PENDING"}</availability>
      <fuel_type>${escapeXml(v.fuel_type.toUpperCase())}</fuel_type>
      <address format="simple">
        <country>AU</country>
      </address>
    </listing>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<listings>
  <title>${escapeXml(dealershipName)} - Facebook Automotive Inventory Feed</title>
  <link rel="self" href="${escapeXml(`${baseUrl}/api/feeds/facebook-aia.xml`)}"/>
${listingsXml}
</listings>`;
}
