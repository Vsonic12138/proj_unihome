import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale,

  // Store the locale preference in a cookie
  localePrefix: 'always',

  // Cookie name for locale preference
  localeCookie: {
    name: 'proj_uinhome-language',
  },
});

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');

  // Handle Payload CMS admin route subdomain restriction
  if (url.pathname.startsWith('/admin')) {
    // If accessed via the correct CMS subdomain, bypass next-intl entirely
    if (host === 'cms.unitc.cn') {
      return NextResponse.next();
    }
    // If accessed via the main domain, rewrite to a non-existent path to trigger native 404
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }

  // Handle all other routes with next-intl
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - api routes
  // - _next (static files)
  // - any file with an extension (e.g. favicon.ico)
  // Note: 'admin' is intentionally removed from the negative lookahead so middleware can catch it.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};