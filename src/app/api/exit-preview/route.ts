import { NextResponse } from "next/server";
import { draftMode } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const redirect = url.searchParams.get("redirect") || "/zh";

  (await draftMode()).disable();

  // Only allow relative redirects to avoid open redirect issues
  const safeRedirect = redirect.startsWith("/") ? redirect : "/zh";
  return NextResponse.redirect(new URL(safeRedirect, url.origin), 307);
}
