export const revalidate = 86400;

export async function GET() {
  const body = [
    "Contact: mailto:security@inference.club",
    "Expires: 2027-04-22T00:00:00.000Z",
    "Preferred-Languages: en, vi",
    "Canonical: https://inference.club/.well-known/security.txt",
    "Policy: https://inference.club/press",
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
