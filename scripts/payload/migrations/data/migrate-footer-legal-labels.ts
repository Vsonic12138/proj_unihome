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
      ALTER TABLE footer_locales
      ADD COLUMN IF NOT EXISTS legal_privacy_policy_label varchar,
      ADD COLUMN IF NOT EXISTS legal_cookie_settings_label varchar
    `);

    const updates = [
      {
        locale: "zh",
        privacy: "隐私与 Cookie 政策",
        cookie: "Cookie 设置",
      },
      {
        locale: "en",
        privacy: "Privacy & Cookie Policy",
        cookie: "Cookie Settings",
      },
      {
        locale: "ja",
        privacy: "プライバシー・Cookie ポリシー",
        cookie: "Cookie 設定",
      },
    ] as const;

    for (const row of updates) {
      const result = await client.query(
        `
          UPDATE footer_locales
          SET
            legal_privacy_policy_label = COALESCE(legal_privacy_policy_label, $1),
            legal_cookie_settings_label = COALESCE(legal_cookie_settings_label, $2)
          WHERE _locale = $3
        `,
        [row.privacy, row.cookie, row.locale],
      );

      // eslint-disable-next-line no-console
      console.log(`[migrate] locale=${row.locale} updated rows: ${result.rowCount ?? 0}`);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
