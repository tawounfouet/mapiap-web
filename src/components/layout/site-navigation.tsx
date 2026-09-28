import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils/cn";
import type { NavigationItem } from "@/types/navigation";

export interface SiteNavigationProps {
  items: readonly NavigationItem[];
  ariaLabel?: string;
  className?: string;
}

export function SiteNavigation({
  items,
  ariaLabel = "Navigation principale",
  className,
}: SiteNavigationProps) {
  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} variant="navigation">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
