import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import type { Dictionary, Locale } from "@/i18n/config";
import { withLocalePath } from "@/i18n/utils";

type AboutContentProps = {
  pageCopy: Dictionary["pages"]["about"];
  aboutCopy: Dictionary["about"];
  breadcrumbs: Dictionary["breadcrumbs"];
  locale: Locale;
};

const AboutContent = ({
  pageCopy,
  aboutCopy,
  breadcrumbs,
  locale,
}: AboutContentProps) => {
  return (
    <>
      <Breadcrumb
        pageName={pageCopy.title}
        description={pageCopy.description}
        homeLabel={breadcrumbs.home}
        homeHref={withLocalePath(locale, "/")}
      />
      <AboutSectionOne copy={aboutCopy.sectionOne} />
      <AboutSectionTwo items={aboutCopy.sectionTwo.items} />
    </>
  );
};

export default AboutContent;
