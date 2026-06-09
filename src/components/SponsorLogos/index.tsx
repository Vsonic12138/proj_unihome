import Image from "next/image";
import type { CSSProperties } from "react";

type SponsorLogo = {
  name: string;
  lightLogo: string;
  darkLogo?: string | null;
  url?: string | null;
  openInNewTab?: boolean | null;
};

type SponsorLogosProps = {
  heading?: string | null;
  description?: string | null;
  speed?: "slow" | "normal" | "fast" | null;
  pauseOnHover?: boolean | null;
  logos?: SponsorLogo[];
};

const speedDurations: Record<
  NonNullable<SponsorLogosProps["speed"]>,
  string
> = {
  slow: "42s",
  normal: "30s",
  fast: "20s",
};

const SponsorLogos = ({
  heading,
  description,
  speed = "normal",
  pauseOnHover = true,
  logos = [],
}: SponsorLogosProps) => {
  const validLogos = logos.filter((logo) => logo.lightLogo);

  if (validLogos.length === 0) {
    return null;
  }

  const shouldAnimate = validLogos.length > 4;
  const duration = speedDurations[speed ?? "normal"] ?? speedDurations.normal;

  return (
    <section className="overflow-hidden border-b border-black/5 bg-[#FCFCFC] py-5 sm:py-6 dark:border-white/10 dark:bg-black">
      <div className="container">
        {(heading || description) && (
          <div className="mx-auto mb-6 max-w-3xl text-center">
            {heading && (
              <h2 className="text-xs font-semibold tracking-widest text-black/60 uppercase dark:text-white/60">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-2 text-xs text-black/50 dark:text-white/50">
                {description}
              </p>
            )}
          </div>
        )}

        <div
          className={[
            "relative",
            shouldAnimate ? "overflow-hidden" : "",
            pauseOnHover ? "sponsor-marquee-paused" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ "--sponsor-marquee-duration": duration } as CSSProperties}
        >
          {shouldAnimate && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#FCFCFC] to-transparent dark:from-black" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#FCFCFC] to-transparent dark:from-black" />
            </>
          )}

          <div
            className={
              shouldAnimate
                ? "sponsor-marquee-track animate-sponsor-marquee flex w-max items-center"
                : "flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12"
            }
          >
            <LogoGroup logos={validLogos} shouldAnimate={shouldAnimate} />
            {shouldAnimate && (
              <LogoGroup logos={validLogos} decorative shouldAnimate={shouldAnimate} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

type LogoGroupProps = {
  logos: SponsorLogo[];
  decorative?: boolean;
  shouldAnimate?: boolean;
};

const LogoGroup = ({ logos, decorative = false, shouldAnimate = false }: LogoGroupProps) => (
  <div
    className={`flex items-center ${
      shouldAnimate
        ? "gap-8 pr-8 sm:gap-12 sm:pr-12"
        : "flex-wrap justify-center gap-x-8 gap-y-4 sm:gap-x-12"
    }`}
    aria-hidden={decorative ? "true" : undefined}
  >
    {logos.map((logo, index) => (
      <LogoItem
        key={`${logo.name}-${index}-${decorative ? "duplicate" : "primary"}`}
        logo={logo}
        decorative={decorative}
      />
    ))}
  </div>
);

type LogoItemProps = {
  logo: SponsorLogo;
  decorative?: boolean;
};

const LogoItem = ({ logo, decorative = false }: LogoItemProps) => {
  const content = (
    <>
      <Image
        src={logo.lightLogo}
        alt={decorative ? "" : logo.name}
        width={180}
        height={48}
        className="block h-8 w-auto max-w-[120px] object-contain opacity-95 transition-all duration-300 group-hover/logo:scale-105 group-hover/logo:opacity-100 group-focus/logo:scale-105 group-focus/logo:opacity-100 sm:h-9 sm:max-w-[150px] dark:hidden"
        unoptimized
      />
      <Image
        src={logo.darkLogo ?? logo.lightLogo}
        alt={decorative ? "" : logo.name}
        width={180}
        height={48}
        className="hidden h-8 w-auto max-w-[120px] object-contain opacity-95 transition-all duration-300 group-hover/logo:scale-105 group-hover/logo:opacity-100 group-focus/logo:scale-105 group-focus/logo:opacity-100 sm:h-9 sm:max-w-[150px] dark:block"
        unoptimized
      />
    </>
  );

  const wrapperClass =
    "group/logo flex h-12 items-center justify-center p-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-shadow";

  if (!logo.url) {
    return <span className={wrapperClass}>{content}</span>;
  }

  return (
    <a
      href={logo.url}
      target={logo.openInNewTab === false ? undefined : "_blank"}
      rel={logo.openInNewTab === false ? undefined : "noopener noreferrer"}
      tabIndex={decorative ? -1 : undefined}
      aria-label={decorative ? undefined : logo.name}
      className={wrapperClass}
    >
      {content}
    </a>
  );
};

export default SponsorLogos;
