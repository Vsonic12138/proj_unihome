'use client';

import type { SVGProps } from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SunIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M4.93 19.07l1.41-1.41" />
    <path d="M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
  </svg>
);

type ThemeTogglerProps = {
  label: string;
};

const ThemeToggler = ({ label }: ThemeTogglerProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const iconClassName = "h-5 w-5 md:h-6 md:w-6";

  // Render a placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={label}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-2 text-black transition-colors duration-200 dark:bg-dark-bg dark:text-white md:h-14 md:w-14"
        disabled
      >
        <div className={iconClassName} />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleToggle}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-2 text-black transition-colors duration-200 dark:bg-dark-bg dark:text-white md:h-14 md:w-14"
    >
      {theme === "dark" ? (
        <SunIcon className={iconClassName} />
      ) : (
        <MoonIcon className={iconClassName} />
      )}
    </button>
  );
};

export default ThemeToggler;
