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
                image: "/images/products/gx-mat-09s/hero.png",
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
              "A：本ドキュメントの製品は K12 から中等・高等職業、学部、大学院／研究までをカバーしており、段階ごとの推奨は次の通りです。\n\n" +
              "K12／中職・高職1年／学部1年：Ubot MR20（0.98 万元）。ブロックプログラミングによるゼロからの入門、低い組立難度でロボット通識実践に最適。5 種のシャーシと 3 種のアーム構成に対応し、入門レベルの学習ニーズを満たします。\n\n" +
              "学部（基礎科目）：GX-MAT-09S（3.88 万元）。11 種のシャーシ＋7 種のアームを構築でき、機械原理、センサ計測、ROS 入門などのコア科目に対応し、授業実験と競技訓練を兼ね備えています。\n\n" +
              "学部（上級科目）・大学院／研究：RAI-P4（3.4 万元）。大規模言語モデルとロボットを統合し、タスク計画、音声／視覚融合、知能システム研究に適しています。",
          },
          {
            q: "Q2：大学で“ROS”および“移動ロボット航法”の授業を行う場合、どの製品が最適で、その強みは？",
            a:
              "A：最も適した製品は UNI-WR2（0.45 万元）と GX-MAT-09S（3.88 万元）です。\n\n" +
              "UNI-WR2:\n" +
              "• 導入の柔軟性：超小型（<13cm、<550g）。最小 60×60cm のデスクトップで SLAM ナビゲーションが可能で、大規模なスペースは不要です。\n" +
              "• 教育の深さ：ROS のエンジニアリング導入を 5 段階（原理→デモ→フレーム分解→パッケージ設定→全パラ調整）に分割し、Cartographer／Hector／Gmapping の 3 方式を通じて段階的に習得できます。\n" +
              "• コスト効率：0.45 万元で、グループ実験向けの一括導入に最適です。\n\n" +
              "GX-MAT-09S:\n" +
              "• 機能の充実：ROS カリキュラムをサポートし、11 種のシャーシ＋7 種のアーム構成に対応。LiDAR（測距 0.12–8m）と組み合わせることで、移動ロボットのナビゲーションと位置決め実践をカバーします。\n" +
              "• 計算資源：RDK X5（10TOPS）＋ Ubuntu + ROS により、SLAM マッピングや自律避障などの高度なアルゴリズム実装とチューニングを支援します。",
          },
          {
            q: "Q3：大規模言語モデル統合に対応する製品はどれで、何ができますか？",
            a:
              "A：LLM を活用した応用に対応する製品は次の 3 つです。\n\n" +
              "RAI-P4（3.4 万元）：通義千問、DeepSeek、火山引擎を統合。ASR（通義千問）、LLM（DeepSeek）、TTS（火山引擎）、Function-call（音声対話電卓、音楽再生、ジンバル／アームタスク計画）を実現し、YOLO／顔追跡やアーム制御との統合も可能です。\n\n" +
              "RAI-M4（2.4 万元）：DeepSeek（LLM）と通義千問（ASR＋マルチモーダル）に接続。自然言語指示をロボットタスク（シャーシ移動／把持）へと変換し、通義千問のマルチモーダル認識で物体検出を実行。メカナム全方向シャーシ＋4 軸アームで汎化操作に対応します。\n\n" +
              "RAI-Q2（3.2 万元）：通義千問 VLM を活用したマルチモーダル視覚を提供。果物検出・ラベリングや未知物体認識に対応し、深度カメラと高精度ターンテーブルで視覚・LLM 配備の精密なチューニング検証が可能です。",
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
            description: "コントローラは一般的なプログラミング言語プログラムの入力をサポートし、ブロック型、C++、Pythonなどのプログラミング言語でプログラムを作成できます。豊富なインターフェースが含まれており、6チャンネルDCモータインターフェース、8チャンネルサーボインターフェース、4チャンネル超音波インターフェース、4チャンネルライントレースセンサインターフェース、4チャンネル拡張IOセンサインターフェース、USBシリアルポートなどがあります。コントローラはスタッカブルデザインを採用し、拡張ドックとの接続用スペースを予約しており、ユーザーが他の電子ハードウェアとコントローラを接続して使用するのに便利です。",
            images: [
              {
                src: "/images/products/ubot-mr20/controller/controller-overview.png",
                alt: "MR20 コントローラのスタック設計と各種ポート",
                caption: "MR20 コントローラ：DC モータ、サーボ、センサ拡張ポートの一覧",
              },
            ],
          },
          softwareConfig: {
            description: "ソフトウェアはOpenBlockプログラミングソフトウェアを統合し、ブロック型プログラミングとC++、Pythonコードプログラミングをサポートし、ソフトウェアプログラミングにもハードウェアデバイスプログラミングにも使用でき、ハードウェアコード生成およびコンパイルダウンロード機能をサポートし、ハードウェアデバイスとの間のリアルタイム通信を通じて実現されるリアルタイム実行モードもサポートしています。",
            ecosystem: "Openblockのハードウェアエコシステムは完全で、市場で一般的なメーカーハードウェアプラットフォーム、Arduino、MicroPython、ESP32をサポートし、ユーザーは自由に拡張できます。",
            images: [
              {
                src: "/images/products/ubot-mr20/software/openblock-interface-1.jpg",
                alt: "OpenBlock プログラミングワークスペース",
                caption: "OpenBlock のドラッグ&ドロップロジック編集とモジュールプレビュー",
              },
              {
                src: "/images/products/ubot-mr20/software/openblock-interface-2.jpg",
                alt: "OpenBlock デバイス接続画面",
                caption: "OpenBlock デバイス管理：C++ / Python とハードウェア書き込みをサポート",
              },
            ],
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
        "gx-mat-09s": {
          name: "具現化ロボット革新設計プラットフォーム（強化版）GX-MAT-09S",
          subtitle: "具現化ロボット革新デザインスイート（強化版）",
          model: "GX-MAT-09S",
          image: "/images/products/gx-mat-09s/hero.png",
          overview:
            "具現化ロボットは知能的な意思決定・豊富なセンシング・高い操作能力を融合し、サービスや家庭など非構造環境で任務を遂行する次世代ロボットです。現在はモバイル複合型が実用化の主流となりつつあります。\n\nGX-MAT-09S は代表的な具現化モバイルロボットの構造をモジュール化し、機構・駆動・センシング・制御を分解して学べるよう設計されています。付属パーツを用いて 11 種のシャーシ、7 種のロボットアーム、88 種の複合ロボットを設計・組立・チューニングできます。\n\nプラットフォームには AI ビジョン、単眼カメラ、AI 音声、姿勢 IMU、障害物回避、ライントレース、ナビゲーション用 LiDAR など、具現化ロボットに必要なセンシングユニットを統合しています。\n\nArduino・STM32・Horizon RDK X5（Ubuntu + ROS、10 TOPS）による 3 層コントローラ構成で、授業・研究開発・競技トレーニングまで幅広いニーズに対応します。",
          highlights: [
            "11 種のモバイルシャーシ + 7 種のロボットアームで 88 種の複合ロボットを構成",
            "AI ビジョン、音声、IMU、ライントレース、LiDAR など多モーダルセンシングを統合",
            "Arduino + STM32 + Horizon RDK X5（10 TOPS）の三層コントローラスタック",
          ],
          applicable: "大学ロボット実験・研究開発・競技トレーニング",
          features: [
            {
              title: "具現化システムの分解学習",
              content: "モバイル複合ロボットの構造・駆動・センシング・制御を分解し、具現化ロボットの知覚―意思決定―行動ループを可視化します。"
            },
            {
              title: "モジュール型の学習ルート",
              content: "11 種のシャーシ、7 種のロボットアーム、88 種の複合形態を用意し、設計・組立・キャリブレーション・制御を一気通貫で学べます。"
            },
            {
              title: "フルスタックセンシング",
              content: "AI ビジョン、単眼カメラ、音声インタラクション、姿勢 IMU、障害物／ライントレース、ナビゲーション LiDAR を統合し、具現化ロボットの環境認識を実現します。"
            },
            {
              title: "多層コントローラ構成",
              content: "Arduino での可視化／C++ 入門、STM32 による専門的 MCU 開発、Ubuntu+ROS を搭載した Horizon RDK X5（10 TOPS）で高度な具現化応用まで対応します。"
            },
            {
              title: "カリキュラムと競技に対応",
              content: "機械原理、センサ計測、マイコン、ロボティクス、ROS、モバイルナビゲーションなどの授業に対応し、大学ロボット創意工夫競技や工学実践イノベーション競技にも活用できます。"
            }
          ],
          sampleCases: {
            description:
              "典型的な具現化ロボットのシャーシとロボットアームをモジュール化して提供し、差動・全方向・ステアリング・双腕など 88 種の複合ロボットを迅速に構築できます。",
            chassis: [
              { name: "三輪二駆差動シャーシ", image: "" },
              { name: "三輪二駆前輪操舵シャーシ", image: "" },
              { name: "三輪三駆スウェーデンホイール全方向シャーシ（A案）", image: "" },
              { name: "三輪三駆スウェーデンホイール全方向シャーシ（B案）", image: "" },
              { name: "四輪二駆差動シャーシ", image: "" },
              { name: "四輪四駆差動シャーシ", image: "" },
              { name: "四輪四駆スウェーデンホイール全方向シャーシ", image: "" },
              { name: "四輪四駆メカナム全方向シャーシ", image: "" },
              { name: "四輪八駆ステアリングシャーシ", image: "" },
              { name: "六輪二駆差動シャーシ", image: "" },
              { name: "六輪六駆差動シャーシ", image: "" }
            ],
            arms: [
              { name: "2 自由度ジンバル", image: "" },
              { name: "3 自由度直列ロボットアーム", image: "" },
              { name: "4 自由度直列ロボットアーム", image: "" },
              { name: "4 自由度 SCARA ロボットアーム", image: "" },
              { name: "5 自由度直列ロボットアーム", image: "" },
              { name: "6 自由度直列ロボットアーム（A案）", image: "" },
              { name: "6 自由度直列ロボットアーム（B案）", image: "" },
              { name: "8 自由度デュアルアーム", image: "" }
            ],
            compositeGroups: [
              {
                title: "双駆差動三輪シャーシをベースとした複合ロボット",
                robots: [
                  "三輪差動＋ジンバル複合ロボット",
                  "三輪差動＋SCARA 複合ロボット",
                  "三輪差動＋六軸複合ロボット"
                ]
              },
              {
                title: "双駆差動四輪シャーシをベースとした複合ロボット",
                robots: [
                  "四輪差動＋ジンバル複合ロボット",
                  "四輪差動＋4 軸複合ロボット",
                  "四輪差動＋5 軸複合ロボット",
                  "四輪差動＋6 軸複合ロボット",
                  "四輪差動＋SCARA 複合ロボット",
                  "四輪差動＋双腕複合ロボット",
                  "四輪差動＋双腕リフティング複合ロボット"
                ]
              },
              {
                title: "双駆差動六輪シャーシをベースとした複合ロボット",
                robots: [
                  "六輪差動＋ジンバル複合ロボット",
                  "六輪差動＋4 軸複合ロボット",
                  "六輪差動＋5 軸複合ロボット",
                  "六輪差動＋6 軸複合ロボット",
                  "六輪差動＋SCARA 複合ロボット",
                  "六輪差動＋双腕複合ロボット",
                  "六輪差動＋双腕リフティング複合ロボット"
                ]
              },
              {
                title: "三輪全方向シャーシをベースとした複合ロボット",
                robots: [
                  "三輪全方向＋ジンバル複合ロボット",
                  "三輪全方向＋4 軸複合ロボット",
                  "三輪全方向＋5 軸複合ロボット",
                  "三輪全方向＋6 軸複合ロボット",
                  "三輪全方向＋SCARA 複合ロボット",
                  "三輪全方向＋双腕複合ロボット",
                  "三輪全方向＋双腕リフティング複合ロボット"
                ]
              },
              {
                title: "四駆差動シャーシをベースとした複合ロボット",
                robots: [
                  "四駆差動＋ジンバル複合ロボット",
                  "四駆差動＋4 軸複合ロボット",
                  "四駆差動＋5 軸複合ロボット",
                  "四駆差動＋6 軸複合ロボット",
                  "四駆差動＋SCARA 複合ロボット",
                  "四駆差動＋双腕複合ロボット",
                  "四駆差動＋双腕リフティング複合ロボット"
                ]
              },
              {
                title: "四輪全方向シャーシをベースとした複合ロボット",
                robots: [
                  "四輪全方向＋ジンバル複合ロボット",
                  "四輪全方向＋4 軸複合ロボット",
                  "四輪全方向＋5 軸複合ロボット",
                  "四輪全方向＋6 軸複合ロボット",
                  "四輪全方向＋SCARA 複合ロボット",
                  "四輪全方向＋双腕複合ロボット",
                  "四輪全方向＋双腕リフティング複合ロボット"
                ]
              },
              {
                title: "四輪ステアリングシャーシをベースとした複合ロボット",
                robots: [
                  "四輪ステアリング＋ジンバル複合ロボット",
                  "四輪ステアリング＋4 軸複合ロボット",
                  "四輪ステアリング＋SCARA 複合ロボット"
                ]
              }
            ]
          },
          sensorConfig: {
            description:
              "具現化ロボットに必要なセンシング群を統合し、環境知覚・音声インタラクション・ナビゲーション・ライントレースなどの機能を単一プラットフォームで実装できます。",
            list: [
              "AI ビジョンカメラ",
              "単眼イメージングモジュール",
              "AI 音声認識モジュール",
              "姿勢 IMU センサ",
              "障害物回避／ライントレースセンサアレイ",
              "ナビゲーション級 LiDAR"
            ]
          },
          controllerConfig: {
            description:
              "Arduino でのグラフィカル／C++ 入門、STM32 による本格的 MCU 開発、Ubuntu+ROS を搭載した Horizon RDK X5（10 TOPS）の三層構成で、具現化ロボットの高度な応用までカバーします。",
            images: [
              {
                src: "/images/products/gx-mat-09s/controller/arduino-mega2560.png",
                alt: "Arduino Mega 2560 コントローラボード",
                caption: "Arduino Mega 2560：グラフィカル／C++ プログラミングの快速入門",
              },
              {
                src: "/images/products/gx-mat-09s/controller/stm32f407.jpg",
                alt: "STM32F407 開発ボード",
                caption: "STM32F407：本格的な MCU 開発と組込み制御に対応",
              },
              {
                src: "/images/products/gx-mat-09s/controller/rdk-x5.png",
                alt: "Horizon RDK X5 コンピュートモジュール",
                caption: "Horizon RDK X5：Ubuntu + ROS、10 TOPS の AI 計算プラットフォーム",
              },
            ],
          },
          softwareConfig: {
            description:
              "Arduino IDE、STM32 開発ツール、Ubuntu/ROS 環境とサンプルプロジェクトを提供し、ハードウェアドライバから AI・ROS アプリケーションまで一気通貫で開発できます。",
            ecosystem:
              "Arduino ライブラリ、HAL/FreeRTOS、ROS/MoveIt、OpenCV、YOLO、音声認識 SDK などのオープンエコシステムと互換性があり、授業・研究リソースを素早く統合できます。"
          },
          experiments: {
            summary:
              "マイコン、センサ、組込み Linux、コンピュータビジョン、シャーシ設計、ロボットアーム制御、複合ロボット、ROS、ナビゲーションまでを網羅し、入門から応用までの学習ルートを形成します。",
            sections: [
              {
                title: "マイコン総合プロジェクト",
                description: "Arduino と STM32 を用いて、基板理解から EEPROM・ライブラリ活用までをトレーニングします。",
                items: [
                  { name: "Arduino ボード認識実験", desc: "チップ性能・インターフェース・回路構成を理解し、開発環境を構築する。" },
                  { name: "STM32 ボード認識実験", desc: "STM32 の性能・ピン配置・電源回路とツールチェーン構築を学ぶ。" },
                  { name: "LED 点滅実験", desc: "digitalWrite() と delay() を用いてデジタル出力制御を体験する。" },
                  { name: "アナログ入力モニタ実験", desc: "analogRead()/analogWrite()/Serial API を使い、アナログ信号を読み取り表示する。" },
                  { name: "シリアル通信実験", desc: "Serial.begin() を設定し、データ送受信とログ出力を行う。" },
                  { name: "EEPROM 読み出し実験", desc: "EEPROM.read() を用いて永続データを取得する。" },
                  { name: "EEPROM クリア実験", desc: "EEPROM.write() を利用し、データ消去と書き込み方法を習得する。" },
                  { name: "EEPROM 書き込み実験", desc: "EEPROM.write() で設定値を書き込み、永続化する。" },
                  { name: "拡張ライブラリ導入実験", desc: "MsTimer2 をインストールし、タイマで Blink を再構築する。" }
                ]
              },
              {
                title: "モータ総合プロジェクト",
                description: "DC モータとサーボの制御、エンコーダ計測と PID 制御を習得します。",
                items: [
                  { name: "DC モータ制御", desc: "ブラシ付き DC モータのデジタル制御と駆動要点を学ぶ。" },
                  { name: "エンコーダ付き DC モータ制御", desc: "エンコーダデータを取得し、PID の原理と速度閉ループ制御を実装する。" },
                  { name: "サーボ制御", desc: "myservo.attach()/write() を用いてサーボ角度を精密制御する。" }
                ]
              },
              {
                title: "センサプロジェクト",
                description: "TTL、ライントレース、超音波、IMU、音声、AI ビジョンなどの主要センサを網羅します。",
                items: [
                  { name: "TTL センサ実験", desc: "TTL センサのパラメータ取得と応用方法を習得する。" },
                  { name: "四路ライントレース", desc: "ロボットのライントレース制御を実装する。" },
                  { name: "超音波距離計測", desc: "測距アルゴリズムを理解し、環境に合わせた調整を行う。" },
                  { name: "ジャイロセンサ", desc: "MPU6050.cpp を用いて姿勢データを取得する。" },
                  { name: "音声認識センサ", desc: "HBR640.h を利用して音声認識と指令トリガーを行う。" },
                  { name: "AI ビジョンセンサ", desc: "カメラモジュールで映像表示と AI 推論を実施する。" }
                ]
              },
              {
                title: "組込み Linux プロジェクト",
                description: "Ubuntu と Python を用いて GPIO、データ処理、マルチスレッド、ネットワーク通信を実践します。",
                items: [
                  { name: "システム導入", desc: "Ubuntu をインストールし、SSH とファイルシステム操作を習得する。" },
                  { name: "GPIO 制御", desc: "Python で LED とボタンを制御し、標準 GPIO ライブラリを使いこなす。" },
                  { name: "センサデータ収集", desc: "複数センサのデータ取得・フィルタリング・GUI 表示を行う。" },
                  { name: "ネットワーク通信と Web サーバ", desc: "ソケット通信を実装し、Web サーバでデータを公開する。" },
                  { name: "マルチスレッド", desc: "threading モジュールで並列処理を実装し、同期と排他を学ぶ。" }
                ]
              },
              {
                title: "コンピュータビジョンプロジェクト",
                description: "RDK X5 とカメラを活用し、色・形状・QR・追跡・検出・データセット作成までを実装します。",
                items: [
                  { name: "色認識", desc: "OpenCV で色空間を変換し、分別・追跡を実現する。" },
                  { name: "形状認識", desc: "エッジ検出と輪郭抽出で形状分類を行う。" },
                  { name: "QR コード認識", desc: "OpenCV／zbar で QR コードをデコードし、情報を処理する。" },
                  { name: "ジンバルによる図形追跡", desc: "画像を取得し、特定図形を追跡するジンバル制御を行う。" },
                  { name: "カラーターゲット追跡", desc: "カラーターゲットを認識し、自律追従を実現する。" },
                  { name: "顔認識", desc: "OpenCV／dlib を用いて顔検出・特徴抽出・識別を行う。" },
                  { name: "ビジョンライントレース", desc: "カメラでラインを検出し、視覚ベースのライントレースを実装する。" },
                  { name: "YOLO デプロイ", desc: "YOLO をデプロイし、リアルタイムの多対象検出と分類を行う。" },
                  { name: "データセット作成", desc: "LabelImg/RectLabel で独自データセットを作成する。" },
                  { name: "果物認識", desc: "深層学習モデルを学習し、RDK X5 でリアルタイム果物認識を行う。" },
                  { name: "ロボットアームによる搬送", desc: "ビジョン識別とロボットアーム制御を組み合わせ、対象物のピック＆プレースを実現する。" }
                ]
              },
              {
                title: "モバイルシャーシプロジェクト",
                description: "差動・全方向・スウェーデンホイール・メカナム・ステアリングなどのシャーシ組立と制御を行います。",
                items: [
                  { name: "三輪差動シャーシ", desc: "組立、駆動制御、オドメトリ調整を行う。" },
                  { name: "四輪差動シャーシ", desc: "組立、駆動制御、オドメトリ調整を行う。" },
                  { name: "六輪差動シャーシ", desc: "組立、駆動制御、オドメトリ調整を行う。" },
                  { name: "三輪スウェーデンホイールシャーシ", desc: "組立、駆動制御、オドメトリ調整を行う。" },
                  { name: "四駆差動シャーシ", desc: "組立、駆動制御、オドメトリ調整を行う。" },
                  { name: "四輪スウェーデンホイールシャーシ", desc: "組立、駆動制御、オドメトリ調整を行う。" },
                  { name: "四輪メカナムシャーシ", desc: "組立、駆動制御、オドメトリ調整を行う。" },
                  { name: "四駆スウェーデン＋メカナムシャーシ", desc: "組立、駆動制御、オドメトリ調整を行う。" },
                  { name: "四駆独立ステアリングシャーシ", desc: "組立、ステアリング制御、オドメトリ調整を行う。" }
                ]
              },
              {
                title: "ロボットアームプロジェクト",
                description: "直列アームから SCARA、双腕までを組立・駆動し、運動学制御を学習します。",
                items: [
                  { name: "4 自由度直列ロボットアーム", desc: "組立、駆動制御、運動学制御を行う。" },
                  { name: "5 自由度直列ロボットアーム", desc: "組立、駆動制御、運動学制御を行う。" },
                  { name: "6 軸直列ロボットアーム", desc: "組立、駆動制御、運動学制御を行う。" },
                  { name: "SCARA ロボットアーム", desc: "組立、駆動制御、運動学制御を行う。" },
                  { name: "双腕ロボット", desc: "双腕の組立、協調駆動制御、運動学制御を行う。" },
                  { name: "昇降双腕ロボット", desc: "昇降機構付き双腕の組立、制御、運動学調整を行う。" }
                ]
              },
              {
                title: "複合ロボットプロジェクト",
                description: "シャーシとロボットアームを組み合わせ、応用指向の具現化ロボットを構築します。",
                items: [
                  { name: "三輪差動複合ロボット", desc: "ジンバル、SCARA、六軸などの複合形態を構築する。" },
                  { name: "四輪差動複合ロボット", desc: "ジンバル、4/5/6 軸、SCARA、双腕、双腕リフトを構築する。" },
                  { name: "六輪差動複合ロボット", desc: "ジンバル、4/5/6 軸、SCARA、双腕、双腕リフトを構築する。" },
                  { name: "三輪全方向複合ロボット", desc: "ジンバル、4/5/6 軸、SCARA、双腕、双腕リフトを構築する。" },
                  { name: "四駆差動複合ロボット", desc: "ジンバル、4/5/6 軸、SCARA、双腕、双腕リフトを構築する。" },
                  { name: "四輪全方向複合ロボット", desc: "ジンバル、4/5/6 軸、SCARA、双腕、双腕リフトを構築する。" },
                  { name: "四輪ステアリング複合ロボット", desc: "ジンバル、4 軸、SCARA の複合形態を構築する。" }
                ]
              },
              {
                title: "ROS プロジェクト",
                description: "ROS の起動、機能パッケージ開発、MoveIt によるモーション制御を学びます。",
                items: [
                  { name: "ROS 体験実験", desc: "ファイル構造を理解し、トピック／サービス／パラメータで turtlesim と移動ロボットを制御する。" },
                  { name: "ROS 機能パッケージ構築・移植", desc: "機能パッケージを作成・コンパイルし、キーボード操作の移動ロボット制御を実装する。" },
                  { name: "URDF モデルと MoveIt 制御", desc: "URDF モデルを作成して Rviz に表示し、MoveIt でロボットアームの運動学制御を行う。" }
                ]
              },
              {
                title: "移動ロボットのナビゲーションと位置決め",
                description: "Cartographer、Hector、Gmapping の理論からパラメータ調整までを網羅します。",
                items: [
                  { name: "高速ナビゲーション体験", desc: "Cartographer・Hector・Gmapping を実行し、それぞれの適用シーンを比較する。" },
                  { name: "Cartographer マッピング", desc: "原理解説、パッケージ分解、設定、全パラメータチューニングを実施する。" },
                  { name: "Hector マッピング", desc: "パッケージ構成を理解し、設定と全パラメータチューニングを行う。" },
                  { name: "Gmapping マッピング", desc: "原理を学び、設定・全パラメータチューニングを実施して地図を生成する。" }
                ]
              }
            ]
          },
          specs: [
            "シャーシ構成：差動・全方向・スウェーデンホイール・メカナム・ステアリングなど 11 種のモバイルプラットフォーム",
            "ロボットアーム構成：7 種の標準アームに加え、8 自由度双腕への拡張に対応",
            "複合ロボット：サービス・研究・競技シナリオに対応する 63 以上の具現化アプリケーションを提供",
            "センシング：AI ビジョン、音声認識、IMU、ライントレース／障害物回避センサ、ナビゲーション LiDAR",
            "制御アーキテクチャ：Arduino + STM32 + Horizon RDK X5（10 TOPS）の協調スタック",
            "授業・競技対応：ロボティクス、ROS、モバイルナビゲーションなどの授業および主要大学ロボット競技に対応"
          ],
        },
        "rai-p4": {
          name: "具現化知能タスク計画実習プラットフォーム RAI-P4",
          model: "RAI-P4",
          image: "/images/video/video.jpg",
          overview:
            "AI 音声／視覚モジュールと 4 自由度ロボットアームを統合し、ROS2 とタスク計画カリキュラムをサポートします。",
          highlights: [
            "AI とロボット技術のシステム結合",
            "ワンストップ導入（60cm×60cm デスクトップ）",
            "4／6 自由度ロボットアーム拡張に対応",
          ],
          applicable: "大規模言語モデル応用、コンピュータビジョン、ロボット操作システム",
          configuration: [
            "4 自由度ロボットアーム（リーチ ≥ 260mm、可搬質量 ≥ 300g）",
            "2 自由度ジンバル + 720P カメラ",
            "RDK X5 ボード（10TOPS）",
          ],
          experiments: [
            "48 コマ：ロボットアーム制御（運動学／補間）",
            "AI ビジョン（YOLO／顔追跡）",
            "大規模言語モデル応用（ASR／LLM／TTS）",
            "ROS2 開発",
          ],
          specs: [
            "AI コンピューティングボード ≥ 9TOPS の演算能力",
            "コントローラは 8 チャンネルのサーボ駆動に対応",
          ],
        },
        "rai-m4": {
          name: "具現化複合ロボットシステム設計実習プラットフォーム RAI-M4",
          model: "RAI-M4",
          image: "/images/video/video.jpg",
          overview:
            "メカナム全方向シャーシと 4 軸ロボットアームを組み合わせ、DeepSeek や通義千問などの大規模言語モデルと連携し、システム設計とナビゲーション教育に適しています。",
          highlights: [
            "全方向移動（メカナムシャーシ）＋操作（4 軸ロボットアーム）",
            "大規模言語モデルの深い連携（通義千問 + DeepSeek）",
          ],
          applicable: "移動ロボットナビゲーション、大規模言語モデル導入",
          configuration: [
            "四駆メカナムシャーシ（速度 0.5m/s、可搬 10kg）",
            "4 軸ロボットアーム（リーチ > 220mm、可搬 ≥ 200g）",
            "LiDAR（測距 0.12–8m）",
            "200 万画素カメラ",
          ],
          experiments: [
            "コンピュータビジョン（OpenCV／YOLO／マルチモーダル検出）",
            "大規模言語モデルデプロイ（音声対話／タスク計画）",
            "ROS ナビゲーション（マッピング／障害物回避）",
          ],
          specs: [
            "エッジコンピューティングコントローラ RDK X5（10TOPS 演算能力）",
            "YOLOv8 人顔検出 100fps（参考値）",
          ],
        },
        "rai-q2": {
          name: "具現化ビジョン認識・意思決定実習プラットフォーム RAI-Q2",
          model: "RAI-Q2",
          image: "/images/video/video.jpg",
          overview:
            "深度カメラと高精度モーション機構を備え、OpenCV／YOLO／VLM などのアルゴリズム授業と実験に対応します。",
          highlights: [
            "3 種のビジョンソリューション（OpenCV／YOLO／VLM）",
            "高精度チューニング（ターンテーブル背隙 0.3°、昇降台 mm 級調整）",
            "モジュール化交換",
          ],
          applicable: "コンピュータビジョン、機械学習コース",
          configuration: [
            "深度カメラ（測距 0.6–8m、1280×720@90fps）",
            "高精度ターンテーブル（速度／位置モード切替）",
            "22 インチディスプレイ",
          ],
          experiments: [
            "OpenCV ビジョン（色／形状認識）",
            "YOLO デプロイ（顔検出／追跡）",
            "深度検出（3D モデリング）",
            "大規模言語モデルマルチモーダル API デプロイ",
          ],
          specs: [
            "エッジコンピューティングコントローラ RDK X5（10TOPS 演算能力）",
            "ターンテーブル最高速度 40rpm",
          ],
        },
        "uni-wr2": {
          name: "携帯型 ROS ナビゲーション学習プラットフォーム UNI-WR2",
          model: "UNI-WR2",
          image: "/images/video/video.jpg",
          overview:
            "コンパクトな卓上型ナビゲーションロボットプラットフォームで、ROS ナビゲーション実験環境を素早く構築できます。",
          highlights: [
            "超小型（13cm×97mm×98mm、<550g）",
            "デスクトップ配置（60cm×60cm）",
            "エンジニアリング ROS 学習（5 ステップ分解）",
          ],
          applicable: "ROS オペレーティングシステム、移動ロボットナビゲーション",
          configuration: [
            "オールメタルボディ",
            "Raspberry Pi コントローラ（ROS プリインストール）",
            "LiDAR（測距 0.1–12m）",
            "7 ビットエンコーダ付きモータ",
          ],
          experiments: [
            "24 コマ：ROS 基礎（パッケージ移植）",
            "SLAM デプロイ（3 種のナビゲーション方式の全パラ調整）",
            "運動学制御（PID 速度制御）",
          ],
          specs: [
            "速度 0.16m/s",
            "1m 以内の位置決め精度 < 5mm、1m 直進偏差 < 1cm",
          ],
        },
        "alo-le4": {
          name: "具現化ロボット操作計画総合実習プラットフォーム ALO-LE4",
          model: "ALO-LE4",
          image: "/images/video/video.jpg",
          overview:
            "デュアルロボットアームの主従追従と可変照明環境を備え、ACT アーキテクチャと模倣学習／エンドツーエンド制御研究を支援します。",
          highlights: [
            "マルチユース（データ収集＋知能トレーニング）",
            "ワンストップ導入（開梱してすぐ使用）",
            "ステップアップ型カリキュラム（環境構築からモデルデプロイまで）",
          ],
          applicable: "模倣学習、エンドツーエンド知能制御研究",
          configuration: [
            "5 自由度ロボットアーム × 2（主従追従）",
            "カメラ 2 台（トップ + サイド）",
            "可変環境照明",
            "13 インチディスプレイ",
          ],
          experiments: [
            "エンドツーエンドソリューション導入（環境構築、Lerobot フレームワーク導入、モデル訓練／デプロイ）",
            "AI ビジョン（YOLO／ロボットアーム視覚搬送）",
            "ロボットアーム制御（運動学／補間）",
          ],
          specs: [
            "ロボットアームは動作データ取得に対応",
            "カメラは物体の色／位置検出に対応",
            "照明は多様な光環境を再現可能",
          ],
        },
      },
      supportResources: {
        title: "共通サポートリソース",
        items: [
          "実験チュートリアル：詳細手順、原理解説、重要ポイント",
          "ソースコード：全プログラム（中国語コメント付き）とライブラリ",
          "構造図面：ロボット構成の 3D 設計図（STP 形式）",
          "ハードウェア保障：モジュール化パーツ、多様な IDE（Keil5、Arduino IDE、VS Code など）対応",
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
