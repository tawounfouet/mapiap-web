function readSecret(name: string): string | undefined {
  const value = process.env[name]?.trim();

  return value || undefined;
}

export function getEditorialPreviewSecret() {
  return readSecret("EDITORIAL_PREVIEW_SECRET");
}

export function getEditorialRevalidationSecret() {
  return readSecret("EDITORIAL_REVALIDATION_SECRET");
}
