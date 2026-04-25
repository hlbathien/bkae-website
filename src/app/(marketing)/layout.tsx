import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import MarqueeBar from "@/components/chrome/MarqueeBar";
import GridOverlay from "@/components/chrome/GridOverlay";
import Cursor from "@/components/chrome/Cursor";
import SmoothScroll from "@/components/chrome/SmoothScroll";
import ScrollRail from "@/components/chrome/ScrollRail";
import PageTransition from "@/components/chrome/PageTransition";
import AudioToggle from "@/components/chrome/AudioToggle";
import DraftBanner from "@/components/chrome/DraftBanner";
import { LD, organizationLD, websiteLD } from "@/lib/jsonld";
import { syne, instrumentSerif, dmMono } from "@/lib/fonts";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSerif.variable} ${dmMono.variable} bg-[var(--color-ink)] text-[var(--color-ivory)]`}
    >
      <body className="antialiased">
        <LD data={organizationLD()} />
        <LD data={websiteLD()} />
        <DraftBanner />
        <noscript>
          <div
            style={{
              background: "var(--color-amber)",
              color: "var(--color-ink)",
              padding: "12px 20px",
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
            }}
          >
            This website uses JavaScript for smooth scrolling and animations. Basic navigation works
            without JavaScript, but some interactive features may be limited.
          </div>
        </noscript>
        <SmoothScroll>
          <PageTransition />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[var(--color-amber)] focus:text-[var(--color-ink)] focus:px-3 focus:py-2"
          >
            Skip to content
          </a>
          <MarqueeBar />
          <Header />
          <GridOverlay />
          <ScrollRail />
          <AudioToggle />
          <Cursor />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
