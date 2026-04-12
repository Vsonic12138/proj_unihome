import "dotenv/config";

import { Client } from "pg";

async function main() {
  const connectionString = process.env.DATABASE_URI ?? process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing DATABASE_URI or DATABASE_URL");
  }

  const client = new Client({ connectionString });
  await client.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      ALTER TABLE site_settings_locales
      ADD COLUMN IF NOT EXISTS cookie_consent_privacy_policy_link varchar
    `);

    const legacyColumnExistsResult = await client.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'site_settings'
          AND column_name = 'cookie_consent_privacy_policy_link'
      ) AS exists
    `);

    let copiedLegacyCount = 0;

    if (legacyColumnExistsResult.rows[0]?.exists) {
      const copiedLegacyResult = await client.query(`
        UPDATE site_settings_locales AS locales
        SET cookie_consent_privacy_policy_link = settings.cookie_consent_privacy_policy_link
        FROM site_settings AS settings
        WHERE locales._parent_id = settings.id
          AND locales.cookie_consent_privacy_policy_link IS NULL
          AND settings.cookie_consent_privacy_policy_link IS NOT NULL
      `);

      copiedLegacyCount = copiedLegacyResult.rowCount ?? 0;
    }

    const initializedDefaultResult = await client.query(`
      UPDATE site_settings_locales
      SET cookie_consent_privacy_policy_link = '/privacy-policy'
      WHERE cookie_consent_privacy_policy_link IS NULL
    `);

    await client.query(`
      ALTER TABLE site_settings
      DROP COLUMN IF EXISTS cookie_consent_privacy_policy_link
    `);

    await client.query("COMMIT");

    // eslint-disable-next-line no-console
    console.log(`[migrate] copied legacy privacy policy link rows: ${copiedLegacyCount}`);
    // eslint-disable-next-line no-console
    console.log(`[migrate] initialized default localized links: ${initializedDefaultResult.rowCount ?? 0}`);
    // eslint-disable-next-line no-console
    console.log("[migrate] dropped legacy site_settings.cookie_consent_privacy_policy_link column");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
