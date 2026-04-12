import "dotenv/config";
import { getPayload } from "payload";
import config from "../../payload.config";

async function main() {
  const payload = await getPayload({ config });
  const p = await payload.find({
    collection: "products",
    where: { _status: { equals: "published" } },
    limit: 200,
    depth: 0,
    overrideAccess: true,
  });
  console.log(`published products: ${p.docs.length}`);
  console.log(p.docs.map((x: any) => x.slug));
  process.exit(0);
}
main();
