"use client";

import React from "react";

/**
 * 这个文件存在的目的：
 * - Payload 生成的 `src/app/(payload)/admin/importMap.js` 会引用 `@/payload/admin/GlobalAdminStyles`
 * - 如果该模块不存在，Next.js 在开发模式下会直接报 “Module not found”
 *
 * 这里不做任何渲染，仅作为一个“全局样式/扩展点”的占位组件。
 * 实际样式请优先通过 `payload.config.ts` 的 `admin.css`（例如 `custom-admin.css`）来注入。
 */
export default function GlobalAdminStyles() {
  return null;
}

