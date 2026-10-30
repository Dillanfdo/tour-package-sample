import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { WhatsAppButton } from "./components/WhatsAppButton";

const outfit = localFont({
  src: [
    { path: "../../fonts/outfit-normal-500.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/outfit-normal-600.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/outfit-normal-700.woff2", weight: "700", style: "normal" },
    { path: "../../fonts/outfit-normal-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-d3-heading",
  display: "swap",
});

const manrope = localFont({
  src: [
    { path: "../../fonts/manrope-normal-400.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/manrope-normal-500.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/manrope-normal-600.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/manrope-normal-700.woff2", weight: "700", style: "normal" },
    { path: "../../fonts/manrope-normal-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-d3-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bold & Vibrant",
  description: "A bright, social layout for Europe tour packages from India.",
};

export default function DesignThreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${outfit.variable} ${manrope.variable} theme-d3 flex min-h-screen flex-col`}>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
