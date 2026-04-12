import "dotenv/config";

import { getPayload } from "payload";

import configPromise from "../../payload.config";
import { lexicalFromPlainText } from "./lexical";

const LOCALES = ["zh", "en", "ja"] as const;
const PAGE_SIZE = 100;
const isDryRun = process.argv.includes("--dry-run");

const PRODUCT_RICHTEXT_FIELDS = [
  "details.overview",
  "details.features[].content",
  "details.sampleCases.description",
] as const;

type ProductLocaleDoc = {
  id: number | string;
  slug?: string | null;
  _status?: "draft" | "published" | null;
  details?: {
    overview?: unknown;
    features?: Array<Record<string, unknown>>;
    sampleCases?: {
      description?: unknown;
      [key: string]: unknown;
    } | null;
    [key: string]: unknown;
  } | null;
};

type Issue = {
  productId: number | string;
  slug: string;
  locale: (typeof LOCALES)[number];
  field: (typeof PRODUCT_RICHTEXT_FIELDS)[number] | string;
  kind: "string" | "invalid";
  preview: string;
};

const emptyLexical = lexicalFromPlainText("");

function isLexicalValue(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const root = (value as any).root;
  return Boolean(root && typeof root === "object" && Array.isArray(root.children));
}

function toPreview(value: unknown): string {
  if (typeof value === "string") return value.slice(0, 80);
  if (value == null) return "null";
  try {
    return JSON.stringify(value).slice(0, 80);
  } catch {
    return String(value).slice(0, 80);
  }
}

function toLexical(value: string) {
  return value.trim().length > 0 ? lexicalFromPlainText(value) : emptyLexical;
}

function inspectProductLocale(doc: ProductLocaleDoc, locale: (typeof LOCALES)[number]): Issue[] {
  const issues: Issue[] = [];
  const slug = String(doc.slug ?? "");
  const details = doc.details ?? {};

  const pushIssue = (field: Issue["field"], kind: Issue["kind"], value: unknown) => {
    issues.push({
      productId: doc.id,
      slug,
      locale,
      field,
      kind,
      preview: toPreview(value),
    });
  };

  if (typeof details.overview === "string") {
    pushIssue("details.overview", "string", details.overview);
  } else if (details.overview != null && !isLexicalValue(details.overview)) {
    pushIssue("details.overview", "invalid", details.overview);
  }

  for (const [index, feature] of (details.features ?? []).entries()) {
    const content = feature?.content;
    if (typeof content === "string") {
      pushIssue(`details.features[${index}].content`, "string", content);
    } else if (content != null && !isLexicalValue(content)) {
      pushIssue(`details.features[${index}].content`, "invalid", content);
    }
  }

  const sampleCasesDescription = details.sampleCases?.description;
  if (typeof sampleCasesDescription === "string") {
    pushIssue("details.sampleCases.description", "string", sampleCasesDescription);
  } else if (sampleCasesDescription != null && !isLexicalValue(sampleCasesDescription)) {
    pushIssue("details.sampleCases.description", "invalid", sampleCasesDescription);
  }

  return issues;
}

function buildPatchedDetails(details: ProductLocaleDoc["details"]) {
  if (!details) return null;

  const nextDetails: ProductLocaleDoc["details"] = {
    ...details,
  };

  let changed = false;

  if (typeof nextDetails.overview === "string") {
    nextDetails.overview = toLexical(nextDetails.overview);
    changed = true;
  }

  if (Array.isArray(nextDetails.features)) {
    nextDetails.features = nextDetails.features.map((feature) => {
      if (typeof feature?.content !== "string") {
        return feature;
      }

      changed = true;
      return {
        ...feature,
        content: toLexical(feature.content),
      };
    });
  }

  if (nextDetails.sampleCases && typeof nextDetails.sampleCases.description === "string") {
    nextDetails.sampleCases = {
      ...nextDetails.sampleCases,
      description: toLexical(nextDetails.sampleCases.description),
    };
    changed = true;
  }

  return changed ? nextDetails : null;
}

async function getAllProductIds(payload: Awaited<ReturnType<typeof getPayload>>) {
  const ids: Array<number | string> = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const result = await payload.find({
      collection: "products",
      locale: "zh",
      depth: 0,
      overrideAccess: true,
      limit: PAGE_SIZE,
      page,
      draft: true,
    });

    for (const doc of result.docs) {
      ids.push(doc.id as number | string);
    }

    totalPages = result.totalPages ?? 1;
    page += 1;
  }

  return ids;
}

async function main() {
  const payload = await getPayload({ config: await configPromise });
  const productIds = await getAllProductIds(payload);
  const issues: Issue[] = [];
  const fixed: Array<{ productId: number | string; slug: string; locale: string; fields: string[] }> = [];

  for (const productId of productIds) {
    for (const locale of LOCALES) {
      const doc = (await payload.findByID({
        collection: "products",
        id: productId,
        locale,
        depth: 0,
        overrideAccess: true,
        draft: true,
      })) as ProductLocaleDoc;

      const currentIssues = inspectProductLocale(doc, locale);
      issues.push(...currentIssues);

      const patchedDetails = buildPatchedDetails(doc.details);
      if (!patchedDetails || isDryRun) {
        continue;
      }

      await payload.update({
        collection: "products",
        id: productId,
        locale,
        overrideAccess: true,
        draft: doc._status !== "published",
        data: {
          details: patchedDetails,
        },
      });

      fixed.push({
        productId,
        slug: String(doc.slug ?? ""),
        locale,
        fields: currentIssues.filter((issue) => issue.kind === "string").map((issue) => issue.field),
      });
    }
  }

  const stringIssues = issues.filter((issue) => issue.kind === "string");
  const invalidIssues = issues.filter((issue) => issue.kind === "invalid");

  console.log(`Scanned products: ${productIds.length}`);
  console.log(`String issues: ${stringIssues.length}`);
  console.log(`Invalid non-Lexical issues: ${invalidIssues.length}`);

  if (issues.length > 0) {
    console.log("\nDetected issues:");
    for (const issue of issues) {
      console.log(
        `- [${issue.kind}] slug=${issue.slug} locale=${issue.locale} field=${issue.field} preview=${issue.preview}`,
      );
    }
  }

  if (isDryRun) {
    console.log("\nDry run only, no data updated.");
    return;
  }

  console.log(`\nPatched locales: ${fixed.length}`);
  for (const item of fixed) {
    console.log(`- fixed slug=${item.slug} locale=${item.locale} fields=${item.fields.join(", ")}`);
  }

  if (invalidIssues.length > 0) {
    console.log("\nWarning: invalid non-Lexical objects were detected but not auto-fixed.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
