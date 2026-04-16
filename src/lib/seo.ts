import { defaultLocale, locales } from "@/i18n/routing";
import type { Metadata } from "next";

function normalizeServerUrlString(raw: string): string {
  const trimmed = raw.trim();
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

function tryParseServerUrl(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  try {
    return new URL(trimmed);
  } catch {
    // Common misconfig: "example.com" without protocol.
    try {
      return new URL(`https://${trimmed}`);
    } catch {
      return null;
    }
  }
}

function formatEnvValueForError(raw: string | undefined): string {
  if (raw == null) return "(not set)";
  const compact = raw.replace(/\s+/g, " ").trim();
  if (!compact) return "(empty string)";
  return compact.length > 200 ? `${compact.slice(0, 200)}…(truncated)` : compact;
}

function buildNextPublicServerUrlErrorMessage(raw: string | undefined): string {
  const received = formatEnvValueForError(raw);
  const hint =
    raw && raw.trim() && !/^https?:\/\//i.test(raw.trim())
      ? 'You may have set a domain without protocol (e.g. "example.com"). Use "https://example.com".'
      : 'Make sure it is a full URL with protocol (e.g. "https://example.com") and without a trailing "/".';

  return [
    "NEXT_PUBLIC_SERVER_URL is missing or invalid. In production, we cannot generate correct absolute SEO URLs (sitemap/robots).",
    `- NODE_ENV: ${process.env.NODE_ENV ?? "(not set)"}`,
    `- NEXT_PUBLIC_SERVER_URL: ${received}`,
    `- Fix: ${hint}`,
    '- Valid example: "https://yourdomain.com"',
    '- Invalid example: "yourdomain.com" (missing "https://")',
  ].join("\n");
}

export function getPublicServerUrl(options?: {
  /**
   * When true and NODE_ENV === "production", throws if NEXT_PUBLIC_SERVER_URL is missing/invalid.
   * Useful for routes like /sitemap.xml and /robots.txt where publishing a wrong domain is worse than failing loudly.
   */
  requireInProduction?: boolean;
}): string | null {
  const requireInProduction = options?.requireInProduction ?? false;
  const isProduction = process.env.NODE_ENV === "production";

  const raw = process.env.NEXT_PUBLIC_SERVER_URL;
  const parsed = tryParseServerUrl(raw || "");
  if (parsed) return normalizeServerUrlString(parsed.origin);

  if (!isProduction) return "http://localhost:3000";

  if (requireInProduction) {
    throw new Error(buildNextPublicServerUrlErrorMessage(raw));
  }

  return null;
}

function normalizePathSuffix(pathSuffix: string): string {
  if (!pathSuffix) return "";
  if (pathSuffix === "/") return "";
  return pathSuffix.startsWith("/") ? pathSuffix : `/${pathSuffix}`;
}

export function buildAlternates({
  locale,
  pathSuffix,
  serverUrl,
}: {
  locale: string;
  pathSuffix: string;
  serverUrl?: string;
}): Metadata["alternates"] {
  const origin =
    (serverUrl ? normalizeServerUrlString(serverUrl) : null) || getPublicServerUrl();
  const suffix = normalizePathSuffix(pathSuffix);

  const canonicalPath = `/${locale}${suffix}`;
  const canonical = origin ? new URL(canonicalPath, origin).toString() : canonicalPath;

  const languages: Record<string, string> = {};
  for (const lang of locales) {
    const langPath = `/${lang}${suffix}`;
    languages[lang] = origin ? new URL(langPath, origin).toString() : langPath;
  }
  const defaultPath = `/${defaultLocale}${suffix}`;
  languages["x-default"] = origin ? new URL(defaultPath, origin).toString() : defaultPath;

  return {
    canonical,
    languages,
  };
}

export function buildSitemapAlternates({
  pathSuffix,
  serverUrl,
}: {
  pathSuffix: string;
  serverUrl?: string;
}): { languages: Record<string, string> } {
  const origin =
    (serverUrl ? normalizeServerUrlString(serverUrl) : null) || getPublicServerUrl();
  const suffix = normalizePathSuffix(pathSuffix);

  const languages: Record<string, string> = {};
  for (const lang of locales) {
    const langPath = `/${lang}${suffix}`;
    languages[lang] = origin ? new URL(langPath, origin).toString() : langPath;
  }
  const defaultPath = `/${defaultLocale}${suffix}`;
  languages["x-default"] = origin ? new URL(defaultPath, origin).toString() : defaultPath;

  return { languages };
}
