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
                image: "/images/products/ubot-mr20-main.jpg",
                brief: "Embodied intelligence robot innovation design kit (20-in-1). Combined with AI general education practice kit, build 20+ intelligent robots from scratch, supports block-based/C++/Python multi-language programming.",
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
        features: "Product Features",
        sampleCases: "Sample Configurations",
        modules: "Robot Modules",
        chassis: "Robot Chassis",
        arms: "Robotic Arm Configurations",
        compositeRobots: "Composite Robots",
        sensorConfig: "Sensor Configuration",
        controllerConfig: "Controller Configuration",
        softwareConfig: "Software Configuration",
        experiments: "Experiments",
        configuration: "Configuration",
        specs: "Technical Specs",
        comingSoon: "Coming soon",
      },
      details: {
        "ubot-mr20": {
          name: "Ubot MR20",
          subtitle: "Embodied Intelligence Robot Innovation Design Kit (20-in-1)",
          model: "Ubot MR20",
          image: "/images/products/ubot-mr20-main.jpg",
          overview: "Ubot MR20 is an AI general education practice kit combined with robotics. Learners can build over 20 different intelligent robots from scratch, incorporating voice recognition to understand AI applications in robotics. Learners can also develop intelligent features such as obstacle avoidance, line tracking, and posture detection through block-based programming, C++, or Python programming.",
          applicable: "K12, vocational/college year 1, undergraduate freshmen",
          features: [
            {
              title: "Programming Methods",
              content: "Using MR20 requires no prior programming experience. We use block-based programming where students simply drag and drop to complete robot programming. For learners with programming background who want more complex and professional coding, we also support C++ and Python code programming."
            },
            {
              title: "Assembly Method",
              content: "We've refined assembly difficulty down to every hole design, including spacing, size, and whether it's a threaded hole. While ensuring structural strength, we minimize unnecessary nuts to reduce assembly difficulty, making it easier for learners to get started and focus their learning energy on overall design."
            }
          ],
          sampleCases: {
            description: "The sample adopts modular design. Robot chassis configurations are designed based on differential wheel modules, caster wheel modules, universal wheel modules, steering wheel modules, omnidirectional mecanum wheel modules, gripper modules, and swing modules to create: three-wheel dual-drive differential chassis, three-wheel dual-drive front-wheel steering chassis, four-wheel dual-drive differential chassis, four-wheel four-drive differential chassis, and four-wheel four-drive mecanum omnidirectional chassis. Robot arm configurations are designed based on swing modules, turntable modules, and gripper modules to create: gimbal, 3-DOF robotic arm, and 4-DOF robotic arm configurations.",
            modules: [
              { name: "Differential Wheel Module", image: "/images/products/ubot-mr20/modules/differential-wheel.png" },
              { name: "Universal Wheel Module", image: "/images/products/ubot-mr20/modules/universal-wheel.png" },
              { name: "Steering Wheel Module", image: "/images/products/ubot-mr20/modules/steering-wheel.png" },
              { name: "Omnidirectional Mecanum Wheel Module", image: "/images/products/ubot-mr20/modules/omni-wheel.png" },
              { name: "Gripper Module", image: "/images/products/ubot-mr20/modules/gripper.png" },
              { name: "Swing Module", image: "/images/products/ubot-mr20/modules/swing.png" }
            ],
            chassis: [
              { name: "Three-Wheel Dual-Drive Universal Differential Mobile Robot", image: "/images/products/ubot-mr20/chassis/three-wheel-omni-differential.png" },
              { name: "Three-Wheel Dual-Drive Front-Wheel Steering Mobile Robot", image: "/images/products/ubot-mr20/chassis/three-wheel-front-steering.png" },
              { name: "Four-Wheel Dual-Drive Differential Mobile Robot", image: "/images/products/ubot-mr20/chassis/four-wheel-two-drive-differential.png" },
              { name: "Four-Wheel Four-Drive Differential Mobile Robot", image: "/images/products/ubot-mr20/chassis/four-wheel-four-drive-differential.png" },
              { name: "Four-Wheel Four-Drive Mecanum Omnidirectional Mobile Robot", image: "/images/products/ubot-mr20/chassis/four-wheel-mecanum-omni.png" }
            ],
            arms: [
              { name: "2-DOF Gimbal", image: "/images/products/ubot-mr20/arms/two-dof-gimbal.png" },
              { name: "3-DOF Robotic Arm", image: "/images/products/ubot-mr20/arms/three-dof-arm.png" },
              { name: "4-DOF Robotic Arm", image: "/images/products/ubot-mr20/arms/four-dof-arm.png" }
            ],
            compositeRobots: [
              { name: "Three-Wheel Dual-Drive Universal Gripper Robot", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-gripper.png" },
              { name: "Three-Wheel Dual-Drive Universal 2-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-2dof-transport.png" },
              { name: "Three-Wheel Dual-Drive Universal 3-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-3dof-transport.png" },
              { name: "Three-Wheel Dual-Drive Universal 4-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/three-wheel-omni-4dof-transport.png" },
              { name: "Three-Wheel Dual-Drive Front-Wheel Steering Gripper Robot", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-gripper.png" },
              { name: "Three-Wheel Dual-Drive Front-Wheel Steering 2-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-2dof-transport.png" },
              { name: "Three-Wheel Dual-Drive Front-Wheel Steering 3-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-3dof-transport.png" },
              { name: "Three-Wheel Dual-Drive Front-Wheel Steering 4-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/three-wheel-front-steering-4dof-transport.png" },
              { name: "Four-Wheel Dual-Drive Differential Gripper Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-gripper.png" },
              { name: "Four-Wheel Dual-Drive Differential 2-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-2dof-transport.png" },
              { name: "Four-Wheel Dual-Drive Differential 3-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-3dof-transport.png" },
              { name: "Four-Wheel Dual-Drive Differential 4-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-two-drive-differential-4dof-transport.png" },
              { name: "Four-Wheel Four-Drive Differential Gripper Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-gripper.png" },
              { name: "Four-Wheel Four-Drive Differential 2-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-2dof-transport.png" },
              { name: "Four-Wheel Four-Drive Differential 3-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-3dof-transport.png" },
              { name: "Four-Wheel Four-Drive Differential 4-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-four-drive-differential-4dof-transport.png" },
              { name: "Four-Wheel Four-Drive Mecanum Omnidirectional Gripper Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-gripper.png" },
              { name: "Four-Wheel Four-Drive Mecanum Omnidirectional 2-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-2dof-transport.png" },
              { name: "Four-Wheel Four-Drive Mecanum Omnidirectional 3-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-3dof-transport.png" },
              { name: "Four-Wheel Four-Drive Mecanum Omnidirectional 4-DOF Transport Robot", image: "/images/products/ubot-mr20/composite-robots/four-wheel-mecanum-omni-4dof-transport.png" }
            ]
          },
          sensorConfig: {
            description: "Integrates posture detection sensor, 4-channel line-tracking sensor, 2× ultrasonic sensors, voice recognition sensor, speaker module, and PS controller for remote control. Enables automatic obstacle avoidance, maze navigation, autonomous reverse parking, autonomous line following, voice dialogue and voice command control, and controller-based remote control. Students can also use MR20 for interesting project development, such as assisting scientists on the moon!",
            list: [
              "6-axis gyroscope sensor",
              "4-line path tracking sensor",
              "Ultrasonic sensor",
              "Voice recognition sensor",
              "Speaker module",
              "Remote controller"
            ]
          },
          controllerConfig: {
            description: "The controller supports common programming language inputs, including block-based, C++, Python, and other programming languages. It provides rich interfaces, including 6 DC motor ports, 8 servo ports, 4 ultrasonic ports, 4 line-tracking sensor ports, 4 expansion I/O sensor ports, USB serial port, etc. The controller adopts stackable design with reserved expansion dock connectors, making it easy for users to connect other electronic hardware to the controller."
          },
          softwareConfig: {
            description: "The software integrates OpenBlock programming environment, supporting both block-based programming and C++/Python code programming. It can be used for software programming as well as hardware device programming, supporting hardware code generation and compilation download functions, and also supporting real-time operation mode through real-time communication with hardware devices.",
            ecosystem: "OpenBlock has a complete hardware ecosystem, supporting popular maker hardware platforms on the market, including Arduino, MicroPython, and ESP32, allowing users to expand freely."
          },
          experiments: {
            summary: "This experimental system revolves around modular robot 'Basic Recognition - Module Control - Structure Building - Perception Application - Comprehensive Design - Extension Innovation', divided into 6 core modules, covering 32 basic experiments and 20 extension projects, forming a complete learning path from entry to advanced.",
            preparation: {
              title: "Experimental Preparation Phase",
              description: "Focuses on foundational hardware/software basics and design methodology learning before hands-on practice",
              items: [
                "Hardware/Software Environment Configuration Basics: programming environment installation, parts list usage, learning material reference, modular robot design methodology",
                "Robot Module Basic Recognition: understanding core modules (motors, servos, wheel assemblies, etc.) functions and application logic"
              ]
            },
            moduleBasics: {
              title: "Robot Module Basic Experiments",
              range: "Experiment 1-9",
              description: "Targeting robot core functional modules (motors, wheel assemblies, servos, actuators), achieving closed-loop 'principle understanding - assembly - control', 9 experiments total",
              items: [
                { no: "Exp 1", name: "Controlling DC Motor Rotation", desc: "Master DC motor forward/reverse rotation and stop control logic and programming implementation" },
                { no: "Exp 2", name: "Controlling DC Motor Speed", desc: "Implement DC motor speed regulation (e.g., PWM speed control), understand speed control principles" },
                { no: "Exp 3", name: "Differential Wheel Module Assembly and Motion Control", desc: "Understand differential wheel composition/application, complete assembly and implement forward/reverse rotation, speed control, and stop" },
                { no: "Exp 4", name: "Omnidirectional Wheel Module Assembly and Motion Control", desc: "Understand omnidirectional wheel composition/application (e.g., mecanum wheels, omni wheels), complete assembly and implement basic motion control" },
                { no: "Exp 6", name: "Controlling Servo Rotation Angle", desc: "Understand servo working principle (angle positioning characteristic), implement precise angle control" },
                { no: "Exp 7", name: "Swing Module Assembly and Motion Control", desc: "Understand swing module composition/application, complete assembly and implement angle control (e.g., robotic arm joints, gimbal swing)" },
                { no: "Exp 8", name: "Steering Wheel Module Assembly and Motion Control", desc: "Understand steering wheel composition/application (e.g., vehicle steering structure), complete assembly and implement direction control" },
                { no: "Exp 9", name: "Gripper Module Motion Control", desc: "Understand gripper module composition/application (e.g., object grasping), complete assembly and implement opening/closing range control" }
              ]
            },
            structureDesign: {
              title: "Robot Structure Design Experiments",
              range: "Experiment 10-19",
              description: "Based on basic modules, complete robot overall structure assembly, covering 'frame - chassis - gimbal - robotic arm', 10 experiments total",
              items: [
                { no: "Exp 10", name: "T-Frame Assembly", desc: "Master part assembly rules, complete T-frame (robot structural support) assembly" },
                { no: "Exp 11", name: "Rectangular Suspension Frame Assembly", desc: "Understand suspension frame composition/application (cushioning, stability), complete rectangular suspension frame assembly" },
                { no: "Exp 12", name: "Three-Wheel Dual-Drive Universal Differential Mobile Robot Assembly and Motion Control", desc: "Understand dual-drive universal chassis composition/application, complete structural assembly, implement basic movement control" },
                { no: "Exp 13", name: "Three-Wheel Dual-Drive Front-Wheel Steering Mobile Robot Assembly and Motion Control", desc: "Understand dual-drive front-wheel steering chassis composition/application, complete structural assembly, implement steering and movement control" },
                { no: "Exp 14", name: "Four-Wheel Dual-Drive Differential Mobile Robot Assembly and Motion Control", desc: "Understand four-wheel dual-drive differential chassis composition/application, complete structural assembly, implement differential steering and movement control" },
                { no: "Exp 15", name: "Four-Wheel Four-Drive Differential Mobile Robot Assembly and Motion Control", desc: "Understand four-wheel four-drive differential chassis composition/application (stronger power), complete structural assembly and movement control" },
                { no: "Exp 16", name: "Four-Wheel Four-Drive Mecanum Omnidirectional Mobile Robot Assembly and Motion Control", desc: "Understand four-wheel four-drive omnidirectional chassis composition/application (omnidirectional movement characteristic), complete structural assembly and movement control" },
                { no: "Exp 17", name: "2-DOF Gimbal Assembly and Motion Control", desc: "Understand gimbal composition/application (e.g., camera orientation), complete 2-DOF (horizontal + vertical) gimbal assembly and control" },
                { no: "Exp 18", name: "3-DOF Robotic Arm Assembly and Motion Control", desc: "Understand 3-DOF robotic arm composition/application, complete assembly and implement multi-joint coordinated motion control" },
                { no: "Exp 19", name: "4-DOF Robotic Arm Assembly and Motion Control", desc: "Understand 4-DOF robotic arm composition/application (more flexible grasping), complete assembly and implement coordinated motion control" }
              ]
            },
            perception: {
              title: "Robot Perception Basic Experiments",
              range: "Experiment 20-24",
              description: "Learn robot core sensors for 'perceiving the external environment', implement data acquisition and basic interaction, 5 experiments total",
              items: [
                { no: "Exp 20", name: "Ultrasonic Sensor Data Acquisition", desc: "Understand ultrasonic sensor principle/application (distance measurement, obstacle avoidance), implement sensor data reading" },
                { no: "Exp 21", name: "Line-Tracking Sensor Data Acquisition", desc: "Understand line-tracking sensor principle/application (following trajectory), implement sensor data reading" },
                { no: "Exp 22", name: "Posture Detection Sensor Data Acquisition", desc: "Understand gyroscope sensor principle/application (detecting robot posture: tilt, rotation angle), implement data reading" },
                { no: "Exp 23", name: "Voice Recognition Dialogue", desc: "Understand voice recognition sensor principle/application, configure recognition vocabulary and implement voice dialogue interaction" },
                { no: "Exp 24", name: "Remote Controller Data Acquisition", desc: "Understand remote controller principle/application (wireless control), implement controller button data reading and command reception" }
              ]
            },
            comprehensiveProjects: {
              title: "Robot Comprehensive Project Design",
              range: "Experiment 25-32",
              description: "Combining 'module control + structure + perception', simulating real scenarios to implement complex tasks, 8 experiments total",
              items: [
                { no: "Exp 25", name: "Robot Wall Following", desc: "Simulate walking along wall scenario (e.g., corridor patrol), implement wall-following through sensors (e.g., ultrasonic) + programming" },
                { no: "Exp 26", name: "Robot Maze Navigation", desc: "Simulate maze exploration scenario, detect obstacles through ultrasonic sensors, program to implement maze path planning and navigation" },
                { no: "Exp 27", name: "Robot Following", desc: "Simulate following scenario (e.g., companion robot), detect target distance through ultrasonic sensors, implement following human walking" },
                { no: "Exp 28", name: "Robot Line Tracking", desc: "Simulate restaurant delivery scenario, move along ground trajectory through line-tracking sensors, complete item transport tasks at designated points" },
                { no: "Exp 29", name: "Voice-Controlled Robot Movement", desc: "Simulate voice interaction robot scenario, receive commands through voice recognition, control robot to complete corresponding actions (e.g., forward, turn)" },
                { no: "Exp 30", name: "Gesture-Controlled Gimbal", desc: "Simulate 'Real Steel' interaction scenario, detect hand posture through posture sensors (e.g., wristband, phone), control gimbal to complete actions" },
                { no: "Exp 31", name: "Robotic Arm Detection and Transport", desc: "Simulate industrial/coffee robot scenario, build multi-DOF robotic arm workstation, program to implement 'automatic task detection - robotic arm transport control' closed loop" },
                { no: "Exp 32", name: "Remote-Controlled Transport AGV Robot", desc: "Simulate logistics/tour guide scenario, build 'mobile + transport' composite robot, complete item transfer tasks through remote controller control" }
              ]
            },
            extensionProjects: {
              title: "Robot Extension Projects",
              range: "Project 1-20",
              description: "Based on 'chassis types + actuators' combination innovation, focusing on 'mobility + grasping/transport' functions, 20 projects total",
              groups: [
                {
                  chassis: "Three-Wheel Dual-Drive Universal Chassis",
                  projects: [
                    "Three-Wheel Dual-Drive Universal Gripper Robot",
                    "Three-Wheel Dual-Drive Universal 2-DOF Transport Robot",
                    "Three-Wheel Dual-Drive Universal 3-DOF Transport Robot",
                    "Three-Wheel Dual-Drive Universal 4-DOF Transport Robot"
                  ]
                },
                {
                  chassis: "Three-Wheel Dual-Drive Front-Wheel Steering Chassis",
                  projects: [
                    "Three-Wheel Dual-Drive Front-Wheel Steering Gripper Robot",
                    "Three-Wheel Dual-Drive Front-Wheel Steering 2-DOF Transport Robot",
                    "Three-Wheel Dual-Drive Front-Wheel Steering 3-DOF Transport Robot",
                    "Three-Wheel Dual-Drive Front-Wheel Steering 4-DOF Transport Robot"
                  ]
                },
                {
                  chassis: "Four-Wheel Dual-Drive Differential Chassis",
                  projects: [
                    "Four-Wheel Dual-Drive Differential Gripper Robot",
                    "Four-Wheel Dual-Drive Differential 2-DOF Transport Robot",
                    "Four-Wheel Dual-Drive Differential 3-DOF Transport Robot",
                    "Four-Wheel Dual-Drive Differential 4-DOF Transport Robot"
                  ]
                },
                {
                  chassis: "Four-Wheel Four-Drive Differential Chassis",
                  projects: [
                    "Four-Wheel Four-Drive Differential Gripper Robot",
                    "Four-Wheel Four-Drive Differential 2-DOF Transport Robot",
                    "Four-Wheel Four-Drive Differential 3-DOF Transport Robot",
                    "Four-Wheel Four-Drive Differential 4-DOF Transport Robot"
                  ]
                },
                {
                  chassis: "Four-Wheel Four-Drive Mecanum Omnidirectional Chassis",
                  projects: [
                    "Four-Wheel Four-Drive Mecanum Omnidirectional Gripper Robot",
                    "Four-Wheel Four-Drive Mecanum Omnidirectional 2-DOF Transport Robot",
                    "Four-Wheel Four-Drive Mecanum Omnidirectional 3-DOF Transport Robot",
                    "Four-Wheel Four-Drive Mecanum Omnidirectional 4-DOF Transport Robot"
                  ]
                }
              ]
            }
          },
          specs: [
            "Robot Modules: 7 types (differential wheel, universal wheel, steering wheel, omnidirectional mecanum wheel, gripper, swing, turntable)",
            "Robot Chassis: 5 types (three-wheel dual-drive universal differential, three-wheel dual-drive front-wheel steering, four-wheel dual-drive differential, four-wheel four-drive differential, four-wheel four-drive mecanum omnidirectional)",
            "Robotic Arm Configurations: 3 types (2-DOF gimbal, 3-DOF robotic arm, 4-DOF robotic arm)",
            "Composite Robots: 20 types (various combinations of chassis + robotic arms)",
            "Experimental Projects: 32 basic experiments + 20 extension projects",
            "DC Motor: Reduction ratio 48",
            "Servo: Torque 30kgf.cm"
          ]
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
