import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { getPayload } from "payload";

import config from "../../../../payload.config";
import { lexicalFromPlainText } from "../../lib/lexical";

type Locale = "zh" | "en" | "ja";

const LOCALES: Locale[] = ["zh", "en", "ja"];

type CommonMessages = {
  cookieConsent?: {
    ariaLabel?: string;
    message?: string;
    privacyPolicyLink?: string;
    learnMore?: string;
    acceptAll?: string;
    rejectNonEssential?: string;
  };
  privacyPolicy?: {
    title?: string;
    description?: string;
    intro?: string;
    sections?: Array<{
      title?: string;
      body?: string[];
    }>;
  };
};

async function readCommonMessages(locale: Locale): Promise<CommonMessages> {
  const filePath = path.resolve(process.cwd(), "messages", locale, "common.json");
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as CommonMessages;
}

function hasRenderableLexicalContent(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const root = (value as any).root;
  if (!root || !Array.isArray(root.children)) return false;

  return root.children.some((node: any) => {
    if (!node || typeof node !== "object") return false;
    if (Array.isArray(node.children)) {
      return node.children.some((child: any) => {
        return typeof child?.text === "string" && child.text.trim().length > 0;
      });
    }

    return true;
  });
}

function buildPolicyText(common: CommonMessages): string {
  const policy = common.privacyPolicy;
  const lines: string[] = [];

  if (policy?.title) lines.push(policy.title);
  if (policy?.description) lines.push(policy.description);
  if (policy?.intro) lines.push(policy.intro);

  for (const section of policy?.sections ?? []) {
    if (section?.title) lines.push(section.title);
    for (const paragraph of section?.body ?? []) {
      if (paragraph) lines.push(paragraph);
    }
  }

  return lines.join("\n\n");
}

async function main() {
  const forceLegalText = process.env.COOKIE_POLICY_FORCE_LEGAL_TEXT === "true";
  const payload = await getPayload({ config });

  for (const locale of LOCALES) {
    const common = await readCommonMessages(locale);
    const current = await payload.findGlobal({
      slug: "siteSettings",
      locale,
      depth: 0,
      overrideAccess: true,
    });

    const shouldWriteLegalText =
      forceLegalText || !hasRenderableLexicalContent((current as any)?.legalText);

    await payload.updateGlobal({
      slug: "siteSettings",
      locale,
      overrideAccess: true,
      data: {
        cookieConsent: {
          ariaLabel: common.cookieConsent?.ariaLabel,
          message: common.cookieConsent?.message,
          privacyPolicyLink:
            common.cookieConsent?.privacyPolicyLink ?? "/privacy-policy",
          learnMore: common.cookieConsent?.learnMore,
          acceptAll: common.cookieConsent?.acceptAll,
          rejectNonEssential: common.cookieConsent?.rejectNonEssential,
        },
        ...(shouldWriteLegalText
          ? { legalText: lexicalFromPlainText(buildPolicyText(common)) }
          : {}),
      },
    });

    // eslint-disable-next-line no-console
    console.log(
      [
        `[migrate] locale=${locale} cookie consent updated`,
        shouldWriteLegalText
          ? "legalText updated"
          : "legalText kept; set COOKIE_POLICY_FORCE_LEGAL_TEXT=true to overwrite",
      ].join("; "),
    );
  }
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
