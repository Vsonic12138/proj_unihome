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
  const pageCopy = t.raw('pages').developerServices;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const DeveloperServicesPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pageCopy = t.raw('pages').developerServices;

  return (
    <PageIntro
      title={pageCopy.title}
      description={pageCopy.description}
    />
  );
};

export default DeveloperServicesPage;
