import "../../styles/index.css";

export const dynamic = "force-dynamic";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/Common/FloatingContact";
import CookieConsent from "@/components/Common/CookieConsent";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Providers } from "@/app/providers";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import {
  tryGetGlobals,
  tryGetPayloadClient,
  toPayloadLocale,
} from "@/lib/payload";
import { getPublicServerUrl } from "@/lib/seo";

const BAIDU_SITE_VERIFICATION = "codeva-8hCxnEikGb";

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

  // Parse server URL for absolute path generation in metadata (OG Images, Sitemaps)
  const serverUrl = getPublicServerUrl();
  const metadataBase = serverUrl ? new URL(serverUrl) : undefined;

  if (!payload) {
    return {
      ...(metadataBase ? { metadataBase } : {}),
      verification: {
        other: {
          "baidu-site-verification": BAIDU_SITE_VERIFICATION,
        },
      },
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
  
  const companyName = globals?.siteSettings?.companyName || "UniTech";
  const seoConfig = globals?.siteSettings?.seoDefaults;
  
  const seoTitle = seoConfig?.title || companyName;
  const seoDesc = seoConfig?.description || "";
  const seoImage = resolveMediaURL(seoConfig?.image) ?? "/images/og-default.jpeg";

  return {
    ...(metadataBase ? { metadataBase } : {}),
    title: {
      default: seoTitle,
      template: `%s | ${seoTitle}`,
    },
    description: seoDesc,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      ...(serverUrl ? { url: serverUrl } : {}),
      siteName: companyName,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [seoImage],
    },
    verification: {
      other: {
        "baidu-site-verification": BAIDU_SITE_VERIFICATION,
      },
    },
    icons: {
      icon: favicon,
      apple: favicon, // fallback apple icon
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
