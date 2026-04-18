# 部署链路加固 TODO（问题 4 / 6 / 8）

状态：`OPEN`

关联方案：

- [部署链路加固方案（问题 4 / 6 / 8）](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/docs/plans/2026-04-18-deploy-hardening-plan.md)

---

## 一、文档与设计

- [ ] 复核方案文档中的改动边界，确认本轮只处理问题 4 / 6 / 8
- [ ] 明确问题 4 的 build-time 降级策略是“安全 fallback”还是“改为动态获取”
- [ ] 明确问题 6 的目标是“完全移除 `src/`”还是“移除 `src/` 整体复制，允许最小必要文件残留”
- [ ] 明确问题 8 的备份保留策略和建议调度频率

---

## 二、问题 4：去掉构建对数据库的依赖

- [ ] 审计 `next build` 阶段哪些路径会触发 Payload 初始化
- [ ] 识别 [src/lib/payload.ts](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/src/lib/payload.ts) 中哪些逻辑需要 build-time 安全降级
- [ ] 调整 Payload 初始化逻辑，使无数据库环境下构建仍可成功
- [ ] 更新 [ops/deploy/create-deploy-bundle.sh](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/ops/deploy/create-deploy-bundle.sh)，移除对真实 `DATABASE_URI` 的 build 依赖
- [ ] 更新 [ops/docker/Dockerfile](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/ops/docker/Dockerfile)，避免把“构建必须连 DB”固化为默认路径
- [ ] 在无数据库条件下验证 `docker build` 成功

---

## 三、问题 6：缩小运行镜像内容

- [ ] 审计 Payload 运行时最小文件依赖集合
- [ ] 识别当前为何必须复制 `payload.config.ts` 和 `src/`
- [ ] 修改 [ops/docker/Dockerfile](/home/vsonic12138/workspace/Uni_Proj/proj_unihome/ops/docker/Dockerfile)，优先移除 `src/` 整体复制
- [ ] 如果无法一步到位，改成显式复制最小必要目录，而不是整个 `src/`
- [ ] 验证生产镜像仍能正常启动首页、产品页、`/admin`、`/api`
- [ ] 检查最终镜像内容，记录实际瘦身结果

---

## 四、问题 8：备份生产化

- [ ] 设计统一的生产备份入口，支持 DB dump / CMS snapshot / 可选 media 备份
- [ ] 在 `scripts/payload/` 中新增或整理生产备份脚本
- [ ] 统一备份输出目录和命名规则
- [ ] 在 `docs/deploy/` 或 `docs/containers/` 中补充生产备份文档
- [ ] 文档中写明建议 cron / systemd timer 调度方式
- [ ] 文档中写明保留策略、失败处理建议和恢复步骤
- [ ] 手动执行一次备份入口，确认产物正确生成

---

## 五、验证

- [ ] `npm run lint`
- [ ] 无数据库条件下验证生产镜像构建
- [ ] 加载镜像并启动生产 compose
- [ ] 验证首页和产品页可访问
- [ ] 验证 `/admin` 和 `/api` 正常
- [ ] 验证备份产物可生成
- [ ] 至少完成一次最小恢复路径验证

---

## 六、完成标准

- [ ] 问题 4：生产构建不再要求数据库可访问
- [ ] 问题 6：运行镜像不再复制整个 `src/`
- [ ] 问题 8：备份具备标准入口、调度建议和恢复文档
- [ ] 文档与脚本保持一致，不留下过期说明
