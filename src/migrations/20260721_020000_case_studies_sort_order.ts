import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/**
 * Add operational sort order to case studies.
 * Idempotent: safe if columns already exist (e.g. after a previous push).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "case_studies"
      ADD COLUMN IF NOT EXISTS "sort_order" numeric DEFAULT 0;

    ALTER TABLE "_case_studies_v"
      ADD COLUMN IF NOT EXISTS "version_sort_order" numeric DEFAULT 0;

    CREATE INDEX IF NOT EXISTS "case_studies_sort_order_idx"
      ON "case_studies" USING btree ("sort_order");

    CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_sort_order_idx"
      ON "_case_studies_v" USING btree ("version_sort_order");

    UPDATE "case_studies"
      SET "sort_order" = 0
      WHERE "sort_order" IS NULL;

    UPDATE "_case_studies_v"
      SET "version_sort_order" = 0
      WHERE "version_sort_order" IS NULL;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "case_studies_sort_order_idx";
    DROP INDEX IF EXISTS "_case_studies_v_version_version_sort_order_idx";

    ALTER TABLE "case_studies" DROP COLUMN IF EXISTS "sort_order";
    ALTER TABLE "_case_studies_v" DROP COLUMN IF EXISTS "version_sort_order";
  `);
}
