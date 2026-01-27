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
  const pageCopy = t.raw('pages').caseK12;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const K12CasesPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pageCopy = t.raw('pages').caseK12;

  return (
    <PageIntro
      title={pageCopy.title}
      description={pageCopy.description}
    />
  );
};

export default K12CasesPage;
