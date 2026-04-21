import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import config from "../../../payload.config";

function genId(key: string): string {
  return crypto.createHash("md5").update(key).digest("hex").substring(0, 24);
}

type Locale = "zh" | "en" | "ja";
const LOCALES: Locale[] = ["zh", "en", "ja"];

async function readMessagesJSON(locale: Locale, filename: string) {
  const filePath = path.resolve(process.cwd(), "messages", locale, filename);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function i18n(obj: Record<Locale, any>, getter: (localeData: any) => any) {
  return {
    zh: getter(obj.zh) ?? null,
    en: getter(obj.en) ?? null,
    ja: getter(obj.ja) ?? null,
  };
}

async function getMediaIdBySourcePath(payload: any, src: string): Promise<number | null> {
  if (!src) return null;
  const res = await payload.find({
    collection: "media",
    where: { sourcePath: { equals: src } },
    limit: 1,
    overrideAccess: true,
  });
  return (res.docs?.[0]?.id as number | undefined) ?? null;
}

async function main() {
  const payload = await getPayload({ config });

  try {
    const home: Record<Locale, any> = {
      zh: await readMessagesJSON("zh", "home.json"),
      en: await readMessagesJSON("en", "home.json"),
      ja: await readMessagesJSON("ja", "home.json"),
    };
    const pages: Record<Locale, any> = {
      zh: await readMessagesJSON("zh", "pages.json"),
      en: await readMessagesJSON("en", "pages.json"),
      ja: await readMessagesJSON("ja", "pages.json"),
    };
    const contactMessages: Record<Locale, any> = {
      zh: await readMessagesJSON("zh", "contact.json"),
      en: await readMessagesJSON("en", "contact.json"),
      ja: await readMessagesJSON("ja", "contact.json"),
    };

    // Build hero slides (they share same media per index ideally)
    const hdSlides = home.zh?.hero?.slides ?? [];
    const heroSlides = [];
    for (let i = 0; i < hdSlides.length; i++) {
      const mediaId = await getMediaIdBySourcePath(payload, hdSlides[i]?.media?.src);
      if (!mediaId) continue;
      heroSlides.push({
        id: genId(`home-hero-slide-${i}`),
        slideId: i + 1,
        media: mediaId,
        alt: i18n(home, h => h?.hero?.slides?.[i]?.media?.alt),
        action: {
          href: hdSlides[i]?.action?.href,
          label: i18n(home, h => h?.hero?.slides?.[i]?.action?.label),
        }
      });
    }

    // Build Highlights
    const featHl = home.zh?.features?.highlights ?? [];
    const highlights = featHl.map((_: any, i: number) => ({
      id: genId(`home-feat-hl-${i}`),
      title: i18n(home, h => h?.features?.highlights?.[i]?.title),
      description: i18n(home, h => h?.features?.highlights?.[i]?.description),
    }));

    // About Highlights
    const aboutHl = home.zh?.about?.sectionOne?.highlights ?? [];
    const aboutHighlights = aboutHl.map((_: any, i: number) => ({
      id: genId(`home-about-hl-${i}`),
      text: i18n(home, h => h?.about?.sectionOne?.highlights?.[i]),
    }));

    // About Items
    const aboutItemsRaw = home.zh?.about?.sectionTwo?.items ?? [];
    const aboutItems = aboutItemsRaw.map((_: any, i: number) => ({
      id: genId(`home-about-item-${i}`),
      title: i18n(home, h => h?.about?.sectionTwo?.items?.[i]?.title),
      paragraph: i18n(home, h => h?.about?.sectionTwo?.items?.[i]?.paragraph),
    }));

    const aboutImageId = await getMediaIdBySourcePath(payload, home.zh?.about?.sectionOne?.image?.src);

    const blocks = [
      {
        id: genId("home-block-hero"),
        blockType: "hero",
        autoPlayInterval: home.zh?.hero?.autoPlayInterval ?? 6000,
        slides: heroSlides,
      },
      {
        id: genId("home-block-features"),
        blockType: "features",
        title: i18n(home, h => h?.features?.title),
        paragraph: i18n(home, h => h?.features?.paragraph),
        featuredProducts: {
          title: i18n(home, h => h?.features?.featuredProducts?.title),
          description: i18n(home, h => h?.features?.featuredProducts?.description),
          ctaDescription: i18n(home, h => h?.features?.featuredProducts?.ctaDescription),
          viewAllLabel: i18n(home, h => h?.features?.featuredProducts?.viewAllLabel),
          slugs: (home.zh?.features?.featuredProducts?.slugs ?? []).map((slug: string) => ({ slug })),
        },
        highlights,
      },
      {
        id: genId("home-block-about"),
        blockType: "about",
        title: i18n(home, h => h?.about?.sectionOne?.title),
        description: i18n(home, h => h?.about?.sectionOne?.description),
        highlights: aboutHighlights,
        image: aboutImageId ?? undefined,
        imageAlt: i18n(home, h => h?.about?.sectionOne?.image?.alt),
        items: aboutItems,
      },
      {
        id: genId("home-block-contact"),
        blockType: "contact",
        title: i18n(contactMessages, c => c?.contact?.formTitle),
        description: i18n(contactMessages, c => c?.contact?.formDescription),
      },
    ];

    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
    });

    const data = {
      slug: "home",
      title: i18n(pages, p => p?.pages?.home?.title ?? "Home"),
      seo: {
        title: i18n(pages, p => p?.pages?.home?.title),
        description: i18n(pages, p => p?.pages?.home?.description),
      },
      blocks,
    };

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "pages",
        data,
        locale: "all",
        overrideAccess: true,
        draft: false,
      });
    } else {
      await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        data,
        locale: "all",
        overrideAccess: true,
        draft: false,
      });
    }

    console.log("Home page fixed successfully using locale: all.");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

main();
