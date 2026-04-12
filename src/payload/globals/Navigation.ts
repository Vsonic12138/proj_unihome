import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  admin: {
        group: {
      zh: "页面与搭建",
      en: "Pages & Layout",
      ja: "ページとレイアウト",
    },
  },
  label: {
    zh: "导航",
    en: "Navigation",
    ja: "ナビゲーション",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "items",
      type: "array",
      localized: true,
      label: {
        zh: "导航项",
        en: "Navigation Items",
        ja: "ナビゲーション項目",
      },
      required: true,
      minRows: 1,
      fields: [
        {
          name: "label",
          type: "text",
          label: {
            zh: "标题",
            en: "Label",
            ja: "ラベル",
          },
          localized: true,
          required: true,
        },
        {
          name: "href",
          type: "text",
          label: {
            zh: "链接",
            en: "Link",
            ja: "リンク",
          },
          required: true,
        },
        {
          name: "children",
          type: "array",
          localized: true,
          label: {
            zh: "子项",
            en: "Children",
            ja: "子項目",
          },
          fields: [
            {
              name: "label",
              type: "text",
              label: {
                zh: "标题",
                en: "Label",
                ja: "ラベル",
              },
              localized: true,
              required: true,
            },
            {
              name: "href",
              type: "text",
              label: {
                zh: "链接",
                en: "Link",
                ja: "リンク",
              },
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
