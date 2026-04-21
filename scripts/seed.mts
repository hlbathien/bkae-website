/* scripts/seed.mts — port mock fixtures into Payload
   Run: pnpm seed  (after `docker compose up -d` and Payload first-boot)
*/
import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  const payload = await getPayload({ config });

  // Tags
  const stackTags = ["Qwen-VL", "Next.js", "Postgres + pgvector", "Whisper", "Inngest", "Qwen", "Pydantic", "FastAPI", "PDF.js", "Postgres"];
  const tagMap: Record<string, string> = {};
  for (const name of stackTags) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const existing = await payload.find({ collection: "tags", where: { slug: { equals: slug } }, limit: 1 });
    const doc = existing.docs[0] ?? (await payload.create({ collection: "tags", data: { name, slug, type: "stack" } }));
    tagMap[name] = doc.id as string;
  }

  // Members
  const founders = [
    { slug: "founder-1", name: "Founder One", role: "Co-founder · Systems", bio: "Pipelines, contracts, the boring parts that make the magic reproducible." },
    { slug: "founder-2", name: "Founder Two", role: "Co-founder · Models", bio: "Multimodal prompting, evaluation, and refusing unsupported conclusions." },
  ];
  const memberMap: Record<string, string> = {};
  for (const m of founders) {
    const existing = await payload.find({ collection: "members", where: { slug: { equals: m.slug } }, limit: 1 });
    const doc = existing.docs[0] ?? (await payload.create({ collection: "members", data: { ...m, active: true, _status: "published" } as never }));
    memberMap[m.slug] = doc.id as string;
  }

  // Projects
  const projects = [
    {
      slug: "lumen-journal",
      index: "01",
      title: "Lumen — Multimodal Journal Engine",
      eyebrow: "01 / Project",
      problem: "Personal journals lose context across modalities — photos, voice, text live in silos.",
      constraint: "Async pipeline only. Bounded LLM scope. Pure functions for tags & memory I/O.",
      outcome: "2nd place — Best Use of Qwen, Vietnam's largest GenAI Hackathon (200+ teams).",
      stack: ["Qwen-VL", "Next.js", "Postgres + pgvector", "Whisper", "Inngest"],
      stats: [
        { value: 2, label: "Hackathon placing" },
        { value: 200, suffix: "+", label: "Teams beaten" },
        { value: 5, label: "Pipeline stages" },
      ],
      links: [{ label: "GitHub", url: "https://github.com/inference-club/lumen", kind: "github" }],
    },
    {
      slug: "atlas-clinical",
      index: "02",
      title: "Atlas — Traceable Clinical Handoff",
      eyebrow: "02 / Project",
      problem: "Patients get lab PDFs. Doctors get noise. Nobody gets traceable summaries.",
      constraint: "Deterministic contract pipeline. LLM confined to bounded explanation. Refuses unsupported claims.",
      outcome: "Surfaces uncertainty by default. Used by 3 clinicians in pilot.",
      stack: ["Qwen", "Pydantic", "FastAPI", "PDF.js", "Postgres"],
      stats: [
        { value: 3, label: "Pilot clinicians" },
        { value: 100, suffix: "%", label: "Citations traceable" },
        { value: 0, label: "Hallucinated metrics shipped" },
      ],
      links: [{ label: "GitHub", url: "https://github.com/inference-club/atlas", kind: "github" }],
    },
  ];
  for (const p of projects) {
    const existing = await payload.find({ collection: "projects", where: { slug: { equals: p.slug } }, limit: 1 });
    if (existing.docs[0]) continue;
    await payload.create({
      collection: "projects",
      data: {
        ...p,
        stack: p.stack.map((s) => tagMap[s]).filter(Boolean),
        publishedAt: new Date().toISOString(),
        _status: "published",
      } as never,
    });
  }

  // Posts
  const posts = [
    {
      slug: "bounded-llms",
      title: "Bounded LLMs, Unbounded Systems",
      excerpt: "Why the most reliable AI products in 2026 confine the model to the smallest possible surface.",
      publishedAt: "2026-04-12",
    },
    {
      slug: "vibe-discipline",
      title: "Vibe Coding Is Not the Opposite of Discipline",
      excerpt: "Speed and rigor are orthogonal. Here's how we hold both in production.",
      publishedAt: "2026-04-02",
    },
    {
      slug: "qwen-hackathon",
      title: "How a Pipeline Won a Hackathon",
      excerpt: "Postmortem from the Lumen build — what we cut, what we kept, what we'd do again.",
      publishedAt: "2026-03-20",
    },
  ];
  for (const p of posts) {
    const existing = await payload.find({ collection: "posts", where: { slug: { equals: p.slug } }, limit: 1 });
    if (existing.docs[0]) continue;
    await payload.create({ collection: "posts", data: { ...p, author: memberMap["founder-1"], _status: "published" } as never });
  }

  // Announcements
  const anns = [
    { text: "2nd place — Best Use of Qwen, GenAI Hackathon Vietnam 2025", href: "/journal/qwen-hackathon", pinned: true },
    { text: "Now accepting founding-cohort applications", href: "/join" },
    { text: "New essay — Bounded LLMs, Unbounded Systems", href: "/journal" },
  ];
  for (const a of anns) {
    const existing = await payload.find({ collection: "announcements", where: { text: { equals: a.text } }, limit: 1 });
    if (existing.docs[0]) continue;
    await payload.create({ collection: "announcements", data: a as never });
  }

  // Globals
  await payload.updateGlobal({
    slug: "manifesto-pillars",
    data: {
      pillars: [
        { title: "Bounded models", body: "LLMs confined to the smallest possible surface. Contracts at every boundary.", icon: "shield" },
        { title: "Deterministic edges", body: "Pure-function tags, extractors, classifiers. Reproducible by construction.", icon: "git-branch" },
        { title: "Surface uncertainty", body: "Refuse unsupported claims. Cite sources. Trace every conclusion.", icon: "search" },
        { title: "Ship to learn", body: "Two projects shipped. A hackathon won. Discipline proven, not claimed.", icon: "rocket" },
      ],
    } as never,
  });

  console.log("seed: done");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
