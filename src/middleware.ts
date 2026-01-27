import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/routing';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale,

  // Store the locale preference in a cookie
  localePrefix: 'always',
  
  // Cookie name for locale preference
  localeCookie: {
    name: 'startup-nextjs-language',
  },
});

export const config = {
  // Match all pathnames except for
  // - api routes
  // - _next (static files)
  // - any file with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
