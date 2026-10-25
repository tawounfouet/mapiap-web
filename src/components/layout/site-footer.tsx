import Image from "next/image";

import { AnalyticsPreferencesButton } from "@/components/analytics/analytics-preferences-button";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { legalNavigation } from "@/content/navigation";
import type { NavigationItem } from "@/types/navigation";

export interface SiteFooterProps {
  items: readonly NavigationItem[];
  analyticsConsentEnabled?: boolean;
}

export function SiteFooter({
  items,
  analyticsConsentEnabled = false,
}: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-background border-t">
      <Container>
        <div className="grid gap-4 py-5 lg:grid-cols-[auto_1fr] lg:items-center">
          <Link
            aria-label="MAPIAP Audit & Conseils - Accueil"
            className="inline-block w-fit"
            href="/"
            variant="navigation"
          >
            <Image
              alt=""
              className="h-auto w-32"
              height={60}
              src="/brand/mapiap-horizontal-dark.svg"
              width={175}
            />
          </Link>

          <SiteNavigation
            ariaLabel="Navigation de pied de page"
            className="hidden lg:block lg:justify-self-end"
            items={items}
          />
        </div>

        <div className="border-border flex flex-col gap-2.5 border-t py-3 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Navigation légale">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link className="text-xs" href={item.href} variant="navigation">
                    {item.label}
                  </Link>
                </li>
              ))}
              {analyticsConsentEnabled ? (
                <li>
                  <AnalyticsPreferencesButton enabled />
                </li>
              ) : null}
            </ul>
          </nav>

          <Text className="shrink-0" size="sm" tone="muted">
            © {currentYear} MAPIAP Audit & Conseils.
          </Text>
        </div>
      </Container>
    </footer>
  );
}
