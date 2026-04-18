import PageIntro from "@/components/Common/PageIntro";
import BlockRenderer from "@/components/payload/BlockRenderer";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  tryGetPageBySlug,
  tryGetPayloadClient,
  toPayloadLocale,
} from "@/lib/payload";
import { buildAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);
  if (!payload) return {};

  const page = await tryGetPageBySlug({
    payload,
    locale: payloadLocale,
    slug: "case-studies",
    depth: 1,
    draft: isPreview,
  });
  if (!page) return {};
  const title = page.seo?.title ?? page.title;
  const description = page.seo?.description;

  return {
    title: title ? `${title} | ${t("serviceCases")}` : undefined,
    description: description ?? undefined,
    alternates: buildAlternates({ locale, pathSuffix: "/case-studies" }),
  };
}

const CaseStudiesPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);
  if (!payload) return notFound();

  const page = await tryGetPageBySlug({
    payload,
    locale: payloadLocale,
    slug: "case-studies",
    depth: 2,
    draft: isPreview,
  });
  if (!page?.title || !page?.seo?.description) return notFound();

  return (
    <>
      <PageIntro
        title={page.title}
        description={page.seo.description}
      />
      {Array.isArray((page as any).blocks) ? (
        <BlockRenderer locale={locale} blocks={(page as any).blocks} />
      ) : null}
    </>
  );
};

export default CaseStudiesPage;
