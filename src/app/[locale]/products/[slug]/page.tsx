import { locales } from '@/i18n/routing';
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ImageGridWithLightbox from "@/components/Products/ImageGridWithLightbox";
import SafeProductImage from "@/components/Products/SafeProductImage";
import RichText from "@/components/payload/RichText";
import ProductsFAQ from "@/components/Products/FAQ";
import { getTranslations } from "next-intl/server";
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import {
  resolveMediaURL,
  tryGetGlobals,
  tryGetPayloadClient,
  tryGetPageBySlug,
  tryGetProductBySlug,
  tryGetProductSlugs,
  tryGetFAQs,
  toPayloadLocale,
} from "@/lib/payload";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const payload = await tryGetPayloadClient();
  if (payload) {
    const slugs = await tryGetProductSlugs({
      payload,
      locale: "zh",
    });
    for (const locale of locales) {
      slugs.forEach((slug) => params.push({ locale, slug }));
    }
    if (params.length > 0) {
      return params;
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);
  if (!payload) return {};

  const [product, page] = await Promise.all([
    tryGetProductBySlug({
      payload,
      locale: payloadLocale,
      slug,
      depth: 2,
      draft: isPreview,
    }),
    tryGetPageBySlug({
      payload,
      locale: payloadLocale,
      slug: "products",
      depth: 1,
      draft: isPreview,
    }),
  ]);
  if (!product || !page) return {};
  const description =
    typeof product.details?.overview === "string"
      ? product.details?.overview
      : page.seo?.description;
  return {
    title: page.seo?.title ? `${product.name} | ${page.seo.title}` : `${product.name}`,
    description: description ?? undefined,
  };
}

function isRichTextValue(value: unknown) {
  return Boolean(value && typeof value === "object" && "root" in (value as Record<string, unknown>));
}

const ProductDetailsPage = async ({ params }: PageParams) => {
  const { locale, slug } = await params;
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);

  const t = await getTranslations({ locale, namespace: "products" });
  const faqData = t.raw("faq");

  if (!payload) return notFound();
  const globals = await tryGetGlobals({ payload, locale: payloadLocale, depth: 1 });
  const productLabels = globals.siteSettings?.productDetailLabels;
  const productsPage = await tryGetPageBySlug({
    payload,
    locale: payloadLocale,
    slug: "products",
    depth: 1,
    draft: isPreview,
  });
  if (!productLabels || !productsPage) return notFound();

  let payloadDetails: any | null = null;
  let faqItems: any[] = [];
  
  const product = await tryGetProductBySlug({
    payload,
    locale: payloadLocale,
    slug,
    depth: 3,
    draft: isPreview,
  });
  if (product) {
    if (product.id) {
      faqItems = await tryGetFAQs({
        payload,
        locale: payloadLocale,
        productIds: [product.id as number | string],
      });
    }

    const heroImage = resolveMediaURL(product.heroImage);
    const features = (product.details?.features ?? []).map((feature: any) => {
      const mediaItems = Array.isArray(feature?.gallery)
        ? feature.gallery
            .map((item: any) => ({
              name: item?.name ?? feature?.title ?? "",
              image: resolveMediaURL(item?.image),
            }))
            .filter((item: any) => item.image)
        : [];
      const mediaURL = feature?.image ? resolveMediaURL(feature.image) : null;
      return {
        title: feature?.title,
        content: feature?.content ?? null,
        media:
          mediaItems.length > 0
            ? mediaItems
            : mediaURL
              ? [
                  {
                    name: feature?.title ?? "",
                    image: mediaURL,
                  },
                ]
              : null,
      };
    });
    const mapGalleryItems = (items: any[]) => {
      return Array.isArray(items)
        ? items.map((item: any) => ({
            name: item?.name ?? item?.title ?? "",
            image: resolveMediaURL(item?.image),
          })).filter((item) => item.name || item.image)
        : [];
    };

    payloadDetails = {
      name: product.name,
      model: product.model,
      subtitle: product.details?.subtitle,
      image: heroImage ?? "",
      overview: product.details?.overview ?? null,
      applicable: product.details?.applicable ?? null,
      highlights: (product.details?.highlights ?? []).map((h: any) => h?.text).filter(Boolean),
      features,
      sampleCases: product.details?.sampleCases
        ? {
            description: (product.details.sampleCases as any).description ?? null,
            sections: Array.isArray((product.details.sampleCases as any).sections)
              ? (product.details.sampleCases as any).sections.map((section: any) => ({
                  title: section?.title ?? null,
                  items: mapGalleryItems(section?.items ?? []),
                }))
              : [],
          }
        : null,
      sensorConfig: product.details?.sensorConfig ?? null,
      controllerConfig: product.details?.controllerConfig
        ? {
            ...(product.details.controllerConfig as any),
            images: ((product.details.controllerConfig as any).images ?? []).map((img: any) => ({
              ...img,
              src: resolveMediaURL(img.src) ?? img.src ?? "",
            })).filter((img: any) => img.src),
          }
        : null,
      softwareConfig: product.details?.softwareConfig ?? null,
      experiments: product.details?.experiments ?? null,
    };
  }

  const details = payloadDetails;

  if (!details) return notFound();

  const getCountLabel = (count: number) => {
    if (locale === "ja") return `（${count}種類）`;
    if (locale === "en") return ` (${count} types)`;
    return `（${count}种）`;
  };

  const sampleCases = details.sampleCases ?? null;
  const softwareConfig = details.softwareConfig ?? null;
  // 统一默认布局常量，不再从 JSON 数据中读取样式字段
  const softwareImageGridClassName = "grid grid-cols-1 gap-4 sm:grid-cols-2";
  const softwareFigureClassName = "overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800";
  const softwareImageWrapperClass = "relative aspect-[16/10] w-full";

  return (
    <section className="pt-28 md:pt-32 lg:pt-[150px] pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        {/* Top Section: Image + Basic Info */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <SafeProductImage
              src={details.image || "/images/products/placeholder.svg"}
              alt={details.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div>
            <h1 className="mb-3 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[42px]">{details.name}</h1>
            {details.subtitle && (
              <div className="mb-2 text-lg font-medium text-body-color dark:text-body-color-dark">{details.subtitle}</div>
            )}
            {details.model && (
              <div className="mb-4 text-sm text-body-color dark:text-body-color-dark">{details.model}</div>
            )}
            {details.overview && (
              isRichTextValue(details.overview) ? (
                <RichText data={details.overview} className="mb-6 text-base text-body-color dark:text-body-color-dark" />
              ) : (
                <p className="mb-6 text-base text-body-color dark:text-body-color-dark">{details.overview}</p>
              )
            )}
            {details.applicable && (
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">{productLabels.applicable}</h3>
                <p className="text-base text-body-color dark:text-body-color-dark">{details.applicable}</p>
              </div>
            )}

            {details.highlights && details.highlights.length > 0 && (
              <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  {t("detailLabels.highlights")}
                </h3>
                <ul className="space-y-3">
                  {details.highlights.map((hlt: string, idx: number) => (
                    <li key={idx} className="flex items-start text-base text-body-color dark:text-body-color-dark">
                      <span className="mr-3 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                        <svg width="12" height="12" viewBox="0 0 12 12" className="fill-current text-primary">
                          <path d="M10.2803 3.21967C10.5732 3.51256 10.5732 3.98744 10.2803 4.28033L5.28033 9.28033C4.98744 9.57322 4.51256 9.57322 4.21967 9.28033L1.71967 6.78033C1.42678 6.48744 1.42678 6.01256 1.71967 5.71967C2.01256 5.42678 2.48744 5.42678 2.78033 5.71967L4.75 7.68934L9.21967 3.21967C9.51256 2.92678 9.98744 2.92678 10.2803 3.21967Z" />
                        </svg>
                      </span>
                      <span>{hlt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Product Features */}
        {details.features?.length ? (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{productLabels.features}</h2>
            {(() => {
              const featuredCards = details.features.filter((feature: any) => Array.isArray(feature.media) && feature.media.length > 0);
              const textCards = details.features.filter((feature: any) => !Array.isArray(feature.media) || feature.media.length === 0);

              const renderFeatureCard = (feature: any, i: number, variant: "text" | "media") => {
                const featureMedia = Array.isArray(feature.media) ? feature.media : null;
                const isSingleFeatureShowcase = Boolean(featureMedia && featureMedia.length === 1);
                const isCompactSingleFeature =
                  slug === "uni-wr2" &&
                  isSingleFeatureShowcase &&
                  (feature.title === "便携随行的学习形态" ||
                    feature.title === "Portable learning form factor" ||
                    feature.title === "ポータブルな学習フォーム");
                const featureMediaGrid =
                  feature.mediaGridClassName ??
                  (
                    isSingleFeatureShowcase
                      ? "grid-cols-1 place-items-center gap-4"
                      : "grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  );
                const featureMediaAspect =
                  feature.mediaImageAspectClass ?? (isSingleFeatureShowcase ? "aspect-[16/10]" : "aspect-[4/3]");
                const featureMediaCard =
                  feature.mediaCardClassName ??
                  (
                    isCompactSingleFeature
                      ? "w-full max-w-[180px] p-2.5"
                      : isSingleFeatureShowcase
                        ? "w-full max-w-3xl p-4"
                        : "w-full max-w-[240px] p-3"
                  );

                return (
                  <div
                    key={`${feature.title ?? "feature"}-${i}`}
                    className={
                      variant === "media"
                        ? "rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark"
                        : "rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark"
                    }
                  >
                    <h4 className="mb-3 text-lg font-semibold text-black dark:text-white">{feature.title}</h4>
                    {feature.content && (
                      isRichTextValue(feature.content) ? (
                        <RichText data={feature.content} className="text-sm text-body-color dark:text-body-color-dark" />
                      ) : (
                        <p className="text-sm text-body-color dark:text-body-color-dark">{feature.content}</p>
                      )
                    )}
                    {featureMedia && featureMedia.length ? (
                      <div className="mt-4">
                        <ImageGridWithLightbox
                          items={featureMedia}
                          gridClassName={featureMediaGrid}
                          imageAspectClass={featureMediaAspect}
                          cardClassName={featureMediaCard}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              };

              return (
                <div className="flex flex-col gap-6">
                  {textCards.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {textCards.map((feature: any, i: number) => renderFeatureCard(feature, i, "text"))}
                    </div>
                  ) : null}
                  {featuredCards.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {featuredCards.map((feature: any, i: number) => renderFeatureCard(feature, i, "media"))}
                    </div>
                  ) : null}
                </div>
              );
            })()}
          </div>
        ) : null}

        {/* Sample Cases */}
        {sampleCases && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{productLabels.sampleCases}</h2>
            {sampleCases.description && (
              isRichTextValue(sampleCases.description) ? (
                <RichText data={sampleCases.description} className="mb-8 text-base text-body-color dark:text-body-color-dark" />
              ) : (
                <p className="mb-8 text-base text-body-color dark:text-body-color-dark">{sampleCases.description}</p>
              )
            )}
            {Array.isArray(sampleCases.sections) && sampleCases.sections.length > 0
              ? sampleCases.sections.map((section: { title?: string | null; items?: any[] }, idx: number) => {
              if (!section.items?.length) return null;
              const isSingleShowcase = idx === sampleCases.sections.length - 1 && section.items.length === 1;
              const isWideShowcase = slug === "rai-p4";
              return (
                <div key={idx} className="mb-8">
                  {section.title ? (
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                      {section.title}
                    </h3>
                  ) : null}
                  <ImageGridWithLightbox
                    items={section.items}
                    gridClassName={
                      isWideShowcase
                        ? "grid-cols-1 place-items-center gap-6"
                        : isSingleShowcase
                        ? "grid-cols-1 justify-items-center"
                        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    }
                    imageAspectClass={isWideShowcase ? "aspect-[21/10]" : isSingleShowcase ? "aspect-[16/10]" : "aspect-square"}
                    cardClassName={isWideShowcase ? "w-full max-w-5xl p-6" : isSingleShowcase ? "w-full max-w-4xl p-5" : ""}
                  />
                </div>
              );
            })
              : null}
          </div>
        )}

        {/* Configuration Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{productLabels.configuration}</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Sensor Config */}
            {details.sensorConfig && (
              <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{productLabels.sensorConfig}</h3>
                <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">{details.sensorConfig.description}</p>
                {details.sensorConfig.list?.length ? (
                  <ul className="list-disc pl-5 text-sm text-body-color dark:text-body-color-dark">
                    {details.sensorConfig.list.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}

            {/* Controller Config */}
            {details.controllerConfig && (
              <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{productLabels.controllerConfig}</h3>
                <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">{details.controllerConfig.description}</p>
                {details.controllerConfig.images?.length ? (
                  <div className="mt-4 grid grid-cols-1 place-items-center">
                    {details.controllerConfig.images.map((img: any, i: number) => (
                      <figure
                        key={i}
                        className="w-full max-w-md overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <SafeProductImage
                            src={img.src}
                            alt={img.alt || ""}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 600px"
                            unoptimized
                          />
                        </div>
                        {img.caption && (
                          <figcaption className="px-3 py-2 text-center text-xs text-body-color dark:text-body-color-dark">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
            )}

            {/* Software Config */}
            {softwareConfig && (
              <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{productLabels.softwareConfig}</h3>
                <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">{softwareConfig.description}</p>
                {softwareConfig.ecosystem && (
                  <p className="text-sm text-body-color dark:text-body-color-dark">{softwareConfig.ecosystem}</p>
                )}
                {softwareConfig.images?.length ? (
                  <div className="mt-8 flex flex-col gap-6">
                    {softwareConfig.images.map((img: any, i: number) => (
                      <figure key={i} className="flex flex-col gap-3">
                        <div className="relative h-16 w-full sm:h-20 lg:h-24">
                          <SafeProductImage
                            src={img.src}
                            alt={img.alt || "Software Ecosystem"}
                            fill
                            className="object-contain object-left"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                        </div>
                        {img.caption ? (
                          <figcaption className="text-sm text-body-color dark:text-body-color-dark">
                            {img.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
            )}

          </div>
        </div>

        {/* Experiments Section */}
        {details.experiments && Array.isArray((details.experiments as any).sections) && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{productLabels.experiments}</h2>

            {details.experiments.summary && (
              <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-6 dark:border-primary/30 dark:bg-primary/10">
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">{details.experiments.summary}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {(details.experiments as any).sections.map((section: any, i: number) => (
                <div key={i} className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                  <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{section.title}</h3>
                  {section.description && (
                    <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">{section.description}</p>
                  )}
                  {section.items?.length ? (
                    <ul className="space-y-2 text-sm text-body-color dark:text-body-color-dark">
                      {section.items.map((item: any, idx: number) => (
                        <li key={idx}>
                          <strong>{item.name}</strong>
                          {item.desc ? <>：{item.desc}</> : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Specs */}
        {/* Knowledge Base Redirect */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
              {locale === "zh" ? "知识库" : locale === "ja" ? "ナレッジベース" : "Knowledge Base"}
            </h3>
            <p className="text-sm text-body-color dark:text-body-color-dark">
              {locale === "zh" 
                ? "获取更多关于该产品的技术文档、使用教程及常见问题解答。"
                : locale === "ja"
                ? "この製品に関する詳細な技術ドキュメント、チュートリアル、よくある質問をご覧ください。"
                : "Get more technical documentation, tutorials, and FAQs about this product."}
            </p>
          </div>
          <Link
            href={`/${locale}/developers/knowledge-base`}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-base font-medium text-white hover:bg-primary/90 transition-colors"
          >
            {locale === "zh" ? "前往查看" : locale === "ja" ? "表示する" : "View Details"}
          </Link>
        </div>
      </div>

      {faqItems && faqItems.length > 0 && (
        <ProductsFAQ copy={{ title: faqData.title ?? "常见问题", items: faqItems }} />
      )}
    </section>
  );
};

export default ProductDetailsPage;
