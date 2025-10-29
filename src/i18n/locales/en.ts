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
                image: "/images/products/gx-mat-09s/hero.png",
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
            description:
              "The controller supports common programming language inputs, including block-based, C++, Python, and other programming languages. It provides rich interfaces, including 6 DC motor ports, 8 servo ports, 4 ultrasonic ports, 4 line-tracking sensor ports, 4 expansion I/O sensor ports, USB serial port, etc. The controller adopts stackable design with reserved expansion dock connectors, making it easy for users to connect other electronic hardware to the controller.",
            images: [
              {
                src: "/images/products/ubot-mr20/controller/controller-overview.png",
                alt: "MR20 controller stack with rich IO ports",
                caption: "MR20 controller showing DC motor, servo, and sensor expansion ports",
              },
            ],
          },
          softwareConfig: {
            description:
              "The software integrates OpenBlock programming environment, supporting both block-based programming and C++/Python code programming. It can be used for software programming as well as hardware device programming, supporting hardware code generation and compilation download functions, and also supporting real-time operation mode through real-time communication with hardware devices.",
            ecosystem:
              "OpenBlock has a complete hardware ecosystem, supporting popular maker hardware platforms on the market, including Arduino, MicroPython, and ESP32, allowing users to expand freely.",
            images: [
              {
                src: "/images/products/ubot-mr20/software/openblock-interface-1.jpg",
                alt: "OpenBlock programming workspace for MR20",
                caption: "OpenBlock workspace for drag-and-drop robotics logic",
              },
              {
                src: "/images/products/ubot-mr20/software/openblock-interface-2.jpg",
                alt: "OpenBlock device connection interface",
                caption: "Device management panel for C++, Python, and hardware flashing",
              },
            ],
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
          subtitle: "Enhanced Embodied Hybrid Robotics Design Suite",
          model: "GX-MAT-09S",
          image: "/images/products/gx-mat-09s/hero.png",
          overview:
            "Embodied robotics blends intelligent decision-making, rich perception, and powerful actuation so robots can perform in unstructured service and household environments. The first wave of deployable embodiments is converging on mobile hybrid robots.\n\nGX-MAT-09S dissects representative mobile embodied robots with a modular architecture that exposes mechanical structure, drive systems, sensing pipelines, and intelligent control. Learners can design, assemble, and tune 11 mobile chassis, 7 manipulator variants, and 88 composite robots using the included part library.\n\nThe platform incorporates all essential perception units—AI vision, monocular imaging, AI speech, posture IMU, obstacle avoidance, line tracking, and lidar navigation—delivering end-to-end situational awareness.\n\nA three-tier controller stack (Arduino, STM32, and Horizon RDK X5 with Ubuntu + ROS and 10 TOPS compute) supports classroom instruction, research, prototyping, and competition preparation.",
          highlights: [
            "11 modular chassis + 7 manipulators → 88 hybrid robot builds",
            "Full-stack sensing: AI vision, speech, IMU, line tracking, lidar",
            "Arduino + STM32 + Horizon RDK X5 (10 TOPS) controller stack",
          ],
          applicable: "University robotics labs, research programs, and competition teams",
          features: [
            {
              title: "Embodied System Deconstruction",
              content:
                "Breaks down mobile hybrid robots into structure, drive, sensing, and control layers, revealing how embodied robots achieve perception–decision–action loops."
            },
            {
              title: "Modular Learning Path",
              content:
                "Provides 11 chassis, 7 manipulators, and 88 composite forms so learners can practice design, assembly, calibration, and control across complete projects."
            },
            {
              title: "Full-Stack Perception",
              content:
                "Integrates AI vision, monocular imaging, voice interaction, posture IMU, obstacle avoidance, line tracking, and navigation lidar to cover embodied sensing scenarios."
            },
            {
              title: "Multi-Layer Controller Stack",
              content:
                "Arduino enables graphical/C++ entry, STM32 addresses professional MCU development, and Horizon RDK X5 (Ubuntu + ROS, 10 TOPS) powers advanced embodied applications."
            },
            {
              title: "Curriculum & Competition Coverage",
              content:
                "Supports courses such as Mechanics, Sensors, MCU, Robotics, ROS, and Mobile Navigation, and aligns with national collegiate robotics innovation and engineering practice contests."
            }
          ],
          sampleCases: {
            description:
              "The suite ships with canonical embodied chassis and manipulators so learners can rapidly assemble 88 hybrid robots spanning differential, holonomic, steering, and dual-arm systems.",
            chassis: [
              { name: "Tri-wheel dual-drive differential chassis", image: "" },
              { name: "Tri-wheel front-steering dual-drive chassis", image: "" },
              { name: "Tri-wheel tri-drive holonomic chassis (Option A)", image: "" },
              { name: "Tri-wheel tri-drive holonomic chassis (Option B)", image: "" },
              { name: "Four-wheel dual-drive differential chassis", image: "" },
              { name: "Four-wheel four-drive differential chassis", image: "" },
              { name: "Four-wheel four-drive Foley-wheel holonomic chassis", image: "" },
              { name: "Four-wheel four-drive mecanum chassis", image: "" },
              { name: "Four-wheel eight-drive steering chassis", image: "" },
              { name: "Six-wheel dual-drive differential chassis", image: "" },
              { name: "Six-wheel six-drive differential chassis", image: "" }
            ],
            arms: [
              { name: "2-DOF gimbal", image: "" },
              { name: "3-DOF serial manipulator", image: "" },
              { name: "4-DOF serial manipulator", image: "" },
              { name: "4-DOF SCARA manipulator", image: "" },
              { name: "5-DOF serial manipulator", image: "" },
              { name: "6-DOF serial manipulator (Option A)", image: "" },
              { name: "6-DOF serial manipulator (Option B)", image: "" },
              { name: "8-DOF dual-arm manipulator", image: "" }
            ],
            compositeGroups: [
              {
                title: "Based on the dual-drive tri-wheel differential chassis",
                robots: [
                  "Tri-wheel differential + gimbal composite robot",
                  "Tri-wheel differential + SCARA composite robot",
                  "Tri-wheel differential + six-axis composite robot"
                ]
              },
              {
                title: "Based on the dual-drive four-wheel differential chassis",
                robots: [
                  "Four-wheel differential + gimbal composite robot",
                  "Four-wheel differential + 4-axis composite robot",
                  "Four-wheel differential + 5-axis composite robot",
                  "Four-wheel differential + 6-axis composite robot",
                  "Four-wheel differential + SCARA composite robot",
                  "Four-wheel differential + dual-arm composite robot",
                  "Four-wheel differential + dual-arm lift composite robot"
                ]
              },
              {
                title: "Based on the dual-drive six-wheel differential chassis",
                robots: [
                  "Six-wheel differential + gimbal composite robot",
                  "Six-wheel differential + 4-axis composite robot",
                  "Six-wheel differential + 5-axis composite robot",
                  "Six-wheel differential + 6-axis composite robot",
                  "Six-wheel differential + SCARA composite robot",
                  "Six-wheel differential + dual-arm composite robot",
                  "Six-wheel differential + dual-arm lift composite robot"
                ]
              },
              {
                title: "Based on the tri-wheel holonomic chassis",
                robots: [
                  "Tri-wheel holonomic + gimbal composite robot",
                  "Tri-wheel holonomic + 4-axis composite robot",
                  "Tri-wheel holonomic + 5-axis composite robot",
                  "Tri-wheel holonomic + 6-axis composite robot",
                  "Tri-wheel holonomic + SCARA composite robot",
                  "Tri-wheel holonomic + dual-arm composite robot",
                  "Tri-wheel holonomic + dual-arm lift composite robot"
                ]
              },
              {
                title: "Based on the four-drive differential chassis",
                robots: [
                  "Four-drive differential + gimbal composite robot",
                  "Four-drive differential + 4-axis composite robot",
                  "Four-drive differential + 5-axis composite robot",
                  "Four-drive differential + 6-axis composite robot",
                  "Four-drive differential + SCARA composite robot",
                  "Four-drive differential + dual-arm composite robot",
                  "Four-drive differential + dual-arm lift composite robot"
                ]
              },
              {
                title: "Based on the four-wheel holonomic chassis",
                robots: [
                  "Four-wheel holonomic + gimbal composite robot",
                  "Four-wheel holonomic + 4-axis composite robot",
                  "Four-wheel holonomic + 5-axis composite robot",
                  "Four-wheel holonomic + 6-axis composite robot",
                  "Four-wheel holonomic + SCARA composite robot",
                  "Four-wheel holonomic + dual-arm composite robot",
                  "Four-wheel holonomic + dual-arm lift composite robot"
                ]
              },
              {
                title: "Based on the four-wheel steering chassis",
                robots: [
                  "Four-wheel steering + gimbal composite robot",
                  "Four-wheel steering + 4-axis composite robot",
                  "Four-wheel steering + SCARA composite robot"
                ]
              }
            ]
          },
          sensorConfig: {
            description:
              "Delivers the sensing stack required by embodied robots, enabling perception, interaction, navigation, and line tracking within a single platform.",
            list: [
              "AI vision camera",
              "Monocular imaging module",
              "AI speech recognition module",
              "Posture IMU sensor",
              "Obstacle avoidance / line tracking array",
              "Navigation-grade lidar"
            ]
          },
          controllerConfig: {
            description:
              "The control stack combines Arduino for graphical/C++ entry, STM32 for professional MCU development, and Horizon RDK X5 (Ubuntu + ROS, 10 TOPS) for advanced embodied intelligence workloads.",
            images: [
              {
                src: "/images/products/gx-mat-09s/controller/arduino-mega2560.png",
                alt: "Arduino Mega 2560 controller board",
                caption: "Arduino Mega 2560: rapid entry via graphical and C++ programming",
              },
              {
                src: "/images/products/gx-mat-09s/controller/stm32f407.jpg",
                alt: "STM32F407 development board",
                caption: "STM32F407: professional MCU development and embedded control",
              },
              {
                src: "/images/products/gx-mat-09s/controller/rdk-x5.png",
                alt: "Horizon RDK X5 compute module",
                caption: "Horizon RDK X5: Ubuntu + ROS platform with 10 TOPS AI compute",
              },
            ],
          },
          softwareConfig: {
            description:
              "Supplies Arduino IDE, STM32 toolchains, and Ubuntu/ROS environments with sample projects, supporting development from hardware drivers to AI/ROS applications.",
            ecosystem:
              "Compatible with Arduino libraries, HAL/FreeRTOS, ROS/MoveIt, OpenCV, YOLO, speech SDKs, and other open ecosystems so coursework and research assets integrate quickly."
          },
          experiments: {
            summary:
              "The lab program spans microcontrollers, sensors, embedded Linux, computer vision, mobile chassis, manipulators, hybrid robots, ROS, and navigation, forming a complete learning path from entry to advanced projects.",
            sections: [
              {
                title: "Microcontroller Integration",
                description: "Covers Arduino and STM32 from board familiarization to EEPROM access and library management.",
                items: [
                  { name: "Arduino board familiarization", desc: "Understand chip specs, interfaces, memory, and circuit layout; configure the development environment." },
                  { name: "STM32 board familiarization", desc: "Review MCU performance, pins, circuitry, and toolchain setup." },
                  { name: "LED blinking", desc: "Use digitalWrite() and delay() to practice digital output control." },
                  { name: "Analog input monitoring", desc: "Read and visualize analog signals with analogRead()/analogWrite()/Serial APIs." },
                  { name: "Serial communication", desc: "Configure Serial.begin() and implement data transmission and logging." },
                  { name: "EEPROM read", desc: "Call EEPROM.read() to retrieve persistent data." },
                  { name: "EEPROM clear", desc: "Use EEPROM.write() to erase stored data safely." },
                  { name: "EEPROM write", desc: "Implement EEPROM.write() to persist configuration data." },
                  { name: "Library installation", desc: "Install MsTimer2 and use timers to rebuild the Blink example." }
                ]
              },
              {
                title: "Motor Integration",
                description: "Focuses on DC motors and servos, including encoder feedback and PID speed control.",
                items: [
                  { name: "Controlling DC motors", desc: "Master digital drive methods for brushed DC motors." },
                  { name: "Controlling encoded DC motors", desc: "Capture encoder data, understand PID theory, and implement closed-loop speed control." },
                  { name: "Servo control", desc: "Operate servos with myservo.attach()/write() for precise positioning." }
                ]
              },
              {
                title: "Sensor Projects",
                description: "Covers TTL, line tracking, ultrasonic, IMU, speech, and AI vision sensors.",
                items: [
                  { name: "TTL sensor integration", desc: "Read sensor parameters and apply them in code." },
                  { name: "Four-channel line tracking", desc: "Implement autonomous line following." },
                  { name: "Ultrasonic ranging", desc: "Understand measurement formulas and adapt algorithms to real environments." },
                  { name: "Gyroscope sensing", desc: "Use MPU6050.cpp to obtain posture data." },
                  { name: "Speech recognition sensor", desc: "Trigger commands via HBR640.h speech recognition APIs." },
                  { name: "AI vision sensor", desc: "Display live video and run AI inference with the camera module." }
                ]
              },
              {
                title: "Embedded Linux Projects",
                description: "Uses Ubuntu + Python to practice GPIO, data processing, multithreading, and web communication.",
                items: [
                  { name: "System onboarding", desc: "Install Ubuntu, manage SSH access, and practice file-system commands." },
                  { name: "GPIO control", desc: "Use Python to drive LEDs and buttons with standard GPIO libraries." },
                  { name: "Sensor data acquisition", desc: "Collect, filter, and visualize data from multiple sensors via GUI." },
                  { name: "Networking & web services", desc: "Build socket communications and publish data with a simple web server." },
                  { name: "Multithreading", desc: "Apply Python threading for concurrent acquisition and processing with proper synchronization." }
                ]
              },
              {
                title: "Computer Vision Projects",
                description: "Leveraging RDK X5 and camera modules for color, shape, QR, tracking, detection, and dataset workflows.",
                items: [
                  { name: "Color recognition", desc: "Use OpenCV to convert color spaces and perform sorting/tracking." },
                  { name: "Shape recognition", desc: "Apply edge detection and contour extraction for shape classification." },
                  { name: "QR code recognition", desc: "Decode QR codes with OpenCV or zbar and handle metadata." },
                  { name: "Gimbal tracking of geometric shapes", desc: "Capture images and drive the gimbal to track selected shapes." },
                  { name: "Robot tracking of colored targets", desc: "Detect colored objects and command the robot to follow autonomously." },
                  { name: "Face recognition", desc: "Detect and recognize faces with OpenCV/dlib for access control scenarios." },
                  { name: "Vision-based line following", desc: "Detect black lines in camera frames and guide the robot along the path." },
                  { name: "YOLO deployment", desc: "Deploy YOLO for real-time multi-object detection and classification." },
                  { name: "Dataset annotation", desc: "Create custom datasets with LabelImg/RectLabel to support training." },
                  { name: "Fruit recognition", desc: "Train a deep-learning model and deploy it on RDK X5 for real-time fruit detection." },
                  { name: "Manipulator pick-and-place", desc: "Combine vision and manipulator control to grasp and relocate objects." }
                ]
              },
              {
                title: "Mobile Chassis Projects",
                description: "Covers assembly, drive control, and odometry for differential, holonomic, Foley, mecanum, and steering chassis.",
                items: [
                  { name: "Tri-wheel differential chassis", desc: "Assembly, drive control, and odometry tuning." },
                  { name: "Four-wheel rear differential chassis", desc: "Assembly, drive control, and odometry tuning." },
                  { name: "Six-wheel differential chassis", desc: "Assembly, drive control, and odometry tuning." },
                  { name: "Tri-wheel Foley-wheel chassis", desc: "Assembly, drive control, and odometry tuning." },
                  { name: "Four-drive differential chassis", desc: "Assembly, drive control, and odometry tuning." },
                  { name: "Four-wheel Foley-wheel chassis", desc: "Assembly, drive control, and odometry tuning." },
                  { name: "Four-wheel mecanum chassis", desc: "Assembly, drive control, and odometry tuning." },
                  { name: "Four-drive Foley+mecanum chassis", desc: "Assembly, drive control, and odometry tuning." },
                  { name: "Four-drive independent steering chassis", desc: "Assembly, steering control, and odometry tuning." }
                ]
              },
              {
                title: "Manipulator Projects",
                description: "From serial arms to SCARA and dual-arm systems, covering assembly and kinematics.",
                items: [
                  { name: "4-DOF serial manipulator", desc: "Assembly, drive control, and kinematic planning." },
                  { name: "5-DOF serial manipulator", desc: "Assembly, drive control, and kinematic planning." },
                  { name: "6-axis serial manipulator", desc: "Assembly, drive control, and kinematic planning." },
                  { name: "SCARA manipulator", desc: "Assembly, drive control, and kinematic planning." },
                  { name: "Dual-arm robot", desc: "Assembly, coordinated drive control, and kinematic planning." },
                  { name: "Elevating dual-arm robot", desc: "Assembly, lift control, and coordinated kinematics." }
                ]
              },
              {
                title: "Hybrid Robot Projects",
                description: "Combine chassis and manipulators to build application-ready embodied robots.",
                items: [
                  { name: "Tri-wheel differential hybrids", desc: "Gimbal, SCARA, and six-axis composite robots." },
                  { name: "Four-wheel differential hybrids", desc: "Gimbal, 4/5/6-axis, SCARA, dual-arm, and dual-arm lift variants." },
                  { name: "Six-wheel differential hybrids", desc: "Gimbal, 4/5/6-axis, SCARA, dual-arm, and dual-arm lift variants." },
                  { name: "Tri-wheel holonomic hybrids", desc: "Gimbal, 4/5/6-axis, SCARA, dual-arm, and dual-arm lift variants." },
                  { name: "Four-drive differential hybrids", desc: "Gimbal, 4/5/6-axis, SCARA, dual-arm, and dual-arm lift variants." },
                  { name: "Four-wheel holonomic hybrids", desc: "Gimbal, 4/5/6-axis, SCARA, dual-arm, and dual-arm lift variants." },
                  { name: "Four-wheel steering hybrids", desc: "Gimbal, 4-axis, and SCARA composite robots." }
                ]
              },
              {
                title: "Robot Operating System (ROS)",
                description: "Guides learners through ROS onboarding, package development, and MoveIt motion control.",
                items: [
                  { name: "ROS quickstart", desc: "Explore file structure and control turtlesim and mobile robots via topics, services, and parameters." },
                  { name: "Building and porting ROS packages", desc: "Create packages, configure environments, and implement keyboard teleoperation." },
                  { name: "URDF models & MoveIt control", desc: "Build URDF models, visualize them in Rviz, and command manipulators with MoveIt." }
                ]
              },
              {
                title: "Mobile Navigation & Localization",
                description: "Covers Cartographer, Hector, and Gmapping pipelines from theory to full-parameter tuning.",
                items: [
                  { name: "Rapid navigation practice", desc: "Operate Cartographer, Hector, and Gmapping workflows and compare their use cases." },
                  { name: "Cartographer mapping", desc: "Explain the theory, unpack the package, configure parameters, and tune the full workflow." },
                  { name: "Hector mapping", desc: "Break down the package structure, configure parameters, and complete full tuning." },
                  { name: "Gmapping mapping", desc: "Review theory, configure the package, and generate maps with full-parameter tuning." }
                ]
              }
            ]
          },
          specs: [
            "Chassis library: 11 mobile platforms covering differential, holonomic, Foley, mecanum, and steering forms",
            "Manipulator library: 7 standard arms with expansion to an 8-DOF dual-arm system",
            "Composite robots: 63+ embodied application configurations spanning service, research, and competition scenarios",
            "Sensing stack: AI vision, speech recognition, IMU, line tracking/obstacle avoidance, and navigation lidar",
            "Control architecture: Arduino + STM32 + Horizon RDK X5 (10 TOPS) collaborative stack",
            "Teaching & competitions: Supports Robotics, ROS, Mobile Navigation courses and major collegiate robotics challenges"
          ],
        },
        "rai-p4": {
          name: "Embodied Robot Task Planning Training Platform RAI-P4",
          model: "RAI-P4",
          image: "/images/video/video.jpg",
          overview:
            "Integrated AI voice/vision with a 4-DOF arm and ROS2 support, ideal for planning and perception teaching.",
          highlights: ["AI voice/vision", "4-DOF arm", "ROS2 support"],
          applicable: "LLM apps, computer vision, ROS",
          configuration: [
            "4-DOF robotic arm (reach ≥ 260 mm, payload ≥ 300 g)",
            "2-DOF gimbal with 720p camera",
            "RDK X5 board (10 TOPS)",
          ],
          experiments: [
            "48 class hours: robotic arm control (kinematics / interpolation)",
            "AI vision (YOLO / face tracking)",
            "LLM applications (ASR / LLM / TTS)",
            "ROS2 development",
          ],
          specs: [
            "AI compute board delivering ≥ 9 TOPS performance",
            "Controller supports 8-channel servo drive",
          ],
        },
        "rai-m4": {
          name: "Embodied Composite Robot System Design Training Platform RAI-M4",
          model: "RAI-M4",
          image: "/images/video/video.jpg",
          overview:
            "Mecanum omni-directional chassis with a 4-axis arm and LLM connectivity for system design and navigation.",
          highlights: ["Mecanum omni chassis", "4-axis arm", "LLM connectivity"],
          applicable: "Mobile navigation, LLM deployment",
          configuration: [
            "Four-wheel mecanum chassis (0.5 m/s speed, 10 kg payload)",
            "4-axis robotic arm (reach > 220 mm, payload ≥ 200 g)",
            "LiDAR (0.12–8 m detection range)",
            "2 MP camera",
          ],
          experiments: [
            "Machine vision (OpenCV / YOLO / multimodal detection)",
            "LLM deployment (voice dialogue / task planning)",
            "ROS navigation (mapping / obstacle avoidance)",
          ],
          specs: [
            "Edge controller RDK X5 (10 TOPS compute)",
            "YOLOv8 face detection at 100 fps (reference metric)",
          ],
        },
        "rai-q2": {
          name: "Embodied Vision Perception & Decision Training Platform RAI-Q2",
          model: "RAI-Q2",
          image: "/images/video/video.jpg",
          overview:
            "Depth camera and precision motion stages supporting OpenCV/YOLO/VLM for vision and ML instruction.",
          highlights: ["Depth camera", "Precision stages", "OpenCV/YOLO/VLM"],
          applicable: "Computer vision, machine learning",
          configuration: [
            "Depth camera (0.6–8 m range, 1280×720@90 fps)",
            "High-precision turntable (switchable speed/position modes)",
            "22-inch display",
          ],
          experiments: [
            "OpenCV vision (color / shape recognition)",
            "YOLO deployment (face detection / tracking)",
            "Depth sensing (3D modeling)",
            "LLM multimodal interface deployment",
          ],
          specs: [
            "Edge controller RDK X5 (10 TOPS compute)",
            "Turntable maximum speed 40 rpm",
          ],
        },
        "uni-wr2": {
          name: "Portable ROS Navigation Learning Platform UNI-WR2",
          model: "UNI-WR2",
          image: "/images/video/video.jpg",
          overview:
            "A compact desktop ROS navigation platform enabling quick setup for lab exercises.",
          highlights: ["<13cm compact", "60×60cm desktop", "3 navigation modes"],
          applicable: "ROS, mobile robotics",
          configuration: [
            "Full-metal chassis",
            "Raspberry Pi controller (preloaded with ROS)",
            "LiDAR (0.1–12 m detection range)",
            "7-bit encoder motors",
          ],
          experiments: [
            "24 class hours: ROS fundamentals (package porting)",
            "SLAM deployment (full-parameter tuning across three navigation modes)",
            "Kinematic control (PID speed control)",
          ],
          specs: [
            "Top speed 0.16 m/s",
            "Positioning accuracy < 5 mm within 1 m; straight-line deviation < 1 cm over 1 m",
          ],
        },
        "alo-le4": {
          name: "Embodied Robot Manipulation Planning Training Platform ALO-LE4",
          model: "ALO-LE4",
          image: "/images/video/video.jpg",
          overview:
            "Dual 5-DOF arms in master-follower mode with adjustable lighting, supporting ACT and imitation learning/end-to-end control research.",
          highlights: ["Two 5-DOF arms", "ACT architecture", "Adjustable lighting"],
          applicable: "Imitation learning, end-to-end control",
          configuration: [
            "Two 5-DOF robotic arms (master-follower)",
            "Two cameras (top + side)",
            "Adjustable environment lighting",
            "13-inch display",
          ],
          experiments: [
            "End-to-end deployment (environment setup, Lerobot framework installation, model training / deployment)",
            "AI vision (YOLO / robotic arm visual handling)",
            "Robotic arm control (kinematics / interpolation)",
          ],
          specs: [
            "Arms support motion data capture",
            "Cameras enable object color / position detection",
            "Lighting simulates diverse illumination conditions",
          ],
        },
      },
      supportResources: {
        title: "Common Support Resources",
        items: [
          "Experiment tutorials: detailed steps, principle breakdowns, and key takeaways",
          "Source code: complete program files (with Chinese comments) and supporting libraries",
          "Structural drawings: 3D robot configuration models (STP format)",
          "Hardware assurance: modular parts with IDE support (Keil5, Arduino IDE, VS Code, etc.)",
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
