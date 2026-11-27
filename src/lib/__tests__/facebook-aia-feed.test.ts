import { describe, it, expect } from "vitest";
import { generateFacebookAiaXml } from "@/lib/feeds/facebook-aia";
import { SAMPLE_VEHICLES } from "@/lib/inventory/mock-data";

describe("Facebook Automotive Inventory Ads (AIA) XML Feed", () => {
  it("generates compliant XML feed with listings root element", () => {
    const xml = generateFacebookAiaXml({
      vehicles: SAMPLE_VEHICLES,
      siteUrl: "https://bayviewmotors.com.au",
      dealershipName: "Bayview Motors",
    });

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain("<listings>");
    expect(xml).toContain("</listings>");
    expect(xml).toContain("<title>Bayview Motors - Facebook Automotive Inventory Feed</title>");
  });

  it("includes published vehicles and formats ACL single drive-away price with AUD", () => {
    const xml = generateFacebookAiaXml({
      vehicles: SAMPLE_VEHICLES,
      siteUrl: "https://bayviewmotors.com.au",
      dealershipName: "Bayview Motors",
    });

    // Vehicle 1: 2021 Toyota RAV4 ($34,990)
    expect(xml).toContain("<vin>6T1AA11A11A111111</vin>");
    expect(xml).toContain("<make>Toyota</make>");
    expect(xml).toContain("<model>RAV4</model>");
    expect(xml).toContain("<year>2021</year>");
    expect(xml).toContain("<price>34990.00 AUD</price>");
    expect(xml).toContain("<body_style>SUV</body_style>");
    expect(xml).toContain("<url>https://bayviewmotors.com.au/vehicles/2021-toyota-rav4-gxl-s1042</url>");

    // Vehicle 2: 2020 Hyundai i30 ($21,990)
    expect(xml).toContain("<vin>KMHD1234567890123</vin>");
    expect(xml).toContain("<price>21990.00 AUD</price>");
  });

  it("strictly excludes draft and archived vehicles from the feed", () => {
    const xml = generateFacebookAiaXml({
      vehicles: SAMPLE_VEHICLES,
      siteUrl: "https://bayviewmotors.com.au",
      dealershipName: "Bayview Motors",
    });

    // Ford Ranger is in 'draft' status in SAMPLE_VEHICLES
    expect(xml).not.toContain("<vin>1FTFW1E84KFA12345</vin>");
    expect(xml).not.toContain("Wildtrak 4x4");
    expect(xml).not.toContain("42990.00 AUD");
  });

  it("escapes XML special characters in vehicle fields and descriptions", () => {
    const testVehicles = [
      {
        ...SAMPLE_VEHICLES[0],
        make: "Mercedes & Benz",
        public_description: 'Fast <SUV> with "Special" features & warranty',
      },
    ];

    const xml = generateFacebookAiaXml({
      vehicles: testVehicles,
      siteUrl: "https://test.com.au",
      dealershipName: "Rock & Roll Cars",
    });

    expect(xml).toContain("<make>Mercedes &amp; Benz</make>");
    expect(xml).toContain("Rock &amp; Roll Cars");
    expect(xml).toContain("&lt;SUV&gt;");
    expect(xml).toContain("&quot;Special&quot;");
    expect(xml).not.toContain("<SUV>");
  });
});
