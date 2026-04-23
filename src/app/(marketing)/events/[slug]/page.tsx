import Frame from "@/components/primitives/Frame";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchEvents } from "@/lib/cms-server";
import { LD, breadcrumbLD, eventLD } from "@/lib/jsonld";

type EventDoc = {
  slug?: string;
  title?: string;
  startsAt?: string;
  endsAt?: string;
  summary?: string;
  rsvpUrl?: string;
  location?: { name?: string; url?: string };
};

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const events = (await fetchEvents()) as EventDoc[];
  const e = events.find((x) => x.slug === slug);
  if (!e) notFound();

  return (
    <Frame className="pt-40 pb-24">
      <LD
        data={eventLD({
          title: e.title ?? "Event",
          slug: e.slug ?? slug,
          startsAt: e.startsAt,
          endsAt: e.endsAt,
          summary: e.summary,
          location: e.location,
        })}
      />
      <LD
        data={breadcrumbLD([
          { name: "Home", url: "/" },
          { name: "Events", url: "/events" },
          { name: e.title ?? "Event", url: `/events/${e.slug ?? slug}` },
        ])}
      />
      <Link
        href="/events"
        className="bracket-link font-mono text-[11px] uppercase tracking-widest text-[var(--color-steel)]"
      >
        ← all events
      </Link>
      <p className="eyebrow mt-8 mb-4">
        [ {e.startsAt ? new Date(e.startsAt).toLocaleDateString("en-GB") : "tbd"} ·{" "}
        {e.location?.name ?? "TBD"} ]
      </p>
      <h1
        className="font-display text-[var(--color-ivory)]"
        style={{ fontSize: "clamp(40px, 7vw, 120px)" }}
      >
        {e.title}
      </h1>
      {e.summary && (
        <p className="mt-8 max-w-[56ch] text-[var(--color-steel-light)] text-lg">{e.summary}</p>
      )}
      {e.rsvpUrl && (
        <p className="mt-8">
          <a
            href={e.rsvpUrl}
            className="cta-fill inline-block border border-[var(--color-amber)] px-6 py-3 font-mono text-[12px] uppercase tracking-widest text-[var(--color-amber)] hover:text-[var(--color-ink)]"
            data-cursor="magnet"
          >
            RSVP →
          </a>
        </p>
      )}
    </Frame>
  );
}
