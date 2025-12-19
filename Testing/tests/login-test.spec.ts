import { expect, test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demoziraat.netlify.app/");
  await page.getByRole("textbox", { name: "Phone number" }).click();
  await page.getByRole("tab", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("test@ziraat.com");
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("Test@123");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .locator("form")
    .getByRole("button")
    .filter({ hasText: /^$/ })
    .click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
});

test("User lands on Login page login should be visible", async ({ page }) => {
  await page.goto("https://demoziraat.netlify.app/");

  await expect(page.getByRole("button", { name: "Continue" })).toBeHidden();
});
