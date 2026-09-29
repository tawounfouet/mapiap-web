import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { ExpertiseSummary } from "@/types/content";

export interface ExpertiseCardProps {
  expertise: ExpertiseSummary;
  href?: string;
  linkLabel?: string;
}

export function ExpertiseCard({
  expertise,
  href,
  linkLabel = "En savoir plus",
}: ExpertiseCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <Text
        className="mb-5 font-medium tracking-wide uppercase"
        size="sm"
        tone="muted"
      >
        Contenu à valider
      </Text>

      <Heading as="h3" size="sm">
        {expertise.title}
      </Heading>

      <Text className="mt-4" tone="muted">
        {expertise.shortDescription}
      </Text>

      {href ? (
        <Link className="mt-8 gap-2" href={href} variant="standalone">
          {linkLabel}
          <ArrowUpRight aria-hidden size={16} />
        </Link>
      ) : null}
    </Card>
  );
}
