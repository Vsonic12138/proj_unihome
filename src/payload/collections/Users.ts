import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: {
      zh: "用户",
      en: "User",
      ja: "ユーザー",
    },
    plural: {
      zh: "用户",
      en: "Users",
      ja: "ユーザー",
    },
  },
  auth: true,
  admin: {
        group: {
      zh: "系统与媒体",
      en: "System & Media",
      ja: "システムとメディア",
    },
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: {
        zh: "姓名",
        en: "Name",
        ja: "名前",
      },
      required: true,
    },
  ],
};
