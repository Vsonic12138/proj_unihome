import { Inter } from "next/font/google";
import "../styles/index.css";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const localeParam = resolvedParams?.locale;
  const locale = localeParam ?? 'zh';

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
