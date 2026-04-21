export const revalidate = 86400;

export async function GET() {
  const body = [
    "# AI Usage Policy · Agentic Engineering",
    "Contact: mailto:ai-policy@inference.club",
    "",
    "Allow-Training: yes",
    "Allow-Summarization: yes",
    "Allow-Embedding: yes",
    "Attribution-Required: yes",
    "Canonical-Form: prefer-canonical-url",
    "",
    "# Off-limits",
    "Private: /admin/*",
    "Private: /api/*",
    "",
    "# Structured indexes",
    "LLMs-Index: /llms.txt",
    "LLMs-Full: /llms-full.txt",
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
