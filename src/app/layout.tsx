import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import MarqueeBar from "@/components/chrome/MarqueeBar";
import GridOverlay from "@/components/chrome/GridOverlay";
import Cursor from "@/components/chrome/Cursor";
import SmoothScroll from "@/components/chrome/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://inference.club"),
  title: {
    default: "Inference — Agentic Engineering at HCMUT",
    template: "%s · Inference",
  },
  description:
    "Inference is the Agentic Engineering club at HCMUT. We ship bounded, contract-based AI systems and teach the discipline behind them.",
  openGraph: {
    title: "Inference — Agentic Engineering at HCMUT",
    description: "Bounded LLMs. Contract-based pipelines. Shipped systems. Founded at HCMUT.",
    type: "website",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Inference — Agentic Engineering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inference — Agentic Engineering at HCMUT",
    description: "Bounded LLMs. Contract-based pipelines. Shipped systems. Founded at HCMUT.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[var(--color-ink)] text-[var(--color-ivory)]">
      <body className="no-cursor antialiased">
        <SmoothScroll>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[var(--color-amber)] focus:text-[var(--color-ink)] focus:px-3 focus:py-2"
          >
            Skip to content
          </a>
          <MarqueeBar />
          <Header />
          <GridOverlay />
          <Cursor />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
