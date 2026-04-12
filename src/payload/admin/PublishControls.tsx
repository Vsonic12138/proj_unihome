"use client";

import React, { useCallback } from "react";
import { useModal } from "@faceless-ui/modal";
import { toast } from "sonner";
import * as qs from "qs-esm";
import { formatAdminURL } from "payload/shared";
import {
  Button,
  ConfirmationModal,
  PublishButton,
  useConfig,
  useDocumentInfo,
  useForm,
  useTranslation,
} from "@payloadcms/ui";

/**
 * 让“下架 / 取消发布”按钮不再藏在下拉菜单里，直接显示在文档右上角操作区。
 *
 * 注意：为了避免重复渲染，本组件通常配合在 collection config 中把 `UnpublishButton` 设为 `false` 使用。
 */
export function PublishControls() {
  const { toggleModal } = useModal();
  const { config } = useConfig();
  const { reset: resetForm } = useForm();
  const { i18n, t } = useTranslation();

  const {
    id,
    collectionSlug,
    data: dataFromProps,
    globalSlug,
    hasPublishedDoc,
    hasPublishPermission,
    incrementVersionCount,
    isTrashed,
    setHasPublishedDoc,
    setMostRecentVersionIsAutosaved,
    setUnpublishedVersionCount,
  } = useDocumentInfo();

  const canUnpublish = Boolean(hasPublishPermission && hasPublishedDoc && !isTrashed && (globalSlug || (collectionSlug && id)));
  const unPublishModalSlug = `confirm-un-publish-inline-${String(collectionSlug ?? globalSlug ?? "doc")}-${String(id ?? "new")}`;

  const unpublishAllLocales = useCallback(async () => {
    if (!canUnpublish) return;

    const {
      routes: { api },
      serverURL,
    } = config;

    const queryString = qs.stringify(
      {
        depth: 0,
        "fallback-locale": "null",
        // 统一做“全站下架”：避免出现不同语言状态不一致导致的困惑
        locale: undefined,
        unpublishAllLocales: true,
      },
      { addQueryPrefix: true },
    );

    let url: string | undefined;
    let method: "PATCH" | "POST" | undefined;

    if (collectionSlug) {
      url = formatAdminURL({
        apiRoute: api,
        path: `/${collectionSlug}/${id}${queryString}`,
        serverURL,
      });
      method = "PATCH";
    }

    if (globalSlug) {
      url = formatAdminURL({
        apiRoute: api,
        path: `/globals/${globalSlug}${queryString}`,
        serverURL,
      });
      method = "POST";
    }

    if (!url || !method) return;

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Accept-Language": i18n.language,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _status: "draft" }),
      });

      if (res.status === 200) {
        await resetForm({
          ...(dataFromProps || {}),
          _status: "draft",
        });
        toast.success(t("version:unpublishedSuccessfully"));
        incrementVersionCount();
        setUnpublishedVersionCount(1);
        setMostRecentVersionIsAutosaved(false);
        setHasPublishedDoc(false);
        return;
      }

      try {
        const json = await res.json();
        if (json?.errors?.[0]?.message) {
          toast.error(json.errors[0].message);
        } else if (json?.error) {
          toast.error(json.error);
        } else {
          toast.error(t("error:unPublishingDocument"));
        }
      } catch {
        toast.error(t("error:unPublishingDocument"));
      }
    } catch {
      toast.error(t("error:unPublishingDocument"));
    }
  }, [
    canUnpublish,
    collectionSlug,
    config,
    dataFromProps,
    globalSlug,
    i18n.language,
    id,
    incrementVersionCount,
    resetForm,
    setHasPublishedDoc,
    setMostRecentVersionIsAutosaved,
    setUnpublishedVersionCount,
    t,
  ]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--base)" }}>
      <PublishButton />

      {canUnpublish && (
        <>
          <Button
            buttonStyle="secondary"
            size="medium"
            onClick={() => toggleModal(unPublishModalSlug)}
            tooltip={t("version:unpublish")}
            type="button"
          >
            {t("version:unpublish")}
          </Button>

          <ConfirmationModal
            body={t("version:aboutToUnpublish")}
            confirmingLabel={t("version:unpublishing")}
            heading={t("version:confirmUnpublish")}
            modalSlug={unPublishModalSlug}
            onConfirm={() => unpublishAllLocales()}
          />
        </>
      )}
    </div>
  );
}
