# 部署链路加固 TODO（问题 4 / 6 / 8）

状态：`PARTIALLY DONE`

更新时间：2026-04-18

关联方案：

- [部署链路加固方案（问题 4 / 6 / 8）](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/docs/plans/2026-04-18-deploy-hardening-plan.md)

---

## 一、文档与设计

- [x] 复核方案文档中的改动边界，确认本轮只处理问题 4 / 6 / 8
- [x] 明确问题 4 的 build-time 降级策略为“build-time 安全 fallback + 跳过 Payload 初始化”
- [x] 明确问题 6 的目标为“移除 `src/` 整体复制，runner 只保留最小运行产物”
- [x] 明确问题 8 的备份保留策略和建议调度频率，并写入文档

---

## 二、问题 4：去掉构建对数据库的依赖

- [x] 审计 `next build` 阶段哪些路径会触发 Payload 初始化
- [x] 识别 [src/lib/payload.ts](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/src/lib/payload.ts) 中需要 build-time 安全降级的逻辑
- [x] 调整 Payload 初始化逻辑，使无数据库环境下构建仍可成功
- [x] 更新 [ops/deploy/create-deploy-bundle.sh](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/ops/deploy/create-deploy-bundle.sh)，移除对真实 `DATABASE_URI` 的 build 依赖
- [x] 更新 [ops/docker/Dockerfile](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/ops/docker/Dockerfile)，避免把“构建必须连 DB”固化为默认路径
- [x] 在无数据库条件下验证 `docker build` 成功

---

## 三、问题 6：缩小运行镜像内容

- [x] 审计 Payload 运行时最小文件依赖集合
- [x] 识别当前为何必须复制 `payload.config.ts` 和 `src/`
- [x] 修改 [ops/docker/Dockerfile](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/ops/docker/Dockerfile)，移除 `src/` 整体复制
- [x] 收紧 runner 内容，只保留 `public/`、`.next/standalone`、`.next/static`
- [ ] 验证生产镜像仍能正常启动首页、产品页、`/admin`、`/api`
- [x] 检查最终镜像内容，确认不再额外复制 `src/`、`messages/`、`payload.config.ts`

---

## 四、问题 8：备份生产化

- [x] 设计统一的生产备份入口，支持 DB dump / 可选 media 备份
- [x] 在 `ops/deploy/` 中新增生产备份脚本 [backup.sh](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/ops/deploy/backup.sh)
- [x] 统一备份输出目录和命名规则
- [x] 在部署与容器文档中补充生产备份说明
- [x] 文档中写明建议 cron / systemd timer 调度方式
- [x] 文档中写明保留策略、失败处理建议和恢复步骤
- [ ] 在目标服务器环境手动执行一次备份入口，确认产物正确生成

---

## 五、验证

- [x] `npm run lint`
- [x] 无数据库条件下验证生产镜像构建
- [ ] 加载镜像并启动生产 compose
- [ ] 验证首页和产品页可访问
- [ ] 验证 `/admin` 和 `/api` 正常
- [ ] 验证备份产物可生成
- [ ] 至少完成一次最小恢复路径验证

---

## 六、完成标准

- [x] 问题 4：生产构建不再要求数据库可访问
- [x] 问题 6：运行镜像不再复制整个 `src/`
- [x] 问题 8：备份具备标准入口、调度建议和恢复文档
- [x] 文档与脚本保持一致，不留下过期说明

---

## 七、剩余收尾项

- [ ] 到目标服务器做一次真实 `compose` 启动验证
- [ ] 到目标服务器做一次真实备份演练
- [ ] 做一次最小恢复路径演练，确认文档可复现

---

## 八、下一轮候选问题

- [x] 问题 3：统一 schema 变更路径，收口到 migration 主流程
- [x] 问题 2：清理并归档 `scripts/payload/` 的一次性脚本，建立分层规则
- [ ] 问题 9：从 `deploy.prev` 升级为多版本 release 回滚
- [ ] 问题 10：把 HTTPS / 证书续期流程进一步声明式化
- [ ] 问题 1：拆分过大的 `SiteSettings`，降低 global 职责混杂

说明：

- 问题 2 已完成强清理：`scripts/payload/` 已按 `checks/`、`seed/`、`ops/`、`migrations/`、`dev/`、`lib/`、`archive/` 重组，并新增 [README](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/scripts/payload/README.md)
- 问题 3 已完成主流程收口：`payload.config.ts` 改为仅在 `PAYLOAD_SCHEMA_PUSH=true` 时允许 push，日常 schema 变更统一走 `cms:schema:*` migration 命令
