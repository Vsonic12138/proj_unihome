import "dotenv/config";
import { getPayload } from "payload";
import config from "../../payload.config";

async function main() {
  const payload = await getPayload({ config });
  try {
    const zh = await payload.find({
      collection: "pages",
      locale: "zh",
      draft: true,
      overrideAccess: true,
      limit: 1,
      where: {
        slug: {
          equals: "home",
        },
      },
    });
    console.log("zh home page:", zh.docs?.[0]?.title ?? null);
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}
main();
