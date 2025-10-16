import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import type { Dictionary, Locale } from "@/i18n/config";
import { withLocalePath } from "@/i18n/utils";

type ContactContentProps = {
  pageCopy: Dictionary["pages"]["contact"];
  contactCopy: Dictionary["contact"];
  breadcrumbs: Dictionary["breadcrumbs"];
  locale: Locale;
};

const ContactContent = ({
  pageCopy,
  contactCopy,
  breadcrumbs,
  locale,
}: ContactContentProps) => {
  return (
    <>
      <Breadcrumb
        pageName={pageCopy.title}
        description={pageCopy.description}
        homeLabel={breadcrumbs.home}
        homeHref={withLocalePath(locale, "/")}
      />
      <Contact copy={contactCopy} />
    </>
  );
};

export default ContactContent;
