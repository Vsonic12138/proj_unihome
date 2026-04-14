# GCP 服务器迁移与上线操作手册 (基于自动化打包)

本文档面向目前的 GCP 实例部署场景，全程采用 **"本地 WSL 一键构建包 -> 碎片化 SCP 传输 -> 云端拼合拉起"** 的高容错链路。

该方案彻底解决了下面两个痛点：
1. **自动生成复杂配置**：无需手动干预任何随机安全密钥、数据库 URI 解析以及媒体和数据库快照。
2. **解决 IAP 传输断联**：针对 Windows `pscp` 传输 500MB 单体大文件必断的问题，使用 `split` 切片小文件绕过网络瓶颈。

---

## 第一阶段：本地一键打包 (WSL 环境)

在你的 WSL 终端中（需处于项目根目录下），直接执行一键打包命令，它会调用 `ops/deploy/create-deploy-bundle.sh` 梳理所有上下文并完成 Docker 本地构建：

```bash
npm run deploy:bundle
```

*(等待几分钟，它会在当前目录产出一个名为 `proj-unihome-deploy-bundle.tar.gz` 的核心部署包。该包内已经包含了安全 .env 文件、生产镜像、最新的数据库 dump、以及 CMS 用户上传的媒体文件压缩包。)*

---

## 第二阶段：切片并传送至 Windows 宿主机

为防止通过 IAP 上传大包时卡在 95% 报错 （`Remote side unexpectedly closed network connection`），我们先在 **WSL 终端里** 对原大包进行 MD5 哈希计算备案，然后再将整合包切分成数个 100MB 的小块：

```bash
# 计算原始部署大包的 MD5 校验码（请记录输出的这串哈希字符，供在云端比对）
md5sum proj-unihome-deploy-bundle.tar.gz

# 按 100MB 规格切割大包裹，小块以前缀 bundle_part_ 命名
split -b 100m proj-unihome-deploy-bundle.tar.gz bundle_part_

# 将这些碎片提取到你 Windows 宿主机的 Downloads 下载文件夹中
cp bundle_part_* /mnt/c/Users/Admin/Downloads/
```

*(这样你的 Windows 的 Downloads 文件夹下就会出现 bundle_part_aa、bundle_part_ab 等一堆小文件。)*

---

## 第三阶段：上传至 GCP 服务器 (Windows 环境)

切换到 Windows 的 **PowerShell 终端** 进行传输。

1. 进入已拷贝好碎片的下载文件夹：
   ```powershell
   cd C:\Users\Admin\Downloads
   ```

2. 使用通配符 `*` 批量将小碎片 SCP 至云端绝对路径：
   ```powershell
   gcloud compute scp bundle_part_* vsonic12138@bigyellow-free-chicken:/home/vsonic12138/ --zone=us-central1-c --tunnel-through-iap
   ```
   *(小分身传输稳定，断连概率极低。即使其中某一个几兆的跑崩了，单独重传报错的那个即可)*

---

## 第四阶段：云端拼合并解压 (GCP 环境)

在你的 PowerShell 里打开一个新标签，使用 `gcloud compute ssh` 连入服务器。具体命令格式如下：

```powershell
gcloud compute ssh vsonic12138@bigyellow-free-chicken --zone=us-central1-c --tunnel-through-iap
```

* **命令参数详解**：
  * `vsonic12138@bigyellow-free-chicken`：格式为 `[登录用户名]@[GCP 实例名称]`。
  * `--zone=us-central1-c`：指定你想连接的这台 GCP 服务器所在的地理可用区。
  * `--tunnel-through-iap`：此为核心安全参数。它强制流量通过谷歌的 Identity-Aware Proxy (IAP) 内网专线隧道进行转发，哪怕你的实例没有公网 IP，也可以安全连入并避免防火墙阻断。

成功登入并看到以 `vsonic12138@bigyellow-free-chicken:~$` 结尾的绿色命令行提示符后，接着执行：

1. **将小碎片重新拼合成原来的完整部署包**：
   ```bash
   cat bundle_part_* > proj-unihome-deploy-bundle.tar.gz
   ```

2. **在服务器使用 MD5 严格验证拼接后的大包完整性**：
   ```bash
   # 计算云端拼合出来的包的 MD5 签名
   md5sum proj-unihome-deploy-bundle.tar.gz
   ```
   *(请务必对比屏幕输出的这串字符，看看是否跟“第二阶段”在 WSL 算出的 MD5 字符串**完全一致**。若不一致，说明有网络丢包或少传了碎片，需删去大包重新拼合或重传损坏的分片。)*

3. **MD5 校验确认完全一致后，安全地清理无用的碎片文件**：
   ```bash
   rm bundle_part_*
   ```

4. **解压刚才拼合并校验通过的部署包，并进入工作区**：
   ```bash
   tar -xzf proj-unihome-deploy-bundle.tar.gz
   cd deploy-pkg
   ```

---

## 第五阶段：GCP 云端服务部署上线

完成解压后，你当前所处目录为 `deploy-pkg`，推荐使用一键脚本完成首次部署或后续更新。

### 1. 配置最终公网域名
修改自动生成的 `.env.production`，将默认的 Server URL 改为你打算对外绑定的真实前端正式域名（例如 `https://xxx.xxx`，注意末尾不要加 `/` 斜杠）。暂时没有的话可以先留回环 IP：
```bash
nano .env.production
# 将 NEXT_PUBLIC_SERVER_URL 改为你真实的公网域名
```

**⚠️ 为什么强烈建议填写真实的域名？**
* **防止图片死链/红叉**：使用 Payload CMS 上传图片时，接口经常会将图片的绝对路径发送给前端访客。如果不改该变量或留着 localhost，访客的手机/浏览器就会尝试读取自己本地设备的 localhost，导致图片全部裂开无法加载。
* **保障 SEO 及收录分享**：Next.js 后台生成网站地图 (sitemap) 以及主流社交卡片分享图 (OG Image) 时，强依赖通过此环境变量拼接生成合法的互联网连接。

### 2. 一键首次部署（init）

```bash
bash deploy.sh init
```

`deploy.sh init` 会自动执行以下动作：

- 解压媒体（仅当包内存在且 `media/` 为空时）
- 导入镜像（gzip -> docker load）
- 启动 Postgres 并等待健康检查通过
- 如存在 dump 则自动执行 `pg_restore`
- 启动 app

---

## 第六阶段：发布后状态核验

1. 查询容器是否正常活存：
   ```bash
   docker ps
   # 应当能看到 proj_unihome_postgres 和 proj_unihome_app 这两个容器状态为 UP
   ```
2. 查询启动日志是否有 Fatal 错误（特别是检查应用层有没有报数据库连接失败）：
   ```bash
   bash deploy.sh logs app
   ```

3. 只要无明显错误，容器便会固定监听本机 `127.0.0.1:3005`。在此基础上，你可以利用外层的 Nginx / Caddy 设施，把域名的 `80/443` 流量打向 `3005` 进行最终交付。
