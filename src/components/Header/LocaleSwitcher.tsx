"use client";

import { LOCALE_COOKIE, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useTransition } from "react";

type Option = {
  locale: Locale;
  label: string;
};

type LocaleSwitcherProps = {
  currentLocale: Locale;
  options: Array<{ locale: string; label: string }>;
  ariaLabel: string;
};

const LOCALE_PREFIX = new RegExp(
  `^/(?:${SUPPORTED_LOCALES.join("|")})(?=/|$)`,
  "i",
);

const updateLocaleInPath = (pathname: string, locale: Locale) => {
  if (LOCALE_PREFIX.test(pathname)) {
    return pathname.replace(LOCALE_PREFIX, `/${locale}`);
  }
  if (pathname.startsWith("/")) {
    return `/${locale}${pathname}`;
  }
  return `/${locale}/${pathname}`;
};

const normalizePath = (path: string) => {
  if (path === "/") {
    return path;
  }
  return path.replace(/\/+$/, "");
};

// Language icon SVG
const LanguageIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LocaleSwitcher = ({
  currentLocale,
  options,
  ariaLabel,
}: LocaleSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const availableOptions = useMemo<Option[]>(() => {
    return options
      .filter((option): option is Option =>
        SUPPORTED_LOCALES.includes(option.locale as Locale),
      )
      .map((option) => ({
        locale: option.locale as Locale,
        label: option.label,
      }));
  }, [options]);

  const handleLocaleChange = (nextLocale: Locale) => {
    if (nextLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    const nextPath = updateLocaleInPath(pathname, nextLocale);
    const query = searchParams.toString();
    const normalizedPath = normalizePath(nextPath);
    const nextUrl = query ? `${normalizedPath}?${query}` : normalizedPath;

    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; max-age=31536000; path=/`;

    setIsOpen(false);
    startTransition(() => {
      router.replace(nextUrl);
      router.refresh();
    });
  };

  const currentOption = availableOptions.find(
    (option) => option.locale === currentLocale,
  );

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-2 text-black transition-colors duration-200 hover:bg-gray-3 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-dark-bg dark:text-white dark:hover:bg-dark-bg/80 md:h-14 md:w-14"
      >
        <LanguageIcon className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute top-full right-0 z-50 mt-2 w-32 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-dark dark:ring-white/10">
            {availableOptions.map((option) => (
              <button
                key={option.locale}
                onClick={() => handleLocaleChange(option.locale)}
                className={`block w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                  option.locale === currentLocale
                    ? "bg-primary/10 text-primary font-medium dark:bg-primary/20"
                    : "text-body-color hover:bg-gray-2 dark:text-body-color-dark dark:hover:bg-dark-bg"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LocaleSwitcher;
