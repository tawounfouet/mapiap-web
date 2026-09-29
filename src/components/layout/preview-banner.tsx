import { Link } from "@/components/ui/link";

export function PreviewBanner() {
  return (
    <aside
      aria-label="Mode aperçu éditorial"
      className="border-border bg-surface-muted border-b"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          <strong>Mode aperçu.</strong> Ce contenu peut être non publié.
        </p>
        <Link href="/api/preview/disable" prefetch={false} variant="standalone">
          Quitter l’aperçu
        </Link>
      </div>
    </aside>
  );
}
