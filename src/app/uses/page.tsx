import Frame from "@/components/primitives/Frame";

export const metadata = {
  title: "/uses",
  description: "What we build with — stack, editors, infra, discipline.",
};

const GROUPS = [
  {
    heading: "Models",
    items: ["Qwen-VL · multimodal default", "Qwen 2.5 · text", "Whisper · audio", "Claude Sonnet · for difficult refusals"],
  },
  {
    heading: "Stack",
    items: ["Next.js 16 · App Router", "React 19 · RSC by default", "Tailwind v4 · tokens", "GSAP 3 + Lenis · motion", "Postgres + pgvector", "Payload CMS v3"],
  },
  {
    heading: "Pipeline",
    items: ["Inngest · async jobs", "Pydantic · contract types (Py)", "Zod · contract types (TS)", "FastAPI · deterministic services"],
  },
  {
    heading: "Editors",
    items: ["Neovim · founder one", "Cursor · founder two", "Claude Code · agents", "Github"],
  },
  {
    heading: "Discipline",
    items: ["Contract-based pipelines", "Bounded LLM surfaces", "Cite-or-refuse", "Ship weekly"],
  },
];

export default function UsesPage() {
  return (
    <>
      <Frame className="pt-40 pb-16">
        <p className="eyebrow mb-4">[ /uses ]</p>
        <h1
          className="font-display text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
        >
          What we
          <br />
          <span className="font-serif-italic text-[var(--color-amber)]">build with</span>.
        </h1>
      </Frame>

      <Frame className="py-16 border-t border-[var(--color-ink3)]">
        <div className="grid gap-12 md:grid-cols-2">
          {GROUPS.map((g) => (
            <div key={g.heading}>
              <p className="eyebrow mb-4">[ {g.heading} ]</p>
              <ul className="space-y-2">
                {g.items.map((i) => (
                  <li
                    key={i}
                    className="border-b border-[var(--color-ink3)] pb-2 text-[var(--color-ivory2)] font-mono text-[13px]"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Frame>
    </>
  );
}
