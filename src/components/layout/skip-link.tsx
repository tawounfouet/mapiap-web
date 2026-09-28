import { Link } from "@/components/ui/link";

export function SkipLink() {
  return (
    <Link
      className="bg-foreground text-background fixed top-4 left-4 z-50 -translate-y-24 rounded-md px-4 py-2 text-sm font-medium no-underline transition-transform focus:translate-y-0"
      href="#main-content"
      variant="navigation"
    >
      Aller au contenu principal
    </Link>
  );
}
