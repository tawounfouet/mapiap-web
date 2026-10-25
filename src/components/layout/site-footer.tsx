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
        <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              aria-label="MAPIAP Audit & Conseils - Accueil"
              className="inline-block"
              href="/"
              variant="navigation"
            >
              <Image
                alt=""
                className="h-auto w-36"
                height={60}
                src="/brand/mapiap-horizontal-dark.svg"
                width={175}
              />
            </Link>
          </div>

          <div className="space-y-4 lg:text-right">
            <SiteNavigation
              ariaLabel="Navigation de pied de page"
              items={items}
            />

            <nav aria-label="Navigation légale">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {legalNavigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} variant="navigation">
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

            <Text size="sm" tone="muted">
              © {currentYear} MAPIAP Audit & Conseils.
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  );
}
import Image from "next/image";
