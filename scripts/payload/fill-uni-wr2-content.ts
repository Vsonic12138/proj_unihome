import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

import config from "../../payload.config";

const PRODUCT_SLUG = "uni-wr2";
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
  }>;
  sampleCases?: {
    description?: string;
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
      "/images/products/uni-wr2/uni-wr2-feature-charging.png",
      "/images/products/uni-wr2/uni-wr2-feature-deploy-1.png",
      "/images/products/uni-wr2/uni-wr2-feature-deploy-2.png",
      "/images/products/uni-wr2/uni-wr2-feature-portable.png",
      "/images/products/uni-wr2/uni-wr2-software-ubuntu.png",
      "/images/products/uni-wr2/uni-wr2-software-ros.png",
      "/images/products/uni-wr2/uni-wr2-bom.png",
      "/images/products/uni-wr2/uni-wr2-dimensions.png",
      "/images/products/uni-wr2/uni-wr2-exterior-overview.png",
    ] as const;

    const mediaIdByPath = new Map<string, number | string>();
    for (const sourcePath of sourcePaths) {
      const mediaId = await ensureMedia(payload, sourcePath, path.basename(sourcePath));
      mediaIdByPath.set(sourcePath, mediaId);
    }

    const featureGalleryByLocale: Record<Locale, Record<string, GalleryItem[]>> = {
      zh: {
        "便携随行的学习形态": [
          { name: "Type-C 充电设计", image: "/images/products/uni-wr2/uni-wr2-feature-charging.png" },
        ],
        "桌面级 SLAM 实验环境": [
          { name: "敏捷部署示例 1", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-1.png" },
          { name: "敏捷部署示例 2", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-2.png" },
          { name: "便携随行示意", image: "/images/products/uni-wr2/uni-wr2-feature-portable.png" },
        ],
        "ROS 工程化部署拆解": [
          { name: "Ubuntu 系统图标", image: "/images/products/uni-wr2/uni-wr2-software-ubuntu.png" },
          { name: "ROS 平台图标", image: "/images/products/uni-wr2/uni-wr2-software-ros.png" },
        ],
      },
      en: {
        "Portable learning form factor": [
          { name: "Type-C charging", image: "/images/products/uni-wr2/uni-wr2-feature-charging.png" },
        ],
        "Desktop SLAM environment": [
          { name: "Agile deployment (1)", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-1.png" },
          { name: "Agile deployment (2)", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-2.png" },
          { name: "Portable design", image: "/images/products/uni-wr2/uni-wr2-feature-portable.png" },
        ],
        "ROS engineering workflow": [
          { name: "Ubuntu logo", image: "/images/products/uni-wr2/uni-wr2-software-ubuntu.png" },
          { name: "ROS logo", image: "/images/products/uni-wr2/uni-wr2-software-ros.png" },
        ],
      },
      ja: {
        "ポータブルな学習フォーム": [
          { name: "Type-C充電", image: "/images/products/uni-wr2/uni-wr2-feature-charging.png" },
        ],
        "卓上SLAM環境": [
          { name: "敏捷配置（1）", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-1.png" },
          { name: "敏捷配置（2）", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-2.png" },
          { name: "携帯イメージ", image: "/images/products/uni-wr2/uni-wr2-feature-portable.png" },
        ],
        "ROSエンジニアリングワークフロー": [
          { name: "Ubuntu ロゴ", image: "/images/products/uni-wr2/uni-wr2-software-ubuntu.png" },
          { name: "ROS ロゴ", image: "/images/products/uni-wr2/uni-wr2-software-ros.png" },
        ],
      },
    };

    const sampleCasesByLocale: Record<Locale, { title: string; items: GalleryItem[] }> = {
      zh: {
        title: "样机案例",
        items: [
          { name: "外观总览", image: "/images/products/uni-wr2/uni-wr2-exterior-overview.png" },
          { name: "外形尺寸", image: "/images/products/uni-wr2/uni-wr2-dimensions.png" },
          { name: "BOM 组件示意", image: "/images/products/uni-wr2/uni-wr2-bom.png" },
        ],
      },
      en: {
        title: "Sample Configurations",
        items: [
          { name: "Exterior overview", image: "/images/products/uni-wr2/uni-wr2-exterior-overview.png" },
          { name: "Dimension reference", image: "/images/products/uni-wr2/uni-wr2-dimensions.png" },
          { name: "BOM breakdown", image: "/images/products/uni-wr2/uni-wr2-bom.png" },
        ],
      },
      ja: {
        title: "サンプル構成",
        items: [
          { name: "外観概要", image: "/images/products/uni-wr2/uni-wr2-exterior-overview.png" },
          { name: "外形寸法", image: "/images/products/uni-wr2/uni-wr2-dimensions.png" },
          { name: "BOM構成図", image: "/images/products/uni-wr2/uni-wr2-bom.png" },
        ],
      },
    };

    for (const locale of LOCALES) {
      const current = await payload.findByID({
        collection: "products",
        id: productId,
        locale,
        depth: 3,
        overrideAccess: true,
        draft: true,
      });

      const updatedFeatures = (current.details?.features ?? []).map((feature: any) => {
        const gallery = featureGalleryByLocale[locale][feature.title ?? ""] ?? [];
        return {
          ...feature,
          image: null,
          gallery: gallery.map((item) => ({
            name: item.name,
            image: mediaIdByPath.get(item.image),
          })),
        };
      });

      await payload.update({
        collection: "products",
        id: productId,
        locale,
        overrideAccess: true,
        data: {
          details: {
            features: updatedFeatures,
            sampleCases: {
              title: sampleCasesByLocale[locale].title,
              description: null,
              sections: [
                {
                  title: null,
                  items: sampleCasesByLocale[locale].items.map((item) => ({
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
      console.log(`[${locale}] UNI-WR2 content updated`);
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
