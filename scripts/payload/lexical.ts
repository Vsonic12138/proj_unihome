export function lexicalFromPlainText(text: string) {
  const paragraphs = text
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0);

  const children =
    paragraphs.length > 0
      ? paragraphs.map((p) => ({
          type: "paragraph" as const,
          version: 1 as const,
          format: "" as const,
          indent: 0,
          children: [
            {
              type: "text" as const,
              version: 1 as const,
              text: p,
              detail: 0,
              format: 0,
              mode: "normal" as const,
              style: "",
            },
          ],
        }))
      : [
          {
            type: "paragraph" as const,
            version: 1 as const,
            format: "" as const,
            indent: 0,
            children: [],
          },
        ];

  return {
    root: {
      type: "root" as const,
      version: 1 as const,
      format: "" as const,
      indent: 0,
      direction: "ltr" as const,
      children,
    },
  };
}
