import "dotenv/config";
import { getPayload } from "payload";
import config from "../../../payload.config";

async function main() {
  const payload = await getPayload({ config });
  const home = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
    locale: "all",
    limit: 1,
  });
  console.log(JSON.stringify(home.docs[0], null, 2));
  process.exit(0);
}
main();
