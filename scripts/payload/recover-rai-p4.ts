import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../payload.config';
import fs from 'fs';
import path from 'path';
import { lexicalFromPlainText } from './lexical';

async function main() {
  const payload = await getPayload({ config: configInfo });

  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'rai-p4' } },
    depth: 0,
    locale: 'zh',
    overrideAccess: true,
  });
  if (!res.docs.length) { console.error('Product rai-p4 not found'); process.exit(1); }
  const productId = res.docs[0].id;
  console.log(`Found product id=${productId}`);

  const comprehensiveFilename = 'rai-p4-comprehensive-training-display.png';
  const comprehensiveCheckRes = await payload.find({
    collection: 'media',
    where: { filename: { equals: comprehensiveFilename } },
    limit: 1,
    overrideAccess: true,
  });
  
  let comprehensiveUrl: string = comprehensiveCheckRes.docs[0]?.url ?? `/media/${comprehensiveFilename}`;

  const taskPlanningFilename = 'rai-p4-task-planning-1.png';
  const taskPlanningCheckRes = await payload.find({
    collection: 'media',
    where: { filename: { equals: taskPlanningFilename } },
    limit: 1,
    overrideAccess: true,
  });
  let taskPlanningUrl: string = taskPlanningCheckRes.docs[0]?.url ?? `/media/${taskPlanningFilename}`;

  const locales = ['zh', 'en', 'ja'] as const;

  for (const loc of locales) {
    // 1. 读完整的 json 结构防止覆盖任何字段
    const raw = fs.readFileSync(path.resolve(process.cwd(), 'messages', loc, 'products.json'), 'utf8');
    const msg = JSON.parse(raw);
    const productData = msg.products.details['rai-p4'];

    const current = await payload.findByID({
      collection: 'products',
      id: productId,
      locale: loc,
      depth: 0,
      overrideAccess: true,
    });

    // 2. 覆盖 sampleCases 对象，由于是 json 方式我们需要把 image url 置入
    const newSampleCases = {
      ...productData.sampleCases,
      description: null, // 按需求清空
      modules: current.details?.sampleCases?.modules,     // 保持原本非 json 绑定的相关数据防止丢
      chassis: current.details?.sampleCases?.chassis,
      arms: current.details?.sampleCases?.arms,
      composites: current.details?.sampleCases?.composites,
      sections: [
        {
          title: loc === 'zh' ? '样机案例' : loc === 'en' ? 'Lab Scenarios' : '実習シナリオ',
          gridClassName: 'grid-cols-1 place-items-center gap-6 max-w-5xl mx-auto',
          imageAspectClass: 'aspect-[21/10]',
          cardClassName: 'w-full p-6',
          items: [
            { name: loc === 'zh' ? '任务规划流程示意' : loc === 'en' ? 'Task planning workflow overview' : 'タスク計画フロー概要', image: taskPlanningUrl },
            { name: loc === 'zh' ? 'RAI-P4 综合实训展示' : loc === 'en' ? 'RAI-P4 Comprehensive Training Display' : 'RAI-P4 総合実習展示', image: comprehensiveUrl }
          ]
        }
      ]
    };

    // 3. 构建 sensorConfig
    const sensorList = loc === 'zh' ? ["AI 语音交互麦克风阵列", "视觉云台摄像模组", "姿态检测传感器", "机械臂摄像头模组"]
                     : loc === 'en' ? ["AI speech interaction microphone array", "Vision pan-tilt camera module", "Posture sensing IMU", "Manipulator camera module"]
                     : ["AI音声インタラクション用マイクアレイ", "ビジョンパンチルトカメラモジュール", "姿勢推定IMUセンサー", "マニピュレータカメラモジュール"];

    const newSensorConfig = {
      ...productData.sensorConfig,
      list: sensorList
    };

    // 4. 全部合入 details 重建（恢复所有可能被覆盖的 JSON group 字段）
    await payload.update({
      collection: 'products',
      id: productId,
      locale: loc,
      overrideAccess: true,
      data: {
        details: {
          ...current.details,
          subtitle: productData.subtitle,
          overview: productData.overview ? lexicalFromPlainText(String(productData.overview)) : undefined,
          applicable: productData.applicable,
          highlights: productData.highlights,
          features: current.details?.features || [],
          specs: current.details?.specs || [],
          sampleCases: newSampleCases,
          sensorConfig: newSensorConfig,
          controllerConfig: productData.controllerConfig,
          softwareConfig: productData.softwareConfig,
          experiments: productData.experiments,
        },
      },
    });

    console.log(`  ✓ Fully Resynced locale=${loc}`);
  }

  console.log('\n✅ RAI-P4 data fully restored and updated!');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
