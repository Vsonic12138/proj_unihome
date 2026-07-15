import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

import config from "../../../payload.config";

const LOCALES = ["zh", "en", "ja"] as const;
const GLOBAL_SLUGS = ["siteSettings", "navigation", "footer"] as const;
const COLLECTION_SLUGS = ["mediaFolders", "media", "pages", "productSeries", "products", "faq", "caseStudies", "news"] as const;

async function findAllDocs(payload: any, collection: (typeof COLLECTION_SLUGS)[number], locale: (typeof LOCALES)[number]) {
  const docs: unknown[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const result = await payload.find({
      collection,
      locale,
      depth: 2,
      draft: true,
      overrideAccess: true,
      limit: 100,
      page,
      sort: "id",
    });

    docs.push(...(result.docs ?? []));
    hasNextPage = Boolean(result.hasNextPage);
    page += 1;
  }

  return docs;
}

async function main() {
  if ((config as any)?.db) {
    (config as any).db.push = false;
  }

  const payload = await getPayload({ config });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupsDir = path.resolve(process.cwd(), "backups");
  const snapshotPath = path.join(backupsDir, `cms_snapshot_${timestamp}.json`);
  const latestPath = path.join(backupsDir, "cms_snapshot_latest.json");

  await fs.mkdir(backupsDir, { recursive: true });

  const globals: Record<string, Record<string, unknown>> = {};
  const collections: Record<string, Record<string, unknown[]>> = {};

  for (const locale of LOCALES) {
    globals[locale] = {};
    collections[locale] = {};

    for (const globalSlug of GLOBAL_SLUGS) {
      globals[locale][globalSlug] = await payload.findGlobal({
        slug: globalSlug,
        locale,
        depth: 2,
        overrideAccess: true,
      });
    }

    for (const collectionSlug of COLLECTION_SLUGS) {
      collections[locale][collectionSlug] = await findAllDocs(payload, collectionSlug, locale);
    }
  }

  const snapshot = {
    meta: {
      generatedAt: new Date().toISOString(),
      locales: [...LOCALES],
      globals: [...GLOBAL_SLUGS],
      collections: [...COLLECTION_SLUGS],
    },
    globals,
    collections,
  };

  const content = JSON.stringify(snapshot, null, 2);
  await fs.writeFile(snapshotPath, content, "utf8");
  await fs.writeFile(latestPath, content, "utf8");

  // eslint-disable-next-line no-console
  console.log(`[snapshot] wrote ${path.relative(process.cwd(), snapshotPath)}`);
  // eslint-disable-next-line no-console
  console.log(`[snapshot] updated ${path.relative(process.cwd(), latestPath)}`);

  await Promise.race([
    (payload.db as any)?.destroy?.(),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  process.exit(0);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
