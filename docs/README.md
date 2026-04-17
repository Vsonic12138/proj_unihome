# 文档索引

本目录用于存放项目的详细说明文档。根目录 `README.md` 保持简洁，只提供最小上手与入口链接。

> 约定：本文档仅维护“入口与状态”。每篇文档首段会标注状态：
> - `ACTIVE`：当前有效，按此文档操作不会与仓库现状冲突
> - `OPTIONAL`：可选方案/特定场景才需要
> - `DRAFT`：计划草案，仅用于讨论，不保证与代码一致
> - `ARCHIVED`：历史方案或过时记录，仅保留备查
>
> 最近审查：2026-04-15

## 部署与运维

| 文档 | 状态 | 说明 |
|------|------|------|
| `deploy/docker-production.md` | `ACTIVE` | 通用 Docker 生产部署结构与部署包 init/update 概念 |
| `deploy/aliyun-ecs.md` | `ACTIVE` | 阿里云 ECS 一键 bootstrap + 发布（推荐路径） |
| `deploy/aliyun-direct-mail.md` | `ACTIVE` | 阿里云 Direct Mail（SMTP）接入官网工单通知邮件 |
| `deploy/cloudflare-tunnel.md` | `OPTIONAL` | 仅在使用 Cloudflare Tunnel 暴露服务时需要 |
| `deploy/gcp-migration.md` | `ARCHIVED` | 历史 GCP 迁移记录，含大量环境特定内容，已不再维护 |

## 容器与数据库

| 文档 | 状态 | 说明 |
|------|------|------|
| `containers/docker.md` | `ACTIVE` | Docker/Docker Desktop 说明（本地开发与部署包构建依赖） |
| `infra/database.md` | `ACTIVE` | PostgreSQL 使用指南（连接方式、脚本约束、备份建议） |

## 环境变量模板

| 文件 | 状态 | 说明 |
|------|------|------|
| `../ops/env/.env.local.mailpit.example` | `ACTIVE` | 本地开发示例：Postgres + Mailpit SMTP |
| `../ops/env/.env.production.example` | `ACTIVE` | 生产环境示例：域名、Turnstile、正式邮件通知 |

## CMS（Payload）

| 文档 | 状态 | 说明 |
|------|------|------|
| `cms/rebuild-status.md` | `ACTIVE` | Payload CMS v3 重构落地状态（偏“事实记录”） |
| `cms/todo.md` | `ACTIVE` | Payload CMS 后续待办（勾选推进） |
| `cms/ticket-submission.md` | `ACTIVE` | 官网工单提交流程、邮件 Webhook 与防刷策略说明 |

## 合规

| 文档 | 状态 | 说明 |
|------|------|------|
| `legal/cookie-compliance.md` | `ACTIVE` | Cookie 合规与实现现状（可对照代码） |

## 方案与计划

| 文档 | 状态 | 说明 |
|------|------|------|
| `plans/product-page-refactor.md` | `DRAFT` | 产品页重构方案草案（V1） |
| `plans/product-page-refactor-v2.md` | `DRAFT` | 产品页重构方案草案（V2） |
