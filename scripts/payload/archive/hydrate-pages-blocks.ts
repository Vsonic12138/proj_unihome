import "dotenv/config";

import { getPayload } from "payload";
import config from "../../../payload.config";

const LOCALES = ["zh", "en", "ja"] as const;

type Locale = (typeof LOCALES)[number];

function isBlockType(block: any, blockType: string) {
  return Boolean(block && typeof block === "object" && block.blockType === blockType);
}

function ensureBlock(args: {
  blocks: any;
  blockType: string;
  create: () => any;
}) {
  const list = Array.isArray(args.blocks) ? [...args.blocks] : [];
  if (list.some((b) => isBlockType(b, args.blockType))) {
    return { changed: false, blocks: list };
  }
  return { changed: true, blocks: [args.create(), ...list] };
}

async function getPageBySlug(payload: any, slug: string, locale: Locale) {
  const res = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 5,
    locale,
    overrideAccess: true,
    draft: true,
  });
  return res.docs?.[0] ?? null;
}

async function main() {
  const payload = await getPayload({ config });

  const caseListPages: Array<{ slug: string; category: string }> = [
    { slug: "case-studies-practical-teaching", category: "practical-teaching" },
    { slug: "case-studies-sci-tech-innovation", category: "sci-tech-innovation" },
    { slug: "case-studies-innovation-competition", category: "innovation-competition" },
    { slug: "case-studies-training-base", category: "training-base" },
  ];

  const productsPageSlug = "products";

  for (const locale of LOCALES) {
    // 1) Hydrate products page intro + catalog block
    const productsPage = await getPageBySlug(payload, productsPageSlug, locale);
    if (productsPage) {
      const siteSettings = await payload.findGlobal({
        slug: "siteSettings",
        locale,
        overrideAccess: true,
        depth: 1,
      });

      const intro = productsPage.intro ?? {};
      const nextIntroDescription = intro.description ?? productsPage?.seo?.description ?? null;
      const introChanged = !productsPage.intro?.description && Boolean(nextIntroDescription);

      const ctaDefaults = (siteSettings as any)?.ctaDefaults ?? {};
      const ensured = ensureBlock({
        blocks: (productsPage as any)?.blocks,
        blockType: "productsCatalog",
        create: () => ({
          blockType: "productsCatalog",
          coreTitle: (productsPage as any)?.intro?.title ?? (productsPage as any)?.title ?? "",
          coreDescription: (productsPage as any)?.intro?.description ?? (productsPage as any)?.seo?.description ?? "",
          viewDetailsCta: ctaDefaults.viewDetailsCta ?? "View Details",
        }),
      });

      const shouldUpdate = introChanged || ensured.changed;

      if (shouldUpdate) {
        // eslint-disable-next-line no-console
        console.log(
          `[hydrate] pages/products locale=${locale} intro=${introChanged ? "set" : "skip"} blocks=${ensured.changed ? "add-productsCatalog" : "skip"}`,
        );

        const data: any = {
          blocks: ensured.blocks,
        };
        if (introChanged) {
          data.intro = {
            ...(productsPage.intro ?? {}),
            description: nextIntroDescription,
          };
        }

        await payload.update({
          collection: "pages",
          id: productsPage.id,
          locale,
          overrideAccess: true,
          data,
          draft: true,
        });
      }
    }

    // 2) Hydrate case-studies list pages intro + list block
    for (const p of caseListPages) {
      const page = await getPageBySlug(payload, p.slug, locale);
      if (!page) continue;

      const intro = page.intro ?? {};
      const nextIntroDescription = intro.description ?? page?.seo?.description ?? null;
      const introChanged = !page.intro?.description && Boolean(nextIntroDescription);

      const ensured = ensureBlock({
        blocks: (page as any)?.blocks,
        blockType: "caseStudiesList",
        create: () => ({
          blockType: "caseStudiesList",
          category: p.category,
          limit: 50,
        }),
      });

      const shouldUpdate = introChanged || ensured.changed;

      if (shouldUpdate) {
        // eslint-disable-next-line no-console
        console.log(
          `[hydrate] pages/${p.slug} locale=${locale} intro=${introChanged ? "set" : "skip"} blocks=${ensured.changed ? "add-caseStudiesList" : "skip"}`,
        );

        const data: any = {
          blocks: ensured.blocks,
        };
        if (introChanged) {
          data.intro = {
            ...(page.intro ?? {}),
            description: nextIntroDescription,
          };
        }

        await payload.update({
          collection: "pages",
          id: page.id,
          locale,
          overrideAccess: true,
          data,
          draft: true,
        });
      }
    }
  }

  await Promise.race([
    (payload.db as any)?.destroy?.(),
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ]);
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
