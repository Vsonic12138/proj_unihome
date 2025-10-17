type QAItem = { q: string; a: string | string[] };
type FAQCopy = { title: string; items?: QAItem[] };
type FAQProps = { copy: FAQCopy };

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
                <span className="text-left text-base font-semibold text-black dark:text-white">
                  {qa.q}
                </span>
                <svg
                  className="mt-1 h-5 w-5 text-body-color transition-transform group-open:rotate-180 dark:text-body-color-dark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              {typeof qa.a === "string" ? (
                <pre className="mt-3 whitespace-pre-wrap text-sm text-body-color dark:text-body-color-dark">{qa.a}</pre>
              ) : (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-body-color dark:text-body-color-dark">
                  {(qa.a as string[]).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsFAQ;
