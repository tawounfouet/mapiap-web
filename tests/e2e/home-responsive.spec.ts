import { expect, test } from "@playwright/test";

test("mobile homepage remains usable without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Expertise. Innovation. Performance.",
    }),
  ).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);

  const trigger = page.getByRole("button", { name: "Ouvrir le menu" });

  await trigger.click();

  const mobileNavigation = page.getByRole("navigation", {
    name: "Navigation mobile",
  });

  await expect(mobileNavigation).toBeVisible();
  await expect(
    mobileNavigation.getByRole("link", { name: "Cabinet" }),
  ).toBeFocused();

  await page.keyboard.press("Escape");

  await expect(mobileNavigation).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Ouvrir le menu" }),
  ).toBeFocused();
});

test("desktop homepage exposes the skip link and stays within the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const skipLink = page.getByRole("link", {
    name: "Aller au contenu principal",
  });

  await expect(skipLink).toHaveAttribute("href", "#main-content");
  await expect(page.locator("#main-content")).toHaveAttribute("tabindex", "-1");

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
});
