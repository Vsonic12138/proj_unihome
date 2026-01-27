import { getTranslations } from 'next-intl/server';
import PageIntro from "@/components/Common/PageIntro";
import CooperationModes from "@/app/CustomSolutions/CooperationModes";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pageCopy = t.raw('pages').customSolutions;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const CustomSolutionsPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pageCopy = t.raw('pages').customSolutions;

  return (
    <>
      <PageIntro
        title={pageCopy.title}
        description={pageCopy.description}
      />
      <CooperationModes modes={pageCopy.cooperationModes} />
    </>
  );
};

export default CustomSolutionsPage;
