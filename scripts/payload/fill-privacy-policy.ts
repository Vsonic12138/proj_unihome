import "dotenv/config";

import { getPayload } from "payload";

import config from "../../payload.config";

type Locale = "zh" | "en" | "ja";

type Section = {
  heading: string;
  paragraphs: string[];
};

const CONTENT: Record<
  Locale,
  {
    intro: string[];
    sections: Section[];
  }
> = {
  zh: {
    intro: [
      "本政策用于说明本网站在访问过程中使用的 Cookie、本地存储及类似技术，以及您如何管理相关偏好。",
      "除保障网站正常运行和您主动触发功能所必需的存储外，我们不会在未获得明确同意前启用分析或营销类追踪技术。",
    ],
    sections: [
      {
        heading: "我们使用哪些存储",
        paragraphs: [
          "必要存储：用于维持网站基础运行、安全防护以及您明确请求的功能，例如记录 Cookie 选择结果。",
          "功能性存储：用于保存语言偏好、主题偏好等体验设置，帮助您在后续访问中获得一致的使用体验。",
          "类似技术：除浏览器 Cookie 外，网站还可能使用本地存储（localStorage）来保存部分前端展示偏好。",
        ],
      },
      {
        heading: "当前站点中的主要项目",
        paragraphs: [
          "cookie-consent-status：记录您是接受全部，还是仅允许必要项。",
          "proj_uinhome-language：记录您主动切换的站点显示语言。",
          "theme（localStorage）：记录您选择的明暗主题偏好。",
        ],
      },
      {
        heading: "分析与营销",
        paragraphs: [
          "当前站点未默认启用分析类或营销类追踪脚本，也未在未获同意的情况下进行广告归因或行为分析。",
          "如未来接入访问统计、归因分析或第三方营销工具，我们将先更新本政策，并在适用情况下于获得您同意后再启用相关技术。",
        ],
      },
      {
        heading: "如何管理 Cookie 偏好",
        paragraphs: [
          "您可以在网站页脚点击“Cookie 设置”重新打开提示横幅，并更新自己的选择。",
          "您也可以通过浏览器设置删除已有 Cookie 或限制本地存储，但这样做可能影响站点的部分功能与使用体验。",
        ],
      },
    ],
  },
  en: {
    intro: [
      "This policy explains how this website uses cookies, local storage, and similar technologies, and how you can manage your preferences.",
      "Other than storage required for core website operation and features you actively request, we do not enable analytics or marketing tracking technologies before obtaining clear consent where applicable.",
    ],
    sections: [
      {
        heading: "Storage technologies we use",
        paragraphs: [
          "Necessary storage supports core website operation, security protection, and features that you explicitly request, such as remembering your cookie choice.",
          "Functional storage saves experience preferences such as language and theme so the website remains consistent across future visits.",
          "In addition to browser cookies, the website may also use local storage to keep certain frontend display preferences.",
        ],
      },
      {
        heading: "Main items currently in use",
        paragraphs: [
          "cookie-consent-status stores whether you accepted all cookies or chose essential only.",
          "proj_uinhome-language stores the website language you actively selected.",
          "theme (localStorage) stores your preferred light or dark theme.",
        ],
      },
      {
        heading: "Analytics and marketing",
        paragraphs: [
          "The website does not currently enable analytics or marketing tracking scripts by default, and it does not perform advertising attribution or behavioural analysis before consent.",
          "If we later add analytics, attribution, or third-party marketing tools, we will update this policy first and only enable the relevant technologies after consent is obtained where required.",
        ],
      },
      {
        heading: "How to manage your preferences",
        paragraphs: [
          "You can use the “Cookie Settings” entry in the website footer to reopen the consent banner and update your selection.",
          "You may also remove cookies or restrict local storage in your browser settings, although doing so may affect some website features and user experience.",
        ],
      },
    ],
  },
  ja: {
    intro: [
      "本ポリシーは、本サイトで使用する Cookie、ローカルストレージ、および類似技術の内容と、それらの設定方法について説明するものです。",
      "サイトの基本動作や利用者が明示的に要求した機能に必要な保存技術を除き、適用される場合には明確な同意を得る前に分析またはマーケティング目的の追跡技術を有効化しません。",
    ],
    sections: [
      {
        heading: "本サイトで使用する保存技術",
        paragraphs: [
          "必要な保存技術は、サイトの基本動作、セキュリティ保護、および Cookie 選択結果の保持など、利用者が明示的に要求した機能を支えるために使用されます。",
          "機能性保存は、言語やテーマなどの表示設定を保持し、今後の訪問でも一貫した利用体験を提供するために使用されます。",
          "ブラウザ Cookie に加えて、フロントエンド表示設定の一部保存のために localStorage を利用する場合があります。",
        ],
      },
      {
        heading: "現在主に使用している項目",
        paragraphs: [
          "cookie-consent-status は、すべて許可したか、必要なもののみにしたかを記録します。",
          "proj_uinhome-language は、利用者が選択した表示言語を記録します。",
          "theme（localStorage）は、明るいテーマまたは暗いテーマの設定を保存します。",
        ],
      },
      {
        heading: "分析およびマーケティング",
        paragraphs: [
          "現在のサイトでは、分析系またはマーケティング系の追跡スクリプトを既定では有効化しておらず、同意前に広告効果測定や行動分析を行いません。",
          "今後、アクセス解析、計測、または第三者のマーケティングツールを導入する場合は、まず本ポリシーを更新し、必要に応じて同意取得後にのみ関連技術を有効化します。",
        ],
      },
      {
        heading: "設定の管理方法",
        paragraphs: [
          "サイトのフッターにある「Cookie 設定」から同意バナーを再度開き、選択内容を更新できます。",
          "ブラウザ設定から Cookie の削除や localStorage の制限も可能ですが、一部機能や利用体験に影響する場合があります。",
        ],
      },
    ],
  },
};

function textNode(text: string) {
  return {
    type: "text" as const,
    version: 1 as const,
    text,
    detail: 0,
    format: 0,
    mode: "normal" as const,
    style: "",
  };
}

function paragraphNode(text: string) {
  return {
    type: "paragraph" as const,
    version: 1 as const,
    format: "" as const,
    indent: 0,
    direction: "ltr" as const,
    children: [textNode(text)],
  };
}

function headingNode(text: string) {
  return {
    type: "heading" as const,
    tag: "h2" as const,
    version: 1 as const,
    format: "" as const,
    indent: 0,
    direction: "ltr" as const,
    children: [textNode(text)],
  };
}

function buildLexicalDocument(locale: Locale) {
  const content = CONTENT[locale];
  const children: any[] = [];

  for (const paragraph of content.intro) {
    children.push(paragraphNode(paragraph));
  }

  for (const section of content.sections) {
    children.push(headingNode(section.heading));
    for (const paragraph of section.paragraphs) {
      children.push(paragraphNode(paragraph));
    }
  }

  return {
    root: {
      type: "root" as const,
      version: 1 as const,
      format: "" as const,
      indent: 0,
      direction: "ltr" as const,
      children,
    },
  };
}

async function main() {
  if ((config as any)?.db) {
    (config as any).db.push = false;
  }

  const payload = await getPayload({ config });

  for (const locale of ["zh", "en", "ja"] as const) {
    await payload.updateGlobal({
      slug: "siteSettings",
      locale,
      overrideAccess: true,
      data: {
        legalText: buildLexicalDocument(locale),
      },
    });

    // eslint-disable-next-line no-console
    console.log(`[privacy] updated legalText for locale=${locale}`);
  }

  await Promise.race([
    (payload.db as any)?.destroy?.(),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  process.exit(0);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
