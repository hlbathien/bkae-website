import type { MetadataRoute } from "next";
import { projects, posts } from "@/lib/cms";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inference.club";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const mk = (
    path: string,
    priority = 0.6,
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly" = "monthly",
    lastModified: Date = now,
  ) => ({ url: `${SITE}${path}`, lastModified, changeFrequency, priority });

  const staticRoutes: MetadataRoute.Sitemap = [
    mk("", 1, "weekly"),
    mk("/manifesto", 0.8, "monthly"),
    mk("/projects", 0.9, "weekly"),
    mk("/journal", 0.8, "weekly"),
    mk("/about", 0.7, "monthly"),
    mk("/events", 0.7, "weekly"),
    mk("/press", 0.6, "monthly"),
    mk("/sponsor", 0.6, "monthly"),
    mk("/uses", 0.5, "monthly"),
    mk("/changelog", 0.5, "weekly"),
    mk("/join", 0.9, "monthly"),
    mk("/search", 0.3, "monthly"),
  ];

  const projectRoutes = projects.map((p) => mk(`/projects/${p.slug}`, 0.8, "monthly"));
  const postRoutes = posts.map((p) =>
    mk(`/journal/${p.slug}`, 0.6, "yearly", new Date(p.publishedAt)),
  );

  const categories = Array.from(new Set(posts.map((p) => p.category.toLowerCase())));
  const tagRoutes = categories.map((c) => mk(`/journal/tag/${c}`, 0.4, "monthly"));

  return [...staticRoutes, ...projectRoutes, ...postRoutes, ...tagRoutes];
}
