"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type GalleryItem = {
  name: string;
  image?: string;
};

type ImageGridWithLightboxProps = {
  items?: GalleryItem[];
  gridClassName?: string;
  imageAspectClass?: string;
  unoptimized?: boolean;
};

const baseCardClasses =
  "group flex h-full flex-col items-center justify-between rounded-lg border border-stroke bg-white p-3 transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 dark:border-stroke-dark dark:bg-dark";

const overlayButtonClasses =
  "absolute top-3 right-3 rounded-full bg-black/60 p-2 text-white shadow-lg transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const navButtonClasses =
  "hidden sm:flex absolute top-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 p-3 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const fallbackImage = "/images/products/placeholder.svg";

const ImageGridWithLightbox = ({
  items,
  gridClassName = "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
  imageAspectClass = "aspect-square",
  unoptimized = true,
}: ImageGridWithLightboxProps) => {
  const safeItems = useMemo(() => items ?? [], [items]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const hasItems = safeItems.length > 0;

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    if (activeIndex === null || safeItems.length <= 1) return;
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + safeItems.length) % safeItems.length;
    });
  }, [activeIndex, safeItems.length]);

  const showNext = useCallback(() => {
    if (activeIndex === null || safeItems.length <= 1) return;
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % safeItems.length;
    });
  }, [activeIndex, safeItems.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowLeft") {
        showPrev();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, close, showNext, showPrev]);

  if (!hasItems) return null;

  return (
    <>
      <div className={`grid gap-4 ${gridClassName}`}>
        {safeItems.map((item, index) => {
          const imageSrc = item.image && item.image.trim().length > 0 ? item.image : fallbackImage;
          return (
            <button
              key={item.name + index}
              type="button"
              className={baseCardClasses}
              onClick={() => setActiveIndex(index)}
              aria-label={`${item.name} — View larger image`}
            >
              <div className={`relative w-full overflow-hidden rounded bg-gray-50 dark:bg-gray-800 ${imageAspectClass}`}>
                <Image
                  src={imageSrc}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  unoptimized={unoptimized}
                />
              </div>
              <p className="mt-2 text-center text-xs font-medium text-body-color dark:text-body-color-dark">{item.name}</p>
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button type="button" className={`${overlayButtonClasses}`} onClick={close} aria-label="Close image">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {safeItems.length > 1 && (
            <>
              <button
                type="button"
                className={`${navButtonClasses} left-6`}
                onClick={(event) => {
                  event.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className={`${navButtonClasses} right-6`}
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative flex w-full max-w-4xl flex-col items-center gap-4 rounded-xl bg-white/5 p-4 shadow-2xl backdrop-blur-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-inner">
              <div className="relative mx-auto h-[60vh] w-full max-w-3xl">
                <Image
                  src={
                    safeItems[activeIndex].image && safeItems[activeIndex].image?.trim().length
                      ? safeItems[activeIndex].image!
                      : fallbackImage
                  }
                  alt={safeItems[activeIndex].name}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  unoptimized={unoptimized}
                  priority
                />
              </div>
            </div>
            <p className="text-center text-sm font-medium text-white/90">
              {safeItems[activeIndex].name}
              {safeItems.length > 1 && <span className="ml-2 text-xs text-white/60">({activeIndex + 1}/{safeItems.length})</span>}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGridWithLightbox;
