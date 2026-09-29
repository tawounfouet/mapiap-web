import { NextRequest, NextResponse } from "next/server";

import { PREVIEW_SESSION_COOKIE } from "@/lib/security/preview-session";

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL("/actualites", request.url),
  );

  response.cookies.set(PREVIEW_SESSION_COOKIE, "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });

  return response;
}
