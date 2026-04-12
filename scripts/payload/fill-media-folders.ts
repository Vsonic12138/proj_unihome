import "dotenv/config";

import { getPayload } from "payload";

import configPromise from "../../payload.config";
import { caseStudiesData } from "./data/case-studies";

const LOCALE = "zh";
const isDryRun = process.argv.includes("--dry-run");

const PAGE_FOLDER_BY_SLUG: Record<string, string> = {
  home: "Home_Page",
  products: "Product_Introduction",
  developers: "Developer_Services",
  "developers-knowledge-base": "Knowledge_Base",
  "developers-open-source": "OpenSource_Project",
  "custom-solutions": "Custom_Cooperation",
  "case-studies": "Service_Cases",
  "case-studies-practical-teaching": "Practical_Training_Teaching_Cases",
  "case-studies-sci-tech-innovation": "Cases_Of_Scientific_And_Technological_Innovation",
  "case-studies-innovation-competition": "Cases_Of_Innovation_Competitions",
  "case-studies-training-base": "Training_Base_Cases",
};

const CASE_FOLDER_BY_CATEGORY: Record<string, string> = {
  "practical-teaching": "Practical_Training_Teaching_Cases",
  "sci-tech-innovation": "Cases_Of_Scientific_And_Technological_Innovation",
  "innovation-competition": "Cases_Of_Innovation_Competitions",
  "training-base": "Training_Base_Cases",
};

const PRODUCT_FOLDER_FALLBACK = "Product_Introduction";
const PRODUCT_FOLDER_ALIAS: Record<string, string> = {
  "ubot-mr20": "ubot-mr40",
};

const PRODUCT_FOLDER_BY_FILENAME: Record<string, string> = {
  "rai-p4-comprehensive-training-display.png": "rai-p4",
  "motherboard.png": "gx-mat-09s",
  "composite-robot-demo.png": "gx-mat-09s",
  "dual-arm.png": "gx-mat-09s",
  "7-axis-arm.png": "gx-mat-09s",
  "6-axis-arm.png": "gx-mat-09s",
  "5-axis-serial-arm.png": "gx-mat-09s",
  "4-axis-scara-arm.png": "gx-mat-09s",
  "4-axis-serial-arm.png": "gx-mat-09s",
  "3-axis-arm-2.png": "gx-mat-09s",
  "3-dof-arm-1.png": "gx-mat-09s",
  "2-dof-gimbal.png": "gx-mat-09s",
  "six-wheel-six-drive-differential-chassis.png": "gx-mat-09s",
  "six-wheel-dual-drive-differential-chassis.png": "gx-mat-09s",
  "four-wheel-eight-drive-steering-chassis.png": "gx-mat-09s",
  "four-wheel-mecanum-omni-chassis.png": "gx-mat-09s",
  "four-wheel-foley-omni-chassis.png": "gx-mat-09s",
  "four-wheel-four-drive-differential-chassis.png": "gx-mat-09s",
  "four-wheel-dual-drive-differential-chassis.png": "gx-mat-09s",
  "tri-wheel-tri-drive-omni-chassis-2.png": "gx-mat-09s",
  "tri-wheel-tri-drive-omni-chassis-1.png": "gx-mat-09s",
  "tri-wheel-front-steering-chassis.png": "gx-mat-09s",
  "tri-wheel-differential-chassis.png": "gx-mat-09s",
};

const RELATION_FIELD_KEYS = new Set([
  "image",
  "heroImage",
  "coverImage",
  "media",
  "src",
  "logo",
  "logoInverse",
  "headerLogo",
  "headerLogoInverse",
  "footerLogo",
  "footerLogoInverse",
  "favicon",
]);

type FolderDoc = {
  id: number | string;
  slug?: string | null;
};

type MediaDoc = {
  id: number | string;
  filename?: string | null;
  sourcePath?: string | null;
  folder?: number | string | null | { id: number | string; slug?: string | null };
};

type ScoreReason = {
  folderSlug: string;
  score: number;
  reason: string;
};

function addCandidate(
  map: Map<string, ScoreReason>,
  mediaId: number | string,
  candidate: ScoreReason | null,
) {
  if (!candidate) return;
  const key = String(mediaId);
  const prev = map.get(key);
  if (!prev || candidate.score > prev.score) {
    map.set(key, candidate);
  }
}

function chooseProductFolder(productSlug: string, availableFolders: Set<string>) {
  const normalized = PRODUCT_FOLDER_ALIAS[productSlug] ?? productSlug;
  if (availableFolders.has(normalized)) return normalized;
  if (availableFolders.has(PRODUCT_FOLDER_FALLBACK)) return PRODUCT_FOLDER_FALLBACK;
  return null;
}

function inferFolderFromSourcePath(sourcePath: string | null | undefined, availableFolders: Set<string>) {
  if (!sourcePath) return null;

  if (sourcePath.startsWith("/images/logo/") && availableFolders.has("site-branding")) {
    return { folderSlug: "site-branding", score: 200, reason: `sourcePath=${sourcePath}` };
  }

  const productMatch = sourcePath.match(/^\/images\/products\/([^/]+)\//);
  if (productMatch) {
    const folderSlug = chooseProductFolder(productMatch[1], availableFolders);
    if (folderSlug) {
      return { folderSlug, score: folderSlug === PRODUCT_FOLDER_FALLBACK ? 110 : 180, reason: `sourcePath=${sourcePath}` };
    }
  }

  if (sourcePath.startsWith("/images/home/") || sourcePath.startsWith("/images/hero/")) {
    if (availableFolders.has("Home_Page")) {
      return { folderSlug: "Home_Page", score: 150, reason: `sourcePath=${sourcePath}` };
    }
  }

  if (sourcePath.startsWith("/images/open-source/") && availableFolders.has("OpenSource_Project")) {
    return { folderSlug: "OpenSource_Project", score: 150, reason: `sourcePath=${sourcePath}` };
  }

  if (sourcePath.startsWith("/images/knowledge-base/") && availableFolders.has("Knowledge_Base")) {
    return { folderSlug: "Knowledge_Base", score: 150, reason: `sourcePath=${sourcePath}` };
  }

  return null;
}

function inferFolderFromFilename(filename: string | null | undefined, availableFolders: Set<string>) {
  if (!filename) return null;

  const exact = PRODUCT_FOLDER_BY_FILENAME[filename];
  if (exact && availableFolders.has(exact)) {
    return { folderSlug: exact, score: 170, reason: `filename=${filename}` };
  }

  if (filename.startsWith("rai-p4-") && availableFolders.has("rai-p4")) {
    return { folderSlug: "rai-p4", score: 170, reason: `filename=${filename}` };
  }

  return null;
}

function collectMediaIds(value: unknown, currentKey?: string): Array<number | string> {
  const result: Array<number | string> = [];

  if (value == null) return result;

  if (Array.isArray(value)) {
    for (const item of value) {
      result.push(...collectMediaIds(item, currentKey));
    }
    return result;
  }

  if (typeof value !== "object") {
    if (currentKey && RELATION_FIELD_KEYS.has(currentKey) && (typeof value === "number" || typeof value === "string")) {
      result.push(value);
    }
    return result;
  }

  const doc = value as Record<string, unknown>;
  if (currentKey && RELATION_FIELD_KEYS.has(currentKey)) {
    if (typeof doc.id === "number" || typeof doc.id === "string") {
      result.push(doc.id);
      return result;
    }
  }

  for (const [key, child] of Object.entries(doc)) {
    result.push(...collectMediaIds(child, key));
  }

  return result;
}

async function main() {
  const payload = await getPayload({ config: await configPromise });

  const [foldersRes, mediaRes, pagesRes, productsRes, caseStudiesRes, siteSettings, footer] = await Promise.all([
    payload.find({
      collection: "mediaFolders",
      locale: LOCALE,
      depth: 0,
      limit: 1000,
      overrideAccess: true,
    }),
    payload.find({
      collection: "media",
      locale: LOCALE,
      depth: 0,
      limit: 1000,
      overrideAccess: true,
      draft: true,
    }),
    payload.find({
      collection: "pages",
      locale: LOCALE,
      depth: 1,
      limit: 1000,
      overrideAccess: true,
      draft: true,
    }),
    payload.find({
      collection: "products",
      locale: LOCALE,
      depth: 1,
      limit: 1000,
      overrideAccess: true,
      draft: true,
    }),
    payload.find({
      collection: "caseStudies",
      locale: LOCALE,
      depth: 1,
      limit: 1000,
      overrideAccess: true,
      draft: true,
    }),
    payload.findGlobal({
      slug: "siteSettings",
      locale: LOCALE,
      depth: 1,
      overrideAccess: true,
    }),
    payload.findGlobal({
      slug: "footer",
      locale: LOCALE,
      depth: 1,
      overrideAccess: true,
    }),
  ]);

  const folderIdBySlug = new Map<string, number | string>();
  const folderSlugById = new Map<string, string>();
  const availableFolders = new Set<string>();

  for (const folder of foldersRes.docs as FolderDoc[]) {
    const slug = String(folder.slug ?? "");
    if (!slug) continue;
    folderIdBySlug.set(slug, folder.id);
    folderSlugById.set(String(folder.id), slug);
    availableFolders.add(slug);
  }

  const candidates = new Map<string, ScoreReason>();

  for (const media of mediaRes.docs as MediaDoc[]) {
    addCandidate(candidates, media.id, inferFolderFromSourcePath(media.sourcePath, availableFolders));
    addCandidate(candidates, media.id, inferFolderFromFilename(media.filename, availableFolders));
  }

  for (const page of pagesRes.docs) {
    const folderSlug = PAGE_FOLDER_BY_SLUG[String((page as any).slug ?? "")];
    if (!folderSlug || !availableFolders.has(folderSlug)) continue;
    for (const mediaId of collectMediaIds(page)) {
      addCandidate(candidates, mediaId, {
        folderSlug,
        score: 300,
        reason: `page:${(page as any).slug}`,
      });
    }
  }

  for (const product of productsRes.docs) {
    const folderSlug = chooseProductFolder(String((product as any).slug ?? ""), availableFolders);
    if (!folderSlug) continue;
    for (const mediaId of collectMediaIds(product)) {
      addCandidate(candidates, mediaId, {
        folderSlug,
        score: folderSlug === PRODUCT_FOLDER_FALLBACK ? 320 : 400,
        reason: `product:${(product as any).slug}`,
      });
    }
  }

  for (const caseStudy of caseStudiesRes.docs) {
    const folderSlug = CASE_FOLDER_BY_CATEGORY[String((caseStudy as any).category ?? "")];
    if (!folderSlug || !availableFolders.has(folderSlug)) continue;
    for (const mediaId of collectMediaIds(caseStudy)) {
      addCandidate(candidates, mediaId, {
        folderSlug,
        score: 350,
        reason: `caseStudy:${(caseStudy as any).category}:${(caseStudy as any).slug}`,
      });
    }
  }

  for (const mediaId of collectMediaIds(siteSettings)) {
    addCandidate(candidates, mediaId, {
      folderSlug: "site-branding",
      score: 500,
      reason: "siteSettings.frontendBranding",
    });
  }

  for (const entry of caseStudiesData) {
    const folderSlug = CASE_FOLDER_BY_CATEGORY[entry.category];
    if (!folderSlug || !availableFolders.has(folderSlug)) continue;
    for (const imagePath of entry.images ?? []) {
      const filename = imagePath.split("/").pop();
      if (!filename) continue;
      for (const media of mediaRes.docs as MediaDoc[]) {
        if (media.filename === filename) {
          addCandidate(candidates, media.id, {
            folderSlug,
            score: 250,
            reason: `caseStudiesData:${entry.category}:${filename}`,
          });
        }
      }
    }
  }

  void footer;

  const updates: Array<{ id: number | string; from: string | null; to: string; reason: string; filename: string }> = [];
  const unmatched: Array<{ id: number | string; filename: string; sourcePath: string | null | undefined }> = [];

  for (const media of mediaRes.docs as MediaDoc[]) {
    const key = String(media.id);
    const currentFolderSlug = media.folder
      ? typeof media.folder === "object"
        ? String(media.folder.slug ?? folderSlugById.get(String(media.folder.id)) ?? "")
        : folderSlugById.get(String(media.folder)) ?? String(media.folder)
      : null;
    const candidate = candidates.get(key);

    if (!candidate) {
      if (!currentFolderSlug) {
        unmatched.push({
          id: media.id,
          filename: String(media.filename ?? ""),
          sourcePath: media.sourcePath,
        });
      }
      continue;
    }

    if (currentFolderSlug === candidate.folderSlug) continue;

    updates.push({
      id: media.id,
      from: currentFolderSlug,
      to: candidate.folderSlug,
      reason: candidate.reason,
      filename: String(media.filename ?? ""),
    });
  }

  console.log(`Media total: ${mediaRes.totalDocs}`);
  console.log(`Planned updates: ${updates.length}`);
  console.log(`Unmatched uncategorized: ${unmatched.length}`);

  for (const item of updates) {
    console.log(`- media#${item.id} ${item.filename}: ${item.from ?? "null"} -> ${item.to} (${item.reason})`);
  }

  if (unmatched.length > 0) {
    console.log("\nUnmatched uncategorized media:");
    for (const item of unmatched) {
      console.log(`- media#${item.id} ${item.filename} sourcePath=${item.sourcePath ?? "null"}`);
    }
  }

  if (isDryRun) {
    console.log("\nDry run only, no data updated.");
    return;
  }

  for (const item of updates) {
    const folderId = folderIdBySlug.get(item.to);
    if (!folderId) continue;
    await payload.update({
      collection: "media",
      id: item.id,
      locale: LOCALE,
      overrideAccess: true,
      data: {
        folder: folderId,
      },
    });
  }

  console.log("\nMedia folder assignment complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
