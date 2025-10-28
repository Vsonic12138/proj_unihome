import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import type { Dictionary } from "@/i18n/config";

type ContactContentProps = {
  pageCopy: Dictionary["pages"]["contact"];
  contactCopy: Dictionary["contact"];
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
