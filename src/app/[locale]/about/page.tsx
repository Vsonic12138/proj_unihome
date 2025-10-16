import AboutContent from "@/app/about/AboutContent";
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
  const pageCopy = dictionary.pages.about;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const AboutPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <AboutContent
      pageCopy={dictionary.pages.about}
      aboutCopy={dictionary.about}
      breadcrumbs={dictionary.breadcrumbs}
      locale={locale}
    />
  );
};

export default AboutPage;
