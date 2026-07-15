import "dotenv/config";

import { getPayload } from "payload";
import config from "../../../payload.config";

type CollectionSlug = "pages" | "products" | "caseStudies" | "news";

function getCollectionsFromArgs(): CollectionSlug[] {
  const raw = process.argv.slice(2);
  if (raw.length === 0 || raw.includes("all")) {
    return ["pages", "products", "caseStudies", "news"];
  }

  const allowed = new Set<CollectionSlug>([
    "pages",
    "products",
    "caseStudies",
    "news",
  ]);
  const unique = [...new Set(raw)] as string[];
  const collections = unique.filter((s): s is CollectionSlug => allowed.has(s as CollectionSlug));
  return collections.length > 0
    ? collections
    : ["pages", "products", "caseStudies", "news"];
}

async function publishCollection(payload: any, collection: CollectionSlug) {
  const res = await payload.find({
    collection,
    where: { _status: { equals: "draft" } },
    limit: 500,
    depth: 0,
    overrideAccess: true,
  });

  // eslint-disable-next-line no-console
  console.log(`[publish] ${collection}: found draft=${res.docs.length}`);

  let published = 0;
  let failed = 0;

  for (const doc of res.docs as any[]) {
    const id = doc?.id;
    const slug = doc?.slug ? String(doc.slug) : undefined;
    try {
      await payload.update({
        collection,
        id,
        data: {},
        draft: false, // publish
        overrideAccess: true,
      });
      published++;
    } catch (error) {
      failed++;
      // eslint-disable-next-line no-console
      console.error(`[publish] FAILED ${collection} id=${id} slug=${slug ?? ""}`, error);
    }
  }

  // eslint-disable-next-line no-console
  console.log(`[publish] ${collection}: published=${published} failed=${failed}`);
}

async function main() {
  const collections = getCollectionsFromArgs();
  const payload = await getPayload({ config });

  try {
    for (const collection of collections) {
      await publishCollection(payload, collection);
    }
  } finally {
    await Promise.race([
      (payload.db as any)?.destroy?.(),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
    process.exit(0);
  }
}

await main();
