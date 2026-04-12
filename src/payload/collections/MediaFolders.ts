import type { CollectionConfig } from "payload";

export const MediaFolders: CollectionConfig = {
  slug: "mediaFolders",
  labels: {
    singular: {
      zh: "媒体分类",
      en: "Media Folder",
      ja: "メディア分類",
    },
    plural: {
      zh: "媒体分类",
      en: "Media Folders",
      ja: "メディア分類",
    },
  },
  admin: {
    group: {
      zh: "系统与媒体",
      en: "System & Media",
      ja: "システムとメディア",
    },
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "parent", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: {
        zh: "名称",
        en: "Name",
        ja: "名前",
      },
      localized: true,
      required: true,
      index: true,
    },
    {
      name: "slug",
      type: "text",
      label: {
        zh: "标识",
        en: "Slug",
        ja: "スラッグ",
      },
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "mediaFolders",
      label: {
        zh: "父级分类",
        en: "Parent",
        ja: "親分類",
      },
      admin: {
        position: "sidebar",
      },
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
      admin: {
        position: "sidebar",
      },
    },
  ],
};

