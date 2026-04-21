import "dotenv/config";

import { getPayload } from "payload";
import config from "../../../payload.config";

const LOCALES = ["zh", "en", "ja"] as const;

type Locale = (typeof LOCALES)[number];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasBlock(blocks: any[], blockType: string): boolean {
  return blocks.some((b) => b?.blockType === blockType);
}

async function getPageBySlug(args: {
  payload: any;
  slug: string;
  locale: Locale;
}) {
  const { payload, slug, locale } = args;
  const res = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    locale,
    depth: 5,
    limit: 1,
    overrideAccess: true,
    draft: true,
  });
  return res.docs?.[0] ?? null;
}

async function main() {
  const payload = await getPayload({ config });

  const pageSlugs = [
    "products",
    "case-studies-practical-teaching",
    "case-studies-sci-tech-innovation",
    "case-studies-innovation-competition",
    "case-studies-training-base",
  ] as const;

  const categoriesByPageSlug: Partial<Record<(typeof pageSlugs)[number], string>> = {
    "case-studies-practical-teaching": "practical-teaching",
    "case-studies-sci-tech-innovation": "sci-tech-innovation",
    "case-studies-innovation-competition": "innovation-competition",
    "case-studies-training-base": "training-base",
  };

  for (const locale of LOCALES) {
    const siteSettings = await payload.findGlobal({
      slug: "siteSettings",
      locale,
      depth: 1,
      overrideAccess: true,
    });

    const ctaDefaults = (siteSettings as any)?.ctaDefaults ?? {};

    for (const slug of pageSlugs) {
      const page = await getPageBySlug({ payload, slug, locale });
      if (!page?.id) {
        // eslint-disable-next-line no-console
        console.warn(`[hydrate] missing page slug=${slug} locale=${locale}`);
        continue;
      }

      const nextIntro = { ...(page.intro ?? {}) } as any;
      const currentIntroDescription = nextIntro?.description;
      const seoDescription = page?.seo?.description;
      if (!isNonEmptyString(currentIntroDescription) && isNonEmptyString(seoDescription)) {
        nextIntro.description = seoDescription;
      }

      const blocks = Array.isArray(page.blocks) ? [...page.blocks] : [];

      if (slug === "products") {
        if (!hasBlock(blocks, "productsCatalog")) {
          blocks.unshift({
            blockType: "productsCatalog",
            coreTitle: (page as any)?.intro?.title ?? (page as any)?.title ?? "",
            coreDescription: (page as any)?.intro?.description ?? (page as any)?.seo?.description ?? "",
            viewDetailsCta: ctaDefaults?.viewDetailsCta ?? "View Details",
          });
        }
      } else {
        const category = categoriesByPageSlug[slug];
        if (category && !hasBlock(blocks, "caseStudiesList")) {
          blocks.unshift({
            blockType: "caseStudiesList",
            category,
            limit: 50,
          });
        }
      }

      const data: any = {};
      if (Object.keys(nextIntro ?? {}).length > 0) {
        data.intro = nextIntro;
      }

      if (blocks.length > 0) {
        data.blocks = blocks;
      }

      if (Object.keys(data).length === 0) {
        // eslint-disable-next-line no-console
        console.log(`[hydrate] skip slug=${slug} locale=${locale} (no changes)`);
        continue;
      }

      await payload.update({
        collection: "pages",
        id: page.id,
        locale,
        data,
        overrideAccess: true,
        draft: true,
      });

      // eslint-disable-next-line no-console
      console.log(`[hydrate] updated slug=${slug} locale=${locale}`);
    }
  }

  await Promise.race([
    (payload.db as any)?.destroy?.(),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
