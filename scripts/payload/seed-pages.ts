import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import config from "../../payload.config";

function genId(key: string): string {
  return crypto.createHash("md5").update(key).digest("hex").substring(0, 24);
}

type Locale = "zh" | "en" | "ja";
const LOCALES: Locale[] = ["zh", "en", "ja"];

async function readMessagesJSON(locale: Locale, filename: string): Promise<any> {
  const filePath = path.resolve(process.cwd(), "messages", locale, filename);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

async function main() {
  const payload = await getPayload({ config });

  try {
    const pagesToSeed = [
      { slug: "about", key: "about" },
      { slug: "contact", key: "contact" },
      { slug: "products", key: "products" },
      { slug: "developers", key: "developerServices" },
      // { slug: "developers-knowledge-base", key: "knowledgeBase" }, // we have a separate script for this now
      { slug: "developers-open-source", key: "openSource" },
      { slug: "custom-solutions", key: "customSolutions" },
      { slug: "case-studies", key: "caseStudies" },
      { slug: "case-studies-practical-teaching", key: "casePracticalTeaching" },
      { slug: "case-studies-sci-tech-innovation", key: "caseSciTechInnovation" },
      { slug: "case-studies-innovation-competition", key: "caseInnovationCompetition" },
      { slug: "case-studies-training-base", key: "caseTrainingBase" },
    ];

    for (const item of pagesToSeed) {
      const { slug, key } = item;

      // 查找已有页面ID
      const existing = await payload.find({
        collection: "pages",
        where: { slug: { equals: slug } },
        limit: 1,
      });
      const pageId = existing.docs.length > 0 ? existing.docs[0].id : null;

      // 遍历所有语言，逐一写入避免 localized blocks 错误
      for (const locale of LOCALES) {
        const pagesData = await readMessagesJSON(locale, "pages.json");
        const homeData = await readMessagesJSON(locale, "home.json");
        const contactData = await readMessagesJSON(locale, "contact.json");

        const featOpenSrcTitles = { zh: "开源硬件生态", en: "Open Source Hardware Ecosystem", ja: "オープンソースハードウェアエコシステム" };
        const featOpenSrcDescs = { 
          zh: "在此开源模块中涉及的各项技术，均可直接应用于我司的以下硬件机器人平台中，方便开发者实现即拿即用的开源验证。", 
          en: "The technologies covered in this open-source module can be directly applied to our robot hardware platforms below, facilitating ready-to-use open-source validation for developers.", 
          ja: "このオープンソースモジュールに含まれる技術は、以下のハードウェアプラットフォームに直接適用でき、開発者はすぐにオープンソース検証を実施できます。" 
        };
        const ctaOpenSrc = { zh: "想要完整体验开源代码的功能？", en: "Want to fully experience the open-source code?", ja: "オープンソースコードを完全に体験したいですか？" };
        const btnOpenSrc = { zh: "去挑选设备", en: "Pick a Platform", ja: "デバイスを選ぶ" };

        const featCustomTitles = { zh: "支持深度定制的核心平台", en: "Core Platforms for Deep Customization", ja: "カスタマイズ対応のコアプラットフォーム" };
        const featCustomDescs = { 
          zh: "对于有特殊业务需求的企业及科研单位，我们提供了以下标准平台作为深度定制与二次开发的基石。", 
          en: "For enterprises and research institutes with special business needs, we offer the following standard platforms as the foundation for deep customization and secondary development.", 
          ja: "特殊なビジネスニーズを持つ企業や研究機関向けに、深いカスタマイズと二次開発の基盤として以下の標準プラットフォームを提供しています。" 
        };
        const ctaCustom = { zh: "需要基于现有平台二次开发？", en: "Need secondary development based on existing platforms?", ja: "既存プラットフォームに基づく二次開発が必要ですか？" };
        const btnCustom = { zh: "查看核心载体", en: "View Core Carriers", ja: "コアデバイスを見る" };

        let blocks: any[] = [];

        if (key === "about") {
            blocks = [{
              blockType: "about",
              blockName: locale === "en" ? "Company Vision & History" : (locale === "ja" ? "企業ビジョンと沿革" : "公司愿景与发展历程"),
              title: homeData?.about?.sectionOne?.title,
              description: homeData?.about?.sectionOne?.description,
              highlights: (homeData?.about?.sectionOne?.highlights ?? []).map((text: any) => ({ 
                  text 
              })),
              items: (homeData?.about?.sectionTwo?.items ?? []).map((it: any) => ({
                title: it?.title,
                paragraph: it?.paragraph,
              })),
            }];
        } else if (key === "contact") {
            blocks = [{
              blockType: "contact",
              blockName: locale === "en" ? "Business Contact Form" : (locale === "ja" ? "お問い合わせフォーム" : "商务联系表单"),
              title: contactData?.contact?.formTitle,
              description: contactData?.contact?.formDescription,
            }];
        } else if (key === "openSource") {
            const categories = pagesData?.pages?.[key]?.categories ?? [];
            for (let i=0; i<categories.length; i++) {
                blocks.push({
                   blockType: "features",
                   blockName: categories[i]?.title,
                   title: categories[i]?.title,
                   paragraph: categories[i]?.description,
                   featuredProducts: {
                     title: featOpenSrcTitles[locale] || featOpenSrcTitles["zh"],
                     description: featOpenSrcDescs[locale] || featOpenSrcDescs["zh"],
                     ctaDescription: ctaOpenSrc[locale] || ctaOpenSrc["zh"],
                     viewAllLabel: btnOpenSrc[locale] || btnOpenSrc["zh"],
                     slugs: [{ slug: "ubot-mr40" }, { slug: "gx-mat-09s" }]
                   },
                   highlights: (categories[i].projects ?? []).map((proj: any) => ({
                       title: proj.name,
                       description: proj.description,
                       link: proj.link,
                       tags: (proj.tags ?? []).join(',')
                   }))
                });
            }
        } else if (key === "customSolutions") {
            const modes = pagesData?.pages?.[key]?.cooperationModes ?? [];
            blocks = [{
                blockType: "features",
                blockName: locale === "en" ? "Custom Cooperation Modes" : (locale === "ja" ? "カスタマイズ協力モード" : "定制合作模式"),
                title: pagesData?.pages?.[key]?.title,
                paragraph: pagesData?.pages?.[key]?.description,
                featuredProducts: {
                  title: featCustomTitles[locale] || featCustomTitles["zh"],
                  description: featCustomDescs[locale] || featCustomDescs["zh"],
                  ctaDescription: ctaCustom[locale] || ctaCustom["zh"],
                  viewAllLabel: btnCustom[locale] || btnCustom["zh"],
                  slugs: [{ slug: "rai-p4" }, { slug: "alo-le4" }]
                },
                highlights: modes.map((mode: any) => ({
                    title: mode?.title,
                    description: mode?.description,
                }))
            }];
        }
        
        if (blocks.length === 0) {
            const t = pagesData?.pages?.[key]?.description || pagesData?.pages?.[key]?.title || "Content coming soon...";
            blocks = [{
                blockType: "contact",
                blockName: "暂无内容占位符",
                title: t,
                description: "Coming soon",
            }];
        }

        const data = {
          title: pagesData?.pages?.[key]?.title ?? slug,
          seo: {
            title: pagesData?.pages?.[key]?.title,
            description: pagesData?.pages?.[key]?.description,
          },
          blocks,
        };

        if (!pageId) {
          // 首次创建：zh 先建，en/ja 用刚建的 ID update
          if (locale === "zh") {
            const created = await payload.create({
              collection: "pages",
              data: { ...data, slug },
              locale,
              overrideAccess: true,
              draft: false,
            });
            // 记录新ID，后续语言直接update该record
            (item as any)._createdId = created.id;
          } else {
            const id = (item as any)._createdId;
            if (id) {
              await payload.update({
                collection: "pages",
                id,
                data,
                locale,
                overrideAccess: true,
                draft: false,
              });
            }
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
        }
      }
    }
    console.log("Restored all pages successfully using per-locale updates.");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
main();
