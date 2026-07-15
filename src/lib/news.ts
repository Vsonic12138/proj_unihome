export type NewsCategory = "company" | "industry" | "media";

export type NewsListItem = {
  id: number | string;
  title: string;
  slug: string;
  category: NewsCategory;
  summary: string | null;
  publishDate: string | null;
  coverImage: {
    url: string;
    alt: string | null;
  } | null;
};

export type NewsCategoryTranslationKey =
  | "category.company"
  | "category.industry"
  | "category.media"
  | "category.generic";

const NEWS_CATEGORIES = ["company", "industry", "media"] as const;
const NEWS_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type NewsShowcaseBlockLike = Record<string, unknown> & {
  blockType?: string;
};

export function upsertNewsShowcaseBlock(
  blocks: unknown,
  copy: { title: string; description: string; limit?: number },
): NewsShowcaseBlockLike[] {
  const current = Array.isArray(blocks)
    ? (blocks.filter(
        (block): block is NewsShowcaseBlockLike =>
          Boolean(block) && typeof block === "object",
      ) as NewsShowcaseBlockLike[])
    : [];
  const existing = current.find(
    (block) => block.blockType === "newsShowcase",
  );
  const next = current.filter(
    (block) => block.blockType !== "newsShowcase",
  );
  const showcase: NewsShowcaseBlockLike = {
    ...existing,
    blockType: "newsShowcase",
    title: copy.title,
    description: copy.description,
    limit: clampNewsShowcaseLimit(copy.limit ?? existing?.limit),
  };

  let insertIndex = -1;
  for (let index = 0; index < next.length; index++) {
    if (
      next[index].blockType === "features" ||
      next[index].blockType === "productsCatalog"
    ) {
      insertIndex = index + 1;
    }
  }
  if (insertIndex < 0) {
    const aboutIndex = next.findIndex((block) => block.blockType === "about");
    insertIndex = aboutIndex >= 0 ? aboutIndex : next.length;
  }

  next.splice(insertIndex, 0, showcase);
  return next;
}

export function isValidNewsSlug(value: unknown): value is string {
  return typeof value === "string" && NEWS_SLUG_PATTERN.test(value);
}

export function getNewsPathSuffix(slug: string): string {
  return `/news/${encodeURIComponent(slug)}`;
}

export function buildNewsDetailPath(locale: string, slug: string): string {
  const resolvedLocale = locale === "en" || locale === "ja" ? locale : "zh";
  return `/${resolvedLocale}${getNewsPathSuffix(slug)}`;
}

export function clampNewsShowcaseLimit(value: unknown): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : Number.NaN;

  if (!Number.isFinite(parsed) || parsed < 1) return 3;
  return Math.min(Math.floor(parsed), 6);
}

export function isNewsCategory(value: unknown): value is NewsCategory {
  return NEWS_CATEGORIES.includes(value as NewsCategory);
}

export function getNewsCategoryTranslationKey(
  category: unknown,
): NewsCategoryTranslationKey {
  return isNewsCategory(category)
    ? (`category.${category}` as NewsCategoryTranslationKey)
    : "category.generic";
}

export function formatNewsDate(
  value: string | Date | null | undefined,
  locale: string,
): string {
  if (!value) return "";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const dateLocale =
    locale === "en" ? "en-US" : locale === "ja" ? "ja-JP" : "zh-CN";

  return new Intl.DateTimeFormat(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(date);
}

export function buildPublishedNewsWhere(extra?: Record<string, unknown>) {
  const published = { _status: { equals: "published" } };
  return extra && Object.keys(extra).length > 0
    ? { and: [extra, published] }
    : published;
}

function resolveNewsCoverURL(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return null;

  const media = value as {
    url?: unknown;
    sizes?: Record<string, { url?: unknown } | undefined>;
  };
  if (typeof media.url === "string" && media.url) return media.url;

  for (const size of ["hero", "card", "thumbnail"]) {
    const url = media.sizes?.[size]?.url;
    if (typeof url === "string" && url) return url;
  }
  return null;
}

export function normalizeNewsListItem(doc: unknown): NewsListItem | null {
  if (!doc || typeof doc !== "object") return null;

  const value = doc as Record<string, any>;
  const title = typeof value.title === "string" ? value.title.trim() : "";
  const slug = typeof value.slug === "string" ? value.slug.trim() : "";
  const id = value.id;

  if (!title || !slug || (typeof id !== "number" && typeof id !== "string")) {
    return null;
  }

  const coverURL = resolveNewsCoverURL(value.coverImage);
  const coverAlt =
    value.coverImage &&
    typeof value.coverImage === "object" &&
    typeof value.coverImage.alt === "string"
      ? value.coverImage.alt
      : null;

  return {
    id,
    title,
    slug,
    category: isNewsCategory(value.category) ? value.category : "company",
    summary: typeof value.summary === "string" ? value.summary : null,
    publishDate:
      typeof value.publishDate === "string" ? value.publishDate : null,
    coverImage: coverURL ? { url: coverURL, alt: coverAlt } : null,
  };
}
