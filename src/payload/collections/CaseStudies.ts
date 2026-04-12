import type { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "caseStudies",
  labels: {
    singular: {
      zh: "案例",
      en: "Case Study",
      ja: "導入事例",
    },
    plural: {
      zh: "案例",
      en: "Case Studies",
      ja: "導入事例",
    },
  },
  access: {
    // 公开接口只读已发布内容；登录后台可读草稿
    read: ({ req }) => {
      if (req.user) return true;
      return { _status: { equals: "published" } };
    },
  },
  admin: {
    group: {
      zh: "运营与服务",
      en: "Operations & Services",
      ja: "運営とサービス",
    },
    components: {
      edit: {
        PublishButton: "./src/payload/admin/PublishControls#PublishControls",
        UnpublishButton: false,
      },
      views: {
        list: {
          actions: [
            "./src/payload/admin/CaseStudyCategoryQuickFilter#CaseStudyCategoryQuickFilter",
          ],
        },
      },
    },
    preview: (doc, { locale }) => {
      const base = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
      const secret = process.env.PREVIEW_SECRET;
      const slug = String((doc as any)?.slug ?? "").trim();
      const resolvedLocale = ["zh", "en", "ja"].includes(String(locale)) ? String(locale) : "zh";

      if (!secret || !slug) return null;

      const url = new URL("/api/preview", base);
      url.searchParams.set("secret", secret);
      url.searchParams.set("collection", "caseStudies");
      url.searchParams.set("slug", slug);
      url.searchParams.set("locale", resolvedLocale);
      return url.toString();
    },
    useAsTitle: "slug",
    defaultColumns: ["slug", "category", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: {
        zh: "标题",
        en: "Title",
        ja: "タイトル",
      },
      localized: true,
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: {
        zh: "标识",
        en: "Slug",
        ja: "スラッグ",
      },
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "category",
      type: "select",
      label: {
        zh: "类别",
        en: "Category",
        ja: "カテゴリ",
      },
      required: true,
      options: [
        {
          label: {
            zh: "实训教学",
            en: "Practical Teaching",
            ja: "実践教育",
          },
          value: "practical-teaching",
        },
        {
          label: {
            zh: "科技创新",
            en: "Sci-Tech Innovation",
            ja: "科学技術革新",
          },
          value: "sci-tech-innovation",
        },
        {
          label: {
            zh: "创新竞赛",
            en: "Innovation Competition",
            ja: "イノベーションコンテスト",
          },
          value: "innovation-competition",
        },
        {
          label: {
            zh: "培训基地",
            en: "Training Base",
            ja: "トレーニングベース",
          },
          value: "training-base",
        },
      ],
      index: true,
    },
    {
      name: "coverImage",
      type: "upload",
      label: {
        zh: "封面图",
        en: "Cover Image",
        ja: "カバー画像",
      },
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
      label: {
        zh: "内容",
        en: "Content",
        ja: "内容",
      },
      localized: true,
    },
  ],
};
