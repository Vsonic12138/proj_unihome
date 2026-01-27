import { getTranslations } from 'next-intl/server';
import ErrorContent from "@/app/error/ErrorContent";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const copy = t.raw('error');

  return {
    title: `${copy.title} | Startup`,
    description: copy.description,
  };
}

const ErrorPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <ErrorContent
      copy={t.raw('error')}
      locale={locale}
    />
  );
};

export default ErrorPage;
