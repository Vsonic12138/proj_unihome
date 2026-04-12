import type { CollectionConfig } from "payload";

export const ProductSeries: CollectionConfig = {
  slug: "productSeries",
  labels: {
    singular: {
      zh: "产品系列",
      en: "Product Series",
      ja: "製品シリーズ",
    },
    plural: {
      zh: "产品系列",
      en: "Product Series",
      ja: "製品シリーズ",
    },
  },
  access: {
    read: () => true,
  },
  admin: {
        group: {
      zh: "产品与业务",
      en: "Products & Business",
      ja: "製品とビジネス",
    },
    useAsTitle: "key",
  },
  fields: [
    {
      name: "key",
      type: "text",
      label: {
        zh: "标识",
        en: "Key",
        ja: "キー",
      },
      required: true,
      unique: true,
      index: true,
    },
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
