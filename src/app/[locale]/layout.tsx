import "../../styles/index.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/Common/FloatingContact";
import CookieConsent from "@/components/Common/CookieConsent";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { Providers } from "@/app/providers";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import {
  tryGetGlobals,
  tryGetPayloadClient,
  toPayloadLocale,
} from "@/lib/payload";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function resolveMediaURL(media: any): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (typeof media === "number") return null;

  if (media.url) return media.url;
  if (media.sizes?.hero?.url) return media.sizes.hero.url;
  if (media.sizes?.card?.url) return media.sizes.card.url;
  if (media.sizes?.thumbnail?.url) return media.sizes.thumbnail.url;

  return null;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);

  if (!payload) {
    return {
      icons: {
        icon: "/icon.svg",
      },
    };
  }

  const globals = await tryGetGlobals({
    payload,
    locale: payloadLocale,
    depth: 1,
  });

  const favicon =
    resolveMediaURL(globals?.siteSettings?.frontendBranding?.favicon) ?? "/icon.svg";

  return {
    icons: {
      icon: favicon,
    },
  };
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  const payloadLocale = toPayloadLocale(locale);
  const payload = await tryGetPayloadClient();

  const globals = payload
    ? await tryGetGlobals({
        payload,
        locale: payloadLocale,
        depth: 2,
      })
    : null;

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className="bg-[#FCFCFC] dark:bg-black">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Header
              locale={locale}
              navigation={globals?.navigation ?? null}
              siteSettings={globals?.siteSettings ?? null}
            />
            <main>{children}</main>
            <Footer
              locale={locale}
              footerData={globals?.footer ?? null}
              siteSettings={globals?.siteSettings ?? null}
            />
            <ScrollToTop />
            <FloatingContact siteSettings={globals?.siteSettings ?? null} />
            <CookieConsent siteSettings={globals?.siteSettings ?? null} />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
};

export default LocaleLayout;
