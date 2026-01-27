import { getTranslations } from 'next-intl/server';
import PageIntro from "@/components/Common/PageIntro";
import ProductsGrid from "@/components/Products";
import ProductsFAQ from "@/components/Products/FAQ";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pageCopy = t.raw('pages').products;

  return {
    title: `${pageCopy.title} | Startup`,
    description: pageCopy.description,
  };
}

const ProductsPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pageCopy = t.raw('pages').products;
  const productsCopy = t.raw('products').catalog;
  const faqCopy = t.raw('products').faq;

  return (
    <>
      <PageIntro
        title={pageCopy.title}
        description={pageCopy.description}
      />

      <ProductsGrid locale={locale} copy={productsCopy} />
      <ProductsFAQ copy={faqCopy} />
    </>
  );
};

export default ProductsPage;
