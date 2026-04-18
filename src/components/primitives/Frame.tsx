export default function Frame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`mx-auto max-w-[1600px] px-[var(--gutter)] ${className}`}
    >
      {children}
    </section>
  );
}
