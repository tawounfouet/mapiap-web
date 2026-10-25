import { expect, test } from "@playwright/test";

const mobileViewports = [320, 390, 480] as const;

for (const width of mobileViewports) {
  test("mobile homepage remains usable at " + width + "px", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Transformer vos ambitions en résultats durables",
      }),
    ).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);

    const trigger = page.getByRole("button", { name: "Ouvrir le menu" });
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
}

test("mobile navigation preserves keyboard behavior", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const trigger = page.getByRole("button", { name: "Ouvrir le menu" });
  await trigger.click();

  const mobileNavigation = page.getByRole("navigation", {
    name: "Navigation mobile",
  });

  await expect(mobileNavigation).toBeVisible();
  await expect(
    mobileNavigation.getByRole("link", { name: "Accueil" }),
  ).toBeFocused();

  await page.keyboard.press("Escape");

  await expect(mobileNavigation).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Ouvrir le menu" }),
  ).toBeFocused();
});

for (const width of [768, 1024, 1440, 1536] as const) {
  test("homepage stays within the viewport at " + width + "px", async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
  });
}

test("desktop homepage exposes the skip link", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const skipLink = page.getByRole("link", {
    name: "Aller au contenu principal",
  });

  await expect(skipLink).toHaveAttribute("href", "#main-content");
  await expect(page.locator("#main-content")).toHaveAttribute("tabindex", "-1");
});
