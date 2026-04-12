import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  labels: {
    singular: {
      zh: "轮播",
      en: "Hero",
      ja: "ヒーロー",
    },
    plural: {
      zh: "轮播",
      en: "Hero",
      ja: "ヒーロー",
    },
  },
  fields: [
    {
      name: "autoPlayInterval",
      type: "number",
      label: {
        zh: "自动播放间隔（毫秒）",
        en: "Autoplay Interval (ms)",
        ja: "自動再生間隔（ms）",
      },
      defaultValue: 6000,
    },
    {
      name: "slides",
      type: "array",
      localized: true,
      label: {
        zh: "轮播项",
        en: "Slides",
        ja: "スライド",
      },
      required: true,
      minRows: 1,
      fields: [
        {
          name: "slideId",
          type: "number",
          label: {
            zh: "ID",
            en: "ID",
            ja: "ID",
          },
          required: true,
        },
        {
          name: "media",
          type: "upload",
          label: {
            zh: "媒体",
            en: "Media",
            ja: "メディア",
          },
          relationTo: "media",
          required: true,
        },
        {
          name: "alt",
          type: "text",
          label: {
            zh: "替代文本",
            en: "Alt Text",
            ja: "代替テキスト",
          },
          localized: true,
        },
        {
          name: "action",
          type: "group",
          label: {
            zh: "按钮",
            en: "Action",
            ja: "アクション",
          },
          fields: [
            {
              name: "href",
              type: "text",
              label: {
                zh: "链接",
                en: "Link",
                ja: "リンク",
              },
              required: false,
            },
            {
              name: "label",
              type: "text",
              label: {
                zh: "文案",
                en: "Label",
                ja: "ラベル",
              },
              localized: true,
              required: false,
            },
          ],
        },
      ],
    },
  ],
};
