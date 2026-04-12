import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

import config from "../../payload.config";

const PRODUCT_SLUG = "gx-mat-09s";
const LOCALES = ["zh", "en", "ja"] as const;

type Locale = (typeof LOCALES)[number];

type SampleCaseItem = {
  name: string;
  image: string;
};

type LocaleProductMessages = {
  sampleCases: {
    description: string;
    chassis: SampleCaseItem[];
    arms: SampleCaseItem[];
    compositeRobots: SampleCaseItem[];
  };
  controllerConfig?: {
    description?: string;
    images?: Array<{
      src: string;
      alt?: string;
      caption?: string;
    }>;
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
  return json.products.details[PRODUCT_SLUG] as LocaleProductMessages;
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
        ...product.sampleCases.chassis,
        ...product.sampleCases.arms,
        ...product.sampleCases.compositeRobots,
      ]) {
        const record = mediaPaths.get(item.image) ?? { zh: "", en: "", ja: "" };
        record[locale] = item.name;
        mediaPaths.set(item.image, record);
      }

      for (const image of product.controllerConfig?.images ?? []) {
        const record = mediaPaths.get(image.src) ?? { zh: "", en: "", ja: "" };
        record[locale] = image.alt ?? path.basename(image.src);
        mediaPaths.set(image.src, record);
      }
    }

    const mediaIdByPath = new Map<string, number | string>();
    for (const [sourcePath, altByLocale] of mediaPaths.entries()) {
      const id = await ensureMedia(payload, sourcePath, altByLocale);
      mediaIdByPath.set(sourcePath, id);
    }

    const sectionTitleByLocale = {
      zh: {
        chassis: "机器人底盘",
        arms: "机械臂构型",
        composites: "复合机器人",
      },
      en: {
        chassis: "Robot Chassis",
        arms: "Robotic Arm Configurations",
        composites: "Composite Robots",
      },
      ja: {
        chassis: "ロボットシャーシ",
        arms: "ロボットアーム構成",
        composites: "複合ロボット",
      },
    } as const;

    for (const locale of LOCALES) {
      const product = localized[locale];
      const controllerImages = (product.controllerConfig?.images ?? [])
        .map((image) => ({
          // controllerConfig is a JSON field, so keep literal asset paths instead of media IDs.
          src: image.src,
          alt: image.alt ?? "",
          caption: image.caption ?? "",
        }))
        .filter((image) => image.src);

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
              description: buildRichText(product.sampleCases.description),
              sections: [
                {
                  title: sectionTitleByLocale[locale].chassis,
                  items: product.sampleCases.chassis.map((item) => ({
                    name: item.name,
                    image: mediaIdByPath.get(item.image),
                  })),
                },
                {
                  title: sectionTitleByLocale[locale].arms,
                  items: product.sampleCases.arms.map((item) => ({
                    name: item.name,
                    image: mediaIdByPath.get(item.image),
                  })),
                },
                {
                  title: sectionTitleByLocale[locale].composites,
                  items: product.sampleCases.compositeRobots.map((item) => ({
                    name: item.name,
                    image: mediaIdByPath.get(item.image),
                  })),
                },
              ],
            },
            ...(product.controllerConfig
              ? {
                  controllerConfig: {
                    description: product.controllerConfig.description ?? "",
                    images: controllerImages,
                  },
                }
              : {}),
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
