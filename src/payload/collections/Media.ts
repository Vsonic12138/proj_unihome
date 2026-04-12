import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: {
      zh: "系统与媒体",
      en: "System & Media",
      ja: "システムとメディア",
    },
    defaultColumns: ["filename", "folder", "sourcePath", "updatedAt"],
    components: {
      views: {
        list: {
          actions: [
            "./src/payload/admin/MediaFolderQuickFilter#MediaFolderQuickFilter",
          ],
        },
      },
    },
  },
  labels: {
    singular: {
      zh: "媒体",
      en: "Media",
      ja: "メディア",
    },
    plural: {
      zh: "媒体",
      en: "Media",
      ja: "メディア",
    },
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: undefined,
        position: "center",
      },
      {
        name: "card",
        width: 800,
        height: undefined,
        position: "center",
      },
      {
        name: "hero",
        width: 1920,
        height: undefined,
        position: "center",
      },
    ],
  },
  fields: [
    {
      name: "folder",
      type: "relationship",
      relationTo: "mediaFolders",
      label: {
        zh: "分类",
        en: "Folder",
        ja: "分類",
      },
      admin: {
        description: {
          zh: "用于在媒体库里分类管理（支持父子级分类）。",
          en: "Used to categorize media items (supports parent/child folders).",
          ja: "メディアを分類（親子階層に対応）。",
        },
      },
      index: true,
    },
    {
      name: "sourcePath",
      type: "text",
      label: {
        zh: "源路径",
        en: "Source Path",
        ja: "元パス",
      },
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
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
  ],
};
