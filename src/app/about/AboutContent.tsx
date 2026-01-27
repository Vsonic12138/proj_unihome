import { getTranslations } from 'next-intl/server';
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

type AboutContentProps = {
  pageCopy: any["about"];
  aboutCopy: any;
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
      <AboutSectionTwo
        items={aboutCopy.sectionTwo.items}
        imageAlt={aboutCopy.sectionTwo.imageAlt}
      />
    </>
  );
};

export default AboutContent;
