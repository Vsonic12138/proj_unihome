import "dotenv/config";
import { getPayload } from "payload";
import config from "../../payload.config";

async function main() {
  const payload = await getPayload({ config });
  const p = await payload.find({
    collection: "pages",
    limit: 20,
  });
  console.log(p.docs.map(x => x.slug));
  process.exit(0);
}
main();
