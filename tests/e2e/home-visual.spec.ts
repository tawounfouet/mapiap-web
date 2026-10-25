import { expect, test } from "@playwright/test";

const baselines = [
  {
    name: "homepage-mobile-320.png",
    viewport: { width: 320, height: 800 },
  },
  {
    name: "homepage-mobile-390.png",
    viewport: { width: 390, height: 844 },
  },
  {
    name: "homepage-mobile-480.png",
    viewport: { width: 480, height: 900 },
  },
  {
    name: "homepage-tablet-768.png",
    viewport: { width: 768, height: 1024 },
  },
  {
    name: "homepage-desktop-1024.png",
    viewport: { width: 1024, height: 900 },
  },
  {
    name: "homepage-desktop-1440.png",
    viewport: { width: 1440, height: 1100 },
  },
  {
    name: "homepage-desktop-1536.png",
    viewport: { width: 1536, height: 1100 },
  },
] as const;

test.describe("homepage visual baselines", () => {
  test.skip(({ browserName }) => browserName !== "chromium");

  for (const baseline of baselines) {
    test(baseline.name, async ({ page }) => {
      await page.setViewportSize(baseline.viewport);
      await page.goto("/", { waitUntil: "networkidle" });
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
