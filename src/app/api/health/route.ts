import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "mapiap-web",
    },
    {
      headers: {
        "cache-control": "no-store",
      },
    },
  );
}
