import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateFacebookAiaXml } from "@/lib/feeds/facebook-aia";
import { SAMPLE_VEHICLES } from "@/lib/inventory/mock-data";

export async function GET(request: NextRequest) {
  const host = request.headers.get("x-tenant-host") || request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const siteUrl = `${protocol}://${host}`;

  const xmlContent = generateFacebookAiaXml({
    vehicles: SAMPLE_VEHICLES,
    siteUrl,
    dealershipName: "Peninsula Motor Group",
  });

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
