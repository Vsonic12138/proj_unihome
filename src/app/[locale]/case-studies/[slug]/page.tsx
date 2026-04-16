import RichText from "@/components/payload/RichText";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  tryGetPayloadClient,
  toPayloadLocale,
  resolveMediaURL,
} from "@/lib/payload";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { buildAlternates } from "@/lib/seo";

type PageParams = {
  params: Promise<{ locale: string; slug: string }>;
};

// Map category value → list page path
const CATEGORY_PATHS: Record<string, string> = {
  "practical-teaching": "practical-teaching",
  "sci-tech-innovation": "sci-tech-innovation",
  "innovation-competition": "innovation-competition",
  "training-base": "training-base",
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);
  if (!payload) return {};

  const res = await payload.find({
    collection: "caseStudies",
    where: isPreview
      ? { slug: { equals: slug } }
      : {
          and: [
            { slug: { equals: slug } },
            { _status: { equals: "published" } },
          ],
        },
    locale: payloadLocale,
    depth: 1,
    limit: 1,
    overrideAccess: true,
    draft: isPreview ? true : undefined,
  });

  const doc = res.docs?.[0] as any;
  if (!doc) return {};

  const coverUrl = resolveMediaURL(doc.coverImage);
  return {
    title: doc.title ? `${doc.title} | ${t("serviceCases")}` : undefined,
    openGraph: coverUrl ? { images: [{ url: coverUrl }] } : undefined,
    alternates: buildAlternates({ locale, pathSuffix: `/case-studies/${slug}` }),
  };
}

export async function generateStaticParams() {
  return [];
}

const CaseStudyDetailPage = async ({ params }: PageParams) => {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);
  if (!payload) return notFound();

  const res = await payload.find({
    collection: "caseStudies",
    where: isPreview
      ? { slug: { equals: slug } }
      : {
          and: [
            { slug: { equals: slug } },
            { _status: { equals: "published" } },
          ],
        },
    locale: payloadLocale,
    depth: 2,
    limit: 1,
    overrideAccess: true,
    draft: isPreview ? true : undefined,
  });

  const doc = res.docs?.[0] as any;
  if (!doc) return notFound();

  const coverUrl = resolveMediaURL(doc.coverImage);
  const category: string = doc.category ?? "";
  const categoryPath = CATEGORY_PATHS[category] ?? "practical-teaching";
  const backHref = `/${locale}/case-studies/${categoryPath}`;

  return (
    <>
      {/* Page title header */}
      <section className="relative z-10 overflow-hidden bg-white pb-8 pt-28 dark:bg-dark md:pt-36">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-2 text-3xl font-bold text-dark dark:text-white md:text-4xl">
              {doc.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            href={backHref}
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-dark/10 bg-gray-50 px-5 py-2.5 text-sm font-semibold text-dark transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-primary dark:hover:bg-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t("backToList")}
          </Link>

          <article className="mx-auto max-w-3xl">
            {/* Cover image */}
            {coverUrl && (
              <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={coverUrl}
                  alt={doc.coverImage?.alt ?? doc.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            {/* Rich text content */}
            <RichText
              data={doc.content}
              className="
                [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-dark dark:[&_h1]:text-white
                [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-dark dark:[&_h2]:text-white
                [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-dark dark:[&_h3]:text-white
                [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-dark dark:[&_h4]:text-white
                [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-body-color dark:[&_p]:text-white/70
                [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-body-color dark:[&_ul]:text-white/70
                [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-body-color dark:[&_ol]:text-white/70
                [&_li]:mb-1
                [&_a]:text-primary [&_a:hover]:underline
                [&_strong]:font-semibold [&_strong]:text-dark dark:[&_strong]:text-white
                [&_img]:my-6 [&_img]:w-full [&_img]:rounded-xl [&_img]:shadow-md
                [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-body-color
              "
            />
          </article>
        </div>
      </section>
    </>
  );
};

export default CaseStudyDetailPage;
