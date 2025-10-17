import SectionTitle from "@/components/Common/SectionTitle";
import type { Dictionary, Locale } from "@/i18n/config";
import ProductCard, { type ProductSummary } from "./ProductCard";

type ProductsGridProps = {
  locale: Locale;
  copy: Dictionary["products"]["catalog"];
};

const ProductsGrid = ({ locale, copy }: ProductsGridProps) => {
  const items = copy.items as ProductSummary[];
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title={copy.coreTitle} paragraph={copy.coreDescription} center />
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ProductCard key={item.slug} locale={locale} item={item} ctaLabel={copy.viewDetailsCta} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;

