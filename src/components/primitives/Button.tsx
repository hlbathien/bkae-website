import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center gap-2 px-5 py-3 text-[12px] uppercase tracking-[0.18em] transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-amber)] text-[var(--color-ink)] hover:bg-[var(--color-amber-hot)]"
      : "border border-[var(--color-ink3)] text-[var(--color-ivory2)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children} <ArrowUpRight size={14} />
    </Link>
  );
}
