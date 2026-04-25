import "server-only";
import type {
  Announcement,
  HomePageContent,
  Member,
  Post,
  ProcessNode,
  Project,
  Stat,
} from "./cms";
import {
  announcements as announcementsMock,
  homePageMock,
  members as membersMock,
  posts as postsMock,
  processNodes as processNodesMock,
  projects as projectsMock,
  stats as statsMock,
} from "./cms";

type FindArgs = Record<string, unknown>;
type GlobalArgs = { slug: string; depth?: number };
type PayloadShape = {
  find: (args: FindArgs) => Promise<{ docs: unknown[] }>;
  findGlobal: (args: GlobalArgs) => Promise<unknown>;
};

async function getClient(): Promise<PayloadShape | null> {
  if (!process.env.DATABASE_URI) return null;
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    return (await getPayload({ config })) as unknown as PayloadShape;
  } catch (err) {
    console.error("[cms-server] Payload client init failed, falling back to mock:", err);
    return null;
  }
}

// ---- Mappers --------------------------------------------------------------
// Payload returns Project.stack as Tag relations (with `name`) when depth>0,
// or as ID strings when depth=0. Mock CMS contract is `string[]` of names.
// Normalize so consumers stay shape-agnostic.
type RawTag = string | { name?: string; slug?: string } | null | undefined;
type RawProject = Omit<Project, "stack" | "cover" | "links"> & {
  stack?: RawTag[];
  cover?: RawMedia;
  links?: unknown;
};

function normalizeProject(raw: unknown): Project {
  const p = raw as RawProject;
  const stack = (p.stack ?? [])
    .map((t) => (typeof t === "string" ? t : (t?.name ?? t?.slug ?? "")))
    .filter((s): s is string => typeof s === "string" && s.length > 0);
  // Payload stores links as array of { url, kind, label }; mock shape is
  // { github?: string; demo?: string } — map by kind.
  const linksArr = Array.isArray(p.links) ? (p.links as { url?: string; kind?: string }[]) : [];
  const links: Project["links"] = {};
  for (const l of linksArr) {
    if (!l.url) continue;
    if (l.kind === "github") links.github = l.url;
    else if (l.kind === "demo") links.demo = l.url;
  }
  return {
    ...(p as Project),
    stack,
    cover: mediaUrl(p.cover) || "/cover-lumen.svg",
    links,
  };
}

// ---- Projects -------------------------------------------------------------
export async function fetchProjects(): Promise<Project[]> {
  const p = await getClient();
  if (!p) return projectsMock;
  try {
    const res = await p.find({ collection: "projects", limit: 50, sort: "index", depth: 1 });
    return res.docs.map(normalizeProject);
  } catch {
    return projectsMock;
  }
}

export async function fetchProject(slug: string): Promise<Project | undefined> {
  const p = await getClient();
  if (!p) return projectsMock.find((x) => x.slug === slug);
  try {
    const res = await p.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    return res.docs[0] ? normalizeProject(res.docs[0]) : projectsMock.find((x) => x.slug === slug);
  } catch {
    return projectsMock.find((x) => x.slug === slug);
  }
}

// ---- Posts ----------------------------------------------------------------
// Payload Post shape differs from mock:
//   - category: relation → Tag { name } (mock expects string)
//   - cover: upload → Media { url } (mock expects string path)
//   - readingTime: string (ok)
// Normalize so consumers keep the Post contract.
type RawMedia = string | { url?: string; filename?: string } | null | undefined;
type RawPost = Omit<Post, "category" | "cover"> & {
  category?: RawTag;
  cover?: RawMedia;
};

function mediaUrl(m: RawMedia): string {
  if (!m) return "";
  if (typeof m === "string") return m;
  return m.url ?? (m.filename ? `/media/${m.filename}` : "");
}

function normalizePost(raw: unknown): Post {
  const p = raw as RawPost;
  const cat = p.category;
  const category =
    typeof cat === "string" ? cat : (cat?.name ?? cat?.slug ?? "");
  return {
    ...(p as Post),
    category,
    cover: mediaUrl(p.cover) || "/cover-lumen.svg",
  };
}

export async function fetchPosts(): Promise<Post[]> {
  const p = await getClient();
  if (!p) return postsMock;
  try {
    const res = await p.find({ collection: "posts", limit: 100, sort: "-publishedAt", depth: 1 });
    return res.docs.map(normalizePost);
  } catch {
    return postsMock;
  }
}

export async function fetchPost(slug: string): Promise<Post | undefined> {
  const p = await getClient();
  if (!p) return postsMock.find((x) => x.slug === slug);
  try {
    const res = await p.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    return res.docs[0] ? normalizePost(res.docs[0]) : postsMock.find((x) => x.slug === slug);
  } catch {
    return postsMock.find((x) => x.slug === slug);
  }
}

// ---- Members --------------------------------------------------------------
export async function fetchMembers(): Promise<Member[]> {
  const p = await getClient();
  if (!p) return membersMock;
  try {
    const res = await p.find({ collection: "members", limit: 100 });
    return res.docs as unknown as Member[];
  } catch {
    return membersMock;
  }
}

// ---- Announcements --------------------------------------------------------
export async function fetchAnnouncements(): Promise<Announcement[]> {
  const p = await getClient();
  if (!p) return announcementsMock;
  try {
    const res = await p.find({
      collection: "announcements",
      limit: 20,
      sort: "-pinned",
    });
    return res.docs as unknown as Announcement[];
  } catch {
    return announcementsMock;
  }
}

// ---- Events ---------------------------------------------------------------
export async function fetchEvents(): Promise<unknown[]> {
  const p = await getClient();
  if (!p) return [];
  try {
    const res = await p.find({ collection: "events", limit: 100, sort: "-startsAt" });
    return res.docs;
  } catch {
    return [];
  }
}

// ---- Globals --------------------------------------------------------------
type StatsBoardGlobal = {
  items?: { label: string; value: number; suffix?: string; sparkline?: { n: number }[] }[];
};
type ProcessFlowGlobal = {
  nodes?: { id: string; label: string; desc: string; icon?: string }[];
};
type HomePageGlobal = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroKeywords?: { word: string }[];
  heroLiveBandSuffix?: string;
  manifestoQuote?: string;
  ctaBands?: { label: string; href: string }[];
};

export async function fetchStats(): Promise<Stat[]> {
  const p = await getClient();
  if (!p) return statsMock;
  try {
    const g = (await p.findGlobal({ slug: "stats-board" })) as StatsBoardGlobal;
    const items = g.items ?? [];
    if (!items.length) return statsMock;
    return items.map((it) => ({
      value: it.value,
      suffix: it.suffix,
      label: it.label,
      sparkline: (it.sparkline ?? []).map((p) => p.n),
    }));
  } catch {
    return statsMock;
  }
}

export async function fetchProcessNodes(): Promise<ProcessNode[]> {
  const p = await getClient();
  if (!p) return processNodesMock;
  try {
    const g = (await p.findGlobal({ slug: "process-flow" })) as ProcessFlowGlobal;
    const nodes = g.nodes ?? [];
    return nodes.length ? nodes : processNodesMock;
  } catch {
    return processNodesMock;
  }
}

export async function fetchHomePage(): Promise<HomePageContent> {
  const p = await getClient();
  if (!p) return homePageMock;
  try {
    const g = (await p.findGlobal({ slug: "home-page" })) as HomePageGlobal;
    return {
      heroEyebrow: g.heroEyebrow ?? homePageMock.heroEyebrow,
      heroHeadline: g.heroHeadline ?? homePageMock.heroHeadline,
      heroSubheadline: g.heroSubheadline,
      heroKeywords: (g.heroKeywords ?? []).map((k) => k.word).filter(Boolean).length
        ? (g.heroKeywords ?? []).map((k) => k.word)
        : homePageMock.heroKeywords,
      heroLiveBandSuffix: g.heroLiveBandSuffix ?? homePageMock.heroLiveBandSuffix,
      manifestoQuote: g.manifestoQuote ?? homePageMock.manifestoQuote,
      ctaBands: g.ctaBands?.length ? g.ctaBands : homePageMock.ctaBands,
    };
  } catch {
    return homePageMock;
  }
}
