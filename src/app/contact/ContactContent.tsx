import { getTranslations } from 'next-intl/server';
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

type ContactContentProps = {
  pageCopy: any["contact"];
  contactCopy: any;
};

const ContactContent = ({
  pageCopy,
  contactCopy,
}: ContactContentProps) => {
  return (
    <>
      <Breadcrumb
        pageName={pageCopy.title}
        description={pageCopy.description}
      />
      <Contact copy={contactCopy} />
    </>
  );
};

export default ContactContent;
