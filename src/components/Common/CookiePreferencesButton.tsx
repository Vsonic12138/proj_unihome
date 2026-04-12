"use client";

import { resetConsent } from "@/lib/cookieConsent";
import { useTranslations } from "next-intl";

const CookiePreferencesButton = () => {
  const t = useTranslations("footer.legal");

  const handleClick = () => {
    resetConsent();
    window.dispatchEvent(new CustomEvent("cookie-consent:open"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-sm text-body-color transition hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
    >
      {t("cookieSettings")}
    </button>
  );
};

export default CookiePreferencesButton;
