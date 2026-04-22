import type { Metadata } from "next";
import "./globals.css";

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
    description:
      "Agentic Engineering is the HCMUT student club institutionalizing bounded, contract-based AI engineering. Founded by two first-year students. Currently shipping.",
    type: "website",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Agentic Engineering — HCMUT" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Engineering — HCMUT",
    description:
      "Agentic Engineering is the HCMUT student club institutionalizing bounded, contract-based AI engineering. Founded by two first-year students. Currently shipping.",
    images: ["/og.svg"],
  },
};

// Root layout intentionally minimal: each route group ((marketing) / (payload))
// owns its own <html><body> via group-level layout. This prevents Payload's
// admin RootLayout from being wrapped in the marketing site chrome (which
// imports GSAP/Lenis client code and crashes the admin client bundle).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
