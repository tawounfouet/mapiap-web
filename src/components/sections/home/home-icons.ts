import {
  BarChart3,
  Cog,
  Diamond,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";

import type { HomeIconKey } from "@/types/content";

export const homeIcons: Record<HomeIconKey, LucideIcon> = {
  "bar-chart": BarChart3,
  lightbulb: Lightbulb,
  target: Target,
  "shield-check": ShieldCheck,
  diamond: Diamond,
  cog: Cog,
  leaf: Leaf,
};
