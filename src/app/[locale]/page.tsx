import ScrollUp from "@/components/Common/ScrollUp";
import BlockRenderer from "@/components/payload/BlockRenderer";
import {
  tryGetPageBySlug,
  tryGetPayloadClient,
  toPayloadLocale,
} from "@/lib/payload";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { buildAlternates } from "@/lib/seo";

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
    slug: "home",
    depth: 0,
    draft: isPreview,
  });

  const seoTitle = (page as any)?.seo?.title ?? (page as any)?.title;
  const seoDescription = (page as any)?.seo?.description;

  return {
    title: seoTitle ?? undefined,
    description: seoDescription ?? undefined,
    alternates: buildAlternates({ locale, pathSuffix: "" }),
  };
}

const HomePage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);

  if (!payload) return notFound();

  const page = await tryGetPageBySlug({
    payload,
    locale: payloadLocale,
    slug: "home",
    depth: 3,
    draft: isPreview,
  });

  if (!(page as any)?.blocks?.length) return notFound();

  return (
    <>
      <ScrollUp />
      <BlockRenderer
        locale={locale}
        blocks={(page as any).blocks}
      />
    </>
  );
};

export default HomePage;
