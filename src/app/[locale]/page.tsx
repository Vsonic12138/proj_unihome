import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
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
  const hero = dictionary.hero;

  return {
    title: hero.title,
    description: hero.description,
  };
}

const HomePage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <ScrollUp />
      <Hero copy={dictionary.hero} />
      <Features copy={dictionary.features} />
      <Video copy={dictionary.video} closeLabel={dictionary.common.aria.closeModal} />
      <Brands />
      <AboutSectionOne copy={dictionary.about.sectionOne} />
      <AboutSectionTwo items={dictionary.about.sectionTwo.items} />
      <Testimonials copy={dictionary.testimonials} />
      <Pricing copy={dictionary.pricing} />
      <Contact copy={dictionary.contact} />
    </>
  );
};

export default HomePage;
