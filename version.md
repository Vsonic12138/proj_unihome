# 更新日志

记录更新内容，提交的时候无需将日期一起放入commit当中。

**更新类型说明：**
- 类型(type)：
  - feat: 功能变更（新增/修改功能）
  - remove: 删除内容（文件/代码/资源）
  - refactor: 代码重构（结构调整/优化）
  - docs: 文档相关（README/注释/手册）
  - fix: 问题修复（BUG/逻辑错误）
  - ui: 界面调整（布局/样式/交互）
  - chore: 日常维护（构建/配置/清理）
  - test: 测试相关（用例/框架）

**版本规则：**

版本格式: `V{主版本}.{次版本}.{修订版本}`

**版本号说明**:
- 主版本: 当做出不兼容的 API 修改或重大功能变更时递增
- 次版本: 当以向后兼容的方式添加功能时递增
- 修订版本: 当进行向后兼容的问题修复时递增

**版本升级规则**:
- 修订版本 `V1.0.1`: 修复小问题、安全性更新
- 次版本 `V1.1.0`: 添加向后兼容的新功能
- 主版本 `V2.0.0`: 重大功能更新、不兼容的API变更

**注意事项**:
- 版本号严格按照语义化版本规范执行
- 每次发布新版本时，至少递增一个数字
- 首次发布版本号从 `V1.0.0` 开始

---

V1.13.0 feat(products): 全面重构UNI-WR2产品详情，构建桌面级ROS工程化教学体系

类型: feat, docs, ui, refactor

范围: products, i18n, public

说明:

本次更新的核心是为“便携式ROS导航机器人学习平台 UNI-WR2”创建了全面、高度结构化的产品详情页内容。我们对其数据体系进行了彻底重构，新增了从产品概述、特性、硬件配置到结构化实验体系的全方位信息，并为其补充了完整的产品图片资源。为支持这些深度内容，我们还对产品详情页的渲染逻辑进行了重构，使其能够展示更丰富、更灵活的数据结构。

实现细节:

1.  **新增 UNI-WR2 产品体系**
    *   `src/i18n/locales/zh.ts`: 在国际化文件中，为 `uni-wr2` 添加了完整且详尽的数据结构。
        *   **内容深度扩充**: 新增了 `overview` (概述), `applicable` (适用场景), `highlights` (核心亮点), `features` (产品特点), `sensorConfig` (传感器配置), `controllerConfig` (控制器配置), `softwareConfig` (软件配置) 等字段，并填充了专业内容。
        *   **结构化实验体系**: 全面设计了 `experiments` 字段，将其组织为按 `sections` (章节) 划分的结构化大纲，涵盖了从“ROS 基础”到“移动机器人运动学控制”的3大主题，共计8个具体实验项目。
        *   **自定义内容区块**: 在 `sampleCases` 中引入了 `sections` 结构，用于自定义展示外观、尺寸、BOM 等内容，取代了原有的固定分类。
        *   **图文并茂的特性**: `features` 字段现在支持内嵌 `media` 数组，允许每个产品特性都配有多张图片进行说明。

2.  **产品详情页 UI 渲染重构**
    *   `src/app/[locale]/products/[slug]/page.tsx`: 对产品详情页的渲染逻辑进行了重构，以增强其对不同数据结构的适应性。
        *   **特性媒体渲染**: 组件现在能够动态渲染每个 `feature` 卡片中包含的图片网格，使特性介绍更直观。
        *   **自定义区块渲染**: 页面新增了对 `sampleCases.sections` 的渲染逻辑，使其可以根据数据动态生成标题和图片网格，提高了内容展示的灵活性。
        *   **向后兼容**: 渲染逻辑会优先检查并使用新的 `sampleCustomSections`，如果不存在，则回退到旧的 `modules`, `chassis` 等分类，确保了对旧数据的兼容性。
        *   **样式优化**: 调整了控制器配置图片的布局和样式，使其在页面上展示效果更佳。

3.  **新增产品图片资源**
    *   `public/images/products/uni-wr2/`: 为 UNI-WR2 新增了12张高质量产品图片，包括主图 (`hero`)、各角度外观图、功能示意图、硬件细节图（控制器、BOM）以及软件图标，并已在产品数据中正确引用。

文件变更:

新增文件:
- [`public/images/products/uni-wr2/uni-wr2-bom.png`](public/images/products/uni-wr2/uni-wr2-bom.png)
- [`public/images/products/uni-wr2/uni-wr2-controller.png`](public/images/products/uni-wr2/uni-wr2-controller.png)
- [`public/images/products/uni-wr2/uni-wr2-desktop-layout.png`](public/images/products/uni-wr2/uni-wr2-desktop-layout.png)
- [`public/images/products/uni-wr2/uni-wr2-dimensions.png`](public/images/products/uni-wr2/uni-wr2-dimensions.png)
- [`public/images/products/uni-wr2/uni-wr2-exterior-overview.png`](public/images/products/uni-wr2/uni-wr2-exterior-overview.png)
- [`public/images/products/uni-wr2/uni-wr2-feature-charging.png`](public/images/products/uni-wr2/uni-wr2-feature-charging.png)
- [`public/images/products/uni-wr2/uni-wr2-feature-deploy-1.png`](public/images/products/uni-wr2/uni-wr2-feature-deploy-1.png)
- [`public/images/products/uni-wr2/uni-wr2-feature-deploy-2.png`](public/images/products/uni-wr2/uni-wr2-feature-deploy-2.png)
- [`public/images/products/uni-wr2/uni-wr2-feature-portable.png`](public/images/products/uni-wr2/uni-wr2-feature-portable.png)
- [`public/images/products/uni-wr2/uni-wr2-hero.png`](public/images/products/uni-wr2/uni-wr2-hero.png)
- [`public/images/products/uni-wr2/uni-wr2-software-ros.png`](public/images/products/uni-wr2/uni-wr2-software-ros.png)
- [`public/images/products/uni-wr2/uni-wr2-software-ubuntu.png`](public/images/products/uni-wr2/uni-wr2-software-ubuntu.png)

修改文件:
- [`src/app/[locale]/products/[slug]/page.tsx`](src/app/[locale]/products/[slug]/page.tsx) (重构UI渲染以支持更丰富的数据结构)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (全面重构UNI-WR2产品数据)

改进效果:

- **产品信息极大丰富**: UNI-WR2 的产品信息变得极为详尽和专业，其深度内容为目标用户（高校师生、研究人员）提供了极高的参考价值。
- **页面灵活性提升**: 产品详情页模板现在能够适应更多样化的内容结构和布局需求，为未来添加更多不同形态的产品打下了坚实基础。
- **教学价值凸显**: 全新的结构化实验体系清晰地展示了该产品的教学路径和应用场景，显著提升了其在教育市场的吸引力。

影响范围:

- 网站 “UNI-WR2” 产品的详情页内容已全面更新。
- 访问该页面的用户将能获取到关于此产品的全面、深入的信息。

---

V1.12.0 feat(products): 全面重构RAI-P4产品详情，构建具身智能任务规划体系

类型: feat, docs, refactor, ui

范围: products, i18n, components, public

说明:

本次更新的核心是为“具身智能任务规划实训平台 RAI-P4”产品创建了全面、高度结构化的产品详情页内容。我们对其数据体系进行了彻底重构，新增了从产品概述、特性、应用案例到软硬件配置的全方位信息，并为其设计了一套包含超过40个实验项目的全新实验体系。为支持这些深度内容，我们还对产品详情页的渲染逻辑进行了重构，使其更具灵活性和可扩展性。

实现细节:

1.  **新增 RAI-P4 产品体系**
    *   `src/i18n/locales/zh.ts`: 在国际化文件中，为 `rai-p4` 添加了完整且详尽的数据结构。
        *   **内容深度扩充**: 新增了 `overview` (概述), `features` (产品特点), `sampleCases` (样机案例), `sensorConfig` (传感器配置), `controllerConfig` (控制器配置), `softwareConfig` (软件配置) 等字段，并填充了专业内容。
        *   **结构化实验体系**: 全面设计了 `experiments` 字段，将其组织为按 `sections` (章节) 划分的结构化大纲，涵盖了从“机器人本体控制”到“嵌入式开发”的9大主题，共计40余个具体实验项目，逻辑清晰，内容详实。
        *   **专业化案例与配置**: 为 `sampleCases` 和 `softwareConfig` 增加了更具体的展示内容和图片，并允许通过数据驱动的方式自定义其样式。

2.  **产品详情页 UI 渲染重构**
    *   `src/app/[locale]/products/[slug]/page.tsx`: 对产品详情页的渲染逻辑进行了重构，以增强其对不同数据结构的适应性。
        *   **数据驱动样式**: 组件现在可以从产品数据中读取并应用自定义的 CSS 类名（如 `modulesGridClassName`, `softwareImageGridClassName` 等），使得不同产品的布局可以高度定制化，提高了组件的灵活性和可复用性。
        *   **健壮性提升**: 代码现在会优雅地处理可选字段（如 `sampleCases`, `softwareConfig`），确保即使某些产品数据不完整，页面也能正常渲染。

3.  **组件功能增强**
    *   `src/components/Products/ImageGridWithLightbox.tsx`: 为图片网格组件新增了 `cardClassName` 属性，允许对单个图片卡片容器进行样式定制，以适应不同尺寸和布局的图片展示需求。

4.  **新增产品图片资源**
    *   `public/images/products/rai-p4/`: 为 RAI-P4 新增了产品主图 (`hero.png`) 以及多张展示其核心功能的图片（任务规划、工作流、软件套件），并已在产品数据中正确引用。

文件变更:

新增文件:
- [`public/images/products/rai-p4/rai-p4-hero.png`](public/images/products/rai-p4/rai-p4-hero.png)
- [`public/images/products/rai-p4/rai-p4-manipulator-workflows.png`](public/images/products/rai-p4/rai-p4-manipulator-workflows.png)
- [`public/images/products/rai-p4/rai-p4-software-suite.png`](public/images/products/rai-p4/rai-p4-software-suite.png)
- [`public/images/products/rai-p4/rai-p4-task-planning.png`](public/images/products/rai-p4/rai-p4-task-planning.png)

修改文件:
- [`src/app/[locale]/products/[slug]/page.tsx`](src/app/[locale]/products/[slug]/page.tsx) (重构UI渲染以支持数据驱动样式)
- [`src/components/Products/ImageGridWithLightbox.tsx`](src/components/Products/ImageGridWithLightbox.tsx) (增加样式定制属性)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (全面重构RAI-P4产品数据)

改进效果:

- **产品信息极大丰富**: RAI-P4 的产品信息变得极为详尽和专业，其深度内容为目标用户（高校师生、研究人员）提供了极高的参考价值。
- **页面灵活性提升**: 产品详情页模板现在能够适应更多样化的内容结构和布局需求，为未来添加更多不同形态的产品打下了坚实基础。
- **教学价值凸显**: 全新的结构化实验体系清晰地展示了该产品的教学路径和应用场景，显著提升了其在教育市场的吸引力。

影响范围:

- 网站新增 “RAI-P4” 产品的深度详情页。
- 访问该页面的用户将能获取到关于此产品的全面、深入的信息。

---

V1.11.0 feat(products): 新增GX-MAT-09S产品详情，重构实验体系与UI

类型: feat, docs, ui, refactor

范围: products, i18n, components, public

说明:

本次更新的核心是为产品线新增了一款旗舰级产品——“具身机器人创新设计平台（增强版）GX-MAT-09S”。我们为其创建了全面、高度结构化的产品详情页内容，涵盖了从产品概述、特性、样机案例到传感器、控制器、软件配置的全方位信息。特别地，我们为其设计了一套包含超过70个实验项目的全新实验体系，并对产品详情页的UI渲染逻辑进行了重构，以更好地展示这些深度内容。

实现细节:

1.  **新增 GX-MAT-09S 产品体系**
    *   `src/i18n/locales/*.ts`: 在三种语言（中、英、日）的国际化文件中，为 `gx-mat-09s` 添加了完整且详尽的数据结构。
        *   **内容深度扩充**: 新增了 `overview` (概述), `features` (产品特点), `sampleCases` (样机案例), `sensorConfig` (传感器配置), `controllerConfig` (控制器配置), `softwareConfig` (软件配置) 等字段，并填充了专业内容。
        *   **结构化实验体系**: 全面重构了 `experiments` 字段，将其设计为按 `sections` (章节) 组织的结构化大纲，涵盖了从“单片机”到“移动导航”的9大主题，共计78个具体实验项目，逻辑清晰，内容详实。
        *   **样机案例分组**: 在 `sampleCases` 中引入了 `compositeGroups` 字段，用于分类展示基于不同底盘的复合机器人组合，使信息结构更有条理。

2.  **产品详情页 UI 渲染升级**
    *   `src/app/[locale]/products/[slug]/page.tsx`: 对产品详情页的渲染逻辑进行了多项重构，以适配新的数据结构。
        *   **动态计数**: 样机案例部分的标题（如“机器人模块”、“机器人底盘”）现在会动态计算并显示其包含的种类数量。
        *   **实验体系渲染**: 页面现在能够渲染新的、按章节划分的实验体系，将每个实验章节以独立的卡片形式展示，提升了可读性。
        *   **分组列表展示**: 新增了对 `compositeGroups` 的渲染逻辑，以分组形式清晰地展示各类复合机器人。

3.  **新增产品图片资源**
    *   `public/images/products/gx-mat-09s/`: 为 GX-MAT-09S 新增了产品主图 (`hero.png`) 以及多张控制器图片（Arduino, RDK X5, STM32），并已在 `controllerConfig` 中正确引用。

4.  **组件样式微调**
    *   `src/components/Products/ImageGridWithLightbox.tsx`: 为图片网格中的图片添加了 `rounded-lg` 样式，使其视觉效果与网站整体风格更统一。

文件变更:

新增文件:
- [`public/images/products/gx-mat-09s/hero.png`](public/images/products/gx-mat-09s/hero.png)
- [`public/images/products/gx-mat-09s/controller/arduino-mega2560.png`](public/images/products/gx-mat-09s/controller/arduino-mega2560.png)
- [`public/images/products/gx-mat-09s/controller/rdk-x5.png`](public/images/products/gx-mat-09s/controller/rdk-x5.png)
- [`public/images/products/gx-mat-09s/controller/stm32f407.jpg`](public/images/products/gx-mat-09s/controller/stm32f407.jpg)

修改文件:
- [`src/app/[locale]/products/[slug]/page.tsx`](src/app/[locale]/products/[slug]/page.tsx) (重构UI渲染以适配新数据)
- [`src/components/Products/ImageGridWithLightbox.tsx`](src/components/Products/ImageGridWithLightbox.tsx) (样式微调)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts) (新增GX-MAT-09S产品数据)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts) (新增GX-MAT-09S产品数据)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (新增GX-MAT-09S产品数据)

改进效果:

- **产品信息极大丰富**: GX-MAT-09S 成为网站上内容最详尽的产品，其专业性和深度为目标用户（高校师生、研究人员）提供了极高的参考价值。
- **内容结构优化**: 新的实验体系和分组展示方式，使得复杂的产品信息更易于理解和消化。
- **用户体验提升**: 动态计数和更具结构感的UI布局，提升了产品详情页的整体浏览体验。

影响范围:

- 网站新增 “GX-MAT-09S” 产品详情页。
- 访问该页面的用户将能获取到关于此产品的全面、深入的信息。

---

V1.10.0 feat(products): 引入图片灯箱并全面更新产品体系

类型: feat, ui, docs, refactor

范围: products, i18n, components, public

说明:

本次更新专注于提升产品页面的用户体验和信息深度。我们为产品详情页引入了带灯箱（Lightbox）功能的图片网格组件，使用户可以点击查看高清大图。同时，对全线产品的数据进行了系统性的重构和扩充，统一了产品型号命名，并为每款核心产品补充了详细的配置、实验案例和技术规格，使产品信息更加专业、完整。

实现细节:

1.  **新增图片灯箱组件 (Image Lightbox)**
    *   `src/components/Products/ImageGridWithLightbox.tsx`: 创建了一个全新的、可复用的图片网格组件，该组件集成了灯箱功能，允许用户点击图片后进行放大预览。
    *   `src/app/[locale]/products/[slug]/page.tsx`: 在 Ubot MR20 产品详情页中，使用 `ImageGridWithLightbox` 组件重构了“机器人模块”、“机器人底盘”和“复合机器人”部分的图片展示逻辑，替代了原有的静态图片列表，提升了交互体验和代码的可维护性。

2.  **产品数据体系全面升级**
    *   `src/i18n/locales/*.ts`: 对三种语言（中、英、日）的国际化文件进行了大规模内容更新。
        *   **产品型号标准化**: 统一并简化了产品型号，例如 `gx-mat-09s23` 更新为 `gx-mat-09s`，`rai-p433` 更新为 `rai-p4` 等，使其更清晰易记。
        *   **内容结构化扩充**: 为 `gx-mat-09s`, `rai-p4`, `rai-m4`, `rai-q2`, `uni-wr2`, `alo-le4` 等核心产品系统性地补充了 `configuration` (配置清单), `experiments` (实验项目), `specs` (技术参数) 等详细字段。
        *   **FAQ 更新**: 根据新的产品体系和定位，全面修订了“常见问题解答”部分的内容，使其信息更准确、更具指导性。

3.  **新增产品详情图片**
    *   `public/images/products/ubot-mr20/`: 为 Ubot MR20 产品新增了控制器 (`controller`) 和软件界面 (`software`) 的高清图片。
    *   `src/i18n/locales/*.ts`: 将新增的图片资源整合进 `ubot-mr20` 的 `controllerConfig` 和 `softwareConfig` 数据中，实现了图文并茂的展示效果。

4.  **项目配置调整**
    *   `tsconfig.json`: 将 `jsx` 编译选项从 `"react-jsx"` 修改为 `"preserve"`，以适应项目构建需求。
    *   `next-env.d.ts`: 更新了 Next.js 的类型定义引用路径。

文件变更:

新增文件:
- [`public/images/products/ubot-mr20/controller/controller-overview.png`](public/images/products/ubot-mr20/controller/controller-overview.png)
- [`public/images/products/ubot-mr20/software/openblock-interface-1.jpg`](public/images/products/ubot-mr20/software/openblock-interface-1.jpg)
- [`public/images/products/ubot-mr20/software/openblock-interface-2.jpg`](public/images/products/ubot-mr20/software/openblock-interface-2.jpg)
- [`src/components/Products/ImageGridWithLightbox.tsx`](src/components/Products/ImageGridWithLightbox.tsx)

修改文件:
- [`src/app/[locale]/products/[slug]/page.tsx`](src/app/[locale]/products/[slug]/page.tsx) (重构图片展示逻辑)
- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts) (全面更新产品数据体系)
- [`src/i18n/locales/ja.ts`](src/i18n/locales/ja.ts) (全面更新产品数据体系)
- [`src/i18n/locales/zh.ts`](src/i18n/locales/zh.ts) (全面更新产品数据体系)
- [`tsconfig.json`](tsconfig.json) (更新编译选项)
- [`next-env.d.ts`](next-env.d.ts) (更新类型引用)

改进效果:

- **用户体验提升**: 新的灯箱组件让用户可以更清晰地查看产品细节图，交互更友好。
- **信息专业化**: 结构化的产品数据和详尽的技术规格，极大地提升了产品信息的专业性和透明度，有助于用户进行精准选型。
- **内容一致性**: 标准化的产品命名和同步更新的 FAQ，确保了网站信息的一致性和准确性。

影响范围:

- “Ubot MR20” 产品详情页的图片展示方式已更新。
- 网站所有产品的数据信息、型号和介绍内容均已全面刷新。

---

V1.9.0 feat(products): 丰富Ubot MR20产品详情页，增加模块化案例与实验体系

类型: feat, ui, docs

范围: products, i18n, public

说明:

本次更新极大地丰富了“Ubot MR20 具身智能机器人创新设计套件”的产品详情页。我们为其增加了全面的内容，包括详细的产品特点、模块化的样机案例、完整的传感器与控制器配置、以及一套从入门到进阶的结构化实验体系。同时，新增了数十张高清产品图片，为用户提供了更直观、更深入的产品了解体验。

实现细节:

1.  **产品内容体系化扩充**
    *   `src/i18n/locales/*.ts`: 针对 `ubot-mr20` 产品，在三种语言（中、英、日）的国际化文件中完全重构了数据结构。新增了 `overview` (概述), `features` (产品特点), `sampleCases` (样机案例), `sensorConfig` (传感器配置), `controllerConfig` (控制器配置), `softwareConfig` (软件配置), `experiments` (实验项目) 和 `specs` (技术参数) 等多个详细字段。
    *   `experiments` 字段被设计为一套完整的教学大纲，涵盖了从“实验准备”到“扩展项目”的六个阶段，共包含32个基础实验和20个扩展项目，逻辑清晰，内容详实。

2.  **产品详情页UI重构与渲染**
    *   `src/app/[locale]/products/[slug]/page.tsx`: 更新了产品详情页的渲染逻辑，以适配新的、高度结构化的产品数据。页面现在可以动态展示样机案例中的各类图片（如机器人模块、底盘、机械臂、复合机器人），并以清晰的卡片和列表形式呈现实验项目和技术规格。

3.  **新增大量高清产品图片**
    *   `public/images/products/`: 新增了 `ubot-mr20` 的主图 (`ubot-mr20-main.jpg`) 以及一个包含超过30张图片的 `ubot-mr20` 专属目录。这些图片详细展示了产品的各个模块、不同底盘和机械臂的组合形态，为页面内容提供了强有力的视觉支持。

4.  **国际化文案与标签更新**
    *   在 `detailLabels` 中添加了新的标签（如“产品特点”、“样机案例”、“机器人模块”等），以支持新版详情页的UI展示。
    *   更新了产品列表页中 `ubot-mr20` 的简介和图片，使其信息与详情页保持一致。

文件变更:

新增文件:
- public/images/products/ubot-mr20-main.jpg
- public/images/products/ubot-mr20/ (整个目录及其下所有图片)

修改文件:
- src/app/[locale]/products/[slug]/page.tsx (适配新数据结构，重构UI渲染)
- src/i18n/locales/en.ts (全面更新ubot-mr20产品数据)
- src/i18n/locales/ja.ts (全面更新ubot-mr20产品数据)
- src/i18n/locales/zh.ts (全面更新ubot-mr20产品数据)

改进效果:

- **信息深度提升**: 产品页面从简单的概述升级为一份详尽的产品白皮书，极大地提升了信息的专业性和完整性。
- **用户体验优化**: 图文并茂的展示方式，特别是模块化案例的可视化呈现，使用户能够快速理解产品的核心价值和多变形态。
- **教学价值凸显**: 完整的实验体系清晰地展示了该产品的教育路径和应用场景，对教育工作者和学习者更具吸引力。

影响范围:

- 网站的 `Ubot MR20` 产品详情页外观和内容被彻底更新。
- 访问该页面的用户将能获取到关于此产品的全面、深入的信息。

---

V1.8.0 refactor(products): 重构产品目录结构并移除博客与认证功能

类型: refactor, remove, ui

范围: products, i18n, components, pages

说明:

本次更新旨在精简网站功能，将核心聚焦于产品展示。为此，我们对产品目录的数据结构进行了重构，并彻底移除了博客（Blog）和用户认证（Sign In/Sign Up）两大模块。这使得网站的导航更清晰，内容结构更合理，同时也降低了后续的维护成本。

实现细节:

1. 产品目录结构重构
   - `src/i18n/locales/*.ts`: 核心数据结构变更。将原有的扁平化产品列表 (`products.catalog.items`) 调整为按系列分组的结构 (`products.catalog.series`)，例如 “M 系列” 和 “P 系列”，使产品分类更加清晰。
   - `src/components/Products/index.tsx`: 更新了产品列表页的渲染逻辑，现在会先遍历产品系列，再展示系列下的具体产品卡片。
   - `src/app/[locale]/products/[slug]/page.tsx`: 修改了动态路由的静态参数生成逻辑 (`generateStaticParams`)，以适配新的嵌套式产品数据结构。
   - 内容更新: 全面更新了所有产品信息，包括型号（如 `ubot-mr205` -> `ubot-mr20`）、名称、描述、FAQ 和规格详情，并将核心产品数量从 8 款调整为 7 款。

2. 博客与认证功能移除
   - 文件删除:
     - 移除了所有与博客相关的页面 (`/blog`, `/blog-details`, `/blog-sidebar`) 和组件 (`src/components/Blog/*`)。
     - 移除了所有与用户认证相关的页面 (`/signin`, `/signup`) 和内容组件 (`src/app/signin/*`, `src/app/signup/*`)。
   - UI 简化:
     - `src/components/Header/index.tsx`: 移除了页眉中的“登录”和“注册”按钮，简化了顶部导航栏。
     - `src/app/[locale]/layout.tsx`: 从布局组件中删除了传递给页眉的 `auth` 属性。
   - 国际化文案清理:
     - 从 `en.ts`, `ja.ts`, `zh.ts` 文件中彻底删除了已不再使用的 `auth`, `blog`, `blogDetailPage` 等国际化文案对象，保持了配置的整洁。

文件变更:

删除文件:
- src/app/[locale]/blog/page.tsx
- src/app/[locale]/blog-details/page.tsx
- src/app/[locale]/blog-sidebar/page.tsx
- src/app/[locale]/signin/page.tsx
- src/app/[locale]/signup/page.tsx
- src/app/blog/BlogContent.tsx
- src/app/blog-details/BlogDetailsContent.tsx
- src/app/blog-sidebar/BlogSidebarContent.tsx
- src/app/signin/SigninContent.tsx
- src/app/signup/SignupContent.tsx
- src/components/Blog/* (整个目录)

修改文件:
- src/i18n/locales/en.ts (重构产品数据，移除废弃文案)
- src/i18n/locales/ja.ts (重构产品数据，移除废弃文案)
- src/i18n/locales/zh.ts (重构产品数据，移除废弃文案)
- src/components/Products/index.tsx (适配新的产品系列结构)
- src/app/[locale]/products/[slug]/page.tsx (更新静态路由生成逻辑)
- src/components/Header/index.tsx (移除认证链接)
- src/app/[locale]/layout.tsx (移除认证属性传递)
- src/components/Features/index.tsx (更新首页精选方案展示逻辑)
- src/components/Products/ProductCard.tsx (样式微调)

改进效果:

- 聚焦核心业务: 网站内容完全围绕产品展开，为访客提供了更专注、更清晰的浏览体验。
- 提升可维护性: 通过移除非核心功能模块，简化了代码库，降低了复杂度和未来的维护成本。
- 优化信息架构: 产品按系列分类，结构更清晰，有助于用户根据需求快速找到合适的产品。

影响范围:
- 网站不再提供博客内容和用户注册/登录功能。
- 产品列表页的展示方式已更新为按系列分组。
- 网站的整体导航和信息结构更加精简。

---

V1.7.1 refactor(breadcrumb): 移除面包屑导航路径，简化页面标题组件

类型: refactor, ui

范围: components, pages, i18n

说明:

本次更新对面包屑（Breadcrumb）组件进行了重构，移除了传统的“首页 > 当前页面”导航路径，将其简化为一个只包含页面标题和描述的纯粹的页面介绍组件。此举旨在简化页面顶部UI，使用户更专注于当前页面的核心内容。

实现细节:

1. 面包屑组件重构
   - `src/components/Common/Breadcrumb.tsx`: 核心重构文件。
     - 完全移除了用于生成导航路径（如 "首页 / 关于我们"）的 `Link` 和 `ul` 列表结构。
     - 删除了 `homeLabel` 和 `homeHref` 属性，组件现在只负责展示 `pageName` 和 `description`。
     - 调整了布局样式，使其作为页面引言（Page Intro）的标题部分。

2. 封装组件与页面适配
   - `src/components/Common/PageIntro.tsx`: 作为 `Breadcrumb` 的直接封装组件，移除了对应的 `homeLabel` 和 `homeHref` 属性传递。
   - `src/app/[locale]/**/*.tsx`: 所有使用 `PageIntro` 或 `Breadcrumb` 的页面都进行了更新，删除了不再需要的属性。这包括“关于我们”、“联系我们”、“案例研究”下的所有子页面、“开发者服务”下的所有子页面以及“产品”页面等。
   - `src/app/*/AboutContent.tsx`, `ContactContent.tsx`, `BlogContent.tsx`, `ErrorContent.tsx`: 这些内容组件也同步更新，不再接收和传递面包屑相关的属性。

3. 国际化文案清理
   - `src/i18n/locales/*.ts`: 在 `en`, `ja`, `zh` 语言文件中，删除了已不再使用的 `breadcrumbs` 对象，保持了i18n配置的整洁。

文件变更:

修改文件:
- src/components/Common/Breadcrumb.tsx (组件核心重构)
- src/components/Common/PageIntro.tsx (移除废弃属性)
- src/app/about/AboutContent.tsx (适配组件变更)
- src/app/contact/ContactContent.tsx (适配组件变更)
- src/app/error/ErrorContent.tsx (适配组件变更)
- src/app/blog/BlogContent.tsx (适配组件变更)
- src/app/[locale]/about/page.tsx (适配组件变更)
- src/app/[locale]/case-studies/**/*.tsx (适配组件变更)
- src/app/[locale]/contact/page.tsx (适配组件变更)
- src/app/[locale]/custom-solutions/page.tsx (适配组件变更)
- src/app/[locale]/developers/**/*.tsx (适配组件变更)
- src/app/[locale]/error/page.tsx (适配组件变更)
- src/app/[locale]/products/page.tsx (适配组件变更)
- src/i18n/locales/en.ts (移除废弃文案)
- src/i18n/locales/ja.ts (移除废弃文案)
- src/i18n/locales/zh.ts (移除废弃文案)

改进效果:

- UI简化: 网站所有二级页面的顶部导航路径被移除，界面更加简洁、现代化。
- 代码可维护性提升: 通过移除不再需要的属性传递（prop drilling），简化了组件之间的依赖关系，使代码更易于维护。
- 职责单一: `Breadcrumb` 组件的职责更加明确，现在专注于作为页面标题展示，而非导航。

影响范围:
- 全站所有二级页面的顶部UI均已更新。
- 传统的面包屑导航功能已被移除。

---

V1.7.0 feat(footer): 重构页脚，增加社交媒体弹窗并更新链接结构

类型: feat, ui

范围: footer, components, i18n

说明:

本次更新对网站页脚（Footer）进行了全面重构，引入了交互式弹窗（Modal）来展示QQ和微信的二维码，并更新了页脚的链接结构，使其内容更符合网站的导航需求。此外，还对悬浮联系组件、“关于我们”板块的UI以及项目类型配置进行了优化。

实现细节:

1. 页脚功能重构与UI升级
   - `src/components/Footer/index.tsx`: 完全重构了页脚组件。
     - 使用 `useState` 管理弹窗状态，实现了点击社交图标（QQ、微信）弹出二维码模态窗口的功能。
     - 社交链接和页脚导航栏目现在通过读取i18n配置文件动态生成，增强了可维护性和国际化支持。
     - 新增了Bilibili图标链接。

2. 国际化内容更新
   - `src/i18n/locales/*.ts`: 在 `en`, `ja`, `zh` 语言文件中：
     - 更新了 `footer.columns` 的内容，将原有的“常用链接”、“条款政策”等替换为“产品”、“开发者服务”、“定制合作”，使其更具业务导向性。
     - 新增了 `footer.contact` 对象，用于存放联系方式、社交链接以及弹窗所需的文案。
     - 在 `floatingContact` 中增加了Bilibili的链接和文案。

3. 组件UI优化与功能增强
   - `src/components/Common/FloatingContact.tsx`:
     - 新增了Bilibili的快捷链接。
     - 淘宝链接改为从i18n配置中动态获取，而非硬编码。
   - `src/components/About/AboutSectionTwo.tsx`:
     - 为“关于我们”的第二部分内容区域增加了一个卡片式UI（圆角、阴影、背景），提升了视觉效果。

4. 项目配置优化
   - `tsconfig.json`: 将 `jsx` 选项从 `"preserve"` 更新为 `"react-jsx"`，并调整了 `include` 路径以优化类型检查。
   - `next-env.d.ts`: 更新了Next.js路由类型的引用方式，以适应新的项目配置。

文件变更:

修改文件:
- src/components/Footer/index.tsx (组件完全重构)
- src/i18n/locales/en.ts (页脚及联系方式内容更新)
- src/i18n/locales/ja.ts (页脚及联系方式内容更新)
- src/i18n/locales/zh.ts (页脚及联系方式内容更新)
- src/components/Common/FloatingContact.tsx (新增Bilibili链接)
- src/components/About/AboutSectionTwo.tsx (UI样式更新)
- tsconfig.json (JSX配置与类型路径更新)
- next-env.d.ts (类型引用方式更新)
- version.md (为新版本记录做准备)

改进效果:

- 交互体验提升: 用户现在可以通过点击页脚的图标直接查看QQ群和微信公众号的二维码，无需跳转页面。
- 信息架构优化: 页脚的导航链接经过重新组织，更能反映网站的核心内容板块，提高了导航效率。
- 代码可维护性增强: 将文案和链接集中到i18n文件中进行管理，使得组件更加数据驱动，便于未来修改。
- 视觉效果改善: “关于我们”板块的卡片式设计使页面布局更清晰、更具现代感。

影响范围:
- 网站的页脚部分在外观和功能上发生了显著变化。
- 用户与社交媒体渠道的交互方式得到简化。
- 网站的整体导航结构在页脚部分得到了更清晰的体现。

---

V1.6.0 feat(homepage): 重新设计主页，采用动态主视觉轮播和面向产品的功能

类型: feat, ui

范围: homepage, components, content

说明:

本次更新对网站首页进行了全面重构，引入了动态轮播的Hero组件，并重新设计了“核心优势”板块，将其升级为以产品为中心的“产品平台”展示区。通过移除部分冗余组件和内容，优化了页面结构，提升了视觉吸引力和信息传达效率。

实现细节:

1. 首页Hero区域重构
   - `src/components/Hero/index.tsx`: 将原有的静态Hero区域替换为支持自动播放的动态轮播组件。
   - `public/images/hero/`: 新增 `slide-1.png`, `slide-2.png`, `slide-3.png` 作为轮播图资源。
   - `src/i18n/locales/*.ts`: 更新了 `hero` 部分的文案，以适应新的轮播图数据结构，包含图片、链接等。

2. “产品平台”板块升级 (原“核心优势”)
   - `src/components/Features/index.tsx`: 重构了该组件，现在分为“精选方案矩阵”和“亮点”两部分，更聚焦于产品展示。
   - `src/components/Features/SingleFeature.tsx`: 更新了单个特性组件的UI，现在展示产品图片、摘要和关键词，而非简单的图标和段落。
   - `src/types/feature.ts`: 修改了 `Feature` 类型定义，以匹配新的数据结构。
   - `src/i18n/locales/*.ts`: 完全重写了 `features` 部分的文案，以反映新的“产品平台”定位。

3. 内容与组件简化
   - `src/components/About/AboutSectionOne.tsx`: 删除了此组件，简化了关于我们部分的介绍。
   - `src/components/Contact/NewsLatterBox.tsx`: 移除了邮件订阅组件，使联系表单更简洁。
   - `src/app/[locale]/page.tsx`: 更新首页布局，移除了已删除的组件。

4. UI与资源优化
   - `src/components/Footer/index.tsx`: 更新页脚的社交媒体图标，使用 `next/image` 组件加载SVG，并统一了图标风格。
   - `public/images/icons/`: 新增 `bilibili.svg`, `qq.svg`, `wechat.svg` 等新版图标，移除了旧版或命名不一致的图标。
   - `src/components/Common/FloatingContact.tsx`: 优化了悬浮联系组件的文案和图标。

文件变更:

新增文件:
- public/images/about/section-two.jpg
- public/images/hero/slide-1.png
- public/images/hero/slide-2.png
- public/images/hero/slide-3.png
- public/images/icons/bilibili.svg
- public/images/icons/qq.svg
- public/images/icons/wechat.svg
- public/images/products/placeholder.svg

删除文件:
- public/images/icons/QQ.svg
- public/images/icons/wechat-fill.svg
- src/components/About/AboutSectionOne.tsx
- src/components/Contact/NewsLatterBox.tsx

修改文件:
- src/app/[locale]/page.tsx (页面结构调整)
- src/components/Hero/index.tsx (组件完全重构)
- src/components/Features/index.tsx (组件重构)
- src/components/Features/SingleFeature.tsx (UI更新)
- src/components/Features/featuresData.tsx (数据结构更新)
- src/components/About/AboutSectionTwo.tsx (内容更新)
- src/components/Contact/index.tsx (移除订阅组件)
- src/components/Footer/index.tsx (图标实现方式更新)
- src/components/Common/FloatingContact.tsx (文案与图标更新)
- src/i18n/locales/en.ts (内容全面更新)
- src/i18n/locales/ja.ts (内容全面更新)
- src/i18n/locales/zh.ts (内容全面更新)
- src/types/feature.ts (类型定义更新)
- version.md (准备下一次版本记录)

改进效果:

- 视觉吸引力增强: 动态的首页轮播图提供了更强的视觉冲击力，能更好地展示核心业务场景。
- 信息架构优化: 以产品为中心的“产品平台”板块，使用户能更快速地了解核心产品与解决方案。
- 用户体验提升: 简化了页面内容，移除了非核心模块，使用户能更专注于关键信息。
- 代码可维护性: 组件化的重构和类型定义的更新，提升了代码质量和后续的可维护性。

影响范围:
- 网站首页的整体外观和用户体验发生了显著变化。
- “核心优势”板块被“产品平台”取代，信息传递的重心从抽象概念转向具体产品。
- 移除了邮件订阅功能，简化了用户与我们联系的渠道。

---

V1.5.1 chore(dependencies): 更新Next.js依赖至最新版本并优化项目配置

类型: chore

范围: dependencies, config

说明:

本次更新主要包含Next.js核心依赖的版本升级以及项目配置的优化。Next.js框架从15.4.5升级至15.5.6，同时更新了相关的SWC编译器和环境依赖。此外，对.gitignore文件进行了全面优化，增加了更多类型的忽略规则，使项目配置更加完善。

实现细节:

1. Next.js依赖升级
   - `package-lock.json`: 将Next.js主依赖从15.4.5升级至15.5.6
   - `@next/env`: 从15.4.5升级至15.5.6
   - 所有平台相关的SWC编译器依赖均从15.4.5升级至15.5.6 (darwin-arm64, darwin-x64, linux-arm64-gnu, linux-arm64-musl, linux-x64-gnu, linux-x64-musl, win32-arm64-msvc, win32-x64-msvc)
   - 各依赖项添加了peer属性标记，明确依赖关系

2. 项目配置优化
   - `next-env.d.ts`: 添加了对路由类型的引用，增强类型安全
   - `.gitignore`: 完全重构了忽略规则，增加了更全面的文件类型忽略，包括Turbo/SWC缓存、更多环境变量格式、编辑器配置文件等

文件变更:

修改文件:
- .gitignore (全面优化忽略规则)
- next-env.d.ts (添加路由类型引用)
- package-lock.json (Next.js及相关依赖升级)

改进效果:

- 项目依赖保持最新：确保使用最新的Next.js功能和安全修复
- 更完善的配置：.gitignore文件更加全面，避免不必要的文件被提交
- 类型安全增强：next-env.d.ts的更新提供了更好的路由类型支持
- 项目维护性提升：依赖关系更加清晰，便于后续维护

影响范围:
- 项目构建和运行基于更新后的Next.js版本
- Git提交行为受更新的忽略规则影响
- 类型检查包含新的路由类型定义

---

V1.5.0 feat(products): 新增产品详情页与悬浮联系组件，丰富交互体验

类型: feat, ui

范围: products, contact, components

说明:

本次更新引入了动态产品详情页，允许展示每个产品的详细信息、视频和常见问题解答(FAQ)。同时，新增了功能更强大的悬浮联系组件，集成了电话、QQ群和微信公众号等多种联系方式，极大地提升了用户获取信息和联系我们的便捷性。

实现细节:

1. 产品详情模块
   - `src/app/[locale]/products/[slug]/page.tsx`: 新增产品动态路由页面，用于展示单个产品的详细信息。
   - `src/components/Products/ProductCard.tsx`: 新增产品详情卡片组件，包含产品标题、描述、视频和功能列表等内容。
   - `src/components/Products/FAQ.tsx`: 新增可折叠的常见问题解答(FAQ)组件，以更好地解答用户疑问。

2. 悬浮联系组件增强
   - `src/components/Common/FloatingContact.tsx`: 重构悬浮联系组件，从简单的电话图标链接变为一个可展开的联系方式面板。
   - `public/images/contact/weChat-official-account.jpg`: 新增微信公众号二维码图片资源。
   - `public/images/icons/phone.svg`: 更新了电话图标的视觉样式。
   - 组件现在包含电话、QQ群二维码和微信公众号二维码，提供多种便捷的联系途径。

3. 首页与产品页集成
   - `src/app/[locale]/page.tsx`: 在首页右下角集成了新的悬浮联系组件，方便用户随时联系。
   - `src/app/[locale]/products/page.tsx`: 更新了产品列表页面，为后续展示产品卡片列表做好了准备。

4. 国际化内容支持
   - `src/i18n/locales/*.ts`: 在 `en`, `ja`, `zh` 语言文件中添加了新组件所需的翻译，如 "常见问题"、"联系我们"、"QQ群"、"微信公众号" 等。

文件变更:

新增文件:
- public/images/contact/weChat-official-account.jpg
- src/app/[locale]/products/[slug]/page.tsx
- src/components/Products/FAQ.tsx
- src/components/Products/ProductCard.tsx
- src/components/Products/index.tsx

修改文件:
- next-env.d.ts (类型定义清理)
- public/images/icons/phone.svg (图标样式更新)
- src/app/[locale]/page.tsx (集成悬浮联系组件)
- src/app/[locale]/products/page.tsx (页面结构更新)
- src/components/Common/FloatingContact.tsx (功能重构与UI增强)
- src/i18n/locales/en.ts (新增翻译)
- src/i18n/locales/ja.ts (新增翻译)
- src/i18n/locales/zh.ts (新增翻译)

改进效果:

- 信息更丰富: 用户现在可以查看详细的产品介绍、功能和常见问题，做出更明智的决策。
- 交互更便捷: 全局悬浮联系组件让用户可以随时随地找到联系方式，提升了客户服务的可及性。
- 体验更统一: 通过组件化的方式构建产品详情和FAQ，确保了网站整体风格的一致性。

影响范围:
- 网站新增了 `/products/[slug]` 动态产品详情路由。
- 网站所有页面的右下角将出现新的悬浮联系按钮，显著改变了用户联系我们的交互方式。
- 产品列表页面的内容结构已更新，为下一步的产品展示奠定了基础。

---

V1.4.0 remove(template): 移除定价、评价、视频等模板化组件，专注核心业务展示

类型: remove, ui, refactor

范围: homepage, components, branding, content

说明:

本次更新移除了网站中的模板化组件（定价、客户评价、视频展示），进一步简化网站结构，专注于智能机器人教育解决方案的核心业务内容展示。同时更新了品牌标识和相关内容，使网站更加专业和聚焦。

实现细节:

1. 模板化组件移除
   - `src/components/Pricing/`：删除整个定价组件目录，包括 `OfferList.tsx`、`PricingBox.tsx`、`index.tsx`
   - `src/components/Testimonials/`：删除客户评价组件目录，包括 `SingleTestimonial.tsx`、`index.tsx`
   - `src/components/Video/index.tsx`：删除视频展示组件

2. 首页结构简化
   - `src/app/[locale]/page.tsx`：移除 `Video`、`Testimonials`、`Pricing` 组件的导入和使用
   - 简化后的首页结构为：Hero → Features → Brands → AboutSectionOne → AboutSectionTwo → Contact
   - 保留核心业务展示内容，移除营销导向的模板化内容

3. 品牌标识优化
   - `public/images/logo/logo.svg`：主品牌标识文件优化，文件大小减少 70% (1340 → 393 行)
   - `public/images/logo/logo-2.svg`：品牌变体标识优化，文件大小减少 45% (739 → 437 行)
   - `public/images/logo/logo-text.svg`：文字标识大幅优化，文件大小减少 73% (2305 → 611 行)
   - `public/images/logo/logo-text-inverse.svg`：反色文字标识优化，文件大小减少 66% (1617 → 551 行)
   - 所有标识文件在保持视觉效果的同时大幅提升了加载性能

4. 国际化内容更新
   - `src/i18n/locales/en.ts`：英文版本内容专业化更新，标题从"智能机器人教育解决方案领先提供商"更新为"具身智能创新全球领导者"
   - `src/i18n/locales/ja.ts`：日文版本对应内容同步更新
   - `src/i18n/locales/zh.ts`：中文版本内容本地化优化
   - 所有版本的内容都更加聚焦于核心技术优势和解决方案定位

5. 页脚信息微调
   - `src/components/Footer/index.tsx`：更新底部联系信息和展示内容

文件变更:

删除文件:
- src/components/Pricing/OfferList.tsx
- src/components/Pricing/PricingBox.tsx
- src/components/Pricing/index.tsx
- src/components/Testimonials/SingleTestimonial.tsx
- src/components/Testimonials/index.tsx
- src/components/Video/index.tsx

修改文件:
- src/app/[locale]/page.tsx (移除模板组件)
- src/components/Footer/index.tsx (信息更新)
- src/i18n/locales/en.ts (内容专业化)
- src/i18n/locales/ja.ts (内容同步)
- src/i18n/locales/zh.ts (本地化优化)
- public/images/logo/logo.svg (性能优化)
- public/images/logo/logo-2.svg (性能优化)
- public/images/logo/logo-text.svg (性能优化)
- public/images/logo/logo-text-inverse.svg (性能优化)

改进效果:

- 网站更聚焦：移除营销导向的模板内容，专注于核心业务价值展示
- 性能提升：品牌标识文件大幅优化，提升页面加载速度
- 用户体验：简化后的页面结构让用户更容易获取关键信息
- 品牌一致：统一的国际化内容表达，强化专业定位
- 维护简化：减少组件数量，降低后续维护复杂度

影响范围:
- 首页用户体验显著改变
- 移除了价格展示和客户评价等销售导向内容
- 网站更加偏向技术解决方案展示而非产品销售

---

V1.3.0 feat(website): 全面重构网站结构，新增产品展示与案例研究板块

类型: feat

范围: website, navigation, pages, branding

说明:

本次更新对网站进行了全面重构，移除了原有的通用模板内容，专注于智能机器人教育解决方案的专业展示，新增产品、开发者服务、定制解决方案和案例研究等核心业务板块。

实现细节:

1. 导航架构重新设计
   - `src/components/Header/menuData.tsx`：完全重构导航菜单，从通用模板结构改为业务导向布局
   - 新增"产品"、"开发者服务"、"定制解决方案"、"案例研究"等核心导航项
   - 移除"博客"、"支持"、"更多页面"等通用模板导航
   - 案例研究下设"大学项目"、"K12教育"、"联合研究"子菜单

2. 新增核心业务页面
   - `src/app/[locale]/products/page.tsx`：产品组合展示页面
   - `src/app/[locale]/developers/page.tsx`：开发者服务总览
   - `src/app/[locale]/developers/knowledge-base/page.tsx`：知识库页面
   - `src/app/[locale]/developers/open-source/page.tsx`：开源项目页面
   - `src/app/[locale]/custom-solutions/page.tsx`：定制解决方案页面
   - `src/app/[locale]/case-studies/page.tsx`：案例研究总览
   - `src/app/[locale]/case-studies/universities/page.tsx`：大学合作案例
   - `src/app/[locale]/case-studies/k12/page.tsx`：K12教育案例
   - `src/app/[locale]/case-studies/co-research/page.tsx`：联合研究案例

3. 国际化内容全面升级
   - `src/i18n/locales/en.ts`：英文版本专业化内容，突出智能机器人教育解决方案定位
   - `src/i18n/locales/ja.ts`：日文版本本地化适配
   - `src/i18n/locales/zh.ts`：中文版本品牌信息更新
   - 所有页面均有对应的国际化内容支持

4. 品牌视觉识别更新
   - `public/favicon.ico`：更新网站图标
   - `public/images/logo/logo.svg`：主品牌标识全面升级
   - `public/images/logo/logo-2.svg`：品牌变体标识更新
   - 新增`public/images/logo/logo-text.svg`和`public/images/logo/logo-text-inverse.svg`：纯文字版本标识

5. 通用组件优化
   - `src/components/Common/PageIntro.tsx`：新增页面介绍组件，统一新页面的展示格式
   - `src/components/Header/index.tsx`：头部组件适配新导航结构
   - `src/components/Footer/index.tsx`：底部信息更新，包括公司地址等联系信息

文件变更:

新增文件:
- src/app/[locale]/products/page.tsx
- src/app/[locale]/developers/page.tsx
- src/app/[locale]/developers/knowledge-base/page.tsx
- src/app/[locale]/developers/open-source/page.tsx
- src/app/[locale]/custom-solutions/page.tsx
- src/app/[locale]/case-studies/page.tsx
- src/app/[locale]/case-studies/universities/page.tsx
- src/app/[locale]/case-studies/k12/page.tsx
- src/app/[locale]/case-studies/co-research/page.tsx
- src/components/Common/PageIntro.tsx
- public/images/logo/logo-text.svg
- public/images/logo/logo-text-inverse.svg

修改文件:
- src/components/Header/menuData.tsx (完全重构)
- src/components/Header/index.tsx (适配新导航)
- src/components/Footer/index.tsx (信息更新)
- src/i18n/locales/en.ts (内容专业化)
- src/i18n/locales/ja.ts (本地化优化)
- src/i18n/locales/zh.ts (品牌信息更新)
- public/favicon.ico (图标更新)
- public/images/logo/logo.svg (品牌升级)
- public/images/logo/logo-2.svg (标识变体)

改进效果:

- 专业定位: 网站从通用模板转变为专业的智能机器人教育解决方案平台
- 业务聚焦: 围绕产品、服务、案例的核心业务架构，提升用户导航体验
- 品牌一致: 统一的视觉识别和专业化的内容表达
- 国际化支持: 三语言版本的专业内容适配
- 可扩展性: 模块化的页面结构便于后续功能扩展

---

V1.2.0 remove(blog): 移除博客相关页面及导航入口

类型: remove

范围: blog, header, pages

说明:

本次更新移除了博客相关的所有页面及其在导航菜单中的入口，简化了网站结构，聚焦核心业务内容。

实现细节:

1. 页面移除
   - `src/app/[locale]/blog-details/page.tsx`、`src/app/[locale]/blog-sidebar/page.tsx`、`src/app/[locale]/blog/page.tsx`：全部内容替换为 `notFound()`，原有博客详情、侧边栏、列表页功能被废弃。
   - `src/app/[locale]/page.tsx`：主页移除 `BlogSection` 组件，不再展示博客板块。

2. 导航菜单调整
   - `src/components/Header/menuData.tsx`：移除主导航中的“博客”入口，以及“页面”子菜单下的“博客侧边栏”和“博客详情”入口。

文件变更:

- 修改: src/app/[locale]/blog-details/page.tsx
- 修改: src/app/[locale]/blog-sidebar/page.tsx
- 修改: src/app/[locale]/blog/page.tsx
- 修改: src/app/[locale]/page.tsx
- 修改: src/components/Header/menuData.tsx

改进效果:

- 网站结构更简洁，用户聚焦于核心产品与服务内容
- 移除无用页面，减少维护成本
- 导航菜单更清晰，提升用户体验

---

V1.1.2 feat(i18n): 英文和日文版本国际化内容优化

类型: feat

范围: i18n

说明:

优化官网英文和日文版本的国际化内容，确保品牌信息的一致性和本地化适应性，提升国际用户体验。

实现细节:

1. 英文版本内容优化 (src/i18n/locales/en.ts)
   - 更新导航菜单文案，简化页面名称表述（如 "About Page" → "About"）
   - 重写Hero区域标题和描述，突出"有你同创"作为智能机器人教育解决方案提供商的定位
   - 优化产品特性文案，将通用功能描述替换为具体的教育机器人产品介绍
   - 更新用户评价部分，简化职位头衔并优化推荐内容
   - 调整定价方案描述，使其更贴合实际产品服务
   - 优化博客板块标题和文章内容，提升可读性

2. 日文版本内容优化 (src/i18n/locales/ja.ts)
   - 完善日文翻译，确保专业术语的准确性
   - 翻译并适配品牌介绍和产品优势内容
   - 本地化用户评价和定价方案描述
   - 优化导航结构和页面命名，符合日文用户习惯

文件变更:

- 修改: src/i18n/locales/en.ts (全面优化英文版本内容)
- 修改: src/i18n/locales/ja.ts (完善日文版本翻译和本地化)

改进效果:

- 品牌一致性: 三个语言版本的品牌定位和价值主张保持统一
- 本地化质量: 英文和日文版本更符合目标用户的语言习惯和文化背景
- 用户体验: 国际用户能更好地理解产品价值和技术优势
- 专业性: 技术术语翻译准确，提升品牌专业形象

---

V1.1.1 feat(contact): 新增浮动联系方式组件与深色主题样式优化

类型: feat

范围: contact

说明:

为官网新增智能浮动联系方式组件，提供QQ群、电话、淘宝、微信等多种联系渠道，并同步优化深色主题下的样式一致性，提升用户联系便利性和视觉体验。

实现细节:

1. 浮动联系方式组件开发
    - 新增 `FloatingContact` 组件，包含可折叠的联系面板和浮动操作按钮
    - 支持QQ群号复制、电话号码复制、淘宝店铺链接等功能
    - 集成二维码展示、复制成功提示、键盘导航等交互特性
    - 响应式设计，移动端自动切换为模态弹窗形式

2. 多语言国际化支持
    - 在 `en.ts`、`zh.ts`、`ja.ts` 中新增 `floatingContact` 词典配置
    - 包含完整的文案国际化：QQ群、电话、淘宝、微信等联系方式的标签和提示信息
    - 支持复制成功提示、访问链接等交互文案的本地化

3. 联系方式资源集成
    - 新增联系相关图标：QQ、电话、淘宝、微信填充图标
    - 添加QQ群二维码图片资源，便于用户扫码加群
    - 配置淘宝店铺链接和微信预留接口

4. 深色主题样式统一
    - 修正多个组件在深色模式下的背景色一致性（从 `#2C303B` 统一为 `#2d2520`）
    - 更新错误页面的主色调，保持与品牌橙色 `#ff6b35` 一致
    - 优化视频区域SVG渐变色，适配新的主题色彩

5. 全局布局集成
    - 在主布局文件中引入FloatingContact组件
    - 传递多语言词典配置，确保组件支持国际化

文件变更:

- 新增: src/components/Common/FloatingContact.tsx (568行，核心组件)
- 新增: public/images/contact/qq-group-qrcode.jpg (QQ群二维码)
- 新增: public/images/icons/QQ.svg, phone.svg, taobao.svg, wechat-fill.svg (联系图标)
- 修改: src/app/[locale]/layout.tsx (集成浮动组件)
- 修改: src/i18n/locales/{en,zh,ja}.ts (新增floatingContact词典)
- 修改: src/styles/index.css (主题色调整)
- 修改: public/images/video/shape.svg (渐变色更新)
- 修改: 多个组件的深色主题样式 (blog-sidebar, error, signin, signup, breadcrumb, pricing, testimonials, footer等)

改进效果:

- 联系便利性: 用户可通过浮动面板快速访问各种联系方式，无需跳转到联系页面
- 交互体验: 复制功能、二维码展示、键盘导航等特性提供流畅的用户操作体验
- 品牌一致性: 全站深色主题样式统一，保持橙色主题的视觉连贯性
- 移动适配: 响应式设计确保在移动设备上也有良好的使用体验
- 国际化完整: 新功能完全支持多语言，符合项目的国际化架构要求

---

V1.1.0 feat(branding): 官网品牌化内容重塑与主题色更新

类型: feat

范围: branding

说明:

对官网进行全面的品牌化升级，将内容从通用SaaS模板更新为“有你同创”智能机器人教育解决方案，并同步更新了主视觉配色，以建立清晰、专业的品牌形象。

实现细节:

1. 品牌内容全面焕新
    - 重写 `hero`, `features`, `about` 及 `footer` 等核心板块的中文文案，使其精准传达“有你同创”在教育机器人领域的专业定位与产品优势。
    - 内容聚焦于拼装小车、ROS2平台、具身智能机器人等核心产品，强调为高校提供解决方案的价值。

2. 主题色与视觉调整
    - 将全局主色调从蓝色 (`#4A6CF7`) 更改为更具活力的橙色 (`#ff6b35`)，更新了 CSS 变量与 Hero 区域的 SVG 矢量图形配色，提升品牌辨识度。
    - 调整了 Hero 区域两个核心行动号召（CTA）按钮的链接，使其指向页面内部的“产品优势”和“联系我们”板块，优化了用户站内导航体验。

3. 工程维护
    - 清理了 `next-env.d.ts` 文件中不再需要的路由类型定义引用，保持项目整洁。

文件变更:

- 修改: src/i18n/locales/zh.ts (核心文案重写)
- 修改: src/components/Hero/index.tsx (CTA链接与SVG颜色变更)
- 修改: src/styles/index.css (全局主色调变更)
- 修改: next-env.d.ts (类型定义清理)

改进效果:

- 品牌一致性: 网站内容与视觉风格高度统一，清晰传达了“有你同创”的品牌定位。
- 用户体验: 访客能快速了解公司的核心业务与产品，站内导航路径更明确。
- 视觉吸引力: 新的主题色让网站看起来更有活力和科技感。

---

V1.0.1 docs(readme): 完整本地化README文档为中文

类型: docs

范围: readme

说明:

将项目主文档从英文完整翻译为中文，并针对国际化功能进行详细说明，为中文开发者提供更友好的使用指南。

实现细节:

1. 文档结构重组
    - 重新设计README结构，增加功能亮点、技术栈、快速开始等核心板块
    - 移除原有英文的商业化推广内容，聚焦技术文档本身

2. 本地化内容覆盖
    - 标题、说明文字、代码注释等全部改为中文
    - 保持技术术语的准确性，如Next.js、TypeScript、Tailwind CSS等专有名词保持原文
    - 代码示例和命令行操作使用中文说明

3. 国际化功能详解
    - 详细说明多语言路由体系的工作原理
    - 提供完整的国际化配置指南
    - 包含语言切换、词典管理、SEO优化等关键信息

4. 开发与部署指南
    - 增加详细的快速开始步骤
    - 补充技术栈对照表和目录结构说明
    - 提供多种部署方案的建议

文件变更:

- 修改: README.md（完整重写为中文版本）

改进效果:

- 开发者体验: 中文开发者可以直接阅读母语文档，降低理解门槛
- 文档完整性: 覆盖从安装到部署的全流程，提供实用指导
- 国际化展示: README本身就是项目国际化能力的一个展示案例
- 维护友好: 结构化文档便于后续更新和维护

---

V1.0.0 feat(i18n): 引入多语言路由体系与词典资源

类型: feat

范围: i18n

说明:

为企业官网首次加入完整的多语言支持，包含路由分层、词典加载、语言切换与国际化内容重构，确保英文、中文、日文三种语言均可顺畅浏览并保持 SEO 与可访问性。

实现细节:

1. 路由与中间件改造
    - 全量迁移页面文案至词典，新增拆分组件（如 AboutContent、BlogContent、ContactContent 等）以简化翻译维护。
3. 交互组件国际化
    - 新增 LocaleSwitcher 并嵌入导航栏，实现语言切换、Cookie 记忆与页面刷新。
    - 更新博客、定价、视频、页头页脚等组件，使按钮标签、ARIA 文案、分页等均来自词典数据。
4. 无障碍与工程细节
    - 将 ScrollToTop 改为 <button>，补齐键盘可达性与聚焦样式。
    - .gitignore 新增 *.tsbuildinfo，避免 TypeScript 增量编译文件入库。
    - 自动生成的 next-env.d.ts 及其路由声明保持同步。

文件变更:

- 新增: src/app/[locale]/...、src/app/about/AboutContent.tsx、src/app/contact/ContactContent.tsx、src/app/blog-details/BlogDetailsContent.tsx、src/app/blog-sidebar/BlogSidebarContent.tsx、src/app/signin/
  SigninContent.tsx、src/app/signup/SignupContent.tsx
- 新增: src/i18n/config.ts、src/i18n/locales/{en,zh,ja}.ts、src/i18n/utils.ts、src/components/Header/LocaleSwitcher.tsx、src/middleware.ts、version.md
- 修改: src/app/layout.tsx、src/app/providers.tsx、src/components/* 大量组件的文案来源与参数签名
- 修改: .gitignore（忽略 *.tsbuildinfo）
- 删除/重构: 原 src/app/{page.tsx,about/page.tsx,...} 等单语言页面，改由内容组件 + [locale] 路由接管
- 修改: src/components/ScrollToTop/index.tsx（按钮化处理）
- 自动更新: next-env.d.ts（Next.js 路由类型声明）

改进效果:

- 多语言覆盖: 官网内容完全支持 EN/中文/日文，URL 层面可直接区分语言，利于搜索引擎收录。
- 维护效率: 文案集中在词典中，未来新增语言或修改文案更便捷。
- 用户体验: 语言切换即时生效，导航、分页、提示信息均符合当地语言习惯。
- 可访问性: 回到顶部按钮支持键盘操作，符合 WCAG 要求。
- 工程规范: 编译产物不再进入仓库，保持版本库整洁。

---
