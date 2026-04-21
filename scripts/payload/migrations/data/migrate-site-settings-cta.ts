import "dotenv/config";

import { getPayload } from "payload";
import config from "../../../../payload.config";

const LOCALES = ["zh", "en", "ja"] as const;

type Locale = (typeof LOCALES)[number];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

async function main() {
  const payload = await getPayload({ config });

  for (const locale of LOCALES) {
    const siteSettings = await payload.findGlobal({
      slug: "siteSettings",
      locale,
      depth: 0,
      overrideAccess: true,
    });

    const currentCta = (siteSettings as any)?.ctaDefaults?.viewDetailsCta;
    if (isNonEmptyString(currentCta)) {
      // eslint-disable-next-line no-console
      console.log(`[migrate] locale=${locale} skip (ctaDefaults.viewDetailsCta already set)`);
      continue;
    }

    const nextCta = "View Details";

    await payload.updateGlobal({
      slug: "siteSettings",
      locale: locale as Locale,
      overrideAccess: true,
      data: {
        ctaDefaults: {
          viewDetailsCta: nextCta,
        },
      } as any,
    });

    // eslint-disable-next-line no-console
    console.log(`[migrate] locale=${locale} set ctaDefaults.viewDetailsCta=${JSON.stringify(nextCta)}`);
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
