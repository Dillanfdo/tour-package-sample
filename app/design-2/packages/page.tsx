import type { Metadata } from "next";
import { Suspense } from "react";
import { PackagesExplorer } from "../components/PackagesExplorer";

export const metadata: Metadata = {
  title: "Editorial collection",
  description: "Browse Europe journeys with a quiet filter bar and a masonry catalogue.",
};

export default function DesignTwoPackagesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-2 pt-12 sm:px-6 sm:pt-16">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#8C3E2C]">The collection</p>
        <h1 className="mt-3 max-w-3xl font-heading text-5xl leading-tight sm:text-6xl">Eight ways across Europe.</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5c534c] sm:text-base">
          Filter by the countries on the route, the number of nights, and what the fare should stay under. Prices are per person, twin sharing, from India.
        </p>
      </section>
      <Suspense fallback={<p className="px-4 py-16 text-center text-sm">Loading the collection…</p>}>
        <PackagesExplorer />
      </Suspense>
    </>
  );
}
