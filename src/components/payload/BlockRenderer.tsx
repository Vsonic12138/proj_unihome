import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import { CaseStudyGrid } from "@/components/Cases/CaseStudyGrid";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { NewsShowcase } from "@/components/News/NewsShowcase";
import SponsorLogos from "@/components/SponsorLogos";
import Contact from "@/components/Contact";
import RichText from "@/components/payload/RichText";
import ProductsGrid from "@/components/Products";
import {
  resolveMediaURL,
  tryGetPayloadClient,
  tryGetProductsCatalog,
  tryGetLatestNews,
  tryGetGlobals,
  toPayloadLocale,
  type ProductsCatalog,
} from "@/lib/payload";
import { clampNewsShowcaseLimit } from "@/lib/news";
import Image from "next/image";
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { getTranslations } from "next-intl/server";

type BlockRendererProps = {
  locale: string;
  blocks: unknown[];
  productsCatalog?: ProductsCatalog | null;
};

const BlockRenderer = async ({
  locale: stringLocale,
  blocks,
  productsCatalog: initialProductsCatalog,
}: BlockRendererProps) => {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  let productsCatalog = initialProductsCatalog;
  let hasFeaturedProducts = false;
  let featuredViewDetailsCta = "View Details";

  for (const block of blocks) {
    const blockType = (block as any)?.blockType;
    if (blockType === "features") {
      const slugs = ((block as any)?.featuredProducts?.slugs ?? [])
        .map((i: any) => (typeof i === "object" ? i?.slug : i))
        .filter(Boolean);
      if (slugs.length > 0) hasFeaturedProducts = true;
    }
  }

  if (hasFeaturedProducts) {
    const payload = await tryGetPayloadClient();
    if (payload) {
      const payloadLocale = toPayloadLocale(stringLocale);
      const globals = await tryGetGlobals({
        payload,
        locale: payloadLocale,
        depth: 1,
      });
      featuredViewDetailsCta = String(
        globals?.siteSettings?.ctaDefaults?.viewDetailsCta ?? "View Details",
      );

      if (!productsCatalog) {
        productsCatalog = await tryGetProductsCatalog({
          payload,
          locale: payloadLocale,
          // 产品目录属于“对外展示”的列表内容：即使在页面草稿预览，也只展示已发布产品
          draft: false,
        });
      }
    }
  }

  const locale = stringLocale;
  const contactFormMessages = await getTranslations({
    locale,
    namespace: "contact.form",
  });
  const newsMessages = await getTranslations({ locale, namespace: "news" });
  const contactCaptchaCopy = {
    captchaLoadingMessage: contactFormMessages("captchaLoadingMessage"),
    captchaReadyMessage: contactFormMessages("captchaReadyMessage"),
    captchaExpiredMessage: contactFormMessages("captchaExpiredMessage"),
    captchaErrorMessage: contactFormMessages("captchaErrorMessage"),
    captchaLoadingButtonLabel: contactFormMessages("captchaLoadingButtonLabel"),
    captchaReadyButtonLabel: contactFormMessages("captchaReadyButtonLabel"),
    captchaExpiredButtonLabel: contactFormMessages("captchaExpiredButtonLabel"),
    captchaErrorButtonLabel: contactFormMessages("captchaErrorButtonLabel"),
  };

  const renderBlock = async (block: any, index: number) => {
    try {
      const blockType = block?.blockType as string | undefined;
      if (!blockType) return null;

      if (blockType === "newsShowcase") {
        const payload = await tryGetPayloadClient();
        if (!payload) return null;

        const items = await tryGetLatestNews({
          payload,
          locale: toPayloadLocale(locale),
          limit: clampNewsShowcaseLimit((block as any)?.limit),
        });
        if (items.length === 0) return null;

        const title = String((block as any)?.title ?? "").trim();
        const description = String((block as any)?.description ?? "").trim();

        return (
          <NewsShowcase
            key={`block-${blockType}-${index}`}
            locale={locale}
            title={title || newsMessages("showcase.title")}
            description={description || newsMessages("showcase.description")}
            items={items}
            copy={{
              readMore: newsMessages("showcase.readMore"),
              categoryLabels: {
                company: newsMessages("category.company"),
                industry: newsMessages("category.industry"),
                media: newsMessages("category.media"),
              },
            }}
          />
        );
      }

      if (blockType === "productsCatalog") {
        const payload = await tryGetPayloadClient();
        const payloadLocale = toPayloadLocale(locale);
        if (!payload) return null;

        const globals = await tryGetGlobals({
          payload,
          locale: payloadLocale,
          depth: 1,
        });
        const ctaFallback =
          globals?.siteSettings?.ctaDefaults?.viewDetailsCta ?? "View Details";
        const viewDetailsCta = String(
          (block as any)?.viewDetailsCta ?? ctaFallback,
        );

        const catalog = await tryGetProductsCatalog({
          payload,
          locale: payloadLocale,
          // 产品目录属于“对外展示”的列表内容：即使在页面草稿预览，也只展示已发布产品
          draft: false,
        });

        const manualOrderEntries = Array.isArray((block as any)?.productOrder)
          ? (block as any).productOrder
          : [];
        const manualOrderIDs = manualOrderEntries
          .map((row: any) => row?.product)
          .map((p: any) => (typeof p === "object" ? p?.id : p))
          .map((v: any) => String(v ?? ""))
          .filter(Boolean);

        const rankByID = new Map<string, number>();
        for (let i = 0; i < manualOrderIDs.length; i++) {
          const id = manualOrderIDs[i];
          if (!rankByID.has(id)) rankByID.set(id, i);
        }

        const sortedSeries = (catalog.series ?? []).map((series) => {
          const items = Array.isArray(series.items) ? [...series.items] : [];

          if (rankByID.size > 0) {
            items.sort((a: any, b: any) => {
              const ar =
                rankByID.get(String(a?.id ?? "")) ?? Number.POSITIVE_INFINITY;
              const br =
                rankByID.get(String(b?.id ?? "")) ?? Number.POSITIVE_INFINITY;
              if (ar !== br) return ar - br;
              return 0;
            });
            return { ...series, items };
          }
          return series;
        });

        const seriesOrderEntries = Array.isArray((block as any)?.seriesOrder)
          ? (block as any).seriesOrder
          : [];
        const seriesOrderKeys = seriesOrderEntries
          .map((row: any) => row?.series)
          .map((s: any) =>
            typeof s === "object" ? (s?.id ?? s?.key ?? "") : s,
          )
          .map((v: any) => String(v ?? ""))
          .filter(Boolean);

        const seriesByKey = new Map<string, any>();
        for (const s of sortedSeries as any[]) {
          if (s?.key) seriesByKey.set(String(s.key), s);
        }

        const seriesById = new Map<string, any>();
        for (const s of sortedSeries as any[]) {
          if ((s as any)?.id) seriesById.set(String((s as any).id), s);
        }

        const orderedSeries: any[] = [];
        for (const k of seriesOrderKeys) {
          orderedSeries.push(seriesByKey.get(k) ?? seriesById.get(k));
        }
        const orderedSet = new Set(
          orderedSeries.filter(Boolean).map((s) => String(s.key)),
        );
        const remaining = sortedSeries.filter(
          (s: any) => !orderedSet.has(String(s?.key ?? "")),
        );
        const finalSeries = [...orderedSeries.filter(Boolean), ...remaining];

        const copy = {
          coreTitle: (block as any)?.coreTitle ?? "",
          coreDescription: (block as any)?.coreDescription ?? "",
          viewDetailsCta,
          series: finalSeries,
        };

        return (
          <ProductsGrid
            key={`block-${blockType}-${index}`}
            locale={locale}
            copy={copy}
          />
        );
      }

      if (blockType === "caseStudiesList") {
        const payload = await tryGetPayloadClient();
        const payloadLocale = toPayloadLocale(locale);
        if (!payload) return null;

        const category = String((block as any)?.category ?? "").trim();
        const limit = Number((block as any)?.limit ?? 50) || 50;
        if (!category) return null;

        const res = await payload.find({
          collection: "caseStudies",
          where: {
            and: [
              { category: { equals: category } },
              { _status: { equals: "published" } },
            ],
          },
          locale: payloadLocale,
          depth: 2,
          limit,
          sort: "sortOrder",
          overrideAccess: true,
        });

        const normalizedCases = (res.docs as any[])
          .map((doc) => ({
            id: doc?.id,
            title: typeof doc?.title === "string" ? doc.title : "",
            slug: typeof doc?.slug === "string" ? doc.slug : "",
            coverImage:
              doc?.coverImage && typeof doc.coverImage === "object"
                ? {
                    url: resolveMediaURL(doc.coverImage),
                    alt:
                      typeof doc.coverImage?.alt === "string"
                        ? doc.coverImage.alt
                        : null,
                  }
                : null,
            content:
              doc?.content && typeof doc.content === "object"
                ? doc.content
                : null,
          }))
          .filter((doc) => doc.id && doc.slug);

        return (
          <CaseStudyGrid
            key={`block-${blockType}-${index}`}
            cases={normalizedCases as any}
            locale={locale}
          />
        );
      }

      if (blockType === "hero") {
        const slides = ((block as any)?.slides ?? [])
          .map((slide: any) => {
            const mediaURL = resolveMediaURL(slide?.media);
            if (!mediaURL) return null;
            return {
              id: slide?.id,
              media: {
                kind: "image" as const,
                src: mediaURL,
                alt: slide?.alt,
              },
              action: slide?.action
                ? {
                    href: slide.action.href,
                    label: slide.action.label,
                  }
                : undefined,
            };
          })
          .filter(Boolean);

        return (
          <Hero
            key={`block-${blockType}-${index}`}
            copy={{
              autoPlayInterval: (block as any)?.autoPlayInterval,
              slides,
            }}
          />
        );
      }

      if (blockType === "features") {
        const featuredProductsSlugs = (
          (block as any)?.featuredProducts?.slugs ?? []
        )
          .map((item: any) => (typeof item === "object" ? item?.slug : item))
          .filter(Boolean);

        return (
          <Features
            key={`block-${blockType}-${index}`}
            locale={locale}
            copy={{
              ...(block as any),
              featuredProducts: {
                ...(block as any)?.featuredProducts,
                slugs: featuredProductsSlugs,
              },
            }}
            productsCatalog={productsCatalog}
            viewDetailsCta={featuredViewDetailsCta}
          />
        );
      }

      if (blockType === "sponsorLogos") {
        const logos = Array.isArray((block as any)?.logos)
          ? (block as any).logos
              .map((item: any) => ({
                name: String(item?.name ?? "").trim(),
                lightLogo: resolveMediaURL(item?.lightLogo),
                darkLogo: resolveMediaURL(item?.darkLogo),
                url: typeof item?.url === "string" ? item.url : undefined,
                openInNewTab: item?.openInNewTab,
              }))
              .filter((item: any) => item.name && item.lightLogo)
          : [];

        return (
          <SponsorLogos
            key={`block-${blockType}-${index}`}
            heading={(block as any)?.heading}
            description={(block as any)?.description}
            speed={(block as any)?.speed}
            pauseOnHover={(block as any)?.pauseOnHover}
            logos={logos}
          />
        );
      }

      if (blockType === "about") {
        const items = (block as any)?.items ?? [];
        const imageAlt = (block as any)?.imageAlt ?? "About Image";

        const sectionOneProps = {
          title: (block as any)?.title,
          description: (block as any)?.description,
          highlights: ((block as any)?.highlights ?? [])
            .map((h: any) => h?.text)
            .filter(Boolean),
          image: {
            src:
              resolveMediaURL((block as any)?.image) ||
              "/images/about/company-mascot.png",
            alt: imageAlt,
          },
        };

        return (
          <div key={`block-${blockType}-${index}`}>
            <AboutSectionOne sectionOne={sectionOneProps} />
            <AboutSectionTwo items={items} imageAlt={imageAlt} />
          </div>
        );
      }

      if (blockType === "richText") {
        return (
          <section
            key={`block-${blockType}-${index}`}
            className="py-8 md:py-12 lg:py-16"
          >
            <div className="container">
              <div className="dark:bg-dark-2 mx-auto w-full max-w-[1320px] rounded-2xl bg-white p-6 shadow-sm md:p-10">
                {(block as any)?.blockName && (
                  <h2 className="border-stroke dark:border-stroke-dark mb-8 border-b pb-6 text-2xl font-bold text-black sm:text-3xl dark:text-white">
                    {(block as any).blockName}
                  </h2>
                )}
                <RichText
                  data={(block as any)?.content}
                  className="prose dark:prose-invert prose-headings:text-black dark:prose-headings:text-white prose-p:text-body-color dark:prose-p:text-body-color-dark prose-li:text-body-color dark:prose-li:text-body-color-dark marker:text-primary max-w-none"
                />
              </div>
            </div>
          </section>
        );
      }

      if (blockType === "imageGallery") {
        const images = Array.isArray((block as any)?.images)
          ? (block as any).images
          : [];
        const title = (block as any)?.title;
        return (
          <section
            key={`block-${blockType}-${index}`}
            className="py-12 md:py-16 lg:py-20"
          >
            <div className="container">
              {title ? (
                <h2 className="mb-8 text-2xl font-semibold text-black dark:text-white">
                  {title}
                </h2>
              ) : null}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((item: any, imageIndex: number) => {
                  const src = resolveMediaURL(item?.image);
                  if (!src) return null;
                  const caption = item?.caption ?? "";
                  return (
                    <figure
                      key={`gallery-${index}-${imageIndex}`}
                      className="dark:bg-gray-dark/80 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10"
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={src}
                          alt={caption || "gallery-image"}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      {caption ? (
                        <figcaption className="text-body-color dark:text-body-color-dark px-4 py-3 text-sm">
                          {caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  );
                })}
              </div>
            </div>
          </section>
        );
      }

      if (blockType === "contact") {
        const cmsForm = (block as any)?.form ?? {};
        const intentionOptions = Array.isArray(cmsForm?.intentionOptions)
          ? cmsForm.intentionOptions
              .map((item: any) => item?.option)
              .filter(Boolean)
          : [];
        return (
          <Contact
            key={`block-${blockType}-${index}`}
            copy={{
              formTitle: (block as any)?.title,
              formDescription: (block as any)?.description,
              form: {
                nameLabel: cmsForm.nameLabel,
                namePlaceholder: cmsForm.namePlaceholder,
                emailLabel: cmsForm.emailLabel,
                emailPlaceholder: cmsForm.emailPlaceholder,
                phoneLabel: cmsForm.phoneLabel,
                phonePlaceholder: cmsForm.phonePlaceholder,
                intentionLabel: cmsForm.intentionLabel,
                intentionPlaceholder: cmsForm.intentionPlaceholder,
                intentionOptions,
                messageLabel: cmsForm.messageLabel,
                messagePlaceholder: cmsForm.messagePlaceholder,
                submit: cmsForm.submitLabel,
                submitLabel: cmsForm.submitLabel,
                submitSuccessMessage: cmsForm.submitSuccessMessage,
                submitErrorMessage: cmsForm.submitErrorMessage,
                captchaLoadingMessage: contactCaptchaCopy.captchaLoadingMessage,
                captchaReadyMessage: contactCaptchaCopy.captchaReadyMessage,
                captchaExpiredMessage: contactCaptchaCopy.captchaExpiredMessage,
                captchaErrorMessage: contactCaptchaCopy.captchaErrorMessage,
                captchaLoadingButtonLabel:
                  contactCaptchaCopy.captchaLoadingButtonLabel,
                captchaReadyButtonLabel:
                  contactCaptchaCopy.captchaReadyButtonLabel,
                captchaExpiredButtonLabel:
                  contactCaptchaCopy.captchaExpiredButtonLabel,
                captchaErrorButtonLabel:
                  contactCaptchaCopy.captchaErrorButtonLabel,
              },
            }}
          />
        );
      }

      return null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `[BlockRenderer] Failed to render block at index=${index}, type=${block?.blockType ?? "unknown"}`,
        error,
      );
      return null;
    }
  };

  return <>{await Promise.all(blocks.map(renderBlock))}</>;
};

export default BlockRenderer;
