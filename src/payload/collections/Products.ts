import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: {
      zh: "产品",
      en: "Product",
      ja: "製品",
    },
    plural: {
      zh: "产品",
      en: "Products",
      ja: "製品",
    },
  },
  access: {
    // 公开接口只读已发布内容；登录后台可读草稿
    read: ({ req }) => {
      if (req.user) return true;
      return { _status: { equals: "published" } };
    },
  },
  admin: {
        group: {
      zh: "产品与业务",
      en: "Products & Business",
      ja: "製品とビジネス",
    },
    components: {
      edit: {
        PublishButton: "./src/payload/admin/PublishControls#PublishControls",
        // 取消发布按钮由 PublishControls 直接渲染为独立按钮，避免默认 UI 藏在下拉菜单里
        UnpublishButton: false,
      },
    },
    preview: (doc, { locale }) => {
      const base = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
      const secret = process.env.PREVIEW_SECRET;
      const slug = String((doc as any)?.slug ?? "").trim();
      const resolvedLocale = ["zh", "en", "ja"].includes(String(locale)) ? String(locale) : "zh";

      if (!secret || !slug) return null;

      const url = new URL("/api/preview", base);
      url.searchParams.set("secret", secret);
      url.searchParams.set("collection", "products");
      url.searchParams.set("slug", slug);
      url.searchParams.set("locale", resolvedLocale);
      return url.toString();
    },
    useAsTitle: "slug",
    defaultColumns: ["slug", "model", "series", "_status", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: {
        zh: "名称",
        en: "Name",
        ja: "名称",
      },
      localized: true,
      required: true,
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
      name: "model",
      type: "text",
      label: {
        zh: "型号",
        en: "Model",
        ja: "型番",
      },
    },
    {
      name: "series",
      type: "relationship",
      label: {
        zh: "系列",
        en: "Series",
        ja: "シリーズ",
      },
      relationTo: "productSeries",
    },
    {
      name: "heroImage",
      type: "upload",
      label: {
        zh: "主图",
        en: "Hero Image",
        ja: "メイン画像",
      },
      relationTo: "media",
    },
    {
      name: "brief",
      type: "textarea",
      label: {
        zh: "简介",
        en: "Brief",
        ja: "概要",
      },
      localized: true,
    },

    {
      name: "details",
      type: "group",
      label: {
        zh: "详情",
        en: "Details",
        ja: "詳細",
      },
      fields: [
        {
          name: "subtitle",
          type: "text",
          label: {
            zh: "副标题",
            en: "Subtitle",
            ja: "サブタイトル",
          },
          localized: true,
        },
        {
          name: "overview",
          type: "richText",
          label: {
            zh: "概览",
            en: "Overview",
            ja: "概要",
          },
          localized: true,
        },
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
          type: "array",
          localized: true,
          label: {
            zh: "特性",
            en: "Features",
            ja: "特徴",
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
              name: "gallery",
              type: "array",
              label: {
                zh: "图片组",
                en: "Gallery",
                ja: "ギャラリー",
              },
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: {
                    zh: "名称",
                    en: "Name",
                    ja: "名称",
                  },
                  localized: true,
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
              ],
            },
          ],
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
          name: "sampleCases",
          type: "group",
          label: {
            zh: "示例案例",
            en: "Sample Cases",
            ja: "サンプル事例",
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
                zh: "内容分组（统一格式）",
                en: "Sections (Unified Format)",
                ja: "セクション（統一形式）",
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  localized: true,
                  label: {
                    zh: "分组标题",
                    en: "Section Title",
                    ja: "セクションタイトル",
                  },
                },
                {
                  name: "items",
                  type: "array",
                  localized: true,
                  label: {
                    zh: "条目列表",
                    en: "Items",
                    ja: "アイテム一覧",
                  },
                  fields: [
                    {
                      name: "name",
                      type: "text",
                      localized: true,
                      label: {
                        zh: "名称",
                        en: "Name",
                        ja: "名称",
                      },
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
                  ],
                },
              ],
            },
          ],
        },

        {
          name: "sensorConfig",
          type: "json",
          localized: true,
          label: {
            zh: "传感器配置 (JSON)",
            en: "Sensor Config (JSON)",
            ja: "センサー構成 (JSON)",
          },
        },
        {
          name: "controllerConfig",
          type: "json",
          localized: true,
          label: {
            zh: "控制器配置 (JSON)",
            en: "Controller Config (JSON)",
            ja: "コントローラー構成 (JSON)",
          },
        },
        {
          name: "softwareConfig",
          type: "json",
          localized: true,
          label: {
            zh: "软件配置 (JSON)",
            en: "Software Config (JSON)",
            ja: "ソフトウェア構成 (JSON)",
          },
        },
        {
          name: "experiments",
          type: "json",
          localized: true,
          label: {
            zh: "实验项目 (JSON)",
            en: "Experiments (JSON)",
            ja: "実験 (JSON)",
          },
        },
      ],
    },
  ],
};
