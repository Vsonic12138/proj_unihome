import RichText from "@/components/payload/RichText";

type QAItem = { q: string; a: any; products?: string[] };
type FAQCopy = { title: string; items?: QAItem[] };
type FAQProps = { copy: FAQCopy };

function isRichTextValue(value: unknown) {
  return Boolean(value && typeof value === "object" && "root" in (value as Record<string, unknown>));
}

const ProductsFAQ = ({ copy }: FAQProps) => {
  const items: QAItem[] = copy.items ?? [];
  if (!items.length) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">{copy.title}</h2>
        <div className="divide-y divide-stroke dark:divide-stroke-dark">
          {items.map((qa, idx) => (
            <details key={idx} className="group py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center text-left">
                  <span className="text-base font-semibold text-black dark:text-white">
                    {qa.q}
                  </span>
                  {qa.products && qa.products.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      {qa.products.map((p, i) => (
                        <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <svg
                  className="mt-1 h-5 w-5 text-body-color transition-transform group-open:rotate-180 dark:text-body-color-dark flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="mt-3">
                {isRichTextValue(qa.a) ? (
                  <RichText data={qa.a} className="text-sm text-body-color dark:text-body-color-dark" />
                ) : typeof qa.a === "string" ? (
                  <pre className="whitespace-pre-wrap text-sm text-body-color dark:text-body-color-dark font-sans">{qa.a}</pre>
                ) : Array.isArray(qa.a) ? (
                  <ul className="list-disc space-y-1 pl-5 text-sm text-body-color dark:text-body-color-dark">
                    {qa.a.map((line: any, i: number) => (
                      <li key={i}>{String(line)}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsFAQ;
