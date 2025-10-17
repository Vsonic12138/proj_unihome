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
  const pageCopy = dictionary.pages.developerServices;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const DeveloperServicesPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const pageCopy = dictionary.pages.developerServices;

  return (
    <PageIntro
      title={pageCopy.title}
      description={pageCopy.description}
      homeLabel={dictionary.breadcrumbs.home}
      homeHref={withLocalePath(locale, "/")}
    />
  );
};

export default DeveloperServicesPage;
