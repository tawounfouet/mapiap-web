import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { ArticleSummary } from "@/types/content";

export interface ArticleCardProps {
  article: ArticleSummary;
  href: string;
}

export function ArticleCard({ article, href }: ArticleCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <Text
        className="mb-5 font-medium tracking-wide uppercase"
        size="sm"
        tone="muted"
      >
        Publication à valider
      </Text>

      <Heading as="h3" size="sm">
        {article.title}
      </Heading>

      <Text className="mt-4" tone="muted">
        {article.excerpt}
      </Text>

      <Link className="mt-8 gap-2" href={href} variant="standalone">
        Lire la publication
        <ArrowUpRight aria-hidden size={16} />
      </Link>
    </Card>
  );
}
