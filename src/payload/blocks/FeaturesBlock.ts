import type { Block } from "payload";

export const FeaturesBlock: Block = {
  slug: "features",
  labels: {
    singular: {
      zh: "特性",
      en: "Features",
      ja: "特徴",
    },
    plural: {
      zh: "特性",
      en: "Features",
      ja: "特徴",
    },
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
    },
    {
      name: "paragraph",
      type: "textarea",
      label: {
        zh: "描述",
        en: "Description",
        ja: "説明",
      },
      localized: true,
    },
    {
      name: "featuredProducts",
      type: "group",
      label: {
        zh: "附加引语与关联产品",
        en: "Additional Intro & Related Products",
        ja: "追加説明と関連製品",
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
        {
          name: "ctaDescription",
          type: "textarea",
          label: {
            zh: "CTA 描述",
            en: "CTA Description",
            ja: "CTA説明",
          },
          localized: true,
        },
        {
          name: "viewAllLabel",
          type: "text",
          label: {
            zh: "查看全部文案",
            en: "View All Label",
            ja: "すべて表示ラベル",
          },
          localized: true,
        },
        {
          name: "slugs",
          type: "relationship",
          relationTo: "products",
          hasMany: true,
          localized: true,
          label: {
            zh: "选择关联产品",
            en: "Select Products",
            ja: "関連製品を選択",
          },
        },
      ],
    },
    {
      name: "highlights",
      type: "array",
      localized: true,
      label: {
        zh: "亮点",
        en: "Highlights",
        ja: "ハイライト",
      },
      required: true,
      minRows: 1,
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
          name: "description",
          type: "textarea",
          label: {
            zh: "描述",
            en: "Description",
            ja: "説明",
          },
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: {
            zh: "外链",
            en: "Link",
            ja: "リンク",
          },
          localized: false,
        },
        {
          name: "tags",
          type: "text",
          label: {
            zh: "标签 (逗号分隔)",
            en: "Tags (comma separated)",
            ja: "タグ（カンマ区切り）",
          },
          localized: false,
        },
      ],
    },
  ],
};
