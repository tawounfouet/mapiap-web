import { afterEach, describe, expect, it } from "vitest";

import {
  getEditorialPreviewSecret,
  getEditorialRevalidationSecret,
} from "./editorial";

const originalPreviewSecret = process.env.EDITORIAL_PREVIEW_SECRET;
const originalRevalidationSecret = process.env.EDITORIAL_REVALIDATION_SECRET;

afterEach(() => {
  if (originalPreviewSecret === undefined) {
    delete process.env.EDITORIAL_PREVIEW_SECRET;
  } else {
    process.env.EDITORIAL_PREVIEW_SECRET = originalPreviewSecret;
  }

  if (originalRevalidationSecret === undefined) {
    delete process.env.EDITORIAL_REVALIDATION_SECRET;
  } else {
    process.env.EDITORIAL_REVALIDATION_SECRET = originalRevalidationSecret;
  }
});

describe("editorial secrets", () => {
  it("returns undefined when preview is not configured", () => {
    delete process.env.EDITORIAL_PREVIEW_SECRET;

    expect(getEditorialPreviewSecret()).toBeUndefined();
  });

  it("returns trimmed configured secrets", () => {
    process.env.EDITORIAL_PREVIEW_SECRET = " preview-secret ";
    process.env.EDITORIAL_REVALIDATION_SECRET = " revalidation-secret ";

    expect(getEditorialPreviewSecret()).toBe("preview-secret");
    expect(getEditorialRevalidationSecret()).toBe("revalidation-secret");
  });
});
