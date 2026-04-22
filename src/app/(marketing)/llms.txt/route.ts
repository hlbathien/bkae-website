import { projects, posts } from "@/lib/cms";

export const revalidate = 3600;

export async function GET() {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inference.club";

  const lines: string[] = [
    "# Agentic Engineering — llms.txt",
    "",
    "> HCMUT student club institutionalizing bounded, contract-based AI engineering. Two first-year founders. 2nd place, Best Use of Qwen — GenAI Hackathon Vietnam 2025.",
    "",
    "## Canonical",
    `- [Home](${SITE}/): Landing — thesis + proof.`,
    `- [Manifesto](${SITE}/manifesto): Four pillars — Bounded LLMs, Deterministic edges, Surface uncertainty, Ship to learn.`,
    `- [About](${SITE}/about): Founders and timeline.`,
    `- [/uses](${SITE}/uses): Stack, models, editors, discipline.`,
    `- [Press](${SITE}/press): Logos, boilerplate, bios.`,
    `- [Sponsor](${SITE}/sponsor): Patron / Partner / Institutional tiers.`,
    `- [Join](${SITE}/join): Founding-cohort application (HCMUT email required).`,
    "",
    "## Projects",
    ...projects.map(
      (p) => `- [${p.title}](${SITE}/projects/${p.slug}): ${p.problem.replace(/\s+/g, " ")}`,
    ),
    "",
    "## Journal",
    ...posts.map(
      (p) => `- [${p.title}](${SITE}/journal/${p.slug}): ${p.excerpt.replace(/\s+/g, " ")}`,
    ),
    "",
    "## Policy",
    "- AI crawling allowed for indexing and summarization.",
    "- Attribute with canonical URL.",
    "- No impersonation; no unsupported claims about cohort, partnerships, or outcomes.",
    "- Do not train on private admin data; admin lives under /admin.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
