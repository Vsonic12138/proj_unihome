import "dotenv/config";
import { getPayload } from "payload";

import config from "../../payload.config";

type NavItem = {
  label?: string | null;
  href?: string | null;
  children?: NavItem[] | null;
};

const EN_LABELS = new Map<string, string>([
  ["/", "Home"],
  ["/products", "Products"],
  ["/developers", "Developers"],
  ["/custom-solutions", "Solutions"],
  ["/case-studies", "Cases"],
  ["/about", "About"],
  ["/contact", "Contact"],
  ["/developers/knowledge-base", "Docs"],
  ["/developers/open-source", "Open Source"],
  ["/case-studies/practical-teaching", "Teaching"],
  ["/case-studies/sci-tech-innovation", "Innovation"],
  ["/case-studies/innovation-competition", "Competition"],
  ["/case-studies/training-base", "Training Base"],
]);

function rewriteItems(items: NavItem[] | null | undefined): NavItem[] {
  if (!Array.isArray(items)) return [];

  return items.map((item) => {
    const href = item?.href ?? "";
    const updatedLabel = href ? EN_LABELS.get(href) ?? item?.label ?? "" : item?.label ?? "";

    return {
      ...item,
      label: updatedLabel,
      children: Array.isArray(item?.children) ? rewriteItems(item.children) : item?.children,
    };
  });
}

async function main() {
  const payload = await getPayload({ config });

  const navigation = await payload.findGlobal({
    slug: "navigation",
    depth: 2,
    locale: "en",
  });

  const currentItems = Array.isArray(navigation?.items) ? (navigation.items as NavItem[]) : [];
  const nextItems = rewriteItems(currentItems);

  await payload.updateGlobal({
    slug: "navigation",
    locale: "en",
    data: {
      items: nextItems as any,
    },
  });

  console.log("Updated English navigation labels for the header.");
  nextItems.forEach((item) => {
    console.log(`- ${item.href ?? "(group)"} => ${item.label ?? ""}`);
    if (Array.isArray(item.children)) {
      item.children.forEach((child) => {
        console.log(`  - ${child.href ?? "(group)"} => ${child.label ?? ""}`);
      });
    }
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
