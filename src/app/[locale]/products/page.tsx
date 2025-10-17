import PageIntro from "@/components/Common/PageIntro";
import ProductsGrid from "@/components/Products";
import ProductsFAQ from "@/components/Products/FAQ";
import { getDictionary, type Locale } from "@/i18n/config";
import { withLocalePath } from "@/i18n/utils";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const pageCopy = dictionary.pages.products;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const ProductsPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const pageCopy = dictionary.pages.products;
  const productsCopy = dictionary.products.catalog;
  const faqCopy = dictionary.products.faq;

  return (
    <>
      <PageIntro
        title={pageCopy.title}
        description={pageCopy.description}
        homeLabel={dictionary.breadcrumbs.home}
        homeHref={withLocalePath(locale, "/")}
      />

      <ProductsGrid locale={locale} copy={productsCopy} />
      <ProductsFAQ copy={faqCopy} />
    </>
  );
};

export default ProductsPage;
