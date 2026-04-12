import type { Block } from "payload";

export const RichTextBlock: Block = {
  slug: "richText",
  labels: {
    singular: {
      zh: "富文本",
      en: "Rich Text",
      ja: "リッチテキスト",
    },
    plural: {
      zh: "富文本",
      en: "Rich Text",
      ja: "リッチテキスト",
    },
  },
  fields: [
    {
      name: "content",
      type: "richText",
      label: {
        zh: "内容",
        en: "Content",
        ja: "内容",
      },
      localized: true,
      required: true,
    },
  ],
};
