import ErrorContent from "@/app/error/ErrorContent";
import { getDictionary, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const copy = dictionary.error;

  return {
    title: `${copy.title} | Startup`,
    description: copy.description,
  };
}

const ErrorPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <ErrorContent
      copy={dictionary.error}
      homeLabel={dictionary.breadcrumbs.home}
      locale={locale}
    />
  );
};

export default ErrorPage;
