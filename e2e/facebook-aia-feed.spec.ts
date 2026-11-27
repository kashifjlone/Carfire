import { test, expect } from "@playwright/test";

test.describe("Facebook Automotive Inventory Ads (AIA) Catalog Feed", () => {
  test("serves valid XML feed on /api/feeds/facebook-aia.xml with ACL compliant prices", async ({ request }) => {
    const response = await request.get("/api/feeds/facebook-aia.xml");

    // 1. Verify HTTP Status and Content-Type
    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("application/xml");

    // 2. Parse XML body
    const body = await response.text();
    expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(body).toContain("<listings>");
    expect(body).toContain("<title>Peninsula Motor Group - Facebook Automotive Inventory Feed</title>");

    // 3. Verify vehicle items in feed
    expect(body).toContain("<vin>6T1AA11A11A111111</vin>");
    expect(body).toContain("<make>Toyota</make>");
    expect(body).toContain("<model>RAV4</model>");
    expect(body).toContain("<price>34990.00 AUD</price>");

    // 4. Verify draft vehicle is excluded
    expect(body).not.toContain("<vin>1FTFW1E84KFA12345</vin>");
    expect(body).not.toContain("Wildtrak");
  });

  test("displays Facebook Feed Card on Admin Inventory page and copies feed URL", async ({ page }) => {
    await page.goto("/admin/inventory");

    // 1. Verify Facebook Feed card is present
    await expect(page.locator("text=Automotive Inventory Ads (AIA) & Facebook Marketplace")).toBeVisible();
    await expect(page.locator("text=ACL s 48 Total Price Enforced")).toBeVisible();

    // 2. Click Copy Meta Feed URL button
    const copyBtn = page.locator("button:has-text('Copy Meta Feed URL')");
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    // 3. Verify confirmation toast/text
    await expect(page.locator("text=Copied Catalog URL!")).toBeVisible();

    // 4. Verify preview link points to feed
    const previewLink = page.locator("a:has-text('Preview XML Feed')");
    await expect(previewLink).toBeVisible();
    const href = await previewLink.getAttribute("href");
    expect(href).toBe("/api/feeds/facebook-aia.xml");
  });
});
