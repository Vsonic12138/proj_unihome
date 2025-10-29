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
              <div className="flex flex-wrap gap-3">
                {sectionOne.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20 dark:text-primary"
                  >
                    {highlight}
                  </span>
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
