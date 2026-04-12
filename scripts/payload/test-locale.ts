import "dotenv/config";
import { getPayload } from "payload";
import config from "../../payload.config";

async function main() {
  const payload = await getPayload({ config });
  await payload.updateGlobal({
    slug: "navigation",
    data: {
      items: [
        {
          label: {
            zh: "首页",
            en: "Home",
            ja: "ホーム"
          },
          href: "/"
        }
      ]
    },
    overrideAccess: true,
  });
  console.log("Success with localized object");
  process.exit(0);
}
main();
