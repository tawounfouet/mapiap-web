export type ContentSource = "local" | "cms";

export interface CmsContentConfig {
  endpoint: URL;
  previewEndpoint?: URL;
  token?: string;
  previewToken?: string;
}

function parseOptionalHttpUrl(
  value: string | undefined,
  variableName: string,
): URL | undefined {
  const normalized = value?.trim();

  if (!normalized) {
    return undefined;
  }

  let parsed: URL;

  try {
    parsed = new URL(normalized);
  } catch {
    throw new Error(`${variableName} must be a valid absolute URL.`);
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(`${variableName} must use http or https.`);
  }

  return parsed;
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
  const endpoint = parseOptionalHttpUrl(
    process.env.CMS_CONTENT_API_URL,
    "CMS_CONTENT_API_URL",
  );

  if (!endpoint) {
    throw new Error(
      "CMS_CONTENT_API_URL is required when CONTENT_SOURCE is set to cms.",
    );
  }

  const previewEndpoint = parseOptionalHttpUrl(
    process.env.CMS_CONTENT_PREVIEW_API_URL,
    "CMS_CONTENT_PREVIEW_API_URL",
  );
  const token = process.env.CMS_CONTENT_API_TOKEN?.trim();
  const previewToken = process.env.CMS_CONTENT_PREVIEW_API_TOKEN?.trim();

  return {
    endpoint,
    previewEndpoint,
    token: token || undefined,
    previewToken: previewToken || undefined,
  };
}
