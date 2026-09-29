export type ContentSource = "local" | "cms";

export interface CmsContentConfig {
  endpoint: URL;
  token?: string;
}

export function getContentSource(): ContentSource {
  const configuredSource = process.env.CONTENT_SOURCE?.trim() || "local";

  if (configuredSource === "local" || configuredSource === "cms") {
    return configuredSource;
  }

  throw new Error(
    `Unsupported CONTENT_SOURCE "${configuredSource}". Expected "local" or "cms".`,
  );
}

export function getCmsContentConfig(): CmsContentConfig {
  const endpointValue = process.env.CMS_CONTENT_API_URL?.trim();

  if (!endpointValue) {
    throw new Error(
      "CMS_CONTENT_API_URL is required when CONTENT_SOURCE is set to cms.",
    );
  }

  let endpoint: URL;

  try {
    endpoint = new URL(endpointValue);
  } catch {
    throw new Error("CMS_CONTENT_API_URL must be a valid absolute URL.");
  }

  if (endpoint.protocol !== "https:" && endpoint.protocol !== "http:") {
    throw new Error("CMS_CONTENT_API_URL must use http or https.");
  }

  const token = process.env.CMS_CONTENT_API_TOKEN?.trim();

  return {
    endpoint,
    token: token || undefined,
  };
}
