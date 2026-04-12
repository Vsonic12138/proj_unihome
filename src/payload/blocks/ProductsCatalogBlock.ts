import type { Block } from "payload";

export const ProductsCatalogBlock: Block = {
  slug: "productsCatalog",
  labels: {
    singular: {
      zh: "产品目录",
      en: "Products Catalog",
      ja: "製品カタログ",
    },
    plural: {
      zh: "产品目录",
      en: "Products Catalog",
      ja: "製品カタログ",
    },
  },
  fields: [
    {
      name: "seriesOrder",
      type: "array",
      label: { zh: "系列顺序", en: "Series Order", ja: "シリーズ順序" },
      admin: {
        description: {
          zh: "可选：拖拽调整系列展示顺序；未填写则按系列自身排序展示。",
          en: "Optional: drag to reorder series; if empty, series uses its default order.",
          ja: "任意：ドラッグでシリーズ順序を変更。未設定の場合は既定順です。",
        },
      },
      fields: [
        {
          name: "series",
          type: "relationship",
          relationTo: "productSeries",
          required: true,
          label: { zh: "系列", en: "Series", ja: "シリーズ" },
        },
      ],
    },
    {
      name: "productOrder",
      type: "array",
      label: { zh: "产品顺序（手动）", en: "Product Order (Manual)", ja: "製品順序（手動）" },
      admin: {
        description: {
          zh: "拖拽调整产品卡片顺序。未列出的产品将自动追加到末尾。",
          en: "Drag to reorder product cards. Unlisted products will be appended to the end automatically.",
          ja: "ドラッグで製品カードの順序を変更。未登録の製品は末尾に自動追加されます。",
        },
      },
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
          label: { zh: "产品", en: "Product", ja: "製品" },
        },
      ],
    },
    {
      name: "coreTitle",
      type: "text",
      label: { zh: "核心标题", en: "Core Title", ja: "コアタイトル" },
      localized: true,
      required: true,
    },
    {
      name: "coreDescription",
      type: "textarea",
      label: { zh: "核心描述", en: "Core Description", ja: "コア説明" },
      localized: true,
      required: true,
    },
    {
      name: "viewDetailsCta",
      type: "text",
      label: { zh: "详情按钮文案", en: "View Details CTA", ja: "詳細CTA" },
      localized: true,
      required: true,
      // NOTE: localized 字段不要使用对象形式的 defaultValue（会导致 drizzle push schema 生成 DEFAULT [object Object]）
      defaultValue: "View Details",
    },
  ],
};
