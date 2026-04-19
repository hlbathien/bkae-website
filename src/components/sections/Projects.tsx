"use client";
import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import Tag from "@/components/primitives/Tag";
import CountUp from "@/components/motion/CountUp";
import { projects, type Project } from "@/lib/cms";
import { ProjectArtifact } from "@/components/sections/ProjectDiagrams";

function ProjectScene({ p, idx }: { p: Project; idx: number }) {
  const alt = idx % 2 === 1;
  return (
    <div
      className="relative grid grid-cols-1 items-start gap-10 border-t border-[var(--color-ink3)] py-[var(--space-section-sm)] lg:grid-cols-12 lg:gap-16"
    >
      <div className={`min-w-0 lg:col-span-5 ${alt ? "lg:order-2" : ""}`}>
        <div className="flex items-baseline gap-4">
          <span
            className="font-display text-[var(--color-amber)]"
            style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1, letterSpacing: "var(--tr-display-tight)" }}
          >
            {p.index}
          </span>
          <div className="h-px w-16 bg-[var(--color-amber)]" />
          <p className="eyebrow">{p.eyebrow}</p>
        </div>
        <h3 className="mt-6 font-display h-display-m text-[var(--color-ivory)]">
          {p.title}
        </h3>

        <dl className="mt-10 space-y-6 text-[var(--color-ivory2)] text-[var(--fs-body)] leading-[var(--lh-body)]">
          <div>
            <dt className="eyebrow mb-1">Problem</dt>
            <dd>{p.problem}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Constraint</dt>
            <dd>{p.constraint}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Outcome</dt>
            <dd
              className="font-serif-italic text-[var(--color-amber-hot)]"
              style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.3 }}
            >
              {p.outcome}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-2">
          {p.stack.map((s, i) => (
            <Tag key={s}>{i === 0 ? <span className="text-[var(--color-amber)]">●</span> : null} {s}</Tag>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
          {p.stats.map((s) => (
            <div key={s.label} className="min-w-0">
              <div
                className="font-display text-[var(--color-amber)] truncate"
                style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1, letterSpacing: "var(--tr-display-tight)" }}
              >
                <CountUp to={s.value} suffix={s.suffix ?? ""} />
              </div>
              <div className="mt-2 eyebrow-sm text-[var(--color-steel)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={`/projects/${p.slug}`}
            data-cursor="link"
            className="bracket-link text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-wide)] text-[var(--color-ivory)] hover:text-[var(--color-amber)]"
          >
            Read the build →
          </Link>
        </div>
      </div>

      <div className={`min-w-0 lg:col-span-7 ${alt ? "lg:order-1" : ""}`} data-cursor="view">
        <div className="relative border border-[var(--color-ink3)] bg-[var(--color-ink2)] p-4 md:p-8">
          <div className="mb-3 flex items-center justify-between eyebrow-sm text-[var(--color-steel)]">
            <span>
              <span className="text-[var(--color-amber)]">●</span> diagram · {p.slug}
            </span>
            <span>live</span>
          </div>
          <ProjectArtifact slug={p.slug} />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" data-section="projects" className="relative border-t border-[var(--color-ink3)]">
      <Frame>
        <header className="flex items-end justify-between pt-[var(--space-section-sm)] pb-[var(--space-block)]">
          <div>
            <p className="eyebrow mb-3">Evidence · 02</p>
            <h2 className="font-display h-display-l text-[var(--color-ivory)]">
              Two systems.
              <br />
              <span className="font-serif-italic text-[var(--color-amber)]">Both shipped.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            data-cursor="link"
            className="bracket-link hidden text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-wide)] text-[var(--color-ivory)] hover:text-[var(--color-amber)] md:inline-block"
          >
            All projects →
          </Link>
        </header>

        {projects.map((p, i) => (
          <ProjectScene key={p.slug} p={p} idx={i} />
        ))}
      </Frame>
    </section>
  );
}
