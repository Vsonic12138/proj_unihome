import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from './routing';

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const resolvedLocale = locale ?? (await requestLocale);

  // Validate that the incoming `locale` parameter is valid
  if (!resolvedLocale || !locales.includes(resolvedLocale as Locale)) {
    notFound();
  }

  // Load all message modules for the locale
  const [
    common,
    home,
    products,
    developers,
    caseStudies,
    customSolutions,
    contact,
    pageIntro,
    detailLabels,
    pages,
    error,
    cases,
  ] = await Promise.all([
    import(`../../messages/${resolvedLocale}/common.json`),
    import(`../../messages/${resolvedLocale}/home.json`),
    import(`../../messages/${resolvedLocale}/products.json`),
    import(`../../messages/${resolvedLocale}/developers.json`),
    import(`../../messages/${resolvedLocale}/caseStudies.json`),
    import(`../../messages/${resolvedLocale}/customSolutions.json`),
    import(`../../messages/${resolvedLocale}/contact.json`),
    import(`../../messages/${resolvedLocale}/pageIntro.json`),
    import(`../../messages/${resolvedLocale}/detailLabels.json`),
    import(`../../messages/${resolvedLocale}/pages.json`),
    import(`../../messages/${resolvedLocale}/error.json`),
    import(`../../messages/${resolvedLocale}/cases.json`),
  ]);

  return {
    locale: resolvedLocale,
    messages: {
      ...common,
      ...home,
      ...products,
      ...developers,
      ...caseStudies,
      ...customSolutions,
      ...contact,
      ...pageIntro,
      ...detailLabels,
      ...pages,
      ...error,
      ...cases,
    },
  };
});
