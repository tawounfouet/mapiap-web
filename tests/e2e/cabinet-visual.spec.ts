import { expect, test } from "@playwright/test";

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

      await expect(page).toHaveScreenshot(baseline.name, {
        animations: "disabled",
        caret: "hide",
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});
