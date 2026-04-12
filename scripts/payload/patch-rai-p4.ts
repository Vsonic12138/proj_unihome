import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../payload.config';
import fs from 'fs';
import path from 'path';

async function main() {
  const payload = await getPayload({ config: configInfo });

  // 1. 找产品 ID
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

  // 2. 检查 rai-p4-task-planning-1.png 是否已在媒体库
  const taskPlanning1Res = await payload.find({
    collection: 'media',
    where: { filename: { equals: 'rai-p4-task-planning-1.png' } },
    limit: 1,
    overrideAccess: true,
  });
  let taskPlanning1Id: number | null = taskPlanning1Res.docs[0]?.id ?? null;
  let taskPlanning1Url: string = taskPlanning1Res.docs[0]?.url ?? '';

  if (!taskPlanning1Id) {
    // 上传
    const filePath = path.resolve(process.cwd(), 'public/images/products/rai-p4/rai-p4-task-planning.png');
    console.log('rai-p4-task-planning-1.png not in media, uploading...');
    const fileData = fs.readFileSync(filePath);
    const uploadRes = await payload.create({
      collection: 'media',
      data: { alt: 'Task Planning Workflow' },
      file: {
        data: fileData,
        mimetype: 'image/png',
        name: 'rai-p4-task-planning-1.png',
        size: fileData.length,
      },
      overrideAccess: true,
    });
    taskPlanning1Id = uploadRes.id as number;
    taskPlanning1Url = uploadRes.url ?? '';
    console.log(`  ✓ Uploaded rai-p4-task-planning-1.png → id=${taskPlanning1Id}`);
  } else {
    console.log(`  ✓ Found existing rai-p4-task-planning-1.png → id=${taskPlanning1Id}`);
  }

  // 3. 上传 RAI-P4 Comprehensive Training Display.png
  const comprehensiveFilename = 'rai-p4-comprehensive-training-display.png';
  const comprehensiveCheckRes = await payload.find({
    collection: 'media',
    where: { filename: { equals: comprehensiveFilename } },
    limit: 1,
    overrideAccess: true,
  });
  let comprehensiveId: number | null = comprehensiveCheckRes.docs[0]?.id ?? null;
  let comprehensiveUrl: string = comprehensiveCheckRes.docs[0]?.url ?? '';

  if (!comprehensiveId) {
    const filePath = path.resolve(process.cwd(), 'public/images/products/rai-p4/rai-p4-comprehensive-training-display.png');
    const fileData = fs.readFileSync(filePath);
    const uploadRes = await payload.create({
      collection: 'media',
      data: { alt: 'RAI-P4 Comprehensive Training Display' },
      file: {
        data: fileData,
        mimetype: 'image/png',
        name: comprehensiveFilename,
        size: fileData.length,
      },
      overrideAccess: true,
    });
    comprehensiveId = uploadRes.id as number;
    comprehensiveUrl = uploadRes.url ?? '';
    console.log(`  ✓ Uploaded ${comprehensiveFilename} → id=${comprehensiveId}`);
  } else {
    console.log(`  ✓ Found existing ${comprehensiveFilename} → id=${comprehensiveId}`);
  }

  // 4. 读取媒体 URL（Payload 自动生成，格式通常为 /media/filename）
  // 如果 url 不可用，用 /media/filename 作为后备
  const getUrl = (id: number, filename: string, url: string) =>
    url || `/media/${filename}`;

  const img1url = getUrl(taskPlanning1Id!, 'rai-p4-task-planning-1.png', taskPlanning1Url);
  const img2url = getUrl(comprehensiveId!, comprehensiveFilename, comprehensiveUrl);

  console.log(`  img1: ${img1url}`);
  console.log(`  img2: ${img2url}`);

  // 5. 按 locale 读 JSON，生成新的 sampleCases 和 sensorConfig，写入 CMS
  const localeMap = {
    zh: {
      sampleCasesDescription: null, // 删除 description
      section1Title: '任务规划流程示意',
      img1Name: '任务规划流程示意',
      img2Name: 'RAI-P4 综合实训展示',
      sensorDescription: '覆盖智能语音、视觉感知与常见机器人动作反馈传感器，满足具身任务规划链路的多模态输入需求。',
      sensorList: ['AI 语音交互麦克风阵列', '颜色识别传感器', '姿态检测传感器'],
    },
    en: {
      sampleCasesDescription: null,
      section1Title: 'Lab scenarios',
      img1Name: 'Task planning workflow overview',
      img2Name: 'RAI-P4 Comprehensive Training Display',
      sensorDescription: 'Provides multimodal inputs required for embodied task planning, covering speech, vision, and motion feedback.',
      sensorList: ['AI speech interaction microphone array', 'Color recognition sensor', 'Posture sensing IMU'],
    },
    ja: {
      sampleCasesDescription: null,
      section1Title: '実習シナリオ',
      img1Name: 'タスク計画フロー概要',
      img2Name: 'RAI-P4 総合実習展示',
      sensorDescription: '音声・視覚・運動フィードバックなど、具現化タスク計画に必要なマルチモーダル入力を網羅しています。',
      sensorList: ['AI音声インタラクション用マイクアレイ', 'カラー認識センサー', '姿勢推定IMUセンサー'],
    },
  } as const;

  for (const [loc, content] of Object.entries(localeMap)) {
    // 从数据库读当前数据（避免覆盖其他字段）
    const current = await payload.findByID({
      collection: 'products',
      id: productId,
      locale: loc as any,
      depth: 0,
      overrideAccess: true,
    });

    const newSampleCases = {
      ...(current.details?.sampleCases ?? {}),
      description: null, // 删除描述文字
      sections: [
        {
          title: content.section1Title,
          gridClassName: 'grid-cols-1 place-items-center gap-6 max-w-5xl mx-auto',
          imageAspectClass: 'aspect-[21/10]',
          cardClassName: 'w-full p-6',
          items: [
            { name: content.img1Name, image: img1url },
            { name: content.img2Name, image: img2url },
          ],
        },
      ],
    };

    const newSensorConfig = {
      ...(current.details?.sensorConfig ?? {}),
      description: content.sensorDescription,
      list: content.sensorList,
    };

    await payload.update({
      collection: 'products',
      id: productId,
      locale: loc as any,
      overrideAccess: true,
      data: {
        details: {
          sampleCases: newSampleCases,
          sensorConfig: newSensorConfig,
        },
      },
    });
    console.log(`  ✓ Updated locale=${loc}`);
  }

  console.log('\n✅ RAI-P4 update complete!');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
