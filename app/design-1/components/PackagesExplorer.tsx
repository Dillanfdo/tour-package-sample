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
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const count = activeFilterCount(filters);

  useEffect(() => {
    if (!drawer && !modal) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawer(false);
        setModal(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawer, modal]);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[17rem_1fr] lg:py-12">
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-auto rounded-lg border border-[#e6ebf2] bg-white p-4 shadow-sm">
          <FilterBar idPrefix="d1-desk" filters={filters} onChange={update} onReset={reset} />
        </div>
      </aside>
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#314056]" aria-live="polite">
            Showing {results.length} of {total} packages
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[#1B365D] px-3 py-2 text-sm font-semibold text-[#1B365D] lg:hidden"
              onClick={() => setDrawer(true)}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters{count > 0 ? ` (${count})` : ""}
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#1B365D] px-3 py-2 text-sm font-semibold text-white"
              onClick={() => setModal(true)}
            >
              Request a callback
            </button>
          </div>
        </div>
        {results.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#c5d0de] bg-[#f7f9fc] px-6 py-16 text-center">
            <p className="font-heading text-xl font-semibold text-[#1B365D]">No packages match these filters.</p>
            <p className="mt-2 text-sm text-[#516074]">Try a wider budget, fewer countries, or clear the keyword.</p>
            <button type="button" onClick={reset} className="mt-4 text-sm font-semibold text-[#c56a10] underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {results.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} onEnquire={() => setModal(true)} />
            ))}
          </div>
        )}
        <section id="callback" className="mt-12 rounded-lg border border-[#e6ebf2] bg-[#f7f9fc] p-5 sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-[#1B365D]">Request a callback</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#516074]">
            Tell us the trip and the month you have in mind. A specialist returns the call with dates and a fare hold.
          </p>
          <div className="mt-5 max-w-xl">
            <EnquiryForm idPrefix="d1-callback" />
          </div>
        </section>
      </div>
      {drawer ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button type="button" className="absolute inset-0 bg-[#0c1830]/50" aria-label="Close filters" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-[min(100%,22rem)] overflow-auto bg-white p-5 shadow-xl">
            <div className="mb-4 flex justify-end">
              <button type="button" onClick={() => setDrawer(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-md border" aria-label="Close filters">
                <X aria-hidden="true" />
              </button>
            </div>
            <FilterBar idPrefix="d1-mob" filters={filters} onChange={update} onReset={reset} />
          </div>
        </div>
      ) : null}
      {modal ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0c1830]/55 p-4 sm:items-center" onClick={() => setModal(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="d1-callback-title"
            className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-5 shadow-xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2 id="d1-callback-title" className="font-heading text-2xl font-semibold text-[#1B365D]">
                Request a callback
              </h2>
              <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md border" onClick={() => setModal(false)} aria-label="Close dialog">
                <X aria-hidden="true" />
              </button>
            </div>
            <EnquiryForm idPrefix="d1-modal" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
