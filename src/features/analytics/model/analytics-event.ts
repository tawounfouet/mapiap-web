import { z } from "zod";

const pathSchema = z.string().min(1).max(2048).regex(/^\//);

const baseEventSchema = z.object({
  path: pathSchema,
  timestamp: z.string().datetime(),
});

const pageViewEventSchema = baseEventSchema.extend({
  type: z.literal("page_view"),
});

const webVitalEventSchema = baseEventSchema.extend({
  type: z.literal("web_vital"),
  metric: z.object({
    id: z.string().min(1).max(200),
    name: z.string().min(1).max(80),
    value: z.number().finite(),
    delta: z.number().finite(),
    rating: z.enum(["good", "needs-improvement", "poor"]).optional(),
  }),
});

export const analyticsEventSchema = z.discriminatedUnion("type", [
  pageViewEventSchema,
  webVitalEventSchema,
]);

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;
