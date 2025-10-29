import { getDictionary, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Image from "next/image";
import ImageGridWithLightbox from "@/components/Products/ImageGridWithLightbox";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    const dict = await getDictionary(locale);
    const series = dict.products.catalog.series as Array<{
      items: Array<{ slug: string }>;
    }>;
    series.forEach(({ items }) => {
      items.forEach(({ slug }) => params.push({ locale, slug }));
    });
  }
  return params;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const details = (dict.products.details as Record<string, any>)[slug];
  if (!details) return {};
  return {
    title: `${details.name} | ${dict.pages.products.title}`,
    description: details.overview || dict.pages.products.description,
  };
}

const ProductDetailsPage = async ({ params }: PageParams) => {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const details = (dict.products.details as Record<string, any>)[slug];

  if (!details) return notFound();

  return (
    <section className="pt-28 md:pt-32 lg:pt-[150px] pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        {/* Top Section: Image + Basic Info */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <Image
              src={details.image}
              alt={details.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div>
            <h1 className="mb-3 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[42px]">{details.name}</h1>
            {details.subtitle && (
              <div className="mb-2 text-lg font-medium text-body-color dark:text-body-color-dark">{details.subtitle}</div>
            )}
            {details.model && (
              <div className="mb-4 text-sm text-body-color dark:text-body-color-dark">{details.model}</div>
            )}
            {details.overview && (
              <p className="mb-6 text-base text-body-color dark:text-body-color-dark">{details.overview}</p>
            )}
            {details.applicable && (
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">{dict.products.detailLabels.applicable}</h3>
                <p className="text-base text-body-color dark:text-body-color-dark">{details.applicable}</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Features */}
        {details.features?.length ? (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{(dict.products.detailLabels as any).features || "产品特点"}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {details.features.map((feature: any, i: number) => (
                <div key={i} className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                  <h4 className="mb-3 text-lg font-semibold text-black dark:text-white">{feature.title}</h4>
                  <p className="text-sm text-body-color dark:text-body-color-dark">{feature.content}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Sample Cases */}
        {details.sampleCases && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{(dict.products.detailLabels as any).sampleCases || "样机案例"}</h2>
            <p className="mb-8 text-base text-body-color dark:text-body-color-dark">{details.sampleCases.description}</p>

            {/* Modules */}
            {details.sampleCases.modules?.length ? (
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  {(dict.products.detailLabels as any).modules || "机器人模块"}（6种）
                </h3>
                <ImageGridWithLightbox
                  items={details.sampleCases.modules}
                  gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
                  imageAspectClass="aspect-square"
                />
              </div>
            ) : null}

            {/* Chassis */}
            {details.sampleCases.chassis?.length ? (
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  {(dict.products.detailLabels as any).chassis || "机器人底盘"}（5种）
                </h3>
                <ImageGridWithLightbox
                  items={details.sampleCases.chassis}
                  gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                  imageAspectClass="aspect-square"
                />
              </div>
            ) : null}

            {/* Arms */}
            {details.sampleCases.arms?.length ? (
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  {(dict.products.detailLabels as any).arms || "机械臂构型"}（3种）
                </h3>
                <ImageGridWithLightbox
                  items={details.sampleCases.arms}
                  gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  imageAspectClass="aspect-square"
                />
              </div>
            ) : null}

            {/* Composite Robots */}
            {details.sampleCases.compositeRobots?.length ? (
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  {(dict.products.detailLabels as any).compositeRobots || "复合机器人"}（20种）
                </h3>
                <ImageGridWithLightbox
                  items={details.sampleCases.compositeRobots}
                  gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  imageAspectClass="aspect-square"
                />
              </div>
            ) : null}
          </div>
        )}

        {/* Configuration Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{dict.products.detailLabels.configuration}</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Sensor Config */}
            {details.sensorConfig && (
              <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{(dict.products.detailLabels as any).sensorConfig || "传感器配置"}</h3>
                <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">{details.sensorConfig.description}</p>
                {details.sensorConfig.list?.length ? (
                  <ul className="list-disc pl-5 text-sm text-body-color dark:text-body-color-dark">
                    {details.sensorConfig.list.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}

            {/* Controller Config */}
            {details.controllerConfig && (
              <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{(dict.products.detailLabels as any).controllerConfig || "控制器配置"}</h3>
                <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">{details.controllerConfig.description}</p>
                {details.controllerConfig.images?.length ? (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {details.controllerConfig.images.map((img: any, i: number) => (
                      <figure
                        key={i}
                        className="overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={img.src}
                            alt={img.alt || ""}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                        </div>
                        {img.caption && (
                          <figcaption className="px-3 py-2 text-center text-xs text-body-color dark:text-body-color-dark">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
            )}

            {/* Software Config */}
            {details.softwareConfig && (
              <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{(dict.products.detailLabels as any).softwareConfig || "软件配置"}</h3>
                <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">{details.softwareConfig.description}</p>
                {details.softwareConfig.ecosystem && (
                  <p className="text-sm text-body-color dark:text-body-color-dark">{details.softwareConfig.ecosystem}</p>
                )}
                {details.softwareConfig.images?.length ? (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {details.softwareConfig.images.map((img: any, i: number) => (
                      <figure
                        key={i}
                        className="overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800"
                      >
                        <div className="relative aspect-[16/10] w-full">
                          <Image
                            src={img.src}
                            alt={img.alt || ""}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                        </div>
                        {img.caption && (
                          <figcaption className="px-3 py-2 text-center text-xs text-body-color dark:text-body-color-dark">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Experiments Section */}
        {details.experiments && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{dict.products.detailLabels.experiments}</h2>

            {/* Summary */}
            {details.experiments.summary && (
              <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-6 dark:border-primary/30 dark:bg-primary/10">
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">{details.experiments.summary}</p>
              </div>
            )}

            {/* Preparation */}
            {details.experiments.preparation && (
              <div className="mb-8">
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">{details.experiments.preparation.title}</h3>
                {details.experiments.preparation.description && (
                  <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">{details.experiments.preparation.description}</p>
                )}
                <ul className="list-disc pl-5 text-sm text-body-color dark:text-body-color-dark">
                  {details.experiments.preparation.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Module Basics */}
              {details.experiments.moduleBasics && (
                <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                  <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">{details.experiments.moduleBasics.title}</h3>
                  {details.experiments.moduleBasics.range && (
                    <div className="mb-2 text-xs text-body-color dark:text-body-color-dark">{details.experiments.moduleBasics.range}</div>
                  )}
                  {details.experiments.moduleBasics.description && (
                    <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">{details.experiments.moduleBasics.description}</p>
                  )}
                  <ul className="space-y-2 text-sm text-body-color dark:text-body-color-dark">
                    {details.experiments.moduleBasics.items.map((item: any, i: number) => (
                      <li key={i}>
                        {item.no && <strong className="text-primary">{item.no}｜</strong>}
                        <strong>{item.name}：</strong>
                        {item.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Structure Design */}
              {details.experiments.structureDesign && (
                <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                  <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">{details.experiments.structureDesign.title}</h3>
                  {details.experiments.structureDesign.range && (
                    <div className="mb-2 text-xs text-body-color dark:text-body-color-dark">{details.experiments.structureDesign.range}</div>
                  )}
                  {details.experiments.structureDesign.description && (
                    <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">{details.experiments.structureDesign.description}</p>
                  )}
                  <ul className="space-y-2 text-sm text-body-color dark:text-body-color-dark">
                    {details.experiments.structureDesign.items.map((item: any, i: number) => (
                      <li key={i}>
                        {item.no && <strong className="text-primary">{item.no}｜</strong>}
                        <strong>{item.name}：</strong>
                        {item.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Perception */}
              {details.experiments.perception && (
                <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                  <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">{details.experiments.perception.title}</h3>
                  {details.experiments.perception.range && (
                    <div className="mb-2 text-xs text-body-color dark:text-body-color-dark">{details.experiments.perception.range}</div>
                  )}
                  {details.experiments.perception.description && (
                    <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">{details.experiments.perception.description}</p>
                  )}
                  <ul className="space-y-2 text-sm text-body-color dark:text-body-color-dark">
                    {details.experiments.perception.items.map((item: any, i: number) => (
                      <li key={i}>
                        {item.no && <strong className="text-primary">{item.no}｜</strong>}
                        <strong>{item.name}：</strong>
                        {item.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Comprehensive Projects */}
              {details.experiments.comprehensiveProjects && (
                <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                  <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">{details.experiments.comprehensiveProjects.title}</h3>
                  {details.experiments.comprehensiveProjects.range && (
                    <div className="mb-2 text-xs text-body-color dark:text-body-color-dark">{details.experiments.comprehensiveProjects.range}</div>
                  )}
                  {details.experiments.comprehensiveProjects.description && (
                    <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">{details.experiments.comprehensiveProjects.description}</p>
                  )}
                  <ul className="space-y-2 text-sm text-body-color dark:text-body-color-dark">
                    {details.experiments.comprehensiveProjects.items.map((item: any, i: number) => (
                      <li key={i}>
                        {item.no && <strong className="text-primary">{item.no}｜</strong>}
                        <strong>{item.name}：</strong>
                        {item.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Extension Projects */}
            {details.experiments.extensionProjects && (
              <div className="mt-6">
                <div className="mb-4 rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                  <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">{details.experiments.extensionProjects.title}</h3>
                  {details.experiments.extensionProjects.range && (
                    <div className="mb-2 text-xs text-body-color dark:text-body-color-dark">{details.experiments.extensionProjects.range}</div>
                  )}
                  {details.experiments.extensionProjects.description && (
                    <p className="text-sm text-body-color dark:text-body-color-dark">{details.experiments.extensionProjects.description}</p>
                  )}
                </div>

                {details.experiments.extensionProjects.groups?.length ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {details.experiments.extensionProjects.groups.map((group: any, i: number) => (
                      <div key={i} className="rounded-lg border border-stroke bg-white p-5 dark:border-stroke-dark dark:bg-dark">
                        <h4 className="mb-3 text-base font-semibold text-black dark:text-white">{group.chassis}</h4>
                        <ul className="space-y-1.5 text-sm text-body-color dark:text-body-color-dark">
                          {group.projects.map((project: string, j: number) => (
                            <li key={j} className="flex items-start">
                              <span className="mr-2 text-primary">•</span>
                              <span>{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* Technical Specs */}
        {details.specs?.length ? (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{dict.products.detailLabels.specs}</h2>
            <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
              <ul className="list-disc pl-5 text-sm text-body-color dark:text-body-color-dark">
                {details.specs.map((spec: string, i: number) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {/* Common support resources */}
        {dict.products.supportResources && (
          <div className="mt-12 rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
            <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
              {dict.products.supportResources.title}
            </h3>
            <ul className="list-disc pl-5 text-sm text-body-color dark:text-body-color-dark">
              {dict.products.supportResources.items.map((it: string, i: number) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPage;
