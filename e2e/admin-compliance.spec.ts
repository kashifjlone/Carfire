import { test, expect } from "@playwright/test";

test.describe("Dealer Admin: Statutory Compliance & Electronic Dealings Book", () => {
  test("loads compliance dashboard with KPIs and dealings register", async ({ page }) => {
    await page.goto("/admin/compliance");

    // 1. Verify Page Title & Header
    await expect(page.locator("h1")).toContainText("Statutory Compliance & Dealings Book");
    await expect(page.locator("text=Contemporaneous electronic motor car trader register")).toBeVisible();

    // 2. Verify KPI counts
    await expect(page.locator("text=Total Registered Lots")).toBeVisible();
    await expect(page.getByText("In Yard Stock", { exact: true })).toBeVisible();
    await expect(page.locator("text=Sold & Handed Over")).toBeVisible();

    // 3. Verify Dealings Register Table Rows
    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(4);
    await expect(rows.first()).toContainText("S-1042");
    await expect(rows.first()).toContainText("2021 Toyota RAV4");
    await expect(rows.first()).toContainText("$34,990");
  });

  test("filters dealings register by status and searches by stock number", async ({ page }) => {
    await page.goto("/admin/compliance");

    // Click "Sold" filter
    await page.locator("button:has-text('Sold (')").click();
    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText("S-1040");
    await expect(rows.first()).toContainText("David Michael Chen");

    // Click "In Stock" filter
    await page.locator("button:has-text('In Stock (')").click();
    await expect(page.locator("tbody tr")).toHaveCount(2);

    // Search for stock number
    await page.locator("input[placeholder*='Search VIN']").fill("S-1043");
    await expect(page.locator("tbody tr")).toHaveCount(1);
    await expect(page.locator("tbody tr").first()).toContainText("2020 Hyundai i30");
  });

  test("generates and previews official statutory buyer handover notice (NSW Form 1 & QLD Form 5)", async ({ page }) => {
    await page.goto("/admin/compliance");

    // Click "Generate Form" on the first vehicle (2021 Toyota RAV4)
    const firstRow = page.locator("tbody tr").first();
    await firstRow.locator("button:has-text('Generate Form')").click();

    // 1. Modal appears with NSW Form 1 by default
    await expect(page.locator("h3:has-text('Statutory Motor Dealer Buyer Notice')")).toBeVisible();
    await expect(page.locator("text=NSW Fair Trading • Form 1 Notice to Buyer")).toBeVisible();
    await expect(page.locator("text=Peninsula Motor Group Pty Ltd")).toBeVisible();
    await expect(page.locator("text=NSW MD #089123").first()).toBeVisible();

    // 2. Statutory Warranty calculation for 2021 model (age < 10, km < 160k)
    await expect(page.locator("text=3 months or 5,000 km")).toBeVisible();
    await expect(page.locator("text=Single Total Drive-Away Price")).toBeVisible();
    await expect(page.locator("text=$34,990").last()).toBeVisible();

    // 3. Switch to QLD in dropdown
    const stateSelect = page.locator("select").first();
    await stateSelect.selectOption("QLD");

    // 4. Assert QLD Form 5 Class A warranty
    await expect(page.locator("text=QLD Office of Fair Trading • Form 5 Statutory Warranty")).toBeVisible();
    await expect(page.locator("text=Class A Statutory Warranty")).toBeVisible();

    // 5. Close Modal
    await page.locator("button:has(svg.lucide-x)").click();
    await expect(page.locator("h3:has-text('Statutory Motor Dealer Buyer Notice')")).not.toBeVisible();
  });
});
