"use client";

import { useTranslation } from "@payloadcms/ui";
import type { AcceptedLanguages } from "@payloadcms/translations";
import type { ChangeEvent } from "react";

const LanguageSwitcher = () => {
  const { i18n, languageOptions, switchLanguage, t } = useTranslation();

  if (!languageOptions?.length || !switchLanguage) {
    return null;
  }

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = event.target.value as AcceptedLanguages;
    if (nextLanguage === i18n.language) return;
    await switchLanguage(nextLanguage);
  };

  const labelTextMap: Partial<Record<AcceptedLanguages, string>> = {
    zh: "语言",
    en: "Language",
    ja: "言語",
  } as const;
  const labelText = labelTextMap[i18n.language] ?? t("general:language");

  const languageLabels: Partial<Record<AcceptedLanguages, string>> = {
    zh: "中文",
    en: "English",
    ja: "日本語",
  } as const;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <label
        htmlFor="payload-admin-language-switcher"
        style={{ fontSize: "12px" }}
      >
        {labelText}
      </label>
      <select
        id="payload-admin-language-switcher"
        value={i18n.language}
        onChange={handleChange}
        aria-label={labelText}
        style={{
          padding: "4px 8px",
          borderRadius: "6px",
          border: "1px solid #e5e7eb",
          background: "white",
          fontSize: "12px",
        }}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {languageLabels[option.value as AcceptedLanguages] ?? option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
export { LanguageSwitcher };
