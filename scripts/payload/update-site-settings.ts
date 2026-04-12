import 'dotenv/config';
import { getPayload } from 'payload';
import configInfo from '../../payload.config';

async function updateSiteSettings() {
  const payload = await getPayload({ config: configInfo });

  const globals = await payload.findGlobal({
    slug: 'siteSettings',
    depth: 0,
    locale: 'zh',
  });

  if (globals && globals.productDetailLabels) {
    const updatedLabels = {
      ...globals.productDetailLabels,
      configuration: '系统配置',
    };

    await payload.updateGlobal({
      slug: 'siteSettings',
      data: {
        productDetailLabels: updatedLabels,
      },
      locale: 'zh',
    });

    console.log('Successfully updated productDetailLabels.configuration to "系统配置" in SiteSettings');
  } else {
    console.error('Could not find siteSettings or productDetailLabels');
  }

  process.exit(0);
}

updateSiteSettings();
