import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import config from "../../payload.config.ts";

function genId(key: string): string {
  return crypto.createHash("md5").update(key).digest("hex").substring(0, 24);
}

type Locale = "zh" | "en" | "ja";
const LOCALES: Locale[] = ["zh", "en", "ja"];

async function readJSON(locale: Locale, filename: string): Promise<any> {
  const filePath = path.resolve(process.cwd(), "messages", locale, filename);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function buildBlocks(pagesData: any, key: string, slug: string): any[] {
  const categories = pagesData?.pages?.[key]?.categories ?? [];
  return categories.map((cat: any, i: number) => {
    return {
      blockType: "features",
      blockName: cat.title,
      title: cat.title,
      paragraph: cat.description,
      highlights: (cat.projects ?? []).map((proj: any) => ({
        title: proj.name,
        description: proj.description,
        link: proj.link,
        tags: (proj.tags ?? []).join(","),
      })),
    };
  });
}

async function main() {
  const payload = await getPayload({ config });

  try {
    const slug = "developers-knowledge-base";
    const key = "knowledgeBase";

    // 查找已有文档
    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    });

    const pageId = existing.docs[0]?.id;

    // 逐语言更新，因为 blocks 是 localized:true
    for (const locale of LOCALES) {
      const pagesData = await readJSON(locale, "pages.json");
      const blocks = buildBlocks(pagesData, key, slug);

      const data: any = {
        title: pagesData?.pages?.[key]?.title ?? slug,
        seo: {
          title: pagesData?.pages?.[key]?.title ?? slug,
          description: pagesData?.pages?.[key]?.description ?? "",
        },
        blocks,
      };

      if (!pageId) {
        // 仅使用 zh 创建，其他语言下面 update
        if (locale === "zh") {
          const created = await payload.create({
            collection: "pages",
            data: { ...data, slug },
            locale,
            overrideAccess: true,
            draft: false,
          });
          console.log(`[${locale}] Created page id=${created.id}`);
        }
      } else {
        await payload.update({
          collection: "pages",
          id: pageId,
          data,
          locale,
          overrideAccess: true,
          draft: false,
        });
        console.log(`[${locale}] Updated page id=${pageId}, blocks=${blocks.length}`);
      }
    }

    console.log("Knowledge base page seeded successfully.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await Promise.race([
      (payload.db as any)?.destroy?.(),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
    process.exit(0);
  }
}

await main();
