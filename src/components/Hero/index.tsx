"use client";

import type { Dictionary } from "@/i18n/config";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type HeroProps = {
  copy: Dictionary["hero"];
};

type SlideAction = {
  href: string;
  label?: string;
  target?: "_self" | "_blank";
  ariaLabel?: string;
};

type SlideMedia = {
  kind: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

type SlideInput = NonNullable<Dictionary["hero"]["slides"]>[number] & {
  media?: SlideMedia;
  image?: string;
  imageAlt?: string;
  action?: SlideAction;
  title?: string;
  description?: string;
};

type Slide = {
  id: number;
  title?: string;
  description?: string;
  media?: SlideMedia;
  action?: SlideAction;
};

const Hero = ({ copy }: HeroProps) => {
  const normalizedSlides = useMemo<Slide[]>(() => {
    return (copy.slides ?? []).map((item) => {
      const slide = item as SlideInput;
      const media =
        slide.media ??
        (slide.image
          ? {
              kind: "image" as const,
              src: slide.image,
              alt: slide.imageAlt ?? slide.title,
            }
          : undefined);

      return {
        id: slide.id,
        title: slide.title,
        description: slide.description,
        media,
        action: slide.action,
      };
    });
  }, [copy.slides]);

  const slides = normalizedSlides;
  const autoPlayInterval = copy.autoPlayInterval ?? 6000;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => {
      clearInterval(timer);
    };
  }, [slides.length, autoPlayInterval]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    if (slides.length <= 1) {
      return;
    }
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleNext = useCallback(() => {
    if (slides.length <= 1) {
      return;
    }
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const activeSlideLabel = useMemo(() => {
    if (slides.length === 0) {
      return "";
    }
    return `${activeIndex + 1} / ${slides.length}`;
  }, [activeIndex, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const renderMedia = (slide: Slide, priority: boolean) => {
  if (slide.media?.kind === "video") {
    return (
      <video
        className="h-full w-full object-contain"
        src={slide.media.src}
        poster={slide.media.poster}
        controls
        playsInline
        autoPlay={slide.media.autoPlay ?? false}
        loop={slide.media.loop ?? false}
        muted={slide.media.muted ?? true}
      />
    );
  }

  if (slide.media?.kind === "image" && slide.media.src) {
    return (
      <Image
        src={slide.media.src}
        alt={slide.media.alt ?? slide.title ?? slide.action?.ariaLabel ?? slide.action?.label ?? `Slide ${slide.id}`}
        fill
        priority={priority}
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xl font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-200">
      {slide.title ?? `Slide ${slide.id}`}
    </div>
  );
};

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-white pb-16 pt-[96px] dark:bg-gray-dark sm:pb-20 lg:pb-24"
    >
      <div
        className="relative w-full overflow-hidden bg-black"
        style={{ height: "min(78vh, 720px)", minHeight: "540px" }}
      >
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => {
            if (slide.action?.href) {
              // Use Link component when href is present
              return (
                <Link
                  key={slide.id}
                  href={slide.action.href}
                  target={slide.action.target ?? "_self"}
                  rel={slide.action.target === "_blank" ? "noopener noreferrer" : undefined}
                  aria-label={slide.action.ariaLabel ?? slide.action.label ?? slide.title ?? `Slide ${slide.id}`}
                  className="relative block h-full w-full flex-shrink-0"
                >
                  <article className="relative h-full w-full bg-black">
                    {renderMedia(slide, index === 0)}
                  </article>
                </Link>
              );
            } else {
              // Use div when no href is present - need to fix the type issue
              return (
                <div
                  key={slide.id}
                  className="relative block h-full w-full flex-shrink-0"
                >
                  <article className="relative h-full w-full bg-black">
                    {renderMedia(slide, index === 0)}
                  </article>
                </div>
              );
            }
          })}
        </div>

        {slides.length > 1 ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 inset-x-0 z-[45] flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
              <button
                type="button"
                onClick={handlePrev}
                className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous slide"
              >
                <span aria-hidden className="text-2xl font-semibold">
                  ‹
                </span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next slide"
              >
                <span aria-hidden className="text-2xl font-semibold">
                  ›
                </span>
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-6 z-[70] flex flex-col items-center gap-4 px-4 sm:bottom-8 sm:px-6">
              <span className="rounded-full bg-black/45 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-white backdrop-blur">
                {activeSlideLabel}
              </span>
              <div className="flex items-center gap-3">
                {slides.map((slide, index) => (
                  <button
                    type="button"
                    key={slide.id}
                    className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-12 bg-white" : "w-6 bg-white/35"}`}
                    aria-label={`${index + 1} ${index === activeIndex ? "(current)" : ""}`}
                    aria-current={index === activeIndex ? "true" : "false"}
                    onClick={() => handleSelect(index)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="mx-auto mt-16 flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:px-6">
        {copy.primaryCta ? (
          <Link
            href={copy.primaryCta.href}
            className="w-full rounded-full bg-primary px-10 py-4 text-center text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/85 sm:w-auto"
          >
            {copy.primaryCta.label}
          </Link>
        ) : null}
        {copy.secondaryCta ? (
          <Link
            href={copy.secondaryCta.href}
            className="w-full rounded-full border border-black/10 px-10 py-4 text-center text-base font-semibold text-black transition hover:-translate-y-0.5 hover:border-black/30 dark:border-white/20 dark:text-white dark:hover:border-white/40 sm:w-auto"
          >
            {copy.secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </section>
 );
};

export default Hero;
