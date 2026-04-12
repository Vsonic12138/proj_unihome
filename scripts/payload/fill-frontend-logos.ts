import "dotenv/config";

import path from "node:path";

import { getPayload } from "payload";

import config from "../../payload.config";

const LOCALES = ["zh", "en", "ja"] as const;
const BRAND_FOLDER_SLUG = "site-branding";

const BRAND_FOLDER_NAME = {
  zh: "品牌资源",
  en: "Brand Assets",
  ja: "ブランド素材",
} as const;

const LOGO_SPECS = [
  {
    key: "headerLogo",
    sourcePath: "/images/logo/logo-2.svg",
    alt: {
      zh: "官网页眉 Logo（浅色模式）",
      en: "Website header logo (light mode)",
      ja: "サイトヘッダーロゴ（ライトモード）",
    },
  },
  {
    key: "headerLogoInverse",
    sourcePath: "/images/logo/logo.svg",
    alt: {
      zh: "官网页眉 Logo（深色模式）",
      en: "Website header logo (dark mode)",
      ja: "サイトヘッダーロゴ（ダークモード）",
    },
  },
  {
    key: "footerLogo",
    sourcePath: "/images/logo/logo-text.svg",
    alt: {
      zh: "官网页脚 Logo（浅色模式）",
      en: "Website footer logo (light mode)",
      ja: "サイトフッターロゴ（ライトモード）",
    },
  },
  {
    key: "footerLogoInverse",
    sourcePath: "/images/logo/logo-text-inverse.svg",
    alt: {
      zh: "官网页脚 Logo（深色模式）",
      en: "Website footer logo (dark mode)",
      ja: "サイトフッターロゴ（ダークモード）",
    },
  },
  {
    key: "favicon",
    sourcePath: "/images/logo/logo-2.svg",
    alt: {
      zh: "官网标签页图标",
      en: "Website browser tab icon",
      ja: "サイトのブラウザタブアイコン",
    },
  },
] as const;

async function ensureBrandFolder(payload: any) {
  const existing = await payload.find({
    collection: "mediaFolders",
    where: {
      slug: { equals: BRAND_FOLDER_SLUG },
    },
    limit: 1,
    locale: "zh",
    overrideAccess: true,
    draft: true,
  });

  let folderId = existing.docs?.[0]?.id ?? null;

  for (const locale of LOCALES) {
    const data = {
      name: BRAND_FOLDER_NAME[locale],
      slug: BRAND_FOLDER_SLUG,
      parent: null,
      sortOrder: 0,
    };

    if (!folderId) {
      const created = await payload.create({
        collection: "mediaFolders",
        locale,
        overrideAccess: true,
        data,
      });
      folderId = created.id;
    } else {
      await payload.update({
        collection: "mediaFolders",
        id: folderId,
        locale,
        overrideAccess: true,
        data,
      });
    }
  }

  return folderId;
}

async function ensureMediaDoc(payload: any, args: {
  sourcePath: string;
  alt: Record<(typeof LOCALES)[number], string>;
  folderId: number | string;
}) {
  const { sourcePath, alt, folderId } = args;
  const existing = await payload.find({
    collection: "media",
    where: {
      sourcePath: { equals: sourcePath },
    },
    limit: 1,
    locale: "zh",
    overrideAccess: true,
    draft: true,
  });

  let mediaId = existing.docs?.[0]?.id ?? null;
  const filePath = path.resolve(process.cwd(), "public", sourcePath.replace(/^\/+/, ""));

  if (!mediaId) {
    const created = await payload.create({
      collection: "media",
      locale: "zh",
      overrideAccess: true,
      filePath,
      data: {
        folder: folderId,
        sourcePath,
        alt: alt.zh,
      },
    });
    mediaId = created.id;
  }

  for (const locale of LOCALES) {
    await payload.update({
      collection: "media",
      id: mediaId,
      locale,
      overrideAccess: true,
      data: {
        folder: folderId,
        sourcePath,
        alt: alt[locale],
      },
    });
  }

  return mediaId;
}

async function main() {
  if ((config as any)?.db) {
    (config as any).db.push = false;
  }

  const payload = await getPayload({ config });
  const folderId = await ensureBrandFolder(payload);

  const frontendBranding: Record<string, number | string> = {};

  for (const spec of LOGO_SPECS) {
    frontendBranding[spec.key] = await ensureMediaDoc(payload, {
      sourcePath: spec.sourcePath,
      alt: spec.alt,
      folderId,
    });
    // eslint-disable-next-line no-console
    console.log(`[fill] ${spec.key} -> ${spec.sourcePath}`);
  }

  await payload.updateGlobal({
    slug: "siteSettings",
    locale: "zh",
    overrideAccess: true,
    data: {
      frontendBranding,
    },
  });

  // eslint-disable-next-line no-console
  console.log("[fill] siteSettings.frontendBranding updated");

  await Promise.race([
    (payload.db as any)?.destroy?.(),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  process.exit(0);
}

main().catch((error) => {
  const message = String((error as any)?.message ?? "");
  const causeMessage = String((error as any)?.cause?.message ?? "");
  const missingFrontendBrandingColumn =
    message.includes("frontend_branding_") || causeMessage.includes("frontend_branding_");

  if (missingFrontendBrandingColumn) {
    // eslint-disable-next-line no-console
    console.error(
      [
        "[fill] 检测到数据库尚未完成 SiteSettings.frontendBranding 的表结构更新。",
        "[fill] 请先执行一次 schema push（需要接受删除旧 logo/logoInverse 列的 warning），然后再重新运行：npm run fill:frontend-logos",
      ].join("\n"),
    );
  }

  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
