import 'dotenv/config';
import { getPayload } from "payload";
import configPromise from "../../../payload.config";

const emptyLexical = {
  root: { type: "root", format: "", indent: 0, version: 1, children: [{ type: "paragraph", format: "", indent: 0, version: 1, children: [] }], direction: "ltr" },
};

function isNonEmptyLexical(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const root = (value as any).root;
  if (!root || typeof root !== "object") return false;
  if (root.type !== "root") return false;
  if (!Array.isArray(root.children)) return false;
  // Lexical 的 root 至少要有一个 block 节点（例如 paragraph），否则会触发 “editor state is empty”
  return root.children.length > 0;
}

async function run() {
  try {
    const payload = await getPayload({ config: await configPromise });
    for (const l of ['zh', 'en', 'ja']) {
      const locale = l as 'zh' | 'en' | 'ja';
      const siteSettings = await payload.findGlobal({
        slug: 'siteSettings',
        locale,
        depth: 0,
        overrideAccess: true,
      });

      const patch: any = {};
      if (!isNonEmptyLexical((siteSettings as any)?.legalText)) {
        patch.legalText = emptyLexical;
      }

      if (Object.keys(patch).length === 0) {
        console.log(`[${locale}] lexical fields ok, skipped`);
        continue;
      }

      await payload.updateGlobal({
        slug: 'siteSettings',
        locale,
        data: patch,
        overrideAccess: true,
      } as any);

      console.log(`[${locale}] fixed lexical fields: ${Object.keys(patch).join(", ")}`);
    }
    console.log('Fixed lexical fields!');
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
