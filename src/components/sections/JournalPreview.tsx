import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import { posts } from "@/lib/cms";

export default function JournalPreview() {
  const [hero, ...rest] = posts;

  return (
    <section className="border-t border-[var(--color-ink3)] py-24">
      <Frame>
        <header className="mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3">[ Journal · 05 ]</p>
            <h2
              className="font-display text-[var(--color-ivory)]"
              style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
            >
              Field notes from the discipline.
            </h2>
          </div>
          <Link
            href="/journal"
            className="bracket-link hidden text-[12px] uppercase tracking-[0.22em] text-[var(--color-ivory)] hover:text-[var(--color-amber)] md:inline-block"
          >
            All posts →
          </Link>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <Link
            href={`/journal/${hero.slug}`}
            className="group col-span-1 row-span-2 border border-[var(--color-ink3)] bg-[var(--color-ink2)] p-8 transition-colors hover:border-[var(--color-amber)] md:col-span-2"
          >
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-[var(--color-ink3)] to-[var(--color-ink)]" />
            <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[var(--color-steel)]">
              <span className="text-[var(--color-amber)]">{hero.category}</span>
              <span>·</span>
              <span>{hero.readingTime}</span>
            </div>
            <h3
              className="font-display mt-3 text-[var(--color-ivory)] group-hover:text-[var(--color-amber)]"
              style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
            >
              {hero.title}
            </h3>
            <p className="mt-3 max-w-xl text-[var(--color-steel-light)]">{hero.excerpt}</p>
          </Link>

          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/journal/${p.slug}`}
              className="group border border-[var(--color-ink3)] bg-[var(--color-ink2)] p-6 transition-colors hover:border-[var(--color-amber)]"
            >
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-[var(--color-ink3)] to-[var(--color-ink)]" />
              <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[var(--color-steel)]">
                <span className="text-[var(--color-amber)]">{p.category}</span>
                <span>·</span>
                <span>{p.readingTime}</span>
              </div>
              <h3 className="font-display mt-2 text-[20px] text-[var(--color-ivory)] group-hover:text-[var(--color-amber)]">
                {p.title}
              </h3>
            </Link>
          ))}
        </div>
      </Frame>
    </section>
  );
}
