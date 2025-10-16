import type { Locale } from "./config";

/**
 * Prefixes a path with the given locale.
 *
 * @param locale - The locale code (e.g., "en", "zh")
 * @param path - The path to prefix
 * @returns The localized path
 *
 * @example
 * withLocalePath("en", "/about") // Returns: "/en/about"
 * withLocalePath("zh", "/") // Returns: "/zh"
 * withLocalePath("en", "https://example.com") // Returns: "https://example.com" (unchanged)
 */
export const withLocalePath = (locale: Locale, path: string): string => {
  // Don't modify external links, mailto:, tel:, or other protocols
  if (!path.startsWith("/")) {
    return path;
  }

  // Handle root path
  if (path === "/") {
    return `/${locale}`;
  }

  // Handle regular paths
  return `/${locale}${path}`;
};
