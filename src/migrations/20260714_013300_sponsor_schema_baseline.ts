import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_sponsor_logos_speed" AS ENUM('slow', 'normal', 'fast');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_sponsor_logos_speed" AS ENUM('slow', 'normal', 'fast');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_sponsor_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "_locale" "_locales" NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "description" varchar,
      "speed" "enum_pages_blocks_sponsor_logos_speed" DEFAULT 'normal',
      "pause_on_hover" boolean DEFAULT true,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_sponsor_logos_logos" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "_locale" "_locales" NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "light_logo_id" integer,
      "dark_logo_id" integer,
      "url" varchar,
      "open_in_new_tab" boolean DEFAULT true
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sponsor_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "_locale" "_locales" NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar,
      "description" varchar,
      "speed" "enum__pages_v_blocks_sponsor_logos_speed" DEFAULT 'normal',
      "pause_on_hover" boolean DEFAULT true,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sponsor_logos_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_locale" "_locales" NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "light_logo_id" integer,
      "dark_logo_id" integer,
      "url" varchar,
      "open_in_new_tab" boolean DEFAULT true,
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sponsor_logos" ADD CONSTRAINT "pages_blocks_sponsor_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sponsor_logos_logos" ADD CONSTRAINT "pages_blocks_sponsor_logos_logos_light_logo_id_media_id_fk" FOREIGN KEY ("light_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sponsor_logos_logos" ADD CONSTRAINT "pages_blocks_sponsor_logos_logos_dark_logo_id_media_id_fk" FOREIGN KEY ("dark_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sponsor_logos_logos" ADD CONSTRAINT "pages_blocks_sponsor_logos_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sponsor_logos"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sponsor_logos" ADD CONSTRAINT "_pages_v_blocks_sponsor_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sponsor_logos_logos" ADD CONSTRAINT "_pages_v_blocks_sponsor_logos_logos_light_logo_id_media_id_fk" FOREIGN KEY ("light_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sponsor_logos_logos" ADD CONSTRAINT "_pages_v_blocks_sponsor_logos_logos_dark_logo_id_media_id_fk" FOREIGN KEY ("dark_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sponsor_logos_logos" ADD CONSTRAINT "_pages_v_blocks_sponsor_logos_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sponsor_logos"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_sponsor_logos_order_idx" ON "pages_blocks_sponsor_logos" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sponsor_logos_parent_id_idx" ON "pages_blocks_sponsor_logos" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sponsor_logos_path_idx" ON "pages_blocks_sponsor_logos" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sponsor_logos_locale_idx" ON "pages_blocks_sponsor_logos" USING btree ("_locale");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sponsor_logos_logos_order_idx" ON "pages_blocks_sponsor_logos_logos" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sponsor_logos_logos_parent_id_idx" ON "pages_blocks_sponsor_logos_logos" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sponsor_logos_logos_locale_idx" ON "pages_blocks_sponsor_logos_logos" USING btree ("_locale");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sponsor_logos_logos_light_logo_idx" ON "pages_blocks_sponsor_logos_logos" USING btree ("light_logo_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sponsor_logos_logos_dark_logo_idx" ON "pages_blocks_sponsor_logos_logos" USING btree ("dark_logo_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sponsor_logos_order_idx" ON "_pages_v_blocks_sponsor_logos" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sponsor_logos_parent_id_idx" ON "_pages_v_blocks_sponsor_logos" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sponsor_logos_path_idx" ON "_pages_v_blocks_sponsor_logos" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sponsor_logos_locale_idx" ON "_pages_v_blocks_sponsor_logos" USING btree ("_locale");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sponsor_logos_logos_order_idx" ON "_pages_v_blocks_sponsor_logos_logos" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sponsor_logos_logos_parent_id_idx" ON "_pages_v_blocks_sponsor_logos_logos" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sponsor_logos_logos_locale_idx" ON "_pages_v_blocks_sponsor_logos_logos" USING btree ("_locale");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sponsor_logos_logos_light_logo_idx" ON "_pages_v_blocks_sponsor_logos_logos" USING btree ("light_logo_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sponsor_logos_logos_dark_logo_idx" ON "_pages_v_blocks_sponsor_logos_logos" USING btree ("dark_logo_id");
  `);
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // This migration only reconciles a schema that shipped before migration tracking.
}
