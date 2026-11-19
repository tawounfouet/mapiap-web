import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { AnalyticsConsentBanner } from "@/components/analytics/analytics-consent";
import { AnalyticsRuntime } from "@/components/analytics/analytics-runtime";
import { getAnalyticsMode } from "@/config/analytics";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/seo/site-url";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const siteUrl = getSiteUrl();
const defaultDescription = "Site officiel de MAPIAP Audit & Conseils.";
const analyticsEnabled = getAnalyticsMode() === "consent";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: defaultDescription,
  applicationName: siteConfig.name,
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-32.png", sizes: "32x32" },
      { url: "/favicon/favicon-16.png", sizes: "16x16" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
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
    <html className={plusJakarta.variable} lang="fr">
      <body>
        <AnalyticsRuntime enabled={analyticsEnabled} />
        {children}
        <AnalyticsConsentBanner enabled={analyticsEnabled} />
      </body>
    </html>
  );
}
