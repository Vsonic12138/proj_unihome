import type { Block } from "payload";

export const ContactBlock: Block = {
  slug: "contact",
  labels: {
    singular: { zh: "联系", en: "Contact", ja: "お問い合わせ" },
    plural: { zh: "联系", en: "Contact", ja: "お問い合わせ" },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: { zh: "标题", en: "Title", ja: "タイトル" },
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      label: { zh: "描述", en: "Description", ja: "説明" },
      localized: true,
    },
    {
      name: "form",
      type: "group",
      label: { zh: "表单字段配置", en: "Form Field Configuration", ja: "フォームフィールド設定" },
      fields: [
        {
          name: "nameLabel",
          type: "text",
          label: { zh: "姓名字段标签", en: "Name Field Label", ja: "名前フィールドラベル" },
          localized: true,
        },
        {
          name: "namePlaceholder",
          type: "text",
          label: { zh: "姓名占位文字", en: "Name Placeholder", ja: "名前プレースホルダー" },
          localized: true,
        },
        {
          name: "emailLabel",
          type: "text",
          label: { zh: "邮箱字段标签", en: "Email Field Label", ja: "メールフィールドラベル" },
          localized: true,
        },
        {
          name: "emailPlaceholder",
          type: "text",
          label: { zh: "邮箱占位文字", en: "Email Placeholder", ja: "メールプレースホルダー" },
          localized: true,
        },
        {
          name: "phoneLabel",
          type: "text",
          label: { zh: "手机号字段标签", en: "Phone Field Label", ja: "電話フィールドラベル" },
          localized: true,
        },
        {
          name: "phonePlaceholder",
          type: "text",
          label: { zh: "手机号占位文字", en: "Phone Placeholder", ja: "電話プレースホルダー" },
          localized: true,
        },
        {
          name: "intentionLabel",
          type: "text",
          label: { zh: "合作意向字段标签", en: "Intention Field Label", ja: "意向フィールドラベル" },
          localized: true,
        },
        {
          name: "intentionPlaceholder",
          type: "text",
          label: { zh: "合作意向占位文字", en: "Intention Placeholder", ja: "意向プレースホルダー" },
          localized: true,
        },
        {
          name: "intentionOptions",
          type: "array",
          label: { zh: "合作意向选项列表", en: "Intention Options", ja: "意向オプションリスト" },
          fields: [
            {
              name: "option",
              type: "text",
              label: { zh: "选项文字", en: "Option Text", ja: "オプションテキスト" },
              localized: true,
            },
          ],
        },
        {
          name: "messageLabel",
          type: "text",
          label: { zh: "留言字段标签", en: "Message Field Label", ja: "メッセージフィールドラベル" },
          localized: true,
        },
        {
          name: "messagePlaceholder",
          type: "text",
          label: { zh: "留言占位文字", en: "Message Placeholder", ja: "メッセージプレースホルダー" },
          localized: true,
        },
        {
          name: "submitLabel",
          type: "text",
          label: { zh: "提交按钮文字", en: "Submit Button Text", ja: "送信ボタンテキスト" },
          localized: true,
        },
        {
          name: "submitSuccessMessage",
          type: "textarea",
          label: { zh: "提交成功提示信息", en: "Submit Success Message", ja: "送信成功メッセージ" },
          localized: true,
        },
        {
          name: "submitErrorMessage",
          type: "textarea",
          label: { zh: "提交失败提示信息", en: "Submit Error Message", ja: "送信エラーメッセージ" },
          localized: true,
        },
      ],
    },
  ],
};
