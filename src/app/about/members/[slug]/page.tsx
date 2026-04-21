import Frame from "@/components/primitives/Frame";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchMembers } from "@/lib/cms-server";
import { members as membersMock } from "@/lib/cms";

export async function generateStaticParams() {
  return membersMock.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const members = await fetchMembers();
  const m = members.find((x) => x.slug === slug);
  return { title: m ? `${m.name} — ${m.role}` : "Member" };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const members = await fetchMembers();
  const m = members.find((x) => x.slug === slug);
  if (!m) notFound();

  return (
    <Frame className="pt-40 pb-24">
      <Link
        href="/about"
        className="bracket-link font-mono text-[11px] uppercase tracking-widest text-[var(--color-steel)]"
      >
        ← all members
      </Link>
      <p className="eyebrow mt-8 mb-4">[ {m.role} ]</p>
      <h1
        className="font-display text-[var(--color-ivory)]"
        style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
      >
        {m.name}
      </h1>
      <p className="mt-8 max-w-[56ch] text-[var(--color-steel-light)] text-lg">{m.bio}</p>
      {m.links?.github && (
        <p className="mt-8 font-mono text-[11px]">
          <a
            href={m.links.github}
            className="bracket-link uppercase tracking-widest text-[var(--color-amber)]"
            data-cursor="external"
          >
            github ↗
          </a>
        </p>
      )}
    </Frame>
  );
}
