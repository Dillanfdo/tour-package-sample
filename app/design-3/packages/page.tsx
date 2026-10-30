import type { Metadata } from "next";
import { Suspense } from "react";
import { PackagesExplorer } from "../components/PackagesExplorer";

export const metadata: Metadata = {
  title: "Bold packages",
  description: "Chip filters and list cards for Europe tour packages from India.",
};

export default function DesignThreePackagesPage() {
  return (
    <div className="bg-[#f4f5fb]">
      <section className="mx-auto max-w-6xl px-4 pb-2 pt-10 sm:px-6 sm:pt-12">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#5A3AD6]">The trips</p>
        <h1 className="mt-2 font-heading text-4xl font-extrabold leading-tight sm:text-6xl">Find your trip.</h1>
        <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-[#3d3852] sm:text-base">
          Tap a country, slide the nights, cap the fare. Eight Europe packages from India, priced per person on twin sharing.
        </p>
      </section>
      <Suspense fallback={<p className="px-4 py-16 text-center text-sm font-bold">Loading trips…</p>}>
        <PackagesExplorer />
      </Suspense>
    </div>
  );
}
