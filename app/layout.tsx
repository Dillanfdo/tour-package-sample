import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../fonts/inter-normal-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-normal-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-normal-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter-normal-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-root",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Your Brand Name · Europe tours from India",
    template: "%s · Your Brand Name",
  },
  description:
    "Design pitch prototype for a travel company selling Europe tour packages from India. Three UI directions, one shared catalogue.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
