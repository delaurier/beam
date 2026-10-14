import { NAV, getDoc } from "@/lib/docs";

export function GET() {
  const lines = ["# Beam design system", "", "> Tokens, components and patterns for building Beam. Every page is available as Markdown at /md/<group>/<page>; the whole set is at /llms-full.txt.", ""];
  for (const group of NAV) {
    lines.push(`## ${group.title}`, "");
    for (const page of group.pages) {
      const doc = getDoc(group.slug, page.slug);
      lines.push(`- [${page.title}](/md/${group.slug}/${page.slug}): ${doc?.description ?? ""}`);
    }
    lines.push("");
  }
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
