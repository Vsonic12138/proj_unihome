export const dictionary = {
    header: {
      menu: {
        home: "ホーム",
        products: "製品紹介",
        developer: "開発者サービス",
        customSolutions: "カスタム協業",
        caseStudies: "導入事例",
        about: "会社概要",
        submenu: {
          knowledgeBase: "ナレッジベース",
          openSource: "オープンソース",
          caseUniversities: "大学事例",
          caseK12: "K12事例",
          caseCoResearch: "共同研究",
        },
      },
      languageSwitcher: {
        label: "言語",
        options: [
          { locale: "en", label: "英語" },
          { locale: "zh", label: "中国語" },
          { locale: "ja", label: "日本語" },
        ],
      },
    },
    hero: {
      slides: [
        {
          id: 1,
          media: {
            kind: "image",
            src: "/images/hero/slide-1.png",
            alt: "具現化知能イノベーション拠点",
          },
          action: {
            href: "/products",
            label: "プラットフォームを見る",
          },
        },
        {
          id: 2,
          media: {
            kind: "image",
            src: "/images/hero/slide-2.png",
            alt: "教育ロボットの統合ソリューション",
          },
          action: {
            href: "/developers",
            label: "開発者ハブへ",
          },
        },
        {
          id: 3,
          media: {
            kind: "image",
            src: "/images/hero/slide-3.png",
            alt: "産学連携のイノベーションスペース",
          },
          action: {
            href: "/case-studies",
            label: "導入事例を見る",
          },
        },
      ],
      primaryCta: {
        label: "製品プラットフォームを見る",
        href: "#features",
      },
      secondaryCta: {
        label: "お問い合わせ",
        href: "#contact",
      },
      autoPlayInterval: 6000,
    },
    features: {
      title: "プロダクトプラットフォーム",
      paragraph:
        "「啓発・探求・革新・共有」の理念のもと、ハードウェア・ソフトウェア・カリキュラム・サービスを統合した具現化知能プロダクトプラットフォームを提供し、教育・研究・産業連携をシームレスにつなぎます。",
      featuredProducts: {
        title: "厳選プロダクトラインアップ",
        description:
          "導入準備・高度授業・研究開発の3段階をカバーする代表的なソリューションを厳選し、具現化知能プログラムの立ち上げを加速させます。",
        ctaDescription: "教育・研究計画に最適な全ラインアップを確認しますか？",
        viewAllLabel: "全ての製品を見る",
        slugs: ["ubot-mr20", "gx-mat-09s", "rai-p4"],
      },
      highlights: [
        {
          title: "エンドツーエンドの導入支援",
          description: "ハード・ソフト・カリキュラム・サービスを一体提供し、導入と運用の負担を最小限に抑えます。",
        },
        {
          title: "多様なシナリオに対応",
          description: "K12、高専、大学、研究機関まで幅広く対応し、授業・競技・ラボ構築に柔軟に適合します。",
        },
        {
          title: "モジュール型の拡張性",
          description: "複数のシャーシやロボットアーム、AIモジュールを組み合わせ、LLM・ビジョン・制御など横断的な実践を支援します。",
        },
      ],
    },
    about: {
      sectionTwo: {
        items: [
          {
            title: "啓発・探求・革新",
            paragraph:
              "「啓発・探求・革新・共有」の核心理念に基づいて具現化知能ロボット学習プラットフォームを構築し、学生のロボット技術への興味と創造性を刺激します。",
          },
          {
            title: "段階的カリキュラム体系",
            paragraph:
              "具現化ロボット技術を体系的に分析し、各教育段階の特性に合わせてコンテンツを調整することで、段階的で多様なカリキュラムを設計し、学習を段階的で分かりやすいものにします。",
          },
          {
            title: "オープンソース・エコシステム",
            paragraph:
              "継続的にオープンソースのオンライン学習コミュニティを構築し、質の高い教材リソースと技術ドキュメントを集約して、具現化知能ロボット教育の普及と発展を促進します。",
          },
        ],
      },
    },
    contact: {
      formTitle: "お困りですか？サポートチケットを送信してください",
      formDescription: "サポートチームができるだけ早くメールでご連絡します。",
      form: {
        nameLabel: "お名前",
        namePlaceholder: "お名前を入力してください",
        emailLabel: "メールアドレス",
        emailPlaceholder: "メールアドレスを入力してください",
        messageLabel: "メッセージ",
        messagePlaceholder: "ご相談内容をお書きください",
        submit: "チケットを送信",
      },
    },
    footer: {
      description:
        "有你同创知能ロボット科技（北京）有限公司\n- 北京市石景山区首鋼園ウィンターオリンピック広場内に所在\n- 具現化知能ロボット技術の教育・研究・応用に注力\n- 住所：北京市石景山区料仓路6号院10号楼3階101-2",
      columns: {
        usefulLinks: {
          title: "製品",
          items: [
            { label: "製品プラットフォーム概要", path: "/products" },
            { label: "ソリューションマトリクス", path: "/#features" },
            { label: "導入事例", path: "/case-studies" },
          ],
        },
        terms: {
          title: "開発者サービス",
          items: [
            { label: "開発者センター", path: "/developers" },
            { label: "技術ドキュメント", path: "/developers/knowledge-base" },
            { label: "オープンソース", path: "/developers/open-source" },
          ],
        },
        support: {
          title: "カスタム協業",
          items: [
            { label: "カスタムソリューション", path: "/custom-solutions" },
            { label: "共同研究プログラム", path: "/case-studies/co-research" },
            { label: "お問い合わせ", path: "/contact" },
          ],
        },
      },
      contact: {
        phoneLabel: "電話",
        phoneNumber: "+86 176 1035 7571",
        phoneTip: "平日 09:30〜18:00（GMT+8）",
        taobaoLabel: "淘宝（タオバオ）店舗",
        taobaoHref:
          "https://4vhhasmxqjt25cg7za43qs6podckjow.taobao.com/shop/view_shop.htm?appUid=RAzN8HWTBLcKSRgwfJESLCpphyAguSqzhXdc1GyTLumi8JFoD49&spm=a21n57.1.hoverItem.1",
        bilibiliLabel: "Bilibili公式チャンネル",
        bilibiliHref:
          "https://space.bilibili.com/1888573035?spm_id_from=333.337.search-card.all.click",
        modalClose: "閉じる",
        qq: {
          title: "公式QQグループに参加",
          description:
            "811348489グループに参加して、教材や最新情報を受け取りましょう。",
        },
        wechat: {
          title: "公式WeChatをフォロー",
          description:
            "公式アカウントをフォローして、授業資料とイベント情報を受け取れます。",
        },
      },
    },
    pages: {
      home: {
        title: "有你同创 · 具現化知能教育プラットフォーム",
        description:
          "有你同创知能ロボット科技（北京）有限公司は、具現化知能ロボットのハード・ソフト・カリキュラム・サービスを統合し、大学や職業教育での教育・研究の革新を支援します。",
      },
      about: {
        title: "会社概要",
        description:
          "チームのビジョンと能力を紹介し、訪問者が私たちの背景と価値観をすばやく理解できるようにします。",
      },
      contact: {
        title: "お問い合わせ",
        description:
          "ご質問や協力提案がある場合は、お気軽にお知らせください。できるだけ早く返信いたします。",
      },
      products: {
        title: "製品紹介",
        description:
          "教育・研究分野に向けたプロフェッショナルな具現化ロボットソリューションを提供します。入門から上級までをカバーする7つのコア製品で構成された豊富な製品マトリクスは、機械・電子・人工知能の技術を深く融合し、柔軟な機能拡張性と充実したサポート体制を備えています。K12段階のロボット入門教育、中高等専門学校の実践的スキルトレーニング、さらには大学・研究機関での最先端研究まで、ニーズに的確にマッチ。利用者が具現化知能ロボットの無限の可能性を探求し、教育・研究の最良のパートナーを見つけられるよう支援します。",
      },
      developerServices: {
        title: "開発者サービス",
        description:
          "ロボットプラットフォーム向けの技術サポート、SDKガイド、連携リソースを提供し、開発をスピードアップします。",
      },
      knowledgeBase: {
        title: "ナレッジベース",
        description:
          "ハードウェアのセットアップ、ソフトウェア設定、授業運用に関するドキュメントやチュートリアルを参照できます。",
      },
      openSource: {
        title: "オープンソース",
        description:
          "ロボットやAIに関連するオープンリポジトリ、コミュニティの取り組み、共同プロジェクトをご覧ください。",
      },
      customSolutions: {
        title: "カスタム協業",
        description:
          "大学や企業パートナー向けに、ハードウェアカスタマイズ、カリキュラム設計、研究グレードのロボットソリューションを提供します。",
      },
      caseStudies: {
        title: "導入事例",
        description:
          "授業、競技会、共同研究などで、各パートナーが当社ロボットソリューションをどのように活用しているかをご紹介します。",
      },
      caseUniversities: {
        title: "大学事例",
        description:
          "大学が実験室構築や授業カリキュラム、イノベーションセンターに当社プラットフォームをどのように導入しているかをご覧ください。",
      },
      caseK12: {
        title: "K12事例",
        description:
          "小中高校が当社のロボット教材を用いて、STEM教育やロボットリテラシーをどのように育成しているかを紹介します。",
      },
      caseCoResearch: {
        title: "共同研究",
        description:
          "知能ロボットやAIなどの分野で当社技術を活用した共同研究の成果をご覧ください。",
      },
    },
    products: {
      catalog: {
        coreTitle: "7つのコア製品",
        coreDescription:
          "入門から上級まで、K12から大学・研究までをカバー。",
        viewDetailsCta: "詳細を見る",
        series: [
          {
            key: "m-series",
            title: "Mシリーズ · カリキュラム設計プラットフォーム",
            description:
              "入門啓発から研究強化まで、モジュール構成とカリキュラム設計に特化した学習キット。",
            items: [
              {
                slug: "ubot-mr20",
                name: "具現化ロボット革新デザインキット Ubot MR20",
                model: "Ubot MR20",
                image: "/images/products/ubot-mr20-main.jpg",
                brief: "具現化知能ロボット革新デザインキット（二十合一）。AI通識教育実践キットと組み合わせ、ゼロから20種類以上の知能ロボットを構築でき、ブロック型/C++/Pythonマルチ言語プログラミングをサポート。",
              },
              {
                slug: "gx-mat-09s",
                name: "具現化ロボット革新デザインプラットフォーム（強化版）GX-MAT-09S",
                model: "GX-MAT-09S",
                image: "/images/video/video.jpg",
                brief:
                  "11種シャーシ + 7種アーム、88種複合形態、LiDAR + RDK X5 追加。上級授業・研究向け。",
              },
            ],
          },
          {
            key: "p-series",
            title: "Pシリーズ · タスク実習プラットフォーム",
            description:
              "視覚・航法・計画・LLM 連携など、具現化知能タスクの実装に特化した実習システム。",
            items: [
              {
                slug: "rai-p4",
                name: "具現化ロボットタスク計画 総合実習プラットフォーム RAI-P4",
                model: "RAI-P4",
                image: "/images/video/video.jpg",
                brief:
                  "AI音声/視覚、4自由度アーム、ROS2 対応。大規模言語モデル応用・コンピュータビジョン・ROS授業向け。",
              },
              {
                slug: "uni-wr2",
                name: "携帯型 ROS ナビゲーション 学習プラットフォーム UNI-WR2",
                model: "UNI-WR2",
                image: "/images/video/video.jpg",
                brief:
                  "<13cm のコンパクト、デスクトップ展開（60×60cm）、3種のナビ方式。ROS・移動ロボット授業向け。",
              },
              {
                slug: "rai-q2",
                name: "具現化ビジョン認識・意思決定 実習プラットフォーム RAI-Q2",
                model: "RAI-Q2",
                image: "/images/video/video.jpg",
                brief:
                  "深度カメラ + 高精度回転台/昇降ガイド、OpenCV/YOLO/VLM 対応。ビジョン・ML授業向け。",
              },
              {
                slug: "rai-m4",
                name: "具現化複合ロボット システム設計実習プラットフォーム RAI-M4",
                model: "RAI-M4",
                image: "/images/video/video.jpg",
                brief:
                  "メカナム全方向シャーシ + 4軸アーム、DeepSeek/通義千問に接続。移動ロボット航法・LLM導入向け。",
              },
              {
                slug: "alo-le4",
                name: "具現化ロボット 操作計画 総合実習プラットフォーム ALO-LE4",
                model: "ALO-LE4",
                image: "/images/video/video.jpg",
                brief:
                  "二つの5自由度アーム（主従追従）、ACT アーキテクチャ、調光可能な照明。模倣学習・E2E制御研究向け。",
              },
            ],
          },
        ],
      },
      faq: {
        title: "重要な質問",
        items: [
          {
            q: "Q1：本ドキュメントの製品はどの教育段階をカバーし、各段階で推奨されるコア製品は？",
            a:
              "A：K12、専門・高専、高等職業、学部、大学院／研究まで幅広くカバーします。段階別の推奨は以下の通りです。\n\n" +
              "K12／専門・高専1年／学部1年：Ubot MR205（0.98 万元）。ゼロから始められるブロック型プログラミング、組立難易度も低く、ロボットの通識実践に最適。5種シャーシ＋3種アームの構築に対応し、入門的な認知ニーズを満たします。\n\n" +
              "学部（基礎科目）：GX‑MAT‑0916（2.68 万元）。機械原理、センサ計測、マイコン基礎などのコア科目に対応。8種シャーシ＋6種アームを構築でき、5種類の競技に適合。授業実践や競技トレーニングに最適。\n\n" +
              "学部（上級科目）・大学院／研究：GX‑MAT‑09S23（3.88 万元）または RAI‑P433（3.4 万元）。前者は LiDAR と RDK X5（10TOPS）を追加し、ROSや移動ロボット航法など上級授業に対応。後者は大規模言語モデルとロボットを統合し、知能システム統合の研究に適します。",
          },
          {
            q: "Q2：大学で“ROS”および“移動ロボット航法”の授業を行う場合、どの製品が最適で、その強みは？",
            a:
              "A：UNI‑WR245（0.45 万元）と GX‑MAT‑09S23（3.88 万元）が最適です。\n\n" +
              "UNI‑WR245：\n" +
              "• 柔軟な導入：超小型（<13cm、<550g）。最小 60×60cm の机上で SLAM ナビが可能で、大規模なスペース不要。\n" +
              "• 教育の深さ：ROS のエンジニアリング導入を 5段階（原理→デモ→フレームワーク分解→パッケージ設定→全パラ調整）に分解。Cartographer／Hector／Gmapping の3方式で段階的に学習。\n" +
              "• コスト効率：0.45 万元で、グループ実験用の一括導入に最適。\n\n" +
              "GX‑MAT‑09S23：\n" +
              "• 機能の充実：ROS 授業を追加サポート。11種シャーシ＋7種アームの構築に対応し、LiDAR（0.12–8m）と組み合わせて航法と位置決めの実践が可能。\n" +
              "• 計算資源：RDK X5（10TOPS）＋Ubuntu+ROS により、SLAM 地図作成や自律回避など複雑なアルゴリズムの実装・チューニングを支援。",
          },
          {
            q: "Q3：大規模言語モデル統合に対応する製品はどれで、何ができますか？",
            a:
              "A：以下の3製品が LLM を活用した応用に対応します。\n\n" +
              "RAI‑P433（3.4 万元）：通義千問、Deepseek、火山エンジンを統合。ASR（通義千問）、LLM（Deepseek）、TTS（火山）、Function‑call（音声対話電卓、音楽再生、ジンバル／アームのタスク計画）を実現。YOLO／顔追跡やアーム制御との統合も可能。\n\n" +
              "RAI‑M438（2.4 万元）：Deepseek（LLM）と通義千問（ASR＋マルチモーダル）に接続。自然言語指示をロボットタスクへ（シャーシ移動／把持など）。通義千問のマルチモーダル認識により物体検出を実行。メカナム全方向シャーシ＋4軸アームで汎化操作に対応。\n\n" +
              "RAI‑Q242（3.2 万元）：通義千問 VLM を活用したマルチモーダル視覚。果物の検出・ラベリングや未知物体の認識に対応。深度カメラ＋高精度ターンテーブルにより、視覚・LLM 配備の精密なチューニングと検証が可能。",
          },
        ],
      },
      detailLabels: {
        highlights: "主な特長",
        applicable: "対象/シナリオ",
        features: "製品特徴",
        sampleCases: "サンプル構成",
        modules: "ロボットモジュール",
        chassis: "ロボットシャーシ",
        arms: "ロボットアーム構成",
        compositeRobots: "複合ロボット",
        sensorConfig: "センサ構成",
        controllerConfig: "コントローラ構成",
        softwareConfig: "ソフトウェア構成",
        experiments: "実験項目",
        configuration: "構成",
        specs: "技術仕様",
        comingSoon: "近日公開",
      },
      details: {
        "ubot-mr20": {
          name: "Ubot MR20",
          subtitle: "具現化知能ロボット革新デザインキット(二十合一)",
          model: "Ubot MR20",
          image: "/images/products/ubot-mr20-main.jpg",
          overview: "Ubot MR20はロボットと人工知能の通識教育実践キットを組み合わせたもので、学習者は20種類以上の知能ロボットをゼロから構築でき、音声認識を組み合わせることで、学習者にロボットにおける人工知能技術の応用を理解させることができます。学習者はブロックプログラミング/C++プログラミングを通じて、ロボットの障害物回避、ライントレース、姿勢検出などの知能機能を開発することもできます。",
          applicable: "K12、専門・高専1年、学部1年生",
          features: [
            {
              title: "プログラミング方式",
              content: "MR20の使用には、学習者にプログラミングの基礎知識は一切必要ありません。ブロック型プログラミングを採用しており、子供たちはドラッグ＆ドロップするだけでロボットのプログラミングを完成できます。もし学習者にプログラミングの基礎があり、より複雑で専門的なコードプログラミングを行いたい場合は、C++およびPythonのコードプログラミング方式もサポートしています。"
            },
            {
              title: "組立方式",
              content: "組立難易度を一つ一つの穴の設計まで細かく考慮し、間隔、サイズ、ねじ穴かどうかなどを含め、強度を確保しながら、不要なナットをできるだけ減らして組立難易度を下げ、学習者が入門しやすく、学習のエネルギーを全体設計に集中できるようにしています。"
            }
          ],
          sampleCases: {
            description: "サンプル機はモジュール設計を採用し、ロボットシャーシ構成は差動輪モジュール、方向輪モジュール、全方向輪モジュール、操舵輪モジュール、全方向メカナムホイールモジュール、グリッパーモジュール、スイングモジュールを組み合わせて、三輪二駆差動シャーシ、三輪二駆前輪操舵シャーシ、四輪二駆差動シャーシ、四輪四駆差動シャーシ、四輪四駆メカナム全方向シャーシを設計しています。ロボットアーム構成はスイングモジュール、ターンテーブルモジュール、グリッパーモジュールを組み合わせて、雲台、3自由度ロボットアーム、4自由度ロボットアーム構成を設計しています。",
            modules: [
              { name: "差動輪モジュール", image: "/images/products/ubot-mr20/modules/differential-wheel.png" },
              { name: "全方向輪モジュール", image: "/images/products/ubot-mr20/modules/universal-wheel.png" },
              { name: "操舵輪モジュール", image: "/images/products/ubot-mr20/modules/steering-wheel.png" },
              { name: "全方向メカナムホイールモジュール", image: "/images/products/ubot-mr20/modules/omni-wheel.png" },
              { name: "グリッパーモジュール", image: "/images/products/ubot-mr20/modules/gripper.png" },
              { name: "スイングモジュール", image: "/images/products/ubot-mr20/modules/swing.png" }
            ],
            chassis: [
              { name: "三輪二駆全方向差動移動ロボット", image: "/images/products/ubot-mr20/chassis/three-wheel-omni-differential.png" },
              { name: "三輪二駆前輪操舵移動ロボット", image: "/images/products/ubot-mr20/chassis/three-wheel-front-steering.png" },
              { name: "四輪二駆差動移動ロボット", image: "/images/products/ubot-mr20/chassis/four-wheel-two-drive-differential.png" },
              { name: "四輪四駆差動移動ロボット", image: "/images/products/ubot-mr20/chassis/four-wheel-four-drive-differential.png" },
              { name: "四輪四駆メカナム全方向移動ロボット", image: "/images/products/ubot-mr20/chassis/four-wheel-mecanum-omni.png" }
            ],
            arms: [
              { name: "二自由度雲台", image: "/images/products/ubot-mr20/arms/two-dof-gimbal.png" },
              { name: "3自由度ロボットアーム", image: "/images/products/ubot-mr20/arms/three-dof-arm.png" },
              { name: "4自由度ロボットアーム", image: "/images/products/ubot-mr20/arms/four-dof-arm.png" }
            ],
            compositeRobots: [
              { name: "三輪二駆全方向グリッパーロボット", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-gripper.png" },
              { name: "三輪二駆全方向二自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-2dof-transport.png" },
              { name: "三輪二駆全方向三自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-3dof-transport.png" },
              { name: "三輪二駆全方向四自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-4dof-transport.png" },
              { name: "三輪二駆前輪操舵グリッパーロボット", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-gripper.png" },
              { name: "三輪二駆前輪操舵二自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-2dof-transport.png" },
              { name: "三輪二駆前輪操舵三自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-3dof-transport.png" },
              { name: "三輪二駆前輪操舵四自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-4dof-transport.png" },
              { name: "四輪二駆差動グリッパーロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-gripper.png" },
              { name: "四輪二駆差動二自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-2dof-transport.png" },
              { name: "四輪二駆差動三自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-3dof-transport.png" },
              { name: "四輪二駆差動四自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-4dof-transport.png" },
              { name: "四輪四駆差動グリッパーロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-gripper.png" },
              { name: "四輪四駆差動二自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-2dof-transport.png" },
              { name: "四輪四駆差動三自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-3dof-transport.png" },
              { name: "四輪四駆差動四自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-4dof-transport.png" },
              { name: "四輪四駆メカナム全方向グリッパーロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-gripper.png" },
              { name: "四輪四駆メカナム全方向二自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-2dof-transport.png" },
              { name: "四輪四駆メカナム全方向三自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-3dof-transport.png" },
              { name: "四輪四駆メカナム全方向四自由度搬送ロボット", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-4dof-transport.png" }
            ]
          },
          sensorConfig: {
            description: "姿勢検出センサ、4チャンネルライントレースセンサ、超音波センサ×2、音声認識センサ、スピーカーモジュール、PSコントローラリモコンを統合し、ロボットの自動障害物回避、迷路走行、自律バック駐車、自律ライントレース、音声対話および音声指令制御、コントローラリモート制御などの機能を実現できます。学生はMR20を使って面白いプロジェクト開発を行うこともできます。例えば、月面に上陸して科学者の調査を支援するなど！",
            list: [
              "六軸ジャイロセンサ",
              "四線ライントレースセンサ",
              "超音波センサ",
              "音声認識センサ",
              "スピーカーモジュール",
              "リモートコントローラ"
            ]
          },
          controllerConfig: {
            description: "コントローラは一般的なプログラミング言語プログラムの入力をサポートし、ブロック型、C++、Pythonなどのプログラミング言語でプログラムを作成できます。豊富なインターフェースが含まれており、6チャンネルDCモータインターフェース、8チャンネルサーボインターフェース、4チャンネル超音波インターフェース、4チャンネルライントレースセンサインターフェース、4チャンネル拡張IOセンサインターフェース、USBシリアルポートなどがあります。コントローラはスタッカブルデザインを採用し、拡張ドックとの接続用スペースを予約しており、ユーザーが他の電子ハードウェアとコントローラを接続して使用するのに便利です。"
          },
          softwareConfig: {
            description: "ソフトウェアはOpenBlockプログラミングソフトウェアを統合し、ブロック型プログラミングとC++、Pythonコードプログラミングをサポートし、ソフトウェアプログラミングにもハードウェアデバイスプログラミングにも使用でき、ハードウェアコード生成およびコンパイルダウンロード機能をサポートし、ハードウェアデバイスとの間のリアルタイム通信を通じて実現されるリアルタイム実行モードもサポートしています。",
            ecosystem: "Openblockのハードウェアエコシステムは完全で、市場で一般的なメーカーハードウェアプラットフォーム、Arduino、MicroPython、ESP32をサポートし、ユーザーは自由に拡張できます。"
          },
          experiments: {
            summary: "本実験体系は、モジュール型ロボットの「基礎認知 - モジュール制御 - 構造構築 - 認識応用 - 総合設計 - 拡張革新」を中心に展開し、6つのコアモジュールに分かれ、32の基礎実験と20の拡張プロジェクトをカバーし、入門から上級までの完全な学習パスを形成しています。",
            preparation: {
              title: "実験準備段階",
              description: "実験前のハードウェア・ソフトウェアの基礎と設計方法論の学習に焦点を当て、その後の実習のための基礎を築く",
              items: [
                "ハードウェア・ソフトウェア環境設定の基礎：プログラミング環境のインストール、部品リストの使用、学習資料の参照、モジュール型ロボット設計方法論",
                "ロボットモジュールの基礎認知：コアモジュール（モータ、サーボ、ホイールアセンブリなど）の機能と応用ロジックを明確にする"
              ]
            },
            moduleBasics: {
              title: "ロボットモジュール基礎実験",
              range: "実験1〜実験9",
              description: "ロボットのコア機能モジュール（モータ、ホイールアセンブリ、サーボ、アクチュエータ）に対して、「原理認知 - 構築 - 制御」のクローズドループを実現し、全9実験",
              items: [
                { no: "実験1", name: "DCモータの回転制御", desc: "DCモータの正逆転、停止の制御ロジックとプログラミング実装を習得" },
                { no: "実験2", name: "DCモータの速度制御", desc: "DCモータの速度調整（例：PWM速度制御）を実現し、速度制御原理を理解" },
                { no: "実験3", name: "差動輪モジュールの構築と運動制御", desc: "差動輪の構成/応用を理解し、構築を完成し、正逆転、速度制御、停止を実現" },
                { no: "実験4", name: "全方向輪モジュールの構築と運動制御", desc: "全方向輪の構成/応用（メカナムホイール、オムニホイールなど）を理解し、構築を完成し、基本的な運動制御を実現" },
                { no: "実験6", name: "サーボモータの回転角度制御", desc: "サーボモータの動作原理（角度位置決め特性）を理解し、指定角度の精密制御を実現" },
                { no: "実験7", name: "スイングモジュールの構築と運動制御", desc: "スイングモジュールの構成/応用を理解し、構築を完成し、角度制御（ロボットアーム関節、雲台スイングなど）を実現" },
                { no: "実験8", name: "操舵輪モジュールの構築と運動制御", desc: "操舵輪の構成/応用（自動車操舵構造など）を理解し、構築を完成し、方向制御を実現" },
                { no: "実験9", name: "グリッパーモジュールの運動制御", desc: "グリッパーモジュールの構成/応用（物体把持など）を理解し、構築を完成し、開閉範囲制御を実現" }
              ]
            },
            structureDesign: {
              title: "ロボット構造設計実験",
              range: "実験10〜実験19",
              description: "基本モジュールに基づいて、ロボット全体構造の構築を完成し、「フレーム - シャーシ - 雲台 - ロボットアーム」をカバーし、全10実験",
              items: [
                { no: "実験10", name: "T型フレームの構築", desc: "部品の組立ルールを習得し、T型フレーム（ロボット構造支持部品）の組立を完成" },
                { no: "実験11", name: "矩形サスペンションフレームの構築", desc: "サスペンションフレームの構成/応用（緩衝、安定）を理解し、矩形サスペンションフレームの組立を完成" },
                { no: "実験12", name: "三輪二駆全方向差動移動ロボットの構築と運動制御", desc: "二駆全方向シャーシの構成/応用を理解し、構造組立を完成し、基本的な移動制御を実現" },
                { no: "実験13", name: "三輪二駆前輪操舵移動ロボットの構築と運動制御", desc: "二駆前輪操舵シャーシの構成/応用を理解し、構造組立を完成し、操舵と移動制御を実現" },
                { no: "実験14", name: "四輪二駆差動移動ロボットの構築と運動制御", desc: "四輪二駆差動シャーシの構成/応用を理解し、構造組立を完成し、差動操舵と移動制御を実現" },
                { no: "実験15", name: "四輪四駆差動移動ロボットの構築と運動制御", desc: "四輪四駆差動シャーシの構成/応用（より強力な動力）を理解し、構造組立と移動制御を完成" },
                { no: "実験16", name: "四輪四駆メカナム全方向移動ロボットの構築と運動制御", desc: "四輪四駆全方向シャーシの構成/応用（全方向移動特性）を理解し、構造組立と移動制御を完成" },
                { no: "実験17", name: "二自由度雲台の構築と運動制御", desc: "雲台の構成/応用（カメラ旋回など）を理解し、二自由度（水平+垂直）雲台の組立と制御を完成" },
                { no: "実験18", name: "三自由度ロボットアームの構築と運動制御", desc: "三自由度ロボットアームの構成/応用を理解し、組立を完成し、多関節協調運動制御を実現" },
                { no: "実験19", name: "四自由度ロボットアームの構築と運動制御", desc: "四自由度ロボットアームの構成/応用（より柔軟な把持）を理解し、組立を完成し、協調運動制御を実現" }
              ]
            },
            perception: {
              title: "ロボット認識基礎実験",
              range: "実験20〜実験24",
              description: "ロボットが「外界を認識する」コアセンサを学習し、データ取得と基本的なインタラクションを実現し、全5実験",
              items: [
                { no: "実験20", name: "超音波センサデータ取得", desc: "超音波センサの原理/応用（距離測定、障害物回避）を理解し、センサデータの読み取りを実現" },
                { no: "実験21", name: "ライントレースセンサデータ取得", desc: "ライントレースセンサの原理/応用（軌跡に沿って歩く）を理解し、センサデータの読み取りを実現" },
                { no: "実験22", name: "姿勢検出センサデータ取得", desc: "ジャイロセンサの原理/応用（ロボットの姿勢検出：傾斜、回転角度）を理解し、データの読み取りを実現" },
                { no: "実験23", name: "音声認識対話", desc: "音声認識センサの原理/応用を理解し、認識語彙を設定し、音声対話インタラクションを実現" },
                { no: "実験24", name: "リモコンデータ取得", desc: "リモコンの原理/応用（無線制御）を理解し、リモコン各ボタンのデータ読み取りとコマンド受信を実現" }
              ]
            },
            comprehensiveProjects: {
              title: "ロボット総合プロジェクト設計",
              range: "実験25〜実験32",
              description: "「モジュール制御 + 構造 + 認識」を組み合わせ、実際のシナリオをシミュレートして複雑なタスクを実現し、全8実験",
              items: [
                { no: "実験25", name: "ロボット壁沿い走行", desc: "壁沿い歩行シナリオ（廊下パトロールなど）をシミュレートし、センサ（超音波など）+ プログラミングを通じて壁沿い歩行を実現" },
                { no: "実験26", name: "ロボット迷路走行", desc: "迷路探索シナリオをシミュレートし、超音波センサで障害物を検出し、プログラミングで迷路経路計画と歩行を実現" },
                { no: "実験27", name: "ロボット追従", desc: "追従シナリオ（付き添いロボットなど）をシミュレートし、超音波センサで目標距離を検出し、人の歩行に追従することを実現" },
                { no: "実験28", name: "ロボットライントレース", desc: "レストラン配達シナリオをシミュレートし、ライントレースセンサで地面の軌跡に沿って移動し、指定地点で物品搬送タスクを完了" },
                { no: "実験29", name: "音声制御ロボット運動", desc: "音声インタラクションロボットシナリオをシミュレートし、音声認識でコマンドを受信し、ロボットに対応する動作（前進、旋回など）を制御して完成させる" },
                { no: "実験30", name: "ジェスチャー制御雲台", desc: "「リアルスティール」インタラクションシナリオをシミュレートし、姿勢センサ（リストバンド、携帯電話など）で手の姿勢を検出し、雲台を制御して動作を完成" },
                { no: "実験31", name: "ロボットアーム検出搬送", desc: "産業/コーヒーロボットシナリオをシミュレートし、多自由度ロボットアームワークステーションを構築し、プログラミングで「自動タスク検出 - ロボットアーム搬送制御」クローズドループを実現" },
                { no: "実験32", name: "リモート制御搬送AGVロボット", desc: "物流/ガイドシナリオをシミュレートし、「移動 + 搬送」複合ロボットを構築し、リモコン制御で物品転送タスクを完了" }
              ]
            },
            extensionProjects: {
              title: "ロボット拡張プロジェクト",
              range: "プロジェクト1〜プロジェクト20",
              description: "前述の「シャーシタイプ + アクチュエータ」を組み合わせて革新し、「移動 + 把持/搬送」機能に焦点を当て、全20プロジェクト",
              groups: [
                {
                  chassis: "三輪二駆全方向シャーシ",
                  projects: [
                    "三輪二駆全方向グリッパーロボット",
                    "三輪二駆全方向二自由度搬送ロボット",
                    "三輪二駆全方向三自由度搬送ロボット",
                    "三輪二駆全方向四自由度搬送ロボット"
                  ]
                },
                {
                  chassis: "三輪二駆前輪操舵シャーシ",
                  projects: [
                    "三輪二駆前輪操舵グリッパーロボット",
                    "三輪二駆前輪操舵二自由度搬送ロボット",
                    "三輪二駆前輪操舵三自由度搬送ロボット",
                    "三輪二駆前輪操舵四自由度搬送ロボット"
                  ]
                },
                {
                  chassis: "四輪二駆差動シャーシ",
                  projects: [
                    "四輪二駆差動グリッパーロボット",
                    "四輪二駆差動二自由度搬送ロボット",
                    "四輪二駆差動三自由度搬送ロボット",
                    "四輪二駆差動四自由度搬送ロボット"
                  ]
                },
                {
                  chassis: "四輪四駆差動シャーシ",
                  projects: [
                    "四輪四駆差動グリッパーロボット",
                    "四輪四駆差動二自由度搬送ロボット",
                    "四輪四駆差動三自由度搬送ロボット",
                    "四輪四駆差動四自由度搬送ロボット"
                  ]
                },
                {
                  chassis: "四輪四駆メカナム全方向シャーシ",
                  projects: [
                    "四輪四駆メカナム全方向グリッパーロボット",
                    "四輪四駆メカナム全方向二自由度搬送ロボット",
                    "四輪四駆メカナム全方向三自由度搬送ロボット",
                    "四輪四駆メカナム全方向四自由度搬送ロボット"
                  ]
                }
              ]
            }
          },
          specs: [
            "ロボットモジュール：7種（差動輪、全方向輪、操舵輪、全方向メカナムホイール、グリッパー、スイング、ターンテーブル）",
            "ロボットシャーシ：5種（三輪二駆全方向差動、三輪二駆前輪操舵、四輪二駆差動、四輪四駆差動、四輪四駆メカナム全方向）",
            "ロボットアーム構成：3種（二自由度雲台、3自由度ロボットアーム、4自由度ロボットアーム）",
            "複合ロボット：20種（シャーシ + ロボットアームの各種組み合わせ形態）",
            "実験プロジェクト：32の基礎実験 + 20の拡張プロジェクト",
            "DCモータ：減速比48",
            "サーボモータ：トルク30kgf.cm"
          ]
        },
        "gx-mat-0916": {
          name: "具現化複合ロボット革新デザインセット（上級）",
          model: "GX-MAT-0916",
          image: "/images/video/video.jpg",
          overview:
            "大学実習や各種コンテスト向けの複合ロボット設計プラットフォーム。多種シャーシ/アーム構成とデュアル制御に対応。",
          highlights: ["8種シャーシ", "6種アーム", "48種複合形態", "STM32 + Arduino"],
          applicable: "大学の授業実践、各種競技",
        },
        "gx-mat-09s23": {
          name: "具現化複合ロボット革新デザインセット（強化版）",
          model: "GX-MAT-09S23",
          image: "/images/video/video.jpg",
          overview:
            "上級版をベースにセンサと計算資源を強化。LiDAR と RDK X5 を追加し、より多くの形態と研究応用に対応。",
          highlights: ["11種シャーシ", "7種アーム", "88種複合形態", "LiDAR + RDK X5"],
          applicable: "上級授業、研究開発",
        },
        "rai-p433": {
          name: "具現化ロボットタスク計画 総合実習プラットフォーム",
          model: "RAI-P433",
          image: "/images/video/video.jpg",
          overview:
            "AI音声/視覚モジュールと4自由度アームを統合。ROS2 に対応し、計画と認識の学習に適します。",
          highlights: ["AI音声/視覚", "4自由度アーム", "ROS2対応"],
          applicable: "LLM応用、コンピュータビジョン、ROS",
        },
        "rai-m438": {
          name: "具現化複合ロボット システム設計実習プラットフォーム",
          model: "RAI-M438",
          image: "/images/video/video.jpg",
          overview:
            "メカナム全方向シャーシと4軸アーム、各種LLMに接続可能。システム設計や航法授業に最適。",
          highlights: ["メカナム全方向", "4軸アーム", "LLM接続"],
          applicable: "移動ロボット航法、LLM導入",
        },
        "rai-q242": {
          name: "具現化ビジョン認識・意思決定 実習プラットフォーム",
          model: "RAI-Q242",
          image: "/images/video/video.jpg",
          overview:
            "深度カメラと高精度ステージを搭載し、OpenCV/YOLO/VLM 等のアルゴリズム学習に対応。",
          highlights: ["深度カメラ", "高精度回転台/昇降ガイド", "OpenCV/YOLO/VLM"],
          applicable: "コンピュータビジョン、機械学習",
        },
        "uni-wr245": {
          name: "携帯型 ROS ナビゲーション 学習プラットフォーム",
          model: "UNI-WR245",
          image: "/images/video/video.jpg",
          overview:
            "コンパクトなデスクトップ型ナビゲーションプラットフォームで、ROS実験環境を素早く構築可能。",
          highlights: ["<13cm コンパクト", "60×60cm デスクトップ", "3種ナビ方式"],
          applicable: "ROS、移動ロボット",
        },
        "alo-le449": {
          name: "具現化ロボット 操作計画 総合実習プラットフォーム",
          model: "ALO-LE449",
          image: "/images/video/video.jpg",
          overview:
            "主従追従の二つの5自由度アームと調光照明、ACTアーキテクチャにより、模倣学習やE2E制御研究に適合。",
          highlights: ["5自由度×2アーム（主従）", "ACTアーキテクチャ", "調光照明"],
          applicable: "模倣学習、エンドツーエンド制御",
        },
      },
      supportResources: {
        title: "共通サポートリソース",
        items: [
          "実験チュートリアル：手順、原理解説、重要ポイント",
          "ソースコード：プログラム一式とライブラリ",
          "構造図面：3D 設計図（STP 形式）",
          "ハードウェア：モジュール化部品、各種 IDE 対応（Keil5、Arduino IDE、VS Code など）",
        ],
      },
    },
    common: {
      aria: {
        mobileMenu: "ナビゲーションメニューを開閉",
        themeToggle: "ライトモードとダークモードを切り替え",
        scrollToTop: "ページトップに戻る",
        sharePost: "ソーシャルプラットフォームで共有",
        socialLink: "私たちのSNSプロフィールを見る",
        closeModal: "ダイアログを閉じる",
      },
    },
    floatingContact: {
      panelLabel: "お問い合わせ",
      fabLabel: "連絡先を開く",
      closeLabel: "連絡先を閉じる",
      qqGroup: {
        label: "QQグループ",
        number: "811348489",
        tooltip: "QQグループ番号をコピー",
        copy: "コピー",
        copied: "コピーしました！",
      },
      phone: {
        label: "電話",
        name: "佘様",
        number: "+86 176 1035 7571",
        tooltip: "電話番号をコピー",
        copy: "コピー",
        copied: "コピーしました！",
      },
      taobao: {
        label: "Taobaoストア",
        tooltip: "Taobaoストアを訪問",
        linkText: "訪問",
        href: "https://4vhhasmxqjt25cg7za43qs6podckjow.taobao.com/shop/view_shop.htm?appUid=RAzN8HWTBLcKSRgwfJESLCpphyAguSqzhXdc1GyTLumi8JFoD49&spm=a21n57.1.hoverItem.1",
      },
      bilibili: {
        label: "Bilibiliチャンネル",
        tooltip: "Bilibiliチャンネルを開く",
        linkText: "移動",
        href: "https://space.bilibili.com/1888573035?spm_id_from=333.337.search-card.all.click",
      },
      wechat: {
        label: "WeChat公式アカウント",
        tooltip: "QRコードを表示",
        comingSoon: "QRコードをスキャンしてWeChat公式アカウントをフォローしてください",
      },
    },
    buttons: {
      readMore: "続きを読む",
      keepReading: "続きを読む",
    },
    forms: {
      emailPlaceholder: "メールアドレスを入力してください",
      passwordPlaceholder: "パスワードを入力してください",
      passwordLabel: "パスワード",
    },
    error: {
      title: "ページを見つけられません",
      description:
        "アクセスしようとしたページは削除されたか、名前が変更された可能性があります。ホームに戻ってお探しください。",
      button: "ホームに戻る",
    },
};

  export type JapaneseDictionary = typeof dictionary;
