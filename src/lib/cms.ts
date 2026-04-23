// Mock CMS layer. Swap with Payload calls later.
// Each function returns shape matching planned Payload collections.
//
// v2 (phase 24): Payload-backed async fetchers added below as `fetch*()`.
// Existing synchronous arrays remain unchanged to avoid breaking routes until
// each page is migrated. Migrate one route at a time by importing the async
// variant (e.g. `fetchProjects()`) in place of the constant.

export type Project = {
  slug: string;
  index: string;
  title: string;
  eyebrow: string;
  problem: string;
  constraint: string;
  outcome: string;
  stack: string[];
  stats: { value: number; suffix?: string; label: string }[];
  cover: string;
  links: { github?: string; demo?: string };
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  readingTime: string;
  publishedAt: string;
};

export type Member = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  links: { github?: string; x?: string };
};

export type Announcement = {
  text: string;
  href: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
  sparkline?: number[];
};

export type ProcessNode = {
  id: string;
  label: string;
  desc: string;
  icon?: string;
};

export type HomePageContent = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline?: string;
  heroKeywords: string[];
  heroLiveBandSuffix: string;
  manifestoQuote: string;
  ctaBands: { label: string; href: string }[];
};

export const announcements: Announcement[] = [
  {
    text: "2nd place — Best Use of Qwen, GenAI Hackathon Vietnam 2025",
    href: "/journal/qwen-hackathon",
  },
  { text: "Now accepting founding-cohort applications", href: "/join" },
  { text: "New essay — Bounded LLMs, Unbounded Systems", href: "/journal" },
];

export const projects: Project[] = [
  {
    slug: "lumen-journal",
    index: "01",
    title: "Lumen — Multimodal Journal Engine",
    eyebrow: "01 / Project",
    problem:
      "Personal journals lose context across modalities — photos, voice, text live in silos.",
    constraint: "Async pipeline only. Bounded LLM scope. Pure functions for tags & memory I/O.",
    outcome: "2nd place — Best Use of Qwen, Vietnam's largest GenAI Hackathon (200+ teams).",
    stack: ["Qwen-VL", "Next.js", "Postgres + pgvector", "Whisper", "Inngest"],
    stats: [
      { value: 2, label: "Hackathon placing" },
      { value: 200, suffix: "+", label: "Teams beaten" },
      { value: 5, label: "Pipeline stages" },
    ],
    cover: "/cover-lumen.jpg",
    links: { github: "https://github.com/inference-club/lumen" },
  },
  {
    slug: "atlas-clinical",
    index: "02",
    title: "Atlas — Traceable Clinical Handoff",
    eyebrow: "02 / Project",
    problem: "Patients get lab PDFs. Doctors get noise. Nobody gets traceable summaries.",
    constraint:
      "Deterministic contract pipeline. LLM confined to bounded explanation. Refuses unsupported claims.",
    outcome: "Surfaces uncertainty by default. Used by 3 clinicians in pilot.",
    stack: ["Qwen", "Pydantic", "FastAPI", "PDF.js", "Postgres"],
    stats: [
      { value: 3, label: "Pilot clinicians" },
      { value: 100, suffix: "%", label: "Citations traceable" },
      { value: 0, label: "Hallucinated metrics shipped" },
    ],
    cover: "/cover-atlas.jpg",
    links: { github: "https://github.com/inference-club/atlas" },
  },
];

export const posts: Post[] = [
  {
    slug: "bounded-llms",
    title: "Bounded LLMs, Unbounded Systems",
    excerpt:
      "Why the most reliable AI products in 2026 confine the model to the smallest possible surface.",
    cover: "/journal-1.jpg",
    category: "Essay",
    readingTime: "8 min",
    publishedAt: "2026-04-12",
  },
  {
    slug: "vibe-discipline",
    title: "Vibe Coding Is Not the Opposite of Discipline",
    excerpt: "Speed and rigor are orthogonal. Here's how we hold both in production.",
    cover: "/journal-2.jpg",
    category: "Manifesto",
    readingTime: "6 min",
    publishedAt: "2026-04-02",
  },
  {
    slug: "qwen-hackathon",
    title: "How a Pipeline Won a Hackathon",
    excerpt: "Postmortem from the Lumen build — what we cut, what we kept, what we'd do again.",
    cover: "/journal-3.jpg",
    category: "Postmortem",
    readingTime: "12 min",
    publishedAt: "2026-03-20",
  },
];

export const members: Member[] = [
  {
    slug: "founder-1",
    name: "Founder One",
    role: "Co-founder · Systems",
    bio: "Pipelines, contracts, the boring parts that make the magic reproducible.",
    links: { github: "https://github.com/" },
  },
  {
    slug: "founder-2",
    name: "Founder Two",
    role: "Co-founder · Models",
    bio: "Multimodal prompting, evaluation, and refusing unsupported conclusions.",
    links: { github: "https://github.com/" },
  },
];

export const stats: Stat[] = [
  { value: 2, suffix: "", label: "Hackathon placings", sparkline: [10, 28, 22, 40, 36, 60, 52, 78] },
  { value: 200, suffix: "+", label: "Teams beaten", sparkline: [8, 18, 30, 28, 44, 52, 70, 88] },
  { value: 2, suffix: "", label: "Production systems shipped", sparkline: [4, 8, 12, 18, 26, 36, 50, 70] },
  { value: 1, suffix: "", label: "Discipline being defined", sparkline: [60, 64, 70, 72, 78, 80, 84, 90] },
];

export const processNodes: ProcessNode[] = [
  { id: "input", label: "Input", desc: "Photos · voice · text · context", icon: "dot" },
  { id: "tags", label: "Tags", desc: "Pure-function classifier", icon: "tag" },
  { id: "writer", label: "Writer", desc: "Bounded LLM, contract I/O", icon: "pen" },
  { id: "memory", label: "Memory", desc: "pgvector + episodic store", icon: "database" },
  { id: "output", label: "Output", desc: "Traceable, cited, refusable", icon: "send" },
];

export const homePageMock: HomePageContent = {
  heroEyebrow: "Agentic Engineering · HCMUT · Founded 2026",
  heroHeadline:
    "We don't teach AI. We institutionalize the engineering discipline AI-native software demands.",
  heroKeywords: ["bounded", "contract-based", "shipped", "traceable"],
  heroLiveBandSuffix: "HCMUT",
  manifestoQuote: "Bounded models. Contract-based pipelines. Shipped systems.",
  ctaBands: [
    { label: "Apply to the founding cohort", href: "/join" },
    { label: "Read the engineering journal", href: "/journal" },
    { label: "View open-source projects", href: "/projects" },
  ],
};
