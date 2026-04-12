"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

type CaseStudyItem = {
// ... preserving existing types
  id: number | string;
  title: string;
  slug: string;
  coverImage?: {
    url?: string | null;
    filename?: string | null;
    alt?: string | null;
  } | null;
  content?: any;
};

type Props = {
  cases: CaseStudyItem[];
  locale: string;
};

// Extract plain text from Payload lexical rich text
function extractText(richText: any): string {
  if (!richText?.root?.children) return "";
  const lines: string[] = [];
  for (const node of richText.root.children) {
    if (node.type === "paragraph" && Array.isArray(node.children)) {
      const text = node.children
        .filter((n: any) => n.type === "text")
        .map((n: any) => n.text ?? "")
        .join("");
      if (text.trim()) lines.push(text);
    }
    if (lines.length >= 3) break;
  }
  return lines.join(" ");
}

// (Removed hardcoded I18N_MAP)

function SafeImage({ src, alt, emptyText }: { src: string | null; alt: string; emptyText: string }) {
  const [error, setError] = useState(!src);
  
  if (error || !src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#f5a98b] via-[#f9cdb8] to-[#fde8de] text-sm text-[#d47653] dark:from-[#4a2418] dark:via-[#3a1c10] dark:to-[#2a1208] dark:text-[#a66a55]">
        <svg xmlns="http://www.w3.org/2000/svg" className="mb-2 h-8 w-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="opacity-70 font-medium tracking-wider">{emptyText}</span>
      </div>
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setError(true)}
    />
  );
}

export function CaseStudyGrid({ cases, locale }: Props) {
  const t = useTranslations("cases");
  const dict = {
    empty: t("empty"),
    viewDetails: t("viewDetails"),
    noImage: t("noImage"),
  };

  if (!cases || cases.length === 0) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center text-body-color dark:text-white/60">
          {dict.empty}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const imageUrl = c.coverImage?.url ?? null;
            const excerpt = extractText(c.content);
            const href = `/${locale}/case-studies/${c.slug}`;

            return (
              <Link
                key={c.id}
                href={href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-dark-3 dark:bg-dark-2"
              >
                {/* Cover image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-dark-3">
                  <SafeImage 
                    src={imageUrl} 
                    alt={c.coverImage?.alt ?? c.title} 
                    emptyText={dict.noImage}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 text-lg font-semibold leading-snug text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                    {c.title}
                  </h3>
                  {excerpt && (
                    <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-body-color dark:text-white/60">
                      {excerpt}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {dict.viewDetails}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
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
