import "dotenv/config";
import { getPayload } from "payload";
import config from "../../payload.config";

async function main() {
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "navigation",
    locale: "zh",
    data: {
      items: [
        {
          id: "666000000000000000000001",
          label: "首页",
          href: "/"
        }
      ]
    },
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "navigation",
    locale: "en",
    data: {
      items: [
        {
          id: "666000000000000000000001",
          label: "Home",
          href: "/"
        }
      ]
    },
    overrideAccess: true,
  });

  const res = await payload.findGlobal({ slug: "navigation", locale: "all" });
  console.log("Result:", JSON.stringify(res, null, 2));
  process.exit(0);
}
main();
