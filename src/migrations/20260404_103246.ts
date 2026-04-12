import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "cookie_consent_privacy_policy_link" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "floating_contact_qq_group_number" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "floating_contact_qq_group_qr_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "floating_contact_wechat_qr_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "floating_contact_phone_number" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "floating_contact_bilibili_href" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "floating_contact_taobao_href" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "cookie_consent_aria_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "cookie_consent_message" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "cookie_consent_learn_more" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "cookie_consent_accept_all" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "cookie_consent_reject_non_essential" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_panel_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_fab_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_close_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_qq_group_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_qq_group_tooltip" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_qq_group_copy" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_qq_group_copied" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_wechat_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_wechat_tooltip" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_wechat_coming_soon" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_phone_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_phone_name" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_phone_tooltip" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_phone_copy" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_phone_copied" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_bilibili_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_bilibili_tooltip" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_bilibili_link_text" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_taobao_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_taobao_tooltip" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "floating_contact_taobao_link_text" varchar;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_floating_contact_qq_group_qr_image_id_media_id_fk" FOREIGN KEY ("floating_contact_qq_group_qr_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_floating_contact_wechat_qr_image_id_media_id_fk" FOREIGN KEY ("floating_contact_wechat_qr_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_floating_contact_qq_group_floating_contact_idx" ON "site_settings" USING btree ("floating_contact_qq_group_qr_image_id");
  CREATE INDEX "site_settings_floating_contact_wechat_floating_contact_w_idx" ON "site_settings" USING btree ("floating_contact_wechat_qr_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_floating_contact_qq_group_qr_image_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_floating_contact_wechat_qr_image_id_media_id_fk";
  
  DROP INDEX "site_settings_floating_contact_qq_group_floating_contact_idx";
  DROP INDEX "site_settings_floating_contact_wechat_floating_contact_w_idx";
  ALTER TABLE "site_settings" DROP COLUMN "cookie_consent_privacy_policy_link";
  ALTER TABLE "site_settings" DROP COLUMN "floating_contact_qq_group_number";
  ALTER TABLE "site_settings" DROP COLUMN "floating_contact_qq_group_qr_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "floating_contact_wechat_qr_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "floating_contact_phone_number";
  ALTER TABLE "site_settings" DROP COLUMN "floating_contact_bilibili_href";
  ALTER TABLE "site_settings" DROP COLUMN "floating_contact_taobao_href";
  ALTER TABLE "site_settings_locales" DROP COLUMN "cookie_consent_aria_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "cookie_consent_message";
  ALTER TABLE "site_settings_locales" DROP COLUMN "cookie_consent_learn_more";
  ALTER TABLE "site_settings_locales" DROP COLUMN "cookie_consent_accept_all";
  ALTER TABLE "site_settings_locales" DROP COLUMN "cookie_consent_reject_non_essential";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_panel_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_fab_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_close_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_qq_group_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_qq_group_tooltip";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_qq_group_copy";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_qq_group_copied";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_wechat_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_wechat_tooltip";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_wechat_coming_soon";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_phone_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_phone_name";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_phone_tooltip";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_phone_copy";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_phone_copied";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_bilibili_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_bilibili_tooltip";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_bilibili_link_text";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_taobao_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_taobao_tooltip";
  ALTER TABLE "site_settings_locales" DROP COLUMN "floating_contact_taobao_link_text";`)
}
