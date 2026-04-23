// Admin Dashboard server component — renders 4 widgets at the top of /admin.
// Mounted via payload.config.ts: admin.components.beforeDashboard.
import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";

async function counts() {
  try {
    const payload = await getPayload({ config });
    const [drafts, projects, posts, members, events, anns] = await Promise.all([
      payload.find({ collection: "posts", where: { _status: { equals: "draft" } }, limit: 0 }),
      payload.find({ collection: "projects", limit: 0 }),
      payload.find({ collection: "posts", limit: 0 }),
      payload.find({ collection: "members", limit: 0 }),
      payload.find({ collection: "events", limit: 0 }),
      payload.find({ collection: "announcements", limit: 0 }),
    ]);
    // Last 5 form submissions (form-builder plugin collection slug = form-submissions)
    let submissions: { id: string; createdAt?: string }[] = [];
    try {
      const r = await payload.find({ collection: "form-submissions" as never, limit: 5, sort: "-createdAt" });
      submissions = r.docs as never;
    } catch {
      submissions = [];
    }
    // Posts published last 7 days for sparkline
    const since = new Date(Date.now() - 7 * 86400_000).toISOString();
    const recent = await payload.find({
      collection: "posts",
      where: { publishedAt: { greater_than: since } },
      limit: 100,
      sort: "-publishedAt",
    });
    return {
      drafts: drafts.totalDocs,
      projects: projects.totalDocs,
      posts: posts.totalDocs,
      members: members.totalDocs,
      events: events.totalDocs,
      anns: anns.totalDocs,
      submissions,
      publishedThisWeek: recent.totalDocs,
    };
  } catch {
    return null;
  }
}

const card: React.CSSProperties = {
  background: "var(--theme-elevation-50)",
  border: "1px solid var(--theme-elevation-150)",
  borderRadius: 4,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  minHeight: 120,
};
const label: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--theme-elevation-500)",
};
const big: React.CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontSize: 36,
  lineHeight: 1,
  fontWeight: 800,
  color: "#D4870A",
};
const link: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: "#D4870A",
  textDecoration: "none",
};

export default async function Dashboard() {
  const c = await counts();
  if (!c) {
    return (
      <div style={{ ...card, marginBottom: 20 }}>
        <span style={label}>dashboard</span>
        <p style={{ color: "var(--theme-text)", fontSize: 13 }}>
          Database not reachable — widgets disabled. Run <code>docker compose up -d</code> and reload.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        marginBottom: 24,
      }}
    >
      <div style={card}>
        <span style={label}>● drafts</span>
        <span style={big}>{c.drafts}</span>
        <Link href="/admin/collections/posts?where[_status][equals]=draft" style={link}>
          review →
        </Link>
      </div>

      <div style={card}>
        <span style={label}>published · last 7d</span>
        <span style={big}>{c.publishedThisWeek}</span>
        <span style={{ ...label, opacity: 0.6 }}>posts</span>
      </div>

      <div style={card}>
        <span style={label}>recent submissions</span>
        {c.submissions.length === 0 ? (
          <span style={{ ...label, opacity: 0.6 }}>none yet</span>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            {c.submissions.map((s) => (
              <li key={s.id} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--theme-text)" }}>
                #{String(s.id).slice(0, 8)} ·{" "}
                <span style={{ opacity: 0.6 }}>
                  {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={card}>
        <span style={label}>quick · new</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
          <Link href="/admin/collections/projects/create" style={link}>+ project</Link>
          <Link href="/admin/collections/posts/create" style={link}>+ post</Link>
          <Link href="/admin/collections/events/create" style={link}>+ event</Link>
          <Link href="/admin/collections/announcements/create" style={link}>+ announcement</Link>
        </div>
      </div>

      <div style={card}>
        <span style={label}>library</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4, marginTop: 4 }}>
          <span style={{ ...label, color: "var(--theme-text)" }}>{c.projects} · projects</span>
          <span style={{ ...label, color: "var(--theme-text)" }}>{c.posts} · posts</span>
          <span style={{ ...label, color: "var(--theme-text)" }}>{c.members} · members</span>
          <span style={{ ...label, color: "var(--theme-text)" }}>{c.events} · events</span>
          <span style={{ ...label, color: "var(--theme-text)" }}>{c.anns} · ann.</span>
        </div>
      </div>
    </div>
  );
}
