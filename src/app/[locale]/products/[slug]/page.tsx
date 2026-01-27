import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { notFound } from "next/navigation";
import Image from "next/image";
import ImageGridWithLightbox from "@/components/Products/ImageGridWithLightbox";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const t = await getTranslations({ locale });
    const products = t.raw('products') as any;
    const series = products.catalog.series as Array<{
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
  const t = await getTranslations({ locale });
  const products = t.raw('products') as any;
  const pages = t.raw('pages') as any;
  const details = (products.details as Record<string, any>)[slug];
  if (!details) return {};
  return {
    title: `${details.name} | ${pages.products.title}`,
    description: details.overview || pages.products.description,
  };
}

const ProductDetailsPage = async ({ params }: PageParams) => {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const products = t.raw('products') as any;
  const dict = { products };
  const details = (products.details as Record<string, any>)[slug];

  if (!details) return notFound();

  const sampleCases = details.sampleCases ?? null;
  const sampleCustomSections = Array.isArray(sampleCases?.sections) ? sampleCases.sections : null;
  const modulesGridClassName =
    sampleCases?.modulesGridClassName ?? "grid-cols-2 sm:grid-cols-3 md:grid-cols-6";
  const modulesImageAspectClass = sampleCases?.modulesImageAspectClass ?? "aspect-square";
  const modulesCardClassName = sampleCases?.modulesCardClassName ?? "";
  const compositeRobotsGridClassName =
    sampleCases?.compositeRobotsGridClassName ?? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
  const compositeRobotsImageAspectClass =
    sampleCases?.compositeRobotsImageAspectClass ?? "aspect-square";
  const compositeRobotsCardClassName = sampleCases?.compositeRobotsCardClassName ?? "";
  const softwareConfig = details.softwareConfig ?? null;
  const softwareImageGridClassName =
    softwareConfig?.imageGridClassName ?? "grid grid-cols-1 gap-4 sm:grid-cols-2";
  const softwareFigureClassName =
    softwareConfig?.figureClassName ??
    "overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800";
  const softwareImageWrapperClass =
    softwareConfig?.imageWrapperClassName ?? "relative aspect-[16/10] w-full";
  const softwareShowCaptions = softwareConfig?.showCaptions ?? true;

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
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{(dict.products.detailLabels as any).features}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {details.features.map((feature: any, i: number) => {
                const featureMedia = Array.isArray(feature.media) ? feature.media : null;
                const featureMediaGrid =
                  feature.mediaGridClassName ?? "grid-cols-1 sm:grid-cols-2 gap-4";
                const featureMediaAspect = feature.mediaImageAspectClass ?? "aspect-[4/3]";
                const featureMediaCard = feature.mediaCardClassName ?? "w-full";
                return (
                  <div key={i} className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                    <h4 className="mb-3 text-lg font-semibold text-black dark:text-white">{feature.title}</h4>
                    {feature.content && (
                      <p className="text-sm text-body-color dark:text-body-color-dark">{feature.content}</p>
                    )}
                    {featureMedia && featureMedia.length ? (
                      <div className="mt-4">
                        <ImageGridWithLightbox
                          items={featureMedia}
                          gridClassName={featureMediaGrid}
                          imageAspectClass={featureMediaAspect}
                          cardClassName={featureMediaCard}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Sample Cases */}
        {sampleCases && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{(dict.products.detailLabels as any).sampleCases}</h2>
            <p className="mb-8 text-base text-body-color dark:text-body-color-dark">{sampleCases.description}</p>

            {sampleCustomSections
              ? sampleCustomSections.map(
                  (
                    section: {
                      title?: string;
                      items?: any[];
                      gridClassName?: string;
                      imageAspectClass?: string;
                      cardClassName?: string;
                    },
                    idx: number,
                  ) => {
                    const sectionGrid =
                      section.gridClassName ?? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
                    const sectionAspect = section.imageAspectClass ?? "aspect-square";
                    const sectionCard = section.cardClassName ?? "";
                    if (!section.items?.length) return null;
                    return (
                      <div key={idx} className="mb-8">
                        {section.title ? (
                          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                            {section.title}
                          </h3>
                        ) : null}
                        <ImageGridWithLightbox
                          items={section.items}
                          gridClassName={sectionGrid}
                          imageAspectClass={sectionAspect}
                          cardClassName={sectionCard}
                        />
                      </div>
                    );
                  },
                )
              : null}

            {!sampleCustomSections && (
              <>
                {/* Modules */}
                {sampleCases.modules?.length ? (
                  <div className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                      {(dict.products.detailLabels as any).modules}
                      {sampleCases.modules.length ? `（${sampleCases.modules.length}种）` : null}
                    </h3>
                    <ImageGridWithLightbox
                      items={sampleCases.modules}
                      gridClassName={modulesGridClassName}
                      imageAspectClass={modulesImageAspectClass}
                      cardClassName={modulesCardClassName}
                    />
                  </div>
                ) : null}

                {/* Chassis */}
                {sampleCases.chassis?.length ? (
                  <div className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                      {(dict.products.detailLabels as any).chassis}
                      {sampleCases.chassis.length ? `（${sampleCases.chassis.length}种）` : null}
                    </h3>
                    <ImageGridWithLightbox
                      items={sampleCases.chassis}
                      gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                      imageAspectClass="aspect-square"
                    />
                  </div>
                ) : null}

                {/* Arms */}
                {sampleCases.arms?.length ? (
                  <div className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                      {(dict.products.detailLabels as any).arms}
                      {sampleCases.arms.length ? `（${sampleCases.arms.length}种）` : null}
                    </h3>
                    <ImageGridWithLightbox
                      items={sampleCases.arms}
                      gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                      imageAspectClass="aspect-square"
                    />
                  </div>
                ) : null}

                {/* Composite Robots */}
                {sampleCases.compositeRobots?.length ? (
                  <div className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                      {(dict.products.detailLabels as any).compositeRobots}
                      {sampleCases.compositeRobots.length ? `（${sampleCases.compositeRobots.length}种）` : null}
                    </h3>
                    <ImageGridWithLightbox
                      items={sampleCases.compositeRobots}
                      gridClassName={compositeRobotsGridClassName}
                      imageAspectClass={compositeRobotsImageAspectClass}
                      cardClassName={compositeRobotsCardClassName}
                    />
                  </div>
                ) : null}

                {sampleCases.compositeGroups?.length ? (
                  <div className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                      {(dict.products.detailLabels as any).compositeRobots}
                    </h3>
                    <div className="space-y-4">
                      {sampleCases.compositeGroups.map((group: any, i: number) => (
                        <div key={i} className="rounded-lg border border-stroke bg-white p-5 dark:border-stroke-dark dark:bg-dark">
                          <h4 className="mb-2 text-base font-semibold text-black dark:text-white">{group.title}</h4>
                          {group.robots?.length ? (
                            <ul className="space-y-1.5 text-sm text-body-color dark:text-body-color-dark">
                              {group.robots.map((robot: string, idx: number) => (
                                <li key={idx} className="flex items-start">
                                  <span className="mr-2 text-primary">•</span>
                                  <span>{robot}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}

        {/* Configuration Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{(dict.products.detailLabels as any).configuration}</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Sensor Config */}
            {details.sensorConfig && (
              <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{(dict.products.detailLabels as any).sensorConfig}</h3>
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
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{(dict.products.detailLabels as any).controllerConfig}</h3>
                <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">{details.controllerConfig.description}</p>
                {details.controllerConfig.images?.length ? (
                  <div className="mt-4 grid grid-cols-1 place-items-center">
                    {details.controllerConfig.images.map((img: any, i: number) => (
                      <figure
                        key={i}
                        className="w-full max-w-md overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={img.src}
                            alt={img.alt || ""}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 600px"
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
            {softwareConfig && (
              <div className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{(dict.products.detailLabels as any).softwareConfig}</h3>
                <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">{softwareConfig.description}</p>
                {softwareConfig.ecosystem && (
                  <p className="text-sm text-body-color dark:text-body-color-dark">{softwareConfig.ecosystem}</p>
                )}
                {softwareConfig.images?.length ? (
                  <div className={`mt-4 ${softwareImageGridClassName}`}>
                    {softwareConfig.images.map((img: any, i: number) => (
                      <figure
                        key={i}
                        className={`${softwareFigureClassName} ${img.figureClassName ?? ""}`.trim()}
                      >
                        <div className={`${softwareImageWrapperClass} ${img.wrapperClassName ?? ""}`.trim()}>
                          <Image
                            src={img.src}
                            alt={img.alt || ""}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                        </div>
                        {softwareShowCaptions && img.caption ? (
                          <figcaption className="px-3 py-2 text-center text-xs text-body-color dark:text-body-color-dark">
                            {img.caption}
                          </figcaption>
                        ) : null}
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

            {details.experiments.summary && (
              <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-6 dark:border-primary/30 dark:bg-primary/10">
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">{details.experiments.summary}</p>
              </div>
            )}

            {Array.isArray((details.experiments as any).sections) ? (
              <div className="space-y-6">
                {(details.experiments as any).sections.map((section: any, i: number) => (
                  <div key={i} className="rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
                    <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{section.title}</h3>
                    {section.description && (
                      <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">{section.description}</p>
                    )}
                    {section.items?.length ? (
                      <ul className="space-y-2 text-sm text-body-color dark:text-body-color-dark">
                        {section.items.map((item: any, idx: number) => (
                          <li key={idx}>
                            <strong>{item.name}</strong>
                            {item.desc ? <>：{item.desc}</> : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}

        {/* Technical Specs */}
        {details.specs?.length ? (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">{(dict.products.detailLabels as any).specs}</h2>
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
