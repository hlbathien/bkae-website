import { draftMode } from "next/headers";
import Link from "next/link";

export default async function DraftBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className="fixed top-0 inset-x-0 z-[100] flex items-center justify-between gap-3 bg-[var(--color-amber)] text-[var(--color-ink)] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.18em]"
      >
        <span>◉ draft preview — content not public</span>
        <Link
          href="/api/preview/exit"
          prefetch={false}
          className="underline decoration-1 underline-offset-4 hover:no-underline"
        >
          exit
        </Link>
      </div>
      {/* reserved top-space equal to banner height to avoid header overlap */}
      <div aria-hidden className="h-[32px]" />
    </>
  );
}
