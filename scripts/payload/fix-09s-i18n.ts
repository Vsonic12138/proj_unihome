import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../payload.config';
import fs from 'fs';
import path from 'path';

async function main() {
  const payload = await getPayload({ config: configInfo });

  // 1. 获取产品的 ID
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'gx-mat-09s' } },
    depth: 0,
    locale: 'zh',
  });
  if (!result.docs.length) { console.error('Product not found'); process.exit(1); }
  const productId = result.docs[0].id;
  
  // 2. 在各个 locale 下从 JSON 重新读取底盘/机械臂的名称及控制器的图像结构，用于“点对点”恢复 09s 数据
  const locales = ['zh', 'en', 'ja'] as const;
  
  for (const loc of locales) {
    const raw = fs.readFileSync(path.resolve(process.cwd(), 'messages', loc, 'products.json'), 'utf8');
    const msg = JSON.parse(raw);
    const productData = msg.products.details['gx-mat-09s'];
    
    // 获取当前数据库中这个语言环境的版本以便保留那些我们在上一脚本成功上传并保存为 number/对象的 images
    const currentEntry = await payload.findByID({
      collection: 'products',
      id: productId,
      locale: loc,
      depth: 0
    });
    
    // 恢复底盘与机械臂国际化名称（保留图片 ID）
    const mergedChassis = (currentEntry.details.sampleCases.chassis || []).map((ch: any, i: number) => ({
      ...ch,
      name: productData.sampleCases.chassis[i]?.name || ch.name
    }));

    const mergedArms = (currentEntry.details.sampleCases.arms || []).map((ar: any, i: number) => ({
      ...ar,
      name: productData.sampleCases.arms[i]?.name || ar.name
    }));
    
    const mergedComposites = (currentEntry.details.sampleCases.composites || []).map((com: any, i: number) => ({
      ...com,
      name: productData.sampleCases.compositeRobots[i]?.name || com.name
    }));
    
    // 关键修正：controllerConfig 和 sensorConfig 等 JSON 字段直接存文本/完整 JSON 结构（包括图片的 string url），不存媒体库数字 ID。
    // json 字段 Payload 是不会帮你 resolve 媒体记录的，需要保证 src 是 /images... 的字符串
    const controllerConfig = {
      description: productData.controllerConfig.description,
      images: productData.controllerConfig.images // json 中的原本格式（含字面量 src: '/images/...'）
    };

    await payload.update({
      collection: 'products',
      id: productId,
      locale: loc,
      data: {
        details: {
          ...currentEntry.details,
          sampleCases: {
            ...currentEntry.details.sampleCases,
            chassis: mergedChassis,
            arms: mergedArms,
            composites: mergedComposites,
          },
          // 重新写回到 JSON 上的字面量值，这样前端渲染 page 时的 resolveMediaURL 就会对字符 url 正常工作
          controllerConfig: controllerConfig,
          sensorConfig: productData.sensorConfig,
          softwareConfig: productData.softwareConfig
        }
      }
    });

    console.log(`  ✓ Fixed locale=${loc}`);
  }

  console.log('\n✅ 09s data fixed successfully!');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
