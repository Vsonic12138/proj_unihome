import { getDictionary, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Image from "next/image";
import SectionTitle from "@/components/Common/SectionTitle";
import type { Metadata } from "next";

type PageParams = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    const dict = await getDictionary(locale);
    const items = dict.products.catalog.items as Array<{ slug: string }>;
    items.forEach(({ slug }) => params.push({ locale, slug }));
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <Image
              src={details.image}
              alt={details.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div>
            <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">{details.name}</h1>
            {details.model && (
              <div className="mb-4 text-sm text-body-color dark:text-body-color-dark">{details.model}</div>
            )}
            {details.overview && (
              <p className="mb-6 text-body-color dark:text-body-color-dark">{details.overview}</p>
            )}

            {details.highlights?.length ? (
              <div className="mb-6">
                <SectionTitle title={dict.products.detailLabels.highlights} paragraph="" />
                <ul className="mt-2 list-disc pl-5 text-sm text-body-color dark:text-body-color-dark">
                  {details.highlights.map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {details.applicable && (
              <div className="mb-6">
                <SectionTitle title={dict.products.detailLabels.applicable} paragraph="" />
                <p className="mt-2 text-sm text-body-color dark:text-body-color-dark">{details.applicable}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{dict.products.detailLabels.experiments}</h3>
            <ul className="list-disc pl-5 text-sm text-body-color dark:text-body-color-dark">
              {(details.experiments || [dict.products.detailLabels.comingSoon]).map((it: string, i: number) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{dict.products.detailLabels.configuration}</h3>
            <ul className="list-disc pl-5 text-sm text-body-color dark:text-body-color-dark">
              {(details.configuration || [dict.products.detailLabels.comingSoon]).map((it: string, i: number) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{dict.products.detailLabels.specs}</h3>
            <ul className="list-disc pl-5 text-sm text-body-color dark:text-body-color-dark">
              {(details.specs || [dict.products.detailLabels.comingSoon]).map((it: string, i: number) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common support resources */}
        {dict.products.supportResources && (
          <div className="mt-12 rounded-lg border border-stroke p-6 dark:border-stroke-dark">
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
