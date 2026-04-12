"use client";

import { Button, useTranslation } from "@payloadcms/ui";
import type { AcceptedLanguages } from "@payloadcms/translations";
import { createPortal } from "react-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";

type MediaFolderDoc = {
  id: number | string;
  name?: string | null;
  slug?: string | null;
  sortOrder?: number | null;
  parent?: number | string | null;
};

type MediaFoldersAPIResponse = {
  docs?: MediaFolderDoc[];
};

const ALL_VALUE = "__all__";
const UNCATEGORIZED_VALUE = "__uncategorized__";

function toId(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

function buildDescendantMap(folders: MediaFolderDoc[]) {
  const childrenByParentId = new Map<string, MediaFolderDoc[]>();

  for (const folder of folders) {
    const parentId = toId(folder.parent);
    const list = childrenByParentId.get(parentId) ?? [];
    list.push(folder);
    childrenByParentId.set(parentId, list);
  }

  for (const [key, children] of childrenByParentId.entries()) {
    children.sort((a, b) => {
      const ao = a.sortOrder ?? 0;
      const bo = b.sortOrder ?? 0;
      if (ao !== bo) return ao - bo;
      return String(a.name ?? "").localeCompare(String(b.name ?? ""));
    });
    childrenByParentId.set(key, children);
  }

  const descendantIdsById = new Map<string, string[]>();

  const computeDescendants = (id: string): string[] => {
    if (descendantIdsById.has(id)) return descendantIdsById.get(id)!;
    const directChildren = childrenByParentId.get(id) ?? [];
    const all: string[] = [];
    for (const child of directChildren) {
      const childId = toId(child.id);
      if (!childId) continue;
      all.push(childId);
      all.push(...computeDescendants(childId));
    }
    descendantIdsById.set(id, all);
    return all;
  };

  return { childrenByParentId, computeDescendants };
}

function flattenFolders(args: { folders: MediaFolderDoc[] }) {
  const { folders } = args;
  const { childrenByParentId } = buildDescendantMap(folders);
  const result: Array<{ id: string; label: string }> = [];

  const walk = (parentId: string, depth: number) => {
    const children = childrenByParentId.get(parentId) ?? [];
    for (const child of children) {
      const id = toId(child.id);
      if (!id) continue;
      const prefix = depth > 0 ? `${"— ".repeat(depth)}` : "";
      result.push({ id, label: `${prefix}${child.name ?? child.slug ?? id}` });
      walk(id, depth + 1);
    }
  };

  walk("", 0);
  return result;
}

const MediaFolderQuickFilter = () => {
  const { i18n } = useTranslation();

  const [selected, setSelected] = useState<string>(ALL_VALUE);
  const [folders, setFolders] = useState<MediaFolderDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const language = (i18n?.language ?? "zh") as AcceptedLanguages;

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setLoadError(null);

    fetch(
      `/api/mediaFolders?limit=1000&depth=0&sort=sortOrder&locale=${encodeURIComponent(language)}`,
      { credentials: "include" },
    )
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to load mediaFolders: ${res.status}`);
        }
        return (await res.json()) as MediaFoldersAPIResponse;
      })
      .then((data) => {
        if (cancelled) return;
        setFolders(Array.isArray(data.docs) ? data.docs : []);
      })
      .catch((error) => {
        if (cancelled) return;
        setLoadError(error instanceof Error ? error.message : String(error));
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [language]);

  const { computeDescendants } = useMemo(() => buildDescendantMap(folders), [folders]);

  const options = useMemo(() => {
    const flattened = flattenFolders({ folders });
    return [
      { id: ALL_VALUE, label: language === "en" ? "All" : language === "ja" ? "すべて" : "全部" },
      {
        id: UNCATEGORIZED_VALUE,
        label: language === "en" ? "Uncategorized" : language === "ja" ? "未分類" : "未分类",
      },
      ...flattened.map((f) => ({ id: f.id, label: f.label })),
    ];
  }, [folders, language]);

  const applyFilter = useCallback(
    async (value: string) => {
      setSelected(value);
      const url = new URL(window.location.href);

      url.searchParams.set("page", "1");
      Array.from(url.searchParams.keys()).forEach((key) => {
        if (key.startsWith("where[folder]")) {
          url.searchParams.delete(key);
        }
      });

      if (value === ALL_VALUE) {
        window.location.assign(url.toString());
        return;
      }

      if (value === UNCATEGORIZED_VALUE) {
        url.searchParams.set("where[folder][exists]", "false");
        window.location.assign(url.toString());
        return;
      }

      const descendantIds = computeDescendants(value);
      const ids = [value, ...descendantIds].filter(Boolean);

      ids.forEach((id, index) => {
        url.searchParams.set(`where[folder][in][${index}]`, id);
      });

      window.location.assign(url.toString());
    },
    [computeDescendants],
  );

  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const uncategorized = url.searchParams.get("where[folder][exists]");
    if (uncategorized === "false") {
      setSelected(UNCATEGORIZED_VALUE);
      return;
    }

    const folderIds = Array.from(url.searchParams.entries())
      .filter(([key]) => key.startsWith("where[folder][in]["))
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([, value]) => value)
      .filter(Boolean);

    if (folderIds.length > 0) {
      setSelected(folderIds[0]);
      return;
    }

    setSelected(ALL_VALUE);
  }, []);

  useEffect(() => {
    let attempts = 0;
    let targetEl: HTMLDivElement | null = null;
    
    // 尝试寻找页面上的 <h1> 所在的头部行。
    // 在 Payload v3 的 List 页面中，标题（媒体）和按钮在同一个包裹行容器内。
    const interval = setInterval(() => {
      attempts++;
      const h1 = document.querySelector('h1');
      if (h1 && h1.parentElement) {
        // 由于这可能有其它页面，如果这是一个媒体库，h1父容器通常是顶排容器
        // 我们给 h1.parentElement 加一个 flex=1 的结尾子容器用于挂载我们的插件
        const container = h1.parentElement;
        
        // 避免重复挂载
        if (!container.querySelector('.media-folder-portal-target')) {
          targetEl = document.createElement('div');
          targetEl.className = "media-folder-portal-target";
          targetEl.style.display = "flex";
          targetEl.style.alignItems = "center";
          targetEl.style.marginLeft = "1rem"; // 和批量上传拉开距离
          
          // 如果 container 是 flex 布局，这就成了同行的一个右侧块
          container.appendChild(targetEl);
          setPortalTarget(targetEl);
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

  const content = (
    <div 
      className="media-folder-quick-filter-actions"
      style={{ display: "flex", alignItems: "center", gap: "0.75rem", whiteSpace: "nowrap" }}
    >
      <label
        htmlFor="media-folder-quick-filter-select"
        className="media-folder-quick-filter-actions__label"
        style={{ margin: 0, fontWeight: "bold" }}
      >
        {language === "en" ? "Folder :" : language === "ja" ? "分類:" : "分类:"}
      </label>
      <select
        id="media-folder-quick-filter-select"
        className="media-folder-quick-filter-actions__select"
        value={selected}
        onChange={(e) => void applyFilter(e.target.value)}
        disabled={isLoading}
        style={{ padding: "0.25rem 0.5rem", minWidth: "120px" }}
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      {isLoading ? (
        <span className="media-folder-quick-filter-actions__hint">
          {language === "en"
            ? "Loading..."
            : language === "ja"
              ? "読み込み中..."
              : "加载中..."}
        </span>
      ) : null}
      {loadError ? (
        <span className="media-folder-quick-filter-actions__error" title={loadError}>
          {language === "en" ? "Load failed" : language === "ja" ? "読み込み失敗" : "加载失败"}
        </span>
      ) : null}

      <Button
        buttonStyle="secondary"
        el="link"
        size="small"
        to="/admin/collections/mediaFolders"
      >
        {language === "en" ? "Manage folders" : language === "ja" ? "分類を管理" : "管理分类"}
      </Button>
    </div>
  );

  if (!portalTarget) {
    return null;
  }

  return createPortal(content, portalTarget);
};

export default MediaFolderQuickFilter;
export { MediaFolderQuickFilter };
