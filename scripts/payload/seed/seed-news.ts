import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";

import config from "../../../payload.config";
import { upsertNewsShowcaseBlock } from "../../../src/lib/news";
import { lexicalFromPlainText } from "../lib/lexical";

type Locale = "zh" | "en" | "ja";
type Category = "company" | "industry" | "media";

const LOCALES: Locale[] = ["zh", "en", "ja"];

async function readMessagesJSON(locale: Locale, filename: string): Promise<any> {
  const filePath = path.resolve(process.cwd(), "messages", locale, filename);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

const newsItems: Array<{
  slug: string;
  category: Category;
  publishDate: string;
  coverSourcePath: string;
  localized: Record<
    Locale,
    { title: string; summary: string; content: string }
  >;
}> = [
  {
    slug: "unihome-embodied-intelligence-platform",
    category: "company",
    publishDate: "2026-07-14T02:00:00.000Z",
    coverSourcePath: "/images/hero/slide-1.png",
    localized: {
      zh: {
        title: "有你同创持续完善具身智能创新平台",
        summary: "围绕教学、科研与产业应用，持续打磨软硬件一体化产品与服务体系。",
        content: "有你同创持续完善具身智能创新平台，连接机器人硬件、开发工具、课程资源与项目服务。\n平台面向不同学习阶段提供循序渐进的实践路径，帮助院校和开发者更高效地开展教学与科研创新。",
      },
      en: {
        title: "UniHome Advances Its Embodied Intelligence Platform",
        summary: "An integrated portfolio of hardware, software, curricula, and services for education, research, and industry.",
        content: "UniHome continues to advance its embodied intelligence platform by connecting robotics hardware, developer tools, curriculum resources, and project services.\nThe platform provides progressive hands-on pathways for different learning stages, helping institutions and developers deliver education and research projects more effectively.",
      },
      ja: {
        title: "UniHome、具現化AIイノベーション基盤を継続強化",
        summary: "教育・研究・産業応用に向け、ハードウェア、ソフトウェア、教材、サービスを一体化しています。",
        content: "UniHomeは、ロボットハードウェア、開発ツール、教材、プロジェクト支援をつなぐ具現化AIイノベーション基盤を継続的に強化しています。\n学習段階に応じた実践的なステップを提供し、教育機関や開発者による授業・研究プロジェクトを支援します。",
      },
    },
  },
  {
    slug: "embodied-intelligence-education-pathway",
    category: "industry",
    publishDate: "2026-07-10T02:00:00.000Z",
    coverSourcePath: "/images/hero/slide-2.png",
    localized: {
      zh: {
        title: "具身智能教育需要分阶段的实践路径",
        summary: "从通识认知到功能设计，再到创新应用，构建可持续进阶的学习体系。",
        content: "具身智能融合机械、电子、控制、人工智能等多个领域，教学设计需要兼顾知识理解与工程实践。\n分阶段的产品和课程体系能够降低入门门槛，并让学习者逐步进入复杂系统设计与真实场景应用。",
      },
      en: {
        title: "Embodied Intelligence Education Needs a Progressive Pathway",
        summary: "A sustainable learning journey from foundational concepts to functional design and innovative applications.",
        content: "Embodied intelligence combines mechanics, electronics, control, and artificial intelligence. Effective teaching must connect conceptual understanding with engineering practice.\nA progressive product and curriculum system lowers the entry barrier while guiding learners toward complex system design and real-world applications.",
      },
      ja: {
        title: "具現化AI教育に求められる段階的な実践プロセス",
        summary: "基礎理解から機能設計、応用開発へと進む継続的な学習体系を構築します。",
        content: "具現化AIは、機械、電子、制御、人工知能など複数の分野を統合します。教育設計では、知識の理解と工学的な実践を結び付ける必要があります。\n段階的な製品・カリキュラム体系により、導入のハードルを下げながら、複雑なシステム設計や実環境での応用へ学習者を導きます。",
      },
    },
  },
  {
    slug: "shougang-park-industry-education-collaboration",
    category: "media",
    publishDate: "2026-07-06T02:00:00.000Z",
    coverSourcePath: "/images/hero/slide-3.png",
    localized: {
      zh: {
        title: "首钢园产教融合空间推进机器人实践创新",
        summary: "以开放场景连接企业、高校与学习者，为机器人教学和联合研发提供实践空间。",
        content: "位于首钢园的产教融合空间为机器人教学、项目实训与联合研发提供开放场景。\n通过连接企业、高校和学习者，空间将课程学习、工程实践与产业需求结合起来，支持创新成果持续落地。",
      },
      en: {
        title: "Shougang Park Collaboration Space Supports Robotics Innovation",
        summary: "An open environment connecting companies, institutions, and learners for robotics education and joint research.",
        content: "The industry-education collaboration space at Shougang Park provides an open environment for robotics teaching, project training, and joint research.\nBy connecting companies, institutions, and learners, it brings curricula, engineering practice, and industry needs together to support practical innovation.",
      },
      ja: {
        title: "首鋼園の産学連携スペースがロボット実践を推進",
        summary: "企業、教育機関、学習者をつなぎ、ロボット教育と共同研究を支えるオープンな実践環境です。",
        content: "首鋼園の産学連携スペースは、ロボット教育、プロジェクト実習、共同研究のためのオープンな環境を提供します。\n企業、教育機関、学習者をつなぎ、カリキュラム、工学的実践、産業ニーズを統合することで、継続的なイノベーションを支援します。",
      },
    },
  },
];

async function findMediaId(payload: any, sourcePath: string) {
  const result = await payload.find({
    collection: "media",
    where: { sourcePath: { equals: sourcePath } },
    limit: 1,
    overrideAccess: true,
  });
  return result.docs?.[0]?.id ?? null;
}

async function upsertHomeNewsShowcase(payload: any) {
  const existing = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
    limit: 1,
    overrideAccess: true,
    draft: true,
  });
  const page = existing.docs?.[0];

  if (!page) {
    throw new Error(
      "[seed:news] home page is missing; run npm run cms:seed:base first",
    );
  }

  for (const locale of LOCALES) {
    const messages = await readMessagesJSON(locale, "news.json");
    const showcase = messages?.news?.showcase ?? {};
    const localizedHome = await payload.findByID({
      collection: "pages",
      id: page.id,
      locale,
      overrideAccess: true,
      draft: true,
    });

    const blocks = upsertNewsShowcaseBlock(localizedHome?.blocks, {
      title: showcase.title ?? "",
      description: showcase.description ?? "",
      limit: 3,
    });

    await payload.update({
      collection: "pages",
      id: page.id,
      data: {
        blocks,
        _status: "published",
      },
      locale,
      overrideAccess: true,
      draft: false,
    });

    // eslint-disable-next-line no-console
    console.log(`[seed:news] updated home news showcase (${locale})`);
  }
}

async function main() {
  const payload = await getPayload({ config });

  try {
    for (const item of newsItems) {
      const coverImage = await findMediaId(payload, item.coverSourcePath);
      let existing = await payload.find({
        collection: "news",
        where: { slug: { equals: item.slug } },
        limit: 1,
        overrideAccess: true,
        draft: true,
      });

      for (const locale of LOCALES) {
        const localized = item.localized[locale];
        const data = {
          title: localized.title,
          slug: item.slug,
          category: item.category,
          coverImage: coverImage ?? undefined,
          summary: localized.summary,
          content: lexicalFromPlainText(localized.content),
          publishDate: item.publishDate,
          seo: {
            title: localized.title,
            description: localized.summary,
            image: coverImage ?? undefined,
          },
          _status: "published" as const,
        };

        if (existing.docs.length === 0) {
          const created = await payload.create({
            collection: "news",
            data,
            locale,
            overrideAccess: true,
            draft: false,
          });
          existing = { ...existing, docs: [created] };
        } else {
          await payload.update({
            collection: "news",
            id: existing.docs[0].id,
            data,
            locale,
            overrideAccess: true,
            draft: false,
          });
        }
      }

      // eslint-disable-next-line no-console
      console.log(`[seed:news] upserted ${item.slug}`);
    }

    await upsertHomeNewsShowcase(payload);
  } finally {
    await Promise.race([
      (payload.db as any)?.destroy?.(),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  });
