import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";

type RichTextProps = {
  data?: unknown;
  className?: string;
};

function isLexicalValue(value: unknown): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  const root = (value as any).root;
  return Boolean(root && typeof root === "object" && Array.isArray(root.children));
}

const RichText = ({ data, className }: RichTextProps) => {
  if (typeof data === "string") {
    return (
      <div className={className}>
        <p>{data}</p>
      </div>
    );
  }

  if (!isLexicalValue(data)) {
    return null;
  }

  return (
    <div className={className}>
      <PayloadRichText data={data as any} />
    </div>
  );
};

export default RichText;
