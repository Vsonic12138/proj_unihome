import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" ADD COLUMN "icp_number" varchar;
    ALTER TABLE "site_settings" ADD COLUMN "icp_link" varchar;
    ALTER TABLE "site_settings" ADD COLUMN "psb_number" varchar;
    ALTER TABLE "site_settings" ADD COLUMN "psb_icon_id" integer;

    ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_psb_icon_id_media_id_fk" FOREIGN KEY ("psb_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX "site_settings_psb_icon_idx" ON "site_settings" USING btree ("psb_icon_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_psb_icon_id_media_id_fk";

    DROP INDEX "site_settings_psb_icon_idx";

    ALTER TABLE "site_settings" DROP COLUMN "icp_number";
    ALTER TABLE "site_settings" DROP COLUMN "icp_link";
    ALTER TABLE "site_settings" DROP COLUMN "psb_number";
    ALTER TABLE "site_settings" DROP COLUMN "psb_icon_id";
  `)
}

