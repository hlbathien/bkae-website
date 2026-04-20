import type { Metadata } from "next";
import "./globals.css";
import { syne, instrumentSerif, dmMono } from "@/lib/fonts";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import LiveBand from "@/components/chrome/LiveBand";
import MarqueeBar from "@/components/chrome/MarqueeBar";
import GridOverlay from "@/components/chrome/GridOverlay";
import Cursor from "@/components/chrome/Cursor";
import SmoothScroll from "@/components/chrome/SmoothScroll";
import ScrollRail from "@/components/chrome/ScrollRail";
import PageTransition from "@/components/chrome/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://inference.club"),
  title: {
    default: "Agentic Engineering — HCMUT",
    template: "%s · Agentic Engineering",
  },
  description:
    "Agentic Engineering is the HCMUT student club institutionalizing bounded, contract-based AI engineering. Founded by two first-year students. Currently shipping.",
  openGraph: {
    title: "Agentic Engineering — HCMUT",
    description: "Agentic Engineering is the HCMUT student club institutionalizing bounded, contract-based AI engineering. Founded by two first-year students. Currently shipping.",
    type: "website",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Agentic Engineering — HCMUT" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Engineering — HCMUT",
    description: "Agentic Engineering is the HCMUT student club institutionalizing bounded, contract-based AI engineering. Founded by two first-year students. Currently shipping.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSerif.variable} ${dmMono.variable} bg-[var(--color-ink)] text-[var(--color-ivory)]`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
/**
 * 
 *   AGENTIC ENGINEERING · HCMUT
 *   
 *   [ . . . . . . . . . . . . . . . . . . ]
 *   [ . . . . . . . . . . . . . . . . . . ]
 *   [ . . . . . . . . . . . . . . . . . . ]
 *   [ . . . . . . . . . . . . . . . . . . ]
 *   [ . . . . . . . . . . . . . . . . . . ]
 *   [ . . . . . . . . . . . . . . . . . . ]
 *   [ . . . . . . . . . . . . . . . . . . ]
 *   
 *   BOUNDED LLMS · CONTRACT-BASED PIPELINES · SHIPPED SYSTEMS
 *   v1.0.0-2026-AE
 *
 */
`,
          }}
        />
      </head>
      <body className="antialiased">
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
          <LiveBand />
          <MarqueeBar />
          <Header />
          <GridOverlay />
          <ScrollRail />
          <Cursor />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
