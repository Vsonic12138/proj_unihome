import { getTranslations } from 'next-intl/server';
import AboutContent from "@/app/about/AboutContent";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pageCopy = t.raw('pages.about') as any;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const AboutPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <AboutContent
      pageCopy={t.raw('pages.about')}
      aboutCopy={t.raw('about')}
    />
  );
};

export default AboutPage;
