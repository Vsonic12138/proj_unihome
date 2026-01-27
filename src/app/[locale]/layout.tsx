import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/Common/FloatingContact";
import CookieConsent from "@/components/Common/CookieConsent";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import type { ReactNode } from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <ScrollToTop />
      <FloatingContact />
      <CookieConsent />
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
