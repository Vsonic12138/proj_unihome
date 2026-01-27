import { getTranslations } from 'next-intl/server';
import PageIntro from "@/components/Common/PageIntro";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pageCopy = t.raw('pages').caseStudies;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const CaseStudiesPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pageCopy = t.raw('pages').caseStudies;

  return (
    <PageIntro
      title={pageCopy.title}
      description={pageCopy.description}
    />
  );
};

export default CaseStudiesPage;
