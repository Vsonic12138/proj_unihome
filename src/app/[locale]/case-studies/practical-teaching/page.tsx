import PageIntro from "@/components/Common/PageIntro";
import BlockRenderer from "@/components/payload/BlockRenderer";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  tryGetPageBySlug,
  tryGetPayloadClient,
  toPayloadLocale,
} from "@/lib/payload";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

type PageParams = {
  params: Promise<{ locale: string }>;
};

const SLUG = "case-studies-practical-teaching";

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
    slug: SLUG,
    depth: 1,
    draft: isPreview,
  });
  if (!page) return {};
  const title = page.seo?.title ?? page.title;
  const description = page.seo?.description;

  return {
    title: title ? `${title} | ${t("serviceCases")}` : undefined,
    description: description ?? undefined,
  };
}

const PracticalTeachingCasesPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);
  if (!payload) return notFound();

  const page = await tryGetPageBySlug({
    payload,
    locale: payloadLocale,
    slug: SLUG,
    depth: 3,
    draft: isPreview,
  });

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
    </>
  );
};

export default PracticalTeachingCasesPage;
