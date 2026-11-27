import { test, expect } from "@playwright/test";

test.describe("Public Storefront & Buyer Journey", () => {
  test("loads storefront catalog with statutory licence and vehicles", async ({ page }) => {
    await page.goto("/storefront");

    // 1. Verify statutory dealer licence display
    await expect(page.locator("text=Licensed Motor Dealer:")).toBeVisible();
    await expect(page.locator("text=ACL Single Drive-Away Price Guaranteed")).toBeVisible();

    // 2. Verify catalog header & vehicle cards
    await expect(page.locator("h1")).toContainText("Our Quality Used Vehicles");
    const cards = page.locator("a[href^='/vehicles/']");
    await expect(cards).toHaveCount(3);

    // 3. Verify ACL s 48 Single Price Hero display
    const firstCard = cards.first();
    await expect(firstCard).toContainText("Drive Away");
    await expect(firstCard).toContainText("$34,990");
  });

  test("filters vehicles by body type", async ({ page }) => {
    await page.goto("/storefront");

    // Select SUV filter
    const bodyFilter = page.locator("select").nth(0);
    await bodyFilter.selectOption("suv");

    // URL should reflect query param
    await expect(page).toHaveURL(/body=suv/);
  });

  test("navigates to VDP and tests Finance Calculator & WhatsApp CTA", async ({ page }) => {
    await page.goto("/vehicles/2021-toyota-rav4-gxl-s1042");

    // 1. Vehicle Title & Specs
    await expect(page.locator("h1")).toContainText("2021 Toyota RAV4 GXL AWD");
    await expect(page.locator("text=VIN: 6T1AA11A11A111111")).toBeVisible();

    // 2. Statutory Badges
    await expect(page.locator("text=PPSR Search Verified")).toBeVisible();
    await expect(page.locator("text=Statutory Dealer Warranty")).toBeVisible();

    // 3. Single Drive Away Price
    await expect(page.locator("text=Total Drive Away Price")).toBeVisible();
    await expect(page.locator("text=$34,990")).toBeVisible();

    // 4. WhatsApp Click-to-Chat button
    const whatsappBtn = page.locator("a:has-text('Chat on WhatsApp')");
    await expect(whatsappBtn).toBeVisible();
    const href = await whatsappBtn.getAttribute("href");
    expect(href).toContain("https://wa.me/");
    expect(href).toContain("Toyota");
    expect(href).toContain("S1042");

    // 5. Finance Calculator Slider Interaction
    await expect(page.locator("text=Estimate Finance Repayments")).toBeVisible();
    await expect(page.locator("text=Indicative estimate only")).toBeVisible();

    // Toggle to Monthly frequency
    await page.locator("button:has-text('monthly')").click();
    await expect(page.locator("text=/monthly")).toBeVisible();
  });
});
