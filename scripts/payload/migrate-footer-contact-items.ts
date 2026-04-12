import "dotenv/config";

import { getPayload } from "payload";
import config from "../../payload.config";

const LOCALES = ["zh", "en", "ja"] as const;
type Locale = (typeof LOCALES)[number];

function resolveMediaID(value: unknown): string | number | null {
  if (!value) return null;
  if (typeof value === "string" || typeof value === "number") return value;
  if (typeof value === "object" && "id" in (value as any)) return (value as any).id ?? null;
  return null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

async function main() {
  const payload = await getPayload({ config });

  for (const locale of LOCALES) {
    const footer = await payload.findGlobal({
      slug: "footer",
      locale,
      depth: 1,
      overrideAccess: true,
    });

    const existing = (footer as any)?.contactItems;
    if (Array.isArray(existing) && existing.length > 0) {
      // eslint-disable-next-line no-console
      console.log(`[migrate] footer locale=${locale} skip (contactItems already set)`);
      continue;
    }

    const siteSettings = await payload.findGlobal({
      slug: "siteSettings",
      locale,
      depth: 1,
      overrideAccess: true,
    });

    const socialLinks = Array.isArray((siteSettings as any)?.socialLinks)
      ? ((siteSettings as any).socialLinks as Array<{ label?: string; href?: string }>)
      : [];

    const findSocial = (needle: "taobao" | "bilibili") => {
      const match = socialLinks.find((item) => {
        const href = String(item?.href ?? "").toLowerCase();
        const label = String(item?.label ?? "").toLowerCase();
        return href.includes(needle) || label.includes(needle);
      });
      const href = String(match?.href ?? "").trim();
      const label = String(match?.label ?? "").trim();
      return href && label ? { href, label } : null;
    };

    const taobao = findSocial("taobao");
    const bilibili = findSocial("bilibili");

    const qrCodes = Array.isArray((footer as any)?.qrCodes)
      ? ((footer as any).qrCodes as Array<{ title?: string; image?: unknown }>)
      : [];
    const qqQR = qrCodes[0] ?? null;
    const wechatQR = qrCodes[1] ?? null;

    const contactItems: any[] = [];
    if (taobao) {
      contactItems.push({
        key: "taobao",
        type: "link",
        label: taobao.label,
        href: taobao.href,
      });
    }
    if (bilibili) {
      contactItems.push({
        key: "bilibili",
        type: "link",
        label: bilibili.label,
        href: bilibili.href,
      });
    }

    const qqImage = resolveMediaID(qqQR?.image);
    const qqTitle = String(qqQR?.title ?? "").trim();
    if (qqImage && qqTitle) {
      contactItems.push({
        key: "qq",
        type: "qr",
        label: qqTitle,
        description: "",
        image: qqImage,
      });
    }

    const wechatImage = resolveMediaID(wechatQR?.image);
    const wechatTitle = String(wechatQR?.title ?? "").trim();
    if (wechatImage && wechatTitle) {
      contactItems.push({
        key: "wechat",
        type: "qr",
        label: wechatTitle,
        description: "",
        image: wechatImage,
      });
    }

    if (contactItems.length === 0) {
      // eslint-disable-next-line no-console
      console.log(`[migrate] footer locale=${locale} skip (no legacy data found)`);
      continue;
    }

    await payload.updateGlobal({
      slug: "footer",
      locale: locale as Locale,
      overrideAccess: true,
      data: {
        contactItems,
      } as any,
    });

    // eslint-disable-next-line no-console
    console.log(`[migrate] footer locale=${locale} set contactItems=${contactItems.length}`);
  }

  await Promise.race([
    (payload.db as any)?.destroy?.(),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

