import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { WhatsAppButton } from "./components/WhatsAppButton";

const playfair = localFont({
  src: [
    { path: "../../fonts/playfair-normal-500.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/playfair-normal-600.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/playfair-normal-700.woff2", weight: "700", style: "normal" },
    { path: "../../fonts/playfair-italic-500.woff2", weight: "500", style: "italic" },
    { path: "../../fonts/playfair-italic-600.woff2", weight: "600", style: "italic" },
    { path: "../../fonts/playfair-italic-700.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-d2-heading",
  display: "swap",
});

const dmSans = localFont({
  src: [
    { path: "../../fonts/dm-sans-normal-400.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/dm-sans-normal-500.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/dm-sans-normal-600.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/dm-sans-normal-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-d2-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Modern Editorial",
  description: "A boutique, image-led layout for Europe tour packages from India.",
};

export default function DesignTwoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${dmSans.variable} theme-d2 flex min-h-screen flex-col`}>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-[#faf7f2] focus:px-3 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
