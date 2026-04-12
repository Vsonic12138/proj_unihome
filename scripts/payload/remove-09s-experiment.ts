import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../payload.config';
import fs from 'fs';
import path from 'path';

async function main() {
  const payload = await getPayload({ config: configInfo });

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'gx-mat-09s' } },
    depth: 0,
    locale: 'zh',
  });
  if (!result.docs.length) { console.error('Product not found'); process.exit(1); }
  const productId = result.docs[0].id;
  
  const locales = ['zh', 'en', 'ja'] as const;
  
  for (const loc of locales) {
    const raw = fs.readFileSync(path.resolve(process.cwd(), 'messages', loc, 'products.json'), 'utf8');
    const msg = JSON.parse(raw);
    const productData = msg.products.details['gx-mat-09s'];
    
    // We only need to overwrite the experiments field with the newly updated data from JSON.
    await payload.update({
      collection: 'products',
      id: productId,
      locale: loc,
      data: {
        details: {
          experiments: productData.experiments,
        }
      }
    });

    console.log(`  ✓ Updated experiments for locale=${loc}`);
  }

  console.log('\n✅ Removed the Microcontroller Comprehensive Project from CMS!');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
