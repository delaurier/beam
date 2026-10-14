import Link from "next/link";
import { isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./code-block";
import { exampleSource } from "@/lib/docs";
import { Demo } from "./demos";

function text(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return text(node.props.children);
  return "";
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="flex flex-col gap-l">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h2: ({ id, children }) => (
            <h2 id={id} className="scroll-mt-(--docs-offset) pt-xl font-brand text-l font-brand-medium text-fg divider-t mt-l">
              {children}
            </h2>
          ),
          h3: ({ id, children }) => (
            <h3 id={id} className="scroll-mt-(--docs-offset) pt-s font-ui text-m font-ui-medium text-fg">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="max-w-[68ch] font-ui text-m font-ui-regular text-fg-secondary">{children}</p>,
          ul: ({ children }) => <ul className="flex max-w-[68ch] list-disc flex-col gap-xs pl-l font-ui text-m font-ui-regular text-fg-secondary marker:text-fg-subtle">{children}</ul>,
          ol: ({ children }) => <ol className="flex max-w-[68ch] list-decimal flex-col gap-xs pl-l font-ui text-m font-ui-regular text-fg-secondary marker:text-fg-subtle">{children}</ol>,
          strong: ({ children }) => <strong className="font-ui-medium text-fg">{children}</strong>,
          a: ({ href, children }) => (
            <Link href={href ?? "#"} className="text-fg underline decoration-(--border-strong) underline-offset-2 hover:decoration-(--text)">
              {children}
            </Link>
          ),
          code: ({ children }) => <code className="rounded-xs bg-surface-muted px-xxs font-data text-s font-data-regular text-fg">{children}</code>,
          pre: ({ children }) => {
            const child = isValidElement<{ className?: string; children?: ReactNode }>(children) ? children : null;
            const lang = child?.props.className?.replace("language-", "");
            const code = text(child?.props.children ?? children).replace(/\n$/, "");
            if (lang === "demo") {
              const src = exampleSource(code.trim());
              return <Demo name={code.trim()} code={src?.code} file={src?.file} />;
            }
            return <CodeBlock code={code} lang={lang} />;
          },
          table: ({ children }) => (
            <div className="overflow-x-auto rounded-m edge-solid">
              <table className="w-full border-collapse text-left">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="px-l py-s font-ui text-s font-ui-medium text-fg-muted divider-b">{children}</th>,
          td: ({ children }) => <td className="px-l py-s align-top font-ui text-m font-ui-regular text-fg-secondary divider-b">{children}</td>,
          blockquote: ({ children }) => <blockquote className="divider-l pl-l text-fg-muted">{children}</blockquote>,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
