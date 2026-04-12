import { getPayload } from "payload";
import configPromise from "../../payload.config";

async function main() {
  console.log("Initializing Payload to trigger DB push...");
  await getPayload({ config: configPromise });
  console.log("Payload initialized successfully. Schema should be synced.");
  process.exit(0);
}

main().catch(console.error);
