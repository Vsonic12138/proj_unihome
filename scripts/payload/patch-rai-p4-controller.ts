import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../payload.config';

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
  const product = res.docs[0];

  const controllerImgRes = await payload.find({
    collection: 'media',
    where: { filename: { equals: 'controller-overview-1.png' } },
    limit: 1,
    overrideAccess: true,
  });
  const controllerImgUrl = controllerImgRes.docs[0]?.url as string;

  if (!controllerImgUrl) {
    console.error('controller-overview-1.png not found or no url');
    process.exit(1);
  }

  const locales = ['zh', 'en', 'ja'] as const;

  for (const loc of locales) {
    const current = await payload.findByID({
      collection: 'products',
      id: product.id,
      locale: loc,
      depth: 0,
      overrideAccess: true,
    });

    const newControllerConfig = {
      ...(current.details?.controllerConfig || {}),
      images: [
        {
          src: controllerImgUrl,
          alt: loc === 'zh' ? '控制器结构图' : loc === 'en' ? 'Controller Overview' : 'コントローラ概要図'
        }
      ]
    };

    await payload.update({
      collection: 'products',
      id: product.id,
      locale: loc,
      overrideAccess: true,
      data: {
        details: {
          ...current.details,
          controllerConfig: newControllerConfig,
        },
      },
    });

    console.log(`  ✓ Updated controller string URLs for locale=${loc}`);
  }

  console.log('\n✅ RAI-P4 controller URLs fixed!');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
