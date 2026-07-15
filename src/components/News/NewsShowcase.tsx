import Image from "next/image";
import Link from "next/link";

import SectionTitle from "@/components/Common/SectionTitle";
import {
  buildNewsDetailPath,
  formatNewsDate,
  type NewsCategory,
  type NewsListItem,
} from "@/lib/news";

type NewsShowcaseProps = {
  locale: string;
  title: string;
  description?: string | null;
  items: NewsListItem[];
  copy: {
    readMore: string;
    categoryLabels: Record<NewsCategory, string>;
  };
};

export function NewsShowcase({
  locale,
  title,
  description,
  items,
  copy,
}: NewsShowcaseProps) {
  if (items.length === 0) return null;

  return (
    <section id="news" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title={title}
          paragraph={description ?? ""}
          center
          mb="48px"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const href = buildNewsDetailPath(locale, item.slug);
            const date = formatNewsDate(item.publishDate, locale);
            const categoryLabel = copy.categoryLabels[item.category];

            return (
              <Link
                key={item.id}
                href={href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-gray-dark/80"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-dark-3">
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage.url}
                      alt={item.coverImage.alt ?? item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm dark:bg-dark/70 dark:text-white">
                          {categoryLabel}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20">
                      {categoryLabel}
                    </span>
                    {date ? (
                      <time
                        dateTime={item.publishDate ?? undefined}
                        className="text-body-color dark:text-white/60"
                      >
                        {date}
                      </time>
                    ) : null}
                  </div>

                  <h3 className="mb-3 text-lg font-semibold leading-snug text-dark transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                    {item.title}
                  </h3>

                  {item.summary ? (
                    <p className="mb-5 line-clamp-2 flex-1 text-sm leading-relaxed text-body-color dark:text-white/70">
                      {item.summary}
                    </p>
                  ) : (
                    <div className="mb-5 flex-1" />
                  )}

                  <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-primary/90">
                    {copy.readMore}
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
