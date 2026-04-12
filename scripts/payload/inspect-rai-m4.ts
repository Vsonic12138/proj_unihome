import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../payload.config';

async function main() {
  const payload = await getPayload({ config: configInfo });

  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'rai-m4' } },
    depth: 2,
    locale: 'zh',
    overrideAccess: true,
  });

  if (res.docs.length === 0) {
    console.log("No product found with slug: rai-m4");
    process.exit(0);
  }

  const p = res.docs[0];
  console.log("=== RAI-M4 Product Data ===");
  console.log(`Name: ${p.name}`);
  console.log(`Model: ${p.model}`);
  
  const details = (p as any).details;
  if (!details) {
    console.log("No DETAILS object.");
    process.exit(0);
  }
  console.log(`\nFeatures count: ${details.features?.length ?? 0}`);
  
  const sampleCases = details.sampleCases;
  console.log(`\n=== Sample Cases (Sections Formatted) ===`);
  if (!sampleCases) {
    console.log("Null sampleCases");
  } else {
    const sections = sampleCases.sections;
    if (sections && Array.isArray(sections)) {
      console.log(`Has ${sections.length} sections:`);
      sections.forEach((sec, i) => {
        console.log(`  [${i}] Title: ${sec.title ?? 'No title'}, Items: ${sec.items?.length ?? 0}`);
        sec.items?.forEach((item: any) => {
          console.log(`    - ${item.name} (Image ID/URL: ${item.image?.id ?? item.image})`);
        });
      });
    } else {
      console.log("No sections array. Raw sampleCases:", Object.keys(sampleCases));
    }
  }

  console.log(`\n=== Experiments ===`);
  const experiments = details.experiments;
  if (experiments && experiments.sections) {
    console.log(`Has ${experiments.sections.length} experiment sections.`);
    experiments.sections.forEach((sec: any) => {
      console.log(`  -> ${sec.title} (${sec.items?.length ?? 0} items)`);
    });
  } else {
    console.log("No experiment sections.");
  }

  process.exit(0);
}

main().catch(console.error);
