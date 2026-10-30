import { countries } from "@/data/packages";
import { formatPrice } from "@/lib/format";
import {
  FILTER_BOUNDS,
  toggleCountry,
  type PackageFilters,
  type SortKey,
} from "@/lib/filters";
import type { Category } from "@/lib/types";

type FilterBarProps = {
  idPrefix: string;
  filters: PackageFilters;
  onChange: (partial: Partial<PackageFilters>) => void;
  onReset: () => void;
};

const categories: Array<Category | "all"> = ["all", "Group", "Family", "Honeymoon"];

export function FilterBar({ idPrefix, filters, onChange, onReset }: FilterBarProps) {
  return (
    <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold text-[#1B365D]">Filters</h2>
        <button type="button" onClick={onReset} className="text-sm font-semibold text-[#c56a10] underline">
          Reset
        </button>
      </div>
      <label className="grid gap-1.5 text-sm font-medium text-[#1B365D]" htmlFor={`${idPrefix}-q`}>
        Keyword
        <input
          id={`${idPrefix}-q`}
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          placeholder="Italy, aurora, honeymoon"
          className="rounded-md border border-[#d5deea] px-3 py-2 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B365D]"
        />
      </label>
      <fieldset>
        <legend className="text-sm font-medium text-[#1B365D]">Country</legend>
        <div className="mt-2 grid max-h-48 gap-1.5 overflow-auto pr-1">
          {countries.map((country) => (
            <label key={country} className="flex items-center gap-2 text-sm text-[#314056]">
              <input
                type="checkbox"
                checked={filters.countries.includes(country)}
                onChange={() => onChange({ countries: toggleCountry(filters.countries, country) })}
                className="h-4 w-4 accent-[#1B365D]"
              />
              {country}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium text-[#1B365D]">Duration</legend>
        <label className="grid gap-1 text-xs text-[#516074]" htmlFor={`${idPrefix}-min-nights`}>
          Minimum nights: {filters.minNights}
          <input
            id={`${idPrefix}-min-nights`}
            type="range"
            min={FILTER_BOUNDS.minNights}
            max={FILTER_BOUNDS.maxNights}
            value={filters.minNights}
            onChange={(event) => {
              const minNights = Number(event.target.value);
              onChange({ minNights, maxNights: Math.max(minNights, filters.maxNights) });
            }}
          />
        </label>
        <label className="grid gap-1 text-xs text-[#516074]" htmlFor={`${idPrefix}-max-nights`}>
          Maximum nights: {filters.maxNights}
          <input
            id={`${idPrefix}-max-nights`}
            type="range"
            min={FILTER_BOUNDS.minNights}
            max={FILTER_BOUNDS.maxNights}
            value={filters.maxNights}
            onChange={(event) => {
              const maxNights = Number(event.target.value);
              onChange({ maxNights, minNights: Math.min(maxNights, filters.minNights) });
            }}
          />
        </label>
      </fieldset>
      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium text-[#1B365D]">Budget</legend>
        <label className="grid gap-1 text-xs text-[#516074]" htmlFor={`${idPrefix}-min-budget`}>
          From {formatPrice(filters.minBudget)}
          <input
            id={`${idPrefix}-min-budget`}
            type="range"
            min={FILTER_BOUNDS.minBudget}
            max={FILTER_BOUNDS.maxBudget}
            step={FILTER_BOUNDS.budgetStep}
            value={filters.minBudget}
            onChange={(event) => {
              const minBudget = Number(event.target.value);
              onChange({ minBudget, maxBudget: Math.max(minBudget, filters.maxBudget) });
            }}
          />
        </label>
        <label className="grid gap-1 text-xs text-[#516074]" htmlFor={`${idPrefix}-max-budget`}>
          Up to {formatPrice(filters.maxBudget)}
          <input
            id={`${idPrefix}-max-budget`}
            type="range"
            min={FILTER_BOUNDS.minBudget}
            max={FILTER_BOUNDS.maxBudget}
            step={FILTER_BOUNDS.budgetStep}
            value={filters.maxBudget}
            onChange={(event) => {
              const maxBudget = Number(event.target.value);
              onChange({ maxBudget, minBudget: Math.min(maxBudget, filters.minBudget) });
            }}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-medium text-[#1B365D]">Category</legend>
        <div className="mt-2 grid gap-1.5">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm text-[#314056]">
              <input
                type="radio"
                name={`${idPrefix}-category`}
                checked={filters.category === category}
                onChange={() => onChange({ category })}
                className="h-4 w-4 accent-[#1B365D]"
              />
              {category === "all" ? "All categories" : category}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-1.5 text-sm font-medium text-[#1B365D]" htmlFor={`${idPrefix}-sort`}>
        Sort
        <select
          id={`${idPrefix}-sort`}
          value={filters.sort}
          onChange={(event) => onChange({ sort: event.target.value as SortKey })}
          className="rounded-md border border-[#d5deea] px-3 py-2 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B365D]"
        >
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="duration">Duration</option>
        </select>
      </label>
    </form>
  );
}
