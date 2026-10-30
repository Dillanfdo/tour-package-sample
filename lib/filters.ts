import type { Category, Package } from "@/lib/types";

export type SortKey = "price-asc" | "price-desc" | "duration";

export type PackageFilters = {
  countries: string[];
  minNights: number;
  maxNights: number;
  minBudget: number;
  maxBudget: number;
  category: Category | "all";
  query: string;
  sort: SortKey;
};

export const FILTER_BOUNDS = {
  minNights: 5,
  maxNights: 14,
  minBudget: 80000,
  maxBudget: 230000,
  budgetStep: 5000,
} as const;

export const defaultFilters: PackageFilters = {
  countries: [],
  minNights: FILTER_BOUNDS.minNights,
  maxNights: FILTER_BOUNDS.maxNights,
  minBudget: FILTER_BOUNDS.minBudget,
  maxBudget: FILTER_BOUNDS.maxBudget,
  category: "all",
  query: "",
  sort: "price-asc",
};

export const durationChoices = [
  { id: "any", label: "Any duration", minNights: 5, maxNights: 14 },
  { id: "5-7", label: "5–7 nights", minNights: 5, maxNights: 7 },
  { id: "8-10", label: "8–10 nights", minNights: 8, maxNights: 10 },
  { id: "11-14", label: "11–14 nights", minNights: 11, maxNights: 14 },
] as const;

export const budgetChoices = [
  { id: "any", label: "Any budget", minBudget: 80000, maxBudget: 230000 },
  { id: "under-120", label: "Under ₹1,20,000", minBudget: 80000, maxBudget: 120000 },
  { id: "120-170", label: "₹1,20,000 – ₹1,70,000", minBudget: 120000, maxBudget: 170000 },
  { id: "170-plus", label: "₹1,70,000+", minBudget: 170000, maxBudget: 230000 },
] as const;

export type DurationChoiceId = (typeof durationChoices)[number]["id"];
export type BudgetChoiceId = (typeof budgetChoices)[number]["id"];

const categories: ReadonlyArray<Category | "all"> = ["all", "Group", "Family", "Honeymoon"];
const sorts: readonly SortKey[] = ["price-asc", "price-desc", "duration"];

export function cloneFilters(filters: PackageFilters = defaultFilters): PackageFilters {
  return { ...filters, countries: [...filters.countries] };
}

export function toggleCountry(current: readonly string[], country: string): string[] {
  return current.includes(country)
    ? current.filter((item) => item !== country)
    : [...current, country];
}

export function activeFilterCount(filters: PackageFilters): number {
  let count = 0;
  if (filters.countries.length > 0) count += 1;
  if (
    filters.minNights !== defaultFilters.minNights ||
    filters.maxNights !== defaultFilters.maxNights
  ) {
    count += 1;
  }
  if (
    filters.minBudget !== defaultFilters.minBudget ||
    filters.maxBudget !== defaultFilters.maxBudget
  ) {
    count += 1;
  }
  if (filters.category !== "all") count += 1;
  if (filters.query.trim().length > 0) count += 1;
  if (filters.sort !== defaultFilters.sort) count += 1;
  return count;
}

function readNumber(params: URLSearchParams, key: string, fallback: number): number {
  const raw = params.get(key);
  if (raw == null || raw.trim() === "") return fallback;
  const value = Number(raw);
  return Number.isFinite(value) ? value : fallback;
}

export function filtersFromSearchParams(
  params: URLSearchParams,
  validCountries: readonly string[],
): PackageFilters {
  const selected = (params.get("countries") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => validCountries.includes(item));

  const categoryRaw = params.get("category") ?? "all";
  const category = categories.includes(categoryRaw as Category | "all")
    ? (categoryRaw as Category | "all")
    : "all";

  const sortRaw = params.get("sort") ?? "price-asc";
  const sort = sorts.includes(sortRaw as SortKey) ? (sortRaw as SortKey) : "price-asc";

  let minNights = readNumber(params, "minNights", defaultFilters.minNights);
  let maxNights = readNumber(params, "maxNights", defaultFilters.maxNights);
  let minBudget = readNumber(params, "minBudget", defaultFilters.minBudget);
  let maxBudget = readNumber(params, "maxBudget", defaultFilters.maxBudget);

  minNights = Math.min(FILTER_BOUNDS.maxNights, Math.max(FILTER_BOUNDS.minNights, minNights));
  maxNights = Math.min(FILTER_BOUNDS.maxNights, Math.max(FILTER_BOUNDS.minNights, maxNights));
  minBudget = Math.min(FILTER_BOUNDS.maxBudget, Math.max(FILTER_BOUNDS.minBudget, minBudget));
  maxBudget = Math.min(FILTER_BOUNDS.maxBudget, Math.max(FILTER_BOUNDS.minBudget, maxBudget));

  if (minNights > maxNights) {
    const swap = minNights;
    minNights = maxNights;
    maxNights = swap;
  }
  if (minBudget > maxBudget) {
    const swap = minBudget;
    minBudget = maxBudget;
    maxBudget = swap;
  }

  return {
    countries: selected,
    minNights,
    maxNights,
    minBudget,
    maxBudget,
    category,
    query: params.get("q") ?? "",
    sort,
  };
}

export function filterPackages(list: readonly Package[], filters: PackageFilters): Package[] {
  const query = filters.query.trim().toLowerCase();

  const matched = list.filter((item) => {
    if (filters.countries.length > 0) {
      const hits = item.countries.some((country) => filters.countries.includes(country));
      if (!hits) return false;
    }
    if (item.nights < filters.minNights || item.nights > filters.maxNights) return false;
    if (item.startingPrice < filters.minBudget || item.startingPrice > filters.maxBudget) return false;
    if (filters.category !== "all" && item.category !== filters.category) return false;
    if (query.length > 0) {
      const haystack = [item.title, item.summary, item.category, ...item.countries, ...item.highlights]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  const sorted = [...matched];
  sorted.sort((a, b) => {
    if (filters.sort === "price-asc") return a.startingPrice - b.startingPrice || a.title.localeCompare(b.title);
    if (filters.sort === "price-desc") return b.startingPrice - a.startingPrice || a.title.localeCompare(b.title);
    return b.nights - a.nights || a.title.localeCompare(b.title);
  });
  return sorted;
}
