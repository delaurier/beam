import { allDocs, toMarkdown } from "@/lib/docs";

export function GET() {
  const body = allDocs().map((d) => `<!-- /docs/${d.group}/${d.slug} -->\n\n${toMarkdown(d)}`).join("\n\n---\n\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
