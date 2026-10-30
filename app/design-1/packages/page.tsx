import type { Metadata } from "next";
import { Suspense } from "react";
import { PackagesExplorer } from "../components/PackagesExplorer";

export const metadata: Metadata = {
  title: "Classic packages",
  description: "Filter Europe tour packages by country, duration, budget and category.",
};

export default function DesignOnePackagesPage() {
  return (
    <>
      <section className="border-b border-[#e6ebf2] bg-[#f7f9fc]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c56a10]">Catalogue</p>
          <h1 className="mt-2 font-heading text-4xl font-semibold text-[#1B365D]">Europe tour packages</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#516074] sm:text-base">
            Eight departures from India, priced per person on twin sharing. Filter by the country you want in the route, how many nights you can spare, and the fare band.
          </p>
        </div>
      </section>
      <Suspense fallback={<p className="px-4 py-16 text-center text-sm text-[#516074]">Loading packages…</p>}>
        <PackagesExplorer />
      </Suspense>
    </>
  );
}
