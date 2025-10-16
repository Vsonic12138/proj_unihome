import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

const findBestLocale = (cookieLocale: string | undefined, header: string | null): Locale => {
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  if (header) {
    const locales = header
      .split(",")
      .map((part) => part.split(";")[0]?.trim().toLowerCase())
      .filter(Boolean) as string[];

    for (const locale of locales) {
      const base = locale.split("-")[0] as Locale;
      if (SUPPORTED_LOCALES.includes(base)) {
        return base;
      }
    }
  }

  return DEFAULT_LOCALE;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const localeSegment = segments[0];
  const looksLikeLocale =
    typeof localeSegment === "string" &&
    /^[a-z]{2}(?:-[a-z]{2})?$/i.test(localeSegment);

  if (SUPPORTED_LOCALES.includes(localeSegment as Locale)) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const acceptLanguage = request.headers.get("accept-language");
  const locale = findBestLocale(cookieLocale, acceptLanguage);

  const remainingSegments =
    localeSegment && looksLikeLocale ? segments.slice(1) : segments;
  const remainingPath =
    remainingSegments.length > 0 ? `/${remainingSegments.join("/")}` : "";
  const newPathname = `/${locale}${remainingPath}`;

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = newPathname;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
