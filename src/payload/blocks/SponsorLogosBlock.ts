import type { Block } from "payload";

export const SponsorLogosBlock: Block = {
  slug: "sponsorLogos",
  labels: {
    singular: {
      zh: "赞助商 Logo",
      en: "Sponsor Logos",
      ja: "スポンサーLogo",
    },
    plural: {
      zh: "赞助商 Logo",
      en: "Sponsor Logos",
      ja: "スポンサーLogo",
    },
  },
  fields: [
    {
      name: "heading",
      type: "text",
      localized: true,
      label: {
        zh: "标题",
        en: "Heading",
        ja: "見出し",
      },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      label: {
        zh: "描述",
        en: "Description",
        ja: "説明",
      },
    },
    {
      name: "speed",
      type: "select",
      defaultValue: "normal",
      label: {
        zh: "滚动速度",
        en: "Scroll Speed",
        ja: "スクロール速度",
      },
      options: [
        {
          label: {
            zh: "慢速",
            en: "Slow",
            ja: "遅い",
          },
          value: "slow",
        },
        {
          label: {
            zh: "标准",
            en: "Normal",
            ja: "標準",
          },
          value: "normal",
        },
        {
          label: {
            zh: "快速",
            en: "Fast",
            ja: "速い",
          },
          value: "fast",
        },
      ],
    },
    {
      name: "pauseOnHover",
      type: "checkbox",
      defaultValue: true,
      label: {
        zh: "鼠标悬停时暂停",
        en: "Pause on hover",
        ja: "ホバー時に一時停止",
      },
    },
    {
      name: "logos",
      type: "array",
      localized: true,
      required: true,
      minRows: 1,
      label: {
        zh: "Logo 列表",
        en: "Logos",
        ja: "Logo一覧",
      },
      fields: [
        {
          name: "name",
          type: "text",
          localized: true,
          required: true,
          label: {
            zh: "名称",
            en: "Name",
            ja: "名称",
          },
        },
        {
          name: "lightLogo",
          type: "upload",
          relationTo: "media",
          required: true,
          label: {
            zh: "亮色主题 Logo",
            en: "Light Theme Logo",
            ja: "ライトテーマ Logo",
          },
        },
        {
          name: "darkLogo",
          type: "upload",
          relationTo: "media",
          label: {
            zh: "暗色主题 Logo",
            en: "Dark Theme Logo",
            ja: "ダークテーマ Logo",
          },
        },
        {
          name: "url",
          type: "text",
          label: {
            zh: "链接",
            en: "URL",
            ja: "URL",
          },
        },
        {
          name: "openInNewTab",
          type: "checkbox",
          defaultValue: true,
          label: {
            zh: "在新标签页打开",
            en: "Open in new tab",
            ja: "新しいタブで開く",
          },
        },
      ],
    },
  ],
};
