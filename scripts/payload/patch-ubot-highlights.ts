import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../payload.config';
import fs from 'fs';
import path from 'path';

async function patchUbotHighlights() {
  const payload = await getPayload({ config: configInfo });

  const zhData = JSON.parse(fs.readFileSync(path.resolve('./messages/zh/products.json'), 'utf-8'));
  const enData = JSON.parse(fs.readFileSync(path.resolve('./messages/en/products.json'), 'utf-8'));
  const jaData = JSON.parse(fs.readFileSync(path.resolve('./messages/ja/products.json'), 'utf-8'));

  const jsonKey = 'ubot-mr40';
  const slug = 'ubot-mr40';

  const zhHighlights = zhData.products.details[jsonKey]?.highlights;
  const enHighlights = enData.products.details[jsonKey]?.highlights;
  const jaHighlights = jaData.products.details[jsonKey]?.highlights;
  
  if (!zhHighlights) {
      console.log('No highlights found in JSON.');
      process.exit(1);
  }

  const products = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
    locale: 'zh',
  });

  if (products.docs.length > 0) {
    const productId = products.docs[0].id;
    
    // Update ZH
    await payload.update({
      collection: 'products',
      id: productId,
      data: {
        details: {
          highlights: zhHighlights.map((t: string) => ({ text: t })),
        }
      },
      locale: 'zh'
    });

    // Update EN
    await payload.update({
        collection: 'products',
        id: productId,
        data: {
          details: {
            highlights: enHighlights.map((t: string) => ({ text: t })),
          }
        },
        locale: 'en'
    });

    // Update JA
    await payload.update({
        collection: 'products',
        id: productId,
        data: {
          details: {
            highlights: jaHighlights.map((t: string) => ({ text: t })),
          }
        },
        locale: 'ja'
    });


    console.log(`Successfully patched highlights for product ${slug} in all languages.`);
  } else {
    console.error(`Product ${slug} not found.`);
  }

  process.exit(0);
}

patchUbotHighlights();
