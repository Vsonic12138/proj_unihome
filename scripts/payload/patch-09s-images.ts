import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../payload.config';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

// ── Image manifest ────────────────────────────────────────────────────────────
const CHASSIS = [
  { name: '三轮双驱差速底盘',          file: 'tri-wheel-differential-chassis.png' },
  { name: '三轮双驱前轮转向底盘',       file: 'tri-wheel-front-steering-chassis.png' },
  { name: '三轮三驱福来轮全向底盘（方案A）', file: 'tri-wheel-tri-drive-omni-chassis-1.png' },
  { name: '三轮三驱福来轮全向底盘（方案B）', file: 'tri-wheel-tri-drive-omni-chassis-2.png' },
  { name: '四轮双驱差速底盘',          file: 'four-wheel-dual-drive-differential-chassis.png' },
  { name: '四轮四驱差速底盘',          file: 'four-wheel-four-drive-differential-chassis.png' },
  { name: '四轮四驱福来轮全向底盘',     file: 'four-wheel-foley-omni-chassis.png' },
  { name: '四轮四驱麦轮全向底盘',      file: 'four-wheel-mecanum-omni-chassis.png' },
  { name: '四轮八驱转向底盘',          file: 'four-wheel-eight-drive-steering-chassis.png' },
  { name: '六轮双驱差速底盘',          file: 'six-wheel-dual-drive-differential-chassis.png' },
  { name: '六轮六驱差速底盘',          file: 'six-wheel-six-drive-differential-chassis.png' },
];

const ARMS = [
  { name: '2 自由度云台',             file: '2-dof-gimbal.png' },
  { name: '3 自由度串联机械臂（方案一）', file: '3-dof-arm-1.png' },
  { name: '3 自由度串联机械臂（方案二）', file: '3-axis-arm-2.png' },
  { name: '4 自由度串联机械臂',        file: '4-axis-serial-arm.png' },
  { name: '4 自由度 SCARA 机械臂',     file: '4-axis-scara-arm.png' },
  { name: '5 自由度串联机械臂',        file: '5-axis-serial-arm.png' },
  { name: '6 自由度串联机械臂',        file: '6-axis-arm.png' },
  { name: '7 自由度串联机械臂',        file: '7-axis-arm.png' },
  { name: '双臂操作机器人',            file: 'dual-arm.png' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
async function uploadMedia(payload: any, filePath: string, altText: string) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const filename = path.basename(filePath);
    const mimeType = filename.endsWith('.jpg') ? 'image/jpeg' : 'image/png';

    const result = await payload.create({
      collection: 'media',
      data: { alt: altText },
      file: {
        data: fileBuffer,
        mimetype: mimeType,
        name: filename,
        size: fileBuffer.length,
      },
    });
    console.log(`  ✓ Uploaded: ${filename} → id=${result.id}`);
    return result.id as number;
  } catch (err: any) {
    console.error(`  ✗ Failed to upload ${filePath}:`, err.message);
    return null;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const payload = await getPayload({ config: configInfo });

  // 1. Find gx-mat-09s product
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'gx-mat-09s' } },
    depth: 0,
    locale: 'zh',
  });
  if (!result.docs.length) { console.error('Product gx-mat-09s not found'); process.exit(1); }
  const productId = result.docs[0].id;
  console.log(`Found product id=${productId}`);

  // 2. Upload chassis images
  console.log('\n── Uploading chassis images ──');
  const chassisItems: any[] = [];
  for (const c of CHASSIS) {
    const filePath = `public/images/products/gx-mat-09s/chassis/${c.file}`;
    const id = await uploadMedia(payload, filePath, c.name);
    chassisItems.push({ name: c.name, image: id });
  }

  // 3. Upload arm images
  console.log('\n── Uploading arm images ──');
  const armItems: any[] = [];
  for (const a of ARMS) {
    const filePath = `public/images/products/gx-mat-09s/arms/${a.file}`;
    const id = await uploadMedia(payload, filePath, a.name);
    armItems.push({ name: a.name, image: id });
  }

  // 4. Upload composite overview image
  console.log('\n── Uploading composite robot demo image ──');
  const compositeId = await uploadMedia(
    payload,
    'public/images/products/gx-mat-09s/composite/composite-robot-demo.png',
    '复合机器人构型总览'
  );
  const compositeItems = compositeId ? [{ name: '复合机器人构型总览', image: compositeId }] : [];

  // 5. Upload motherboard image (controller overview)
  console.log('\n── Uploading motherboard image ──');
  const motherboardId = await uploadMedia(
    payload,
    'public/images/products/gx-mat-09s/controller/motherboard.png',
    '三层控制板全景（Arduino + STM32F407 + RDK X5）'
  );

  // 6. Update product in CMS (zh, en, ja)
  console.log('\n── Updating product in CMS ──');
  const controllerImages = motherboardId
    ? [{ src: motherboardId, alt: '三层控制板全景', caption: 'Arduino + STM32F407 + RDK X5 三层控制系统' }]
    : undefined;

  for (const locale of ['zh', 'en', 'ja'] as const) {
    await payload.update({
      collection: 'products',
      id: productId,
      locale,
      data: {
        details: {
          sampleCases: {
            chassis: chassisItems,
            arms: armItems,
            composites: compositeItems,
          },
          ...(controllerImages ? {
            controllerConfig: {
              images: controllerImages,
            }
          } : {}),
        },
      },
    });
    console.log(`  ✓ Updated locale=${locale}`);
  }

  console.log('\n✅ All done!');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
