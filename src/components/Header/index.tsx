"use client";

import type { Dictionary, Locale } from "@/i18n/config";
import { withLocalePath } from "@/i18n/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import LocaleSwitcher from "./LocaleSwitcher";
import buildMenu from "./menuData";

type HeaderProps = {
  locale: Locale;
  menu: Dictionary["header"]["menu"];
  auth: Dictionary["header"]["auth"];
  languageSwitcher: Dictionary["header"]["languageSwitcher"];
  aria: Dictionary["common"]["aria"];
  themeToggleLabel: string;
};

const Header = ({
  locale,
  menu,
  auth,
  languageSwitcher,
  aria,
  themeToggleLabel,
}: HeaderProps) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    const handleStickyNavbar = () => {
      setSticky(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  const pathname = usePathname();
  const menuData = useMemo(() => buildMenu(locale, menu), [locale, menu]);
  const signinHref = withLocalePath(locale, "/signin");
  const signupHref = withLocalePath(locale, "/signup");

  return (
    <header
      className={`header top-0 left-0 z-40 flex w-full items-center ${
        sticky
          ? "dark:bg-gray-dark dark:shadow-sticky-dark shadow-sticky fixed z-9999 bg-white/80 backdrop-blur-xs transition"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href={withLocalePath(locale, "/")}
              className={`header-logo block w-full ${
                sticky ? "py-5 lg:py-2" : "py-8"
              } `}
            >
              <div
                className={`relative transition-[height] ${
                  sticky ? "h-10" : "h-14"
                } w-36 max-w-full`}
              >
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  fill
                  priority
                  sizes="144px"
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  fill
                  priority
                  sizes="144px"
                  className="hidden object-contain dark:block"
                />
              </div>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setNavbarOpen((open) => !open)}
                id="navbarToggler"
                aria-label={aria.mobileMenu}
                className="ring-primary absolute top-1/2 right-4 block translate-y-[-50%] rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "top-[7px] rotate-45" : " "
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "opacity-0" : " "
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "top-[-8px] -rotate-45" : " "
                  }`}
                />
              </button>
              <nav
                id="navbarCollapse"
                className={`navbar border-body-color/50 dark:border-body-color/20 dark:bg-dark absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-white px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                }`}
              >
                <ul className="block lg:flex lg:space-x-12">
                  {menuData.map((menuItem, index) => (
                    <li key={menuItem.id} className="group relative">
                      {menuItem.path ? (
                        <Link
                          href={menuItem.path}
                          className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                            pathname === menuItem.path
                              ? "text-primary dark:text-white"
                              : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      ) : (
                        <>
                          <p
                            onClick={() =>
                              setOpenIndex((value) =>
                                value === index ? -1 : index,
                              )
                            }
                            className="text-dark group-hover:text-primary flex cursor-pointer items-center justify-between py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 dark:text-white/70 dark:group-hover:text-white"
                          >
                            {menuItem.title}
                            <span className="pl-3">
                              <svg width="25" height="24" viewBox="0 0 25 24">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </p>
                          <div
                            className={`submenu dark:bg-dark relative top-full left-0 rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                              openIndex === index ? "block" : "hidden"
                            }`}
                          >
                            {menuItem.submenu?.map((submenuItem) => (
                              <Link
                                href={submenuItem.path}
                                key={submenuItem.id}
                                className="text-dark hover:text-primary block rounded-sm py-2.5 text-sm lg:px-3 dark:text-white/70 dark:hover:text-white"
                              >
                                {submenuItem.title}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex items-center justify-end pr-16 lg:pr-0">
              <Link
                href={signinHref}
                className="text-dark hidden px-7 py-3 text-base font-medium hover:opacity-70 md:block dark:text-white"
              >
                {auth.signIn}
              </Link>
              <Link
                href={signupHref}
                className="ease-in-up shadow-btn hover:shadow-btn-hover bg-primary hover:bg-primary/90 hidden rounded-xs px-8 py-3 text-base font-medium text-white transition duration-300 md:block md:px-9 lg:px-6 xl:px-9"
              >
                {auth.signUp}
              </Link>
              <div className="ml-4 flex items-center gap-3 md:gap-4">
                <Suspense
                  fallback={
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-2 opacity-70 dark:bg-dark-bg md:h-14 md:w-14">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        className="h-5 w-5 md:h-6 md:w-6"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                  }
                >
                  <LocaleSwitcher
                    currentLocale={locale}
                    options={languageSwitcher.options}
                    ariaLabel={languageSwitcher.label}
                  />
                </Suspense>
                <ThemeToggler label={themeToggleLabel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
