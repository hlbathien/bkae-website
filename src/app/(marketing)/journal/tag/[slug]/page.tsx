import Frame from "@/components/primitives/Frame";
import Link from "next/link";
import { posts } from "@/lib/cms";

export async function generateStaticParams() {
  const categories = Array.from(new Set(posts.map((p) => p.category.toLowerCase())));
  return categories.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `Journal — ${slug}` };
}

export default async function JournalTagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filtered = posts.filter((p) => p.category.toLowerCase() === slug.toLowerCase());

  return (
    <Frame className="pt-40 pb-24">
      <Link
        href="/journal"
        className="bracket-link font-mono text-[11px] uppercase tracking-widest text-[var(--color-steel)]"
      >
        ← all journal
      </Link>
      <p className="eyebrow mt-8 mb-4">[ Tag ]</p>
      <h1
        className="font-display text-[var(--color-ivory)]"
        style={{ fontSize: "clamp(40px, 7vw, 120px)" }}
      >
        {slug}
      </h1>
      <ul className="mt-12 divide-y divide-[var(--color-ink3)]">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/journal/${p.slug}`}
              className="grid grid-cols-[auto_1fr_auto] gap-6 py-5 text-[var(--color-ivory)] hover:text-[var(--color-amber)]"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-amber)]">
                {p.category}
              </span>
              <span>{p.title}</span>
              <span className="font-mono text-[11px] text-[var(--color-steel)]">{p.publishedAt}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
