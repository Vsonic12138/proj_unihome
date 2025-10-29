import Image from "next/image";
import type { Dictionary } from "@/i18n/config";

type AboutSectionOneProps = {
  sectionOne: Dictionary["about"]["sectionOne"];
};

const AboutSectionOne = ({ sectionOne }: AboutSectionOneProps) => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="mb-12 lg:mb-0">
              <h2 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                {sectionOne.title}
              </h2>
              <p className="mb-8 text-base !leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                {sectionOne.description}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {sectionOne.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    {/* Checkmark Icon */}
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {/* Text */}
                    <span className="text-base font-semibold text-black dark:text-white">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto aspect-square max-w-[500px] overflow-hidden rounded-3xl">
              <Image
                src={sectionOne.image.src}
                alt={sectionOne.image.alt}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 500px, 100vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
