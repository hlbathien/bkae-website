import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import { posts } from "@/lib/cms";

export default function JournalPreview() {
  const [hero, ...rest] = posts;
  const side = rest.slice(0, 2);

  return (
    <section data-section="journal" className="border-t border-[var(--color-ink3)] section-pad">
      <Frame>
        <header className="mb-[var(--space-block)] flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3">Journal · 05</p>
            <h2 className="font-display h-display-l text-[var(--color-ivory)]">
              Field notes from the discipline.
            </h2>
          </div>
          <Link
            href="/journal"
            className="bracket-link hidden text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-wide)] text-[var(--color-ivory)] hover:text-[var(--color-amber)] md:inline-block"
          >
            All posts →
          </Link>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <Link
            href={`/journal/${hero.slug}`}
            data-cursor="read"
            className="group col-span-1 row-span-2 border border-[var(--color-ink3)] bg-[var(--color-ink2)] p-8 transition-colors duration-150 hover:border-[var(--color-amber)] md:col-span-2"
          >
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-[var(--color-ink3)] via-[var(--color-ink2)] to-[var(--color-ink)]" />
            <div className="mt-6 flex items-center gap-3 eyebrow-sm text-[var(--color-steel)]">
              <span className="text-[var(--color-amber)]">{hero.category}</span>
              <span>·</span>
              <span>{hero.readingTime}</span>
            </div>
            <h3 className="font-display h-display-m mt-3 text-[var(--color-ivory)] group-hover:text-[var(--color-amber)] transition-colors duration-150">
              {hero.title}
            </h3>
            <p className="mt-4 max-w-xl text-[var(--fs-body)] leading-[var(--lh-body)] text-[var(--color-steel-light)]">
              {hero.excerpt}
            </p>
          </Link>

          {side.map((p) => (
            <Link
              key={p.slug}
              href={`/journal/${p.slug}`}
              data-cursor="read"
              className="group border border-[var(--color-ink3)] bg-[var(--color-ink2)] p-6 transition-colors duration-150 hover:border-[var(--color-amber)]"
            >
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-[var(--color-ink3)] via-[var(--color-ink2)] to-[var(--color-ink)]" />
              <div className="mt-4 flex items-center gap-3 eyebrow-sm text-[var(--color-steel)]">
                <span className="text-[var(--color-amber)]">{p.category}</span>
                <span>·</span>
                <span>{p.readingTime}</span>
              </div>
              <h3
                className="font-display mt-2 text-[var(--color-ivory)] group-hover:text-[var(--color-amber)] transition-colors duration-150"
                style={{ fontSize: "clamp(20px, 1.8vw, 26px)", letterSpacing: "var(--tr-display-tight)" }}
              >
                {p.title}
              </h3>
            </Link>
          ))}
        </div>
      </Frame>
    </section>
  );
}
