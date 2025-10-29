import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import type { Dictionary } from "@/i18n/config";

type AboutContentProps = {
  pageCopy: Dictionary["pages"]["about"];
  aboutCopy: Dictionary["about"];
};

const AboutContent = ({
  pageCopy,
  aboutCopy,
}: AboutContentProps) => {
  return (
    <>
      <Breadcrumb
        pageName={pageCopy.title}
        description={pageCopy.description}
      />
      <AboutSectionOne sectionOne={aboutCopy.sectionOne} />
      <AboutSectionTwo items={aboutCopy.sectionTwo.items} />
    </>
  );
};

export default AboutContent;
