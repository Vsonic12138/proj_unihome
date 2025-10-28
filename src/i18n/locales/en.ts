export const dictionary = {
    header: {
      menu: {
        home: "Home",
        products: "Products",
        developer: "Developer Services",
        customSolutions: "Custom Solutions",
        caseStudies: "Case Studies",
        about: "About Us",
        submenu: {
          knowledgeBase: "Knowledge Base",
          openSource: "Open Source Projects",
          caseUniversities: "Universities",
          caseK12: "K12 Education",
          caseCoResearch: "Co-Research",
        },
      },
      languageSwitcher: {
        label: "Language",
        options: [
          { locale: "en", label: "English" },
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
            alt: "Embodied intelligence innovation hub",
          },
          action: {
            href: "/products",
            label: "Discover Our Platform",
          },
        },
        {
          id: 2,
          media: {
            kind: "image",
            src: "/images/hero/slide-2.png",
            alt: "Full-stack embodied robotics solutions",
          },
          action: {
            href: "/developers",
            label: "Visit Developer Hub",
          },
        },
        {
          id: 3,
          media: {
            kind: "image",
            src: "/images/hero/slide-3.png",
            alt: "Industry-education integrated innovation space",
          },
          action: {
            href: "/case-studies",
            label: "Explore Case Studies",
          },
        },
      ],
      primaryCta: {
        label: "Browse Product Platform",
        href: "#features",
      },
      secondaryCta: {
        label: "Talk with Us",
        href: "#contact",
      },
      autoPlayInterval: 6000,
    },
    features: {
      title: "Product Platform",
      paragraph:
        "Guided by the principles of Inspire, Explore, Innovate, and Share, we deliver an embodied intelligence product platform that unifies hardware, software, curriculum, and services for seamless teaching, research, and deployment.",
      featuredProducts: {
        title: "Curated Product Pathways",
        description:
          "We highlight three representative solutions covering activation, advanced courses, and research scenarios—helping teams launch embodied intelligence programs faster.",
        ctaDescription: "Need the full catalog tailored to your teaching or research plans?",
        viewAllLabel: "Browse all products",
        slugs: ["ubot-mr20", "gx-mat-09s", "rai-p4"],
      },
      highlights: [
        {
          title: "End-to-end delivery",
          description:
            "Hardware, software, curriculum, and services arrive together to keep deployment and maintenance overhead low.",
        },
        {
          title: "Multi-scenario coverage",
          description:
            "From K12 and vocational programs to university labs and research centers, every route extends into competitions and hands-on training.",
        },
        {
          title: "Modular expansion",
          description:
            "Mix and match chassis, robotic arms, and AI modules to support cross-disciplinary practice in LLMs, vision, control, and more.",
        },
      ],
    },
    about: {
      sectionTwo: {
        items: [
          {
            title: "Inspire, Explore, Innovate",
            paragraph:
              "Built on the core principles of \"Inspire, Explore, Innovate, and Share,\" we construct embodied intelligent robotics learning platforms that spark students' interest and creativity in robotics technology.",
          },
          {
            title: "Tiered Curriculum System",
            paragraph:
              "Systematically analyzing embodied robotics technology and tailoring content to different educational levels, we design progressive, diverse curricula that make learning gradual and accessible.",
          },
          {
            title: "Open-Source Ecosystem",
            paragraph:
              "Continuously building an open-source online learning community that aggregates quality teaching resources and technical documentation, promoting the popularization and development of embodied intelligent robotics education.",
          },
        ],
      },
    },
    contact: {
      formTitle: "Need help? Submit a support ticket",
      formDescription: "Our support team will respond via email as soon as possible.",
      form: {
        nameLabel: "Your Name",
        namePlaceholder: "Please enter your name",
        emailLabel: "Your Email",
        emailPlaceholder: "Please enter your email",
        messageLabel: "Your Message",
        messagePlaceholder: "Let us know what you need help with",
        submit: "Submit Ticket",
      },
    },
    footer: {
      description:
        "Youni Tongchuang Intelligent Robotics Technology (Beijing) Co., Ltd.\n- Located at Shougang Park Winter Olympic Plaza, Shijingshan District, Beijing\n- Focused on embodied intelligent robotics teaching, research, and applications\n- Address: Unit 101-2, 3F, Building 10, Yard 6, Liaocang Road, Shijingshan District, Beijing",
      columns: {
        usefulLinks: {
          title: "Products",
          items: [
            { label: "Product Overview", path: "/products" },
            { label: "Solution Matrix", path: "/#features" },
            { label: "Case Studies", path: "/case-studies" },
          ],
        },
        terms: {
          title: "Developer Services",
          items: [
            { label: "Developer Hub", path: "/developers" },
            { label: "Knowledge Base", path: "/developers/knowledge-base" },
            { label: "Open Source Projects", path: "/developers/open-source" },
          ],
        },
        support: {
          title: "Custom Partnerships",
          items: [
            { label: "Custom Solutions", path: "/custom-solutions" },
            { label: "Co-Research Programs", path: "/case-studies/co-research" },
            { label: "Contact Our Team", path: "/contact" },
          ],
        },
      },
      contact: {
        phoneLabel: "Phone",
        phoneNumber: "+86 176 1035 7571",
        phoneTip: "Mon–Fri, 09:30–18:00 (GMT+8)",
        taobaoLabel: "Taobao Store",
        taobaoHref:
          "https://4vhhasmxqjt25cg7za43qs6podckjow.taobao.com/shop/view_shop.htm?appUid=RAzN8HWTBLcKSRgwfJESLCpphyAguSqzhXdc1GyTLumi8JFoD49&spm=a21n57.1.hoverItem.1",
        bilibiliLabel: "Bilibili Official Channel",
        bilibiliHref:
          "https://space.bilibili.com/1888573035?spm_id_from=333.337.search-card.all.click",
        modalClose: "Close",
        qq: {
          title: "Join the QQ Community",
          description:
            "Scan to join group 811348489 for course resources and upcoming events.",
        },
        wechat: {
          title: "Follow on WeChat",
          description:
            "Scan to follow the official account and receive teaching resources.",
        },
      },
    },
    pages: {
      home: {
        title: "Youni Tongchuang · Embodied Intelligence Platform",
        description:
          "Youni Tongchuang delivers integrated embodied robotics hardware, software, curriculum, and services to accelerate educational innovation for universities and vocational programs.",
      },
      about: {
        title: "About Us",
        description:
          "Introduce the team's vision and capabilities so visitors can quickly understand our background and values.",
      },
      contact: {
        title: "Contact Us",
        description:
          "If you have questions or collaboration ideas, leave a message and we'll respond soon.",
      },
      products: {
        title: "Product Portfolio",
        description:
          "We provide professional embodied robotics solutions for education and research. With a rich product matrix spanning eight core product lines from entry to advanced levels, our offerings deeply integrate mechanical, electronic, and AI technologies, featuring flexible expandability and comprehensive supporting resources. Whether it's K12 robotics enlightenment, vocational skill training for secondary and higher vocational programs, or cutting-edge research at universities and institutes, we precisely match your needs—empowering you to explore the limitless possibilities of embodied intelligent robotics and to find the best partner for teaching and research.",
      },
      developerServices: {
        title: "Developer Services",
        description:
          "Access technical support, SDK guides, and integration resources to accelerate development on our robotics platforms.",
      },
      knowledgeBase: {
        title: "Knowledge Base",
        description:
          "Browse documentation, tutorials, and troubleshooting guides covering hardware installation, software configuration, and classroom deployment.",
      },
      openSource: {
        title: "Open Source Projects",
        description:
          "Explore our open repositories, community contributions, and collaborative projects built around robotics and AI.",
      },
      customSolutions: {
        title: "Custom Collaboration",
        description:
          "Partner with us for tailored hardware, curriculum design, and research-grade robotics solutions built around your requirements.",
      },
      caseStudies: {
        title: "Success Stories",
        description:
          "See how different partners deploy our robotics solutions across teaching, competitions, and joint research initiatives.",
      },
      caseUniversities: {
        title: "University Programs",
        description:
          "Discover how higher-education institutions integrate our robotics platforms into labs, coursework, and innovation centers.",
      },
      caseK12: {
        title: "K12 Education",
        description:
          "Learn how middle and high schools use our kits to inspire early-stage STEM learning and robotics literacy.",
      },
      caseCoResearch: {
        title: "Joint Research",
        description:
          "Review collaborative R&D efforts that leverage our technology for advanced robotics, AI, and interdisciplinary exploration.",
      },
    },
    products: {
      catalog: {
        coreTitle: "7 Core Products",
        coreDescription:
          "From entry-level to advanced, covering K12 through universities and research.",
        viewDetailsCta: "View details",
        series: [
          {
            key: "m-series",
            title: "M Series · Modular Learning Platforms",
            description:
              "Modular kits for inspirational learning through advanced curriculum design, spanning entry projects to research-grade builds.",
            items: [
              {
                slug: "ubot-mr20",
                name: "Embodied Robotics Innovation Kit Ubot MR20",
                model: "Ubot MR20",
                image: "/images/video/video.jpg",
                brief:
                  "150+ parts; 5 chassis + 3 robotic arms; 20 composite forms; multi-language programming. Suitable for K12, vocational Year 1, freshman.",
              },
              {
                slug: "gx-mat-09s",
                name: "Embodied Robotics Innovation Platform (Enhanced) GX-MAT-09S",
                model: "GX-MAT-09S",
                image: "/images/video/video.jpg",
                brief:
                  "11 chassis + 7 robotic arms; 88 composite forms; adds LiDAR + RDK X5 board. For advanced courses and research.",
              },
            ],
          },
          {
            key: "p-series",
            title: "P Series · Practical Training Platforms",
            description:
              "Task-driven embodied robotics platforms for navigation, perception, planning, and LLM-integrated experiments.",
            items: [
              {
                slug: "rai-p4",
                name: "Embodied Robot Task Planning Training Platform RAI-P4",
                model: "RAI-P4",
                image: "/images/video/video.jpg",
                brief:
                  "Built-in AI voice/vision; 4-DOF arm; ROS2 support. For LLM apps, computer vision, and ROS courses.",
              },
              {
                slug: "uni-wr2",
                name: "Portable ROS Navigation Learning Platform UNI-WR2",
                model: "UNI-WR2",
                image: "/images/video/video.jpg",
                brief:
                  "Compact (<13cm); desktop deployment (60×60cm); 3 navigation modes. For ROS and mobile robotics.",
              },
              {
                slug: "rai-q2",
                name: "Embodied Vision Perception & Decision Training Platform RAI-Q2",
                model: "RAI-Q2",
                image: "/images/video/video.jpg",
                brief:
                  "Depth camera + precision rotary/lift stages; supports OpenCV/YOLO/VLM. For vision and ML courses.",
              },
              {
                slug: "rai-m4",
                name: "Embodied Composite Robot System Design Training Platform RAI-M4",
                model: "RAI-M4",
                image: "/images/video/video.jpg",
                brief:
                  "Mecanum omni chassis + 4-axis arm; connects DeepSeek/Qwen. For mobile navigation and LLM deployment.",
              },
              {
                slug: "alo-le4",
                name: "Embodied Robot Manipulation Planning Training Platform ALO-LE4",
                model: "ALO-LE4",
                image: "/images/video/video.jpg",
                brief:
                  "Two 5-DOF arms (master-follower), ACT architecture, adjustable lighting. For imitation learning and end-to-end control.",
              },
            ],
          },
        ],
      },
      faq: {
        title: "Key Questions",
        items: [
          {
            q: "Q1: Which education stages do these products cover, and which core products are recommended for each?",
            a:
              "A: The portfolio covers K12, secondary and higher vocational programs, undergraduate, and postgraduate/research. Recommended options by stage:\n\n" +
              "K12, vocational Year 1, freshmen: Ubot MR20 (0.98 万元). Zero‑programming entry (block‑based), low assembly difficulty for generalized robotics practice; supports 5 chassis + 3 arms to meet entry‑level learning needs.\n\n" +
              "Undergraduate (foundation courses): GX‑MAT‑09S (3.88 万元). Supports core courses such as Mechanics, Sensor Principles, and ROS fundamentals; builds 11 chassis + 7 arms and covers both lab experiments and competition training.\n\n" +
              "Undergraduate (advanced), Postgraduate/Research: RAI‑P4 (3.4 万元). Integrates LLMs and robotics for task planning, voice/vision fusion, and intelligent system research.",
          },
          {
            q: "Q2: For university courses in ROS and mobile robot navigation, which products are most suitable and why?",
            a:
              "A: UNI‑WR2 (0.45 万元) and GX‑MAT‑09S (3.88 万元) are the best fits.\n\n" +
              "UNI‑WR2:\n" +
              "• Flexible deployment: ultra‑portable (<13cm, <550g); SLAM navigation on a 60×60cm desktop—no large lab required.\n" +
              "• Teaching depth: engineering ROS workflow broken into 5 steps (principles → demo → framework breakdown → package config → full-parameter tuning), with Cartographer/Hector/Gmapping navigation—progressive experiments for full-process mastery.\n" +
              "• Cost-effective: only 0.45 万元, ideal for bulk purchase and group labs.\n\n" +
              "GX‑MAT‑09S:\n" +
              "• Comprehensive: adds ROS course support; builds 11 chassis + 7 arms; with LiDAR (0.12–8m), supports mobile navigation and localization practice.\n" +
              "• Compute: RDK X5 (10TOPS) with Ubuntu+ROS enables complex algorithms (e.g., SLAM mapping, obstacle avoidance) for advanced courses.",
          },
          {
            q: "Q3: Which products support LLM integration and what can they do?",
            a:
              "A: Three products support LLM‑based applications:\n\n" +
              "RAI‑P4 (3.4 万元): integrates Qwen, DeepSeek, and Volcano Engine. Enables ASR (Qwen), LLM (DeepSeek), TTS (Volcano), and function‑call workflows (e.g., voice calculator, music playback, gimbal/arm task planning), integrated with YOLO/face tracking and arm control.\n\n" +
              "RAI‑M4 (2.4 万元): connects DeepSeek (LLM) and Qwen (ASR + multimodal). Converts natural‑language commands into robot tasks (move chassis/grasp with arm); multimodal object detection (Qwen) with a mecanum chassis + 4‑axis arm for generalized manipulation.\n\n" +
              "RAI‑Q2 (3.2 万元): leverages Qwen VLM for multimodal vision. Supports tasks like fruit detection/labeling and unknown‑object recognition; with a depth camera + precision turntable, enables precise tuning/validation for vision and LLM deployment courses.",
          },
        ],
      },
      detailLabels: {
        highlights: "Highlights",
        applicable: "Applicable Audience/Scenarios",
        experiments: "Experiments",
        configuration: "Configuration",
        specs: "Technical Specs",
        comingSoon: "Coming soon",
      },
      details: {
        "ubot-mr20": {
          name: "Embodied Robotics Innovation Kit Ubot MR20",
          model: "Ubot MR20",
          image: "/images/video/video.jpg",
          overview:
            "An entry-to-foundation embodied robotics kit supporting multiple languages and many composable forms, suitable for K12 and lower undergraduate levels.",
          highlights: [
            "150+ parts",
            "5 chassis + 3 arms",
            "20 composite forms",
            "Multi-language programming",
          ],
          applicable: "K12, vocational year 1, freshman",
        },
        "gx-mat-09s": {
          name: "Embodied Robotics Innovation Platform (Enhanced) GX-MAT-09S",
          model: "GX-MAT-09S",
          image: "/images/video/video.jpg",
          overview:
            "Enhanced sensing and compute with LiDAR and RDK X5, offering 11 chassis and 7 robotic arm combinations for advanced courses and research.",
          highlights: ["11 chassis", "7 arms", "88 composite forms", "LiDAR + RDK X5"],
          applicable: "Undergraduate advanced labs, competitions, research",
        },
        "rai-p4": {
          name: "Embodied Robot Task Planning Training Platform RAI-P4",
          model: "RAI-P4",
          image: "/images/video/video.jpg",
          overview:
            "Integrated AI voice/vision with a 4-DOF arm and ROS2 support, ideal for planning and perception teaching.",
          highlights: ["AI voice/vision", "4-DOF arm", "ROS2 support"],
          applicable: "LLM apps, computer vision, ROS",
        },
        "rai-m4": {
          name: "Embodied Composite Robot System Design Training Platform RAI-M4",
          model: "RAI-M4",
          image: "/images/video/video.jpg",
          overview:
            "Mecanum omni-directional chassis with a 4-axis arm and LLM connectivity for system design and navigation.",
          highlights: ["Mecanum omni chassis", "4-axis arm", "LLM connectivity"],
          applicable: "Mobile navigation, LLM deployment",
        },
        "rai-q2": {
          name: "Embodied Vision Perception & Decision Training Platform RAI-Q2",
          model: "RAI-Q2",
          image: "/images/video/video.jpg",
          overview:
            "Depth camera and precision motion stages supporting OpenCV/YOLO/VLM for vision and ML instruction.",
          highlights: ["Depth camera", "Precision stages", "OpenCV/YOLO/VLM"],
          applicable: "Computer vision, machine learning",
        },
        "uni-wr2": {
          name: "Portable ROS Navigation Learning Platform UNI-WR2",
          model: "UNI-WR2",
          image: "/images/video/video.jpg",
          overview:
            "A compact desktop ROS navigation platform enabling quick setup for lab exercises.",
          highlights: ["<13cm compact", "60×60cm desktop", "3 navigation modes"],
          applicable: "ROS, mobile robotics",
        },
        "alo-le4": {
          name: "Embodied Robot Manipulation Planning Training Platform ALO-LE4",
          model: "ALO-LE4",
          image: "/images/video/video.jpg",
          overview:
            "Dual 5-DOF arms in master-follower mode with adjustable lighting, supporting ACT and imitation learning/end-to-end control research.",
          highlights: ["Two 5-DOF arms", "ACT architecture", "Adjustable lighting"],
          applicable: "Imitation learning, end-to-end control",
        },
      },
      supportResources: {
        title: "Common Support Resources",
        items: [
          "Experiment guides: step-by-step procedures, principles, and key points",
          "Source code: complete program sources and libraries",
          "3D design drawings: STP format",
          "Hardware support: modular parts and IDE compatibility (Keil5, Arduino IDE, VS Code, etc.)",
        ],
      },
    },
    common: {
      aria: {
        mobileMenu: "Toggle navigation menu",
        themeToggle: "Switch between light and dark themes",
        scrollToTop: "Scroll back to the top",
        sharePost: "Share on social platforms",
        socialLink: "Visit our social profile",
        closeModal: "Close dialog",
      },
    },
    floatingContact: {
      panelLabel: "Contact Us",
      fabLabel: "Open contact options",
      closeLabel: "Close contact options",
      qqGroup: {
        label: "QQ Group",
        number: "811348489",
        tooltip: "Copy QQ group number",
        copy: "Copy",
        copied: "Copied!",
      },
      phone: {
        label: "Phone",
        name: "Mr. She",
        number: "+86 176 1035 7571",
        tooltip: "Copy phone number",
        copy: "Copy",
        copied: "Copied!",
      },
      taobao: {
        label: "Taobao Store",
        tooltip: "Visit Taobao store",
        linkText: "Visit",
        href: "https://4vhhasmxqjt25cg7za43qs6podckjow.taobao.com/shop/view_shop.htm?appUid=RAzN8HWTBLcKSRgwfJESLCpphyAguSqzhXdc1GyTLumi8JFoD49&spm=a21n57.1.hoverItem.1",
      },
      bilibili: {
        label: "Bilibili Channel",
        tooltip: "Visit our Bilibili channel",
        linkText: "Go",
        href: "https://space.bilibili.com/1888573035?spm_id_from=333.337.search-card.all.click",
      },
      wechat: {
        label: "WeChat Official",
        tooltip: "Show QR code",
        comingSoon: "Scan to follow our WeChat Official Account",
      },
    },
    buttons: {
      readMore: "Read More",
      keepReading: "Keep Reading",
    },
    forms: {
      emailPlaceholder: "Please enter your email",
      passwordPlaceholder: "Please enter your password",
      passwordLabel: "Your Password",
    },
    error: {
      title: "The page is missing",
      description:
        "The page you're trying to reach may have been deleted or renamed. Try heading back to the homepage.",
      button: "Return Home",
    },
};

export type EnglishDictionary = typeof dictionary;
