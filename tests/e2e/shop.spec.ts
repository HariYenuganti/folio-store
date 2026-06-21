import { test, expect } from "@playwright/test";

test("browse a product, add to bag, and reach checkout", async ({ page }) => {
  await page.goto("/shop");
  await expect(
    page.getByRole("heading", { name: "All products" }),
  ).toBeVisible();

  // Open the first product (detail links are /shop/<slug>).
  await page.locator('a[href^="/shop/"]').first().click();
  await expect(page).toHaveURL(/\/shop\/.+/);

  // Pick a size, then add to bag.
  await page
    .getByRole("button", { name: /^(XS|S|M|L|XL|XXL)$/ })
    .first()
    .click();
  await page.getByRole("button", { name: /add to bag/i }).click();

  // Cart persists across navigation; the bag shows the line.
  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "Your bag" })).toBeVisible();

  // Proceed to checkout.
  await page.getByRole("link", { name: "Checkout" }).click();
  await expect(page).toHaveURL(/checkout/);
});

test("search returns matching products", async ({ page }) => {
  await page.goto("/shop?q=watch");
  await expect(page.getByRole("heading", { name: /watch/i })).toBeVisible();
  await expect(page.locator('a[href^="/shop/"]').first()).toBeVisible();
});
