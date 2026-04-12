import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

import config from "../../payload.config";

const PRODUCT_SLUG = "rai-m4";
const LOCALES = ["zh", "en", "ja"] as const;

type Locale = (typeof LOCALES)[number];

type SampleCaseItem = {
  name: string;
  image: string;
};

type LocaleProductMessages = {
  sampleCases?: {
    description?: string;
    sections?: Array<{
      title?: string;
      items?: SampleCaseItem[];
    }>;
  };
};

async function readProductMessages(locale: Locale): Promise<LocaleProductMessages> {
  const filePath = path.resolve(process.cwd(), "messages", locale, "products.json");
  const raw = await fs.readFile(filePath, "utf8");
  const json = JSON.parse(raw);
  return json.products.details[PRODUCT_SLUG] as LocaleProductMessages;
}

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

  if (existing.docs.length > 0) {
    return existing.docs[0].id as number | string;
  }

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
      depth: 0,
      draft: true,
    });

    if (!productRes.docs.length) {
      throw new Error(`Product not found: ${PRODUCT_SLUG}`);
    }

    const productId = productRes.docs[0].id;
    const mediaIdByPath = new Map<string, number | string>();

    for (const locale of LOCALES) {
      for (const section of localized[locale].sampleCases?.sections ?? []) {
        for (const item of section.items ?? []) {
          if (mediaIdByPath.has(item.image)) continue;
          const mediaId = await ensureMedia(payload, item.image, item.name);
          mediaIdByPath.set(item.image, mediaId);
        }
      }
    }

    for (const locale of LOCALES) {
      const product = localized[locale];
      const sections = (product.sampleCases?.sections ?? []).map((section) => ({
        title: section.title ?? "",
        items: (section.items ?? []).map((item) => ({
          name: item.name,
          image: mediaIdByPath.get(item.image),
        })),
      }));

      await payload.update({
        collection: "products",
        id: productId,
        locale,
        overrideAccess: true,
        data: {
          details: {
            sampleCases: {
              title:
                locale === "zh"
                  ? "样机案例"
                  : locale === "en"
                    ? "Sample Configurations"
                    : "サンプル構成",
              description: product.sampleCases?.description
                ? buildRichText(product.sampleCases.description)
                : null,
              sections,
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
