import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function initIdlePrefetch(router: AppRouterInstance) {
  if (typeof window === "undefined") return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = entry.target as HTMLAnchorElement;
        const href = link.getAttribute("href");
        if (href && href.startsWith("/")) {
          setTimeout(() => {
            if ('requestIdleCallback' in window) {
              (window as unknown as { requestIdleCallback: (fn: () => void, opts: { timeout: number }) => void }).requestIdleCallback(() => {
                router.prefetch(href);
              }, { timeout: 80 });
            } else {
              router.prefetch(href);
            }
          }, 80);

          observer.unobserve(link);
        }
      }
    });
  }, { rootMargin: "0px", threshold: 0.1 });

  const links = document.querySelectorAll('a[href^="/"]');
  links.forEach(link => observer.observe(link));
  
  return () => {
    observer.disconnect();
  };
}
