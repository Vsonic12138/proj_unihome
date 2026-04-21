import "dotenv/config";

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

function genId(key: string): string {
  return crypto.createHash("md5").update(key).digest("hex").substring(0, 24);
}

import config from "../../../payload.config";
import { lexicalFromPlainText } from "../lib/lexical";

type Locale = "zh" | "en" | "ja";
const LOCALES: Locale[] = ["zh", "en", "ja"];

const FALLBACK_DESCRIPTION: Record<Locale, string> = {
  zh: "内容建设中",
  en: "Coming soon",
  ja: "準備中",
};

function ensureDescription(value: unknown, locale: Locale): string {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : FALLBACK_DESCRIPTION[locale];
}

function buildFeaturesBlocksFromCategories(categories: any[]): any[] {
  const blocks: any[] = [];
  for (const cat of categories ?? []) {
    const highlights = (cat?.projects ?? []).map((proj: any) => ({
      title: proj?.name ?? "",
      description: proj?.description ?? "",
      link: proj?.link ?? undefined,
      tags: Array.isArray(proj?.tags) ? proj.tags.join(",") : undefined,
    }));

    // FeaturesBlock.highlights 是 required+minRows=1
    if (highlights.length === 0) {
      highlights.push({
        title: String(cat?.title ?? "Untitled") || "Untitled",
        description: String(cat?.description ?? ""),
      });
    }

    blocks.push({
      blockType: "features",
      blockName: cat?.title ?? undefined,
      title: cat?.title ?? undefined,
      paragraph: cat?.description ?? undefined,
      highlights,
    });
  }
  return blocks;
}

async function readMessagesJSON<T = any>(locale: Locale, filename: string): Promise<T> {
  const filePath = path.resolve(process.cwd(), "messages", locale, filename);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function getMediaIdBySourcePath(payload: any, src: string): Promise<number | null> {
  const res = await payload.find({
    collection: "media",
    where: { sourcePath: { equals: src } },
    limit: 1,
    overrideAccess: true,
  });
  return (res.docs?.[0]?.id as number | undefined) ?? null;
}

async function upsertPageBySlug(payload: any, slug: string, data: any, locale: Locale) {
  const existing = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length === 0) {
    return payload.create({
      collection: "pages",
      data: { ...data, slug },
      locale,
      overrideAccess: true,
      draft: false, // 直接发布，_status = published
    });
  }

  return payload.update({
    collection: "pages",
    id: existing.docs[0].id,
    data,
    locale,
    overrideAccess: true,
    draft: false, // 直接发布，_status = published
  });
}

async function upsertProductSeries(payload: any, key: string, data: any, locale: Locale) {
  const existing = await payload.find({
    collection: "productSeries",
    where: { key: { equals: key } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length === 0) {
    return payload.create({
      collection: "productSeries",
      data: { ...data, key },
      locale,
      overrideAccess: true,
    });
  }

  return payload.update({
    collection: "productSeries",
    id: existing.docs[0].id,
    data,
    locale,
    overrideAccess: true,
  });
}

async function upsertProductBySlug(payload: any, slug: string, data: any, locale: Locale) {
  const existing = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length === 0) {
    return payload.create({
      collection: "products",
      data: { ...data, slug },
      locale,
      overrideAccess: true,
      draft: false, // 直接发布，_status = published
    });
  }

  return payload.update({
    collection: "products",
    id: existing.docs[0].id,
    data,
    locale,
    overrideAccess: true,
    draft: false, // 直接发布，_status = published
  });
}

function extractAddressFromFooterDescription(description: string, locale: Locale): string {
  const text = String(description ?? "");
  const lines = text.split("\n");

  const patterns: Record<Locale, RegExp> = {
    zh: /地址[:：]\s*(.+)\s*$/,
    en: /Address[:：]\s*(.+)\s*$/i,
    ja: /住所[:：]\s*(.+)\s*$/,
  };

  const re = patterns[locale];
  for (const line of lines) {
    const match = String(line).match(re);
    if (match?.[1]) return match[1].trim();
  }

  return "";
}

async function main() {
  const payload = await getPayload({ config });

  try {
    const common: Record<Locale, any> = {
      zh: await readMessagesJSON("zh", "common.json"),
      en: await readMessagesJSON("en", "common.json"),
      ja: await readMessagesJSON("ja", "common.json"),
    };
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
    const productsMessages: Record<Locale, any> = {
      zh: await readMessagesJSON("zh", "products.json"),
      en: await readMessagesJSON("en", "products.json"),
      ja: await readMessagesJSON("ja", "products.json"),
    };
    const contactMessages: Record<Locale, any> = {
      zh: await readMessagesJSON("zh", "contact.json"),
      en: await readMessagesJSON("en", "contact.json"),
      ja: await readMessagesJSON("ja", "contact.json"),
    };

    const buildContactBlock = (locale: Locale, title?: string, description?: string) => {
      const contact = contactMessages[locale]?.contact ?? {};
      const form = contact?.form ?? {};

      return {
        blockType: "contact",
        title: title ?? contact?.formTitle,
        description: description ?? contact?.formDescription,
        form: {
          nameLabel: form?.nameLabel,
          namePlaceholder: form?.namePlaceholder,
          emailLabel: form?.emailLabel,
          emailPlaceholder: form?.emailPlaceholder,
          phoneLabel: form?.phoneLabel,
          phonePlaceholder: form?.phonePlaceholder,
          intentionLabel: form?.intentionLabel,
          intentionPlaceholder: form?.intentionPlaceholder,
          intentionOptions: (form?.intentionOptions ?? []).map((opt: string) => ({ option: opt })),
          messageLabel: form?.messageLabel,
          messagePlaceholder: form?.messagePlaceholder,
          submitLabel: form?.submit,
          submitSuccessMessage: contact?.submitSuccessMessage,
          submitErrorMessage: contact?.submitErrorMessage,
        },
      };
    };

    // 1) Navigation global
    for (const locale of LOCALES) {
      const menu = common[locale].header?.menu;
      const submenu = menu?.submenu ?? {};

      const navigationData = {
        items: [
          { label: menu?.home, href: "/" },
          { label: menu?.products, href: "/products" },
          {
            label: menu?.developer,
            href: "/developers",
            children: [
              { label: submenu?.knowledgeBase, href: "/developers/knowledge-base" },
              { label: submenu?.openSource, href: "/developers/open-source" },
            ],
          },
          { label: menu?.customSolutions, href: "/custom-solutions" },
          {
            label: menu?.caseStudies,
            href: "/case-studies",
            children: [
              { label: submenu?.casePracticalTeaching, href: "/case-studies/practical-teaching" },
              { label: submenu?.caseSciTechInnovation, href: "/case-studies/sci-tech-innovation" },
              { label: submenu?.caseInnovationCompetition, href: "/case-studies/innovation-competition" },
              { label: submenu?.caseTrainingBase, href: "/case-studies/training-base" },
            ],
          },
          { label: menu?.about, href: "/about" },
        ],
      };

      await payload.updateGlobal({
        slug: "navigation",
        data: navigationData,
        locale,
        overrideAccess: true,
      });
    }

    // 2) Footer global + Site settings
    for (const locale of LOCALES) {
      const footer = common[locale].footer;

      const sections = Object.entries(footer?.columns ?? {}).map(([key, col]: [string, any]) => ({
        title: col?.title,
        links: (col?.items ?? []).map((item: any, i: number) => ({
          label: item?.label,
          href: item?.path,
        })),
      }));

      const qqQR = await getMediaIdBySourcePath(payload, "/images/contact/qq-group-qrcode.jpg");
      const wechatQR = await getMediaIdBySourcePath(payload, "/images/contact/weChat-official-account.jpg");

      const contactItems = [
        footer?.contact?.taobaoHref
          ? {
              key: "taobao",
              type: "link",
              label: footer?.contact?.taobaoLabel ?? "Taobao",
              href: footer?.contact?.taobaoHref,
            }
          : null,
        footer?.contact?.bilibiliHref
          ? {
              key: "bilibili",
              type: "link",
              label: footer?.contact?.bilibiliLabel ?? "Bilibili",
              href: footer?.contact?.bilibiliHref,
            }
          : null,
        qqQR
          ? {
              key: "qq",
              type: "qr",
              label: footer?.contact?.qq?.title ?? "QQ",
              description: footer?.contact?.qq?.description ?? "",
              image: qqQR,
            }
          : null,
        wechatQR
          ? {
              key: "wechat",
              type: "qr",
              label: footer?.contact?.wechat?.title ?? "WeChat",
              description: footer?.contact?.wechat?.description ?? "",
              image: wechatQR,
            }
          : null,
      ].filter(Boolean);

      await payload.updateGlobal({
        slug: "footer",
        locale,
        overrideAccess: true,
        data: {
          description: lexicalFromPlainText(String(footer?.description ?? "")),
          sections,
          contactInfo: {
            phone: contact?.phoneNumber,
            address: extractAddressFromFooterDescription(String(footer?.description ?? ""), locale),
          },
          contactItems,
        },
      });

      const homeMeta = pages[locale]?.pages?.home;
      const contact = footer?.contact ?? {};

      await payload.updateGlobal({
        slug: "siteSettings",
        locale,
        overrideAccess: true,
        data: {
          companyName: String(homeMeta?.title ?? "UNI Robotics"),
          seoDefaults: {
            title: homeMeta?.title,
            description: homeMeta?.description,
          },
          ctaDefaults: {
            viewDetailsCta: productsMessages[locale]?.products?.catalog?.viewDetailsCta,
          },
          productDetailLabels: {
            applicable: productsMessages[locale]?.products?.detailLabels?.applicable,
            features: productsMessages[locale]?.products?.detailLabels?.features,
            sampleCases: productsMessages[locale]?.products?.detailLabels?.sampleCases,
            modules: productsMessages[locale]?.products?.detailLabels?.modules,
            chassis: productsMessages[locale]?.products?.detailLabels?.chassis,
            arms: productsMessages[locale]?.products?.detailLabels?.arms,
            composites: productsMessages[locale]?.products?.detailLabels?.compositeRobots,
            configuration: productsMessages[locale]?.products?.detailLabels?.configuration,
            sensorConfig: productsMessages[locale]?.products?.detailLabels?.sensorConfig,
            controllerConfig: productsMessages[locale]?.products?.detailLabels?.controllerConfig,
            softwareConfig: productsMessages[locale]?.products?.detailLabels?.softwareConfig,
            experiments: productsMessages[locale]?.products?.detailLabels?.experiments,
            specs: productsMessages[locale]?.products?.detailLabels?.specs,
          },
          legalText: lexicalFromPlainText(""),
          cookieConsent: {
            ariaLabel: common[locale]?.cookieConsent?.ariaLabel,
            message: common[locale]?.cookieConsent?.message,
            privacyPolicyLink: common[locale]?.cookieConsent?.privacyPolicyLink,
            learnMore: common[locale]?.cookieConsent?.learnMore,
            acceptAll: common[locale]?.cookieConsent?.acceptAll,
            rejectNonEssential: common[locale]?.cookieConsent?.rejectNonEssential,
          },
          floatingContact: {
            panelLabel: common[locale]?.floatingContact?.panelLabel,
            fabLabel: common[locale]?.floatingContact?.fabLabel,
            closeLabel: common[locale]?.floatingContact?.closeLabel,
            qqGroup: {
              label: common[locale]?.floatingContact?.qqGroup?.label,
              number: common[locale]?.floatingContact?.qqGroup?.number,
              tooltip: common[locale]?.floatingContact?.qqGroup?.tooltip,
              copy: common[locale]?.floatingContact?.qqGroup?.copy,
              copied: common[locale]?.floatingContact?.qqGroup?.copied,
              qrImage: qqQR ?? undefined,
            },
            wechat: {
              label: common[locale]?.floatingContact?.wechat?.label,
              tooltip: common[locale]?.floatingContact?.wechat?.tooltip,
              comingSoon: common[locale]?.floatingContact?.wechat?.comingSoon,
              qrImage: wechatQR ?? undefined,
            },
            phone: {
              label: common[locale]?.floatingContact?.phone?.label,
              name: common[locale]?.floatingContact?.phone?.name,
              number: common[locale]?.floatingContact?.phone?.number,
              tooltip: common[locale]?.floatingContact?.phone?.tooltip,
              copy: common[locale]?.floatingContact?.phone?.copy,
              copied: common[locale]?.floatingContact?.phone?.copied,
            },
            bilibili: {
              label: common[locale]?.floatingContact?.bilibili?.label,
              tooltip: common[locale]?.floatingContact?.bilibili?.tooltip,
              linkText: common[locale]?.floatingContact?.bilibili?.linkText,
              href: common[locale]?.floatingContact?.bilibili?.href,
            },
            taobao: {
              label: common[locale]?.floatingContact?.taobao?.label,
              tooltip: common[locale]?.floatingContact?.taobao?.tooltip,
              linkText: common[locale]?.floatingContact?.taobao?.linkText,
              href: common[locale]?.floatingContact?.taobao?.href,
            },
          },
        },
      });
    }

    // 3) Home page (Pages collection)
    for (const locale of LOCALES) {
      const hero = home[locale]?.hero;
      const features = home[locale]?.features;
      const about = home[locale]?.about;
      const contact = contactMessages[locale]?.contact;
      const meta = pages[locale]?.pages?.home;

      const heroSlides = [];
      const hdSlides = hero?.slides ?? [];
      for (let i = 0; i < hdSlides.length; i++) {
        const slide = hdSlides[i];
        const mediaSrc = slide?.media?.src;
        const mediaId = mediaSrc ? await getMediaIdBySourcePath(payload, mediaSrc) : null;
        if (!mediaId) continue;
        heroSlides.push({
          slideId: i + 1,
          media: mediaId,
          alt: slide?.media?.alt,
          action: slide?.action
            ? {
                href: slide.action.href,
                label: slide.action.label,
              }
            : undefined,
        });
      }

      const aboutImageSrc = about?.sectionOne?.image?.src;
      const aboutImageId = aboutImageSrc ? await getMediaIdBySourcePath(payload, aboutImageSrc) : null;

      const blocks = [
        {
          blockType: "hero",
          autoPlayInterval: hero?.autoPlayInterval ?? 6000,
          slides: heroSlides,
        },
        {
          blockType: "features",
          title: features?.title,
          paragraph: features?.paragraph,
          featuredProducts: {
            title: features?.featuredProducts?.title,
            description: features?.featuredProducts?.description,
            ctaDescription: features?.featuredProducts?.ctaDescription,
            viewAllLabel: features?.featuredProducts?.viewAllLabel,
            slugs: (features?.featuredProducts?.slugs ?? []).map((slug: string) => ({ slug })),
          },
          highlights: (features?.highlights ?? []).map((h: any, i: number) => ({
            title: h?.title,
            description: h?.description,
          })),
        },
        {
          blockType: "about",
          title: about?.sectionOne?.title,
          description: about?.sectionOne?.description,
          highlights: (about?.sectionOne?.highlights ?? []).map((t: string, i: number) => ({ text: t })),
          image: aboutImageId ?? undefined,
          imageAlt: about?.sectionOne?.image?.alt,
          items: (about?.sectionTwo?.items ?? []).map((it: any, i: number) => ({
            title: it?.title,
            paragraph: it?.paragraph,
          })),
        },
        {
          blockType: "contact",
          title: contact?.formTitle,
          description: contact?.formDescription,
          form: {
            nameLabel: contact?.form?.nameLabel,
            namePlaceholder: contact?.form?.namePlaceholder,
            emailLabel: contact?.form?.emailLabel,
            emailPlaceholder: contact?.form?.emailPlaceholder,
            phoneLabel: contact?.form?.phoneLabel,
            phonePlaceholder: contact?.form?.phonePlaceholder,
            intentionLabel: contact?.form?.intentionLabel,
            intentionPlaceholder: contact?.form?.intentionPlaceholder,
            intentionOptions: (contact?.form?.intentionOptions ?? []).map((opt: string) => ({ option: opt })),
            messageLabel: contact?.form?.messageLabel,
            messagePlaceholder: contact?.form?.messagePlaceholder,
            submitLabel: contact?.form?.submit,
          },
        },
      ];

      await upsertPageBySlug(
        payload,
        "home",
        {
          title: meta?.title ?? "Home",
          seo: {
            title: meta?.title,
            description: ensureDescription(meta?.description, locale),
          },
          blocks,
        },
        locale,
      );
    }

    // 3.5) Seed other CMS pages used by routes (missing docs will 404)
    const pagesToSeed: Array<{
      slug: string;
      key: string;
      kind?: "about" | "contact" | "customSolutions" | "knowledgeBase" | "openSource";
    }> = [
      { slug: "about", key: "about", kind: "about" },
      { slug: "contact", key: "contact", kind: "contact" },
      { slug: "products", key: "products" },
      { slug: "developers", key: "developerServices" },
      { slug: "developers-knowledge-base", key: "knowledgeBase", kind: "knowledgeBase" },
      { slug: "developers-open-source", key: "openSource", kind: "openSource" },
      { slug: "custom-solutions", key: "customSolutions", kind: "customSolutions" },
      { slug: "case-studies", key: "caseStudies" },
      { slug: "case-studies-practical-teaching", key: "casePracticalTeaching" },
      { slug: "case-studies-sci-tech-innovation", key: "caseSciTechInnovation" },
      { slug: "case-studies-innovation-competition", key: "caseInnovationCompetition" },
      { slug: "case-studies-training-base", key: "caseTrainingBase" },
    ];

    for (const locale of LOCALES) {
      const pagesData = pages[locale]?.pages ?? {};
      const aboutFromHome = home[locale]?.about ?? {};

      for (const item of pagesToSeed) {
        const meta = pagesData?.[item.key] ?? {};
        const title = String(meta?.title ?? item.slug);
        const description = ensureDescription(meta?.description, locale);

        let blocks: any[] = [];

        if (item.kind === "about") {
          const aboutImageSrc = aboutFromHome?.sectionOne?.image?.src;
          const aboutImageId = aboutImageSrc ? await getMediaIdBySourcePath(payload, aboutImageSrc) : null;

          const highlights = (aboutFromHome?.sectionOne?.highlights ?? []).map((text: string) => ({ text }));
          const items = (aboutFromHome?.sectionTwo?.items ?? []).map((it: any) => ({
            title: it?.title,
            paragraph: it?.paragraph,
          }));

          blocks = [
            {
              blockType: "about",
              title: aboutFromHome?.sectionOne?.title,
              description: aboutFromHome?.sectionOne?.description,
              highlights: highlights.length > 0 ? highlights : [{ text: title }],
              image: aboutImageId ?? undefined,
              imageAlt: aboutFromHome?.sectionOne?.image?.alt,
              items: items.length > 0 ? items : [{ title, paragraph: description }],
            },
          ];
        } else if (item.kind === "contact") {
          blocks = [buildContactBlock(locale)];
        } else if (item.kind === "customSolutions") {
          const modes = (meta?.cooperationModes ?? []) as any[];
          const highlights = modes.map((mode: any) => ({
            title: mode?.title ?? "",
            description: mode?.description ?? "",
          }));

          blocks = [
            {
              blockType: "features",
              title,
              paragraph: description,
              highlights: highlights.length > 0 ? highlights : [{ title, description }],
            },
          ];
        } else if (item.kind === "knowledgeBase" || item.kind === "openSource") {
          blocks = buildFeaturesBlocksFromCategories(meta?.categories ?? []);
        }

        // pages collection 的 blocks 字段 required:true，确保至少 1 个 block
        if (blocks.length === 0) {
          blocks = [buildContactBlock(locale, title, description)];
        }

        await upsertPageBySlug(
          payload,
          item.slug,
          {
            title,
            seo: {
              title,
              description,
            },
            blocks,
          },
          locale,
        );
      }
    }

    // 4) Product series + products + global FAQ
    // Build a stable ordering from zh catalog
    const zhCatalogSeries = productsMessages.zh?.products?.catalog?.series ?? [];
    const seriesOrder: string[] = zhCatalogSeries.map((s: any) => s?.key).filter(Boolean);

    // Upsert series first
    for (const locale of LOCALES) {
      const seriesList = productsMessages[locale]?.products?.catalog?.series ?? [];
      for (let idx = 0; idx < seriesList.length; idx++) {
        const s = seriesList[idx];
        await upsertProductSeries(
          payload,
          s.key,
          {
            title: s.title,
            description: s.description,
            sortOrder: seriesOrder.indexOf(s.key) === -1 ? idx : seriesOrder.indexOf(s.key),
          },
          locale,
        );
      }
    }

    // Map series key -> id
    const seriesDocs = await payload.find({
      collection: "productSeries",
      limit: 200,
      overrideAccess: true,
    });
    const seriesIdByKey = new Map<string, number>();
    for (const doc of seriesDocs.docs) {
      seriesIdByKey.set(doc.key, doc.id as number);
    }

    // Upsert products
    const allSlugs = new Set<string>();
    for (const locale of LOCALES) {
      const seriesList = productsMessages[locale]?.products?.catalog?.series ?? [];
      for (const s of seriesList) {
        for (const item of s.items ?? []) {
          if (item?.slug) allSlugs.add(item.slug);
        }
      }
    }

    for (const slug of [...allSlugs]) {
      for (const locale of LOCALES) {
        const catalogSeries = productsMessages[locale]?.products?.catalog?.series ?? [];
        const inCatalog = catalogSeries
          .flatMap((s: any) => (s.items ?? []).map((it: any) => ({ ...it, __seriesKey: s.key })))
          .find((it: any) => it.slug === slug);

        const details = productsMessages[locale]?.products?.details?.[slug];

        const heroImageSrc = details?.image ?? inCatalog?.image;
        const heroImageId = heroImageSrc ? await getMediaIdBySourcePath(payload, heroImageSrc) : null;

        const seriesId = inCatalog?.__seriesKey
          ? seriesIdByKey.get(inCatalog.__seriesKey)
          : undefined;

        const features = (details?.features ?? []).map((f: any, i: number) => ({
          title: f?.title,
          content: f?.content ? lexicalFromPlainText(String(f.content)) : undefined,
        }));

        const sampleCases = details?.sampleCases ?? {};
        const sampleCasesModules = [];
        for (let i = 0; i < (sampleCases?.modules ?? []).length; i++) {
          const m = sampleCases?.modules[i];
          const img = m?.image ? await getMediaIdBySourcePath(payload, m.image) : null;
          sampleCasesModules.push({ name: m?.name, image: img ?? undefined });
        }
        const sampleCasesChassis = [];
        for (let i = 0; i < (sampleCases?.chassis ?? []).length; i++) {
          const m = sampleCases?.chassis[i];
          const img = m?.image ? await getMediaIdBySourcePath(payload, m.image) : null;
          sampleCasesChassis.push({ name: m?.name, image: img ?? undefined });
        }
        const sampleCasesArms = [];
        for (let i = 0; i < (sampleCases?.arms ?? []).length; i++) {
          const m = sampleCases?.arms[i];
          const img = m?.image ? await getMediaIdBySourcePath(payload, m.image) : null;
          sampleCasesArms.push({ name: m?.name, image: img ?? undefined });
        }
        const sampleCasesComposite = [];
        for (let i = 0; i < (sampleCases?.compositeRobots ?? []).length; i++) {
          const m = sampleCases?.compositeRobots[i];
          const img = m?.image ? await getMediaIdBySourcePath(payload, m.image) : null;
          sampleCasesComposite.push({ name: m?.name, image: img ?? undefined });
        }

        await upsertProductBySlug(
          payload,
          slug,
          {
            name: inCatalog?.name ?? details?.name ?? slug,
            model: inCatalog?.model ?? details?.model,
            series: seriesId,
            heroImage: heroImageId ?? undefined,
            brief: inCatalog?.brief,
            details: {
              subtitle: details?.subtitle,
              overview: details?.overview ? lexicalFromPlainText(String(details.overview)) : undefined,
              applicable: details?.applicable,
              features,
              sampleCases: {
                title: productsMessages[locale]?.products?.detailLabels?.sampleCases,
                description: sampleCases?.description
                  ? lexicalFromPlainText(String(sampleCases.description))
                  : undefined,
                modules: sampleCasesModules,
                chassis: sampleCasesChassis,
                arms: sampleCasesArms,
                composites: sampleCasesComposite,
              },
              sensorConfig: details?.sensorConfig,
              controllerConfig: details?.controllerConfig,
              softwareConfig: details?.softwareConfig,
              experiments: details?.experiments,
              highlights: (details?.highlights ?? []).map((h: string) => ({ text: h })),
              specs: (details?.specs ?? []).map((s: string) => {
                const parts = String(s).split(/[:：]/);
                return { key: parts[0], value: parts.slice(1).join("：") || s };
              }),
            },
          },
          locale,
        );
      }
    }

    // Global FAQ
    const zhFaqs = productsMessages.zh?.products?.faq?.items ?? [];
    const enFaqs = productsMessages.en?.products?.faq?.items ?? [];
    const jaFaqs = productsMessages.ja?.products?.faq?.items ?? [];

    for (let idx = 0; idx < zhFaqs.length; idx++) {
      const zhItem = zhFaqs[idx];
      if (!zhItem?.q) continue;

      const existing = await payload.find({
        collection: "faq",
        where: { question: { equals: zhItem.q } },
        limit: 1,
        locale: "zh",
        overrideAccess: true,
      });

      let faqId: number | string;

      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: "faq",
          data: {
            question: zhItem.q,
            answer: lexicalFromPlainText(String(zhItem.a ?? "")),
            sortOrder: idx,
          },
          locale: "zh",
          overrideAccess: true,
        });
        faqId = created.id;
      } else {
        const updated = await payload.update({
          collection: "faq",
          id: existing.docs[0].id,
          data: {
            question: zhItem.q,
            answer: lexicalFromPlainText(String(zhItem.a ?? "")),
            sortOrder: idx,
          },
          locale: "zh",
          overrideAccess: true,
        });
        faqId = updated.id;
      }

      // Update English localization
      const enItem = enFaqs[idx];
      if (enItem?.q) {
        await payload.update({
          collection: "faq",
          id: faqId,
          data: {
            question: enItem.q,
            answer: lexicalFromPlainText(String(enItem.a ?? "")),
          },
          locale: "en",
          overrideAccess: true,
        });
      }

      // Update Japanese localization
      const jaItem = jaFaqs[idx];
      if (jaItem?.q) {
        await payload.update({
          collection: "faq",
          id: faqId,
          data: {
            question: jaItem.q,
            answer: lexicalFromPlainText(String(jaItem.a ?? "")),
          },
          locale: "ja",
          overrideAccess: true,
        });
      }
    }

    // eslint-disable-next-line no-console
    console.log("Seed completed.");
  } catch (error) {
    console.error("Seed failed with error:", error);
  } finally {
    await Promise.race([
      payload.db?.destroy?.(),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
    process.exit(0);
  }
}

await main();
