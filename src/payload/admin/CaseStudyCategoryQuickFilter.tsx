"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Button, useTranslation } from "@payloadcms/ui";
import type { AcceptedLanguages } from "@payloadcms/translations";

const ALL_VALUE = "__all__";

const CATEGORY_OPTIONS = {
  zh: [
    { value: "practical-teaching", label: "实训教学" },
    { value: "sci-tech-innovation", label: "科技创新" },
    { value: "innovation-competition", label: "创新竞赛" },
    { value: "training-base", label: "培训基地" },
  ],
  en: [
    { value: "practical-teaching", label: "Practical Teaching" },
    { value: "sci-tech-innovation", label: "Sci-Tech Innovation" },
    { value: "innovation-competition", label: "Innovation Competition" },
    { value: "training-base", label: "Training Base" },
  ],
  ja: [
    { value: "practical-teaching", label: "実践教育" },
    { value: "sci-tech-innovation", label: "科学技術革新" },
    { value: "innovation-competition", label: "イノベーションコンテスト" },
    { value: "training-base", label: "トレーニングベース" },
  ],
} as const;

const LABELS = {
  zh: {
    all: "全部",
    category: "分类:",
    manage: "管理分类页面",
  },
  en: {
    all: "All",
    category: "Category:",
    manage: "Manage category pages",
  },
  ja: {
    all: "すべて",
    category: "カテゴリ:",
    manage: "カテゴリーページ管理",
  },
} as const;

const CaseStudyCategoryQuickFilter = () => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState<string>(ALL_VALUE);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const language = ((i18n?.language ?? "zh") in LABELS ? i18n.language : "zh") as AcceptedLanguages & keyof typeof LABELS;
  const labels = LABELS[language];

  const options = useMemo(
    () => [{ value: ALL_VALUE, label: labels.all }, ...CATEGORY_OPTIONS[language]],
    [language, labels.all],
  );

  const applyFilter = useCallback(
    async (value: string) => {
      setSelected(value);
      const url = new URL(window.location.href);
      url.searchParams.delete("where[category][equals]");
      url.searchParams.set("page", "1");

      if (value !== ALL_VALUE) {
        url.searchParams.set("where[category][equals]", value);
      }

      window.location.assign(url.toString());
    },
    [],
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const category = url.searchParams.get("where[category][equals]");
    setSelected(category && CATEGORY_OPTIONS.zh.some((item) => item.value === category) ? category : ALL_VALUE);
  }, []);

  useEffect(() => {
    let attempts = 0;
    let targetEl: HTMLDivElement | null = null;

    const interval = setInterval(() => {
      attempts += 1;
      const h1 = document.querySelector("h1");
      if (h1 && h1.parentElement) {
        const container = h1.parentElement;

        if (!container.querySelector(".case-study-category-portal-target")) {
          targetEl = document.createElement("div");
          targetEl.className = "case-study-category-portal-target";
          targetEl.style.display = "flex";
          targetEl.style.alignItems = "center";
          targetEl.style.marginLeft = "1rem";
          container.appendChild(targetEl);
          setPortalTarget(targetEl);
        } else {
          setPortalTarget(container.querySelector(".case-study-category-portal-target") as HTMLElement);
        }

        clearInterval(interval);
      } else if (attempts > 30) {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (targetEl && targetEl.parentNode) {
        targetEl.parentNode.removeChild(targetEl);
      }
    };
  }, []);

  if (!portalTarget) return null;

  return createPortal(
    <div
      className="case-study-category-quick-filter-actions"
      style={{ display: "flex", alignItems: "center", gap: "0.75rem", whiteSpace: "nowrap" }}
    >
      <label
        htmlFor="case-study-category-quick-filter-select"
        style={{ margin: 0, fontWeight: "bold" }}
      >
        {labels.category}
      </label>
      <select
        id="case-study-category-quick-filter-select"
        value={selected}
        onChange={(event) => void applyFilter(event.target.value)}
        style={{ padding: "0.25rem 0.5rem", minWidth: "150px" }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Button
        buttonStyle="secondary"
        el="link"
        size="small"
        to="/admin/collections/pages?where[slug][contains]=case-studies-"
      >
        {labels.manage}
      </Button>
    </div>,
    portalTarget,
  );
};

export default CaseStudyCategoryQuickFilter;
export { CaseStudyCategoryQuickFilter };
