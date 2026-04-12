export const caseStudiesData = [
  // ==========================================
  // Practical Teaching
  // ==========================================
  {
    category: "practical-teaching",
    images: [],
    locales: {
      zh: {
        title: "典型案例1：清华大学",
        nodes: [
          { type: "h4", text: "背景说明：" },
          { type: "p", text: "清华大学icenter是面向全校开展工程创新课程的实训中心，包含理科、工科、文史哲、设计类学生参与，现有课程包含智能产品设计类、机器人设计类、工程+艺术结合的创意设计类、结合化学场景的机器人设计类，现在需要能够跟其他书院进行结合+具身智能技术的课程。" },
          { type: "h4", text: "需求说明：" },
          { type: "p", text: "1.要能结合具身智能技术，包括对大模型的使用和机器人工程技术的学习，但要能够被学生掌握；\n2.设计的项目要能够贴合各个书院的建设背景场景；\n3.在暑期开展课程，合计80课时，集中2周实训。" },
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "1.将课程分为2个阶段，第一个阶段做一个完整的复合机器人项目，学习底盘设计与运控、机械臂设计与运控、大模型应用开发、VLM视觉应用开发等；第二个阶段设计了10个小课题，让学生根据自己的专业背景选择对应课题自行设计完成项目，可以结合3D打印和电路设计等工程技术。\n2.提供M系列的09S产品，2-3个学生一组，现场时安排企业工程师作为助教解决bug问题。" }
        ]
      },
      en: {
        title: "Case 1: Tsinghua University",
        nodes: [
          { type: "h4", text: "Background:" },
          { type: "p", text: "Tsinghua University iCenter is a practical training center offering engineering innovation courses to the entire university. Students from science, engineering, humanities, and design disciplines participate. Existing courses cover intelligent product design, robot design, engineering & art creativity, and chemistry-related robotics. They needed a new course integrating embodied intelligence technology that could collaborate with other colleges." },
          { type: "h4", text: "Requirements:" },
          { type: "p", text: "1. Integrate embodied intelligence technology, including LLM utilization and robotics engineering, ensuring it is accessible to students.\n2. Design projects that align with the specific academic backgrounds of various colleges.\n3. Conduct the course during the summer session, totaling 80 hours over 2 weeks of intensive training." },
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "1. The course was divided into 2 phases. Phase 1 involved building a complete compound robot project, covering chassis design and motion control, robotic arm control, LLM application development, and VLM vision applications. Phase 2 provided 10 mini-projects, allowing students to choose and design a project based on their major, integrating 3D printing and circuit design.\n2. We provided M-Series 09S products, with students paired in groups of 2-3. Enterprise engineers were arranged as teaching assistants on-site to help resolve technical issues." }
        ]
      },
      ja: {
        title: "事例1：清華大学",
        nodes: [
          { type: "h4", text: "背景：" },
          { type: "p", text: "清華大学iCenterは、全学向けにエンジニアリングイノベーションコースを提供する実践トレーニングセンターです。理系、工系、人文科学、デザインなど様々な分野の学生が参加しています。既存のコースには、インテリジェント製品設計、ロボット設計、エンジニアリングとアートの融合、化学シナリオを組み合わせたロボット設計が含まれます。他学部と連携し、身体性AI（Embodied AI）技術を統合した新しいコースが求められました。" },
          { type: "h4", text: "ニーズ：" },
          { type: "p", text: "1. 大規模言語モデル（LLM）の使用やロボット工学を含む身体性AI技術を統合し、学生が習得可能な内容にすること。\n2. 各学部の専門背景に合わせたプロジェクトを設計すること。\n3. 夏期休暇中に、計80時間（2週間）の集中実践トレーニングを実施すること。" },
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "1. コースを2つのフェーズに分けました。第1フェーズでは複合ロボットプロジェクトを構築し、シャーシの設計とモーション制御、ロボットアーム制御、LLMアプリケーション開発、VLMビジョンアプリケーションを学びます。第2フェーズでは10の小課題を用意し、学生が自分の専門背景に基づいて課題を選択・設計し、3Dプリントや回路設計などの技術を組み合わせてプロジェクトを完成させました。\n2. Mシリーズ09S製品を提供し、学生2～3人で1グループを編成。現場には企業エンジニアをティーチングアシスタントとして配置し、技術的な問題を解決しました。" }
        ]
      }
    }
  },
  {
    category: "practical-teaching",
    images: ["images/image1.jpeg"],
    locales: {
      zh: {
        title: "典型案例2：华中科技大学",
        nodes: [
          { type: "h4", text: "背景说明：" },
          { type: "p", text: "华中科技大学工程训练中心机器人创意设计课程之前是基于Arduino开展的，虽然入门简单但在专业任务中还是以STM32为主，希望学生能够进行一些专业的训练。" },
          { type: "h4", text: "需求说明：" },
          { type: "p", text: "1.学生有一点编程基础但不了解硬件，希望STM32有类似Arduino封装好的库；\n2.希望学生能学习STM32底层开发技术；\n3.解决学生在物流搬运、智能救援等复杂项目中的各种底层技术难题。" },
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "1.与学校老师交流培训STM32底层开发，共同制定课程方案；\n2.配合老师进行库函数封装+调用示例，降低项目实现难度；\n3.安排匹配的工程师线下指导解决技术问题。" },
          { type: "h4", text: "成果：" },
          { type: "p", text: "STM32课程小班实验成功，接下来每年都开展STM32综合实践课程。比赛获得多个省一。" }
        ]
      },
      en: {
        title: "Case 2: Huazhong University of Science and Technology",
        nodes: [
          { type: "h4", text: "Background:" },
          { type: "p", text: "The robot creative design course at the Engineering Training Center of HUST was previously Arduino-based. While easy to learn, professional tasks mainly rely on STM32. The university wanted students to receive more professional training." },
          { type: "h4", text: "Requirements:" },
          { type: "p", text: "1. Students have basic programming skills but lack hardware knowledge. They requested STM32 libraries similar to Arduino's encapsulation.\n2. Enable students to learn low-level STM32 development.\n3. Resolve various backend technical challenges students face in complex projects like logistics transport and smart rescue." },
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "1. Conducted STM32 low-level development training with university teachers to jointly design the curriculum.\n2. Assisted teachers in encapsulating library functions and providing calling examples to lower the implementation barrier.\n3. Arranged professional engineers for offline technical support to resolve complex issues." },
          { type: "h4", text: "Results:" },
          { type: "p", text: "The STM32 small-class experiment was successful, paving the way for annual STM32 comprehensive practice courses. Students won multiple first prizes in provincial competitions." }
        ]
      },
      ja: {
        title: "事例2：華中科技大学",
        nodes: [
          { type: "h4", text: "背景：" },
          { type: "p", text: "当大学のエンジニアリングトレーニングセンターにおけるロボットクリエイティブデザインコースは、以前はArduinoベースでした。入門としては簡単ですが、専門的なタスクでは主にSTM32が使用されるため、学生に専門的なトレーニングを提供したいという要望がありました。" },
          { type: "h4", text: "ニーズ：" },
          { type: "p", text: "1. 学生はプログラミングの基礎はありますがハードウェアの知識が不足しています。Arduinoのような使いやすいSTM32ライブラリが求められました。\n2. STM32の低レベル開発技術を学ばせること。\n3. 物流搬送やスマートレスキューなどの複雑なプロジェクトにおける技術的課題を解決すること。" },
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "1. 大学の教員と共同でSTM32の低レベル開発トレーニングを実施し、カリキュラム案を策定しました。\n2. 教員に協力してライブラリ関数をカプセル化し、呼び出しの例を提供することで実装の難易度を下げました。\n3. オフラインで技術的な問題を解決するため、専門のエンジニアを派遣しました。" },
          { type: "h4", text: "成果：" },
          { type: "p", text: "STM32の少人数実験クラスは成功を収め、毎年STM32総合実践コースが開催されるようになりました。コンテストでは複数の省レベル1等賞を獲得しました。" }
        ]
      }
    }
  },
  {
    category: "practical-teaching",
    images: [],
    locales: {
      zh: {
        title: "典型案例3：国防科技大学（内容保密）",
        nodes: [
          { type: "p", text: "（因涉及保密要求，本案例暂不对外公开具体细节。）" }
        ]
      },
      en: {
        title: "Case 3: National University of Defense Technology (Confidential)",
        nodes: [
          { type: "p", text: "(Due to confidentiality constraints, specific details of this case study are not publicly disclosed.)" }
        ]
      },
      ja: {
        title: "事例3：国防科技大学（機密内容）",
        nodes: [
          { type: "p", text: "（機密保持の要件により、本事例の詳細内容は公開されていません。）" }
        ]
      }
    }
  },
  {
    category: "practical-teaching",
    images: ["images/image2.jpeg", "images/image3.jpeg"],
    locales: {
      zh: {
        title: "典型案例4：珠海科技学院",
        nodes: [
          { type: "h4", text: "背景说明：" },
          { type: "p", text: "珠海科技学院自动化专业属于传统工业自动化人才培养方向，不能很好适应智能制造场景下所需的自动化培养，需要进行课程体系更新。" },
          { type: "h4", text: "需求说明：" },
          { type: "p", text: "1.机器视觉课程从LabVIEW转向OpenCV和YOLO；\n2.培养竞赛学生的机器人工程技术；\n3.面向大三开设综合实训课，围绕综合实训课进行前置课程设计改革。" },
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "1.基于M系列产品针对专业实训需求定制产品，提供15套设备。\n2.与学校老师共同制定机器视觉与机器学习课程和移动机器人系统设计课程，融合传统课程与人工智能技术。" }
        ]
      },
      en: {
        title: "Case 4: Zhuhai College of Science and Technology",
        nodes: [
          { type: "h4", text: "Background:" },
          { type: "p", text: "The automation major at Zhuhai College of Science and Technology followed traditional industrial automation training, which struggled to meet the demands of modern smart manufacturing scenarios. A curriculum update was urgently needed." },
          { type: "h4", text: "Requirements:" },
          { type: "p", text: "1. Transition the machine vision course from LabVIEW to OpenCV and YOLO.\n2. Cultivate students' robotics engineering skills for competitions.\n3. Establish a comprehensive practice course for juniors and reform prerequisite courses around it." },
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "1. Customized 15 sets of M-Series products tailored to their professional training needs.\n2. Collaborated with faculty to develop courses on machine vision, machine learning, and mobile robot system design, effectively integrating AI technologies with traditional automation education." }
        ]
      },
      ja: {
        title: "事例4：珠海科技学院",
        nodes: [
          { type: "h4", text: "背景：" },
          { type: "p", text: "珠海科技大学の自動化専攻は従来の産業用自動化人材の育成に偏っており、スマートマニュファクチャリングシナリオで必要とされる自動化技術に適応できていませんでした。カリキュラムの更新が必要でした。" },
          { type: "h4", text: "ニーズ：" },
          { type: "p", text: "1. マシンビジョンコースをLabVIEWからOpenCVとYOLOへ移行すること。\n2. コンテスト出場学生のロボット工学スキルを育成すること。\n3. 3年生向けの総合実践コースを開設し、それを中心とした前提コースの改革を行うこと。" },
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "1. 専門的なトレーニングニーズに合わせてMシリーズ製品をカスタマイズし、15セットのデバイスを提供しました。\n2. 教員と連携し、マシンビジョン、機械学習、モバイルロボットシステム設計のコースを開発。従来のコースとAI技術を統合しました。" }
        ]
      }
    }
  },
  {
    category: "practical-teaching",
    images: ["images/image4.jpeg", "images/image5.jpeg"],
    locales: {
      zh: {
        title: "典型案例5：安徽信息工程学院",
        nodes: [
          { type: "h4", text: "背景说明：" },
          { type: "p", text: "机械学院以前的机械课程侧重图纸绘制和无电机驱动的传动结构组装，实际操作较少，学生理解原理难度大。" },
          { type: "h4", text: "需求说明：" },
          { type: "p", text: "1.改革机械设计基础实训课程，将机器人作为对象进行传动设计；\n2.让学生从0-1搭建完整机构；\n3.满足基本竞赛训练需求。" },
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "1.基于M系列定制侧重机械机构的产品，包含直线运动、连杆、齿轮组等；\n2.提炼典型传动机构，提供图文课程包及教师培训。\n3.安排工程师指导专项竞赛。" }
        ]
      },
      en: {
        title: "Case 5: Anhui University of Information Engineering",
        nodes: [
          { type: "h4", text: "Background:" },
          { type: "p", text: "Previous mechanical courses heavily focused on drafting and assembling non-motorized transmission structures. The lack of practical operation made it difficult for students to grasp theoretical principles." },
          { type: "h4", text: "Requirements:" },
          { type: "p", text: "1. Reform the fundamental mechanical design practice course by using robots as the design object.\n2. Enable students to build a complete mechanism from scratch.\n3. Meet initial training requirements for basic competitions." },
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "1. Customized M-Series products focusing on mechanical mechanisms, including linear motion, linkages, and gear sets.\n2. Extracted typical transmission mechanisms, providing illustrated course packages and hands-on teacher training.\n3. Dispatched engineers to guide specialized competition training." }
        ]
      },
      ja: {
        title: "事例5：安徽情報工学院",
        nodes: [
          { type: "h4", text: "背景：" },
          { type: "p", text: "以前の機械コースは図面の作成やモーター駆動のない伝動構造の組み立てに偏っており、実際の実践作業が少なかったため、学生が原理を理解するのが困難でした。" },
          { type: "h4", text: "ニーズ：" },
          { type: "p", text: "1. ロボットを設計対象とし、機械設計の基礎実習コースを改革すること。\n2. 学生全員がゼロから完全な機構を組み立てられるようにすること。\n3. 基本的なコンテストのトレーニングニーズを満たすこと。" },
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "1. Mシリーズをベースに、直線運動、リンク機構、ギアセットなどの機械機構に重点を置いたカスタマイズ製品を提供しました。\n2. 典型的な伝動機構を抽出し、図解入りのコースパッケージと教員向けトレーニングを提供しました。\n3. コンテストの特別指導のためにエンジニアを派遣しました。" }
        ]
      }
    }
  },
  {
    category: "practical-teaching",
    images: ["images/image6.jpeg"],
    locales: {
      zh: {
        title: "典型案例6：西安工业大学",
        nodes: [
          { type: "h4", text: "背景说明：" },
          { type: "p", text: "学院新增了研究生招生名额，但竞赛社团缺少体系化设计和传承，新的研究生缺乏机器人基础。" },
          { type: "h4", text: "需求说明：" },
          { type: "p", text: "1.建设面向本科生和研究生的机器人综合创新设计课程；\n2.满足竞赛学习；\n3.包含进阶实训项目集。" },
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "提供10套智能机器人平台，开设《机器人系统设计》实验，包含机械臂创新设计、移动机器人创新设计及复合机器人创新设计，涵盖从机械电路搭建到算法设计的进阶内容。" }
        ]
      },
      en: {
        title: "Case 6: Xi'an Technological University",
        nodes: [
          { type: "h4", text: "Background:" },
          { type: "p", text: "The college expanded its graduate enrollment, but the robotics competition club lacked systematic design and succession planning. Incoming graduate students often lacked foundational robotics knowledge." },
          { type: "h4", text: "Requirements:" },
          { type: "p", text: "1. Establish a comprehensive robotic innovation design course for both undergraduates and postgraduates.\n2. Meet the educational demands of robotics competitions.\n3. Prepare a progressive set of practical training projects." },
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "Supplied 10 intelligent robotics platforms and launched the 'Robot System Design' lab course. The course features progressive experiments on robotic arm design, mobile robots, and compound robots, covering everything from mechanical and circuit assembly to advanced algorithm design." }
        ]
      },
      ja: {
        title: "事例6：西安工業大学",
        nodes: [
          { type: "h4", text: "背景：" },
          { type: "p", text: "大学院生の受け入れ枠が拡大されましたが、ロボットコンテストクラブには体系的な設計と引き継ぎのシステムが欠けており、新入生の多くはロボット工学の基礎知識を持っていませんでした。" },
          { type: "h4", text: "ニーズ：" },
          { type: "p", text: "1. 学部生と大学院生向けの総合的なロボットイノベーション設計コースを構築すること。\n2. コンテスト学習の要求を満たすこと。\n3. 段階的な実践トレーニングプロジェクト集を含めること。" },
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "10セットのインテリジェントロボットプラットフォームを提供し、「ロボットシステム設計」実験コースを開設しました。ロボットアーム、モバイルロボット、複合ロボットの革新的な設計など、機械・回路の組み立てからアルゴリズム設計に至る段階的な内容をカバーしています。" }
        ]
      }
    }
  },
  {
    category: "practical-teaching",
    images: ["images/image8.jpeg"],
    locales: {
      zh: {
        title: "典型案例7：江西科技师范大学",
        nodes: [
          { type: "h4", text: "背景说明：" },
          { type: "p", text: "智能制造学院之前在机器人工作室取得过很好成绩，但因校区转移导致学生断层，急需体系化建设吸引大一新生。" },
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "1.开展为期一天的培训实操；\n2.制定10个项目的实训手册，完成即颁发能力认定证书；\n3.提供30台兼容性极强的 GX-MAT-09S 以及40台 WR2 设备用于ROS学习。\n4.建立长期工程师答疑项目群。" }
        ]
      },
      en: {
        title: "Case 7: Jiangxi Science and Technology Normal University",
        nodes: [
          { type: "h4", text: "Background:" },
          { type: "p", text: "The School of Intelligent Manufacturing previously had a highly successful robotics studio. However, campus relocation caused a disruption in student continuity. They urgently needed systematic reconstruction to attract incoming freshmen." },
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "1. Conducted an intensive one-day hands-on training session.\n2. Developed a training manual with 10 progressive projects. Students receive competency certificates upon completion.\n3. Supplied 30 highly compatible GX-MAT-09S platforms and 40 WR2 devices specifically for ROS learning.\n4. Established a long-term dedicated online group for prompt engineering and technical support." }
        ]
      },
      ja: {
        title: "事例7：江西科技師範大学",
        nodes: [
          { type: "h4", text: "背景：" },
          { type: "p", text: "インテリジェントマニュファクチャリング学部は以前、ロボットスタジオで素晴らしい成績を収めていましたが、キャンパス移転による空白期間が原因で学生の継続が途絶えました。新入生を引き付けるための体系的な再構築が急務でした。" },
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "1. 1日間の実践的なハンズオントレーニングを実施。\n2. 10のプロジェクトからなるトレーニングマニュアルを作成し、修了者に能力認定証を発行。\n3. 互換性の高いGX-MAT-09Sを30台、ROS学習用のWR2デバイスを40台提供。\n4. エンジニアが即座に質問に答える長期的なサポートグループを設立。" }
        ]
      }
    }
  },

  // ==========================================
  // Sci-Tech Innovation
  // ==========================================
  {
    category: "sci-tech-innovation",
    images: ["images/image9.png", "images/image10.png"],
    locales: {
      zh: {
        title: "典型案例1：北京大学",
        nodes: [
          { type: "h4", text: "背景说明：" },
          { type: "p", text: "北京大学极客实验室面向全校开放，现有产品主要侧重底盘和无人机，缺少机械臂的开发实训。" },
          { type: "h4", text: "需求说明：" },
          { type: "p", text: "开设针对机械臂设计的课程，让学生经历从0-1的设计过程，包含本体设计以及结合VLA的开发实训。" },
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "结合M系列定制了5轴机械臂并提供运动学算法示例。针对末端执行器设计提供答疑，并开设VLA技术分享课程，讲解原理和部署。" }
        ]
      },
      en: {
        title: "Case 1: Peking University",
        nodes: [
          { type: "h4", text: "Background:" },
          { type: "p", text: "Peking University's Geek Lab is open to all students. Existing resources were heavily focused on chassis and drones, with a notable gap in robotic arm development training." },
          { type: "h4", text: "Requirements:" },
          { type: "p", text: "Establish a robotic arm design course guiding students from 0 to 1, encompassing hardware design and VLA (Vision-Language-Action) development training." },
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "Customized a 5-axis robotic arm using the M-Series and provided kinematics algorithm templates. Offered technical Q&A for end-effector design, and hosted VLA technology seminars focusing on principles and deployment strategies." }
        ]
      },
      ja: {
        title: "事例1：北京大学",
        nodes: [
          { type: "h4", text: "背景：" },
          { type: "p", text: "北京大学ギークラボは全学生に開放されています。既存の製品は主にシャーシとドローンに焦点を当てており、ロボットアームの開発実践トレーニングが不足していました。" },
          { type: "h4", text: "ニーズ：" },
          { type: "p", text: "ロボットアーム設計コースを開設し、ゼロからの設計プロセスを経験させること。これには、ハードウェア設計とVLAを中心とする開発トレーニングが含まれます。" },
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "Mシリーズを組み合わせて5軸ロボットアームをカスタマイズし、運動学アルゴリズムの例を提供しました。エンドエフェクタ設計の質疑応答を行い、VLAテクノロジーに関するセミナーを開催して、原理とデプロイ方法を解説しました。" }
        ]
      }
    }
  },
  {
    category: "sci-tech-innovation",
    images: ["images/image11.jpeg", "images/image12.png"],
    locales: {
      zh: {
        title: "典型案例2：北京市海淀区教师进修附属实验学校",
        nodes: [
          { type: "h4", text: "背景说明：" },
          { type: "p", text: "构建具身机器人实验室，面向初高中开设选修课及社团，让学生亲手开发具身机器人产品，体验任务规划、感知决策和操作执行。" },
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "采购M系列方案用于创新制作，辅以RAI-P4和ALO-LE4供体验。开设三个覆盖初高中班级的实操课程，结合结构、控制与AI，从零设计校园场景具身机器人实操应用。" }
        ]
      },
      en: {
        title: "Case 2: Haidian District Teachers' Training School Affiliated Experimental School",
        nodes: [
          { type: "h4", text: "Background:" },
          { type: "p", text: "The goal was to build an embodied robotics lab for middle and high school students, offering electives and clubs where they develop embodied robots from scratch and experience task planning, decision-making, and execution." },
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "Procured M-Series kits for hands-on innovation, paired with RAI-P4 and ALO-LE4 for advanced AI experience. Opened three classes across grade levels blending mechanics, control, and AI to construct campus-scenario robots." }
        ]
      },
      ja: {
        title: "事例2：北京市海淀区教師研修付属実験学校",
        nodes: [
          { type: "h4", text: "背景：" },
          { type: "p", text: "中高生向けの身体性ロボティクスラボを構築し、選択科目やクラブ活動を提供。学生が自らロボットを開発し、タスクプランニング、認識・意思決定、操作実行を体験できるようにします。" },
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "イノベーション制作のためにMシリーズを導入し、体験用にRAI-P4およびALO-LE4を用意。中高生を対象とした3つのクラスを開設し、構造・制御・AIを組み合わせて、キャンパスのシナリオに合わせたロボットをゼロから設計しました。" }
        ]
      }
    }
  },
  {
    category: "sci-tech-innovation",
    images: ["images/image13.png"],
    locales: {
      zh: {
        title: "典型案例3：北京第一实验学校",
        nodes: [
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "成立具身智能实验室与工作室，实验室负责普及化实训教学（机器人本体、感知、机器视觉、大模型）。工作室实施小组化研发，解决如化学实验前处理、情绪干预等真实场景需求。期间企业工程师作为技术顾问协助攻克技术难点。" }
        ]
      },
      en: {
        title: "Case 3: Beijing First Experimental School",
        nodes: [
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "Established an Embodied Intelligence lab and studio. The lab handles widespread practical teaching (robot hardware, perception, vision, LLMs). The studio operates in small R&D groups to solve real-world problems (e.g., chemistry lab pre-processing, emotional intervention). Enterprise engineers serve as technical consultants." }
        ]
      },
      ja: {
        title: "事例3：北京第一実験学校",
        nodes: [
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "身体性AIの実験室およびスタジオを設立。実験室では普及型の実践教育（ロボット本体、知覚、マシンビジョン、LLM）を担当。スタジオでは小グループでのR&Dを実施し、化学実験の前処理や感情介入といった実際のシナリオでのニーズに対応。企業エンジニアが技術コンサルタントとしてサポートを提供。" }
        ]
      }
    }
  },

  // ==========================================
  // Innovation Competition
  // ==========================================
  {
    category: "innovation-competition",
    images: ["images/image14.jpeg"],
    locales: {
      zh: {
        title: "典型案例1：呼和浩特职业学院",
        nodes: [
          { type: "h4", text: "需求说明：" },
          { type: "p", text: "比赛日益侧重智能化（视觉、AI等），传统基于机械的技术积累无法满足；大一新生缺乏构架及软硬件基础，急迫需要将新技术转化为初学者易于执行的路径。" },
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "选用了高拓展的GX-MAT-09系列套件。我们与带队老师确立了具身智能赛题方向，赛前共创技术分解并制定可行路线；赛中提供线上线下技术答疑；最终助力该队获得'挑战杯'省特等奖及校级金奖。" }
        ]
      },
      en: {
        title: "Case 1: Hohhot Vocational College",
        nodes: [
          { type: "h4", text: "Requirements:" },
          { type: "p", text: "Competitions constantly demand higher intelligence (vision, AI), making traditional mechanical knowledge insufficient. Incoming freshmen require an accessible path to grasp complex software/hardware architectures." },
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "Deployed the highly expandable GX-MAT-09 robotics kit. We collaborated with instructors to pinpoint an embodied AI competition topic, providing detailed technical breakdowns before the competition, offering continuous online/offline QA during, culminating in a Provincial Grand Prize in the Challenge Cup." }
        ]
      },
      ja: {
        title: "事例1：フフホト職業学院",
        nodes: [
          { type: "h4", text: "ニーズ：" },
          { type: "p", text: "コンテストは徐々にインテリジェント化（ビジョン、AIなど）を重視しており、従来の機械技術の蓄積では対応できません。新入生には複雑な枠組みやソフトウェア・ハードウェアの基礎を習得させるための、実行しやすい学習ルートが早急に必要でした。" },
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "拡張性の高いGX-MAT-09シリーズのキットを選択しました。私たちは教員と協力して身体性AIの競技テーマを決定し、事前に技術的な分解を行い、実行可能なルートを策定しました。期間中はオンライン・オフラインでの技術サポートを提供し、最終的に「チャレンジカップ」で省特賞および校内金賞を獲得しました。" }
        ]
      }
    }
  },
  {
    category: "innovation-competition",
    images: [],
    locales: {
      zh: {
        title: "典型案例2：浙江农林大学",
        nodes: [
          { type: "h4", text: "解决方案：" },
          { type: "p", text: "1.根据构型全面的竞赛要求，引入支持快速拼装组合的GX-MAT-09设备；\n2.为不同基础学生定制从电机驱动到视觉识别、机器学习等多阶段知识库；\n3.开放标准零部件的3D打印模型文件，提升了竞赛备赛的灵活性与资源调配能力。" }
        ]
      },
      en: {
        title: "Case 2: Zhejiang A&F University",
        nodes: [
          { type: "h4", text: "Solutions:" },
          { type: "p", text: "1. Based on diverse competition structure requirements, introduced the fast-assembly GX-MAT-09 kits.\n2. Curated varied knowledge bases connecting motor drives to visual recognition and machine learning for students of different skill levels.\n3. Open-sourced 3D print models of standard components to boost team resourcefulness." }
        ]
      },
      ja: {
        title: "事例2：浙江農林大学",
        nodes: [
          { type: "h4", text: "ソリューション：" },
          { type: "p", text: "1. 多様な構成が求められるコンテストに合わせ、迅速な組み立てが可能なGX-MAT-09デバイスを導入。\n2. さまざまなレベルの学生向けに、モーター駆動から視覚認識、機械学習まで、多段階のナレッジベースを整備。\n3. コンテスト準備の柔軟性とリソース配置能力を高めるため、標準部品の3Dプリント用モデルファイルを公開。" }
        ]
      }
    }
  },

  // ==========================================
  // Training Base
  // ==========================================
  {
    category: "training-base",
    images: ["images/image15.jpeg", "images/image16.jpeg", "images/image17.jpeg", "images/image18.jpeg"],
    locales: {
      zh: {
        title: "典型案例1：北京坊（北京天安门旁）",
        nodes: [
          { type: "p", text: "人工智能+机器人+3D打印=具身智能产品设计\n研学游+培训+技术答疑=具身智能科技图书馆" }
        ]
      },
      en: {
        title: "Case 1: Beijing Fun (Near Tiananmen)",
        nodes: [
          { type: "p", text: "Artificial Intelligence + Robotics + 3D Printing = Embodied Intelligent Product Design.\nEducational Tours + Training + Technical Q&A = Embodied Intelligence Technology Library." }
        ]
      },
      ja: {
        title: "事例1：北京坊（北京・天安門付近）",
        nodes: [
          { type: "p", text: "人工知能＋ロボット＋3Dプリント＝身体性AI製品デザイン\n教育ツアー＋トレーニング＋技術Ｑ＆Ａ＝身体性AIテクノロジー図書館" }
        ]
      }
    }
  },
  {
    category: "training-base",
    images: ["images/image19.jpeg", "images/image20.jpeg", "images/image21.jpeg", "images/image22.jpeg"],
    locales: {
      zh: {
        title: "典型案例2：中山火炬开发区",
        nodes: [
          { type: "p", text: "本地区开展了以具身智能创新教育为核心的大规模培训合作基地建设，覆盖当地科技院校师生。" }
        ]
      },
      en: {
        title: "Case 2: Zhongshan Torch Development Zone",
        nodes: [
          { type: "p", text: "Established a large-scale training and collaboration base centered on embodied intelligence innovation education, benefiting teachers and students across local technical institutes." }
        ]
      },
      ja: {
        title: "事例2：中山火炬開発区",
        nodes: [
          { type: "h4", text: "概要：" },
          { type: "p", text: "身体性AIイノベーション教育を中核とした大規模なトレーニング協力拠点の整備を展開し、現地の技術系学校の教員と学生を対象としています。" }
        ]
      }
    }
  }
];
