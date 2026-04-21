import type { GlobalConfig } from "payload";

const emptyLexical = {
  root: {
    type: "root",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    children: [
      {
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        children: [],
      },
    ],
  },
};

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  admin: {
    group: {
      zh: "系统与媒体",
      en: "System & Media",
      ja: "システムとメディア",
    },
  },
  label: {
    zh: "站点设置",
    en: "Site Settings",
    ja: "サイト設定",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            zh: "基础与品牌",
            en: "Brand & General",
            ja: "基本・ブランド",
          },
          fields: [
            {
              name: "companyName",
              type: "text",
              label: {
                zh: "公司名称",
                en: "Company Name",
                ja: "会社名",
              },
              localized: true,
              required: true,
            },
            {
              name: "frontendBranding",
              type: "group",
              label: {
                zh: "官网前台 Logo",
                en: "Frontend Logos",
                ja: "フロントエンドロゴ",
              },
              admin: {
                description: {
                  zh: "用于官网前台页眉与页脚的品牌 Logo。浅色模式和深色模式分别配置。",
                  en: "Brand logos used by the website frontend header and footer. Configure light and dark mode variants separately.",
                  ja: "Webサイト前面のヘッダーとフッターで使用するブランドロゴです。ライト・ダークモードを別々に設定します。",
                },
              },
              fields: [
                {
                  name: "headerLogo",
                  type: "upload",
                  label: {
                    zh: "页眉 Logo（浅色模式）",
                    en: "Header Logo (Light Mode)",
                    ja: "ヘッダーロゴ（ライトモード）",
                  },
                  relationTo: "media",
                },
                {
                  name: "headerLogoInverse",
                  type: "upload",
                  label: {
                    zh: "页眉 Logo（深色模式）",
                    en: "Header Logo (Dark Mode)",
                    ja: "ヘッダーロゴ（ダークモード）",
                  },
                  relationTo: "media",
                },
                {
                  name: "footerLogo",
                  type: "upload",
                  label: {
                    zh: "页脚 Logo（浅色模式）",
                    en: "Footer Logo (Light Mode)",
                    ja: "フッターロゴ（ライトモード）",
                  },
                  relationTo: "media",
                },
                {
                  name: "footerLogoInverse",
                  type: "upload",
                  label: {
                    zh: "页脚 Logo（深色模式）",
                    en: "Footer Logo (Dark Mode)",
                    ja: "フッターロゴ（ダークモード）",
                  },
                  relationTo: "media",
                },
                {
                  name: "favicon",
                  type: "upload",
                  label: {
                    zh: "标签页图标（Favicon）",
                    en: "Browser Tab Icon (Favicon)",
                    ja: "タブアイコン（Favicon）",
                  },
                  relationTo: "media",
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
                hidden: true,
                description: {
                  zh: "历史遗留字段：页尾联系信息已迁移到 Footer（页脚）全局配置。请到「页面与搭建 -> 页脚」中编辑。",
                  en: "Legacy field: footer contact info has moved to the Footer global. Edit it under Pages & Layout -> Footer.",
                  ja: "旧フィールド：フッター連絡先は Footer グローバルへ移行しました。「ページとレイアウト -> フッター」で編集してください。",
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
              name: "socialLinks",
              type: "array",
              label: {
                zh: "社交链接（已弃用）",
                en: "Social Links (Deprecated)",
                ja: "ソーシャルリンク（非推奨）",
              },
              localized: true,
              admin: {
                hidden: true,
                description: {
                  zh: "历史遗留字段：页尾社交入口已迁移到 Footer。悬浮面板请使用“悬浮式引流面板”。",
                  en: "Legacy field: footer social items moved to Footer. For floating widget, use Floating Contact.",
                  ja: "旧フィールド：フッター項目は Footer に移行済み。フローティングは Floating Contact を使用。",
                },
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
          label: {
            zh: "产品页文案/模板文案",
            en: "Product Page Copy / Template Copy",
            ja: "製品ページ文言・テンプレ文言",
          },
          fields: [
            {
              name: "ctaDefaults",
              type: "group",
              label: {
                zh: "按钮文案默认值",
                en: "CTA Defaults",
                ja: "CTA既定",
              },
              admin: {
                description: {
                  zh: "用于前端页面模块的按钮文案兜底：当 Pages 的模块（例如产品目录/产品卡片等）未填写 CTA 时，将回退使用这里的文案。",
                  en: "Frontend CTA fallback: used when a Pages block (e.g. Products Catalog / product cards) does not specify CTA copy.",
                  ja: "フロントエンドCTAの既定値：Pages のブロック（例：製品カタログ/製品カード）でCTAが未設定の場合にここへフォールバックします。",
                },
              },
              fields: [
                {
                  name: "viewDetailsCta",
                  type: "text",
                  label: {
                    zh: "查看详情",
                    en: "View Details",
                    ja: "詳細を見る",
                  },
                  localized: true,
                  required: true,
                  defaultValue: "View Details",
                },
              ],
            },
            {
              name: "productDetailLabels",
              type: "group",
              label: {
                zh: "产品详情标签",
                en: "Product Detail Labels",
                ja: "製品詳細ラベル",
              },
              admin: {
                description: {
                  zh: "用于前端产品详情页 `/products/[slug]` 的各内容区块标题（如：适用场景/特性/示例案例/配置等）。",
                  en: "Section titles used on the product detail page `/products/[slug]` (e.g. Applicable / Features / Sample Cases / Configuration).",
                  ja: "製品詳細ページ `/products/[slug]` の各セクション見出し（例：適用/特徴/サンプル事例/構成など）。",
                },
              },
              fields: [
                {
                  name: "applicable",
                  type: "text",
                  label: {
                    zh: "适用场景",
                    en: "Applicable",
                    ja: "適用",
                  },
                  localized: true,
                },
                {
                  name: "features",
                  type: "text",
                  label: {
                    zh: "特性",
                    en: "Features",
                    ja: "特徴",
                  },
                  localized: true,
                },
                {
                  name: "sampleCases",
                  type: "text",
                  label: {
                    zh: "示例案例",
                    en: "Sample Cases",
                    ja: "サンプル事例",
                  },
                  localized: true,
                },
                {
                  name: "modules",
                  type: "text",
                  label: {
                    zh: "模块",
                    en: "Modules",
                    ja: "モジュール",
                  },
                  localized: true,
                },
                {
                  name: "chassis",
                  type: "text",
                  label: {
                    zh: "底盘",
                    en: "Chassis",
                    ja: "シャーシ",
                  },
                  localized: true,
                },
                {
                  name: "arms",
                  type: "text",
                  label: {
                    zh: "机械臂",
                    en: "Arms",
                    ja: "アーム",
                  },
                  localized: true,
                },
                {
                  name: "composites",
                  type: "text",
                  label: {
                    zh: "组合机器人",
                    en: "Composite Robots",
                    ja: "複合ロボット",
                  },
                  localized: true,
                },
                {
                  name: "configuration",
                  type: "text",
                  label: {
                    zh: "配置",
                    en: "Configuration",
                    ja: "構成",
                  },
                  localized: true,
                },
                {
                  name: "sensorConfig",
                  type: "text",
                  label: {
                    zh: "传感器配置",
                    en: "Sensor Config",
                    ja: "センサー構成",
                  },
                  localized: true,
                },
                {
                  name: "controllerConfig",
                  type: "text",
                  label: {
                    zh: "控制器配置",
                    en: "Controller Config",
                    ja: "コントローラ構成",
                  },
                  localized: true,
                },
                {
                  name: "softwareConfig",
                  type: "text",
                  label: {
                    zh: "软件配置",
                    en: "Software Config",
                    ja: "ソフト構成",
                  },
                  localized: true,
                },
                {
                  name: "experiments",
                  type: "text",
                  label: {
                    zh: "实验",
                    en: "Experiments",
                    ja: "実験",
                  },
                  localized: true,
                },
                {
                  name: "specs",
                  type: "text",
                  label: {
                    zh: "规格",
                    en: "Specs",
                    ja: "仕様",
                  },
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: {
            zh: "悬浮式引流面板",
            en: "Floating Widget",
            ja: "フローティングウィジェット",
          },
          fields: [
            {
              name: "floatingContact",
              type: "group",
              label: {
                zh: "悬浮联系",
                en: "Floating Contact",
                ja: "フローティング連絡",
              },
              fields: [
                {
                  name: "panelLabel",
                  type: "text",
                  label: {
                    zh: "面板标签",
                    en: "Panel Label",
                    ja: "パネルラベル",
                  },
                  localized: true,
                },
                {
                  name: "fabLabel",
                  type: "text",
                  label: {
                    zh: "悬浮按钮标签",
                    en: "FAB Label",
                    ja: "FABラベル",
                  },
                  localized: true,
                },
                {
                  name: "closeLabel",
                  type: "text",
                  label: {
                    zh: "关闭标签",
                    en: "Close Label",
                    ja: "閉じるラベル",
                  },
                  localized: true,
                },
                {
                  name: "qqGroup",
                  type: "group",
                  label: {
                    zh: "QQ 群",
                    en: "QQ Group",
                    ja: "QQグループ",
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
                    },
                    {
                      name: "number",
                      type: "text",
                      label: {
                        zh: "号码",
                        en: "Number",
                        ja: "番号",
                      },
                    },
                    {
                      name: "tooltip",
                      type: "text",
                      label: {
                        zh: "提示",
                        en: "Tooltip",
                        ja: "ツールチップ",
                      },
                      localized: true,
                    },
                    {
                      name: "copy",
                      type: "text",
                      label: {
                        zh: "复制文案",
                        en: "Copy Label",
                        ja: "コピー文言",
                      },
                      localized: true,
                    },
                    {
                      name: "copied",
                      type: "text",
                      label: {
                        zh: "已复制文案",
                        en: "Copied Label",
                        ja: "コピー済み文言",
                      },
                      localized: true,
                    },
                    {
                      name: "qrImage",
                      type: "upload",
                      label: {
                        zh: "二维码图片",
                        en: "QR Image",
                        ja: "QR画像",
                      },
                      relationTo: "media",
                    },
                  ],
                },
                {
                  name: "wechat",
                  type: "group",
                  label: {
                    zh: "微信",
                    en: "WeChat",
                    ja: "WeChat",
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
                    },
                    {
                      name: "tooltip",
                      type: "text",
                      label: {
                        zh: "提示",
                        en: "Tooltip",
                        ja: "ツールチップ",
                      },
                      localized: true,
                    },
                    {
                      name: "comingSoon",
                      type: "text",
                      label: {
                        zh: "敬请期待文案",
                        en: "Coming Soon",
                        ja: "近日公開",
                      },
                      localized: true,
                    },
                    {
                      name: "qrImage",
                      type: "upload",
                      label: {
                        zh: "二维码图片",
                        en: "QR Image",
                        ja: "QR画像",
                      },
                      relationTo: "media",
                    },
                  ],
                },
                {
                  name: "phone",
                  type: "group",
                  label: {
                    zh: "电话",
                    en: "Phone",
                    ja: "電話",
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
                    },
                    {
                      name: "name",
                      type: "text",
                      label: {
                        zh: "联系人",
                        en: "Contact Name",
                        ja: "担当者名",
                      },
                      localized: true,
                    },
                    {
                      name: "number",
                      type: "text",
                      label: {
                        zh: "号码",
                        en: "Number",
                        ja: "番号",
                      },
                    },
                    {
                      name: "tooltip",
                      type: "text",
                      label: {
                        zh: "提示",
                        en: "Tooltip",
                        ja: "ツールチップ",
                      },
                      localized: true,
                    },
                    {
                      name: "copy",
                      type: "text",
                      label: {
                        zh: "复制文案",
                        en: "Copy Label",
                        ja: "コピー文言",
                      },
                      localized: true,
                    },
                    {
                      name: "copied",
                      type: "text",
                      label: {
                        zh: "已复制文案",
                        en: "Copied Label",
                        ja: "コピー済み文言",
                      },
                      localized: true,
                    },
                  ],
                },
                {
                  name: "bilibili",
                  type: "group",
                  label: {
                    zh: "Bilibili",
                    en: "Bilibili",
                    ja: "Bilibili",
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
                    },
                    {
                      name: "tooltip",
                      type: "text",
                      label: {
                        zh: "提示",
                        en: "Tooltip",
                        ja: "ツールチップ",
                      },
                      localized: true,
                    },
                    {
                      name: "linkText",
                      type: "text",
                      label: {
                        zh: "链接文案",
                        en: "Link Text",
                        ja: "リンク文言",
                      },
                      localized: true,
                    },
                    {
                      name: "href",
                      type: "text",
                      label: {
                        zh: "链接",
                        en: "Link",
                        ja: "リンク",
                      },
                    },
                  ],
                },
                {
                  name: "taobao",
                  type: "group",
                  label: {
                    zh: "淘宝",
                    en: "Taobao",
                    ja: "Taobao",
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
                    },
                    {
                      name: "tooltip",
                      type: "text",
                      label: {
                        zh: "提示",
                        en: "Tooltip",
                        ja: "ツールチップ",
                      },
                      localized: true,
                    },
                    {
                      name: "linkText",
                      type: "text",
                      label: {
                        zh: "链接文案",
                        en: "Link Text",
                        ja: "リンク文言",
                      },
                      localized: true,
                    },
                    {
                      name: "href",
                      type: "text",
                      label: {
                        zh: "链接",
                        en: "Link",
                        ja: "リンク",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            zh: "搜索引擎优化",
            en: "SEO Configuration",
            ja: "SEO設定",
          },
          fields: [
            {
              name: "seoDefaults",
              type: "group",
              label: {
                zh: "SEO 默认值",
                en: "SEO Defaults",
                ja: "SEO既定",
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: {
                    zh: "SEO 标题",
                    en: "SEO Title",
                    ja: "SEOタイトル",
                  },
                  localized: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: {
                    zh: "SEO 描述",
                    en: "SEO Description",
                    ja: "SEO説明",
                  },
                  localized: true,
                },
                {
                  name: "image",
                  type: "upload",
                  label: {
                    zh: "SEO 图片",
                    en: "SEO Image",
                    ja: "SEO画像",
                  },
                  relationTo: "media",
                },
              ],
            },
          ],
        },
        {
          label: {
            zh: "合规与政策",
            en: "Legal & Compliance",
            ja: "法務・コンプライアンス",
          },
          fields: [
            {
              name: "icpNumber",
              type: "text",
              label: {
                zh: "ICP 备案号",
                en: "ICP Number",
                ja: "ICP 登録番号",
              },
            },
            {
              name: "icpLink",
              type: "text",
              label: {
                zh: "ICP 备案链接",
                en: "ICP Link",
                ja: "ICP リンク",
              },
              defaultValue: "https://beian.miit.gov.cn/",
              admin: {
                description: {
                  zh: "预设跳往工信部首页，除非特殊情况请保留默认值。",
                  en: "Defaults to MIIT website. Keep this default unless special circumstances.",
                  ja: "MIITのウェブサイトにデフォルト設定。特別な事情がなければこのままにしてください。",
                },
              },
            },
            {
              name: "psbNumber",
              type: "text",
              label: {
                zh: "公安网备号",
                en: "PSB Number",
                ja: "公安網備番号",
              },
            },
            {
              name: "psbIcon",
              type: "upload",
              relationTo: "media",
              label: {
                zh: "公安网备图标",
                en: "PSB Icon",
                ja: "公安網備アイコン",
              },
              admin: {
                description: {
                  zh: "如果有当地公安要求的警徽备案图标可上传，不传则只显示文本。",
                  en: "If you have a police badge icon, upload it here. Otherwise, only text will be shown.",
                  ja: "警察のバッジアイコンがある場合はアップロードしてください。ない場合はテキストのみが表示されます。",
                },
              },
            },
            {
              name: "cookieConsent",
              type: "group",
              label: {
                zh: "Cookie 提示",
                en: "Cookie Consent",
                ja: "Cookie同意",
              },
              fields: [
                {
                  name: "ariaLabel",
                  type: "text",
                  label: {
                    zh: "无障碍标签",
                    en: "ARIA Label",
                    ja: "ARIAラベル",
                  },
                  localized: true,
                },
                {
                  name: "message",
                  type: "textarea",
                  label: {
                    zh: "提示内容",
                    en: "Message",
                    ja: "メッセージ",
                  },
                  localized: true,
                },
                {
                  name: "privacyPolicyLink",
                  type: "text",
                  label: {
                    zh: "隐私政策链接",
                    en: "Privacy Policy Link",
                    ja: "プライバシーポリシーリンク",
                  },
                  localized: true,
                  defaultValue: "/privacy-policy",
                  admin: {
                    description: {
                      zh: "可填写相对路径 `/privacy-policy`；前端会自动按当前语言跳转到对应页面。",
                      en: "You can use a relative path like `/privacy-policy`; the frontend will resolve it for the active locale.",
                      ja: "`/privacy-policy` のような相対パスを使用できます。フロントエンド側で現在の言語に合わせて解決します。",
                    },
                  },
                },
                {
                  name: "learnMore",
                  type: "text",
                  label: {
                    zh: "了解更多文案",
                    en: "Learn More Label",
                    ja: "詳細表示ラベル",
                  },
                  localized: true,
                },
                {
                  name: "acceptAll",
                  type: "text",
                  label: {
                    zh: "接受全部文案",
                    en: "Accept All Label",
                    ja: "すべて同意ラベル",
                  },
                  localized: true,
                },
                {
                  name: "rejectNonEssential",
                  type: "text",
                  label: {
                    zh: "拒绝非必要文案",
                    en: "Reject Non-Essential Label",
                    ja: "不要なCookieを拒否",
                  },
                  localized: true,
                },
              ],
            },
            {
              name: "legalText",
              type: "richText",
              label: {
                zh: "法律声明",
                en: "Legal Text",
                ja: "法的表記",
              },
              localized: true,
              admin: {
                description: {
                  zh: "优先展示在 `/privacy-policy` 页面正文中；可用于隐私政策、Cookie 说明及补充法律文本。",
                  en: "Displayed as the primary body on `/privacy-policy`; use it for privacy policy, cookie disclosure, and related legal text.",
                  ja: "`/privacy-policy` ページ本文として優先表示されます。プライバシーポリシー、Cookie 説明、法的文言に使用できます。",
                },
              },
              defaultValue: emptyLexical as any,
            },
          ],
        },
      ],
    },
  ],
};
