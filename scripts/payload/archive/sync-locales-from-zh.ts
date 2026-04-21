import fs from "node:fs/promises";
import path from "node:path";

import TRANSLATIONS from "../lib/content-translations.js";
import { caseStudiesData } from "./data/case-studies";

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
const TARGET_LOCALES: Array<Exclude<Locale, "zh">> = ["en", "ja"];

const BYPASS_TRANSLATION_KEYS = new Set([
  "id",
  "slug",
  "key",
  "href",
  "url",
  "filename",
  "sourcePath",
  "mimeType",
  "createdAt",
  "updatedAt",
  "_status",
  "_locale",
  "sortOrder",
  "sort",
  "number",
  "phone",
  "email",
  "globalType",
  "blockType",
  "relationTo",
  "type",
  "link",
  "path",
  "src",
  "focalX",
  "focalY",
  "width",
  "height",
  "filesize",
  "slideId",
  "model",
  "version",
  "tag",
  "format",
  "indent",
  "detail",
  "direction",
  "value",
]);

const BYPASS_TRANSLATION_PATH_SEGMENTS = [
  "slug",
  "href",
  "url",
  "filename",
  "sourcePath",
  "mimeType",
  "src",
  "path",
];

const UNTRANSLATED_EXACT_ALLOWLIST = new Set([
  "ROS",
  "OpenCV",
  "YOLO",
  "LabVIEW",
  "OpenBlock",
  "Arduino",
  "STM32",
  "LLM",
  "VLM",
  "PS2",
  "Type-C",
  "Ubuntu",
  "Python",
  "C++",
  "成果：",
]);

const ADDITIONAL_TRANSLATIONS: Array<{ zh: string; en: string; ja: string }> = [
  {
    zh: "联系渠道资源",
    en: "Contact Assets",
    ja: "連絡チャネル素材",
  },
  {
    zh: "三层控制板全景（Arduino + STM32F407 + RDK X5）",
    en: "Three-layer controller board overview (Arduino + STM32F407 + RDK X5)",
    ja: "三層制御基板の全景（Arduino + STM32F407 + RDK X5）",
  },
  {
    zh: "轮播图",
    en: "Carousel",
    ja: "カルーセル",
  },
  {
    zh: "服务单",
    en: "Support Ticket",
    ja: "サポートチケット",
  },
  {
    zh: "使用 MPU6050.cpp 获取姿态信息。",
    en: "Use `MPU6050.cpp` to obtain posture data.",
    ja: "`MPU6050.cpp` を使用して姿勢情報を取得する。",
  },
  {
    zh: "陀螺仪传感器",
    en: "Gyroscope Sensor",
    ja: "ジャイロセンサー",
  },
  {
    zh: "调用 HBR640.h 完成语音识别与指令触发。",
    en: "Use `HBR640.h` to complete speech recognition and command triggering.",
    ja: "`HBR640.h` を呼び出して音声認識とコマンドトリガーを実現する。",
  },
  {
    zh: "掌握摄像头视频显示与 AI 视觉推理流程。",
    en: "Master camera video display and AI vision inference workflows.",
    ja: "カメラ映像表示と AI ビジョン推論のワークフローを習得する。",
  },
  {
    zh: "AI 视觉传感器",
    en: "AI Vision Sensor",
    ja: "AIビジョンセンサー",
  },
  {
    zh: "使用 OpenCV/dlib 进行人脸检测、特征提取与识别应用。",
    en: "Use OpenCV/dlib for face detection, feature extraction, and recognition.",
    ja: "OpenCV/dlib を用いて顔検出、特徴抽出、認識アプリケーションを行う。",
  },
  {
    zh: "人脸识别",
    en: "Face Recognition",
    ja: "顔認識",
  },
  {
    zh: "编写视觉算法识别地面轨迹，实现视觉循迹。",
    en: "Write vision algorithms to detect ground trajectories and realize visual line following.",
    ja: "地面軌跡を識別する視覚アルゴリズムを作成し、ビジュアルラインフォローを実現する。",
  },
  {
    zh: "视觉巡线",
    en: "Visual Line Following",
    ja: "ビジュアルラインフォロー",
  },
  {
    zh: "部署 YOLO 模型完成实时目标检测与分类。",
    en: "Deploy a YOLO model for real-time object detection and classification.",
    ja: "YOLO モデルをデプロイし、リアルタイムの物体検出と分類を行う。",
  },
  {
    zh: "YOLO 部署",
    en: "YOLO Deployment",
    ja: "YOLO デプロイ",
  },
  {
    zh: "使用 LabelImg/RectLabel 创建并管理自定义视觉数据集。",
    en: "Use LabelImg/RectLabel to create and manage custom vision datasets.",
    ja: "LabelImg/RectLabel を使用して独自のビジョンデータセットを作成・管理する。",
  },
  {
    zh: "在 RDK X5 上部署深度学习模型，完成实时水果识别。",
    en: "Deploy deep learning models on RDK X5 for real-time fruit recognition.",
    ja: "RDK X5 上に深層学習モデルをデプロイし、リアルタイム果物認識を行う。",
  },
  {
    zh: "水果识别",
    en: "Fruit Recognition",
    ja: "果物認識",
  },
  {
    zh: "结合视觉识别与机械臂控制，实现自动化抓取搬运。",
    en: "Combine visual recognition with robotic arm control to achieve automated picking and handling.",
    ja: "視覚認識とロボットアーム制御を組み合わせ、自動把持搬送を実現する。",
  },
  {
    zh: "机械臂识别搬运",
    en: "Robotic Arm Recognition and Handling",
    ja: "ロボットアーム認識搬送",
  },
  {
    zh: "云台、四轴、SCARA 三种方案",
    en: "Three options: gimbal, four-axis, and SCARA.",
    ja: "ジンバル、4軸、SCARA の3方式。",
  },
  {
    zh: "四轮转向复合机器人",
    en: "Four-Wheel Steering Composite Robot",
    ja: "四輪操舵複合ロボット",
  },
  {
    zh: "掌握原理、配置流程，完成全参调试与地图生成。",
    en: "Master the principles and configuration workflow to complete full-parameter tuning and map generation.",
    ja: "原理と設定フローを理解し、全パラメータ調整と地図生成を完了する。",
  },
  {
    zh: "Gmapping 构建地图",
    en: "Map Building with Gmapping",
    ja: "Gmapping による地図作成",
  },
  {
    zh: "暂无内容占位符",
    en: "Placeholder for Upcoming Content",
    ja: "プレースホルダー（内容準備中）",
  },
  {
    zh: "答案：文档产品覆盖K12、中职、高职、本科、研究生 / 科研全教育阶段，不同阶段推荐产品如下：",
    en: "Answer: The products in this document cover all educational stages from K12 and secondary vocational education to higher vocational, undergraduate, postgraduate, and research. Recommended products by stage are as follows:",
    ja: "回答：本資料の製品は、K12、中等職業教育、高等職業教育、学部、大学院、研究まで、全ての教育段階をカバーしています。段階別の推奨製品は以下のとおりです。",
  },
  {
    zh: "K12、中职 / 高职一年级、大一：推荐具身机器人创新设计套装 Ubot MR20（0.98 万元），其零编程基础入门（图形化编程）、低组装难度，可开展机器人通识实践，适配 5 种底盘 + 3 种机械臂搭建，满足入门认知需求；",
    en: "K12, secondary vocational / first-year higher vocational, and first-year undergraduate: the recommended product is the embodied robot innovation design kit Ubot MR20 (RMB 9,800). It supports zero-programming-basics entry through graphical programming, has low assembly difficulty, enables general robotics practice, and supports 5 chassis types plus 3 robotic arm configurations for introductory learning needs;",
    ja: "K12、中等職業教育 / 高等職業教育1年生、大学1年生：推奨製品は具身ロボット革新設計キット Ubot MR20（0.98万元）です。グラフィカルプログラミングによりプログラミング未経験でも導入しやすく、組立難度も低いため、ロボットの基礎実習に適しています。5種類のシャーシと3種類のロボットアーム構成に対応し、入門学習ニーズを満たします。",
  },
  {
    zh: "本科（基础课程）：推荐具身机器人创新设计平台（增强版）GX-MAT-09S（3.88 万元），支持机械原理、传感器检测、ROS 入门等核心课程，可搭 11 种底盘 + 7 种机械臂，覆盖课堂实验与竞赛训练；",
    en: "Undergraduate foundation courses: the recommended product is the embodied robot innovation design platform (enhanced edition) GX-MAT-09S (RMB 38,800). It supports core courses such as mechanical principles, sensor inspection, and ROS fundamentals, and can build 11 chassis types plus 7 robotic arm configurations, covering classroom experiments and competition training;",
    ja: "学部基礎科目：推奨製品は具身ロボット革新設計プラットフォーム（強化版）GX-MAT-09S（3.88万元）です。機械原理、センサ検出、ROS入門などの中核科目を支援し、11種類のシャーシと7種類のロボットアーム構成を組み立てられるため、授業実験から競技訓練まで幅広く対応できます。",
  },
  {
    zh: "本科（进阶课程）、研究生 / 科研：推荐具身智能任务规划实训平台 RAI-P4（3.4 万元），集成大模型与机器人技术，可开展任务规划、语音/视觉融合等智能系统研究。",
    en: "Undergraduate advanced courses and postgraduate / research use: the recommended product is the embodied intelligence task planning training platform RAI-P4 (RMB 34,000). It integrates large-model and robotics technologies and supports research on task planning and speech/vision fusion intelligent systems.",
    ja: "学部上級科目、および大学院 / 研究用途：推奨製品は具身知能タスクプランニング実習プラットフォーム RAI-P4（3.4万元）です。大規模モデル技術とロボット技術を統合しており、タスクプランニングや音声・視覚融合型の知能システム研究に活用できます。",
  },
  {
    zh: "答案：最适配的产品为便携式 ROS 导航机器人学习平台 UNI-WR2（0.45 万元）和具身机器人创新设计平台（增强版）GX-MAT-09S（3.88 万元），核心优势如下：",
    en: "Answer: The most suitable products for ROS and mobile robot navigation courses are the portable ROS navigation robot learning platform UNI-WR2 (RMB 4,500) and the embodied robot innovation design platform (enhanced edition) GX-MAT-09S (RMB 38,800). Their core advantages are as follows:",
    ja: "回答：ROS と移動ロボットナビゲーションの授業に最も適している製品は、ポータブル ROS ナビゲーションロボット学習プラットフォーム UNI-WR2（0.45万元）と、具身ロボット革新設計プラットフォーム（強化版）GX-MAT-09S（3.88万元）です。主な優位点は以下のとおりです。",
  },
  {
    zh: "• 部署灵活：极致便携（<13cm，<550g），最小 60cm×60cm 桌面即可实现 SLAM 导航，无需大型场地；",
    en: "• Flexible deployment: ultra-portable (<13 cm, <550 g), enabling SLAM navigation on a tabletop as small as 60 cm × 60 cm without requiring a large site;",
    ja: "• 導入の柔軟性：超小型・軽量（13cm未満、550g未満）で、最小 60cm×60cm の卓上スペースでも SLAM ナビゲーションを実現でき、大きな実験場を必要としません。",
  },
  {
    zh: "• 教学深度：将 ROS 工程化部署拆解为 5 步（原理→演示→框架解构→功能包配置→全参调试），结合 Cartographer / Hector / Gmapping 3 种导航方式，设计递进式实验；",
    en: "• Teaching depth: ROS engineering deployment is broken down into 5 steps (principles → demonstration → framework decomposition → package configuration → full-parameter tuning), combined with Cartographer, Hector, and Gmapping navigation methods to form progressive experiments;",
    ja: "• 教学の深さ：ROS の工学的な導入プロセスを 5 段階（原理 → デモ → フレームワーク分解 → 機能パッケージ設定 → 全パラメータ調整）に分解し、Cartographer、Hector、Gmapping の3種類のナビゲーション方式と組み合わせて段階的な実験を設計できます。",
  },
  {
    zh: "• 成本友好：单价 0.45 万元，适合批量采购用于学生分组实验。",
    en: "• Cost-friendly: priced at RMB 4,500 per unit, making it suitable for bulk procurement for student group experiments.",
    ja: "• コスト面の優位性：単価 0.45万元で、学生のグループ実験向けにまとめて導入しやすい価格です。",
  },
  {
    zh: "• 功能全面：支持 ROS 课程，可搭 11 种底盘 + 7 种机械臂，结合激光雷达（测距 0.12-8m），覆盖移动机器人导航与定位实践；",
    en: "• Comprehensive functions: supports ROS courses, can assemble 11 chassis types plus 7 robotic arm configurations, and with the lidar module (range 0.12-8 m) covers mobile robot navigation and localization practice;",
    ja: "• 機能の充実：ROS 授業を支援し、11種類のシャーシと7種類のロボットアーム構成を組み立て可能です。さらに LiDAR（測距範囲 0.12〜8m）と組み合わせることで、移動ロボットのナビゲーションと自己位置推定の実習をカバーできます。",
  },
  {
    zh: "• 算力支撑：配备 RDK X5 主板（10TOPS），预装 Ubuntu+ROS，支撑 SLAM 建图、自主避障等复杂算法的运行与调试。",
    en: "• Computing support: equipped with an RDK X5 mainboard (10 TOPS) and preinstalled Ubuntu + ROS, supporting the execution and tuning of complex algorithms such as SLAM mapping and autonomous obstacle avoidance.",
    ja: "• 計算性能：RDK X5 メインボード（10TOPS）を搭載し、Ubuntu + ROS をプリインストール。SLAM 地図作成や自律障害物回避などの複雑なアルゴリズムの実行と調整を支えます。",
  },
  {
    zh: "答案：支持大模型集成应用的产品有 3 款：",
    en: "Answer: There are three products that support large-model integration:",
    ja: "回答：大規模モデル連携アプリケーションに対応する製品は 3 種類あります。",
  },
  {
    zh: "RAI-P4（3.4 万元）：集成通义千问、Deepseek、火山引擎；可实现 ASR（通义千问）、LLM（Deepseek）、TTS（火山引擎）、Function-call（如语音对话计算器、音乐播放、云台 / 机械臂任务规划），并支持与 YOLO / 人脸追踪、机械臂控制的集成应用。",
    en: "RAI-P4 (RMB 34,000): integrates Qwen, DeepSeek, and Volcano Engine; supports ASR (Qwen), LLM (DeepSeek), TTS (Volcano Engine), and function calling (such as voice-dialog calculators, music playback, and gimbal / robotic arm task planning), and also supports integrated applications with YOLO, face tracking, and robotic arm control.",
    ja: "RAI-P4（3.4万元）：通義千問、DeepSeek、火山引擎を統合。ASR（通義千問）、LLM（DeepSeek）、TTS（火山引擎）、Function-call（音声対話型計算機、音楽再生、ジンバル / ロボットアームのタスクプランニングなど）を実現でき、YOLO・顔追跡・ロボットアーム制御との統合アプリケーションにも対応します。",
  },
  {
    zh: "RAI-M4（2.4 万元）：接入 Deepseek（LLM）、通义千问（ASR + 多模态）；可实现自然语言转机器人任务流程（语音指令控制底盘 / 机械臂）、多模态物体检测（通义千问），结合麦轮底盘与 4 轴机械臂实现泛化操作。",
    en: "RAI-M4 (RMB 24,000): connects to DeepSeek (LLM) and Qwen (ASR + multimodal); supports converting natural language into robot task workflows (voice commands for chassis / robotic arm control) and multimodal object detection (Qwen), combining a mecanum chassis and a 4-axis robotic arm to achieve generalized manipulation.",
    ja: "RAI-M4（2.4万元）：DeepSeek（LLM）と通義千問（ASR + マルチモーダル）に対応。自然言語をロボットタスクフローへ変換する機能（音声指令によるシャーシ / ロボットアーム制御）や、マルチモーダル物体検出（通義千問）を実現し、メカナムシャーシと4軸ロボットアームを組み合わせた汎用操作が可能です。",
  },
  {
    zh: "RAI-Q2（3.2 万元）：调用通义千问 VLM；可实现多模态视觉检测（水果检测与标记、未知物体识别），结合深度相机和高精度转台，适配机器视觉与大模型部署课程。",
    en: "RAI-Q2 (RMB 32,000): calls Qwen VLM; supports multimodal visual inspection (fruit detection and annotation, unknown object recognition), and with a depth camera and high-precision turntable, fits machine vision and large-model deployment courses.",
    ja: "RAI-Q2（3.2万元）：通義千問 VLM を利用。マルチモーダル視覚検出（果物検出とマーキング、未知物体認識）を実現し、深度カメラと高精度ターンテーブルを組み合わせることで、マシンビジョンおよび大規模モデル導入の授業に適しています。",
  },
  {
    zh: "QQ群聊二维码",
    en: "QR code for the QQ group chat",
    ja: "QQグループチャットのQRコード",
  },
  {
    zh: "微信公众号二维码",
    en: "QR code for the WeChat official account",
    ja: "WeChat公式アカウントのQRコード",
  },
  {
    zh: "提交成功！我们会尽快与您联系。",
    en: "Submitted successfully! We will contact you soon.",
    ja: "送信が完了しました。できるだけ早くご連絡します。",
  },
  {
    zh: "提交失败！请重试或尝试通过悬浮窗与我们获取联系。",
    en: "Submission failed! Please try again or contact us via the floating contact widget.",
    ja: "送信に失敗しました。再度お試しいただくか、フローティング連絡ウィジェットからお問い合わせください。",
  },
];

function isObject(value: unknown): value is Record<string, any> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function containsChinese(value: string): boolean {
  return /[\u3400-\u9fff]/.test(value);
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function shouldBypassTranslation(pathParts: string[], value: string): boolean {
  if (pathParts.some((part) => BYPASS_TRANSLATION_PATH_SEGMENTS.includes(part))) {
    return true;
  }

  const lastKey = pathParts[pathParts.length - 1] ?? "";
  if (BYPASS_TRANSLATION_KEYS.has(lastKey)) {
    return true;
  }

  const trimmed = value.trim();
  if (!trimmed) return true;
  if (/^(https?:)?\/\//.test(trimmed)) return true;
  if (trimmed.startsWith("/")) return true;
  if (/^[\w.-]+\.(png|jpe?g|svg|webp|gif)$/i.test(trimmed)) return true;
  if (/^[A-Za-z0-9_.:/?&=#%+\- ]+$/.test(trimmed) && !containsChinese(trimmed)) return true;

  return false;
}

function shouldUseExistingTranslation(args: {
  zh: string;
  locale: Exclude<Locale, "zh">;
  existingValue: string | null;
}): boolean {
  const { zh, locale, existingValue } = args;

  if (typeof existingValue !== "string") return false;

  const normalizedExisting = normalizeText(existingValue);
  const normalizedZh = normalizeText(zh);

  if (!normalizedExisting) return false;
  if (normalizedExisting === normalizedZh) return false;

  // English content should never retain Han characters as a fallback.
  if (locale === "en" && containsChinese(normalizedExisting)) {
    return false;
  }

  return true;
}

function getSnapshotPath(): string {
  return path.resolve(process.cwd(), "backups", "cms_snapshot_latest.json");
}

async function readJSON(filePath: string) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function readSnapshot(): Promise<Snapshot> {
  return readJSON(getSnapshotPath()) as Promise<Snapshot>;
}

function getDocKey(collection: string, doc: SnapshotDoc): string {
  switch (collection) {
    case "mediaFolders":
      return String(doc?.slug ?? "").trim();
    case "media":
      return String(doc?.sourcePath ?? doc?.filename ?? "").trim();
    case "productSeries":
      return String(doc?.key ?? "").trim();
    case "products":
    case "caseStudies":
    case "pages":
      return String(doc?.slug ?? "").trim();
    case "faq":
      return String(doc?.sortOrder ?? 0).trim();
    default:
      return String(doc?.id ?? "").trim();
  }
}

class TranslationMemory {
  private exact: Record<Exclude<Locale, "zh">, Map<string, string>> = {
    en: new Map(),
    ja: new Map(),
  };

  private normalized: Record<Exclude<Locale, "zh">, Map<string, string>> = {
    en: new Map(),
    ja: new Map(),
  };

  add(locale: Exclude<Locale, "zh">, zhValue: unknown, translatedValue: unknown) {
    if (typeof zhValue !== "string" || typeof translatedValue !== "string") return;

    const zh = zhValue.trim();
    const target = translatedValue.trim();

    if (!zh || !target || zh === target) return;

    this.exact[locale].set(zh, target);
    this.normalized[locale].set(normalizeText(zh), target);
  }

  get(locale: Exclude<Locale, "zh">, zh: string): string | null {
    const exactMatch = this.exact[locale].get(zh.trim());
    if (exactMatch) return exactMatch;

    const normalizedMatch = this.normalized[locale].get(normalizeText(zh));
    if (normalizedMatch) return normalizedMatch;

    return null;
  }
}

function pairValues(memory: TranslationMemory, zhValue: unknown, targetValue: unknown, locale: Exclude<Locale, "zh">) {
  if (typeof zhValue === "string" && typeof targetValue === "string") {
    memory.add(locale, zhValue, targetValue);
    return;
  }

  if (Array.isArray(zhValue) && Array.isArray(targetValue)) {
    const len = Math.min(zhValue.length, targetValue.length);
    for (let i = 0; i < len; i += 1) {
      pairValues(memory, zhValue[i], targetValue[i], locale);
    }
    return;
  }

  if (isObject(zhValue) && isObject(targetValue)) {
    const sharedKeys = Object.keys(zhValue).filter((key) => key in targetValue);
    for (const key of sharedKeys) {
      pairValues(memory, zhValue[key], targetValue[key], locale);
    }
  }
}

async function buildTranslationMemory(snapshot: Snapshot) {
  const memory = new TranslationMemory();

  for (const locale of TARGET_LOCALES) {
    for (const collection of snapshot.meta.collections) {
      const zhDocs = snapshot.collections.zh[collection] ?? [];
      const targetDocs = snapshot.collections[locale][collection] ?? [];
      const targetByKey = new Map(targetDocs.map((doc) => [getDocKey(collection, doc), doc]));

      for (const zhDoc of zhDocs) {
        const key = getDocKey(collection, zhDoc);
        if (!key) continue;
        const targetDoc = targetByKey.get(key);
        if (!targetDoc) continue;
        pairValues(memory, zhDoc, targetDoc, locale);
      }
    }

    for (const globalSlug of snapshot.meta.globals) {
      const zhDoc = snapshot.globals.zh[globalSlug];
      const targetDoc = snapshot.globals[locale][globalSlug];
      if (!zhDoc || !targetDoc) continue;
      pairValues(memory, zhDoc, targetDoc, locale);
    }
  }

  const messageFiles = [
    "common.json",
    "home.json",
    "pages.json",
    "products.json",
    "contact.json",
    "customSolutions.json",
    "developers.json",
    "detailLabels.json",
    "error.json",
    "pageIntro.json",
    "caseStudies.json",
    "cases.json",
  ];

  for (const locale of TARGET_LOCALES) {
    for (const file of messageFiles) {
      const zhJson = await readJSON(path.resolve(process.cwd(), "messages", "zh", file));
      const targetJson = await readJSON(path.resolve(process.cwd(), "messages", locale, file));
      pairValues(memory, zhJson, targetJson, locale);
    }
  }

  for (const mapping of TRANSLATIONS) {
    memory.add("en", mapping.zh, mapping.en);
    memory.add("ja", mapping.zh, mapping.ja);
  }

  for (const mapping of ADDITIONAL_TRANSLATIONS) {
    memory.add("en", mapping.zh, mapping.en);
    memory.add("ja", mapping.zh, mapping.ja);
  }

  for (const entry of caseStudiesData) {
    for (const locale of TARGET_LOCALES) {
      pairValues(memory, entry.locales.zh, entry.locales[locale], locale);
    }
  }

  return memory;
}

type UntranslatedRecord = {
  path: string;
  value: string;
};

function translateMultiline(
  memory: TranslationMemory,
  zh: string,
  locale: Exclude<Locale, "zh">,
  existingValue: string | null,
  pathLabel: string,
  untranslated: Record<Exclude<Locale, "zh">, UntranslatedRecord[]>,
): string {
  const lines = zh.split("\n");
  if (lines.length <= 1) {
    return translateString(memory, zh, locale, existingValue, pathLabel, untranslated);
  }

  const translatedLines = lines.map((line, index) => {
    const existingLine = existingValue?.split("\n")[index] ?? null;
    return translateString(memory, line, locale, existingLine, `${pathLabel}[${index}]`, untranslated);
  });

  return translatedLines.join("\n");
}

function translateString(
  memory: TranslationMemory,
  zh: string,
  locale: Exclude<Locale, "zh">,
  existingValue: string | null,
  pathLabel: string,
  untranslated: Record<Exclude<Locale, "zh">, UntranslatedRecord[]>,
): string {
  if (!zh.trim()) return zh;
  if (UNTRANSLATED_EXACT_ALLOWLIST.has(zh.trim())) return zh;

  const direct = memory.get(locale, zh);
  if (direct) return direct;

  if (zh.includes("\n")) {
    return translateMultiline(memory, zh, locale, existingValue, pathLabel, untranslated);
  }

  if (shouldUseExistingTranslation({ zh, locale, existingValue })) {
    return existingValue;
  }

  if (!containsChinese(zh)) return zh;

  untranslated[locale].push({ path: pathLabel, value: zh });
  return zh;
}

function transformFromZh(args: {
  zhValue: unknown;
  targetValue: unknown;
  locale: Exclude<Locale, "zh">;
  pathParts: string[];
  memory: TranslationMemory;
  untranslated: Record<Exclude<Locale, "zh">, UntranslatedRecord[]>;
}): unknown {
  const { zhValue, targetValue, locale, pathParts, memory, untranslated } = args;

  if (Array.isArray(zhValue)) {
    const targetArray = Array.isArray(targetValue) ? targetValue : [];
    return zhValue.map((item, index) =>
      transformFromZh({
        zhValue: item,
        targetValue: targetArray[index],
        locale,
        pathParts: [...pathParts, String(index)],
        memory,
        untranslated,
      }),
    );
  }

  if (isObject(zhValue)) {
    const targetObject = isObject(targetValue) ? targetValue : {};
    const next: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(zhValue)) {
      next[key] = transformFromZh({
        zhValue: value,
        targetValue: targetObject[key],
        locale,
        pathParts: [...pathParts, key],
        memory,
        untranslated,
      });
    }
    return next;
  }

  if (typeof zhValue === "string") {
    if (shouldBypassTranslation(pathParts, zhValue)) return zhValue;
    const existingValue = typeof targetValue === "string" ? targetValue : null;
    return translateString(memory, zhValue, locale, existingValue, pathParts.join("."), untranslated);
  }

  return zhValue;
}

function collectUnchangedChinese(args: {
  zhValue: unknown;
  targetValue: unknown;
  pathParts: string[];
  untranslated: UntranslatedRecord[];
}) {
  const { zhValue, targetValue, pathParts, untranslated } = args;

  if (Array.isArray(zhValue) && Array.isArray(targetValue)) {
    const len = Math.min(zhValue.length, targetValue.length);
    for (let i = 0; i < len; i += 1) {
      collectUnchangedChinese({
        zhValue: zhValue[i],
        targetValue: targetValue[i],
        pathParts: [...pathParts, String(i)],
        untranslated,
      });
    }
    return;
  }

  if (isObject(zhValue) && isObject(targetValue)) {
    for (const [key, value] of Object.entries(zhValue)) {
      collectUnchangedChinese({
        zhValue: value,
        targetValue: targetValue[key],
        pathParts: [...pathParts, key],
        untranslated,
      });
    }
    return;
  }

  if (typeof zhValue !== "string" || typeof targetValue !== "string") return;
  if (!containsChinese(zhValue)) return;
  if (UNTRANSLATED_EXACT_ALLOWLIST.has(zhValue.trim())) return;
  if (shouldBypassTranslation(pathParts, zhValue)) return;
  if (normalizeText(zhValue) !== normalizeText(targetValue)) return;

  untranslated.push({
    path: pathParts.join("."),
    value: zhValue,
  });
}

async function main() {
  const snapshot = await readSnapshot();
  const nextSnapshot: Snapshot = JSON.parse(JSON.stringify(snapshot));
  const memory = await buildTranslationMemory(snapshot);
  const untranslated: Record<Exclude<Locale, "zh">, UntranslatedRecord[]> = {
    en: [],
    ja: [],
  };

  for (const locale of TARGET_LOCALES) {
    for (const collection of snapshot.meta.collections) {
      const zhDocs = snapshot.collections.zh[collection] ?? [];
      const targetDocs = snapshot.collections[locale][collection] ?? [];
      const targetByKey = new Map(targetDocs.map((doc) => [getDocKey(collection, doc), doc]));

      nextSnapshot.collections[locale][collection] = zhDocs.map((zhDoc) => {
        const key = getDocKey(collection, zhDoc);
        const targetDoc = targetByKey.get(key) ?? null;

        return transformFromZh({
          zhValue: zhDoc,
          targetValue: targetDoc,
          locale,
          pathParts: ["collections", locale, collection, key || "unknown"],
          memory,
          untranslated,
        }) as SnapshotDoc;
      });
    }

    for (const globalSlug of snapshot.meta.globals) {
      nextSnapshot.globals[locale][globalSlug] = transformFromZh({
        zhValue: snapshot.globals.zh[globalSlug],
        targetValue: snapshot.globals[locale][globalSlug],
        locale,
        pathParts: ["globals", locale, globalSlug],
        memory,
        untranslated,
      }) as SnapshotDoc;
    }

    for (const collection of snapshot.meta.collections) {
      const zhDocs = snapshot.collections.zh[collection] ?? [];
      const targetDocs = nextSnapshot.collections[locale][collection] ?? [];

      for (let index = 0; index < zhDocs.length; index += 1) {
        const zhDoc = zhDocs[index];
        const targetDoc = targetDocs[index];
        const key = getDocKey(collection, zhDoc) || String(index);

        collectUnchangedChinese({
          zhValue: zhDoc,
          targetValue: targetDoc,
          pathParts: ["collections", locale, collection, key],
          untranslated: untranslated[locale],
        });
      }
    }

    for (const globalSlug of snapshot.meta.globals) {
      collectUnchangedChinese({
        zhValue: snapshot.globals.zh[globalSlug],
        targetValue: nextSnapshot.globals[locale][globalSlug],
        pathParts: ["globals", locale, globalSlug],
        untranslated: untranslated[locale],
      });
    }
  }

  nextSnapshot.meta.generatedAt = new Date().toISOString();

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outPath = path.resolve(process.cwd(), "backups", `cms_snapshot_sync_from_zh_${timestamp}.json`);
  const auditPath = path.resolve(process.cwd(), "backups", `cms_snapshot_sync_audit_${timestamp}.json`);
  await fs.writeFile(outPath, JSON.stringify(nextSnapshot, null, 2), "utf8");

  const auditOutput: Record<Exclude<Locale, "zh">, { untranslatedCount: number; items: UntranslatedRecord[] }> = {
    en: { untranslatedCount: 0, items: [] },
    ja: { untranslatedCount: 0, items: [] },
  };

  for (const locale of TARGET_LOCALES) {
    const unique = new Map<string, UntranslatedRecord>();
    for (const item of untranslated[locale]) {
      const key = `${item.path}::${item.value}`;
      if (!unique.has(key)) unique.set(key, item);
    }

    auditOutput[locale] = {
      untranslatedCount: unique.size,
      items: [...unique.values()],
    };

    const top = [...unique.values()].slice(0, 50);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({
      locale,
      untranslatedCount: unique.size,
      samples: top,
    }, null, 2));
  }

  await fs.writeFile(auditPath, JSON.stringify(auditOutput, null, 2), "utf8");

  // eslint-disable-next-line no-console
  console.log(`[sync] wrote ${path.relative(process.cwd(), outPath)}`);
  // eslint-disable-next-line no-console
  console.log(`[sync] audit ${path.relative(process.cwd(), auditPath)}`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
