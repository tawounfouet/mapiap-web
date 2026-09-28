import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { ExpertiseSummary } from "@/types/content";

export interface ExpertiseCardProps {
  expertise: ExpertiseSummary;
}

export function ExpertiseCard({ expertise }: ExpertiseCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <Text className="mb-5 font-medium uppercase tracking-wide" size="sm" tone="muted">
        Contenu à valider
      </Text>

      <Heading as="h3" size="sm">
        {expertise.title}
      </Heading>

      <Text className="mt-4" tone="muted">
        {expertise.shortDescription}
      </Text>

      <Link className="mt-8 gap-2" href="/expertises" variant="standalone">
        Voir les expertises
        <ArrowUpRight aria-hidden size={16} />
      </Link>
    </Card>
  );
}
