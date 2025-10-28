"use client";

import Image from "next/image";
import { Feature } from "@/types/feature";
const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { image, imageAlt, title, summary, keywords } = feature;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-gray-dark dark:shadow-none">
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-transparent">
        <Image
          src={image ?? "/images/products/placeholder.svg"}
          alt={imageAlt ?? title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="text-xl font-semibold text-black dark:text-white">{title}</h3>
          <p className="mt-2 text-base text-body-color dark:text-body-color-dark">{summary}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary dark:bg-primary/20 dark:text-white"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default SingleFeature;
