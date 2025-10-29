export const dictionary = {
    header: {
      menu: {
        home: "首页",
        products: "产品介绍",
        developer: "开发者服务",
        customSolutions: "定制合作",
        caseStudies: "服务案例",
        about: "关于我们",
        submenu: {
          knowledgeBase: "知识库",
          openSource: "开源项目",
          caseUniversities: "高校案例",
          caseK12: "K12案例",
          caseCoResearch: "共研案例",
        },
      },
      languageSwitcher: {
        label: "语言",
        options: [
          { locale: "en", label: "英语" },
          { locale: "zh", label: "中文" },
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
            alt: "有你同创具身智能创新平台",
          },
          action: {
            href: "/products",
            label: "了解整体方案",
          },
        },
        {
          id: 2,
          media: {
            kind: "image",
            src: "/images/hero/slide-2.png",
            alt: "教育机器人全栈解决方案",
          },
          action: {
            href: "/developers",
            label: "进入开发者中心",
          },
        },
        {
          id: 3,
          media: {
            kind: "image",
            src: "/images/hero/slide-3.png",
            alt: "首钢园产教融合空间",
          },
          action: {
            href: "/case-studies",
            label: "浏览联合案例",
          },
        },
      ],
      primaryCta: {
        label: "浏览产品平台",
        href: "#features",
      },
      secondaryCta: {
        label: "联系团队",
        href: "#contact",
      },
      autoPlayInterval: 6000,
    },
    features: {
      title: "产品平台",
      paragraph:
        "基于「启发、探索、创新、分享」的理念，我们构建涵盖硬件、软件、课程与服务的具身智能产品平台，让教学、科研与产业落地一步到位。",
      featuredProducts: {
        title: "精选方案矩阵",
        description:
          "围绕“入门启发 → 项目进阶 → 科研创新”三大阶段，精选具有代表性的具身智能产品组合，帮助不同教学目标快速落地。",
        ctaDescription: "想了解更多教学与科研场景的搭配？",
        viewAllLabel: "浏览全部产品",
        slugs: ["ubot-mr20", "gx-mat-09s", "rai-p4"],
      },
      highlights: [
        {
          title: "全链路部署",
          description: "硬件、软件、课程与服务打包交付，降低教学部署与运维成本。",
        },
        {
          title: "多场景适配",
          description: "覆盖 K12、职教、高校与科研场景，兼容课堂教学、竞赛训练与实验室建设。",
        },
        {
          title: "模块化拓展",
          description: "多底盘、多机械臂与 AI 模块自由组合，支持大模型、视觉、控制等跨学科实践。",
        },
      ],
    },
    about: {
      sectionOne: {
        title: "关于有你同创",
        description:
          "有你同创智能机器人科技（北京）有限公司坐落于北京市石景山首钢园冬奥广场内，携手首钢集团共同打造全球领先的具身智能创新平台。我们专注于将具身智能机器人技术应用于教学研究，持续探索落地应用场景，为高校、职校、K12提供集硬件、软件、课程的教育机器人产品。",
        highlights: [
          "具身智能机器人",
          "产学研一体化",
          "递进式学习体系",
          "低成本智能产品",
          "开源共享社区",
          "完整教育解决方案",
        ],
        image: {
          src: "/images/about/company-mascot.png",
          alt: "有你同创智能机器人产品",
        },
      },
      sectionTwo: {
        items: [
          {
            title: "启发探索创新",
            paragraph:
              "基于「启发、探索、创新、分享」的核心理念，构建具身智能机器人学习平台，激发学生对机器人技术的兴趣与创造力。",
          },
          {
            title: "阶梯式课程体系",
            paragraph:
              "系统分析具身机器人技术，结合各学段特点，设计阶梯式、多元化的课程体系，让学习循序渐进、深入浅出。",
          },
          {
            title: "开源共享生态",
            paragraph:
              "持续构建开源共享的线上学习社区，汇聚优质教学资源与技术文档，推动具身智能机器人教育的普及与发展。",
          },
        ],
      },
    },
    contact: {
      formTitle: "需要帮助？提交服务单",
      formDescription: "我们的支持团队会尽快通过邮件回复你。",
      form: {
        nameLabel: "您的姓名",
        namePlaceholder: "请输入姓名",
        emailLabel: "您的邮箱",
        emailPlaceholder: "请输入邮箱",
        messageLabel: "您的留言",
        messagePlaceholder: "请填写想咨询的问题",
        submit: "提交工单",
      },
    },
    footer: {
      description:
        "有你同创智能机器人科技（北京）有限公司\n- 坐落于北京市石景山首钢园冬奥广场内\n- 专注于具身智能机器人技术的教学研究与应用落地\n- 地址：北京市石景山区料仓路6号院10号楼3层101-2",
      columns: {
        usefulLinks: {
          title: "产品",
          items: [
            { label: "产品平台概览", path: "/products" },
            { label: "精选方案矩阵", path: "/#features" },
            { label: "服务案例", path: "/case-studies" },
          ],
        },
        terms: {
          title: "开发者服务",
          items: [
            { label: "开发者中心", path: "/developers" },
            { label: "技术文档", path: "/developers/knowledge-base" },
            { label: "开源项目", path: "/developers/open-source" },
          ],
        },
        support: {
          title: "定制合作",
          items: [
            { label: "定制方案", path: "/custom-solutions" },
            { label: "联合研发", path: "/case-studies/co-research" },
            { label: "联系团队", path: "/contact" },
          ],
        },
      },
      contact: {
        phoneLabel: "联系电话",
        phoneNumber: "+86 176 1035 7571",
        phoneTip: "工作日 09:30-18:00",
        taobaoLabel: "淘宝店铺",
        taobaoHref:
          "https://4vhhasmxqjt25cg7za43qs6podckjow.taobao.com/shop/view_shop.htm?appUid=RAzN8HWTBLcKSRgwfJESLCpphyAguSqzhXdc1GyTLumi8JFoD49&spm=a21n57.1.hoverItem.1",
        bilibiliLabel: "B站官方账号",
        bilibiliHref:
          "https://space.bilibili.com/1888573035?spm_id_from=333.337.search-card.all.click",
        modalClose: "关闭",
        qq: {
          title: "加入官方 QQ 群",
          description: "扫码加入 811348489 群，获取课程案例、最新活动。",
        },
        wechat: {
          title: "关注微信公众号",
          description: "扫码关注公众号，领取教学资料、活动通知。",
        },
      },
    },
    pages: {
      home: {
        title: "有你同创 · 具身智能教育平台",
        description:
          "有你同创智能机器人科技（北京）有限公司专注具身智能教学与科研应用，提供覆盖硬件、软件、课程与服务的一体化解决方案。",
      },
      about: {
        title: "关于我们",
        description:
          "让每个人都能快乐地链接未来智能！",
      },
      contact: {
        title: "联系我们",
        description:
          "如果你有任何问题或合作想法，欢迎留下留言，我们会尽快回复。",
      },
      products: {
        title: "产品介绍",
        description:
          "致力于为教育与科研领域提供专业的具身机器人解决方案，凭借丰富的产品矩阵，涵盖从入门到高阶的 7 款核心产品，深度融合机械、电子、人工智能等技术，具备灵活的功能拓展性与完善的配套支持。无论是 K12 阶段的机器人启蒙教学，中职高职的专业技能实训，还是高校及科研机构的前沿技术研究，都能精准匹配需求，助力用户探索具身智能机器人的无限可能，找到教学与科研的最佳拍档。",
      },
      developerServices: {
        title: "开发者服务",
        description:
          "获取技术支持、SDK指南与集成资源，帮助你快速在我们的机器人平台上进行二次开发。",
      },
      knowledgeBase: {
        title: "知识库",
        description:
          "查阅硬件安装、软件配置、课程部署等文档教程，快速定位问题解决方案。",
      },
      openSource: {
        title: "开源项目",
        description:
          "探索我们围绕机器人与人工智能推出的开源仓库，与社区一起共建共创。",
        categories: [
          {
            id: "pcb",
            title: "硬件开源（PCB）",
            description: "开源硬件设计方案，助力快速原型开发",
            projects: [
              {
                id: 9,
                name: "Arduino MEGA 2560的拓展板",
                description:
                  "适配于Arduino mega 2560和Arduino DUE的拓展板，可驱动直流编码电机、舵机、步进电机，外接多种通信接口，且包含多种传感器接口，支持8.4V-12V宽压输入",
                link: "https://x.jlc.com/platform/detail/278a899ed5834980b6136bf73e044076?type=1&share=jlc1742868845686",
                tags: ["Arduino", "拓展板", "多功能"],
              },
              {
                id: 10,
                name: "通用3S电池盒，含过充过放保护，含均衡电路",
                description:
                  "该电池盒不仅含有电池保护及快充功能，且集成了5V/5A、6V/5A、7.4V/5A的电源输出，可轻松的应用于机器人供电系统中，满足机器人系统中的各级电压需求。",
                link: "https://x.jlc.com/platform/detail/d5159e0024954a4488a0e972ce1a30bc?type=1",
                tags: ["电源管理", "电池保护", "快充"],
              },
              {
                id: 11,
                name: "基于ESP32控制板+驱动扩展板",
                description:
                  "采用ESP32作为主控，包含直流电机、PWM舵机、超声波、巡线传感器多种硬件驱动接口。包含2S锂电充电电路。且包含IIC、SPI、UART通信接口，可外接PS2手柄、陀螺仪等外设通信模块。支持openblock图形化编程，大大降低开发难度。",
                link: "https://x.jlc.com/platform/detail/89503d0ca5d04ca1906eb1bc43d2d255?type=1",
                tags: ["ESP32", "图形化编程", "多传感器"],
              },
              {
                id: 12,
                name: "拓展树莓派引脚驱动编码电机+激光雷达+串口",
                description:
                  "基于树莓派2W的双路直流编码电机驱动板，可安装2S锂电池（18650）进行供电，并含有15W充电功能，可外接两路N20编码电机。如可以驱动双轮小车。",
                link: "https://x.jlc.com/platform/detail/9784dfa329c8458abe5ac60397b2178d?type=1",
                tags: ["树莓派", "电机驱动", "激光雷达"],
              },
              {
                id: 13,
                name: "基于STM32的复合机器人开发板",
                description:
                  "该项目以STM32F407IGT6为主控芯片，外部可接直流编码电机、PWM舵机、步进电机，且可外接多种通信设备，包括IIC、SPI、UART通信。且支持多种传感器模块接口，包括超声波传感器、四路巡线传感器。支持8.4V-12V宽电压输入。应用场景：适用于ROS机器人中的底层驱动部分，利用此板卡可轻松驱动多种4驱、6驱底盘以及多种自由度的舵机机械臂。",
                link: "https://x.jlc.com/platform/detail/ac14aed55fe9438391c3f26cce0b2377",
                tags: ["STM32", "ROS", "复合机器人"],
              },
            ],
          },
          {
            id: "code",
            title: "软件开源（代码）",
            description: "开源代码库与示例项目，加速学习与开发",
            projects: [
              {
                id: 14,
                name: "基于Arduino Mega2560的复合机器人开发库源码",
                description:
                  "提供硬件驱动底层库及应用项目源码，涵盖直流电机PWM到PID控制、舵机控制、步进电机控制、7种底盘结构设计、2-6自由度机械臂设计、传感器应用（超声波、巡线、语音、AI视觉、PS2手柄、陀螺仪）、机器人综合应用（避障、循迹、语音控制、视觉识别、远程遥控、姿态控制）等。",
                link: "https://gitee.com/little-wooden-man/mega2560_-library",
                tags: ["Arduino", "底层驱动", "综合应用"],
              },
              {
                id: 15,
                name: "基于ESP32开发板+Openblock的图形化机器人源码",
                description:
                  "包含Esp32开发板原理图、电气接口图及基于图块编程的项目应用：电机驱动实验（PWM控制电机、舵机、夹爪）、底盘运动控制（前进、后退、左右平移、旋转）、机器人感知控制实验（避障、循迹等）。",
                link: "https://gitee.com/little-wooden-man/mr20",
                tags: ["ESP32", "图形化编程", "教学友好"],
              },
              {
                id: 16,
                name: "基于stm32开发板+stm32cubemx开发机器人源码",
                description:
                  "包含STM32开发板原理图、电气接口图及完整项目源码，涵盖底盘、机械臂、综合项目。支持直流电机PWM到PID控制、舵机与夹爪控制、步进电机控制、7种底盘结构、2-4自由度机械臂、传感器应用、机器人综合应用等。",
                link: "https://gitee.com/little-wooden-man/uni_-stm32/tree/master/",
                tags: ["STM32", "CubeMX", "工程化开发"],
              },
              {
                id: 17,
                name: "大模型接口调用+视觉+VLM+机械臂源码",
                description:
                  "RAI-P4具身机器人任务规划综合实训平台，集成语音识别(ASR)、大语言模型(LLM)、语音合成(TTS)、计算机视觉(YOLO人脸/几何形状检测)等AI技术，提供完整的机器人控制系统学习环境。包含架构设计文档、部署文档、实现源码及机械臂控制实验。",
                link: "https://gitee.com/BigYellow12138/RAI-P4",
                tags: ["大模型", "具身智能", "AI集成"],
              },
              {
                id: 18,
                name: "竞赛项目开源-物料搬运小车",
                description:
                  "模块化拆解提供完整源码，包含底盘结构设计与驱动、搜集装置控制（夹爪）、机器人定点搬运、遥控搬运（手柄）、超声避障、多颜色小球识别、物体追踪、定位搬运、串口通信发送多颜色目标数据等。",
                link: "https://gitee.com/little-wooden-man/Logistics_car",
                tags: ["竞赛", "物流搬运", "视觉识别"],
              },
              {
                id: 19,
                name: "竞赛项目开源-智能救援小车",
                description:
                  "模块化拆解提供完整源码，包含底盘/直线模块/机械臂结构设计与驱动、LCD显示屏使用、二维码识别与数据获取、工件颜色识别、AI模型视觉识别流程（数据集拍摄、模型训练、YOLO识别实现）、下位机数据通信、整体控制与调试等。",
                link: "https://gitee.com/little-wooden-man/unismart-rescue-vehicle",
                tags: ["竞赛", "智能救援", "AI视觉"],
              },
              {
                id: 20,
                name: "平衡车源码",
                description:
                  "四轮麦克纳姆轮小车、双轮自平衡小车PID控制模块化拆解，提供完整的控制算法实现。",
                link: "https://gitee.com/little-wooden-man/balancing_-car",
                tags: ["平衡车", "PID控制", "算法实现"],
              },
              {
                id: 21,
                name: "Arduino+Openblock图形化开发机器人源码",
                description:
                  "基于Arduino mega2560及新mega2560扩展版，采用Openblock+Arduino模式开发，包含电机驱动模块、底盘运动控制、机器人感知控制实验。提供示例Demo、工程部署、源码、操作文档等完整资料。",
                link: "https://gitee.com/xs24/openblockProject2506",
                tags: ["Arduino", "Openblock", "教学资源"],
              },
            ],
          },
        ],
      },
      customSolutions: {
        title: "定制合作",
        description:
          "面向高校、职校、K12教育机器人行业支持ODM和JDM合作方式！",
        cooperationModes: [
          {
            id: "odm",
            title: "ODM",
            subtitle: "Original Design Manufacturing（原始设计制造）",
            description:
              "围绕M系列和P系列技术为您定制专属的产品",
            icon: "design",
          },
          {
            id: "jdm",
            title: "JDM",
            subtitle: "Joint Design Manufacturing（联合设计制造）",
            description:
              "我们擅长构建稳定的具身机器人硬件平台，可与您共同开发具身机器人产品。",
            icon: "collaboration",
          },
        ],
      },
      caseStudies: {
        title: "服务案例",
        description:
          "了解不同合作伙伴如何在教学、竞赛与联合研发中应用我们的机器人产品。",
      },
      caseUniversities: {
        title: "高校案例",
        description:
          "深入了解高校如何将我们的平台融入实验室建设、课程体系与创新中心。",
      },
      caseK12: {
        title: "K12案例",
        description:
          "看看中小学如何用我们的机器人套件激发学生对STEM的兴趣与实践能力。",
      },
      caseCoResearch: {
        title: "共研案例",
        description:
          "了解我们与合作伙伴在智能机器人、人工智能等领域的联合研发成果。",
      },
    },
    products: {
      catalog: {
        coreTitle: "7款核心产品",
        coreDescription: "从入门到进阶，覆盖K12到高校及科研场景。",
        viewDetailsCta: "查看详情",
        series: [
          {
            key: "m-series",
            title: "M 系列 · 课程设计平台",
            description: "以启发、探索、创新为核心，覆盖入门搭建到科研提升的全链路课程与项目实践。",
            items: [
              {
                slug: "ubot-mr20",
                name: "具身机器人创新设计套装 Ubot MR20",
                model: "Ubot MR20",
                image: "/images/products/ubot-mr20/ubot-mr20-hero.jpg",
                brief: "具身智能机器人创新设计套件（二十合一）。结合人工智能通识课程实践套装，从零搭建20余种智能机器人，支持图形化/C++/Python多语言编程。",
              },
              {
                slug: "gx-mat-09s",
                name: "具身机器人创新设计平台（增强版）GX-MAT-09S",
                model: "GX-MAT-09S",
                image: "/images/products/gx-mat-09s/hero.png",
                brief: "11种底盘 + 7种机械臂，88种复合形态，新增激光雷达 + RDK X5 主板；适配进阶课程、科研。",
              },
            ],
          },
          {
            key: "p-series",
            title: "P 系列 · 任务实训平台",
            description: "聚焦具身智能任务落地，提供视觉、导航、规划与大模型融合的实训系统。",
            items: [
              {
                slug: "rai-p4",
                name: "具身智能任务规划实训平台 RAI-P4",
                model: "RAI-P4",
                image: "/images/products/rai-p4/rai-p4-hero.png",
                brief: "集成AI语音/视觉，4自由度机械臂，支持ROS2；适配大模型应用、机器视觉、ROS课程。",
              },
              {
                slug: "uni-wr2",
                name: "便携式ROS导航机器人学习平台 UNI-WR2",
                model: "UNI-WR2",
                image: "/images/products/uni-wr2/uni-wr2-hero.png",
                brief: "<13cm 便携机身，桌面级 SLAM 实验（≤60cm×60cm），五步 ROS 工程化部署配套 Catographer/Hector/Gmapping。",
              },
              {
                slug: "rai-q2",
                name: "具身视觉感知决策实训平台 RAI-Q2",
                model: "RAI-Q2",
                image: "/images/products/rai-q2/hero.png",
                brief: "深度相机 + 高精度转台/升降导轨，支持OpenCV/YOLO/VLM；适配机器视觉、机器学习课程。",
              },
              {
                slug: "rai-m4",
                name: "具身复合机器人系统设计实训平台 RAI-M4",
                model: "RAI-M4",
                image: "/images/products/rai-m4/front-view.png",
                brief: "麦轮全向底盘 + 4轴机械臂，接入DeepSeek/通义千问；适配移动机器人导航与大模型部署。",
              },
              {
                slug: "alo-le4",
                name: "具身机器人操作规划综合实训平台 ALO-LE4",
                model: "ALO-LE4",
                image: "/images/products/alo-le4/front-view.png",
                brief: "双5自由度机械臂（主从跟随），ACT架构，可调光源；适配模仿学习与端到端控制研究。",
              },
            ],
          },
        ],
      },
      faq: {
        title: "关键问题",
        items: [
          {
            q: "问题 1：该文档中的产品可覆盖哪些教育阶段，不同阶段推荐哪些核心产品？",
            a:
              "答案：文档产品覆盖K12、中职、高职、本科、研究生 / 科研全教育阶段，不同阶段推荐产品如下：\n\n" +
              "K12、中职 / 高职一年级、大一：推荐具身机器人创新设计套装 Ubot MR20（0.98 万元），其零编程基础入门（图形化编程）、低组装难度，可开展机器人通识实践，适配 5 种底盘 + 3 种机械臂搭建，满足入门认知需求；\n\n" +
              "本科（基础课程）：推荐具身机器人创新设计平台（增强版）GX-MAT-09S（3.88 万元），支持机械原理、传感器检测、ROS 入门等核心课程，可搭 11 种底盘 + 7 种机械臂，覆盖课堂实验与竞赛训练；\n\n" +
              "本科（进阶课程）、研究生 / 科研：推荐具身智能任务规划实训平台 RAI-P4（3.4 万元），集成大模型与机器人技术，可开展任务规划、语音/视觉融合等智能系统研究。",
          },
          {
            q: "问题 2：若高校需开展 ROS 与移动机器人导航课程，文档中哪些产品最适配，核心优势是什么？",
            a:
              "答案：最适配的产品为便携式 ROS 导航机器人学习平台 UNI-WR2（0.45 万元）和具身机器人创新设计平台（增强版）GX-MAT-09S（3.88 万元），核心优势如下：\n\n" +
              "UNI-WR2：\n" +
              "• 部署灵活：极致便携（<13cm，<550g），最小 60cm×60cm 桌面即可实现 SLAM 导航，无需大型场地；\n" +
              "• 教学深度：将 ROS 工程化部署拆解为 5 步（原理→演示→框架解构→功能包配置→全参调试），结合 Cartographer / Hector / Gmapping 3 种导航方式，设计递进式实验；\n" +
              "• 成本友好：单价 0.45 万元，适合批量采购用于学生分组实验。\n\n" +
              "GX-MAT-09S：\n" +
              "• 功能全面：支持 ROS 课程，可搭 11 种底盘 + 7 种机械臂，结合激光雷达（测距 0.12-8m），覆盖移动机器人导航与定位实践；\n" +
              "• 算力支撑：配备 RDK X5 主板（10TOPS），预装 Ubuntu+ROS，支撑 SLAM 建图、自主避障等复杂算法的运行与调试。",
          },
          {
            q: "问题 3：文档中哪些产品支持大模型集成应用，具体可实现哪些大模型相关功能？",
            a:
              "答案：支持大模型集成应用的产品有 3 款：\n\n" +
              "RAI-P4（3.4 万元）：集成通义千问、Deepseek、火山引擎；可实现 ASR（通义千问）、LLM（Deepseek）、TTS（火山引擎）、Function-call（如语音对话计算器、音乐播放、云台 / 机械臂任务规划），并支持与 YOLO / 人脸追踪、机械臂控制的集成应用。\n\n" +
              "RAI-M4（2.4 万元）：接入 Deepseek（LLM）、通义千问（ASR + 多模态）；可实现自然语言转机器人任务流程（语音指令控制底盘 / 机械臂）、多模态物体检测（通义千问），结合麦轮底盘与 4 轴机械臂实现泛化操作。\n\n" +
              "RAI-Q2（3.2 万元）：调用通义千问 VLM；可实现多模态视觉检测（水果检测与标记、未知物体识别），结合深度相机和高精度转台，适配机器视觉与大模型部署课程。",
          },
        ],
      },
      detailLabels: {
        highlights: "核心亮点",
        applicable: "适配人群/场景",
        features: "产品特点",
        sampleCases: "样机案例",
        modules: "机器人模块",
        chassis: "机器人底盘",
        arms: "机械臂构型",
        compositeRobots: "复合机器人",
        sensorConfig: "传感器配置",
        controllerConfig: "控制器配置",
        softwareConfig: "软件配置",
        experiments: "实验项目",
        configuration: "配置清单",
        specs: "技术参数",
        comingSoon: "内容即将更新",
      },
      details: {
        "ubot-mr20": {
          name: "Ubot MR20",
          subtitle: "具身智能机器人创新设计套件（二十合一）",
          model: "Ubot MR20",
          image: "/images/products/ubot-mr20/ubot-mr20-hero.jpg",
          overview: "Ubot MR20是结合机器人的人工智能通识课程实践套装，学习者可以从零搭建20余种智能机器人，结合语音识别让学习者了解人工智能技术在机器人中的应用，学习者还可以通过图形化编程/C++编程进行机器人避让、机器人循迹、机器人姿态检测等智能功能的开发。",
          applicable: "K12、中职/高职一年级、大一学生",
          features: [
            {
              title: "编程方式",
              content: "使用MR20不需要学习者具备任何编程基础，我们采用了图块化编程，孩子们只需要拖拽即可完成机器人编程。如果学习者有一定编程基础，希望进行更复杂和更专业的代码编程，我们也支持C++和Python的代码编程方式。"
            },
            {
              title: "组装方式",
              content: "我们对组装难度的考虑细化到每一个孔的设计，包括间距、尺寸、是否为螺纹孔，做到在保证强度的同时，尽可能减少不必要的螺母，降低组装难度，让学习者入门更简单且将学习的精力集中在整体设计中。"
            }
          ],
          sampleCases: {
            description: "样机采用模块化设计，机器人底盘构型基于差速轮模块、定向轮模块、万向轮模块、转向轮模块、全向麦轮模块、夹爪模块、摆动模块组合设计三轮双驱差速底盘、三轮双驱前轮转向底盘、四轮双驱差速底盘、四轮四驱差速底盘和四轮四驱麦轮全向底盘；机器人机械臂构型基于摆动模块、转台模块、夹爪模块组合设计云台、3自由度机械臂、4自由度机械臂构型。",
            modules: [
              { name: "差速轮模块", image: "/images/products/ubot-mr20/modules/differential-wheel.png" },
              { name: "万向轮模块", image: "/images/products/ubot-mr20/modules/universal-wheel.png" },
              { name: "转向轮模块", image: "/images/products/ubot-mr20/modules/steering-wheel.png" },
              { name: "全向麦轮模块", image: "/images/products/ubot-mr20/modules/omni-wheel.png" },
              { name: "夹爪模块", image: "/images/products/ubot-mr20/modules/gripper.png" },
              { name: "摆动模块", image: "/images/products/ubot-mr20/modules/swing.png" }
            ],
            chassis: [
              { name: "三轮双驱万向差速移动机器人", image: "/images/products/ubot-mr20/chassis/three-wheel-omni-differential.png" },
              { name: "三轮双驱前轮转向移动机器人", image: "/images/products/ubot-mr20/chassis/three-wheel-front-steering.png" },
              { name: "四轮双驱差速移动机器人", image: "/images/products/ubot-mr20/chassis/four-wheel-two-drive-differential.png" },
              { name: "四轮四驱差速移动机器人", image: "/images/products/ubot-mr20/chassis/four-wheel-four-drive-differential.png" },
              { name: "四轮四驱麦轮全向移动机器人", image: "/images/products/ubot-mr20/chassis/four-wheel-mecanum-omni.png" }
            ],
            arms: [
              { name: "二自由度云台", image: "/images/products/ubot-mr20/arms/two-dof-gimbal.png" },
              { name: "3自由度机械臂", image: "/images/products/ubot-mr20/arms/three-dof-arm.png" },
              { name: "4自由度机械臂", image: "/images/products/ubot-mr20/arms/four-dof-arm.png" }
            ],
            compositeRobots: [
              { name: "三轮双驱万向抓取机器人", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-gripper.png" },
              { name: "三轮双驱万向二自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-2dof-transport.png" },
              { name: "三轮双驱万向三自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-3dof-transport.png" },
              { name: "三轮双驱万向四自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-4dof-transport.png" },
              { name: "三轮双驱前轮转向抓取机器人", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-gripper.png" },
              { name: "三轮双驱前轮转向二自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-2dof-transport.png" },
              { name: "三轮双驱前轮转向三自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-3dof-transport.png" },
              { name: "三轮双驱前轮转向四自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-4dof-transport.png" },
              { name: "四轮双驱差速抓取机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-gripper.png" },
              { name: "四轮双驱差速二自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-2dof-transport.png" },
              { name: "四轮双驱差速三自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-3dof-transport.png" },
              { name: "四轮双驱差速转向四自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-4dof-transport.png" },
              { name: "四轮四驱差速抓取机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-gripper.png" },
              { name: "四轮四驱差速二自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-2dof-transport.png" },
              { name: "四轮四驱差速三自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-3dof-transport.png" },
              { name: "四轮四驱差速四自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-4dof-transport.png" },
              { name: "四轮四驱麦轮全向抓取机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-gripper.png" },
              { name: "四轮四驱麦轮全向二自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-2dof-transport.png" },
              { name: "四轮四驱麦轮全向三自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-3dof-transport.png" },
              { name: "四轮四驱麦轮全向四自由度搬运机器人", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-4dof-transport.png" }
            ]
          },
          sensorConfig: {
            description: "集成了姿态检测传感器、4路巡线传感器、超声波传感器×2、语音识别传感器、喇叭模块、PS手柄遥控器，可实现机器人的自动避障、走迷宫、自主倒车入库、自主巡线、语音对话及语音指令控制、手柄遥控等功能。学生还可以用MR20进行有趣的项目开发，比如登上月球协助科学家考察！",
            list: [
              "六姿态陀螺仪传感器",
              "四线寻路传感器",
              "超声波传感器",
              "语音识别传感器",
              "喇叭模块",
              "遥控手柄"
            ]
          },
          controllerConfig: {
            description: "控制器支持常用的编程语言程序输入，包含图形化、C++、Python等编程语言编写程序。预留了丰富的接口，包含6路直流电机接口、8路舵机接口、4路超声波接口、4路巡线传感器接口、4路扩展IO传感器接口、USB串口等接口。控制器采用堆叠式设计，预留了对接扩展坞，方便用户将其他电子硬件与控制器进行连接使用。",
            images: [
              {
                src: "/images/products/ubot-mr20/controller/controller-overview.png",
                alt: "MR20 控制器堆叠式设计与接口示意",
                caption: "MR20 控制器：直流电机、舵机与传感器扩展接口一览",
              },
            ],
          },
          softwareConfig: {
            description: "软件集成OpenBlock编程软件，支持图形块编程和C++、Python代码编程，可以用于软件程序编程也可以对硬件设备编程，支持硬件代码生成及编译下载功能，同时也支持通过与硬件设备间的实时通讯实现的实时运行模式。",
            ecosystem: "Openblock硬件生态完整，支持市面上通用的创客硬件平台，包括Arduino、MicroPython和ESP32，用户可以任意扩展。",
            images: [
              {
                src: "/images/products/ubot-mr20/software/openblock-interface-1.jpg",
                alt: "OpenBlock 编程工作区界面",
                caption: "OpenBlock 拖拽式逻辑编辑与模块预览",
              },
              {
                src: "/images/products/ubot-mr20/software/openblock-interface-2.jpg",
                alt: "OpenBlock 设备连接界面",
                caption: "OpenBlock 设备管理：支持 C++ / Python 与硬件烧录",
              },
            ],
          },
          experiments: {
            summary: "本实验体系围绕模块化机器人的「基础认知-模块控制-结构搭建-感知应用-综合设计-扩展创新」展开，分为6大核心模块，涵盖32个基础实验与20个扩展项目，形成从入门到进阶的完整学习路径。",
            preparation: {
              title: "实验准备阶段",
              description: "聚焦实验前的软硬件基础与设计方法学习，为后续实操奠定基础",
              items: [
                "软硬件环境配置基础：编程环境安装、零件清单使用、学习资料查阅、模块化机器人设计方法",
                "机器人模块基础认知：明确核心模块（电机、舵机、轮组等）的功能与应用逻辑"
              ]
            },
            moduleBasics: {
              title: "机器人模块基础实验",
              range: "实验1-实验9",
              description: "针对机器人核心功能模块（电机、轮组、舵机、执行机构），实现从「原理认知-搭建-控制」的闭环，共9个实验",
              items: [
                { no: "实验1", name: "控制直流电机转动", desc: "掌握直流电机正反转、停止的控制逻辑与编程实现" },
                { no: "实验2", name: "控制直流电机的速度", desc: "实现直流电机转速调节（如PWM调速），理解速度控制原理" },
                { no: "实验3", name: "差速轮模块的搭建与运动控制", desc: "了解差速轮组成/应用，完成搭建并实现正反转、速度控制、停止" },
                { no: "实验4", name: "全向轮模块的搭建与运动控制", desc: "了解全向轮组成/应用（如麦轮、omni轮），完成搭建并实现基础运动控制" },
                { no: "实验6", name: "控制舵机转动的角度", desc: "理解舵机工作原理（角度定位特性），实现指定角度的精准控制" },
                { no: "实验7", name: "摆动模块的搭建与运动控制", desc: "了解摆动模块组成/应用，完成搭建并实现角度控制（如机械臂关节、云台摆动）" },
                { no: "实验8", name: "转向轮模块搭建与运动控制", desc: "了解转向轮组成/应用（如汽车转向结构），完成搭建并实现方向控制" },
                { no: "实验9", name: "夹爪模块的运动控制", desc: "了解夹爪模块组成/应用（如抓取物体），完成搭建并实现开合范围控制" }
              ]
            },
            structureDesign: {
              title: "机器人结构设计实验",
              range: "实验10-实验19",
              description: "基于基础模块，完成机器人整体结构搭建，涵盖「支架-底盘-云台-机械臂」，共10个实验",
              items: [
                { no: "实验10", name: "T型支架的搭建", desc: "掌握零件搭建规则，完成T型支架（机器人结构支撑件）搭建" },
                { no: "实验11", name: "矩形悬挂车架的搭建", desc: "了解悬挂车架组成/应用（缓冲、稳定），完成矩形悬挂车架搭建" },
                { no: "实验12", name: "三轮双驱万向差速移动机器人搭建与运动控制", desc: "了解双驱万向底盘组成/应用，完成结构搭建，实现基础移动控制" },
                { no: "实验13", name: "三轮双驱前轮转向移动机器人搭建与运动控制", desc: "了解双驱前轮转向底盘组成/应用，完成结构搭建，实现转向与移动控制" },
                { no: "实验14", name: "四轮双驱差速移动机器人搭建与运动控制", desc: "了解四轮双驱差速底盘组成/应用，完成结构搭建，实现差速转向与移动控制" },
                { no: "实验15", name: "四轮四驱差速移动机器人搭建与运动控制", desc: "了解四轮四驱差速底盘组成/应用（更强动力），完成结构搭建与移动控制" },
                { no: "实验16", name: "四轮四驱麦轮全向移动机器人搭建与运动控制", desc: "了解四轮四驱全向底盘组成/应用（全向移动特性），完成结构搭建与运动控制" },
                { no: "实验17", name: "二自由度云台搭建与运动控制", desc: "了解云台组成/应用（如摄像头转向），完成二自由度（水平+垂直）云台搭建与控制" },
                { no: "实验18", name: "三自由度机械臂搭建与运动控制", desc: "了解三自由度机械臂组成/应用，完成搭建并实现多关节协同运动控制" },
                { no: "实验19", name: "四自由度机械臂搭建与运动控制", desc: "了解四自由度机械臂组成/应用（更灵活抓取），完成搭建并实现协同运动控制" }
              ]
            },
            perception: {
              title: "机器人感知基础实验",
              range: "实验20-实验24",
              description: "学习机器人「感知外界」的核心传感器，实现数据获取与基础交互，共5个实验",
              items: [
                { no: "实验20", name: "超声波传感器数据获取", desc: "了解超声波传感器原理/应用（测距、避障），实现传感器数据读取" },
                { no: "实验21", name: "循迹传感器数据获取", desc: "了解循迹传感器原理/应用（沿轨迹行走），实现传感器数据读取" },
                { no: "实验22", name: "姿态检测传感器数据获取", desc: "了解陀螺仪传感器原理/应用（检测机器人姿态：倾斜、旋转角度），实现数据读取" },
                { no: "实验23", name: "语音识别对话", desc: "了解语音识别传感器原理/应用，配置识别词条并实现语音对话交互" },
                { no: "实验24", name: "遥控器数据获取", desc: "了解遥控器原理/应用（无线控制），实现遥控器各按钮数据读取与指令接收" }
              ]
            },
            comprehensiveProjects: {
              title: "机器人综合项目设计",
              range: "实验25-实验32",
              description: "结合「模块控制+结构+感知」，模拟真实场景实现复杂任务，共8个实验",
              items: [
                { no: "实验25", name: "机器人巡墙面", desc: "模拟沿墙行走场景（如走廊巡逻），通过传感器（如超声波）+编程实现沿墙面行走" },
                { no: "实验26", name: "机器人走迷宫", desc: "模拟迷宫探索场景，通过超声波传感器检测障碍物，编程实现迷宫路径规划与行走" },
                { no: "实验27", name: "机器人跟随", desc: "模拟跟随场景（如陪伴机器人），通过超声波传感器检测目标距离，实现跟随人行走" },
                { no: "实验28", name: "机器人寻踪探迹", desc: "模拟餐厅送餐场景，通过循迹传感器沿地面轨迹运动，在指定点完成物品搬运任务" },
                { no: "实验29", name: "语音控制机器人运动", desc: "模拟语音交互机器人场景，通过语音识别接收指令，控制机器人完成相应动作（如前进、转向）" },
                { no: "实验30", name: "体感云台控制", desc: "模拟「铁甲钢拳」交互场景，通过姿态传感器（如手环、手机）检测手部姿态，控制云台完成动作" },
                { no: "实验31", name: "机械臂检测搬运", desc: "模拟工业/咖啡机器人场景，搭建多自由度机械臂工作站，编程实现「自动检测任务-控制机械臂搬运」闭环" },
                { no: "实验32", name: "遥控搬运AGV机器人", desc: "模拟物流/导览场景，搭建「移动+搬运」复合机器人，通过遥控器控制完成物品转运任务" }
              ]
            },
            extensionProjects: {
              title: "机器人扩展项目",
              range: "项目1-项目20",
              description: "基于前文「底盘类型+执行机构」进行组合创新，聚焦「移动+抓取/搬运」功能，共20个项目",
              groups: [
                {
                  chassis: "三轮双驱万向底盘",
                  projects: [
                    "三轮双驱万向抓取机器人",
                    "三轮双驱万向二自由度搬运机器人",
                    "三轮双驱万向三自由度搬运机器人",
                    "三轮双驱万向四自由度搬运机器人"
                  ]
                },
                {
                  chassis: "三轮双驱前轮转向底盘",
                  projects: [
                    "三轮双驱前轮转向抓取机器人",
                    "三轮双驱前轮转向二自由度搬运机器人",
                    "三轮双驱前轮转向三自由度搬运机器人",
                    "三轮双驱前轮转向四自由度搬运机器人"
                  ]
                },
                {
                  chassis: "四轮双驱差速底盘",
                  projects: [
                    "四轮双驱差速抓取机器人",
                    "四轮双驱差速二自由度搬运机器人",
                    "四轮双驱差速三自由度搬运机器人",
                    "四轮双驱差速四自由度搬运机器人"
                  ]
                },
                {
                  chassis: "四轮四驱差速底盘",
                  projects: [
                    "四轮四驱差速抓取机器人",
                    "四轮四驱差速二自由度搬运机器人",
                    "四轮四驱差速三自由度搬运机器人",
                    "四轮四驱差速四自由度搬运机器人"
                  ]
                },
                {
                  chassis: "四轮四驱麦轮全向底盘",
                  projects: [
                    "四轮四驱麦轮全向抓取机器人",
                    "四轮四驱麦轮全向二自由度搬运机器人",
                    "四轮四驱麦轮全向三自由度搬运机器人",
                    "四轮四驱麦轮全向四自由度搬运机器人"
                  ]
                }
              ]
            }
          },
          specs: [
            "机器人模块：7种（差速轮、万向轮、转向轮、全向麦轮、夹爪、摆动、转台）",
            "机器人底盘：5种（三轮双驱万向差速、三轮双驱前轮转向、四轮双驱差速、四轮四驱差速、四轮四驱麦轮全向）",
            "机械臂构型：3种（二自由度云台、3自由度机械臂、4自由度机械臂）",
            "复合机器人：20种（底盘+机械臂的各种组合形态）",
            "实验项目：32个基础实验 + 20个扩展项目",
            "直流电机：减速比48",
            "舵机：扭矩30kgf.cm"
          ]
        },
        "gx-mat-09s": {
          name: "具身机器人创新设计平台（增强版）GX-MAT-09S",
          subtitle: "具身复合机器人创新设计套装（增强版）",
          model: "GX-MAT-09S",
          image: "/images/products/gx-mat-09s/hero.png",
          overview:
            "具身智能机器人融合了智能决策、智能感知与强操作能力，可在服务、家庭等非结构化场景中完成终端任务，是下一代机器人技术的重要方向。当前具身机器人形态以移动复合机器人为主，GX-MAT-09S 从此出发，对典型具身复合机器人进行模块化拆解，让学习者洞察其机构、驱动与智能系统。\n\n凭借模块化部件，学生可以自由构造 11 种典型具身底盘、7 种典型机械臂，并组合出 88 种具身复合机器人，完整体验“设计-搭建-控制”的工程流程。平台同时集成 AI 视觉、AI 语音、姿态检测、避障、巡线、激光雷达等感知单元，覆盖具身机器人核心传感需求。\n\n控制系统包含 Arduino、STM32 与地平线 RDK X5 三板架构，兼顾图形化入门、单片机专业开发与 Ubuntu+ROS 的高阶 AI 应用，满足日常教学、课程实训、毕业设计、科研开发与竞赛训练的多层次需求。",
          highlights: [
            "11 种移动底盘 + 7 种机械臂，组合 88 种具身复合形态",
            "AI 视觉、语音、姿态、巡线、激光雷达等多模态传感融合",
            "Arduino + STM32 + RDK X5 控制体系覆盖入门到科研",
          ],
          applicable: "高校机器人课程综合实践、研究开发、创新竞赛训练",
          features: [
            {
              title: "具身体系拆解",
              content:
                "以具身移动复合机器人为蓝本，拆解本体结构、驱动与智能控制链路，帮助学习者理解具身机器人的关键要素与系统协同。"
            },
            {
              title: "模块化学习路径",
              content:
                "提供 11 种底盘、7 种机械臂与 88 种复合形态，支持从零件设计、装配到调参控制的完整项目式学习。"
            },
            {
              title: "全域智能感知",
              content:
                "融合 AI 视觉、单目摄像、AI 语音、姿态 IMU、避障/巡线传感器、导航激光雷达等单元，构建具身机器人必备的环境认知能力。"
            },
            {
              title: "多层控制器架构",
              content:
                "Arduino 图形化入门、STM32 单片机专业开发与 Horizon RDK X5（Ubuntu+ROS，10 TOPS）协同，兼顾教学、科研与产业级实践。"
            },
            {
              title: "课程与竞赛覆盖",
              content:
                "支撑《机械原理》《传感器检测》《单片机》《机器人学》《ROS》《移动机器人导航与定位》等课程，并满足高校智能机器人创意赛、工程实践创新赛等竞赛训练需求。"
            }
          ],
          sampleCases: {
            description:
              "平台提供具身机器人典型底盘与机械臂构型，可通过模块化装配快速构建 88 种具身复合机器人，覆盖差速、全向、转向、双臂等多种体系。",
            chassis: [
              { name: "三轮双驱差速底盘", image: "" },
              { name: "前轮转向三轮双驱底盘", image: "" },
              { name: "三轮三驱福来轮全向底盘（方案A）", image: "" },
              { name: "三轮三驱福来轮全向底盘（方案B）", image: "" },
              { name: "四轮双驱差速底盘", image: "" },
              { name: "四轮四驱差速底盘", image: "" },
              { name: "四轮四驱福来轮全向底盘", image: "" },
              { name: "四轮四驱麦轮全向底盘", image: "" },
              { name: "四轮八驱转向底盘", image: "" },
              { name: "六轮双驱差速底盘", image: "" },
              { name: "六轮六驱差速底盘", image: "" }
            ],
            arms: [
              { name: "二自由度云台", image: "" },
              { name: "3 自由度串联机械臂", image: "" },
              { name: "4 自由度串联机械臂", image: "" },
              { name: "4 自由度 SCARA 机械臂", image: "" },
              { name: "5 自由度串联机械臂", image: "" },
              { name: "6 自由度串联机械臂（方案一）", image: "" },
              { name: "6 自由度串联机械臂（方案二）", image: "" },
              { name: "8 自由度双臂机械臂", image: "" }
            ],
            compositeGroups: [
              {
                title: "基于双驱差速三轮底盘",
                robots: ["双驱差速三轮云台复合机器人", "双驱差速三轮 SCARA 复合机器人", "双驱差速三轮六轴复合机器人"]
              },
              {
                title: "基于双驱四轮差速底盘",
                robots: [
                  "双驱四轮差速云台复合机器人",
                  "双驱四轮差速四轴复合机器人",
                  "双驱四轮差速五轴复合机器人",
                  "双驱四轮差速六轴复合机器人",
                  "双驱四轮差速 SCARA 复合机器人",
                  "双驱四轮差速双臂复合机器人",
                  "双驱四轮差速双臂升降复合机器人"
                ]
              },
              {
                title: "基于双驱六轮差速底盘",
                robots: [
                  "双驱六轮差速云台复合机器人",
                  "双驱六轮差速四轴复合机器人",
                  "双驱六轮差速五轴复合机器人",
                  "双驱六轮差速六轴复合机器人",
                  "双驱六轮差速 SCARA 复合机器人",
                  "双驱六轮差速双臂复合机器人",
                  "双驱六轮差速双臂升降复合机器人"
                ]
              },
              {
                title: "基于三轮全向底盘",
                robots: [
                  "三轮全向云台复合机器人",
                  "三轮全向四轴复合机器人",
                  "三轮全向五轴复合机器人",
                  "三轮全向六轴复合机器人",
                  "三轮全向 SCARA 复合机器人",
                  "三轮全向双臂复合机器人",
                  "三轮全向双臂升降复合机器人"
                ]
              },
              {
                title: "基于四驱差速底盘",
                robots: [
                  "四驱差速云台复合机器人",
                  "四驱差速四轴复合机器人",
                  "四驱差速五轴复合机器人",
                  "四驱差速六轴复合机器人",
                  "四驱差速 SCARA 复合机器人",
                  "四驱差速双臂复合机器人",
                  "四驱差速双臂升降复合机器人"
                ]
              },
              {
                title: "基于四轮全向底盘",
                robots: [
                  "四轮全向云台复合机器人",
                  "四轮全向四轴复合机器人",
                  "四轮全向五轴复合机器人",
                  "四轮全向六轴复合机器人",
                  "四轮全向 SCARA 复合机器人",
                  "四轮全向双臂复合机器人",
                  "四轮全向双臂升降复合机器人"
                ]
              },
              {
                title: "基于四轮转向底盘",
                robots: ["四轮转向云台复合机器人", "四轮转向四轴复合机器人", "四轮转向 SCARA 复合机器人"]
              }
            ]
          },
          sensorConfig: {
            description:
              "平台集成具身机器人常用的多模态传感器，可完成环境感知、语音交互、导航与巡线等任务，为复合机器人搭建提供完整输入通道。",
            list: ["AI 视觉摄像头", "单目摄像模组", "AI 语音识别模块", "姿态 IMU 传感器", "避障/巡线传感器阵列", "导航级激光雷达"]
          },
          controllerConfig: {
            description:
              "控制系统包含 Arduino、STM32 与地平线 RDK X5：Arduino 支持图形化与 C++ 快速入门，STM32 适合单片机深入开发，RDK X5 预装 Ubuntu + ROS，10 TOPS 算力满足具身机器人高阶应用。",
            images: [
              {
                src: "/images/products/gx-mat-09s/controller/arduino-mega2560.png",
                alt: "Arduino Mega 2560 控制板",
                caption: "Arduino Mega 2560：图形化/C++ 快速入门平台",
              },
              {
                src: "/images/products/gx-mat-09s/controller/stm32f407.jpg",
                alt: "STM32F407 开发板",
                caption: "STM32F407：单片机深入开发与嵌入式控制",
              },
              {
                src: "/images/products/gx-mat-09s/controller/rdk-x5.png",
                alt: "地平线 RDK X5",
                caption: "Horizon RDK X5：Ubuntu + ROS，10 TOPS AI 运算平台",
              },
            ],
          },
          softwareConfig: {
            description:
              "提供 Arduino IDE、STM32 开发环境、Ubuntu/ROS 工具链及配套示例，支持从硬件驱动到 AI/ROS 的全栈实践。",
            ecosystem:
              "兼容主流开源框架与工具，包括 Arduino 库、HAL/FreeRTOS、ROS/MoveIt、OpenCV、YOLO、语音识别 SDK 等，可快速对接教学与科研资源。"
          },
          experiments: {
            summary:
              "实验体系覆盖单片机、传感器、嵌入式、机器视觉、底盘设计、机械臂控制、复合机器人应用、ROS 以及移动导航定位等方向，提供由浅入深的完整项目路径。",
            sections: [
              {
                title: "单片机综合项目",
                description: "结合 Arduino 与 STM32，完成从主控认知到 EEPROM、库安装的基础训练。",
                items: [
                  { name: "Arduino 控制板认知实验", desc: "了解芯片参数、接口、存储器与电路布局，完成编程环境配置。" },
                  { name: "STM32 控制板认知实验", desc: "熟悉 STM32 主控板性能、引脚、电路结构及开发环境配置。" },
                  { name: "LED 灯闪烁实验", desc: "掌握 digitalWrite()、delay() 等基础函数，完成数字输出实验。" },
                  { name: "模拟输入监控实验", desc: "使用 analogRead()/analogWrite()/Serial API，读取并可视化模拟信号。" },
                  { name: "串口传输实验", desc: "配置 Serial.begin()，实现串口数据收发与调试输出。" },
                  { name: "EEPROM 读取实验", desc: "调用 EEPROM.read()，展示非易失存储读取流程。" },
                  { name: "EEPROM 清除实验", desc: "通过 EEPROM.write() 完成数据清除与擦写操作。" },
                  { name: "EEPROM 写入实验", desc: "掌握 EEPROM.write() 写入流程，确保数据持久化。" },
                  { name: "扩展库安装实验", desc: "安装 MsTimer2 等扩展库，并用定时器实现 Blink 功能。" }
                ]
              },
              {
                title: "电机综合项目",
                description: "聚焦直流电机与舵机控制，结合编码器与 PID 算法完成精准调速。",
                items: [
                  { name: "控制直流电机", desc: "掌握直流电机的数字控制与驱动要点。" },
                  {
                    name: "控制编码直流电机",
                    desc: "采集编码器数据，理解 PID 原理，实现速度闭环控制。"
                  },
                  { name: "Servo 控制舵机", desc: "使用 myservo.attach()/write() 完成舵机角度控制。" }
                ]
              },
              {
                title: "传感器项目",
                description: "涵盖 TTL、巡线、超声、陀螺仪、语音识别与 AI 视觉等常用传感器。",
                items: [
                  { name: "TTL 传感器实验", desc: "掌握 TTL 传感器参数读取方法。" },
                  { name: "四路巡线传感器", desc: "实现机器人循迹控制。" },
                  { name: "超声测距传感器", desc: "理解测距算法并完成环境自适应调试。" },
                  { name: "陀螺仪传感器", desc: "使用 MPU6050.cpp 获取姿态信息。" },
                  { name: "语音识别传感器", desc: "调用 HBR640.h 完成语音识别与指令触发。" },
                  { name: "AI 视觉传感器", desc: "掌握摄像头视频显示与 AI 视觉推理流程。" }
                ]
              },
              {
                title: "嵌入式项目",
                description: "围绕 Ubuntu + Python 开发，训练 GPIO、传感器数据处理、多线程与 Web 联调。",
                items: [
                  { name: "系统基础入门", desc: "安装配置 Ubuntu，掌握 SSH 登录与文件系统管理命令。" },
                  { name: "GPIO 接口控制", desc: "用 Python 控制 GPIO，实现 LED 与按键交互，熟悉标准库调用。" },
                  { name: "传感器数据采集", desc: "连接多类传感器，读取并处理数据，结合 GUI 展示与滤波校准。" },
                  { name: "网络通信与 Web 服务器", desc: "编写 Socket 通信，搭建简易 Web 服务实现数据交互。" },
                  { name: "多线程实现", desc: "使用 threading 模块完成多线程采集与处理，掌握同步与互斥。" }
                ]
              },
              {
                title: "机器视觉项目",
                description: "依托 RDK X5 与摄像头模块，完成颜色、形状、二维码、云台追踪等应用开发。",
                items: [
                  { name: "视觉颜色识别", desc: "使用 OpenCV 进行颜色空间转换，完成分拣/追踪示例。" },
                  { name: "视觉形状识别", desc: "通过边缘检测与轮廓提取实现形状分类。" },
                  { name: "视觉二维码识别", desc: "基于 OpenCV/zbar 完成二维码解码与信息处理。" },
                  { name: "云台追踪几何图形", desc: "搭建云台系统，识别并跟踪特定几何图形实现闭环控制。" },
                  { name: "机器人追踪彩色目标", desc: "识别彩色目标并驱动移动平台实现自主跟随。" },
                  { name: "人脸识别", desc: "使用 OpenCV/dlib 进行人脸检测、特征提取与识别应用。" },
                  { name: "视觉巡线", desc: "编写视觉算法识别地面轨迹，实现视觉循迹。" },
                  { name: "YOLO 部署", desc: "部署 YOLO 模型完成实时目标检测与分类。" },
                  { name: "数据集标注", desc: "使用 LabelImg/RectLabel 创建并管理自定义视觉数据集。" },
                  { name: "水果识别", desc: "在 RDK X5 上部署深度学习模型，完成实时水果识别。" },
                  { name: "机械臂识别搬运", desc: "结合视觉识别与机械臂控制，实现自动化抓取搬运。" }
                ]
              },
              {
                title: "底盘机器人项目",
                description: "覆盖差速、全向、福来、麦轮、转向等多种底盘的装配、驱动与里程控制。",
                items: [
                  { name: "双驱差速三轮底盘设计", desc: "底盘组装、驱动控制、里程控制" },
                  { name: "后双驱四轮差速底盘设计", desc: "底盘组装、驱动控制、里程控制" },
                  { name: "双驱六轮差速底盘设计", desc: "底盘组装、驱动控制、里程控制" },
                  { name: "三轮福来轮底盘设计", desc: "底盘组装、驱动控制、里程控制" },
                  { name: "四驱四轮差速底盘设计", desc: "底盘组装、驱动控制、里程控制" },
                  { name: "四轮福来轮全向底盘设计", desc: "底盘组装、驱动控制、里程控制" },
                  { name: "四轮麦轮全向底盘设计", desc: "底盘组装、驱动控制、里程控制" },
                  { name: "四驱福麦全向底盘设计", desc: "底盘组装、驱动控制、里程控制" },
                  { name: "四驱独立转向底盘设计", desc: "底盘组装、驱动控制、里程控制" }
                ]
              },
              {
                title: "机械臂项目",
                description: "从串联机械臂到 SCARA 与双臂系统，完成机构搭建与运动学控制。",
                items: [
                  { name: "串联四自由度机械臂设计", desc: "组装、驱动控制、运动学控制" },
                  { name: "串联五自由度机械臂设计", desc: "组装、驱动控制、运动学控制" },
                  { name: "串联六轴机械臂设计", desc: "组装、驱动控制、运动学控制" },
                  { name: "SCARA 机械臂设计", desc: "组装、驱动控制、运动学控制" },
                  { name: "双臂机器人设计", desc: "双臂组装、驱动控制、运动学控制" },
                  { name: "升降双臂机器人设计", desc: "升降双臂组装、控制、运动学调试" }
                ]
              },
              {
                title: "复合机器人项目",
                description: "基于不同底盘组合机械臂，快速构建具身复合机器人应用。",
                items: [
                  { name: "双驱差速三轮复合机器人", desc: "云台、SCARA、六轴等多类型复合形态" },
                  { name: "双驱四轮差速复合机器人", desc: "云台、四/五/六轴、双臂、双臂升降等组合" },
                  { name: "双驱六轮差速复合机器人", desc: "云台、四/五/六轴、SCARA、双臂、双臂升降" },
                  { name: "三轮全向复合机器人", desc: "云台、四/五/六轴、SCARA、双臂、双臂升降" },
                  { name: "四驱差速复合机器人", desc: "云台、四/五/六轴、SCARA、双臂、双臂升降" },
                  { name: "四轮全向复合机器人", desc: "云台、四/五/六轴、SCARA、双臂、双臂升降" },
                  { name: "四轮转向复合机器人", desc: "云台、四轴、SCARA 三种方案" }
                ]
              },
              {
                title: "机器人操作系统 ROS",
                description: "面向 ROS 入门、功能包开发与 MoveIt 仿真，强化机器人软件能力。",
                items: [
                  { name: "体验 ROS 运行实验", desc: "理解文件结构，控制仿真小乌龟与移动机器人。" },
                  { name: "构建/移植 ROS 功能包", desc: "创建功能包、配置环境，并实现键盘控制移动机器人。" },
                  { name: "URDF 仿真与 MoveIt 控制", desc: "构建 URDF 模型并在 Rviz 显示，结合 MoveIt 实现机械臂运动学控制。" }
                ]
              },
              {
                title: "移动机器人导航与定位",
                description: "涵盖 Catgrapher、Hector、Gmapping 全流程导航建图实践。",
                items: [
                  { name: "快速导航体验", desc: "按流程操作 Catgrapher、Hector、Gmapping 并对比适用场景。" },
                  { name: "Catgrapher 构建地图", desc: "讲解原理、拆解功能包、配置与全参调试。" },
                  { name: "Hector 构建地图", desc: "拆解架构、配置参数、完成全参调试。" },
                  { name: "Gmapping 构建地图", desc: "掌握原理、配置流程，完成全参调试与地图生成。" }
                ]
              }
            ]
          },
          specs: [
            "底盘组合：11 种移动平台，覆盖差速、全向、福来、麦轮、独立转向等形态",
            "机械臂组合：7 种标准机械臂，支持扩展至 8 自由度双臂系统",
            "复合形态：提供 63+ 移动 + 作业一体化具身机器人实践案例",
            "传感器系统：AI 视觉、语音、IMU、巡线/避障传感器与导航激光雷达",
            "控制架构：Arduino + STM32 + Horizon RDK X5（10 TOPS）三板协同",
            "教学竞赛：覆盖《机器人学》《ROS》《移动机器人导航与定位》等课程与高校机器人创新赛事"
          ],
        },
        "rai-p4": {
          name: "具身智能任务规划实训平台 RAI-P4",
          subtitle: "具身机器人任务规划综合实训平台",
          model: "RAI-P4",
          image: "/images/products/rai-p4/rai-p4-hero.png",
          overview:
            "RAI-P4 是将人工智能技术与机器人技术深度结合的具身智能实训平台，集成 AI 语音、AI 视觉、典型 4 自由度机械臂、智能机器人常用传感器与 AI 嵌入式主板，帮助学生在真实机器人系统中完成智能算法部署与调试，打通理论课程与综合实践环节。\n\n平台围绕“具身任务规划—感知决策—操作执行”三步流程打造多场景实验，覆盖语音对话、任务语义理解、视觉云台追踪、视觉机械臂搬运、运动学轨迹控制、AI 视觉果蔬检测等内容。",
          applicable:
            "面向高校人工智能、机器人、自动化、计算机科学等相关专业，支持大模型应用、机器视觉、机器学习、深度学习、嵌入式开发、传感器检测与控制、ROS、机器人学、机器人仿真设计与智能系统集成等课程的综合实践。",
          highlights: [
            "AI 语音、视觉与机械臂控制一体化平台",
            "60cm×60cm 桌面即可部署的教学形态",
            "兼容 4/6 自由度机械臂的递进式教学路径"
          ],
          features: [
            {
              title: "人工智能与机器人技术的系统性融合",
              content:
                "围绕智能机械臂的核心环节，配置 AI 语音交互、AI 视觉识别、AI 嵌入式主板，并搭配颜色识别传感器、姿态检测传感器等常用部件，支持从知觉到决策再到执行的整链路教学。"
            },
            {
              title: "一站式教学部署",
              content:
                "平台出厂完成软硬件联调，无需额外配置电脑等实验设备；占用 60cm×60cm 桌面即可开展课程，适合实验室、创新工场与移动教学场景快速部署。"
            },
            {
              title: "典型机械臂平台与递进式训练",
              content:
                "以串联 4 自由度机械臂为基础，兼容扩展至典型 6 自由度机械臂；配套运动学算法、运动控制、仿真与 ROS 实验，帮助不同阶段学生循序渐进掌握机器人系统设计。"
            }
          ],
          sampleCases: {
            description:
              "两组示例分别展示了任务规划流程与视觉搬运综合实训：前者帮助学生理解软件指令到硬件执行的映射，后者演示视觉识别、运动学规划与机械臂执行的协同。",
            sections: [
              {
                title: "任务规划流程示意",
                description: "通过流程图梳理语音/视觉输入、任务拆解与机械臂执行的完整链路。",
                gridClassName: "grid-cols-1 place-items-center gap-6 max-w-5xl mx-auto",
                imageAspectClass: "aspect-[21/10]",
                cardClassName: "w-full p-6",
                items: [
                  {
                    name: "任务规划流程示意",
                    image: "/images/products/rai-p4/rai-p4-task-planning.png"
                  }
                ]
              },
              {
                title: "视觉搬运与运动学综合实训",
                description: "展示机械臂结合视觉识别、运动学轨迹与抓取任务的综合实训场景。",
                gridClassName: "grid-cols-1 place-items-center gap-6 max-w-5xl mx-auto",
                imageAspectClass: "aspect-[21/10]",
                cardClassName: "w-full p-6",
                items: [
                  {
                    name: "视觉搬运与运动学综合实训",
                    image: "/images/products/rai-p4/rai-p4-manipulator-workflows.png"
                  }
                ]
              }
            ]
          },
          sensorConfig: {
            description:
              "覆盖智能语音、视觉感知与常见机器人动作反馈传感器，满足具身任务规划链路的多模态输入需求。",
            list: ["AI 语音交互麦克风阵列", "视觉云台摄像模组", "颜色识别传感器", "姿态检测传感器", "物体识别/距离检测扩展接口"]
          },
          controllerConfig: {
            description:
              "内置 AI 嵌入式主板与开放式 I/O 接口，既可运行大模型推理与视觉算法，也便于接入机械臂驱动与外设控制，实现软硬件一体化协同。"
          },
          softwareConfig: {
            description:
              "预装 Ubuntu 与 ROS2（含 roscore、RViz、MoveIt）、Jupyter、VS Code、Python 3.9 等开发环境，开箱即可完成算法部署与教学演示。",
            ecosystem:
              "兼容主流 AI/机器人开源生态，可快速对接 OpenCV、YOLO、LLM SDK、MoveIt 等框架，支持课堂教学与科研验证。",
            imageGridClassName: "grid grid-cols-1 gap-4 place-items-center max-w-4xl mx-auto",
            imageWrapperClassName: "relative aspect-[28/9] w-full",
            figureClassName:
              "w-full overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800",
            showCaptions: false,
            images: [
              {
                src: "/images/products/rai-p4/rai-p4-software-suite.png",
                alt: "Ubuntu / ROS / RViz / VS Code / Python 软件环境图标"
              }
            ]
          },
          experiments: {
            summary:
              "实验体系覆盖机器人本体控制、传感器检测、计算机视觉、大模型语音对话、系统集成、ROS 与嵌入式开发等方向，共设计 40+ 个子项目，支撑跨学科综合能力培养。",
            sections: [
              {
                title: "机器人本体控制",
                items: [
                  { name: "机械臂运动学控制", desc: "建议课时 4｜掌握 4 自由度机械臂正逆运动学建模与关节轨迹规划。" },
                  { name: "机械臂直线插补控制", desc: "建议课时 2｜实现末端线性轨迹插补，理解速度/加速度参数调度。" },
                  { name: "机械臂圆弧插补控制", desc: "建议课时 2｜完成空间圆弧轨迹规划与姿态保持控制。" },
                  { name: "机械臂码垛搬运", desc: "建议课时 4｜结合坐标系标定与抓取策略，完成多点搬运任务规划。" },
                  { name: "机械臂绘制几何图形", desc: "建议课时 4｜通过轨迹生成实现多种平面几何图形绘制。"}
                ]
              },
              {
                title: "传感器检测与控制",
                items: [
                  { name: "姿态传感器数据获取", desc: "建议课时 2｜读取姿态传感器数据并进行姿态解算与滤波。" },
                  { name: "手势控制机械臂动作", desc: "建议课时 2｜基于姿态传感器输入驱动机械臂，实现体感交互控制。" }
                ]
              },
              {
                title: "机器视觉基础（OpenCV）",
                items: [
                  { name: "视觉颜色识别", desc: "建议课时 2｜利用 OpenCV 实现颜色空间转换与目标区分。" },
                  { name: "视觉形状识别", desc: "建议课时 2｜完成轮廓提取与几何特征匹配，识别常见形状。" }
                ]
              },
              {
                title: "AI 视觉（YOLO）",
                items: [
                  { name: "YOLO 视觉部署", desc: "建议课时 2｜在嵌入式主板上部署 YOLO，实现实时推理。" },
                  { name: "人脸检测", desc: "建议课时 2｜加载预训练模型完成人脸识别与边界框输出。" },
                  { name: "人脸视觉追踪", desc: "建议课时 2｜结合云台联动实现人脸目标的动态追踪。" },
                  { name: "数据集标注", desc: "建议课时 2｜掌握目标检测数据集标注与格式转换流程。" },
                  { name: "模型训练与部署", desc: "建议课时 2｜完成模型再训练、量化与部署验证。" },
                  { name: "工件检测", desc: "建议课时 2｜针对实训对象构建检测方案，实现分类与定位。" }
                ]
              },
              {
                title: "AI 视觉（通义千问多模态）",
                items: [
                  { name: "通义千问多模态接口部署", desc: "建议课时 2｜调用多模态 API，完成图像理解与文本生成。" },
                  { name: "水果检测与标记", desc: "建议课时 2｜结合通义千问，实现水果目标识别与语义标注。" }
                ]
              },
              {
                title: "大模型应用（AI 语音对话）",
                items: [
                  { name: "语音转文字（ASR）部署", desc: "建议课时 2｜基于通义千问配置 ASR，实现语音输入解析。" },
                  { name: "语义理解 LLM 部署", desc: "建议课时 2｜使用 DeepSeek 搭建语义理解与任务规划逻辑。" },
                  { name: "文字转语音（TTS）部署", desc: "建议课时 2｜集成火山引擎 TTS，实现自然语音播报。" },
                  { name: "基于大模型的完整语音对话", desc: "建议课时 2｜串联 ASR/LLM/TTS，构建端到端语音交互系统。" },
                  { name: "Function-Call 语音对话计算器", desc: "建议课时 2｜通过函数调用能力实现语音计算服务。" },
                  { name: "Function-Call 语音音乐播放", desc: "建议课时 2｜扩展音乐检索与播放任务，实现语音操控。" },
                  { name: "Function-Call 云台视觉任务规划", desc: "建议课时 4｜语音指令驱动云台视觉跟踪，完成目标搜索与反馈。" },
                  { name: "Function-Call 机械臂视觉任务规划", desc: "建议课时 4｜语音指令触发机械臂视觉定位与抓取执行。" }
                ]
              },
              {
                title: "机器人智能系统集成",
                items: [
                  { name: "Socket 通信", desc: "建议课时 2｜搭建机器人系统 Socket 通道并实现指令交互。" },
                  { name: "视觉机械臂追踪", desc: "建议课时 4｜将视觉数据映射到机械臂坐标系，实现动态追踪。" },
                  { name: "视觉-机械臂坐标变换", desc: "建议课时 2｜完成手眼标定，建立像素到姿态的映射关系。" },
                  { name: "视觉机械臂分拣搬运", desc: "建议课时 4｜整合识别、规划与执行流程，完成分拣搬运任务。" }
                ]
              },
              {
                title: "机器人操作系统（ROS）",
                items: [
                  { name: "快速运行一个 ROS2 项目", desc: "建议课时 2｜熟悉 ROS2 工作区创建、编译与运行流程。" },
                  { name: "ROS2 功能包构建与移植", desc: "建议课时 2｜掌握功能包创建、依赖管理与移植部署。" },
                  { name: "机械臂 MoveIt 配置", desc: "建议课时 2｜完成 MoveIt 场景配置、碰撞模型导入与规划测试。" },
                  { name: "4 自由度机械臂 MoveIt-RViz 仿真运动学控制", desc: "建议课时 2｜在 RViz 中实现仿真控制与轨迹验证。" }
                ]
              },
              {
                title: "嵌入式系统开发",
                items: [
                  { name: "Ubuntu 文件系统认知与基本操作", desc: "建议课时 1｜掌握常用目录结构与文件管理命令。" },
                  { name: "编程工具认识（vi / nano）", desc: "建议课时 1｜熟悉终端编辑器基本操作与配置方法。" },
                  { name: "配置开发常用服务（SSH / PuTTY）", desc: "建议课时 2｜搭建远程连接环境，保障多端协同开发。" },
                  { name: "Linux 文件 IO 编程", desc: "建议课时 2｜实现文件读写与异常处理，理解设备交互基础。" },
                  { name: "串口通信", desc: "建议课时 2｜完成串口数据收发与协议封装，实现外设控制。" },
                  { name: "进程 / 线程管理认知", desc: "建议课时 2｜理解 Linux 进程线程模型，并完成示例程序编写。" },
                  { name: "界面设计", desc: "建议课时 2｜使用 Python/Qt 等工具快速构建人机交互界面。" }
                ]
              }
            ]
          },
          specs: [
            "占地空间：60cm×60cm 桌面即可完成部署",
            "机械臂平台：标配 4 自由度，可扩展 6 自由度机械臂",
            "计算平台：内置 AI 嵌入式主板，支持大模型推理与视觉运算"
          ]
        },
        "rai-m4": {
          name: "具身复合机器人系统设计实训平台 RAI-M4",
          model: "RAI-M4",
          image: "/images/products/rai-m4/front-view.png",
          overview:
            "具身智能可以拆解为任务规划、感知决策、操作执行三个环节，每个环节都可引入 AI 提升交互、决策与操作的泛化能力。RAI-M4 在任务规划阶段引入 DeepSeek 与通义千问，实现随机对话语义理解与自然语言指令到任务流程的转换；在感知决策端结合通义千问的多模态识别能力，无需预训练即可探索更丰富的感知场景。\n\n硬件层面，RAI-M4 采用麦克纳姆轮全向底盘，实现全向移动；串联四轴机械臂末端负载可达 300g、抓取范围 240mm，并配套夹爪。感知单元包含高清摄像头（可选深度相机）、激光雷达、陀螺仪、呼吸灯等模块，覆盖常见交互与定位所需的传感器。\n\n主控架构为上下位机双主控：上位机负责任务规划、视觉感知决策、导航规划、底盘与机械臂运动学等复杂算法；下位机负责电机 PID 控制、交互模块驱动，并承载与上位机的通信中继。平台支持移动机器人技术与大模型部署应用的综合教学实践，可服务机器人、机电、智能制造、自动化、电子信息等专业课程与拓展实训。",
          highlights: [
            "全向移动底盘 + 四轴机械臂的复合机器人形态",
            "通义千问 + DeepSeek 等大模型深度接入",
            "覆盖移动机器人与大模型部署的体系化课程",
          ],
          applicable:
            "移动机器人运动控制、大模型部署与应用、机器人学、机器视觉、机器人操作系统、移动机器人导航与定位等课程实训",
          features: [
            {
              title: "AI 大模型深度接入",
              content:
                "在 ASR 环节集成通义千问，在 LLM 环节引入 DeepSeek，让机器人具备自然语言任务规划能力；在视觉环节依托通义千问多模态，降低场景识别门槛。"
            },
            {
              title: "移动 + 操作复合平台",
              content:
                "麦克纳姆轮全向底盘与串联机械臂协同工作，可在狭小空间完成移动与操作任务，结合任务规划与感知决策形成泛化作业流程。",
              mediaGridClassName: "grid-cols-1 gap-6 place-items-center",
              mediaImageAspectClass: "aspect-[16/10]",
              mediaCardClassName: "w-full max-w-3xl",
              media: [
                { name: "模块组成示意", image: "/images/products/rai-m4/module-overview.png" }
              ]
            },
            {
              title: "体系化实验项目设计",
              content:
                "结合专业课程递进式设计实训模块，可按需选择机器视觉、大模型部署、机器人学、移动机器人导航定位等模块，灵活适配教学计划。"
            }
          ],
          sensorConfig: {
            description:
              "面向移动作业与感知交互配置完整传感器组合，满足定位、导航与交互需求。",
            list: [
              "高清摄像头（可选配深度相机，实现三维感知）",
              "360° 激光雷达（测距 0.12-8m）",
              "IMU / 陀螺仪传感器（姿态估计与里程修正）",
              "呼吸灯与交互指示模块",
              "扩展接口：支持触摸屏、额外传感器接入"
            ]
          },
          sampleCases: {
            description:
              "从多角度展示 RAI-M4 的整机布局、模块分布与感知单元，便于课程部署与场景规划。",
            sections: [
              {
                title: "多角度外观展示",
                gridClassName: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                imageAspectClass: "aspect-[4/3]",
                cardClassName: "pt-6 pb-4",
                items: [
                  { name: "正视图", image: "/images/products/rai-m4/front-view.png" },
                  { name: "左视图", image: "/images/products/rai-m4/left-view.png" },
                  { name: "右视图", image: "/images/products/rai-m4/right-view.png" },
                  { name: "俯视图", image: "/images/products/rai-m4/top-view.png" }
                ]
              }
            ]
          },
          controllerConfig: {
            description:
              "采用上下位机双主控架构：上位机承担任务规划、视觉感知与导航算法，下位机负责电机 PID、机械臂伺服与互动模块控制，并作为与上位机通信的中继节点。",
            images: []
          },
          softwareConfig: {
            description:
              "预装 Ubuntu + ROS2、MoveIt、YOLO 推理环境及通义千问 / DeepSeek API 示例，可快速进入移动机器人与大模型联合实验。",
            ecosystem:
              "支持 Python / C++、ROS2、MoveIt、OpenCV、YOLO、通义千问 SDK、DeepSeek API 等主流框架，便于扩展课程与科研项目。"
          },
          experiments: {
            summary:
              "实验体系覆盖机器视觉、大模型部署与应用、机器人本体控制、ROS 操作与移动机器人导航等模块，支持按课程需求灵活组合。",
            sections: [
              {
                title: "机器视觉模块",
                description: "构建从基础图像处理到深度学习、多模态识别的完整实践路径。",
                items: [
                  { name: "OpenCV 视觉", desc: "HSV 颜色识别；视觉形状识别；二维码识别；条码识别；色环检测（综合+滤波）" },
                  {
                    name: "AI 视觉 - YOLO",
                    desc: "YOLO 视觉部署；数据集标注；模型训练与部署；工件数据收集与检测；人脸检测；人脸追踪"
                  },
                  { name: "AI 视觉 - 通义千问多模态", desc: "通义千问多模态接口部署；物体检测与标记" }
                ]
              },
              {
                title: "大模型部署与应用模块",
                description: "聚焦语音交互、多模态识别与机器人执行的全链路大模型实践。",
                items: [
                  {
                    name: "语音对话交互",
                    desc:
                      "语音转文字 ASR 部署（通义千问）；语义理解 LLM 部署（DeepSeek）；文字转语音 TTS 部署（火山引擎）；完整语音对话；语音对话计算器；语音对话音乐播放"
                  },
                  { name: "多模态视觉检测", desc: "通义千问多模态接口部署；物体检测与标记" },
                  { name: "结合机器人应用", desc: "基于 MCP 的识别抓取任务规划；基于 MCP 的导航任务规划" }
                ]
              },
              {
                title: "机器人本体控制模块",
                description: "面向底盘与机械臂的运动学与控制策略实践。",
                items: [
                  { name: "底盘本体控制", desc: "编码电机 PID 控制；全向底盘运动学控制；全向底盘里程控制（含陀螺仪校准）" },
                  { name: "机械臂本体控制", desc: "舵机位置控制；机械臂运动学控制；机械臂插补运动控制" }
                ]
              },
              {
                title: "机器人操作系统模块",
                description: "培养 ROS 话题、服务、参数以及 MoveIt 规划等核心技能。",
                items: [
                  {
                    name: "ROS 基本操作",
                    desc:
                      "通过话题 / 服务 / 参数控制仿真小乌龟运动；新增小乌龟实例；功能包移植与运行（键盘控制小乌龟）"
                  },
                  { name: "MoveIt 机械臂规划", desc: "配置机械臂 URDF；MoveIt 配置机械臂运动学模型；Rviz 实现机械臂运动规划" }
                ]
              },
              {
                title: "移动机器人导航与定位模块",
                description: "涵盖系统接口、建图与导航的完整流程，支持多坐标导航实践。",
                items: [
                  { name: "系统接口配置", desc: "键盘控制底盘运动；键盘控制机械臂运动；获取激光雷达数据" },
                  { name: "地图构建", desc: "配置建图工程文件；制作 launch 文件；构建新地图" },
                  {
                    name: "地图导航",
                    desc: "配置 Navigation 工程文件；设置机器人碰撞边界；指定点导航；自主避障导航；多坐标导航"
                  }
                ]
              }
            ]
          },
          specs: [
            "麦克纳姆轮全向底盘（最大速度约 0.5m/s，负载 10kg）",
            "四轴串联机械臂（臂展 240mm，末端负载 300g，配套夹爪）",
            "上下位机双主控架构（上位机负责规划，下位机负责 PID 与交互控制）",
            "预装大模型接口与 ROS2 / MoveIt 实验环境",
          ],
        },
        "rai-q2": {
          name: "具身视觉感知决策实训平台 RAI-Q2",
          model: "RAI-Q2",
          image: "/images/products/rai-q2/hero.png",
          overview:
            "视觉检测是具身智能最常见的感知决策环节。RAI-Q2 将典型视觉算法与典型应用场景结合，覆盖基于 OpenCV、YOLO 与通义千问 VLM 的多层次教学方案，帮助课程快速落地视觉处理教学。\n\n平台集成深度相机模块、边缘计算控制器、高精度可调转速与角度的转台、手摇/电动双模式的毫米级升降导轨、可调亮度的环形光圈、显示器与蓝牙键鼠，一站式配置显著降低实验部署门槛，适用于机器视觉、机器学习及大模型应用等课程。",
          highlights: [
            "三套视觉方案：OpenCV、YOLO、通义千问 VLM 全覆盖",
            "0.3° 背隙转台 + 毫米级升降导轨，配合亮度可调环形光源",
            "模块化部件可替换，可扩展高速相机或云台组合",
          ],
          applicable: "机器视觉、机器学习、大模型部署与应用课程",
          features: [
            {
              title: "三类视觉识别方案全覆盖",
              content:
                "提供基于 OpenCV 的经典图像处理、基于 YOLO 的目标检测与基于通义千问 VLM 的多模态视觉解析三套教学路径，让学生循序掌握从算法原理、模型训练到大模型推理的核心能力。"
            },
            {
              title: "高精度全参调试检测台",
              content:
                "转台采用一体化关节驱动，最小背隙 0.3°，支持速度/角度模式切换；双层磁吸台面减少螺丝孔干扰视觉画面；升降台具备毫米级调节精度并支持手摇、伺服电机双模式，配套可调亮度环形光圈满足不同光照场景。",
              mediaGridClassName: "grid-cols-1 gap-6 place-items-center",
              mediaImageAspectClass: "aspect-[16/10]",
              mediaCardClassName: "w-full max-w-3xl",
              media: [
                { name: "视觉方案一览", image: "/images/products/rai-q2/feature-overview.png" }
              ]
            },
            {
              title: "模块化自由组合",
              content:
                "核心部件均可替换升级，深度相机模块可替换为高速相机，升降模块也可移至转台形成云台组合，方便根据课程目标快速搭建定制实验装置。"
            }
          ],
          sensorConfig: {
            description:
              "面向视觉识别与深度检测应用配置全套传感器，支持多模态数据采集。",
            list: [
              "深度相机模块（支持距离、RGB、红外等数据输出）",
              "可调亮度环形光圈（多档亮度，保障图像对比度）",
              "可扩展高速相机/补光模组接口",
              "转台角度编码反馈与升降行程反馈"
            ]
          },
          sampleCases: {
            description:
              "多视角展示 RAI-Q2 具身视觉平台的整体结构，帮助教师快速了解转台、升降导轨与相机模块的布局，便于课程部署与场景搭建。",
            sections: [
              {
                title: "多角度外观展示",
                gridClassName: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                imageAspectClass: "aspect-[4/3]",
                cardClassName: "pt-6 pb-4",
                items: [
                  { name: "主视图", image: "/images/products/rai-q2/front-view.png" },
                  { name: "侧视图", image: "/images/products/rai-q2/side-view.png" },
                  { name: "俯视图", image: "/images/products/rai-q2/top-view.png" }
                ]
              }
            ]
          },
          controllerConfig: {
            description:
              "内置边缘计算控制器负责算法推理与控制逻辑，配合一体化转台/升降驱动系统，支持精确的姿态调节与多模式控制。",
            images: []
          },
          softwareConfig: {
            description:
              "预装 OpenCV、YOLO 推理环境与通义千问 VLM 接口示例，开机即可进入视觉算法实验流程。",
            ecosystem:
              "支持 Python、C++ 开发，兼容 Pytorch、TensorRT、通义千问 SDK 等主流视觉与大模型框架，方便拓展算法训练与部署。"
          },
          experiments: {
            summary:
              "围绕 OpenCV 图像处理、YOLO 模型部署、通义千问 VLM 多模态推理与深度检测等主题构建分层实验，含课程时长建议，便于教学排课与项目式训练。",
            sections: [
              {
                title: "OpenCV 视觉",
                description: "掌握基础图像处理及识别流程，为后续高级算法奠定基础。",
                items: [
                  { name: "HSV-视觉颜色识别", desc: "建议课时 2" },
                  { name: "视觉形状识别", desc: "建议课时 2" },
                  { name: "二维码识别", desc: "建议课时 2" },
                  { name: "条码识别", desc: "建议课时 2" },
                  { name: "色环检测（综合 + 滤波）", desc: "建议课时 4" }
                ]
              },
              {
                title: "AI 视觉 - YOLO",
                description: "完整走通数据标注、模型训练到部署的工程化流程。",
                items: [
                  { name: "YOLO 视觉部署", desc: "建议课时 2" },
                  { name: "数据集标注", desc: "建议课时 2" },
                  { name: "模型训练与部署", desc: "建议课时 2｜需额外配置 4050 及以上显卡" },
                  { name: "工件数据收集与检测", desc: "建议课时 2" },
                  { name: "人脸检测", desc: "建议课时 2" },
                  { name: "人脸追踪", desc: "建议课时 4" }
                ]
              },
              {
                title: "AI 视觉 - 通义千问大模型",
                description: "体验多模态大模型在视觉任务中的应用能力。",
                items: [
                  { name: "通义千问多模态接口部署", desc: "建议课时 2" },
                  { name: "水果检测与标记", desc: "建议课时 2" }
                ]
              },
              {
                title: "深度检测",
                description: "利用深度相机完成距离感知与三维建模实验。",
                items: [
                  { name: "深度数据获取", desc: "建议课时 2" },
                  { name: "3D 建模", desc: "建议课时 4" }
                ]
              }
            ]
          },
          specs: [
            "转台最小背隙 0.3°，支持速度/角度双模式切换",
            "升降导轨毫米级调节精度，支持手摇/电动双模式",
            "可调亮度环形光圈，满足不同场景照度需求",
            "内置边缘计算控制器与显示终端，一站式部署"
          ],
        },
        "uni-wr2": {
          name: "便携式ROS导航机器人学习平台 UNI-WR2",
          subtitle: "桌面级 ROS / SLAM 导航综合实训平台",
          model: "UNI-WR2",
          image: "/images/products/uni-wr2/uni-wr2-hero.png",
          overview:
            "UNI-WR2 是针对 ROS 与 SLAM 导航教学设计的便携式桌面级机器人平台，支持《机器人操作系统（ROS）》《移动机器人导航与定位》《自动控制原理（PID）》等课程开展工程化实践。相比传统仅依赖仿真或需要大空间场地的教学方式，UNI-WR2 通过便携硬件、桌面部署和完整的 ROS 工程化流程拆解，让学习者在真实机器人系统上随时随地进行导航算法调试与功能包部署。",
          applicable:
            "面向高校与培训机构的机器人、自动化、计算机、机电等专业课程，适用于 ROS 入门、SLAM 导航、PID 控制与移动机器人工程化实践。",
          highlights: [
            "极致便携：机身长度不足 13cm、自重 <550g，Type-C 快速充电，续航约 4 小时",
            "敏捷桌面部署：60cm×60cm 桌面即可完成 SLAM 导航，随手调试不受场地限制",
            "工程化教学路径：ROS 功能包部署拆解为 5 个步骤，覆盖 Catographer、Hector、Gmapping 三种导航方式"
          ],
          features: [
            {
              title: "便携随行的学习形态",
              content:
                "全金属紧凑机身，体积比成人手掌更小，自带 Type-C 充电口，搭配充电宝即可补能，满足课堂、实验室与差旅场景的即兴调试需求。",
              mediaGridClassName: "grid-cols-1 sm:grid-cols-2 gap-4",
              mediaImageAspectClass: "aspect-[5/4]",
              media: [
                { name: "便携随行示意", image: "/images/products/uni-wr2/uni-wr2-feature-portable.png" },
                { name: "Type-C 充电设计", image: "/images/products/uni-wr2/uni-wr2-feature-charging.png" },
                { name: "敏捷部署示例 1", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-1.png" },
                { name: "敏捷部署示例 2", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-2.png" },
              ]
            },
            {
              title: "桌面级 SLAM 实验环境",
              content:
                "在 60cm×60cm 桌面内即可搭建 SLAM 场地，操作范围不超过手臂距离，结合模块化拼接板可扩展至 1.2m×1.2m，快速构建多种导航赛道。",
              mediaGridClassName: "grid-cols-1 gap-4",
              mediaImageAspectClass: "aspect-[5/4]",
              media: [
                { name: "桌面部署俯视图", image: "/images/products/uni-wr2/uni-wr2-desktop-layout.png" },
              ]
            },
            {
              title: "ROS 工程化部署拆解",
              content:
                "从原理框架、功能演示、框架解构、功能包配置到全参调试的 5 步教学路径，配合 Catographer、Hector、Gmapping 三大导航算法，帮助学生真正掌握工程部署方法论。"
            }
          ],
          sensorConfig: {
            description:
              "集成 SLAM 导航常用传感器，支持里程反馈、姿态估计与环境建图数据采集，满足导航算法对真实物理世界的输入需求。",
            list: [
              "激光雷达（SLAM 建图，支持 Catographer/Hector/Gmapping）",
              "双轮里程计编码器（PID 调速与里程反馈）",
              "IMU / 陀螺仪传感器（姿态估计）",
              "扩展接口：支持额外传感器与标志物接入"
            ]
          },
          sampleCases: {
            description:
              "配套提供外观结构、外形尺寸与 BOM 组件示意，帮助教师快速理解平台硬件组成、尺寸规划与装配细节，为课程部署提供参考。",
            sections: [
              {
                title: "外观与结构总览",
                gridClassName: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                imageAspectClass: "aspect-[4/3]",
                items: [
                  { name: "外观总览", image: "/images/products/uni-wr2/uni-wr2-exterior-overview.png" },
                  { name: "外形尺寸", image: "/images/products/uni-wr2/uni-wr2-dimensions.png" },
                  { name: "BOM 组件示意", image: "/images/products/uni-wr2/uni-wr2-bom.png" }
                ]
              }
            ]
          },
          controllerConfig: {
            description:
              "采用树莓派为核心的控制系统，内置 PID 电机驱动与集成电源管理，支持一键开关与快速恢复，方便课堂演示与批量教学部署。",
            images: [
              {
                src: "/images/products/uni-wr2/uni-wr2-controller.png",
                alt: "UNI-WR2 树莓派控制核心"
              }
            ]
          },
          softwareConfig: {
            description:
              "预装 Ubuntu + ROS 系统环境，内置导航相关功能包示例与教学脚本，开机即进入 ROS 实验流程。",
            ecosystem:
              "课程资源包含 Catographer、Hector、Gmapping 导航功能包参考实现，以及 ROS 工程化部署文档，可在真实硬件上完整跑通导航流程。",
            showCaptions: false,
            imageGridClassName: "grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center",
            imageWrapperClassName: "relative aspect-square w-full",
            figureClassName:
              "w-full max-w-[220px] overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800",
            images: [
              {
                src: "/images/products/uni-wr2/uni-wr2-software-ubuntu.png",
                alt: "Ubuntu 系统图标"
              },
              {
                src: "/images/products/uni-wr2/uni-wr2-software-ros.png",
                alt: "ROS 平台图标"
              }
            ]
          },
          experiments: {
            summary:
              "课程体系围绕 ROS 基础、SLAM 工程化部署与移动机器人运动学控制三个主题开展，可按课时灵活组合，实现循序渐进的导航工程教学。",
            sections: [
              {
                title: "ROS 基础",
                description: "掌握 ROS 文件结构、通信机制与功能包移植流程。",
                items: [
                  {
                    name: "体验 ROS 的运行实验",
                    desc: "2 课时｜熟悉 ROS 文件结构；通过话题/服务/参数控制仿真小乌龟与 UNI-WR2 机器人运动。"
                  },
                  {
                    name: "构建与移植 ROS 功能包",
                    desc: "2 课时｜创建功能包、配置环境并编译；实现键盘控制 UNI-WR2 运动的功能包。"
                  }
                ]
              },
              {
                title: "SLAM 工程化部署",
                description: "对比三大 SLAM 算法的流程与适用场景，掌握完整的功能包配置与全参调试。",
                items: [
                  {
                    name: "快速操作移动机器人导航",
                    desc: "2 课时｜按步骤部署 Catographer、Hector、Gmapping 导航，比较三种导航方式特点。"
                  },
                  {
                    name: "Catographer 构建地图导航",
                    desc: "4 课时｜原理讲解、功能包拆解、参数配置与全参调试，完成高精度建图。"
                  },
                  {
                    name: "Hector 构建地图导航",
                    desc: "4 课时｜拆解 Hector 架构并完成功能包配置，解决高频率激光数据场景。"
                  },
                  {
                    name: "Gmapping 构建地图导航",
                    desc: "4 课时｜深入了解粒子滤波 SLAM，掌握参数调优与场景适配要点。"
                  }
                ]
              },
              {
                title: "移动机器人运动学控制",
                description: "掌握差速底盘的里程学建模、速度控制与 PID 调参方法。",
                items: [
                  {
                    name: "轮的 PID 控制与调试",
                    desc: "2 课时｜读取编码器数据，理解 PID 算法，实现电机速度闭环控制。"
                  },
                  {
                    name: "移动机器人运动学控制",
                    desc: "4 课时｜推导差速底盘运动学模型，实现里程反馈与线/角速度控制。"
                  }
                ]
              }
            ]
          },
          specs: [
            "尺寸：130mm × 97mm × 98mm",
            "重量：约 580g",
            "速度：0.16m/s",
            "定位精度：1m 内定位误差 < 5mm",
            "直线度：1m 直线度偏差 < 1cm（约 1.5°）",
            "导航方式：Catographer / Hector / Gmapping 激光 SLAM"
          ],
        },
        "alo-le4": {
          name: "具身机器人操作规划综合实训平台 ALO-LE4",
          model: "ALO-LE4",
          image: "/images/products/alo-le4/front-view.png",
          overview:
            "具身智能的操作执行环节常见路径包括强化学习与端到端方案：前者常用于仿生、人形构型，后者适用于轮式复合机器人与机械臂。ALO-LE4 以机械臂为核心，基于 ACT 架构打造端到端具身操作实训平台，可同时作为数据采集平台与模仿学习、端到端智能控制研究载体。\n\n平台搭载两台 5 自由度机械臂：主臂供操作者手动演示、采集动作数据，从臂根据训练后的 ACT 模型执行自主操作。顶置与侧置双摄像头负责颜色、位置检测，并为模型提供视觉训练数据；内置可调环境光源，可模拟不同光照条件。\n\nALO-LE4 为具身智能、模仿学习与数据采集研究提供稳定可控的实验环境，便于构建“感知—决策—执行”的闭环。在教学中，可覆盖机器人学、机器视觉等课程实践，帮助学习者直观理解具身智能关键概念并提升工程与科研能力，支持高校与科研机构高效推进相关教学与研究。",
          highlights: [
            "一机多用：数据采集、智能训练与验证统一平台",
            "一站式部署：高度集成，开箱即用并支持快速重置",
            "递进式教学：覆盖环境配置到模型训练的完整教学路径",
          ],
          applicable:
            "适用于具身智能、模仿学习、端到端控制、机器人学、机器视觉等课程与科研项目",
          features: [
            {
              title: "数据采集与训练一体化",
              content:
                "基于 ACT 架构，支持动作采集、模型训练与验证流程；可调光源满足多场景需求，桌面实验环境确保算法验证的稳定性与可重复性。",
              mediaGridClassName: "grid-cols-1 gap-6 place-items-center",
              mediaImageAspectClass: "aspect-[16/10]",
              mediaCardClassName: "w-full max-w-3xl",
              media: [
                { name: "平台模块构成", image: "/images/products/alo-le4/module-overview.png" }
              ]
            },
            {
              title: "快速部署与恢复",
              content:
                "主臂、从臂及操作系统独立配置重启按键，无需额外场景搭建即可开展实验，在出现异常时可迅速重置恢复。"
            },
            {
              title: "递进式教学设计",
              content:
                "涵盖软件环境配置、硬件部署、训练流程等完整教学环节，既支持科研探索也适配课堂教学，帮助学员循序掌握操作要领。"
            }
          ],
          sensorConfig: {
            description: "面向模仿学习和视觉识别配置核心传感器，覆盖操作执行所需数据源。",
            list: [
              "双路高清摄像头（顶部 + 侧面）用于颜色、位置识别及视觉数据采集",
              "可调环境光源，模拟不同光照条件",
              "机械臂关节角度传感器采集运动学数据",
              "扩展接口：支持额外视觉/力觉模块接入"
            ]
          },
          sampleCases: {
            description: "多视角展示 ALO-LE4 的机械臂布局与传感模块，便于规划教学和实验场景。",
            sections: [
              {
                title: "平台多角度图集",
                gridClassName: "grid-cols-1 sm:grid-cols-2 gap-6",
                imageAspectClass: "aspect-[4/3]",
                cardClassName: "pt-6 pb-4",
                items: [
                  { name: "主视图", image: "/images/products/alo-le4/front-view.png" },
                  { name: "俯视图", image: "/images/products/alo-le4/top-view.png" }
                ]
              }
            ]
          },
          experiments: {
            summary:
              "实验体系从端到端方案部署扩展到视觉与本体控制，帮助学员建立具身操作的完整认知。",
            sections: [
              {
                title: "端到端方案部署与训练",
                description: "围绕 ACT 架构完成环境配置、数据采集、模型训练与部署。",
                items: [
                  { name: "环境配置", desc: "配置 CONDA、FFMPEG、Python 等依赖（建议课时 2）" },
                  { name: "安装 Lerobot 框架", desc: "完成 Lerobot 环境搭建（建议课时 2）" },
                  { name: "配置机械臂舵机", desc: "调试机械臂舵机参数（建议课时 1）" },
                  { name: "配置相机", desc: "完成摄像头标定与画面接入（建议课时 1）" },
                  { name: "校准与测试主从臂", desc: "验证主臂采集与从臂跟随（建议课时 2）" },
                  { name: "遥操作数据采集", desc: "录制视频、关节角度、系统配置等数据（建议课时 2）" },
                  { name: "模型训练", desc: "建议使用 NVIDIA 4060 及以上显卡（建议课时 2）" },
                  { name: "模型部署", desc: "部署并验证自主执行效果（建议课时 4）" }
                ]
              },
              {
                title: "拓展教学 · AI 视觉",
                description: "引导学员掌握视觉识别与机械臂视觉协同。",
                items: [
                  { name: "YOLO 视觉部署", desc: "部署 YOLO 模型（建议课时 2）" },
                  { name: "数据集标注", desc: "完成视觉数据标注（建议课时 2）" },
                  { name: "模型训练与部署", desc: "训练并部署视觉模型（建议课时 2）" },
                  { name: "工件检测", desc: "实现工件识别与定位（建议课时 2）" },
                  { name: "机械臂视觉搬运", desc: "将视觉识别结果映射到机械臂任务（建议课时 4）" }
                ]
              },
              {
                title: "拓展教学 · 机器人本体控制",
                description: "聚焦机械臂运动学与插补控制的实训练习。",
                items: [
                  { name: "机械臂运动学控制", desc: "掌握正逆运动学建模与控制（建议课时 4）" },
                  { name: "机械臂直线插补控制", desc: "实现直线插补轨迹（建议课时 2）" },
                  { name: "机械臂圆弧插补控制", desc: "实现圆弧插补轨迹（建议课时 2）" },
                  { name: "机械臂码垛搬运", desc: "综合练习码垛与搬运任务（建议课时 4）" }
                ]
              }
            ]
          },
          specs: [
            "双 5 自由度机械臂实现主从跟随与动作采集",
            "顶置 + 侧置摄像头提供颜色与位置识别输入",
            "内置可调光源，适配不同光照条件",
            "独立重启按键，支持快速恢复与调试"
          ],
        },
      },
      supportResources: {
        title: "共性支撑资源",
        items: [
          "实验教程：详细步骤、原理解析、关键点说明",
          "源码文件：所有程序源码（含中文注释）、库文件",
          "结构图纸：机器人构型三维设计图（STP 格式）",
          "硬件保障：模块化零件、适配多种 IDE（Keil5、Arduino IDE、VS Code 等）",
        ],
      },
    },
    common: {
      aria: {
        mobileMenu: "展开或收起导航菜单",
        themeToggle: "切换深浅主题",
        scrollToTop: "返回页面顶部",
        sharePost: "分享到社交平台",
        socialLink: "访问我们的社媒主页",
        closeModal: "关闭弹窗",
      },
    },
    floatingContact: {
      panelLabel: "联系我们",
      fabLabel: "打开联系方式",
      closeLabel: "关闭联系方式",
      qqGroup: {
        label: "QQ群",
        number: "811348489",
        tooltip: "复制QQ群号",
        copy: "复制",
        copied: "已复制！",
      },
      phone: {
        label: "电话",
        name: "佘先生",
        number: "+86 176 1035 7571",
        tooltip: "复制联系电话",
        copy: "复制",
        copied: "已复制！",
      },
      taobao: {
        label: "淘宝店铺",
        tooltip: "访问淘宝店铺",
        linkText: "访问",
        href: "https://4vhhasmxqjt25cg7za43qs6podckjow.taobao.com/shop/view_shop.htm?appUid=RAzN8HWTBLcKSRgwfJESLCpphyAguSqzhXdc1GyTLumi8JFoD49&spm=a21n57.1.hoverItem.1",
      },
      bilibili: {
        label: "B站官方账号",
        tooltip: "访问B站空间",
        linkText: "前往",
        href: "https://space.bilibili.com/1888573035?spm_id_from=333.337.search-card.all.click",
      },
      wechat: {
        label: "微信公众号",
        tooltip: "查看二维码",
        comingSoon: "使用微信扫描二维码关注公众号",
      },
    },
    buttons: {
      readMore: "阅读更多",
      keepReading: "继续阅读",
    },
    forms: {
      emailPlaceholder: "请输入邮箱",
      passwordPlaceholder: "请输入密码",
      passwordLabel: "您的密码",
    },
    error: {
      title: "页面走丢了",
      description: "你访问的页面可能已被删除或名称更新，试试返回首页。",
      button: "返回首页",
    },
};

export type ChineseDictionary = typeof dictionary;
