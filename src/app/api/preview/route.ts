import { NextResponse } from "next/server";
import { draftMode } from "next/headers";
import { buildNewsDetailPath } from "@/lib/news";

const LOCALES = ["zh", "en", "ja"] as const;
type Locale = (typeof LOCALES)[number];

type Collection = "pages" | "products" | "caseStudies" | "news";

export const dynamic = "force-dynamic";

function isLocale(value: string | null): value is Locale {
  return Boolean(value && (LOCALES as readonly string[]).includes(value));
}

function pageSlugToPath(locale: Locale, slug: string): string {
  switch (slug) {
    case "home":
      return `/${locale}`;
    case "developers-knowledge-base":
      return `/${locale}/developers/knowledge-base`;
    case "developers-open-source":
      return `/${locale}/developers/open-source`;
    case "case-studies-practical-teaching":
      return `/${locale}/case-studies/practical-teaching`;
    case "case-studies-sci-tech-innovation":
      return `/${locale}/case-studies/sci-tech-innovation`;
    case "case-studies-innovation-competition":
      return `/${locale}/case-studies/innovation-competition`;
    case "case-studies-training-base":
      return `/${locale}/case-studies/training-base`;
    default:
      return `/${locale}/${slug}`;
  }
}

function computeRedirectPath(args: {
  locale: Locale;
  collection: Collection;
  slug: string;
}) {
  const { locale, collection, slug } = args;

  if (collection === "pages") return pageSlugToPath(locale, slug);
  if (collection === "products") return `/${locale}/products/${slug}`;
  if (collection === "caseStudies") return `/${locale}/case-studies/${slug}`;
  if (collection === "news") return buildNewsDetailPath(locale, slug);

  return `/${locale}`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const previewSecret = process.env.PREVIEW_SECRET;

  if (!previewSecret) {
    return NextResponse.json(
      { error: "PREVIEW_SECRET is not configured" },
      { status: 500 },
    );
  }

  if (!secret || secret !== previewSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const collection = url.searchParams.get("collection") as Collection | null;
  const slug = url.searchParams.get("slug");
  const localeParam = url.searchParams.get("locale");

  if (
    !collection ||
    !["pages", "products", "caseStudies", "news"].includes(collection)
  ) {
    return NextResponse.json(
      { error: "Missing or invalid collection" },
      { status: 400 },
    );
  }

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const locale: Locale = isLocale(localeParam) ? localeParam : "zh";

  // Enable Next.js Draft Mode (cookie-based)
  (await draftMode()).enable();

  const redirectPath = computeRedirectPath({ locale, collection, slug });
  const redirectURL = new URL(redirectPath, url.origin);
  return NextResponse.redirect(redirectURL, 307);
}
