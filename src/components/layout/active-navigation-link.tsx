"use client";

import { usePathname } from "next/navigation";

import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils/cn";
import { isNavigationItemActive } from "@/lib/navigation/navigation-state";
import type { NavigationItem } from "@/types/navigation";

export interface ActiveNavigationLinkProps {
  item: NavigationItem;
}

export function ActiveNavigationLink({ item }: ActiveNavigationLinkProps) {
  const pathname = usePathname();
  const active = isNavigationItemActive(pathname, item.href);

  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "border-b-2 border-transparent py-2",
        active && "border-brand-cyan text-brand-navy",
      )}
      href={item.href}
      variant="navigation"
    >
      {item.label}
    </Link>
  );
}
