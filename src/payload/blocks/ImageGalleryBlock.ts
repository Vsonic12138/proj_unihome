import type { Block } from "payload";

export const ImageGalleryBlock: Block = {
  slug: "imageGallery",
  labels: {
    singular: {
      zh: "图片库",
      en: "Image Gallery",
      ja: "画像ギャラリー",
    },
    plural: {
      zh: "图片库",
      en: "Image Gallery",
      ja: "画像ギャラリー",
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
      name: "images",
      type: "array",
      localized: true,
      label: {
        zh: "图片",
        en: "Images",
        ja: "画像",
      },
      required: true,
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          label: {
            zh: "图片",
            en: "Image",
            ja: "画像",
          },
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
          label: {
            zh: "说明",
            en: "Caption",
            ja: "キャプション",
          },
          localized: true,
        },
      ],
    },
  ],
};
