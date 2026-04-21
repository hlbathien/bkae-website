import "server-only";
import type { Announcement, Member, Post, Project } from "./cms";
import {
  announcements as announcementsMock,
  members as membersMock,
  posts as postsMock,
  projects as projectsMock,
} from "./cms";

type PayloadShape = {
  find: (args: unknown) => Promise<{ docs: unknown[] }>;
  findGlobal: (args: unknown) => Promise<unknown>;
};

async function getClient(): Promise<PayloadShape | null> {
  if (!process.env.DATABASE_URI) return null;
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    return (await getPayload({ config })) as unknown as PayloadShape;
  } catch {
    return null;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  const p = await getClient();
  if (!p) return projectsMock;
  try {
    const res = await p.find({ collection: "projects", limit: 50, sort: "index" });
    return res.docs as unknown as Project[];
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
    });
    return (
      (res.docs[0] as unknown as Project) ?? projectsMock.find((x) => x.slug === slug)
    );
  } catch {
    return projectsMock.find((x) => x.slug === slug);
  }
}

export async function fetchPosts(): Promise<Post[]> {
  const p = await getClient();
  if (!p) return postsMock;
  try {
    const res = await p.find({ collection: "posts", limit: 100, sort: "-publishedAt" });
    return res.docs as unknown as Post[];
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
    });
    return (res.docs[0] as unknown as Post) ?? postsMock.find((x) => x.slug === slug);
  } catch {
    return postsMock.find((x) => x.slug === slug);
  }
}

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
