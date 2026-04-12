import fs from 'fs';
import path from 'path';

const srcDir = '/home/vsonic12138/workspace/Uni_Proj/proj_unihome/src/payload';

const group1 = `    group: {
      zh: "页面与搭建",
      en: "Pages & Layout",
      ja: "ページとレイアウト",
    },`;
const group2 = `    group: {
      zh: "产品与业务",
      en: "Products & Business",
      ja: "製品とビジネス",
    },`;
const group3 = `    group: {
      zh: "运营与服务",
      en: "Operations & Services",
      ja: "運営とサービス",
    },`;
const group4 = `    group: {
      zh: "系统与媒体",
      en: "System & Media",
      ja: "システムとメディア",
    },`;

const targets = {
  // 1
  'collections/Pages.ts': group1,
  'globals/Navigation.ts': group1,
  'globals/Footer.ts': group1,
  // 2
  'collections/ProductSeries.ts': group2,
  'collections/Products.ts': group2,
  // 3
  'collections/Tickets.ts': group3,
  'collections/FAQ.ts': group3,
  'collections/CaseStudies.ts': group3,
  // 4
  'collections/Users.ts': group4,
  'globals/SiteSettings.ts': group4,
};

for (const [file, groupBlock] of Object.entries(targets)) {
  const p = path.join(srcDir, file);
  try {
    let content = fs.readFileSync(p, 'utf8');
    
    // Replace the OLD group block if it exists exactly at the root admin level
    const regex = /  admin: \{\n\s*group: \{\n\s*zh: "[^"]+",\n\s*en: "[^"]+",\n\s*ja: "[^"]+",\n\s*\},?\n/g;
    
    if (regex.test(content)) {
      content = content.replace(regex, \`  admin: {\\n\${groupBlock}\\n\`);
      fs.writeFileSync(p, content);
      console.log(\`Updated \${file}\`);
    } else {
      console.warn(\`Could not find match in \${file}\`);
    }
  } catch(e) {
    console.error(\`Failed on \${file}: \${e.message}\`);
  }
}

// Media.ts is special, we must ADD the root admin block
const pMedia = path.join(srcDir, 'collections/Media.ts');
let mediaContent = fs.readFileSync(pMedia, 'utf8');

const mediaAdmin = \`  admin: {\\n\${group4}\\n  },\`;
if (!mediaContent.includes('admin: {\\n    group: {\\n      zh: "系统与媒体"')) {
   mediaContent = mediaContent.replace(/slug: "media",\\n/, \`slug: "media",\\n\${mediaAdmin}\\n\`);
   fs.writeFileSync(pMedia, mediaContent);
   console.log('Updated collections/Media.ts');
}

console.log('done');
