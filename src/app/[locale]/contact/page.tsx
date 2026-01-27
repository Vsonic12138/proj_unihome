import { getTranslations } from 'next-intl/server';
import ContactContent from "@/app/contact/ContactContent";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pageCopy = t.raw('pages').contact;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const ContactPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <ContactContent
      pageCopy={t.raw('pages').contact}
      contactCopy={t.raw('contact')}
    />
  );
};

export default ContactPage;
