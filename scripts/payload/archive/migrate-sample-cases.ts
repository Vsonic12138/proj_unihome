/**
 * migrate-sample-cases.ts
 *
 * 将各产品 sampleCases 旧数组字段（modules/chassis/arms/composites）
 * 读取并转换写入统一的新格式 sections 原生 Array 字段。
 *
 * 产生逻辑：
 *   - rai-p4     : modules(6)  → 1 section "实习场景 / Lab Scenarios / 実習シナリオ"
 *   - gx-mat-09s : chassis(33) + arms(27) + composites(3) → 3 sections
 *   - ubot-mr40  : modules(18) + chassis(15) + arms(9) + composites(60) → 4 sections
 *
 * 运行方式:
 *   node --env-file=.env --import tsx/esm scripts/payload/archive/migrate-sample-cases.ts
 */

import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../../payload.config';

// ─── Section title 国际化映射 ─────────────────────────────────────────────────

const SECTION_LABELS: Record<string, Record<string, string>> = {
  modules: { zh: '功能模块', en: 'Functional Modules', ja: '機能モジュール' },
  chassis: { zh: '底盘', en: 'Chassis', ja: 'シャーシ' },
  arms:    { zh: '机械臂', en: 'Robotic Arms', ja: 'ロボットアーム' },
  composites: { zh: '复合机器人', en: 'Composite Robots', ja: '複合ロボット' },
};

// rai-p4 的 modules 组标题特殊处理
const RAI_P4_MODULES_LABELS: Record<string, string> = {
  zh: '实习场景',
  en: 'Lab Scenarios',
  ja: '実習シナリオ',
};

// ─── 从 Payload 读取旧数组并映射成 sections ──────────────────────────────────

type OldItem = { name?: string; image?: number | null };

function buildSection(
  title: string,
  items: OldItem[],
): { title: string; items: { name: string; image: number | null }[] } {
  return {
    title,
    items: items
      .filter((item) => item.name || item.image)
      .map((item) => ({
        name: item.name ?? '',
        image: item.image ?? null,
      })),
  };
}

// ─── 每个产品的迁移配置 ────────────────────────────────────────────────────────

async function migrateProduct(
  payload: any,
  slug: string,
  buildSectionsForLocale: (locale: string, sampleCases: any) => any[],
) {
  console.log(`\n── Migrating: ${slug} ──`);

  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    locale: 'zh',
    overrideAccess: true,
  });

  if (!res.docs.length) {
    console.warn(`  ⚠ Product "${slug}" not found, skipping.`);
    return;
  }

  const productId = res.docs[0].id;
  console.log(`  Found id=${productId}`);

  for (const locale of ['zh', 'en', 'ja'] as const) {
    const current = await payload.findByID({
      collection: 'products',
      id: productId,
      locale,
      depth: 2,
      overrideAccess: true,
    });

    const sampleCases = (current as any).details?.sampleCases ?? {};
    const newSections = buildSectionsForLocale(locale, sampleCases);

    if (!newSections.length) {
      console.log(`  [${locale}] ℹ No data to migrate, skipping.`);
      continue;
    }

    // 跳过已经有 sections 数据的情况（幂等保护）
    const existingSections = (current as any).details?.sampleCases?.sections;
    if (Array.isArray(existingSections) && existingSections.length > 0) {
      console.log(`  [${locale}] ✓ sections already exist (${existingSections.length} sections), skipping.`);
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
            sections: newSections,
          },
        },
      },
    });

    console.log(`  [${locale}] ✓ Written ${newSections.length} section(s) with ${newSections.reduce((s: number, sec: any) => s + sec.items.length, 0)} items.`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config: configInfo });
  console.log('✓ Ready.\n');

  // 1. rai-p4: modules → 1 section（实习场景）
  await migrateProduct(payload, 'rai-p4', (locale, sampleCases) => {
    const modules: OldItem[] = sampleCases.modules ?? [];
    if (!modules.length) return [];
    return [buildSection(RAI_P4_MODULES_LABELS[locale] ?? SECTION_LABELS.modules[locale], modules)];
  });

  // 2. gx-mat-09s: chassis + arms + composites → 3 sections
  await migrateProduct(payload, 'gx-mat-09s', (locale, sampleCases) => {
    const sections = [];
    const chassis: OldItem[] = sampleCases.chassis ?? [];
    const arms: OldItem[] = sampleCases.arms ?? [];
    const composites: OldItem[] = sampleCases.composites ?? [];

    if (chassis.length) sections.push(buildSection(SECTION_LABELS.chassis[locale], chassis));
    if (arms.length)    sections.push(buildSection(SECTION_LABELS.arms[locale], arms));
    if (composites.length) sections.push(buildSection(SECTION_LABELS.composites[locale], composites));

    return sections;
  });

  // 3. ubot-mr40: modules + chassis + arms + composites → up to 4 sections
  await migrateProduct(payload, 'ubot-mr40', (locale, sampleCases) => {
    const sections = [];
    const modules: OldItem[] = sampleCases.modules ?? [];
    const chassis: OldItem[] = sampleCases.chassis ?? [];
    const arms: OldItem[] = sampleCases.arms ?? [];
    const composites: OldItem[] = sampleCases.composites ?? [];

    if (modules.length)    sections.push(buildSection(SECTION_LABELS.modules[locale], modules));
    if (chassis.length)    sections.push(buildSection(SECTION_LABELS.chassis[locale], chassis));
    if (arms.length)       sections.push(buildSection(SECTION_LABELS.arms[locale], arms));
    if (composites.length) sections.push(buildSection(SECTION_LABELS.composites[locale], composites));

    return sections;
  });

  console.log('\n✅ Migration complete!');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
