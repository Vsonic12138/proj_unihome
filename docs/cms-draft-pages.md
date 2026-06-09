# CMS 草稿页面记录

更新时间：2026-06-09

本文记录当前应保持为草稿的 Payload `pages` 页面。草稿页不应作为正式前台入口发布；如需重新启用，应先确认页面内容、导航入口、SEO 文案和三语字段。

## 当前草稿页

| Slug | 中文标题 | 英文标题 | 日文标题 | 状态 | 说明 |
| --- | --- | --- | --- | --- | --- |
| `developers` | 学习资源 | Learning Resources | 学習リソース | draft | 历史总览页。页眉“学习资源”作为下拉菜单使用，父级不作为可点击入口；正式入口为 `developers/knowledge-base` 和 `developers/open-source`。 |
| `case-studies` | 服务案例 | Service Cases | サービス事例 | draft | 案例总览占位页。当前正式入口为各案例分类页。 |
| `case-studies-co-research` | 共研案例 | Joint Research | 共同研究 | draft | 预留分类页，内容未正式上线。 |
| `case-studies-k12` | K12案例 | K12 Education | K12事例 | draft | 预留分类页，内容未正式上线。 |
| `case-studies-universities` | 高校案例 | University Programs | 大学事例 | draft | 预留分类页，内容未正式上线。 |

## 已发布的相关入口

以下页面仍应保持发布状态：

| Slug | 前台路径示例 | 说明 |
| --- | --- | --- |
| `developers-knowledge-base` | `/zh/developers/knowledge-base` | 学习资源下的知识库入口。 |
| `developers-open-source` | `/zh/developers/open-source` | 学习资源下的开源项目入口。 |
| `case-studies-practical-teaching` | `/zh/case-studies/practical-teaching` | 实训教学案例入口。 |
| `case-studies-sci-tech-innovation` | `/zh/case-studies/sci-tech-innovation` | 科技创新案例入口。 |
| `case-studies-innovation-competition` | `/zh/case-studies/innovation-competition` | 创新竞赛案例入口。 |
| `case-studies-training-base` | `/zh/case-studies/training-base` | 培训基地案例入口。 |

## 维护规则

- 不要通过 `cms:publish:all` 或手工发布误发布上述草稿页。
- 如果确实需要启用某个草稿页，先补齐三语内容，并确认页眉、页脚或站内链接是否应该新增入口。
- 若页面确认长期废弃，可以后续考虑删除 CMS 页面和对应代码路由；当前仅保留为草稿，避免误删历史内容。

## 检查命令

可用以下命令核对当前草稿页：

```bash
node --env-file=.env --import tsx/esm -e '
import { getPayload } from "payload";
import config from "./payload.config.ts";
if (config?.db) config.db.push = false;
const payload = await getPayload({ config });
for (const locale of ["zh", "en", "ja"]) {
  const res = await payload.find({
    collection: "pages",
    locale,
    draft: true,
    depth: 0,
    limit: 1000,
    where: { _status: { equals: "draft" } },
    overrideAccess: true,
    sort: "slug",
  });
  console.log("\\n== " + locale + " ==");
  for (const doc of res.docs) {
    console.log(`${doc.slug}\\t${doc.title}\\t${doc._status}`);
  }
}
await Promise.race([
  payload.db?.destroy?.(),
  new Promise((resolve) => setTimeout(resolve, 1000)),
]);
process.exit(0);
'
```

