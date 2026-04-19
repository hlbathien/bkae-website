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
      }

      const scrollY = window.scrollY;
      const main = document.getElementById("main");
      if (!main) return;

      const mainRect = main.getBoundingClientRect();
      const mainTop = mainRect.top + scrollY;
      const mainBottom = mainTop + mainRect.height;

      // Progress spans the current route's main content only, so each page
      // fills the rail based on its own length instead of the shared footer.
      const span = Math.max(1, mainBottom - mainTop - window.innerHeight);
      const p = Math.min(1, Math.max(0, (scrollY - mainTop) / span));

      if (Math.abs(p - lastProgress) > 0.001) {
        lastProgress = p;
        setProgress(p);
      }

      if (markers.length === 0) {
        if (lastActive !== 0) {
          lastActive = 0;
          setActive(0);
        }
        return;
      }

      const mid = window.innerHeight / 2;
      let current = 0;
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].el.getBoundingClientRect().top <= mid) current = i;
      }

      if (current !== lastActive) {
        lastActive = current;
        setActive(current);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <aside
      aria-hidden
      className="pointer-events-none fixed top-1/2 z-30 hidden -translate-y-1/2 lg:block"
      style={{ left: "max(20px, calc(var(--gutter) * 0.35))" }}
    >
      <div className="relative flex h-[60vh] flex-col items-start">
        <div className="absolute left-[5px] top-0 h-full w-px bg-[var(--color-ink3)]" />
        <div
          className="absolute left-[5px] top-0 w-px bg-[var(--color-amber)]"
          style={{ height: `${progress * 100}%` }}
        />
        {sections.length > 0 && (
          <ul className="relative flex h-full flex-col justify-between">
            {sections.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id} className="relative flex items-center gap-3">
                  <span
                    className={`block h-[11px] w-[11px] rounded-full border transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--color-amber)] border-[var(--color-amber)] scale-110"
                        : "bg-[var(--color-ink)] border-[var(--color-ink3)]"
                    }`}
                  />
                  <span
                    className={`font-[var(--font-mono)] text-[10px] uppercase tracking-[0.18em] transition-opacity duration-300 ${
                      isActive
                        ? "opacity-100 text-[var(--color-amber)]"
                        : "opacity-30 text-[var(--color-steel)]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
