import Image from "next/image";
import Link from "next/link";
import { withLocalePath } from "@/i18n/utils";
import type { Locale } from "@/i18n/config";

export type ProductSummary = {
  slug: string;
  name: string;
  model?: string;
  image: string;
  brief?: string;
  highlights?: string[];
};

type ProductCardProps = {
  locale: Locale;
  item: ProductSummary;
  ctaLabel: string;
};

const ProductCard = ({ locale, item, ctaLabel }: ProductCardProps) => {
  const href = withLocalePath(locale, `/products/${item.slug}`);

  return (
    <div className="group overflow-hidden rounded-lg border border-stroke bg-white shadow-one transition hover:shadow-two dark:border-stroke-dark dark:bg-dark">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          unoptimized
        />
      </div>
      <div className="p-5">
        <h3 className="mb-1 text-lg font-semibold text-black dark:text-white">
          {item.name}
        </h3>
        {item.model && (
          <div className="mb-2 text-xs text-body-color dark:text-body-color-dark">
            {item.model}
          </div>
        )}
        {item.brief && (
          <p className="mb-4 line-clamp-3 text-sm text-body-color dark:text-body-color-dark">
            {item.brief}
          </p>
        )}
        <Link
          href={href}
          className="inline-flex items-center rounded bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          {ctaLabel}
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

