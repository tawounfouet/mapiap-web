import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { getAnalyticsMode } from "@/config/analytics";
import { mainNavigation } from "@/content/navigation";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const analyticsEnabled = getAnalyticsMode() === "consent";

  return (
    <>
      <SkipLink />
      <SiteHeader items={mainNavigation} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter
        analyticsConsentEnabled={analyticsEnabled}
        items={mainNavigation}
      />
    </>
  );
}
