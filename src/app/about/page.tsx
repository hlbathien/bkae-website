import Frame from "@/components/primitives/Frame";
import Link from "next/link";
import { fetchMembers } from "@/lib/cms-server";

export const metadata = {
  title: "About",
  description:
    "Who we are — two first-year HCMUT students institutionalizing bounded, contract-based AI engineering.",
};

const TIMELINE = [
  { when: "2025 · Q3", what: "Founded at HCMUT" },
  { when: "2025 · Q4", what: "Lumen Journal — Qwen Hackathon 2nd place" },
  { when: "2026 · Q1", what: "Atlas Clinical — 3-clinician pilot" },
  { when: "2026 · Q2", what: "Founding cohort applications open" },
];

export default async function AboutPage() {
  const members = await fetchMembers();

  return (
    <>
      <Frame className="pt-40 pb-24">
        <p className="eyebrow mb-4">[ About · Who ]</p>
        <h1
          className="font-display text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(48px, 9vw, 160px)" }}
        >
          Two students.
          <br />
          <span className="font-serif-italic text-[var(--color-amber)]">One</span> discipline.
        </h1>
        <p className="mt-8 max-w-[56ch] text-[var(--color-steel-light)]">
          We started Agentic Engineering at HCMUT because the AI-native era needs institutions,
          not influencers. We ship systems, not slides. We cite, refuse, and revise.
        </p>
      </Frame>

      <Frame className="py-24 border-t border-[var(--color-ink3)]">
        <p className="eyebrow mb-8">[ Timeline ]</p>
        <ol className="grid gap-6 md:grid-cols-4">
          {TIMELINE.map((t) => (
            <li key={t.when} className="border-t border-[var(--color-ink3)] pt-4">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-amber)]">
                {t.when}
              </p>
              <p className="mt-2 text-[var(--color-ivory)]">{t.what}</p>
            </li>
          ))}
        </ol>
      </Frame>

      <Frame className="py-24 border-t border-[var(--color-ink3)]">
        <p className="eyebrow mb-8">[ Founders ]</p>
        <div className="grid gap-12 md:grid-cols-2">
          {members.map((m) => (
            <Link
              key={m.slug}
              href={`/about/members/${m.slug}`}
              data-cursor="view"
              className="group block rounded border border-[var(--color-ink3)] bg-[var(--color-ink2)] p-8 transition-colors hover:border-[var(--color-amber)]"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-steel)]">
                {m.role}
              </p>
              <h2
                className="font-display mt-3 text-[var(--color-ivory)] group-hover:text-[var(--color-amber)]"
                style={{ fontSize: "40px" }}
              >
                {m.name}
              </h2>
              <p className="mt-4 max-w-md text-[var(--color-steel-light)]">{m.bio}</p>
            </Link>
          ))}
        </div>
      </Frame>
    </>
  );
}
