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
      sectionOne: {
        title: "UNI Roboticsについて",
        description:
          "有你同創智能機器人科技（北京）有限公司は北京市石景山区の首鋼園冬季五輪広場に位置し、首鋼集団と協力して世界をリードする具現化知能イノベーションプラットフォームを構築しています。私たちは具現化知能ロボット技術を教育と研究に応用することに専念し、実用的なアプリケーションシナリオを継続的に探索し、大学、職業学校、K12教育機関向けにハードウェア、ソフトウェア、カリキュラムを統合したロボット製品を提供しています。",
        highlights: [
          "具現化知能ロボット",
          "産学研究一体化",
          "段階的学習体系",
          "低コスト知能製品",
          "オープンソースコミュニティ",
          "完全な教育ソリューション",
        ],
        image: {
          src: "/images/about/company-mascot.png",
          alt: "UNI Robotics製品",
        },
      },
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
          "誰もが楽しく未来のインテリジェンスと繋がることができる！",
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
                image: "/images/products/ubot-mr20/ubot-mr20-hero.jpg",
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
                image: "/images/products/rai-p4/rai-p4-hero.png",
                brief:
                  "AI音声・視覚と4自由度アームを一体化したデスクトップ実習環境。計画・知覚・行動を統合したROS2カリキュラム向け。",
              },
              {
                slug: "uni-wr2",
                name: "携帯型 ROS ナビゲーション 学習プラットフォーム UNI-WR2",
                model: "UNI-WR2",
                image: "/images/products/uni-wr2/uni-wr2-hero.png",
                brief:
                  "13cm未満の携帯ROSロボット。60×60cmデスクトップSLAMとCatographer/Hector/Gmappingの5ステップ実装を提供。",
              },
              {
                slug: "rai-q2",
                name: "具現化ビジョン認識・意思決定 実習プラットフォーム RAI-Q2",
                model: "RAI-Q2",
                image: "/images/products/rai-q2/hero.png",
                brief:
                  "深度カメラ + 高精度回転台/昇降ガイド、OpenCV/YOLO/VLM 対応。ビジョン・ML授業向け。",
              },
              {
                slug: "rai-m4",
                name: "具現化複合ロボット システム設計実習プラットフォーム RAI-M4",
                model: "RAI-M4",
                image: "/images/products/rai-m4/front-view.png",
                brief:
                  "メカナム全方向シャーシ + 4軸アーム、DeepSeek/通義千問に接続。移動ロボット航法・LLM導入向け。",
              },
              {
                slug: "alo-le4",
                name: "具現化ロボット 操作計画 総合実習プラットフォーム ALO-LE4",
                model: "ALO-LE4",
                image: "/images/products/alo-le4/front-view.png",
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
          image: "/images/products/ubot-mr20/ubot-mr20-hero.jpg",
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
          subtitle: "具現化ロボットタスク計画総合実習プラットフォーム",
          model: "RAI-P4",
          image: "/images/products/rai-p4/rai-p4-hero.png",
          overview:
            "RAI-P4はAI技術とロボット技術を密接に融合させた具現化知能実習プラットフォームです。AI音声、AIビジョン、代表的な4自由度ロボットアーム、具現化ロボットで頻用されるセンサー群、AIエッジコントローラを統合し、学習者が実機上で知能アルゴリズムをデプロイ／デバッグできるようにすることで、講義の理論と総合実習をシームレスに接続します。\n\nプラットフォームは「計画→知覚→実行」の流れに沿ったシナリオを用意し、音声対話、タスク意味理解、ビジョンパンチルト追跡、ビジョン支援のアーム搬送、運動学軌跡制御、AIビジョンによる果物検出などを体系的に学べます。",
          applicable:
            "人工知能、ロボティクス、自動化、計算機科学などの大学・高専向けカリキュラムに適しており、大規模言語モデル応用、コンピュータビジョン、機械学習、ディープラーニング、組込み開発、センサ計測と制御、ROS、ロボティクス、シミュレーション、知能システム統合といった実習を網羅します。",
          highlights: [
            "AI音声・AIビジョン・マニピュレータ制御を一体化したオールインワンプラットフォーム",
            "60cm×60cmデスクトップで完結する省スペース導入",
            "4自由度から6自由度まで段階的に学べるマニピュレータ実習"
          ],
          features: [
            {
              title: "AIとロボティクスのシステム融合",
              content:
                "インテリジェントマニピュレータに必要なAI音声対話、AIビジョン認識、AIエッジボード、カラー認識や姿勢推定などのセンサーを組み合わせ、知覚・意思決定・実行の全レイヤーを一体で学習できます。"
            },
            {
              title: "ワンストップの授業導入",
              content:
                "工場出荷時にハード・ソフトを連携済み。追加のPCや治具を用意することなく、60cm×60cmのデスクトップがあればすぐに実験を開始でき、研究室・創作工房・出張授業にも対応します。"
            },
            {
              title: "代表的マニピュレータによる段階的トレーニング",
              content:
                "4自由度直列アームを基礎に、典型的な6自由度構成へ拡張可能。運動学、モーションコントロール、シミュレーション、ROS実習を組み合わせ、学習者のレベルに合わせて段階的にスキルを構築できます。"
            }
          ],
          sampleCases: {
            description:
              "2 つのシナリオを通して、タスク計画のワークフローと、ビジョン連携による搬送・運動制御の実践的フローを把握できます。",
            sections: [
              {
                title: "タスク計画ワークフロー",
                description: "音声／視覚入力からタスク分解、マニピュレータ実行までの全体像をフローチャートで把握します。",
                gridClassName: "grid-cols-1 place-items-center gap-6 max-w-5xl mx-auto",
                imageAspectClass: "aspect-[21/10]",
                cardClassName: "w-full p-6",
                items: [
                  {
                    name: "タスク計画フロー概要",
                    image: "/images/products/rai-p4/rai-p4-task-planning.png"
                  }
                ]
              },
              {
                title: "ビジョン搬送と運動学統合実習",
                description: "視覚認識、運動学計画、ロボットアームの協調制御を一体的に学ぶ実習例です。",
                gridClassName: "grid-cols-1 place-items-center gap-6 max-w-5xl mx-auto",
                imageAspectClass: "aspect-[21/10]",
                cardClassName: "w-full p-6",
                items: [
                  {
                    name: "ビジョン搬送と運動学統合実習",
                    image: "/images/products/rai-p4/rai-p4-manipulator-workflows.png"
                  }
                ]
              }
            ]
          },
          sensorConfig: {
            description:
              "音声・視覚・運動フィードバックなど、具現化タスク計画に必要なマルチモーダル入力を網羅しています。",
            list: [
              "AI音声インタラクション用マイクアレイ",
              "ビジョンパンチルトカメラモジュール",
              "カラー認識センサー",
              "姿勢推定IMUセンサー",
              "物体認識／距離検知用の拡張インターフェース"
            ]
          },
          controllerConfig: {
            description:
              "AIエッジボードとオープンI/Oを備え、LLM・ビジョン推論とマニピュレータ／周辺機器制御を同時に実現し、ソフト・ハードの連携を高めます。"
          },
          softwareConfig: {
            description:
              "UbuntuとROS2（roscore、RViz、MoveIt）に加え、Jupyter、VS Code、Python 3.9 をプリインストール。起動直後からアルゴリズム実演や授業が行えます。",
            ecosystem:
              "OpenCV、YOLO、LLM SDK、MoveIt など主要なAI／ロボットエコシステムと互換性があり、授業と研究の両方を後押しします。",
            imageGridClassName: "grid grid-cols-1 gap-4 place-items-center max-w-4xl mx-auto",
            imageWrapperClassName: "relative aspect-[28/9] w-full",
            figureClassName:
              "w-full overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800",
            showCaptions: false,
            images: [
              {
                src: "/images/products/rai-p4/rai-p4-software-suite.png",
                alt: "Ubuntu / ROS / RViz / VS Code / Python ソフトウェアスイート"
              }
            ]
          },
          experiments: {
            summary:
              "ロボット本体制御、センサ計測、コンピュータビジョン、大規模言語モデル音声対話、システム統合、ROS、組込み開発など40以上のサブプロジェクトを用意し、学際的な能力を育成します。",
            sections: [
              {
                title: "ロボットアーム制御基礎",
                items: [
                  { name: "運動学制御", desc: "推奨4コマ｜4自由度アームの順・逆運動学と関節軌道計画を構築。" },
                  { name: "直線補間制御", desc: "推奨2コマ｜エンドエフェクタの直線軌道を生成し、速度・加速度プロファイルを調整。" },
                  { name: "円弧補間制御", desc: "推奨2コマ｜空間円弧を生成し、姿勢制御を維持したまま軌跡を実行。" },
                  { name: "ピッキング計画", desc: "推奨4コマ｜座標系キャリブレーションと把持戦略を組み合わせ、多点搬送を計画。" },
                  { name: "幾何図形の描画", desc: "推奨4コマ｜軌道生成を応用し、平面図形を描画。" }
                ]
              },
              {
                title: "センサ計測と制御",
                items: [
                  { name: "IMUデータ取得", desc: "推奨2コマ｜姿勢センサーのデータを取得し、姿勢推定とフィルタリングを実施。" },
                  { name: "ジェスチャ制御アーム", desc: "推奨2コマ｜IMU入力を用いてマニピュレータを体感操作。" }
                ]
              },
              {
                title: "コンピュータビジョン基礎（OpenCV）",
                items: [
                  { name: "カラー認識", desc: "推奨2コマ｜色空間変換と領域分割で対象物を識別。" },
                  { name: "形状認識", desc: "推奨2コマ｜輪郭抽出と幾何特徴マッチングで形状を分類。" }
                ]
              },
              {
                title: "AIビジョン（YOLO）",
                items: [
                  { name: "YOLOデプロイ", desc: "推奨2コマ｜組込みボード上でYOLOをリアルタイム推論。" },
                  { name: "顔検出", desc: "推奨2コマ｜事前学習モデルで顔を検出し、バウンディングボックスを出力。" },
                  { name: "顔追跡", desc: "推奨2コマ｜パンチルト連携で対象を追跡。" },
                  { name: "データセットアノテーション", desc: "推奨2コマ｜検出データセットのラベリングとフォーマット変換を習得。" },
                  { name: "モデル学習とデプロイ", desc: "推奨2コマ｜再学習・量子化・デプロイの手順を実践。" },
                  { name: "ワークピース検査", desc: "推奨2コマ｜対象用途に合わせた検出フローを構築し、分類・位置決めを実現。" }
                ]
              },
              {
                title: "AIビジョン（通義千問マルチモーダル）",
                items: [
                  { name: "マルチモーダルAPIデプロイ", desc: "推奨2コマ｜通義千問APIを呼び出し、画像理解とテキスト生成を実装。" },
                  { name: "果物検出とラベリング", desc: "推奨2コマ｜通義千問を用いて果物を認識し、意味ラベルを生成。" }
                ]
              },
              {
                title: "大規模言語モデル応用（音声対話）",
                items: [
                  { name: "ASRデプロイ", desc: "推奨2コマ｜通義千問ASRを構築し、音声入力を解析。" },
                  { name: "LLM意味理解デプロイ", desc: "推奨2コマ｜DeepSeekを用いて意図理解とタスク計画ロジックを実装。" },
                  { name: "TTSデプロイ", desc: "推奨2コマ｜火山引擎TTSを統合し自然な音声応答を生成。" },
                  { name: "エンドツーエンド音声対話", desc: "推奨2コマ｜ASR/LLM/TTSを連携させた音声対話ループを構築。" },
                  { name: "Function-Call 音声計算", desc: "推奨2コマ｜LLMのFunction-Callで音声電卓を実装。" },
                  { name: "Function-Call 音声音楽再生", desc: "推奨2コマ｜音声コマンドで楽曲検索と再生を制御。" },
                  { name: "Function-Call パンチルト計画", desc: "推奨4コマ｜音声指示でパンチルト追跡を実行し、対象探索を完結。" },
                  { name: "Function-Call マニピュレータ計画", desc: "推奨4コマ｜音声指示でマニピュレータの視覚位置決めと搬送を行う。" }
                ]
              },
              {
                title: "ロボットシステム統合",
                items: [
                  { name: "Socket通信", desc: "推奨2コマ｜ロボットシステム間のSocket通信チャネルを構築し、指令を交換。" },
                  { name: "ビジョン追従制御", desc: "推奨4コマ｜ビジョンデータをロボット座標系にマッピングし、動的追従を達成。" },
                  { name: "ビジョンとマニピュレータの座標変換", desc: "推奨2コマ｜ハンドアイキャリブレーションを完成し、ピクセルを姿勢に変換。" },
                  { name: "ビジョン仕分け搬送", desc: "推奨4コマ｜認識・計画・実行を組み合わせ、仕分け搬送を完了。" }
                ]
              },
              {
                title: "ROS（Robot Operating System）",
                items: [
                  { name: "ROS2プロジェクトの迅速起動", desc: "推奨2コマ｜ROS2ワークスペースの作成・ビルド・実行手順を習得。" },
                  { name: "ROS2パッケージ構築と移植", desc: "推奨2コマ｜パッケージ作成、依存管理、移植デプロイを実施。" },
                  { name: "MoveIt設定", desc: "推奨2コマ｜MoveItシーン構成、衝突モデル導入、動作検証を実践。" },
                  { name: "4自由度アームのMoveIt/RVizシミュレーション", desc: "推奨2コマ｜RViz上で4自由度アームを制御し、軌跡を検証。" }
                ]
              },
              {
                title: "組込みシステム開発",
                items: [
                  { name: "Ubuntuファイルシステム入門", desc: "推奨1コマ｜主要ディレクトリ構造とファイル操作コマンドを学習。" },
                  { name: "エディタ習熟（vi / nano）", desc: "推奨1コマ｜ターミナルエディタの基本操作と設定を習得。" },
                  { name: "リモート接続環境構築（SSH / PuTTY）", desc: "推奨2コマ｜リモート開発環境を整備し、多拠点協働を支援。" },
                  { name: "LinuxファイルIOプログラミング", desc: "推奨2コマ｜ファイル読み書きと例外処理を実装し、デバイス連携の基礎を学ぶ。" },
                  { name: "シリアル通信", desc: "推奨2コマ｜シリアル通信の送受信とプロトコル設計を実践。" },
                  { name: "プロセス／スレッド管理", desc: "推奨2コマ｜Linuxのプロセス・スレッドモデルを理解し、サンプルを作成。" },
                  { name: "UI設計", desc: "推奨2コマ｜Python/Qtなどを用いて簡易HMIを構築。" }
                ]
              }
            ]
          },
          specs: [
            "設置面積：60cm×60cmのデスクトップで展開可能",
            "マニピュレータ：標準4自由度、6自由度への拡張に対応",
            "計算プラットフォーム：AIエッジコントローラ内蔵（LLM推論・ビジョン処理対応）"
          ]
        },
        "rai-m4": {
          name: "具現化複合ロボットシステム設計実習プラットフォーム RAI-M4",
          model: "RAI-M4",
          image: "/images/products/rai-m4/front-view.png",
          overview:
            "具現化知能はタスク計画・感知判断・操作実行の 3 フェーズに分解でき、それぞれに AI を組み込むことで対話や意思決定、操作の汎化能力を高められます。RAI-M4 はタスク計画段階で DeepSeek と通義千問を活用し、自由度の高い対話からロボットが理解できるタスクフローへ変換します。感知判断では通義千問のマルチモーダル能力を用い、専用学習なしで幅広い対象を認識できます。\n\nハードウェアは麦克納姆ホイール全方向シャーシに四軸直列型アーム（最大負荷 300g、到達距離 240mm、グリッパ付属）を組み合わせ、HD カメラ（オプションで深度カメラ）、LiDAR、IMU／ジャイロ、呼吸ライトなどのセンシング・インタラクションモジュールを搭載します。\n\n制御構成は上位・下位デュアルコントローラ方式で、上位機がタスク計画・ビジョン認識・ナビゲーション計画・底盤／アームの運動学を担当、下位機がモータ PID 制御やインタラクション表示、上位機との通信リレーを担います。移動ロボット技術と大規模モデル応用の実習を支援し、ロボット系・メカトロ系・スマート製造・制御・電子情報などの専攻でカリキュラム実習や発展型実習に活用できます。",
          highlights: [
            "全方向移動シャーシ + 四軸アームによる複合ロボット形態",
            "通義千問 + DeepSeek など大規模モデルの深度連携",
            "移動ロボットと大モデル活用を両立する体系的カリキュラム",
          ],
          applicable:
            "移動ロボット運動制御、大規模モデルデプロイ、ロボット工学、機械ビジョン、ROS、移動ロボットのナビゲーションと定位などの科目実習",
          features: [
            {
              title: "AI 大規模モデルの深度連携",
              content:
                "ASR に通義千問、LLM に DeepSeek を組み合わせて自然言語タスク計画を実現。ビジョン検知では通義千問のマルチモーダル能力で追加学習なしに幅広い対象を識別できます。"
            },
            {
              title: "移動＋操作の複合プラットフォーム",
              content:
                "麦克納姆全方向シャーシと直列四軸アームを組み合わせ、狭い空間でも移動と操作を同時に実行可能。タスク計画と感知判断を連携させ、汎用的な作業タスクを実現します。",
              mediaGridClassName: "grid-cols-1 gap-6 place-items-center",
              mediaImageAspectClass: "aspect-[16/10]",
              mediaCardClassName: "w-full max-w-3xl",
              media: [
                { name: "モジュール構成概要", image: "/images/products/rai-m4/module-overview.png" }
              ]
            },
            {
              title: "体系化された実験モジュール設計",
              content:
                "機械ビジョン、大規模モデル活用、ロボット工学、移動ロボットナビゲーションなどのモジュールを授業要件に応じて選択し、段階的な専門学習をサポートします。"
            }
          ],
          sensorConfig: {
            description:
              "移動とインタラクションに必要なセンサー群を標準搭載し、定位・ナビゲーション・可視化を一体的に実現します。",
            list: [
              "高解像度カメラ（オプションで深度カメラを追加可能）",
              "360° LiDAR（測距 0.12〜8m）",
              "IMU／ジャイロセンサー（姿勢推定・オドメトリ補正）",
              "呼吸ライトなどインタラクション用インジケータ",
              "拡張ポート：タッチディスプレイや追加センサーに対応"
            ]
          },
          sampleCases: {
            description:
              "多視点の画像で RAI-M4 のシャーシ、アーム、センシングモジュール配置を把握し、授業でのセットアップやシナリオ設計を容易にします。",
            sections: [
              {
                title: "多角度ギャラリー",
                gridClassName: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                imageAspectClass: "aspect-[4/3]",
                cardClassName: "pt-6 pb-4",
                items: [
                  { name: "正面図", image: "/images/products/rai-m4/front-view.png" },
                  { name: "左側面図", image: "/images/products/rai-m4/left-view.png" },
                  { name: "右側面図", image: "/images/products/rai-m4/right-view.png" },
                  { name: "俯瞰図", image: "/images/products/rai-m4/top-view.png" }
                ]
              }
            ]
          },
          controllerConfig: {
            description:
              "上位・下位のデュアルコントローラ構成。上位機が計画・認識・ナビゲーション・運動学を担当し、下位機がモータ PID、アーム駆動、インタラクション I/O、および上位機との通信を受け持ちます。",
            images: []
          },
          softwareConfig: {
            description:
              "Ubuntu + ROS2、MoveIt、YOLO 推論環境、通義千問／DeepSeek API サンプルをプリインストールし、移動ロボット × 大規模モデルの実験をすぐに開始できます。",
            ecosystem:
              "Python／C++、ROS2、MoveIt、OpenCV、YOLO、通義千問 SDK、DeepSeek API など主要フレームワークに対応し、教育・研究の双方を拡張しやすい環境です。"
          },
          experiments: {
            summary:
              "機械ビジョンから大規模モデル応用、ロボット本体制御、ROS 操作、移動ナビゲーションまで幅広いテーマをカバーし、授業計画に合わせて柔軟に組み合わせ可能です。",
            sections: [
              {
                title: "機械ビジョンモジュール",
                description: "クラシックな画像処理から深層学習、マルチモーダル認識まで体系的に学びます。",
                items: [
                  { name: "OpenCV ビジョン", desc: "HSV 色認識／形状認識／QR コード認識／バーコード認識／カラーリング検出（統合＋フィルタ）" },
                  { name: "AI ビジョン ― YOLO", desc: "YOLO デプロイ；データセットアノテーション；モデル学習とデプロイ；ワークピースデータ収集と検査；顔検出；顔追跡" },
                  { name: "AI ビジョン ― 通義千問マルチモーダル", desc: "通義千問マルチモーダル API デプロイ；対象検出とマーキング" }
                ]
              },
              {
                title: "大規模モデル活用モジュール",
                description: "音声対話・マルチモーダル認識・ロボットタスクを大モデルで一貫体験します。",
                items: [
                  {
                    name: "音声対話インタラクション",
                    desc:
                      "通義千問による ASR デプロイ；DeepSeek による LLM 意味理解；火山引擎による TTS デプロイ；フル音声対話；音声対話計算機；音声対話音楽再生"
                  },
                  { name: "マルチモーダルビジョン検出", desc: "通義千問マルチモーダル API デプロイ；対象検出とマーキング" },
                  { name: "ロボット応用連携", desc: "MCP を用いた把持タスク計画；MCP を用いたナビゲーションタスク計画" }
                ]
              },
              {
                title: "ロボット本体制御モジュール",
                description: "底盤とアームの運動学および制御アルゴリズムを実践します。",
                items: [
                  { name: "底盤制御", desc: "エンコーダモータ PID；メカナム運動学制御；ジャイロ補正付きオドメトリ制御" },
                  { name: "アーム制御", desc: "サーボ位置制御；アーム運動学制御；補間軌跡制御" }
                ]
              },
              {
                title: "ROS 操作モジュール",
                description: "ROS のトピック／サービス／パラメータ、MoveIt を用いた経路計画を学びます。",
                items: [
                  {
                    name: "ROS 基礎操作",
                    desc:
                      "トピック／サービス／パラメータで turtlesim を制御；turtlesim を追加生成；パッケージを移植しキーボード操作を実装"
                  },
                  { name: "MoveIt アーム計画", desc: "アーム URDF 設定；MoveIt で運動学モデルを構築；Rviz でアームのモーションプランニング" }
                ]
              },
              {
                title: "移動ロボット ナビゲーション＆定位モジュール",
                description: "インターフェース設定から建図・ナビゲーションまで一連のプロセスを習得します。",
                items: [
                  { name: "システムインターフェース構成", desc: "キーボードで底盤を制御；キーボードでアームを制御；LiDAR データ取得" },
                  { name: "マッピングフロー", desc: "建図プロジェクト構成；launch ファイル作成；新規地図の構築" },
                  {
                    name: "ナビゲーションフロー",
                    desc: "Navigation プロジェクト設定；ロボットの衝突境界パラメータ設定；ポイントナビゲーション；自律障害物回避；マルチゴールナビゲーション"
                  }
                ]
              }
            ]
          },
          specs: [
            "麦克納姆全方向シャーシ（最大速度約 0.5m/s、耐荷重 10kg）",
            "四軸直列アーム（到達距離 240mm、末端負荷 300g、グリッパ標準装備）",
            "上位・下位デュアルコントローラ（上位：計画／認識、下位：PID／I/O）",
            "大規模モデル API と ROS2／MoveIt 実験環境をプリインストール",
          ],
        },
        "rai-q2": {
          name: "具現化ビジョン認識・意思決定実習プラットフォーム RAI-Q2",
          model: "RAI-Q2",
          image: "/images/products/rai-q2/hero.png",
          overview:
            "ビジョン検査は、具現化知能における感知・意思決定プロセスの中で最も一般的なステップです。RAI-Q2 は典型的なビジョンアルゴリズムと代表的な応用シナリオを教材化し、OpenCV・YOLO・通義千問 VLM に基づく段階的カリキュラムを提供して、ビジョン中心の授業を素早く立ち上げられるよう支援します。\n\n深度カメラモジュール、エッジコンピューティングコントローラ、速度と角度を調整できる高精度ターンテーブル、手動／電動を切り替えられる mm 級昇降ステージ、調光可能なリングライト、ディスプレイ、Bluetooth キーボード＆マウスをワンパッケージ化。コンピュータビジョン、機械学習、マルチモーダル／大規模言語モデル応用の授業で、そのまま導入できる構成です。",
          highlights: [
            "OpenCV／YOLO／通義千問 VLM を網羅した三層ビジョンカリキュラム",
            "背隙 0.3° のターンテーブルと mm 級昇降ステージ＋調光リングライト",
            "モジュール交換で高速カメラや雲台構成へ柔軟に拡張",
          ],
          applicable: "コンピュータビジョン／機械学習／マルチモーダル・LLM 活用科目",
          features: [
            {
              title: "三層ビジョンパイプラインを網羅",
              content:
                "OpenCV によるクラシックな画像処理、YOLO によるモデル駆動の物体検出、通義千問 VLM によるマルチモーダル推論の 3 コースを組み合わせ、アルゴリズム基礎から大規模モデル推論まで段階的に習得できます。"
            },
            {
              title: "高精度フルパラメータ調整テストベンチ",
              content:
                "一体型ジョイント駆動ターンテーブルは最小背隙 0.3° を実現し、速度／角度のデュアルモードに対応。二層磁気プレートがビジョン画面へのネジ干渉を抑え、昇降ステージは手回しとサーボ駆動を切替可能な mm 級調整を提供します。調光リングライトでさまざまな照明条件にも対応できます。",
              mediaGridClassName: "grid-cols-1 gap-6 place-items-center",
              mediaImageAspectClass: "aspect-[16/10]",
              mediaCardClassName: "w-full max-w-3xl",
              media: [
                { name: "ビジョンパイプライン概要", image: "/images/products/rai-q2/feature-overview.png" }
              ]
            },
            {
              title: "モジュール式ハードウェアアーキテクチャ",
              content:
                "深度カメラを高速カメラに交換したり、昇降モジュールをターンテーブルへ移設して雲台構成にするなど、授業テーマや研究ニーズに合わせて柔軟にカスタマイズできます。"
            }
          ],
          sensorConfig: {
            description: "ビジョン認識と深度センシングに特化したマルチモーダル入力を備え、実験データを幅広く取得できます。",
            list: [
              "RGB／深度／赤外を取得できる深度カメラモジュール",
              "複数段階の明るさ調整に対応したリングライト",
              "高速カメラや補助照明を追加できる拡張インターフェース",
              "ターンテーブル角度エンコーダと昇降ストロークのフィードバック"
            ]
          },
          sampleCases: {
            description:
              "多視点の画像で RAI-Q2 の構造全体を把握しやすくし、ターンテーブル・昇降ステージ・カメラ配置を授業準備段階で素早く理解できます。",
            sections: [
              {
                title: "多角度外観ギャラリー",
                gridClassName: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                imageAspectClass: "aspect-[4/3]",
                cardClassName: "pt-6 pb-4",
                items: [
                  { name: "主視図", image: "/images/products/rai-q2/front-view.png" },
                  { name: "側面図", image: "/images/products/rai-q2/side-view.png" },
                  { name: "俯瞰図", image: "/images/products/rai-q2/top-view.png" }
                ]
              }
            ]
          },
          controllerConfig: {
            description:
              "内蔵エッジコントローラがアルゴリズム推論とモーション制御を担い、ターンテーブルと昇降駆動を一体的に制御して高精度な姿勢調整を実現します。",
            images: []
          },
          softwareConfig: {
            description:
              "OpenCV、YOLO デプロイ環境、通義千問 VLM API サンプルをプリインストールし、授業開始と同時にビジョン実験へ入れます。",
            ecosystem:
              "Python／C++ に対応し、PyTorch、TensorRT、通義千問 SDK など主流フレームワークと連携して、モデル学習や高度なデプロイへ拡張できます。"
          },
          experiments: {
            summary:
              "OpenCV 処理、YOLO 実装、通義千問 VLM マルチモーダル推論、深度センシングを段階的に学べる実験メニューを展開し、授業設計に役立つ推奨授業時間を付記しています。",
            sections: [
              {
                title: "OpenCV ビジョン",
                description: "基礎的な画像処理と認識フローを習得し、上位のアルゴリズムへ発展させる土台を築きます。",
                items: [
                  { name: "HSV 色認識", desc: "推奨授業時間：2 時間" },
                  { name: "形状認識", desc: "推奨授業時間：2 時間" },
                  { name: "QR コード認識", desc: "推奨授業時間：2 時間" },
                  { name: "バーコード認識", desc: "推奨授業時間：2 時間" },
                  { name: "カラーリング検出（統合＋フィルタ）", desc: "推奨授業時間：4 時間" }
                ]
              },
              {
                title: "AI ビジョン ― YOLO",
                description: "データ整備からデプロイまでのエンジニアリングフローを一気通貫で体験します。",
                items: [
                  { name: "YOLO デプロイ", desc: "推奨授業時間：2 時間" },
                  { name: "データセットアノテーション", desc: "推奨授業時間：2 時間" },
                  { name: "モデル学習とデプロイ", desc: "推奨授業時間：2 時間（RTX 4050 以上の GPU が別途必要）" },
                  { name: "ワークピースデータ収集と検査", desc: "推奨授業時間：2 時間" },
                  { name: "顔検出", desc: "推奨授業時間：2 時間" },
                  { name: "顔追跡", desc: "推奨授業時間：4 時間" }
                ]
              },
              {
                title: "AI ビジョン ― 通義千問大規模モデル",
                description: "マルチモーダル大規模モデルをビジョンタスクに適用し、その柔軟な応答を体験します。",
                items: [
                  { name: "通義千問マルチモーダル API デプロイ", desc: "推奨授業時間：2 時間" },
                  { name: "果物検出とマーキング", desc: "推奨授業時間：2 時間" }
                ]
              },
              {
                title: "深度センシング",
                description: "深度カメラによる距離センシングと 3D リコンストラクションを実践します。",
                items: [
                  { name: "深度データ取得", desc: "推奨授業時間：2 時間" },
                  { name: "3D モデリング", desc: "推奨授業時間：4 時間" }
                ]
              }
            ]
          },
          specs: [
            "最小背隙 0.3° のターンテーブル（速度／角度デュアルモード）",
            "手動／電動を切替可能な mm 級昇降ステージ",
            "調光リングライトで多様な照度条件に対応",
            "エッジコントローラとディスプレイを内蔵した即応用パッケージ"
          ],
        },
        "uni-wr2": {
          name: "携帯型 ROS ナビゲーション学習プラットフォーム UNI-WR2",
          subtitle: "デスクトップ ROS / SLAM 統合実習プラットフォーム",
          model: "UNI-WR2",
          image: "/images/products/uni-wr2/uni-wr2-hero.png",
          overview:
            "UNI-WR2は、ROSとSLAMナビゲーション教育のために設計された携帯型デスクトップロボットです。『ロボットオペレーティングシステム（ROS）』『移動ロボットのナビゲーションと位置決め』『自動制御原理（PID）』といった授業での工学的実践を支援します。従来のシミュレーション偏重や広い実験スペースを要する方式と異なり、携帯ハードウェア、卓上展開、ROSエンジニアリング5ステップを備え、実機でのナビゲーションアルゴリズム調整とROS機能パッケージのデプロイをいつでも行えます。",
          applicable:
            "ロボティクス、自動化、計算機科学、メカトロニクスなどの大学・専門課程に適しており、ROS基礎、SLAMナビゲーション、PID制御、移動ロボットの工学実践を包括的にサポートします。",
          highlights: [
            "超携帯設計：全長13cm未満・質量550g以下、Type-C充電で約4時間動作",
            "敏捷な卓上展開：60cm×60cmのデスクトップでSLAMナビゲーションを完結",
            "エンジニアリングワークフロー：Catographer／Hector／Gmapping を含むROS五段階デプロイ"
          ],
          features: [
            {
              title: "ポータブルな学習フォーム",
              content:
                "オールメタルの手のひらサイズシャーシにType-C充電を搭載。モバイルバッテリーにつなぐだけで実験を継続でき、教室・研究室・出張授業など幅広いシーンで活用できます。",
              mediaGridClassName: "grid-cols-1 sm:grid-cols-2 gap-4",
              mediaImageAspectClass: "aspect-[5/4]",
              media: [
                { name: "携帯イメージ", image: "/images/products/uni-wr2/uni-wr2-feature-portable.png" },
                { name: "Type-C充電", image: "/images/products/uni-wr2/uni-wr2-feature-charging.png" },
                { name: "敏捷配置（1）", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-1.png" },
                { name: "敏捷配置（2）", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-2.png" }
              ]
            },
            {
              title: "卓上SLAM環境",
              content:
                "60cm×60cmの卓上スペースでSLAMシナリオを構築可能。着席したままロボットを微調整でき、モジュール式ピースを組み合わせれば1.2m×1.2mまで拡張できます。",
              mediaGridClassName: "grid-cols-1 gap-4",
              mediaImageAspectClass: "aspect-[5/4]",
              media: [
                { name: "卓上レイアウト俯瞰", image: "/images/products/uni-wr2/uni-wr2-desktop-layout.png" }
              ]
            },
            {
              title: "ROSエンジニアリングワークフロー",
              content:
                "原理解説→デモ→フレームワーク分解→パッケージ構成→全パラメータチューニングの5ステップでROS実装を整理。Catographer・Hector・Gmappingのナビゲーションプロジェクトと組み合わせ、異なるロボットへの横展開力を養います。"
            }
          ],
          sensorConfig: {
            description:
              "SLAMに必要なセンサー群を搭載し、里程計フィードバック、姿勢推定、環境マッピングを実機条件（摩擦や通信周期など）で実践できます。",
            list: [
              "LiDAR（Catographer／Hector／Gmapping対応のSLAMマッピング）",
              "デュアルホイールエンコーダ（PID速度制御と里程計フィードバック）",
              "IMU／ジャイロセンサー（姿勢推定）",
              "追加センサーやマーカーに対応する拡張インターフェース"
            ]
          },
          sampleCases: {
            description:
              "外観構造、外形寸法、BOM構成を可視化した資料で、ハードウェアの構成やスペース設計、組立てポイントを短時間で把握できます。",
            sections: [
              {
                title: "外観・構造ダイジェスト",
                gridClassName: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                imageAspectClass: "aspect-[4/3]",
                items: [
                  { name: "外観概要", image: "/images/products/uni-wr2/uni-wr2-exterior-overview.png" },
                  { name: "外形寸法", image: "/images/products/uni-wr2/uni-wr2-dimensions.png" },
                  { name: "BOM構成図", image: "/images/products/uni-wr2/uni-wr2-bom.png" }
                ]
              }
            ]
          },
          controllerConfig: {
            description:
              "Raspberry Piを中心とした制御系にPIDモータドライバと電源管理を統合。ワンタッチで起動／復帰でき、授業での複数台運用にも最適です。",
            images: [
              {
                src: "/images/products/uni-wr2/uni-wr2-controller.png",
                alt: "UNI-WR2 Raspberry Pi制御コア"
              }
            ]
          },
          softwareConfig: {
            description:
              "UbuntuとROSをプリインストールし、ナビゲーション関連パッケージのサンプルと授業用スクリプトを同梱。電源投入後すぐにROS実験を開始できます。",
            ecosystem:
              "Catographer／Hector／Gmappingの参照実装とROSエンジニアリングドキュメントを提供し、実機上で完全なナビゲーションワークフローを再現できます。",
            showCaptions: false,
            imageGridClassName: "grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center",
            imageWrapperClassName: "relative aspect-square w-full",
            figureClassName:
              "w-full max-w-[220px] overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800",
            images: [
              { src: "/images/products/uni-wr2/uni-wr2-software-ubuntu.png", alt: "Ubuntu ロゴ" },
              { src: "/images/products/uni-wr2/uni-wr2-software-ros.png", alt: "ROS ロゴ" }
            ]
          },
          experiments: {
            summary:
              "ROS基礎、SLAMエンジニアリング導入、移動ロボット運動学制御の3テーマで構成され、授業時間に応じて独立・組合せで展開できます。",
            sections: [
              {
                title: "ROS基礎",
                description: "ROSのファイル構造と通信メカニズムを理解し、ROSパッケージの作成と移植を習得します。",
                items: [
                  {
                    name: "ROSランタイム体験",
                    desc: "推奨2コマ｜ROSファイル構造を確認し、トピック・サービス・パラメータでturtlesimとUNI-WR2を制御。"
                  },
                  {
                    name: "ROSパッケージ構築・移植",
                    desc: "推奨2コマ｜パッケージ作成、環境変数設定、ビルドを行い、キーボード操作のUNI-WR2制御パッケージを実装。"
                  }
                ]
              },
              {
                title: "SLAMエンジニアリング導入",
                description: "3種類のSLAMアルゴリズムを比較しながら、完全なナビゲーションワークフローと調整手順を学びます。",
                items: [
                  {
                    name: "ナビゲーション迅速操作",
                    desc: "推奨2コマ｜手順に沿ってCatographer・Hector・Gmappingを実行し、特徴と適用環境を比較。"
                  },
                  {
                    name: "Catographerマッピング",
                    desc: "推奨4コマ｜原理解説、パッケージ分解、パラメータ構成、全パラメータチューニングを実施。"
                  },
                  {
                    name: "Hectorマッピング",
                    desc: "推奨4コマ｜Hectorのアーキテクチャを分解し、高周波LiDARデータに対応した設定・調整を行う。"
                  },
                  {
                    name: "Gmappingマッピング",
                    desc: "推奨4コマ｜粒子フィルタSLAMの考え方を理解し、パラメータ調整とマップ生成を完成。"
                  }
                ]
              },
              {
                title: "移動ロボット運動学制御",
                description: "差動二輪の運動学、精密な里程計、PID速度制御を実機で習得します。",
                items: [
                  {
                    name: "ホイールPID調整",
                    desc: "推奨2コマ｜エンコーダデータを取得し、PIDアルゴリズムで速度閉ループ制御を構築。"
                  },
                  {
                    name: "移動ロボット運動学",
                    desc: "推奨4コマ｜差動駆動モデルを導出し、里程計フィードバックと線速度／角速度制御を実装。"
                  }
                ]
              }
            ]
          },
          specs: [
            "寸法：130mm × 97mm × 98mm",
            "質量：約580g",
            "速度：0.16m/s",
            "位置決め精度：1m以内で誤差5mm未満",
            "直進偏差：1m走行で1cm未満（約1.5°）",
            "ナビゲーション方式：Catographer／Hector／Gmapping（レーザーSLAM）"
          ]
        },
        "alo-le4": {
          name: "具現化ロボット操作計画総合実習プラットフォーム ALO-LE4",
          model: "ALO-LE4",
          image: "/images/products/alo-le4/front-view.png",
          overview:
            "具現化知能の操作実行フェーズには強化学習とエンドツーエンド方式があり、前者は生体模倣や人型構成、後者は移動型複合ロボットやロボットアームに多く用いられます。ALO-LE4 はロボットアーム構成に基づき、ACT アーキテクチャでエンドツーエンド実装を行う操作実習プラットフォームです。データ収集装置としても、模倣学習・エンドツーエンド制御研究基盤としても活用できます。\n\n2 台の 5 自由度アームを搭載し、1 台は操作者が操作する主アーム、もう 1 台は追従動作を行う従アームです。主アームで取得した関節角データなどを用い ACT モデルを訓練し、従アームが自律的にタスクを実行します。トップとサイドに配置したカメラは物体の色・位置を検知し、同時に ACT 学習用の視覚データとして活用。可変環境照明により多様な光条件を再現できます。\n\nALO-LE4 は具現化知能・模倣学習・データ収集研究に安定した実験環境を提供し、「認知―意思決定―実行」のループ構築を支援します。教育現場ではロボット工学・コンピュータビジョンなどの実習をカバーし、具現化知能の概念と実装を直感的に理解させることで、学習者の工学・研究能力を高めます。大学・研究機関において関連授業や研究を効率的に推進でき、具現化知能の方法論を探求・実装する一助となります。",
          highlights: [
            "データ収集と知能トレーニングを兼ね備えた一体型プラットフォーム",
            "高集約・ワンストップ設計で迅速導入、各システムに独立リセットキーを搭載",
            "環境構築からモデル訓練までをカバーする段階的カリキュラム",
          ],
          applicable:
            "具現化知能、模倣学習、エンドツーエンド制御、ロボット工学、コンピュータビジョンなどの授業・研究に適用",
          features: [
            {
              title: "データ収集と訓練の統合",
              content:
                "ACT フレームワーク上で動作データ取得・モデル学習・効果検証を一貫して実施。可変照明で多様な環境条件を再現し、卓上環境で安定かつ再現性の高い実験を実施します。",
              mediaGridClassName: "grid-cols-1 gap-6 place-items-center",
              mediaImageAspectClass: "aspect-[16/10]",
              mediaCardClassName: "w-full max-w-3xl",
              media: [
                { name: "プラットフォーム構成概要", image: "/images/products/alo-le4/module-overview.png" }
              ]
            },
            {
              title: "迅速な展開とリカバリ",
              content:
                "主アーム・従アーム・OS に独立したリセットボタンを備え、追加のシーン構築なしで素早く実験を開始。異常発生時も即座に再起動できます。"
            },
            {
              title: "段階的な学習設計",
              content:
                "ソフトウェア環境構築からハードウェア調整、訓練ワークフローまで網羅し、授業・研究双方のニーズに対応。受講者が段階的に操作スキルを習得できます。"
            }
          ],
          sensorConfig: {
            description: "模倣学習と視覚認識に必要なセンサー群を標準搭載し、外部モジュール追加にも対応します。",
            list: [
              "トップ＋サイドのデュアル HD カメラ：色・位置検出およびデータセット収集に対応",
              "可変環境照明：多様な光条件を再現",
              "主従アームの関節角センサー：精密なモーションデータを取得",
              "拡張インターフェース：追加視覚／触覚モジュールに対応"
            ]
          },
          sampleCases: {
            description:
              "プラットフォームのアーム構成とセンサーモジュールを複数視点で確認でき、授業・実験シーンの設計を容易にします。",
            sections: [
              {
                title: "プラットフォーム多角度ギャラリー",
                gridClassName: "grid-cols-1 sm:grid-cols-2 gap-6",
                imageAspectClass: "aspect-[4/3]",
                cardClassName: "pt-6 pb-4",
                items: [
                  { name: "正面図", image: "/images/products/alo-le4/front-view.png" },
                  { name: "俯瞰図", image: "/images/products/alo-le4/top-view.png" }
                ]
              }
            ]
          },
          experiments: {
            summary:
              "端到端デプロイからビジョン連携、ロボットアーム制御まで幅広い実験で、具現化操作の理解を深化させます。",
            sections: [
              {
                title: "エンドツーエンド導入と訓練",
                description: "ACT に基づく環境構築、データ収集、モデル学習・デプロイを順を追って実施します。",
                items: [
                  { name: "環境構築", desc: "CONDA／FFMPEG／Python などの依存環境を整備（推奨2コマ）" },
                  { name: "Lerobot フレームワーク導入", desc: "Lerobot のセットアップ（推奨2コマ）" },
                  { name: "ロボットアームサーボ設定", desc: "サーボパラメータ調整（推奨1コマ）" },
                  { name: "カメラ設定", desc: "カメラキャリブレーションと映像接続（推奨1コマ）" },
                  { name: "主従アーム校正", desc: "主アーム収集・従アーム追従の検証（推奨2コマ）" },
                  { name: "遠隔操作データ収集", desc: "映像・関節角・システムログの記録（推奨2コマ）" },
                  { name: "モデル訓練", desc: "NVIDIA 4060 以上の GPU 使用推奨（推奨2コマ）" },
                  { name: "モデルデプロイ", desc: "自律動作の検証と評価（推奨4コマ）" }
                ]
              },
              {
                title: "拡張授業・AI ビジョン",
                description: "視覚認識をロボットアーム作業に接続し、ビジョン統合の方法を学びます。",
                items: [
                  { name: "YOLO ビジョンデプロイ", desc: "YOLO モデルの導入（推奨2コマ）" },
                  { name: "データセットアノテーション", desc: "視覚データのラベリング（推奨2コマ）" },
                  { name: "モデル学習とデプロイ", desc: "視覚モデルの学習と導入（推奨2コマ）" },
                  { name: "ワークピース検出", desc: "対象検出と位置特定（推奨2コマ）" },
                  { name: "ロボットアーム視覚搬送", desc: "視覚結果を動作タスクへマッピング（推奨4コマ）" }
                ]
              },
              {
                title: "拡張授業・ロボット本体制御",
                description: "アームの運動学と補間制御を中心に実践し、応用タスクへ展開します。",
                items: [
                  { name: "ロボットアーム運動学制御", desc: "順逆運動学の構築と制御（推奨4コマ）" },
                  { name: "ロボットアーム直線補間制御", desc: "直線補間軌道の実装（推奨2コマ）" },
                  { name: "ロボットアーム円弧補間制御", desc: "円弧補間軌道の実装（推奨2コマ）" },
                  { name: "ロボットアームの積み下ろし搬送", desc: "積み下ろし・搬送タスクの総合演習（推奨4コマ）" }
                ]
              }
            ]
          },
          specs: [
            "主従連携する 5 自由度ロボットアーム×2 により動作収集と追従制御を実現",
            "トップ＋サイドカメラで ACT 学習用の色・位置情報を取得",
            "内蔵可変照明で多様な光環境を再現",
            "独立リセットボタンにより迅速な復旧とデバッグが可能",
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
