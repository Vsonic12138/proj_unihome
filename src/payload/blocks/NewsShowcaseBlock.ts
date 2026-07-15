import type { Block } from "payload";

export const NewsShowcaseBlock: Block = {
  slug: "newsShowcase",
  labels: {
    singular: { zh: "新闻展示", en: "News Showcase", ja: "ニュース表示" },
    plural: { zh: "新闻展示", en: "News Showcase", ja: "ニュース表示" },
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      label: { zh: "标题", en: "Title", ja: "タイトル" },
      admin: {
        description: {
          zh: "可选；留空时使用网站翻译中的默认新闻标题。",
          en: "Optional; uses the translated default news heading when empty.",
          ja: "任意。空欄の場合は翻訳済みの既定見出しを使用します。",
        },
      },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      label: { zh: "描述", en: "Description", ja: "説明" },
    },
    {
      name: "limit",
      type: "number",
      min: 1,
      max: 6,
      defaultValue: 3,
      required: true,
      label: { zh: "展示数量", en: "Number of Items", ja: "表示件数" },
      admin: {
        description: {
          zh: "按发布日期展示最新的 1 至 6 条已发布新闻。",
          en: "Shows the latest 1 to 6 published news items by publish date.",
          ja: "公開日順で最新の公開ニュースを1〜6件表示します。",
        },
      },
    },
  ],
};
