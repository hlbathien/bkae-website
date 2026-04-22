import Frame from "@/components/primitives/Frame";

export const metadata = {
  title: "Press Kit",
  description: "Logos, bios, boilerplate, hi-res covers. Copy anything.",
};

const BOILERPLATE =
  "Agentic Engineering is the HCMUT student club institutionalizing bounded, contract-based AI engineering. Founded in 2025 by two first-year engineers at Ho Chi Minh City University of Technology. 2nd place, Best Use of Qwen — GenAI Hackathon Vietnam 2025. Currently shipping Lumen Journal and Atlas Clinical.";

const ASSETS = [
  { label: "Logo — SVG", href: "/logo.svg" },
  { label: "Logo — PNG", href: "/logo.png" },
  { label: "OG Cover — SVG", href: "/og.svg" },
  { label: "Cover — Lumen", href: "/cover-lumen.svg" },
  { label: "Cover — Atlas", href: "/cover-atlas.svg" },
];

export default function PressPage() {
  return (
    <>
      <Frame className="pt-40 pb-16">
        <p className="eyebrow mb-4">[ Press kit ]</p>
        <h1
          className="font-display text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
        >
          Credentials,
          <br />
          <span className="font-serif-italic text-[var(--color-amber)]">packaged</span>.
        </h1>
      </Frame>

      <Frame className="py-16 border-t border-[var(--color-ink3)]">
        <p className="eyebrow mb-4">[ Boilerplate · EN ]</p>
        <blockquote className="max-w-[72ch] font-serif-italic text-[var(--color-ivory)] text-2xl">
          {BOILERPLATE}
        </blockquote>
      </Frame>

      <Frame className="py-16 border-t border-[var(--color-ink3)]">
        <p className="eyebrow mb-8">[ Assets ]</p>
        <ul className="grid gap-4 md:grid-cols-2">
          {ASSETS.map((a) => (
            <li key={a.href}>
              <a
                href={a.href}
                download
                data-cursor="download"
                className="cta-fill block border border-[var(--color-ink3)] bg-[var(--color-ink2)] px-6 py-4 font-mono text-[12px] uppercase tracking-widest text-[var(--color-ivory)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]"
              >
                {a.label} ↓
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-[11px] text-[var(--color-steel)]">
          Media inquiries · press@inference.club
        </p>
      </Frame>
    </>
  );
}
