"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SECTION_LABELS: Record<string, string> = {
  hero: "Thesis",
  manifesto: "Manifesto",
  projects: "Evidence",
  process: "Pipeline",
  stats: "Authority",
  journal: "Journal",
  cta: "Convert",
};

type RailSection = {
  id: string;
  label: string;
};

type RailMarker = RailSection & {
  el: HTMLElement;
};

function formatSectionLabel(sectionId: string) {
  if (SECTION_LABELS[sectionId]) return SECTION_LABELS[sectionId];
  return sectionId
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getRailMarkers(): RailMarker[] {
  const seen = new Set<string>();

  return Array.from(document.querySelectorAll<HTMLElement>("[data-section]"))
    .map((el) => {
      const id = el.dataset.section?.trim();
      if (!id || seen.has(id)) return null;

      seen.add(id);
      return {
        id,
        label: formatSectionLabel(id),
        el,
      };
    })
    .filter((marker): marker is RailMarker => Boolean(marker));
}

export default function ScrollRail() {
  const pathname = usePathname();
  const [sections, setSections] = useState<RailSection[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    let raf = 0;
    let lastActive = -1;
    let lastProgress = -1;
    let lastSectionIds = "";

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const markers = getRailMarkers();
      const markerIds = markers.map((marker) => marker.id).join("|");
      if (markerIds !== lastSectionIds) {
        lastSectionIds = markerIds;
        setSections(markers.map(({ id, label }) => ({ id, label })));
        lastActive = -1;
        setActive(0);
        setHistory([]);
      }

      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollHeight > 0 ? scrollY / scrollHeight : 0;

      if (Math.abs(p - lastProgress) > 0.001) {
        lastProgress = p;
        setProgress(p);
      }

      if (markers.length === 0) {
        if (lastActive !== 0) {
          lastActive = 0;
          setActive(0);
          setHistory([]);
        }
        return;
      }

      const mid = window.innerHeight / 2;
      let current = 0;
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].el.getBoundingClientRect().top <= mid) current = i;
      }

      if (current !== lastActive) {
        if (lastActive !== -1) {
          setHistory((prev) => {
            return [lastActive, ...prev]
              .filter((x) => x !== current && x !== -1)
              .slice(0, 3);
          });
        }
        lastActive = current;
        setActive(current);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 z-30 hidden -translate-y-1/2 lg:block"
      style={{ left: "max(20px, calc(var(--gutter) * 0.35))" }}
    >
      <div className="relative flex h-[60vh] flex-col items-start w-8">
        <div className="absolute left-[5px] top-0 h-full w-px bg-[var(--color-ink3)]" />
        <div
          className="absolute left-[5px] top-0 w-px bg-[var(--color-amber)]"
          style={{ height: `${progress * 100}%` }}
        />
        {sections.length > 0 && (
          <ul className="relative flex h-full flex-col justify-between w-full pointer-events-auto">
            {sections.map((s, i) => {
              const isActive = i === active;
              const trailIndex = history.indexOf(i);
              const trailDepth = trailIndex !== -1 ? trailIndex : -1;

              // Different opacity/scales based on trail age: 0 is newest
              let scale = "scale-100";
              let color = "bg-[var(--color-ink)] border-[var(--color-ink3)]";
              
              if (isActive) {
                scale = "scale-110";
                color = "bg-[var(--color-amber)] border-[var(--color-amber)]";
              } else if (trailDepth === 0) {
                scale = "scale-105";
                color = "bg-[var(--color-amber-pale)] border-[var(--color-amber-hot)]";
              } else if (trailDepth === 1) {
                scale = "scale-100";
                color = "bg-[var(--color-ink)] border-[var(--color-amber-pale)]";
              }

              return (
                <li key={s.id} className="group relative flex items-center">
                  <button
                    data-cursor="link"
                    aria-label={`Scroll to ${s.label}`}
                    aria-current={isActive ? "true" : undefined}
                    className="flex h-6 w-6 items-center justify-start focus:outline-none -ml-[7px]"
                    onClick={() => {
                        window.__lenis?.scrollTo(`[data-section="${s.id}"]`);
                    }}
                  >
                    <span
                      className={`block h-[11px] w-[11px] rounded-full border transition-all duration-[800ms] ${scale} ${color}`}
                    />
                  </button>
                  <span className="pointer-events-none absolute left-6 -translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--color-amber)] whitespace-nowrap bg-[rgba(12,12,9,0.9)] backdrop-blur-md px-2 py-1 border border-[var(--color-ink3)] rounded drop-shadow-md">
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
}
