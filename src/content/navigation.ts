import type { NavigationItem } from "@/types/navigation";

export const mainNavigation = [
  {
    label: "Cabinet",
    href: "/cabinet",
  },
  {
    label: "Expertises",
    href: "/expertises",
  },
  {
    label: "Actualités",
    href: "/actualites",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const satisfies readonly NavigationItem[];
