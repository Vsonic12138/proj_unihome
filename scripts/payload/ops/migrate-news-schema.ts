import "dotenv/config";

import { getPayload } from "payload";

import config from "../../../payload.config";
import { migrations } from "../../../src/migrations";

const NEWS_MIGRATION = "20260714_013342_news_showcase";

type DbWithDrizzle = {
  drizzle: {
    execute: (query: unknown) => Promise<unknown>;
  };
  destroy: () => Promise<void>;
};

async function main() {
  const migration = migrations.find(({ name }) => name === NEWS_MIGRATION);
  if (!migration) {
    throw new Error(`[cms:news-migrate] Missing migration: ${NEWS_MIGRATION}`);
  }

  const payload = await getPayload({ config });
  const db = payload.db as unknown as DbWithDrizzle;

  try {
    const existing = await payload.find({
      collection: "payload-migrations",
      where: {
        name: {
          equals: NEWS_MIGRATION,
        },
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      console.log(`[cms:news-migrate] Already applied: ${NEWS_MIGRATION}`);
      return;
    }

    const latest = await payload.find({
      collection: "payload-migrations",
      limit: 1,
      sort: "-batch",
      depth: 0,
      overrideAccess: true,
    });
    const latestBatch = Number(latest.docs[0]?.batch ?? 0);
    const nextBatch = Number.isFinite(latestBatch) && latestBatch > 0 ? latestBatch + 1 : 1;

    console.log(`[cms:news-migrate] Applying ${NEWS_MIGRATION} (batch=${nextBatch})`);
    await migration.up({
      db: db.drizzle,
      payload,
      // Targeted production patch runner does not need a full Payload request context.
      req: undefined as never,
    });

    await payload.create({
      collection: "payload-migrations",
      data: {
        name: NEWS_MIGRATION,
        batch: nextBatch,
      },
      overrideAccess: true,
    });

    console.log(`[cms:news-migrate] Applied ${NEWS_MIGRATION}`);
  } finally {
    await db.destroy();
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
