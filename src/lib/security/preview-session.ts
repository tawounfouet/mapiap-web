import { createHmac } from "node:crypto";

import { serverSecretMatches } from "@/lib/security/server-secret";

export const PREVIEW_SESSION_COOKIE = "mapiap_preview_session";

const previewSessionPayload = "mapiap-editorial-preview";

export function createPreviewSessionToken(secret: string) {
  return createHmac("sha256", secret)
    .update(previewSessionPayload)
    .digest("hex");
}

export function previewSessionIsValid(
  token: string | null | undefined,
  secret: string | null | undefined,
) {
  if (!secret) {
    return false;
  }

  return serverSecretMatches(token, createPreviewSessionToken(secret));
}
