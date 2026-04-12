import type { CollectionConfig } from "payload";

export const FAQ: CollectionConfig = {
  slug: "faq",
  labels: {
    singular: {
      zh: "常见问题",
      en: "FAQ",
      ja: "FAQ",
    },
    plural: {
      zh: "常见问题",
      en: "FAQs",
      ja: "FAQ",
    },
  },
  access: {
    read: () => true,
  },
  admin: {
        group: {
      zh: "运营与服务",
      en: "Operations & Services",
      ja: "運営とサービス",
    },
    useAsTitle: "question",
    defaultColumns: ["question", "product", "sortOrder", "updatedAt"],
  },
  fields: [
    {
      name: "question",
      type: "text",
      label: {
        zh: "问题",
        en: "Question",
        ja: "質問",
      },
      localized: true,
      required: true,
    },
    {
      name: "answer",
      type: "richText",
      label: {
        zh: "答案",
        en: "Answer",
        ja: "回答",
      },
      localized: true,
      required: true,
    },
    {
      name: "product",
      type: "relationship",
      label: {
        zh: "关联产品",
        en: "Product",
        ja: "関連製品",
      },
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "sortOrder",
      type: "number",
      label: {
        zh: "排序",
        en: "Sort Order",
        ja: "並び順",
      },
      defaultValue: 0,
    },
  ],
};
