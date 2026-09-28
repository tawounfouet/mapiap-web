import { SiteNavigation } from "@/components/layout/site-navigation";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { NavigationItem } from "@/types/navigation";

export interface SiteFooterProps {
  items: readonly NavigationItem[];
}

export function SiteFooter({ items }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface-muted border-t">
      <Container>
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Link
              aria-label="MAPIAP Audit & Conseils — Accueil"
              className="text-base tracking-wide"
              href="/"
              variant="navigation"
            >
              MAPIAP
            </Link>
            <Text size="sm" tone="muted">
              Audit & Conseils
            </Text>
          </div>

          <div className="space-y-4">
            <SiteNavigation
              ariaLabel="Navigation de pied de page"
              items={items}
            />
            <Text size="sm" tone="muted">
              © {currentYear} MAPIAP Audit & Conseils.
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  );
}
