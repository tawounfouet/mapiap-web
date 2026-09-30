import { expect, test } from "@playwright/test";

test("health endpoint reports the frontend as operational", async ({
  request,
}) => {
  const response = await request.get("/api/health");

  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toContain("no-store");
  await expect(response.json()).resolves.toEqual({
    status: "ok",
    service: "mapiap-web",
  });
});

test("public responses expose the baseline security headers", async ({
  request,
}) => {
  const response = await request.get("/");

  expect(response.status()).toBe(200);
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("DENY");
  expect(response.headers()["referrer-policy"]).toBe(
    "strict-origin-when-cross-origin",
  );
  expect(response.headers()["permissions-policy"]).toBe(
    "camera=(), microphone=(), geolocation=()",
  );
  expect(response.headers()["x-powered-by"]).toBeUndefined();
});
