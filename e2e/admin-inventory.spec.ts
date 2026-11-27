import { test, expect } from "@playwright/test";

test.describe("Dealer Admin: Inventory & Stock Management", () => {
  test("loads inventory table with KPI stats", async ({ page }) => {
    await page.goto("/admin/inventory");

    // 1. Verify Page Title & KPIs
    await expect(page.locator("h1")).toContainText("Stock Inventory");
    await expect(page.locator("text=Total Vehicles")).toBeVisible();
    await expect(page.locator("text=Live on Storefront")).toBeVisible();

    // 2. Table rows
    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(3);
    await expect(rows.first()).toContainText("2021 Toyota RAV4");
    await expect(rows.first()).toContainText("$34,990");
    await expect(rows.first()).toContainText("published");
  });

  test("opens Add Vehicle modal and enforces ACL single price rule", async ({ page }) => {
    await page.goto("/admin/inventory");

    // Click Add Vehicle button
    await page.locator("button:has-text('Add Vehicle')").click();

    // Verify modal appears
    await expect(page.locator("h2:has-text('Add Vehicle to Inventory')")).toBeVisible();

    // Check ACL Single Price banner
    await expect(page.locator("text=Advertised Pricing (ACL s 48 Single Price Rule)")).toBeVisible();
    await expect(page.locator("text=Internal Financials (Private — Owner/Manager Only)")).toBeVisible();

    // Close modal
    await page.locator("button:has-text('Cancel')").click();
    await expect(page.locator("h2:has-text('Add Vehicle to Inventory')")).not.toBeVisible();
  });

  test("toggles vehicle publication status", async ({ page }) => {
    await page.goto("/admin/inventory");

    // Find the toggle button on row 1
    const firstRow = page.locator("tbody tr").first();
    const toggleBtn = firstRow.locator("button[title='Unpublish']");
    await expect(toggleBtn).toBeVisible();

    // Click to toggle to draft
    await toggleBtn.click();
    await expect(firstRow).toContainText("draft");
  });
});
