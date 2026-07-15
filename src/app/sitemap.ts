import { tryGetPayloadClient } from "@/lib/payload";
import { locales } from "@/i18n/routing";
import { buildSitemapAlternates, getPublicServerUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";
import { buildNewsDetailPath, getNewsPathSuffix } from "@/lib/news";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serverUrl = getPublicServerUrl({ requireInProduction: true })!;

  const payload = await tryGetPayloadClient();
  const routes: MetadataRoute.Sitemap = [];

  // 1. Add static base routes for all locales
  for (const locale of locales) {
    routes.push({
      url: `${serverUrl}/${locale}`,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: buildSitemapAlternates({ pathSuffix: "", serverUrl }),
    });

    routes.push({
      url: `${serverUrl}/${locale}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: buildSitemapAlternates({ pathSuffix: "/about", serverUrl }),
    });

    routes.push({
      url: `${serverUrl}/${locale}/products`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: buildSitemapAlternates({ pathSuffix: "/products", serverUrl }),
    });

    routes.push({
      url: `${serverUrl}/${locale}/case-studies`,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: buildSitemapAlternates({ pathSuffix: "/case-studies", serverUrl }),
    });

    routes.push({
      url: `${serverUrl}/${locale}/custom-solutions`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: buildSitemapAlternates({ pathSuffix: "/custom-solutions", serverUrl }),
    });

    routes.push({
      url: `${serverUrl}/${locale}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: buildSitemapAlternates({ pathSuffix: "/contact", serverUrl }),
    });
  }

  if (!payload) return routes;

  try {
    // 2. Fetch dynamic Pages
    const pages = await payload.find({
      collection: "pages",
      where: { _status: { equals: "published" } },
      limit: 1000,
    });

    // Skip pages already manually tracked with optimized priorities
    const skippedSlugs = ["home", "about", "contact", "custom-solutions"];

    pages.docs.forEach((page) => {
      if (page.slug && !skippedSlugs.includes(page.slug)) {
        for (const locale of locales) {
          routes.push({
            url: `${serverUrl}/${locale}/${page.slug}`,
            lastModified: new Date(page.updatedAt),
            changeFrequency: "monthly",
            priority: 0.7,
            alternates: buildSitemapAlternates({ pathSuffix: `/${page.slug}`, serverUrl }),
          });
        }
      }
    });

    // 3. Fetch Products
    const products = await payload.find({
      collection: "products",
      where: { _status: { equals: "published" } },
      limit: 1000,
    });

    products.docs.forEach((product) => {
      if (product.slug) {
        for (const locale of locales) {
          routes.push({
            url: `${serverUrl}/${locale}/products/${product.slug}`,
            lastModified: new Date(product.updatedAt),
            changeFrequency: "weekly",
            priority: 0.9,
            alternates: buildSitemapAlternates({
              pathSuffix: `/products/${product.slug}`,
              serverUrl,
            }),
          });
        }
      }
    });

    // 4. Fetch Case Studies
    const cases = await payload.find({
      collection: "caseStudies",
      where: { _status: { equals: "published" } },
      limit: 1000,
    });

    cases.docs.forEach((cs) => {
      if (cs.slug) {
        for (const locale of locales) {
          routes.push({
            url: `${serverUrl}/${locale}/case-studies/${cs.slug}`,
            lastModified: new Date(cs.updatedAt),
            changeFrequency: "monthly",
            priority: 0.7,
            alternates: buildSitemapAlternates({
              pathSuffix: `/case-studies/${cs.slug}`,
              serverUrl,
            }),
          });
        }
      }
    });

    // 5. Fetch News
    const news = await payload.find({
      collection: "news",
      where: { _status: { equals: "published" } },
      limit: 1000,
    });

    news.docs.forEach((item) => {
      if (item.slug) {
        for (const locale of locales) {
          routes.push({
            url: new URL(
              buildNewsDetailPath(locale, item.slug),
              serverUrl,
            ).toString(),
            lastModified: new Date(item.updatedAt),
            changeFrequency: "monthly",
            priority: 0.7,
            alternates: buildSitemapAlternates({
              pathSuffix: getNewsPathSuffix(item.slug),
              serverUrl,
            }),
          });
        }
      }
    });
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return routes;
}
