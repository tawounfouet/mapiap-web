import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { mainNavigation } from "@/content/navigation";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <SkipLink />
      <SiteHeader items={mainNavigation} />
      <main id="main-content">{children}</main>
      <SiteFooter items={mainNavigation} />
    </>
  );
}
