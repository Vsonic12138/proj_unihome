import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/Common/FloatingContact";
import { getDictionary, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <Header
        locale={locale}
        menu={dictionary.header.menu}
        auth={dictionary.header.auth}
        languageSwitcher={dictionary.header.languageSwitcher}
        aria={dictionary.common.aria}
        themeToggleLabel={dictionary.common.aria.themeToggle}
      />
      <main>{children}</main>
      <Footer
        copy={dictionary.footer}
        socialLabel={dictionary.common.aria.socialLink}
        homeHref={`/${locale}`}
        locale={locale}
      />
      <ScrollToTop label={dictionary.common.aria.scrollToTop} />
      <FloatingContact copy={dictionary.floatingContact} />
    </>
  );
};

export default LocaleLayout;
