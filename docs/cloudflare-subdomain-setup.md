# Cloudflare Tunnel 配置子域名与内网穿透指南

由于你在 GCP 服务器上部署了 **Cloudflare Tunnel (Zero Trust)** 隧道，这是一种远比暴露公网 IP、设置传统的 A 记录或 CNAME 更加安全、高级的部署方式。

由于 Tunnel 是在你的 GCP 服务器本地与 Cloudflare 边缘节点直接建立的长链接加密隧道。因此，GCP 甚至不需要固定公网 IP，也不需要在云控制台开放 80/443 防火墙端口！

本文档详细介绍了如何在 Cloudflare Zero Trust 面板中，将外部子域名流量精确引导至我们刚刚部署的 Docker 内部端口。

---

## 核心配置参数

我们刚刚通过部署包上线的官网应用，在 `docker-compose.prod.yml` 中映射在了本机的 `3005` 端口：
```yaml
ports:
  - "127.0.0.1:3005:3000"
```

因此，我们需要告诉 Cloudflare Tunnel，把对应子域名的请求全数丢给这个本机的 `3005` 端口。

---

## 图文向导：添加 Public Hostname 路由

### 1. 进入 Cloudflare Zero Trust 面板
在侧边栏选择 **Networks (网络)** -> **Tunnels (隧道)**。找到你在该台 GCP 服务器上一直保持运行的隧道（例如你截图里的 `gcp-web` 隧道），确认其状态为 **Healthy (正常)**。

### 2. 添加 Public Hostname
点击该隧道进入配置，切换到 **Public Hostname (已发布应用程序路由)** 选项卡，然后点击蓝色的 **Add a public hostname (添加已发布应用程序路由)**。

### 3. 填写路由分发规则（⭐ 核心步骤）
在弹出的表单中，按如下规则填写：

* **Public hostname (主机名)**:
  * **Subdomain (子域)**: 填入你为本官网分配的前缀。例如你填了 `unihome`。
  * **Domain (域)**: 下拉选择你的主域名 `vsonic12138.shop`。
  * **Path (路径)**: **留空不要填！** (保持默认匹配所有该域名下路径)。
* **Service (服务)**: 
  * **Type (类型)**: 选择 **`HTTP`** *(注意：千万不要选 HTTPS，因为 SSL 证书环节已经在该面板以外的 Cloudflare 边缘节点被处理完毕了，本地机器与面板的传输走纯 HTTP 内网)*。
  * **URL**: 填写 **`localhost:3005`**。

### 4. 保存并写入系统环境变量
1. 点击右下角 **Save (保存)**。
2. 配置立刻在此生效。现在，Cloudflare 已经知道把 `https://unihome.vsonic12138.shop` 转发给云服务器内部的 `3005` 端口了。
3. **重要闭环**：回到你的 GCP 服务器终端（`deploy-pkg` 目录），编辑环境配置：
   ```bash
   nano .env.production
   ```
   **将 `NEXT_PUBLIC_SERVER_URL` 修改为你刚才配好的 `https://unihome.vsonic12138.shop`**。
   保存后重启应用即可：
   ```bash
   docker compose -f docker-compose.prod.yml --env-file .env.production up -d app
   ```
