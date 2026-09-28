import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import type { NavigationItem } from "@/types/navigation";

export interface SiteHeaderProps {
  items: readonly NavigationItem[];
}

export function SiteHeader({ items }: SiteHeaderProps) {
  return (
    <header className="border-border bg-background relative z-40 border-b">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            aria-label="MAPIAP Audit & Conseils — Accueil"
            className="text-base tracking-wide"
            href="/"
            variant="navigation"
          >
            MAPIAP
          </Link>

          <SiteNavigation className="hidden md:block" items={items} />
          <MobileNavigation items={items} />
        </div>
      </Container>
    </header>
  );
}
