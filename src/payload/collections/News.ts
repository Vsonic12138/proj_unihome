import type { CollectionConfig } from "payload";

import { getPublicServerUrl } from "../../lib/seo";
import { isValidNewsSlug } from "../../lib/news";

export const News: CollectionConfig = {
  slug: "news",
  labels: {
    singular: { zh: "新闻", en: "News Article", ja: "ニュース記事" },
    plural: { zh: "新闻", en: "News", ja: "ニュース" },
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { _status: { equals: "published" } };
    },
  },
  admin: {
    group: { zh: "运营与服务", en: "Operations & Services", ja: "運営とサービス" },
    components: {
      edit: {
        PublishButton: "./src/payload/admin/PublishControls#PublishControls",
        UnpublishButton: false,
      },
    },
    defaultColumns: ["title", "category", "publishDate", "_status"],
    preview: (doc, { locale }) => {
      const secret = process.env.PREVIEW_SECRET;
      const slug = String((doc as any)?.slug ?? "").trim();
      const resolvedLocale = ["zh", "en", "ja"].includes(String(locale))
        ? String(locale)
        : "zh";
      const base = getPublicServerUrl();

      if (!secret || !slug || !base) return null;

      const url = new URL("/api/preview", base);
      url.searchParams.set("secret", secret);
      url.searchParams.set("collection", "news");
      url.searchParams.set("slug", slug);
      url.searchParams.set("locale", resolvedLocale);
      return url.toString();
    },
    useAsTitle: "title",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
      label: { zh: "标题", en: "Title", ja: "タイトル" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      validate: (value) =>
        isValidNewsSlug(value) ||
        "Slug must use lowercase letters, numbers, and single hyphens only.",
      label: { zh: "标识", en: "Slug", ja: "スラッグ" },
      admin: {
        description: {
          zh: "仅使用小写英文字母、数字和连字符，例如 company-launch-2026。",
          en: "Use lowercase letters, numbers, and hyphens only, for example company-launch-2026.",
          ja: "小文字英字、数字、ハイフンのみ使用してください（例：company-launch-2026）。",
        },
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      index: true,
      label: { zh: "分类", en: "Category", ja: "カテゴリ" },
      options: [
        {
          value: "company",
          label: { zh: "公司动态", en: "Company News", ja: "企業ニュース" },
        },
        {
          value: "industry",
          label: { zh: "行业动态", en: "Industry News", ja: "業界ニュース" },
        },
        {
          value: "media",
          label: { zh: "媒体报道", en: "Media Coverage", ja: "メディア掲載" },
        },
      ],
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: { zh: "封面图", en: "Cover Image", ja: "カバー画像" },
    },
    {
      name: "summary",
      type: "textarea",
      localized: true,
      label: { zh: "摘要", en: "Summary", ja: "概要" },
    },
    {
      name: "content",
      type: "richText",
      localized: true,
      required: true,
      label: { zh: "正文", en: "Content", ja: "本文" },
    },
    {
      name: "publishDate",
      type: "date",
      required: true,
      index: true,
      label: { zh: "发布日期", en: "Publish Date", ja: "公開日" },
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "seo",
      type: "group",
      label: { zh: "搜索引擎优化", en: "SEO", ja: "SEO" },
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          label: { zh: "SEO 标题", en: "SEO Title", ja: "SEOタイトル" },
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
          label: { zh: "SEO 描述", en: "SEO Description", ja: "SEO説明" },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: { zh: "SEO 图片", en: "SEO Image", ja: "SEO画像" },
        },
      ],
    },
  ],
};
