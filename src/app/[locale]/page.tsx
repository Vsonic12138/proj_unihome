import { getTranslations } from 'next-intl/server';
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const homeMeta = t.raw('pages').home;

  return {
    title: homeMeta?.title ?? "Youni Tongchuang",
    description:
      homeMeta?.description ??
      "Youni Tongchuang provides embodied intelligence robotics platforms for education and research.",
  };
}

const HomePage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <>
      <ScrollUp />
      <Hero copy={t.raw('hero')} />
      <Features
        locale={locale}
        copy={t.raw('features')}
        productsCatalog={t.raw('products').catalog}
      />
      <AboutSectionTwo
        items={t.raw('about').sectionTwo.items}
        imageAlt={t.raw('about').sectionTwo.imageAlt}
      />
      <Contact copy={t.raw('contact')} />
    </>
  );
};

export default HomePage;
