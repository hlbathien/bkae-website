import { notFound } from "next/navigation";
import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import Tag from "@/components/primitives/Tag";
import CountUp from "@/components/motion/CountUp";
import { projects } from "@/lib/cms";
import ToCRail from "@/components/chrome/ToCRail";
import RevealText from "@/components/motion/RevealText";

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
  const projectIndex = projects.findIndex((x) => x.slug === slug);
  const p = projects[projectIndex];
  if (!p) notFound();

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <ToCRail />
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
          <RevealText>{p.title}</RevealText>
        </h1>

        <article className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8 space-y-12">
            <section id="problem">
              <h2 className="eyebrow mb-4 opacity-50">Problem</h2>
              <p className="text-[var(--color-ivory2)] text-[18px] leading-relaxed">{p.problem}</p>
            </section>
            <section id="constraint">
              <h2 className="eyebrow mb-4 opacity-50">Constraint</h2>
              <p className="text-[var(--color-ivory2)] text-[18px] leading-relaxed">{p.constraint}</p>
            </section>
            <section id="outcome">
              <h2 className="eyebrow mb-4 opacity-50">Outcome</h2>
              <p
                className="font-serif-italic text-[var(--color-amber)]"
                style={{ fontSize: "clamp(22px, 2.6vw, 36px)" }}
              >
                {p.outcome}
              </p>
            </section>
          </div>

          <aside className="md:col-span-4">
            <div className="sticky top-40 space-y-12">
              <section id="stack">
                <h2 className="eyebrow mb-4 opacity-50">Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s, i) => (
                    <div 
                      key={s} 
                      className="transition-all duration-500" 
                      style={{ 
                        opacity: 0, 
                        transform: "translateY(10px)",
                        animation: `fade-up 0.5s forwards ${0.1 + i * 0.05}s` 
                      }}
                    >
                      <Tag>{s}</Tag>
                    </div>
                  ))}
                </div>
              </section>

              <section id="stats">
                <h2 className="eyebrow mb-4 opacity-50">Stats</h2>
                <ul className="space-y-6">
                  {p.stats.map((s) => (
                    <li key={s.label}>
                      <span
                        className="font-display block text-[var(--color-amber)]"
                        style={{ fontSize: "40px" }}
                      >
                        <CountUp to={s.value} suffix={s.suffix ?? ""} />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-steel)]">
                        {s.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {p.links.github && (
                <a
                  href={p.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bracket-link text-[12px] uppercase tracking-[0.22em] text-[var(--color-amber)]"
                >
                  View source code
                </a>
              )}
            </div>
          </aside>
        </article>

        {/* Next project footer */}
        <footer className="mt-32 border-t border-[var(--color-ink3)] pt-16">
          <p className="eyebrow mb-6 text-center opacity-40">Next project</p>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block relative mx-auto max-w-4xl text-center"
          >
            <h3 
              className="font-display text-[var(--color-ivory)] transition-colors group-hover:text-[var(--color-amber)]"
              style={{ fontSize: "clamp(32px, 6vw, 96px)" }}
            >
              {nextProject.title}
            </h3>
            <p className="mt-4 font-serif-italic text-[var(--fs-display-s)] italic text-[var(--color-steel-light)]">
              {nextProject.eyebrow}
            </p>
            
            {/* Visual preview hint - subtle amber sweep on hover */}
            <div className="absolute inset-0 -z-10 bg-[var(--color-amber)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10" />
          </Link>
        </footer>
      </Frame>
    </>
  );
}
