import "server-only";

import type { Payload } from "payload";
import net from "node:net";

export type PayloadLocale = "zh" | "en" | "ja";

export function toPayloadLocale(locale: string): PayloadLocale {
  return (["zh", "en", "ja"] as const).includes(locale as PayloadLocale)
    ? (locale as PayloadLocale)
    : "zh";
}

export type MediaLike =
  | number
  | string
  | null
  | undefined
  | {
      url?: string | null;
      sizes?: Record<string, { url?: string | null } | undefined> | null;
    };

export type ProductSummary = {
  id: number | string;
  slug: string;
  name: string;
  model?: string | null;
  image: string;
  brief?: string | null;
};

export type ProductsCatalog = {
  series: Array<{
    id: number | string;
    key: string;
    title: string;
    description?: string | null;
    items: ProductSummary[];
  }>;
};

export function resolveMediaURL(media: MediaLike): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (typeof media === "number") return null;

  // 优先原始尺寸图片，避免 hero/card 裁剪版截断宽幅图
  if (media.url) return media.url;
  if (media.sizes?.hero?.url) return media.sizes.hero.url;
  if (media.sizes?.card?.url) return media.sizes.card.url;
  if (media.sizes?.thumbnail?.url) return media.sizes.thumbnail.url;

  return null;
}

let cached = (global as any).payload;
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
    warnedDbUnavailable: false,
  };
}

function shouldSkipPayloadInit(): boolean {
  return process.env.BUILD_SKIP_PAYLOAD === "true";
}

type DbReachableResult = { ok: true } | { ok: false; reason: string };

async function checkDbReachable(
  connectionString: string,
  timeoutMs = 800,
): Promise<DbReachableResult> {
  let url: URL;
  try {
    url = new URL(connectionString);
  } catch {
    return { ok: false, reason: "Invalid DATABASE_URI/DATABASE_URL." };
  }

  if (url.protocol !== "postgresql:" && url.protocol !== "postgres:") {
    return { ok: false, reason: `Unsupported protocol: ${url.protocol}` };
  }

  // Only preflight for typical local Docker/WSL setups; remote DBs may block raw TCP checks.
  const host = url.hostname;
  const port = Number(url.port || "5432");
  const isLocalHost =
    host === "127.0.0.1" ||
    host === "localhost" ||
    host === "::1" ||
    host === "0.0.0.0";

  if (!isLocalHost) {
    return { ok: true };
  }

  return await new Promise<DbReachableResult>((resolve) => {
    const socket = net.createConnection({ host, port });
    const done = (result: DbReachableResult) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(result);
    };

    socket.setTimeout(timeoutMs);
    socket.once("connect", () => done({ ok: true }));
    socket.once("timeout", () =>
      done({
        ok: false,
        reason: `Timeout connecting to ${host}:${port} (is Postgres running?).`,
      }),
    );
    socket.once("error", (err: any) =>
      done({
        ok: false,
        reason: `Cannot connect to ${host}:${port}: ${String(err?.message ?? err)}`,
      }),
    );
  });
}

export async function tryGetPayloadClient(): Promise<Payload | null> {
  if (shouldSkipPayloadInit()) {
    return null;
  }

  const hasConfig =
    Boolean(process.env.PAYLOAD_SECRET) &&
    Boolean(process.env.DATABASE_URI ?? process.env.DATABASE_URL);

  if (!hasConfig) {
    return null;
  }

  const connectionString = process.env.DATABASE_URI ?? process.env.DATABASE_URL!;
  const reachable = await checkDbReachable(connectionString);
  if (reachable.ok === false) {
    // Avoid noisy repeated Payload init failures in dev when Docker Desktop/Postgres isn't running.
    if (!cached.warnedDbUnavailable) {
      cached.warnedDbUnavailable = true;
      // eslint-disable-next-line no-console
      console.warn(
        [
          "[payload] Postgres 不可达，已跳过 Payload 初始化（因此 CMS 数据将不可用）。",
          `原因：${reachable.reason}`,
          "",
          "如果你使用本项目内置的 Docker Postgres（推荐）：",
          "  docker compose -f ops/docker/compose.dev.yml up -d postgres",
          "",
          "如果你就是想在无数据库环境下跑前台（不推荐）：",
          "  BUILD_SKIP_PAYLOAD=true npm run dev",
        ].join("\n"),
      );
    }
    return null;
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = Promise.all([
      import("payload"),
      import("../../payload.config"),
    ]).then(([{ getPayload }, { default: config }]) => {
      return getPayload({ config });
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.warn("[payload] Failed to initialize Payload client:", error);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.client = await cached.promise;
    return cached.client;
  } catch (error) {
    return null;
  }
}

export async function tryGetGlobals(args: {
  payload: Payload;
  locale: PayloadLocale;
  depth?: number;
}) {
  const { payload, locale, depth = 2 } = args;

  const [navigation, footer, siteSettings] = await Promise.all([
    payload.findGlobal({
      slug: "navigation",
      locale,
      depth,
      overrideAccess: true,
    }),
    payload.findGlobal({
      slug: "footer",
      locale,
      depth,
      overrideAccess: true,
    }),
    payload.findGlobal({
      slug: "siteSettings",
      locale,
      depth,
      overrideAccess: true,
    }),
  ]);

  return { navigation, footer, siteSettings };
}

export async function tryGetPageBySlug(args: {
  payload: Payload;
  locale: PayloadLocale;
  slug: string;
  depth?: number;
  draft?: boolean;
}) {
  const { payload, locale, slug, depth = 2, draft = false } = args;

  const res = await payload.find({
    collection: "pages",
    where: draft
      ? { slug: { equals: slug } }
      : {
          and: [
            { slug: { equals: slug } },
            // pages collection 启用了 drafts；默认只展示已发布内容
            { _status: { equals: "published" } },
          ],
        },
    limit: 1,
    depth,
    locale,
    overrideAccess: true,
    draft: draft ? true : undefined,
  });

  return res.docs?.[0] ?? null;
}

export async function tryGetProductBySlug(args: {
  payload: Payload;
  locale: PayloadLocale;
  slug: string;
  depth?: number;
  draft?: boolean;
}) {
  const { payload, locale, slug, depth = 3, draft = false } = args;
  const res = await payload.find({
    collection: "products",
    where: draft
      ? { slug: { equals: slug } }
      : {
          and: [
            { slug: { equals: slug } },
            { _status: { equals: "published" } },
          ],
        },
    limit: 1,
    depth,
    locale,
    overrideAccess: true,
    draft: draft ? true : undefined,
  });

  return res.docs?.[0] ?? null;
}

export async function tryGetProductSlugs(args: {
  payload: Payload;
  locale: PayloadLocale;
  draft?: boolean;
}) {
  const { payload, locale, draft = false } = args;
  const res = await payload.find({
    collection: "products",
    limit: 500,
    locale,
    overrideAccess: true,
    where: draft
      ? {}
      : {
          _status: { equals: "published" },
        },
    draft: draft ? true : undefined,
  });

  return (res.docs ?? [])
    .map((doc: any) => String(doc?.slug ?? ""))
    .filter((slug) => slug.length > 0);
}

export async function tryGetProductsCatalog(args: {
  payload: Payload;
  locale: PayloadLocale;
  draft?: boolean;
}) {
  const { payload, locale, draft = false } = args;

  const [seriesRes, productsRes] = await Promise.all([
    payload.find({
      collection: "productSeries",
      limit: 200,
      sort: "sortOrder",
      locale,
      overrideAccess: true,
    }),
    payload.find({
      collection: "products",
      limit: 500,
      sort: "slug",
      depth: 2,
      locale,
      overrideAccess: true,
      where: draft
        ? {}
        : {
            _status: { equals: "published" },
          },
      draft: draft ? true : undefined,
    }),
  ]);

  const productsBySeriesId = new Map<number | string, ProductSummary[]>();
  for (const product of productsRes.docs as Array<any>) {
    const seriesId = typeof product?.series === "object" ? product?.series?.id : product?.series;
    if (!seriesId) continue;

    const heroImageURL = resolveMediaURL(product?.heroImage);
    if (!heroImageURL) continue;

    const list = productsBySeriesId.get(seriesId) ?? [];
    list.push({
      id: product?.id,
      slug: String(product?.slug ?? ""),
      name: String(product?.name ?? product?.slug ?? ""),
      model: product?.model ?? null,
      image: heroImageURL,
      brief: product?.brief ?? null,
    });
    productsBySeriesId.set(seriesId, list);
  }

  const series = (seriesRes.docs as Array<any>).map((s) => ({
    id: s?.id,
    key: String(s?.key ?? ""),
    title: String(s?.title ?? s?.key ?? ""),
    description: s?.description ?? null,
    items: productsBySeriesId.get(s?.id) ?? [],
  }));

  const catalog: ProductsCatalog = {
    series,
  };

  return catalog;
}

export async function tryGetFAQs(args: {
  payload: Payload;
  locale: PayloadLocale;
  productIds?: Array<string | number>;
  globalOnly?: boolean;
}) {
  const { payload, locale, productIds, globalOnly } = args;

  const where: any = {};
  if (productIds && productIds.length > 0) {
    where.product = { in: productIds };
  } else if (globalOnly) {
    // Only fetch FAQs that have no product associations
    where.product = { exists: false };
  }

  const res = await payload.find({
    collection: "faq",
    limit: 100,
    sort: "sortOrder",
    locale,
    overrideAccess: true,
    where,
    depth: 1,
  });

  return (res.docs ?? []).map((doc: any) => {
    // Collect associated product names if any
    let products: string[] = [];
    if (doc?.product) {
      const pArray = Array.isArray(doc.product) ? doc.product : [doc.product];
      products = pArray
        .filter(Boolean)
        .map((p: any) => typeof p === "object" ? (p.name || p.model || p.slug) : String(p))
        .filter(Boolean);
    }

    return {
      q: doc?.question ?? "",
      a: doc?.answer ?? null, // Rich text object
      products,
    };
  });
}
