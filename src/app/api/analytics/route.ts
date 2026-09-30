import { NextResponse } from "next/server";

import { getAnalyticsMode, getAnalyticsWebhookUrl } from "@/config/analytics";
import { analyticsEventSchema } from "@/features/analytics/model/analytics-event";

export async function POST(request: Request) {
  if (getAnalyticsMode() === "disabled") {
    return NextResponse.json(
      {
        accepted: false,
        message: "Analytics is disabled.",
      },
      { status: 404 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        accepted: false,
        message: "Invalid JSON payload.",
      },
      { status: 400 },
    );
  }

  const parsed = analyticsEventSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        accepted: false,
        message: "Invalid analytics event.",
      },
      { status: 400 },
    );
  }

  const webhook = getAnalyticsWebhookUrl();

  if (!webhook) {
    return NextResponse.json(
      {
        accepted: false,
        message: "Analytics transport is not configured.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        source: "mapiap-web",
        receivedAt: new Date().toISOString(),
        event: parsed.data,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          accepted: false,
          message: "Analytics transport failed.",
        },
        { status: 502 },
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch {
    return NextResponse.json(
      {
        accepted: false,
        message: "Analytics transport failed.",
      },
      { status: 502 },
    );
  }
}
