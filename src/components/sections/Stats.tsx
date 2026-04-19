import Frame from "@/components/primitives/Frame";
import CountUp from "@/components/motion/CountUp";
import { stats } from "@/lib/cms";

export default function Stats() {
  return (
    <section data-section="stats" className="border-t border-[var(--color-ink3)] section-pad">
      <Frame>
        <p className="eyebrow mb-10">Authority · 04</p>
        <div className="grid max-w-[1280px] grid-cols-2 gap-x-10 gap-y-14 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="font-display text-[var(--color-amber)]"
                style={{
                  fontSize: "var(--fs-stat-xl)",
                  lineHeight: 1,
                  letterSpacing: "var(--tr-display-tight)",
                }}
              >
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 eyebrow-sm text-[var(--color-steel-light)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Frame>
    </section>
  );
}
