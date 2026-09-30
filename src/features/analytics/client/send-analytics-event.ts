import type { AnalyticsEvent } from "@/features/analytics/model/analytics-event";

export function sendAnalyticsEvent(event: AnalyticsEvent) {
  const body = JSON.stringify(event);

  if (typeof navigator.sendBeacon === "function") {
    const payload = new Blob([body], {
      type: "application/json",
    });

    if (navigator.sendBeacon("/api/analytics", payload)) {
      return;
    }
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
    keepalive: true,
  });
}
