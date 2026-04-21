import Frame from "@/components/primitives/Frame";
import { fetchEvents } from "@/lib/cms-server";

export const metadata = {
  title: "Events",
  description: "Workshops, talks, and gatherings hosted by Agentic Engineering.",
};

type EventDoc = {
  id?: string;
  slug?: string;
  title?: string;
  startsAt?: string;
  location?: { name?: string };
  summary?: string;
};

export default async function EventsPage() {
  const events = (await fetchEvents()) as EventDoc[];
  const sorted = [...events].sort(
    (a, b) => new Date(b.startsAt ?? 0).getTime() - new Date(a.startsAt ?? 0).getTime(),
  );

  return (
    <>
      <Frame className="pt-40 pb-16">
        <p className="eyebrow mb-4">[ Events ]</p>
        <h1
          className="font-display text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
        >
          Field <span className="font-serif-italic text-[var(--color-amber)]">sessions</span>.
        </h1>
        <p className="mt-8 max-w-[56ch] text-[var(--color-steel-light)]">
          Workshops, talks, and small gatherings. HCMUT first, open slots announced by the marquee.
        </p>
      </Frame>

      <Frame className="py-16 border-t border-[var(--color-ink3)]">
        {sorted.length === 0 ? (
          <p className="font-mono text-[13px] text-[var(--color-steel)]">
            No events yet. First workshop drops soon.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--color-ink3)]">
            {sorted.map((e) => (
              <li key={e.id ?? e.slug} className="grid grid-cols-[1fr_auto] gap-6 py-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-amber)]">
                    {e.startsAt ? new Date(e.startsAt).toLocaleDateString("en-GB") : "tbd"}
                    {e.location?.name ? ` · ${e.location.name}` : ""}
                  </p>
                  <h2
                    className="font-display mt-2 text-[var(--color-ivory)]"
                    style={{ fontSize: "28px" }}
                  >
                    {e.title}
                  </h2>
                  {e.summary && (
                    <p className="mt-2 max-w-[72ch] text-[var(--color-steel-light)]">{e.summary}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Frame>
    </>
  );
}
