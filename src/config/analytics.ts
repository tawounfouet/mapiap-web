export type AnalyticsMode = "disabled" | "consent";

export function getAnalyticsMode(): AnalyticsMode {
  const configuredMode = process.env.ANALYTICS_MODE?.trim() || "disabled";

  if (configuredMode === "disabled" || configuredMode === "consent") {
    return configuredMode;
  }

  throw new Error(
    `Unsupported ANALYTICS_MODE "${configuredMode}". Expected "disabled" or "consent".`,
  );
}

export function getAnalyticsWebhookUrl(): URL | undefined {
  const configuredUrl = process.env.ANALYTICS_WEBHOOK_URL?.trim();

  if (!configuredUrl) {
    return undefined;
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(configuredUrl);
  } catch {
    throw new Error("ANALYTICS_WEBHOOK_URL must be a valid absolute URL.");
  }

  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
    throw new Error("ANALYTICS_WEBHOOK_URL must use http or https.");
  }

  return parsedUrl;
}
