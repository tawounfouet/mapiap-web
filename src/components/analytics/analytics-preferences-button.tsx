"use client";

import { Button } from "@/components/ui/button";
import { openAnalyticsConsentPreferences } from "@/features/analytics/client/consent";

export interface AnalyticsPreferencesButtonProps {
  enabled: boolean;
}

export function AnalyticsPreferencesButton({
  enabled,
}: AnalyticsPreferencesButtonProps) {
  if (!enabled) {
    return null;
  }

  return (
    <Button
      className="h-auto p-0 text-left text-sm"
      onClick={openAnalyticsConsentPreferences}
      size="sm"
      variant="tertiary"
    >
      Gérer les préférences
    </Button>
  );
}
