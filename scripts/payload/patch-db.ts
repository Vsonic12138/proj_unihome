import "dotenv/config";
import pg from "pg";

async function run() {
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URI,
  });
  await client.connect();
  
  const tables = [
      "pages_blocks_features_highlights",
      "pages_blocks_features_highlights_locales",
      "_pages_v_blocks_features_highlights",
      "_pages_v_blocks_features_highlights_locales",
      "_pages_v_blocks_features_highlights_tags",
      "_pages_v_blocks_features_highlights__tags"
  ];
  
  for (const table of tables) {
      try {
          await client.query(`ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "link" varchar;`);
          await client.query(`ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "tags" varchar;`);
          console.log("Patched", table);
      } catch (e) {
          // ignore if table doesn't exist etc
      }
  }

  console.log("DB patched.");
  await client.end();
  process.exit();
}
run();
