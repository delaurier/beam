import { NAV, getDoc, toMarkdown } from "@/lib/docs";

export function generateStaticParams() {
  return NAV.flatMap((g) => g.pages.map((p) => ({ group: g.slug, slug: p.slug })));
}

export async function GET(_req: Request, ctx: RouteContext<"/md/[group]/[slug]">) {
  const { group, slug } = await ctx.params;
  const doc = getDoc(group, slug);
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(toMarkdown(doc), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
