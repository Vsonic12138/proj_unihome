/**
 * 独立脚本：将所有产品的 _status 设置为 published
 * 用途：修复因 schema 迁移导致 _status 列重置为 NULL 的问题
 */
import "dotenv/config";
import { getPayload } from "payload";
import config from "../../../payload.config";

async function main() {
  const payload = await getPayload({ config });

  try {
    // 查找所有产品（不论状态）
    const res = await payload.find({
      collection: "products",
      limit: 500,
      overrideAccess: true,
      // 不加 where 条件，查出全部
    });

    console.log(`找到 ${res.docs.length} 个产品，开始批量发布...`);

    for (const doc of res.docs) {
      await payload.update({
        collection: "products",
        id: doc.id,
        data: {},          // 不改任何字段
        overrideAccess: true,
        draft: false,      // 强制发布 → _status = "published"
      });
      console.log(`✅ 已发布: ${doc.slug}`);
    }

    console.log("✅ 全部产品发布完成");
  } catch (error) {
    console.error("❌ 发布失败:", error);
  } finally {
    await Promise.race([
      payload.db?.destroy?.(),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
    process.exit(0);
  }
}

await main();
