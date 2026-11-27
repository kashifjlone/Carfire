import { test, expect } from "@playwright/test";

test.describe("Dealer Admin: Custom Domain & DNS Engine", () => {
  test("loads domains page with active primary domain and DNS instructions", async ({ page }) => {
    await page.goto("/admin/domains");

    // 1. Verify Page Title & Header
    await expect(page.locator("h1")).toContainText("Custom Domains & Edge Routing");
    await expect(page.locator("text=Dealership Domains")).toBeVisible();

    // 2. Verify Primary Storefront Domain
    await expect(page.locator("text=sydney-prestige.platform.com.au").first()).toBeVisible();
    await expect(page.locator("text=Primary Storefront").first()).toBeVisible();
    await expect(page.locator("text=Active").first()).toBeVisible();

    // 3. Verify DNS Records table
    await expect(page.locator("text=CNAME Routing Record").first()).toBeVisible();
    await expect(page.locator("text=cname.yardflow.com.au").first()).toBeVisible();
    await expect(page.locator("text=TXT Ownership Challenge").first()).toBeVisible();
  });

  test("connects a new custom domain, performs DNS verification, and cleans up", async ({ page }) => {
    await page.goto("/admin/domains");

    // Click "Connect Custom Domain" button
    await page.locator("button:has-text('Connect Custom Domain')").click();

    // Modal should be visible
    await expect(page.locator("h3:has-text('Connect Your Dealership Domain')")).toBeVisible();

    // Fill in domain
    const testHost = "parramatta-usedcars.com.au";
    await page.locator("input[placeholder*='bayviewmotors.com.au']").fill(testHost);

    // Submit
    await page.locator("button:has-text('Add Domain & Generate DNS')").click();

    // Assert new domain card appears
    await expect(page.locator(`text=${testHost}`).first()).toBeVisible();
    await expect(page.locator("text=pending dns").first()).toBeVisible();

    // Click "Verify DNS Now" on the newly added domain
    const verifyBtn = page.locator("button:has-text('Verify DNS Now')").first();
    await verifyBtn.click();

    // Verify it transitioned to Active
    await expect(page.locator("text=pending dns")).toHaveCount(0);
    await expect(page.locator("text=active")).toHaveCount(3);

    // Disconnect the newly added domain
    page.on("dialog", (dialog) => dialog.accept());
    const deleteBtn = page.locator("button[title='Disconnect domain']").last();
    await deleteBtn.click();

    // Verify domain is removed
    await expect(page.locator(`text=${testHost}`)).toHaveCount(0);
  });
});
