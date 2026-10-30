"use client";

import { useState } from "react";
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
  const [panel, setPanel] = useState<"country" | "duration" | "budget" | "sort" | null>(null);

  const chip = (id: typeof panel, label: string, active: boolean) => (
    <button
      type="button"
      aria-expanded={panel === id}
      onClick={() => setPanel(panel === id ? null : id)}
      className={`rounded-full px-4 py-2 text-sm font-extrabold ${
        active ? "bg-[#161326] text-white" : "bg-white text-[#161326]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <label className="sr-only" htmlFor={`${idPrefix}-q`}>Keyword</label>
        <input
          id={`${idPrefix}-q`}
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          placeholder="Search trips"
          className="min-w-40 flex-1 rounded-full border-2 border-transparent bg-white px-4 py-2 text-sm font-semibold outline-none focus-visible:border-[#6C4CF1]"
        />
        {chip("country", filters.countries.length ? `Country ${filters.countries.length}` : "Country", filters.countries.length > 0)}
        {chip(
          "duration",
          filters.minNights !== FILTER_BOUNDS.minNights || filters.maxNights !== FILTER_BOUNDS.maxNights
            ? `${filters.minNights}–${filters.maxNights} nights`
            : "Duration",
          filters.minNights !== FILTER_BOUNDS.minNights || filters.maxNights !== FILTER_BOUNDS.maxNights,
        )}
        {chip(
          "budget",
          filters.minBudget !== FILTER_BOUNDS.minBudget || filters.maxBudget !== FILTER_BOUNDS.maxBudget
            ? "Budget set"
            : "Budget",
          filters.minBudget !== FILTER_BOUNDS.minBudget || filters.maxBudget !== FILTER_BOUNDS.maxBudget,
        )}
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onChange({ category })}
            className={`rounded-full px-4 py-2 text-sm font-extrabold ${
              filters.category === category ? "bg-gradient-to-r from-[#0E8C82] to-[#5A3AD6] text-white" : "bg-white text-[#161326]"
            }`}
          >
            {category === "all" ? "All" : category}
          </button>
        ))}
        {chip("sort", filters.sort === "price-asc" ? "Sort" : "Sorted", filters.sort !== "price-asc")}
        <button type="button" onClick={onReset} className="rounded-full bg-[#FFD23F] px-4 py-2 text-sm font-extrabold text-[#161326]">
          Reset
        </button>
      </div>
      {panel === "country" ? (
        <fieldset className="rounded-3xl bg-white p-4">
          <legend className="px-1 text-sm font-extrabold">Country</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {countries.map((country) => {
              const on = filters.countries.includes(country);
              return (
                <label key={country} className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-bold ${on ? "bg-[#161326] text-white" : "bg-[#f4f5fb]"}`}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={on}
                    onChange={() => onChange({ countries: toggleCountry(filters.countries, country) })}
                  />
                  {country}
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}
      {panel === "duration" ? (
        <fieldset className="grid gap-3 rounded-3xl bg-white p-4 sm:grid-cols-2">
          <legend className="px-1 text-sm font-extrabold">Duration</legend>
          <label className="text-sm font-bold" htmlFor={`${idPrefix}-min-nights`}>
            Min {filters.minNights} nights
            <input id={`${idPrefix}-min-nights`} className="mt-2 w-full accent-[#6C4CF1]" type="range" min={FILTER_BOUNDS.minNights} max={FILTER_BOUNDS.maxNights} value={filters.minNights} onChange={(event) => { const minNights = Number(event.target.value); onChange({ minNights, maxNights: Math.max(minNights, filters.maxNights) }); }} />
          </label>
          <label className="text-sm font-bold" htmlFor={`${idPrefix}-max-nights`}>
            Max {filters.maxNights} nights
            <input id={`${idPrefix}-max-nights`} className="mt-2 w-full accent-[#6C4CF1]" type="range" min={FILTER_BOUNDS.minNights} max={FILTER_BOUNDS.maxNights} value={filters.maxNights} onChange={(event) => { const maxNights = Number(event.target.value); onChange({ maxNights, minNights: Math.min(maxNights, filters.minNights) }); }} />
          </label>
        </fieldset>
      ) : null}
      {panel === "budget" ? (
        <fieldset className="grid gap-3 rounded-3xl bg-white p-4 sm:grid-cols-2">
          <legend className="px-1 text-sm font-extrabold">Budget</legend>
          <label className="text-sm font-bold" htmlFor={`${idPrefix}-min-budget`}>
            From {formatPrice(filters.minBudget)}
            <input id={`${idPrefix}-min-budget`} className="mt-2 w-full accent-[#00B4A6]" type="range" min={FILTER_BOUNDS.minBudget} max={FILTER_BOUNDS.maxBudget} step={FILTER_BOUNDS.budgetStep} value={filters.minBudget} onChange={(event) => { const minBudget = Number(event.target.value); onChange({ minBudget, maxBudget: Math.max(minBudget, filters.maxBudget) }); }} />
          </label>
          <label className="text-sm font-bold" htmlFor={`${idPrefix}-max-budget`}>
            Up to {formatPrice(filters.maxBudget)}
            <input id={`${idPrefix}-max-budget`} className="mt-2 w-full accent-[#6C4CF1]" type="range" min={FILTER_BOUNDS.minBudget} max={FILTER_BOUNDS.maxBudget} step={FILTER_BOUNDS.budgetStep} value={filters.maxBudget} onChange={(event) => { const maxBudget = Number(event.target.value); onChange({ maxBudget, minBudget: Math.min(maxBudget, filters.minBudget) }); }} />
          </label>
        </fieldset>
      ) : null}
      {panel === "sort" ? (
        <fieldset className="flex flex-wrap gap-2 rounded-3xl bg-white p-4">
          <legend className="px-1 text-sm font-extrabold">Sort</legend>
          {([
            ["price-asc", "Price: low to high"],
            ["price-desc", "Price: high to low"],
            ["duration", "Duration"],
          ] as const).map(([value, label]) => (
            <label key={value} className={`cursor-pointer rounded-full px-4 py-2 text-sm font-extrabold ${filters.sort === value ? "bg-[#FFD23F]" : "bg-[#f4f5fb]"}`}>
              <input type="radio" className="sr-only" name={`${idPrefix}-sort`} checked={filters.sort === value} onChange={() => onChange({ sort: value as SortKey })} />
              {label}
            </label>
          ))}
        </fieldset>
      ) : null}
    </div>
  );
}
