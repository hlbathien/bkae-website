// Server-side catalog assembly (Payload-backed) → client filter island.
import { fetchPosts, fetchProjects } from "@/lib/cms-server";
import SearchClient, { type Hit } from "./SearchClient";

export const metadata = { title: "Search" };

export default async function SearchPage() {
  const [projects, posts] = await Promise.all([fetchProjects(), fetchPosts()]);
  const catalog: Hit[] = [
    ...projects.map((p) => ({ title: p.title, href: `/projects/${p.slug}`, kind: "Project" })),
    ...posts.map((p) => ({ title: p.title, href: `/journal/${p.slug}`, kind: "Journal" })),
    { title: "Manifesto", href: "/manifesto", kind: "Page" },
    { title: "About", href: "/about", kind: "Page" },
    { title: "Events", href: "/events", kind: "Page" },
    { title: "Press kit", href: "/press", kind: "Page" },
    { title: "Sponsor", href: "/sponsor", kind: "Page" },
    { title: "/uses", href: "/uses", kind: "Page" },
    { title: "Join the founding cohort", href: "/join", kind: "CTA" },
  ];
  return <SearchClient catalog={catalog} />;
}
