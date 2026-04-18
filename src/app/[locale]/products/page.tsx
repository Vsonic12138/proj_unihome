import PageIntro from "@/components/Common/PageIntro";
import ProductsFAQ from "@/components/Products/FAQ";
import {
  tryGetPageBySlug,
  tryGetPayloadClient,
  tryGetGlobals,
  tryGetFAQs,
  toPayloadLocale,
} from "@/lib/payload";
import { buildAlternates } from "@/lib/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import BlockRenderer from "@/components/payload/BlockRenderer";

export const dynamic = "force-dynamic";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);
  if (!payload) return {};

  const page = await tryGetPageBySlug({
    payload,
    locale: payloadLocale,
    slug: "products",
    depth: 1,
    draft: isPreview,
  });
  if (!page) return {};
  const title = page.seo?.title ?? page.title;
  const description = page.seo?.description;

  return {
    title: title ? `${title} | Startup` : undefined,
    description: description ?? undefined,
    alternates: buildAlternates({ locale, pathSuffix: "/products" }),
  };
}

const ProductsPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);

  const t = await getTranslations({ locale, namespace: "products" });
  const faqData = t.raw("faq");

  const faqItems = await tryGetFAQs({
    payload,
    locale: payloadLocale,
  });

  if (!payload) return notFound();
  const [page, globals] = await Promise.all([
    tryGetPageBySlug({
      payload,
      locale: payloadLocale,
      slug: "products",
      depth: 3,
      draft: isPreview,
    }),
    tryGetGlobals({ payload, locale: payloadLocale, depth: 1 }),
  ]);
  if (!page?.title) return notFound();

  const introTitle = (page as any)?.intro?.title ?? page.title;
  const introDescription = (page as any)?.intro?.description ?? page.seo?.description ?? "";

  return (
    <>
      <PageIntro
        title={introTitle}
        description={introDescription}
      />
      {Array.isArray((page as any)?.blocks) ? (
        <BlockRenderer locale={locale} blocks={(page as any).blocks} />
      ) : null}
      {faqItems && faqItems.length > 0 && (
        <ProductsFAQ copy={{ title: faqData.title ?? "常见问题", items: faqItems }} />
      )}
    </>
  );
};

export default ProductsPage;
