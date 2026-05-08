import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_case_studies_list_category" AS ENUM('practical-teaching', 'sci-tech-innovation', 'innovation-competition', 'training-base');
  CREATE TYPE "public"."enum__pages_v_blocks_case_studies_list_category" AS ENUM('practical-teaching', 'sci-tech-innovation', 'innovation-competition', 'training-base');
  CREATE TYPE "public"."enum_tickets_status" AS ENUM('pending', 'in_progress', 'resolved');
  CREATE TYPE "public"."enum_footer_contact_items_key" AS ENUM('taobao', 'bilibili', 'qq', 'wechat');
  CREATE TYPE "public"."enum_footer_contact_items_type" AS ENUM('link', 'qr');
  CREATE TABLE "media_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media_folders_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_products_catalog_series_order" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"series_id" integer
  );
  
  CREATE TABLE "pages_blocks_products_catalog_product_order" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE "pages_blocks_products_catalog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"core_title" varchar,
  	"core_description" varchar,
  	"view_details_cta" varchar DEFAULT 'View Details',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_case_studies_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" "enum_pages_blocks_case_studies_list_category",
  	"limit" numeric DEFAULT 50,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_intention_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"option" varchar
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"products_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_products_catalog_series_order" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"series_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_products_catalog_product_order" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_products_catalog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"core_title" varchar,
  	"core_description" varchar,
  	"view_details_cta" varchar DEFAULT 'View Details',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_case_studies_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum__pages_v_blocks_case_studies_list_category",
  	"limit" numeric DEFAULT 50,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_intention_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"option" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"products_id" integer
  );
  
  CREATE TABLE "products_details_features_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "products_details_sample_cases_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "products_details_sample_cases_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "_products_v_version_details_features_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_details_sample_cases_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_details_sample_cases_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "faq_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "tickets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar NOT NULL,
  	"intention" varchar NOT NULL,
  	"message" varchar,
  	"status" "enum_tickets_status" DEFAULT 'pending',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer_contact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_footer_contact_items_key" NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_footer_contact_items_type" NOT NULL,
  	"href" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  ALTER TABLE "pages_blocks_hero_slides_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features_featured_products_slugs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_gallery_images_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_slides_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_featured_products_slugs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_gallery_images_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_specs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_sample_cases_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_sample_cases_modules_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_sample_cases_chassis" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_sample_cases_chassis_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_sample_cases_arms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_sample_cases_arms_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_sample_cases_composite_robots" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_sample_cases_composite_robots_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_resources_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_specs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_sample_cases_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_sample_cases_modules_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_sample_cases_chassis" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_sample_cases_chassis_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_sample_cases_arms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_sample_cases_arms_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_sample_cases_composite_robots" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_sample_cases_composite_robots_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_resources_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_support_resources_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_support_resources_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_items_children_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_sections_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_qr_codes_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_slides_locales" CASCADE;
  DROP TABLE "pages_blocks_features_featured_products_slugs" CASCADE;
  DROP TABLE "pages_blocks_features_highlights_locales" CASCADE;
  DROP TABLE "pages_blocks_features_locales" CASCADE;
  DROP TABLE "pages_blocks_about_highlights_locales" CASCADE;
  DROP TABLE "pages_blocks_about_items_locales" CASCADE;
  DROP TABLE "pages_blocks_about_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_image_gallery_images_locales" CASCADE;
  DROP TABLE "pages_blocks_image_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_slides_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_features_featured_products_slugs" CASCADE;
  DROP TABLE "_pages_v_blocks_features_highlights_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_highlights_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery_images_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery_locales" CASCADE;
  DROP TABLE "products_details_features_locales" CASCADE;
  DROP TABLE "products_details_highlights_locales" CASCADE;
  DROP TABLE "products_details_specs" CASCADE;
  DROP TABLE "products_details_specs_locales" CASCADE;
  DROP TABLE "products_details_sample_cases_modules" CASCADE;
  DROP TABLE "products_details_sample_cases_modules_locales" CASCADE;
  DROP TABLE "products_details_sample_cases_chassis" CASCADE;
  DROP TABLE "products_details_sample_cases_chassis_locales" CASCADE;
  DROP TABLE "products_details_sample_cases_arms" CASCADE;
  DROP TABLE "products_details_sample_cases_arms_locales" CASCADE;
  DROP TABLE "products_details_sample_cases_composite_robots" CASCADE;
  DROP TABLE "products_details_sample_cases_composite_robots_locales" CASCADE;
  DROP TABLE "products_details_gallery" CASCADE;
  DROP TABLE "products_details_gallery_locales" CASCADE;
  DROP TABLE "products_details_resources" CASCADE;
  DROP TABLE "products_details_resources_locales" CASCADE;
  DROP TABLE "_products_v_version_details_features_locales" CASCADE;
  DROP TABLE "_products_v_version_details_highlights_locales" CASCADE;
  DROP TABLE "_products_v_version_details_specs" CASCADE;
  DROP TABLE "_products_v_version_details_specs_locales" CASCADE;
  DROP TABLE "_products_v_version_details_sample_cases_modules" CASCADE;
  DROP TABLE "_products_v_version_details_sample_cases_modules_locales" CASCADE;
  DROP TABLE "_products_v_version_details_sample_cases_chassis" CASCADE;
  DROP TABLE "_products_v_version_details_sample_cases_chassis_locales" CASCADE;
  DROP TABLE "_products_v_version_details_sample_cases_arms" CASCADE;
  DROP TABLE "_products_v_version_details_sample_cases_arms_locales" CASCADE;
  DROP TABLE "_products_v_version_details_sample_cases_composite_robots" CASCADE;
  DROP TABLE "_products_v_version_details_sample_cases_composite_robots_locales" CASCADE;
  DROP TABLE "_products_v_version_details_gallery" CASCADE;
  DROP TABLE "_products_v_version_details_gallery_locales" CASCADE;
  DROP TABLE "_products_v_version_details_resources" CASCADE;
  DROP TABLE "_products_v_version_details_resources_locales" CASCADE;
  DROP TABLE "site_settings_social_links_locales" CASCADE;
  DROP TABLE "site_settings_support_resources_items" CASCADE;
  DROP TABLE "site_settings_support_resources_items_locales" CASCADE;
  DROP TABLE "navigation_items_children_locales" CASCADE;
  DROP TABLE "navigation_items_locales" CASCADE;
  DROP TABLE "footer_sections_links_locales" CASCADE;
  DROP TABLE "footer_sections_locales" CASCADE;
  DROP TABLE "footer_qr_codes_locales" CASCADE;
  ALTER TABLE "faq" DROP CONSTRAINT "faq_product_id_products_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_logo_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_logo_inverse_id_media_id_fk";
  
  ALTER TABLE "case_studies" ALTER COLUMN "category" SET DATA TYPE text;
  DROP TYPE "public"."enum_case_studies_category";
  CREATE TYPE "public"."enum_case_studies_category" AS ENUM('practical-teaching', 'sci-tech-innovation', 'innovation-competition', 'training-base');
  ALTER TABLE "case_studies" ALTER COLUMN "category" SET DATA TYPE "public"."enum_case_studies_category" USING "category"::"public"."enum_case_studies_category";
  ALTER TABLE "_case_studies_v" ALTER COLUMN "version_category" SET DATA TYPE text;
  DROP TYPE "public"."enum__case_studies_v_version_category";
  CREATE TYPE "public"."enum__case_studies_v_version_category" AS ENUM('practical-teaching', 'sci-tech-innovation', 'innovation-competition', 'training-base');
  ALTER TABLE "_case_studies_v" ALTER COLUMN "version_category" SET DATA TYPE "public"."enum__case_studies_v_version_category" USING "version_category"::"public"."enum__case_studies_v_version_category";
  DROP INDEX "products_status_idx";
  DROP INDEX "_products_v_version_version_status_idx";
  DROP INDEX "faq_product_idx";
  DROP INDEX "site_settings_logo_idx";
  DROP INDEX "site_settings_logo_inverse_idx";
  ALTER TABLE "pages_blocks_hero_slides" ALTER COLUMN "id" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_hero_slides" ALTER COLUMN "_uuid" SET DATA TYPE varchar;
  ALTER TABLE "site_settings_locales" ALTER COLUMN "legal_text" SET DEFAULT '{"root":{"type":"root","format":"","indent":0,"version":1,"direction":"ltr","children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[]}]}}'::jsonb;
  ALTER TABLE "media" ADD COLUMN "folder_id" integer;
  ALTER TABLE "pages_blocks_hero_slides" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_hero_slides" ADD COLUMN "slide_id" numeric;
  ALTER TABLE "pages_blocks_hero_slides" ADD COLUMN "alt" varchar;
  ALTER TABLE "pages_blocks_hero_slides" ADD COLUMN "action_label" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_features_highlights" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_features_highlights" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_features_highlights" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_features_highlights" ADD COLUMN "link" varchar;
  ALTER TABLE "pages_blocks_features_highlights" ADD COLUMN "tags" varchar;
  ALTER TABLE "pages_blocks_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_features" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_features" ADD COLUMN "paragraph" varchar;
  ALTER TABLE "pages_blocks_features" ADD COLUMN "featured_products_title" varchar;
  ALTER TABLE "pages_blocks_features" ADD COLUMN "featured_products_description" varchar;
  ALTER TABLE "pages_blocks_features" ADD COLUMN "featured_products_cta_description" varchar;
  ALTER TABLE "pages_blocks_features" ADD COLUMN "featured_products_view_all_label" varchar;
  ALTER TABLE "pages_blocks_about_highlights" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_about_highlights" ADD COLUMN "text" varchar;
  ALTER TABLE "pages_blocks_about_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_about_items" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_about_items" ADD COLUMN "paragraph" varchar;
  ALTER TABLE "pages_blocks_about" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_about" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_about" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_about" ADD COLUMN "content" jsonb;
  ALTER TABLE "pages_blocks_about" ADD COLUMN "image_alt" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_name_label" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_name_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_email_label" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_email_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_phone_label" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_phone_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_intention_label" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_intention_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_message_label" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_message_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_submit_label" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_submit_success_message" varchar;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_submit_error_message" varchar;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "content" jsonb;
  ALTER TABLE "pages_blocks_image_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_image_gallery_images" ADD COLUMN "caption" varchar;
  ALTER TABLE "pages_blocks_image_gallery" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_image_gallery" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "intro_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "intro_description" varchar;
  ALTER TABLE "_pages_v_blocks_hero_slides" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_hero_slides" ADD COLUMN "slide_id" numeric;
  ALTER TABLE "_pages_v_blocks_hero_slides" ADD COLUMN "alt" varchar;
  ALTER TABLE "_pages_v_blocks_hero_slides" ADD COLUMN "action_label" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_features_highlights" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_features_highlights" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_features_highlights" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_features_highlights" ADD COLUMN "link" varchar;
  ALTER TABLE "_pages_v_blocks_features_highlights" ADD COLUMN "tags" varchar;
  ALTER TABLE "_pages_v_blocks_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_features" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_features" ADD COLUMN "paragraph" varchar;
  ALTER TABLE "_pages_v_blocks_features" ADD COLUMN "featured_products_title" varchar;
  ALTER TABLE "_pages_v_blocks_features" ADD COLUMN "featured_products_description" varchar;
  ALTER TABLE "_pages_v_blocks_features" ADD COLUMN "featured_products_cta_description" varchar;
  ALTER TABLE "_pages_v_blocks_features" ADD COLUMN "featured_products_view_all_label" varchar;
  ALTER TABLE "_pages_v_blocks_about_highlights" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_about_highlights" ADD COLUMN "text" varchar;
  ALTER TABLE "_pages_v_blocks_about_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_about_items" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_about_items" ADD COLUMN "paragraph" varchar;
  ALTER TABLE "_pages_v_blocks_about" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_about" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_about" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_about" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_about" ADD COLUMN "image_alt" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_name_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_name_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_email_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_email_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_phone_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_phone_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_intention_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_intention_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_message_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_message_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_submit_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_submit_success_message" varchar;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_submit_error_message" varchar;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_image_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_image_gallery_images" ADD COLUMN "caption" varchar;
  ALTER TABLE "_pages_v_blocks_image_gallery" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_image_gallery" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_intro_title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_intro_description" varchar;
  ALTER TABLE "products_details_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "products_details_features" ADD COLUMN "title" varchar;
  ALTER TABLE "products_details_features" ADD COLUMN "content" jsonb;
  ALTER TABLE "products_details_highlights" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "products_details_highlights" ADD COLUMN "text" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "details_sensor_config" jsonb;
  ALTER TABLE "products_locales" ADD COLUMN "details_controller_config" jsonb;
  ALTER TABLE "products_locales" ADD COLUMN "details_software_config" jsonb;
  ALTER TABLE "products_locales" ADD COLUMN "details_experiments" jsonb;
  ALTER TABLE "_products_v_version_details_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_products_v_version_details_features" ADD COLUMN "title" varchar;
  ALTER TABLE "_products_v_version_details_features" ADD COLUMN "content" jsonb;
  ALTER TABLE "_products_v_version_details_highlights" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_products_v_version_details_highlights" ADD COLUMN "text" varchar;
  ALTER TABLE "_products_v_locales" ADD COLUMN "version_details_sensor_config" jsonb;
  ALTER TABLE "_products_v_locales" ADD COLUMN "version_details_controller_config" jsonb;
  ALTER TABLE "_products_v_locales" ADD COLUMN "version_details_software_config" jsonb;
  ALTER TABLE "_products_v_locales" ADD COLUMN "version_details_experiments" jsonb;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_folders_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tickets_id" integer;
  ALTER TABLE "site_settings_social_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "site_settings_social_links" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "frontend_branding_header_logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "frontend_branding_header_logo_inverse_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "frontend_branding_footer_logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "frontend_branding_footer_logo_inverse_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "frontend_branding_favicon_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "icp_number" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "icp_link" varchar DEFAULT 'https://beian.miit.gov.cn/';
  ALTER TABLE "site_settings" ADD COLUMN "psb_number" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "psb_icon_id" integer;
  ALTER TABLE "site_settings_locales" ADD COLUMN "cta_defaults_view_details_cta" varchar DEFAULT 'View Details' NOT NULL;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_composites" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "cookie_consent_privacy_policy_link" varchar DEFAULT '/privacy-policy';
  ALTER TABLE "navigation_items_children" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "navigation_items_children" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "navigation_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "navigation_items" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "footer_sections_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "footer_sections_links" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "footer_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "footer_sections" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "footer_qr_codes" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "footer_qr_codes" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "contact_info_email" varchar;
  ALTER TABLE "footer_locales" ADD COLUMN "legal_privacy_policy_label" varchar NOT NULL;
  ALTER TABLE "footer_locales" ADD COLUMN "legal_cookie_settings_label" varchar NOT NULL;
  ALTER TABLE "footer_locales" ADD COLUMN "contact_info_phone" varchar;
  ALTER TABLE "footer_locales" ADD COLUMN "contact_info_address" varchar;
  ALTER TABLE "media_folders" ADD CONSTRAINT "media_folders_parent_id_media_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_folders_locales" ADD CONSTRAINT "media_folders_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_catalog_series_order" ADD CONSTRAINT "pages_blocks_products_catalog_series_order_series_id_product_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."product_series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_catalog_series_order" ADD CONSTRAINT "pages_blocks_products_catalog_series_order_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_products_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_catalog_product_order" ADD CONSTRAINT "pages_blocks_products_catalog_product_order_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_catalog_product_order" ADD CONSTRAINT "pages_blocks_products_catalog_product_order_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_products_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_catalog" ADD CONSTRAINT "pages_blocks_products_catalog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_studies_list" ADD CONSTRAINT "pages_blocks_case_studies_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_intention_options" ADD CONSTRAINT "pages_blocks_contact_form_intention_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_catalog_series_order" ADD CONSTRAINT "_pages_v_blocks_products_catalog_series_order_series_id_product_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."product_series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_catalog_series_order" ADD CONSTRAINT "_pages_v_blocks_products_catalog_series_order_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_products_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_catalog_product_order" ADD CONSTRAINT "_pages_v_blocks_products_catalog_product_order_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_catalog_product_order" ADD CONSTRAINT "_pages_v_blocks_products_catalog_product_order_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_products_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_catalog" ADD CONSTRAINT "_pages_v_blocks_products_catalog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_studies_list" ADD CONSTRAINT "_pages_v_blocks_case_studies_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_intention_options" ADD CONSTRAINT "_pages_v_blocks_contact_form_intention_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_features_gallery" ADD CONSTRAINT "products_details_features_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_details_features_gallery" ADD CONSTRAINT "products_details_features_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_sections_items" ADD CONSTRAINT "products_details_sample_cases_sections_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_sections_items" ADD CONSTRAINT "products_details_sample_cases_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_sample_cases_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_sections" ADD CONSTRAINT "products_details_sample_cases_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_features_gallery" ADD CONSTRAINT "_products_v_version_details_features_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_features_gallery" ADD CONSTRAINT "_products_v_version_details_features_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_sections_items" ADD CONSTRAINT "_products_v_version_details_sample_cases_sections_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_sections_items" ADD CONSTRAINT "_products_v_version_details_sample_cases_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_sample_cases_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_sections" ADD CONSTRAINT "_products_v_version_details_sample_cases_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_rels" ADD CONSTRAINT "faq_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_rels" ADD CONSTRAINT "faq_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_contact_items" ADD CONSTRAINT "footer_contact_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_contact_items" ADD CONSTRAINT "footer_contact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "media_folders_slug_idx" ON "media_folders" USING btree ("slug");
  CREATE INDEX "media_folders_parent_idx" ON "media_folders" USING btree ("parent_id");
  CREATE INDEX "media_folders_updated_at_idx" ON "media_folders" USING btree ("updated_at");
  CREATE INDEX "media_folders_created_at_idx" ON "media_folders" USING btree ("created_at");
  CREATE INDEX "media_folders_name_idx" ON "media_folders_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "media_folders_locales_locale_parent_id_unique" ON "media_folders_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_products_catalog_series_order_order_idx" ON "pages_blocks_products_catalog_series_order" USING btree ("_order");
  CREATE INDEX "pages_blocks_products_catalog_series_order_parent_id_idx" ON "pages_blocks_products_catalog_series_order" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_products_catalog_series_order_locale_idx" ON "pages_blocks_products_catalog_series_order" USING btree ("_locale");
  CREATE INDEX "pages_blocks_products_catalog_series_order_series_idx" ON "pages_blocks_products_catalog_series_order" USING btree ("series_id");
  CREATE INDEX "pages_blocks_products_catalog_product_order_order_idx" ON "pages_blocks_products_catalog_product_order" USING btree ("_order");
  CREATE INDEX "pages_blocks_products_catalog_product_order_parent_id_idx" ON "pages_blocks_products_catalog_product_order" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_products_catalog_product_order_locale_idx" ON "pages_blocks_products_catalog_product_order" USING btree ("_locale");
  CREATE INDEX "pages_blocks_products_catalog_product_order_product_idx" ON "pages_blocks_products_catalog_product_order" USING btree ("product_id");
  CREATE INDEX "pages_blocks_products_catalog_order_idx" ON "pages_blocks_products_catalog" USING btree ("_order");
  CREATE INDEX "pages_blocks_products_catalog_parent_id_idx" ON "pages_blocks_products_catalog" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_products_catalog_path_idx" ON "pages_blocks_products_catalog" USING btree ("_path");
  CREATE INDEX "pages_blocks_products_catalog_locale_idx" ON "pages_blocks_products_catalog" USING btree ("_locale");
  CREATE INDEX "pages_blocks_case_studies_list_order_idx" ON "pages_blocks_case_studies_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_studies_list_parent_id_idx" ON "pages_blocks_case_studies_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_studies_list_path_idx" ON "pages_blocks_case_studies_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_case_studies_list_locale_idx" ON "pages_blocks_case_studies_list" USING btree ("_locale");
  CREATE INDEX "pages_blocks_case_studies_list_category_idx" ON "pages_blocks_case_studies_list" USING btree ("category");
  CREATE INDEX "pages_blocks_contact_form_intention_options_order_idx" ON "pages_blocks_contact_form_intention_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_intention_options_parent_id_idx" ON "pages_blocks_contact_form_intention_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_intention_options_locale_idx" ON "pages_blocks_contact_form_intention_options" USING btree ("_locale");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id","locale");
  CREATE INDEX "_pages_v_blocks_products_catalog_series_order_order_idx" ON "_pages_v_blocks_products_catalog_series_order" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_products_catalog_series_order_parent_id_idx" ON "_pages_v_blocks_products_catalog_series_order" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_products_catalog_series_order_locale_idx" ON "_pages_v_blocks_products_catalog_series_order" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_products_catalog_series_order_series_idx" ON "_pages_v_blocks_products_catalog_series_order" USING btree ("series_id");
  CREATE INDEX "_pages_v_blocks_products_catalog_product_order_order_idx" ON "_pages_v_blocks_products_catalog_product_order" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_products_catalog_product_order_parent_id_idx" ON "_pages_v_blocks_products_catalog_product_order" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_products_catalog_product_order_locale_idx" ON "_pages_v_blocks_products_catalog_product_order" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_products_catalog_product_order_product_idx" ON "_pages_v_blocks_products_catalog_product_order" USING btree ("product_id");
  CREATE INDEX "_pages_v_blocks_products_catalog_order_idx" ON "_pages_v_blocks_products_catalog" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_products_catalog_parent_id_idx" ON "_pages_v_blocks_products_catalog" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_products_catalog_path_idx" ON "_pages_v_blocks_products_catalog" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_products_catalog_locale_idx" ON "_pages_v_blocks_products_catalog" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_case_studies_list_order_idx" ON "_pages_v_blocks_case_studies_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_case_studies_list_parent_id_idx" ON "_pages_v_blocks_case_studies_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_case_studies_list_path_idx" ON "_pages_v_blocks_case_studies_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_case_studies_list_locale_idx" ON "_pages_v_blocks_case_studies_list" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_case_studies_list_category_idx" ON "_pages_v_blocks_case_studies_list" USING btree ("category");
  CREATE INDEX "_pages_v_blocks_contact_form_intention_options_order_idx" ON "_pages_v_blocks_contact_form_intention_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_intention_options_parent_id_idx" ON "_pages_v_blocks_contact_form_intention_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_intention_options_locale_idx" ON "_pages_v_blocks_contact_form_intention_options" USING btree ("_locale");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id","locale");
  CREATE INDEX "products_details_features_gallery_order_idx" ON "products_details_features_gallery" USING btree ("_order");
  CREATE INDEX "products_details_features_gallery_parent_id_idx" ON "products_details_features_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_details_features_gallery_locale_idx" ON "products_details_features_gallery" USING btree ("_locale");
  CREATE INDEX "products_details_features_gallery_image_idx" ON "products_details_features_gallery" USING btree ("image_id");
  CREATE INDEX "products_details_sample_cases_sections_items_order_idx" ON "products_details_sample_cases_sections_items" USING btree ("_order");
  CREATE INDEX "products_details_sample_cases_sections_items_parent_id_idx" ON "products_details_sample_cases_sections_items" USING btree ("_parent_id");
  CREATE INDEX "products_details_sample_cases_sections_items_locale_idx" ON "products_details_sample_cases_sections_items" USING btree ("_locale");
  CREATE INDEX "products_details_sample_cases_sections_items_image_idx" ON "products_details_sample_cases_sections_items" USING btree ("image_id");
  CREATE INDEX "products_details_sample_cases_sections_order_idx" ON "products_details_sample_cases_sections" USING btree ("_order");
  CREATE INDEX "products_details_sample_cases_sections_parent_id_idx" ON "products_details_sample_cases_sections" USING btree ("_parent_id");
  CREATE INDEX "products_details_sample_cases_sections_locale_idx" ON "products_details_sample_cases_sections" USING btree ("_locale");
  CREATE INDEX "_products_v_version_details_features_gallery_order_idx" ON "_products_v_version_details_features_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_features_gallery_parent_id_idx" ON "_products_v_version_details_features_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_details_features_gallery_locale_idx" ON "_products_v_version_details_features_gallery" USING btree ("_locale");
  CREATE INDEX "_products_v_version_details_features_gallery_image_idx" ON "_products_v_version_details_features_gallery" USING btree ("image_id");
  CREATE INDEX "_products_v_version_details_sample_cases_sections_items_order_idx" ON "_products_v_version_details_sample_cases_sections_items" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_sample_cases_sections_items_parent_id_idx" ON "_products_v_version_details_sample_cases_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_details_sample_cases_sections_items_locale_idx" ON "_products_v_version_details_sample_cases_sections_items" USING btree ("_locale");
  CREATE INDEX "_products_v_version_details_sample_cases_sections_items__idx" ON "_products_v_version_details_sample_cases_sections_items" USING btree ("image_id");
  CREATE INDEX "_products_v_version_details_sample_cases_sections_order_idx" ON "_products_v_version_details_sample_cases_sections" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_sample_cases_sections_parent_id_idx" ON "_products_v_version_details_sample_cases_sections" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_details_sample_cases_sections_locale_idx" ON "_products_v_version_details_sample_cases_sections" USING btree ("_locale");
  CREATE INDEX "faq_rels_order_idx" ON "faq_rels" USING btree ("order");
  CREATE INDEX "faq_rels_parent_idx" ON "faq_rels" USING btree ("parent_id");
  CREATE INDEX "faq_rels_path_idx" ON "faq_rels" USING btree ("path");
  CREATE INDEX "faq_rels_products_id_idx" ON "faq_rels" USING btree ("products_id");
  CREATE INDEX "tickets_updated_at_idx" ON "tickets" USING btree ("updated_at");
  CREATE INDEX "tickets_created_at_idx" ON "tickets" USING btree ("created_at");
  CREATE INDEX "footer_contact_items_order_idx" ON "footer_contact_items" USING btree ("_order");
  CREATE INDEX "footer_contact_items_parent_id_idx" ON "footer_contact_items" USING btree ("_parent_id");
  CREATE INDEX "footer_contact_items_locale_idx" ON "footer_contact_items" USING btree ("_locale");
  CREATE INDEX "footer_contact_items_image_idx" ON "footer_contact_items" USING btree ("image_id");
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_media_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."media_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_folders_fk" FOREIGN KEY ("media_folders_id") REFERENCES "public"."media_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tickets_fk" FOREIGN KEY ("tickets_id") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_frontend_branding_header_logo_id_media_id_fk" FOREIGN KEY ("frontend_branding_header_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_frontend_branding_header_logo_inverse_id_media_id_fk" FOREIGN KEY ("frontend_branding_header_logo_inverse_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_frontend_branding_footer_logo_id_media_id_fk" FOREIGN KEY ("frontend_branding_footer_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_frontend_branding_footer_logo_inverse_id_media_id_fk" FOREIGN KEY ("frontend_branding_footer_logo_inverse_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_frontend_branding_favicon_id_media_id_fk" FOREIGN KEY ("frontend_branding_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_psb_icon_id_media_id_fk" FOREIGN KEY ("psb_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "pages_blocks_hero_slides_locale_idx" ON "pages_blocks_hero_slides" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_features_highlights_locale_idx" ON "pages_blocks_features_highlights" USING btree ("_locale");
  CREATE INDEX "pages_blocks_features_locale_idx" ON "pages_blocks_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_highlights_locale_idx" ON "pages_blocks_about_highlights" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_items_locale_idx" ON "pages_blocks_about_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_locale_idx" ON "pages_blocks_about" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_locale_idx" ON "pages_blocks_contact" USING btree ("_locale");
  CREATE INDEX "pages_blocks_rich_text_locale_idx" ON "pages_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_gallery_images_locale_idx" ON "pages_blocks_image_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_gallery_locale_idx" ON "pages_blocks_image_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_slides_locale_idx" ON "_pages_v_blocks_hero_slides" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_features_highlights_locale_idx" ON "_pages_v_blocks_features_highlights" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_features_locale_idx" ON "_pages_v_blocks_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_highlights_locale_idx" ON "_pages_v_blocks_about_highlights" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_items_locale_idx" ON "_pages_v_blocks_about_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_locale_idx" ON "_pages_v_blocks_about" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_locale_idx" ON "_pages_v_blocks_contact" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_rich_text_locale_idx" ON "_pages_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_image_gallery_images_locale_idx" ON "_pages_v_blocks_image_gallery_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_image_gallery_locale_idx" ON "_pages_v_blocks_image_gallery" USING btree ("_locale");
  CREATE INDEX "products_details_features_locale_idx" ON "products_details_features" USING btree ("_locale");
  CREATE INDEX "products_details_highlights_locale_idx" ON "products_details_highlights" USING btree ("_locale");
  CREATE INDEX "_products_v_version_details_features_locale_idx" ON "_products_v_version_details_features" USING btree ("_locale");
  CREATE INDEX "_products_v_version_details_highlights_locale_idx" ON "_products_v_version_details_highlights" USING btree ("_locale");
  CREATE INDEX "payload_locked_documents_rels_media_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("media_folders_id");
  CREATE INDEX "payload_locked_documents_rels_tickets_id_idx" ON "payload_locked_documents_rels" USING btree ("tickets_id");
  CREATE INDEX "site_settings_social_links_locale_idx" ON "site_settings_social_links" USING btree ("_locale");
  CREATE INDEX "site_settings_frontend_branding_frontend_branding_header_idx" ON "site_settings" USING btree ("frontend_branding_header_logo_id");
  CREATE INDEX "site_settings_frontend_branding_frontend_branding_head_1_idx" ON "site_settings" USING btree ("frontend_branding_header_logo_inverse_id");
  CREATE INDEX "site_settings_frontend_branding_frontend_branding_footer_idx" ON "site_settings" USING btree ("frontend_branding_footer_logo_id");
  CREATE INDEX "site_settings_frontend_branding_frontend_branding_foot_1_idx" ON "site_settings" USING btree ("frontend_branding_footer_logo_inverse_id");
  CREATE INDEX "site_settings_frontend_branding_frontend_branding_favico_idx" ON "site_settings" USING btree ("frontend_branding_favicon_id");
  CREATE INDEX "site_settings_psb_icon_idx" ON "site_settings" USING btree ("psb_icon_id");
  CREATE INDEX "navigation_items_children_locale_idx" ON "navigation_items_children" USING btree ("_locale");
  CREATE INDEX "navigation_items_locale_idx" ON "navigation_items" USING btree ("_locale");
  CREATE INDEX "footer_sections_links_locale_idx" ON "footer_sections_links" USING btree ("_locale");
  CREATE INDEX "footer_sections_locale_idx" ON "footer_sections" USING btree ("_locale");
  CREATE INDEX "footer_qr_codes_locale_idx" ON "footer_qr_codes" USING btree ("_locale");
  ALTER TABLE "products" DROP COLUMN "status";
  ALTER TABLE "_products_v" DROP COLUMN "version_status";
  ALTER TABLE "faq" DROP COLUMN "product_id";
  ALTER TABLE "site_settings" DROP COLUMN "logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "logo_inverse_id";
  ALTER TABLE "site_settings" DROP COLUMN "cookie_consent_privacy_policy_link";
  ALTER TABLE "site_settings_locales" DROP COLUMN "products_catalog_core_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "products_catalog_core_description";
  ALTER TABLE "site_settings_locales" DROP COLUMN "products_catalog_view_details_cta";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_composite_robots";
  ALTER TABLE "site_settings_locales" DROP COLUMN "support_resources_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "cookie_consent_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "cookie_consent_description";
  ALTER TABLE "site_settings_locales" DROP COLUMN "cookie_consent_accept_label";
  DROP TYPE "public"."enum_products_details_resources_type";
  DROP TYPE "public"."enum__products_v_version_details_resources_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_details_resources_type" AS ENUM('docs', 'download', 'video', 'other');
  CREATE TYPE "public"."enum__products_v_version_details_resources_type" AS ENUM('docs', 'download', 'video', 'other');
  CREATE TABLE "pages_blocks_hero_slides_locales" (
  	"alt" varchar,
  	"action_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" numeric NOT NULL
  );
  
  CREATE TABLE "pages_blocks_features_featured_products_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar
  );
  
  CREATE TABLE "pages_blocks_features_highlights_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_features_locales" (
  	"title" varchar,
  	"paragraph" varchar,
  	"featured_products_title" varchar,
  	"featured_products_description" varchar,
  	"featured_products_cta_description" varchar,
  	"featured_products_view_all_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_items_locales" (
  	"title" varchar,
  	"paragraph" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_locales" (
  	"title" varchar,
  	"description" varchar,
  	"content" jsonb,
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_locales" (
  	"title" varchar,
  	"description" varchar,
  	"form_notice" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_gallery_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_slides_locales" (
  	"alt" varchar,
  	"action_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_features_featured_products_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_highlights_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_features_locales" (
  	"title" varchar,
  	"paragraph" varchar,
  	"featured_products_title" varchar,
  	"featured_products_description" varchar,
  	"featured_products_cta_description" varchar,
  	"featured_products_view_all_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_items_locales" (
  	"title" varchar,
  	"paragraph" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_locales" (
  	"title" varchar,
  	"description" varchar,
  	"content" jsonb,
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_locales" (
  	"title" varchar,
  	"description" varchar,
  	"form_notice" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_details_features_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_details_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_details_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_details_specs_locales" (
  	"key" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_details_sample_cases_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "products_details_sample_cases_modules_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_details_sample_cases_chassis" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "products_details_sample_cases_chassis_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_details_sample_cases_arms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "products_details_sample_cases_arms_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_details_sample_cases_composite_robots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "products_details_sample_cases_composite_robots_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_details_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "products_details_gallery_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_details_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"type" "enum_products_details_resources_type" DEFAULT 'other'
  );
  
  CREATE TABLE "products_details_resources_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_products_v_version_details_features_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_details_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_details_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_details_specs_locales" (
  	"key" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_details_sample_cases_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_details_sample_cases_modules_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_details_sample_cases_chassis" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_details_sample_cases_chassis_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_details_sample_cases_arms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_details_sample_cases_arms_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_details_sample_cases_composite_robots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_details_sample_cases_composite_robots_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_details_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_details_gallery_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_details_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"type" "enum__products_v_version_details_resources_type" DEFAULT 'other',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_details_resources_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
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
  
  CREATE TABLE "navigation_items_children_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_sections_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_sections_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_qr_codes_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "media_folders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_folders_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_products_catalog_series_order" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_products_catalog_product_order" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_products_catalog" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_case_studies_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_form_intention_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_products_catalog_series_order" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_products_catalog_product_order" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_products_catalog" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_case_studies_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form_intention_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_features_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_sample_cases_sections_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_details_sample_cases_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_features_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_sample_cases_sections_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_details_sample_cases_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tickets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_contact_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_folders" CASCADE;
  DROP TABLE "media_folders_locales" CASCADE;
  DROP TABLE "pages_blocks_products_catalog_series_order" CASCADE;
  DROP TABLE "pages_blocks_products_catalog_product_order" CASCADE;
  DROP TABLE "pages_blocks_products_catalog" CASCADE;
  DROP TABLE "pages_blocks_case_studies_list" CASCADE;
  DROP TABLE "pages_blocks_contact_form_intention_options" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_products_catalog_series_order" CASCADE;
  DROP TABLE "_pages_v_blocks_products_catalog_product_order" CASCADE;
  DROP TABLE "_pages_v_blocks_products_catalog" CASCADE;
  DROP TABLE "_pages_v_blocks_case_studies_list" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_intention_options" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "products_details_features_gallery" CASCADE;
  DROP TABLE "products_details_sample_cases_sections_items" CASCADE;
  DROP TABLE "products_details_sample_cases_sections" CASCADE;
  DROP TABLE "_products_v_version_details_features_gallery" CASCADE;
  DROP TABLE "_products_v_version_details_sample_cases_sections_items" CASCADE;
  DROP TABLE "_products_v_version_details_sample_cases_sections" CASCADE;
  DROP TABLE "faq_rels" CASCADE;
  DROP TABLE "tickets" CASCADE;
  DROP TABLE "footer_contact_items" CASCADE;
  ALTER TABLE "media" DROP CONSTRAINT "media_folder_id_media_folders_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_folders_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tickets_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_frontend_branding_header_logo_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_frontend_branding_header_logo_inverse_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_frontend_branding_footer_logo_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_frontend_branding_footer_logo_inverse_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_frontend_branding_favicon_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_psb_icon_id_media_id_fk";
  
  ALTER TABLE "case_studies" ALTER COLUMN "category" SET DATA TYPE text;
  DROP TYPE "public"."enum_case_studies_category";
  CREATE TYPE "public"."enum_case_studies_category" AS ENUM('universities', 'k12', 'co-research');
  ALTER TABLE "case_studies" ALTER COLUMN "category" SET DATA TYPE "public"."enum_case_studies_category" USING "category"::"public"."enum_case_studies_category";
  ALTER TABLE "_case_studies_v" ALTER COLUMN "version_category" SET DATA TYPE text;
  DROP TYPE "public"."enum__case_studies_v_version_category";
  CREATE TYPE "public"."enum__case_studies_v_version_category" AS ENUM('universities', 'k12', 'co-research');
  ALTER TABLE "_case_studies_v" ALTER COLUMN "version_category" SET DATA TYPE "public"."enum__case_studies_v_version_category" USING "version_category"::"public"."enum__case_studies_v_version_category";
  DROP INDEX "media_folder_idx";
  DROP INDEX "pages_blocks_hero_slides_locale_idx";
  DROP INDEX "pages_blocks_hero_locale_idx";
  DROP INDEX "pages_blocks_features_highlights_locale_idx";
  DROP INDEX "pages_blocks_features_locale_idx";
  DROP INDEX "pages_blocks_about_highlights_locale_idx";
  DROP INDEX "pages_blocks_about_items_locale_idx";
  DROP INDEX "pages_blocks_about_locale_idx";
  DROP INDEX "pages_blocks_contact_locale_idx";
  DROP INDEX "pages_blocks_rich_text_locale_idx";
  DROP INDEX "pages_blocks_image_gallery_images_locale_idx";
  DROP INDEX "pages_blocks_image_gallery_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_slides_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_locale_idx";
  DROP INDEX "_pages_v_blocks_features_highlights_locale_idx";
  DROP INDEX "_pages_v_blocks_features_locale_idx";
  DROP INDEX "_pages_v_blocks_about_highlights_locale_idx";
  DROP INDEX "_pages_v_blocks_about_items_locale_idx";
  DROP INDEX "_pages_v_blocks_about_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_locale_idx";
  DROP INDEX "_pages_v_blocks_rich_text_locale_idx";
  DROP INDEX "_pages_v_blocks_image_gallery_images_locale_idx";
  DROP INDEX "_pages_v_blocks_image_gallery_locale_idx";
  DROP INDEX "products_details_features_locale_idx";
  DROP INDEX "products_details_highlights_locale_idx";
  DROP INDEX "_products_v_version_details_features_locale_idx";
  DROP INDEX "_products_v_version_details_highlights_locale_idx";
  DROP INDEX "payload_locked_documents_rels_media_folders_id_idx";
  DROP INDEX "payload_locked_documents_rels_tickets_id_idx";
  DROP INDEX "site_settings_social_links_locale_idx";
  DROP INDEX "site_settings_frontend_branding_frontend_branding_header_idx";
  DROP INDEX "site_settings_frontend_branding_frontend_branding_head_1_idx";
  DROP INDEX "site_settings_frontend_branding_frontend_branding_footer_idx";
  DROP INDEX "site_settings_frontend_branding_frontend_branding_foot_1_idx";
  DROP INDEX "site_settings_frontend_branding_frontend_branding_favico_idx";
  DROP INDEX "site_settings_psb_icon_idx";
  DROP INDEX "navigation_items_children_locale_idx";
  DROP INDEX "navigation_items_locale_idx";
  DROP INDEX "footer_sections_links_locale_idx";
  DROP INDEX "footer_sections_locale_idx";
  DROP INDEX "footer_qr_codes_locale_idx";
  ALTER TABLE "pages_blocks_hero_slides" ALTER COLUMN "id" SET DATA TYPE numeric;
  ALTER TABLE "_pages_v_blocks_hero_slides" ALTER COLUMN "_uuid" SET DATA TYPE numeric;
  ALTER TABLE "site_settings_locales" ALTER COLUMN "legal_text" DROP DEFAULT;
  ALTER TABLE "products" ADD COLUMN "status" "enum_products_status" DEFAULT 'draft';
  ALTER TABLE "_products_v" ADD COLUMN "version_status" "enum__products_v_version_status" DEFAULT 'draft';
  ALTER TABLE "faq" ADD COLUMN "product_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "logo_inverse_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "cookie_consent_privacy_policy_link" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "products_catalog_core_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "products_catalog_core_description" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "products_catalog_view_details_cta" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "product_detail_labels_composite_robots" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "support_resources_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "cookie_consent_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "cookie_consent_description" jsonb;
  ALTER TABLE "site_settings_locales" ADD COLUMN "cookie_consent_accept_label" varchar;
  ALTER TABLE "pages_blocks_hero_slides_locales" ADD CONSTRAINT "pages_blocks_hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_featured_products_slugs" ADD CONSTRAINT "pages_blocks_features_featured_products_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_highlights_locales" ADD CONSTRAINT "pages_blocks_features_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_locales" ADD CONSTRAINT "pages_blocks_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_highlights_locales" ADD CONSTRAINT "pages_blocks_about_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_items_locales" ADD CONSTRAINT "pages_blocks_about_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_locales" ADD CONSTRAINT "pages_blocks_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_locales" ADD CONSTRAINT "pages_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_images_locales" ADD CONSTRAINT "pages_blocks_image_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_locales" ADD CONSTRAINT "pages_blocks_image_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_slides_locales" ADD CONSTRAINT "_pages_v_blocks_hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_featured_products_slugs" ADD CONSTRAINT "_pages_v_blocks_features_featured_products_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_highlights_locales" ADD CONSTRAINT "_pages_v_blocks_features_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_locales" ADD CONSTRAINT "_pages_v_blocks_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_highlights_locales" ADD CONSTRAINT "_pages_v_blocks_about_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_items_locales" ADD CONSTRAINT "_pages_v_blocks_about_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_locales" ADD CONSTRAINT "_pages_v_blocks_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_locales" ADD CONSTRAINT "_pages_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_images_locales" ADD CONSTRAINT "_pages_v_blocks_image_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_image_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_features_locales" ADD CONSTRAINT "products_details_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_highlights_locales" ADD CONSTRAINT "products_details_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_specs" ADD CONSTRAINT "products_details_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_specs_locales" ADD CONSTRAINT "products_details_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_modules" ADD CONSTRAINT "products_details_sample_cases_modules_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_modules" ADD CONSTRAINT "products_details_sample_cases_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_modules_locales" ADD CONSTRAINT "products_details_sample_cases_modules_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_sample_cases_modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_chassis" ADD CONSTRAINT "products_details_sample_cases_chassis_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_chassis" ADD CONSTRAINT "products_details_sample_cases_chassis_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_chassis_locales" ADD CONSTRAINT "products_details_sample_cases_chassis_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_sample_cases_chassis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_arms" ADD CONSTRAINT "products_details_sample_cases_arms_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_arms" ADD CONSTRAINT "products_details_sample_cases_arms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_arms_locales" ADD CONSTRAINT "products_details_sample_cases_arms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_sample_cases_arms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_composite_robots" ADD CONSTRAINT "products_details_sample_cases_composite_robots_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_composite_robots" ADD CONSTRAINT "products_details_sample_cases_composite_robots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_sample_cases_composite_robots_locales" ADD CONSTRAINT "products_details_sample_cases_composite_robots_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_sample_cases_composite_robots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_gallery" ADD CONSTRAINT "products_details_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_details_gallery" ADD CONSTRAINT "products_details_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_gallery_locales" ADD CONSTRAINT "products_details_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_resources" ADD CONSTRAINT "products_details_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_resources_locales" ADD CONSTRAINT "products_details_resources_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details_resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_features_locales" ADD CONSTRAINT "_products_v_version_details_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_highlights_locales" ADD CONSTRAINT "_products_v_version_details_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_specs" ADD CONSTRAINT "_products_v_version_details_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_specs_locales" ADD CONSTRAINT "_products_v_version_details_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_modules" ADD CONSTRAINT "_products_v_version_details_sample_cases_modules_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_modules" ADD CONSTRAINT "_products_v_version_details_sample_cases_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_modules_locales" ADD CONSTRAINT "_products_v_version_details_sample_cases_modules_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_sample_cases_modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_chassis" ADD CONSTRAINT "_products_v_version_details_sample_cases_chassis_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_chassis" ADD CONSTRAINT "_products_v_version_details_sample_cases_chassis_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_chassis_locales" ADD CONSTRAINT "_products_v_version_details_sample_cases_chassis_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_sample_cases_chassis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_arms" ADD CONSTRAINT "_products_v_version_details_sample_cases_arms_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_arms" ADD CONSTRAINT "_products_v_version_details_sample_cases_arms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_arms_locales" ADD CONSTRAINT "_products_v_version_details_sample_cases_arms_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_sample_cases_arms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_composite_robots" ADD CONSTRAINT "_products_v_version_details_sample_cases_composite_robots_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_composite_robots" ADD CONSTRAINT "_products_v_version_details_sample_cases_composite_robots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_sample_cases_composite_robots_locales" ADD CONSTRAINT "_products_v_version_details_sample_cases_composite_robots_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_sample_cases_composite_robots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_gallery" ADD CONSTRAINT "_products_v_version_details_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_gallery" ADD CONSTRAINT "_products_v_version_details_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_gallery_locales" ADD CONSTRAINT "_products_v_version_details_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_resources" ADD CONSTRAINT "_products_v_version_details_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_resources_locales" ADD CONSTRAINT "_products_v_version_details_resources_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details_resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links_locales" ADD CONSTRAINT "site_settings_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_support_resources_items" ADD CONSTRAINT "site_settings_support_resources_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_support_resources_items_locales" ADD CONSTRAINT "site_settings_support_resources_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_support_resources_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items_children_locales" ADD CONSTRAINT "navigation_items_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_items_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items_locales" ADD CONSTRAINT "navigation_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_sections_links_locales" ADD CONSTRAINT "footer_sections_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_sections_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_sections_locales" ADD CONSTRAINT "footer_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_qr_codes_locales" ADD CONSTRAINT "footer_qr_codes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_qr_codes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_blocks_hero_slides_locales_locale_parent_id_unique" ON "pages_blocks_hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_features_featured_products_slugs_order_idx" ON "pages_blocks_features_featured_products_slugs" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_featured_products_slugs_parent_id_idx" ON "pages_blocks_features_featured_products_slugs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_features_highlights_locales_locale_parent_id_un" ON "pages_blocks_features_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_features_locales_locale_parent_id_unique" ON "pages_blocks_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_highlights_locales_locale_parent_id_uniqu" ON "pages_blocks_about_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_items_locales_locale_parent_id_unique" ON "pages_blocks_about_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_locales_locale_parent_id_unique" ON "pages_blocks_about_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_locales_locale_parent_id_unique" ON "pages_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_image_gallery_images_locales_locale_parent_id_u" ON "pages_blocks_image_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_image_gallery_locales_locale_parent_id_unique" ON "pages_blocks_image_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_slides_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_features_featured_products_slugs_order_idx" ON "_pages_v_blocks_features_featured_products_slugs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_featured_products_slugs_parent_id_idx" ON "_pages_v_blocks_features_featured_products_slugs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_features_highlights_locales_locale_parent_id" ON "_pages_v_blocks_features_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_features_locales_locale_parent_id_unique" ON "_pages_v_blocks_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_highlights_locales_locale_parent_id_un" ON "_pages_v_blocks_about_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_about_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_locales_locale_parent_id_unique" ON "_pages_v_blocks_about_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_gallery_images_locales_locale_parent_i" ON "_pages_v_blocks_image_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_gallery_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_image_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_details_features_locales_locale_parent_id_unique" ON "products_details_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_details_highlights_locales_locale_parent_id_unique" ON "products_details_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_details_specs_order_idx" ON "products_details_specs" USING btree ("_order");
  CREATE INDEX "products_details_specs_parent_id_idx" ON "products_details_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_details_specs_locales_locale_parent_id_unique" ON "products_details_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_details_sample_cases_modules_order_idx" ON "products_details_sample_cases_modules" USING btree ("_order");
  CREATE INDEX "products_details_sample_cases_modules_parent_id_idx" ON "products_details_sample_cases_modules" USING btree ("_parent_id");
  CREATE INDEX "products_details_sample_cases_modules_image_idx" ON "products_details_sample_cases_modules" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_details_sample_cases_modules_locales_locale_parent_" ON "products_details_sample_cases_modules_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_details_sample_cases_chassis_order_idx" ON "products_details_sample_cases_chassis" USING btree ("_order");
  CREATE INDEX "products_details_sample_cases_chassis_parent_id_idx" ON "products_details_sample_cases_chassis" USING btree ("_parent_id");
  CREATE INDEX "products_details_sample_cases_chassis_image_idx" ON "products_details_sample_cases_chassis" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_details_sample_cases_chassis_locales_locale_parent_" ON "products_details_sample_cases_chassis_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_details_sample_cases_arms_order_idx" ON "products_details_sample_cases_arms" USING btree ("_order");
  CREATE INDEX "products_details_sample_cases_arms_parent_id_idx" ON "products_details_sample_cases_arms" USING btree ("_parent_id");
  CREATE INDEX "products_details_sample_cases_arms_image_idx" ON "products_details_sample_cases_arms" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_details_sample_cases_arms_locales_locale_parent_id_" ON "products_details_sample_cases_arms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_details_sample_cases_composite_robots_order_idx" ON "products_details_sample_cases_composite_robots" USING btree ("_order");
  CREATE INDEX "products_details_sample_cases_composite_robots_parent_id_idx" ON "products_details_sample_cases_composite_robots" USING btree ("_parent_id");
  CREATE INDEX "products_details_sample_cases_composite_robots_image_idx" ON "products_details_sample_cases_composite_robots" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_details_sample_cases_composite_robots_locales_local" ON "products_details_sample_cases_composite_robots_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_details_gallery_order_idx" ON "products_details_gallery" USING btree ("_order");
  CREATE INDEX "products_details_gallery_parent_id_idx" ON "products_details_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_details_gallery_image_idx" ON "products_details_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_details_gallery_locales_locale_parent_id_unique" ON "products_details_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_details_resources_order_idx" ON "products_details_resources" USING btree ("_order");
  CREATE INDEX "products_details_resources_parent_id_idx" ON "products_details_resources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_details_resources_locales_locale_parent_id_unique" ON "products_details_resources_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_details_features_locales_locale_parent_i" ON "_products_v_version_details_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_details_highlights_locales_locale_parent" ON "_products_v_version_details_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_details_specs_order_idx" ON "_products_v_version_details_specs" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_specs_parent_id_idx" ON "_products_v_version_details_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_details_specs_locales_locale_parent_id_u" ON "_products_v_version_details_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_details_sample_cases_modules_order_idx" ON "_products_v_version_details_sample_cases_modules" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_sample_cases_modules_parent_id_idx" ON "_products_v_version_details_sample_cases_modules" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_details_sample_cases_modules_image_idx" ON "_products_v_version_details_sample_cases_modules" USING btree ("image_id");
  CREATE UNIQUE INDEX "_products_v_version_details_sample_cases_modules_locales_loc" ON "_products_v_version_details_sample_cases_modules_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_details_sample_cases_chassis_order_idx" ON "_products_v_version_details_sample_cases_chassis" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_sample_cases_chassis_parent_id_idx" ON "_products_v_version_details_sample_cases_chassis" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_details_sample_cases_chassis_image_idx" ON "_products_v_version_details_sample_cases_chassis" USING btree ("image_id");
  CREATE UNIQUE INDEX "_products_v_version_details_sample_cases_chassis_locales_loc" ON "_products_v_version_details_sample_cases_chassis_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_details_sample_cases_arms_order_idx" ON "_products_v_version_details_sample_cases_arms" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_sample_cases_arms_parent_id_idx" ON "_products_v_version_details_sample_cases_arms" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_details_sample_cases_arms_image_idx" ON "_products_v_version_details_sample_cases_arms" USING btree ("image_id");
  CREATE UNIQUE INDEX "_products_v_version_details_sample_cases_arms_locales_locale" ON "_products_v_version_details_sample_cases_arms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_details_sample_cases_composite_robots_order_idx" ON "_products_v_version_details_sample_cases_composite_robots" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_sample_cases_composite_robots_parent_id_idx" ON "_products_v_version_details_sample_cases_composite_robots" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_details_sample_cases_composite_robot_idx" ON "_products_v_version_details_sample_cases_composite_robots" USING btree ("image_id");
  CREATE UNIQUE INDEX "_products_v_version_details_sample_cases_composite_robots_lo" ON "_products_v_version_details_sample_cases_composite_robots_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_details_gallery_order_idx" ON "_products_v_version_details_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_gallery_parent_id_idx" ON "_products_v_version_details_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_details_gallery_image_idx" ON "_products_v_version_details_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "_products_v_version_details_gallery_locales_locale_parent_id" ON "_products_v_version_details_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_details_resources_order_idx" ON "_products_v_version_details_resources" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_resources_parent_id_idx" ON "_products_v_version_details_resources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_details_resources_locales_locale_parent_" ON "_products_v_version_details_resources_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_settings_social_links_locales_locale_parent_id_unique" ON "site_settings_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_support_resources_items_order_idx" ON "site_settings_support_resources_items" USING btree ("_order");
  CREATE INDEX "site_settings_support_resources_items_parent_id_idx" ON "site_settings_support_resources_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_support_resources_items_locales_locale_parent_" ON "site_settings_support_resources_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_items_children_locales_locale_parent_id_unique" ON "navigation_items_children_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_items_locales_locale_parent_id_unique" ON "navigation_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_sections_links_locales_locale_parent_id_unique" ON "footer_sections_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_sections_locales_locale_parent_id_unique" ON "footer_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_qr_codes_locales_locale_parent_id_unique" ON "footer_qr_codes_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "faq" ADD CONSTRAINT "faq_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_inverse_id_media_id_fk" FOREIGN KEY ("logo_inverse_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "products_status_idx" ON "products" USING btree ("status");
  CREATE INDEX "_products_v_version_version_status_idx" ON "_products_v" USING btree ("version_status");
  CREATE INDEX "faq_product_idx" ON "faq" USING btree ("product_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_inverse_idx" ON "site_settings" USING btree ("logo_inverse_id");
  ALTER TABLE "media" DROP COLUMN "folder_id";
  ALTER TABLE "pages_blocks_hero_slides" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_hero_slides" DROP COLUMN "slide_id";
  ALTER TABLE "pages_blocks_hero_slides" DROP COLUMN "alt";
  ALTER TABLE "pages_blocks_hero_slides" DROP COLUMN "action_label";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_features_highlights" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_features_highlights" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_features_highlights" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_features_highlights" DROP COLUMN "link";
  ALTER TABLE "pages_blocks_features_highlights" DROP COLUMN "tags";
  ALTER TABLE "pages_blocks_features" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_features" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_features" DROP COLUMN "paragraph";
  ALTER TABLE "pages_blocks_features" DROP COLUMN "featured_products_title";
  ALTER TABLE "pages_blocks_features" DROP COLUMN "featured_products_description";
  ALTER TABLE "pages_blocks_features" DROP COLUMN "featured_products_cta_description";
  ALTER TABLE "pages_blocks_features" DROP COLUMN "featured_products_view_all_label";
  ALTER TABLE "pages_blocks_about_highlights" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_about_highlights" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_about_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_about_items" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_about_items" DROP COLUMN "paragraph";
  ALTER TABLE "pages_blocks_about" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_about" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_about" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_about" DROP COLUMN "content";
  ALTER TABLE "pages_blocks_about" DROP COLUMN "image_alt";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_name_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_name_placeholder";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_email_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_email_placeholder";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_phone_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_phone_placeholder";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_intention_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_intention_placeholder";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_message_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_message_placeholder";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_submit_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_submit_success_message";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_submit_error_message";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "content";
  ALTER TABLE "pages_blocks_image_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_image_gallery_images" DROP COLUMN "caption";
  ALTER TABLE "pages_blocks_image_gallery" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_image_gallery" DROP COLUMN "title";
  ALTER TABLE "pages_locales" DROP COLUMN "intro_title";
  ALTER TABLE "pages_locales" DROP COLUMN "intro_description";
  ALTER TABLE "_pages_v_blocks_hero_slides" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_hero_slides" DROP COLUMN "slide_id";
  ALTER TABLE "_pages_v_blocks_hero_slides" DROP COLUMN "alt";
  ALTER TABLE "_pages_v_blocks_hero_slides" DROP COLUMN "action_label";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_features_highlights" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_features_highlights" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_features_highlights" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_features_highlights" DROP COLUMN "link";
  ALTER TABLE "_pages_v_blocks_features_highlights" DROP COLUMN "tags";
  ALTER TABLE "_pages_v_blocks_features" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_features" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_features" DROP COLUMN "paragraph";
  ALTER TABLE "_pages_v_blocks_features" DROP COLUMN "featured_products_title";
  ALTER TABLE "_pages_v_blocks_features" DROP COLUMN "featured_products_description";
  ALTER TABLE "_pages_v_blocks_features" DROP COLUMN "featured_products_cta_description";
  ALTER TABLE "_pages_v_blocks_features" DROP COLUMN "featured_products_view_all_label";
  ALTER TABLE "_pages_v_blocks_about_highlights" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_about_highlights" DROP COLUMN "text";
  ALTER TABLE "_pages_v_blocks_about_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_about_items" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_about_items" DROP COLUMN "paragraph";
  ALTER TABLE "_pages_v_blocks_about" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_about" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_about" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_about" DROP COLUMN "content";
  ALTER TABLE "_pages_v_blocks_about" DROP COLUMN "image_alt";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_name_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_name_placeholder";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_email_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_email_placeholder";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_phone_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_phone_placeholder";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_intention_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_intention_placeholder";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_message_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_message_placeholder";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_submit_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_submit_success_message";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_submit_error_message";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "content";
  ALTER TABLE "_pages_v_blocks_image_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_image_gallery_images" DROP COLUMN "caption";
  ALTER TABLE "_pages_v_blocks_image_gallery" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_image_gallery" DROP COLUMN "title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_intro_title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_intro_description";
  ALTER TABLE "products_details_features" DROP COLUMN "_locale";
  ALTER TABLE "products_details_features" DROP COLUMN "title";
  ALTER TABLE "products_details_features" DROP COLUMN "content";
  ALTER TABLE "products_details_highlights" DROP COLUMN "_locale";
  ALTER TABLE "products_details_highlights" DROP COLUMN "text";
  ALTER TABLE "products_locales" DROP COLUMN "details_sensor_config";
  ALTER TABLE "products_locales" DROP COLUMN "details_controller_config";
  ALTER TABLE "products_locales" DROP COLUMN "details_software_config";
  ALTER TABLE "products_locales" DROP COLUMN "details_experiments";
  ALTER TABLE "_products_v_version_details_features" DROP COLUMN "_locale";
  ALTER TABLE "_products_v_version_details_features" DROP COLUMN "title";
  ALTER TABLE "_products_v_version_details_features" DROP COLUMN "content";
  ALTER TABLE "_products_v_version_details_highlights" DROP COLUMN "_locale";
  ALTER TABLE "_products_v_version_details_highlights" DROP COLUMN "text";
  ALTER TABLE "_products_v_locales" DROP COLUMN "version_details_sensor_config";
  ALTER TABLE "_products_v_locales" DROP COLUMN "version_details_controller_config";
  ALTER TABLE "_products_v_locales" DROP COLUMN "version_details_software_config";
  ALTER TABLE "_products_v_locales" DROP COLUMN "version_details_experiments";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_folders_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tickets_id";
  ALTER TABLE "site_settings_social_links" DROP COLUMN "_locale";
  ALTER TABLE "site_settings_social_links" DROP COLUMN "label";
  ALTER TABLE "site_settings" DROP COLUMN "frontend_branding_header_logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "frontend_branding_header_logo_inverse_id";
  ALTER TABLE "site_settings" DROP COLUMN "frontend_branding_footer_logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "frontend_branding_footer_logo_inverse_id";
  ALTER TABLE "site_settings" DROP COLUMN "frontend_branding_favicon_id";
  ALTER TABLE "site_settings" DROP COLUMN "icp_number";
  ALTER TABLE "site_settings" DROP COLUMN "icp_link";
  ALTER TABLE "site_settings" DROP COLUMN "psb_number";
  ALTER TABLE "site_settings" DROP COLUMN "psb_icon_id";
  ALTER TABLE "site_settings_locales" DROP COLUMN "cta_defaults_view_details_cta";
  ALTER TABLE "site_settings_locales" DROP COLUMN "product_detail_labels_composites";
  ALTER TABLE "site_settings_locales" DROP COLUMN "cookie_consent_privacy_policy_link";
  ALTER TABLE "navigation_items_children" DROP COLUMN "_locale";
  ALTER TABLE "navigation_items_children" DROP COLUMN "label";
  ALTER TABLE "navigation_items" DROP COLUMN "_locale";
  ALTER TABLE "navigation_items" DROP COLUMN "label";
  ALTER TABLE "footer_sections_links" DROP COLUMN "_locale";
  ALTER TABLE "footer_sections_links" DROP COLUMN "label";
  ALTER TABLE "footer_sections" DROP COLUMN "_locale";
  ALTER TABLE "footer_sections" DROP COLUMN "title";
  ALTER TABLE "footer_qr_codes" DROP COLUMN "_locale";
  ALTER TABLE "footer_qr_codes" DROP COLUMN "title";
  ALTER TABLE "footer" DROP COLUMN "contact_info_email";
  ALTER TABLE "footer_locales" DROP COLUMN "legal_privacy_policy_label";
  ALTER TABLE "footer_locales" DROP COLUMN "legal_cookie_settings_label";
  ALTER TABLE "footer_locales" DROP COLUMN "contact_info_phone";
  ALTER TABLE "footer_locales" DROP COLUMN "contact_info_address";
  DROP TYPE "public"."enum_pages_blocks_case_studies_list_category";
  DROP TYPE "public"."enum__pages_v_blocks_case_studies_list_category";
  DROP TYPE "public"."enum_tickets_status";
  DROP TYPE "public"."enum_footer_contact_items_key";
  DROP TYPE "public"."enum_footer_contact_items_type";`)
}
