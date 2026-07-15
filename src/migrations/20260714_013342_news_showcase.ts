import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_news_category" AS ENUM('company', 'industry', 'media');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_category" AS ENUM('company', 'industry', 'media');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('zh', 'en', 'ja');
  CREATE TABLE "pages_blocks_news_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_news_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_news_category",
  	"cover_image_id" integer,
  	"publish_date" timestamp(3) with time zone,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__news_v_version_category",
  	"version_cover_image_id" integer,
  	"version_publish_date" timestamp(3) with time zone,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_content" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "news_id" integer;
  ALTER TABLE "pages_blocks_news_showcase" ADD CONSTRAINT "pages_blocks_news_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_showcase" ADD CONSTRAINT "_pages_v_blocks_news_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_news_showcase_order_idx" ON "pages_blocks_news_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_showcase_parent_id_idx" ON "pages_blocks_news_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_showcase_path_idx" ON "pages_blocks_news_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_news_showcase_locale_idx" ON "pages_blocks_news_showcase" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_news_showcase_order_idx" ON "_pages_v_blocks_news_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_showcase_parent_id_idx" ON "_pages_v_blocks_news_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_showcase_path_idx" ON "_pages_v_blocks_news_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_news_showcase_locale_idx" ON "_pages_v_blocks_news_showcase" USING btree ("_locale");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_category_idx" ON "news" USING btree ("category");
  CREATE INDEX "news_cover_image_idx" ON "news" USING btree ("cover_image_id");
  CREATE INDEX "news_publish_date_idx" ON "news" USING btree ("publish_date");
  CREATE INDEX "news_seo_seo_image_idx" ON "news" USING btree ("seo_image_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_category_idx" ON "_news_v" USING btree ("version_category");
  CREATE INDEX "_news_v_version_version_cover_image_idx" ON "_news_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_news_v_version_version_publish_date_idx" ON "_news_v" USING btree ("version_publish_date");
  CREATE INDEX "_news_v_version_seo_version_seo_image_idx" ON "_news_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_news_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_news_fk";
  DROP INDEX "payload_locked_documents_rels_news_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "news_id";
  DROP TABLE "pages_blocks_news_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_news_showcase" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_category";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";`)
}
