import Image from "next/image";
import type { Dictionary } from "@/i18n/config";

type AboutSectionTwoProps = {
  items: Dictionary["about"]["sectionTwo"]["items"];
};

const AboutSectionTwo = ({ items }: AboutSectionTwoProps) => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto mb-12 aspect-[4/3] max-w-[520px] overflow-hidden rounded-3xl lg:m-0">
              <Image
                src="/images/about/section-two.jpg"
                alt="具身智能机器人教学现场"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
                priority={false}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px] rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5 dark:bg-white">
              <div className="space-y-8">
                {items.map((item) => (
                  <div key={item.title}>
                    <h3 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl lg:text-xl xl:text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-relaxed">
                      {item.paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
