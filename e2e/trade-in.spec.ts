import { test, expect } from "@playwright/test";

test.describe("Storefront: Online Trade-In Appraisal & Valuation Widget", () => {
  test("completes 2-step trade-in valuation on VDP and verifies CRM lead generation", async ({ page }) => {
    // 1. Visit VDP
    await page.goto("/vehicles/2021-toyota-rav4-gxl-s1042");

    // 2. Scroll to Trade-In Widget
    await expect(page.locator("h2:has-text('Value Your Current Car & Lower Your Price')")).toBeVisible();
    await expect(page.locator("text=Instant Trade-In Valuation")).toBeVisible();

    // 3. Fill Step 1 Vehicle Details
    await page.locator("input[placeholder*='ABC12D']").fill("DLN882");
    await page.locator("input[placeholder*='Mazda, Toyota, Hyundai']").fill("Mazda");
    await page.locator("input[placeholder*='3, Corolla, i30']").fill("3");
    
    // Select condition "good"
    await page.locator("button:has-text('good')").click();

    // Click "Calculate Indicative Valuation"
    await page.locator("button:has-text('Calculate Indicative Valuation')").click();

    // 4. Verify Step 2 is shown with indicative valuation & changeover calculation
    await expect(page.locator("text=Your Indicative Trade-In Estimate:")).toBeVisible();
    await expect(page.locator("text=Estimated Changeover:")).toBeVisible();
    await expect(page.locator("text=For your 2018 Mazda 3")).toBeVisible();

    // 5. Fill Step 2 Contact Details
    await page.locator("input[placeholder*='Liam O\\'Connor']").fill("Liam O'Connor");
    await page.locator("input[placeholder*='0412 345 678']").fill("0412 345 678");
    await page.locator("input[placeholder*='liam@example.com.au']").fill("liam.oconnor@sydneycars.com.au");

    // Submit trade-in
    await page.locator("button:has-text('Submit for Guaranteed Valuation')").click();

    // 6. Verify Step 3 Success Screen
    await expect(page.locator("h3:has-text('Trade-In Appraisal Received!')")).toBeVisible();
    await expect(page.locator("text=Your trade-in valuation enquiry for your")).toBeVisible();
    await expect(page.locator("a:has-text('Fast-Track via WhatsApp')")).toBeVisible();

    // 7. Navigate to Dealer Admin Leads and verify lead ingestion
    await page.goto("/admin/leads");
    await expect(page.locator("h1")).toContainText("Leads & CRM Pipeline");
    await expect(page.locator("text=Liam O'Connor").first()).toBeVisible();
    await expect(page.locator("text=Trade-In Request").first()).toBeVisible();
    await expect(page.locator("text=Trade-In: 2018 Mazda 3").first()).toBeVisible();
  });
});
