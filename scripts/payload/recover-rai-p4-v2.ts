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

  const comprehensiveFilename = 'rai-p4-comprehensive-training-display.png';
  const comprehensiveCheckRes = await payload.find({
    collection: 'media',
    where: { filename: { equals: comprehensiveFilename } },
    limit: 1,
    overrideAccess: true,
  });
  const comprehensiveId = comprehensiveCheckRes.docs[0]?.id as number;

  const taskPlanningFilename = 'rai-p4-task-planning-1.png';
  const taskPlanningCheckRes = await payload.find({
    collection: 'media',
    where: { filename: { equals: taskPlanningFilename } },
    limit: 1,
    overrideAccess: true,
  });
  const taskPlanningId = taskPlanningCheckRes.docs[0]?.id as number;

  const locales = ['zh', 'en', 'ja'] as const;

  for (const loc of locales) {
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

    // Use modules array which natively supports mapping to image relation IDs
    const newSampleCases = {
      description: null,
      modules: [
        { name: loc === 'zh' ? '任务规划流程示意' : loc === 'en' ? 'Task planning workflow overview' : 'タスク計画フロー概要', image: taskPlanningId },
        { name: loc === 'zh' ? 'RAI-P4 综合实训展示' : loc === 'en' ? 'RAI-P4 Comprehensive Training Display' : 'RAI-P4 総合実習展示', image: comprehensiveId }
      ],
      chassis: current.details?.sampleCases?.chassis || [],
      arms: current.details?.sampleCases?.arms || [],
      composites: current.details?.sampleCases?.composites || [],
    };

    const sensorList = loc === 'zh' ? ["AI 语音交互麦克风阵列", "视觉云台摄像模组", "姿态检测传感器", "机械臂摄像头模组"]
                     : loc === 'en' ? ["AI speech interaction microphone array", "Vision pan-tilt camera module", "Posture sensing IMU", "Manipulator camera module"]
                     : ["AI音声インタラクション用マイクアレイ", "ビジョンパンチルトカメラモジュール", "姿勢推定IMUセンサー", "マニピュレータカメラモジュール"];

    const newSensorConfig = {
      ...productData.sensorConfig,
      list: sensorList
    };

    // Controller config image check (In products.json there is NO image for controllerConfig in RAI-P4! So we just use what was in JSON natively)
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
          highlights: productData.highlights?.map((h: string) => ({ text: h })),
          features: productData.features?.map((f: any) => ({
            title: f.title,
            content: f.content ? lexicalFromPlainText(String(f.content)) : undefined,
            image: undefined,
          })) || [],
          specs: [],
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
