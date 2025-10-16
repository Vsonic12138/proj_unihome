export const dictionary = {
    header: {
      menu: {
        home: "首页",
        about: "关于我们",
        blog: "博客",
        support: "支持",
        pages: "更多页面",
        submenu: {
          about: "关于我们",
          blog: "博客列表",
          blogSidebar: "博客侧栏",
          blogDetails: "博客详情",
          signin: "登录",
          signup: "注册",
          error: "错误页",
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
      title: "为初创和 SaaS 打造的免费开源 Next.js 模板",
      description:
        "Startup 是一套免费的 Next.js 网站模板，适用于初创公司和 SaaS 产品网站，提供上线完整业务站点所需的页面、组件与模块，基于 Next 13.x 与 Tailwind CSS 构建。",
      primaryCta: "🔥 获取专业版",
      secondaryCta: "在 GitHub 上标星",
    },
    features: {
      title: "核心特性",
      paragraph:
        "Lorem Ipsum 拥有诸多变体，但大多数都在传承过程中被修改。我们为你保留核心价值。",
      items: [
        {
          id: 1,
          title: "为初创场景精心设计",
          paragraph:
            "为成长型团队定制的模块化设计，开箱即用，减少重复造轮子，让你把精力专注在产品本身。",
        },
        {
          id: 2,
          title: "高标准视觉体验",
          paragraph:
            "遵循现代设计体系与无障碍规范，预设暗黑模式支持，为品牌露出与信息传达提供一致体验。",
        },
        {
          id: 3,
          title: "支持最新 Next.js 13",
          paragraph:
            "采用 App Router 与最新特性构建，兼顾性能、SEO 与开发体验，轻松衔接现代前端生态。",
        },
        {
          id: 4,
          title: "原生 Tailwind CSS",
          paragraph:
            "充分利用 Tailwind v4 实用类，语义化设计令布局与主题定制更高效，也方便与你的设计体系对齐。",
        },
        {
          id: 5,
          title: "灵活可定制",
          paragraph:
            "组件结构清晰，支持快速替换文案、插图与配色，满足不同业务线的扩展需求。",
        },
        {
          id: 6,
          title: "永久免费开源",
          paragraph:
            "MIT 许可证自由使用，可用于商业项目，拥抱社区共建，降低站点维护成本。",
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
        title: "专为初创、SaaS 与企业站点而生",
        paragraph:
          "我们聚焦如何保护核心业务应用，结合圆桌讨论和互动演示提供最佳实践，让团队快速掌握落地方法。",
        bulletPoints: [
          "高品质体验",
          "Tailwind CSS",
          "终身免费使用",
          "Next.js",
          "完善文档",
          "开发者友好",
        ],
      },
      sectionTwo: {
        items: [
          {
            title: "稳定可靠的代码",
            paragraph:
              "遵循工程化规范与测试策略，确保每个构建版本都能维持高质量交付。",
          },
          {
            title: "专业支持团队",
            paragraph:
              "从集成指南到性能优化建议，我们提供一站式资源帮助你解决疑难问题。",
          },
          {
            title: "拥抱 Next.js 生态",
            paragraph:
              "持续跟进 Next.js 与 React 社区动态，让模板始终保持现代化能力。",
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
      description: "专注打造高质量的官网模板，助力团队快速搭建品牌阵地。",
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
      bottomNote: {
        text: "模板由",
        and: "与",
        uideck: "UIdeck",
        nextJsTemplates: "Next.js Templates",
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
