import "dotenv/config";
import { getPayload } from "payload";
import config from "../../payload.config";

type Locale = "zh" | "en" | "ja";
const LOCALES: Locale[] = ["zh", "en", "ja"];

// Simple Lexical JSON builder
const buildLexical = (nodes: { type: string, tag?: string, text?: string, items?: string[] }[]) => {
  const children = nodes.map(n => {
    if (n.type === "heading") {
      return {
        type: "heading",
        version: 1,
        tag: n.tag || "h2",
        format: "",
        indent: 0,
        children: [{ type: "text", version: 1, text: n.text, detail: 0, format: 0, mode: "normal", style: "" }]
      };
    } else if (n.type === "paragraph") {
      return {
        type: "paragraph",
        version: 1,
        format: "",
        indent: 0,
        children: [{ type: "text", version: 1, text: n.text, detail: 0, format: 0, mode: "normal", style: "" }]
      };
    } else if (n.type === "list") {
      return {
        type: "list",
        version: 1,
        tag: "ul",
        listType: "bullet",
        format: "",
        indent: 0,
        start: 1,
        children: (n.items || []).map(item => ({
          type: "listitem",
          version: 1,
          format: "",
          indent: 0,
          value: 1,
          children: [{ type: "text", version: 1, text: item, detail: 0, format: 0, mode: "normal", style: "" }]
        }))
      };
    }
  }).filter(Boolean);

  return { root: { type: "root", version: 1, format: "", indent: 0, direction: "ltr", children } };
};

const cnNodes = [
  { type: "heading", tag: "h3", text: "1. 公司简介与核心优势" },
  { type: "paragraph", text: "有你同创作为领先的教育机器人解决方案提供商，致力于为全球合作伙伴提供从硬件研发、软件开发到课程体系的“交钥匙”工程。我们深知每一个教育品牌都有其独特的教学理念和市场定位，因此我们推出了ODM和OEM深度定制服务，助力合作伙伴快速构建自有品牌产品线，抢占STEM教育市场先机。" },
  { type: "paragraph", text: "我们的核心优势：" },
  { type: "list", items: [
    "全栈式能力： 同时具备硬件设计、底层固件、软件平台、课程研发能力的教育机器人ODM服务商。",
    "模块化设计： 我们搭建了一套涵盖114种具身复合机器人的模块化机器人平台，并且还为此搭建了一套模块化的机器人课程知识库。可根据客户的定价、功能需求、样机方案、课程选择等定制化需求快速形成一套标准方案。",
    "开放生态： 平台兼容市面上大多数机器人控制器模块、传感器模块、通信模块，软件支持图形化编程与代码（C++/Python）编程，可方便的与合作伙伴现有体系兼容。"
  ]},
  { type: "heading", tag: "h3", text: "2. 服务范围总览" },
  { type: "paragraph", text: "我们提供以下三个维度的定制服务，您可以选择单项服务，也可选择全套解决方案：" },
  { type: "list", items: [
    "ODM 服务（设计+制造）",
    "OEM 服务（贴牌生产）",
    "硬件：结构设计、主板开发、传感器定制、外观开模",
    "软件：功能模块开发、Logo替换、域名绑定",
    "课程：基于硬件的原创教案开发、赛事规则定制；现有课程品牌化包装、翻译与本地化"
  ]},
  { type: "heading", tag: "h3", text: "3. 硬件定制服务" },
  { type: "heading", tag: "h4", text: "3.1 标准硬件平台（基础选型）" },
  { type: "paragraph", text: "我们拥有成熟的标准化主控器、执行器与传感器库，支持快速选型与组合：" },
  { type: "list", items: [
    "主控系列：ESP32、Arduino、STM32、树莓派、RDK X5、NVIDIA Jetson",
    "执行机构：PWM舵机、总线舵机、直流编码器电机、TT马达、一体化关节电机",
    "传感器库：超声波、巡线、近红外、开关、陀螺仪、语音识别、摄像头、激光雷达等",
    "交互模块库：OLED显示屏、LCD显示屏、灯条",
    "通信模块库：WiFi、蓝牙、NRF"
  ]},
  { type: "heading", tag: "h4", text: "3.2 ODM 深度定制" },
  { type: "paragraph", text: "如果您有全新的产品构想，我们提供：" },
  { type: "list", items: [
    "结构设计： 根据教学场景（如专业课程、科创设计、创新竞赛）进行3D结构设计。",
    "PCBA开发： 原理图设计、Layout、嵌入式程序开发，支持蓝牙/WiFi物联网功能。",
    "外观ID设计： 从概念草图到CMF（色彩、材料、工艺）的全流程设计。",
    "模具制造： 协助对接模具厂，跟进试模与量产。"
  ]},
  { type: "heading", tag: "h4", text: "3.3 OEM 贴牌生产" },
  { type: "list", items: [
    "品牌标识： 外包装丝印您的Logo。",
    "色彩定制： 根据您的品牌VI，定制包装色号。",
    "包装定制： 设计并生产带有您品牌形象的内托与彩盒包装。"
  ]},
  { type: "heading", tag: "h3", text: "4. 课程与服务定制" },
  { type: "heading", tag: "h4", text: "4.1 课程体系开发" },
  { type: "paragraph", text: "我们的教研团队可以帮助您构建完整的教学壁垒：" },
  { type: "list", items: [
    "课程阶梯： 基于我们的硬件和知识库定制递进式阶段课程大纲。",
    "教案编写： 提供标准化的教案（包含：教学目标、流程分解、搭建步骤图、程序解析）。",
    "PPT与视频： 配套教学PPT制作，以及精品搭建演示视频录制。"
  ]},
  { type: "heading", tag: "h4", text: "4.2 师训与认证" },
  { type: "list", items: [
    "授权讲师培训： 为您的教师团队提供标准化的培训课程。",
    "等级考试/赛事定制： 协助您设计基于该硬件的内部等级考试或小型竞赛规则。"
  ]},
  { type: "heading", tag: "h3", text: "5. 合作流程" },
  { type: "list", items: [
    "1. 需求沟通： 客户提交品牌定位、预算、功能需求。",
    "2. 方案提案： 我们提供硬件选型建议、软件Demo演示及课程样本。",
    "3. 签约打样： 签订保密协议及开发合同。",
    "4. 样品确认： 提供工程样机、软件测试版、课程样章供客户测试验收。",
    "5. 量产交付： 批量生产、老化测试、包装出货。"
  ]},
  { type: "heading", tag: "h3", text: "6. 联系我们" },
  { type: "paragraph", text: "立即开启您的品牌定制之旅！" },
  { type: "list", items: [
    "联系人： 易峰",
    "联系电话：您可以填写下方表单，客户经理易峰将在一系列工作日内尽快与您联络并提供服务！",
  ]}
];

const enNodes = [
  { type: "heading", tag: "h3", text: "1. Company Profile & Core Advantages" },
  { type: "paragraph", text: "As a leading provider of educational robotics solutions, UniHome is committed to delivering \"turnkey\" projects for global partners, from hardware R&D and software development to curriculum systems. We understand that every educational brand has its unique teaching philosophy and market positioning. Therefore, we have launched in-depth ODM and OEM customization services to help partners quickly build their own brand product lines and seize opportunities in the STEM education market." },
  { type: "paragraph", text: "Our Core Advantages:" },
  { type: "list", items: [
    "Full-Stack Capabilities: An educational robotics ODM provider with hardware design, low-level firmware, software platform, and curriculum R&D capabilities.",
    "Modular Design: We have built a modular robotics platform covering 114 types of embodied composite robots, along with a modular robotics curriculum knowledge base. Standard solutions can be quickly formed based on highly customized requirements, such as pricing, functionality, prototype design, and curriculum selection.",
    "Open Ecosystem: The platform is compatible with most existing robot controller modules, sensor modules, and communication modules in the market. The software supports both graphical and code-based (C++/Python) programming, easily integrating into our partners' existing ecosystems."
  ]},
  { type: "heading", tag: "h3", text: "2. Overview of Service Scope" },
  { type: "paragraph", text: "We provide customization services in the following three dimensions. You can select individual services or opt for a complete solution:" },
  { type: "list", items: [
    "ODM Services (Design + Manufacturing)",
    "OEM Services (White Label Production)",
    "Hardware: Structural design, motherboard development, sensor customization, and appearance molding.",
    "Software: Functional module development, logo replacement, and domain binding.",
    "Curriculum: Original lesson plan development based on hardware, competition rule customization; branding, translation, and localization of existing courses."
  ]},
  { type: "heading", tag: "h3", text: "3. Hardware Customization Services" },
  { type: "heading", tag: "h4", text: "3.1 Standard Hardware Platform (Basic Selection)" },
  { type: "paragraph", text: "We have a mature library of standardized main controllers, actuators, and sensors, supporting rapid selection and combination:" },
  { type: "list", items: [
    "Main Controllers: ESP32, Arduino, STM32, Raspberry Pi, RDK X5, NVIDIA Jetson",
    "Actuators: PWM servos, serial bus servos, DC encoder motors, TT motors, integrated joint motors",
    "Sensors: Ultrasonic, line tracking, near-infrared, switches, gyroscopes, voice recognition, cameras, LiDAR, etc.",
    "Interactive Modules: OLED displays, LCD displays, LED strips",
    "Communication Modules: WiFi, Bluetooth, NRF"
  ]},
  { type: "heading", tag: "h4", text: "3.2 Deep ODM Customization" },
  { type: "paragraph", text: "If you have entirely new product concepts, we provide:" },
  { type: "list", items: [
    "Structural Design: 3D structural design tailored to teaching scenarios (e.g., professional courses, scientific innovation, innovation competitions).",
    "PCBA Development: Schematic design, layout, embedded program development, supporting Bluetooth/WiFi IoT functions.",
    "Appearance ID Design: Full-process design from conceptual sketches to CMF (Color, Material, Finish).",
    "Mold Manufacturing: Assist in coordinating with mold factories, following up on mold trials and mass production."
  ]},
  { type: "heading", tag: "h4", text: "3.3 OEM White Label Production" },
  { type: "list", items: [
    "Brand Identity: Silkscreen your logo on the outer packaging.",
    "Color Customization: Customize packaging colors according to your brand VI.",
    "Packaging Customization: Design and produce inner trays and color box packaging featuring your brand image."
  ]},
  { type: "heading", tag: "h3", text: "4. Curriculum and Service Customization" },
  { type: "heading", tag: "h4", text: "4.1 Curriculum System Development" },
  { type: "paragraph", text: "Our teaching and research team can help you build comprehensive teaching barriers:" },
  { type: "list", items: [
    "Curriculum Ladder: Customize progressive curriculum outlines based on our hardware and knowledge base.",
    "Lesson Plan Writing: Provide standardized lesson plans (including: teaching objectives, process breakdown, assembly step diagrams, and program parsing).",
    "PPTs and Videos: Production of supporting teaching PPTs and recording of high-quality assembly demonstration videos."
  ]},
  { type: "heading", tag: "h4", text: "4.2 Teacher Training and Certification" },
  { type: "list", items: [
    "Authorized Instructor Training: Provide standardized training courses for your team of teachers.",
    "Grading/Competition Customization: Assist you in designing internal grading exams or small competition rules based on the hardware."
  ]},
  { type: "heading", tag: "h3", text: "5. Cooperation Process" },
  { type: "list", items: [
    "1. Requirement Communication: The client submits brand positioning, budget, and functional requirements.",
    "2. Solution Proposal: We provide hardware selection suggestions, software demo presentations, and curriculum samples.",
    "3. Signing and Prototyping: Sign a non-disclosure agreement (NDA) and development contract.",
    "4. Sample Confirmation: Provide engineering prototypes, beta software, and sample chapters of the curriculum for client testing and acceptance.",
    "5. Mass Production and Delivery: Batch production, aging tests, packaging, and shipping."
  ]},
  { type: "heading", tag: "h3", text: "6. Contact Us" },
  { type: "paragraph", text: "Start your brand customization journey today!" },
  { type: "list", items: [
    "Contact: Yi Feng",
    "Phone: You can fill out the form below, and account manager Yi Feng will contact you as soon as possible within working days to provide services!",
  ]}
];

const jaNodes = [
  { type: "heading", tag: "h3", text: "1. 会社概要とコアバリュー" },
  { type: "paragraph", text: "UniHomeは、教育用ロボットソリューションのリーディングプロバイダーとして、ハードウェアの研究開発、ソフトウェア開発、カリキュラム体系に至るまで、グローバルなパートナーに「ターンキー」プロジェクトを提供することに尽力しています。私たちは、各教育ブランドが独自の教育理念と市場ポジショニングを持っていることを深く理解しています。そのため、パートナーが自社ブランドの製品ラインを迅速に構築し、STEM教育市場で先行者利益を獲得できるよう、詳細なODMおよびOEMカスタマイズサービスを開始しました。" },
  { type: "paragraph", text: "私たちのコアバリュー：" },
  { type: "list", items: [
    "フルスタックの技術力：ハードウェア設計、基盤ファームウェア、ソフトウェアプラットフォーム、カリキュラム開発能力を兼ね備えた教育用ロボットのODMプロバイダーです。",
    "モジュール化設計：114種類の具現化複合ロボットを網羅するモジュール式ロボットプラットフォームを構築し、それに対応するモジュール化されたロボットカリキュラムのデータベースも整備しています。価格設定、機能要件、試作案、カリキュラム選択などのカスタマイズ要件に基づいて、標準的なソリューションを迅速に提供できます。",
    "オープンエコシステム：当社のプラットフォームは、市場にある多くのロボットコントローラモジュール、センサーモジュール、通信モジュールと互換性があります。ソフトウェアはビジュアルプログラミングとコード（C++/Python）プログラミングの両方をサポートしており、パートナーの既存のシステムと容易に連携できます。"
  ]},
  { type: "heading", tag: "h3", text: "2. 提供サービスの概要" },
  { type: "paragraph", text: "以下の3つの側面からカスタマイズサービスを提供しています。単一のサービスを選択することも、包括的なソリューションを選択することも可能です：" },
  { type: "list", items: [
    "ODMサービス（設計＋製造）",
    "OEMサービス（受託製造）",
    "ハードウェア：構造設計、マザーボード開発、センサーカスタマイズ、外観の金型製作。",
    "ソフトウェア：機能モジュールの開発、ロゴの置き換え、ドメインの紐付け。",
    "カリキュラム：ハードウェアに基づいた独自の教案作成、競技ルールのカスタマイズ。既存のカリキュラムのブランド化、翻訳およびローカライズ。"
  ]},
  { type: "heading", tag: "h3", text: "3. ハードウェアカスタマイズサービス" },
  { type: "heading", tag: "h4", text: "3.1 標準ハードウェアプラットフォーム（基本選定）" },
  { type: "paragraph", text: "成熟した標準化されたメインコントローラー、アクチュエーター、センサーのライブラリを備えており、迅速な選定と組み合わせをサポートします：" },
  { type: "list", items: [
    "メインコントローラー：ESP32、Arduino、STM32、Raspberry Pi、RDK X5、NVIDIA Jetson",
    "アクチュエーター：PWMサーボ、シリアルバスサーボ、DCエンコーダモータ、TTモータ、統合型関節モータ",
    "センサー：超音波、ライントレース、近赤外線、スイッチ、ジャイロスコープ、音声認識、カメラ、LiDARなど",
    "インタラクティブモジュール：OLEDディスプレイ、LCDディスプレイ、LEDテープ",
    "通信モジュール：WiFi、Bluetooth、NRF"
  ]},
  { type: "heading", tag: "h4", text: "3.2 プロフェッショナルODMカスタマイズ" },
  { type: "paragraph", text: "まったく新しい製品の構想がある場合、以下を提供します：" },
  { type: "list", items: [
    "構造設計：教育シーン（専門コース、技術革新設計、イノベーション競技など）に合わせた3D構造設計。",
    "PCBA開発：回路図の設計、基板レイアウト、組み込みプログラムの開発。Bluetooth/WiFiのIoT機能をサポートします。",
    "外観ID設計：コンセプトスケッチからCMF（カラー、マテリアル、フィニッシュ）までの全工程デザイン。",
    "金型製造：金型工場との調整を支援し、試作から量産までをフォローアップします。"
  ]},
  { type: "heading", tag: "h4", text: "3.3 OEM受託製造" },
  { type: "list", items: [
    "ブランドロゴ：外箱に企業ロゴをシルク印刷します。",
    "カラーカスタマイズ：ブランドVIに基づき、パッケージの色をカスタマイズします。",
    "パッケージのカスタマイズ：ブランドイメージに合った内装トレイや化粧箱の設計と製造。"
  ]},
  { type: "heading", tag: "h3", text: "4. カリキュラムおよびサービスのカスタマイズ" },
  { type: "heading", tag: "h4", text: "4.1 カリキュラム体系の開発" },
  { type: "paragraph", text: "当社の教育研究チームが、完全な教育の競争優位性を構築するお手伝いをします：" },
  { type: "list", items: [
    "カリキュラムの階層：ハードウェアと知識ベースに基づき、段階的で進歩的なカリキュラムの概要をカスタマイズします。",
    "教案の作成：標準化された教案を提供します（教育目標、プロセスの分解、組み立て手順図、プログラムの解説を含む）。",
    "PPTと動画：補足的な教育用PPTの作成や、高品質な組み立てデモンストレーション映像の録画。"
  ]},
  { type: "heading", tag: "h4", text: "4.2 教員研修と認定" },
  { type: "list", items: [
    "認定インストラクター研修：講師チーム向けに標準化された研修コースを提供します。",
    "階級試験/大会のカスタマイズ：ハードウェアに基づく内部の階級試験や小規模な競技ルールの設計を支援します。"
  ]},
  { type: "heading", tag: "h3", text: "5. 協力の流れ" },
  { type: "list", items: [
    "1. 要件確認：ブランドのポジショニング、予算、および機能要件をご提出いただきます。",
    "2. ソリューション提案：ハードウェア選定のアドバイス、ソフトウェアのデモ、カリキュラムのサンプルを提供します。",
    "3. 契約とプロトタイピング：秘密保持契約（NDA）および開発契約を締結します。",
    "4. サンプル確認：エンジニアリング試作機、ソフトウェアのベータ版、サンプルのカリキュラムを提供し、承認をいただきます。",
    "5. 量産と納品：大量生産、エージングテスト、パッケージング、出荷。"
  ]},
  { type: "heading", tag: "h3", text: "6. お問い合わせ" },
  { type: "paragraph", text: "あなたのブランドカスタマイズの旅を今すぐ始めましょう！" },
  { type: "list", items: [
    "担当者：易峰（イー・フェン）",
    "電話番号：下記のフォームにご記入ください。担当の易峰が営業日以内にご連絡し、サービスを提供いたします！",
  ]}
];


async function main() {
  const payload = await getPayload({ config });

  // 1. 获取现有页面
  const existing = await payload.find({
    collection: "pages",
    where: { slug: { equals: "custom-solutions" } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length === 0) {
     console.error("custom-solutions page not found");
     process.exit(1);
  }

  const pageId = existing.docs[0].id;

  for (const locale of LOCALES) {
     const nodes = locale === "zh" ? cnNodes : (locale === "ja" ? jaNodes : enNodes);
     const contentLexical = buildLexical(nodes);

     const textContentTitle = locale === "zh" ? "有你同创教育机器人ODM服务支持说明" : (locale === "en" ? "UniHome Education Robot ODM Support Services" : "UniHome教育ロボットODMサービスサポートについて");
     const contactTitle = locale === "zh" ? "ODM 定制咨询" : (locale === "en" ? "ODM Customization Inquiry" : "ODM カスタマイズのお問い合わせ");
     const contactDesc = locale === "zh" ? "请留下您的联系方式与基本需求，我们会指派专属的客户经理易峰与您进行专业对接。" : (locale === "en" ? "Please leave your contact details and requirements." : "連絡先と要件をご記入ください。");

     const form = {
        nameLabel: locale === "zh" ? "您的姓名" : (locale === "en" ? "Your Name" : "お名前"),
        namePlaceholder: locale === "zh" ? "请输入姓名" : (locale === "en" ? "Enter your name" : "名前を入力してください"),
        emailLabel: locale === "zh" ? "电子邮件" : (locale === "en" ? "Email" : "メールアドレス"),
        emailPlaceholder: locale === "zh" ? "请输入邮箱" : (locale === "en" ? "Enter your email" : "メールアドレスを入力"),
        phoneLabel: locale === "zh" ? "联系电话" : (locale === "en" ? "Phone Number" : "電話番号"),
        phonePlaceholder: locale === "zh" ? "请输入电话" : (locale === "en" ? "Enter your phone number" : "電話番号を入力"),
        intentionLabel: locale === "zh" ? "合作意向" : (locale === "en" ? "Cooperation Intention" : "協力の意向"),
        intentionPlaceholder: locale === "zh" ? "选择您的需求" : (locale === "en" ? "Select your needs" : "ニーズを選択してください"),
        intentionOptions: [
          { option: locale === "zh" ? "ODM 定制服务" : (locale === "en" ? "ODM Customization" : "ODMカスタマイズ") },
        ],
        messageLabel: locale === "zh" ? "详细需求说明" : (locale === "en" ? "Detailed Request" : "詳細な要望"),
        messagePlaceholder: locale === "zh" ? "请输入您的项目背景或定制需求等信息..." : (locale === "en" ? "Enter your project background..." : "プロジェクトの背景を入力..."),
        submitLabel: locale === "zh" ? "提交需求" : (locale === "en" ? "Submit Request" : "リクエストを送信"),
     };

     const seoDescription = locale === "zh" 
         ? "面向高校、职校、K12教育机器人行业支持ODM和OEM合作方式！" 
         : (locale === "en" ? "Supporting ODM and OEM cooperation modes for universities, vocational schools, and K12 educational robotics industry!" : "大学、職業学校、K12教育ロボット業界向けにODMとOEMの協力方式をサポート！");

     await payload.update({
        collection: "pages",
        id: pageId,
        locale: locale,
        overrideAccess: true,
        data: {
           seo: {
              description: seoDescription
           },
           blocks: [
              {
                 id: undefined,
                 blockType: "richText",
                 blockName: textContentTitle,
                 content: contentLexical as any,
              },
              {
                 id: undefined,
                 blockType: "contact",
                 blockName: contactTitle,
                 title: contactTitle,
                 description: contactDesc,
                 form,
              }
           ]
        }
     });

     console.log(`Updated localized content for generic custom solutions page in locale: ${locale}`);
  }
  
  console.log("Successfully overhauled ODM custom solutions page data.");
  process.exit(0);
}

main().catch(err => {
   console.error("Failed", err);
   process.exit(1);
});
