"use client";

import { EnquiryForm } from "./EnquiryForm";
import { FilterBar } from "./FilterBar";
import { PackageCard } from "./PackageCard";
import { usePackageFilters } from "@/lib/usePackageFilters";

const ratios = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/5]", "aspect-[5/6]"];

export function PackagesExplorer() {
  const { filters, results, update, reset, total } = usePackageFilters();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <FilterBar idPrefix="d2" filters={filters} onChange={update} onReset={reset} />
      <p className="mt-8 text-sm text-[#5c534c]" aria-live="polite">
        {results.length} of {total} journeys
      </p>
      {results.length === 0 ? (
        <div className="mt-10 border border-dashed border-[#d9cfc3] px-6 py-20 text-center">
          <p className="font-heading text-3xl">Nothing in this edit.</p>
          <p className="mt-3 text-sm text-[#5c534c]">Widen the nights or the fare, or clear the search.</p>
          <button type="button" onClick={reset} className="mt-6 text-xs uppercase tracking-[0.16em] text-[#8C3E2C]">
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {results.map((pkg, index) => (
            <div key={pkg.slug} className="mb-6 break-inside-avoid">
              <PackageCard
                pkg={pkg}
                ratio={ratios[index % ratios.length]}
                onEnquire={() => document.getElementById("callback")?.scrollIntoView({ behavior: "smooth" })}
              />
            </div>
          ))}
        </div>
      )}
      <section id="callback" className="mt-20 grid gap-10 border-t border-[#e0d8ce] pt-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8C3E2C]">Callback</p>
          <h2 className="mt-3 font-heading text-4xl leading-tight">Request a callback</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5c534c]">
            Leave a number and the season you are considering. We reply with two date windows, not a brochure.
          </p>
        </div>
        <EnquiryForm idPrefix="d2-callback" />
      </section>
    </div>
  );
}
