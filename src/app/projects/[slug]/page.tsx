import { notFound } from "next/navigation";
import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import Tag from "@/components/primitives/Tag";
import CountUp from "@/components/motion/CountUp";
import { projects } from "@/lib/cms";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p?.title ?? "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <Frame className="pt-40 pb-32">
      <Link
        href="/projects"
        className="bracket-link text-[11px] uppercase tracking-[0.22em] text-[var(--color-steel-light)] hover:text-[var(--color-amber)]"
      >
        ← All projects
      </Link>

      <p className="eyebrow mt-10 mb-4">{p.eyebrow}</p>
      <h1
        className="font-display text-[var(--color-ivory)]"
        style={{ fontSize: "clamp(40px, 7vw, 120px)" }}
      >
        {p.title}
      </h1>

      <div className="mt-12 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8 space-y-10">
          <section>
            <p className="eyebrow mb-2">Problem</p>
            <p className="text-[var(--color-ivory2)] text-[16px] leading-relaxed">{p.problem}</p>
          </section>
          <section>
            <p className="eyebrow mb-2">Constraint</p>
            <p className="text-[var(--color-ivory2)] text-[16px] leading-relaxed">{p.constraint}</p>
          </section>
          <section>
            <p className="eyebrow mb-2">Outcome</p>
            <p
              className="font-serif-italic text-[var(--color-amber)]"
              style={{ fontSize: "clamp(22px, 2.6vw, 36px)" }}
            >
              {p.outcome}
            </p>
          </section>
        </div>

        <aside className="md:col-span-4">
          <p className="eyebrow mb-3">Stack</p>
          <div className="mb-10 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          <p className="eyebrow mb-3">Stats</p>
          <ul className="space-y-4">
            {p.stats.map((s) => (
              <li key={s.label}>
                <span
                  className="font-display block text-[var(--color-amber)]"
                  style={{ fontSize: "32px" }}
                >
                  <CountUp to={s.value} suffix={s.suffix ?? ""} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-steel)]">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
          {p.links.github && (
            <a
              href={p.links.github}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-block bracket-link text-[12px] uppercase tracking-[0.22em] text-[var(--color-amber)]"
            >
              View source
            </a>
          )}
        </aside>
      </div>
    </Frame>
  );
}
