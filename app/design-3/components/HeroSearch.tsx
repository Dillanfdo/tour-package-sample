"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { countries } from "@/data/packages";
import { budgetChoices, durationChoices, type BudgetChoiceId, type DurationChoiceId } from "@/lib/filters";

const field =
  "w-full min-w-0 truncate rounded-full border-0 bg-white py-3 pl-4 pr-8 text-sm font-semibold text-[#161326] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFD23F]";

export function HeroSearch({ href }: { href: string }) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState<DurationChoiceId>("any");
  const [budget, setBudget] = useState<BudgetChoiceId>("any");

  return (
    <form
      className="mt-8 grid gap-3 rounded-[2rem] bg-white/10 p-3 backdrop-blur sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.1fr_auto]"
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
      <label className="grid gap-1 text-xs font-bold uppercase tracking-wide text-white/80">
        Destination
        <select value={destination} onChange={(event) => setDestination(event.target.value)} className={field}>
          <option value="">Anywhere</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-xs font-bold uppercase tracking-wide text-white/80">
        Duration
        <select value={duration} onChange={(event) => setDuration(event.target.value as DurationChoiceId)} className={field}>
          {durationChoices.map((choice) => (
            <option key={choice.id} value={choice.id}>{choice.label}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-xs font-bold uppercase tracking-wide text-white/80">
        Budget
        <select value={budget} onChange={(event) => setBudget(event.target.value as BudgetChoiceId)} className={field}>
          {budgetChoices.map((choice) => (
            <option key={choice.id} value={choice.id}>{choice.label}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="self-end rounded-full bg-[#FFD23F] px-6 py-3 text-sm font-extrabold text-[#161326] hover:bg-[#ffe27a]">
        Find a trip
      </button>
    </form>
  );
}
