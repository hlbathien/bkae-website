import Frame from "@/components/primitives/Frame";
import CountUp from "@/components/motion/CountUp";
import { stats } from "@/lib/cms";

export default function Stats() {
  return (
    <section className="border-t border-[var(--color-ink3)] py-32">
      <Frame>
        <p className="eyebrow mb-10">[ Authority · 04 ]</p>
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="font-display text-[var(--color-amber)]"
                style={{ fontSize: "clamp(48px, 7vw, 120px)", lineHeight: 1 }}
              >
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-steel-light)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Frame>
    </section>
  );
}
