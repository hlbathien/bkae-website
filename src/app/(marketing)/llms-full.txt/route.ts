import { fetchPosts, fetchProjects } from "@/lib/cms-server";

export const revalidate = 3600;

const PILLARS = [
  { n: "01", title: "Bounded LLMs", body: "Confine the model to the smallest surface that still produces value. Refuse outside the contract." },
  { n: "02", title: "Deterministic edges", body: "Pure functions at every interface. Pipelines are reproducible or they are theater." },
  { n: "03", title: "Surface uncertainty", body: "Calibration over confidence. A system that admits 'I don't know' is the only one that earns trust." },
  { n: "04", title: "Ship to learn", body: "Deploy small, instrument everything, iterate against real usage. Velocity with judgment." },
];

export async function GET() {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inference.club";
  const [projects, posts] = await Promise.all([fetchProjects(), fetchPosts()]);
  const parts: string[] = [];

  parts.push(
    `# Agentic Engineering — llms-full.txt`,
    ``,
    `Canonical: ${SITE}`,
    `License: CC BY 4.0 (content). Code per repo license.`,
    ``,
    `## About`,
    `Agentic Engineering is the HCMUT student club institutionalizing bounded, contract-based AI engineering. Founded 2025 by two first-year engineers at Ho Chi Minh City University of Technology.`,
    ``,
    `## Manifesto`,
  );
  for (const p of PILLARS) {
    parts.push(`### ${p.n} · ${p.title}`, p.body, ``);
  }

  parts.push(`## Projects`);
  for (const p of projects) {
    parts.push(
      `### ${p.title}`,
      `URL: ${SITE}/projects/${p.slug}`,
      `Problem: ${p.problem ?? ""}`,
      `Constraint: ${p.constraint ?? ""}`,
      `Outcome: ${p.outcome ?? ""}`,
      `Stack: ${(p.stack ?? []).join(", ")}`,
      ``,
    );
  }

  parts.push(`## Journal`);
  for (const p of posts) {
    parts.push(
      `### ${p.title}`,
      `URL: ${SITE}/journal/${p.slug}`,
      `Category: ${p.category ?? ""} · Published: ${p.publishedAt ?? ""} · ${p.readingTime ?? ""}`,
      p.excerpt ?? "",
      ``,
    );
  }

  return new Response(parts.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
