"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { activeFilterCount } from "@/lib/filters";
import { usePackageFilters } from "@/lib/usePackageFilters";
import { EnquiryForm } from "./EnquiryForm";
import { FilterBar } from "./FilterBar";
import { PackageCard } from "./PackageCard";

export function PackagesExplorer() {
  const { filters, results, update, reset, total } = usePackageFilters();
  const [sheet, setSheet] = useState(false);
  const [modal, setModal] = useState(false);
  const count = activeFilterCount(filters);

  useEffect(() => {
    if (!sheet && !modal) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSheet(false);
        setModal(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet, modal]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 md:pb-16">
      <div className="hidden md:block">
        <FilterBar idPrefix="d3-desk" filters={filters} onChange={update} onReset={reset} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold" aria-live="polite">
          {results.length} of {total} trips
        </p>
        <button type="button" onClick={() => setModal(true)} className="rounded-full bg-[#FFD23F] px-4 py-2 text-sm font-extrabold text-[#161326]">
          Request a callback
        </button>
      </div>
      {results.length === 0 ? (
        <div className="mt-6 rounded-3xl border-2 border-dashed border-[#c9c6da] bg-white px-6 py-16 text-center">
          <p className="font-heading text-3xl font-extrabold">No trips in this mix.</p>
          <p className="mt-2 text-sm font-medium text-[#5c5670]">Loosen the budget or clear a country chip.</p>
          <button type="button" onClick={reset} className="mt-4 rounded-full bg-[#161326] px-4 py-2 text-sm font-extrabold text-white">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-5 grid gap-4">
          {results.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} variant="list" onEnquire={() => setModal(true)} />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setSheet(true)}
        className="fixed bottom-5 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#161326] px-5 py-3 text-sm font-extrabold text-white shadow-lg md:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        Filters{count > 0 ? ` · ${count}` : ""}
      </button>

      {sheet ? (
        <div className="fixed inset-0 z-[70] flex items-end bg-[#12101c]/60 md:hidden" onClick={() => setSheet(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="d3-filter-title"
            className="max-h-[85vh] w-full overflow-auto rounded-t-3xl bg-[#f4f5fb] p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 id="d3-filter-title" className="font-heading text-2xl font-extrabold">Filters</h2>
              <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white" onClick={() => setSheet(false)} aria-label="Close filters">
                <X aria-hidden="true" />
              </button>
            </div>
            <FilterBar idPrefix="d3-sheet" filters={filters} onChange={update} onReset={reset} />
          </div>
        </div>
      ) : null}

      {modal ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#12101c]/60 p-3 sm:items-center" onClick={() => setModal(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="d3-callback-title"
            className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-3xl bg-white p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2 id="d3-callback-title" className="font-heading text-3xl font-extrabold">Request a callback</h2>
              <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f5fb]" onClick={() => setModal(false)} aria-label="Close dialog">
                <X aria-hidden="true" />
              </button>
            </div>
            <EnquiryForm idPrefix="d3-modal" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
