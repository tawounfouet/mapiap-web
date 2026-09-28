"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import type { NavigationItem } from "@/types/navigation";

export interface MobileNavigationProps {
  items: readonly NavigationItem[];
}

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="px-2"
        onClick={() => setOpen((value) => !value)}
        size="sm"
        variant="tertiary"
      >
        {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
      </Button>

      {open ? (
        <nav
          aria-label="Navigation mobile"
          className="border-border bg-background absolute inset-x-0 top-full border-y px-5 py-5 shadow-sm"
          id="mobile-navigation"
        >
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  className="block py-3"
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variant="navigation"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
