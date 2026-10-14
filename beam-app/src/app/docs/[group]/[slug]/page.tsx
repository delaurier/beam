import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Markdown } from "@/components/docs/markdown";
import { PageActions } from "@/components/docs/page-actions";
import { Icon } from "@/components/icon";
import { NAV, getDoc, neighbours } from "@/lib/docs";

type Props = PageProps<"/docs/[group]/[slug]">;

export function generateStaticParams() {
  return NAV.flatMap((g) => g.pages.map((p) => ({ group: g.slug, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group, slug } = await params;
  const doc = getDoc(group, slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

// The route params are read inside Suspense so navigation can show the shell at once.
export default function DocPage({ params }: Props) {
  return (
    <Suspense fallback={null}>
      <DocContent params={params} />
    </Suspense>
  );
}

async function DocContent({ params }: Pick<Props, "params">) {
  const { group, slug } = await params;
  const doc = getDoc(group, slug);
  if (!doc) notFound();
  const { prev, next } = neighbours(group, slug);
  const toc = doc.headings;
  const section = NAV.find((g) => g.slug === group)?.title;

  return (
    <div className="mx-auto flex w-full max-w-[1120px] gap-xxl px-xxl py-xxl">
      <article className="flex min-w-0 flex-1 flex-col gap-l">
        <header className="flex flex-col gap-m">
          <div className="flex flex-col gap-xxs">
            <div className="font-ui text-s font-ui-medium text-accent">{section}</div>
            <h1 className="font-brand text-xl font-brand-medium text-fg">{doc.title}</h1>
          </div>
          <p className="max-w-[68ch] font-ui text-m font-ui-regular text-fg-muted">{doc.description}</p>
          <PageActions mdHref={`/md/${group}/${slug}`} />
        </header>
        <Markdown source={doc.body} />
        <nav aria-label="Pagination" className="mt-xl grid gap-s pt-xl divider-t sm:grid-cols-2">
          {prev ? (
            <Link href={`/docs/${prev.group}/${prev.slug}`} className="flex items-center gap-s rounded-m p-l transition-colors motion-small edge-solid hover:bg-hover">
              <Icon icon={ArrowLeft} className="text-fg-muted" />
              <span className="font-ui text-m font-ui-medium text-fg">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/docs/${next.group}/${next.slug}`} className="flex items-center justify-end gap-s rounded-m p-l transition-colors motion-small edge-solid hover:bg-hover">
              <span className="font-ui text-m font-ui-medium text-fg">{next.title}</span>
              <Icon icon={ArrowRight} className="text-fg-muted" />
            </Link>
          ) : null}
        </nav>
      </article>
      {toc.length > 1 ? (
        <aside className="sticky top-(--docs-offset) hidden h-fit w-48 shrink-0 flex-col gap-s xl:flex">
          <div className="font-ui text-xs font-ui-medium tracking-xl text-fg-subtle uppercase">On this page</div>
          <div className="flex flex-col gap-xs pl-m divider-l">
            {toc.map((h) => (
              <a key={h.id} href={`#${h.id}`} className={`font-ui text-m font-ui-regular transition-colors motion-small hover:text-fg ${h.depth === 3 ? "pl-m text-fg-subtle" : "text-fg-muted"}`}>
                {h.text}
              </a>
            ))}
          </div>
        </aside>
      ) : null}
    </div>
  );
}
