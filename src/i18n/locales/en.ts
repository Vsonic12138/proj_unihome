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
          { locale: "zh", label: "中文" },
          { locale: "en", label: "English" },
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
      sectionOne: {
        title: "About UNI Robotics",
        description:
          "UNI Robotics Technology (Beijing) Co., Ltd. is located in the Winter Olympics Plaza at Shougang Park, Shijingshan District, Beijing, partnering with Shougang Group to build a world-leading embodied intelligence innovation platform. We focus on applying embodied intelligent robotics technology to teaching and research, continuously exploring practical application scenarios, and providing integrated hardware, software, and curriculum robotics products for universities, vocational colleges, and K12 institutions.",
        highlights: [
          "Embodied Intelligent Robotics",
          "Industry-Academia-Research Integration",
          "Progressive Learning System",
          "Affordable Intelligent Products",
          "Open-Source Community",
          "Complete Education Solutions",
        ],
        image: {
          src: "/images/about/company-mascot.png",
          alt: "UNI Robotics Products",
        },
      },
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
          "Enabling everyone to joyfully connect with the intelligent future!",
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
        categories: [
          {
            id: "pcb",
            title: "Hardware Open Source (PCB)",
            description: "Open-source hardware design solutions for rapid prototyping",
            projects: [
              {
                id: 9,
                name: "Arduino MEGA 2560 Expansion Board",
                description:
                  "Compatible with Arduino Mega 2560 and Arduino DUE, this expansion board can drive DC encoder motors, servos, and stepper motors. It features multiple communication interfaces and sensor ports, supporting 8.4V-12V wide voltage input.",
                link: "https://x.jlc.com/platform/detail/278a899ed5834980b6136bf73e044076?type=1&share=jlc1742868845686",
                tags: ["Arduino", "Expansion Board", "Multi-function"],
              },
              {
                id: 10,
                name: "Universal 3S Battery Box with Overcharge/Discharge Protection",
                description:
                  "This battery box includes battery protection and fast charging functionality, integrated with 5V/5A, 6V/5A, and 7.4V/5A power outputs. Easily applicable to robot power systems, meeting various voltage requirements.",
                link: "https://x.jlc.com/platform/detail/d5159e0024954a4488a0e972ce1a30bc?type=1",
                tags: ["Power Management", "Battery Protection", "Fast Charging"],
              },
              {
                id: 11,
                name: "ESP32 Controller Board + Driver Expansion Board",
                description:
                  "Using ESP32 as the main controller, includes DC motors, PWM servos, ultrasonic sensors, and line-following sensor interfaces. Features 2S lithium battery charging circuit and IIC, SPI, UART communication interfaces. Supports Openblock graphical programming.",
                link: "https://x.jlc.com/platform/detail/89503d0ca5d04ca1906eb1bc43d2d255?type=1",
                tags: ["ESP32", "Graphical Programming", "Multi-sensor"],
              },
              {
                id: 12,
                name: "Raspberry Pi Expansion for Encoder Motors + LiDAR + UART",
                description:
                  "Dual DC encoder motor driver board for Raspberry Pi 2W, supports 2S lithium battery (18650) power supply with 15W charging function. Can connect two N20 encoder motors, suitable for two-wheel robots.",
                link: "https://x.jlc.com/platform/detail/9784dfa329c8458abe5ac60397b2178d?type=1",
                tags: ["Raspberry Pi", "Motor Driver", "LiDAR"],
              },
              {
                id: 13,
                name: "STM32-based Compound Robot Development Board",
                description:
                  "Using STM32F407IGT6 as the main chip, supports DC encoder motors, PWM servos, stepper motors, and multiple communication devices (IIC, SPI, UART). Includes ultrasonic and four-way line-following sensor interfaces. Supports 8.4V-12V wide voltage input. Ideal for ROS robot underlying driver applications.",
                link: "https://x.jlc.com/platform/detail/ac14aed55fe9438391c3f26cce0b2377",
                tags: ["STM32", "ROS", "Compound Robot"],
              },
            ],
          },
          {
            id: "code",
            title: "Software Open Source (Code)",
            description: "Open-source code libraries and sample projects to accelerate learning and development",
            projects: [
              {
                id: 14,
                name: "Arduino Mega2560 Compound Robot Development Library",
                description:
                  "Provides hardware driver libraries and application source code, covering DC motor PWM to PID control, servo control, stepper motor control, 7 chassis structure designs, 2-6 DOF robotic arms, sensor applications (ultrasonic, line-following, voice, AI vision, PS2 controller, gyroscope), and comprehensive robot applications (obstacle avoidance, line tracking, voice control, vision recognition, remote control, attitude control).",
                link: "https://gitee.com/little-wooden-man/mega2560_-library",
                tags: ["Arduino", "Driver Library", "Comprehensive"],
              },
              {
                id: 15,
                name: "ESP32 + Openblock Graphical Robot Source Code",
                description:
                  "Includes ESP32 development board schematics, electrical interface diagrams, and block programming applications: motor drive experiments (PWM control for motors, servos, grippers), chassis motion control (forward, backward, left/right translation, rotation), and robot perception control experiments (obstacle avoidance, line tracking).",
                link: "https://gitee.com/little-wooden-man/mr20",
                tags: ["ESP32", "Graphical Programming", "Educational"],
              },
              {
                id: 16,
                name: "STM32 + STM32CubeMX Robot Development Source Code",
                description:
                  "Includes STM32 development board schematics, electrical interface diagrams, and complete project source code covering chassis, robotic arms, and integrated projects. Supports DC motor PWM to PID control, servo and gripper control, stepper motor control, 7 chassis structures, 2-4 DOF robotic arms, sensor applications, and comprehensive robot applications.",
                link: "https://gitee.com/little-wooden-man/uni_-stm32/tree/master/",
                tags: ["STM32", "CubeMX", "Engineering"],
              },
              {
                id: 17,
                name: "LLM API + Vision + VLM + Robotic Arm Source Code",
                description:
                  "RAI-P4 Embodied Robot Task Planning Comprehensive Training Platform integrates AI technologies including ASR (Automatic Speech Recognition), LLM (Large Language Model), TTS (Text-to-Speech), and computer vision (YOLO face/geometric shape detection). Provides a complete robot control system learning environment with architecture design documents, deployment documentation, implementation source code, and robotic arm control experiments.",
                link: "https://gitee.com/BigYellow12138/RAI-P4",
                tags: ["LLM", "Embodied AI", "AI Integration"],
              },
              {
                id: 18,
                name: "Competition Project: Logistics Transport Vehicle",
                description:
                  "Modular decomposition with complete source code, including chassis structure design and driver, collection device control (gripper), robot point-to-point transport, remote control (gamepad), ultrasonic obstacle avoidance, multi-color ball recognition, object tracking, positioning transport, and serial communication for multi-color target data transmission.",
                link: "https://gitee.com/little-wooden-man/Logistics_car",
                tags: ["Competition", "Logistics", "Vision Recognition"],
              },
              {
                id: 19,
                name: "Competition Project: Smart Rescue Vehicle",
                description:
                  "Modular decomposition with complete source code, including chassis/linear module/robotic arm structure design and driver, LCD display usage, QR code recognition and data acquisition, workpiece color recognition, AI model vision recognition workflow (dataset capture, model training, YOLO recognition implementation), lower computer data communication, and overall control and debugging.",
                link: "https://gitee.com/little-wooden-man/unismart-rescue-vehicle",
                tags: ["Competition", "Smart Rescue", "AI Vision"],
              },
              {
                id: 20,
                name: "Balancing Car Source Code",
                description:
                  "Four-wheel Mecanum wheel car and two-wheel self-balancing car PID control modular decomposition, providing complete control algorithm implementation.",
                link: "https://gitee.com/little-wooden-man/balancing_-car",
                tags: ["Balancing Car", "PID Control", "Algorithm"],
              },
              {
                id: 21,
                name: "Arduino + Openblock Graphical Robot Development",
                description:
                  "Based on Arduino Mega2560 and new Mega2560 expansion board, using Openblock+Arduino mode for motor driver modules, chassis motion control, and robot perception control experiments. Provides demo examples, engineering deployment, source code, and operation documentation.",
                link: "https://gitee.com/xs24/openblockProject2506",
                tags: ["Arduino", "Openblock", "Teaching Resources"],
              },
            ],
          },
        ],
      },
      customSolutions: {
        title: "Custom Collaboration",
        description:
          "Supporting ODM and JDM cooperation modes for universities, vocational schools, and K12 educational robotics industry!",
        cooperationModes: [
          {
            id: "odm",
            title: "ODM",
            subtitle: "Original Design Manufacturing",
            description:
              "Customize exclusive products for you based on M-series and P-series technologies",
            icon: "design",
          },
          {
            id: "jdm",
            title: "JDM",
            subtitle: "Joint Design Manufacturing",
            description:
              "We excel at building stable embodied robot hardware platforms and can co-develop embodied robot products with you.",
            icon: "collaboration",
          },
        ],
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
                image: "/images/products/ubot-mr20/ubot-mr20-hero.jpg",
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
                image: "/images/products/rai-p4/rai-p4-hero.png",
                brief:
                  "Desktop embodied-intelligence lab integrating AI voice/vision, a 4-DOF arm, and ROS2 for plan–sense–act experiments.",
              },
              {
                slug: "uni-wr2",
                name: "Portable ROS Navigation Learning Platform UNI-WR2",
                model: "UNI-WR2",
                image: "/images/products/uni-wr2/uni-wr2-hero.png",
                brief:
                  "Sub-13 cm portable ROS robot for 60×60 cm desktop SLAM; five-step engineering workflow with Catographer/Hector/Gmapping.",
              },
              {
                slug: "rai-q2",
                name: "Embodied Vision Perception & Decision Training Platform RAI-Q2",
                model: "RAI-Q2",
                image: "/images/products/rai-q2/hero.png",
                brief:
                  "Depth camera + precision rotary/lift stages; supports OpenCV/YOLO/VLM. For vision and ML courses.",
              },
              {
                slug: "rai-m4",
                name: "Embodied Composite Robot System Design Training Platform RAI-M4",
                model: "RAI-M4",
                image: "/images/products/rai-m4/front-view.png",
                brief:
                  "Mecanum omni chassis + 4-axis arm; connects DeepSeek/Qwen. For mobile navigation and LLM deployment.",
              },
              {
                slug: "alo-le4",
                name: "Embodied Robot Manipulation Planning Training Platform ALO-LE4",
                model: "ALO-LE4",
                image: "/images/products/alo-le4/front-view.png",
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
          image: "/images/products/ubot-mr20/ubot-mr20-hero.jpg",
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
          subtitle: "Embodied Robotics Task Planning Comprehensive Training Platform",
          model: "RAI-P4",
          image: "/images/products/rai-p4/rai-p4-hero.png",
          overview:
            "RAI-P4 is an embodied intelligence training platform that tightly couples AI technologies with robotics. It integrates AI speech, AI vision, a representative 4-DOF manipulator, sensors commonly used in embodied robots, and an AI edge controller so learners can deploy and debug intelligent algorithms on real hardware—bridging theoretical coursework with comprehensive practice.\n\nThe curriculum follows a plan–perceive–act workflow, covering voice dialogue, task semantic understanding, vision-based pan-tilt tracking, vision-guided arm handling, manipulator trajectory control, AI vision fruit detection, and more.",
          applicable:
            "Ideal for university programs in artificial intelligence, robotics, automation, and computer science that span LLM applications, computer vision, machine learning, deep learning, embedded development, sensing and control, ROS, robotics, simulation, and intelligent system integration.",
          highlights: [
            "Unified platform for AI speech, AI vision, and manipulator control",
            "Desktop-friendly footprint (60 cm × 60 cm) for rapid deployment",
            "Progressive path supporting 4-DOF through 6-DOF manipulators"
          ],
          features: [
            {
              title: "Integrated AI and robotics stack",
              content:
                "Built around the requirements of an intelligent manipulator, the platform combines AI speech interaction, AI vision recognition, an AI edge board, and sensors such as color recognition and IMU modules—supporting the full chain from perception to decision and execution."
            },
            {
              title: "Ready-to-run teaching deployment",
              content:
                "Hardware and software are pre-aligned at the factory. No extra PCs or tooling are needed; a 60 cm × 60 cm desktop is enough to launch experiments in labs, innovation studios, or mobile workshops."
            },
            {
              title: "Progressive manipulator training",
              content:
                "Starts with a 4-DOF serial manipulator and scales to typical 6-DOF configurations. Complementary exercises cover kinematics, motion control, simulation, and ROS so students can advance step by step."
            }
          ],
          sampleCases: {
            description:
              "Two scenarios illustrate the platform workflow: the first highlights task planning from software logic to hardware execution, and the second showcases integrated vision handling and kinematic control.",
            sections: [
              {
                title: "Task planning workflow",
                description: "Visualizes how speech/vision inputs translate into task decomposition and manipulator execution.",
                gridClassName: "grid-cols-1 place-items-center gap-6 max-w-5xl mx-auto",
                imageAspectClass: "aspect-[21/10]",
                cardClassName: "w-full p-6",
                items: [
                  {
                    name: "Task planning workflow overview",
                    image: "/images/products/rai-p4/rai-p4-task-planning.png"
                  }
                ]
              },
              {
                title: "Vision-guided manipulation lab",
                description: "Demonstrates coordinated vision recognition, kinematic planning, and manipulator execution in one exercise.",
                gridClassName: "grid-cols-1 place-items-center gap-6 max-w-5xl mx-auto",
                imageAspectClass: "aspect-[21/10]",
                cardClassName: "w-full p-6",
                items: [
                  {
                    name: "Vision handling & kinematics practice",
                    image: "/images/products/rai-p4/rai-p4-manipulator-workflows.png"
                  }
                ]
              }
            ]
          },
          sensorConfig: {
            description:
              "Provides multimodal inputs required for embodied task planning, covering speech, vision, and motion feedback.",
            list: [
              "AI speech interaction microphone array",
              "Vision pan-tilt camera module",
              "Color recognition sensor",
              "Posture sensing IMU",
              "Expandable ports for object recognition / distance sensing"
            ]
          },
          controllerConfig: {
            description:
              "An AI edge board with open I/O delivers both LLM/vision inference and manipulator/peripheral control, ensuring tight hardware–software integration."
          },
          softwareConfig: {
            description:
              "Ships with Ubuntu and ROS2 (roscore, RViz, MoveIt), plus Jupyter, VS Code, and Python 3.9 so classes can start deploying algorithms immediately.",
            ecosystem:
              "Compatible with mainstream AI/robotics ecosystems such as OpenCV, YOLO, LLM SDKs, and MoveIt, supporting both teaching and research.",
            imageGridClassName: "grid grid-cols-1 gap-4 place-items-center max-w-4xl mx-auto",
            imageWrapperClassName: "relative aspect-[28/9] w-full",
            figureClassName:
              "w-full overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800",
            showCaptions: false,
            images: [
              {
                src: "/images/products/rai-p4/rai-p4-software-suite.png",
                alt: "Ubuntu / ROS / RViz / VS Code / Python software suite"
              }
            ]
          },
          experiments: {
            summary:
              "More than 40 sub-projects span manipulator control, sensing, computer vision, LLM voice dialogue, system integration, ROS, and embedded development, enabling cross-disciplinary skill building.",
            sections: [
              {
                title: "Manipulator control fundamentals",
                items: [
                  { name: "Kinematics control", desc: "4 class hours | Build forward/inverse kinematics and joint trajectory planning for the 4-DOF arm." },
                  { name: "Linear interpolation control", desc: "2 class hours | Execute end-effector linear trajectories and manage velocity/acceleration profiles." },
                  { name: "Circular interpolation control", desc: "2 class hours | Generate spatial arc trajectories while maintaining attitude control." },
                  { name: "Pick-and-place planning", desc: "4 class hours | Combine coordinate calibration and grasp strategies to plan multi-point handling." },
                  { name: "Drawing geometric patterns", desc: "4 class hours | Produce planar geometric figures through custom trajectory generation." }
                ]
              },
              {
                title: "Sensor acquisition & control",
                items: [
                  { name: "IMU data acquisition", desc: "2 class hours | Read posture sensor data, complete orientation estimation, and apply filtering." },
                  { name: "Gesture-controlled manipulator", desc: "2 class hours | Drive the manipulator via posture sensor input for embodied interaction." }
                ]
              },
              {
                title: "Computer vision basics (OpenCV)",
                items: [
                  { name: "Color recognition", desc: "2 class hours | Convert color spaces and segment targets with OpenCV." },
                  { name: "Shape recognition", desc: "2 class hours | Extract contours and match geometric features to classify shapes." }
                ]
              },
              {
                title: "AI vision (YOLO)",
                items: [
                  { name: "YOLO deployment", desc: "2 class hours | Deploy YOLO on the embedded board for real-time inference." },
                  { name: "Face detection", desc: "2 class hours | Load pretrained weights to detect faces and output bounding boxes." },
                  { name: "Face tracking", desc: "2 class hours | Combine the pan-tilt unit and vision feedback for dynamic face tracking." },
                  { name: "Dataset annotation", desc: "2 class hours | Annotate detection datasets and handle format conversions." },
                  { name: "Model training & deployment", desc: "2 class hours | Fine-tune, quantize, and deploy YOLO models." },
                  { name: "Workpiece inspection", desc: "2 class hours | Build application-specific detection to classify and localize workpieces." }
                ]
              },
              {
                title: "AI vision (Tongyi Qianwen multimodal)",
                items: [
                  { name: "Multimodal API deployment", desc: "2 class hours | Call the Tongyi Qianwen API for image understanding and text generation." },
                  { name: "Fruit detection & labeling", desc: "2 class hours | Use Tongyi Qianwen to recognize fruit targets and generate semantic labels." }
                ]
              },
              {
                title: "LLM applications (AI voice dialogue)",
                items: [
                  { name: "ASR deployment", desc: "2 class hours | Configure the Tongyi Qianwen ASR service to parse voice input." },
                  { name: "LLM semantic planner", desc: "2 class hours | Deploy DeepSeek to handle intent understanding and task planning." },
                  { name: "TTS deployment", desc: "2 class hours | Integrate Volcano Engine TTS for natural voice responses." },
                  { name: "End-to-end voice dialogue", desc: "2 class hours | Chain ASR, LLM, and TTS to build a full conversational loop." },
                  { name: "Function-call voice calculator", desc: "2 class hours | Implement voice-driven calculations via LLM function calls." },
                  { name: "Function-call music playback", desc: "2 class hours | Control music retrieval and playback through voice commands." },
                  { name: "Function-call pan-tilt task planner", desc: "4 class hours | Use voice instructions to drive pan-tilt tracking and target search." },
                  { name: "Function-call manipulator task planner", desc: "4 class hours | Trigger vision-based positioning and grasping through voice commands." }
                ]
              },
              {
                title: "Robotic system integration",
                items: [
                  { name: "Socket communication", desc: "2 class hours | Build a socket channel and exchange commands between subsystems." },
                  { name: "Vision-driven manipulator tracking", desc: "4 class hours | Map vision data to the manipulator coordinate frame for dynamic tracking." },
                  { name: "Vision–manipulator hand–eye calibration", desc: "2 class hours | Complete hand–eye calibration to map pixels to poses." },
                  { name: "Vision-based sorting", desc: "4 class hours | Combine perception, planning, and execution to complete sorting tasks." }
                ]
              },
              {
                title: "ROS (Robot Operating System)",
                items: [
                  { name: "Run a ROS2 project quickly", desc: "2 class hours | Create, build, and run ROS2 workspaces." },
                  { name: "Build and port ROS2 packages", desc: "2 class hours | Create packages, manage dependencies, and port functionality." },
                  { name: "MoveIt configuration", desc: "2 class hours | Configure MoveIt scenes, import collision models, and validate planning." },
                  { name: "4-DOF MoveIt/RViz simulation", desc: "2 class hours | Control the 4-DOF arm in RViz and verify trajectories." }
                ]
              },
              {
                title: "Embedded system development",
                items: [
                  { name: "Ubuntu filesystem essentials", desc: "1 class hour | Learn common directory structures and file commands." },
                  { name: "Editor familiarization (vi / nano)", desc: "1 class hour | Practice terminal editor basics and configuration." },
                  { name: "Remote access setup (SSH / PuTTY)", desc: "2 class hours | Configure remote connections for collaborative development." },
                  { name: "Linux file I/O programming", desc: "2 class hours | Implement file read/write with proper exception handling." },
                  { name: "Serial communication", desc: "2 class hours | Exchange serial data and design simple protocols." },
                  { name: "Process / thread management", desc: "2 class hours | Understand Linux processes and threads and write sample programs." },
                  { name: "Interface design", desc: "2 class hours | Quickly build human–machine interfaces with Python/Qt." }
                ]
              }
            ]
          },
          specs: [
            "Footprint: deployment on a 60 cm × 60 cm desktop",
            "Manipulator platform: 4-DOF standard, expandable to 6-DOF",
            "Computing platform: integrated AI edge controller supporting LLM and vision workloads"
          ]
        },
        "rai-m4": {
          name: "Embodied Composite Robot System Design Training Platform RAI-M4",
          model: "RAI-M4",
          image: "/images/products/rai-m4/front-view.png",
          overview:
            "Embodied intelligence can be decomposed into task planning, perception & decision-making, and manipulation. Each stage benefits from AI to improve interaction, reasoning, and execution. RAI-M4 integrates DeepSeek and Qwen to interpret free-form conversations at the planning layer, translating natural language into executable robotic workflows; on the perception side, Qwen’s multimodal capabilities enable broad object understanding without bespoke pre-training.\n\nHardware-wise, RAI-M4 combines a mecanum omni-directional chassis for agile motion with a serial 4-DOF manipulator (300 g payload, 240 mm reach, equipped with a gripper). The sensing suite includes an HD camera (optional depth camera), LiDAR, IMU/gyroscope, and breathing light indicators for interaction feedback.\n\nA dual-controller architecture powers the system: an upper controller handles planning, perception, navigation, and kinematic algorithms for both chassis and arm, while the lower controller executes motor PID loops, drives interactive modules, and relays communications. The platform supports hands-on curricula in mobile robotics and large-model deployment, fitting programmes in robotics, mechatronics, intelligent manufacturing, automation, and electronic information.",
          highlights: [
            "Hybrid platform: mecanum chassis plus 4-DOF manipulator",
            "DeepSeek + Qwen large-model integration for planning and perception",
            "Course-ready framework for mobile robotics and LLM deployment",
          ],
          applicable:
            "Ideal for courses on mobile robot control, LLM deployment, robotics, computer vision, ROS, and mobile navigation/localization",
          features: [
            {
              title: "Deep large-model integration",
              content:
                "Qwen-powered ASR and DeepSeek-based LLM understanding equip the robot with natural-language task planning, while Qwen’s multimodal vision removes the need for customised datasets."
            },
            {
              title: "Mobile-and-manipulation composite platform",
              content:
                "The mecanum chassis and serial arm operate together in confined workspaces, enabling general-purpose tasks when combined with task planning and perception pipelines.",
              mediaGridClassName: "grid-cols-1 gap-6 place-items-center",
              mediaImageAspectClass: "aspect-[16/10]",
              mediaCardClassName: "w-full max-w-3xl",
              media: [
                { name: "Module composition overview", image: "/images/products/rai-m4/module-overview.png" }
              ]
            },
            {
              title: "Structured experiment roadmap",
              content:
                "Curricula are modularised around machine vision, large-model deployment, robotics, ROS, and navigation so instructors can mix and match modules that fit their teaching needs."
            }
          ],
          sensorConfig: {
            description:
              "A comprehensive sensing suite supports navigation, perception, and interactive feedback.",
            list: [
              "HD camera (optional upgrade to depth camera for 3D perception)",
              "360° LiDAR (0.12–8 m range)",
              "IMU / gyroscope for pose estimation and odometry refinement",
              "Breathing light and status indicators",
              "Expansion ports for touch displays or additional sensors"
            ]
          },
          sampleCases: {
            description:
              "Multi-angle imagery showcases RAI-M4’s chassis, manipulator, and sensor modules to simplify lab setup and scenario design.",
            sections: [
              {
                title: "Multi-angle gallery",
                gridClassName: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                imageAspectClass: "aspect-[4/3]",
                cardClassName: "pt-6 pb-4",
                items: [
                  { name: "Front view", image: "/images/products/rai-m4/front-view.png" },
                  { name: "Left view", image: "/images/products/rai-m4/left-view.png" },
                  { name: "Right view", image: "/images/products/rai-m4/right-view.png" },
                  { name: "Top view", image: "/images/products/rai-m4/top-view.png" }
                ]
              }
            ]
          },
          controllerConfig: {
            description:
              "Dual-controller design: the upper controller manages planning, perception, navigation, and kinematics, while the lower controller delivers motor PID control, manipulator actuation, and interactive I/O, acting as the bridge to the upper layer.",
            images: []
          },
          softwareConfig: {
            description:
              "Ships with Ubuntu + ROS2, MoveIt, YOLO inference, and Qwen / DeepSeek API examples so labs can immediately begin combined mobile robotics and LLM experiments.",
            ecosystem:
              "Supports Python / C++, ROS2, MoveIt, OpenCV, YOLO, Qwen SDK, DeepSeek API, and other mainstream frameworks for coursework and research extensions."
          },
          experiments: {
            summary:
              "Experiment tracks span machine vision, large-model deployment, robot body control, ROS operations, and mobile navigation, allowing flexible lesson planning.",
            sections: [
              {
                title: "Machine vision module",
                description: "Build a full pipeline from classical image processing to deep/multimodal perception.",
                items: [
                  {
                    name: "OpenCV vision",
                    desc: "HSV colour recognition; shape recognition; QR code recognition; barcode recognition; colour-ring detection (integration + filtering)"
                  },
                  {
                    name: "AI vision – YOLO",
                    desc: "YOLO deployment; dataset annotation; model training and deployment; workpiece data collection and inspection; face detection; face tracking"
                  },
                  { name: "AI vision – Qwen multimodal", desc: "Qwen multimodal API deployment; object detection and tagging" }
                ]
              },
              {
                title: "Large-model deployment & applications",
                description: "Focus on voice dialogue, multimodal perception, and embodied execution.",
                items: [
                  {
                    name: "Voice dialogue interaction",
                    desc:
                      "ASR deployment with Qwen; LLM semantic understanding with DeepSeek; TTS deployment with Volcano Engine; end-to-end voice dialogue; voice-enabled calculator; voice-triggered music playback"
                  },
                  { name: "Multimodal vision detection", desc: "Qwen multimodal API deployment; object detection and annotation" },
                  { name: "Robot-integrated scenarios", desc: "MCP-based grasping task planning; MCP-based navigation task planning" }
                ]
              },
              {
                title: "Robot body control module",
                description: "Practise kinematics and control for both chassis and manipulator.",
                items: [
                  { name: "Chassis control", desc: "Encoder-based motor PID; mecanum kinematics; mecanum odometry with gyroscope fusion" },
                  { name: "Manipulator control", desc: "Servo position control; manipulator kinematics; motion interpolation control" }
                ]
              },
              {
                title: "ROS operations module",
                description: "Develop ROS topic/service/parameter skills plus MoveIt planning.",
                items: [
                  {
                    name: "ROS fundamentals",
                    desc:
                      "Control turtlesim via topics/services/parameters; spawn additional turtles; port and run packages to drive turtlesim with the keyboard"
                  },
                  { name: "MoveIt arm planning", desc: "Configure arm URDF; set up MoveIt kinematics; use RViz for motion planning" }
                ]
              },
              {
                title: "Mobile navigation & localization module",
                description: "Cover interfaces, mapping, and navigation with multi-goal support.",
                items: [
                  { name: "Interface configuration", desc: "Keyboard teleop for chassis; keyboard teleop for manipulator; acquire LiDAR data" },
                  { name: "Mapping workflow", desc: "Configure mapping project files; craft launch files; build new maps" },
                  {
                    name: "Navigation workflow",
                    desc: "Configure Navigation project; define collision boundaries; point-to-point navigation; autonomous obstacle avoidance; multi-goal navigation"
                  }
                ]
              }
            ]
          },
          specs: [
            "Mecanum omni chassis (approx. 0.5 m/s max speed, 10 kg payload)",
            "4-DOF serial manipulator (240 mm reach, 300 g payload, gripper included)",
            "Dual-controller architecture (upper for planning, lower for PID and I/O)",
            "Preinstalled LLM interfaces plus ROS2 / MoveIt experiment stack"
          ],
        },
        "rai-q2": {
          name: "Embodied Vision Perception & Decision Training Platform RAI-Q2",
          model: "RAI-Q2",
          image: "/images/products/rai-q2/hero.png",
          overview:
            "Vision inspection is the most common perception-and-decision stage in embodied intelligence. RAI-Q2 fuses signature vision algorithms with real teaching scenarios, covering tiered curricula built on OpenCV, YOLO, and Qwen-VL so instructors can land vision-focused courses quickly.\n\nThe platform ships with a depth camera module, edge computing controller, precision turntable with adjustable speed and angle profiles, a millimeter-level lift stage that switches between manual and motor drive, a dimmable ring light, display, and Bluetooth keyboard/mouse. The all-in-one configuration dramatically lowers deployment overhead for computer vision, machine learning, and multimodal/LLM application classes.",
          highlights: [
            "Three-tier vision pipeline covering OpenCV, YOLO, and Qwen-VL",
            "0.3°-backlash turntable plus mm-level lift stage with dimmable ring light",
            "Modular components support high-speed camera swaps and gimbal builds",
          ],
          applicable: "Courses in computer vision, machine learning, and multimodal / LLM deployments",
          features: [
            {
              title: "Comprehensive vision pipelines",
              content:
                "Learners experience three complementary curricula: classic image processing with OpenCV, model-driven detection with YOLO, and multimodal reasoning with Qwen-VL, building proficiency from fundamentals through large-model inference."
            },
            {
              title: "High-precision all-parameter testbench",
              content:
                "The integrated joint-driven turntable offers 0.3° minimum backlash with speed/angle dual modes. A dual-layer magnetic deck keeps fasteners out of the camera view, while the lift stage provides mm-level adjustment via manual crank or servo drive. A dimmable ring light adapts to diverse lighting environments.",
              mediaGridClassName: "grid-cols-1 gap-6 place-items-center",
              mediaImageAspectClass: "aspect-[16/10]",
              mediaCardClassName: "w-full max-w-3xl",
              media: [
                { name: "Vision pipeline overview", image: "/images/products/rai-q2/feature-overview.png" }
              ]
            },
            {
              title: "Modular hardware architecture",
              content:
                "Core modules can be replaced or repositioned: swap the depth camera for a high-speed unit, relocate the lift stage onto the turntable to build a gimbal, and customise the rig for specific coursework or research goals."
            }
          ],
          sensorConfig: {
            description: "A full sensor suite tailored for vision perception and depth-sensing experiments with multimodal inputs.",
            list: [
              "Depth camera module supporting RGB, depth, and infrared feeds",
              "Dimmable ring light with multiple brightness levels for contrast control",
              "Expansion interface for high-speed cameras or auxiliary lighting",
              "Turntable angle encoder feedback and lift travel sensing"
            ]
          },
          sampleCases: {
            description:
              "Multi-angle imagery presents the overall structure of RAI-Q2, making it easy to understand the layout of the turntable, lift stage, and camera modules when preparing teaching scenarios.",
            sections: [
              {
                title: "Multi-angle appearance showcase",
                gridClassName: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                imageAspectClass: "aspect-[4/3]",
                cardClassName: "pt-6 pb-4",
                items: [
                  { name: "Front view", image: "/images/products/rai-q2/front-view.png" },
                  { name: "Side view", image: "/images/products/rai-q2/side-view.png" },
                  { name: "Top view", image: "/images/products/rai-q2/top-view.png" }
                ]
              }
            ]
          },
          controllerConfig: {
            description:
              "An onboard edge controller handles algorithm inference and motion orchestration, tightly integrating the turntable and lift drives for precise attitude control.",
            images: []
          },
          softwareConfig: {
            description:
              "Preloaded environments for OpenCV, YOLO deployment, and Qwen-VL APIs allow classes to jump straight into vision experiments.",
            ecosystem:
              "Supports Python and C++ development with compatibility for PyTorch, TensorRT, and Qwen SDKs, enabling rapid extension into model training or advanced deployments."
          },
          experiments: {
            summary:
              "Layered experiment sets guide students through OpenCV processing, YOLO engineering workflows, Qwen-VL multimodal inference, and depth sensing—each with recommended durations for straightforward lesson planning.",
            sections: [
              {
                title: "OpenCV vision",
                description: "Build the foundation by mastering essential image processing and recognition routines.",
                items: [
                  { name: "HSV color recognition", desc: "Recommended duration: 2 hours" },
                  { name: "Shape recognition", desc: "Recommended duration: 2 hours" },
                  { name: "QR code recognition", desc: "Recommended duration: 2 hours" },
                  { name: "Barcode recognition", desc: "Recommended duration: 2 hours" },
                  { name: "Color ring detection (integration + filtering)", desc: "Recommended duration: 4 hours" }
                ]
              },
              {
                title: "AI vision – YOLO",
                description: "Walk through the end-to-end engineering pipeline from data collection to deployment.",
                items: [
                  { name: "YOLO deployment", desc: "Recommended duration: 2 hours" },
                  { name: "Dataset annotation", desc: "Recommended duration: 2 hours" },
                  { name: "Model training & deployment", desc: "Recommended duration: 2 hours (requires an additional GPU ≥ RTX 4050)" },
                  { name: "Workpiece data capture & inspection", desc: "Recommended duration: 2 hours" },
                  { name: "Face detection", desc: "Recommended duration: 2 hours" },
                  { name: "Face tracking", desc: "Recommended duration: 4 hours" }
                ]
              },
              {
                title: "AI vision – Qwen large model",
                description: "Experience multimodal large-model capabilities within vision assignments.",
                items: [
                  { name: "Qwen multimodal API deployment", desc: "Recommended duration: 2 hours" },
                  { name: "Fruit detection & annotation", desc: "Recommended duration: 2 hours" }
                ]
              },
              {
                title: "Depth sensing",
                description: "Leverage the depth camera for accurate range sensing and 3D reconstruction.",
                items: [
                  { name: "Depth data acquisition", desc: "Recommended duration: 2 hours" },
                  { name: "3D modeling", desc: "Recommended duration: 4 hours" }
                ]
              }
            ]
          },
          specs: [
            "Turntable with 0.3° minimum backlash and dual speed/angle modes",
            "Lift stage with millimeter-level resolution, supporting manual and motor drive",
            "Dimmable ring light to match varied illumination scenarios",
            "Integrated edge controller and display for turnkey deployment"
          ],
        },
        "uni-wr2": {
          name: "Portable ROS Navigation Learning Platform UNI-WR2",
          subtitle: "Desktop ROS / SLAM Integrated Training Platform",
          model: "UNI-WR2",
          image: "/images/products/uni-wr2/uni-wr2-hero.png",
          overview:
            "UNI-WR2 is a portable desktop robot designed specifically for ROS and SLAM navigation instruction. It supports courses such as “Robot Operating System (ROS)”, “Mobile Robot Navigation and Localization”, and “Automatic Control Theory (PID)”. Compared with approaches that rely solely on simulation or require large dedicated spaces, UNI-WR2 delivers portable hardware, desktop deployment, and a five-step ROS engineering workflow so learners can debug navigation algorithms and deploy ROS packages on a real robot anytime, anywhere.",
          applicable:
            "Created for university and training programs in robotics, automation, computer science, and mechatronics that cover ROS foundations, SLAM navigation, PID control, and mobile robotics engineering practice.",
          highlights: [
            "Ultra-portable: under 13 cm long, <550 g, Type-C charging with ~4-hour runtime",
            "Agile desktop deployment: complete SLAM navigation within a 60 cm × 60 cm workspace",
            "Engineering workflow: five-step ROS deployment with Catographer, Hector, and Gmapping"
          ],
          features: [
            {
              title: "Portable learning form factor",
              content:
                "An all-metal, palm-sized chassis with built-in Type-C charging—simply plug into a power bank to continue experiments, perfect for classrooms, labs, and travel scenarios.",
              mediaGridClassName: "grid-cols-1 sm:grid-cols-2 gap-4",
              mediaImageAspectClass: "aspect-[5/4]",
              media: [
                { name: "Portable design", image: "/images/products/uni-wr2/uni-wr2-feature-portable.png" },
                { name: "Type-C charging", image: "/images/products/uni-wr2/uni-wr2-feature-charging.png" },
                { name: "Agile deployment (1)", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-1.png" },
                { name: "Agile deployment (2)", image: "/images/products/uni-wr2/uni-wr2-feature-deploy-2.png" }
              ]
            },
            {
              title: "Desktop SLAM environment",
              content:
                "A 60 cm × 60 cm tabletop is enough to build SLAM scenarios. Learners can adjust the robot without leaving their seat, and modular floor tiles expand to 1.2 m × 1.2 m or beyond when needed.",
              mediaGridClassName: "grid-cols-1 gap-4",
              mediaImageAspectClass: "aspect-[5/4]",
              media: [
                { name: "Desktop layout overview", image: "/images/products/uni-wr2/uni-wr2-desktop-layout.png" }
              ]
            },
            {
              title: "ROS engineering workflow",
              content:
                "Breaks the ROS deployment flow into five steps—principle review, quick demonstration, framework breakdown, package configuration, and full-parameter tuning—paired with Catographer, Hector, and Gmapping navigation projects so students can generalize the method to other robots."
            }
          ],
          sensorConfig: {
            description:
              "Bundled SLAM sensors support odometry feedback, posture estimation, and environmental mapping with real-world physics.",
            list: [
              "LiDAR for SLAM mapping (Catographer/Hector/Gmapping)",
              "Dual-wheel odometry encoders for PID speed control",
              "IMU / gyroscope for attitude estimation",
              "Expansion ports for additional sensors or fiducial markers"
            ]
          },
          sampleCases: {
            description:
              "Exterior, dimension, and BOM visuals help instructors quickly understand the hardware composition, size planning, and assembly details of the platform.",
            sections: [
              {
                title: "Exterior & structural overview",
                gridClassName: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                imageAspectClass: "aspect-[4/3]",
                items: [
                  { name: "Exterior overview", image: "/images/products/uni-wr2/uni-wr2-exterior-overview.png" },
                  { name: "Dimension reference", image: "/images/products/uni-wr2/uni-wr2-dimensions.png" },
                  { name: "BOM breakdown", image: "/images/products/uni-wr2/uni-wr2-bom.png" }
                ]
              }
            ]
          },
          controllerConfig: {
            description:
              "Powered by a Raspberry Pi-based control stack with integrated PID motor drivers and power management. A single switch handles boot and recovery, simplifying classroom operation.",
            images: [
              {
                src: "/images/products/uni-wr2/uni-wr2-controller.png",
                alt: "UNI-WR2 Raspberry Pi control core"
              }
            ]
          },
          softwareConfig: {
            description:
              "Comes preloaded with Ubuntu and ROS, along with navigation package examples and teaching scripts—power on and start running ROS labs immediately.",
            ecosystem:
              "Course resources include Catographer, Hector, and Gmapping package references plus ROS engineering documentation, enabling full navigation workflows on real hardware.",
            showCaptions: false,
            imageGridClassName: "grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center",
            imageWrapperClassName: "relative aspect-square w-full",
            figureClassName:
              "w-full max-w-[220px] overflow-hidden rounded-lg border border-dashed border-stroke/60 bg-gray-50 dark:border-stroke-dark/60 dark:bg-gray-800",
            images: [
              { src: "/images/products/uni-wr2/uni-wr2-software-ubuntu.png", alt: "Ubuntu logo" },
              { src: "/images/products/uni-wr2/uni-wr2-software-ros.png", alt: "ROS logo" }
            ]
          },
          experiments: {
            summary:
              "The curriculum is organized into three themes—ROS foundations, SLAM engineering deployment, and mobile robot kinematics control. Each theme can be delivered independently or combined based on class hours.",
            sections: [
              {
                title: "ROS foundations",
                description:
                  "Understand ROS file structure and communication mechanisms, then learn how to create and port ROS packages.",
                items: [
                  {
                    name: "ROS runtime experience",
                    desc: "2 class hours | Review the ROS filesystem; control turtlesim and UNI-WR2 via topics, services, and parameters."
                  },
                  {
                    name: "Build & port ROS packages",
                    desc: "2 class hours | Create packages, configure environment variables, compile, and implement keyboard teleoperation for UNI-WR2."
                  }
                ]
              },
              {
                title: "SLAM engineering deployment",
                description:
                  "Walk through complete navigation workflows, comparing three SLAM algorithms and tuning them for different scenarios.",
                items: [
                  {
                    name: "Rapid navigation execution",
                    desc: "2 class hours | Follow guided steps to run Catographer, Hector, and Gmapping and compare their characteristics."
                  },
                  {
                    name: "Catographer mapping & navigation",
                    desc: "4 class hours | Explain principles, dissect the package, configure parameters, and complete full-parameter tuning."
                  },
                  {
                    name: "Hector mapping & navigation",
                    desc: "4 class hours | Break down the Hector architecture, configure the package, and handle high-frequency LiDAR data."
                  },
                  {
                    name: "Gmapping mapping & navigation",
                    desc: "4 class hours | Study particle-filter SLAM, perform parameter tuning, and generate reliable maps."
                  }
                ]
              },
              {
                title: "Mobile robot kinematics control",
                description:
                  "Master differential drive kinematics, precise odometry, and PID velocity control for mobile robots.",
                items: [
                  {
                    name: "Wheel PID tuning",
                    desc: "2 class hours | Acquire encoder data, implement PID algorithms, and achieve closed-loop speed control."
                  },
                  {
                    name: "Mobile robot kinematics",
                    desc: "4 class hours | Derive differential drive models, implement odometry feedback, and control linear/angular velocity."
                  }
                ]
              }
            ]
          },
          specs: [
            "Dimensions: 130 mm × 97 mm × 98 mm",
            "Weight: approx. 580 g",
            "Speed: 0.16 m/s",
            "Localization accuracy: <5 mm error within 1 m",
            "Straight-line deviation: <1 cm over 1 m (≈1.5°)",
            "Navigation modes: Catographer / Hector / Gmapping laser SLAM"
          ]
        },
        "alo-le4": {
          name: "Embodied Robot Manipulation Planning Training Platform ALO-LE4",
          model: "ALO-LE4",
          image: "/images/products/alo-le4/front-view.png",
          overview:
            "In embodied intelligence, the execution stage often relies on either reinforcement learning—common for bionic or humanoid forms—or end-to-end approaches used in wheeled composite robots and robotic arms. ALO-LE4 adopts the latter, centring on a robotic-arm configuration built on the ACT architecture to deliver an end-to-end embodied manipulation training platform. It functions both as a data collection rig and as a research platform for imitation learning and end-to-end intelligent control.\n\nALO-LE4 integrates two 5-DOF arms: the master arm is manipulated directly to capture motion data, while the slave arm reproduces tasks autonomously using an ACT model trained on joint-angle and sensor data. Top- and side-mounted cameras detect object colour and position while feeding visual data into ACT training. An adjustable lighting system simulates diverse environments for robustness testing.\n\nThe platform provides a stable, controllable environment for embodied intelligence, imitation learning, and data-collection studies, enabling complete “perception–decision–execution” loops. In education, it supports hands-on modules in robotics and computer vision, helping learners grasp key embodied-intelligence concepts and strengthen engineering and research skills. Universities and research institutes can deploy ALO-LE4 for efficient teaching and experimentation, accelerating embodied-intelligence development.",
          highlights: [
            "Two-in-one platform: data collection plus intelligent training and validation",
            "Rapid, integrated deployment with independent reset for each subsystem",
            "Progressive teaching workflow from environment setup to model training",
          ],
          applicable:
            "Suitable for embodied intelligence, imitation learning, end-to-end control, robotics, and computer vision courses and projects",
          features: [
            {
              title: "Unified data collection and training",
              content:
                "Built on the ACT framework, the platform supports motion capture, model training, and validation. Adjustable lighting accommodates varied scenes, while the desktop setup ensures stable, repeatable experiments.",
              mediaGridClassName: "grid-cols-1 gap-6 place-items-center",
              mediaImageAspectClass: "aspect-[16/10]",
              mediaCardClassName: "w-full max-w-3xl",
              media: [
                { name: "Platform module overview", image: "/images/products/alo-le4/module-overview.png" }
              ]
            },
            {
              title: "Fast deployment and recovery",
              content:
                "Independent reset buttons on the master arm, slave arm, and OS allow quick restarts without building extra scenes or lighting setups, greatly simplifying debugging."
            },
            {
              title: "Progressive teaching design",
              content:
                "Covering software environment configuration, hardware setup, and training workflows, the curriculum serves both classroom teaching and research requirements, guiding learners step-by-step."
            }
          ],
          sensorConfig: {
            description: "Core sensing modules supply the data streams needed for imitation learning and vision-enabled manipulation.",
            list: [
              "Dual HD cameras (top + side) for colour/position detection and dataset capture",
              "Adjustable environmental lighting to emulate diverse illumination",
              "Joint-angle sensing for the master/slave arms",
              "Expansion interfaces for additional vision or force modules"
            ]
          },
          sampleCases: {
            description:
              "Multi-angle shots reveal the arrangement of the dual-arm system and sensor modules, aiding classroom and lab planning.",
            sections: [
              {
                title: "Platform gallery",
                gridClassName: "grid-cols-1 sm:grid-cols-2 gap-6",
                imageAspectClass: "aspect-[4/3]",
                cardClassName: "pt-6 pb-4",
                items: [
                  { name: "Front view", image: "/images/products/alo-le4/front-view.png" },
                  { name: "Top view", image: "/images/products/alo-le4/top-view.png" }
                ]
              }
            ]
          },
          experiments: {
            summary:
              "Experiment tracks progress from end-to-end deployment to vision and manipulator control, building a complete understanding of embodied manipulation.",
            sections: [
              {
                title: "End-to-end deployment & training",
                description: "Follow ACT-based workflows from environment setup through data collection and deployment.",
                items: [
                  { name: "Environment setup", desc: "Configure CONDA, FFMPEG, Python dependencies (2 hours)" },
                  { name: "Install Lerobot framework", desc: "Set up the Lerobot environment (2 hours)" },
                  { name: "Configure servo motors", desc: "Tune manipulator servo parameters (1 hour)" },
                  { name: "Camera configuration", desc: "Calibrate and connect imaging devices (1 hour)" },
                  { name: "Master/slave calibration", desc: "Verify master-arm capture and slave-arm following (2 hours)" },
                  { name: "Teleoperation data capture", desc: "Record video, joint angles, and system settings (2 hours)" },
                  { name: "Model training", desc: "Recommend NVIDIA 4060-class GPU or better (2 hours)" },
                  { name: "Model deployment", desc: "Deploy and validate autonomous task execution (4 hours)" }
                ]
              },
              {
                title: "Extended module · AI vision",
                description: "Train learners to integrate visual perception with robotic manipulation.",
                items: [
                  { name: "YOLO deployment", desc: "Deploy YOLO detection models (2 hours)" },
                  { name: "Dataset annotation", desc: "Label training data for vision tasks (2 hours)" },
                  { name: "Model training & deployment", desc: "Train and deploy vision models (2 hours)" },
                  { name: "Workpiece inspection", desc: "Implement workpiece recognition and positioning (2 hours)" },
                  { name: "Visual pick-and-place", desc: "Map vision outputs to manipulator actions (4 hours)" }
                ]
              },
              {
                title: "Extended module · Robotic manipulator control",
                description: "Focus on kinematics and interpolation control for manipulators.",
                items: [
                  { name: "Manipulator kinematics control", desc: "Develop forward/inverse kinematics control (4 hours)" },
                  { name: "Linear interpolation control", desc: "Execute linear interpolation trajectories (2 hours)" },
                  { name: "Circular interpolation control", desc: "Execute circular interpolation trajectories (2 hours)" },
                  { name: "Stacking and handling tasks", desc: "Conduct stacking and handling exercises (4 hours)" }
                ]
              }
            ]
          },
          specs: [
            "Dual 5-DOF arms for master–slave demonstration and motion capture",
            "Top + side cameras deliver colour/position inputs for ACT training",
            "Integrated adjustable lighting simulates varied illumination",
            "Independent reset buttons simplify rapid recovery and debugging"
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
    cookieConsent: {
      message: "We use cookies to enhance your browsing experience and improve website functionality.",
      learnMore: "Learn more",
      acceptAll: "Accept All",
      rejectNonEssential: "Essential Only",
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
