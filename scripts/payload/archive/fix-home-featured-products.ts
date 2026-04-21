import "dotenv/config";

import { getPayload } from "payload";

import config from "../../../payload.config";

const LOCALES = ["zh", "en", "ja"] as const;
const TARGET_PAGE_SLUG = "home";
const TARGET_BLOCK_TITLE = {
  zh: "产品平台",
  en: "Product Platform",
  ja: "プロダクトプラットフォーム",
} as const;
const TARGET_PRODUCT_SLUGS = ["ubot-mr40", "gx-mat-09s", "rai-p4"] as const;

type Locale = (typeof LOCALES)[number];

const INTERNAL_DOC_KEYS = new Set([
  "id",
  "createdAt",
  "updatedAt",
  "url",
  "thumbnailURL",
  "filesize",
  "width",
  "height",
  "focalX",
  "focalY",
  "sizes",
  "mimeType",
  "_status",
]);

const MEDIA_FIELD_NAMES = new Set([
  "media",
  "image",
  "heroImage",
  "coverImage",
  "logo",
  "logoInverse",
  "qrImage",
]);

const PRODUCT_FIELD_NAMES = new Set(["product"]);
const PRODUCT_ARRAY_FIELD_NAMES = new Set(["product", "slugs"]);
const SERIES_FIELD_NAMES = new Set(["series"]);
const FOLDER_FIELD_NAMES = new Set(["folder", "parent"]);

function toRelationshipID(value: unknown): number | string | null {
  if (!value || typeof value !== "object") return null;
  const objectValue = value as Record<string, unknown>;
  return "id" in objectValue ? (objectValue.id as number | string) : null;
}

function sanitizeRelationships(value: unknown, keyName?: string, fallbackValue?: unknown): unknown {
  if (Array.isArray(value)) {
    if (PRODUCT_ARRAY_FIELD_NAMES.has(String(keyName))) {
      return value
        .map((item, index) =>
          sanitizeRelationships(
            item,
            "product",
            Array.isArray(fallbackValue) ? fallbackValue[index] : undefined,
          ),
        )
        .filter((item) => item !== null && item !== undefined);
    }

    return value.map((item, index) =>
      sanitizeRelationships(
        item,
        keyName,
        Array.isArray(fallbackValue) ? fallbackValue[index] : undefined,
      ),
    );
  }

  if (!value || typeof value !== "object") {
    if (
      (MEDIA_FIELD_NAMES.has(String(keyName)) ||
        PRODUCT_FIELD_NAMES.has(String(keyName)) ||
        SERIES_FIELD_NAMES.has(String(keyName)) ||
        FOLDER_FIELD_NAMES.has(String(keyName))) &&
      (value === null || value === undefined)
    ) {
      return toRelationshipID(fallbackValue);
    }

    return value;
  }

  const objectValue = value as Record<string, unknown>;

  if (MEDIA_FIELD_NAMES.has(String(keyName)) && "id" in objectValue) {
    return objectValue.id as number | string;
  }

  if (PRODUCT_FIELD_NAMES.has(String(keyName)) && "id" in objectValue) {
    return objectValue.id as number | string;
  }

  if (SERIES_FIELD_NAMES.has(String(keyName)) && "id" in objectValue) {
    return objectValue.id as number | string;
  }

  if (FOLDER_FIELD_NAMES.has(String(keyName)) && "id" in objectValue) {
    return objectValue.id as number | string;
  }

  const next: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(objectValue)) {
    if (INTERNAL_DOC_KEYS.has(key)) continue;
    next[key] = sanitizeRelationships(
      nested,
      key,
      fallbackValue && typeof fallbackValue === "object"
        ? (fallbackValue as Record<string, unknown>)[key]
        : undefined,
    );
  }
  return next;
}

async function main() {
  if ((config as any)?.db) {
    (config as any).db.push = false;
  }

  const payload = await getPayload({ config });

  const productIdBySlug = new Map<string, number | string>();

  for (const locale of LOCALES) {
    const products = await payload.find({
      collection: "products",
      locale,
      draft: true,
      overrideAccess: true,
      limit: 100,
      where: {
        slug: { in: [...TARGET_PRODUCT_SLUGS] },
      },
    });

    for (const product of products.docs as Array<any>) {
      if (product?.slug && product?.id) {
        productIdBySlug.set(String(product.slug), product.id);
      }
    }
  }

  const targetProductIds = TARGET_PRODUCT_SLUGS
    .map((slug) => productIdBySlug.get(slug))
    .filter(Boolean) as Array<number | string>;

  if (targetProductIds.length !== TARGET_PRODUCT_SLUGS.length) {
    throw new Error(`Missing target products. Expected ${TARGET_PRODUCT_SLUGS.length}, got ${targetProductIds.length}`);
  }

  const homePageRes = await payload.find({
    collection: "pages",
    locale: "zh",
    draft: true,
    overrideAccess: true,
    limit: 1,
    where: {
      slug: { equals: TARGET_PAGE_SLUG },
    },
    depth: 2,
  });

  const homePage = homePageRes.docs?.[0] as any;
  if (!homePage?.id) {
    throw new Error(`Home page not found for slug=${TARGET_PAGE_SLUG}`);
  }

  for (const locale of LOCALES) {
    const localizedPageRes = await payload.find({
      collection: "pages",
      locale,
      draft: true,
      overrideAccess: true,
      limit: 1,
      where: {
        slug: { equals: TARGET_PAGE_SLUG },
      },
      depth: 2,
    });

    const localizedPage = localizedPageRes.docs?.[0] as any;
    if (!localizedPage?.id) continue;

    const blocks = Array.isArray(localizedPage.blocks) ? localizedPage.blocks : [];
    const canonicalBlocks = Array.isArray(homePage.blocks) ? homePage.blocks : [];
    const nextBlocks = blocks.map((block: any) => {
      const fallbackBlock =
        canonicalBlocks.find((candidate: any) => candidate?.id === block?.id) ??
        canonicalBlocks.find((candidate: any, index: number) => index === blocks.indexOf(block));
      const sanitizedBlock = sanitizeRelationships(block, undefined, fallbackBlock) as Record<string, unknown>;
      const isTargetBlock =
        block?.blockType === "features" &&
        String(block?.title ?? "").trim() === TARGET_BLOCK_TITLE[locale];

      if (!isTargetBlock) return sanitizedBlock;

      return {
        ...sanitizedBlock,
        featuredProducts: {
          ...((sanitizedBlock?.featuredProducts as Record<string, unknown> | undefined) ?? {}),
          slugs: targetProductIds,
        },
      };
    });

    await payload.update({
      collection: "pages",
      id: localizedPage.id,
      locale,
      draft: localizedPage._status !== "published",
      overrideAccess: true,
      data: {
        blocks: nextBlocks,
      },
    });

    // eslint-disable-next-line no-console
    console.log(`[fix] locale=${locale} updated home features block with featured products`);
  }

  await Promise.race([
    (payload.db as any)?.destroy?.(),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  process.exit(0);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
