import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

import config from "../../payload.config";

const PRODUCT_SLUG = "ubot-mr40";
const LOCALES = ["zh", "en", "ja"] as const;

type Locale = (typeof LOCALES)[number];

type SampleCaseItem = {
  name: string;
  image: string;
};

type LocaleProductMessages = {
  sampleCases: {
    description: string;
    modules: SampleCaseItem[];
    chassis: SampleCaseItem[];
    arms: SampleCaseItem[];
    compositeRobots: SampleCaseItem[];
  };
  detailLabels?: {
    sampleCases?: string;
    modules?: string;
    chassis?: string;
    arms?: string;
    compositeRobots?: string;
  };
};

function buildRichText(text: string) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      children: [
        {
          type: "paragraph",
          format: "",
          indent: 0,
          version: 1,
          children: [
            {
              mode: "normal",
              text,
              type: "text",
              style: "",
              detail: 0,
              format: 0,
              version: 1,
            },
          ],
        },
      ],
      direction: "ltr",
    },
  };
}

async function readProductMessages(locale: Locale): Promise<LocaleProductMessages> {
  const filePath = path.resolve(process.cwd(), "messages", locale, "products.json");
  const raw = await fs.readFile(filePath, "utf8");
  const json = JSON.parse(raw);
  const details = json.products?.details ?? {};
  const product = details[PRODUCT_SLUG];

  if (!product?.sampleCases) {
    throw new Error(`Missing message product details for ${PRODUCT_SLUG} in locale ${locale}`);
  }

  return {
    sampleCases: product.sampleCases,
    detailLabels: json.products?.detailLabels ?? {},
  };
}

async function ensureMedia(
  payload: any,
  sourcePath: string,
  altByLocale: Record<Locale, string>,
) {
  const existing = await payload.find({
    collection: "media",
    where: { sourcePath: { equals: sourcePath } },
    limit: 1,
    overrideAccess: true,
    locale: "zh",
    depth: 0,
    draft: true,
  });

  if (existing.docs.length > 0) {
    const doc = existing.docs[0];
    for (const locale of LOCALES) {
      await payload.update({
        collection: "media",
        id: doc.id,
        locale,
        overrideAccess: true,
        data: { alt: altByLocale[locale] },
      });
    }

    return doc.id as number | string;
  }

  const diskPath = path.resolve(process.cwd(), "public", sourcePath.replace(/^\//, ""));
  const created = await payload.create({
    collection: "media",
    overrideAccess: true,
    data: {
      sourcePath,
      alt: altByLocale.zh,
    },
    filePath: diskPath,
  });

  for (const locale of LOCALES) {
    if (locale === "zh") continue;
    await payload.update({
      collection: "media",
      id: created.id,
      locale,
      overrideAccess: true,
      data: { alt: altByLocale[locale] },
    });
  }

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
      depth: 0,
      draft: true,
    });

    if (!productRes.docs.length) {
      throw new Error(`Product not found: ${PRODUCT_SLUG}`);
    }

    const productId = productRes.docs[0].id;

    const mediaPaths = new Map<
      string,
      {
        zh: string;
        en: string;
        ja: string;
      }
    >();

    for (const locale of LOCALES) {
      const product = localized[locale];
      for (const item of [
        ...product.sampleCases.modules,
        ...product.sampleCases.chassis,
        ...product.sampleCases.arms,
        ...product.sampleCases.compositeRobots,
      ]) {
        const record = mediaPaths.get(item.image) ?? { zh: "", en: "", ja: "" };
        record[locale] = item.name;
        mediaPaths.set(item.image, record);
      }
    }

    const mediaIdByPath = new Map<string, number | string>();
    for (const [sourcePath, altByLocale] of mediaPaths.entries()) {
      const id = await ensureMedia(payload, sourcePath, altByLocale);
      mediaIdByPath.set(sourcePath, id);
    }

    for (const locale of LOCALES) {
      const product = localized[locale];

      await payload.update({
        collection: "products",
        id: productId,
        locale,
        overrideAccess: true,
        data: {
          _status: "published",
          details: {
            sampleCases: {
              title: product.detailLabels?.sampleCases ?? null,
              description: buildRichText(product.sampleCases.description),
              sections: [
                {
                  title: product.detailLabels?.modules ?? null,
                  items: product.sampleCases.modules.map((item) => ({
                    name: item.name,
                    image: mediaIdByPath.get(item.image),
                  })),
                },
                {
                  title: product.detailLabels?.chassis ?? null,
                  items: product.sampleCases.chassis.map((item) => ({
                    name: item.name,
                    image: mediaIdByPath.get(item.image),
                  })),
                },
                {
                  title: product.detailLabels?.arms ?? null,
                  items: product.sampleCases.arms.map((item) => ({
                    name: item.name,
                    image: mediaIdByPath.get(item.image),
                  })),
                },
                {
                  title: product.detailLabels?.compositeRobots ?? null,
                  items: product.sampleCases.compositeRobots.map((item) => ({
                    name: item.name,
                    image: mediaIdByPath.get(item.image),
                  })),
                },
              ],
            },
          },
        },
      });

      // eslint-disable-next-line no-console
      console.log(`[${locale}] sampleCases updated`);
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
