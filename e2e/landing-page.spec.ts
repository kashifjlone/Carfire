import { test, expect } from "@playwright/test";

test.describe("SaaS Marketing Landing Page & Live Demo Funnel", () => {
  test("loads landing page with hero, value props and trust signals", async ({ page }) => {
    await page.goto("/");

    // 1. Verify Demo top bar
    await expect(page.locator("aside", { hasText: "Live Interactive Demo Available" })).toBeVisible();
    await expect(page.locator("a:has-text('Storefront (Buyer View)')")).toBeVisible();
    await expect(page.locator("a:has-text('Dealer Admin Portal')").first()).toBeVisible();

    // 2. Verify Hero Header
    await expect(page.locator("h1")).toContainText("Sell More Used Cars Online");
    await expect(page.locator("text=Built Specially for Independent Australian Used-Car Dealers")).toBeVisible();
    await expect(page.locator("text=ACL s 48 Compliant")).toBeVisible();

    // 3. Verify Competitor Comparison Table
    await expect(page.locator("h3:has-text('Why dealers are switching to YardFlow')")).toBeVisible();
    await expect(page.locator("text=EasyCars / Virtual Yard")).toBeVisible();
    await expect(page.locator("text=Next.js 15 App Router").first()).toBeVisible();

    // 4. Verify Pricing Section
    await expect(page.locator("h3:has-text('Simple flat plans. No hidden lead fees.')")).toBeVisible();
    await expect(page.locator("text=Starter Plan").first()).toBeVisible();
    await expect(page.locator("text=Growth Plan").first()).toBeVisible();
    await expect(page.locator("text=Scale Plan").first()).toBeVisible();
  });

  test("interacts with FAQ accordion", async ({ page }) => {
    await page.goto("/");

    // FAQ 1 is open by default
    await expect(page.locator("text=Can I import my existing car stock from EasyCars, Virtual Yard, or Excel?")).toBeVisible();
    await expect(page.locator("text=intelligent CSV Stock & Photo Migration Engine")).toBeVisible();

    // Click FAQ 2 to expand
    const faq2Btn = page.locator("button:has-text('How does the ACL s 48 Single Drive-Away Price compliance work?')");
    await faq2Btn.click();
    await expect(page.locator("text=Australian Consumer Law section 48 strictly prohibits")).toBeVisible();
  });

  test("opens trial signup modal, submits cardless trial and shows next steps", async ({ page }) => {
    await page.goto("/");

    // Click "Start 14-Day Free Cardless Trial" button in hero
    await page.locator("button:has-text('Start 14-Day Free Cardless Trial')").click();

    // Modal should be visible
    await expect(page.locator("h2:has-text('Start Your Dealership Free Trial')")).toBeVisible();
    await expect(page.locator("text=14-Day Free Trial • No Credit Card Required")).toBeVisible();

    // Fill the trial form
    await page.locator("input[placeholder*='Parramatta Motor Group']").fill("Brisbane Prestige Cars");
    await page.locator("input[placeholder*='Craig Evans']").fill("Mitchell Ross");
    await page.locator("input[placeholder*='craig@dealership.com.au']").fill("mitchell@brisbaneprestige.com.au");
    await page.locator("input[placeholder*='0412 345 678']").fill("0488 123 456");

    // Submit form
    await page.locator("button[type='submit']:has-text('Start 14-Day Free Trial')").click();

    // Assert success screen
    await expect(page.locator("h3:has-text('Welcome Aboard, Brisbane Prestige Cars!')")).toBeVisible();
    await expect(page.locator("a:has-text('Launch Dealership Admin')")).toBeVisible();
    await expect(page.locator("a:has-text('Preview Public Storefront')")).toBeVisible();
  });
});
