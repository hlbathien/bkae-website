import Frame from "@/components/primitives/Frame";

export const metadata = {
  title: "Sponsor",
  description: "Back the institution shaping Vietnam's AI-native engineers.",
};

const TIERS = [
  {
    n: "01",
    name: "Patron",
    price: "USD 250 / sem",
    perks: ["Logo in colophon", "Mention in one journal essay", "Recruiting priority in cohort"],
  },
  {
    n: "02",
    name: "Partner",
    price: "USD 1,000 / sem",
    perks: [
      "All Patron perks",
      "Named workshop co-host",
      "Case-study collaboration on shipped project",
      "Direct intro to founding cohort",
    ],
  },
  {
    n: "03",
    name: "Institutional",
    price: "Custom",
    perks: [
      "All Partner perks",
      "Curriculum co-design",
      "Multi-semester residency",
      "API credits / infra pledge",
    ],
  },
];

export default function SponsorPage() {
  return (
    <>
      <Frame className="pt-40 pb-16">
        <p className="eyebrow mb-4">[ Sponsor ]</p>
        <h1
          className="font-display text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
        >
          Back the
          <br />
          <span className="font-serif-italic text-[var(--color-amber)]">thesis</span>.
        </h1>
        <p className="mt-8 max-w-[56ch] text-[var(--color-steel-light)]">
          We do not run ads. We do not sell courses. Sponsorship funds infra, stipends, and the
          next shipped system.
        </p>
      </Frame>

      <Frame className="py-16 border-t border-[var(--color-ink3)]">
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.n}
              className="flex flex-col gap-4 border border-[var(--color-ink3)] bg-[var(--color-ink2)] p-6"
            >
              <span
                className="font-display text-[var(--color-amber)]"
                style={{ fontSize: "44px" }}
              >
                {t.n}
              </span>
              <h2
                className="font-display text-[var(--color-ivory)]"
                style={{ fontSize: "22px" }}
              >
                {t.name}
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-steel)]">
                {t.price}
              </p>
              <ul className="mt-2 space-y-1 text-[var(--color-steel-light)]">
                {t.perks.map((p) => (
                  <li key={p} className="text-sm before:content-['·_'] before:text-[var(--color-amber)]">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 font-mono text-[11px] text-[var(--color-steel)]">
          sponsor@inference.club
        </p>
      </Frame>
    </>
  );
}
