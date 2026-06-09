import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

import config from "../../../payload.config";

const LOCALES = ["zh", "en", "ja"] as const;
type Locale = (typeof LOCALES)[number];

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readMessagesJSON(locale: Locale, filename: string) {
  const filePath = path.resolve(process.cwd(), "messages", locale, filename);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function ensureMedia(payload: any, src: string, alt: string) {
  const existing = await payload.find({
    collection: "media",
    where: { sourcePath: { equals: src } },
    limit: 1,
    overrideAccess: true,
  });

  let mediaId = existing.docs?.[0]?.id as number | string | undefined;
  if (!mediaId) {
    const diskPath = path.resolve(process.cwd(), "public", src.replace(/^\//, ""));
    if (!(await fileExists(diskPath))) {
      throw new Error(`Sponsor logo file not found: ${diskPath}`);
    }

    const created = await payload.create({
      collection: "media",
      data: {
        sourcePath: src,
        alt,
      },
      filePath: diskPath,
      overrideAccess: true,
    });
    mediaId = created.id;
  }

  for (const locale of LOCALES) {
    await payload.update({
      collection: "media",
      id: mediaId,
      locale,
      data: { alt },
      overrideAccess: true,
    });
  }

  return mediaId;
}

async function buildSponsorBlock(payload: any, locale: Locale) {
  const home = await readMessagesJSON(locale, "home.json");
  const sponsorLogos = home?.sponsorLogos;
  const logos = [];

  for (const logo of sponsorLogos?.logos ?? []) {
    const lightLogo = logo?.lightLogo
      ? await ensureMedia(payload, logo.lightLogo, logo?.name ?? path.basename(logo.lightLogo))
      : null;
    if (!lightLogo) continue;

    const darkLogo = logo?.darkLogo
      ? await ensureMedia(payload, logo.darkLogo, logo?.name ?? path.basename(logo.darkLogo))
      : null;

    logos.push({
      name: logo?.name,
      lightLogo,
      darkLogo: darkLogo ?? undefined,
      url: logo?.url,
      openInNewTab: logo?.openInNewTab ?? true,
    });
  }

  if (logos.length === 0) return null;

  return {
    blockType: "sponsorLogos",
    heading: sponsorLogos?.heading,
    description: sponsorLogos?.description,
    speed: sponsorLogos?.speed ?? "normal",
    pauseOnHover: sponsorLogos?.pauseOnHover ?? true,
    logos,
  };
}

function upsertSponsorBlock(blocks: any[], sponsorBlock: any) {
  const existingBlocks = Array.isArray(blocks) ? blocks : [];
  const existingSponsor = existingBlocks.find(
    (block) => block?.blockType === "sponsorLogos",
  );
  const nextBlocks = existingBlocks.filter(
    (block) => block?.blockType !== "sponsorLogos",
  );

  const nextSponsorBlock = {
    ...(existingSponsor ?? {}),
    ...sponsorBlock,
  };

  const contactIndex = nextBlocks.findIndex((block) => block?.blockType === "contact");
  const insertIndex = contactIndex >= 0 ? contactIndex : nextBlocks.length;
  nextBlocks.splice(insertIndex, 0, nextSponsorBlock);
  return nextBlocks;
}

async function applyHomeSponsorLogos(payload: any) {
  for (const locale of LOCALES) {
    const sponsorBlock = await buildSponsorBlock(payload, locale);
    if (!sponsorBlock) continue;

    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      locale,
      depth: 0,
      draft: true,
      limit: 1,
      overrideAccess: true,
    });

    const homePage = existing.docs?.[0];
    if (!homePage?.id) {
      throw new Error(`Missing home page for locale: ${locale}`);
    }

    await payload.update({
      collection: "pages",
      id: homePage.id,
      locale,
      draft: false,
      overrideAccess: true,
      data: {
        blocks: upsertSponsorBlock(homePage.blocks, sponsorBlock),
        _status: "published",
      },
    });

    console.log(`[local-cms-patches] locale=${locale} home sponsorLogos applied`);
  }
}

async function main() {
  if ((config as any)?.db) {
    (config as any).db.push = false;
  }

  const payload = await getPayload({ config });

  try {
    await applyHomeSponsorLogos(payload);
  } finally {
    await Promise.race([
      (payload.db as any)?.destroy?.(),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
