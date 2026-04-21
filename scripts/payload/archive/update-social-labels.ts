import 'dotenv/config';
import { getPayload } from "payload";
import configPromise from "../../../payload.config";

async function run() {
  try {
    const payload = await getPayload({ config: await configPromise });

    // Fetch without locale to inspect raw array
    const siteSettings = await payload.findGlobal({
      slug: 'siteSettings',
      depth: 0,
    });

    const socialLinks = siteSettings.socialLinks || [];

    const zhLinks = socialLinks.map(sl => {
      if (sl.href && sl.href.includes('taobao')) return { ...sl, label: '淘宝店铺' };
      if (sl.href && sl.href.includes('bilibili')) return { ...sl, label: 'B站官方账号' };
      return sl;
    });

    const enLinks = socialLinks.map(sl => {
      if (sl.href && sl.href.includes('taobao')) return { ...sl, label: 'Taobao Store' };
      if (sl.href && sl.href.includes('bilibili')) return { ...sl, label: 'Bilibili Official' };
      return sl;
    });

    const jaLinks = socialLinks.map(sl => {
      if (sl.href && sl.href.includes('taobao')) return { ...sl, label: 'タオバオ店舗' };
      if (sl.href && sl.href.includes('bilibili')) return { ...sl, label: 'Bilibili公式' };
      return sl;
    });

    // Update ZH
    await payload.updateGlobal({
      slug: 'siteSettings',
      locale: 'zh',
      data: { socialLinks: zhLinks } as any
    });
    // Update EN
    await payload.updateGlobal({
      slug: 'siteSettings',
      locale: 'en',
      data: { socialLinks: enLinks } as any
    });
    // Update JA
    await payload.updateGlobal({
      slug: 'siteSettings',
      locale: 'ja',
      data: { socialLinks: jaLinks } as any
    });

    console.log('Successfully updated social links with proper labels for all locales.');
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
