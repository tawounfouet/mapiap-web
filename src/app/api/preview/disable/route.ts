import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  const response = NextResponse.redirect(new URL("/actualites", request.url));
  response.headers.set("cache-control", "no-store");

  return response;
}
