import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings_support_resources_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_settings_support_resources_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "site_settings_locales" ADD COLUMN "products_catalog_core_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "products_catalog_core_description" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "products_catalog_view_details_cta" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_applicable" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_features" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_sample_cases" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_modules" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_chassis" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_arms" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_composite_robots" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_configuration" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_sensor_config" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_controller_config" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_software_config" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_experiments" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_specs" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "support_resources_title" varchar;
  ALTER TABLE "site_settings_support_resources_items" ADD CONSTRAINT "site_settings_support_resources_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_support_resources_items_locales" ADD CONSTRAINT "site_settings_support_resources_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_support_resources_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_support_resources_items_order_idx" ON "site_settings_support_resources_items" USING btree ("_order");
  CREATE INDEX "site_settings_support_resources_items_parent_id_idx" ON "site_settings_support_resources_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_support_resources_items_locales_locale_parent_" ON "site_settings_support_resources_items_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_support_resources_items" CASCADE;
  DROP TABLE "site_settings_support_resources_items_locales" CASCADE;
  ALTER TABLE "site_settings_locales" DROP COLUMN "products_catalog_core_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "products_catalog_core_description";
  ALTER TABLE "site_settings_locales" DROP COLUMN "products_catalog_view_details_cta";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_applicable";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_features";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_sample_cases";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_modules";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_chassis";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_arms";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_composite_robots";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_configuration";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_sensor_config";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_controller_config";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_software_config";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_experiments";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_specs";
  ALTER TABLE "site_settings_locales" DROP COLUMN "support_resources_title";`)
}
