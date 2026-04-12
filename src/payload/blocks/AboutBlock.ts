import type { Block } from "payload";

export const AboutBlock: Block = {
  slug: "about",
  labels: {
    singular: {
      zh: "关于",
      en: "About",
      ja: "概要",
    },
    plural: {
      zh: "关于",
      en: "About",
      ja: "概要",
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
      name: "content",
      type: "richText",
      label: {
        zh: "内容",
        en: "Content",
        ja: "内容",
      },
      localized: true,
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
      fields: [
        {
          name: "text",
          type: "text",
          label: {
            zh: "文本",
            en: "Text",
            ja: "テキスト",
          },
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      label: {
        zh: "图片",
        en: "Image",
        ja: "画像",
      },
      relationTo: "media",
    },
    {
      name: "imageAlt",
      type: "text",
      label: {
        zh: "替代文本",
        en: "Alt Text",
        ja: "代替テキスト",
      },
      localized: true,
    },
    {
      name: "items",
      type: "array",
      localized: true,
      label: {
        zh: "条目",
        en: "Items",
        ja: "項目",
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
          name: "paragraph",
          type: "textarea",
          label: {
            zh: "段落",
            en: "Paragraph",
            ja: "段落",
          },
          localized: true,
        },
      ],
    },
  ],
};
