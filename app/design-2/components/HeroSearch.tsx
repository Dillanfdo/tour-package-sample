"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { countries } from "@/data/packages";
import { budgetChoices, durationChoices, type BudgetChoiceId, type DurationChoiceId } from "@/lib/filters";

const fieldClass =
  "w-full min-w-0 truncate border-0 border-b border-[#cfc4b6] bg-transparent py-2 pr-8 text-sm text-[#2A2420] outline-none focus-visible:border-[#2A2420]";

export function HeroSearch({ href }: { href: string }) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState<DurationChoiceId>("any");
  const [budget, setBudget] = useState<BudgetChoiceId>("any");

  return (
    <form
      className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] xl:items-end"
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
      <label className="grid gap-1 text-[11px] uppercase tracking-[0.16em] text-[#8C3E2C]">
        Destination
        <select value={destination} onChange={(event) => setDestination(event.target.value)} className={fieldClass}>
          <option value="">Anywhere</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-[11px] uppercase tracking-[0.16em] text-[#8C3E2C]">
        Duration
        <select value={duration} onChange={(event) => setDuration(event.target.value as DurationChoiceId)} className={fieldClass}>
          {durationChoices.map((choice) => (
            <option key={choice.id} value={choice.id}>{choice.label}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-[11px] uppercase tracking-[0.16em] text-[#8C3E2C]">
        Budget
        <select value={budget} onChange={(event) => setBudget(event.target.value as BudgetChoiceId)} className={fieldClass}>
          {budgetChoices.map((choice) => (
            <option key={choice.id} value={choice.id}>{choice.label}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="border border-[#2A2420] px-5 py-3 text-xs uppercase tracking-[0.16em] transition hover:bg-[#2A2420] hover:text-[#FAF7F2]">
        Search
      </button>
    </form>
  );
}
