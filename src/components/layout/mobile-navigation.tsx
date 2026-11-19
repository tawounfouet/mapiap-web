"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { isNavigationItemActive } from "@/lib/navigation/navigation-state";
import { cn } from "@/lib/utils/cn";
import type { NavigationItem } from "@/types/navigation";

export interface MobileNavigationProps {
  items: readonly NavigationItem[];
}

const triggerId = "mobile-navigation-trigger";
const navigationId = "mobile-navigation";

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) {
      return;
    }

    const firstLink = document.querySelector<HTMLAnchorElement>(
      `#${navigationId} a`,
    );

    firstLink?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById(triggerId)?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <Button
        aria-controls={navigationId}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="px-3"
        id={triggerId}
        onClick={() => setOpen((value) => !value)}
        size="md"
        variant="tertiary"
      >
        {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
      </Button>

      {open ? (
        <nav
          aria-label="Navigation mobile"
          className="border-border bg-background absolute inset-x-0 top-full border-y px-5 py-5 shadow-sm"
          id={navigationId}
        >
          <ul className="space-y-1">
            {items.map((item) => {
              const active = isNavigationItemActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block min-h-11 py-3",
                      active && "text-brand-teal font-semibold",
                    )}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    variant="navigation"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3">
              <Link
                className="bg-brand-teal hover:bg-brand-teal-dark min-h-11 w-full text-white hover:opacity-100"
                href="/contact"
                onClick={() => setOpen(false)}
                variant="button-primary"
              >
                Nous contacter
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
