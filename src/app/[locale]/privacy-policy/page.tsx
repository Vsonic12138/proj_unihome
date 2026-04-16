import PageIntro from "@/components/Common/PageIntro";
import RichText from "@/components/payload/RichText";
import { getTranslations } from "next-intl/server";
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import type { Metadata } from "next";
import { tryGetGlobals, tryGetPayloadClient, toPayloadLocale } from "@/lib/payload";
import { buildAlternates } from "@/lib/seo";

type PageParams = {
  params: Promise<{ locale: string }>;
};

function hasRenderableLexicalContent(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const root = (value as any).root;
  if (!root || !Array.isArray(root.children)) return false;

  return root.children.some((node: any) => {
    if (!node || typeof node !== "object") return false;
    if (Array.isArray(node.children)) {
      return node.children.some((child: any) => {
        if (!child || typeof child !== "object") return false;
        return typeof child.text === "string" && child.text.trim().length > 0;
      });
    }

    return true;
  });
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates({ locale, pathSuffix: "/privacy-policy" }),
  };
}

const PrivacyPolicyPage = async ({ params }: PageParams) => {
  const { locale } = await params;
  const isPreview = (await draftMode()).isEnabled;
  if (isPreview) noStore();

  const t = await getTranslations({ locale, namespace: "privacyPolicy" });
  const payload = await tryGetPayloadClient();
  const payloadLocale = toPayloadLocale(locale);
  const globals = payload
    ? await tryGetGlobals({
        payload,
        locale: payloadLocale,
        depth: 1,
      })
    : null;

  const legalText = globals?.siteSettings?.legalText;
  const hasCmsLegalText = hasRenderableLexicalContent(legalText);
  const sections = t.raw("sections") as Array<{
    title: string;
    body: string[];
  }>;

  return (
    <PageIntro title={t("title")} description={t("description")}>
      <div className="space-y-10">
        {hasCmsLegalText ? (
          <section className="space-y-4">
            <RichText data={legalText} />
          </section>
        ) : (
          <>
            <section className="space-y-4">
              <p>{t("intro")}</p>
            </section>
            {Array.isArray(sections)
              ? sections.map((section) => (
                  <section key={section.title} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-black dark:text-white">{section.title}</h2>
                    <div className="space-y-3">
                      {Array.isArray(section.body)
                        ? section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                        : null}
                    </div>
                  </section>
                ))
              : null}
          </>
        )}
      </div>
    </PageIntro>
  );
};

export default PrivacyPolicyPage;
