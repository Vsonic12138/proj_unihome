"use client";

import { useLocale, useTranslation } from "@payloadcms/ui";
import { useEffect } from "react";

const SetAdminI18nAttributes = () => {
  const locale = useLocale();
  const { i18n } = useTranslation();

  useEffect(() => {
    const root = document.documentElement;

    // For styling hooks (CSS-only i18n), e.g. preview button label
    if (locale?.code) {
      root.dataset.payloadLocale = String(locale.code);
    } else {
      delete (root.dataset as any).payloadLocale;
    }

    if (i18n?.language) {
      root.dataset.payloadLanguage = String(i18n.language);
    } else {
      delete (root.dataset as any).payloadLanguage;
    }
  }, [i18n?.language, locale?.code]);

  return null;
};

export default SetAdminI18nAttributes;
export { SetAdminI18nAttributes };

