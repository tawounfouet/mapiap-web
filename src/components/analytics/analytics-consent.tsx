"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  ANALYTICS_CONSENT_OPEN_EVENT,
  readAnalyticsConsent,
  subscribeAnalyticsConsent,
  writeAnalyticsConsent,
} from "@/features/analytics/client/consent";

export interface AnalyticsConsentBannerProps {
  enabled: boolean;
}

export function AnalyticsConsentBanner({
  enabled,
}: AnalyticsConsentBannerProps) {
  const consent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    readAnalyticsConsent,
    () => undefined,
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleOpenPreferences() {
      setPreferencesOpen(true);
    }

    window.addEventListener(
      ANALYTICS_CONSENT_OPEN_EVENT,
      handleOpenPreferences,
    );

    return () => {
      window.removeEventListener(
        ANALYTICS_CONSENT_OPEN_EVENT,
        handleOpenPreferences,
      );
    };
  }, [enabled]);

  const open = enabled && (consent === undefined || preferencesOpen);

  if (!open) {
    return null;
  }

  return (
    <aside
      aria-label="Préférences de mesure d’audience"
      className="border-border bg-background fixed inset-x-0 bottom-0 z-50 border-t shadow-lg"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <p className="font-medium">Mesure d’audience facultative</p>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            MAPIAP peut mesurer les pages consultées et les Web Vitals pour
            améliorer le site. Aucun événement analytique n’est envoyé avant
            votre accord.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={() => {
              writeAnalyticsConsent("declined");
              setPreferencesOpen(false);
            }}
            variant="secondary"
          >
            Refuser
          </Button>
          <Button
            onClick={() => {
              writeAnalyticsConsent("accepted");
              setPreferencesOpen(false);
            }}
          >
            Accepter
          </Button>
        </div>
      </div>
    </aside>
  );
}
