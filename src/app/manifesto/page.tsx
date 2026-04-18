import Frame from "@/components/primitives/Frame";

export const metadata = { title: "Manifesto" };

const PILLARS = [
  {
    n: "01",
    title: "Bounded LLMs",
    body: "Confine the model to the smallest surface that still produces value. Refuse outside the contract.",
  },
  {
    n: "02",
    title: "Deterministic edges",
    body: "Pure functions at every interface. Pipelines are reproducible or they are theater.",
  },
  {
    n: "03",
    title: "Surface uncertainty",
    body: "Calibration over confidence. A system that admits 'I don't know' is the only one that earns trust.",
  },
  {
    n: "04",
    title: "Ship to learn",
    body: "Deploy small, instrument everything, iterate against real usage. Velocity with judgment.",
  },
];

export default function ManifestoPage() {
  return (
    <>
      <Frame className="pt-40 pb-24">
        <p className="eyebrow mb-4">[ Manifesto · Full ]</p>
        <h1
          className="font-display text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(48px, 9vw, 160px)" }}
        >
          The
          <br />
          <span className="font-serif-italic text-[var(--color-amber)]">discipline</span>
          <br />
          we owe.
        </h1>
      </Frame>

      <Frame className="py-24 border-t border-[var(--color-ink3)]">
        <div className="grid gap-16 md:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.n}>
              <span className="font-display text-[var(--color-amber)]" style={{ fontSize: "64px" }}>
                {p.n}
              </span>
              <h2
                className="font-display mt-2 text-[var(--color-ivory)]"
                style={{ fontSize: "32px" }}
              >
                {p.title}
              </h2>
              <p className="mt-4 max-w-md text-[var(--color-steel-light)]">{p.body}</p>
            </div>
          ))}
        </div>
      </Frame>
    </>
  );
}
