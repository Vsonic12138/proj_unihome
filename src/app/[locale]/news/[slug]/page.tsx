import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import RichText from "@/components/payload/RichText";
import {
  formatNewsDate,
  getNewsPathSuffix,
  getNewsCategoryTranslationKey,
} from "@/lib/news";
import {
  resolveMediaURL,
  toPayloadLocale,
  tryGetNewsBySlug,
  tryGetPayloadClient,
} from "@/lib/payload";
import { buildAlternates } from "@/lib/seo";

export const dynamic = "force-dynamic";

type NewsPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  if (!payload) return {};

  const doc = (await tryGetNewsBySlug({
    payload,
    locale: toPayloadLocale(locale),
    slug,
    depth: 2,
    draft: isPreview,
  })) as any;
  if (!doc) return {};

  const title = String(doc?.seo?.title ?? doc?.title ?? "").trim();
  const description = String(
    doc?.seo?.description ?? doc?.summary ?? "",
  ).trim();
  const image =
    resolveMediaURL(doc?.seo?.image) ?? resolveMediaURL(doc?.coverImage);

  return {
    title: title || undefined,
    description: description || undefined,
    alternates: buildAlternates({ locale, pathSuffix: getNewsPathSuffix(slug) }),
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      type: "article",
      publishedTime: doc?.publishDate ?? undefined,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  if (!payload) notFound();

  const doc = (await tryGetNewsBySlug({
    payload,
    locale: toPayloadLocale(locale),
    slug,
    depth: 2,
    draft: isPreview,
  })) as any;
  if (!doc) notFound();

  const coverURL = resolveMediaURL(doc.coverImage);
  const date = formatNewsDate(doc.publishDate, locale);
  const categoryKey = getNewsCategoryTranslationKey(doc.category);

  return (
    <main className="pb-16 pt-28 md:pb-24 md:pt-36">
      <article>
        <header className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <nav
              aria-label={t("detail.breadcrumbLabel")}
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-body-color dark:text-white/60"
            >
              <Link
                href={`/${toPayloadLocale(locale)}`}
                className="transition hover:text-primary"
              >
                {t("detail.home")}
              </Link>
              <span aria-hidden="true">/</span>
              <span>{t("detail.news")}</span>
            </nav>

            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded bg-primary/10 px-2.5 py-1 font-medium text-primary dark:bg-primary/20">
                {t(categoryKey)}
              </span>
              {date ? (
                <time
                  dateTime={doc.publishDate ?? undefined}
                  className="text-body-color dark:text-white/60"
                >
                  {date}
                </time>
              ) : null}
            </div>

            <h1 className="text-3xl font-bold leading-tight text-dark dark:text-white md:text-5xl">
              {doc.title}
            </h1>
            {doc.summary ? (
              <p className="mt-6 text-lg leading-relaxed text-body-color dark:text-white/70">
                {doc.summary}
              </p>
            ) : null}
          </div>
        </header>

        {coverURL ? (
          <div className="container mx-auto mt-10 px-4">
            <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-lg">
              <Image
                src={coverURL}
                alt={
                  doc.coverImage?.alt ??
                  t("detail.coverAlt", { title: String(doc.title) })
                }
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        ) : null}

        <div className="container mx-auto mt-10 px-4 md:mt-14">
          <RichText
            data={doc.content}
            className="prose prose-lg mx-auto max-w-3xl dark:prose-invert prose-headings:text-dark prose-a:text-primary dark:prose-headings:text-white"
          />
        </div>
      </article>
    </main>
  );
}
