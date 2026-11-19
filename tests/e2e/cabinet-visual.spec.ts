import { expect, test } from "@playwright/test";

// Reference viewports from LOT-18 visual qualification.
const baselines = [
  {
    name: "cabinet-mobile-390.png",
    viewport: { width: 390, height: 844 },
  },
  {
    name: "cabinet-desktop-1440.png",
    viewport: { width: 1440, height: 1100 },
  },
] as const;

test.describe("cabinet visual baselines", () => {
  test.skip(({ browserName }) => browserName !== "chromium");

  for (const baseline of baselines) {
    test(baseline.name, async ({ page }) => {
      await page.setViewportSize(baseline.viewport);
      await page.goto("/cabinet", { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        await document.fonts.ready;
      });

      // Reject stale production builds before updating a visual baseline.
      await expect(
        page.getByRole("heading", {
          name: "La proximité d’un cabinet, l’exigence des dossiers complexes",
        }),
      ).toBeVisible();
      await expect(
        page.getByText("Fort de plus de dix exercices d’expérience", {
          exact: false,
        }),
      ).toBeVisible();
      const staleCopy = page.getByText("À valider", { exact: false });
      await expect(staleCopy).toHaveCount(0);

      await expect(page).toHaveScreenshot(baseline.name, {
        animations: "disabled",
        caret: "hide",
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});
