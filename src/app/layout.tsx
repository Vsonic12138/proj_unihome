import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { Inter } from "next/font/google";
import "../styles/index.css";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: Locale }>;
}) {
  const resolvedParams = await params;
  const localeParam = resolvedParams?.locale;
  const locale = SUPPORTED_LOCALES.includes((localeParam ?? "") as Locale)
    ? (localeParam as Locale)
    : DEFAULT_LOCALE;

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
