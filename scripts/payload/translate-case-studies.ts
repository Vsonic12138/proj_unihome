import "dotenv/config";
import { getPayload } from "payload";
import config from "../../payload.config";
import TRANSLATIONS from "./content-translations.js";

type Locale = "zh" | "en" | "ja";
const LOCALES: Locale[] = ["en", "ja"];

// Generic mapping for names
const TITLE_MAPPINGS: Record<string, { en: string; ja: string }> = {
  "清华大学": { en: "Tsinghua University", ja: "清華大学" },
  "华中科技大学": { en: "Huazhong University of Science and Technology", ja: "華中科技大学" },
  "国防科技大学（内容保密）": { en: "National University of Defense Technology (Confidential)", ja: "国防科技大学（機密）" },
  "珠海科技学院": { en: "Zhuhai College of Science and Technology", ja: "珠海科技学院" },
  "安徽信息工程学院": { en: "Anhui Institute of Information Technology", ja: "安徽情報工学院" },
  "西安工业大学": { en: "Xi'an Technological University", ja: "西安工業大学" },
  "江西科技师范大学": { en: "Jiangxi Science & Technology Normal University", ja: "江西科技師範大学" },
  "北京大学": { en: "Peking University", ja: "北京大学" },
  "北京市海淀区教师进修附属实验学校": { en: "Haidian Experimental School", ja: "海淀区教師進修付属実験学校" },
  "北京第一实验学校": { en: "Beijing No.1 Experimental School", ja: "北京第一実験学校" },
  "呼和浩特职业学院-已升本": { en: "Hohhot Vocational College", ja: "フフホト職業学院" },
  "浙江农林大学": { en: "Zhejiang A&F University", ja: "浙江農林大学" },
  "北京坊（北京天安门旁）": { en: "Beijing Fun", ja: "北京坊" },
  "中山火炬开发区": { en: "Zhongshan Torch Zone", ja: "中山火炬開発区" },
};

const CONTENT_PREFIXES: Record<string, { en: string; ja: string }> = {
  "背景说明：": { en: "Background: ", ja: "背景： " },
  "背景说明": { en: "Background", ja: "背景" },
  "需求说明：": { en: "Requirements: ", ja: "要件： " },
  "需求说明": { en: "Requirements", ja: "要件" },
  "解决方案：": { en: "Solution: ", ja: "ソリューション： " },
  "解决方案": { en: "Solution", ja: "ソリューション" },
  "成果：": { en: "Results: ", ja: "成果： " },
  "实验": { en: "Experiment ", ja: "実験" },
};

function translateTitle(zhTitle: string, locale: "en" | "ja") {
  // Extract custom numbers like "典型案例 05 ： 清华大学"
  const match = zhTitle.match(/典型案例\s*([\d]+)\s*[：\:\-\s]*\s*(.*)/);
  if (match) {
    let num = match[1];
    let nameZh = match[2] ? match[2].trim() : "";
    let nameTrans = nameZh;
    
    // Attempt mapping
    for (const key of Object.keys(TITLE_MAPPINGS)) {
      if (nameZh.includes(key)) {
        nameTrans = nameZh.replace(key, TITLE_MAPPINGS[key][locale]);
        break;
      }
    }
    
    if (locale === "en") return `Typical Case ${num}: ${nameTrans}`;
    if (locale === "ja") return `典型事例${num}：${nameTrans}`;
  }
  return zhTitle; // Fallback
}

function processLexicalNode(node: any, locale: "en" | "ja"): any {
  if (!node) return node;

  const out = { ...node };

  // Translate text
  if (out.type === "text" && typeof out.text === "string") {
    let textOutStr = out.text;
    
    // Check deep translated exact matches or substrings from new dictionary first
    for (const mapping of TRANSLATIONS) {
       if (textOutStr.includes(mapping.zh)) {
          textOutStr = textOutStr.replace(mapping.zh, mapping[locale]);
       }
    }

    // Quick translations for headers/labels if not matched
    for (const zhKey of Object.keys(CONTENT_PREFIXES)) {
       if (textOutStr.includes(zhKey)) {
          textOutStr = textOutStr.replace(zhKey, CONTENT_PREFIXES[zhKey][locale]);
       }
    }

    if (textOutStr === "暂无详细内容。") {
       textOutStr = locale === "en" ? "No detailed content." : "詳細内容はまだありません。";
    }

    out.text = textOutStr;
  }

  // Recurse children
  if (Array.isArray(out.children)) {
    out.children = out.children.map((child: any) => processLexicalNode(child, locale));
  }

  return out;
}

async function main() {
  const payload = await getPayload({ config });
  
  // Fetch all cases in Chinese
  const casesRes = await payload.find({
    collection: "caseStudies",
    locale: "zh",
    limit: 100,
  });

  const cases = casesRes.docs;
  console.log(`Found ${cases.length} case studies to translate.`);

  for (const c of cases) {
    const zhTitle = c.title;
    if (!zhTitle) continue;

    const zhContent = c.content;
    const coverImageId = typeof c.coverImage === 'object' ? c.coverImage?.id : c.coverImage;

    for (const loc of LOCALES) {
       const transTitle = translateTitle(zhTitle, loc as "en"|"ja");
       let transContent = zhContent;

       if (zhContent && typeof zhContent === 'object' && zhContent.root) {
           transContent = { ...zhContent, root: processLexicalNode(zhContent.root, loc as "en"|"ja") };
       }

       console.log(`[${loc}] Translated: "${transTitle}"`);
       
       try {
           await payload.update({
             collection: "caseStudies",
             id: c.id,
             locale: loc as any,
             data: {
               title: transTitle,
               content: transContent,
             },
             overrideAccess: true,
           });
       } catch (e) {
           console.error(`Failed to update ${loc} for ${c.id}:`, e);
       }
    }
  }

  console.log("Translation seeding completed!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
