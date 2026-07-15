import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

import config from "../../../payload.config";

const LOCALES = ["zh", "en", "ja"] as const;
type Locale = (typeof LOCALES)[number];

type SnapshotDoc = Record<string, any>;
type Snapshot = {
  meta: {
    generatedAt: string;
    locales: Locale[];
    globals: string[];
    collections: string[];
  };
  globals: Record<Locale, Record<string, SnapshotDoc>>;
  collections: Record<Locale, Record<string, SnapshotDoc[]>>;
};

const INTERNAL_DOC_KEYS = new Set([
  "id",
  "createdAt",
  "updatedAt",
  "url",
  "thumbnailURL",
  "filesize",
  "width",
  "height",
  "focalX",
  "focalY",
  "mimeType",
  "sizes",
  "_status",
]);

const MEDIA_FIELD_NAMES = new Set([
  "media",
  "image",
  "heroImage",
  "coverImage",
  "logo",
  "logoInverse",
  "headerLogo",
  "headerLogoInverse",
  "footerLogo",
  "footerLogoInverse",
  "favicon",
  "qrImage",
]);

const PRODUCT_FIELD_NAMES = new Set(["product"]);
const PRODUCT_ARRAY_FIELD_NAMES = new Set(["product", "slugs"]);
const SERIES_FIELD_NAMES = new Set(["series"]);
const FOLDER_FIELD_NAMES = new Set(["folder", "parent"]);

function isObject(value: unknown): value is Record<string, any> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isMediaRef(value: unknown): value is Record<string, any> {
  return isObject(value) && (typeof value.filename === "string" || typeof value.sourcePath === "string") && "url" in value;
}

function isProductRef(value: unknown): value is Record<string, any> {
  return isObject(value) && typeof value.slug === "string" && ("model" in value || "details" in value || "brief" in value);
}

function isSeriesRef(value: unknown): value is Record<string, any> {
  return isObject(value) && typeof value.key === "string" && ("sortOrder" in value || "title" in value);
}

function isFolderRef(value: unknown): value is Record<string, any> {
  return isObject(value) && typeof value.slug === "string" && ("name" in value || "parent" in value);
}

function parseMaybeJSONText(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return value;

  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

function getSnapshotPath(): string {
  const provided = process.env.CMS_SNAPSHOT_PATH?.trim();
  if (provided) return path.resolve(process.cwd(), provided);
  return path.resolve(process.cwd(), "backups", "cms_snapshot_latest.json");
}

async function readSnapshot(): Promise<Snapshot> {
  const snapshotPath = getSnapshotPath();
  const raw = await fs.readFile(snapshotPath, "utf8");
  return JSON.parse(raw) as Snapshot;
}

function docStatus(doc: SnapshotDoc) {
  return doc?._status === "draft" ? "draft" : "published";
}

function mediaKey(doc: SnapshotDoc) {
  return String(doc?.sourcePath ?? doc?.filename ?? "").trim();
}

function folderKey(doc: SnapshotDoc) {
  return String(doc?.slug ?? "").trim();
}

function pageKey(doc: SnapshotDoc) {
  return String(doc?.slug ?? "").trim();
}

function seriesKey(doc: SnapshotDoc) {
  return String(doc?.key ?? "").trim();
}

function productKey(doc: SnapshotDoc) {
  return String(doc?.slug ?? "").trim();
}

function caseStudyKey(doc: SnapshotDoc) {
  return String(doc?.slug ?? "").trim();
}

function newsKey(doc: SnapshotDoc) {
  return String(doc?.slug ?? "").trim();
}

function faqKey(doc: SnapshotDoc) {
  return String(doc?.sortOrder ?? 0);
}

function findLocalizedDoc(collection: Record<Locale, SnapshotDoc[]>, locale: Locale, matcher: (doc: SnapshotDoc) => string, canonicalDoc: SnapshotDoc) {
  const targetKey = matcher(canonicalDoc);
  return (collection[locale] ?? []).find((item) => matcher(item) === targetKey) ?? canonicalDoc;
}

async function resolveExistingDocId(payload: any, collection: string, where: Record<string, unknown>) {
  const result = await payload.find({
    collection,
    where,
    limit: 1,
    overrideAccess: true,
    draft: true,
  });

  return result.docs?.[0]?.id ?? null;
}

async function findFileForMedia(doc: SnapshotDoc) {
  const candidates = [
    typeof doc?.sourcePath === "string" && doc.sourcePath
      ? path.resolve(process.cwd(), "public", doc.sourcePath.replace(/^\/+/, ""))
      : null,
    typeof doc?.filename === "string" && doc.filename
      ? path.resolve(process.cwd(), "media", doc.filename)
      : null,
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      continue;
    }
  }

  return null;
}

async function main() {
  if ((config as any)?.db) {
    (config as any).db.push = false;
  }

  const payload = await getPayload({ config });
  const snapshot = await readSnapshot();

  const folderIdBySlug = new Map<string, number | string>();
  const mediaIdByKey = new Map<string, number | string>();
  const seriesIdByKey = new Map<string, number | string>();
  const productIdBySlug = new Map<string, number | string>();

  const transformValue = (value: unknown, keyName?: string): unknown => {
    if (Array.isArray(value)) {
      if (PRODUCT_ARRAY_FIELD_NAMES.has(String(keyName))) {
        return value.map((item) => transformValue(item, "product")).filter(Boolean);
      }

      return value.map((item) => transformValue(item, keyName));
    }

    if (!isObject(value)) {
      return parseMaybeJSONText(value);
    }

    if ((MEDIA_FIELD_NAMES.has(String(keyName)) || keyName === "value") && isMediaRef(value)) {
      const resolved = mediaIdByKey.get(mediaKey(value));
      return resolved ?? value.id ?? null;
    }

    if (PRODUCT_FIELD_NAMES.has(String(keyName)) && isProductRef(value)) {
      return productIdBySlug.get(productKey(value)) ?? value.id ?? null;
    }

    if (SERIES_FIELD_NAMES.has(String(keyName)) && isSeriesRef(value)) {
      return seriesIdByKey.get(seriesKey(value)) ?? value.id ?? null;
    }

    if (FOLDER_FIELD_NAMES.has(String(keyName)) && isFolderRef(value)) {
      return folderIdBySlug.get(folderKey(value)) ?? value.id ?? null;
    }

    if (isMediaRef(value) && keyName === "value") {
      return mediaIdByKey.get(mediaKey(value)) ?? value.id ?? null;
    }

    const next: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      if (INTERNAL_DOC_KEYS.has(key)) continue;
      next[key] = transformValue(nested, key);
    }
    return next;
  };

  const upsertLocalizedCollection = async (args: {
    collection: string;
    localeDocs: Record<Locale, SnapshotDoc[]>;
    getKey: (doc: SnapshotDoc) => string;
    buildWhere: (doc: SnapshotDoc) => Record<string, unknown>;
    beforeLocales?: (canonicalDoc: SnapshotDoc) => Promise<number | string | null>;
  }) => {
    const { collection, localeDocs, getKey, buildWhere, beforeLocales } = args;

    for (const canonicalDoc of localeDocs.zh ?? []) {
      const key = getKey(canonicalDoc);
      if (!key) continue;

      let docId = beforeLocales ? await beforeLocales(canonicalDoc) : null;
      if (!docId) {
        docId = await resolveExistingDocId(payload, collection, buildWhere(canonicalDoc));
      }

      const restoreAsDraft = docStatus(canonicalDoc) === "draft";
      if (docId && restoreAsDraft) {
        // Unpublish first so the localized snapshot writes below remain the latest draft.
        await payload.update({
          collection,
          id: docId,
          overrideAccess: true,
          data: { _status: "draft" },
        });
      }

      for (const locale of LOCALES) {
        const localizedDoc = findLocalizedDoc(localeDocs, locale, getKey, canonicalDoc);
        const transformed = transformValue(localizedDoc) as Record<string, unknown>;
        const draft = restoreAsDraft;

        if (!docId) {
          const created = await payload.create({
            collection,
            locale,
            overrideAccess: true,
            data: transformed,
            draft,
          });
          docId = created.id;
        } else {
          await payload.update({
            collection,
            id: docId,
            locale,
            overrideAccess: true,
            data: transformed,
            draft,
          });
        }
      }

      if (collection === "productSeries" && docId) seriesIdByKey.set(key, docId);
      if (collection === "products" && docId) productIdBySlug.set(key, docId);
      if (collection === "mediaFolders" && docId) folderIdBySlug.set(key, docId);
    }
  };

  await upsertLocalizedCollection({
    collection: "mediaFolders",
    localeDocs: Object.fromEntries(LOCALES.map((locale) => [locale, snapshot.collections[locale].mediaFolders ?? []])) as Record<Locale, SnapshotDoc[]>,
    getKey: folderKey,
    buildWhere: (doc) => ({ slug: { equals: folderKey(doc) } }),
  });

  for (const canonicalDoc of snapshot.collections.zh.media ?? []) {
    const key = mediaKey(canonicalDoc);
    if (!key) continue;

    let docId = await resolveExistingDocId(
      payload,
      "media",
      canonicalDoc?.sourcePath
        ? { sourcePath: { equals: canonicalDoc.sourcePath } }
        : { filename: { equals: canonicalDoc.filename } },
    );

    const baseData = {
      folder: transformValue(canonicalDoc.folder, "folder"),
      sourcePath: canonicalDoc.sourcePath ?? undefined,
    };

    if (!docId) {
      const filePath = await findFileForMedia(canonicalDoc);
      if (!filePath) {
        // eslint-disable-next-line no-console
        console.warn(`[restore] skip media ${key}: source file not found`);
        continue;
      }

      const created = await payload.create({
        collection: "media",
        locale: "zh",
        overrideAccess: true,
        filePath,
        data: {
          ...baseData,
          alt: parseMaybeJSONText(canonicalDoc.alt),
        },
      });

      docId = created.id;
    }

    for (const locale of LOCALES) {
      const localizedDoc = findLocalizedDoc(
        Object.fromEntries(LOCALES.map((entryLocale) => [entryLocale, snapshot.collections[entryLocale].media ?? []])) as Record<Locale, SnapshotDoc[]>,
        locale,
        mediaKey,
        canonicalDoc,
      );
      await payload.update({
        collection: "media",
        id: docId,
        locale,
        overrideAccess: true,
        data: {
          ...baseData,
          alt: parseMaybeJSONText(localizedDoc.alt),
        },
      });
    }

    mediaIdByKey.set(key, docId);
  }

  await upsertLocalizedCollection({
    collection: "productSeries",
    localeDocs: Object.fromEntries(LOCALES.map((locale) => [locale, snapshot.collections[locale].productSeries ?? []])) as Record<Locale, SnapshotDoc[]>,
    getKey: seriesKey,
    buildWhere: (doc) => ({ key: { equals: seriesKey(doc) } }),
  });

  await upsertLocalizedCollection({
    collection: "products",
    localeDocs: Object.fromEntries(LOCALES.map((locale) => [locale, snapshot.collections[locale].products ?? []])) as Record<Locale, SnapshotDoc[]>,
    getKey: productKey,
    buildWhere: (doc) => ({ slug: { equals: productKey(doc) } }),
  });

  await upsertLocalizedCollection({
    collection: "faq",
    localeDocs: Object.fromEntries(LOCALES.map((locale) => [locale, snapshot.collections[locale].faq ?? []])) as Record<Locale, SnapshotDoc[]>,
    getKey: faqKey,
    buildWhere: (doc) => ({ sortOrder: { equals: doc.sortOrder ?? 0 } }),
  });

  await upsertLocalizedCollection({
    collection: "caseStudies",
    localeDocs: Object.fromEntries(LOCALES.map((locale) => [locale, snapshot.collections[locale].caseStudies ?? []])) as Record<Locale, SnapshotDoc[]>,
    getKey: caseStudyKey,
    buildWhere: (doc) => ({ slug: { equals: caseStudyKey(doc) } }),
  });

  await upsertLocalizedCollection({
    collection: "news",
    localeDocs: Object.fromEntries(LOCALES.map((locale) => [locale, snapshot.collections[locale].news ?? []])) as Record<Locale, SnapshotDoc[]>,
    getKey: newsKey,
    buildWhere: (doc) => ({ slug: { equals: newsKey(doc) } }),
  });

  await upsertLocalizedCollection({
    collection: "pages",
    localeDocs: Object.fromEntries(LOCALES.map((locale) => [locale, snapshot.collections[locale].pages ?? []])) as Record<Locale, SnapshotDoc[]>,
    getKey: pageKey,
    buildWhere: (doc) => ({ slug: { equals: pageKey(doc) } }),
  });

  for (const locale of LOCALES) {
    for (const globalSlug of snapshot.meta.globals) {
      const globalDoc = snapshot.globals[locale]?.[globalSlug];
      if (!globalDoc) continue;

      await payload.updateGlobal({
        slug: globalSlug,
        locale,
        overrideAccess: true,
        data: transformValue(globalDoc) as Record<string, unknown>,
      });
    }
  }

  // eslint-disable-next-line no-console
  console.log(`[restore] restored snapshot from ${path.relative(process.cwd(), getSnapshotPath())}`);

  await Promise.race([
    (payload.db as any)?.destroy?.(),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  process.exit(0);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
