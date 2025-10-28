import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import type { Dictionary, Locale } from "@/i18n/config";
import { withLocalePath } from "@/i18n/utils";
import type { ProductSummary } from "@/components/Products/ProductCard";

type FeaturesProps = {
  locale: Locale;
  copy: Dictionary["features"];
  productsCatalog: Dictionary["products"]["catalog"];
};

type Highlight = {
  title: string;
  description: string;
};

const Features = ({ locale, copy, productsCatalog }: FeaturesProps) => {
  const highlights = (copy.highlights ?? []) as Highlight[];
  const slugs = copy.featuredProducts?.slugs ?? [];
  const products = (productsCatalog.items ?? []) as ProductSummary[];
  const featuredProducts = slugs
    .map((slug) => products.find((item) => item.slug === slug))
    .filter((item): item is ProductSummary => Boolean(item));

  const viewAllHref = withLocalePath(locale, "/products");
  const viewAllLabel = copy.featuredProducts?.viewAllLabel ?? productsCatalog.viewDetailsCta;

  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title={copy.title} paragraph={copy.paragraph} center />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] lg:items-start">
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

            <div className="grid gap-4">
              {highlights.map((highlight, index) => (
                <article
                  key={`${highlight.title}-${index}`}
                  className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white/90 p-5 shadow-sm dark:border-white/10 dark:bg-gray-dark/80"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-white">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-black dark:text-white">
                      {highlight.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                      {highlight.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

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
          </div>

          <div className="flex flex-col gap-6">
            {featuredProducts.map((product, index) => (
              <FeaturedProductCard
                key={product.slug}
                locale={locale}
                product={product}
                ctaLabel={productsCatalog.viewDetailsCta}
                isPrimary={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type FeaturedProductCardProps = {
  locale: Locale;
  product: ProductSummary;
  ctaLabel: string;
  isPrimary?: boolean;
};

const FeaturedProductCard = ({ locale, product, ctaLabel, isPrimary = false }: FeaturedProductCardProps) => {
  const href = withLocalePath(locale, `/products/${product.slug}`);

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
