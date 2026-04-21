import fs from "node:fs/promises";
import path from "node:path";

type Locale = "zh" | "en" | "ja";
type SnapshotDoc = Record<string, any>;
type Snapshot = {
  meta: {
    generatedAt: string;
    locales: Locale[];
    globals: string[];
    collections: string[];
  };
  globals: Record<Locale, Record<string, SnapshotDoc>>;
  collections: Record<Locale, Record<string, SnapshotDoc[]>>;
};

const LOCALES: Locale[] = ["zh", "en", "ja"];

function getSnapshotPath() {
  return path.resolve(process.cwd(), "backups", "cms_snapshot_latest.json");
}

function getFirstText(node: any) {
  return node?.root?.children?.[0]?.children?.[0];
}

function setFirstText(node: any, value: string) {
  const textNode = getFirstText(node);
  if (!textNode) {
    throw new Error("Unable to locate richText first text node");
  }
  textNode.text = value;
}

function replaceAllStrings(value: unknown, from: string, to: string): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => replaceAllStrings(item, from, to));
  }

  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      (value as Record<string, unknown>)[key] = replaceAllStrings(nested, from, to);
    }
    return value;
  }

  if (typeof value === "string") {
    return value.split(from).join(to);
  }

  return value;
}

function getPage(snapshot: Snapshot, locale: Locale, slug: string) {
  const page = snapshot.collections[locale].pages.find((item) => item.slug === slug);
  if (!page) throw new Error(`Page not found: ${locale}/${slug}`);
  return page;
}

function getProduct(snapshot: Snapshot, locale: Locale, slug: string) {
  const product = snapshot.collections[locale].products.find((item) => item.slug === slug);
  if (!product) throw new Error(`Product not found: ${locale}/${slug}`);
  return product;
}

function getFaq(snapshot: Snapshot, locale: Locale, sortOrder: number) {
  const faq = snapshot.collections[locale].faq.find((item) => (item.sortOrder ?? 0) === sortOrder);
  if (!faq) throw new Error(`FAQ not found: ${locale}/sortOrder=${sortOrder}`);
  return faq;
}

async function main() {
  const snapshotPath = getSnapshotPath();
  const raw = await fs.readFile(snapshotPath, "utf8");
  const snapshot = JSON.parse(raw) as Snapshot;

  const productsPage = {
    zh: "致力于为教育与科研领域提供专业的具身机器人解决方案，凭借丰富的产品矩阵，涵盖从入门到高阶的 7 款核心产品，深度融合机械、电子、人工智能等技术，具备灵活的功能拓展性与完善的配套支持。无论是 K12 阶段的机器人启蒙教学，中职高职的专业技能实训，还是高校及科研机构的前沿技术研究，都能精准匹配需求，助力用户探索具身智能机器人的无限可能，找到教学与科研的最佳拍档。",
    en: "We provide professional embodied robotics solutions for education and research. Our portfolio brings together seven core products spanning introductory teaching through advanced research, integrating mechanics, electronics, and AI with flexible expansion options and comprehensive supporting resources. From K12 robotics education and vocational skills training to university teaching and frontier research, each solution is designed to match real-world instructional and research needs.",
    ja: "教育・研究分野向けに、具現化ロボットの専門ソリューションを提供します。入門教育から高度な研究までをカバーする 7 つの中核製品を軸に、機械・電子・AI 技術を統合し、拡張性とサポート体制を兼ね備えた製品群を構築しています。K12 のロボット入門教育、中等・高等職業教育の実践訓練、大学・研究機関の先端研究まで、各シーンに応じた最適なプラットフォームを提供します。",
  } satisfies Record<Locale, string>;

  for (const locale of LOCALES) {
    const page = getPage(snapshot, locale, "products");
    page.intro.description = productsPage[locale];
  }

  const mr40Content = {
    zh: {
      brief:
        "可从零搭建 40 种典型具身机器人构型，涵盖底盘、机械臂与复合机器人。支持图形化编程、C++（Arduino）与 Python 多语言开发，配套阶梯式课程资源，适合机器人启蒙、科创实践与竞赛训练。",
      subtitle: "具身机器人创新设计套装（四十合一）",
      feature0:
        "使用 Ubot MR40 不需要学习者具备编程基础。平台采用图形化编程方式，学生通过拖拽即可完成基础控制逻辑；对于具备一定基础的学习者，也支持使用 C++ 与 Python 进行更复杂、更专业的代码开发。",
      highlight3: "覆盖机器人启蒙、科创实践与竞赛训练",
      sensorDescription:
        "集成姿态检测传感器、4 路巡线传感器、2 个超声波传感器、语音识别传感器、喇叭模块与 PS 手柄遥控器，可实现自动避障、迷宫行走、自主倒车入库、自主巡线、语音交互与手柄遥控等功能。学生还可以基于 Ubot MR40 开展丰富的项目实践，例如模拟月面探测与科学考察任务。",
      controllerAlt: "控制器堆叠式设计与接口示意",
      controllerCaption: "控制器：直流电机、舵机与传感器扩展接口一览",
      softwareAlt0: "OpenBlock 编程工作区界面",
      softwareAlt1: "OpenBlock 设备连接界面",
    },
    en: {
      brief:
        "Build 40 typical embodied robot configurations from scratch, covering chassis, robotic arms, and composite robots. Supports graphical programming plus C++ (Arduino) and Python development, with progressive curriculum resources for introductory robotics education, innovation projects, and competition training.",
      subtitle: "Embodied Robot Innovation Design Kit (40-in-1)",
      feature0:
        "Ubot MR40 requires no prior programming experience. Learners can start with block-based programming to build core control logic through drag-and-drop interactions, and can later progress to more advanced development with C++ and Python.",
      highlight3: "Supports beginner robotics education, innovation projects, and competition training",
      sensorDescription:
        "Integrates a posture sensor, a 4-channel line-tracking sensor, two ultrasonic sensors, a voice-recognition sensor, a speaker module, and a PS controller. It supports automatic obstacle avoidance, maze navigation, autonomous reverse parking, line following, voice interaction, and remote-control functions. Students can also use Ubot MR40 for engaging project work such as simulated lunar exploration tasks.",
      controllerAlt: "Controller stack design and interface overview",
      controllerCaption: "Controller: overview of DC motor, servo, and sensor expansion interfaces",
      softwareAlt0: "OpenBlock programming workspace",
      softwareAlt1: "OpenBlock device management interface",
    },
    ja: {
      brief:
        "シャーシ、ロボットアーム、複合ロボットを含む 40 種類の代表的な具現化ロボット構成をゼロから構築できます。グラフィカルプログラミング、C++（Arduino）、Python に対応し、段階的なカリキュラムとあわせて、ロボット入門教育、探究活動、競技会向けの実践に適しています。",
      subtitle: "具現化ロボット革新設計キット（40-in-1）",
      feature0:
        "Ubot MR40 は、プログラミング未経験の学習者でも使い始められるよう設計されています。ドラッグ＆ドロップ型のビジュアルプログラミングで基礎制御を学べるほか、一定の基礎がある学習者は C++ や Python による、より高度で専門的な開発にも進めます。",
      highlight3: "ロボット入門教育から探究活動・競技会まで幅広く対応",
      sensorDescription:
        "姿勢検出センサ、4 チャンネルラインセンサ、超音波センサ 2 基、音声認識センサ、スピーカーモジュール、PS コントローラを統合しており、自動障害物回避、迷路走行、自律バック駐車、ラインフォロー、音声対話、リモート操作などを実現できます。Ubot MR40 を使って、月面探査を模したような発展的なプロジェクト実践にも取り組めます。",
      controllerAlt: "コントローラのスタック構造とインターフェース概要",
      controllerCaption: "コントローラ：DC モータ、サーボ、センサ拡張インターフェース一覧",
      softwareAlt0: "OpenBlock プログラミングワークスペース",
      softwareAlt1: "OpenBlock デバイス管理画面",
    },
  } satisfies Record<Locale, Record<string, string>>;

  for (const locale of LOCALES) {
    const product = getProduct(snapshot, locale, "ubot-mr40");
    product.brief = mr40Content[locale].brief;
    product.details.subtitle = mr40Content[locale].subtitle;
    setFirstText(product.details.overview, mr40Content[locale].brief);
    setFirstText(product.details.features[0].content, mr40Content[locale].feature0);
    product.details.highlights[2].text = mr40Content[locale].highlight3;
    product.details.sensorConfig.description = mr40Content[locale].sensorDescription;
    product.details.controllerConfig.images[0].alt = mr40Content[locale].controllerAlt;
    product.details.controllerConfig.images[0].caption = mr40Content[locale].controllerCaption;
    product.details.softwareConfig.images[0].alt = mr40Content[locale].softwareAlt0;
    product.details.softwareConfig.images[1].alt = mr40Content[locale].softwareAlt1;
  }

  const gxSubtitles = {
    en: "Embodied Composite Robot Innovation Design Kit (Enhanced)",
    ja: "具現化複合ロボット革新設計キット（強化版）",
  };
  getProduct(snapshot, "en", "gx-mat-09s").details.subtitle = gxSubtitles.en;
  getProduct(snapshot, "ja", "gx-mat-09s").details.subtitle = gxSubtitles.ja;

  const uniWr2Briefs = {
    zh: "机身长度不足 13cm，可在不超过 60cm×60cm 的桌面环境中开展 SLAM 实验，配套覆盖 Cartographer、Hector、Gmapping 的五步 ROS 工程化教学流程。",
    en: "A portable ROS navigation robot under 13 cm in length, designed for desktop SLAM labs in spaces as small as 60×60 cm. Includes a five-step ROS engineering workflow covering Cartographer, Hector, and Gmapping.",
    ja: "全長 13cm 未満の携帯型 ROS ナビゲーションロボットで、60×60cm 程度の卓上環境でも SLAM 実験を実施できます。Cartographer、Hector、Gmapping を含む 5 段階の ROS エンジニアリング学習フローを備えています。",
  } satisfies Record<Locale, string>;

  for (const locale of LOCALES) {
    const product = getProduct(snapshot, locale, "uni-wr2");
    product.brief = uniWr2Briefs[locale];
    setFirstText(product.details.overview, replaceAllStrings(getFirstText(product.details.overview)?.text ?? "", "Catographer", "Cartographer") as string);
    replaceAllStrings(product, "Catographer", "Cartographer");
    product.brief = uniWr2Briefs[locale];
  }

  const raiP4Briefs = {
    zh: "集成大模型、语音、视觉、机械臂与云台的一站式具身交互智能体实训平台。兼容 DeepSeek、通义千问、豆包等主流大模型，覆盖 OpenCV、YOLO、多模态 VLM 等视觉能力，并配套从 0 到 1 的智能体设计、机器人控制、智能体开发与视觉集成开发实训课程，适合专业课程综合实训。",
    en: "An all-in-one training platform for embodied interactive agents, integrating foundation models, voice, vision, robotic arms, and gimbals. Compatible with mainstream models such as DeepSeek, Qwen, and Doubao, and supports OpenCV, YOLO, and multimodal VLM workflows. It includes practical course modules covering agent design from concept to deployment, robot control, agent development, and vision integration for professional university training.",
    ja: "大規模モデル、音声、ビジョン、ロボットアーム、ジンバルを統合した、具現化インタラクティブエージェント向けのワンストップ実習プラットフォームです。DeepSeek、Qwen、Doubao などの主要モデルに対応し、OpenCV、YOLO、マルチモーダル VLM などの視覚ワークフローもカバーします。エージェント設計、ロボット制御、エージェント開発、ビジョン統合開発までを含む実習カリキュラムを備え、専門課程の総合実習に適しています。",
  } satisfies Record<Locale, string>;

  for (const locale of LOCALES) {
    const product = getProduct(snapshot, locale, "rai-p4");
    product.brief = raiP4Briefs[locale];
    setFirstText(product.details.overview, raiP4Briefs[locale]);
  }

  const raiM4Briefs = {
    zh: "集成全向底盘、五轴机械臂、深度相机、激光雷达与语音交互的一站式具身智能实训平台。兼容通义千问等主流大模型，提供三种视觉方案与两种 SLAM 导航方案，内置 ROS 2，并配套具身智能体、视觉、导航与机器人操作系统课程，适合开展专业综合实训。",
    en: "An all-in-one embodied intelligence training platform integrating an omnidirectional chassis, a 5-axis robotic arm, a depth camera, LiDAR, and voice interaction. Compatible with mainstream models such as Qwen, it includes three vision solutions, two SLAM navigation solutions, built-in ROS 2, and supporting coursework for embodied agents, vision, navigation, and robot operating systems.",
    ja: "全方向シャーシ、5 軸ロボットアーム、デプスカメラ、LiDAR、音声対話を統合したワンストップの具現化知能実習プラットフォームです。Qwen などの主要モデルに対応し、3 種類のビジョン構成、2 種類の SLAM ナビゲーション構成、ROS 2 を備え、具現化エージェント、ビジョン、ナビゲーション、ロボット OS に関する実習を支えます。",
  } satisfies Record<Locale, string>;

  for (const locale of LOCALES) {
    const product = getProduct(snapshot, locale, "rai-m4");
    product.brief = raiM4Briefs[locale];
    setFirstText(product.details.overview, raiM4Briefs[locale]);
  }

  const faqFirstRecommendation = {
    zh: "K12、中职 / 高职一年级、大一：推荐具身机器人创新设计套装（四十合一）Ubot MR40，支持图形化编程与 C++ / Python 多语言开发，组装门槛低，可从零搭建底盘、机械臂与复合机器人等多种典型构型，适合机器人通识教学、探究实践与竞赛入门；",
    en: "K12, secondary vocational / first-year higher vocational, and first-year undergraduate: the recommended product is the Embodied Robot Innovation Design Kit (40-in-1) Ubot MR40. It supports graphical programming plus C++ / Python development, has a low assembly threshold, and allows students to build chassis, robotic-arm, and composite-robot configurations from scratch, making it well suited for introductory robotics teaching, exploration, and competition entry;",
    ja: "K12、中等職業教育 / 高等職業教育1年生、大学1年生：推奨製品は具現化ロボット革新設計キット（40-in-1）Ubot MR40 です。グラフィカルプログラミングと C++ / Python 開発に対応し、組立のハードルも低く、シャーシ、ロボットアーム、複合ロボットなど多様な典型構成をゼロから組み立てられるため、ロボット入門教育、探究実践、競技導入に適しています。",
  } satisfies Record<Locale, string>;

  for (const locale of LOCALES) {
    const faq = getFaq(snapshot, locale, 0);
    faq.answer.root.children[1].children[0].text = faqFirstRecommendation[locale];
  }

  snapshot.meta.generatedAt = new Date().toISOString();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outPath = path.resolve(process.cwd(), "backups", `cms_snapshot_product_copy_fix_${timestamp}.json`);
  await fs.writeFile(outPath, JSON.stringify(snapshot, null, 2), "utf8");

  // eslint-disable-next-line no-console
  console.log(`[fix] wrote ${path.relative(process.cwd(), outPath)}`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
