import "dotenv/config";

import { getPayload } from "payload";
import config from "../../payload.config";

const LOCALES = ["zh", "en", "ja"] as const;

type Locale = (typeof LOCALES)[number];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasAnyContactInfo(value: any) {
  return (
    isNonEmptyString(value?.phone) ||
    isNonEmptyString(value?.email) ||
    isNonEmptyString(value?.address)
  );
}

async function main() {
  const payload = await getPayload({ config });

  for (const locale of LOCALES) {
    const footer = await payload.findGlobal({
      slug: "footer",
      locale,
      depth: 0,
      overrideAccess: true,
    });

    const current = (footer as any)?.contactInfo;
    if (hasAnyContactInfo(current)) {
      // eslint-disable-next-line no-console
      console.log(`[migrate] locale=${locale} skip (footer.contactInfo already set)`);
      continue;
    }

    const siteSettings = await payload.findGlobal({
      slug: "siteSettings",
      locale,
      depth: 0,
      overrideAccess: true,
    });

    const legacy = (siteSettings as any)?.contactInfo;
    if (!hasAnyContactInfo(legacy)) {
      // eslint-disable-next-line no-console
      console.log(`[migrate] locale=${locale} skip (no legacy siteSettings.contactInfo found)`);
      continue;
    }

    await payload.updateGlobal({
      slug: "footer",
      locale: locale as Locale,
      overrideAccess: true,
      data: {
        contactInfo: {
          phone: isNonEmptyString(legacy?.phone) ? legacy.phone : undefined,
          email: isNonEmptyString(legacy?.email) ? legacy.email : undefined,
          address: isNonEmptyString(legacy?.address) ? legacy.address : undefined,
        },
      } as any,
    });

    // eslint-disable-next-line no-console
    console.log(`[migrate] locale=${locale} ok (copied siteSettings.contactInfo -> footer.contactInfo)`);
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

