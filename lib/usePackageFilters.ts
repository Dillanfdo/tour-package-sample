"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { countries, packages } from "@/data/packages";
import {
  cloneFilters,
  defaultFilters,
  filterPackages,
  filtersFromSearchParams,
  type PackageFilters,
} from "@/lib/filters";

export function usePackageFilters() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<PackageFilters>(() =>
    filtersFromSearchParams(searchParams, countries),
  );

  const results = useMemo(() => filterPackages(packages, filters), [filters]);

  const update = (partial: Partial<PackageFilters>) => {
    setFilters((current) => ({ ...current, ...partial }));
  };

  const reset = () => setFilters(cloneFilters(defaultFilters));

  return {
    filters,
    results,
    update,
    reset,
    total: packages.length,
  };
}
