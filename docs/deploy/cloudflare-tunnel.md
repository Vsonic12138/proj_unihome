# Cloudflare Tunnel 配置指南

本文档用于说明在 Cloudflare Zero Trust 面板中配置 Cloudflare Tunnel，将外部子域名流量转发到服务器本机端口。

状态：`OPTIONAL`（最近审查：2026-04-15）

说明：Tunnel 会在服务器本地与 Cloudflare 边缘节点建立加密隧道，因此通常不需要暴露公网 IP，也不需要在云控制台开放 80/443 防火墙端口（仍建议保留必要的 SSH 管理策略）。

---

## 核心配置参数

本项目生产 compose 会把应用映射在宿主机回环 `127.0.0.1:3005`（避免直接暴露应用端口）：
```yaml
ports:
  - "127.0.0.1:3005:3000"
```

因此，我们需要告诉 Cloudflare Tunnel，把对应子域名的请求全数丢给这个本机的 `3005` 端口。

---

## 图文向导：添加 Public Hostname 路由

### 1. 进入 Cloudflare Zero Trust 面板
在侧边栏选择 **Networks (网络)** -> **Tunnels (隧道)**。找到在该服务器上运行的隧道（例如 `gcp-web`），确认其状态为 **Healthy (正常)**。

### 2. 添加 Public Hostname
点击该隧道进入配置，切换到 **Public Hostname (已发布应用程序路由)** 选项卡，然后点击蓝色的 **Add a public hostname (添加已发布应用程序路由)**。

### 3. 填写路由分发规则（⭐ 核心步骤）
在弹出的表单中，按如下规则填写：

* **Public hostname (主机名)**:
  * **Subdomain (子域)**: 填入为本官网分配的前缀。例如 `unihome`。
  * **Domain (域)**: 下拉选择主域名 `vsonic12138.shop`。
  * **Path (路径)**: **留空不要填！** (保持默认匹配所有该域名下路径)。
* **Service (服务)**: 
  * **Type (类型)**: 选择 **`HTTP`** *(注意：千万不要选 HTTPS，因为 SSL 证书环节已经在该面板以外的 Cloudflare 边缘节点被处理完毕了，本地机器与面板的传输走纯 HTTP 内网)*。
  * **URL**: 填写 **`localhost:3005`**。

### 4. 保存并写入系统环境变量
1. 点击右下角 **Save (保存)**。
2. 配置立刻在此生效。现在，Cloudflare 已经知道把 `https://unihome.vsonic12138.shop` 转发给云服务器内部的 `3005` 端口了。
3. **重要闭环**：在服务器上把 `NEXT_PUBLIC_SERVER_URL` 更新为刚才配置的域名（用于媒体绝对 URL、OG、sitemap 等）。

生产环境推荐把环境变量固定在：

```text
/opt/proj_unihome/shared/.env.production
```

编辑后重启应用即可：

```bash
cd /opt/proj_unihome/deploy
nano ../shared/.env.production
bash deploy.sh update
```
