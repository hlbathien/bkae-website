import Frame from "@/components/primitives/Frame";

export const metadata = {
  title: "Changelog",
  description: "What shipped, when, and why.",
};

const ENTRIES = [
  { v: "v1.2.0", when: "2026-04-22", what: "Payload CMS v3 online. Admin at /admin. llms.txt, /api/og, draft preview." },
  { v: "v1.1.0", when: "2026-04-12", what: "Journal published: Bounded LLMs, Unbounded Systems." },
  { v: "v1.0.0", when: "2026-03-20", what: "Site v1 — Hero, Manifesto, Projects, Process, Stats, Journal, CTA bands." },
  { v: "v0.1.0", when: "2025-12-15", what: "Lumen Journal — 2nd place, Best Use of Qwen, GenAI Hackathon Vietnam 2025." },
];

export default function ChangelogPage() {
  return (
    <>
      <Frame className="pt-40 pb-16">
        <p className="eyebrow mb-4">[ Changelog ]</p>
        <h1
          className="font-display text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
        >
          What
          <br />
          <span className="font-serif-italic text-[var(--color-amber)]">shipped</span>.
        </h1>
      </Frame>

      <Frame className="py-16 border-t border-[var(--color-ink3)]">
        <ol className="divide-y divide-[var(--color-ink3)]">
          {ENTRIES.map((e) => (
            <li key={e.v} className="grid grid-cols-[120px_100px_1fr] gap-6 py-5 items-baseline">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-amber)]">
                {e.v}
              </span>
              <span className="font-mono text-[11px] text-[var(--color-steel)]">{e.when}</span>
              <span className="text-[var(--color-ivory2)]">{e.what}</span>
            </li>
          ))}
        </ol>
      </Frame>
    </>
  );
}
