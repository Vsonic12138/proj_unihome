import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  admin: {
        group: {
      zh: "页面与搭建",
      en: "Pages & Layout",
      ja: "ページとレイアウト",
    },
  },
  label: {
    zh: "页脚",
    en: "Footer",
    ja: "フッター",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "legal",
      type: "group",
      label: {
        zh: "法律与合规（页脚底部）",
        en: "Legal & Compliance (Footer Bottom)",
        ja: "法務・コンプライアンス（フッター下部）",
      },
      fields: [
        {
          name: "privacyPolicyLabel",
          type: "text",
          label: {
            zh: "隐私政策入口文案",
            en: "Privacy Policy Label",
            ja: "プライバシーポリシー文言",
          },
          localized: true,
          required: true,
        },
        {
          name: "cookieSettingsLabel",
          type: "text",
          label: {
            zh: "Cookie 设置入口文案",
            en: "Cookie Settings Label",
            ja: "Cookie 設定文言",
          },
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: "description",
      type: "richText",
      label: {
        zh: "描述",
        en: "Description",
        ja: "説明",
      },
      localized: true,
    },
    {
      name: "sections",
      type: "array",
      localized: true,
      label: {
        zh: "区块",
        en: "Sections",
        ja: "セクション",
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
          name: "links",
          type: "array",
          localized: true,
          label: {
            zh: "链接",
            en: "Links",
            ja: "リンク",
          },
          fields: [
            {
              name: "label",
              type: "text",
              label: {
                zh: "名称",
                en: "Label",
                ja: "ラベル",
              },
              localized: true,
              required: true,
            },
            {
              name: "href",
              type: "text",
              label: {
                zh: "链接",
                en: "Link",
                ja: "リンク",
              },
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "contactInfo",
      type: "group",
      label: {
        zh: "联系信息",
        en: "Contact Info",
        ja: "連絡先",
      },
      admin: {
        description: {
          zh: "用于页尾的电话/邮箱/地址展示（当前语言维度）。",
          en: "Used by the footer for phone / email / address (per locale).",
          ja: "フッターの電話/メール/住所表示に使用（ロケール別）。",
        },
      },
      fields: [
        {
          name: "phone",
          type: "text",
          label: {
            zh: "电话",
            en: "Phone",
            ja: "電話",
          },
          localized: true,
        },
        {
          name: "email",
          type: "text",
          label: {
            zh: "邮箱",
            en: "Email",
            ja: "メール",
          },
        },
        {
          name: "address",
          type: "text",
          label: {
            zh: "地址",
            en: "Address",
            ja: "住所",
          },
          localized: true,
        },
      ],
    },
    {
      name: "contactItems",
      type: "array",
      localized: true,
      label: {
        zh: "联系方式与社交入口",
        en: "Contact & Social Items",
        ja: "連絡先・ソーシャル",
      },
      admin: {
        description: {
          zh: "用于页尾右侧图标入口：淘宝/B站为外链，QQ/微信为二维码弹窗。",
          en: "Used by footer contact icons: Taobao/Bilibili are links; QQ/WeChat open QR modals.",
          ja: "フッターのアイコン入口：Taobao/Bilibili はリンク、QQ/WeChat はQRモーダル。",
        },
      },
      fields: [
        {
          name: "key",
          type: "select",
          required: true,
          label: {
            zh: "标识",
            en: "Key",
            ja: "キー",
          },
          options: [
            { label: "Taobao", value: "taobao" },
            { label: "Bilibili", value: "bilibili" },
            { label: "QQ", value: "qq" },
            { label: "WeChat", value: "wechat" },
          ],
        },
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
          label: {
            zh: "名称",
            en: "Label",
            ja: "ラベル",
          },
        },
        {
          name: "type",
          type: "select",
          required: true,
          label: {
            zh: "类型",
            en: "Type",
            ja: "タイプ",
          },
          options: [
            { label: { zh: "外链", en: "Link", ja: "リンク" }, value: "link" },
            { label: { zh: "二维码弹窗", en: "QR Modal", ja: "QRモーダル" }, value: "qr" },
          ],
        },
        {
          name: "href",
          type: "text",
          label: {
            zh: "链接",
            en: "Link",
            ja: "リンク",
          },
          admin: {
            condition: (_, siblingData) => siblingData?.type === "link",
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
          admin: {
            condition: (_, siblingData) => siblingData?.type === "qr",
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: {
            zh: "二维码图片",
            en: "QR Image",
            ja: "QR画像",
          },
          admin: {
            condition: (_, siblingData) => siblingData?.type === "qr",
          },
        },
      ],
    },
    {
      name: "qrCodes",
      type: "array",
      localized: true,
      label: {
        zh: "二维码（已弃用）",
        en: "QR Codes (Deprecated)",
        ja: "QRコード（非推奨）",
      },
      admin: {
        hidden: true,
        description: {
          zh: "历史遗留字段：请使用“联系方式与社交入口”。",
          en: "Legacy field: use Contact & Social Items instead.",
          ja: "旧フィールド：連絡先・ソーシャルを使用してください。",
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
          required: true,
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
          required: true,
        },
      ],
    },
  ],
};
