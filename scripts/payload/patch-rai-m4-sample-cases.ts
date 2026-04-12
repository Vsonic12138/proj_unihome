/**
 * patch-rai-m4-sample-cases.ts
 *
 * 将 rai-m4 的 sampleCases.sections 写入统一格式：
 *   - 1 个 section（"整机样机" / "Product Overview" / "製品概要"）
 *   - 1 条 item，图片绑定 media id=107（RAI-M4-hero.png）
 *
 * 运行方式:
 *   node --env-file=.env --import tsx/esm scripts/payload/patch-rai-m4-sample-cases.ts
 */

import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../payload.config';

const SLUG = 'rai-m4';
const HERO_MEDIA_ID = 107;

const SECTION_TITLES: Record<string, string> = {
  zh: '整机样机',
  en: 'Product Overview',
  ja: '製品概要',
};

const ITEM_NAMES: Record<string, string> = {
  zh: 'RAI-M4 整机',
  en: 'RAI-M4 Unit',
  ja: 'RAI-M4 本体',
};

async function main() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config: configInfo });
  console.log('✓ Ready.\n');

  // 1. 查找产品 ID
  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: SLUG } },
    depth: 0,
    locale: 'zh',
    overrideAccess: true,
  });

  if (!res.docs.length) {
    console.error(`Product "${SLUG}" not found.`);
    process.exit(1);
  }

  const productId = (res.docs[0] as any).id;
  console.log(`Found product: id=${productId}`);

  // 2. 三语同步写入
  for (const locale of ['zh', 'en', 'ja'] as const) {
    // 幂等检查：如果已有 sections 就跳过
    const current = await payload.findByID({
      collection: 'products',
      id: productId,
      locale,
      depth: 1,
      overrideAccess: true,
    });

    const existingSections = ((current as any).details?.sampleCases as any)?.sections;
    if (Array.isArray(existingSections) && existingSections.length > 0) {
      console.log(`  [${locale}] ✓ sections already exist (${existingSections.length}), skipping.`);
      continue;
    }

    await payload.update({
      collection: 'products',
      id: productId,
      locale,
      overrideAccess: true,
      data: {
        details: {
          sampleCases: {
            sections: [
              {
                title: SECTION_TITLES[locale],
                items: [
                  {
                    name: ITEM_NAMES[locale],
                    image: HERO_MEDIA_ID,
                  },
                ],
              },
            ],
          },
        },
      },
    });

    console.log(`  [${locale}] ✓ Written 1 section with 1 item (media id=${HERO_MEDIA_ID}).`);
  }

  console.log('\n✅ rai-m4 sampleCases migration complete!');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
