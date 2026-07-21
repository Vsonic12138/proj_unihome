import "dotenv/config";

import { getPayload } from "payload";

import config from "../../../payload.config";
import { migrations } from "../../../src/migrations";

const CASE_SORT_MIGRATION = "20260721_020000_case_studies_sort_order";

type DbWithDrizzle = {
  drizzle: {
    execute: (query: unknown) => Promise<unknown>;
  };
  destroy: () => Promise<void>;
};

async function main() {
  const migration = migrations.find(({ name }) => name === CASE_SORT_MIGRATION);
  if (!migration) {
    throw new Error(`[cms:case-sort-migrate] Missing migration: ${CASE_SORT_MIGRATION}`);
  }

  const payload = await getPayload({ config });
  const db = payload.db as unknown as DbWithDrizzle;

  try {
    const existing = await payload.find({
      collection: "payload-migrations",
      where: {
        name: {
          equals: CASE_SORT_MIGRATION,
        },
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      console.log(`[cms:case-sort-migrate] Already applied: ${CASE_SORT_MIGRATION}`);
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

    console.log(`[cms:case-sort-migrate] Applying ${CASE_SORT_MIGRATION} (batch=${nextBatch})`);
    await migration.up({
      db: db.drizzle,
      payload,
      req: undefined as never,
    });

    await payload.create({
      collection: "payload-migrations",
      data: {
        name: CASE_SORT_MIGRATION,
        batch: nextBatch,
      },
      overrideAccess: true,
    });

    console.log(`[cms:case-sort-migrate] Applied ${CASE_SORT_MIGRATION}`);
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
