import ContactContent from "@/app/contact/ContactContent";
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
  const pageCopy = dictionary.pages.contact;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const ContactPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <ContactContent
      pageCopy={dictionary.pages.contact}
      contactCopy={dictionary.contact}
      breadcrumbs={dictionary.breadcrumbs}
      locale={locale}
    />
  );
};

export default ContactPage;
