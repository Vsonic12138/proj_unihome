import SectionTitle from "@/components/Common/SectionTitle";
import ProductCard, { type ProductSummary } from "./ProductCard";

type ProductsGridProps = {
  locale: string;
  copy: any;
};

type ProductSeries = {
  key: string;
  title: string;
  description?: string;
  items: ProductSummary[];
};

const ProductsGrid = ({ locale, copy }: ProductsGridProps) => {
  const seriesList = (copy.series ?? []) as ProductSeries[];

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title={copy.coreTitle} paragraph={copy.coreDescription} center />

        <div className="mt-12 space-y-16">
          {seriesList.map((series) => (
            <div key={series.key}>
              <div className="mb-8 max-w-3xl">
                <h3 className="text-xl font-semibold text-black dark:text-white md:text-2xl">
                  {series.title}
                </h3>
                {series.description && (
                  <p className="mt-2 text-sm leading-relaxed text-body-color dark:text-body-color-dark md:text-base">
                    {series.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {series.items.map((item) => (
                  <ProductCard
                    key={item.slug}
                    locale={locale}
                    item={item}
                    ctaLabel={copy.viewDetailsCta}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
