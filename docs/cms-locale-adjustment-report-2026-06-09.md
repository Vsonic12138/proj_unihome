# CMS 三语字段内容审查与调整报告

审查时间：2026-06-09  
审查基准：本地 PostgreSQL 中已同步线上数据并叠加本地 sponsorLogos 补丁后的 CMS 内容。  
审查目标：以中文字段为内容基准，核对英文、日文字段是否缺失、错位、回退、口径不一致，并给出调整建议。

## 覆盖范围

本次已展开 Payload API 返回的三语 CMS 内容，覆盖：

| 类型 | zh | en | ja |
| --- | ---: | ---: | ---: |
| pages | 16 | 16 | 16 |
| products | 7 | 7 | 7 |
| productSeries | 2 | 2 | 2 |
| faq | 3 | 3 | 3 |
| caseStudies | 14 | 14 | 14 |
| media | 153 | 153 | 153 |
| mediaFolders | 20 | 20 | 20 |
| globals | siteSettings, navigation, footer | siteSettings, navigation, footer | siteSettings, navigation, footer |

完整展开结果：11,274 条字符串记录，3,758 个唯一字段路径。  
结构检查：三语数组长度不一致数量为 0，未发现 block、列表项、产品样机项、实验项在语言之间缺行。

## 结论摘要

整体结构完整，问题主要集中在以下几类：

1. 英文 `GX-MAT-09S` 产品实验模块整体错位。
2. `about` 页和首页 `about` 模块英文、日文仍是旧版公司介绍，与中文新版介绍不一致。
3. 一个案例英文正文残留中文小标题。
4. 中文自身存在少量占位英文和联系方式/地址口径不一致。
5. 导航/页面标题有若干“学习资源/开发者服务/案例”命名口径不一致。
6. 日文个别术语使用了中文词形 `具身`，建议统一为 `具現化`。

## 需要调整的问题清单

### 1. 中文基准本身需要先定稿：页脚与站点设置联系方式不一致

字段：

- `global:siteSettings.contactInfo`
- `global:footer.contactInfo`
- `global:siteSettings.floatingContact.phone`

| 语言 | siteSettings 当前值 | footer 当前值 |
| --- | --- | --- |
| zh | 电话：`+86 176 1035 7571`；地址：`北京市石景山区料仓路6号院10号楼3层101-2` | 电话：`+86 14748908013`；地址：`北京市石景山区古城街道中关村科幻产业创新中心2楼208` |
| en | Phone: `+86 176 1035 7571`; Address: `Unit 101-2, 3F, Building 10, Yard 6, Liaocang Road, Shijingshan District, Beijing` | Phone: `+86 14748908013`; Address: `Unit 101-2, 3F, Building 10, Yard 6, Liaocang Road, Shijingshan District, Beijing` |
| ja | 電話：`+86 176 1035 7571`；住所：`北京市石景山区料仓路6号院10号楼3階101-2` | 電話：`+86 14748908013`；住所：`北京市石景山区料仓路6号院10号楼3階101-2` |

问题：中文里地址出现两个版本；英文/日文 footer 地址跟随 siteSettings，但 footer 中文不是同一个地址。电话也有两个号码。  
建议：先确认官方对外电话和地址，以确认后的中文为唯一基准，同步到 `siteSettings`、`footer`、`floatingContact` 及三语字段。

建议调整：

| 字段 | 英文建议 | 日文建议 |
| --- | --- | --- |
| 若采用 `北京市石景山区料仓路6号院10号楼3层101-2` | `Unit 101-2, 3F, Building 10, Yard 6, Liaocang Road, Shijingshan District, Beijing` | `北京市石景山区料倉路6号院10号棟3階101-2` |
| 若采用 `北京市石景山区古城街道中关村科幻产业创新中心2楼208` | `Room 208, 2F, Zhongguancun Science Fiction Industry Innovation Center, Gucheng Subdistrict, Shijingshan District, Beijing` | `北京市石景山区古城街道 中関村SF産業イノベーションセンター2階208号室` |

### 2. 中文已发布页面仍有英文占位文案

字段：

- `pages:developers.blocks[0].description`
- 另有草稿页：`case-studies-co-research`、`case-studies-k12`、`case-studies-universities`、`case-studies`

| 页面 | 中文当前 | 英文当前 | 日文当前 |
| --- | --- | --- | --- |
| `developers`（已发布） | `Coming soon` | `Coming soon` | `Coming soon` |
| `case-studies-co-research`（草稿） | `Coming soon` | `Coming soon` | `Coming soon` |
| `case-studies-k12`（草稿） | `Coming soon` | `Coming soon` | `Coming soon` |
| `case-studies-universities`（草稿） | `Coming soon` | `Coming soon` | `Coming soon` |
| `case-studies`（草稿） | `Coming soon` | `Coming soon` | `Coming soon` |

问题：中文基准不是中文，且 `developers` 已发布。  
建议调整：

| 中文建议 | 英文建议 | 日文建议 |
| --- | --- | --- |
| `内容准备中` | `Coming soon` | `近日公開予定` 或 `準備中` |

如果该 contact block 实际作为占位模块而非正文展示，也建议统一三语占位文案，避免中文站出现英文。

### 3. About 页与首页 About 模块的英文、日文仍是旧口径

字段：

- `pages:about.blocks[0]`
- `pages:home.blocks[2]`

| 语言 | 当前内容摘要 |
| --- | --- |
| zh | `有你同创是一家于具身智能元年（2024年）成立的具身智能教育公司，坐落于石景山首钢园区，致力于打造“启发、探索、创新、分享”的具身智能机器人学习平台...` |
| en | `UNI Robotics Technology (Beijing) Co., Ltd. is located in the Winter Olympics Plaza at Shougang Park, Shijingshan District, Beijing, partnering with Shougang Group to build a world-leading embodied intelligence innovation platform...` |
| ja | `有你同創智能機器人科技（北京）有限公司は北京市石景山区の首鋼園冬季五輪広場に位置し、首鋼集団と協力して世界をリードする具現化知能イノベーションプラットフォームを構築しています...` |

问题：英文/日文仍包含“冬奥广场”“与首钢集团合作”等旧描述，中文新版已经改为“2024 年成立、具身智能教育公司、启发/探索/创新/分享、学习平台/课程平台/体验中心生态”。  
建议：英文、日文按中文新版完整重译。

英文建议：

> UNI Robotics is an embodied intelligence education company founded in 2024, the first year of embodied intelligence. Located in Shougang Park, Shijingshan, Beijing, the company is committed to building an embodied robotics learning platform guided by “Inspire, Explore, Innovate, and Share,” helping every learner connect joyfully with future intelligence. We build intelligent, inspiring, engaging, comprehensive, and easy-to-use hardware learning platforms for embodied robotics; a curriculum platform carrying a comprehensive, open, and shared knowledge system; and an experience-center ecosystem that supports low-cost interest activation and sustained project exploration. We serve K12 schools, secondary and higher vocational colleges, universities, enterprise engineers, makers, and other developer communities, helping them explore embodied intelligence in depth, cultivate innovative engineers for the AI era, and achieve growth through hands-on innovation.

日文建议：

> UNI Robotics（有你同創）は、具現化知能元年である2024年に設立された具現化知能教育企業です。北京市石景山区の首鋼園区に拠点を置き、「啓発・探求・革新・共有」を理念とした具現化ロボット学習プラットフォームの構築に取り組み、すべての学習者が未来の知能と楽しくつながることを目指しています。知能的で、刺激に満ち、分かりやすく、包括的で使いやすい具現化ロボットのハードウェア学習基盤、包括的・オープン・共有型の知識体系を支えるカリキュラム基盤、低コストで興味を喚起し継続的なプロジェクト探求を可能にする体験センターのエコシステムを構築しています。K12、中等・高等職業教育、大学、企業エンジニア、Maker などの開発者層が具現化知能技術を継続的かつ深く探求できるよう支援し、AI 時代の革新的なエンジニアの育成と学習者一人ひとりの成長を後押しします。

### 4. GX-MAT-09S 英文实验模块整体错位

字段：

- `products:gx-mat-09s.details.experiments.sections`

当前三语：

| 序号 | 中文当前 | 英文当前 | 日文当前 |
| ---: | --- | --- | --- |
| 1 | `电机综合项目:3` | `Microcontroller Integration:3` | `モータ総合プロジェクト:3` |
| 2 | `传感器项目:6` | `Motor Integration:6` | `センサプロジェクト:6` |
| 3 | `嵌入式项目:5` | `Sensor Projects:5` | `組込み Linux プロジェクト:5` |
| 4 | `机器视觉项目:11` | `Embedded Linux Projects:11` | `コンピュータビジョンプロジェクト:11` |
| 5 | `底盘机器人项目:9` | `Computer Vision Projects:9` | `モバイルシャーシプロジェクト:9` |
| 6 | `机械臂项目:6` | `Mobile Chassis Projects:6` | `ロボットアームプロジェクト:6` |
| 7 | `复合机器人项目:7` | `Manipulator Projects:7` | `複合ロボットプロジェクト:7` |
| 8 | `机器人操作系统 ROS:3` | `Hybrid Robot Projects:3` | `ROS プロジェクト:3` |
| 9 | `移动机器人导航与定位:4` | `Robot Operating System (ROS):4` | `移動ロボットのナビゲーションと位置決め:4` |

问题：英文标题整体从第 1 项开始错位，内容首项也错位。例如中文第 1 项首条是“控制直流电机”，英文第 1 项却是 “Arduino board familiarization”。  
建议：以中文与日文的结构为准，重新对齐英文 section title 和每个 section 的 items。英文 section title 建议如下：

| 中文基准 | 英文建议 | 日文建议 |
| --- | --- | --- |
| 电机综合项目 | Motor Integration Projects | モータ総合プロジェクト |
| 传感器项目 | Sensor Projects | センサプロジェクト |
| 嵌入式项目 | Embedded Linux Projects | 組込み Linux プロジェクト |
| 机器视觉项目 | Computer Vision Projects | コンピュータビジョンプロジェクト |
| 底盘机器人项目 | Mobile Chassis Robot Projects | モバイルシャーシロボットプロジェクト |
| 机械臂项目 | Robotic Arm Projects | ロボットアームプロジェクト |
| 复合机器人项目 | Composite Robot Projects | 複合ロボットプロジェクト |
| 机器人操作系统 ROS | Robot Operating System (ROS) | ロボットオペレーティングシステム（ROS） |
| 移动机器人导航与定位 | Mobile Robot Navigation and Localization | 移動ロボットのナビゲーションと自己位置推定 |

### 5. 华中科技大学案例英文残留中文小标题

字段：

- `caseStudies:e239a5807b.content`

| 语言 | 当前内容片段 |
| --- | --- |
| zh | `成果：STM32课程小班实验成功，接下来每年都开展STM32综合实践课程。比赛获得多个省一。` |
| en | `成果：The STM32 small-class experiment was successful, paving the way for annual STM32 comprehensive practice courses...` |
| ja | `成果：STM32の少人数実験クラスは成功を収め...` |

问题：英文正文残留中文小标题 `成果：`。日文里 `成果：` 可理解但建议本地化。  
建议调整：

| 中文基准 | 英文建议 | 日文建议 |
| --- | --- | --- |
| 成果： | Results: | 成果： 或 `成果：` 保留也可；若完全日文化可用 `成果：`/`成果` 均可 |

同时英文正文中：

| 当前英文 | 建议英文 |
| --- | --- |
| `backend technical challenges` | `low-level technical challenges` |

原因：中文“底层技术难题”不是后端 backend，而是底层/底层开发 low-level。

### 6. 导航与页面标题：学习资源被翻成 Developers/开发者服务

字段：

- `global:navigation.items[2].label`
- `pages:developers.title`
- `global:footer.sections[1].title`

| 字段 | 中文当前 | 英文当前 | 日文当前 |
| --- | --- | --- | --- |
| navigation.items[2].label | `学习资源` | `Developers` | `開発者サービス` |
| pages:developers.title | `学习资源` | `Developer Services` | `開発者サービス` |
| footer.sections[1].title | `开发者服务` | `Developer Services` | `開発者サービス` |

问题：中文“学习资源”和“开发者服务”是两个不同口径；英文/日文统一成开发者服务，会弱化“学习资源”。  
建议：先确认中文导航是否应改成“开发者服务”。如果中文仍以“学习资源”为准：

| 中文基准 | 英文建议 | 日文建议 |
| --- | --- | --- |
| 学习资源 | Learning Resources | 学習リソース |
| 开发者服务 | Developer Services | 開発者サービス |

### 7. 案例导航命名偏泛或缺“案例/事例”

字段：

- `global:navigation.items[3].label`
- `global:navigation.items[3].children[3].label`
- `pages:case-studies-training-base.title`

| 字段 | 中文当前 | 英文当前 | 日文当前 |
| --- | --- | --- | --- |
| navigation.items[3].label | `合作案例` | `Cases` | `サービス事例` |
| navigation.items[3].children[3].label | `培训基地案例` | `Training Base` | `トレーニングベース` |
| pages:case-studies-training-base.title | `培训基地案例` | `Training Base` | `トレーニングベース` |

问题：英文 `Cases` 过泛，日文 `サービス事例` 对应的是“服务案例”而非“合作案例”；Training Base 缺少 Cases/事例。  
建议调整：

| 中文基准 | 英文建议 | 日文建议 |
| --- | --- | --- |
| 合作案例 | Collaboration Cases | 連携事例 |
| 培训基地案例 | Training Base Cases | トレーニングベース事例 |

### 8. 日文 FAQ 个别术语仍使用中文词形 `具身`

字段：

- `faq:1.answer`
- `faq:2.answer`

| 字段 | 中文当前 | 英文当前 | 日文当前片段 |
| --- | --- | --- | --- |
| faq:1.answer | `具身机器人创新设计套装（四十合一）Ubot MR40` | `Embodied Robot Innovation Design Kit (40-in-1) Ubot MR40` | `具現化ロボット革新設計キット（40-in-1）Ubot MR40` |
| faq:2.answer | `具身机器人创新设计平台（增强版）GX-MAT-09S` | `embodied robot innovation design platform (enhanced edition) GX-MAT-09S` | `具身ロボット革新設計プラットフォーム（強化版）GX-MAT-09S` |

问题：`faq:2.answer` 日文里 `具身ロボット` 与站内主流术语 `具現化ロボット` 不一致。  
建议调整：

| 中文基准 | 英文建议 | 日文建议 |
| --- | --- | --- |
| 具身机器人创新设计平台（增强版）GX-MAT-09S | Embodied Robotics Innovation Platform (Enhanced) GX-MAT-09S | 具現化ロボット革新設計プラットフォーム（強化版）GX-MAT-09S |

### 9. 站点品牌名英文/日文可保留，但建议统一写法

字段：

- `global:siteSettings.companyName`
- `pages:home.title`
- `pages:about.blocks[0].heading`
- `pages:home.blocks[2].heading`

| 字段 | 中文当前 | 英文当前 | 日文当前 |
| --- | --- | --- | --- |
| companyName/home.title | `有你同创 · 具身智能教育平台` | `Youni Tongchuang · Embodied Intelligence Platform` | `有你同创 · 具現化知能教育プラットフォーム` |
| about heading | `关于有你同创` | `About UNI Robotics` | `UNI Roboticsについて` |

问题：英文品牌在 `Youni Tongchuang` 与 `UNI Robotics` 之间混用；日文也混用中文品牌名和 UNI Robotics。  
建议：如果市场品牌对外使用 `UNI Robotics`，则统一如下：

| 中文基准 | 英文建议 | 日文建议 |
| --- | --- | --- |
| 有你同创 · 具身智能教育平台 | UNI Robotics · Embodied Intelligence Education Platform | UNI Robotics · 具現化知能教育プラットフォーム |
| 关于有你同创 | About UNI Robotics | UNI Roboticsについて |

如果中文品牌“有你同创”必须出现在英文站，则建议统一成 `Youni Tongchuang (UNI Robotics)`，不要在不同模块中随机切换。

## 可接受或无需调整的字段

以下字段虽然三语相同或包含中文，但不建议作为错误处理：

| 字段类型 | 示例 | 说明 |
| --- | --- | --- |
| 合规备案号 | `京ICP备2026020664号`、`京公网安备11010702003097号` | 中国备案号为专有合规文本，可以保留中文 |
| URL / href / src | `/privacy-policy`、外部链接 | 不是翻译字段 |
| blockType / key / category / status | `contact`、`published`、`training-base` | 系统枚举，不应翻译 |
| 产品型号 | `RAI-P4`、`GX-MAT-09S`、`UNI-WR2` | 型号应保持一致 |
| 媒体文件夹名 | `rai-p4`、`ubot-mr40` | 管理/文件组织名，可保持 |

## 建议处理顺序

1. 先确认官方电话、地址、品牌英文名，统一中文基准。
2. 修复已发布页面中的中文占位英文：尤其是 `pages:developers.blocks[0].description`。
3. 重译并同步 `about` 页与首页 about 模块。
4. 修复 `GX-MAT-09S` 英文实验模块错位。
5. 修复华中科技大学案例英文残留中文小标题。
6. 统一导航和页面标题命名口径。
7. 统一日文术语：`具身` → `具現化`。

