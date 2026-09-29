import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { NotFoundContent } from "@/components/sections/not-found-content";
import { mainNavigation } from "@/content/navigation";

export default function RootNotFound() {
  return (
    <>
      <SkipLink />
      <SiteHeader items={mainNavigation} />
      <main id="main-content" tabIndex={-1}>
        <NotFoundContent />
      </main>
      <SiteFooter items={mainNavigation} />
    </>
  );
}
