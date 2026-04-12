import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { enTranslations } from "@payloadcms/translations/languages/en";
import { jaTranslations } from "@payloadcms/translations/languages/ja";
import { zhTranslations } from "@payloadcms/translations/languages/zh";

import { CaseStudies } from "./src/payload/collections/CaseStudies";
import { FAQ } from "./src/payload/collections/FAQ";
import { Media } from "./src/payload/collections/Media";
import { MediaFolders } from "./src/payload/collections/MediaFolders";
import { Pages } from "./src/payload/collections/Pages";
import { Products } from "./src/payload/collections/Products";
import { ProductSeries } from "./src/payload/collections/ProductSeries";
import { Tickets } from "./src/payload/collections/Tickets";
import { Users } from "./src/payload/collections/Users";
import { Footer } from "./src/payload/globals/Footer";
import { Navigation } from "./src/payload/globals/Navigation";
import { SiteSettings } from "./src/payload/globals/SiteSettings";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function shouldPushSchema(): boolean {
  return process.env.PAYLOAD_SCHEMA_PUSH !== "false";
}

export default buildConfig({
  secret: requiredEnv("PAYLOAD_SECRET"),
  sharp,
  routes: {
    admin: "/admin",
    api: "/api",
  },
  db: postgresAdapter({
    push: shouldPushSchema(),
    pool: {
      connectionString:
        process.env.DATABASE_URI ??
        process.env.DATABASE_URL ??
        requiredEnv("DATABASE_URI"),
    },
  }),
  editor: lexicalEditor({}),
  localization: {
    locales: [
      { label: "📝 录入中文内容 (ZH Data)", code: "zh" },
      { label: "📝 录入英文内容 (EN Data)", code: "en" },
      { label: "📝 录入日文内容 (JA Data)", code: "ja" },
    ],
    defaultLocale: "zh",
    fallback: true,
  },
  i18n: {
    fallbackLanguage: "zh",
    supportedLanguages: {
      zh: {
        translations: zhTranslations,
        dateFNSKey: "zh-CN",
      },
      en: {
        translations: enTranslations,
        dateFNSKey: "en-US",
      },
      ja: {
        translations: jaTranslations,
        dateFNSKey: "ja",
      },
    },
  },
  admin: {
    user: Users.slug,
    meta: {
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/images/logo/logo-2.svg',
        },
      ],
    },
    components: {
      graphics: {
        Logo: "./src/payload/admin/Logo#Logo",
        Icon: "./src/payload/admin/Icon#Icon",
      },
      // Global client-side hook: set dataset attrs for CSS-only i18n in Admin UI
      beforeNavLinks: [
        "./src/payload/admin/SetAdminI18nAttributes#SetAdminI18nAttributes",
      ],
    },
  },
  collections: [
    Users,
    MediaFolders,
    Media,
    Pages,
    ProductSeries,
    Products,
    FAQ,
    CaseStudies,
    Tickets,
  ],
  globals: [SiteSettings, Navigation, Footer],
  typescript: {
    outputFile: path.resolve(process.cwd(), "src/payload-types.ts"),
  },
});
