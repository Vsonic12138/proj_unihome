import PageIntro from "@/components/Common/PageIntro";
import OpenSourceContent from "@/app/OpenSource/OpenSourceContent";
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
  const pageCopy = dictionary.pages.openSource;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const OpenSourcePage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const pageCopy = dictionary.pages.openSource;

  return (
    <>
      <PageIntro
        title={pageCopy.title}
        description={pageCopy.description}
      />
      <OpenSourceContent copy={pageCopy} />
    </>
  );
};

export default OpenSourcePage;
