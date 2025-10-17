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
      auth: {
        signIn: "登录",
        signUp: "注册",
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
      title: "智能机器人教育解决方案领先提供商",
      description:
        "有你同创专注于为高校提供专业的教育机器人产品，包括拼装小车、麦轮小车、福来轮小车、具身智能机器人和ROS2小车等，助力高校机器人教育与科研创新。",
      primaryCta: "了解产品",
      secondaryCta: "联系我们",
    },
    features: {
      title: "产品优势",
      paragraph:
        "有你同创为高校提供全方位的教育机器人解决方案，从基础教学到科研创新，助力培养新一代智能机器人人才。",
      items: [
        {
          id: 1,
          title: "拼装小车系列",
          paragraph:
            "模块化设计，支持灵活组装，帮助学生理解机器人基础结构与原理，适合入门级机器人课程与实践教学。",
        },
        {
          id: 2,
          title: "麦轮小车",
          paragraph:
            "采用麦克纳姆轮技术，实现全向移动，提供卓越的机动性能，适合运动控制与路径规划课程。",
        },
        {
          id: 3,
          title: "福来轮小车",
          paragraph:
            "配备福来轮（Mecanum轮）驱动系统，支持原地旋转与斜向移动，为学生提供高级运动学习平台。",
        },
        {
          id: 4,
          title: "具身智能机器人",
          paragraph:
            "集成先进传感器与AI算法，支持环境感知与智能决策，适合人工智能与机器人交互研究。",
        },
        {
          id: 5,
          title: "ROS2小车平台",
          paragraph:
            "基于ROS2操作系统，提供完整的开发环境与功能包，支持SLAM、导航等高级机器人应用开发。",
        },
        {
          id: 6,
          title: "专业技术支持",
          paragraph:
            "提供完善的技术文档、教学资源与售后服务，配套实验课程设计，助力高校快速开展机器人教学。",
        },
      ],
    },
    video: {
      title: "随时准备为你提供帮助",
      paragraph:
        "我们基于真实团队需求打造模板，并提供进阶资源，帮助你快速交付下一版官网。",
      buttonAriaLabel: "播放介绍视频",
    },
    about: {
      sectionOne: {
        title: "关于有你同创",
        paragraph:
          "有你同创智能机器人科技（北京）有限公司成立于2024年09月20日，注册地位于北京市门头沟区新城东街19号院6号楼11层1107。我们专注于为高校提供专业的教育机器人产品与解决方案。",
        bulletPoints: [
          "教育机器人",
          "ROS2平台",
          "专业技术支持",
          "完整课程体系",
          "科研合作",
          "定制化服务",
        ],
      },
      sectionTwo: {
        items: [
          {
            title: "产品质量保障",
            paragraph:
              "所有产品经过严格测试与质量把关，确保稳定可靠的性能表现，为教学与科研提供坚实基础。",
          },
          {
            title: "技术服务团队",
            paragraph:
              "提供专业的售前咨询与售后技术支持，配套完整的使用文档与教学资源，助力高校快速开展教学。",
          },
          {
            title: "持续创新发展",
            paragraph:
              "紧跟机器人技术发展趋势，持续优化产品功能，为高校提供最前沿的教育机器人解决方案。",
          },
        ],
      },
    },
    testimonials: {
      title: "用户的真实反馈",
      paragraph:
        "来自社区与客户的声音，帮助我们不断打磨体验，也让你更安心地选择我们。",
      items: [
        {
          id: 1,
          name: "Musharof Chy",
          designation: "TailGrids 创始人",
          image: "/images/testimonials/auth-01.png",
          star: 5,
          content:
            "成员们都很喜欢这个模板。界面直观、体验干净，社区搭建也毫不费力。",
        },
        {
          id: 2,
          name: "Devid Weilium",
          designation: "UIdeck 创始人",
          image: "/images/testimonials/auth-02.png",
          star: 5,
          content:
            "结构清晰易维护，和我们现有的设计系统配合得非常好，对内容团队特别友好。",
        },
        {
          id: 3,
          name: "Lethium Frenci",
          designation: "Lineicons 创始人",
          image: "/images/testimonials/auth-03.png",
          star: 5,
          content:
            "响应式表现优秀，适配速度快。对准备上线 MVP 的团队来说，是非常可靠的选择。",
        },
      ],
    },
    pricing: {
      title: "简单透明的价格方案",
      paragraph:
        "基于团队规模灵活选择，按照需求升级服务，不必被复杂条款束缚。",
      toggle: {
        monthly: "按月计费",
        yearly: "按年计费",
      },
      durationSuffix: {
        monthly: "月",
        yearly: "年",
      },
      cta: "开始免费试用",
      packages: [
        {
          name: "Lite",
          subtitle: "覆盖核心组件和页面结构，快速搭建最小可用版本。",
          offers: [
            { text: "完整 UI 组件库", status: "active" },
            { text: "不限项目使用", status: "active" },
            { text: "商用授权", status: "active" },
            { text: "邮件支持", status: "active" },
            { text: "终身访问权限", status: "inactive" },
            { text: "终身免费更新", status: "inactive" },
          ],
        },
        {
          name: "Basic",
          subtitle: "适合成长型团队，解锁更多模板与使用场景。",
          offers: [
            { text: "完整 UI 组件库", status: "active" },
            { text: "不限项目使用", status: "active" },
            { text: "商用授权", status: "active" },
            { text: "邮件支持", status: "active" },
            { text: "终身访问权限", status: "active" },
            { text: "终身免费更新", status: "inactive" },
          ],
        },
        {
          name: "Plus",
          subtitle: "为专业团队打造的进阶支持与版本更新服务。",
          offers: [
            { text: "完整 UI 组件库", status: "active" },
            { text: "不限项目使用", status: "active" },
            { text: "商用授权", status: "active" },
            { text: "邮件支持", status: "active" },
            { text: "终身访问权限", status: "active" },
            { text: "终身免费更新", status: "active" },
          ],
        },
      ],
    },
    blog: {
      title: "最新洞察",
      paragraph:
        "分享设计、开发与增长经验，帮助团队保持灵感与实践节奏。",
      pagination: {
        prev: "上一页",
        next: "下一页",
      },
      labels: {
        by: "作者",
        date: "发布日期",
      },
      posts: [
        {
          id: 1,
          title: "现代网站常用的 UI 组件推荐",
          paragraph:
            "从导航到 CTA，我们总结了兼顾美观与可用性的组件组合。",
          tags: ["创意"],
          publishDate: "2025",
          image: "/images/blog/blog-01.jpg",
          author: {
            name: "Samuyl Joshi",
            designation: "平面设计师",
            image: "/images/blog/author-03.png",
          },
        },
        {
          id: 2,
          title: "提升设计功力的 9 个简单方法",
          paragraph:
            "把灵感落地为可执行方案，从输入、拆解到复盘的全流程建议。",
          tags: ["计算机"],
          publishDate: "2025",
          image: "/images/blog/blog-02.jpg",
          author: {
            name: "Musharof Chy",
            designation: "内容策划",
            image: "/images/blog/author-02.png",
          },
        },
        {
          id: 3,
          title: "让代码速度翻倍的小技巧",
          paragraph:
            "从脚手架到调试工具，带你构建更高效的前端开发工作流。",
          tags: ["设计"],
          publishDate: "2025",
          image: "/images/blog/blog-03.jpg",
          author: {
            name: "Lethium Deo",
            designation: "平面设计师",
            image: "/images/blog/author-03.png",
          },
        },
      ],
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
      newsletter: {
        title: "订阅最新动态",
        paragraph: "定期获取模板更新、最佳实践与设计资源，不错过任何灵感。",
        namePlaceholder: "请输入姓名",
        emailPlaceholder: "请输入邮箱",
        submit: "立即订阅",
        disclaimer: "我们只发送有价值的更新内容，绝不骚扰。",
      },
    },
    footer: {
      description:
        "有你同创智能机器人科技（北京）有限公司\n- 专注高校教育机器人解决方案。\n- 地址：北京市石景山区料仓路6号院10号楼3层101-2",
      columns: {
        usefulLinks: {
          title: "常用链接",
          items: [
            { label: "博客", path: "/blog" },
            { label: "价格方案", path: "/" },
            { label: "关于我们", path: "/about" },
          ],
        },
        terms: {
          title: "条款政策",
          items: [
            { label: "服务条款", path: "/" },
            { label: "隐私政策", path: "/" },
            { label: "退款政策", path: "/" },
          ],
        },
        support: {
          title: "支持与帮助",
          items: [
            { label: "提交支持工单", path: "/contact" },
            { label: "使用条款", path: "/" },
            { label: "关于我们", path: "/about" },
          ],
        },
      },
    },
    pages: {
      about: {
        title: "关于我们",
        description:
          "介绍团队愿景与能力，帮助访客快速了解我们的背景与价值观。",
      },
      contact: {
        title: "联系我们",
        description:
          "如果你有任何问题或合作想法，欢迎留下留言，我们会尽快回复。",
      },
      products: {
        title: "产品介绍",
        description:
          "全面了解教育机器人产品矩阵、核心功能与配套方案，找到适合教学或科研的最佳选择。",
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
      },
      customSolutions: {
        title: "定制合作",
        description:
          "面向高校与产业合作伙伴提供硬件定制、课程设计与科研级机器人解决方案。",
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
      blog: {
        title: "博客列表",
        description:
          "浏览最新文章，获取产品设计、前端开发与增长实践的灵感。",
      },
    },
    breadcrumbs: {
      home: "首页",
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
      panelLabel: "快速联系我们面板",
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
      },
      wechat: {
        label: "微信",
        tooltip: "即将推出",
        comingSoon: "微信联系方式即将推出",
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
    auth: {
      signin: {
        title: "登录到你的账户",
        subtitle: "登录后即可更快完成购买与管理操作。",
        google: "使用 Google 登录",
        github: "使用 GitHub 登录",
        emailLabel: "邮箱",
        passwordLabel: "密码",
        remember: "保持登录状态",
        forgot: "忘记密码？",
        submit: "登录",
        noAccount: "还没有账户？",
        signupLink: "立即注册",
      },
      signup: {
        title: "创建你的免费账户",
        subtitle: "无需信用卡，14 天免费试用立即开始。",
        google: "使用 Google 注册",
        github: "使用 GitHub 注册",
        nameLabel: "姓名",
        namePlaceholder: "请输入姓名",
        emailLabel: "邮箱",
        passwordLabel: "密码",
        remember: "我已阅读并同意服务条款",
        submit: "创建账户",
        haveAccount: "已经有账户了？",
        signinLink: "去登录",
      },
    },
    error: {
      title: "页面走丢了",
      description: "你访问的页面可能已被删除或名称更新，试试返回首页。",
      button: "返回首页",
    },
    blogDetailPage: {
      article: {
        title: "免费下载高质量图库与数字素材的 10 个绝佳网站",
        meta: {
          author: "Musharof Chy",
          published: "2024 年 1 月 12 日",
          comments: "50",
          views: "35",
          tag: "设计",
        },
        intro:
          "我们整理了 10 个持续更新、授权友好的免费素材站点，让设计团队能迅速找到配图与图标，不再为资源来源发愁。",
        coverAlt: "设计团队正在讨论品牌素材",
        highlightParagraph: {
          before:
            "挑选网站时，我们重点关注下载速度、商业授权与文件质量，",
          highlight: "因此推荐的站点大多支持免费商用",
          after:
            "，并提供高分辨率文件，帮助你避免版权纠纷。",
        },
        emphasisParagraph: {
          before: "为了更高效地组织素材，建议及时收藏并分类，",
          highlight: "将灵感整理成可复用的设计资源",
          after:
            "，团队成员便能在需求到来时快速调用，保持视觉一致性。",
        },
        sectionHeading: "为 UI/UX 设计师打造的数字素材市场",
        sectionParagraph:
          "这些平台提供结构化的合集，可按格式、主题与颜色筛选，帮助你在紧迫的迭代周期中保持设计产出品质。",
        bulletPoints: [
          "覆盖品牌宣传、产品演示与营销活动等常用场景。",
          "附带可编辑的 Figma、Sketch 或 PSD 源文件。",
          "支持按许可、作者与格式快速过滤内容。",
          "收藏夹与团队工作区方便同步最新素材。",
        ],
        quote:
          "持续维护素材库与版权清单，能显著提升设计交付效率，也让后续的渠道推广更具一致性。",
        conclusion:
          "定期整理收藏夹并关注站点更新，就能保持品牌素材库的新鲜度，让官网和营销页面时刻保持活力。",
        tagsTitle: "热门标签：",
        shareTitle: "分享这篇文章：",
        tags: ["设计", "开发", "资讯"],
      },
    },
    blogSidebarPage: {
      sidebar: {
        searchPlaceholder: "搜索文章...",
        relatedPostsTitle: "相关文章",
        relatedPosts: [
          {
            title: "提升在线销售的最佳策略",
            date: "2025 年 2 月 12 日",
            image: "/images/blog/post-01.jpg",
            slug: "#",
          },
          {
            title: "50 个实用的网站设计技巧",
            date: "2024 年 2 月 15 日",
            image: "/images/blog/post-02.jpg",
            slug: "#",
          },
          {
            title: "8 款优秀落地页搭建工具评测",
            date: "2024 年 6 月 5 日",
            image: "/images/blog/post-03.jpg",
            slug: "#",
          },
        ],
        categoriesTitle: "热门分类",
        categories: [
          "Tailwind 模板",
          "落地页",
          "初创企业",
          "商业",
          "多用途",
        ],
        tagsTitle: "热门标签",
        tags: ["主题", "UI 套件", "Tailwind", "初创企业", "商业"],
      },
    },
};

export type ChineseDictionary = typeof dictionary;
