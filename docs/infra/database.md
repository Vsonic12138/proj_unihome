# 数据库使用指南（PostgreSQL）

状态：`ACTIVE`（最近审查：2026-04-15）

## 架构总结

本项目使用 **PostgreSQL**（Payload `@payloadcms/db-postgres`）。应用层并不强制要求 Docker Desktop；只要提供可连接的 `DATABASE_URI`/`DATABASE_URL` 即可连接任意 Postgres（本机安装、Docker 容器、远程云数据库均可）。

不过，仓库内的部分脚本（尤其是备份与部署包生成）默认以“Docker 容器方式”操作数据库，因此推荐本地开发使用 Docker 方式启动 Postgres。

```text
[Next.js / Payload CMS]  (WSL2 进程)
        ↓  DATABASE_URI (localhost:5432)
[Docker Desktop 容器 proj_unihome_postgres]
        ↓  Volume 挂载
[持久数据卷 proj_unihome_postgres_data]
```

| 项目 | 值 |
|---|---|
| 容器名 | `proj_unihome_postgres` |
| 镜像 | `postgres:16` |
| 主机端口 | `5432` |
| 数据库名 | `proj_unihome` |
| 用户名 | `proj_unihome` |
| 密码 | `proj_unihome_password`（见 `.env`） |
| 数据持久化卷 | `proj_unihome_postgres_data` |

> WSL2 本机仅安装了 `postgresql-client`（psql 命令行工具），**没有**本机 PostgreSQL Server 运行。

## 本地推荐方式：Docker 启动 Postgres

本仓库提供 `ops/docker/compose.dev.yml` 作为本地开发数据库启动方式：

```bash
npm run docker:up:dev:db
```

这会启动固定容器名 `proj_unihome_postgres`，并与 `npm run backup:all` 等脚本默认配置一致。

## 生产/远程数据库是否支持？

支持。只要在运行环境中设置：

- `DATABASE_URI` 或 `DATABASE_URL`

Payload 即可连接对应 Postgres。

注意：`npm run backup:all` 脚本当前实现依赖 `docker exec` 进入容器执行 `pg_dump`，若使用远程数据库，需要将备份流程改为使用本机/CI 的 `pg_dump` 直连方式（或另写脚本）。

---

## 查询方式一：通过 Payload API（推荐）

最直接、最安全的方式。不需要 SQL 知识。

```bash
# 查询某个产品（需要 Next.js dev server 正在运行）
curl "http://localhost:3000/api/products?locale=zh&where[slug][equals]=rai-m4" | jq .

# 查询所有产品列表
curl "http://localhost:3000/api/products?locale=zh&limit=100" | jq '.docs[] | {slug,name}'

# 查询媒体文件列表
curl "http://localhost:3000/api/media?limit=50" | jq '.docs[] | {id, filename}'
```

> `jq` 可选，用于格式化 JSON 输出。未安装时去掉 `| jq .` 即可。

---

## 查询方式二：通过 Node.js + `pg` 客户端直连

适合脚本批量操作，不依赖 Next.js 服务是否运行。

```bash
# 格式（在项目根目录运行）
node -e "
require('dotenv').config();
const {Client} = require('pg');
const c = new Client({connectionString: process.env.DATABASE_URI});
c.connect()
  .then(() => c.query('SELECT id, slug FROM products ORDER BY slug;'))
  .then(r => console.log(r.rows))
  .catch(console.error)
  .finally(() => c.end());
"
```

**常用查询片段：**

```js
// 列出所有产品
c.query('SELECT id, slug FROM products ORDER BY slug;')

// 查询产品的 sampleCases sections 数量
c.query(`
  SELECT p.slug, COUNT(s.id) as section_count
  FROM products p
  LEFT JOIN products_details_sample_cases_sections s ON s._parent_id = p.id
  GROUP BY p.slug ORDER BY p.slug;
`)

// 列出媒体库文件
c.query('SELECT id, filename, url FROM media ORDER BY created_at DESC LIMIT 20;')

// 列出所有表
c.query(`
  SELECT table_name FROM information_schema.tables 
  WHERE table_schema = 'public' ORDER BY table_name;
`)
```

---

## 查询方式三：通过 psql 客户端（命令行交互）

WSL2 本机已安装 `psql` 客户端，可直接连接 Docker 容器中的数据库。

**注意**：不要用 `docker exec ... psql`，**直接用宿主机 psql 连接** 才能访问到数据：

```bash
# 连接数据库（从 WSL2 终端直接执行）
psql postgresql://proj_unihome:proj_unihome_password@localhost:5432/proj_unihome
```

连接后可使用标准 psql 命令：

```sql
-- 列出所有表
\dt

-- 查询产品
SELECT id, slug FROM products;

-- 查询 sampleCases sections
SELECT * FROM products_details_sample_cases_sections LIMIT 10;

-- 退出
\q
```

---

## 查询方式四：Payload CMS Admin 后台

无需代码，可视化编辑。

访问地址（需要 `npm run dev` 运行中）：

```
http://localhost:3000/admin
```

在后台可以直接：
- 浏览和编辑所有产品、媒体、页面数据
- 查看 `sampleCases.sections`、`experiments` 等字段的实际内容
- 上传图片到媒体库并关联到产品

---

## 常见问题

### Q: `docker exec ... psql` 报 "role does not exist"？

原因：Docker 容器内部 `psql` 默认以 `root` 身份登录，但数据库用户名是 `proj_unihome`。

**正确做法**：直接从 WSL2 主机用 `psql` 命令连接，不要 `docker exec`：
```bash
psql postgresql://proj_unihome:proj_unihome_password@localhost:5432/proj_unihome
```

### Q: 表名是什么？

Payload CMS 将 Collection 和嵌套数组展开为多张关系表，命名规则是 `{collection}_{field_path}`：

| 逻辑路径 | 实际表名 |
|---|---|
| `products` | `products` |
| `products.details.features[]` | `products_details_features` |
| `products.details.sampleCases.sections[]` | `products_details_sample_cases_sections` |
| `products.details.sampleCases.sections[].items[]` | `products_details_sample_cases_sections_items` |
| `media` | `media` |

### Q: 数据库数据会丢失吗？

不会，只要 Docker volume `proj_unihome_postgres_data` 不被手动删除。数据独立于容器生命周期，重启容器/Docker Desktop 均不影响数据。

推荐备份方式：

```bash
npm run backup:all
```

手动备份数据库（容器化 Postgres 场景，导出为压缩后的自定义格式 dump）：

```bash
mkdir -p backups
docker exec proj_unihome_postgres pg_dump -U proj_unihome -d proj_unihome -Fc \
  | gzip > backups/db_backup_$(date +%Y%m%d_%H%M%S).dump.gz
```
