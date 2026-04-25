export default function Frame({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      {...props}
      className={`mx-auto max-w-[1600px] px-[var(--gutter)] ${className}`}
    >
      {children}
    </section>
  );
}
