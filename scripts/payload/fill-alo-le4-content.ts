import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

import config from "../../payload.config";

const PRODUCT_SLUG = "alo-le4";
const LOCALES = ["zh", "en", "ja"] as const;

type Locale = (typeof LOCALES)[number];

type GalleryItem = {
  name: string;
  image: string;
};

type LocaleProductMessages = {
  features?: Array<{
    title?: string;
    content?: string;
    media?: GalleryItem[];
  }>;
  sampleCases?: {
    sections?: Array<{
      title?: string | null;
      items?: GalleryItem[];
    }>;
  };
};

async function readProductMessages(locale: Locale): Promise<LocaleProductMessages> {
  const filePath = path.resolve(process.cwd(), "messages", locale, "products.json");
  const raw = await fs.readFile(filePath, "utf8");
  const json = JSON.parse(raw);
  return json.products.details[PRODUCT_SLUG] as LocaleProductMessages;
}

async function ensureMedia(payload: any, sourcePath: string, fallbackAlt: string) {
  const existing = await payload.find({
    collection: "media",
    where: { sourcePath: { equals: sourcePath } },
    limit: 1,
    overrideAccess: true,
    locale: "zh",
    depth: 0,
    draft: true,
  });

  if (existing.docs.length > 0) return existing.docs[0].id as number | string;

  const diskPath = path.resolve(process.cwd(), "public", sourcePath.replace(/^\//, ""));
  const created = await payload.create({
    collection: "media",
    overrideAccess: true,
    data: {
      sourcePath,
      alt: fallbackAlt,
    },
    filePath: diskPath,
  });

  return created.id as number | string;
}

async function main() {
  const payload = await getPayload({ config });

  try {
    const localized = {
      zh: await readProductMessages("zh"),
      en: await readProductMessages("en"),
      ja: await readProductMessages("ja"),
    };

    const productRes = await payload.find({
      collection: "products",
      where: { slug: { equals: PRODUCT_SLUG } },
      limit: 1,
      locale: "zh",
      overrideAccess: true,
      depth: 3,
      draft: true,
    });

    if (!productRes.docs.length) {
      throw new Error(`Product not found: ${PRODUCT_SLUG}`);
    }

    const productId = productRes.docs[0].id;

    const sourcePaths = [
      "/images/products/alo-le4/module-overview.png",
      "/images/products/alo-le4/front-view.png",
      "/images/products/alo-le4/top-view.png",
    ] as const;

    const mediaIdByPath = new Map<string, number | string>();
    for (const sourcePath of sourcePaths) {
      const mediaId = await ensureMedia(payload, sourcePath, path.basename(sourcePath));
      mediaIdByPath.set(sourcePath, mediaId);
    }

    for (const locale of LOCALES) {
      const current = await payload.findByID({
        collection: "products",
        id: productId,
        locale,
        depth: 3,
        overrideAccess: true,
        draft: true,
      });

      const messageDetails = localized[locale];
      const messageFeatures = messageDetails.features ?? [];
      const messageSections = messageDetails.sampleCases?.sections ?? [];

      const updatedFeatures = (current.details?.features ?? []).map((feature: any, index: number) => {
        const media = index === 0 ? [] : messageFeatures[index]?.media ?? [];

        return {
          ...feature,
          image: null,
          gallery: media.map((item) => ({
            name: item.name,
            image: mediaIdByPath.get(item.image),
          })),
        };
      });

      const updatedSections = messageSections.map((section) => ({
        title: null,
        items: [
          {
            name:
              locale === "zh"
                ? "平台模块构成"
                : locale === "en"
                  ? "Platform module overview"
                  : "プラットフォームモジュール構成",
            image: mediaIdByPath.get("/images/products/alo-le4/module-overview.png"),
          },
          ...((section.items ?? [])
            .filter((item) => item.image !== "/images/products/alo-le4/front-view.png")
            .map((item) => ({
              name: item.name,
              image: mediaIdByPath.get(item.image),
            }))),
        ],
      }));

      await payload.update({
        collection: "products",
        id: productId,
        locale,
        overrideAccess: true,
        data: {
          details: {
            features: updatedFeatures,
            sampleCases: {
              ...(current.details?.sampleCases ?? {}),
              description: null,
              sections: updatedSections,
            },
          },
        },
      });

      // eslint-disable-next-line no-console
      console.log(`[${locale}] ALO-LE4 content updated`);
    }
  } finally {
    await Promise.race([
      payload.db.destroy(),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
    process.exit(0);
  }
}

await main();
