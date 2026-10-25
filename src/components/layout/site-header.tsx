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
    <header className="border-border bg-background/95 sticky top-0 z-40 border-b backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between gap-5">
          <Link
            aria-label="MAPIAP Audit & Conseils - Accueil"
            className="shrink-0"
            href="/"
            variant="navigation"
          >
            <Image
              alt=""
              className="h-auto w-36 sm:w-44"
              height={60}
              priority
              src="/brand/mapiap-horizontal-dark.svg"
              width={175}
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <SiteNavigation items={items} />
            <Link
              className="bg-brand-teal hover:bg-brand-teal-dark gap-2 px-5 text-white hover:opacity-100"
              href="/contact"
              variant="button-primary"
            >
              Nous contacter
              <ArrowRight aria-hidden size={16} />
            </Link>
          </div>
          <MobileNavigation items={items} />
        </div>
      </Container>
    </header>
  );
}
import { ArrowRight } from "lucide-react";
import Image from "next/image";
