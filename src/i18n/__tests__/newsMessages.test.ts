import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const locales = ["zh", "en", "ja"] as const;
const requiredPaths = [
  "showcase.title",
  "showcase.description",
  "showcase.readMore",
  "category.company",
  "category.industry",
  "category.media",
  "category.generic",
  "detail.home",
  "detail.news",
  "detail.breadcrumbLabel",
  "detail.coverAlt",
] as const;

function getAtPath(value: any, keyPath: string): unknown {
  return keyPath.split(".").reduce((current, key) => current?.[key], value);
}

test("all supported locales provide complete news messages", async () => {
  for (const locale of locales) {
    const filePath = path.resolve(process.cwd(), "messages", locale, "news.json");
    const messages = JSON.parse(await fs.readFile(filePath, "utf8"));

    for (const keyPath of requiredPaths) {
      const value = getAtPath(messages.news, keyPath);
      assert.equal(typeof value, "string", `${locale}:${keyPath}`);
      assert.ok(String(value).trim(), `${locale}:${keyPath}`);
    }
  }
});
