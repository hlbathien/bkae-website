export const revalidate = 86400;

export async function GET() {
  const body = [
    "/* humans.txt · Agentic Engineering */",
    "",
    "/* TEAM */",
    "Founder — Systems  · founder-one",
    "Founder — Models   · founder-two",
    "",
    "/* THANKS */",
    "HCMUT · Qwen · OpenAI discipline",
    "",
    "/* SITE */",
    "Last update : 2026-04-22",
    "Language    : English",
    "Doctype     : HTML5",
    "IDE         : Neovim · Cursor · Claude Code",
    "Stack       : Next.js 16 · React 19 · Tailwind v4 · GSAP · Lenis · Payload v3 · Postgres",
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
