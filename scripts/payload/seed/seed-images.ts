import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

import config from "../../../payload.config";

type JsonValue = null | boolean | number | string | JsonValue[] | { [k: string]: JsonValue };

const LOCALES = ["zh", "en", "ja"] as const;

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function collectImagePaths(value: JsonValue, out: Set<string>) {
  if (typeof value === "string") {
    if (value.startsWith("/images/")) {
      out.add(value);
    }
    return;
  }
  if (!value) return;
  if (Array.isArray(value)) {
    for (const item of value) collectImagePaths(item, out);
    return;
  }
  for (const v of Object.values(value)) collectImagePaths(v, out);
}

async function readMessagesJSON(locale: string, filename: string): Promise<JsonValue> {
  const filePath = path.resolve(process.cwd(), "messages", locale, filename);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as JsonValue;
}

async function main() {
  const payload = await getPayload({ config });

  try {
    const imagePaths = new Set<string>();
    imagePaths.add("/images/contact/qq-group-qrcode.jpg");
    imagePaths.add("/images/contact/weChat-official-account.jpg");
    const messageFiles = [
      "home.json",
      "products.json",
      "common.json",
      "pages.json",
      "contact.json",
    ];

    for (const locale of LOCALES) {
      for (const file of messageFiles) {
        const json = await readMessagesJSON(locale, file);
        collectImagePaths(json, imagePaths);
      }
    }

    const sorted = [...imagePaths].sort();
    // eslint-disable-next-line no-console
    console.log(`Found ${sorted.length} unique /images/* paths in messages.`);

    let created = 0;
    let skipped = 0;
    let missing = 0;

    for (const src of sorted) {
      const diskPath = path.resolve(process.cwd(), "public", src.replace(/^\//, ""));
      if (!(await fileExists(diskPath))) {
        missing++;
        // eslint-disable-next-line no-console
        console.warn(`Missing file: ${diskPath} (from ${src})`);
        continue;
      }

      const existing = await payload.find({
        collection: "media",
        where: { sourcePath: { equals: src } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length > 0) {
        skipped++;
        continue;
      }

      const filename = path.basename(diskPath);
      const createdDoc = await payload.create({
        collection: "media",
        data: {
          sourcePath: src,
          alt: filename,
        },
        filePath: diskPath,
        overrideAccess: true,
      });

      for (const locale of LOCALES) {
        if (locale === "zh") continue;
        await payload.update({
          collection: "media",
          id: createdDoc.id,
          data: {
            alt: filename,
          },
          locale,
          overrideAccess: true,
        });
      }

      created++;
      if (created % 25 === 0) {
        // eslint-disable-next-line no-console
        console.log(`Uploaded ${created} images...`);
      }
    }

    // eslint-disable-next-line no-console
    console.log({ created, skipped, missing });
  } finally {
    // The Postgres adapter has had cases where destroy() can hang.
    // Use a short timeout and then force exit to keep scripts non-interactive.
    await Promise.race([
      payload.db.destroy(),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
    process.exit(0);
  }
}

await main();
