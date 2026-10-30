"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { countries } from "@/data/packages";
import { formatPrice } from "@/lib/format";
import { FILTER_BOUNDS, toggleCountry, type PackageFilters, type SortKey } from "@/lib/filters";
import type { Category } from "@/lib/types";

type FilterBarProps = {
  idPrefix: string;
  filters: PackageFilters;
  onChange: (partial: Partial<PackageFilters>) => void;
  onReset: () => void;
};

const categories: Array<Category | "all"> = ["all", "Group", "Family", "Honeymoon"];

export function FilterBar({ idPrefix, filters, onChange, onReset }: FilterBarProps) {
  const [open, setOpen] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (event: MouseEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const countryLabel = filters.countries.length > 0 ? `Country · ${filters.countries.length}` : "Country";
  const durationActive = filters.minNights !== FILTER_BOUNDS.minNights || filters.maxNights !== FILTER_BOUNDS.maxNights;
  const budgetActive = filters.minBudget !== FILTER_BOUNDS.minBudget || filters.maxBudget !== FILTER_BOUNDS.maxBudget;

  return (
    <div ref={barRef} className="flex flex-wrap items-center gap-2">
      <label className="sr-only" htmlFor={`${idPrefix}-q`}>Keyword</label>
      <input
        id={`${idPrefix}-q`}
        value={filters.query}
        onChange={(event) => onChange({ query: event.target.value })}
        placeholder="Search the collection"
        className="min-w-48 flex-1 rounded-full border border-[#d9cfc3] bg-transparent px-4 py-2 text-sm outline-none focus-visible:border-[#2A2420]"
      />
      <Pill label={countryLabel} active={filters.countries.length > 0} expanded={open === "country"} onToggle={() => setOpen(open === "country" ? null : "country")}>
        <div className="grid max-h-56 gap-1.5 overflow-auto">
          {countries.map((country) => (
            <label key={country} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.countries.includes(country)}
                onChange={() => onChange({ countries: toggleCountry(filters.countries, country) })}
              />
              {country}
            </label>
          ))}
        </div>
      </Pill>
      <Pill label={durationActive ? `${filters.minNights}–${filters.maxNights} nights` : "Duration"} active={durationActive} expanded={open === "duration"} onToggle={() => setOpen(open === "duration" ? null : "duration")}>
        <label className="grid gap-1 text-xs" htmlFor={`${idPrefix}-min-nights`}>
          Minimum {filters.minNights} nights
          <input id={`${idPrefix}-min-nights`} type="range" min={FILTER_BOUNDS.minNights} max={FILTER_BOUNDS.maxNights} value={filters.minNights} onChange={(event) => { const minNights = Number(event.target.value); onChange({ minNights, maxNights: Math.max(minNights, filters.maxNights) }); }} />
        </label>
        <label className="mt-3 grid gap-1 text-xs" htmlFor={`${idPrefix}-max-nights`}>
          Maximum {filters.maxNights} nights
          <input id={`${idPrefix}-max-nights`} type="range" min={FILTER_BOUNDS.minNights} max={FILTER_BOUNDS.maxNights} value={filters.maxNights} onChange={(event) => { const maxNights = Number(event.target.value); onChange({ maxNights, minNights: Math.min(maxNights, filters.minNights) }); }} />
        </label>
      </Pill>
      <Pill label={budgetActive ? `${formatPrice(filters.minBudget)} – ${formatPrice(filters.maxBudget)}` : "Budget"} active={budgetActive} expanded={open === "budget"} onToggle={() => setOpen(open === "budget" ? null : "budget")}>
        <label className="grid gap-1 text-xs" htmlFor={`${idPrefix}-min-budget`}>
          From {formatPrice(filters.minBudget)}
          <input id={`${idPrefix}-min-budget`} type="range" min={FILTER_BOUNDS.minBudget} max={FILTER_BOUNDS.maxBudget} step={FILTER_BOUNDS.budgetStep} value={filters.minBudget} onChange={(event) => { const minBudget = Number(event.target.value); onChange({ minBudget, maxBudget: Math.max(minBudget, filters.maxBudget) }); }} />
        </label>
        <label className="mt-3 grid gap-1 text-xs" htmlFor={`${idPrefix}-max-budget`}>
          Up to {formatPrice(filters.maxBudget)}
          <input id={`${idPrefix}-max-budget`} type="range" min={FILTER_BOUNDS.minBudget} max={FILTER_BOUNDS.maxBudget} step={FILTER_BOUNDS.budgetStep} value={filters.maxBudget} onChange={(event) => { const maxBudget = Number(event.target.value); onChange({ maxBudget, minBudget: Math.min(maxBudget, filters.minBudget) }); }} />
        </label>
      </Pill>
      <Pill label={filters.category === "all" ? "Category" : filters.category} active={filters.category !== "all"} expanded={open === "category"} onToggle={() => setOpen(open === "category" ? null : "category")}>
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 py-1 text-sm">
            <input type="radio" name={`${idPrefix}-category`} checked={filters.category === category} onChange={() => onChange({ category })} />
            {category === "all" ? "All" : category}
          </label>
        ))}
      </Pill>
      <Pill label="Sort" active={filters.sort !== "price-asc"} expanded={open === "sort"} onToggle={() => setOpen(open === "sort" ? null : "sort")}>
        {([
          ["price-asc", "Price: low to high"],
          ["price-desc", "Price: high to low"],
          ["duration", "Duration"],
        ] as const).map(([value, label]) => (
          <label key={value} className="flex items-center gap-2 py-1 text-sm">
            <input type="radio" name={`${idPrefix}-sort`} checked={filters.sort === value} onChange={() => onChange({ sort: value as SortKey })} />
            {label}
          </label>
        ))}
      </Pill>
      <button type="button" onClick={onReset} className="px-3 py-2 text-xs uppercase tracking-[0.14em] text-[#8C3E2C]">
        Reset
      </button>
    </div>
  );
}

function Pill({
  label,
  active,
  expanded,
  onToggle,
  children,
}: {
  label: string;
  active?: boolean;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
          active ? "border-[#2A2420] bg-[#2A2420] text-[#FAF7F2]" : "border-[#d9cfc3] text-[#2A2420]"
        }`}
      >
        {label}
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>
      {expanded ? (
        <div className="absolute left-0 z-30 mt-2 w-72 border border-[#e4ddd4] bg-[#faf7f2] p-4 shadow-sm">
          {children}
        </div>
      ) : null}
    </div>
  );
}
