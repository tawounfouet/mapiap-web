export type AnalyticsConsent = "accepted" | "declined";

export const ANALYTICS_CONSENT_STORAGE_KEY = "mapiap.analytics-consent.v1";
export const ANALYTICS_CONSENT_CHANGED_EVENT =
  "mapiap:analytics-consent-changed";
export const ANALYTICS_CONSENT_OPEN_EVENT = "mapiap:analytics-consent-open";

export function readAnalyticsConsent(): AnalyticsConsent | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const value = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);

  if (value === "accepted" || value === "declined") {
    return value;
  }

  return undefined;
}

export function subscribeAnalyticsConsent(callback: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === ANALYTICS_CONSENT_STORAGE_KEY) {
      callback();
    }
  }

  window.addEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

export function writeAnalyticsConsent(value: AnalyticsConsent) {
  window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(
    new CustomEvent<AnalyticsConsent>(ANALYTICS_CONSENT_CHANGED_EVENT, {
      detail: value,
    }),
  );
}

export function openAnalyticsConsentPreferences() {
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_OPEN_EVENT));
}

export function hasAnalyticsConsent() {
  return readAnalyticsConsent() === "accepted";
}
