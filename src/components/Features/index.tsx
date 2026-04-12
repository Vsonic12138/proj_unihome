import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import type { ProductSummary } from "@/components/Products/ProductCard";

type FeaturesProps = {
  locale: string;
  copy: any;
  productsCatalog?: any;
  viewDetailsCta?: string;
};

type Highlight = {
  title: string;
  description: string;
  tags?: string;
  link?: string;
};

const Features = ({ locale, copy, productsCatalog, viewDetailsCta }: FeaturesProps) => {
  const highlights = (copy.highlights ?? []) as Highlight[];
  const slugs = copy.featuredProducts?.slugs ?? [];
  const products = ((productsCatalog?.series ?? []) as Array<{ items: ProductSummary[] }>)
    .flatMap((series) => series.items) as ProductSummary[];
  const featuredProducts = slugs
    .map((slug: string) => products.find((item) => item.slug === slug))
    .filter((item): item is ProductSummary => Boolean(item));

  const viewAllHref = `/${locale}/products`;
  const resolvedViewDetailsCta = String(viewDetailsCta ?? "View Details");
  const viewAllLabel = copy.featuredProducts?.viewAllLabel ?? resolvedViewDetailsCta;

  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title={copy.title} paragraph={copy.paragraph} center />

        <div className={`mt-12 grid gap-10 ${featuredProducts.length > 0 ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)]" : "grid-cols-1"} lg:items-start`}>
          <div className="flex flex-col gap-6">
            {copy.featuredProducts?.title && (
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {copy.featuredProducts.title}
              </h3>
            )}
            {copy.featuredProducts?.description && (
              <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                {copy.featuredProducts.description}
              </p>
            )}

            <div className={featuredProducts.length > 0 ? "grid gap-4" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
              {highlights.map((highlight, index) => {
                const tagList = highlight.tags ? highlight.tags.split(',').map(s => s.trim()).filter(Boolean) : [];
                return (
                <article
                  key={`${highlight.title}-${index}`}
                  className={`group relative overflow-hidden rounded-2xl border border-black/5 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card-hover dark:border-white/10 dark:bg-gray-dark/80 dark:hover:border-primary ${featuredProducts.length > 0 ? "flex items-start gap-4" : "flex flex-col"}`}
                >
                  {featuredProducts.length > 0 && (
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-white">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  )}
                  <div className={featuredProducts.length > 0 ? "" : "flex flex-col flex-1"}>
                    <h4 className="text-base font-semibold text-black transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                      {highlight.link ? (
                        <a href={highlight.link} target="_blank" rel="noopener noreferrer" className="before:absolute before:inset-0">
                          {highlight.title}
                        </a>
                      ) : (
                        highlight.title
                      )}
                    </h4>
                    <p className={`text-sm leading-relaxed text-body-color dark:text-body-color-dark ${featuredProducts.length > 0 ? "mt-1" : "mt-2 mb-4 line-clamp-4"}`}>
                      {highlight.description}
                    </p>
                    
                    {tagList.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {tagList.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {highlight.link && featuredProducts.length === 0 && (
                    <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <svg
                        className="h-5 w-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  )}
                </article>
              )})}
            </div>

            {featuredProducts.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 border-t border-black/5 pt-4 text-sm dark:border-white/10">
                <span className="text-body-color dark:text-body-color-dark">
                  {copy.featuredProducts?.ctaDescription ?? ""}
                </span>
                <Link
                  href={viewAllHref}
                  className="inline-flex items-center rounded-full border border-primary/50 px-4 py-2 font-medium text-primary transition-colors hover:bg-primary/10 dark:border-primary/40 dark:text-white dark:hover:bg-primary/20"
                >
                  {viewAllLabel}
                  <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {featuredProducts.length > 0 && (
            <div className="flex flex-col gap-6">
              {featuredProducts.map((product, index) => (
                <FeaturedProductCard
                  key={product.slug}
                  locale={locale}
                  product={product}
                  ctaLabel={resolvedViewDetailsCta}
                  isPrimary={index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

type FeaturedProductCardProps = {
  locale: string;
  product: ProductSummary;
  ctaLabel: string;
  isPrimary?: boolean;
};

const FeaturedProductCard = ({ locale, product, ctaLabel, isPrimary = false }: FeaturedProductCardProps) => {

  const wrapperClasses = [
    "group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-gray-dark/80",
    "lg:flex-row",
  ];

  const imageWrapperClasses = [
    "relative w-full overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
    "aspect-[3/2]",
    "lg:w-64",
    isPrimary ? "lg:aspect-[16/9]" : "lg:aspect-[4/3]",
  ];

  const href = `/${locale}/products/${product.slug}`;

  return (
    <article className={wrapperClasses.join(" ")}>
      <div className={imageWrapperClasses.join(" ")}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 768px) 45vw, 100vw"
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div className="space-y-2">
          {product.model && (
            <span className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-primary/80">
              {product.model}
            </span>
          )}
          <h3 className="text-lg font-semibold leading-snug text-black dark:text-white">{product.name}</h3>
          {product.brief && (
            <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">{product.brief}</p>
          )}
        </div>

        <Link
          href={href}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          {ctaLabel}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default Features;
