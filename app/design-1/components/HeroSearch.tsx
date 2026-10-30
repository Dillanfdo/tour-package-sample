"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { countries } from "@/data/packages";
import { budgetChoices, durationChoices, type BudgetChoiceId, type DurationChoiceId } from "@/lib/filters";

export function HeroSearch({ href }: { href: string }) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState<DurationChoiceId>("any");
  const [budget, setBudget] = useState<BudgetChoiceId>("any");

  return (
    <form
      className="grid gap-3 rounded-lg bg-white p-4 shadow-lg sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_auto] lg:items-end"
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (destination) params.set("countries", destination);
        const durationChoice = durationChoices.find((item) => item.id === duration);
        const budgetChoice = budgetChoices.find((item) => item.id === budget);
        if (durationChoice && durationChoice.id !== "any") {
          params.set("minNights", String(durationChoice.minNights));
          params.set("maxNights", String(durationChoice.maxNights));
        }
        if (budgetChoice && budgetChoice.id !== "any") {
          params.set("minBudget", String(budgetChoice.minBudget));
          params.set("maxBudget", String(budgetChoice.maxBudget));
        }
        const query = params.toString();
        router.push(query ? `${href}?${query}` : href);
      }}
    >
      <label className="grid gap-1 text-sm font-medium text-[#1B365D]">
        Destination
        <select
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          className="w-full min-w-0 truncate rounded-md border border-[#d5deea] py-2.5 pl-3 pr-8 text-sm font-normal text-[#1c2838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B365D]"
        >
          <option value="">Anywhere in Europe</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-medium text-[#1B365D]">
        Duration
        <select
          value={duration}
          onChange={(event) => setDuration(event.target.value as DurationChoiceId)}
          className="w-full min-w-0 truncate rounded-md border border-[#d5deea] py-2.5 pl-3 pr-8 text-sm font-normal text-[#1c2838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B365D]"
        >
          {durationChoices.map((choice) => (
            <option key={choice.id} value={choice.id}>
              {choice.label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-medium text-[#1B365D]">
        Budget
        <select
          value={budget}
          onChange={(event) => setBudget(event.target.value as BudgetChoiceId)}
          className="w-full min-w-0 truncate rounded-md border border-[#d5deea] py-2.5 pl-3 pr-8 text-sm font-normal text-[#1c2838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B365D]"
        >
          {budgetChoices.map((choice) => (
            <option key={choice.id} value={choice.id}>
              {choice.label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1B365D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#152947] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28]"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        Search tours
      </button>
    </form>
  );
}
