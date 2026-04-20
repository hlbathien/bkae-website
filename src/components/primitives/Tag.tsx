export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="tag-sweep inline-flex items-center gap-2 border border-[var(--color-ink3)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-steel-light)]">
      {children}
    </span>
  );
}
