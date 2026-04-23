import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import { fetchPosts } from "@/lib/cms-server";

export const metadata = { title: "Journal" };

export default async function JournalIndex() {
  const posts = await fetchPosts();
  return (
    <Frame className="pt-40 pb-32">
      <p className="eyebrow mb-4">[ Index · Journal ]</p>
      <h1
        className="font-display text-[var(--color-ivory)]"
        style={{ fontSize: "clamp(48px, 8vw, 140px)" }}
      >
        Field notes
        <br />
        <span className="font-serif-italic text-[var(--color-amber)]">from the discipline.</span>
      </h1>

      <div className="mt-20 grid gap-10 md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/journal/${p.slug}`}
            className="group block border border-[var(--color-ink3)] bg-[var(--color-ink2)] p-8 transition-colors hover:border-[var(--color-amber)]"
          >
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-[var(--color-ink3)] to-[var(--color-ink)]" />
            <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[var(--color-steel)]">
              <span className="text-[var(--color-amber)]">{p.category}</span>
              <span>·</span>
              <span>{p.readingTime}</span>
              <span>·</span>
              <span>{p.publishedAt}</span>
            </div>
            <h3
              className="font-display mt-3 text-[var(--color-ivory)] group-hover:text-[var(--color-amber)]"
              style={{ fontSize: "clamp(22px, 2.4vw, 32px)" }}
            >
              {p.title}
            </h3>
            <p className="mt-3 text-[var(--color-steel-light)]">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </Frame>
  );
}
