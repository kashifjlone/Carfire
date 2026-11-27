import { test, expect } from "@playwright/test";

test.describe("Dealer Admin: CRM, Import & Billing", () => {
  test("loads CSV Stock Import screen with drag-and-drop zone", async ({ page }) => {
    await page.goto("/admin/import");

    await expect(page.locator("h1")).toContainText("Import Stock from CSV");
    await expect(page.locator("text=Auto-Column Mapping")).toBeVisible();
    await expect(page.locator("text=Photo Re-Hosting")).toBeVisible();
    await expect(page.locator("text=SSRF Safe Import")).toBeVisible();
    await expect(page.locator("text=Upload Your Dealership CSV")).toBeVisible();
  });

  test("loads Leads & CRM Kanban pipeline with 5 stages", async ({ page }) => {
    await page.goto("/admin/leads");

    await expect(page.locator("h1")).toContainText("Leads & CRM Pipeline");
    
    // Assert 5 pipeline columns
    await expect(page.locator("span.tracking-wider", { hasText: "New Enquiries" })).toBeVisible();
    await expect(page.locator("span.tracking-wider", { hasText: "Contacted" })).toBeVisible();
    await expect(page.locator("span.tracking-wider", { hasText: "Test Drive" })).toBeVisible();
    await expect(page.locator("span.tracking-wider", { hasText: "Negotiating" })).toBeVisible();
    await expect(page.locator("span.tracking-wider", { hasText: "Won / Sold" })).toBeVisible();

    // Assert lead cards
    await expect(page.locator("text=Daniel Morrison")).toBeVisible();
    await expect(page.getByText("WhatsApp Click", { exact: true })).toBeVisible();
  });

  test("loads Stripe Australia Billing with 10% GST Tax Invoices", async ({ page }) => {
    await page.goto("/admin/billing");

    await expect(page.locator("h1")).toContainText("Subscription & Australian Tax Invoices");
    await expect(page.locator("text=Current Active Plan")).toBeVisible();
    await expect(page.locator("text=Starter Plan").first()).toBeVisible();
    await expect(page.locator("text=$199/mo")).toBeVisible();

    // Verify Australian Tax Invoice compliance banner
    await expect(page.locator("text=Compliant Australian Tax Invoice")).toBeVisible();
    await expect(page.locator("text=Claim 10% input tax credit on your quarterly BAS")).toBeVisible();

    // Verify invoices table
    await expect(page.locator("text=INV-2026-003")).toBeVisible();
    await expect(page.locator("th:has-text('10% GST')")).toBeVisible();
    await expect(page.locator("text=$218.90").first()).toBeVisible();
  });
});
