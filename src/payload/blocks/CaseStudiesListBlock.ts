import type { Block } from "payload";

export const CaseStudiesListBlock: Block = {
  slug: "caseStudiesList",
  labels: {
    singular: { zh: "案例列表", en: "Case Studies List", ja: "事例一覧" },
    plural: { zh: "案例列表", en: "Case Studies List", ja: "事例一覧" },
  },
  fields: [
    {
      name: "category",
      type: "select",
      label: { zh: "类别", en: "Category", ja: "カテゴリ" },
      required: true,
      options: [
        {
          label: { zh: "实训教学", en: "Practical Teaching", ja: "実践教育" },
          value: "practical-teaching",
        },
        {
          label: { zh: "科技创新", en: "Sci-Tech Innovation", ja: "科学技術革新" },
          value: "sci-tech-innovation",
        },
        {
          label: { zh: "创新竞赛", en: "Innovation Competition", ja: "イノベーションコンテスト" },
          value: "innovation-competition",
        },
        {
          label: { zh: "培训基地", en: "Training Base", ja: "トレーニングベース" },
          value: "training-base",
        },
      ],
      index: true,
    },
    {
      name: "limit",
      type: "number",
      label: { zh: "数量上限", en: "Limit", ja: "上限" },
      defaultValue: 50,
      admin: {
        description: {
          zh: "列表展示的最大数量（默认 50）。",
          en: "Maximum number of items to display (default 50).",
          ja: "表示する最大件数（既定 50）。",
        },
      },
    },
  ],
};

