import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AnalyticsConsentBanner } from "@/components/analytics/analytics-consent";
import { AnalyticsRuntime } from "@/components/analytics/analytics-runtime";
import { getAnalyticsMode } from "@/config/analytics";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/seo/site-url";

import "./globals.css";

const siteUrl = getSiteUrl();
const defaultDescription = "Site officiel de MAPIAP Audit & Conseils.";
const analyticsEnabled = getAnalyticsMode() === "consent";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  applicationName: siteConfig.name,
  robots: siteUrl
    ? {
        index: true,
        follow: true,
      }
    : {
        index: false,
        follow: false,
      },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: defaultDescription,
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AnalyticsRuntime enabled={analyticsEnabled} />
        {children}
        <AnalyticsConsentBanner enabled={analyticsEnabled} />
      </body>
    </html>
  );
}
