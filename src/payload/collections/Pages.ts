import type { CollectionConfig } from "payload";

import { AboutBlock } from "../blocks/AboutBlock";
import { CaseStudiesListBlock } from "../blocks/CaseStudiesListBlock";
import { ContactBlock } from "../blocks/ContactBlock";
import { FeaturesBlock } from "../blocks/FeaturesBlock";
import { HeroBlock } from "../blocks/HeroBlock";
import { ImageGalleryBlock } from "../blocks/ImageGalleryBlock";
import { ProductsCatalogBlock } from "../blocks/ProductsCatalogBlock";
import { RichTextBlock } from "../blocks/RichTextBlock";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: {
      zh: "页面",
      en: "Page",
      ja: "ページ",
    },
    plural: {
      zh: "页面",
      en: "Pages",
      ja: "ページ",
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
      zh: "页面与搭建",
      en: "Pages & Layout",
      ja: "ページとレイアウト",
    },
    preview: (doc, { locale }) => {
      const base = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
      const secret = process.env.PREVIEW_SECRET;
      const slug = String((doc as any)?.slug ?? "").trim();
      const resolvedLocale = ["zh", "en", "ja"].includes(String(locale)) ? String(locale) : "zh";

      if (!secret || !slug) return null;

      const url = new URL("/api/preview", base);
      url.searchParams.set("secret", secret);
      url.searchParams.set("collection", "pages");
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
      type: "tabs",
      tabs: [
        {
          label: {
            zh: "页面头部 (Intro)",
            en: "Page Intro",
            ja: "ページ導入",
          },
          fields: [
            {
              name: "intro",
              type: "group",
              label: {
                zh: "头部文案",
                en: "Intro",
                ja: "導入",
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: {
                    zh: "标题（可选覆盖）",
                    en: "Title (optional override)",
                    ja: "タイトル（任意）",
                  },
                  localized: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: {
                    zh: "描述",
                    en: "Description",
                    ja: "説明",
                  },
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: {
            zh: "页面排版 (组件)",
            en: "Page Layout (Blocks)",
            ja: "ページレイアウト (ブロック)",
          },
          fields: [
            {
              name: "blocks",
              type: "blocks",
              localized: true,
              label: {
                zh: "内容模块",
                en: "Content Blocks",
                ja: "コンテンツブロック",
              },
              required: true,
              blocks: [
                HeroBlock,
                FeaturesBlock,
                ProductsCatalogBlock,
                AboutBlock,
                CaseStudiesListBlock,
                ContactBlock,
                RichTextBlock,
                ImageGalleryBlock,
              ],
            },
          ],
        },
        {
          label: {
            zh: "搜索引擎优化 (SEO)",
            en: "SEO Configuration",
            ja: "SEO設定",
          },
          fields: [
            {
              name: "seo",
              type: "group",
              label: {
                zh: "SEO",
                en: "SEO",
                ja: "SEO",
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: {
                    zh: "SEO 标题",
                    en: "SEO Title",
                    ja: "SEOタイトル",
                  },
                  localized: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: {
                    zh: "SEO 描述",
                    en: "SEO Description",
                    ja: "SEO説明",
                  },
                  localized: true,
                },
                {
                  name: "image",
                  type: "upload",
                  label: {
                    zh: "SEO 图片",
                    en: "SEO Image",
                    ja: "SEO画像",
                  },
                  relationTo: "media",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
