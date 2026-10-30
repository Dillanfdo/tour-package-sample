import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { WhatsAppButton } from "./components/WhatsAppButton";

const poppins = localFont({
  src: [
    { path: "../../fonts/poppins-normal-500.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/poppins-normal-600.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/poppins-normal-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-d1-heading",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "../../fonts/inter-normal-400.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/inter-normal-500.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/inter-normal-600.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/inter-normal-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-d1-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Classic Travel Agency",
  description: "A familiar, conversion-focused layout for Europe tour packages from India.",
};

export default function DesignOneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.variable} ${inter.variable} theme-d1 flex min-h-screen flex-col`}>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
