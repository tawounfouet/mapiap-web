"use client";

import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { useCallback, useEffect } from "react";

import {
  ANALYTICS_CONSENT_CHANGED_EVENT,
  hasAnalyticsConsent,
  type AnalyticsConsent,
} from "@/features/analytics/client/consent";
import { sendAnalyticsEvent } from "@/features/analytics/client/send-analytics-event";

export interface AnalyticsRuntimeProps {
  enabled: boolean;
}

export function AnalyticsRuntime({ enabled }: AnalyticsRuntimeProps) {
  const pathname = usePathname();

  const reportWebVital = useCallback(
    (metric: Parameters<typeof useReportWebVitals>[0] extends (
      metric: infer Metric,
    ) => void
      ? Metric
      : never) => {
      if (!enabled || !hasAnalyticsConsent()) {
        return;
      }

      sendAnalyticsEvent({
        type: "web_vital",
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
        metric: {
          id: metric.id,
          name: metric.name,
          value: metric.value,
          delta: metric.delta,
          rating: metric.rating,
        },
      });
    },
    [enabled],
  );

  useReportWebVitals(reportWebVital);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    function trackPageView() {
      if (!hasAnalyticsConsent()) {
        return;
      }

      sendAnalyticsEvent({
        type: "page_view",
        path: pathname,
        timestamp: new Date().toISOString(),
      });
    }

    trackPageView();

    function handleConsentChange(event: Event) {
      const consent = (event as CustomEvent<AnalyticsConsent>).detail;

      if (consent === "accepted") {
        trackPageView();
      }
    }

    window.addEventListener(
      ANALYTICS_CONSENT_CHANGED_EVENT,
      handleConsentChange,
    );

    return () => {
      window.removeEventListener(
        ANALYTICS_CONSENT_CHANGED_EVENT,
        handleConsentChange,
      );
    };
  }, [enabled, pathname]);

  return null;
}
