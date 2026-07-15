import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";

async function readMigration(filename: string) {
  return fs.readFile(
    path.resolve(process.cwd(), "src", "migrations", filename),
    "utf8",
  );
}

test("sponsor baseline migration is idempotent for existing databases", async () => {
  const source = await readMigration(
    "20260714_013300_sponsor_schema_baseline.ts",
  );

  assert.match(source, /CREATE TABLE IF NOT EXISTS "pages_blocks_sponsor_logos"/);
  assert.match(source, /duplicate_object/);
  assert.match(source, /CREATE INDEX IF NOT EXISTS/);
});

test("news migration removes locked-document references before news tables", async () => {
  const source = await readMigration("20260714_013342_news_showcase.ts");
  const dropConstraint = source.indexOf(
    'DROP CONSTRAINT "payload_locked_documents_rels_news_fk"',
  );
  const dropNews = source.indexOf('DROP TABLE "news" CASCADE');

  assert.ok(dropConstraint >= 0);
  assert.ok(dropNews >= 0);
  assert.ok(dropConstraint < dropNews);
});
