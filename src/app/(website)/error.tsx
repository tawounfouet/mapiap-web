"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function WebsiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-6 lg:px-8">
      <Text
        className="mb-5 font-medium tracking-[0.18em] uppercase"
        size="sm"
        tone="muted"
      >
        Erreur
      </Text>
      <Heading as="h1" size="xl">
        Une erreur est survenue
      </Heading>
      <Text className="mt-5" size="lg" tone="muted">
        La page n’a pas pu être chargée correctement.
      </Text>
      <Button className="mt-8" onClick={reset}>
        Réessayer
      </Button>
    </div>
  );
}
