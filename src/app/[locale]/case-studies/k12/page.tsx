import PageIntro from "@/components/Common/PageIntro";
import { getDictionary, type Locale } from "@/i18n/config";
import { withLocalePath } from "@/i18n/utils";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const pageCopy = dictionary.pages.caseK12;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const K12CasesPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const pageCopy = dictionary.pages.caseK12;

  return (
    <PageIntro
      title={pageCopy.title}
      description={pageCopy.description}
      homeLabel={dictionary.breadcrumbs.home}
      homeHref={withLocalePath(locale, "/")}
    />
  );
};

export default K12CasesPage;
